// Patches the gitignored, regenerable src-tauri/gen/android tree with the
// one Android-manifest change the Trace camera needs. Runs from
// tauri.conf.json's beforeDevCommand/beforeBuildCommand (and is safe to run
// manually: `npm run sync-android`). No-ops when gen/android doesn't exist
// (desktop-only checkouts, pre-`tauri android init` state).
//
// Why this exists (the camera-spike finding, 2026-07-12):
// FRAMEWORK-DECISION.md worried getUserMedia() in the Android WebView would
// need a custom permission-grant patch in the Kotlin layer. It doesn't —
// Tauri v2's own generated RustWebChromeClient.kt already implements
// onPermissionRequest() and requests android.permission.CAMERA at runtime
// before granting VIDEO_CAPTURE. That machinery is auto-generated per build
// and untouched here. The actual gap: a dangerous permission can't be
// runtime-requested unless the manifest declares it first. Undeclared, the
// permission dialog silently never appears and getUserMedia() fails with
// NotAllowedError — which would have looked exactly like "the spike failed"
// without this being the reason. This script keeps the declaration alive
// across every `tauri android init` (which wipes gen/ and rewrites the
// manifest from tauri.conf.json + capabilities, neither of which carries
// manifest-level <uses-permission> entries for CAMERA).
//
// android.hardware.camera is marked not-required: declaring CAMERA alone
// makes the Play install filter assume the hardware is mandatory unless a
// <uses-feature required="false"> says otherwise. Trace already has a full
// paper-mode fallback for camera-less devices — the manifest should not
// contradict that design.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const genAndroid = join(root, 'src-tauri', 'gen', 'android');

if (!existsSync(genAndroid)) {
	console.log('[sync-android-extras] no gen/android — skipping');
	process.exit(0);
}

const manifestPath = join(genAndroid, 'app', 'src', 'main', 'AndroidManifest.xml');
const manifest = readFileSync(manifestPath, 'utf8');

if (!manifest.includes('android.permission.CAMERA')) {
	const internetLine = '<uses-permission android:name="android.permission.INTERNET" />';
	if (!manifest.includes(internetLine)) {
		console.error('[sync-android-extras] manifest INTERNET anchor not found — add CAMERA permission manually');
		process.exit(1);
	}
	const block =
		internetLine +
		'\n\n    <!-- Trace camera preview (getUserMedia via WebView onPermissionRequest,' +
		'\n         Tauri-generated RustWebChromeClient — no custom Kotlin needed).' +
		'\n         Feature marked not-required: Trace falls back to paper mode' +
		'\n         on devices without a camera. -->' +
		'\n    <uses-permission android:name="android.permission.CAMERA" />' +
		'\n    <uses-feature android:name="android.hardware.camera" android:required="false" />' +
		'\n    <uses-feature android:name="android.hardware.camera.any" android:required="false" />';
	writeFileSync(manifestPath, manifest.replace(internetLine, block));
	console.log('[sync-android-extras] CAMERA permission + feature inserted');
} else {
	console.log('[sync-android-extras] CAMERA permission already present');
}
