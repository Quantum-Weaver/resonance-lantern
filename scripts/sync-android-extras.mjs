// Patches the gitignored, regenerable src-tauri/gen/android tree with the
// one Android-manifest change the Trace camera needs. Runs from
// tauri.conf.json's beforeDevCommand/beforeBuildCommand (and is safe to run
// manually: `npm run sync-android`). No-ops when gen/android doesn't exist
// (desktop-only checkouts, pre-`tauri android init` state).
//
// A dangerous permission cannot be runtime-requested unless the manifest
// declares it first; undeclared, the permission dialog never appears and
// getUserMedia() fails with NotAllowedError. `tauri android init` wipes gen/
// and rewrites the manifest, so the declaration is re-applied here each run.
//
// android.hardware.camera is marked not-required: declaring CAMERA alone
// makes the Play install filter assume the hardware is mandatory unless a
// <uses-feature required="false"> says otherwise.

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
