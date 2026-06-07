import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

export default function MobileDashboard() {
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const holdDuration = 5000; // 5 detik

  const triggerPanic = () => {
    // Simulasi trigger event lintas browser via localStorage
    localStorage.setItem("panic_trigger", Date.now().toString());
    
    Swal.fire({
      title: "Sinyal Terkirim!",
      text: "Semua Admin telah diberitahu beserta lokasi GPS Anda.",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  };

  const startHold = () => {
    // Gunakan Vibrate jika didukung
    if (navigator.vibrate) navigator.vibrate(50);
    
    setIsHolding(true);
    setHoldProgress(0);
    const startTime = Date.now();
    
    holdTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / holdDuration) * 100, 100);
      setHoldProgress(progress);
      
      if (progress >= 100) {
        if (holdTimerRef.current) clearInterval(holdTimerRef.current);
        setIsHolding(false);
        setHoldProgress(0);
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        triggerPanic();
      }
    }, 100);
  };

  const endHold = () => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    if (isHolding && holdProgress < 100) {
      // Batal jika kurang dari 100%
      setIsHolding(false);
      setHoldProgress(0);
    }
  };

  // Bersihkan interval jika komponen unmount
  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    };
  }, []);

  return (
    <div className="p-4 space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Selamat bertugas,</p>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Andi Saputra</h2>
        </div>
        <div className="flex flex-col items-end">
          <span className="flex items-center gap-1.5 text-xs font-medium text-success-500">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75"></span>
              <span className="relative inline-flex size-2.5 rounded-full bg-success-500"></span>
            </span>
            Aktif (Clock In)
          </span>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Shift Pagi: 08:00 - 16:00</p>
        </div>
      </div>

      {/* Panic Button */}
      <div className="relative w-full rounded-[32px] overflow-hidden bg-error-100 shadow-lg"
           style={{ boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.5)" }}>
        
        {/* Progress Bar Background */}
        <div 
          className="absolute inset-y-0 left-0 bg-error-600 transition-all duration-100 ease-linear"
          style={{ width: `${holdProgress}%` }}
        />

        <button
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          className={`relative z-10 flex w-full flex-col items-center justify-center gap-3 py-10 transition-transform ${isHolding ? "scale-95" : "hover:scale-[1.02]"} ${holdProgress > 0 ? "text-white" : "text-error-600 bg-error-500 text-white"}`}
        >
          <svg className={`size-16 ${isHolding ? "animate-pulse" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="text-center pointer-events-none select-none">
            <span className="block text-2xl font-black tracking-wider">PANIC BUTTON</span>
            <span className="text-sm font-medium opacity-90">
              {isHolding ? `Tahan terus... ${Math.round(holdProgress)}%` : "Tahan 5 Detik untuk Darurat"}
            </span>
          </div>
        </button>
      </div>

      {/* Lapor Insiden Button */}
      <Link
        to="/mobile/insiden/create"
        className="flex w-full items-center justify-between rounded-2xl bg-warning-50 px-5 py-4 border border-warning-100 shadow-sm transition-transform hover:scale-[1.02] active:scale-95 dark:bg-warning-500/10 dark:border-warning-500/20"
      >
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-warning-100 text-warning-600 dark:bg-warning-500/20 dark:text-warning-400">
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="text-left">
            <span className="block font-bold text-warning-900 dark:text-warning-100">Lapor Insiden</span>
            <span className="text-xs text-warning-700 dark:text-warning-300">Form kejadian darurat non-kritis</span>
          </div>
        </div>
        <svg className="size-5 text-warning-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>

      {/* Checkpoint Terakhir */}
      <div>
        <h3 className="mb-3 text-sm font-bold text-gray-800 dark:text-white">Aktivitas Terakhir</h3>
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <div className="flex items-start gap-4">
            <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-500/10">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">Lobi Utama Tower A</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Dipindai hari ini, 09:15 WIB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pengumuman */}
      <div>
        <h3 className="mb-3 text-sm font-bold text-gray-800 dark:text-white">Pengumuman Terbaru</h3>
        <div className="space-y-3">
          <div className="rounded-2xl border-l-4 border-warning-500 bg-white p-4 shadow-sm dark:bg-gray-800">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Perbaikan Lift Tower B</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Harap arahkan penghuni ke lift barang sementara waktu. Estimasi selesai jam 12:00.</p>
              </div>
              <span className="text-[10px] text-gray-400">10m ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
