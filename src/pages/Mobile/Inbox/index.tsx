import { useNavigate } from "react-router";
import PageMeta from "../../../components/common/PageMeta";

interface BroadcastMessage {
  id: string;
  sender: string;
  waktu: string;
  urgensi: "Biasa" | "Penting" | "Bahaya";
  pesan: string;
  isRead: boolean;
}

const dummyMessages: BroadcastMessage[] = [
  {
    id: "msg-1",
    sender: "Budi Santoso (Danru)",
    waktu: "Hari ini, 09:30 WIB",
    urgensi: "Penting",
    pesan: "Kepada seluruh anggota shift pagi, harap berkumpul di Lobi Utama pada pukul 10:00 WIB untuk pengarahan khusus terkait kunjungan tamu VVIP siang ini.",
    isRead: false,
  },
  {
    id: "msg-2",
    sender: "Sistem Pusat",
    waktu: "Kemarin, 19:45 WIB",
    urgensi: "Bahaya",
    pesan: "Peringatan cuaca ekstrem! Hujan badai diprediksi turun malam ini. Seluruh petugas di area luar (Taman & Parkir Terbuka) diinstruksikan untuk segera masuk ke area beratap dan amankan panel listrik luar.",
    isRead: true,
  },
  {
    id: "msg-3",
    sender: "Agus Setiawan (Admin)",
    waktu: "03 Jun 2026, 14:00 WIB",
    urgensi: "Biasa",
    pesan: "Pembaruan seragam baru sudah bisa diambil di ruang logistik mulai besok siang. Harap bawa ID Card masing-masing saat pengambilan.",
    isRead: true,
  },
];

export default function MobileInbox() {
  const navigate = useNavigate();

  return (
    <>
      <PageMeta title="Patroli - Inbox Pesan" description="" />
      <div className="flex min-h-full flex-col bg-gray-50 dark:bg-gray-900 pb-24">
        
        {/* Header Kustom */}
        <div className="bg-brand-500 px-4 py-6 text-white shadow-md rounded-b-3xl mb-6">
          <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-brand-100 hover:text-white">
            <svg className="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Inbox Pengumuman</h1>
              <p className="text-brand-100 text-sm opacity-90">Riwayat broadcast pesan pusat</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
        </div>

        {/* List Pesan */}
        <div className="px-4 space-y-4">
          {dummyMessages.map((msg) => (
            <div 
              key={msg.id} 
              className={`relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border transition-colors dark:bg-gray-800 ${
                !msg.isRead 
                  ? "border-brand-200 dark:border-brand-500/30" 
                  : "border-gray-100 dark:border-gray-700"
              }`}
            >
              {/* Indikator Belum Dibaca */}
              {!msg.isRead && (
                <div className="absolute top-0 right-0 h-3 w-3 bg-brand-500 rounded-bl-full shadow-sm"></div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {msg.sender}
                  </span>
                  <p className="mt-0.5 text-[10px] text-gray-400">{msg.waktu}</p>
                </div>
                
                {/* Badge Urgensi */}
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  msg.urgensi === "Bahaya" 
                    ? "bg-error-50 text-error-600 dark:bg-error-500/10 dark:text-error-400 border border-error-200 dark:border-error-500/20" 
                    : msg.urgensi === "Penting"
                      ? "bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-400 border border-warning-200 dark:border-warning-500/20"
                      : "bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                }`}>
                  {msg.urgensi}
                </span>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 border border-gray-100 dark:bg-gray-900/50 dark:border-gray-700">
                <p className={`text-sm leading-relaxed ${!msg.isRead ? "text-gray-800 font-medium dark:text-gray-200" : "text-gray-600 dark:text-gray-400"}`}>
                  {msg.pesan}
                </p>
              </div>
              
              {!msg.isRead && (
                <div className="mt-4 flex justify-end">
                  <button className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
                    Tandai sudah dibaca
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
