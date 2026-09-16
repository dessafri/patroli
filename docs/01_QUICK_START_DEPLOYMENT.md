# Deployment & Quick Start Guide - Patroli.site

Panduan instalasi dan deployment platform **Patroli.site** untuk environment Self-Hosted (Bare Metal/VM), Docker Compose, dan Cloud Platform (Vercel / AWS / DigitalOcean).

---

## 1. System Requirements

### Hardware Minimum
- **CPU**: 2 vCPU / Cores
- **RAM**: 2 GB (Disarankan 4 GB untuk Docker multi-container)
- **Disk Storage**: 20 GB SSD
- **Network**: Port 80 (HTTP), 443 (HTTPS), 3000/5173 (App), 5432 (PostgreSQL/Supabase)

### Software & Environment
- **Node.js**: `v18.x` atau `v20.x LTS`
- **Package Manager**: `npm` v9+ / `pnpm` v8+ / `yarn` v1.22+
- **Docker Engine**: `v24.0+` & **Docker Compose**: `v2.20+`
- **Reverse Proxy**: Nginx / Caddy / Traefik
- **SSL Certificate**: Let's Encrypt Certbot / Cloudflare SSL

---

## 2. Environment Variables Configuration

Buat file `.env` di root direktori project:

```env
# APP CONFIGURATION
VITE_APP_NAME="Patroli.site"
VITE_APP_ENV="production"
VITE_APP_URL="https://patroli.site"

# API & BACKEND
VITE_API_BASE_URL="https://api.patroli.site/v1"
VITE_API_TIMEOUT=15000

# SUPABASE / DATABASE INTEGRATION (Opsional jika menggunakan Supabase)
VITE_SUPABASE_URL="https://xyzcompany.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# MAPS & GEOLOCATION
VITE_MAPBOX_TOKEN="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ..."
VITE_GEO_ACCURACY_THRESHOLD=50 # Toleransi akurasi GPS dalam meter

# PWA & NOTIFICATION
VITE_VAPID_PUBLIC_KEY="BEl62iUYgUivxIkv69yViEuiBIa..."
```

---

## 3. Quick Start (Local Development)

```bash
# 1. Clone repository
git clone https://github.com/patroli-site/patroli.git
cd patroli

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env

# 4. Run development server
npm run dev
```
Aplikasi berjalan pada: `http://localhost:5173`

---

## 4. Deployment Guides

### Opsi A: Docker & Docker Compose (Rekomendasi Self-Hosted)

#### 1. File `Dockerfile`
```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Web Server
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 2. File `nginx.conf`
```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache assets statis
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

#### 3. File `docker-compose.yml`
```yaml
version: '3.8'

services:
  patroli-frontend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: patroli_web
    restart: always
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    networks:
      - patroli_net

networks:
  patroli_net:
    driver: bridge
```

#### 4. Eksekusi Container:
```bash
docker compose up -d --build
```
Aplikasi aktif di `http://localhost:8080`.

---

### Opsi B: Linux Server Bare Metal / VM (Nginx + Let's Encrypt)

```bash
# 1. Build aplikasi production
npm run build

# 2. Pindahkan hasil build ke web directory
sudo mkdir -p /var/www/patroli
sudo cp -r dist/* /var/www/patroli/
sudo chown -R www-data:www-data /var/www/patroli

# 3. Konfigurasi Nginx (/etc/nginx/sites-available/patroli)
sudo nano /etc/nginx/sites-available/patroli
```

Konfigurasi virtual host:
```nginx
server {
    listen 80;
    server_name patroli.yourdomain.com;

    root /var/www/patroli;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
# 4. Enable site dan reload Nginx
sudo ln -s /etc/nginx/sites-available/patroli /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 5. Pasang SSL HTTPS via Certbot
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d patroli.yourdomain.com
```

---

### Opsi C: Cloud Deployment (Vercel / Netlify / Cloudflare Pages)

Proyek ini telah dilengkapi `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Deploy ke Vercel CLI:
```bash
# Install Vercel CLI & deploy
npm install -g vercel
vercel login
vercel --prod
```

---

## 5. Post-Deployment Verification Checklist

1. [ ] **Routing SPA**: Refresh browser pada halaman `/checkpoint` atau `/mobile/dashboard`, pastikan tidak menghasilkan error 404.
2. [ ] **HTTPS / SSL**: Wajib aktif untuk mengizinkan akses Geolocation API (GPS) dan Camera (Scanner QR) pada perangkat HP.
3. [ ] **PWA & Offline Capability**: Buka di Chrome/Safari mobile, cek prompt "Install App" / "Add to Home Screen" dan service worker caching.
4. [ ] **CORS API**: Pastikan backend mengizinkan origin domain web client.
