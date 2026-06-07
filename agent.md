# Patroli.site - Project Knowledge Base (Agent Documentation)

Dokumen ini berfungsi sebagai pusat pengetahuan (*knowledge base*) bagi AI/Agent yang bekerja dalam repositori ini. Dokumen ini merangkum *tech stack*, arsitektur modul, dan fitur-fitur yang telah diselesaikan.

## 1. Tech Stack

Proyek ini menggunakan ekosistem *frontend* modern:
- **Core:** React 18, TypeScript, Vite
- **Styling:** TailwindCSS (dengan utilitas khusus untuk efek *glassmorphism* dan animasi UI)
- **Routing:** React Router v7 (`react-router`)
- **PWA / Offline:** `vite-plugin-pwa`, `idb-keyval` (IndexedDB Promise wrapper)
- **Kamera & Pemindaian:** `html5-qrcode` (Scan QR), `react-webcam` (Live WebRTC Camera), HTML5 Canvas API (Watermarking)
- **Geospasial / Peta:** `leaflet`, `react-leaflet`, `leaflet.heat` (Heatmap & Custom Animated Markers)
- **UI / Interaksi:** `sweetalert2` (Pop-up Alerts)

## 2. Arsitektur & Modul Aplikasi

Aplikasi ini dibagi menjadi dua modul antarmuka utama yang diikat oleh sistem *routing* terpusat (`src/App.tsx`):

### A. Modul Admin Dashboard (`/`, Layout: `AppSidebar` + `Header`)
Ditujukan untuk pengawas/supervisor (layar besar/desktop).
- **Struktur:** Sidebar di sebelah kiri (menu navigasi) dan area konten utama.
- **Pendekatan Desain:** Premium *Dashboard*, penggunaan kartu KPI dengan *blob decoration*, dan tampilan informasi padat (*Command Center*).

### B. Modul PWA Mobile (`/mobile`, Layout: `MobileLayout`)
Ditujukan untuk petugas patroli di lapangan (layar kecil/smartphone).
- **Struktur:** Aplikasi bergaya *native* dengan *Bottom Navigation Bar*.
- **Konteks Khusus:** Terbungkus dalam `OfflineQueueProvider` yang selalu memonitor status koneksi internet. Jika internet mati, sebuah *banner* kuning peringatan akan otomatis merender di atas area konten.

## 3. Fitur yang Telah Diselesaikan (Hingga Akhir FASE 3)

Proyek ini dikembangkan melalui beberapa fase (Sprint). Berikut adalah hasil yang telah dirampungkan:

### FASE 1: Fondasi & UI Dasar (Sprint 1-3)
- [x] **Setup Proyek & Routing:** Inisialisasi Vite + React Router.
- [x] **Desain Sistem (*Aesthetic*):** Membangun komponen UI (*buttons*, *inputs*, *cards*) dengan standar desain premium (warna HSL, radius tumpul, efek transparan/gelas).
- [x] **Layout & Navigasi:** Implementasi kerangka Admin Sidebar dan PWA Bottom Nav.
- [x] **Halaman Login & Manajemen Akun:** Antarmuka autentikasi modern dan halaman pengelolaan kredensial login beserta hak akses (Admin/Petugas) menggunakan *Slide-over form*.
- [x] **CRUD *Mockups*:** Pembuatan halaman tabel standar (Petugas, Checkpoint, Inventaris) yang siap dihubungkan dengan API.
- [x] **Absensi PWA (Clock In/Out):** Antarmuka absensi petugas terintegrasi dengan *Geolocation API* (mengunci lokasi) dan pengambilan swafoto (*Webcam*).

### FASE 2: Real-time & Pemantauan (Sprint 4-5)

**A. Sisi Admin (Command Center):**
- [x] **KPI Cards:** Kartu ringkasan metrik patroli (Petugas aktif, Insiden, dll).
- [x] **Interactive Map (Leaflet):** Peta persebaran titik checkpoint. Dilengkapi dengan *custom marker* (HTML/CSS murni tanpa gambar) yang beranimasi kedip (*ping/pulse*) untuk membedakan Petugas (Biru) dan Insiden (Merah). Dilengkapi juga dengan rute *Heatmap*.
- [x] **Live Activity Feed:** Panel linimasa (*timeline*) di sebelah kanan peta yang menampilkan log aktivitas terbaru. Disimulasikan secara lokal dengan `setInterval` agar item baru bermunculan setiap 4 detik menggunakan efek transisi CSS halus (*slide-in*), tanpa membuat browser lag (maks 15 item).

