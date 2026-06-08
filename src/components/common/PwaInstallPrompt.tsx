import { useState, useEffect } from 'react';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Deteksi apakah perangkat adalah iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    // Deteksi apakah sudah dalam mode PWA (standalone)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (isStandalone) {
      return; // Sudah diinstall
    }

    if (isIosDevice) {
      setIsIos(true);
      setShowPrompt(true);
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-theme-lg border border-gray-200 dark:border-gray-700 z-50 flex flex-col gap-3 animate-in slide-in-from-bottom-5 md:hidden">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-brand-100 dark:bg-brand-900/30 text-brand-500 rounded-xl flex items-center justify-center">
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 dark:text-white text-sm">Install Aplikasi Patroli</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Akses lebih cepat & mendukung offline!</p>
          </div>
        </div>
        <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {isIos ? (
        <div className="text-xs bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 p-3 rounded-lg border border-brand-100 dark:border-brand-800/50">
          Untuk install di iOS: Tekan tombol <strong>Share (Bagikan)</strong> di bawah browser Anda, lalu pilih <strong>"Add to Home Screen"</strong> 📱
        </div>
      ) : (
        <button 
          onClick={handleInstallClick}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
        >
          Install Sekarang
        </button>
      )}
    </div>
  );
}
