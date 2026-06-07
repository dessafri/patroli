import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import PageMeta from "../../../components/common/PageMeta";

export default function MobileScan() {
  const navigate = useNavigate();
  const [scanError, setScanError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Fungsi untuk inisialisasi scanner
    const startScanner = () => {
      if (!scannerRef.current) {
        // Konfigurasi scanner
        scannerRef.current = new Html5QrcodeScanner(
          "qr-reader",
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
            supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
            rememberLastUsedCamera: true,
            // Opsional: warna UI bawaan bisa ditimpa lewat CSS
          },
          /* verbose= */ false
        );

        scannerRef.current.render(onScanSuccess, onScanFailure);
      }
    };

    // Callback ketika scan berhasil
    const onScanSuccess = (decodedText: string, decodedResult: any) => {
      // 1. Beri feedback getar (vibrate 200ms)
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }

      // 2. Mainkan suara beep sederhana (opsional, bisa dengan AudioContext atau file audio)
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) {
        console.warn("AudioContext tidak didukung", e);
      }

      // 3. Hentikan scanner agar tidak scan berulang kali
      if (scannerRef.current) {
        scannerRef.current.clear().then(() => {
          // 4. Redirect ke halaman hasil/catatan
          navigate(`/mobile/scan-result?code=${encodeURIComponent(decodedText)}`);
        }).catch(err => {
          console.error("Gagal menghentikan scanner", err);
          // Tetap redirect walau gagal stop
          navigate(`/mobile/scan-result?code=${encodeURIComponent(decodedText)}`);
        });
      }
    };

    // Callback ketika scan gagal (hanya peringatan per frame, biasanya diabaikan)
    const onScanFailure = (error: string) => {
      // Menghindari spam console, kita hanya log jika perlu debugging
      // console.warn(`Code scan error = ${error}`);
    };

    // Mulai scanner dengan sedikit delay agar elemen DOM siap
    const timer = setTimeout(startScanner, 100);

    // Cleanup saat komponen dilepas (unmount)
    return () => {
      clearTimeout(timer);
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
        scannerRef.current = null;
      }
    };
  }, [navigate]);

  return (
    <>
      <PageMeta title="Scan Checkpoint | Patroli.site" />
      <div className="flex h-full flex-col bg-gray-900 text-white">
        {/* Header Transparan/Gelap */}
        <div className="flex items-center justify-between p-4 bg-gray-900/80 backdrop-blur-md absolute top-0 w-full z-10">
          <h1 className="text-lg font-bold text-white">
            Scan Checkpoint
          </h1>
          <button 
            onClick={() => navigate(-1)}
            className="rounded-full p-2 bg-gray-800 text-gray-300 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Area Scanner */}
        <div className="relative flex-1 flex flex-col justify-center bg-black">
          {/* Elemen target untuk html5-qrcode */}
          <div id="qr-reader" className="w-full max-w-md mx-auto overflow-hidden rounded-2xl bg-black"></div>
          
          {/* Instruksi Tambahan (melayang di bawah scanner) */}
          <div className="absolute bottom-10 left-0 right-0 text-center px-4 z-10">
            <div className="inline-block rounded-full bg-gray-800/80 px-4 py-2 backdrop-blur-md">
              <p className="text-sm font-medium text-gray-200">
                Arahkan kamera ke QR Code Checkpoint
              </p>
            </div>
            {scanError && (
              <p className="mt-2 text-xs text-error-400">{scanError}</p>
            )}
          </div>
        </div>

        {/* Custom CSS overrides untuk UI bawaan html5-qrcode agar terlihat modern */}
        <style dangerouslySetInnerHTML={{__html: `
          #qr-reader {
            border: none !important;
            border-radius: 1rem;
            overflow: hidden;
          }
          #qr-reader__scan_region {
            background-color: black;
          }
          #qr-reader__dashboard {
            padding: 1rem !important;
            background-color: #111827; /* gray-900 */
          }
          #qr-reader button {
            background-color: #3B82F6 !important; /* brand-500 */
            color: white !important;
            border: none !important;
            padding: 0.5rem 1rem !important;
            border-radius: 0.5rem !important;
            font-weight: 500 !important;
            cursor: pointer !important;
            margin: 0.5rem !important;
          }
          #qr-reader select {
            background-color: #374151 !important; /* gray-700 */
            color: white !important;
            border: 1px solid #4B5563 !important; /* gray-600 */
            padding: 0.5rem !important;
            border-radius: 0.5rem !important;
            margin-bottom: 0.5rem !important;
            width: 100% !important;
          }
          #qr-reader__dashboard_section_csr span {
            color: #9CA3AF !important; /* gray-400 */
          }
          /* Hilangkan elemen bawaan 'Powered by' */
          #qr-reader__dashboard_section_swaplink {
            display: none !important;
          }
          #qr-reader img {
            display: none !important; /* Hilangkan ikon bawaan jika ada */
          }
        `}} />
      </div>
    </>
  );
}
