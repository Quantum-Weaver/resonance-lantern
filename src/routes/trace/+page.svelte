<script lang="ts">
	// The Trace room — the heart. A digital camera lucida: the reference
	// image floats, ghost-light, over the live camera pointed at your paper.
	// LAW (concepts §4.3): no feature may obstruct the viewfinder — all
	// controls collapse away. Opacity is a COMFORT control, not an image
	// control. Desktop camera works today via getUserMedia; Android camera
	// awaits its spike (FRAMEWORK-DECISION) — until then, paper mode.
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { open as openDialog, save as saveDialog } from '@tauri-apps/plugin-dialog';
	import { readFile, writeFile } from '@tauri-apps/plugin-fs';
	import { lanternStore } from '$lib/stores/lantern.svelte';
	import {
		OPACITY_PRESETS,
		outlineById,
		outlineDataUri,
		pickSaveMessage,
		pickEncouragement,
	} from '$lib/data/lantern';

	let video: HTMLVideoElement | undefined = $state();
	let stream: MediaStream | null = null;
	let cameraOn = $state(false);
	let cameraTried = $state(false);

	let overlayUrl = $state<string | null>(null);
	let overlayName = $state<string | null>(null);
	let overlayPath = $state<string | null>(null); // file-backed refs carry over to the Projector
	let controlsOpen = $state(true);
	let opacity = $state(lanternStore.getPref('opacity', 0.4));
	let imgZoom = $state(lanternStore.getPref('imgZoom', 1));
	let viewZoom = $state(lanternStore.getPref('viewZoom', 1));
	let message = $state<string | null>(null);
	let sessionId: string | null = null;

	$effect(() => lanternStore.setPref('opacity', opacity));
	$effect(() => lanternStore.setPref('imgZoom', imgZoom));
	$effect(() => lanternStore.setPref('viewZoom', viewZoom));

	async function tryCamera() {
		cameraTried = true;
		try {
			stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment', width: { ideal: 1920 } },
				audio: false,
			});
			if (video) {
				video.srcObject = stream;
				await video.play();
				cameraOn = true;
			}
		} catch (e) {
			console.warn('[trace] camera unavailable, paper mode:', e);
			cameraOn = false;
		}
	}

	async function pickReference() {
		const path = await openDialog({
			title: 'Choose a reference image',
			multiple: false,
			filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'svg'] }],
		});
		if (!path || typeof path !== 'string') return;
		const bytes = await readFile(path);
		const blob = new Blob([bytes]);
		if (overlayUrl?.startsWith('blob:')) URL.revokeObjectURL(overlayUrl);
		overlayUrl = URL.createObjectURL(blob);
		overlayName = path.split(/[\\/]/).pop() ?? 'reference';
		overlayPath = path;
		await lanternStore.touchRef(overlayName, path);
		await beginSession();
	}

	// Hand the current reference to the Projector room (Jessica's wish —
	// project it straight onto the physical canvas; no camera involved).
	async function project() {
		if (sessionId) await lanternStore.endSession(sessionId);
		const outlineId = page.url.searchParams.get('outline');
		if (overlayPath) {
			goto(`/projector?ref=${encodeURIComponent(overlayPath)}`);
		} else if (outlineId) {
			goto(`/projector?outline=${outlineId}`);
		} else {
			goto('/projector');
		}
	}

	async function beginSession() {
		if (sessionId) return;
		sessionId = await lanternStore.startSession(
			overlayName,
			page.url.searchParams.get('outline')
		);
	}

	async function capture() {
		if (!cameraOn || !video) {
			message = 'Capture needs the camera — in paper mode, your paper IS the capture. ' + pickEncouragement();
			return;
		}
		const canvas = document.createElement('canvas');
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		ctx.drawImage(video, 0, 0);
		if (overlayUrl) {
			const img = new Image();
			img.src = overlayUrl;
			await new Promise((r) => (img.onload = r));
			ctx.globalAlpha = opacity;
			const scale = imgZoom * Math.min(canvas.width / img.width, canvas.height / img.height) * 0.8;
			const w = img.width * scale;
			const h = img.height * scale;
			ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
			ctx.globalAlpha = 1;
		}
		const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, 'image/png'));
		if (!blob) return;
		const path = await saveDialog({
			title: 'Save your work',
			defaultPath: `lantern-${new Date().toISOString().slice(0, 10)}.png`,
			filters: [{ name: 'PNG', extensions: ['png'] }],
		});
		if (!path) return;
		await writeFile(path, new Uint8Array(await blob.arrayBuffer()));
		if (sessionId) await lanternStore.endSession(sessionId, path);
		message = pickSaveMessage();
	}

	async function leave() {
		if (sessionId) await lanternStore.endSession(sessionId);
		goto('/');
	}

	onMount(async () => {
		// An outline may arrive from the Practice room.
		const outlineId = page.url.searchParams.get('outline');
		if (outlineId) {
			const o = outlineById(outlineId);
			if (o) {
				overlayUrl = outlineDataUri(o);
				overlayName = o.name;
				await beginSession();
			}
		}
		await tryCamera();
	});

	onDestroy(() => {
		stream?.getTracks().forEach((t) => t.stop());
		if (overlayUrl?.startsWith('blob:')) URL.revokeObjectURL(overlayUrl);
	});
</script>

