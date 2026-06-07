import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

// Komponen untuk me-render heatmap
function HeatmapLayer({ points }: { points: [number, number, number][] }) {
  const map = useMap();

  useEffect(() => {
    // @ts-ignore - leaflet.heat menempelkan heatLayer ke global L
    const heat = L.heatLayer(points, {
      radius: 20,
      blur: 15,
      maxZoom: 17,
      gradient: { 0.4: "blue", 0.6: "cyan", 0.7: "lime", 0.8: "yellow", 1.0: "red" },
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
}

// Ikon kustom menggunakan Tailwind CSS
const officerIcon = L.divIcon({
  className: "bg-transparent border-none",
  html: `
    <div class="relative flex items-center justify-center w-8 h-8">
      <div class="absolute w-full h-full bg-brand-500 rounded-full opacity-20 animate-ping"></div>
      <div class="relative flex items-center justify-center w-6 h-6 bg-brand-500 border-2 border-white rounded-full shadow-md text-white">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const incidentIcon = L.divIcon({
  className: "bg-transparent border-none",
  html: `
    <div class="relative flex items-center justify-center w-8 h-8">
      <div class="absolute w-full h-full bg-error-500 rounded-full opacity-30 animate-pulse"></div>
      <div class="relative flex items-center justify-center w-6 h-6 bg-error-500 border-2 border-white rounded-full shadow-md text-white">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

export default function InteractiveMap() {
  // Pusat peta (Monas, Jakarta Pusat)
  const mapCenter: [number, number] = [-6.17511, 106.827153];

  // Data Mock Petugas
  const officers = [
    { id: 1, name: "Budi Santoso", status: "Patroli", location: [-6.1745, 106.8265] as [number, number] },
    { id: 2, name: "Andi Wijaya", status: "Siaga", location: [-6.1760, 106.8280] as [number, number] },
    { id: 3, name: "Siti Rahma", status: "Patroli", location: [-6.1735, 106.8290] as [number, number] },
  ];

  // Data Mock Insiden
  const incidents = [
    { id: 1, type: "Pintu Terbuka", time: "10:15", location: [-6.1775, 106.8260] as [number, number] },
  ];

  // Data Mock Heatmap (Riwayat Patroli)
  // Format: [lat, lng, intensitas]
  const heatPoints: [number, number, number][] = [
    [-6.175, 106.827, 0.8],
    [-6.1755, 106.8275, 0.6],
    [-6.176, 106.828, 0.9],
    [-6.174, 106.826, 0.5],
    [-6.1735, 106.825, 0.4],
    [-6.1765, 106.8285, 0.7],
    [-6.177, 106.829, 0.6],
    [-6.1745, 106.8295, 0.8],
    [-6.173, 106.8285, 0.5],
  ];

  // Fix untuk masalah z-index Leaflet agar tidak menimpa header
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ zIndex: 1 }}>
      <MapContainer 
        center={mapCenter} 
        zoom={16} 
        scrollWheelZoom={false}
        className="w-full h-full min-h-[400px]"
        style={{ zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Render Layer Heatmap */}
        <HeatmapLayer points={heatPoints} />

        {/* Render Marker Petugas */}
        {officers.map((officer) => (
          <Marker key={`officer-${officer.id}`} position={officer.location} icon={officerIcon}>
            <Popup>
              <div className="p-1">
                <p className="font-bold text-gray-800">{officer.name}</p>
                <p className="text-sm text-gray-500">Status: {officer.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render Marker Insiden */}
        {incidents.map((incident) => (
          <Marker key={`incident-${incident.id}`} position={incident.location} icon={incidentIcon}>
            <Popup>
              <div className="p-1">
                <p className="font-bold text-error-600">{incident.type}</p>
                <p className="text-sm text-gray-500">Waktu: {incident.time}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
