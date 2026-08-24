<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { uiStore } from '$lib/stores/ui.svelte';
	import Icons from '$lib/components/icons/Icons.svelte';
	import type { IconName } from '$lib/components/icons/Icons.svelte';

	// Default-collapsed on every platform (the family pattern): the content
	// is the destination, the nav is a drawer that disappears entirely —
	// even on desktop. The ☰ lives in the ComfortBar, never floating
	// (Echoes' bought lesson: a floating toggle buried the Settings foot).
	const open = $derived(uiStore.navOpen);

	const navItems: { href: string; icon: IconName; label: string }[] = [
		{ href: '/', icon: 'home', label: 'Home' },
		{ href: '/trace', icon: 'trace', label: 'Trace' },
		{ href: '/projector', icon: 'projector', label: 'Projector' },
		{ href: '/practice', icon: 'practice', label: 'Practice' },
		{ href: '/insights', icon: 'insights', label: 'Insights' },
		{ href: '/settings', icon: 'settings', label: 'Settings' }
	];

	// The vessel opened the ComfortBar panel — they want to see it, not the nav.
	$effect(() => {
		if (uiStore.comfortBarExpanded) uiStore.setNavOpen(false);
	});

	function navigate(href: string) {
		goto(href);
		uiStore.setNavOpen(false);
	}
	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && uiStore.navOpen) uiStore.setNavOpen(false);
	}
</script>

<svelte:window onkeydown={onKey} />

{#if open}
	<button class="backdrop" aria-label="Close navigation" onclick={() => uiStore.setNavOpen(false)}></button>
{/if}

<nav class="sidebar" class:open inert={!open} aria-label="Main navigation">
	<div class="sidebar__header">
		<span class="sidebar__wordmark cosmic-sparkle-text">Lantern</span>
	</div>

	<ul class="sidebar__nav">
		{#each navItems as item}
			<li>
				<button
					class="nav-item"
					class:active={page.url.pathname === item.href}
					onclick={() => navigate(item.href)}
				>
					<span class="nav-icon"><Icons name={item.icon} size={18} /></span>
					<span class="nav-label">{item.label}</span>
				</button>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 49;
		border: none;
		background-color: transparent;
		cursor: default;
	}

	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 20vw;
		min-width: 180px;
		max-width: 280px;
		background-color: var(--bg-surface);
		border-right: 1px solid var(--border-color);
		z-index: 50;
		transform: translateX(-100%);
		transition: transform 0.3s ease;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		padding-bottom: calc(48px + env(safe-area-inset-bottom, 0px));
	}

	.sidebar.open {
		transform: translateX(0);
	}

	.sidebar__header {
		padding: calc(1rem + env(safe-area-inset-top, 0px)) 1.25rem 1rem;
		border-bottom: 1px solid var(--border-color);
	}

	.sidebar__wordmark {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--accent);
		letter-spacing: 0.02em;
	}

	.sidebar__nav {
		list-style: none;
		padding: 0.75rem 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		padding: 0.65rem 0.75rem;
		border-radius: 8px;
		background: none;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		text-align: left;
		font-size: 0.95rem;
		transition: background-color 0.15s ease, color 0.15s ease;
	}

	.nav-item:hover {
		background-color: var(--bg);
		color: var(--text);
	}

	.nav-item.active {
		background-color: var(--accent);
		color: #fff;
	}

	.nav-icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.sidebar {
			transition: none;
		}
	}
</style>