<div class="trace" class:paper={!cameraOn}>
	<!-- The viewfinder -->
	<div class="viewport">
		<!-- svelte-ignore a11y_media_has_caption -->
		<video
			bind:this={video}
			playsinline
			muted
			style="transform: scale({viewZoom});"
			class:hidden={!cameraOn}
		></video>
		{#if !cameraOn && cameraTried}
			<div class="paper-bg" aria-hidden="true"></div>
		{/if}
		{#if overlayUrl}
			<img
				class="overlay"
				src={overlayUrl}
				alt="Reference overlay"
				style="opacity: {opacity}; transform: scale({imgZoom});"
			/>
		{/if}
		<div class="frame" aria-hidden="true"></div>
	</div>

	<!-- Top bar: minimal, dismissible world -->
	<div class="topbar">
		<button class="chip" onclick={leave}>← done</button>
		{#if !cameraOn && cameraTried}
			<span class="mode-note">paper mode — camera unavailable here (Android camera arrives with its spike)</span>
		{/if}
		{#if message}
			<span class="celebrate">{message}</span>
		{/if}
	</div>

	<!-- The collapsible controls: one tap slides the whole panel away -->
	<div class="controls" class:open={controlsOpen}>
		<button
			class="controls__toggle"
			onclick={() => (controlsOpen = !controlsOpen)}
			aria-expanded={controlsOpen}
			aria-label={controlsOpen ? 'Hide controls' : 'Show controls'}
		>
			{controlsOpen ? '⌄ clear the view' : '⌃ controls'}
		</button>

		{#if controlsOpen}
			<div class="controls__body">
				<div class="row">
					<button class="chip primary" onclick={pickReference}>
						{overlayUrl ? 'change reference' : 'choose reference'}
					</button>
					{#if overlayName}<span class="ref-name">{overlayName}</span>{/if}
					{#if cameraOn}
						<button class="chip" onclick={capture}>📸 capture</button>
					{/if}
					<button class="chip" onclick={project}>project</button>
				</div>

				<label class="slider-row">
					<span>ghost strength <em>(your comfort level — turn it down as you grow)</em></span>
					<input type="range" min="0.1" max="1" step="0.01" bind:value={opacity} />
					<span class="presets">
						{#each OPACITY_PRESETS as p}
							<button class="mini" class:on={Math.abs(opacity - p.value) < 0.03} onclick={() => (opacity = p.value)}>{p.label}</button>
						{/each}
					</span>
				</label>

				<label class="slider-row">
					<span>image size</span>
					<input type="range" min="0.3" max="3" step="0.01" bind:value={imgZoom} />
				</label>

				{#if cameraOn}
					<label class="slider-row">
						<span>view zoom</span>
						<input type="range" min="1" max="2.5" step="0.01" bind:value={viewZoom} />
					</label>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.trace {
		position: fixed;
		inset: 0;
		background-color: #0d0c0b;
		overflow: hidden;
	}

	.viewport {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform-origin: center;
	}

	video.hidden { display: none; }

	.paper-bg {
		position: absolute;
		inset: 0;
		/* warm paper: trace over a calm sheet when no camera is here */
		background:
			radial-gradient(ellipse at center, #f5efe2 0%, #e9e0cd 75%, #ded2ba 100%);
	}

	.overlay {
		position: absolute;
		max-width: 82%;
		max-height: 82%;
		object-fit: contain;
		pointer-events: none;
		transform-origin: center;
	}

	.frame {
		position: absolute;
		inset: 4%;
		border: 1px solid rgba(255, 255, 255, 0.25);
		border-radius: 10px;
		pointer-events: none;
		mix-blend-mode: difference;
	}

	.topbar {
		position: absolute;
		top: calc(0.6rem + env(safe-area-inset-top, 0px));
		left: 0.75rem;
		right: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		z-index: 5;
		flex-wrap: wrap;
	}

	.mode-note {
		font-size: 0.75rem;
		color: rgba(20, 18, 14, 0.75);
		background: rgba(255, 255, 255, 0.5);
		padding: 0.2rem 0.6rem;
		border-radius: 999px;
	}

	.celebrate {
		font-size: 0.85rem;
		color: #fff;
		background: color-mix(in srgb, var(--accent) 75%, #000);
		padding: 0.35rem 0.8rem;
		border-radius: 999px;
	}

	.controls {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 5;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.controls__toggle {
		margin-bottom: 0.35rem;
		padding: 0.4rem 1rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.25);
		background: rgba(10, 10, 10, 0.55);
		color: #eee;
		font-size: 0.8rem;
		cursor: pointer;
		backdrop-filter: blur(4px);
	}

	.controls__body {
		width: 100%;
		background: rgba(10, 10, 10, 0.72);
		backdrop-filter: blur(6px);
		padding: 0.8rem 1rem calc(0.9rem + env(safe-area-inset-bottom, 0px));
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	.ref-name {
		color: #bbb;
		font-size: 0.8rem;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 40%;
		white-space: nowrap;
	}

	.chip {
		padding: 0.5rem 0.95rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.3);
		background: rgba(255, 255, 255, 0.08);
		color: #eee;
		font-size: 0.85rem;
		cursor: pointer;
		min-height: 42px;
	}

	.chip.primary {
		background-color: var(--accent);
		border-color: var(--accent);
		color: #fff;
	}

	.slider-row {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		color: #ccc;
		font-size: 0.8rem;
	}

	.slider-row em { color: #999; font-style: normal; }

	.slider-row input[type='range'] {
		width: 100%;
		accent-color: var(--accent);
		min-height: 28px;
	}

	.presets { display: flex; gap: 0.35rem; }

	.mini {
		padding: 0.2rem 0.6rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.25);
		background: none;
		color: #bbb;
		font-size: 0.72rem;
		cursor: pointer;
	}

	.mini.on {
		border-color: var(--accent);
		color: #fff;
		background: color-mix(in srgb, var(--accent) 35%, transparent);
	}
</style>
