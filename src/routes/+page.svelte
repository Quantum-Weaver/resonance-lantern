<script lang="ts">
	// Home — the lit doorway. The vow, the light, the recent shelf.
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { lanternStore } from '$lib/stores/lantern.svelte';
	import { THE_VOW, THE_TAGLINE, PRIDE_GRADIENT, pickWelcome } from '$lib/data/lantern';

	let welcome = $state('');
	onMount(() => (welcome = pickWelcome()));
</script>

<div class="page">
	<div class="pride-band" style="background: {PRIDE_GRADIENT};" aria-hidden="true"></div>

	<header class="hero">
		<div class="lamp">🏮</div>
		<h1>Resonance Lantern</h1>
		<p class="tagline">{THE_TAGLINE}</p>
		<p class="welcome">{welcome}</p>
	</header>

	<button class="begin" onclick={() => goto('/trace')}>Start your drawing journey</button>

	<div class="card vow">
		<p>“{THE_VOW}”</p>
		<p class="vow-sub">
			Pick a reference. It floats, ghost-light, over your real paper. Trace
			what you see through it — the way artists have used the camera lucida
			for two hundred years. Turn the ghost down as your hand learns.
		</p>
	</div>

	{#if lanternStore.refs.length > 0}
		<section class="section">
			<h2>Recent references</h2>
			<div class="stack">
				{#each lanternStore.refs.slice(0, 5) as r}
					<div class="ref-row">
						<span class="ref-name">{r.name}</span>
						<button class="chip" onclick={() => goto('/trace')}>trace again</button>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<section class="section">
		<h2>How it works</h2>
		<ol class="how">
			<li>Point your camera at your paper (or use paper mode at a desk).</li>
			<li>Choose a reference image — a photo, a file, or a practice shape.</li>
			<li>Set the ghost strength to your comfort. There is no wrong setting.</li>
			<li>Trace. Breathe. Capture your work when you're proud of it.</li>
		</ol>
	</section>
</div>

<style>
	.page { padding: 0 1.25rem 1.25rem; max-width: 640px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.1rem; }

	.pride-band {
		height: 6px;
		border-radius: 0 0 6px 6px;
		margin: 0 -1.25rem;
	}

	.hero { text-align: center; padding-top: 1.25rem; }
	.lamp { font-size: 2.4rem; }
	.hero h1 { color: var(--text); font-size: 1.6rem; margin: 0.25rem 0 0; }
	.tagline { color: var(--text-secondary); margin: 0.35rem 0 0; font-size: 1rem; }
	.welcome { color: var(--text-muted); margin: 0.6rem 0 0; font-size: 0.9rem; }

	.begin {
		min-height: 60px;
		border-radius: 16px;
		border: none;
		background-color: var(--accent);
		color: #fff;
		font-size: 1.05rem;
		cursor: pointer;
	}

	.card { padding: 1rem; border-radius: 12px; background-color: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-secondary); }
	.vow p:first-child { color: var(--text); font-size: 1.05rem; margin: 0; font-style: italic; }
	.vow-sub { margin: 0.6rem 0 0; font-size: 0.9rem; line-height: 1.55; }

	.section h2 { font-size: 0.95rem; color: var(--text-secondary); font-weight: 600; margin: 0 0 0.5rem; }
	.stack { display: flex; flex-direction: column; gap: 0.5rem; }

	.ref-row { display: flex; align-items: center; gap: 0.6rem; padding: 0.5rem 0.75rem; border-radius: 10px; background-color: var(--bg-surface); border: 1px solid var(--border-color); min-height: 48px; }
	.ref-name { color: var(--text); min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

	.chip { margin-left: auto; padding: 0.4rem 0.85rem; border-radius: 999px; border: 1px solid var(--border-color); background: none; color: var(--text-secondary); cursor: pointer; font-size: 0.85rem; min-height: 36px; flex-shrink: 0; }
	.chip:hover { border-color: var(--accent); color: var(--text); }

	.how { color: var(--text-secondary); font-size: 0.92rem; line-height: 1.7; margin: 0; padding-left: 1.2rem; }
</style>
