<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { themeStore } from '$lib/stores/theme.svelte';
	import { lanternStore } from '$lib/stores/lantern.svelte';
	import { getThemeColors } from '$lib/theme/theme';
	import { onMount } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import ComfortBar from '$lib/components/ComfortBar.svelte';

	let { children } = $props();

	// Hide chrome during onboarding AND while tracing — nothing may obstruct
	// the viewfinder (concepts §4.3: the camera lucida loop is sacred).
	const isOnboarding = $derived(page.url.pathname === '/onboarding');
	const isTracing = $derived(page.url.pathname === '/trace');

	onMount(async () => {
		themeStore.loadTheme();
		await lanternStore.initDB();
		const done = localStorage.getItem('lantern_onboarding_complete');
		if (!done && page.url.pathname !== '/onboarding') {
			goto('/onboarding');
		}
	});

	const config = $derived(themeStore.config);
	const colors = $derived(getThemeColors(config));

	$effect(() => {
		const fs = themeStore.config.fontSize;
		document.documentElement.style.fontSize =
			fs === 'small' ? '14px' : fs === 'large' ? '18px' : '16px';
	});
</script>

<div
	class="app-shell"
	style="
		--bg: {colors.background};
		--accent: {colors.accent};
		--text: {colors.text};
		--text-secondary: {colors.textSecondary};
		--text-muted: {colors.textMuted};
		--bg-surface: {colors.surface};
		--border-color: {colors.border};
	"
>
	{#if !isOnboarding && !isTracing}
		<Sidebar />
	{/if}

	<main class="main-content" class:full-screen={isOnboarding || isTracing}>
		{@render children()}
	</main>

	{#if !isOnboarding && !isTracing}
		<ComfortBar />
	{/if}
</div>

<style>
	.app-shell {
		display: flex;
		height: 100vh;
		max-width: 100vw;
		overflow: hidden;
		background-color: var(--bg);
		color: var(--text);
	}

	.main-content {
		flex: 1;
		min-width: 0;
		max-width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		padding-bottom: calc(48px + env(safe-area-inset-bottom, 0px));
	}

	.main-content.full-screen {
		padding-bottom: 0;
	}
</style>
