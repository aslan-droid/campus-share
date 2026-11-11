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

---

## 📅 Hafta 3 — Entegrasyon, Mesajlaşma ve E-posta

### Yapılan İşler

| Görev | Dosya | Durum |
|-------|-------|-------|
| Mesajlaşma rotaları oluşturuldu | `backend/src/routes/messages.js` | ✅ Tamamlandı |
| `POST /api/messages` — Mesaj kaydetme ve Mailpit e-posta bildirimi | `backend/src/routes/messages.js` | ✅ Tamamlandı |
| `GET /api/messages/:listingId` — İlana ait mesajları listeleme | `backend/src/routes/messages.js` | ✅ Tamamlandı |
| `GET /api/listings/user/:userId` — Kullanıcının kendi ilanlarını getirme | `backend/src/routes/listings.js` | ✅ Tamamlandı |
| Base64 data URL formatında cihazdan görsel yükleme desteği | `backend/src/routes/listings.js` & `server.js` | ✅ Tamamlandı |
| `nodemailer` kütüphanesi ile Mailpit SMTP entegrasyonu (`mailpit:1025`) | `backend/src/routes/messages.js` & `package.json` | ✅ Tamamlandı |
| Mesaj rotası ana sunucuya bağlandı (`/api/messages`) | `backend/src/server.js` | ✅ Tamamlandı |
| JSON gövde sınırı (payload limit) 10MB'a çıkarıldı | `backend/src/server.js` | ✅ Tamamlandı |

### Teknik Notlar

- **Nodemailer & Mailpit Entegrasyonu:**
  - `mailpit:1025` SMTP sunucusu üzerinden e-posta gönderimi sağlandı (`SMTP_HOST=mailpit`, `SMTP_PORT=1025`).
  - Bir ilana mesaj gönderildiğinde satıcının e-posta adresi otomatik olarak çekilip zengin HTML & düz metin e-posta formatında bildirim gönderilir.
  - SMTP bağlantı hatası olsa dahi mesaj veritabanına kaydedilir ve kullanıcıya bilgilendirici yanıt (`email_warning`) döndürülür; sistem kesintiye uğramaz.
- **Kullanıcı Profil İlanları:**
  - `GET /api/listings/user/:userId` endpoint'i eklendi. Çakışmayı önlemek amacıyla rota `:id` parametresinden önce konumlandırıldı.
- **Cihazdan Görsel Yükleme (Base64):**
  - Express gövde limiti (`limit: '10mb'`) artırılarak kullanıcıların cihazlarından seçtiği base64 veri formatındaki görsellerin sorunsuz yüklenmesi sağlandı.
  - `image_url` ve `image` alanları geriye dönük uyumlu olarak desteklendi.
- **Hata Yönetimi & Güvenlik:**
  - Tüm endpoint'lerde try/catch blokları, parametre validasyonları (e-posta formatı, zorunlu alanlar, sayısal ID kontrolleri) ve uygun HTTP durum kodları (200, 201, 400, 404, 500) uygulandı.

### API Endpoint Özeti (Güncel)

| Metod | Endpoint | Açıklama |
|-------|----------|----------|
| `GET` | `/api/health` | Sağlık kontrolü |
| `GET` | `/api/listings` | Tüm ilanları listele (opsiyonel `?category=` filtresi) |
| `GET` | `/api/listings/user/:userId` | Kullanıcıya ait ilanları listele (Profil sayfası) |
| `GET` | `/api/listings/:id` | Tek ilan detayı |
| `POST` | `/api/listings` | Yeni ilan oluştur (URL veya Base64 görsel) |
| `DELETE` | `/api/listings/:id` | İlan sil |
| `POST` | `/api/messages` | İlana mesaj gönder & Mailpit e-posta tetikle |
| `GET` | `/api/messages/:listingId` | İlana ait mesajları listele |
| `POST` | `/api/auth/register` | Kayıt ol (Ali Caner) |
| `POST` | `/api/auth/login` | Giriş yap (Ali Caner) |
| `GET` | `/api/auth/me` | Giriş yapmış kullanıcı bilgisi (Ali Caner) |
| `POST` | `/api/auth/logout` | Çıkış yap (Ali Caner) |

### Sonraki Hafta Planı (Hafta 4)

- API endpoint'lerinin dokümantasyonu (`docs/api.md`) hazırlanacak
- İlan listelemede sayfalama (`?page=&limit=`) desteği eklenecek
- API istekleri için rate limiting (aşırı istek koruması) uygulanacak
- Sunum ve canlıya alma için tüm servisler uçtan uca test edilecek
