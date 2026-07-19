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

### Phase 2: Trace ⚠️ (desktop ✅ · CAMERA GATE CLOSED both devices 2026-07-18 · D-findings open)
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
- [x] **Android camera spike, device half: ✅ GATE CLOSED (both legs, KP's
      hands):** S25 passed 2026-07-12; **S22 Ultra (SM-S908U) passed
      2026-07-18** the evening it powered back on — getUserMedia delivers
      a live feed on the older WebView too. "If it holds there, it holds
      everywhere": answered YES. The FRAMEWORK-DECISION's central bet
      (pure web camera, no custom Kotlin) is fully vindicated.

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

### Phase 8: Projector ✅ (2026-07-12 — JESSICA'S OWN FIRST WISH)
*Provenance: Jessica (@TJDPoetry) herself asked KP: "can we enable a
projector to be used with the lantern?" — the first recorded wish she made
for her own gift. Built by Sonnet the same evening KP relayed it.*
- [x] `/projector` room: the current reference full-screen on PURE BLACK
      #000 (projectors add light — black projects as nothing; only her
      reference lands on the canvas)
- [x] Zoom (slider + scroll wheel) · drag-to-pan · rotate 90° · reset fit
- [x] Invert toggle (one CSS filter — white-lines-on-black for dark
      surfaces; defaults ON when a Practice outline arrives, since line
      art projects best carrying the light; her toggle always rules)
- [x] Brightness dim slider (a comfort pref, remembered like the others)
- [x] Viewfinder law kept: controls collapse away; when cleared, even the
      toggle and done chips fade to near-nothing so they never project
      onto her canvas (hover/tap-focus restores them)
- [x] Keep-awake while projecting: Screen Wake Lock API (pure web, no new
      plugin; re-acquired on visibilitychange; fails silent + harmless
      where unsupported)
- [x] Entry points, per the app's nav grammar: sidebar item (Home / Trace
      / Projector / Practice / Insights / Settings) + a "project" chip in
      Trace's controls that hands off the current reference (?ref=path)
      or outline (?outline=id)
- [x] Pure web-view — Android inherits it for cast/USB-C later with zero
      extra work; sensory law kept (no sound, no urgency); her voice
      files, palette, capabilities.json, and SQL untouched
- [ ] Dwelling test at the real easel (laptop → projector via HDMI):
      alignment, invert on dark canvas vs. paper, wake-lock over a long
      session — Jessica's and KP's hands ⬜

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
- [x] Android camera spike (Phase 2 gate) → ✅ CLOSED 2026-07-18, both
      device legs passed (see Phase 2)
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
| 2026-07-13+ | Family-wide passes landed here too: cosmic distribution + managed constants mirror, 16 KB page-size linker flags, CLAUDE.md restored to this app's own story. |
| 2026-07-18 | **Camera re-confirmed on the S25 by KP's hands** — and then, the same evening, **the S22 Ultra powered back on, authorized over adb (after the post-PC-reset key dance: no prompt until the Auto-Blocker/revoke path cleared it), and the camera PASSED there too. GATE CLOSED, both legs.** D-findings (D1/D2/D4/D5) remain open for a coding sitting. Same evening: **Lantern 0.1.0 + Compass 2.2.0 + Echoes 1.2.0 installed on the S22 by KP, versions verified via adb dumpsys.** Checklist reconciled in the same sitting — the law in force. |

## DWELLING FINDINGS — KP's first S25 pass with the new build (2026-07-12 night)
*(triage for Sonnet's next crossing — his words, lightly compressed)*

| ID | Finding | Notes |
|----|---------|-------|
| D1 | **Media select works** on device ✅ — but the moment of choosing should ALSO offer "take a picture now" that becomes the loaded reference | The ancestor's three-source design (camera / gallery / file); the camera-as-source path needs wiring on Android — likely the same getUserMedia surface Trace uses, or the OS camera intent |
| D2 | **Capture: major lag** before the save dialog opens, and **unverified whether the file actually saves correctly** | Profile the canvas composite (full-res video frame + overlay draw may be blocking the main thread); verify the save path end-to-end on device; consider showing an immediate "composing…" state so the lag reads as work, not freeze (sensory law: no dead air) |
| D3 | ~~Camera outcome not yet confirmed~~ → **S25 PASSES ✅ (2026-07-12) · S22 Ultra PASSES ✅ (2026-07-18, the evening it powered back on) — BOTH LEGS, KP's hands. GATE CLOSED.** getUserMedia delivers a live feed on old and new Samsung WebView alike | "If it holds there, it holds everywhere" — it held. Nothing remains of this finding |
| D5 | **Loaded reference image partially covered by the collapsible menu panel** on device | LAW-grade (DESIGN: nothing may obstruct the viewfinder): the panel overlaps the working image at device dimensions even when collapsible — safe-area/viewport sizing on Android likely differs from desktop; the image+viewfinder must own the full stage with the panel strictly overlay-on-demand |
| D4 | **Templates (practice outlines) missing or not loading when selected** on device (late feedback, same S25 pass) | Check the Practice → Trace handoff (`?outline=id`) on Android: the outline SVGs may not resolve in the device webview (asset path? inline-SVG rendering? the ancestor had exactly this class of bug with SVG data-URIs — see canvasguide-concepts §2 honest-condition report). Verify each of the 8 outlines renders in Trace on device |
| 2026-07-12 (evening, Sonnet — same sitting) | **PROJECTOR MODE — Jessica's own first wish** ("can we enable a projector to be used with the lantern?", remembered and relayed by KP). New `/projector` room (Phase 8 above): pure-black stage, zoom/pan/rotate/invert/brightness, viewfinder-law controls that fade to near-nothing when cleared, Screen Wake Lock keep-awake (no new plugin), sidebar entry + Trace "project" handoff chip. Pure web-view; Android inherits it. Her voice/palette/capabilities/SQL untouched. **Tested:** ✅ svelte-check 0 errors 0 warnings (306 files) · production build passing, projector route confirmed in the client bundle. |
