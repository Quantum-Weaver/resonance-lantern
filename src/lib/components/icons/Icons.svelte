<script lang="ts">
  import IconHome from './IconHome.svelte';
  import IconInsights from './IconInsights.svelte';
  import IconSettings from './IconSettings.svelte';
  import IconTrace from './IconTrace.svelte';
  import IconPractice from './IconPractice.svelte';
  import IconProjector from './IconProjector.svelte';

  export type IconName = 'home' | 'insights' | 'settings' | 'trace' | 'practice' | 'projector';

  let {
    name,
    size = 20,
    color = 'currentColor',
  }: {
    name: IconName;
    size?: number;
    color?: string;
  } = $props();

  const components: Record<IconName, any> = {
    'home': IconHome,
    'insights': IconInsights,
    'settings': IconSettings,
    'trace': IconTrace,
    'practice': IconPractice,
    'projector': IconProjector,
  };

  const Component = $derived(components[name]);
</script>

{#if Component}
  <Component {size} {color} />
{/if}
