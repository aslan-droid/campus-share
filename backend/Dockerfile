FROM node:20-alpine

WORKDIR /app

# Bağımlılıkları önce kopyala (Docker cache optimizasyonu)
COPY package*.json ./
RUN npm install --production

# Uygulama kaynak kodunu kopyala
COPY . .

# Backend portu
EXPOSE 5000

# Uygulamayı başlat
CMD ["node", "src/server.js"]
