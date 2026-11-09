const express = require('express');
const nodemailer = require('nodemailer');
const pool = require('../db');

const router = express.Router();

// ──────────────────────────────────────
// Mailpit SMTP Taşıyıcısı (Hafta 3)
// Docker bridge ağında servis adı: mailpit:1025
// ──────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mailpit',
  port: parseInt(process.env.SMTP_PORT, 10) || 1025,
  secure: false, // 1025 portu için TLS kapalı
  tls: {
    rejectUnauthorized: false
  }
});

// ──────────────────────────────────────
// POST /api/messages — Mesaj kaydet ve satıcıya e-posta gönder
// ──────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    let { listing_id, sender_id, sender_name, sender_email, body } = req.body || {};

    // Eğer oturum token'ı ile gelinmişse ve sender bilgisi eksikse sessions'tan tamamlamayı dene
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const sessionResult = await pool.query(
          `SELECT u.id, u.full_name, u.email
           FROM sessions s
           JOIN users u ON u.id = s.user_id
           WHERE s.token = $1 AND s.expires_at > NOW()`,
          [token]
        );
        if (sessionResult.rows.length > 0) {
          const user = sessionResult.rows[0];
          sender_id = sender_id || user.id;
          sender_name = sender_name || user.full_name;
          sender_email = sender_email || user.email;
        }
      } catch (authErr) {
        console.warn('Mesaj gönderiminde oturum kontrolü atlandı:', authErr.message);
      }
    }

    // Doğrulamalar
    if (!listing_id) {
      return res.status(400).json({ error: 'İlan ID (listing_id) zorunludur.' });
    }

    if (!sender_name || !sender_name.trim()) {
      return res.status(400).json({ error: 'Ad Soyad (sender_name) alanı zorunludur.' });
    }

    if (!sender_email || !sender_email.trim()) {
      return res.status(400).json({ error: 'E-posta (sender_email) alanı zorunludur.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sender_email.trim())) {
      return res.status(400).json({ error: 'Geçerli bir e-posta adresi giriniz.' });
    }

    if (!body || !body.trim()) {
      return res.status(400).json({ error: 'Mesaj metni (body) boş bırakılamaz.' });
    }

    // İlan ve satıcı bilgilerini veritabanından çek
    const listingQuery = `
      SELECT l.id, l.title, l.price, u.id AS seller_id, u.full_name AS seller_name, u.email AS seller_email
      FROM listings l
      JOIN users u ON u.id = l.user_id
      WHERE l.id = $1
    `;
    const listingResult = await pool.query(listingQuery, [listing_id]);

    if (listingResult.rows.length === 0) {
      return res.status(404).json({ error: 'İlgili ilan bulunamadı.' });
    }

    const listing = listingResult.rows[0];

    // Mesajı veritabanına kaydet
    const insertMessageQuery = `
      INSERT INTO messages (listing_id, sender_id, sender_name, sender_email, body)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const messageResult = await pool.query(insertMessageQuery, [
      listing.id,
      sender_id || null,
      sender_name.trim(),
      sender_email.trim().toLowerCase(),
      body.trim()
    ]);

    const savedMessage = messageResult.rows[0];

    // Mailpit üzerinden satıcıya e-posta bildirimi gönder
    let emailSent = false;
    let emailError = null;

    try {
      const mailOptions = {
        from: '"CampusShare" <no-reply@campusshare.edu.tr>',
        to: listing.seller_email,
        replyTo: sender_email.trim(),
        subject: `[CampusShare] "${listing.title}" İlanınız İçin Yeni Bir Mesaj Var!`,
        text: `Merhaba ${listing.seller_name},\n\n"${listing.title}" başlıklı ilanınız için yeni bir mesaj aldınız.\n\nGönderen: ${sender_name.trim()} (${sender_email.trim()})\nMesaj:\n${body.trim()}\n\nBu mesaja yanıt vermek için doğrudan bu e-postayı yanıtlayabilirsiniz.\n\nİyi günler,\nCampusShare Ekibi`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #4f46e5; margin: 0;">🎓 CampusShare</h2>
              <p style="color: #6b7280; font-size: 14px; margin-top: 4px;">Kampüs İçi Paylaşım Platformu</p>
            </div>
            <p>Merhaba <strong>${listing.seller_name}</strong>,</p>
            <p><strong>"${listing.title}"</strong> başlıklı ilanınız için yeni bir mesaj aldınız:</p>
            <div style="background-color: #f8fafc; border-left: 4px solid #4f46e5; padding: 16px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Gönderen:</strong> ${sender_name.trim()} (<a href="mailto:${sender_email.trim()}" style="color: #4f46e5;">${sender_email.trim()}</a>)</p>
              <p style="margin: 0; font-size: 15px; color: #1f2937; white-space: pre-wrap;">${body.trim()}</p>
            </div>
            <p style="font-size: 13px; color: #6b7280;">Bu mesaja yanıt vermek için doğrudan bu e-postayı yanıtlayabilir veya gönderenle iletişime geçebilirsiniz.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">CampusShare — Kampüs İçi Paylaşım Platformu</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      emailSent = true;
      console.log(`✉️ Mailpit'e e-posta başarıyla iletildi: ${listing.seller_email}`);
    } catch (mErr) {
      emailError = mErr.message;
      console.error('E-posta gönderme hatası (Mailpit):', mErr.message);
    }

    return res.status(201).json({
      message: 'Mesajınız başarıyla kaydedildi.',
      data: savedMessage,
      email_sent: emailSent,
      ...(emailError && { email_warning: 'E-posta servisi yanıt vermedi ancak mesaj sisteme kaydedildi.' })
    });
  } catch (err) {
    console.error('Mesaj gönderme genel hatası:', err);
    return res.status(500).json({ error: 'Mesaj kaydedilirken sunucu hatası oluştu.' });
  }
});

// ──────────────────────────────────────
// GET /api/messages/:listingId — İlana ait mesajları getir
// ──────────────────────────────────────
router.get('/:listingId', async (req, res) => {
  try {
    const { listingId } = req.params;

    if (!listingId || isNaN(listingId)) {
      return res.status(400).json({ error: 'Geçerli bir ilan ID belirtilmelidir.' });
    }

    // İlanın varlığını kontrol et
    const listingCheck = await pool.query('SELECT id, title FROM listings WHERE id = $1', [listingId]);
    if (listingCheck.rows.length === 0) {
      return res.status(404).json({ error: 'İlan bulunamadı.' });
    }

    const messagesQuery = `
      SELECT m.id, m.listing_id, m.sender_id, m.sender_name, m.sender_email, m.body, m.created_at,
             u.full_name AS sender_user_name
      FROM messages m
      LEFT JOIN users u ON u.id = m.sender_id
      WHERE m.listing_id = $1
      ORDER BY m.created_at DESC
    `;
    const result = await pool.query(messagesQuery, [listingId]);

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Mesajları listeleme hatası:', err);
    return res.status(500).json({ error: 'Mesajlar alınırken sunucu hatası oluştu.' });
  }
});

module.exports = router;
