import { useEffect } from "react";
import Swal from "sweetalert2";
import PageMeta from "../../components/common/PageMeta";
import KpiCards from "../../components/dashboard/KpiCards";
import InteractiveMap from "../../components/dashboard/InteractiveMap";
import LiveActivityFeed from "../../components/dashboard/LiveActivityFeed";

export default function Home() {
  const showPanicToast = () => {
    // Bunyi peringatan sederhana menggunakan Web Audio API
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // Nada tinggi
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5); // Efek sirene sirup
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.warn("Audio Context not supported");
    }

    // Munculkan Toast Kanan Atas Merah
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'warning',
      title: '🚨 DARURAT: PANIC BUTTON DITEKAN!',
      text: 'Petugas: Andi Saputra - Lokasi GPS Terdeteksi.',
      showConfirmButton: true,
      confirmButtonText: 'Tutup',
      confirmButtonColor: '#ef4444',
      timer: 15000,
      timerProgressBar: true,
      background: '#fee2e2', // bg-error-50
      color: '#991b1b',      // text-error-800
      iconColor: '#dc2626',
      customClass: {
        popup: 'border border-error-500 shadow-2xl',
      }
    });
  };

  // Mendengarkan event dari tab PWA (localStorage)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "panic_trigger") {
        showPanicToast();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <PageMeta
        title="Patroli - Dashboard Keamanan"
        description="Ringkasan pemantauan dan patroli secara real-time"
      />
      
      <div className="space-y-6">
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
              Overview Patroli
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pantau aktivitas petugas, laporan insiden, dan jangkauan area hari ini.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={showPanicToast}
              className="rounded-lg bg-error-100 px-3 py-1.5 text-xs font-bold text-error-600 hover:bg-error-200 dark:bg-error-500/20 dark:text-error-400"
            >
              Simulasi Panic
            </button>
            <span className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-success-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Sistem Aktif (Real-time)
              </span>
            </span>
          </div>
        </div>

        {/* Baris 1: KPI Cards */}
        <KpiCards />

        {/* Baris 2: Peta & Live Feed */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Peta Interaktif */}
          <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 min-h-[400px] flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white/90 mb-4 px-2">
              Peta Persebaran Patroli
            </h3>
            <div className="flex-1 rounded-xl overflow-hidden relative" style={{ zIndex: 1 }}>
              <InteractiveMap />
            </div>
          </div>

          {/* Live Feed */}
          <div className="xl:col-span-1">
            <LiveActivityFeed />
          </div>
        </div>
      </div>
    </>
  );
}
