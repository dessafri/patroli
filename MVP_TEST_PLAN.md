# MVP Test Plan & Test Cases Matrix: Patroli.site

**System Under Test:** Patroli.site (React PWA + REST Backend API)  
**Target Architecture:** Mobile Satpam (PWA Field App) + Admin Web Dashboard  
**Quality Lead:** QA Team Lead  
**Document Version:** 1.0.0  

---

## 1. Test Scope & Focus Areas

| Area | Component | Key Risks & Target Features |
| :--- | :--- | :--- |
| **Mobile Satpam (PWA)** | QR Scanner, Geolocation, IndexedDB / Cache Storage, Service Worker | Low light / damaged QR, camera torch, fake GPS mock locations, offline scan caching & retry sync, panic button latency. |
| **Admin Dashboard** | Web SPA, REST API, WebSockets / SSE | Real-time map pins, RBAC enforcement, incident resolution, schedule assignment, reporting math & export fidelity. |
| **Security & Auth** | JWT Auth Middleware, RBAC Router | Token expiration, privilege escalation, replay attacks on offline queue, geo-spoofing rejection. |

---

## 2. Test Cases Matrix

### Module 1: Mobile Satpam - QR Scanning & Low Light

| ID | Test Scenario | Type | Steps / Preconditions | Expected Result | Severity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-MOB-QR-01** | Successful scan at valid checkpoint | Positive | 1. Open scanner on mobile.<br>2. Point camera at authorized checkpoint QR.<br>3. Device GPS is within allowed radius (<= 50m). | QR decoded instantly (< 1.5s). Validates against server/cached checkpoint ID. Redirects to checkpoint inspection form. | Critical |
| **TC-MOB-QR-02** | Scan in low-light environment with Torch toggle | Positive | 1. Enter dark/unlit checkpoint zone (< 10 lux).<br>2. Tap "Torch/Flash" toggle icon in scanner UI.<br>3. Scan QR code. | Device flashlight turns ON via `MediaTrackCapabilities.torch`. Scanner successfully reads QR without focus hunting. | High |
| **TC-MOB-QR-03** | Scan damaged / partially obscured QR | Negative | 1. Scan printed QR with up to 30% corner tear/smudge (within error correction limit). | QR decoder error correction (ECC Level H/M) resolves token successfully. | Medium |
| **TC-MOB-QR-04** | Scan invalid / foreign QR code | Negative | 1. Point camera at standard URL or product barcode/non-Patroli QR. | Scanner rejects payload. Shows toast: `"QR Code tidak valid atau bukan checkpoint terdaftar"`. No state corruption. | High |
| **TC-MOB-QR-05** | Camera permission denied | Negative | 1. User denies browser camera prompt.<br>2. Open scan view. | Displays fallback UI with explicit instruction: `"Izin kamera diperlukan untuk patroli"`. Provides button to retry permission or input manual backup code if enabled. | Critical |

---

### Module 2: Geolocation & Anti-Fake GPS Boundary Check

| ID | Test Scenario | Type | Steps / Preconditions | Expected Result | Severity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-MOB-GEO-01** | Checkpoint scan inside radius boundary | Positive | 1. Guard device at 15m distance from registered checkpoint coordinates.<br>2. Submit scan. | Distance calculation (Haversine) <= 50m threshold. Location tag verified with green check. | Critical |
| **TC-MOB-GEO-02** | Checkpoint scan outside allowed radius | Negative | 1. Guard scans valid QR but physical GPS distance is 120m away from registered checkpoint. | System flags `"Di luar radius lokasi (120m > 50m)"`. Prevents attendance/patrol validation or marks log as `SUSPECT_OUT_OF_BOUNDS`. | Critical |
| **TC-MOB-GEO-03** | Mock Location / Fake GPS app detection | Negative | 1. Enable Android Developer Options -> "Select mock location app".<br>2. Spoof GPS to checkpoint coordinates.<br>3. Attempt patrol scan. | App inspects `position.coords.accuracy` and mock provider flags. Server rejects mismatched cell tower/Wi-Fi anchor or marks record with `is_mock_location: true`. | Blocker |
| **TC-MOB-GEO-04** | GPS accuracy degradation (poor signal / indoor) | Negative | 1. Guard enters underground basement (GPS accuracy > 100m error margin).<br>2. Scan QR. | UI prompts `"Sinyal GPS lemah (Akurasi: ±120m). Mohon tunggu sinyal stabil"`. Prevents false out-of-boundary rejections. | High |
| **TC-MOB-GEO-05** | GPS disabled on device | Negative | 1. Turn off device Location/GPS toggle.<br>2. Attempt scan or clock-in. | App blocks submission. Shows modal: `"Nyalakan GPS lokasi presisi tinggi untuk melanjutkan"`. | High |

