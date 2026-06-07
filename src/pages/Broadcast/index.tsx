import React, { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import PageMeta from "../../components/common/PageMeta";

export default function BroadcastMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    target: "Semua Petugas",
    urgensi: "Biasa",
    pesan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pesan) {
      Swal.fire("Peringatan", "Pesan pengumuman tidak boleh kosong.", "warning");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: "Pengumuman Terkirim!",
        text: `Pesan berhasil di-broadcast ke ${formData.target}.`,
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });
      setFormData({ ...formData, pesan: "" }); // Reset pesan setelah terkirim
    }, 1500);
  };

  return (
    <>
      <PageMeta
        title="Broadcast Pengumuman | Patroli.site"
        description="Kirim pengumuman atau instruksi darurat ke seluruh petugas."
      />
      
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <nav>
          <ol className="flex items-center gap-1.5">
            <li>
              <Link className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400" to="/">
                Home
                <svg className="stroke-current" width="17" height="16" viewBox="0 0 17 16" fill="none">
                  <path d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366" stroke="" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
            <li className="text-sm text-gray-800 dark:text-white/90">
              Broadcast Pengumuman
            </li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Broadcast */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Form Pengumuman Baru</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Target Penerima */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Target Penerima
                </label>
                <select 
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="Semua Petugas">Semua Petugas (All Active & Inactive)</option>
                  <option value="Petugas Shift Berjalan">Petugas Shift Berjalan (Clock-In)</option>
                  <option value="Grup: Tower A">Grup: Tower A</option>
                  <option value="Grup: Tower B">Grup: Tower B</option>
                </select>
              </div>

              {/* Urgensi */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Tingkat Urgensi
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Biasa", "Penting", "Bahaya"].map((level) => (
                    <label
                      key={level}
                      className={`flex cursor-pointer items-center justify-center rounded-xl border-2 py-2 text-sm font-medium transition-all ${
                        formData.urgensi === level
                          ? level === "Bahaya" 
                            ? "border-error-500 bg-error-50 text-error-700 dark:bg-error-500/20 dark:text-error-400"
                            : level === "Penting"
                              ? "border-warning-500 bg-warning-50 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400"
                              : "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400"
                          : "border-gray-200 bg-transparent text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgensi"
                        value={level}
                        className="hidden"
                        checked={formData.urgensi === level}
                        onChange={() => setFormData({ ...formData, urgensi: level })}
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>

              {/* Isi Pesan */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Pesan Pengumuman <span className="text-error-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={formData.pesan}
                  onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Ketik instruksi atau pengumuman di sini..."
                ></textarea>
                <p className="mt-1 text-xs text-gray-500">Pesan ini akan dikirim via PWA dan Push Notification ke perangkat yang dituju.</p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex w-full items-center justify-center rounded-xl px-4 py-4 text-sm font-bold text-white shadow-md transition-all active:scale-95 ${
                    isLoading ? "bg-brand-400 cursor-not-allowed" : "bg-brand-500 hover:bg-brand-600 hover:shadow-brand-500/30"
                  }`}
                >
                  {isLoading ? (
                    "Mengirim Broadcast..."
                  ) : (
                    <>
                      <svg className="mr-2 size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                      Siarkan Pesan
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Panel Bantuan / Riwayat Singkat */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-warning-200 bg-warning-50 p-6 shadow-sm dark:border-warning-500/20 dark:bg-warning-500/10">
            <h3 className="mb-2 flex items-center text-sm font-bold text-warning-800 dark:text-warning-300">
              <svg className="mr-2 size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Panduan Broadcast
            </h3>
            <ul className="space-y-2 text-sm text-warning-700 dark:text-warning-400">
              <li className="flex items-start">
                <span className="mr-2 mt-0.5">•</span>
                <span>Gunakan tingkat <b>Bahaya</b> hanya untuk instruksi darurat yang membutuhkan evakuasi atau perlindungan diri.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-0.5">•</span>
                <span>Pesan tidak bisa ditarik kembali setelah disiarkan. Pastikan redaksi pesan sudah benar.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </>
  );
}
