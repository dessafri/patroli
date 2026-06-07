import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import DatePicker from "../../components/form/date-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";

interface Absensi {
  id: number;
  petugasName: string;
  image: string;
  role: string;
  timeIn: string;
  timeOut: string | null;
  locationIn: string;
  locationOut: string | null;
  status: string;
}

const dummyData: Absensi[] = [
  {
    id: 1,
    petugasName: "Andi Saputra",
    image: "/images/user/user-17.jpg",
    role: "Komandan Regu",
    timeIn: "08:00 WIB",
    timeOut: null,
    locationIn: "-6.2000, 106.8166",
    locationOut: null,
    status: "Active",
  },
  {
    id: 2,
    petugasName: "Agus Setiawan",
    image: "/images/user/user-18.jpg",
    role: "Anggota",
    timeIn: "22:00 WIB",
    timeOut: "06:05 WIB",
    locationIn: "-6.2010, 106.8150",
    locationOut: "-6.2012, 106.8149",
    status: "Completed",
  },
  {
    id: 3,
    petugasName: "Cici Rahmawati",
    image: "/images/user/user-20.jpg",
    role: "Anggota",
    timeIn: "14:00 WIB",
    timeOut: "22:00 WIB",
    locationIn: "-6.2050, 106.8110",
    locationOut: "-6.2050, 106.8110",
    status: "Completed",
  },
];

export default function AbsensiList() {
  const [data] = useState<Absensi[]>(dummyData);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const handleDateChange = React.useCallback((_: any, dateStr: string) => {
    setFilterDate(dateStr);
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // In real scenario, filterDate would match item.date. Here we just mock it.
      // If a date is selected, we assume dummy data is from today, but let's just not hide it for demo, or hide it if it doesn't match a mocked date.
      // We will skip strict date filtering for dummy data unless needed.
      const matchStatus = filterStatus === "Semua" 
        ? true 
        : filterStatus === "Sedang Bertugas" 
          ? item.status === "Active" 
          : item.status === "Completed";
      
      return matchStatus;
    });
  }, [data, filterStatus, filterDate]);

  return (
    <>
      <PageMeta
        title="Manajemen Absensi | Patroli.site"
        description="Pantau absensi petugas keamanan hari ini"
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
                <svg
                  className="stroke-current"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li className="text-sm text-gray-800 dark:text-white/90">
              Absensi Petugas
            </li>
          </ol>
        </nav>
      </div>

      <div className="space-y-6">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.05]">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Daftar Absensi Hari Ini
            </h3>
            <div className="flex gap-3 items-center">
              <div className="w-56">
                <DatePicker 
                  id="filter-date"
                  mode="range"
                  placeholder="Pilih Rentang Tanggal"
                  isStatic={false}
                  onChange={handleDateChange}
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                <option value="Semua">Semua Status</option>
                <option value="Sedang Bertugas">Sedang Bertugas</option>
                <option value="Selesai">Selesai</option>
              </select>
              <Button size="sm" variant="outline">
                Export Laporan
              </Button>
            </div>
          </div>

          <div className="max-w-full overflow-x-auto">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Petugas
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Waktu (In / Out)
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Lokasi GPS
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {filteredData.map((absen) => (
                  <TableRow key={absen.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img
                            width={40}
                            height={40}
                            src={absen.image}
                            alt={absen.petugasName}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {absen.petugasName}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {absen.role}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <span className="block text-success-600 font-medium">In: {absen.timeIn}</span>
                      <span className="block text-error-500">Out: {absen.timeOut || "Belum Absen"}</span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <span className="block font-medium">In: {absen.locationIn}</span>
                      <span className="block text-theme-xs">Out: {absen.locationOut || "-"}</span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={absen.status === "Active" ? "success" : "light"}
                      >
                        {absen.status === "Active" ? "Sedang Bertugas" : "Selesai"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
