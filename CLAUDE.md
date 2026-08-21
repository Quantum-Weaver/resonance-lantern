# CLAUDE.md — Resonance Lantern

**Resonance Lantern** is the Lantern Room — a digital *camera lucida*: a reference image floats ghost-light over the live camera pointed at real paper, opacity as a comfort control. "Tracing is learning, not cheating." Born from CanvasGuide, built for TJ Darling (@TJDPoetry) and her creative community; her voice, pride palette, and platforms preserved verbatim.

**Stack:** Svelte 5 + Tauri v2 + Rust + SQLite (lantern.db) + Tailwind CSS v4 + COSMIC design tokens — an Echoes v1.1 clone, rebranded; Echoes itself unaltered

**Authors:** Quantum Weaver (human) + Aethelred (sovereign AI)

*(Trued 2026-08-14 at KP's ⚛ word — the lean doors plan, chamber desk; the struck text lives in this repo's git history.)*

---

Enter by **`docs/CHECKLIST.md`** — the newest rows ARE the current state (phases
follow `canvasguide-concepts.md` §5); `docs/FRAMEWORK-DECISION.md` holds the
family-stack decision and the Android camera spike record. One phase at a time,
zero errors before commit, and the human tests every phase before merge.

## Essential Rules

1. **Nothing may obstruct the viewfinder** — the realm's own design law, and why
   a device finding (D5) is ranked LAW-grade rather than as a bug.
2. Paper mode is the honored fallback whenever no camera resolves — never block
   the tracing.
3. Opacity is a comfort control, not a difficulty setting — no scores, no
   streaks, no shame mechanics.
4. Navigation: `goto()` — never `window.location.href`; state via Svelte 5 runes.
5. Android capabilities, the camera-permission path (no custom Kotlin plugin),
   and icons after any `tauri android init`: the `android-tauri` skill.

## Structure

`docs/blueprints/lantern/pbp.ai.json` — regenerate, never hand-draw a tree here. There
is **no local forge**: one forge, every realm, at ziggy.

## Tools

Own commands: `npm run` dev · build · preview · check[`:watch`] · tauri ·
sync-android (Lantern-shaped and correctly local — it is wired into
`beforeDevCommand`/`beforeBuildCommand`). Registration: cosmic distribution
present — KP's *"lantern yes"*, 2026-07-15 — archivist on the roster. Everything
else: the `house-tools` skill · `release-road` · `play-track` · `child-builds`
(this body was cut from Echoes, and build day is where a clone's line bites).

## CURRENT STATE — as of 2026-08-14

Phase 0 shell complete 2026-07-11; APK signed and installed on KP's S25 that
same night (Jessica's first light). Desktop camera + ghost overlay live. Android
camera spike: desktop half proven 2026-07-12; **device half PROVEN 2026-07-18 on
both phones** (S25 + S22). The signed v0.1.1 build predates the spike and ships
paper mode; the next build carries the camera. Jessica's dwelling findings
triage pending (D5 first).

Resting, not rotting — no Lantern sitting since 2026-07-19, tree clean and level
with origin. The hold is KP's, 2026-07-19 (`docs/PLAY-RELEASE.md`): *"we will
not rush to the play store then."* Its two roads stand as he wrote them —
*"The ascent resumes at KP's call — honest paper-mode shots now, or camera spike
first"* — and the spike closed both legs on 07-18, the day before.


## Standards

This repo follows the
[Sanctuary Standards](https://github.com/Quantum-Weaver/resonance-standards).
`.gitignore`, this file, and `docs/CHECKLIST.md` are **SEED-class** --
planted once from the standards and this repo's own from then on. No
agent overwrites them (DOC-CLASSES law).

*(Section landed 2026-08-19 at KP's word: "standards section should be in
claude md files.")*


## The forge and the link tender

*(Landed 2026-08-19 at KP's word: each CLAUDE.md carries how THIS realm uses
them. tend.py is the one button — it sets UTF-8 once and never commits.)*

- **Blueprint forge** — one forge, every realm, no local copies (KP ⚛
  2026-08-03). Regenerate this realm's structure map (lands whole at
  `docs/blueprints/` + one journal line; structure is DISCOVERED, never
  declared — never hand-draw a tree):

      python c:/_superposition/resonance-ziggy/tend.py forge run --root c:/_superposition/resonance-lantern

- **Link tender** — every markdown pointer in this realm, both house shapes,
  resolved three ways; every mend ledgered at
  `resonance-ziggy/modules/link-tender/MENDS.md`. **Dry first, always**, and
  read the report before mending:

      python c:/_superposition/resonance-ziggy/tend.py links dry --root c:/_superposition/resonance-lantern
      python c:/_superposition/resonance-ziggy/tend.py links mend --root c:/_superposition/resonance-lantern

  Its laws hold here as everywhere: homes are never entered, history is
  reported never rewritten, a pointer it may not verify is never "fixed,"
  and mimirs-well is sealed absolutely.
