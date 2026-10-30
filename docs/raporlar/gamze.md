# 📋 Haftalık Rapor — Gamze

> Bu dosya her hafta Cuma günü güncellenir.

---

## 📅 Hafta 1: 2026-10-27

### ✅ Bu Hafta Yapılanlar
- `frontend/public/ilanlar.html` oluşturuldu (yalnızca Tailwind CSS CDN kullanılarak)
- İlan kartlarının listelendiği responsive vitrin sayfası tasarlandı (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`)
- Kategori filtre butonları eklendi: **Tümü**, **Elektronik**, **Kitap**, **Kıyafet**, **Diğer**
- Her ilan kartında ilan adı (başlık), fiyat, satıcı adı, yayın tarihi, kategori etiketi ve görsel bilgilerine yer verildi
- Kategori butonları için istemci taraflı filtreleme ve aktif ilan sayacı eklendi

### 🔄 Devam Eden Çalışmalar
- Hafta 2'de ilanların `GET /api/listings` endpoint'inden `fetch()` ile dinamik olarak çekilmesi
- Yüklenme animasyonu (spinner) ve backend query param ile kategori filtreleme entegrasyonu

### 🚧 Karşılaşılan Engeller
- Yok (Hafta 1 görevleri eksiksiz tamamlandı)

### 🎯 Gelecek Hafta Hedefleri
- `frontend/public/ilanlar.html` sayfasını `http://localhost:5000/api/listings` servisine bağlamak
- Veri çekilirken gösterilecek yüklenme animasyonu (spinner) eklemek
- Kategori filtrelerini backend API query parametreleriyle (`?category=...`) çalıştırmak

### 💬 Notlar
- Tüm tasarım kurallara uygun olarak yalnızca Tailwind CSS CDN (`https://cdn.tailwindcss.com`) ile hazırlandı, harici kütüphane kurulmadı.
- Yalnızca yetki dahilindeki `frontend/public/ilanlar.html` ve `docs/raporlar/gamze.md` dosyaları düzenlendi; diğer ekip üyelerinin dosyalarına dokunulmadı.

---
