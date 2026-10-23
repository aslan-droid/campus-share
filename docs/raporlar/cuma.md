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
- Proje iskelet yapısı kuruldu:
  - `backend/src/`, `frontend/public/`, `db/` klasörleri oluşturuldu
  - `.gitkeep` dosyaları ile GitHub'a gönderildi
- `README.md` güncellendi: proje özeti, kurulum komutları, bridge network mimarisi, servis tablosu eklendi
- `GOREVLER.md` güncellendi: 4 haftalık görev dağılımı ve erişim kuralları tüm ekip için tanımlandı

### 🔄 Devam Eden Çalışmalar

- Ekibin `docker compose up -d` ile ortamı ayağa kaldırması bekleniyor (`db/init.sql` ve `backend/Dockerfile` olmadan `backend` ve `db` servisleri henüz tam çalışmıyor)
- Branch koruma kuralları GitHub arayüzünden manuel olarak ayarlanmalı (PR zorunluluğu, en az 1 onay)

### 🚧 Karşılaşılan Engeller

- `db` servisi `./db/init.sql` dosyasını bekliyor; Ali Caner bu dosyayı oluşturana kadar `db` konteyneri hata verecek
- `backend` servisi `./backend/Dockerfile` olmadan build edilemiyor; Arda Hafta 1'de bu dosyayı oluşturacak

### 🎯 Hafta 2 Hedefleri

- `.env.example` dosyasını oluştur (tüm ortam değişkenlerini belgele)
- `docker compose up -d` ile tüm servislerin sağlıklı (`healthy`) ayağa kalktığını doğrula
- Adminer üzerinden veritabanı bağlantısını test et (`campus_db`)
- Haftalık code review toplantısını organize et

### 💬 Notlar

- Ekip kuralı: `main`'e doğrudan commit atılmaz. Her görev için `feature/<açıklama>` branch'i açılır.
- Konteynerler arası iletişimde `localhost` kullanımı yasak — docker servis isimleri (`db`, `backend`, `mailpit`) kullanılacak.
- HTML sayfalarında yalnızca **Tailwind CSS CDN** kullanılacak, React veya başka kütüphane kurulmayacak.

---

## 📅 Hafta 2 — (Gelecek)

*(Hafta 2 tamamlandığında burası güncellenecek.)*

---

## 📅 Hafta 3 — (Gelecek)

*(Hafta 3 tamamlandığında burası güncellenecek.)*

---

## 📅 Hafta 4 — (Gelecek)

*(Hafta 4 tamamlandığında burası güncellenecek.)*
