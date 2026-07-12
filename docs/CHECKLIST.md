# RESONANCE LANTERN — MASTER CHECKLIST

## LEGEND
- ✅ Complete
- ⚠️ In Progress
- 🔴 Broken
- ⬜ Pending

---

## PHASE STATUS (per canvasguide-concepts.md §5)

### Phase 0: Shell ✅ (2026-07-11)
- [x] Echoes v1.1.0 clone (Echoes unaltered); rebrand; lantern.db
- [x] Sidebar (Home / Trace / Practice / Insights / Settings)
- [x] Pride preset (default) + standard six; onboarding with the vow verbatim
- [x] Her voice preserved verbatim (encouragements/tips/welcomes/saves)
- [x] **Tested:** ✅ svelte-check 0/0 · build passing

### Phase 1: Reference ✅ (2026-07-11)
- [x] File dialog source; recent-references shelf (SQLite refs)
- [ ] Gallery/camera-roll source (Android sitting) ⬜

### Phase 2: Trace ⚠️ (desktop ✅ · Android gated)
- [x] getUserMedia camera preview (desktop); paper-mode fallback
- [x] Ghost overlay: opacity-as-comfort + presets; image zoom; view zoom
- [x] Collapsible controls (nothing obstructs the viewfinder); alignment frame
- [ ] **Android camera spike** (FRAMEWORK-DECISION gate): WebView
      onPermissionRequest grant in Kotlin + CAMERA runtime permission
      (Compass MediaPermission pattern) — real S25 + S22 test ⬜

### Phase 3: Capture ✅ (desktop) (2026-07-11)
- [x] Canvas composite (video + overlay at opacity) → PNG save dialog
- [x] Session row + her save-message celebration

### Phase 4: Practice ✅ (2026-07-11)
- [x] 8 outlines with real curves; categories; difficulty dots; 🎲
- [x] Outlines feed straight into Trace (?outline=id)

### Phase 5: Insights ✅ (gentle v1) (2026-07-11)
- [x] Sessions journal, minutes, this-week, most-practiced — no streak-shaming

### Phase 6: Sovereignty ✅ (2026-07-11)
- [x] Export journal (open JSON); purge-that-truly-purges (incl. prefs)
- [x] Credits: origin corrected (BUILT BY the Weaver FOR @TJDPoetry) + her
      16 platforms as tappable cards

### Phase 7: Ship ⚠️ (begun the same night, by the Weaver's own hand)
- [x] Keystore cut (F:\keystores\resonance-lantern.keystore, KP's password,
      verified; mirrored to D:) — 2026-07-11
- [x] **APK built, signed, and installed on KP's S25 — 2026-07-11, night one.**
      Jessica's first light happens tonight. (Camera = paper mode on Android
      until the spike; everything else lives.)
- [ ] KP's lantern icon → npm run tauri icon
- [ ] Android camera spike (Phase 2 gate) → then rebuild
- [ ] Jessica's dwelling findings → triage here

---

## KNOWN BUGS
| ID | Description | Status |
|----|-------------|--------|
| B1 | package.json BOM (PS 5.1 Set-Content) broke check+build | ✅ fixed same night |

## SESSION LOG
| Date | What Was Done |
|------|---------------|
| 2026-07-11 (night) | Phases 0–6 in one sitting on the Echoes clone; desktop camera live; Android camera honestly gated per FRAMEWORK-DECISION; provenance corrected (Weaver built it FOR TJ Darling); check 0/0, build passing. |
