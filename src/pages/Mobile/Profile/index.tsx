import { useNavigate } from "react-router";
import PageMeta from "../../../components/common/PageMeta";

export default function MobileProfile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/signin", { replace: true });
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <PageMeta title="Patroli - Profil Petugas" description="Halaman Profil Petugas Patroli" />
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center mt-6">
        <div className="size-24 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center text-3xl font-bold mb-4">
          A
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Andi Saputra</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Petugas Keamanan</p>
        
        <div className="w-full space-y-3 mb-8">
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Email</span>
            <span className="text-gray-800 dark:text-white/90 text-sm font-medium">petugas@patroli.site</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Area Tugas</span>
            <span className="text-gray-800 dark:text-white/90 text-sm font-medium">Gedung Utama</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Shift</span>
            <span className="text-gray-800 dark:text-white/90 text-sm font-medium">Pagi (08:00 - 16:00)</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-error-50 hover:bg-error-100 text-error-600 dark:bg-error-500/10 dark:hover:bg-error-500/20 dark:text-error-500 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Keluar (Logout)
        </button>
      </div>
    </div>
  );
}
