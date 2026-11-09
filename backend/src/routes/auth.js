const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const authMiddleware = require('../middleware/auth');

// db.js Arda tarafından yazıldı; hem `module.exports = pool` hem
// `module.exports = { pool }` biçimini destekler.
const dbModule = require('../db');
const pool = dbModule.pool || dbModule;

const router = express.Router();

const EDU_TR = /^[^\s@]+@[^\s@]+\.edu\.tr$/i;
const BCRYPT_ROUNDS = 10;
const SESSION_HOURS = 24;

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { full_name, email, password } = req.body || {};

    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'Ad soyad, e-posta ve şifre zorunludur.' });
    }
    if (!EDU_TR.test(email)) {
      return res.status(400).json({ error: 'Yalnızca .edu.tr uzantılı e-posta ile kayıt olunabilir.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Şifre en az 8 karakter olmalıdır.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [cleanEmail]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Bu e-posta ile zaten bir hesap var.' });
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, full_name, email, created_at`,
      [full_name.trim(), cleanEmail, passwordHash]
    );

    return res.status(201).json({ message: 'Kayıt başarılı.', user: result.rows[0] });
  } catch (err) {
    console.error('Kayıt hatası:', err);
    return res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'E-posta ve şifre zorunludur.' });
    }

    const result = await pool.query(
      'SELECT id, full_name, email, password_hash FROM users WHERE email = $1',
      [email.trim().toLowerCase()]
    );
    const user = result.rows[0];

    // Kullanıcı yoksa da aynı mesaj döner (hesap varlığı sızdırılmaz)
    const valid = user && (await bcrypt.compare(password, user.password_hash));
    if (!valid) {
      return res.status(401).json({ error: 'E-posta veya şifre hatalı.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + SESSION_HOURS * 60 * 60 * 1000);

    await pool.query(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, token, expiresAt]
    );

    return res.status(200).json({
      message: 'Giriş başarılı.',
      token,
      expires_at: expiresAt,
      user: { id: user.id, full_name: user.full_name, email: user.email }
    });
  } catch (err) {
    console.error('Giriş hatası:', err);
    return res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// GET /api/auth/me — Aktif oturum ve kullanıcı bilgilerini doğrula
router.get('/me', authMiddleware, async (req, res) => {
  try {
    return res.status(200).json({
      authenticated: true,
      user: req.user
    });
  } catch (err) {
    console.error('Kullanıcı bilgisi alma hatası:', err);
    return res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// POST /api/auth/logout — Oturumu sonlandır ve veritabanından sil
router.post('/logout', authMiddleware, async (req, res) => {
  try {
    if (req.token) {
      await pool.query('DELETE FROM sessions WHERE token = $1', [req.token]);
    }
    return res.status(200).json({ message: 'Oturum başarıyla kapatıldı.' });
  } catch (err) {
    console.error('Çıkış yapma hatası:', err);
    return res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

module.exports = router;
