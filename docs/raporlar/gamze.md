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

## 📅 Hafta 2: 2026-11-03

### ✅ Bu Hafta Yapılanlar
- `frontend/public/ilanlar.html` güncellendi: İlanlar `fetch()` kullanılarak `GET http://localhost:5000/api/listings` endpoint'inden dinamik olarak çekilecek şekilde bağlandı.
- Veri çekilirken kullanıcıya gösterilen yüklenme animasyonu (`#loading-spinner`) eklendi.
- Kategori filtre butonları (**Tümü**, **Elektronik**, **Kitap**, **Kıyafet**, **Diğer**) JavaScript ile aktif edilerek backend'e query parametresi (`GET http://localhost:5000/api/listings?category=<Kategori>`) gönderecek şekilde entegre edildi.
- Backend API yanıtındaki (`id`, `title`, `description`, `price`, `category`, `image_url`, `seller_name`, `created_at`) alanlarıyla tam uyumlu dinamik kart oluşturma (`createListingCard`) ve hata/boş liste durum yönetimi eklendi.

### 🔄 Devam Eden Çalışmalar
- Hafta 3'te giriş kontrolü (`localStorage` token kontrolü ile `index.html` yönlendirmesi), arama çubuğu ve navbar'a `profil.html` bağlantısının eklenmesi.

### 🚧 Karşılaşılan Engeller
- Yok (Hafta 2 görevleri tamamlandı)

### 🎯 Gelecek Hafta Hedefleri
- Giriş yapmamış kullanıcıları `index.html` sayfasına yönlendirmek
- Navbar'a "Profilim" (`profil.html`) bağlantısını eklemek
- Başlığa göre anlık filtreleme yapan arama çubuğu eklemek
- İlan kartlarındaki detay butonlarını `detay.html?id=<id>` yapısıyla tam entegre etmek

### 💬 Notlar
- Tarayıcı üzerinde çalışan frontend kodunda kurallara uygun olarak `http://localhost:5000/api/listings` adresi kullanıldı.
- Yalnızca sorumluluk alanındaki `frontend/public/ilanlar.html` ve `docs/raporlar/gamze.md` dosyaları güncellendi.

---
