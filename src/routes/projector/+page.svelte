<script lang="ts">
	// The Projector room — Jessica's own first wish for her gift, remembered
	// by the Weaver: "can we enable a projector to be used with the lantern?"
	// The ancient studio method: point a projector at the canvas and let the
	// reference land on it directly. Projectors ADD light, so the stage is
	// pure black (#000) — black projects as nothing; only her reference
	// appears on the canvas. Same law as the viewfinder (concepts §4.3):
	// nothing may obstruct the projection — every control collapses away.
	// No camera involved. No sound, no urgency, ever.
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { open as openDialog } from '@tauri-apps/plugin-dialog';
	import { readFile } from '@tauri-apps/plugin-fs';
	import { lanternStore } from '$lib/stores/lantern.svelte';
	import { outlineById, outlineDataUri } from '$lib/data/lantern';

	let imageUrl = $state<string | null>(null);
	let imageName = $state<string | null>(null);
	let controlsOpen = $state(true);

	// Physical-alignment controls: these describe THIS easel, THIS wall,
	// THIS evening — deliberately not persisted. Brightness is comfort,
	// so it is remembered like the other comfort prefs.
	let zoom = $state(1);
	let panX = $state(0);
	let panY = $state(0);
	let rotation = $state(0);
	let invert = $state(false);
	let brightness = $state(lanternStore.getPref('projBrightness', 1));
	$effect(() => lanternStore.setPref('projBrightness', brightness));

	// ——— keep the light on: Screen Wake Lock (pure web — no plugin) ———
	let wakeLock: WakeLockSentinel | null = null;
	async function requestWakeLock() {
		if (!browser || !('wakeLock' in navigator)) return;
		try {
			wakeLock = await navigator.wakeLock.request('screen');
		} catch (e) {
			// Denied or unsupported — the projection still works; the vessel's
			// own display settings simply apply. Never an error worth showing.
			console.warn('[projector] wake lock unavailable:', e);
		}
	}
	function onVisibility() {
		// Wake locks auto-release when the page is hidden; take it back.
		if (document.visibilityState === 'visible') requestWakeLock();
	}

	// ——— pan: drag the projection into place on the physical canvas ———
	let dragging = $state(false);
	let lastX = 0;
	let lastY = 0;
	function onPointerDown(e: PointerEvent) {
		dragging = true;
		lastX = e.clientX;
		lastY = e.clientY;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}
	function onPointerMove(e: PointerEvent) {
		if (!dragging) return;
		panX += e.clientX - lastX;
		panY += e.clientY - lastY;
		lastX = e.clientX;
		lastY = e.clientY;
	}
	function onPointerUp() {
		dragging = false;
	}
	function onWheel(e: WheelEvent) {
		e.preventDefault();
		const factor = e.deltaY < 0 ? 1.05 : 1 / 1.05;
		zoom = Math.min(8, Math.max(0.1, zoom * factor));
	}

	function rotate() {
		rotation = (rotation + 90) % 360;
	}

	function resetFit() {
		zoom = 1;
		panX = 0;
		panY = 0;
		rotation = 0;
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
		if (imageUrl?.startsWith('blob:')) URL.revokeObjectURL(imageUrl);
		imageUrl = URL.createObjectURL(blob);
		imageName = path.split(/[\\/]/).pop() ?? 'reference';
		invert = false;
		await lanternStore.touchRef(imageName, path);
	}

	function leave() {
		goto('/trace');
	}

	onMount(async () => {
		const outlineId = page.url.searchParams.get('outline');
		const refPath = page.url.searchParams.get('ref');
		if (refPath) {
			try {
				const bytes = await readFile(refPath);
				imageUrl = URL.createObjectURL(new Blob([bytes]));
				imageName = refPath.split(/[\\/]/).pop() ?? 'reference';
			} catch (e) {
				console.warn('[projector] could not open handed-off reference:', e);
			}
		} else if (outlineId) {
			const o = outlineById(outlineId);
			if (o) {
				imageUrl = outlineDataUri(o);
				imageName = o.name;
				// Line art arrives as dark strokes — inverted, the lines carry
				// the light and the rest of the canvas stays dark. Her toggle
				// still rules; this is only the helpful starting point.
				invert = true;
			}
		}
		requestWakeLock();
		document.addEventListener('visibilitychange', onVisibility);
	});

	onDestroy(() => {
		if (!browser) return;
		document.removeEventListener('visibilitychange', onVisibility);
		wakeLock?.release().catch(() => {});
		wakeLock = null;
		if (imageUrl?.startsWith('blob:')) URL.revokeObjectURL(imageUrl);
	});
