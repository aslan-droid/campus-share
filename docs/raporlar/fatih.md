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

### 💬 Notlar
- Tailwind CSS CDN kullanıldı, harici bağımlılık yok
- `ilanlar.html`, `index.html` ve diğer yasak dosyalara dokunulmadı

---

## 📅 Hafta 2: 2026-11-03

### ✅ Bu Hafta Yapılanlar
- İlan ekleme formu `POST /api/listings`'e `fetch()` ile bağlandı
- Mesaj formu `POST /api/messages`'e hazırlandı (Arda ile koordineli)
- Oturum kontrolü eklendi: giriş yapılmamışsa formlar gizleniyor
- Kullanıcı bilgileri `localStorage`'dan mesaj formuna otomatik dolduruluyor
- Loading durumu ve gerçek API hata mesajları eklendi
- Çıkış butonu eklendi

### 💬 Notlar
- `localStorage` yapısı index.html ile tam uyumlu: `token` ve `user` anahtarları
- `/api/messages` listing_id bağlantısı Hafta 3'e bırakıldı

---

## 📅 Hafta 3: 2026-11-12

### ✅ Bu Hafta Yapılanlar
- **İlan detayı dinamik hale getirildi (Hafta 3 ana görevi) ✅**
  - `URLSearchParams` ile URL'deki `?id=` parametresi okunuyor
  - `GET /api/listings/:id` çağrılarak ilan detayı API'den çekiliyor
  - Başlık, açıklama, fiyat, kategori, satıcı adı, tarih ve görsel sayfaya dinamik yazılıyor
  - Yüklenme sırasında spinner gösteriliyor
  - İlan bulunamazsa (404 veya ID yok) kullanıcı dostu hata ekranı gösteriliyor
  - Sayfa başlığı (`<title>`) ilan adıyla güncelleniyor

- **Mesaj formu `listing_id` ile tam olarak bağlandı ✅**
  - `listing_id` artık URL'deki `?id=` parametresinden otomatik okunuyor
  - `POST /api/messages`'e `listing_id`, `sender_name`, `sender_email`, `body` gönderiliyor
  - Arda'nın `messages.js`'i e-posta gönderimi yapıyor; `email_sent` alanına göre kullanıcıya bilgi veriliyor
  - `listing_id` yoksa (doğrudan URL'den girilmişse) uyarı mesajı gösteriliyor

- Giriş yapılmamışsa mesaj kutusu gizleniyor, uyarı gösteriliyor ✅

### 🔄 Devam Eden Çalışmalar
- Hafta 4: Mobil uyumluluk kontrolü, demo senaryosu testi

### 🚧 Karşılaşılan Engeller
- Yok

### 🎯 Gelecek Hafta Hedefleri
- Mobil uyumluluk son kontrol
- Demo senaryosu: ilan ekle → detayı gör → mesaj gönder → Mailpit'te e-posta görün
- Form geri bildirimlerini gözden geçir

### 💬 Notlar
- Arda'nın `GET /api/listings/:id` endpoint'i `id, title, description, price, category, image_url, seller_name, seller_email, created_at` döndürüyor; tam uyumlu kullanıldı
- Arda'nın `POST /api/messages` endpoint'i `email_sent` alanı döndürüyor; kullanıcıya e-posta bildirimi hakkında bilgi veriliyor
- Yasak dosyalara (`ilanlar.html`, `index.html`, `backend/`, `db/`) dokunulmadı

---
