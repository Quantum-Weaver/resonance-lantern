<script lang="ts">
	// Practice — invitation, not curriculum. Shapes with real curves, a dice,
	// zero gamification pressure. Every outline feeds straight into Trace.
	import { goto } from '$app/navigation';
	import { OUTLINES, outlineDataUri } from '$lib/data/lantern';

	let category = $state<'all' | 'basics' | 'nature' | 'fun'>('all');

	const shown = $derived(
		category === 'all' ? OUTLINES : OUTLINES.filter((o) => o.category === category)
	);

	function dice() {
		const o = OUTLINES[Math.floor(Math.random() * OUTLINES.length)];
		goto(`/trace?outline=${o.id}`);
	}
</script>

<div class="page">
	<header class="page__head">
		<h1>Practice</h1>
		<p class="sub">Starter shapes with honest curves. No streaks, no scores — just lines to grow on.</p>
	</header>

	<div class="row">
		{#each ['all', 'basics', 'nature', 'fun'] as c}
			<button class="chip" class:active={category === c} onclick={() => (category = c as typeof category)}>{c}</button>
		{/each}
		<button class="chip dice" onclick={dice}>🎲 surprise me</button>
	</div>

	<div class="grid">
		{#each shown as o}
			<button class="outline" onclick={() => goto(`/trace?outline=${o.id}`)}>
				<img src={outlineDataUri(o)} alt={o.name} />
				<span class="outline__name">{o.emoji} {o.name}</span>
				<span class="outline__dots">{'●'.repeat(o.difficulty)}{'○'.repeat(3 - o.difficulty)}</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.page { padding: 1.25rem; max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.1rem; }
	.page__head h1 { font-size: 1.5rem; color: var(--text); margin: 0; }
	.sub { color: var(--text-muted); font-size: 0.9rem; margin: 0.25rem 0 0; }

	.row { display: flex; gap: 0.4rem; flex-wrap: wrap; }
	.chip { padding: 0.45rem 0.9rem; border-radius: 999px; border: 1px solid var(--border-color); background: none; color: var(--text-secondary); cursor: pointer; font-size: 0.88rem; min-height: 40px; text-transform: capitalize; }
	.chip.active { border-color: var(--accent); color: var(--text); background-color: color-mix(in srgb, var(--accent) 15%, var(--bg-surface)); }
	.chip.dice { margin-left: auto; }

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 0.75rem;
	}

	.outline {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		padding: 0.75rem;
		border-radius: 12px;
		border: 1px solid var(--border-color);
		background-color: #f5efe2; /* the outlines live on warm paper */
		cursor: pointer;
	}

	.outline:hover { border-color: var(--accent); }

	.outline img { width: 100%; aspect-ratio: 1; object-fit: contain; }
	.outline__name { color: #33302a; font-size: 0.9rem; font-weight: 500; }
	.outline__dots { color: #8a8272; font-size: 0.7rem; letter-spacing: 0.15em; }
</style>
