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

### Sonraki Hafta Planı

- PostgreSQL bağlantı havuzu (`pg.Pool`) oluşturulacak → `backend/src/db.js`
- İlan CRUD endpoint'leri yazılacak → `backend/src/routes/listings.js`
- `db/init.sql` ile uyumluluk test edilecek
