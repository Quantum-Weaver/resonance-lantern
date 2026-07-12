<script lang="ts">
	// The lit doorway — three gentle steps, every one skippable.
	// The vow appears verbatim: it is the app's resonance atom (concepts §4.1).
	import { goto } from '$app/navigation';
	import { themeStore } from '$lib/stores/theme.svelte';
	import { PRESET_THEMES } from '$lib/theme/theme';
	import { THE_VOW, THE_TAGLINE, PRIDE_GRADIENT } from '$lib/data/lantern';

	let step = $state(0);
	let name = $state('');

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

	{#if step === 0}
		<div class="panel">
			<div class="lamp">🏮</div>
			<h1>Resonance Lantern</h1>
			<p class="lead">{THE_TAGLINE}</p>
			<div class="vow">“{THE_VOW}”</div>
			<p class="body">
				Every artist was once a beginner brave enough to start. This lantern
				floats a ghost of any image over your real paper, so your hand can
				learn inside real successes instead of accumulated failures. Turn
				the ghost down as you grow. It was always going to be you drawing.
			</p>
			<button class="soft-btn primary" onclick={() => (step = 1)}>come in</button>
			<button class="skip" onclick={finish}>skip — the door stays open</button>
		</div>
	{:else if step === 1}
		<div class="panel">
			<h1>What shall the Lantern call you?</h1>
			<input
				type="text"
				bind:value={name}
				placeholder="a name, a nickname, anything — or nothing"
				onkeydown={(e) => { if (e.key === 'Enter') step = 2; }}
			/>
			<button class="soft-btn primary" onclick={() => (step = 2)}>onward</button>
			<button class="skip" onclick={() => (step = 2)}>rather not say — that's fine</button>
		</div>
	{:else}
		<div class="panel">
			<h1>Choose your light</h1>
			<div class="chip-row">
				{#each Object.entries(PRESET_THEMES) as [key, preset]}
					<button
						class="chip"
						class:active={themeStore.config.presetName === preset.presetName}
						onclick={() => themeStore.setPreset(key)}
					>{preset.presetName}</button>
				{/each}
			</div>
			<p class="body small">Pride is the Lantern's own light — the palette is the message. All of these can change any time.</p>
			<button class="soft-btn primary" onclick={finish}>light the lantern</button>
		</div>
	{/if}
</div>

<style>
	.door {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
		position: relative;
	}

	.pride-band {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 6px;
	}

	.panel {
		max-width: 460px;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		text-align: center;
		align-items: center;
	}

	.lamp { font-size: 2.6rem; }

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

	.chip-row { display: flex; gap: 0.4rem; flex-wrap: wrap; justify-content: center; }
	.chip { padding: 0.45rem 0.9rem; border-radius: 999px; border: 1px solid var(--border-color); background: none; color: var(--text-secondary); cursor: pointer; min-height: 40px; }
	.chip.active { border-color: var(--accent); color: var(--text); background-color: color-mix(in srgb, var(--accent) 15%, var(--bg-surface)); }

	.soft-btn { padding: 0.6rem 1.2rem; border-radius: 999px; border: 1px solid var(--border-color); background: none; color: var(--text-secondary); cursor: pointer; font-size: 0.95rem; min-height: 48px; }
	.soft-btn.primary { background-color: var(--accent); border-color: var(--accent); color: #fff; }

	.skip { background: none; border: none; color: var(--text-muted); font-size: 0.85rem; cursor: pointer; text-decoration: underline; }
	.skip:hover { color: var(--text-secondary); }
</style>
