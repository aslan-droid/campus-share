# 🎓 CampusShare

Öğrencilerin kampüs içinde ders notu, etkinlik, kaynak ve ilan paylaşabildiği bir platform.

---

## 📋 Proje Özeti

CampusShare, üniversite öğrencilerinin `.edu.tr` uzantılı kurumsal e-posta adresleriyle giriş yaparak kampüs içi ikinci el eşya ilanı, ders notu ve duyuru paylaşabildiği bir web platformudur.

- **Frontend:** Nginx üzerinde servis edilen saf HTML + Tailwind CSS CDN
- **Backend:** Node.js (Express) REST API
- **Veritabanı:** PostgreSQL 15
- **E-posta Testi:** Mailpit
- **DB Yönetimi:** Adminer

---

## 🚀 Kurulum

### Ön Koşullar
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) kurulu olmalı

### Servisleri Başlat

```bash
# Repoyu klonla
git clone <repo-url>
cd campus-share

# Tüm konteynerleri arka planda ayağa kaldır
docker compose up -d

# Logları izle
docker compose logs -f
```

### Servisleri Durdur

```bash
docker compose down
```

---

## 🌐 Servisler & Portlar

| Servis       | URL                          | Açıklama                        |
|--------------|------------------------------|---------------------------------|
| **Frontend** | http://localhost:3000        | Nginx — Statik HTML arayüzü     |
| **Backend**  | http://localhost:5000        | Node.js REST API                |
| **Adminer**  | http://localhost:8080        | PostgreSQL yönetim arayüzü      |
| **Mailpit**  | http://localhost:8025        | E-posta test paneli             |
| **DB**       | localhost:5432               | PostgreSQL (campus_db)          |

---

## 🏗️ Bridge Network Mimarisi

Tüm servisler `campus-network` adlı Docker bridge ağı üzerinden haberleşir. Konteynerler birbirine `localhost` yerine **servis ismiyle** ulaşır:

```
┌─────────────────────────────────────────────────────┐
│                  campus-network (bridge)             │
│                                                     │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐   │
│   │ frontend │────▶│ backend  │────▶│    db    │   │
│   │  :3000   │     │  :5000   │     │  :5432   │   │
│   └──────────┘     └──────────┘     └──────────┘   │
│                         │                           │
│               ┌─────────┴─────────┐                 │
│               │                   │                 │
│         ┌─────▼────┐        ┌─────▼────┐            │
│         │ mailpit  │        │ adminer  │            │
│         │  :8025   │        │  :8080   │            │
│         └──────────┘        └──────────┘            │
└─────────────────────────────────────────────────────┘
```

> **Kural:** Konteyner içindeki kodda asla `localhost` kullanma.
> Örnek: Backend'den DB'ye bağlanmak için `DB_HOST=db` kullanılır.

---

## 📁 Klasör Yapısı

```
campus-share/
├── docker-compose.yml
├── README.md
├── GOREVLER.md
├── backend/
│   └── src/
│       └── server.js        # Node.js API giriş noktası
├── frontend/
│   └── public/
│       ├── index.html       # .edu.tr giriş ekranı
│       ├── ilanlar.html     # İlan vitrini
│       └── detay.html       # İlan detay & mesaj
├── db/
│   └── init.sql             # PostgreSQL başlangıç tabloları
└── docs/
    └── raporlar/
        ├── cuma.md
        ├── arda.md
        ├── alicaner.md
        ├── gamze.md
        └── fatih.md
```

---

## 📐 Geliştirme Kuralları

- HTML sayfalarında **yalnızca Tailwind CSS CDN** kullanılır; React veya başka framework kurulmaz.
- Konteynerler arası iletişimde **docker bridge servis isimleri** kullanılır (`localhost` yasak).
- Her geliştirici kendi **feature branch**'inde çalışır; `main`'e doğrudan commit atılmaz.
- `.env` ve secret dosyaları asla repoya eklenmez.

---

## 👥 Ekip & Roller

| İsim       | Rol              | Sorumluluk                        |
|------------|------------------|-----------------------------------|
| **Cuma**   | DevOps           | Docker, GitHub, ortam yönetimi    |
| **Arda**   | Backend API      | Node.js, Express, REST endpoint   |
| **Ali Caner** | DB & Auth     | PostgreSQL, giriş sayfası         |
| **Gamze**  | İlan Vitrini     | ilanlar.html, filtreler           |
| **Fatih**  | Detay & Mesaj    | detay.html, form, mesaj kutusu    |