**B. Sisi Mobile (Aplikasi Petugas):**
- [x] **QR Scanner:** Kamera terintegrasi pembaca QR code, dilengkapi *feedback* motor getar HP (`navigator.vibrate`) ketika berhasil terdeteksi.
- [x] **Native WebRTC Camera (Post-Scan Form):** Begitu QR terpindai, petugas masuk ke form laporan. Form ini langsung menampilkan *feed* kamera belakang (`react-webcam`) dan **memblokir/mewajibkan deteksi GPS**.
- [x] **Auto-Watermark (Canvas API):** Gambar hasil foto *live* langsung dibubuhi teks watermark ("PATROLI.SITE" transparan di tengah), Nama Checkpoint (tengah bawah), Waktu/Jam (kiri bawah), dan Titik Koordinat Lat/Lng presisi tinggi (kanan bawah).
- [x] **Offline Queue (IndexedDB):** Sistem sangat tangguh (*resilient*). Jika sinyal hilang, sistem tidak error, melainkan menyimpan laporan ber-foto tinggi tersebut secara lokal ke IndexedDB (`idb-keyval`). Begitu *browser* menangkap sinyal kembali (*online event listener*), laporan tersebut diunggah otomatis di latar belakang.

### FASE 3: Insiden & Keadaan Darurat (Sprint 6-7)

**A. Sisi Admin (Command Center):**
- [x] **Daftar Insiden Darurat:** Tabel canggih yang menampilkan riwayat laporan insiden dari lapangan dengan fitur filter Status & Prioritas. Menggunakan UI *Slide-over / Drawer* untuk detail laporan yang modern dan interaktif.
- [x] **Emergency Toast & Web Audio:** Sistem bereaksi seketika terhadap sinyal darurat (*Panic Button*) dari PWA menggunakan simulasi via `localStorage`. Saat tombol dipicu, tab Admin membunyikan nada alarm (*Web Audio API*) dan menampilkan *Toast* merah besar.
- [x] **Broadcast Message:** Formulir penyiaran pengumuman ke PWA Petugas, dilengkapi target *audience* (misal: Semua Petugas) dan indikator urgensi.

**B. Sisi Mobile (Aplikasi Petugas):**
- [x] **Form Lapor Insiden:** Jalan pintas kuning mencolok di *Dashboard* agar petugas dapat melaporkan insiden darurat dengan foto/video cepat tanpa masuk rute *checkpoint*.
- [x] **Panic Button Tahan 5 Detik:** Modifikasi tombol darurat raksasa yang kebal terhadap *miss-click*. Tombol ini wajib ditekan & ditahan selama 5 detik (dengan progres *bar* animasi) untuk memicu alarm ke pusat.
- [x] **Inbox Pengumuman:** Kotak masuk yang dapat diakses melalui ikon *bell* di Header, menampilkan daftar *broadcast* terbaru dari Admin dengan indikasi warna sesuai prioritas bahaya.

### FASE 4: Laporan & Analitik (Sprint 8)

**A. Pusat Laporan (Admin):**
- [x] **Struktur Terpisah (Sub-menu):** Halaman laporan dipecah menjadi tiga sub-menu spesifik: Laporan Kehadiran, Laporan Patroli, dan Laporan Insiden.
- [x] **Simulasi Export PDF/Excel:** Menyediakan tombol ekspor laporan yang interaktif. Ketika diklik, tombol akan masuk ke fase *loading* (spinner animasi) selama 2 detik untuk menyimulasikan kompilasi data *server*, sebelum menampilkan pop-up sukses pengunduhan.

**B. Manajemen Jadwal Patroli (Admin):**
- [x] **Papan Jadwal:** Halaman khusus (`/jadwal`) yang menampilkan tabel linimasa jadwal patroli berjalan dan mendatang.
- [x] **Slide-over Form:** Formulir interaktif bergaya *drawer/slide-over* untuk menugaskan petugas ke shift dan rute tertentu tanpa mengganggu konteks halaman utama.

## 4. Status Proyek
*Seluruh fase purwarupa (FASE 1 hingga FASE 4) **Telah Selesai 100%**. Aplikasi kini memiliki arsitektur *frontend* lengkap dengan dukungan kapabilitas PWA *offline-first*, pelaporan *real-time*, interaksi WebRTC Camera & Canvas API, hingga dasbor analitik manajerial.*

---
*(Dokumen ini wajib diperbarui setiap kali ada penambahan integrasi pustaka utama atau arsitektur baru.)*
