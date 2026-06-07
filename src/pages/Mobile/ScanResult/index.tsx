import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Webcam from "react-webcam";
import PageMeta from "../../../components/common/PageMeta";
import { useOfflineQueue } from "../../../context/OfflineQueueContext";

export default function MobileScanResult() {
  const [searchParams] = useSearchParams();
  const qrCode = searchParams.get("code") || "Titik Checkpoint Tidak Diketahui";
  const navigate = useNavigate();
  const { isOnline, addToQueue } = useOfflineQueue();

  // State untuk form
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State untuk Kamera & Geolocation
  const webcamRef = useRef<Webcam>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>("Mencari lokasi GPS...");

  // Dapatkan lokasi pengguna saat halaman dimuat
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation tidak didukung di browser ini.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError(null);
      },
      (error) => {
        let errorMsg = "Gagal mendapatkan lokasi.";
        if (error.code === error.PERMISSION_DENIED) errorMsg = "Izin lokasi ditolak. Harap izinkan akses lokasi.";
        if (error.code === error.POSITION_UNAVAILABLE) errorMsg = "Informasi lokasi tidak tersedia.";
        if (error.code === error.TIMEOUT) errorMsg = "Pencarian lokasi timeout.";
        setLocationError(errorMsg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  // Fungsi untuk menggambar watermark ke canvas
  const applyWatermark = (imageSrc: string) => {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject("Canvas not supported");
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;

        // Gambar foto asli
        ctx.drawImage(img, 0, 0);

        // Pengaturan gaya font watermark tengah (PATROLI.SITE & Checkpoint)
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Shadow/stroke untuk teks agar terbaca di background terang/gelap
        ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // 1. Watermark Tengah: PATROLI.SITE (Lebih tipis, lebih besar, transparan)
        ctx.font = "300 80px Arial"; // 300 = font-weight light
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)"; // Putih transparan
        ctx.fillText("PATROLI.SITE", centerX, centerY);

        const margin = 20;
        const bottomY = canvas.height - margin;
        const now = new Date();
        const dateStr = now.toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const timeStr = now.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        // Pengaturan gaya font untuk area bawah (Tebal dan jelas)
        ctx.font = "bold 24px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.textBaseline = "bottom";

        // 2. Kiri Bawah: Tanggal & Waktu
        ctx.textAlign = "left";
        ctx.fillText(dateStr, margin, bottomY - 30);
        ctx.fillText(timeStr, margin, bottomY);

        // 3. Tengah Bawah: Nama Checkpoint
        ctx.textAlign = "center";
        // Posisikan sedikit di atas dasar agar sejajar secara visual dengan blok kiri/kanan
        ctx.fillText(`Lokasi: ${qrCode}`, centerX, bottomY - 15);

        // 4. Kanan Bawah: Koordinat
        ctx.textAlign = "right";
        if (location) {
          ctx.fillText(`Lat: ${location.lat.toFixed(6)}`, canvas.width - margin, bottomY - 30);
          ctx.fillText(`Lng: ${location.lng.toFixed(6)}`, canvas.width - margin, bottomY);
        } else {
          ctx.fillText("Lokasi tidak ditemukan", canvas.width - margin, bottomY - 15);
        }

        // Konversi canvas kembali ke gambar Base64
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = reject;
      img.src = imageSrc;
    });
  };

  // Fungsi Jepret Foto
  const capturePhoto = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setIsLoading(true);
        try {
          const watermarkedImage = await applyWatermark(imageSrc);
          setPreviewUrl(watermarkedImage);
        } catch (error) {
          console.error("Gagal memproses watermark", error);
          Swal.fire("Error", "Gagal memproses foto", "error");
        } finally {
          setIsLoading(false);
        }
      }
    }
  }, [webcamRef, location, qrCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !previewUrl) {
      Swal.fire("Peringatan", "Lokasi atau foto belum lengkap.", "warning");
      return;
    }

    setIsLoading(true);

    if (!isOnline) {
      // Simpan ke Offline Queue
      try {
        await addToQueue({
          id: `queue-${Date.now()}`,
          qrCode,
          notes,
          photoBase64: previewUrl,
          location,
          timestamp: Date.now()
        });

        setIsLoading(false);
        Swal.fire({
          title: "Tersimpan Lokal",
          text: "Koneksi internet terputus. Laporan disimpan dan akan dikirim otomatis saat sinyal kembali.",
          icon: "info",
          confirmButtonColor: "#eab308", // warna warning-500
          confirmButtonText: "Mengerti",
        }).then(() => {
          navigate("/mobile/dashboard");
        });
      } catch (err) {
        setIsLoading(false);
        Swal.fire("Error", "Gagal menyimpan ke penyimpanan lokal.", "error");
      }
    } else {
      // Simulasi pengiriman data langsung ke server
      setTimeout(() => {
        setIsLoading(false);
        
        Swal.fire({
          title: "Berhasil!",
          text: "Laporan checkpoint telah tersimpan.",
          icon: "success",
          confirmButtonColor: "#3B82F6",
          confirmButtonText: "Kembali ke Dashboard",
          timer: 3000,
          timerProgressBar: true,
        }).then(() => {
          navigate("/mobile/dashboard");
        });
      }, 1500);
    }
  };

  return (
    <>
      <PageMeta title="Patroli - Laporan Checkpoint" description="" />
      <div className="flex min-h-full flex-col p-4 bg-gray-50 dark:bg-gray-900 pb-24">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white/90">
              Detail Laporan
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Lengkapi bukti patroli untuk checkpoint ini.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          {/* Header Info Checkpoint */}
          <div className="mb-6 flex flex-col gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">ID Checkpoint Terpindai</p>
                <p className="text-sm font-bold text-gray-800 dark:text-white/90 font-mono truncate">{qrCode}</p>
              </div>
            </div>
            
            {/* Status GPS */}
            <div className="mt-1 flex items-start gap-2 border-t border-gray-200 dark:border-gray-600 pt-3">
              {locationError ? (
                <>
                  <svg className="h-5 w-5 shrink-0 text-error-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-xs text-error-500 font-medium leading-relaxed">{locationError}</p>
                </>
              ) : (
                <>
                  <svg className="h-5 w-5 shrink-0 text-success-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-success-500 font-medium">GPS Terkunci</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{location?.lat.toFixed(5)}, {location?.lng.toFixed(5)}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Area Kamera / Foto */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Foto Bukti Kondisi <span className="text-error-500">*</span>
              </label>
              
              <div className="overflow-hidden rounded-xl border-2 border-gray-200 bg-black dark:border-gray-700">
                {previewUrl ? (
                  <div className="relative">
                    {/* Tampilan Hasil Foto + Watermark */}
                    <img src={previewUrl} alt="Hasil Foto" className="w-full object-contain" />
                  </div>
                ) : (
                  <div className="relative">
                    {/* Feed Kamera Langsung */}
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      screenshotQuality={0.9}
                      videoConstraints={{ facingMode: "environment" }}
                      className="w-full object-cover aspect-[3/4]"
                    />
                    
                    {/* Panduan Area Watermark (Bantuan Visual Opsional) */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-white tracking-widest drop-shadow-lg">PATROLI.SITE</p>
                        <p className="text-xl font-semibold text-white mt-2 drop-shadow-lg">{qrCode}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tombol Kontrol Kamera */}
              <div className="mt-3 flex justify-center">
                {previewUrl ? (
                  <button
                    type="button"
                    onClick={() => setPreviewUrl(null)}
                    disabled={isLoading}
                    className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Foto Ulang
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={capturePhoto}
                    disabled={isLoading || !!locationError}
                    className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-md transition-all ${
                      locationError 
                        ? "bg-gray-400 cursor-not-allowed opacity-70" 
                        : "bg-brand-500 hover:bg-brand-600 active:scale-95"
                    }`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Jepret Foto
                  </button>
                )}
              </div>
            </div>

            {/* Input Catatan */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Catatan (Opsional)
              </label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:text-white/90 dark:focus:border-brand-500"
                placeholder="Contoh: Lampu di koridor utara padam..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            {/* Aksi */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                type="submit"
                disabled={isLoading || !previewUrl || !!locationError}
                className={`flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors ${
                  isLoading || !previewUrl || !!locationError
                    ? "bg-brand-300 cursor-not-allowed dark:bg-brand-500/50 text-white/70" 
                    : "bg-brand-500 hover:bg-brand-600"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menyimpan Laporan...
                  </>
                ) : (
                  "Kirim Laporan"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/mobile/scan")}
                disabled={isLoading}
                className="mt-3 flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Batal & Scan Ulang
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