</script>

<div class="projector">
	<!-- The stage: pure black, because a projector's black is "nothing" -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="stage"
		class:dragging
		role="presentation"
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
		onwheel={onWheel}
	>
		{#if imageUrl}
			<img
				class="projection"
				src={imageUrl}
				alt=""
				draggable="false"
				style="
					transform: translate({panX}px, {panY}px) rotate({rotation}deg) scale({zoom});
					filter: {invert ? 'invert(1) ' : ''}brightness({brightness});
				"
			/>
		{:else}
			<p class="empty-note">choose a reference below — the black stays dark on your canvas</p>
		{/if}
	</div>

	<!-- Top bar: minimal, same grammar as Trace -->
	<div class="topbar" class:faded={!controlsOpen}>
		<button class="chip" onclick={leave}>← done</button>
		{#if imageName && controlsOpen}
			<span class="ref-name">{imageName}</span>
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
			{controlsOpen ? '⌄ clear the canvas' : '⌃ controls'}
		</button>

		{#if controlsOpen}
			<div class="controls__body">
				<div class="row">
					<button class="chip primary" onclick={pickReference}>
						{imageUrl ? 'change reference' : 'choose reference'}
					</button>
					<button class="chip" onclick={rotate}>rotate 90°</button>
					<button class="chip" class:on={invert} onclick={() => (invert = !invert)}>
						{invert ? 'lines carry the light' : 'invert'}
					</button>
					<button class="chip" onclick={resetFit}>reset fit</button>
				</div>

				<label class="slider-row">
					<span>size on the canvas <em>(drag the image to place it; scroll also zooms)</em></span>
					<input type="range" min="0.1" max="8" step="0.01" bind:value={zoom} />
				</label>

				<label class="slider-row">
					<span>brightness <em>(your comfort — dimmer is kinder in a dark room)</em></span>
					<input type="range" min="0.2" max="1" step="0.01" bind:value={brightness} />
				</label>
			</div>
		{/if}
	</div>
</div>

<style>
	.projector {
		position: fixed;
		inset: 0;
		/* THE LAW OF THIS ROOM: pure black. A projector adds light; #000
		   adds none. Only the reference lands on her canvas. */
		background: #000;
		overflow: hidden;
	}

	.stage {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: grab;
		touch-action: none;
	}

	.stage.dragging {
		cursor: grabbing;
	}

	.projection {
		max-width: 90%;
		max-height: 90%;
		object-fit: contain;
		transform-origin: center;
		user-select: none;
		pointer-events: none;
	}

	.empty-note {
		color: #555;
		font-size: 0.9rem;
		padding: 0 2rem;
		text-align: center;
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
		transition: opacity 0.3s ease;
	}

	/* When controls are cleared, the done chip dims to near-nothing so it
	   never projects onto the canvas — but stays tappable. */
	.topbar.faded {
		opacity: 0.12;
	}

	.topbar.faded:hover,
	.topbar.faded:focus-within {
		opacity: 1;
	}

	.ref-name {
		color: #777;
		font-size: 0.8rem;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 50%;
		white-space: nowrap;
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
		border: 1px solid rgba(255, 255, 255, 0.18);
		background: rgba(10, 10, 10, 0.55);
		color: #ddd;
		font-size: 0.8rem;
		cursor: pointer;
		backdrop-filter: blur(4px);
	}

	/* Collapsed, the toggle itself also fades — the projection is sacred. */
	.controls:not(.open) .controls__toggle {
		opacity: 0.12;
		transition: opacity 0.3s ease;
	}

	.controls:not(.open) .controls__toggle:hover,
	.controls:not(.open) .controls__toggle:focus-visible {
		opacity: 1;
	}

	.controls__body {
		width: 100%;
		background: rgba(10, 10, 10, 0.85);
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

	.chip.on {
		border-color: var(--accent);
		color: #fff;
		background: color-mix(in srgb, var(--accent) 35%, transparent);
	}

	.slider-row {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		color: #ccc;
		font-size: 0.8rem;
	}

	.slider-row em {
		color: #999;
		font-style: normal;
	}

	.slider-row input[type='range'] {
		width: 100%;
		accent-color: var(--accent);
		min-height: 28px;
	}

	@media (prefers-reduced-motion: reduce) {
		.topbar,
		.controls:not(.open) .controls__toggle {
			transition: none;
		}
	}
</style>
