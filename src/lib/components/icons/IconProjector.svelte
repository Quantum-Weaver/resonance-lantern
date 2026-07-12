<script lang="ts">
  let { size = 20, color = 'currentColor' }: { size?: number; color?: string } = $props();
</script>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="2" y="8" width="20" height="9" rx="2" />
  <circle cx="8.5" cy="12.5" r="2.5" />
  <path d="M17 12.5h.01" />
  <path d="M6.5 17v2" />
  <path d="M17.5 17v2" />
  <path d="M10 5l2-2 2 2" />
</svg>
