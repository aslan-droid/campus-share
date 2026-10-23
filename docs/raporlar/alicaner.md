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
