# API Reference Documentation - Patroli.site

Dokumentasi RESTful API & WebSocket Patroli.site v1.0 untuk integrasi mobile client, dashboard admin, dan layanan pihak ketiga.

---

## 1. Spesifikasi Umum

- **Base URL**: `https://api.patroli.site/v1`
- **Format Pertukaran Data**: `application/json`
- **Format Waktu**: ISO 8601 UTC (`YYYY-MM-DDTHH:mm:ssZ`)
- **Autentikasi**: JSON Web Token (JWT) Bearer Token pada HTTP Header:
  ```http
  Authorization: Bearer <JWT_ACCESS_TOKEN>
  ```

---

## 2. Standar Struktur Respons

### Berhasil (Success)
```json
{
  "success": true,
  "message": "Deskripsi sukses",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### Gagal (Error)
```json
{
  "success": false,
  "error": {
    "code": "INVALID_GEOLOCATION",
    "message": "Koordinat scan berada di luar radius checkpoint yang diizinkan (Jarak: 120m, Maks: 50m)"
  }
}
```

---

## 3. Modul Autentikasi (`/auth`)

### `POST /auth/login`
Melakukan login pengguna (Admin / Petugas Satpam).

- **Request Body**:
```json
{
  "username": "satpam_budi",
  "password": "Password123!",
  "device_id": "device_fingerprint_unique"
}
```

- **Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "id": "usr_991823",
      "name": "Budi Santoso",
      "role": "petugas",
      "nik": "STP-2026-004",
      "assigned_zone": "Tower Barat"
    }
  }
}
```

---

## 4. Modul Checkpoint (`/checkpoints`)

### `GET /checkpoints`
Mengambil daftar semua titik checkpoint (dengan filter lokasi/zona).

- **Query Parameters**:
  - `zone`: string (opsional)
  - `status`: `active` | `inactive`
  - `page`: integer (default: 1)
  - `limit`: integer (default: 50)

- **Response `200 OK`**:
```json
{
  "success": true,
  "data": [
    {
      "id": "cp_81723",
      "code": "CP-A1-01",
      "name": "Pintu Gerbang Utama",
      "zone": "Perimeter Luar",
      "latitude": -6.2087634,
      "longitude": 106.845599,
      "radius_meters": 30,
      "qr_token": "SEC-QR-99a8bc7712",
      "is_active": true
    }
  ]
}
```

### `POST /checkpoints`
Membuat checkpoint baru (Khusus Role: Admin).

- **Request Body**:
```json
{
  "code": "CP-A1-02",
  "name": "Ruang Panel Listrik Lantai 1",
  "zone": "Utilitas",
  "latitude": -6.208851,
  "longitude": 106.845620,
  "radius_meters": 25,
  "checklist_items": ["Periksa gembok", "Periksa suhu panel", "Pastikan tidak ada bau terbakar"]
}
```

---

## 5. Modul Patroli & Scan (`/patrols`)

### `POST /patrols/scan`
Mengirimkan data rekaman scan QR checkpoint dari mobile app.

- **Request Body**:
```json
{
  "qr_token": "SEC-QR-99a8bc7712",
  "checkpoint_id": "cp_81723",
  "latitude": -6.208765,
  "longitude": 106.845590,
  "accuracy_meters": 12.5,
  "scanned_at": "2026-06-15T09:30:00Z",
  "status_condition": "normal",
  "notes": "Pintu terkunci aman",
  "photo_url": "https://storage.patroli.site/scans/scan_001.jpg",
  "checklist_results": [
    {"item": "Periksa gembok", "passed": true}
  ]
}
```

- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Scan checkpoint berhasil diverifikasi",
  "data": {
    "scan_id": "scn_109283",
    "distance_from_checkpoint_meters": 4.2,
    "is_valid_geofence": true,
    "next_checkpoint": {
      "id": "cp_81724",
      "name": "Ruang Server 101"
    }
  }
}
```

### `POST /patrols/sync-offline`
Sinkronisasi masal data scan saat koneksi internet kembali pulih.

- **Request Body**:
```json
{
  "items": [
    {
      "client_temp_id": "temp_001",
      "qr_token": "SEC-QR-99a8bc7712",
      "checkpoint_id": "cp_81723",
      "latitude": -6.208765,
      "longitude": 106.845590,
      "scanned_at": "2026-06-15T09:30:00Z",
      "status_condition": "normal"
    }
  ]
}
```

---

## 6. Modul Absensi (`/attendance`)

### `POST /attendance/check-in`
Melakukan absensi masuk tugas shift.

- **Request Body**:
```json
{
  "latitude": -6.208700,
  "longitude": 106.845500,
  "accuracy_meters": 10.0,
  "photo_selfie_url": "https://storage.patroli.site/attendance/selfie_01.jpg",
  "shift_id": "shift_pagi_01"
}
```

---

## 7. Modul Insiden & Panic Button (`/incidents`)

### `POST /incidents`
Melaporkan kejadian/insiden temuan di lapangan.

- **Request Body**:
```json
{
  "title": "Kaca Jendela Retak di Sisi Timur",
  "category": "facility_damage",
  "urgency": "medium",
  "location_description": "Dekat Tangga Darurat Lantai 3",
  "latitude": -6.208750,
  "longitude": 106.845600,
  "description": "Ditemukan pecahan kaca luar akibat angin kencang",
  "photo_urls": [
    "https://storage.patroli.site/incidents/inc_img_1.jpg"
  ]
}
```

### `POST /incidents/panic-button`
Pemicu sinyal alarm darurat instan.

- **Request Body**:
```json
{
  "latitude": -6.208760,
  "longitude": 106.845580,
  "emergency_type": "security_threat",
  "triggered_at": "2026-06-15T14:15:22Z"
}
```

- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Panic alert disiarkan ke semua kanal monitoring",
  "data": {
    "alert_id": "pnc_992182",
    "broadcast_dispatched": true,
    "active_responders_notified": 8
  }
}
```

---

## 8. Modul Ekspor Laporan (`/reports`)

### `GET /reports/patrol`
Mengunduh rekap laporan patroli.

- **Query Parameters**:
  - `start_date`: `2026-06-01`
  - `end_date`: `2026-06-30`
  - `format`: `pdf` | `xlsx` | `csv`
  - `zone_id`: string (opsional)

- **Response Header**:
```http
Content-Type: application/pdf (atau application/vnd.openxmlformats-officedocument.spreadsheetml.sheet)
Content-Disposition: attachment; filename="Laporan_Patroli_Juni_2026.pdf"
```