---

### Module 3: PWA Offline Mode & Background Sync

| ID | Test Scenario | Type | Steps / Preconditions | Expected Result | Severity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-MOB-OFF-01** | Full offline patrol execution | Positive | 1. App loaded and authenticated.<br>2. Toggle device to Airplane mode (no internet).<br>3. Scan checkpoint and submit status form + photo. | Submission stored locally in IndexedDB (`OfflineQueueContext`). Pending queue badge increments (+1). UI shows `"Tersimpan offline - akan disinkronkan saat online"`. | Blocker |
| **TC-MOB-OFF-02** | Automatic background sync on network restore | Positive | 1. 3 patrol logs queued in offline storage.<br>2. Disable Airplane mode (network restored). | `window.ononline` or Service Worker `sync` event triggers queue flush. Entries sent sequentially with original scan timestamps. Offline badge clears to 0. | Blocker |
| **TC-MOB-OFF-03** | Offline data tampering & timestamp integrity | Negative | 1. Queue offline patrol log.<br>2. Manually alter device clock forward by 3 hours before reconnecting. | Client payload sends `device_timestamp` + monotonic hardware clock `time_since_boot`. Server checks delta against server reception time. Detects manipulation. | High |
| **TC-MOB-OFF-04** | Sync failure / Server 500 retry backoff | Negative | 1. Reconnect network while API endpoint returns 502/500 error.<br>2. Monitor sync queue. | Queue retains records without data loss. Implements exponential retry backoff (5s, 15s, 60s). Avoids infinite burst spamming. | High |
| **TC-MOB-OFF-05** | Static PWA asset caching | Positive | 1. Clear HTTP cache.<br>2. Visit `/mobile/dashboard` online.<br>3. Go offline and hard-refresh page. | Service Worker serves cached HTML shell, JS bundles, icons, and CSS. App renders intact without browser offline dinosaur screen. | High |

---

### Module 4: Panic Button Trigger & Emergency Latency

| ID | Test Scenario | Type | Steps / Preconditions | Expected Result | Severity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-MOB-EMG-01** | Trigger panic button with instant broadcast | Positive | 1. Press and hold Panic Button for 3 seconds on Mobile Dashboard.<br>2. Device network connected. | Haptic feedback confirms trigger. Emergency alert sent to backend. Admin dashboard receives audible alarm & red popover in **< 3 seconds**. | Blocker |
| **TC-MOB-EMG-02** | Accidental short tap prevention | Negative | 1. Tap panic button briefly (< 1.5s) and release. | Countdown animation cancels. No false alarm dispatched to control room. | Medium |
| **TC-MOB-EMG-03** | Panic trigger in offline state | Negative | 1. Device offline.<br>2. Long-press Panic Button. | App caches emergency record with priority flag, queues SMS fallback trigger or alarms locally with persistent toast `"Darurat tersimpan, menghubungkan ke jaringan..."`. Auto-sends immediately upon 1-bar signal. | Critical |

---

### Module 5: JWT Auth & Role-Based Routing (Admin vs Petugas)

| ID | Test Scenario | Type | Steps / Preconditions | Expected Result | Severity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-AUTH-01** | Petugas login and auto-routing | Positive | 1. Log in with Petugas credentials (`role: "petugas"`). | JWT access token stored securely. User automatically redirected to `/mobile/dashboard`. Desktop admin sidebar hidden. | High |
| **TC-AUTH-02** | Admin login and dashboard routing | Positive | 1. Log in with Admin credentials (`role: "admin"`). | JWT stored. Redirected to desktop dashboard (`/`). Access to CRUD, schedules, checkpoints, and reports granted. | High |
| **TC-AUTH-03** | Petugas direct URL access to Admin routes | Negative | 1. Log in as Petugas.<br>2. Manually enter URL `/petugas/create` or `/checkpoint` in browser bar. | `RoutingHandler` / AuthGuard intercepts request. Redirects back to `/mobile/dashboard` or renders 403 Forbidden. | Blocker |
| **TC-AUTH-04** | Expired JWT handling | Negative | 1. Set expired token in `localStorage` / cookie.<br>2. Trigger API mutation (e.g. submit patrol). | API returns `401 Unauthorized`. Client clears auth state, redirects to `/signin`, and displays session expiry notification. | High |
| **TC-AUTH-05** | Unauthenticated deep link access | Negative | 1. Clear all storage.<br>2. Directly open `/insiden` or `/mobile/scan`. | Immediately redirected to `/signin`. Original target path preserved in redirect parameter for post-login return. | High |

