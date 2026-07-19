# Lantern → Google Play (first ascent) + Echoes track update
*Prepared 2026-07-18 at KP's word: "we need to get the lantern up on
google play and update the echoes version. we can wait on updating
compass until the musician features are live." Compass's Play update is
deliberately parked until v3.*

## The artifacts

- **Lantern v0.1.1** — rebuilt this evening carrying what the 07-12 AAB
  lacked: the 16 KB page-size flags (Play now enforces 16 KB support),
  the gold-band icons, and the CLAUDE.md-era hygiene. Sign with
  `sign-release.py`, then upload the **.aab**.
- **Echoes v1.2.0** — `release/resonance-echoes-v1.2.0.aab`, already
  signed by KP's hand (2026-07-18 19:43). Ready to upload as-is.

## KP's console steps — Echoes (the short one)

1. Play Console → Resonance Echoes → its existing closed-testing track.
2. Create new release → upload `resonance-echoes-v1.2.0.aab`.
3. Release notes (suggested): "The timer now sounds when it completes.
   16 KB page-size support. Refined theming."
4. Review + roll out to the track. (Closed testing — not published;
   never say published.)

## KP's console steps — Lantern (the first ascent)

Play Console → Create app:
1. **Name:** Resonance Lantern · **App/Game:** App · **Free/Paid:** KP's
   call (siblings: Compass is paid; Lantern is a gift — but the Play
   listing's price is a decision, not a default. Once set to free it can
   never become paid on Play — set-in-stone rule worth knowing).
2. **Declarations:** the app is fully local — the honest answers are the
   easy ones. Data safety: no data collected, no data shared (SQLite on
   device; export is user-initiated to the user's own storage; camera
   frames never leave the device — the tracing overlay is live-view
   only). Ads: none. Content rating questionnaire: utility/creativity
   app, no user-generated content exchange, no ads → Everyone.
3. **Privacy policy URL:** verified publicly reachable (repo is public,
   same as the siblings — Compass's listing uses this exact pattern):
   `https://github.com/Quantum-Weaver/resonance-lantern/blob/main/PRIVACY.md`
4. **Store listing:** short + full description (the story is ready-made:
   a tracing lantern for artists — reference ghost overlay, practice
   outlines, projector mode; built with love for a poet-artist).
   Screenshots: `resonance-assets/screenshots/` has the gallery from the
   S25 pass; phone screenshots required (min 2), 7-inch/10-inch optional.
   App icon 512×512 + feature graphic 1024×500: forge from the gold-band
   source in `resonance-assets/logo-icons/lantern.png`.
5. **Upload the signed v0.1.1 AAB** to **closed testing** first (match
   the family pattern — Echoes closed, Compass internal; production is
   its own later decision, especially with D-findings D1/D2/D4/D5 still
   open). Add tester emails (KP + Jessica at minimum).
6. First-time Play App Signing: accept Google-generated app signing key;
   our keystore becomes the upload key (this is how the siblings work).

## Sequencing note

D5 (panel overlapping the reference on device) is LAW-grade and open —
fine for closed testing among family, worth fixing before any wider
track. The rebuild does NOT include D-finding fixes; those are a coding
sitting.

## Compass — parked on purpose

v2.2.0 stays sideload-only for the family. The Play track updates when
the Musician's Compass (v3) is live — KP's word, 2026-07-18.
