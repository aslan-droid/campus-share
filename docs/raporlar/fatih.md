# 📋 Haftalık Rapor — Fatih

> Bu dosya her hafta Cuma günü güncellenir.

---

## 📅 Hafta 1: 2026-10-23

### ✅ Bu Hafta Yapılanlar
- `frontend/public/detay.html` oluşturuldu (Tailwind CSS CDN ile)
- İlan detay kartı tasarlandı (başlık, açıklama, fiyat, kategori, satıcı, tarih, görsel)
- İlan ekleme formu eklendi: başlık, açıklama, fiyat, kategori, görsel URL alanları
- Satıcıya mesaj kutusu eklendi: isim, e-posta, mesaj alanları
- Her iki form için istemci taraflı doğrulama (boş alan, negatif fiyat, e-posta format kontrolü)
- Başarılı/hatalı gönderim sonrası toast bildirimi eklendi

### 🔄 Devam Eden Çalışmalar
- Hafta 2'de `POST /api/listings` ve `POST /api/messages` için `fetch()` bağlantıları eklenecek
- Hafta 3'te URL'deki `?id=` parametresi okunarak `GET /api/listings/:id` çağrılacak

### 🚧 Karşılaşılan Engeller
- Yok (Hafta 1 görevi tamamlandı)

### 🎯 Gelecek Hafta Hedefleri
- Arda'nın backend endpoint'leri hazır olunca form gönderimlerini gerçek API'ye bağla
- Başarı/hata toast mesajlarını API yanıtına göre özelleştir
- Giriş yapılmamış kullanıcı için mesaj kutusunu gizleme mantığı ekle (JWT kontrolü)

### 💬 Notlar
- Tüm tasarım Tailwind CSS CDN (`https://cdn.tailwindcss.com`) ile yapıldı, harici bağımlılık yok
- Hafta 2/3 için `fetch()` kodları yorum satırı olarak bırakıldı, kolayca aktif edilebilir
- `ilanlar.html`, `index.html` ve diğer yasak dosyalara kesinlikle dokunulmadı

---
