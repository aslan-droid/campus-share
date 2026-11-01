const express = require('express');
const pool = require('../db');

const router = express.Router();

// ──────────────────────────────────────
// GET /api/listings — Tüm ilanları getir
// ──────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    let query = `
      SELECT l.*, u.full_name AS seller_name
      FROM listings l
      JOIN users u ON u.id = l.user_id
    `;
    const params = [];

    // Kategori filtresi (opsiyonel)
    if (category) {
      query += ' WHERE l.category = $1';
      params.push(category);
    }

    query += ' ORDER BY l.created_at DESC';

    const result = await pool.query(query, params);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('İlanları getirme hatası:', err);
    return res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ──────────────────────────────────────
// GET /api/listings/:id — Tek ilan getir
// ──────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT l.*, u.full_name AS seller_name, u.email AS seller_email
       FROM listings l
       JOIN users u ON u.id = l.user_id
       WHERE l.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'İlan bulunamadı.' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('İlan getirme hatası:', err);
    return res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ──────────────────────────────────────
// POST /api/listings — Yeni ilan ekle
// ──────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { user_id, title, description, price, category, image_url } = req.body || {};

    // Zorunlu alan kontrolü
    if (!user_id || !title || price === undefined || !category) {
      return res.status(400).json({
        error: 'user_id, title, price ve category alanları zorunludur.'
      });
    }

    // Kategori doğrulama
    const validCategories = ['Elektronik', 'Kitap', 'Kıyafet', 'Diğer'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: `Geçersiz kategori. Geçerli değerler: ${validCategories.join(', ')}`
      });
    }

    // Fiyat doğrulama
    if (isNaN(price) || Number(price) < 0) {
      return res.status(400).json({ error: 'Fiyat sıfır veya pozitif bir sayı olmalıdır.' });
    }

    const result = await pool.query(
      `INSERT INTO listings (user_id, title, description, price, category, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, title.trim(), description || null, price, category, image_url || null]
    );

    return res.status(201).json({
      message: 'İlan başarıyla oluşturuldu.',
      listing: result.rows[0]
    });
  } catch (err) {
    console.error('İlan oluşturma hatası:', err);

    // Foreign key hatası — geçersiz user_id
    if (err.code === '23503') {
      return res.status(400).json({ error: 'Geçersiz kullanıcı ID.' });
    }

    return res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ──────────────────────────────────────
// DELETE /api/listings/:id — İlan sil
// ──────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM listings WHERE id = $1 RETURNING id, title',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Silinecek ilan bulunamadı.' });
    }

    return res.status(200).json({
      message: 'İlan silindi.',
      deleted: result.rows[0]
    });
  } catch (err) {
    console.error('İlan silme hatası:', err);
    return res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

module.exports = router;
