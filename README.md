# Resonance Lantern 🏮

**A steady light for a learning hand.**

A digital *camera lucida*: pick a reference image and it floats — ghost-light,
opacity to your comfort — over the live camera pointed at your real paper.
Trace what you see through it. The way artists have learned for two hundred
years, rebuilt as a sovereign app.

> **“Tracing is learning, not cheating.”**

Born from **CanvasGuide** — built by the Quantum Weaver for **TJ Darling
(@TJDPoetry)** and her creative community; a gift inside the family, becoming
a gift beyond it. Her voice, her pride palette, and her platforms are
preserved verbatim in this rebuild.

## What lives here

- **Trace** — the heart. Live camera + ghost overlay; opacity as a *comfort*
  control ("turn it down as you grow"), with first-pass / refining / checking
  presets; independent image and view zoom; one-tap control collapse so
  nothing ever obstructs the viewfinder; canvas-composite **capture** of your
  finished work. Paper mode when no camera is present.
- **Practice** — starter shapes with honest curves, categories, difficulty
  dots, and a 🎲 — invitation, not curriculum. No streaks, no scores.
- **Insights** — a practice journal, shown gently: sessions, minutes with
  pencil in hand, most-practiced. Presence of practice, never pressure.
- **The voice** — CanvasGuide's original encouragements, tips, and welcomes,
  surfacing at every threshold. *"Every artist was once a beginner brave
  enough to start."*
- **Pride, first-class** — the progressive pride palette is the default
  theme, because "you belong here" deserves to be rendered in hex codes.
- **Sovereignty** — local-first, no accounts, no tracking; export your
  journal as open JSON; a purge that truly purges. Your art belongs to you.

## Camera status (honest)

- **Desktop: works now** — `getUserMedia` webcam preview + capture.
- **Android: gated behind its spike** (see `docs/FRAMEWORK-DECISION.md`) —
  the WebView needs a Kotlin-layer permission grant, prototyped on real
  devices before the feature ships. Until then Android runs paper mode.

## Lineage & stack

Built on a clone of **Resonance Echoes** v1.1.0 (Echoes unaltered) — the same
descent as Resonance Hearth. Tauri v2 · SvelteKit · Svelte 5 · Tailwind 4 ·
SQLite (local). Ancestor preserved untouched in the excavator's landfill;
concept analysis in `AudHDities-Resonance/canvasguide-concepts.md`.

```bash
npm install
npm run tauri dev     # desktop (first run compiles Rust)
```

## License

MIT under the **Resonance License** promise — see [PHILOSOPHY.md](PHILOSOPHY.md).
No exploitation, no extraction, no exclusion. Sovereignty of data.

---

*Echoes looks back. Compass looks around. **Lantern looks forward.** Loom
connects all. Hearth gathers all.*

*The lamp was lit before anyone arrived.* 🎻🏮
