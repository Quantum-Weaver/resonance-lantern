# Lantern — Google Play test track (the first ascent)

*Founded 2026-08-24 by Fable 🎻 at KP's word: "once this one is completed
we need to get the screen shots and get it into the closed testing in
google play" — **the 2026-07-19 hold ("we will not rush to the play store
then") lifted at his own call**, the hand that set it. Companion shape to
bubbles' and echoes' PLAY-TRACK.md — the Console is the truth; this file
is the pack KP transcribes from, so his hands never have to compose at
the upload screen. Ancestor: `docs/PLAY-RELEASE.md` (2026-07-18), whose
console steps this pack carries forward.*

## ✅ THE KEYSTORE RULING — Road A, landed 2026-08-24

KP ruled **Road A — recut to the ruled key** (his answer, this
sitting). Done the same hour: the old 2026-07-11 key retired in both
vaults as `RETIRED-2026-08-24-resonance-lantern.keystore` (the vault's
own idiom), a fresh key cut by `make-keystore.py` to every ruled
parameter (PKCS12 · RSA 4096 · SHA384withRSA · `CN=AudHDities
Sanctuary, O=AudHDities Sanctuary, C=US`), sha256 `87362c95eb312edd`,
F=D mirrored, census **CLEAN**.

**The one cost, before install-testing:** the sideloaded v0.1.x builds
on the S25 and S22 were signed with the retired key — **uninstall them
before installing any new-key build** (`adb uninstall
com.audhd.resonance_lantern`, or by hand on the device).

## Standards check — 2026-08-24

| Requirement | State |
|---|---|
| Target API level | ✅ targetSdk **36** / compileSdk 36 — `aapt2 dump badging` on the signed `resonance-lantern-v0.2.1.apk` (build-tools 35.0.0), 2026-09-01 |
| 16 KB page size | ✅ flags at repo root `.cargo/config.toml`, **PROVEN 2026-07-18** — `readelf -l` 0x4000 on every LOAD segment of the aarch64 lib · `zipalign -c -P 16 -v 4` on the signed v0.2.1 APK: all four `libresonance_lantern_lib.so` OK, verification successful, 2026-09-01 |
| App Bundle | ✅ `release/resonance-lantern-v0.2.1.aab` (61.4 MB), signed 2026-08-24 11:30 — mirrored to `resonance-assets/releases-current/lantern/bundle/android/` |
| versionCode | ✅ **2001** (v0.2.1) — machine-read from `src-tauri/gen/android/app/tauri.properties` and from the signed APK's own badging; first upload, nothing to increment past (2000 was v0.2.0, built unsigned and never uploaded) |
| Permissions | ✅ `INTERNET` (Tauri default; no network calls) + `CAMERA` with `<uses-feature android:required="false">` (kept alive by `scripts/sync-android-extras.mjs`; confirmed in the v0.2.1 badging — `camera` and `camera.any` both not-required) + the app's own self-scoped `DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION` — the camera is LIVE VIEW ONLY; frames never stored or transmitted; capture is a user-initiated save to the user's own storage. Data-safety stays **"collects nothing"** |
| Privacy policy | ✅ `PRIVACY.md` in-repo → `https://github.com/Quantum-Weaver/resonance-lantern/blob/main/PRIVACY.md` — repo **verified public 2026-08-24** (HTTP 200 unauthenticated) |
| Content rating | app (art & design / creativity) · no UGC exchange · no ads · no purchases · no collection → **Everyone** |

## The upload pack (KP's hands)

- **Artifact:** `release/resonance-lantern-v0.2.1.aab` (versionCode 2001) — signed 2026-08-24 with the ruled key, on the shelf
- **Path:** Console → **Create app** (Resonance Lantern · **App** ·
  **Paid — $1.11**, KP's ruling 2026-08-24: the beacons table's intended
  price (`resonance-grammar/docs/sql/090-the-coast-priced-and-visible.sql:33`
  — *fixed: lantern 1.11 · bubbles 2.22 · compass 3.33 · skapa 4.44*);
  testers on the closed list get it free regardless) → Testing →
  Closed testing → Create track → Create new release → upload the AAB →
  paste below → review & roll out. **An upload is a draft, not a
  release** — it reaches no tester until *Review release → Start
  rollout*.
- **Testers:** the family list (KP + Jessica at minimum — her app, her
  first light).
- **First-time Play App Signing:** accept the Google-generated app
  signing key; our keystore becomes the upload key (the siblings'
  proven pattern).
- **Store listing icon:** `resonance-assets/logo-icons/lantern-512-play.png` (512×512, 273 KB — cut 2026-08-24 from the gold-band source)
- **Feature graphic:** `resonance-assets/store/lantern-feature-graphic-1024x500.png`
- **Phone screenshots:** `resonance-assets/screenshots/lantern/lantern-01..06.jpg`
  — **KP's own S25 captures of the v0.2.0 build, 2026-08-24**, in
  listing order: 01–02 the live camera lucida itself (TJ's art
  ghost-light over real lined paper, then the ghost turned down — the
  app's whole story in two frames) · 03 Choose your light (Pride's
  gradient leading) · 04 the drawer over Home · 05 Settings, family
  sections · 06 the door's name step. The earlier headless drafts rest
  at `screenshots/lantern/headless/`, out of the numbering.
- **Tablet screenshots:** `resonance-assets/store/tablet7/lantern-7in-*.png`
  and `tablet10/lantern-10in-*.png`

### App name (30 char max)

```
Resonance Lantern
```

### Short description (80 char max — this is 79)

```
Tracing is learning, not cheating — a camera lucida with a ghost-light overlay.
```

