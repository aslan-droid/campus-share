# 📋 Haftalık Rapor — Ali Caner

> Bu dosya her hafta Cuma günü güncellenir.

---

## 📅 Hafta 1 — 2026-10-23

### ✅ Bu Hafta Yapılanlar
- `db/init.sql` oluşturuldu: `users`, `listings`, `messages` tabloları
  - `users.email` için `UNIQUE` ve `.edu.tr` zorunluluğu (`CHECK`)
  - `listings.category` yalnızca Elektronik / Kitap / Kıyafet / Diğer
  - Yabancı anahtarlar ve `ON DELETE` kuralları tanımlandı
- `frontend/public/index.html` oluşturuldu: Tailwind CSS CDN ile giriş/kayıt arayüzü
  - Giriş ve kayıt sekmeleri
  - İstemci tarafında `.edu.tr`, şifre uzunluğu ve şifre eşleşme doğrulaması

### 🔄 Devam Eden Çalışmalar
- Formların backend'e bağlanması (Hafta 2)

### 🚧 Karşılaşılan Engeller
-

### 🎯 Gelecek Hafta Hedefleri
- `backend/src/routes/auth.js` ile kayıt/giriş endpoint'leri
- `db/init.sql` içine `sessions` / `tokens` tablosu
- `bcrypt` bağımlılığı için Arda ile koordinasyon

### 💬 Notlar
- Şema `docker-compose.yml` içindeki `campus_db` veritabanı ile uyumludur.

---

## 📅 Hafta 2 — 2026-11-01

### ✅ Bu Hafta Yapılanlar
- `backend/src/routes/auth.js` oluşturuldu
  - `POST /api/auth/register`: `.edu.tr` kontrolü, şifre uzunluğu, e-posta tekrar kontrolü (409), `bcrypt` ile hashleme
  - `POST /api/auth/login`: şifre doğrulama, başarılıysa rastgele oturum token'ı üretip `sessions` tablosuna kaydeder (24 saat geçerli)
  - Tüm sorgular parametreli (`$1`, `$2`), SQL injection'a karşı korumalı
  - try/catch ve uygun HTTP kodları (400, 401, 409, 500)
- `db/init.sql` güncellendi: `sessions` tablosu ve `user_id` index'i eklendi

### 🔄 Devam Eden Çalışmalar
- Uçtan uca test: Docker ve Node.js bu makinede kurulu olmadığı için henüz yapılamadı

### 🚧 Karşılaşılan Engeller
- `backend/src/db.js` henüz yok (Arda'nın görevi); `auth.js` ona bağlı
- Bilgisayarda sanallaştırma kapalı olduğu için Docker kurulumu bekliyor
- Node.js kurulu olmadığından kod sözdizimi kontrolü yapılamadı

### 🎯 Gelecek Hafta Hedefleri
- `backend/src/middleware/auth.js` (JWT doğrulama middleware'i)
- `messages` tablosu güncellemesi ve `index.html`'in token ile entegrasyonu

### 💬 Notlar
- Arda'dan istenenler: `package.json`'a `bcrypt` eklenmesi ve `server.js`'e `app.use('/api/auth', require('./routes/auth'))` satırının eklenmesi
- Token şimdilik `crypto.randomBytes` ile üretiliyor, 3. haftada JWT'ye geçilecek

---
