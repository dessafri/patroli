import { useState } from "react";
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

interface Petugas {
  id: number;
  name: string;
  nip: string;
  role: string;
  email: string;
  phone: string;
  status: string;
  image: string;
}

const dummyData: Petugas[] = [
  {
    id: 1,
    name: "Budi Santoso",
    nip: "198001012005011001",
    role: "Komandan Regu",
    email: "budi.santoso@patroli.site",
    phone: "081234567890",
    status: "Active",
    image: "/images/user/user-17.jpg",
  },
  {
    id: 2,
    name: "Agus Setiawan",
    nip: "198202022006021002",
    role: "Anggota",
    email: "agus.setiawan@patroli.site",
    phone: "081298765432",
    status: "Active",
    image: "/images/user/user-18.jpg",
  },
  {
    id: 3,
    name: "Cici Rahmawati",
    nip: "198503032007032003",
    role: "Anggota",
    email: "cici.rahmawati@patroli.site",
    phone: "081345678901",
    status: "Inactive",
    image: "/images/user/user-20.jpg",
  },
];

export default function PetugasList() {
  const [data, setData] = useState<Petugas[]>(dummyData);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Petugas yang dihapus tidak dapat dikembalikan!",
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
          text: "Petugas berhasil dihapus.",
          icon: "success",
          confirmButtonColor: "#3085d6"
        });
      }
    });
  };

  return (
    <>
      <PageMeta
        title="Patroli - Manajemen Petugas"
        description="Manajemen data petugas keamanan Patroli.site"
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
              Manajemen Petugas
            </li>
          </ol>
        </nav>
      </div>

      <div className="space-y-6">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.05]">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Daftar Petugas
            </h3>
            <Link to="/petugas/create">
              <Button size="sm" startIcon={<PlusIcon />}>Tambah Petugas</Button>
            </Link>
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
                      Profil Petugas
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      NIP
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Kontak
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                    >
                      Aksi
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {data.map((petugas) => (
                    <TableRow key={petugas.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-full">
                            <img
                              width={40}
                              height={40}
                              src={petugas.image}
                              alt={petugas.name}
                            />
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {petugas.name}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              {petugas.role}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {petugas.nip}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <span className="block">{petugas.phone}</span>
                        <span className="block text-theme-xs">{petugas.email}</span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={
                            petugas.status === "Active"
                              ? "success"
                              : petugas.status === "Inactive"
                              ? "warning"
                              : "error"
                          }
                        >
                          {petugas.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                        <div className="flex items-center justify-center gap-2">
                          <Link to={`/petugas/edit/${petugas.id}`}>
                            <button className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500">
                              <PencilIcon className="size-5" />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(petugas.id)}
                            className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                          >
                            <TrashBinIcon className="size-5" />
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
    </>
  );
}
