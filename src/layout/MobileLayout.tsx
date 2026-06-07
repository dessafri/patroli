import React from "react";
import { Outlet, Link, useLocation } from "react-router";
import { UserIcon, CheckCircleIcon } from "../icons";
import { OfflineQueueProvider, useOfflineQueue } from "../context/OfflineQueueContext";

const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const CameraIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

function LayoutContent() {
  const location = useLocation();
  const { isOnline, queueCount } = useOfflineQueue();

  const navItems = [
    { name: "Beranda", path: "/mobile/dashboard", icon: <HomeIcon className="size-6" /> },
    { name: "Absen", path: "/mobile/absensi", icon: <CheckCircleIcon className="size-6" /> },
    { name: "Scan QR", path: "/mobile/scan", icon: <CameraIcon className="size-6" /> },
    { name: "Profil", path: "/mobile/profile", icon: <UserIcon className="size-6" /> },
  ];

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header Mobile */}
      <header className="flex h-16 items-center justify-between bg-brand-500 px-4 text-white shadow-md">
        <div className="flex items-center gap-2">
          <svg className="size-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="white" fillOpacity="0.2"/>
            <path d="M16 6L6 10.4444V17.1111C6 23.3778 10.29 29.1556 16 30.6667C21.71 29.1556 26 23.3778 26 17.1111V10.4444L16 6ZM14.8889 22.8889L9.33333 17.3333L10.9 15.7667L14.8889 19.7444L21.1 13.5333L22.6667 15.1111L14.8889 22.8889Z" fill="white"/>
          </svg>
          <span className="text-lg font-bold">Patroli.site</span>
        </div>
        <div>
          <Link to="/mobile/inbox" className="relative block rounded-full p-2 hover:bg-white/10">
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute right-1.5 top-1.5 flex size-2 rounded-full bg-error-500"></span>
          </Link>
        </div>
      </header>

      {/* Offline Banner Indicator */}
      {!isOnline && (
        <div className="bg-warning-500 px-4 py-2 text-center text-sm font-semibold text-warning-950 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
            </svg>
            Mode Offline ({queueCount} Laporan Tertunda)
          </div>
        </div>
      )}

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full border-t border-gray-200 bg-white pb-safe dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-16 justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex w-full flex-col items-center justify-center space-y-1 ${
                  isActive ? "text-brand-500" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.icon}
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default function MobileLayout() {
  return (
    <OfflineQueueProvider>
      <LayoutContent />
    </OfflineQueueProvider>
  );
}
