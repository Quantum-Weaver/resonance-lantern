<script lang="ts">
	// The ComfortBar — inherited from Resonance Echoes (the parent codebase),
	// retuned as the Lantern's voice: warmth at every threshold. It greets,
	// offers one of the CanvasGuide voice lines, and keeps Trace one tap away.
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { uiStore } from '$lib/stores/ui.svelte';
	import { lanternStore } from '$lib/stores/lantern.svelte';
	import { pickTip, pickWelcome } from '$lib/data/lantern';

	let expanded = $state(false);
	let previousPath = $state(page.url.pathname);
	let vesselName = $state('there');
	let line = $state('');

	$effect(() => {
		const currentPath = page.url.pathname;
		if (currentPath !== previousPath && expanded) {
			expanded = false;
		}
		previousPath = currentPath;
	});

	$effect(() => {
		uiStore.setComfortBarExpanded(expanded);
	});

	function getGreeting(): string {
		const hour = new Date().getHours();
		if (hour < 12) return 'Good morning';
		if (hour < 17) return 'Good afternoon';
		return 'Good evening';
	}

	const greeting = $derived(`${getGreeting()}, ${vesselName}`);

	const statsLine = $derived.by(() => {
		const n = lanternStore.totalSessions;
		if (n === 0) return line || 'Your artistic journey begins with a single trace';
		return line || `${n} practice ${n === 1 ? 'session' : 'sessions'} in your journal.`;
	});

	onMount(() => {
		vesselName = localStorage.getItem('resonance-lantern-vessel-name') ?? 'there';
		line = Math.random() < 0.5 ? pickTip() : pickWelcome();
	});

	function toggleExpanded() {
		expanded = !expanded;
	}
</script>

<div class="comfort-bar" class:expanded>
	{#if expanded}
		<div class="comfort-bar__expanded">
			<button class="comfort-bar__collapse" onclick={toggleExpanded} aria-label="Collapse">⌄</button>
			<div class="comfort-bar__greeting">{greeting}</div>
			<div class="comfort-bar__stats">{statsLine}</div>
			<div class="comfort-bar__actions">
				<button class="cb-action primary" onclick={() => goto('/trace')}>Start tracing</button>
				<button class="cb-action" onclick={() => goto('/practice')}>Practice</button>
				<button class="cb-action" onclick={() => goto('/settings')}>Settings</button>
			</div>
		</div>
	{:else}
		<div class="comfort-bar__minimized">
			<button class="comfort-bar__greeting-btn" onclick={toggleExpanded}>
				{greeting}
			</button>
			<button class="comfort-bar__trace" onclick={() => goto('/trace')} aria-label="Start tracing">
				✎ trace
			</button>
		</div>
	{/if}
</div>

<style>
	.comfort-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 110;
		background-color: var(--bg-surface);
		border-top: 1px solid var(--border-color);
		padding-bottom: env(safe-area-inset-bottom, 0px);
		transition: background-color 0.2s ease;
		transform: translateZ(0);
	}

	.comfort-bar__minimized {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 48px;
		padding: 0 1rem;
		gap: 0.75rem;
	}

	.comfort-bar__greeting-btn {
		background: none;
		border: none;
		color: var(--text-secondary);
		font-size: 0.9rem;
		cursor: pointer;
		padding: 0;
		text-align: left;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.comfort-bar__greeting-btn:hover {
		color: var(--text);
	}

	.comfort-bar__trace {
		padding: 0.45rem 0.9rem;
		border-radius: 999px;
		border: 1px solid var(--border-color);
		background-color: var(--accent);
		color: #fff;
		font-size: 0.85rem;
		cursor: pointer;
		flex-shrink: 0;
		min-height: 36px;
	}

	.comfort-bar__expanded {
		padding: 0.75rem 1rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		position: relative;
	}

	.comfort-bar__collapse {
		position: absolute;
		top: 0.25rem;
		right: 0.75rem;
		background: none;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		font-size: 1.2rem;
		padding: 0.25rem 0.5rem;
		line-height: 1;
	}

	.comfort-bar__greeting {
		font-size: 1rem;
		color: var(--text);
		font-weight: 500;
		padding-right: 2rem;
	}

	.comfort-bar__stats {
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.comfort-bar__actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.cb-action {
		padding: 0.45rem 0.85rem;
		border-radius: 8px;
		background-color: var(--bg);
		border: 1px solid var(--border-color);
		color: var(--text-secondary);
		font-size: 0.85rem;
		cursor: pointer;
		transition: background-color 0.15s ease, color 0.15s ease;
	}

	.cb-action:hover {
		background-color: var(--border-color);
		color: var(--text);
	}

	.cb-action.primary {
		background-color: var(--accent);
		border-color: var(--accent);
		color: #fff;
	}

	.cb-action.primary:hover {
		opacity: 0.9;
	}

	@media (prefers-reduced-motion: reduce) {
		.comfort-bar {
			transition: none;
		}
	}
</style>
