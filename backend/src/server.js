const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// Cihazdan yüklenen Base64 görseller için gövde boyutu sınırı artırıldı (Hafta 3)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ──────────────────────────────────────
// Sağlık kontrolü endpoint'i
// ──────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'CampusShare API çalışıyor',
    timestamp: new Date().toISOString()
  });
});

// ──────────────────────────────────────
// Route'lar
// ──────────────────────────────────────
const listingsRouter = require('./routes/listings');
const authRouter = require('./routes/auth');
const messagesRouter = require('./routes/messages');

app.use('/api/listings', listingsRouter);
app.use('/api/auth', authRouter);
app.use('/api/messages', messagesRouter);

// ──────────────────────────────────────
// Sunucuyu başlat
// ──────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 CampusShare API http://0.0.0.0:${PORT} adresinde çalışıyor`);
  console.log(`❤️  Sağlık kontrolü: http://localhost:${PORT}/api/health`);
});
