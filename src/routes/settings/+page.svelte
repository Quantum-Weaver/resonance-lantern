<script lang="ts">
	// Settings — light, type, sovereignty, and the credits that honor the
	// origin. The About card at the foot carries the version from tauri.conf
	// — never hardcoded — and the two links.
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme.svelte';
	import { PRESET_THEMES } from '$lib/theme/theme';
	import { lanternStore } from '$lib/stores/lantern.svelte';
	import { TJD_PLATFORMS, PRIDE_GRADIENT, THE_VOW } from '$lib/data/lantern';
	import { save } from '@tauri-apps/plugin-dialog';
	import { writeTextFile } from '@tauri-apps/plugin-fs';
	import { openUrl } from '@tauri-apps/plugin-opener';

	const PRIVACY_URL = 'https://github.com/Quantum-Weaver/resonance-lantern/blob/main/PRIVACY.md';
	const SANCTUARY_URL = 'https://audhdities.com';

	let vesselName = $state('');
	let note = $state<string | null>(null);
	let purgeArmed = $state(false);
	let appVersion = $state('');
	let privacyError = $state(false);

	onMount(async () => {
		try {
			const { getVersion } = await import('@tauri-apps/api/app');
			appVersion = await getVersion();
		} catch {
			/* outside Tauri — the page still stands, the pill just rests */
		}
	});

	$effect(() => {
		if (typeof localStorage !== 'undefined' && !vesselName) {
			vesselName = localStorage.getItem('resonance-lantern-vessel-name') ?? '';
		}
	});

	function saveName() {
		try {
			localStorage.setItem('resonance-lantern-vessel-name', vesselName.trim() || 'there');
			note = 'Name kept.';
		} catch {}
	}

	async function exportAll() {
		note = null;
		try {
			const json = await lanternStore.exportAll();
			const path = await save({
				title: 'Export your practice journal (open JSON — yours, always)',
				defaultPath: `lantern-export-${new Date().toISOString().slice(0, 10)}.json`,
				filters: [{ name: 'JSON', extensions: ['json'] }],
			});
			if (!path) return;
			await writeTextFile(path, json);
			note = 'Exported. Your journal, in the open, wherever you take it.';
		} catch (e) {
			note = `Export hit a snag: ${e instanceof Error ? e.message : e}`;
		}
	}

	async function purge() {
		if (!purgeArmed) {
			purgeArmed = true;
			return;
		}
		await lanternStore.purgeAll();
		purgeArmed = false;
		note = 'Purged. The purge truly purges — nothing was kept.';
	}

	async function openPrivacy() {
		try {
			await openUrl(PRIVACY_URL);
		} catch {
			privacyError = true;
		}
	}
	async function openSanctuary() {
		try {
			await openUrl(SANCTUARY_URL);
		} catch {
			privacyError = true;
		}
	}
</script>

