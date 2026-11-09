const dbModule = require('../db');
const pool = dbModule.pool || dbModule;

/**
 * CampusShare — Kimlik Doğrulama Middleware'i
 * Authorization: Bearer <token> başlığını okur ve `sessions` tablosundan
 * token geçerliliğini ile süresini kontrol eder.
 */
module.exports = async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) {
      return res.status(401).json({ error: 'Yetkilendirme başlığı (Authorization) eksik. Lütfen giriş yapın.' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Geçersiz yetkilendirme formatı. (Bearer <token> formatında olmalıdır)' });
    }

    const token = parts[1].trim();
    if (!token) {
      return res.status(401).json({ error: 'Token bulunamadı.' });
    }

    // Sessions tablosundan token'ı ve kullanıcıyı sorgula
    const result = await pool.query(
      `SELECT s.id AS session_id, s.token, s.expires_at,
              u.id, u.full_name, u.email, u.created_at
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = $1`,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Geçersiz oturum tokenı. Lütfen tekrar giriş yapın.' });
    }

    const row = result.rows[0];
    const now = new Date();
    const expiresAt = new Date(row.expires_at);

    // Süre kontrolü
    if (expiresAt <= now) {
      // Süresi dolmuş oturumu temizle
      await pool.query('DELETE FROM sessions WHERE id = $1', [row.session_id]);
      return res.status(401).json({ error: 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.' });
    }

    // Doğrulanmış kullanıcıyı request nesnesine ekle
    req.user = {
      id: row.id,
      full_name: row.full_name,
      email: row.email,
      created_at: row.created_at
    };
    req.token = token;

    next();
  } catch (err) {
    console.error('Auth middleware hatası:', err);
    return res.status(500).json({ error: 'Kimlik doğrulama işlemi sırasında sunucu hatası.' });
  }
};
