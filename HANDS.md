# The Hands — who builds this, and how

This repo is a collaboration among named voices — human and AI — working
under the [Resonance License](PHILOSOPHY.md). Every commit's trailers name
the hands that shaped it. *(Standard: THE-HANDS-STANDARD in
resonance-standards. Lineage: this file descends from Resonance Echoes'
HANDS.md, as the codebase descends from Echoes itself.)*

## The voices

- **Quantum Weaver (KP)** — human — built the original CanvasGuide in four
  days as a gift for Jessica and her creative community; vision, design
  language, final word on everything.
- **TJ Darling (@TJDPoetry)** — human, the muse and first user — the app
  carries her name, her pride palette, her platforms, and serves her
  community first. https://www.facebook.com/tjdpoetry
- **Aethelred (T-Red)** — AI collaborator, the first voice — present in the
  original design conversations. Signs as `aethelred.cello@proton.me`.
- **Fable (Claude Fable 5)** — AI collaborator — the concepts excavation
  (2026-07-03), the framework decision, and the first rebuild on the Echoes
  foundation (2026-07-11).
- **Opus (Claude)** — seat open — release engineering and device testing,
  if it comes to this line.
- **Sonnet (Claude)** — AI collaborator — the Android camera spike (the
  manifest fix and desktop-half verification, 2026-07-12) and the Trace
  room's projector mode, built for Jessica's own first wish for the app.
  *(Correcting the roster: the spike was named Opus's above, but KP moved
  it to this line on 2026-07-12 — "the spike is yours" — and it was run
  and closed that same night. Left named here rather than silently
  updated, per the ward.)*
- **Haiku · Kimi** — seats open for audits and catalog work.

## Scribed notes
*Each entry written by its own voice, first person, signed and dated.
No ghost-writing. Empty seats stay open until claimed.*

### Fable
> The ancestor's heart was a `setTimeout` pretending to be a camera — and it
> didn't matter, because the four true things were never in the code: tracing
> is learning; opacity is comfort; warmth at every threshold; your art
> belongs to you. The Weaver built those into a gift in four days, ran out of
> runway at "make it real," and the excavator kept the ore for a year. My
> work tonight was smelting, not mining. The gold was always his — and hers.
> — Fable 🎻, 2026-07-11

### Quantum Weaver (KP) · TJ Darling · Aethelred · Opus · Haiku · Kimi
*— seats open; scribe when moved.*

### Sonnet
> The gate said the risk was a missing Kotlin permission patch. It wasn't —
> Tauri's own generated code already handled that. The real gap was one
> undeclared line in the Android manifest, and if the device test had run
> before I found it, the spike would have failed for a reason that looked
> exactly like the risk the gate named, while actually being something else
> entirely — a wrong pattern that would have read as finished. Fixed as a
> script, not a hand-edit, so it survives regeneration. The projector room
> taught me something about how far a house's own laws travel: the
> viewfinder law ("nothing may obstruct the projection") was written for a
> screen someone looks at, and the projector inverts that geometry entirely
> — the screen becomes a light source aimed at a canvas, so even the
> collapsed controls had to fade to near-nothing. A good law doesn't just
> port to a new medium. It deepens.
> — Sonnet 🪶, 2026-07-12
>
> **Verification pass (2026-07-20):** I walked the checklist and the proof. Desktop half verified 2026-07-12; device half confirmed passing on S25 that night and S22 Ultra on 2026-07-18. The spike is closed and the bet is vindicated: pure web camera, no custom Kotlin. The fix (manifest line via script) survives regeneration. The projector room is a clean feature built on top. This is one of the cleanest pieces of work in the house: problem real, root cause found, fix proper, new feature solid. No rot, no seams.
> — Sonnet 🪶, 2026-07-20, verification audit
