import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import Swal from "sweetalert2";

import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";

// Mocking some data for demonstration
const dummyData = [
  {
    id: 1,
    name: "Budi Santoso",
    nip: "198001012005011001",
    role: "Komandan Regu",
    email: "budi.santoso@patroli.site",
    phone: "081234567890",
    status: "Active",
  },
];

export default function FormPetugas() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    nip: "",
    email: "",
    phone: "",
    role: "",
    status: "Active",
  });

  const roleOptions = [
    { value: "Komandan Regu", label: "Komandan Regu" },
    { value: "Anggota", label: "Anggota" },
    { value: "Supervisor", label: "Supervisor" },
  ];

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  useEffect(() => {
    if (isEditMode) {
      // Mock fetching data by ID
      const data = dummyData.find((item) => item.id === Number(id));
      if (data) {
        setFormData({
          name: data.name,
          nip: data.nip,
          email: data.email,
          phone: data.phone,
          role: data.role,
          status: data.status,
        });
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save the data
    console.log("Form submitted:", formData);
    Swal.fire({
      title: "Berhasil!",
      text: isEditMode ? "Data Petugas Berhasil Diubah" : "Data Petugas Berhasil Ditambahkan",
      icon: "success",
      confirmButtonColor: "#3085d6"
    }).then(() => {
      navigate("/petugas");
    });
  };

  return (
    <>
      <PageMeta
        title={`${isEditMode ? "Edit" : "Tambah"} Petugas | Patroli.site`}
        description={`Form untuk ${isEditMode ? "mengedit" : "menambah"} data petugas keamanan Patroli.site`}
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
            <li>
              <Link
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500"
                to="/petugas"
              >
                Manajemen Petugas
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
              {isEditMode ? "Edit Petugas" : "Tambah Petugas"}
            </li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ComponentCard title="Informasi Petugas">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div>
                <Label htmlFor="nip">NIP (Nomor Induk Pegawai)</Label>
                <Input
                  type="text"
                  id="nip"
                  name="nip"
                  value={formData.nip}
                  onChange={handleChange}
                  placeholder="Masukkan NIP"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="info@patroli.site"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0812xxxxxx"
                  required
                />
              </div>

              <div>
                <Label>Jabatan / Role</Label>
                <Select
                  options={roleOptions}
                  placeholder="Pilih Jabatan"
                  onChange={handleRoleChange}
                  defaultValue={formData.role}
                  key={`role-${formData.role}`}
                  className="dark:bg-dark-900"
                />
                {/* Note: The Select component might need a way to set initial value depending on its implementation. */}
                {/* For this mock, we just pass options. */}
              </div>

              <div>
                <Label>Status</Label>
                <Select
                  options={statusOptions}
                  placeholder="Pilih Status"
                  onChange={handleStatusChange}
                  defaultValue={formData.status}
                  key={`status-${formData.status}`}
                  className="dark:bg-dark-900"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 justify-end">
              <Link to="/petugas">
                <Button variant="outline" type="button">
                  Batal
                </Button>
              </Link>
              <Button variant="primary" type="submit">
                {isEditMode ? "Simpan Perubahan" : "Simpan Petugas"}
              </Button>
            </div>
          </form>
        </ComponentCard>
      </div>
    </>
  );
}
