import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import Swal from "sweetalert2";
import { MapContainer, TileLayer, Circle, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customMarkerIcon = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#465fff" class="w-8 h-8" style="filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.2))"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>`,
  className: "custom-leaflet-marker",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

import ReactSelect from "react-select";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";

// Helper component to handle map clicks
function MapClickMarker({
  setPosition,
}: {
  setPosition: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Helper component to dynamically update map center
function MapUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
}

const dummyData = [
  {
    id: 1,
    name: "Lobi Utama",
    building: "Tower A",
    floor: "Lantai Dasar",
    zone: "Zona Publik",
    latitude: -6.200000,
    longitude: 106.816666,
    radius: 50,
    status: "Active",
  },
];

export default function FormCheckpoint() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    building: "",
    floor: "",
    zone: "",
    latitude: -6.200000,
    longitude: 106.816666,
    radius: 50,
    status: "Active",
    provinceId: "",
    provinceName: "",
    regencyId: "",
    regencyName: "",
    districtId: "",
    districtName: "",
    villageId: "",
    villageName: "",
  });

  const [provinces, setProvinces] = useState<{id: string, name: string}[]>([]);
  const [regencies, setRegencies] = useState<{id: string, name: string}[]>([]);
  const [districts, setDistricts] = useState<{id: string, name: string}[]>([]);
  const [villages, setVillages] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then(res => res.json())
      .then(data => setProvinces(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (formData.provinceId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${formData.provinceId}.json`)
        .then(res => res.json())
        .then(data => setRegencies(data))
        .catch(err => console.error(err));
    } else {
      setRegencies([]);
    }
  }, [formData.provinceId]);

  useEffect(() => {
    if (formData.regencyId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${formData.regencyId}.json`)
        .then(res => res.json())
        .then(data => setDistricts(data))
        .catch(err => console.error(err));
    } else {
      setDistricts([]);
    }
  }, [formData.regencyId]);

  useEffect(() => {
    if (formData.districtId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${formData.districtId}.json`)
        .then(res => res.json())
        .then(data => setVillages(data))
        .catch(err => console.error(err));
    } else {
      setVillages([]);
    }
  }, [formData.districtId]);

  // Geocode when regional dropdowns change
  useEffect(() => {
    const queryParts = [
      formData.villageName,
      formData.districtName,
      formData.regencyName,
      formData.provinceName,
      "Indonesia"
    ].filter(Boolean);

    // Only geocode if at least province is selected
    if (queryParts.length > 1) {
      const query = queryParts.join(", ");
      fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            setFormData(prev => ({
              ...prev,
              latitude: parseFloat(data[0].lat),
              longitude: parseFloat(data[0].lon)
            }));
          }
        })
        .catch(err => console.error("Geocoding error:", err));
    }
  }, [formData.villageName, formData.districtName, formData.regencyName, formData.provinceName]);

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
          building: data.building,
          floor: data.floor,
          zone: data.zone,
          latitude: data.latitude,
          longitude: data.longitude,
          radius: data.radius,
          status: data.status,
        });
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleProvinceChange = (option: any) => {
    const value = option ? option.value : "";
    const name = option ? option.label : "";
    setFormData((prev) => ({ 
      ...prev, provinceId: value, provinceName: name,
      regencyId: "", regencyName: "", districtId: "", districtName: "", villageId: "", villageName: "" 
    }));
  };

  const handleRegencyChange = (option: any) => {
    const value = option ? option.value : "";
    const name = option ? option.label : "";
    setFormData((prev) => ({ 
      ...prev, regencyId: value, regencyName: name,
      districtId: "", districtName: "", villageId: "", villageName: "" 
    }));
  };

  const handleDistrictChange = (option: any) => {
    const value = option ? option.value : "";
    const name = option ? option.label : "";
    setFormData((prev) => ({ 
      ...prev, districtId: value, districtName: name,
      villageId: "", villageName: "" 
    }));
  };

  const handleVillageChange = (option: any) => {
    const value = option ? option.value : "";
    const name = option ? option.label : "";
    setFormData((prev) => ({ ...prev, villageId: value, villageName: name }));
  };

  const handleMapClick = (lat: number, lng: number) => {
    setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    Swal.fire({
      title: "Berhasil!",
      text: isEditMode ? "Data Checkpoint Berhasil Diubah" : "Data Checkpoint Berhasil Ditambahkan",
      icon: "success",
      confirmButtonColor: "#3085d6"
    }).then(() => {
      navigate("/checkpoint");
    });
  };

  return (
    <>
      <PageMeta
        title={`${isEditMode ? "Edit" : "Tambah"} Checkpoint | Patroli.site`}
        description={`Form untuk ${isEditMode ? "mengedit" : "menambah"} data checkpoint keamanan`}
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
                to="/checkpoint"
              >
                Manajemen Checkpoint
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
              {isEditMode ? "Edit Checkpoint" : "Tambah Checkpoint"}
            </li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ComponentCard title="Informasi Checkpoint">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Nama Checkpoint</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Misal: Lobi Utama"
                  required
                />
              </div>

              <div>
                <Label htmlFor="building">Gedung / Tower</Label>
                <Input
                  type="text"
                  id="building"
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                  placeholder="Misal: Tower A"
                  required
                />
              </div>

              <div>
                <Label htmlFor="floor">Lantai</Label>
                <Input
                  type="text"
                  id="floor"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  placeholder="Misal: Lantai Dasar"
                  required
                />
              </div>

              <div>
                <Label htmlFor="zone">Zona</Label>
                <Input
                  type="text"
                  id="zone"
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  placeholder="Misal: Zona Publik"
                  required
                />
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

            {/* Regional Configuration */}
            <div className="mt-8 border-t border-gray-200 dark:border-white/[0.05] pt-6">
              <h4 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                Lokasi Wilayah
              </h4>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label>Provinsi</Label>
                  <ReactSelect
                    options={provinces.map(p => ({ value: p.id, label: p.name }))}
                    placeholder="Pilih Provinsi..."
                    onChange={handleProvinceChange}
                    value={formData.provinceId ? { value: formData.provinceId, label: formData.provinceName } : null}
                    isClearable
                    className="react-select-container z-40"
                    classNamePrefix="react-select"
                  />
                </div>
                <div>
                  <Label>Kabupaten/Kota</Label>
                  <ReactSelect
                    options={regencies.map(r => ({ value: r.id, label: r.name }))}
                    placeholder="Pilih Kabupaten/Kota..."
                    onChange={handleRegencyChange}
                    value={formData.regencyId ? { value: formData.regencyId, label: formData.regencyName } : null}
                    isDisabled={!formData.provinceId}
                    isClearable
                    className="react-select-container z-30"
                    classNamePrefix="react-select"
                  />
                </div>
                <div>
                  <Label>Kecamatan</Label>
                  <ReactSelect
                    options={districts.map(d => ({ value: d.id, label: d.name }))}
                    placeholder="Pilih Kecamatan..."
                    onChange={handleDistrictChange}
                    value={formData.districtId ? { value: formData.districtId, label: formData.districtName } : null}
                    isDisabled={!formData.regencyId}
                    isClearable
                    className="react-select-container z-20"
                    classNamePrefix="react-select"
                  />
                </div>
                <div>
                  <Label>Kelurahan/Desa</Label>
                  <ReactSelect
                    options={villages.map(v => ({ value: v.id, label: v.name }))}
                    placeholder="Pilih Kelurahan/Desa..."
                    onChange={handleVillageChange}
                    value={formData.villageId ? { value: formData.villageId, label: formData.villageName } : null}
                    isDisabled={!formData.districtId}
                    isClearable
                    className="react-select-container z-10"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
            </div>

            {/* Geofence Configuration */}
            <div className="mt-8 border-t border-gray-200 dark:border-white/[0.05] pt-6">
              <h4 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                Konfigurasi Peta & Radius (Geofence)
              </h4>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    type="number"
                    step="any"
                    id="latitude"
                    name="latitude"
                    value={String(formData.latitude)}
                    onChange={handleNumberChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    type="number"
                    step="any"
                    id="longitude"
                    name="longitude"
                    value={String(formData.longitude)}
                    onChange={handleNumberChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="radius">Radius (Meter)</Label>
                  <Input
                    type="number"
                    id="radius"
                    name="radius"
                    value={String(formData.radius)}
                    onChange={handleNumberChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 dark:border-white/[0.05] relative z-0">
                <MapContainer
                  center={[formData.latitude, formData.longitude]}
                  zoom={16}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%", zIndex: 0 }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Circle
                    center={[formData.latitude, formData.longitude]}
                    pathOptions={{ color: 'blue', fillColor: 'blue' }}
                    radius={formData.radius}
                  />
                  <Marker 
                    position={[formData.latitude, formData.longitude]} 
                    icon={customMarkerIcon} 
                  />
                  <MapClickMarker setPosition={handleMapClick} />
                  <MapUpdater lat={formData.latitude} lng={formData.longitude} />
                </MapContainer>
                <div className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-theme-md text-sm border border-gray-200 dark:border-gray-700 pointer-events-none">
                  <p className="font-medium text-gray-800 dark:text-white">Klik pada peta</p>
                  <p className="text-gray-500 dark:text-gray-400">untuk mengatur titik lokasi</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-end mt-8">
              <Link to="/checkpoint">
                <Button variant="outline" type="button">
                  Batal
                </Button>
              </Link>
              <Button variant="primary" type="submit">
                {isEditMode ? "Simpan Perubahan" : "Simpan Checkpoint"}
              </Button>
            </div>
          </form>
        </ComponentCard>
      </div>
    </>
  );
}
