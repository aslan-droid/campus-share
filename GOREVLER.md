# CampusShare — 4 Haftalık Görev Dağılımı ve Erişim Kuralları

> **Genel Kurallar:**
> - HTML sayfalarında **yalnızca Tailwind CSS CDN** kullanılır. React veya başka kütüphane kurulmaz.
> - Konteynerler arası iletişimde `localhost` yerine **docker bridge servis isimleri** kullanılır (`db`, `backend`, `mailpit`).
> - Her kişi **yalnızca kendi erişim listesindeki dosyalara** dokunur. Başkasının dosyasına PR açılmaz.
> - Her hafta sonu `docs/raporlar/<isim>.md` dosyası güncellenir.
> - `main` branch'e doğrudan commit atılmaz; her görev için ayrı `feature/` branch açılır.

---

## 📅 HAFTA 1 — İskelet ve Temel Tasarımlar

### 🔵 Cuma (DevOps)
**Görevler:**
- `docker-compose.yml` dosyasını tamamla ve test et
- GitHub reposunu oluştur, branch koruma kurallarını ayarla (`main` branch'i koru)
- `.gitignore` dosyasını oluştur (`node_modules/`, `.env`, `db/data/` vb.)
- Tüm ekibin repoyu klonlayıp `docker compose up -d` yapabildiğini doğrula

**✅ Erişebileceği Dosyalar:**
```
docker-compose.yml
.gitignore
README.md
docs/raporlar/cuma.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
backend/src/
frontend/public/
db/init.sql
```

---

### 🟢 Arda (Backend API)
**Görevler:**
- `backend/src/server.js` — Express.js sunucu iskeleti kur (port 5000)
- `backend/package.json` — bağımlılıkları tanımla (`express`, `pg`, `cors`, `dotenv`)
- `backend/Dockerfile` — Node.js için Dockerfile yaz
- Sağlık kontrolü için `GET /api/health` endpoint'ini ekle

**✅ Erişebileceği Dosyalar:**
```
backend/src/server.js        ← OLUŞTUR
backend/package.json         ← OLUŞTUR
backend/Dockerfile           ← OLUŞTUR
docs/raporlar/arda.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
frontend/public/
db/init.sql
```

---

### 🟡 Ali Caner (DB & Auth)
**Görevler:**
- `db/init.sql` — PostgreSQL tablo şemalarını oluştur (`users`, `listings`, `messages`)
- `frontend/public/index.html` — `.edu.tr` e-posta ile giriş/kayıt arayüzü (Tailwind CSS)

**✅ Erişebileceği Dosyalar:**
```
db/init.sql                           ← OLUŞTUR
frontend/public/index.html            ← OLUŞTUR
docs/raporlar/alicaner.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
backend/src/server.js
frontend/public/ilanlar.html
frontend/public/detay.html
```

---

### 🟠 Gamze (İlan Vitrini)
**Görevler:**
- `frontend/public/ilanlar.html` — İlan kartlarının listelendiği vitrin sayfası
- Kategori filtre butonları (Elektronik, Kitap, Kıyafet, Diğer)
- Her kart: ilan adı, fiyat, satıcı, tarih bilgilerini göstermeli
- Tüm tasarım Tailwind CSS CDN ile yapılacak

**✅ Erişebileceği Dosyalar:**
```
frontend/public/ilanlar.html          ← OLUŞTUR
docs/raporlar/gamze.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
backend/src/
db/init.sql
frontend/public/index.html
frontend/public/detay.html
```

---

### 🔴 Fatih (Detay & Mesaj)
**Görevler:**
- `frontend/public/detay.html` — İlan detay sayfası
- İlan ekleme formu (başlık, açıklama, fiyat, kategori, görsel URL)
- Satıcıya mesaj kutusu (isim, e-posta, mesaj alanları)
- Tüm tasarım Tailwind CSS CDN ile yapılacak

**✅ Erişebileceği Dosyalar:**
```
frontend/public/detay.html            ← OLUŞTUR
docs/raporlar/fatih.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
backend/src/
db/init.sql
frontend/public/index.html
frontend/public/ilanlar.html
```

---
---

## 📅 HAFTA 2 — Backend API Geliştirme ve DB Entegrasyonu

### 🔵 Cuma (DevOps)
**Görevler:**
- Ortam değişkenlerini yönet: `.env.example` dosyasını oluştur
- `docker compose` ile tüm servislerin sağlıklı ayağa kalktığını CI ortamında doğrula
- Adminer üzerinden veritabanı bağlantısını test et
- Haftalık ekip code review toplantısını organize et

**✅ Erişebileceği Dosyalar:**
```
.env.example                 ← OLUŞTUR
docker-compose.yml
README.md
docs/raporlar/cuma.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
backend/src/
frontend/public/
db/init.sql
```

---

### 🟢 Arda (Backend API)
**Görevler:**
- `backend/src/routes/listings.js` — İlan CRUD endpoint'leri yaz
  - `GET /api/listings` — tüm ilanları getir
  - `POST /api/listings` — yeni ilan ekle
  - `GET /api/listings/:id` — tek ilan getir
  - `DELETE /api/listings/:id` — ilan sil
- `backend/src/db.js` — PostgreSQL bağlantı havuzu (`pg.Pool`)
- `db/init.sql` ile uyumlu çalıştığını test et

**✅ Erişebileceği Dosyalar:**
```
backend/src/server.js
backend/src/routes/listings.js        ← OLUŞTUR
backend/src/db.js                     ← OLUŞTUR
docs/raporlar/arda.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
frontend/public/
db/init.sql
```

---

### 🟡 Ali Caner (DB & Auth)
**Görevler:**
- `backend/src/routes/auth.js` — Kayıt ve giriş endpoint'leri
  - `POST /api/auth/register` — `.edu.tr` e-posta kontrolü ile kayıt
  - `POST /api/auth/login` — Kullanıcı doğrulama
- `db/init.sql` güncellemesi: `sessions` veya `tokens` tablosu ekle
- Şifre hashleme için `bcrypt` bağımlılığını `package.json`'a eklemesi için Arda ile koordine ol

**✅ Erişebileceği Dosyalar:**
```
db/init.sql
backend/src/routes/auth.js            ← OLUŞTUR
docs/raporlar/alicaner.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
frontend/public/
backend/src/server.js
backend/src/routes/listings.js
```

---

### 🟠 Gamze (İlan Vitrini)
**Görevler:**
- `frontend/public/ilanlar.html` güncelle: ilanları `GET /api/listings`'den `fetch()` ile çek
- Yüklenme animasyonu (spinner) ekle
- Kategori filtresini JavaScript ile aktif et (backend'e query param gönder)
- `backend` servisine `http://localhost:5000` yerine `docker-compose`'daki servis adını **değil**, tarayıcıdan erişeceği için `http://localhost:5000` kullan *(frontend HTML tarayıcıda çalışır)*

**✅ Erişebileceği Dosyalar:**
```
frontend/public/ilanlar.html
docs/raporlar/gamze.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
backend/src/
db/init.sql
frontend/public/index.html
frontend/public/detay.html
```

---

### 🔴 Fatih (Detay & Mesaj)
**Görevler:**
- `frontend/public/detay.html` güncelle: form `POST /api/listings`'e `fetch()` ile veri göndersin
- Mesaj kutusunu `POST /api/messages`'e bağla (Arda ile koordine ol)
- Form doğrulama: boş alan bırakılamaz, fiyat sayısal olmalı
- Başarılı gönderim sonrası kullanıcıya bildirim göster (toast mesajı)

**✅ Erişebileceği Dosyalar:**
```
frontend/public/detay.html
docs/raporlar/fatih.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
backend/src/
db/init.sql
frontend/public/index.html
frontend/public/ilanlar.html
```

---
---

## 📅 HAFTA 3 — Entegrasyon, Mesajlaşma ve E-posta

### 🔵 Cuma (DevOps)
**Görevler:**
- Tüm servislerin birbirleriyle konuştuğunu uçtan uca test et
- `nginx.conf` yapılandırması: `/api/*` isteklerini `backend:5000`'e yönlendir
- Mailpit entegrasyonunu doğrula (backend'den test maili gönder)
- GitHub Actions ile basit CI pipeline kur (lint + build)

**✅ Erişebileceği Dosyalar:**
```
docker-compose.yml
nginx/nginx.conf                      ← OLUŞTUR
.github/workflows/ci.yml              ← OLUŞTUR
docs/raporlar/cuma.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
backend/src/routes/
frontend/public/
db/init.sql
```

---

### 🟢 Arda (Backend API)
**Görevler:**
- `backend/src/routes/messages.js` — Mesaj endpoint'leri
  - `POST /api/messages` — mesaj kaydet ve Mailpit ile e-posta gönder
  - `GET /api/messages/:listingId` — ilana ait mesajları getir
- `nodemailer` ile Mailpit SMTP entegrasyonu (`mailpit:1025`)
- Tüm endpoint'lere basit hata yönetimi ekle (try/catch + uygun HTTP kodları)

**✅ Erişebileceği Dosyalar:**
```
backend/src/server.js
backend/src/routes/messages.js        ← OLUŞTUR
backend/src/routes/listings.js
backend/src/db.js
docs/raporlar/arda.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
frontend/public/
db/init.sql
```

---

### 🟡 Ali Caner (DB & Auth)
**Görevler:**
- `backend/src/middleware/auth.js` — JWT doğrulama middleware'i
- `db/init.sql` güncellemesi: `messages` tablosunu ekle
- Giriş yapan kullanıcıya JWT token döndür, `localStorage`'a kaydetmek için `index.html`'i güncelle
- Token süresi dolunca otomatik çıkış yaptır

**✅ Erişebileceği Dosyalar:**
```
db/init.sql
backend/src/middleware/auth.js        ← OLUŞTUR
backend/src/routes/auth.js
frontend/public/index.html
docs/raporlar/alicaner.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
frontend/public/ilanlar.html
frontend/public/detay.html
backend/src/routes/listings.js
backend/src/routes/messages.js
```

---

### 🟠 Gamze (İlan Vitrini)
**Görevler:**
- `frontend/public/ilanlar.html` güncelle: kullanıcı giriş yapmamışsa `index.html`'e yönlendir
- Arama çubuğu ekle (başlığa göre anlık filtreleme)
- İlan kartına "Detayı Gör" butonu ekle → `detay.html?id=<id>` şeklinde yönlendir
- Boş ilan listesi için kullanıcı dostu mesaj göster

**✅ Erişebileceği Dosyalar:**
```
frontend/public/ilanlar.html
docs/raporlar/gamze.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
backend/src/
db/init.sql
frontend/public/index.html
frontend/public/detay.html
```

---

### 🔴 Fatih (Detay & Mesaj)
**Görevler:**
- `frontend/public/detay.html` güncelle: URL'deki `?id=` parametresini okuyarak `GET /api/listings/:id` çağır
- İlan detaylarını dinamik olarak sayfaya yaz
- Mesaj formu gönderimini `POST /api/messages`'e bağla
- Giriş yapılmamışsa mesaj kutusunu gizle ve uyarı göster

**✅ Erişebileceği Dosyalar:**
```
frontend/public/detay.html
docs/raporlar/fatih.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
backend/src/
db/init.sql
frontend/public/index.html
frontend/public/ilanlar.html
```

---
---

## 📅 HAFTA 4 — Canlıya Alma Hazırlığı ve Sunum

### 🔵 Cuma (DevOps)
**Görevler:**
- `docker compose down && docker compose up -d` ile temiz başlatma testini yap
- Tüm ortam değişkenlerini `.env.example` üzerinden dokümante et
- `README.md`'yi son haliye güncelle (kurulum + ekran görüntüleri)
- Sunum için demo ortamını hazırla, tüm servislerinin ayakta olduğunu doğrula

**✅ Erişebileceği Dosyalar:**
```
docker-compose.yml
.env.example
README.md
docs/raporlar/cuma.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
backend/src/
frontend/public/
db/init.sql
```

---

### 🟢 Arda (Backend API)
**Görevler:**
- Tüm API endpoint'lerini Postman / Thunder Client ile test et ve belgeye dök
- `backend/src/routes/listings.js` güncelle: sayfalama (`?page=&limit=`) ekle
- Rate limiting ekle (aşırı istek koruması)
- API dokümantasyonunu `docs/api.md` olarak yaz

**✅ Erişebileceği Dosyalar:**
```
backend/src/
docs/api.md                           ← OLUŞTUR
docs/raporlar/arda.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
frontend/public/
db/init.sql
```

---

### 🟡 Ali Caner (DB & Auth)
**Görevler:**
- `db/init.sql` son gözden geçirme: index'ler, kısıtlamalar, seed data ekle
- Kayıt akışını uçtan uca test et: `.edu.tr` e-posta zorunluluğu çalışıyor mu?
- Şifre sıfırlama akışı için `frontend/public/index.html`'e "Şifremi Unuttum" bağlantısı ekle (Mailpit üzerinden)
- Güvenlik gözden geçirmesi: SQL injection koruması, bcrypt round sayısı

**✅ Erişebileceği Dosyalar:**
```
db/init.sql
backend/src/routes/auth.js
backend/src/middleware/auth.js
frontend/public/index.html
docs/raporlar/alicaner.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
frontend/public/ilanlar.html
frontend/public/detay.html
backend/src/routes/listings.js
backend/src/routes/messages.js
```

---

### 🟠 Gamze (İlan Vitrini)
**Görevler:**
- `frontend/public/ilanlar.html` son tasarım cilalaması: mobil uyumluluk kontrolü
- Kategori filtresinin URL query param ile çalıştığını doğrula (`?kategori=Kitap`)
- Sayfalama UI'ı ekle (Önceki / Sonraki butonları)
- Sunum için örnek ilan verilerinin ekranda düzgün göründüğünü kontrol et

**✅ Erişebileceği Dosyalar:**
```
frontend/public/ilanlar.html
docs/raporlar/gamze.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
backend/src/
db/init.sql
frontend/public/index.html
frontend/public/detay.html
```

---

### 🔴 Fatih (Detay & Mesaj)
**Görevler:**
- `frontend/public/detay.html` son tasarım cilalaması: mobil uyumluluk kontrolü
- İlan ekleme formu için başarılı/hatalı durum geri bildirimlerini gözden geçir
- Mesaj gönderildikten sonra Mailpit'te e-postanın göründüğünü doğrula
- Sunum için demo senaryosunu (ilan ekle → detayı gör → mesaj gönder) test et

**✅ Erişebileceği Dosyalar:**
```
frontend/public/detay.html
docs/raporlar/fatih.md
```

**🚫 Dokunmayacağı Dosyalar:**
```
docker-compose.yml
backend/src/
db/init.sql
frontend/public/index.html
frontend/public/ilanlar.html
```

---

## 📊 Genel Dosya Sahipliği Özeti

| Dosya / Klasör | Cuma | Arda | Ali Caner | Gamze | Fatih |
|---|:---:|:---:|:---:|:---:|:---:|
| `docker-compose.yml` | ✅ | 🚫 | 🚫 | 🚫 | 🚫 |
| `.gitignore` / `.env.example` | ✅ | 🚫 | 🚫 | 🚫 | 🚫 |
| `README.md` | ✅ | 🚫 | 🚫 | 🚫 | 🚫 |
| `backend/src/server.js` | 🚫 | ✅ | 🚫 | 🚫 | 🚫 |
| `backend/src/routes/listings.js` | 🚫 | ✅ | 🚫 | 🚫 | 🚫 |
| `backend/src/routes/auth.js` | 🚫 | 🚫 | ✅ | 🚫 | 🚫 |
| `backend/src/routes/messages.js` | 🚫 | ✅ | 🚫 | 🚫 | 🚫 |
| `backend/src/middleware/auth.js` | 🚫 | 🚫 | ✅ | 🚫 | 🚫 |
| `db/init.sql` | 🚫 | 🚫 | ✅ | 🚫 | 🚫 |
| `frontend/public/index.html` | 🚫 | 🚫 | ✅ | 🚫 | 🚫 |
| `frontend/public/ilanlar.html` | 🚫 | 🚫 | 🚫 | ✅ | 🚫 |
| `frontend/public/detay.html` | 🚫 | 🚫 | 🚫 | 🚫 | ✅ |
| `nginx/nginx.conf` | ✅ | 🚫 | 🚫 | 🚫 | 🚫 |
| `docs/raporlar/<isim>.md` | ✅ | ✅ | ✅ | ✅ | ✅ |