<div class="settings" style="padding-top: env(safe-area-inset-top, 0px);">
	<header class="settings-header">
		<h1 class="settings-title">Settings</h1>
	</header>

	<section class="section">
		<h2 class="section-title">What shall the Lantern call you?</h2>
		<div class="row">
			<input type="text" bind:value={vesselName} placeholder="a name, a nickname, anything"
				onkeydown={(e) => { if (e.key === 'Enter') saveName(); }} />
			<button class="soft-btn" onclick={saveName}>keep</button>
		</div>
	</section>

	<section class="section">
		<h2 class="section-title">Light &amp; type</h2>
		<div class="chip-row">
			{#each Object.entries(PRESET_THEMES) as [key, preset]}
				<button
					class="chip"
					class:active={themeStore.config.presetName === preset.presetName}
					onclick={() => themeStore.setPreset(key)}
				>{preset.presetName}</button>
			{/each}
		</div>
		<div class="chip-row">
			{#each ['small', 'medium', 'large'] as fs}
				<button
					class="chip"
					class:active={themeStore.config.fontSize === fs}
					onclick={() => themeStore.setFontSize(fs as 'small' | 'medium' | 'large')}
				>{fs} type</button>
			{/each}
		</div>
	</section>

	<section class="section">
		<h2 class="section-title">Your data (yours, structurally)</h2>
		<div class="chip-row">
			<button class="soft-btn" onclick={exportAll}>export journal (open JSON)</button>
			<button class="soft-btn danger" onclick={purge}>
				{purgeArmed ? 'press again to truly purge' : 'delete everything'}
			</button>
			{#if purgeArmed}
				<button class="soft-btn" onclick={() => (purgeArmed = false)}>never mind</button>
			{/if}
		</div>
		{#if note}<p class="hint">{note}</p>{/if}
		<p class="hint">
			Local-first, always. No accounts, no cloud, no tracking, no telemetry.
			Your art belongs to you — that promise predates this app's name.
		</p>
	</section>

	<section class="section credits">
		<div class="pride-band" style="background: {PRIDE_GRADIENT};" aria-hidden="true"></div>
		<h2 class="section-title">The origin</h2>
		<p class="credit-line">
			Born from <strong>CanvasGuide</strong> — built by the Quantum Weaver for
			<strong>TJ Darling (@TJDPoetry)</strong> and her creative community.
			A gift inside the family, becoming a gift beyond it.
		</p>
		<p class="credit-vow">“{THE_VOW}”</p>
		<h2 class="section-title">Find &amp; support TJDPoetry</h2>
		<div class="platforms">
			{#each TJD_PLATFORMS as p}
				<button class="platform" onclick={() => openUrl(p.url)}>{p.name}</button>
			{/each}
		</div>
	</section>

	<section class="section">
		<h2 class="section-title">About</h2>

		<div class="about-card">
			<div class="about-app">
				<span class="about-name">Resonance Lantern</span>
				{#if appVersion}<span class="about-version">v{appVersion}</span>{/if}
			</div>
			<p class="about-tag">
				A steady light for a learning hand — a digital camera lucida.
				Tracing is learning, not cheating.
			</p>
			<p class="about-built">
				TJ's light, first. Built with Aethelred by Quantum Weaver for the AudHDities Sanctuary.
			</p>
			<p class="about-license">All data belongs to the vessel. The Resonance Grammar governs.</p>
			<div class="about-links">
				<button class="privacy-link" onclick={openPrivacy}>Privacy Policy</button>
				<button class="privacy-link" onclick={openSanctuary}>audhdities.com — the Sanctuary</button>
				{#if privacyError}
					<p class="privacy-url">{PRIVACY_URL}</p>
				{/if}
			</div>
		</div>
	</section>
</div>

<style>
	.settings {
		min-height: 100%;
	}

	.settings-header {
		padding: 1rem 1.25rem 0.75rem;
		border-bottom: 1px solid var(--border-color);
	}

	.settings-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text);
		margin: 0;
	}

	.section {
		padding: 1.25rem 1.25rem 0;
		border-bottom: 1px solid var(--border-color);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-bottom: 1.25rem;
	}

	.section-title {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-muted);
		margin: 0;
	}

	.row { display: flex; gap: 0.5rem; }
	.row input { flex: 1; padding: 0.6rem 0.7rem; border-radius: 8px; border: 1px solid var(--border-color); background-color: var(--bg); color: var(--text); font-size: 0.95rem; }

	.chip-row { display: flex; gap: 0.4rem; flex-wrap: wrap; }
	.chip { padding: 0.45rem 0.8rem; border-radius: 999px; border: 1px solid var(--border-color); background: none; color: var(--text-secondary); cursor: pointer; font: inherit; font-size: 0.9rem; min-height: 40px; }
	.chip.active { border-color: var(--accent); color: var(--text); background-color: color-mix(in srgb, var(--accent) 15%, var(--bg-surface)); }

	.soft-btn { padding: 0.45rem 0.85rem; border-radius: 999px; border: 1px solid var(--border-color); background: none; color: var(--text-secondary); cursor: pointer; font: inherit; font-size: 0.85rem; min-height: 40px; }
	.soft-btn:hover { border-color: var(--accent); color: var(--text); }
	.soft-btn.danger:hover { border-color: #c96f6f; color: #c96f6f; }

	.hint { color: var(--text-muted); font-size: 0.8rem; margin: 0; line-height: 1.5; }

	.pride-band { height: 5px; border-radius: 999px; }
	.credit-line { color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin: 0; }
	.credit-vow { color: var(--text); font-style: italic; margin: 0; }

	.platforms { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.5rem; }
	.platform { padding: 0.6rem 0.5rem; border-radius: 10px; border: 1px solid var(--border-color); background-color: var(--bg-surface); color: var(--text-secondary); cursor: pointer; font: inherit; font-size: 0.85rem; min-height: 44px; }
	.platform:hover { border-color: var(--accent); color: var(--text); }

	.about-card {
		background: var(--bg-surface);
		border: 1px solid var(--border-color);
		border-radius: 12px;
		padding: 1rem 1.1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.about-app { display: flex; align-items: baseline; gap: 0.5rem; }
	.about-name { font-size: 1rem; font-weight: 700; color: var(--text); }
	.about-version {
		font-size: 0.75rem;
		color: var(--text-muted);
		background: var(--bg);
		border: 1px solid var(--border-color);
		border-radius: 10px;
		padding: 0.1rem 0.45rem;
	}
	.about-tag { font-size: 0.875rem; color: var(--text-secondary); margin: 0; line-height: 1.5; }
	.about-built,
	.about-license { font-size: 0.78rem; color: var(--text-muted); margin: 0; line-height: 1.5; }
	.about-links {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		margin-top: 0.5rem;
		font-size: 0.85rem;
	}
	.privacy-link {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		font-size: inherit;
		color: var(--accent);
		text-decoration: underline;
		cursor: pointer;
		text-align: left;
	}
	.privacy-url { font-size: 0.72rem; color: var(--text-muted); margin: 0; word-break: break-all; }

	@media (prefers-reduced-motion: reduce) {
		.chip,
		.soft-btn,
		.platform {
			transition: none;
		}
	}
</style>
