import { useState, useEffect } from "react";
import PageMeta from "../../../components/common/PageMeta";
import Swal from "sweetalert2";
import { ApiService, PatrolLog } from "../../../services/api";

export default function LaporanPatroli() {
  const [logs, setLogs] = useState<PatrolLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getPatrolLogs();
      setLogs(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleExportCSV = () => {
    if (!logs.length) {
      Swal.fire("Info", "Tidak ada data untuk diekspor", "info");
      return;
    }

    const headers = ["ID Log", "Petugas", "Checkpoint", "Gedung / Lantai", "Status", "Jarak (m)", "Waktu Scan"];
    const rows = logs.map((l) => [
      `"${l.id}"`,
      `"${l.officer_name || '-'}"`,
      `"${l.checkpoint_name || '-'}"`,
      `"${l.building || '-'} / ${l.floor || '-'}"`,
      `"${l.status}"`,
      `"${l.distance_meters}"`,
      `"${new Date(l.created_at).toLocaleString('id-ID')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `Laporan_Patroli_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPDF = () => {
    const printWin = window.open("", "_blank");
    if (!printWin) return;

    const rowsHtml = logs.map((l) => `
      <tr>
        <td style="padding:6px;border:1px solid #ccc;">${l.officer_name || '-'}</td>
        <td style="padding:6px;border:1px solid #ccc;">${l.checkpoint_name || '-'}</td>
        <td style="padding:6px;border:1px solid #ccc;">${l.building || '-'} (${l.floor || '-'})</td>
        <td style="padding:6px;border:1px solid #ccc;text-align:center;">${l.status}</td>
        <td style="padding:6px;border:1px solid #ccc;text-align:center;">${l.distance_meters}m</td>
        <td style="padding:6px;border:1px solid #ccc;">${new Date(l.created_at).toLocaleString('id-ID')}</td>
      </tr>
    `).join("");

    printWin.document.write(`
      <html>
        <head>
          <title>Laporan Patroli - Patroli.site</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            h2 { margin-bottom: 5px; }
            p { color: #666; font-size: 12px; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 15px; }
            th { background: #f3f4f6; padding: 8px; border: 1px solid #ccc; text-align: left; }
          </style>
        </head>
        <body>
          <h2>Laporan Aktivitas Patroli Satpam</h2>
          <p>Dicetak pada: ${new Date().toLocaleString('id-ID')}</p>
          <table>
            <thead>
              <tr>
                <th>Petugas</th>
                <th>Checkpoint</th>
                <th>Lokasi</th>
                <th>Status</th>
                <th>Jarak</th>
                <th>Waktu Scan</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    `);
    printWin.document.close();
  };

  return (
    <>
      <PageMeta
        title="Patroli - Laporan Patroli"
        description="Rekapitulasi aktivitas patroli petugas"
      />
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">Laporan Patroli</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Rekap cakupan checkpoint dan performa rute patroli.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center justify-center rounded-xl border border-success-500 bg-white px-4 py-2 text-sm font-medium text-success-600 hover:bg-success-50 dark:bg-transparent dark:text-success-400"
            >
              Export CSV / Excel
            </button>
            <button
              onClick={handlePrintPDF}
              className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-600 active:scale-95"
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Memuat log patroli...</div>
            ) : logs.length === 0 ? (
              <div className="p-8 text-center text-gray-500">Belum ada rekaman patroli.</div>
            ) : (
              <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
                <thead className="bg-gray-50/50 text-xs uppercase text-gray-500 dark:bg-gray-900/50 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-4 font-bold">Nama Petugas</th>
                    <th className="px-6 py-4 font-bold">Checkpoint</th>
                    <th className="px-6 py-4 font-bold">Lokasi</th>
                    <th className="px-6 py-4 font-bold text-center">Jarak</th>
                    <th className="px-6 py-4 font-bold text-center">Status</th>
                    <th className="px-6 py-4 font-bold">Waktu Scan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {logs.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.officer_name || "Petugas"}</td>
                      <td className="px-6 py-4 font-medium">{row.checkpoint_name}</td>
                      <td className="px-6 py-4 text-xs">{row.building} • {row.floor}</td>
                      <td className="px-6 py-4 text-center">{row.distance_meters}m</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          row.status === "verified"
                            ? "bg-success-50 text-success-700 border border-success-200 dark:bg-success-500/10 dark:text-success-400"
                            : "bg-error-50 text-error-700 border border-error-200 dark:bg-error-500/10 dark:text-error-400"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs">{new Date(row.created_at).toLocaleString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
