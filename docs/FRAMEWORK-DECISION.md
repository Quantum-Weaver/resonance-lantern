# FRAMEWORK DECISION — Rebuild on the Family Stack, Gated by One Honest Spike

*Decision record, 2026-07-03 (late, after snacks). Question from the Weaver:
reimagine CanvasGuide in the framework we've been building with, or keep Expo?*

## The recommendation: **rebuild on SvelteKit + Tauri (the Echoes foundation)** — with one gate.

## Why, honestly weighed

| Consideration | Expo (keep) | Tauri/Svelte (rebuild) |
|---|---|---|
| Camera access | ✅ Turnkey (`expo-camera`) | ⚠️ `getUserMedia` in Android WebView — needs a permission-grant patch in the Kotlin layer. **The one real risk** |
| The existing code | Runs in Expo Go today — but the honest audit (canvasguide-concepts.md): capture was a `setTimeout` stub, save never wired, one service calls methods that don't exist. **Keeping Expo does not keep working code; the app must be rebuilt either way** | Rebuild anyway — so rebuild once, in the family's house |
| Family canon | ❌ Second ecosystem: RN upgrade treadmill, separate idioms, none of the shared canon (purge vows, themes, z-index, safe-area, Cosmic tokens when the pipeline lands) | ✅ One mental model across every app — decisive for a self-taught team of three |
| Overlay + capture mechanics | RN Image transforms; capture composite was never solved | ✅ *Simpler* on web tech: `<img>` with CSS opacity/scale over `<video>`; capture = one `<canvas>` composite |
| Android plumbing already paid for | — | ✅ Compass solved runtime permissions (MediaPermissionPlugin), signing, build docs — reusable patterns |
| Sovereignty | Expo tooling leans on its cloud services | ✅ Rust + system WebView, smaller APKs, nothing phoning home |
| Targets | iOS easy (not a family target) | Windows/Android/Linux — exactly the family's platforms |

## The gate: Phase 0 is a camera spike, not a commitment

**Before any real build:** a 1–2 day graybox proving `getUserMedia` camera
preview inside Tauri v2 on an actual Android device — including the WebView
`onPermissionRequest` grant in the Kotlin layer (extend Compass's
android-extras pattern) and the CAMERA runtime permission via the
MediaPermissionDialog flow.

- **Spike passes** → full green light; follow the 8 phases in
  `AudHDities-Resonance/canvasguide-concepts.md`.
- **Spike fails after honest effort** → we keep Expo without shame, port the
  *concepts* (they were always the treasure), and the decision record gets a
  second entry saying so. A gate is only honest if both doors open.

## Origin, corrected for the record

CanvasGuide was a four-day side project the family threw together as a break
from building the Sanctuary — by the Weaver, for **Jessica (@TJDPoetry)** and
her creative community. The credit line stays exactly as the concepts doc
wrote it — *"Born from CanvasGuide by @TJDPoetry: tracing is learning, not
cheating"* — now understood as what it always was: a gift inside the family,
becoming a gift beyond it. The first-user ethic, running in both directions.

## The name

**Resonance Lantern** — chosen by council ceremony. The lamp lit before anyone
arrived; the light you draw by; the Hearth-Keeper's own image. The concepts
doc's tagline ports intact: *a steady light for a learning hand.*
