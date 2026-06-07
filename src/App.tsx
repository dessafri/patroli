import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import SignIn from "./pages/AuthPages/SignIn";

function RoutingHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // 1. Cek Login
    if (!isLoggedIn && location.pathname !== "/signin") {
      navigate("/signin", { replace: true });
      return;
    }

    // 2. Redirect ke PWA jika membuka halaman root dari mobile & sudah login
    if (isLoggedIn && isMobile && location.pathname === "/") {
      navigate("/mobile/dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}

import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import MobileLayout from "./layout/MobileLayout";
import MobileDashboard from "./pages/Mobile/Dashboard";
import MobileAbsensi from "./pages/Mobile/Absensi";
import MobileScan from "./pages/Mobile/Scan";
import MobileScanResult from "./pages/Mobile/ScanResult";
import MobileProfile from "./pages/Mobile/Profile";
import PwaInstallPrompt from "./components/common/PwaInstallPrompt";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

import PetugasList from "./pages/Petugas";
import FormPetugas from "./pages/Petugas/FormPetugas";

import CheckpointList from "./pages/Checkpoint";
import FormCheckpoint from "./pages/Checkpoint/FormCheckpoint";

import AbsensiList from "./pages/Absensi";

import MobileIncidentCreate from "./pages/Mobile/Incident/create";
import InsidenList from "./pages/Insiden";
import BroadcastMessage from "./pages/Broadcast";
import MobileInbox from "./pages/Mobile/Inbox";

import JadwalPatroli from "./pages/Jadwal";
import LaporanKehadiran from "./pages/Laporan/Kehadiran";
import LaporanPatroli from "./pages/Laporan/Patroli";
import LaporanInsiden from "./pages/Laporan/Insiden";
import ManajemenAkun from "./pages/Akun";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <RoutingHandler />
        <PwaInstallPrompt />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Petugas CRUD */}
            <Route path="/petugas" element={<PetugasList />} />
            <Route path="/petugas/create" element={<FormPetugas />} />
            <Route path="/petugas/edit/:id" element={<FormPetugas />} />

            {/* Checkpoint CRUD */}
            <Route path="/checkpoint" element={<CheckpointList />} />
            <Route path="/checkpoint/create" element={<FormCheckpoint />} />
            <Route path="/checkpoint/edit/:id" element={<FormCheckpoint />} />

            {/* Absensi */}
            <Route path="/absensi" element={<AbsensiList />} />

            {/* Insiden */}
            <Route path="/insiden" element={<InsidenList />} />

            {/* Broadcast */}
            <Route path="/broadcast" element={<BroadcastMessage />} />

            {/* Laporan & Analitik */}
            <Route path="/laporan/kehadiran" element={<LaporanKehadiran />} />
            <Route path="/laporan/patroli" element={<LaporanPatroli />} />
            <Route path="/laporan/insiden" element={<LaporanInsiden />} />

            {/* Jadwal Patroli */}
            <Route path="/jadwal" element={<JadwalPatroli />} />

            {/* Manajemen Akun */}
            <Route path="/akun" element={<ManajemenAkun />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />

          {/* Mobile Petugas Layout */}
          <Route element={<MobileLayout />}>
            <Route path="/mobile/dashboard" element={<MobileDashboard />} />
            <Route path="/mobile/absensi" element={<MobileAbsensi />} />
            <Route path="/mobile/scan" element={<MobileScan />} />
            <Route path="/mobile/scan-result" element={<MobileScanResult />} />
            <Route path="/mobile/insiden/create" element={<MobileIncidentCreate />} />
            <Route path="/mobile/inbox" element={<MobileInbox />} />
            <Route path="/mobile/profile" element={<MobileProfile />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
