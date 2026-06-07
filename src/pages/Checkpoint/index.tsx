import { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import QRCode from "react-qr-code";
import PageMeta from "../../components/common/PageMeta";
import { Modal } from "../../components/ui/modal";
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

interface Checkpoint {
  id: number;
  name: string;
  building: string;
  floor: string;
  zone: string;
  qrId: string;
  status: string;
}

const dummyData: Checkpoint[] = [
  {
    id: 1,
    name: "Lobi Utama",
    building: "Tower A",
    floor: "Lantai Dasar",
    zone: "Zona Publik",
    qrId: "CP-TWA-LD-001",
    status: "Active",
  },
  {
    id: 2,
    name: "Ruang Server",
    building: "Tower A",
    floor: "Lantai 5",
    zone: "Zona Terbatas",
    qrId: "CP-TWA-L5-002",
    status: "Active",
  },
  {
    id: 3,
    name: "Area Parkir VIP",
    building: "Tower B",
    floor: "Basement 1",
    zone: "Zona Parkir",
    qrId: "CP-TWB-B1-001",
    status: "Inactive",
  },
];

export default function CheckpointList() {
  const [data, setData] = useState<Checkpoint[]>(dummyData);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [selectedQrId, setSelectedQrId] = useState("");

  const handleOpenPrint = (qrId: string) => {
    setSelectedQrId(qrId);
    setPrintModalOpen(true);
  };

  const handlePrint = () => {
    const svg = document.getElementById("qr-code-svg");
    if (svg) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head><title>Print QR Checkpoint</title></head>
            <body style="display:flex;justify-content:center;align-items:center;height:100vh;margin:0;">
              <div style="text-align:center;">
                ${svg.outerHTML}
                <h2 style="font-family:sans-serif;margin-top:20px;">${selectedQrId}</h2>
              </div>
              <script>
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 500);
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  const handleDownload = () => {
    const svg = document.getElementById("qr-code-svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `QR_${selectedQrId}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Checkpoint yang dihapus tidak dapat dikembalikan!",
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
          text: "Checkpoint berhasil dihapus.",
          icon: "success",
          confirmButtonColor: "#3085d6"
        });
      }
    });
  };

  return (
    <>
      <PageMeta
        title="Manajemen Checkpoint | Patroli.site"
        description="Manajemen data checkpoint keamanan Patroli.site"
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
              Manajemen Checkpoint
            </li>
          </ol>
        </nav>
      </div>

      <div className="space-y-6">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.05]">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Daftar Checkpoint
            </h3>
            <Link to="/checkpoint/create">
              <Button size="sm" startIcon={<PlusIcon />}>Tambah Checkpoint</Button>
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
                      Nama Checkpoint
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Lokasi
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      QR ID
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
                  {data.map((checkpoint) => (
                    <TableRow key={checkpoint.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {checkpoint.name}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <span className="block font-medium">{checkpoint.building}</span>
                        <span className="block text-theme-xs">{checkpoint.floor} • {checkpoint.zone}</span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge size="sm" color="light">
                          {checkpoint.qrId}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={
                            checkpoint.status === "Active"
                              ? "success"
                              : checkpoint.status === "Inactive"
                              ? "warning"
                              : "error"
                          }
                        >
                          {checkpoint.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenPrint(checkpoint.qrId)}
                            className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500"
                            title="Cetak QR"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 6 2 18 2 18 9"></polyline>
                              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                              <rect x="6" y="14" width="12" height="8"></rect>
                            </svg>
                          </button>
                          <Link to={`/checkpoint/edit/${checkpoint.id}`}>
                            <button className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500">
                              <PencilIcon className="size-5" />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(checkpoint.id)}
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

      <Modal isOpen={printModalOpen} onClose={() => setPrintModalOpen(false)} className="max-w-[400px] p-6">
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Cetak QR Checkpoint</h3>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <QRCode
              id="qr-code-svg"
              value={selectedQrId}
              size={200}
              level="H"
            />
          </div>
          <p className="text-lg font-mono font-medium text-gray-700 dark:text-gray-300">
            {selectedQrId}
          </p>
          <div className="flex w-full gap-3 mt-4">
            <Button variant="outline" className="w-full" onClick={() => setPrintModalOpen(false)}>
              Batal
            </Button>
            <Button variant="outline" className="w-full" onClick={handleDownload}>
              Download
            </Button>
            <Button variant="primary" className="w-full" onClick={handlePrint}>
              Cetak
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
