import React, { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import { PlusIcon, PencilIcon, TrashBinIcon } from "../../icons";

interface Account {
  id: number;
  username: string;
  role: string;
  linkedProfile: string;
  lastLogin: string;
  status: string;
}

const mockAccounts: Account[] = [
  { id: 1, username: "admin_pusat", role: "Admin", linkedProfile: "-", lastLogin: "05 Jun 2026, 08:30 WIB", status: "Aktif" },
  { id: 2, username: "andi.saputra", role: "Petugas", linkedProfile: "Andi Saputra", lastLogin: "05 Jun 2026, 07:45 WIB", status: "Aktif" },
  { id: 3, username: "budi.santoso", role: "Petugas", linkedProfile: "Budi Santoso", lastLogin: "05 Jun 2026, 08:10 WIB", status: "Aktif" },
  { id: 4, username: "deni.irawan", role: "Petugas", linkedProfile: "Deni Irawan", lastLogin: "04 Jun 2026, 16:00 WIB", status: "Blokir" },
];

export default function ManajemenAkun() {
  const [data, setData] = useState<Account[]>(mockAccounts);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // State form
  const [role, setRole] = useState("Petugas");
  const [showPassword, setShowPassword] = useState(false);

  const handleSaveAkun = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    Swal.fire({
      title: "Akun Tersimpan",
      text: "Kredensial login berhasil dibuat dan diaktifkan.",
      icon: "success",
      confirmButtonColor: "#3B82F6",
    });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Akun yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        setData(data.filter((item) => item.id !== id));
        Swal.fire({
          title: "Terhapus!",
          text: "Akun berhasil dihapus.",
          icon: "success",
          confirmButtonColor: "#3085d6"
        });
      }
    });
  };

  return (
    <>
      <PageMeta
        title="Manajemen Akun Login | Patroli.site"
        description="Kelola hak akses dan kredensial pengguna"
      />
      
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <nav>
          <ol className="flex items-center gap-1.5">
            <li>
              <Link
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500"
                to="/"
              >
                Home
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
            <li className="text-sm text-gray-800 dark:text-white/90">
              Manajemen Akun
            </li>
          </ol>
        </nav>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">Manajemen Akun</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Atur username, password, dan hak akses pengguna sistem.</p>
          </div>
          <Button
            size="sm"
            onClick={() => {
              setRole("Petugas");
              setIsDrawerOpen(true);
            }}
            startIcon={<PlusIcon className="size-4" />}
          >
            Buat Akun
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <select className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white">
            <option value="">Semua Role</option>
            <option value="Admin">Admin</option>
            <option value="Petugas">Petugas</option>
          </select>
          <select className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white">
            <option value="">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Blokir">Blokir</option>
          </select>
          <input type="text" placeholder="Cari username..." className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white" />
          <button className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">Cari</button>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="overflow-x-auto max-w-full">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Username</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Role</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Terkait Profil</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Terakhir Login</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Status</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400 text-right">Aksi</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <TableCell className="px-5 py-4 font-medium text-gray-900 dark:text-white">{row.username}</TableCell>
                    <TableCell className="px-5 py-4">
                      <Badge color={row.role === "Admin" ? "light" : "light"} size="sm">
                        {row.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-400">{row.linkedProfile}</TableCell>
                    <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-400 text-xs">{row.lastLogin}</TableCell>
                    <TableCell className="px-5 py-4">
                      <Badge color={row.status === "Aktif" ? "success" : "error"} size="sm">
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                          <PencilIcon className="size-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(row.id)}
                          className="rounded-lg p-2 text-error-500 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10"
                        >
                          <TrashBinIcon className="size-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Slide-over Form: Buat Akun Baru */}
      {isDrawerOpen && (
        <div className="relative z-[100]" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div 
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700 translate-x-0">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
                    <div className="px-6 py-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white" id="slide-over-title">
                        Detail Akun
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
                      <form onSubmit={handleSaveAkun} className="space-y-5">
                        
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">Hak Akses (Role)</label>
                          <div className="grid grid-cols-2 gap-3">
                            <label className={`flex cursor-pointer items-center justify-center rounded-xl border-2 py-3 text-sm font-bold transition-all ${
                              role === "Admin" ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400" : "border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400"
                            }`}>
                              <input type="radio" name="role" value="Admin" className="hidden" checked={role === "Admin"} onChange={() => setRole("Admin")} />
                              Admin Pusat
                            </label>
                            <label className={`flex cursor-pointer items-center justify-center rounded-xl border-2 py-3 text-sm font-bold transition-all ${
                              role === "Petugas" ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400" : "border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400"
                            }`}>
                              <input type="radio" name="role" value="Petugas" className="hidden" checked={role === "Petugas"} onChange={() => setRole("Petugas")} />
                              Petugas PWA
                            </label>
                          </div>
                        </div>

                        {role === "Petugas" && (
                          <div className="animate-in fade-in slide-in-from-top-2">
                            <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">Kaitkan ke Profil Petugas</label>
                            <select required className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                              <option value="">-- Pilih Profil Petugas --</option>
                              <option value="1">Andi Saputra</option>
                              <option value="2">Budi Santoso</option>
                              <option value="3">Citra Lestari</option>
                              <option value="4">Deni Irawan</option>
                            </select>
                            <p className="mt-1 text-[10px] text-gray-500">Akun ini hanya dapat login ke PWA Mobile sebagai petugas yang dipilih.</p>
                          </div>
                        )}

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">Username</label>
                          <input required type="text" placeholder="Gunakan huruf kecil tanpa spasi" className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">Password</label>
                          <div className="relative">
                            <input 
                              required 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Minimal 6 karakter" 
                              className="w-full rounded-xl border border-gray-300 bg-gray-50 pl-4 pr-10 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white" 
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {showPassword ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                )}
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                          <div>
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Status Akun</p>
                            <p className="text-xs text-gray-500">Tentukan apakah akun ini diizinkan untuk login.</p>
                          </div>
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" value="" className="peer sr-only" defaultChecked />
                            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-success-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700"></div>
                          </label>
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
                            Simpan Akun
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
