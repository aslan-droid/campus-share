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

## 📅 Hafta 2: 2026-11-03

### ✅ Bu Hafta Yapılanlar
- `frontend/public/detay.html` güncellendi — gerçek API bağlantıları eklendi
- İlan ekleme formu `POST /api/listings`'e `fetch()` ile bağlandı
  - `user_id`, `title`, `description`, `price`, `category`, `image_url` gönderiliyor
  - `Authorization: Bearer <token>` başlığı eklendi (index.html'in localStorage'ına uyumlu)
- Mesaj formu `POST /api/messages`'e hazırlandı (Arda ile koordineli; endpoint gelince aktif)
  - `sender_name`, `sender_email`, `body` alanları gönderiliyor
  - Listing ID Hafta 3'te URL'den okunacak şekilde yorum satırı olarak hazır bırakıldı
- Form doğrulama genişletildi: boş alan, negatif fiyat, e-posta format kontrolü ✅
- Toast bildirimleri: başarı/hata durumu API yanıtına göre dinamik ✅
- **Oturum kontrolü eklendi:**
  - Giriş yapılmamışsa ilan ekleme formu gizleniyor
  - Giriş yapılmamışsa mesaj kutusu yerine uyarı gösteriliyor
  - Giriş yapılmışsa kullanıcı adı nav'da görünüyor
  - Kullanıcı bilgileri (isim, e-posta) mesaj formuna otomatik dolduruluyor
- Çıkış butonu eklendi (localStorage temizleyip index.html'e yönlendirir)
- Buton yükleme durumu eklendi (disabled + "Gönderiliyor..." metni)

### 🔄 Devam Eden Çalışmalar
- `POST /api/messages` endpoint'i Arda tarafından hazırlanıyor (Hafta 3)
- Hafta 3'te `GET /api/listings/:id` ile URL'deki `?id=` parametresi okunacak

### 🚧 Karşılaşılan Engeller
- `/api/messages` endpoint'i henüz backend'de yazılmadı; form hazır, bağlantı Hafta 3'te tamamlanacak

### 🎯 Gelecek Hafta Hedefleri
- URL'deki `?id=` parametresini okuyarak `GET /api/listings/:id` çağır
- İlan detaylarını API'den dinamik olarak sayfaya yaz
- Mesaj formunu `POST /api/messages`'e tam olarak bağla
- Giriş kontrolünü `listing_id` ile birleştir

### 💬 Notlar
- `localStorage` yapısı index.html ile tam uyumlu: `token` ve `user` (JSON) anahtarları kullanıldı
- `POST /api/listings` için gereken `user_id` alanı `localStorage`'daki `user.id`'den alınıyor
- Yasak dosyalara (`ilanlar.html`, `index.html`, `backend/`, `db/`) dokunulmadı

---
