const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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

app.use('/api/listings', listingsRouter);
app.use('/api/auth', authRouter);

// ──────────────────────────────────────
// Sunucuyu başlat
// ──────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 CampusShare API http://0.0.0.0:${PORT} adresinde çalışıyor`);
  console.log(`❤️  Sağlık kontrolü: http://localhost:${PORT}/api/health`);
});
