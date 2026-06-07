import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";

export default function MobileAbsensi() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError("Gagal mengambil lokasi: " + error.message);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationError("Geolocation tidak didukung di browser ini.");
    }
  }, []);

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      setImageSrc(image);
    }
  }, [webcamRef]);

  const retake = () => setImageSrc(null);

  const handleAbsen = () => {
    if (!location) {
      Swal.fire("Peringatan", "Mencari lokasi GPS Anda. Pastikan GPS aktif.", "warning");
      return;
    }
    if (!imageSrc) {
      Swal.fire("Peringatan", "Anda harus mengambil foto selfie terlebih dahulu.", "warning");
      return;
    }

    const action = isClockedIn ? "Clock Out" : "Clock In";
    
    Swal.fire({
      title: "Konfirmasi " + action,
      text: `Lokasi: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, " + action,
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsClockedIn(!isClockedIn);
        setImageSrc(null); // Reset for next use
        Swal.fire("Berhasil", `${action} berhasil dicatat!`, "success");
      }
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Absensi Petugas</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Pastikan Anda berada di area kerja</p>
      </div>

      {/* Geolocation Status */}
      <div className={`rounded-xl border p-4 shadow-sm ${location ? 'border-success-200 bg-success-50 dark:border-success-900/30 dark:bg-success-900/20' : 'border-error-200 bg-error-50 dark:border-error-900/30 dark:bg-error-900/20'}`}>
        <div className="flex items-center gap-3">
          <div className={`flex size-10 items-center justify-center rounded-full ${location ? 'bg-success-100 text-success-600' : 'bg-error-100 text-error-600'}`}>
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className={`text-sm font-semibold ${location ? 'text-success-800 dark:text-success-400' : 'text-error-800 dark:text-error-400'}`}>
              {location ? "Lokasi Terkunci" : "Menunggu Sinyal GPS..."}
            </p>
            <p className="text-xs text-gray-500">
              {location ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : locationError || "Pastikan GPS Anda aktif"}
            </p>
          </div>
        </div>
      </div>

      {/* Camera Capture */}
      <div className="overflow-hidden rounded-2xl bg-black">
        {imageSrc ? (
          <div className="relative">
            <img src={imageSrc} alt="Selfie" className="w-full h-auto object-cover aspect-[4/3]" />
            <button 
              onClick={retake}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/20 px-6 py-2 text-sm font-medium text-white backdrop-blur-md"
            >
              Ulangi Foto
            </button>
          </div>
        ) : (
          <div className="relative">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "user" }}
              className="w-full h-auto object-cover aspect-[4/3]"
            />
            <button 
              onClick={capture}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 p-4 text-white shadow-lg border-4 border-white"
            >
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4">
        {isClockedIn ? (
          <button
            onClick={handleAbsen}
            className="w-full rounded-2xl bg-error-500 py-4 text-lg font-bold text-white shadow-lg active:scale-95"
          >
            Clock Out Sekarang
          </button>
        ) : (
          <button
            onClick={handleAbsen}
            className="w-full rounded-2xl bg-success-500 py-4 text-lg font-bold text-white shadow-lg active:scale-95"
          >
            Clock In Sekarang
          </button>
        )}
      </div>
    </div>
  );
}
