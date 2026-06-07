# Dokumen Perencanaan Sprint Frontend (PWA & Web Dashboard)

**Nama Produk:** Patroli.site[cite: 1]  
**Tim Pengembang:** Rakit Digital Solusindo  
**Disusun Oleh:** Moch Sulthon Alif Des Safri  
**Tanggal Dokumen:** 3 Juni 2026

---

## FASE 1: MVP CORE

| Sprint       | Durasi   | Fokus Utama                      | Daftar Pekerjaan (Backlog)                                                                                                                                                                                                                                                                                                                                                          |
| :----------- | :------- | :------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sprint 1** | 2 Minggu | Setup Infrastruktur & Otentikasi | • Inisialisasi repositori React.js untuk Dasbor Admin dan aplikasi Progressive Web App (PWA) untuk Petugas[cite: 1].<br>• Pembuatan antarmuka halaman Login (email/username, password, tombol 'Lupa Password', _loading state_)[cite: 1].<br>• Implementasi _state management_ untuk sesi token JWT dan navigasi berbasis peran (Super Admin, Admin, Supervisor, Petugas)[cite: 1]. |
| **Sprint 2** | 2 Minggu | Manajemen Checkpoint             | • Pembuatan halaman antarmuka operasi CRUD lokasi dan _checkpoint_ di Dasbor Admin[cite: 1].<br>• Pembuatan formulir konfigurasi _metadata_ (nama gedung, lantai, zona)[cite: 1].<br>• Pengembangan pratinjau visual QR Code dan fitur cetak QR ke format PDF (A4, A5, label stiker)[cite: 1].                                                                                      |
| **Sprint 3** | 2 Minggu | Absensi & UI PWA Dasar           | • Implementasi PWA _manifest_ agar aplikasi dapat diinstal di _homescreen_ perangkat Android dan iOS[cite: 1].<br>• Pembuatan Halaman Utama Petugas (status patroli, notifikasi, _checkpoint_ terakhir)[cite: 1].<br>• Pembuatan antarmuka absensi (_Clock In / Clock Out_) terintegrasi _Geolocation API_ dan opsi swafoto[cite: 1].                                               |

---

## FASE 2: REAL-TIME & PEMANTAUAN

| Sprint       | Durasi   | Fokus Utama                    | Daftar Pekerjaan (Backlog)                                                                                                                                                                                                                                                                                                                                                               |
| :----------- | :------- | :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sprint 4** | 2 Minggu | Modul Pemindai & Offline Queue | • Pengembangan halaman _Scan QR_ dengan akses kamera langsung dan _frame_ panduan posisi[cite: 1].<br>• Penyematan _feedback_ (getar dan suara) saat pemindaian berhasil[cite: 1].<br>• Pembuatan formulir unggah foto dan catatan teks pasca-pindaian[cite: 1].<br>• Implementasi _Service Worker_ dan _Offline Queue_ untuk menyimpan hasil pindaian lokal saat sinyal lemah[cite: 1]. |
| **Sprint 5** | 2 Minggu | Peta Interaktif & Live Feed    | • Pembuatan Halaman Overview Admin dengan _KPI cards_ (petugas aktif, patroli berjalan, insiden, cakupan)[cite: 1].<br>• Integrasi _Maps JavaScript API_ untuk peta interaktif, _marker_ posisi, dan _heatmap_[cite: 1].<br>• Pembuatan _Live activity feed_ berbasis WebSocket/SSE untuk pembaruan antarmuka di bawah 5 detik[cite: 1].                                                 |

---

## FASE 3: INSIDEN & KEADAAN DARURAT

| Sprint       | Durasi   | Fokus Utama                 | Daftar Pekerjaan (Backlog)                                                                                                                                                                                                                                                                                                                                                                |
| :----------- | :------- | :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sprint 6** | 2 Minggu | Antarmuka Pelaporan Insiden | • **PWA:** Pembuatan formulir laporan insiden (kategori, prioritas) dan antarmuka unggah foto/video[cite: 1].<br>• **Admin:** Pembuatan halaman daftar insiden dengan filter (status, prioritas, petugas) dan panel detail histori[cite: 1].                                                                                                                                              |
| **Sprint 7** | 2 Minggu | Panic Button & Broadcast    | • **PWA:** Implementasi UI _Panic Button_ merah 1/3 layar dengan konfirmasi _double-tap_[cite: 1].<br>• **PWA:** Pembuatan UI _inbox_ riwayat pesan dan penangkap _Push Notification_[cite: 1].<br>• **Admin:** Pembuatan antarmuka peringatan darurat prioritas tinggi di dasbor[cite: 1].<br>• **Admin:** Pembuatan formulir _Broadcast Message_ ke seluruh atau grup petugas[cite: 1]. |

---

## FASE 4: LAPORAN & ANALITIK

| Sprint       | Durasi   | Fokus Utama               | Daftar Pekerjaan (Backlog)                                                                                                                                                                                                                                                                                       |
| :----------- | :------- | :------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sprint 8** | 2 Minggu | Dasbor Pelaporan & Jadwal | • Pembuatan tabel laporan kehadiran, aktivitas harian/mingguan, dan performa petugas[cite: 1].<br>• Penyediaan tombol _Export_ (dengan indikator _loading_) untuk unduh format PDF dan Excel/CSV[cite: 1].<br>• Pembuatan antarmuka Manajemen Jadwal Patroli (templat rute, waktu target _checkpoint_)[cite: 1]. |

---

## FASE 5 & 6: TESTING, OPTIMASI, & PELUNCURAN

| Sprint        | Durasi   | Fokus Utama               | Daftar Pekerjaan (Backlog)                                                                                                                                                                                                                                                   |
| :------------ | :------- | :------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sprint 9**  | 2 Minggu | QA & Optimasi Performa UI | • Pengujian UI pada resolusi minimal 1280x720 untuk dasbor Admin[cite: 1].<br>• Pengujian _cross-browser_ (Chrome 80+, Firefox 75+, Edge 80+, Safari 13+)[cite: 1].<br>• Optimasi _bundle size_ React agar _First Contentful Paint_ di bawah 3 detik (jaringan 4G)[cite: 1]. |
| **Sprint 10** | 2 Minggu | Persiapan Soft Launch     | • Integrasi antarmuka dengan _Content Delivery Network_ (CDN) untuk distribusi aset[cite: 1].<br>• Perbaikan UI/UX berdasarkan _feedback_ internal[cite: 1].<br>• Penyiapan _build production_ stabil untuk diuji coba ke 3-5 klien perdana[cite: 1].                        |
