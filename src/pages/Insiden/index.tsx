import { useState } from "react";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";

interface Insiden {
  id: string;
  pelapor: string;
  waktu: string;
  kategori: string;
  keterangan: string;
  prioritas: "Rendah" | "Sedang" | "Kritis";
  status: "Baru" | "Diproses" | "Selesai";
  foto: string;
}

const dummyData: Insiden[] = [
  {
    id: "INC-260605-001",
    pelapor: "Andi Saputra",
    waktu: "05 Jun 2026, 08:30 WIB",
    kategori: "Kebakaran",
    keterangan: "Terlihat asap dari panel listrik lantai 3 dekat tangga darurat.",
    prioritas: "Kritis",
    status: "Diproses",
    foto: "/images/user/user-18.jpg", // Mock foto pelapor
  },
  {
    id: "INC-260605-002",
    pelapor: "Budi Santoso",
    waktu: "05 Jun 2026, 10:15 WIB",
    kategori: "Kerusakan Fasilitas",
    keterangan: "Pipa air toilet pria lantai 1 bocor, menyebabkan genangan.",
    prioritas: "Sedang",
    status: "Selesai",
    foto: "/images/user/user-17.jpg",
  },
  {
    id: "INC-260605-003",
    pelapor: "Siti Rahma",
    waktu: "05 Jun 2026, 14:00 WIB",
    kategori: "Penyusup / Keamanan",
    keterangan: "Seseorang tidak dikenal memasuki area loading dock tanpa ID.",
    prioritas: "Kritis",
    status: "Baru",
    foto: "/images/user/user-20.jpg",
  },
  {
    id: "INC-260604-004",
    pelapor: "Andi Saputra",
    waktu: "04 Jun 2026, 19:45 WIB",
    kategori: "Lainnya",
    keterangan: "Lampu taman belakang padam total.",
    prioritas: "Rendah",
    status: "Selesai",
    foto: "/images/user/user-18.jpg",
  },
];

export default function InsidenList() {
  const [data] = useState<Insiden[]>(dummyData);
  const [filterStatus, setFilterStatus] = useState<string>("Semua");
  const [filterPrioritas, setFilterPrioritas] = useState<string>("Semua");
  const [selectedInsiden, setSelectedInsiden] = useState<Insiden | null>(null);

  // Logika Filter
  const filteredData = data.filter((item) => {
    const matchStatus = filterStatus === "Semua" || item.status === filterStatus;
    const matchPrioritas = filterPrioritas === "Semua" || item.prioritas === filterPrioritas;
    return matchStatus && matchPrioritas;
  });

  return (
    <>
      <PageMeta
        title="Patroli - Daftar Insiden"
        description="Pantau laporan insiden dan keadaan darurat."
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
              Insiden Darurat
            </li>
          </ol>
        </nav>
      </div>

      {/* Filter Panel */}
      <div className="mb-6 flex flex-wrap gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/[0.05] dark:bg-gray-800">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Filter Status</label>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-white"
          >
            <option value="Semua">Semua Status</option>
            <option value="Baru">Baru</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Filter Prioritas</label>
          <select 
            value={filterPrioritas}
            onChange={(e) => setFilterPrioritas(e.target.value)}
            className="rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-white"
          >
            <option value="Semua">Semua Prioritas</option>
            <option value="Rendah">Rendah</option>
            <option value="Sedang">Sedang</option>
            <option value="Kritis">Kritis</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.05]">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Log Pelaporan Insiden
            </h3>
          </div>

          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-800/50">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-semibold text-gray-600 text-start text-xs dark:text-gray-400 uppercase tracking-wider">
                    Info Insiden
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-semibold text-gray-600 text-start text-xs dark:text-gray-400 uppercase tracking-wider">
                    Waktu / Pelapor
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-semibold text-gray-600 text-center text-xs dark:text-gray-400 uppercase tracking-wider">
                    Prioritas
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-semibold text-gray-600 text-center text-xs dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-semibold text-gray-600 text-center text-xs dark:text-gray-400 uppercase tracking-wider">
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-gray-500">Tidak ada data yang cocok dengan filter.</TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <TableCell className="px-5 py-4 text-start align-top">
                        <span className="block font-bold text-gray-800 dark:text-white/90 text-sm mb-1">{item.kategori}</span>
                        <span className="block text-gray-500 dark:text-gray-400 text-xs truncate max-w-xs" title={item.keterangan}>
                          {item.keterangan}
                        </span>
                        <span className="mt-2 inline-block font-mono text-[10px] text-gray-400">ID: {item.id}</span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start align-top">
                        <span className="block font-medium text-gray-800 dark:text-gray-200 text-sm mb-1">{item.pelapor}</span>
                        <span className="block text-gray-500 dark:text-gray-400 text-xs">{item.waktu}</span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-center align-top">
                        <Badge
                          size="sm"
                          color={
                            item.prioritas === "Kritis" ? "error" :
                            item.prioritas === "Sedang" ? "warning" : "success"
                          }
                        >
                          {item.prioritas}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-center align-top">
                        <Badge
                          size="sm"
                          color={
                            item.status === "Baru" ? "error" :
                            item.status === "Diproses" ? "primary" : "success"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-center align-top">
                        <button
                          onClick={() => setSelectedInsiden(item)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm hover:bg-gray-50 hover:text-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Detail
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Slide-over / Drawer untuk Detail Insiden */}
      {selectedInsiden && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedInsiden(null)}
          ></div>
          
          {/* Drawer Panel */}
          <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
            <div className="w-full h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0 border-l border-gray-200 dark:border-gray-800">
              
              {/* Header Drawer */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Detail Insiden</h2>
                <button 
                  onClick={() => setSelectedInsiden(null)}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Konten Drawer */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Meta Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{selectedInsiden.kategori}</h3>
                    <p className="text-sm font-mono text-gray-500">{selectedInsiden.id}</p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge size="sm" color={selectedInsiden.prioritas === "Kritis" ? "error" : selectedInsiden.prioritas === "Sedang" ? "warning" : "success"}>
                      Prioritas: {selectedInsiden.prioritas}
                    </Badge>
                    <Badge size="sm" color={selectedInsiden.status === "Baru" ? "error" : selectedInsiden.status === "Diproses" ? "primary" : "success"}>
                      Status: {selectedInsiden.status}
                    </Badge>
                  </div>
                </div>

                <hr className="border-gray-200 dark:border-gray-800" />

                {/* Pelapor */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-3">Informasi Pelapor</h4>
                  <div className="flex items-center gap-3">
                    <img src={selectedInsiden.foto} alt="Pelapor" className="size-10 rounded-full object-cover border border-gray-200" />
                    <div>
                      <p className="text-sm font-bold text-gray-800 dark:text-white">{selectedInsiden.pelapor}</p>
                      <p className="text-xs text-gray-500">{selectedInsiden.waktu}</p>
                    </div>
                  </div>
                </div>

                {/* Keterangan */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">Kronologi / Keterangan</h4>
                  <div className="rounded-xl bg-gray-50 p-4 border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      "{selectedInsiden.keterangan}"
                    </p>
                  </div>
                </div>

                {/* Lampiran Bukti */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">Lampiran Bukti</h4>
                  <div className="aspect-video w-full rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="text-center text-gray-400">
                      <svg className="mx-auto size-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs">Foto bukti terlampir</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer Drawer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedInsiden(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Tutup
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg shadow-sm hover:bg-brand-600">
                  Update Status
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
