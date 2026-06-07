import React, { useEffect, useState } from "react";

type ActivityType = "patrol" | "incident" | "system";

interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  timestamp: Date;
}

const mockMessages = [
  { type: "patrol", messages: ["Budi menyelesaikan checkpoint C-12", "Andi memulai patroli rute Utara", "Siti memindai QR Code di Lobi"] },
  { type: "incident", messages: ["Laporan: Pintu darurat lantai 3 terbuka", "Peringatan: Suhu ruang server naik", "Insiden: CCTV area parkir mati"] },
  { type: "system", messages: ["Jadwal shift malam dimulai", "Pembaruan sistem berhasil diunduh", "Koneksi ulang kamera pos 2 berhasil"] },
];

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "init-1",
      type: "system",
      message: "Sistem pemantauan real-time aktif.",
      timestamp: new Date(),
    },
  ]);

  // Simulasi WebSocket / SSE
  useEffect(() => {
    const interval = setInterval(() => {
      const isIncident = Math.random() > 0.8; // 20% kemungkinan insiden
      const isSystem = Math.random() > 0.9; // 10% kemungkinan sistem
      let type: ActivityType = "patrol";
      if (isIncident) type = "incident";
      else if (isSystem) type = "system";

      const category = mockMessages.find(m => m.type === type);
      const randomMessage = category?.messages[Math.floor(Math.random() * category.messages.length)] || "Aktivitas tidak diketahui";

      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        type,
        message: randomMessage,
        timestamp: new Date(),
      };

      setActivities(prev => {
        const newFeed = [newActivity, ...prev];
        return newFeed.slice(0, 15); // Batasi maksimal 15 item
      });
    }, 4000); // Simulasi setiap 4 detik

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: ActivityType) => {
    switch (type) {
      case "patrol":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-50 text-success-500 dark:bg-success-500/10">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case "incident":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-error-50 text-error-500 dark:bg-error-500/10">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case "system":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-500/10">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden min-h-[400px]">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 px-6 py-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">
          Live Feed Aktivitas
        </h3>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Live
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className={`flex gap-4 animate-in fade-in slide-in-from-top-2 duration-300 ${index === 0 ? 'bg-gray-50 dark:bg-gray-700/30 p-2 rounded-xl' : 'px-2'}`}
            >
              <div className="shrink-0 pt-1">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90 truncate">
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {formatTime(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-top {
          from { transform: translateY(-10px); }
          to { transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.4s ease-out, slide-in-top 0.4s ease-out;
        }
      `}} />
    </div>
  );
}
