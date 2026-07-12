// Theme customization (inherited from Echoes — same grammar, its own light)
export interface ThemeConfig {
  mode: 'dark' | 'light' | 'amoled';
  accentColor: string;
  presetName?: string;
  fontSize: 'small' | 'medium' | 'large';
}

// ——— The Lantern's own types ———

// A practice session — the journal of light, never a scoreboard.
export interface Session {
  id: string;
  startedAt: number;
  durationMin?: number | null;
  referenceName?: string | null;
  outlineId?: string | null;
  capturePath?: string | null;
  note?: string | null;
}

// A remembered reference image (the recent shelf).
export interface RefImage {
  id: string;
  name: string;
  path: string;
  lastUsed: number;
}
