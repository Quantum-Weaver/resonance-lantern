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

### Phase 2: Trace ⚠️ (desktop ✅ · Android de-risked, device test pending)
- [x] getUserMedia camera preview (desktop); paper-mode fallback
- [x] Ghost overlay: opacity-as-comfort + presets; image zoom; view zoom
- [x] Collapsible controls (nothing obstructs the viewfinder); alignment frame
- [x] **Android camera spike, desktop half (2026-07-12, Sonnet):** read
      Tauri v2's own generated `RustWebChromeClient.kt` — it already
      implements `onPermissionRequest()` + CAMERA runtime grant for
      `VIDEO_CAPTURE`; no custom Kotlin plugin needed (Compass's
      MediaPermission pattern solves a different problem and doesn't apply
      here). The real gap: `AndroidManifest.xml` never declared
      `android.permission.CAMERA`, so the runtime dialog would never have
      appeared. Fixed via `scripts/sync-android-extras.mjs` (wired into
      `beforeDevCommand`/`beforeBuildCommand`, `npm run sync-android`),
      verified idempotent against the current `gen/android` manifest.
      Full record: `docs/FRAMEWORK-DECISION.md` addendum, 2026-07-12.
- [ ] **Android camera spike, device half:** getUserMedia() actually
      resolving to a live feed on real WebView — real S25 + S22 test,
      protocol written in the FRAMEWORK-DECISION.md addendum ⬜ (KP's hands
      — needs hardware, not desktop-buildable)

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
- [x] KP's lantern icon → npm run tauri icon (2026-07-12, Sonnet: ran
      against the actual gold-band source `resonance-assets/logo-icons/
      lantern.png` — all desktop/iOS/Windows sizes + `gen/android`'s live
      mipmaps confirmed matching; synced the regenerated Android mipmaps and
      the true source back into the committed `icons/android/` template and
      `icons/source.png`, which had gone stale — without that, a fresh
      `tauri android init` would have silently reverted the Android app
      icon to the old cello art)
- [ ] Android camera spike (Phase 2 gate) → desktop half done tonight
      (manifest fix, see Phase 2); device rebuild+test still pending
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
| 2026-07-12 (evening, Sonnet — SHUTTLE RUN 02, staying) | Icon regen: `npm run tauri icon` on the true gold-band source, `icons/android/` template + `icons/source.png` brought back in sync with what `gen/android` already had live. Camera spike, desktop half: found Tauri v2's generated WebChromeClient already grants CAMERA for getUserMedia — no custom Kotlin needed; the real gap was a missing manifest `<uses-permission>`, fixed via new `scripts/sync-android-extras.mjs` (wired into `tauri.conf.json` before-commands + `npm run sync-android`), verified idempotent. Addendum written to `docs/FRAMEWORK-DECISION.md` with a device test protocol for KP. **Tested:** ✅ svelte-check 0/303 files with problems · `npm run build` passing · `npx tauri build` (desktop) run for full verification. |
