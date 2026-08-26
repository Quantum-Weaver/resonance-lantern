<script lang="ts">
	// The lit doorway — three gentle steps, every one skippable.
	// The vow appears verbatim: it is the app's resonance atom (concepts §4.1).
	import { goto } from '$app/navigation';
	import { themeStore } from '$lib/stores/theme.svelte';
	import { PRESET_THEMES } from '$lib/theme/theme';
	import { THE_VOW, THE_TAGLINE, PRIDE_GRADIENT } from '$lib/data/lantern';
	import GradientPulse from '$lib/components/GradientPulse.svelte';

	let step = $state(0);
	let name = $state('');

	/** The swatch a theme card wears — Pride wears its own gradient. */
	function swatchOf(key: string, accent: string): string {
		return key === 'pride' ? PRIDE_GRADIENT : accent;
	}

	function finish() {
		try {
			if (name.trim()) localStorage.setItem('resonance-lantern-vessel-name', name.trim());
			localStorage.setItem('lantern_onboarding_complete', '1');
		} catch {}
		goto('/');
	}
</script>

<div class="door">
	<div class="pride-band" style="background: {PRIDE_GRADIENT};" aria-hidden="true"></div>

	<div class="screen">
		<div class="screen-body">
			{#if step === 0}
				<GradientPulse pulse={true}>
					<div class="lamp">🏮</div>
				</GradientPulse>
				<h1>Resonance Lantern</h1>
				<p class="lead">{THE_TAGLINE}</p>
				<div class="vow">“{THE_VOW}”</div>
				<p class="body">
					Every artist was once a beginner brave enough to start. This lantern
					floats a ghost of any image over your real paper, so your hand can
					learn inside real successes instead of accumulated failures. Turn
					the ghost down as you grow. It was always going to be you drawing.
				</p>
			{:else if step === 1}
				<h1>What shall the Lantern call you?</h1>
				<input
					type="text"
					bind:value={name}
					maxlength="40"
					placeholder="a name, a nickname, anything — or nothing"
					onkeydown={(e) => { if (e.key === 'Enter') step = 2; }}
				/>
			{:else}
				<h1>Choose your light</h1>
				<div class="theme-grid">
					{#each Object.entries(PRESET_THEMES) as [key, preset]}
						<button
							class="theme-card"
							class:active={themeStore.config.presetName === preset.presetName}
							onclick={() => themeStore.setPreset(key)}
						>
							<span class="theme-name">{preset.presetName}</span>
							<span class="theme-swatch" style="background: {swatchOf(key, preset.accentColor)};"></span>
						</button>
					{/each}
				</div>
				<p class="body small">Pride is the Lantern's own light — the palette is the message. All of these can change any time.</p>
			{/if}
		</div>

		<div class="screen-actions">
			{#if step === 0}
				<button class="forward" onclick={() => (step = 1)}>come in</button>
				<button class="skip" onclick={finish}>skip — the door stays open</button>
			{:else if step === 1}
				<button class="forward" onclick={() => (step = 2)}>onward</button>
				<button class="skip" onclick={() => (step = 2)}>rather not say — that's fine</button>
			{:else}
				<button class="forward" onclick={finish}>light the lantern</button>
			{/if}
		</div>

		<div class="dots" role="progressbar" aria-label="onboarding progress" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={3}>
			{#each [0, 1, 2] as i}
				<span class="dot" class:active={i === step} class:past={i < step}></span>
			{/each}
		</div>
	</div>
</div>

<style>
	.door {
		min-height: 100vh;
		min-height: 100dvh;
		position: relative;
	}

	.pride-band {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 6px;
	}

	.screen {
		min-height: 100vh;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem 1.5rem calc(1.25rem + env(safe-area-inset-bottom, 0px));
		box-sizing: border-box;
		text-align: center;
	}

	.screen-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		width: min(460px, 100%);
	}

	.lamp {
		font-size: 2.6rem;
		width: 96px;
		height: 96px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	h1 { color: var(--text); font-size: 1.5rem; margin: 0; }
	.lead { color: var(--text-secondary); font-size: 1rem; margin: 0; }
	.vow { color: var(--text); font-size: 1.1rem; font-style: italic; }
	.body { color: var(--text-secondary); line-height: 1.6; margin: 0; font-size: 0.95rem; }
	.body.small { font-size: 0.85rem; color: var(--text-muted); }

	input[type='text'] {
		width: 100%;
		padding: 0.7rem 0.8rem;
		border-radius: 10px;
		border: 1px solid var(--border-color);
		background-color: var(--bg-surface);
		color: var(--text);
		font-size: 1rem;
		text-align: center;
	}

	.theme-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.6rem;
		width: 100%;
	}
	@media (min-width: 640px) {
		.theme-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	.theme-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 0.5rem;
		border-radius: 12px;
		border: 1px solid var(--border-color);
		background-color: var(--bg-surface);
		color: var(--text-secondary);
		cursor: pointer;
		font: inherit;
		min-height: 64px;
	}
	.theme-card.active {
		border-color: var(--accent);
		color: var(--text);
	}
	.theme-name { font-size: 0.85rem; }
	.theme-swatch {
		width: 100%;
		height: 8px;
		border-radius: 999px;
	}

	.screen-actions {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		width: min(20rem, 100%);
	}
	.forward {
		width: 100%;
		min-height: 48px;
		border: none;
		border-radius: 0.75rem;
		background-color: var(--accent);
		color: #fff;
		font-size: 1rem;
		cursor: pointer;
	}
	.skip {
		background: none;
		border: none;
		color: var(--text-muted);
		font-size: 0.85rem;
		cursor: pointer;
		text-decoration: underline;
		min-height: 44px;
	}
	.skip:hover { color: var(--text-secondary); }

	.dots {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		padding-top: 1.1rem;
	}
	.dot {
		width: 8px;
		height: 8px;
		border-radius: 999px;
		background: var(--border-color);
		transition:
			width 0.25s ease,
			background 0.25s ease;
	}
	.dot.active {
		width: 22px;
		background: var(--accent);
	}
	.dot.past {
		background: color-mix(in srgb, var(--accent) 60%, var(--bg-surface));
	}

	@media (prefers-reduced-motion: reduce) {
		.dot {
			transition: none;
		}
	}
</style>
