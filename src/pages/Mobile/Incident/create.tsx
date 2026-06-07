import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import PageMeta from "../../../components/common/PageMeta";

export default function MobileIncidentCreate() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    kategori: "",
    prioritas: "Sedang",
    keterangan: "",
  });
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("video/")) {
        // Untuk video, kita bisa menampilkan ikon video atau thumbnail jika memungkinkan.
        // Untuk kesederhanaan, tampilkan URL objek statis atau ikon.
        setFilePreview("video_placeholder");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.kategori) {
      Swal.fire("Perhatian", "Silakan pilih kategori insiden", "warning");
      return;
    }

    setIsLoading(true);

    // Simulasi pengiriman data
    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: "Laporan Terkirim!",
        text: "Insiden darurat telah dilaporkan ke pusat.",
        icon: "success",
        confirmButtonColor: "#ef4444", // error-500 color for emergency context
        confirmButtonText: "Kembali ke Beranda",
      }).then(() => {
        navigate("/mobile/dashboard");
      });
    }, 1500);
  };

  return (
    <>
      <PageMeta title="Lapor Insiden | Patroli.site" />
      <div className="flex min-h-full flex-col bg-gray-50 dark:bg-gray-900 pb-24">
        
        {/* Header Kustom Darurat */}
        <div className="bg-error-500 px-4 py-6 text-white shadow-md rounded-b-3xl mb-6">
          <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-error-100 hover:text-white">
            <svg className="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Lapor Insiden</h1>
              <p className="text-error-100 text-sm opacity-90">Kirim laporan darurat ke pusat pantau</p>
            </div>
          </div>
        </div>

        <div className="px-4">
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-5 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            
            {/* Kategori */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                Kategori Insiden <span className="text-error-500">*</span>
              </label>
              <select
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 focus:border-error-500 focus:outline-none focus:ring-1 focus:ring-error-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">-- Pilih Kategori --</option>
                <option value="Kebakaran">🔥 Kebakaran</option>
                <option value="Penyusup / Keamanan">🛡️ Penyusup / Kejahatan</option>
                <option value="Kerusakan Fasilitas">⚠️ Kerusakan Fasilitas</option>
                <option value="Keadaan Medis">🚑 Darurat Medis</option>
                <option value="Bencana Alam">🌪️ Bencana Alam</option>
                <option value="Lainnya">Lainnya...</option>
              </select>
            </div>

            {/* Prioritas */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                Tingkat Prioritas
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["Rendah", "Sedang", "Kritis"].map((level) => (
                  <label
                    key={level}
                    className={`flex cursor-pointer items-center justify-center rounded-xl border-2 py-2 text-sm font-medium transition-all ${
                      formData.prioritas === level
                        ? level === "Kritis" 
                          ? "border-error-500 bg-error-50 text-error-700 dark:bg-error-500/20 dark:text-error-400"
                          : level === "Sedang"
                            ? "border-warning-500 bg-warning-50 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400"
                            : "border-success-500 bg-success-50 text-success-700 dark:bg-success-500/20 dark:text-success-400"
                        : "border-gray-200 bg-transparent text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="prioritas"
                      value={level}
                      className="hidden"
                      checked={formData.prioritas === level}
                      onChange={() => setFormData({ ...formData, prioritas: level })}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            {/* Unggah Bukti */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                Unggah Bukti (Foto/Video)
              </label>
              {filePreview ? (
                <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600">
                  {filePreview === "video_placeholder" ? (
                     <div className="flex h-48 w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
                        <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="ml-2 text-sm font-medium text-gray-500">Video Dipilih</span>
                     </div>
                  ) : (
                    <img src={filePreview} alt="Preview" className="h-48 w-full object-cover" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                    <label className="cursor-pointer rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md hover:bg-white/30">
                      Ganti File
                      <input 
                        type="file" 
                        accept="image/*,video/*" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700/50 dark:hover:bg-gray-700">
                  <div className="flex flex-col items-center justify-center pb-6 pt-5 text-gray-400">
                    <svg className="mb-2 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium">Ketuk untuk memilih foto/video</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*,video/*" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            {/* Keterangan */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                Kronologi / Keterangan
              </label>
              <textarea
                rows={4}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-error-500 focus:outline-none focus:ring-1 focus:ring-error-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Jelaskan secara singkat apa yang terjadi..."
                value={formData.keterangan}
                onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
              ></textarea>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex w-full items-center justify-center rounded-xl px-4 py-4 text-sm font-bold text-white shadow-lg transition-all active:scale-95 ${
                  isLoading 
                    ? "bg-error-400 cursor-not-allowed" 
                    : "bg-error-500 hover:bg-error-600 hover:shadow-error-500/30"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="mr-2 h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mengirim Laporan...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    KIRIM LAPORAN INSIDEN
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
