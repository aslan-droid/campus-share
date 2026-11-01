# 📋 Haftalık Rapor — Cuma

> Bu dosya her hafta Cuma günü güncellenir.

---

## 📅 Hafta 1 — 23 Ekim 2026

### ✅ Bu Hafta Yapılanlar

- `docker-compose.yml` oluşturuldu ve yapılandırıldı
  - Servisler: `frontend` (nginx:alpine, port 3000), `backend` (Node.js build, port 5000), `db` (postgres:15-alpine, port 5432), `mailpit` (port 8025/1025), `adminer` (port 8080)
  - Tüm servisler `campus-network` bridge ağına bağlandı
  - Konteynerler arası iletişim için servis isimleri kullanıldı (`DB_HOST=db`)
- `.gitignore` oluşturuldu
  - `node_modules/`, `.env`, `db/data/`, IDE ve OS dosyaları kapsama alındı
- GitHub reposu aktif: `https://github.com/aslan-droid/campus-share`
  - `main` branch koruma altında
  - Tüm değişiklikler commit edilip push edildi
- Proje iskelet yapısı kuruldu: `backend/src/`, `frontend/public/`, `db/`
- `README.md` güncellendi: proje özeti, kurulum komutları, bridge network mimarisi
- `GOREVLER.md` güncellendi: 4 haftalık görev dağılımı ve erişim kuralları

### 🔄 Devam Eden Çalışmalar

- Ekibin `docker compose up -d` ile ortamı tam çalışır hale getirmesi
- Branch koruma kuralları GitHub arayüzünden manuel olarak ayarlanmalı

### 🚧 Karşılaşılan Engeller

- `db` servisi `./db/init.sql` bekliyor (Ali Caner Hafta 1'de teslim etti ✅)
- `backend` servisi `Dockerfile` bekliyor (Arda Hafta 1'de teslim etti ✅)

### 🎯 Hafta 2 Hedefleri

- `.env.example` oluşturulacak
- `docker compose up -d` ile tüm servislerin ayağa kalkması doğrulanacak
- Adminer üzerinden DB bağlantısı test edilecek

### 💬 Notlar

- Ekip kuralı: `main`'e doğrudan commit atılmaz, her görev için `feature/` branch açılır.
- Konteynerler arası iletişimde `localhost` yasak — docker servis isimleri kullanılacak.

---

## 📅 Hafta 2 — 2 Kasım 2026

### ✅ Bu Hafta Yapılanlar

- `.env.example` oluşturuldu
  - Tüm ortam değişkenleri belgelendi: `PORT`, `DB_*`, `SMTP_*`, `SESSION_*`, `NODE_ENV`, `FRONTEND_URL`
  - `.gitignore`'da zaten `.env` hariç tutulmuş durumda
- Proje durumu değerlendirildi ve tüm PR'lar incelenerek merge edildi:
  - PR #5 — Ali Caner Hafta 2: `auth.js`, `sessions` tablosu ✅
  - PR #6 — Arda Hafta 2: `db.js`, `listings.js`, `server.js` güncellemesi ✅
- Hafta 2 kod inceleme notları:
  - `db.js`: `DB_HOST=db` doğru kullanılmış (docker bridge uyumlu)
  - `auth.js`: SQL injection koruması, bcrypt 10 round, hesap varlığı sızdırılmıyor
  - `listings.js`: Kategori doğrulama hem backend hem DB constraint'te mevcut
  - `package.json`: `bcrypt ^5.1.1` eklendi (Ali Caner'in Hafta 2 isteği)
- `docker compose up -d` ile servis sağlığı doğrulandı:
  - `frontend` → `http://localhost:3000` ✅
  - `backend` → `http://localhost:5000/api/health` ✅
  - `db` → Adminer `http://localhost:8080` üzerinden bağlantı doğrulandı ✅
  - `mailpit` → `http://localhost:8025` ✅
  - `adminer` → `http://localhost:8080` ✅

### 🔄 Devam Eden Çalışmalar

- Gamze ve Fatih'in frontend'i API'ye bağlaması bekleniyor
- Haftalık code review toplantısı organize edilecek

### 🚧 Karşılaşılan Engeller

- Ali Caner'in bilgisayarında sanallaştırma kapalı olduğu için Docker testi yapamıyor
- `auth.js` şimdilik `crypto.randomBytes` kullanıyor, Hafta 3'te JWT'ye geçilecek

### 🎯 Hafta 3 Hedefleri

- `nginx/nginx.conf` yapılandırması: `/api/*` → `backend:5000` yönlendirmesi
- GitHub Actions CI pipeline kurulumu
- Mailpit entegrasyonu doğrulanacak (backend'den test maili)

### 💬 Notlar

- Arda'nın `listings.js`'inde kategori doğrulaması uygulama seviyesinde de var
  (DB constraint + kod = çift güvence ✅)
- `auth.js`'in `db.js`'e bağımlılığı: `const pool = dbModule.pool || dbModule`
  ile çözülmüş, Arda ve Ali Caner koordineli çalışmış ✅

---

## 📅 Hafta 3 — (Gelecek)

*(Hafta 3 tamamlandığında burası güncellenecek.)*

---

## 📅 Hafta 4 — (Gelecek)

*(Hafta 4 tamamlandığında burası güncellenecek.)*
