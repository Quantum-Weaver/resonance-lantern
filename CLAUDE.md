# CLAUDE.md — Resonance Lantern

**Resonance Lantern** is the Lantern Room — a digital *camera lucida*: a reference image floats ghost-light over the live camera pointed at real paper, opacity as a comfort control. "Tracing is learning, not cheating." Born from CanvasGuide, built for TJ Darling (@TJDPoetry) and her creative community; her voice, pride palette, and platforms preserved verbatim.

**Stack:** Svelte 5 + Tauri v2 + Rust + SQLite (lantern.db) + Tailwind CSS v4 + COSMIC design tokens — an Echoes v1.1 clone, rebranded; Echoes itself unaltered

**Authors:** Quantum Weaver (human) + Aethelred (sovereign AI)

---

## SESSION PROTOCOL

1. Read `docs/CHECKLIST.md` for current state (phases follow canvasguide-concepts.md §5)
2. Read `docs/FRAMEWORK-DECISION.md` — the family-stack decision and the Android camera spike record
3. One phase at a time — complete, verify, update, move on
4. `npm run check` / `cargo build` — zero errors before commit
5. Human tests every phase before merge

---

## PROJECT STRUCTURE

```
src/
├── routes/
│   ├── +page.svelte      # Home
│   ├── trace/            # The heart: live camera + ghost overlay, capture
│   ├── practice/         # Starter shapes — invitation, not curriculum; no streaks
│   ├── projector/        # Projection mode
│   ├── insights/         # Gentle mirrors
│   ├── settings/         # Theme, presets, export/purge
│   └── onboarding/       # The vow, verbatim
├── lib/              # stores, components, cosmic tokens
└── app.css

src-tauri/src/        # lib.rs + main.rs (no audio engine)
```

---

## ESSENTIAL RULES

1. Navigation: `goto()` — never `window.location.href`; state via Svelte 5 runes
2. Android: all four explicit `sql:allow-*` capability entries; no non-ASCII SQL DEFAULTs
3. Camera: Tauri v2's generated `RustWebChromeClient.kt` already implements `onPermissionRequest()` + CAMERA runtime grant for `VIDEO_CAPTURE` — **no custom Kotlin plugin**; manifest extras sync via `npm run sync-android` wired into `beforeDevCommand`/`beforeBuildCommand` (FRAMEWORK-DECISION addendum, 2026-07-12)
4. Paper mode is the honored fallback whenever no camera resolves — never block the tracing
5. Opacity is a comfort control, not a difficulty setting — no scores, no streaks, no shame mechanics
6. Icons: after any `tauri android init`, re-apply from `resonance-assets/logo-icons/lantern.png` (gen/android regenerates and can silently revert)

---

## CURRENT STATE

Phase 0 shell complete 2026-07-11; APK signed and installed on KP's S25 that same night (Jessica's first light). Desktop camera + ghost overlay live. Android camera spike: desktop half proven 2026-07-12; **device half pending KP's hands** (real S25/S22 test — protocol in the FRAMEWORK-DECISION addendum). Camera = paper mode on Android until the spike lands. Jessica's dwelling findings triage pending.
