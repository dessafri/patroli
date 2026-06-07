import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { get, set } from "idb-keyval";
import Swal from "sweetalert2";

export interface QueuedReport {
  id: string;
  qrCode: string;
  notes: string;
  photoBase64: string;
  location: { lat: number; lng: number };
  timestamp: number;
}

interface OfflineQueueContextType {
  isOnline: boolean;
  queueCount: number;
  addToQueue: (report: QueuedReport) => Promise<void>;
}

const OfflineQueueContext = createContext<OfflineQueueContextType>({
  isOnline: true,
  queueCount: 0,
  addToQueue: async () => {},
});

export const useOfflineQueue = () => useContext(OfflineQueueContext);

const QUEUE_KEY = "patroli_offline_queue";

export function OfflineQueueProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queueCount, setQueueCount] = useState(0);

  // Muat jumlah antrean saat pertama kali dirender
  const loadQueueCount = async () => {
    try {
      const queue = await get<QueuedReport[]>(QUEUE_KEY);
      if (queue) {
        setQueueCount(queue.length);
      }
    } catch (err) {
      console.error("Gagal memuat antrean dari IndexedDB", err);
    }
  };

  useEffect(() => {
    loadQueueCount();
  }, []);

  // Sinkronisasi antrean ke server saat online
  const syncQueue = async () => {
    try {
      const queue = await get<QueuedReport[]>(QUEUE_KEY) || [];
      if (queue.length === 0) return;

      // Simulasi pengiriman data ke server secara batch/satu-satu
      console.log(`Mensinkronisasi ${queue.length} laporan tertunda...`);
      
      // Kosongkan antrean jika berhasil (simulasi langsung berhasil)
      await set(QUEUE_KEY, []);
      setQueueCount(0);

      // Tampilkan notifikasi pop-up (Toast) ringan di sudut layar
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: 'success',
        title: `${queue.length} laporan berhasil disinkronisasi!`
      });

    } catch (err) {
      console.error("Gagal menyinkronkan antrean", err);
    }
  };

  // Event listener untuk status koneksi
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncQueue();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const addToQueue = async (report: QueuedReport) => {
    try {
      const queue = await get<QueuedReport[]>(QUEUE_KEY) || [];
      queue.push(report);
      await set(QUEUE_KEY, queue);
      setQueueCount(queue.length);
    } catch (err) {
      console.error("Gagal menyimpan ke antrean offline", err);
      throw err;
    }
  };

  return (
    <OfflineQueueContext.Provider value={{ isOnline, queueCount, addToQueue }}>
      {children}
    </OfflineQueueContext.Provider>
  );
}
