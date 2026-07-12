<script lang="ts">
  let { size = 20, color = 'currentColor' }: { size?: number; color?: string } = $props();
</script>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="7.5" cy="7.5" r="4" />
  <rect x="14" y="14" width="7.5" height="7.5" rx="1.5" />
  <path d="M18,3l3.5,7h-7Z" />
</svg>
