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

## 📅 Hafta 3 — 2026-11-09

### ✅ Bu Hafta Yapılanlar
- `backend/src/middleware/auth.js` oluşturuldu
  - `Authorization: Bearer <token>` başlığı ayrıştırılarak veritabanındaki `sessions` tablosundan doğrulama yapıldı
  - Süresi dolmuş oturumlar otomatik olarak tespit edilip `401 Unauthorized` ile reddedildi ve temizlendi
  - Doğrulanan kullanıcı nesnesi `req.user` olarak sonraki middleware/endpoint'lere aktarıldı
- `backend/src/routes/auth.js` güncellendi
  - `GET /api/auth/me`: Auth middleware ile korunan, aktif kullanıcı ve oturum doğrulama endpoint'i eklendi
  - `POST /api/auth/logout`: Auth middleware ile korunan, aktif oturumu veritabanından güvenli silme endpoint'i eklendi
- `frontend/public/profil.html` oluşturuldu (Tailwind CSS CDN)
  - Kullanıcı kimlik kartı (Ad Soyad, üniversite e-postası, hesap ID'si, aktiflik durumu)
  - Yayındaki İlanlarım alanı: Kullanıcının ilanları dinamik olarak listelendi
  - İlan silme butonu: `DELETE /api/listings/:id` ile entegre edildi ve onaylı silme sağlandı
  - Güvenli çıkış yap butonu: `localStorage` temizliği ve sunucu oturumu sonlandırma ile entegre edildi
  - Oturum süresi dolunca otomatik `index.html` yönlendirmesi sağlandı
- `frontend/public/index.html` güncellendi
  - Halihazırda geçerli bir oturumu olan kullanıcıların doğrudan `ilanlar.html`'e yönlendirilmesi kontrolü eklendi
- `db/init.sql` güncellendi
  - `idx_listings_user_id` ve `idx_messages_listing_id` performans indeksleri eklendi

### 🔄 Devam Eden Çalışmalar
- 4. hafta hazırlıkları: Güvenlik gözden geçirmesi, seed data ve uçtan uca testler

### 🚧 Karşılaşılan Engeller
- Yok

### 🎯 Gelecek Hafta Hedefleri
- `db/init.sql` son gözden geçirme: index'ler, kısıtlamalar, seed data ekleme
- Kayıt akışını uçtan uca test etme
- Şifre sıfırlama akışı için "Şifremi Unuttum" bağlantısı ekleme (Mailpit üzerinden)
- Güvenlik denetimi ve son kontroller

### 💬 Notlar
- Arda'nın `GET /api/listings/user/:userId` endpoint'i beklenirken `profil.html` geriye dönük uyumlu olacak şekilde hem yeni endpoint'i hem de fallback olarak `/api/listings` filtrelemesini destekleyecek şekilde kodlandı.

---
