# Patroli.site - Sistem Manajemen Keamanan Aset & Patroli Satpam

Patroli.site adalah platform digital terintegrasi untuk manajemen keamanan properti, pengawasan patroli satpam real-time berbasis QR Code & GPS, pencatatan absensi anti-manipulasi, serta penanganan insiden darurat.

![Patroli.site Preview](./banner.png)

---

## 📸 Preview Dashboard & Mobile PWA

```
+-----------------------------------------------------------------------------------+
|  PATROLI.SITE ADMIN DASHBOARD                                     [Admin: Des] ⚙️ |
+-----------------------------------------------------------------------------------+
|  [Petugas Aktif: 12]   [Checkpoints: 48]   [Patroli Hari Ini: 86]   [Insiden: 0]  |
+-----------------------------------------------------------------------------------+
|  📍 PETA PATROLI REALTIME                |  📋 LIVE ACTIVITY FEED                 |
|  +------------------------------------+  |  [08:15] Budi S. scan Gerbang Depan    |
|  |   [Gedung A] 🟢                    |  |  [08:10] Andi P. scan Area Parkir B1   |
|  |             \                      |  |  [07:55] Rian K. Clock In (GPS OK)     |
|  |              🟢 [Basement 1]       |  |  [07:30] Sistem Backup Log OK          |
|  +------------------------------------+  +----------------------------------------+
+-----------------------------------------------------------------------------------+
|  PWA SATPAM: [📷 Scan QR] -> [📍 Validasi GPS <=30m] -> [🖼️ Auto-Watermark Foto]   |
+-----------------------------------------------------------------------------------+
```

---

## 🚀 Alur Kerja Sistem (System Workflow)

### 1. Alur Persiapan Titik Checkpoint (Admin)
1. **Pendaftaran Titik**: Admin mendaftarkan checkpoint (Nama, Gedung, Lantai, Zona, Koordinat GPS, dan Radius Toleransi).
2. **Generate & Cetak QR**: Sistem menghasilkan kode unik dan Admin dapat mencetak stiker QR (format thermal / A4) untuk ditempel di lokasi fisik.

### 2. Alur Patroli Lapangan (Petugas Satpam PWA)
1. **Clock-In**: Satpam melakukan absensi masuk berbasis geofencing GPS dan swafoto.
2. **Pemindaian Checkpoint**: Satpam memindai QR Code di titik lokasi menggunakan kamera HP.
3. **Validasi Geolocation (Haversine)**: Sistem memverifikasi jarak antara GPS perangkat satpam dengan koordinat checkpoint.
   - Jarak $\le 30\text{m}$ $\rightarrow$ Status **Verified**.
   - Jarak $> 30\text{m}$ $\rightarrow$ Status **Out of Range** (Peringatan & ditandai).
4. **Foto Bukti + Auto Watermark**: Kamera mengambil foto kondisi area dan otomatis menyematkan watermark: *Nama Sistem, Tanggal, Jam, ID Checkpoint, Koordinat Lat/Lng*.
5. **Offline Queue Sync**: Jika sinyal hilang di basement/area blank spot, rekaman patroli tersimpan di IndexedDB browser dan otomatis terkirim saat internet pulih.

### 3. Alur Darurat & Insiden
- **Panic Button**: Tombol darurat di PWA satpam yang memicu alarm dan mengirimkan titik koordinat langsung ke dashboard manajemen secara instan.
- **Pelaporan Insiden**: Form laporan temuan (kerusakan aset, pintu terbuka, ancaman) lengkap dengan lampiran foto dan level prioritas.

### 4. Alur Rekap & Ekspor Laporan (Admin)
- Admin dapat melihat rekapitulasi patroli harian/bulanan, performa rute, dan kepatuhan jadwal.
- Ekspor 1-klik ke format **CSV / Excel** dan **PDF Siap Cetak**.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Vite 6, Leaflet Maps, React Webcam, HTML5-QRCode.
- **PWA**: `vite-plugin-pwa`, Workbox, `idb-keyval` (IndexedDB offline store).
- **Backend**: Node.js, Express, Sequelize-ready DB architecture, SQLite (WAL) / PostgreSQL, JWT Auth & RBAC, Geofencing Formula (Haversine).

---

## 📋 Changelog

### Version 1.0.0 - [16 September 2026] - *MVP Release*
- **Backend API Integration**:
  - Implementasi REST API Express (`/api/v1/auth`, `/checkpoints`, `/patrols`, `/attendance`, `/incidents`, `/panic`, `/dashboard/metrics`).
  - Autentikasi JWT + Role Based Access Control (`admin`, `supervisor`, `petugas`).
  - Validasi Geofence berbasis formula jarak lingkaran besar (Haversine).
- **Mobile PWA & Field Operation**:
  - Integrasi kamera dengan generator watermark canvas otomatis (identitas, waktu, GPS).
  - Sinkronisasi offline queue via IndexedDB saat jaringan terputus.
- **Manajemen Checkpoint & Cetak Stiker**:
  - CRUD Checkpoint real-time ke database.
  - Preview & cetak stiker QR code fisik langsung dari browser.
- **Pelaporan & Ekspor**:
  - Live log monitoring.
  - Export laporan patroli ke format CSV dan PDF siap cetak.
- **Dokumentasi & QA**:
  - Penambahan User Manual Satpam, Admin Guide, API Reference, Test Plan, dan Matriks UAT (`UAT_PATROLI_MVP.md`).

---

## ⚙️ Quick Start & Local Setup

### 1. Menjalankan Backend API
```bash
cd patroli-api
npm install
node src/seed.js   # Inisialisasi DB & akun demo
npm start          # Berjalan di http://localhost:3000
```

### 2. Menjalankan Frontend PWA
```bash
cd patroli
npm install
npm run dev        # Berjalan di http://localhost:5173
```

### 3. Akun Demo Bawaan
- **Admin**: `admin@patroli.site` / Password: `12345678*#`
- **Petugas**: `petugas@patroli.site` / Password: `12345678*#`

---

## 📄 Lisensi
Hak Cipta © 2026 Patroli.site. Seluruh hak cipta dilindungi.