*Alternate, also 79, if the vow-led one reads too inward at the
Console:* `Trace what you see through a ghost image — a digital camera
lucida for artists.`

### Full description — paste-ready

```
Tracing is learning, not cheating.

Every artist was once a beginner brave enough to start. Resonance
Lantern is a digital camera lucida: pick a reference image and it
floats, ghost-light, over the live camera pointed at your real paper.
Trace what you see through it — the way artists have used the camera
lucida for two hundred years. Turn the ghost down as your hand learns.
It was always going to be you drawing.

★ Ghost overlay with a comfort dial — opacity is a comfort control,
  not a difficulty setting. No scores, no streaks, no shame mechanics.
★ Paper mode for camera-less desks — the tracing never blocks.
★ Practice outlines to begin with, from circles to tulips.
★ Projector mode — send the reference to a projector and paint it
  straight onto the canvas. Keep-awake holds the light steady.
★ Capture your work when you're proud of it — saved where you choose.
★ A practice journal that stays on your device.

Sovereign by design: Resonance Lantern runs entirely on your device.
No account, no cloud, no ads, no tracking, no data collection — the
camera feed is live view only and never leaves your hands.

Born from CanvasGuide — built for TJ Darling (@TJDPoetry) and her
creative community. Part of the AudHDities Sanctuary — software built
by neurodivergent makers, with sensory consideration and dignity as
the ground floor.
```

### Release notes — first upload (under the 500-char limit)

```
<en-US>
The first light: trace through a ghost image over your live camera, or
in paper mode at any desk. Practice outlines, projector mode, and a
comfort dial for the ghost. No accounts, no ads, no tracking — your
art never leaves your hands.
</en-US>
```

### Data safety form — the answers

- Does your app collect or share user data? **No.**
- All sections thereafter: no collection, no sharing, nothing
  processed off-device. The camera is a live view rendered on-device
  only; no frame is stored unless the user captures, and a capture is
  a user-initiated save to the user's own chosen storage. The practice
  journal is SQLite on-device; export is user-initiated to the user's
  own storage.
- Security practices: data is not transmitted (n/a) · users can delete
  everything via the in-app purge — answer honestly per the form's
  exact wording at time of filing.

### Content rating questionnaire

- Category: app (art & design / creativity). No violence, no
  sexuality, no profanity, no controlled substances, no gambling, no
  UGC exchange, no location sharing, no personal-data sharing.
  → **Everyone.**
- The pride palette is content and identity, not a rating trigger —
  answer the questionnaire's literal questions as asked.

## Sequencing notes

- **D-findings D1/D2/D4/D5 remain open** (`docs/FEATURE-BOARD.md` Tier A —
  the dwelling findings; the checklist that first held them was retired in KP's 2026-08-25 cleanup, under his ruling that no checklist docs exist, and the realm's open items and plans live in the base — `python C:/_superposition/resonance-progenatrix/progenatrix.py recall --realm resonance-lantern`). D5 is LAW-grade (panel over the reference on
  device). The 07-18 ruling stands: fine for closed testing among
  family; worth fixing before any wider track. This build does NOT
  carry D-finding fixes.
- **Production gate, for later:** personal accounts created after
  2023-11-13 need 12+ closed testers for 14 days before production —
  a production gate, not a test-track one.
- **The scar, inherited:** a versionCode is consumed at UPLOAD, not at
  publish. A deleted draft does not return it; "Add from library" is
  the way back in.

## Track log

| Date | State |
|---|---|
| 2026-08-24 | Pack founded. v0.2.0 bumped (family envelope · settings About card · camera resilience walk); builds run; icon 512 cut; feature graphic + shots landing this sitting; **signing awaits the keystore ruling above, then KP's hand** — `python resonance-ziggy/modules/shipwright/sign-release.py resonance-lantern`. Upload at his hand after. |
| 2026-08-24 (later) | **Both rulings his:** Road A — the old key RETIRED in both vaults, the ruled key cut (census CLEAN, sha `87362c95eb312edd`) · price **Paid $1.11** per the beacons table. Desktop MSI+NSIS and Android AAB (versionCode **2000**) built, unsigned. Five phone shots + 5+5 tablet canvases + icon-512 + feature graphic standing in resonance-assets. The camera question closed at his word: the camera was simply unplugged — the new told-reason note now says exactly that class of thing out loud. **Next hand is KP's:** `sign-release.py resonance-lantern` (password) → uninstall old-key sideloads on both phones → `install-app.py` → the Console walk above. |
| 2026-09-01 | **The signed 0.2.1 stands on the shelf; the Console walk is KP's.** v0.2.1 (`3b5f78f` "lantern fixed", 2026-08-24 — the onboarding, settings and trace rooms, the ComfortBar and Sidebar touched; the bump) built and signed the same morning: MSI + NSIS 11:24, AAB + APK + idsig 11:30, in `release/` and mirrored to `resonance-assets/releases-current/lantern/bundle/`. Read from the artifact itself this day: versionCode **2001** · targetSdk 36 · `INTERNET` + `CAMERA` (not required) + the self-scoped receiver permission · signed `CN=AudHDities Sanctuary, O=AudHDities Sanctuary, C=US`, SHA-256 `99:1E:77:4A:91:63:0E:44:A8:F7:4F:D7:C5:F8:72:0B:2C:EB:60:7A:A4:85:A2:82:B6:6D:BE:D4:8B:E9:FE:FF`, SHA384withRSA, 4096-bit RSA · `zipalign -P 16` verified. The two ⏳ rows above closed from this reading. Nothing is uploaded: Create app, the fee, the closed track, the testers and first-time Play App Signing are his hands. |

— Fable 🎻