---

### Module 6: Admin Dashboard & Report Generation Accuracy

| ID | Test Scenario | Type | Steps / Preconditions | Expected Result | Severity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-ADM-REP-01** | Attendance & patrol report accuracy | Positive | 1. Complete 10 checkpoint scans across 2 shifts.<br>2. Open Admin `/laporan/patroli`.<br>3. Filter by date and shift. | Table shows exact 10 records matching checkpoint names, petugas IDs, timestamps, and on-time status. Math aggregates match 100%. | High |
| **TC-ADM-REP-02** | Export report to Excel / PDF | Positive | 1. Navigate to `/laporan/kehadiran`.<br>2. Click Export Excel (.xlsx) / PDF. | File downloads within 5s. Headers, cell formatting, UTF-8 strings, and numerical sums perfectly align with on-screen table. | High |
| **TC-ADM-REP-03** | Real-time map & live incident notification | Positive | 1. Open Admin Home map view.<br>2. Satpam dispatches incident report from mobile. | Live map pins satpam coordinate in real-time without page reload. Audio-visual alert banner triggers in control room. | High |
| **TC-ADM-REP-04** | Checkpoint CRUD with GPS coordinate validation | Negative | 1. Admin creates checkpoint with invalid latitude/longitude (e.g. Lat: 95.000). | Form validation stops submit. Displays `"Format koordinat GPS tidak valid"`. | Medium |

---

## 3. Automated Testing Strategy

```
                      / \
                     / E2E \       Playwright (10-15 Critical Flows)
                    /-------\      - QR Scan, Offline Sync, Panic, RBAC
                   /  Integ  \     Supertest / Vitest Component Tests
                  /-----------\    - API Endpoints, IndexedDB context, Auth
                 /  Unit Tests \   Vitest / Jest
                /---------------\  - Haversine math, JWT parser, Sync reducers
```

### Automation Tech Stack
- **Unit & Logic:** Vitest + React Testing Library (Haversine formula, QR parsing, queue reducers).
- **E2E & Device Simulation:** Playwright (Chromium mobile emulation, geolocation override, offline network emulation, camera video mock streams).
- **API Automation:** Vitest / Supertest targeting backend REST endpoints.
- **Load & Latency:** k6 for Panic button WebSocket / REST burst latency checks (< 500ms under 500 concurrent connections).

---

## 4. Quality Gates for Pre-Deployment (Go / No-Go)

A release candidate must pass all quality gates before deployment to staging/production:

```
[ Git Push / PR ] ──> [ Gate 1: Static Code ] ──> [ Gate 2: Unit & Integ ] ──> [ Gate 3: E2E & Security ] ──> [ Deployment ]
```

| Gate Stage | Criteria / Threshold | Enforcement Tool | Block Action |
| :--- | :--- | :--- | :--- |
| **Gate 1: Static Code & Lint** | • 0 ESLint errors<br>• TypeScript strict compilation passes (0 `any` leaks)<br>• No exposed secrets/tokens in source | `npm run lint`, `tsc --noEmit`, Gitleaks | Blocks PR merge |
| **Gate 2: Unit & Integration** | • Unit Test Code Coverage >= **80%** (Core business logic: Geofence, Auth, Sync)<br>• 100% unit & integration test pass rate | Vitest / Jest Coverage | Blocks CI build |
| **Gate 3: PWA & Offline Sync** | • 100% pass on offline queue & sync E2E test suite<br>• Lighthouse PWA installability score >= **90** | Playwright + Lighthouse CI | Blocks release build |
| **Gate 4: Critical Severity** | • **0 Blocker / Critical defects open**<br>• Max 2 Minor non-blocking UI defects allowed | Jira / GitHub Issues Tracker | Hard Go/No-Go stop |
| **Gate 5: Performance & Security** | • Panic alert latency < **3.0s** under load<br>• OWASP ZAP dynamic scan shows 0 High/Critical vulnerabilities | k6 + OWASP ZAP | Blocks deployment |
