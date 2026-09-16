# USER ACCEPTANCE TESTING (UAT) DOCUMENT & VALIDATION MATRIX
**Project**: Patroli.site - Sistem Manajemen Keamanan Aset & Patroli Satpam  
**Versi**: 1.0 (MVP)  
**Tanggal**: 16 September 2026  
**Penyusun**: QA Lead & Tim Product  
**Target Penguji**: Facility Manager (Admin), Koordinator Security, Petugas Lapangan (Satpam)

---

## 1. Tujuan Dokumen
Dokumen ini menjadi acuan skenario validasi kelayakan produk oleh calon pengguna akhir sebelum sistem di-deploy ke lingkungan produksi / diserahkan ke klien.

---

## 2. Kriteria Penerimaan (Acceptance Criteria)
1. **Peran Admin / Pengelola Fasilitas**:
   - Dapat masuk ke dashboard dengan kredensial valid.
   - Dapat mendaftarkan titik checkpoint dengan koordinat latitude/longitude dan radius toleransi (meter).
   - Dapat mencetak stiker QR code fisik dengan label informasi lokasi jelas.
   - Dapat memantau riwayat patroli, absensi, dan insiden secara terpusat.
   - Dapat mengekspor rekap laporan ke format CSV / Excel dan PDF.

2. **Peran Petugas Lapangan (Satpam)**:
   - Dapat membuka aplikasi via web browser / PWA di HP Android.
   - Dapat melakukan absensi kehadiran dengan capture lokasi GPS dan foto bukti.
   - Dapat memindai QR code checkpoint dan otomatis diverifikasi berdasarkan jarak GPS.
   - Foto hasil scan otomatis memiliki watermark identitas sistem, timestamp, lokasi, dan koordinat GPS.
   - Dapat melaporkan insiden darurat dan memicu Panic Button satu kali sentuh saat kondisi kritis.
   - Sistem tetap dapat mencatat patroli saat koneksi offline dan mengirimkan otomatis saat internet pulih.

---

## 3. Matriks Skenario Pengujian UAT

| ID UAT | Modul | Skenario Pengujian | Langkah Pengujian | Hasil yang Diharapkan | Status Validasi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **UAT-01** | Autentikasi | Login Admin | Masukkan email & password admin valid | Dialihkan ke Dashboard Admin (`/`), token tersimpan | **PASSED** |
| **UAT-02** | Autentikasi | Login Petugas | Masukkan email & password petugas valid | Dialihkan ke PWA Mobile (`/mobile/dashboard`) | **PASSED** |
| **UAT-03** | Autentikasi | Penolakan Login | Masukkan email / password salah | Muncul pesan error "Email atau password salah" | **PASSED** |
| **UAT-04** | Checkpoint | Buat Checkpoint Baru | Admin isi nama titik, gedung, lantai, zona, koordinat GPS | Data tersimpan di DB, muncul di tabel daftar | **PASSED** |
| **UAT-05** | Checkpoint | Cetak Stiker QR | Klik ikon printer pada baris checkpoint | Modal preview QR tampil dengan tombol Cetak & Unduh SVG | **PASSED** |
| **UAT-06** | Checkpoint | Soft Delete Checkpoint | Admin hapus checkpoint yang sudah memiliki log | Status diubah non-aktif tanpa merusak relasi log patroli | **PASSED** |
| **UAT-07** | Patroli Mobile | Scan QR Valid (Dalam Radius) | Petugas scan QR dengan GPS berada <= 30m dari titik | Status patroli `verified`, jarak ditampilkan, log tersimpan | **PASSED** |
| **UAT-08** | Patroli Mobile | Scan QR (Di Luar Radius) | Petugas scan QR dengan GPS > 30m dari titik | Status patroli `out_of_range`, notifikasi peringatan jarak | **PASSED** |
| **UAT-09** | Patroli Mobile | Scan QR Tidak Terdaftar | Petugas scan QR code acak / tidak dikenal | Muncul error 404 "QR Code Checkpoint tidak valid" | **PASSED** |
| **UAT-10** | Patroli Mobile | Watermark Foto Otomatis | Petugas jepret foto bukti via kamera | Foto memiliki watermark PATROLI.SITE, tanggal, jam, koordinat GPS | **PASSED** |
| **UAT-11** | Absensi | Clock-In Petugas | Petugas kirim absensi masuk beserta GPS & foto | Data absensi masuk tercatat di DB dengan waktu server | **PASSED** |
| **UAT-12** | Insiden | Lapor Temuan Insiden | Petugas kirim laporan kerusakan / insiden dengan foto | Insiden tercatat dengan status `reported` dan prioritas | **PASSED** |
| **UAT-13** | Darurat | Panic Button Trigger | Petugas tekan tombol Panic Button di HP | Alarm darurat aktif, posisi GPS terkirim ke sistem | **PASSED** |
| **UAT-14** | Dashboard | Metrik Realtime | Buka halaman dashboard admin | Angka total petugas, checkpoint, patroli, insiden sinkron | **PASSED** |
| **UAT-15** | Laporan | Ekspor CSV / Excel | Klik tombol "Export CSV / Excel" di menu Laporan Patroli | File CSV terunduh berisi kolom nama, lokasi, status, jarak, waktu | **PASSED** |
| **UAT-16** | Laporan | Cetak PDF Laporan | Klik tombol "Export PDF" di menu Laporan Patroli | Tampil print dialog browser dengan format tabel laporan rapi | **PASSED** |
| **UAT-17** | PWA & Offline | Offline Queue Fallback | Simpan scan saat mode offline, lalu online kembali | Data tersimpan di IndexedDB dan tersinkronisasi ke API | **PASSED** |

---

## 4. Kesimpulan & Rekomendasi
Semua 17 skenario User Acceptance Testing telah divalidasi dan memenuhi kriteria penerimaan MVP Patroli.site. Sistem dinyatakan **SIAP RILIS** untuk tahap pilot project klien.
