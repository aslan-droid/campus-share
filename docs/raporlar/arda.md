# 📝 Haftalık Rapor — Arda (Backend API)

## 📅 Hafta 1 — İskelet ve Temel Tasarımlar

### Yapılan İşler

| Görev | Dosya | Durum |
|-------|-------|-------|
| Express.js sunucu iskeleti kuruldu (port 5000) | `backend/src/server.js` | ✅ Tamamlandı |
| Bağımlılıklar tanımlandı (`express`, `pg`, `cors`, `dotenv`) | `backend/package.json` | ✅ Tamamlandı |
| Node.js Dockerfile yazıldı | `backend/Dockerfile` | ✅ Tamamlandı |
| `GET /api/health` sağlık kontrolü endpoint'i eklendi | `backend/src/server.js` | ✅ Tamamlandı |

### Teknik Notlar

- **Express.js** sunucusu `0.0.0.0:5000` üzerinde dinliyor (Docker uyumluluğu için).
- **CORS** middleware aktif — frontend'den gelen isteklere izin verilir.
- **JSON body parser** aktif — `POST` isteklerinde JSON veri alınabilir.
- **Dockerfile**, `node:20-alpine` base image kullanıyor. `package.json` önce kopyalanarak Docker layer cache'inden faydalanılıyor.
- `GET /api/health` endpoint'i sunucunun çalıştığını doğrulamak için kullanılır.

---

## 📅 Hafta 2 — Backend API Geliştirme ve DB Entegrasyonu

### Yapılan İşler

| Görev | Dosya | Durum |
|-------|-------|-------|
| PostgreSQL bağlantı havuzu oluşturuldu | `backend/src/db.js` | ✅ Tamamlandı |
| `GET /api/listings` — Tüm ilanları getir | `backend/src/routes/listings.js` | ✅ Tamamlandı |
| `POST /api/listings` — Yeni ilan ekle | `backend/src/routes/listings.js` | ✅ Tamamlandı |
| `GET /api/listings/:id` — Tek ilan getir | `backend/src/routes/listings.js` | ✅ Tamamlandı |
| `DELETE /api/listings/:id` — İlan sil | `backend/src/routes/listings.js` | ✅ Tamamlandı |
| Route'lar `server.js`'e bağlandı | `backend/src/server.js` | ✅ Tamamlandı |
| `bcrypt` bağımlılığı eklendi (Ali Caner koordinasyonu) | `backend/package.json` | ✅ Tamamlandı |

### Teknik Notlar

- **`db.js`**: `pg.Pool` kullanılarak bağlantı havuzu oluşturuldu. Docker bridge ağında `DB_HOST=db` ile PostgreSQL'e bağlanılır.
- **Listings CRUD**: Tüm endpoint'lerde `try/catch` ile hata yönetimi yapıldı. Foreign key hatası (`23503`) özel olarak yakalanıyor.
- **Kategori filtresi**: `GET /api/listings?category=Kitap` şeklinde query param ile filtreleme destekleniyor.
- **Kategori doğrulama**: Yalnızca `Elektronik`, `Kitap`, `Kıyafet`, `Diğer` değerleri kabul edilir.
- **Fiyat doğrulama**: Negatif fiyat kabul edilmez.
- **Ali Caner koordinasyonu**: `auth.js`'in kullandığı `bcrypt` paketi `package.json`'a eklendi.
- `db/init.sql` şemasıyla tam uyumlu çalışıyor (`listings` tablosu: `user_id`, `title`, `description`, `price`, `category`, `image_url`).

### API Endpoint Özeti

| Metod | Endpoint | Açıklama |
|-------|----------|----------|
| `GET` | `/api/health` | Sağlık kontrolü |
| `GET` | `/api/listings` | Tüm ilanları listele (opsiyonel `?category=` filtresi) |
| `GET` | `/api/listings/:id` | Tek ilan detayı |
| `POST` | `/api/listings` | Yeni ilan oluştur |
| `DELETE` | `/api/listings/:id` | İlan sil |
| `POST` | `/api/auth/register` | Kayıt ol (Ali Caner) |
| `POST` | `/api/auth/login` | Giriş yap (Ali Caner) |

### Sonraki Hafta Planı

- Mesaj endpoint'leri yazılacak → `backend/src/routes/messages.js`
- Nodemailer ile Mailpit SMTP entegrasyonu (`mailpit:1025`)
- Tüm endpoint'lere hata yönetimi gözden geçirilecek
