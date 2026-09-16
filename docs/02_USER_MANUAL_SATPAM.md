# Panduan Pengguna Petugas Lapangan (Satpam) - Patroli.site

Buku petunjuk operasional lapangan untuk Petugas Keamanan (Satpam) dalam menggunakan aplikasi web mobile / PWA Patroli.site.

---

## 1. Persiapan & Instalasi Aplikasi (PWA)

Aplikasi Patroli.site dapat diakses langsung lewat web browser smartphone tanpa download dari Play Store/App Store.

### Cara Pasang ke Layar Utama HP (Add to Home Screen):
1. Buka browser **Google Chrome** (Android) atau **Safari** (iOS) di smartphone Anda.
2. Akses alamat URL: `https://patroli.yourdomain.com` (atau scan QR instalasi dari Danru/Admin).
3. **Android (Chrome)**:
   - Tekan tombol **"Tambahkan ke Layar Utama"** pada banner pop-up bawah.
   - Atau klik ikon titik tiga (⋮) di pojok kanan atas > Pilih **"Install Aplikasi"** / **"Add to Home screen"**.
4. **iOS / iPhone (Safari)**:
   - Klik ikon **Share** (kotak dengan panah ke atas) di menu bawah browser.
   - Gulir ke bawah > Pilih **"Add to Home Screen"** (Tambah ke Layar Utama).
5. Ikon **Patroli.site** akan muncul di menu smartphone Anda seperti aplikasi native.

---

## 2. Login & Absensi Masuk/Pulang

### A. Login Akun
1. Buka aplikasi Patroli.site.
2. Masukkan **Username / NIK** dan **Password** yang diberikan oleh Supervisor / Admin.
3. Klik tombol **"Masuk"**.

### B. Absensi Masuk & Pulang
1. Pada menu utama mobile, klik tab/tombol **"Absensi"**.
2. Pastikan **GPS / Lokasi HP aktif** dan beri izin akses browser.
3. Sistem akan memvalidasi posisi Anda dengan koordinat Pos/Area Tugas:
   - Jika berada dalam radius valid (misal: < 100 meter), indikator bertuliskan **"Lokasi Valid"**.
   - Jika di luar radius, tombol absen terkunci dan muncul peringatan jarak.
4. Klik tombol **"Absen Masuk"** (awal shift) atau **"Absen Pulang"** (akhir shift).
5. Ambil foto selfie verifikasi (bila diaktifkan), lalu konfirmasi kirim.

---

## 3. SOP Pelaksanaan Patroli & Scan QR Checkpoint

Setiap shift patroli memiliki rute dan daftar titik (checkpoint) yang wajib diperiksa.

### Langkah-langkah Patroli:
1. Mulai putaran patroli sesuai jadwal regu.
2. Datangi stiker QR Code Checkpoint fisik di lokasi (contoh: *CP-01 Pintu Gerbang Utama*, *CP-02 Ruang Server*).
3. Pada aplikasi, klik tombol bundar besar **"Scan QR"** di navigasi bawah.
4. Arahkan kamera smartphone ke stiker QR Code.
5. Setelah scan berhasil, layar **Hasil Scan Checkpoint** akan terbuka otomatis:
   - Nama Checkpoint & Lokasi terverifikasi.
   - Jam & Koordinat GPS tersimpan otomatis.
6. **Pemeriksaan Kondisi**:
   - Pilih status kondisi: **Aman / Normal** atau **Temuan / Bermasalah**.
   - Jika ada temuan (misal: lampu mati, pintu tidak terkunci, pagar rusak), tulis catatan singkat dan ambil foto bukti.
7. Klik **"Simpan & Lanjutkan Patroli"**.
8. Lanjutkan ke titik checkpoint berikutnya sampai seluruh rute selesai.

### Kondisi Offline (Tanpa Sinyal Internet):
- Jika area titik patroli tidak ada sinyal internet (seperti Basement atau Ruang Genset), aplikasi akan **otomatis menyimpan scan ke memori HP (Offline Queue)**.
- Ketika HP kembali mendapatkan sinyal/Wi-Fi, data patroli akan otomatis tersinkronisasi ke server pusat. **Jangan logout/hapus data browser saat offline**.

---

## 4. SOP Pelaporan Insiden & Kejadian

Gunakan fitur ini jika terjadi kejadian khusus (pencurian, kerusakan fasilitas, kecelakaan kerja, tamu mencurigakan, dll).

1. Pada Dashboard Mobile, klik menu **"Lapor Insiden"** (atau ikon tanda seru).
2. Isi formulir pelaporan:
   - **Judul / Kategori Insiden**: Pilih kategori (Keamanan, Fasilitas, Medis, Ketertiban).
   - **Tingkat Urgensi**: Rendah, Sedang, atau Darurat/Tinggi.
   - **Lokasi Kejadian**: Pilih checkpoint terdekat atau tulis lokasi spesifik.
   - **Deskripsi Kejadian**: Jelaskan kronologi singkat apa yang terjadi, siapa yang terlibat, dan tindakan awal yang telah diambil.
   - **Foto Bukti**: Lampirkan foto kondisi nyata dari kamera HP.
3. Klik **"Kirim Laporan"**.
4. Laporan langsung masuk ke dashboard monitoring Danru dan Admin secara real-time.

---

## 5. SOP Penggunaan Tombol Darurat (Panic Button)

Fitur **Panic Button** digunakan HANYA pada situasi darurat kritis yang mengancam nyawa, kebakaran, kerusuhan, atau tindak kriminal bersenjata.

### Cara Mengaktifkan:
1. Tekan ikon **Panic Button** (lingkaran merah berdenyut) di dashboard mobile.
2. **Tekan dan tahan tombol selama 3 detik** untuk mencegah salah tekan (accidental press).
3. Sistem akan:
   - Mengirim sinyal alarm darurat ke dashboard Admin & Pos Komando.
   - Mengirim notifikasi darurat beserta koordinat live GPS Anda ke seluruh rekan satu shift.
   - Membuka hotline darurat instan (Hubungi Danru / Kepolisian / Damkar).
4. Tetap utamakan keselamatan diri sendiri terlebih dahulu sambil menunggu bantuan tiba.
