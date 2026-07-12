<script lang="ts">
	// Insights — the practice journal, shown gently. Presence of practice,
	// never pressure. No streak-shaming exists here.
	import { lanternStore } from '$lib/stores/lantern.svelte';
	import { outlineById, pickEncouragement } from '$lib/data/lantern';
	import { onMount } from 'svelte';

	let line = $state('');
	onMount(() => (line = pickEncouragement()));

	const most = $derived.by(() => {
		const m = lanternStore.mostPracticed;
		if (!m) return null;
		return outlineById(m)?.name ?? m;
	});

	function fmtDate(ts: number): string {
		return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
	}
</script>

<div class="page">
	<header class="page__head">
		<h1>Insights</h1>
		<p class="sub">{line}</p>
	</header>

	{#if lanternStore.totalSessions === 0}
		<div class="card empty">
			No sessions yet — and that's a beginning, not a lack.
			Your artistic journey begins with a single trace.
		</div>
	{:else}
		<div class="tiles">
			<div class="tile">
				<span class="tile__n">{lanternStore.totalSessions}</span>
				<span class="tile__label">practice {lanternStore.totalSessions === 1 ? 'session' : 'sessions'}</span>
			</div>
			<div class="tile">
				<span class="tile__n">{lanternStore.totalMinutes}</span>
				<span class="tile__label">minutes with pencil in hand</span>
			</div>
			<div class="tile">
				<span class="tile__n">{lanternStore.thisWeekSessions}</span>
				<span class="tile__label">this week</span>
			</div>
			{#if most}
				<div class="tile">
					<span class="tile__n small">{most}</span>
					<span class="tile__label">most practiced</span>
				</div>
			{/if}
		</div>

		<section class="section">
			<h2>The journal</h2>
			<div class="stack">
				{#each lanternStore.sessions.slice(0, 20) as s}
					<div class="session">
						<span class="session__date">{fmtDate(s.startedAt)}</span>
						<span class="session__what">
							{s.outlineId ? (outlineById(s.outlineId)?.name ?? s.outlineId) : (s.referenceName ?? 'free tracing')}
						</span>
						{#if s.durationMin}<span class="session__mins">{s.durationMin} min</span>{/if}
						{#if s.capturePath}<span class="session__cap">📸</span>{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}
</div>

<style>
	.page { padding: 1.25rem; max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.1rem; }
	.page__head h1 { font-size: 1.5rem; color: var(--text); margin: 0; }
	.sub { color: var(--text-muted); font-size: 0.9rem; margin: 0.25rem 0 0; }

	.card { padding: 1rem; border-radius: 12px; background-color: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-secondary); }
	.card.empty { text-align: center; padding: 2rem 1rem; line-height: 1.6; }

	.tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.6rem; }
	.tile { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; padding: 0.9rem 0.5rem; border-radius: 12px; background-color: var(--bg-surface); border: 1px solid var(--border-color); }
	.tile__n { color: var(--text); font-size: 1.5rem; font-weight: 600; }
	.tile__n.small { font-size: 1rem; text-align: center; }
	.tile__label { color: var(--text-muted); font-size: 0.75rem; text-align: center; }

	.section h2 { font-size: 0.95rem; color: var(--text-secondary); font-weight: 600; margin: 0 0 0.5rem; }
	.stack { display: flex; flex-direction: column; gap: 0.4rem; }
	.session { display: flex; align-items: center; gap: 0.6rem; padding: 0.5rem 0.75rem; border-radius: 10px; background-color: var(--bg-surface); border: 1px solid var(--border-color); min-height: 44px; }
	.session__date { color: var(--text-muted); font-size: 0.8rem; flex-shrink: 0; width: 4rem; }
	.session__what { color: var(--text); min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.session__mins { margin-left: auto; color: var(--text-muted); font-size: 0.8rem; flex-shrink: 0; }
	.session__cap { flex-shrink: 0; }
</style>
