import { apiClient } from "./apiClient";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "supervisor" | "petugas";
  phone?: string;
}

export interface Checkpoint {
  id: string;
  name: string;
  building: string;
  floor: string;
  zone: string;
  qr_token: string;
  latitude: number;
  longitude: number;
  allowed_radius_meters: number;
  is_active: number;
  created_at: string;
}

export interface PatrolLog {
  id: string;
  user_id: string;
  checkpoint_id: string;
  latitude: number;
  longitude: number;
  distance_meters: number;
  photo_url?: string;
  notes?: string;
  status: "verified" | "out_of_range";
  officer_name?: string;
  checkpoint_name?: string;
  building?: string;
  floor?: string;
  zone?: string;
  created_at: string;
}

export interface AttendanceRecord {
  id: string;
  user_id: string;
  type: "clock_in" | "clock_out";
  latitude: number;
  longitude: number;
  photo_url?: string;
  officer_name?: string;
  email?: string;
  created_at: string;
}

export interface IncidentRecord {
  id: string;
  user_id: string;
  checkpoint_id?: string;
  title: string;
  category: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "reported" | "in_progress" | "resolved";
  description: string;
  photo_url?: string;
  reporter_name?: string;
  created_at: string;
}

export interface DashboardMetrics {
  totalGuards: number;
  totalCheckpoints: number;
  totalPatrols: number;
  activeIncidents: number;
  activePanics: number;
}

export const ApiService = {
  // Auth
  login: (data: { email: string; password: string }) =>
    apiClient<{ token: string; user: User }>("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  getMe: () => apiClient<{ user: User }>("/auth/me"),

  // Checkpoints
  getCheckpoints: () => apiClient<Checkpoint[]>("/checkpoints"),
  createCheckpoint: (data: Partial<Checkpoint>) =>
    apiClient<Checkpoint>("/checkpoints", { method: "POST", body: JSON.stringify(data) }),
  deleteCheckpoint: (id: string) =>
    apiClient<{ success: boolean }>(`/checkpoints/${id}`, { method: "DELETE" }),

  // Patrols
  submitScan: (data: { qrToken: string; latitude: number; longitude: number; photoUrl?: string; notes?: string }) =>
    apiClient<{ log: PatrolLog; checkpoint: Checkpoint; distance: number; status: string }>("/patrols/scan", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getPatrolLogs: () => apiClient<PatrolLog[]>("/patrols/logs"),

  // Attendance
  submitAttendance: (data: { type: "clock_in" | "clock_out"; latitude: number; longitude: number; photoUrl?: string }) =>
    apiClient<AttendanceRecord>("/attendance", { method: "POST", body: JSON.stringify(data) }),
  getAttendance: () => apiClient<AttendanceRecord[]>("/attendance"),

  // Incidents
  submitIncident: (data: { title: string; category?: string; priority?: string; description: string; photoUrl?: string; latitude?: number; longitude?: number }) =>
    apiClient<IncidentRecord>("/incidents", { method: "POST", body: JSON.stringify(data) }),
  getIncidents: () => apiClient<IncidentRecord[]>("/incidents"),

  // Panic
  triggerPanic: (data: { latitude: number; longitude: number; notes?: string }) =>
    apiClient<{ success: boolean; panic: any }>("/panic", { method: "POST", body: JSON.stringify(data) }),

  // Metrics
  getMetrics: () => apiClient<DashboardMetrics>("/dashboard/metrics"),
};
