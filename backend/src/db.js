const { Pool } = require('pg');

// ──────────────────────────────────────
// PostgreSQL bağlantı havuzu
// Docker bridge ağında servis adı "db" kullanılır
// ──────────────────────────────────────
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'campus_pass',
  database: process.env.DB_NAME || 'campus_db'
});

// Bağlantı doğrulama
pool.on('connect', () => {
  console.log('📦 PostgreSQL bağlantısı kuruldu');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL bağlantı hatası:', err.message);
});

module.exports = pool;
