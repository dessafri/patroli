import React, { useState } from "react";
import PageMeta from "../../../components/common/PageMeta";
import Swal from "sweetalert2";

export default function LaporanInsiden() {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  const mockData = [
    { id: 1, pelapor: "Andi Saputra", tanggal: "05 Jun 2026", waktu: "10:30", kategori: "Keamanan", prioritas: "Tinggi", status: "Selesai", deskripsi: "Pintu gerbang timur ditemukan tidak terkunci." },
    { id: 2, pelapor: "Budi Santoso", tanggal: "05 Jun 2026", waktu: "14:15", kategori: "Fasilitas", prioritas: "Sedang", status: "Diproses", deskripsi: "Lampu koridor lantai 3 padam." },
    { id: 3, pelapor: "Citra Lestari", tanggal: "04 Jun 2026", waktu: "09:00", kategori: "Darurat", prioritas: "Kritis", status: "Selesai", deskripsi: "Alarm kebakaran berbunyi di zona B." },
  ];

  const handleExport = (type: "pdf" | "excel") => {
    if (type === "pdf") setIsExportingPDF(true);
    if (type === "excel") setIsExportingExcel(true);

    setTimeout(() => {
      if (type === "pdf") setIsExportingPDF(false);
      if (type === "excel") setIsExportingExcel(false);

      Swal.fire({
        title: "Ekspor Berhasil",
        text: `Laporan Insiden telah diunduh dalam format ${type.toUpperCase()}.`,
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });
    }, 2000);
  };

  return (
    <>
      <PageMeta
        title="Laporan Insiden | Patroli.site"
        description="Rekapitulasi riwayat insiden dan keadaan darurat"
      />
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">Laporan Insiden</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Rekap riwayat penanganan insiden dan keadaan darurat.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleExport("excel")}
              disabled={isExportingExcel || isExportingPDF}
              className={`inline-flex items-center justify-center rounded-xl border border-success-500 px-4 py-2 text-sm font-medium transition-colors ${
                isExportingExcel
                  ? "bg-success-100 text-success-500 cursor-not-allowed dark:bg-success-500/20"
                  : "bg-white text-success-600 hover:bg-success-50 hover:text-success-700 dark:bg-transparent dark:text-success-400 dark:hover:bg-success-500/10"
              }`}
            >
              {isExportingExcel ? (
                <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              Export Excel
            </button>
            <button
              onClick={() => handleExport("pdf")}
              disabled={isExportingPDF || isExportingExcel}
              className={`inline-flex items-center justify-center rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors ${
                isExportingPDF ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-600 active:scale-95"
              }`}
            >
              {isExportingPDF ? (
                <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              )}
              Export PDF
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <input type="date" className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white" defaultValue="2026-06-05" />
          <span className="text-gray-400">s/d</span>
          <input type="date" className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white" defaultValue="2026-06-05" />
          <select className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white">
            <option value="">Semua Kategori</option>
            <option value="Keamanan">Keamanan</option>
            <option value="Fasilitas">Fasilitas</option>
            <option value="Darurat">Darurat</option>
          </select>
          <button className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">Filter</button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
              <thead className="bg-gray-50/50 text-xs uppercase text-gray-500 dark:bg-gray-900/50 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-4 font-bold">Waktu</th>
                  <th className="px-6 py-4 font-bold">Pelapor</th>
                  <th className="px-6 py-4 font-bold">Kategori</th>
                  <th className="px-6 py-4 font-bold">Deskripsi</th>
                  <th className="px-6 py-4 font-bold text-center">Prioritas</th>
                  <th className="px-6 py-4 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {mockData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">{row.tanggal}</div>
                      <div className="text-xs text-gray-500">{row.waktu} WIB</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.pelapor}</td>
                    <td className="px-6 py-4">{row.kategori}</td>
                    <td className="px-6 py-4 max-w-xs truncate" title={row.deskripsi}>{row.deskripsi}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        row.prioritas === "Kritis" ? "bg-error-50 text-error-700 border border-error-200 dark:bg-error-500/10 dark:border-error-500/20 dark:text-error-400"
                        : row.prioritas === "Tinggi" ? "bg-warning-50 text-warning-700 border border-warning-200 dark:bg-warning-500/10 dark:border-warning-500/20 dark:text-warning-400"
                        : "bg-brand-50 text-brand-700 border border-brand-200 dark:bg-brand-500/10 dark:border-brand-500/20 dark:text-brand-400"
                      }`}>
                        {row.prioritas}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        row.status === "Selesai" ? "bg-success-50 text-success-700 border border-success-200 dark:bg-success-500/10 dark:border-success-500/20 dark:text-success-400"
                        : row.status === "Diproses" ? "bg-brand-50 text-brand-700 border border-brand-200 dark:bg-brand-500/10 dark:border-brand-500/20 dark:text-brand-400"
                        : "bg-error-50 text-error-700 border border-error-200 dark:bg-error-500/10 dark:border-error-500/20 dark:text-error-400"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
}
