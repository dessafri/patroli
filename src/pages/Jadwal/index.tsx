import React, { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import Swal from "sweetalert2";
import Select from "react-select";

export default function JadwalPatroli() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Dummy data jadwal
  const mockSchedules = [
    { id: 1, tanggal: "05 Jun 2026", shift: "Pagi (08:00 - 16:00)", petugas: "Andi Saputra", checkpoint: "Gerbang Utama, Lobi Utama", status: "Aktif" },
    { id: 2, tanggal: "05 Jun 2026", shift: "Pagi (08:00 - 16:00)", petugas: "Budi Santoso", checkpoint: "Ruang Server, Gudang Belakang", status: "Aktif" },
    { id: 3, tanggal: "05 Jun 2026", shift: "Malam (16:00 - 00:00)", petugas: "Deni Irawan", checkpoint: "Area Parkir Basement", status: "Mendatang" },
  ];

  const handleSaveJadwal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    Swal.fire({
      title: "Jadwal Tersimpan",
      text: "Jadwal patroli baru berhasil ditambahkan.",
      icon: "success",
      confirmButtonColor: "#3B82F6",
    });
  };

  return (
    <>
      <PageMeta
        title="Patroli - Jadwal Patroli"
        description="Manajemen penugasan dan rute patroli"
      />
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">Jadwal Patroli</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Atur penugasan checkpoint untuk setiap petugas dan shift.</p>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow-brand-500/30 active:scale-95"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Buat Jadwal
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal:</span>
            <input type="date" className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white" defaultValue="2026-06-05" />
          </div>
          <select className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white">
            <option value="">Semua Shift</option>
            <option value="Pagi">Shift Pagi</option>
            <option value="Malam">Shift Malam</option>
          </select>
          <input type="text" placeholder="Cari petugas..." className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white" />
          <button className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">Cari</button>
        </div>

        {/* View Switcher: Timeline/Table Mock */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
              <thead className="bg-gray-50/50 text-xs uppercase text-gray-500 dark:bg-gray-900/50 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-4 font-bold">Tanggal</th>
                  <th className="px-6 py-4 font-bold">Shift</th>
                  <th className="px-6 py-4 font-bold">Petugas</th>
                  <th className="px-6 py-4 font-bold">Checkpoint Ditugaskan</th>
                  <th className="px-6 py-4 font-bold text-center">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {mockSchedules.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4">{row.tanggal}</td>
                    <td className="px-6 py-4">{row.shift}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.petugas}</td>
                    <td className="px-6 py-4 font-medium">{row.checkpoint}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        row.status === "Aktif" ? "bg-success-50 text-success-700 border border-success-200 dark:bg-success-500/10 dark:border-success-500/20 dark:text-success-400"
                        : "bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-brand-500 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 font-medium">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Slide-over Form: Buat Jadwal Baru */}
      {isDrawerOpen && (
        <div className="relative z-[100]" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsDrawerOpen(false)}
          ></div>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                {/* Panel */}
                <div className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700 translate-x-0">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
                    <div className="px-6 py-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white" id="slide-over-title">
                        Buat Jadwal Baru
                      </h2>
                      <button 
                        onClick={() => setIsDrawerOpen(false)}
                        className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 transition-colors"
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="relative flex-1 px-6 py-6">
                      <form onSubmit={handleSaveJadwal} className="space-y-5">
                        
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">Tanggal Patroli</label>
                          <input 
                            required 
                            type="date" 
                            onClick={(e) => {
                              try {
                                if ('showPicker' in HTMLInputElement.prototype) {
                                  (e.target as HTMLInputElement).showPicker();
                                }
                              } catch (err) {}
                            }}
                            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white" 
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">Shift</label>
                          <select required className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                            <option value="">Pilih Shift</option>
                            <option value="pagi">Pagi (08:00 - 16:00)</option>
                            <option value="malam">Malam (16:00 - 00:00)</option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">Petugas yang Ditugaskan</label>
                          <Select
                            isMulti
                            options={[
                              { value: "1", label: "Andi Saputra" },
                              { value: "2", label: "Budi Santoso" },
                              { value: "3", label: "Citra Lestari" },
                              { value: "4", label: "Deni Irawan" },
                            ]}
                            placeholder="Pilih petugas..."
                            classNamePrefix="react-select"
                            styles={{
                              control: (base) => ({
                                ...base,
                                borderRadius: '0.75rem',
                                padding: '0.2rem',
                                borderColor: '#D1D5DB', // gray-300
                                backgroundColor: '#F9FAFB', // gray-50
                                boxShadow: 'none',
                                '&:hover': {
                                  borderColor: '#3B82F6' // brand-500
                                }
                              }),
                              menu: (base) => ({
                                ...base,
                                borderRadius: '0.75rem',
                                overflow: 'hidden',
                                zIndex: 9999
                              }),
                              option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused ? '#EFF6FF' : 'white',
                                color: state.isFocused ? '#1D4ED8' : '#374151',
                                cursor: 'pointer',
                              }),
                              multiValue: (base) => ({
                                ...base,
                                backgroundColor: '#DBEAFE', // brand-100
                                borderRadius: '0.5rem',
                              }),
                              multiValueLabel: (base) => ({
                                ...base,
                                color: '#1E40AF', // brand-800
                                fontWeight: 600,
                              }),
                              multiValueRemove: (base) => ({
                                ...base,
                                color: '#1E40AF',
                                ':hover': {
                                  backgroundColor: '#BFDBFE',
                                  color: '#1E3A8A',
                                },
                              }),
                            }}
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">Daftar Checkpoint Ditugaskan</label>
                          <Select
                            isMulti
                            options={[
                              { value: "CP-01", label: "CP-01: Gerbang Utama" },
                              { value: "CP-02", label: "CP-02: Lobi Utama" },
                              { value: "CP-03", label: "CP-03: Ruang Server" },
                              { value: "CP-04", label: "CP-04: Gudang Belakang" },
                              { value: "CP-05", label: "CP-05: Area Parkir Basement" },
                              { value: "CP-06", label: "CP-06: Tangga Darurat Lt. 2" },
                            ]}
                            placeholder="Pilih checkpoint..."
                            classNamePrefix="react-select"
                            styles={{
                              control: (base) => ({
                                ...base,
                                borderRadius: '0.75rem',
                                padding: '0.2rem',
                                borderColor: '#D1D5DB',
                                backgroundColor: '#F9FAFB',
                                boxShadow: 'none',
                                '&:hover': {
                                  borderColor: '#3B82F6'
                                }
                              }),
                              menu: (base) => ({
                                ...base,
                                borderRadius: '0.75rem',
                                overflow: 'hidden',
                                zIndex: 9999
                              }),
                              option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused ? '#EFF6FF' : 'white',
                                color: state.isFocused ? '#1D4ED8' : '#374151',
                                cursor: 'pointer',
                              }),
                              multiValue: (base) => ({
                                ...base,
                                backgroundColor: '#DBEAFE',
                                borderRadius: '0.5rem',
                              }),
                              multiValueLabel: (base) => ({
                                ...base,
                                color: '#1E40AF',
                                fontWeight: 600,
                              }),
                              multiValueRemove: (base) => ({
                                ...base,
                                color: '#1E40AF',
                                ':hover': {
                                  backgroundColor: '#BFDBFE',
                                  color: '#1E3A8A',
                                },
                              }),
                            }}
                          />
                        </div>

                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                          <button
                            type="button"
                            onClick={() => setIsDrawerOpen(false)}
                            className="flex-1 rounded-xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            Batal
                          </button>
                          <button
                            type="submit"
                            className="flex-1 rounded-xl bg-brand-500 px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-600 hover:shadow-brand-500/30 active:scale-95"
                          >
                            Simpan Jadwal
                          </button>
                        </div>

                      </form>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
