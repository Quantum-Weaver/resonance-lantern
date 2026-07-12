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

**Test matrix (the family's standing rig, same as Echoes/Compass):** desktop +
the Weaver's Galaxy **S25 Ultra** + T-Red's **S22 Ultra** — two Samsung WebView
generations, which is exactly the spread the spike needs. If camera preview
holds on the S22's older WebView, it holds everywhere the family ships.

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

---

## Addendum, 2026-07-12 (evening) — the spike, de-risked but not closed

*Sonnet, claude-sonnet-5, working the spike KP named as mine tonight.*

The gate above assumed the real risk was the WebView permission-grant —
"needs a permission-grant patch in the Kotlin layer." Reading Tauri v2's own
generated `RustWebChromeClient.kt` (`src-tauri/gen/android/.../generated/`,
auto-generated, do-not-modify) shows that risk doesn't exist: it already
implements `onPermissionRequest()`, requests `Manifest.permission.CAMERA` at
runtime for `VIDEO_CAPTURE` resources, and calls `request.grant(...)` on
success. No custom Kotlin plugin is needed — Compass's `MediaPermissionPlugin`
pattern solved a *different* problem (an app-level audio/storage permission
Tauri command), and Lantern doesn't need its equivalent for the camera path.

The actual gap, found by reading `AndroidManifest.xml` next to that generated
client: **`android.permission.CAMERA` was never declared in the manifest.**
A dangerous permission can't be runtime-requested unless the manifest
declares it first — undeclared, `ActivityResultContracts.RequestMultiplePermissions`
would have silently failed to show the OS dialog, `getUserMedia()` would
throw `NotAllowedError`, and it would have looked exactly like "the spike
failed" for a reason that had nothing to do with the actual risk this gate
was built to test.

**Fixed, desktop-verifiable:** `scripts/sync-android-extras.mjs` inserts
`<uses-permission android:name="android.permission.CAMERA" />` plus two
`required="false"` `<uses-feature>` entries (so the Play install filter
doesn't wrongly assume every device needs a camera — Trace already falls
back to paper mode without one) into `gen/android`'s manifest, anchored next
to the existing `INTERNET` permission the same way Compass's script anchors
its own manifest patch. Wired into `tauri.conf.json`'s `beforeDevCommand` /
`beforeBuildCommand` and exposed as `npm run sync-android`, because
`src-tauri/gen/` is gitignored and rewritten from scratch by every
`tauri android init` — without this, the permission would vanish the next
time the Android project regenerates. Verified tonight: idempotent (second
run reports "already present"), inserts cleanly against the current
generated manifest, `npm run check` and `npm run build` unaffected.

**What this does NOT close:** whether `getUserMedia()` actually resolves to
a live camera feed on real Android WebView — the S25 Ultra and S22 Ultra
generations named in the original gate — is still unverified. That requires
a signed APK on real hardware, which is not desktop-buildable. The gate
stands; it is smaller now than it was on 2026-07-03, with the actual
mechanism of failure (if the spike still fails) narrowed to WebView
`getUserMedia` behavior itself, not permission plumbing.

### Test protocol for KP's hands (the one remaining unknown)

1. `npm run tauri android build` (or `android dev` with a device attached) —
   the sync script runs automatically first via `beforeBuildCommand`.
2. Install on the **S25 Ultra**, open Lantern, go to Trace.
3. Watch for the OS camera-permission dialog on first Trace visit. If it
   never appears: the manifest patch didn't take, or Android's permission
   cache from a prior install needs clearing (`Settings → Apps → Resonance
   Lantern → Permissions → reset`, or reinstall clean).
4. Grant it. Confirm the live camera feed appears in the viewfinder in place
   of paper mode (the `mode-note` chip disappears; the `topbar`'s "paper
   mode" text is the tell if it's still falling back).
5. Repeat on the **S22 Ultra** — the older WebView generation is the one
   this whole gate exists to test; if it holds there, it holds everywhere
   the family ships.
6. Either result is data: pass → flip Phase 2 and the Ship-phase checklist
   items, rebuild, done. Fail → note exactly what happened (dialog never
   shown / dialog shown but feed stays black / crash) in a new dated entry
   here, and the Expo fallback door named above is still open, honestly.
