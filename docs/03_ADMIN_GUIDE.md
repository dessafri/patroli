# Panduan Administrator & Facility Manager - Patroli.site

Panduan lengkap untuk Administrator, Chief Security, dan Facility Manager dalam mengelola master data, mencetak QR stiker checkpoint, memonitor operasional, dan menghasilkan laporan analitik.

---

## 1. Setup & Manajemen Checkpoint Patroli

Checkpoint adalah titik-titik fisik pemeriksaan keamanan yang wajib dikunjungi petugas.

### A. Menambahkan Titik Checkpoint Baru:
1. Masuk ke panel Admin Dashboard Patroli.site.
2. Pada navigasi sidebar kiri, klik menu **"Checkpoint"** > Klik tombol **"+ Tambah Checkpoint"** di kanan atas.
3. Isi data checkpoint:
   - **Kode Checkpoint**: Contoh `CP-A1-01` (Unik).
   - **Nama Checkpoint**: Contoh `Lobi Utama Lantai 1`.
   - **Gedung / Zona**: Contoh `Tower Barat`, `Basement 2`, `Perimeter Luar`.
   - **Koordinat Geofence (Latitude & Longitude)**:
     - Masukkan koordinat manual atau klik tombol **"Gunakan Posisi Saat Ini"** / pilih titik pada peta.
     - **Radius Toleransi (Meter)**: Tetapkan radius validasi GPS (misal: `30` meter).
   - **Instruksi / Checklist Pemeriksaan**: Daftar item yang wajib dicek satpam (contoh: Pintu darurat terkunci, APAR bertekanan normal, CCTV aktif).
   - **Status**: Aktif / Non-aktif.
4. Klik **"Simpan Checkpoint"**.

---

## 2. Cetak & Distribusi Stiker QR Code Checkpoint

Patroli.site menyediakan generator QR Code otomatis dengan template stiker standar keamanan industri.

### A. Mencetak QR Stiker:
1. Masuk ke halaman menu **"Checkpoint"**.
2. **Cetak Satuan**: Klik tombol ikon printer / QR pada baris checkpoint yang diinginkan.
3. **Cetak Masal (Batch Print)**:
   - Centang checkpoint yang ingin dicetak (atau centang "Pilih Semua").
   - Klik tombol **"Cetak QR Terpilih (PDF)"** di bagian atas tabel.
4. Pop-up pratinjau cetak akan muncul dengan format stiker siap cetak yang memuat:
   - Nama Properti & Logo Perusahaan.
   - Kode & Nama Checkpoint.
   - QR Code beresolusi tinggi (anti-blur).
   - Panduan singkat scan untuk petugas.
5. Klik **"Print"** atau **"Save as PDF"**.

### Rekomendasi Pemasangan Fisik:
- Gunakan bahan stiker tahan cuaca (Vinyl Waterproof / Akrilik UV Print).
- Pasang pada ketinggian pandangan mata (140 - 160 cm dari lantai).
- Hindari lokasi dengan pantulan cahaya lampu berlebih untuk memudahkan fokus kamera HP.

---

## 3. Manajemen Jadwal & Shift Patroli

1. Buka menu **"Jadwal Patroli"**.
2. Klik **"+ Buat Jadwal / Shift"**:
   - Tentukan nama shift (Shift Pagi: 07:00-15:00, Shift Siang: 15:00-23:00, Shift Malam: 23:00-07:00).
   - Pilih Regu / Petugas yang bertugas.
   - Tentukan Rute / Urutan Checkpoint yang wajib dipatroli dan interval putaran (misal: tiap 2 jam sekali).
3. Jadwal otomatis muncul di kalender kerja mobile app petugas.

---

## 4. Monitoring Real-time & Penanganan Insiden / Panic Button

### A. Dashboard Live Monitoring
- **Peta Interaktif**: Memantau posisi terakhir petugas, status aktif patroli, dan riwayat lintasan checkpoint.
- **Feed Aktivitas**: Notifikasi real-time setiap kali checkpoint berhasil di-scan.

### B. Penanganan Panic Button & Insiden
- Saat petugas menekan Panic Button, sistem akan memunculkan **Alert Popup Merah + Suara Alarm** di dashboard Admin.
- Klik alert untuk melihat:
  - Identitas petugas pengirim.
  - Lokasi koordinat darurat langsung di peta.
  - Waktu kejadian.
- Admin dapat langsung melakukan tindakan:
  - Hubungi nomor darurat terdekat.
  - Kirim **Broadcast Message Darurat** ke seluruh tim di lokasi via menu **Broadcast**.

---

## 5. Ekspor Laporan Bulanan & Analitik

Patroli.site menyediakan 3 jenis laporan siap unduh dalam format **PDF / Excel (.xlsx) / CSV** untuk keperluan SLA, audit manajemen gedung, atau laporan klien outsourcing.

### A. Laporan Kepatuhan Patroli (Patrol Compliance)
1. Buka menu **"Laporan"** > **"Laporan Patroli"**.
2. Tentukan filter rentang tanggal (contoh: 1 Bulan terakhir), Zona/Gedung, dan Nama Petugas/Regu.
3. Tinjau metrik:
   - Tingkat Kepatuhan (Contoh: 98.4% Checkpoint terselesaikan).
   - Checkpoint yang terlewat (Missed Checkpoints).
   - Waktu rata-rata per putaran patroli.
4. Klik tombol **"Ekspor Laporan (PDF)"** untuk format laporan resmi bertanda tangan, atau **"Ekspor Excel"** untuk analisis data lanjutan.

### B. Laporan Rekap Kehadiran (Attendance Report)
1. Buka menu **"Laporan"** > **"Laporan Kehadiran"**.
2. Filter berdasarkan bulan dan shift.
3. Lihat rekap: Total Hadir Tepat Waktu, Terlambat, Absen di Luar Radius (Geo-violation), dan Izin/Sakit.
4. Klik **"Ekspor Excel"** untuk integrasi payroll penggajian.

### C. Laporan Log Insiden Keamanan (Incident Log)
1. Buka menu **"Laporan"** > **"Laporan Insiden"**.
2. Berisi kompilasi seluruh temuan, kategori resiko, status penyelesaian (Open / In-Progress / Resolved), dan lampiran dokumentasi foto.
3. Klik **"Cetak Laporan Insiden Bulanan (PDF)"**.
