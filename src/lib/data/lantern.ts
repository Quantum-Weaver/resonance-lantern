// The Lantern's shared language — the voice, the palette, the outlines.
// The voice lines are TJ Darling's (@TJDPoetry) ORIGINALS, preserved verbatim
// from CanvasGuide (2025) per the concepts analysis: "the credit line stays
// exactly as the concepts doc wrote it." Do not rewrite her words.

// ——— The vow (appears in onboarding verbatim — the app's resonance atom) ———
export const THE_VOW = 'Tracing is learning, not cheating.';
export const THE_TAGLINE = 'A steady light for a learning hand.';

// ——— Her encouragement voice (CanvasGuide originals, verbatim) ———
export const ENCOURAGEMENTS: string[] = [
	"You're doing amazing! Every artist has their own pace.",
	'Look at you go! Your dedication is inspiring.',
	"That's coming along beautifully! Don't be afraid to experiment.",
	'Wonderful progress! Remember to take breaks when needed.',
	'Your unique style is shining through! Keep trusting your instincts.',
	'What a creative approach! Your perspective is valuable.',
	"You've got this! Every masterpiece starts with a simple line.",
	'So proud of your commitment to growing your skills!',
	"That's some beautiful work! Your art matters.",
	'Incredible focus! Your dedication will take you far.',
	'Every stroke tells a story - yours is worth telling!',
	'Your creativity is a beacon of light in this world.',
	'The canvas awaits your unique perspective!',
	'Art is the poetry of the soul - let yours sing!',
	"You're not just drawing - you're creating magic!",
	'Your artistic journey is valid and beautiful!',
	'The world needs more of your creative energy!',
	"Every artist was first an amateur - you're growing!",
	'Your voice matters - let it flow through your art!',
	"Creativity takes courage - and you're so brave!",
	'Mistakes are just unexpected creative opportunities',
	'Growth happens one brave line at a time',
	'There are no wrong colors, only unexplored combinations',
	'The most beautiful art comes from authentic expression',
];

export const SAVE_MESSAGES: string[] = [
	'Drawing saved! Another step in your artistic journey.',
	'Progress preserved! Your future self will thank you.',
	'Session saved! Each practice builds your skills.',
	'Artwork stored! Your creativity is being documented.',
	'Masterpiece saved! Keep building your portfolio.',
];

export const ART_TIPS: string[] = [
	'Try adjusting opacity to match your comfort level!',
	'Zoom in for details, zoom out for composition!',
	'Remember to breathe - art is a meditation!',
	"Don't worry about perfection - focus on expression!",
	'Every masterpiece started with a single line!',
	'Your unique style is your superpower!',
	'Art is about the journey, not just the destination!',
	'Breathe deeply and let your hand flow naturally',
	'Remember: tracing is learning, not cheating',
	'Every artist was once a beginner brave enough to start',
	'Your unique style is emerging with each practice session',
];

export const WELCOMES: string[] = [
	'This space celebrates ALL artists exactly as they are!',
	'Your identity is beautiful and your art is valid!',
	'Art has no gender, no borders, no limits - just like you!',
	'You belong here exactly as you are!',
	'Your perspective makes the art world richer!',
	'Diversity creates the most beautiful masterpieces!',
	'Welcome to your creative sanctuary',
	'Ready to bring your vision to life?',
	'Your artistic journey begins with a single trace',
	'The canvas awaits your unique expression',
];

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
export const pickEncouragement = () => pick(ENCOURAGEMENTS);
export const pickSaveMessage = () => pick(SAVE_MESSAGES);
export const pickTip = () => pick(ART_TIPS);
export const pickWelcome = () => pick(WELCOMES);

// ——— Her pride palette (CanvasGuide's design system, preserved) ———
export const PRIDE_COLORS = [
	'#E40303', '#FF8C00', '#FFED00', '#008026', '#0000FF', '#800080',
	'#FF79A2', '#78D5E8', '#FFFFFF', '#6E482E', '#000000', '#DA219F',
];

export const PRIDE_GRADIENT =
	'linear-gradient(90deg, #E40303, #FF8C00, #FFED00, #008026, #0000FF, #800080, #FF79A2, #78D5E8, #6E482E, #DA219F)';

// ——— Her platforms (the creator credits surface) ———
export interface PlatformLink { name: string; url: string; }
export const TJD_PLATFORMS: PlatformLink[] = [
	{ name: 'Website', url: 'https://tjdpoetry.com' },
	{ name: 'Instagram', url: 'https://instagram.com/tjdpoetry' },
	{ name: 'TikTok', url: 'https://tiktok.com/@tjdpoetry' },
	{ name: 'Facebook', url: 'https://www.facebook.com/tjdpoetry' },
	{ name: 'Bluesky', url: 'https://bsky.app/profile/tjdpoetry.bsky.social/' },
	{ name: 'Twitter/X', url: 'https://x.com/tjdpoetry' },
	{ name: 'Threads', url: 'https://www.threads.com/@tjdpoetry' },
	{ name: 'Pinterest', url: 'https://www.pinterest.com/tjdpoetryy/' },
	{ name: 'Reddit', url: 'https://www.reddit.com/user/tjdpoetry/' },
	{ name: 'YouTube', url: 'https://youtube.com/@tjdpoetry' },
	{ name: 'Ko-fi', url: 'https://ko-fi.com/tjdarling' },
	{ name: 'PayPal', url: 'https://www.paypal.me/Tjdpoetry' },
	{ name: 'Cash App', url: 'https://cash.app/$jessicalynne10' },
	{ name: 'Venmo', url: 'https://account.venmo.com/u/tjdpoetry' },
	{ name: 'Spring Store', url: 'http://tee.pub/lic/tjdpoetry' },
	{ name: 'Bonfire', url: 'https://www.bonfire.com/store/tjdpoetry/' },
];

// ——— Opacity presets: the confidence dial (opacity is a COMFORT control) ———
export interface OpacityPreset { label: string; value: number; }
export const OPACITY_PRESETS: OpacityPreset[] = [
	{ label: 'first pass', value: 0.3 },
	{ label: 'refining', value: 0.6 },
	{ label: 'checking', value: 0.15 },
];

// ——— Practice outlines: real curves, authored by hand (the ancestor's
//     point-arrays were "geometrically crude — the heart was a hexagon") ———
export interface Outline {
	id: string;
	name: string;
	emoji: string;
	category: 'basics' | 'nature' | 'fun';
	difficulty: 1 | 2 | 3;
	svg: string;
}

const wrap = (inner: string) =>
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

export const OUTLINES: Outline[] = [
	{ id: 'circle', name: 'Circle', emoji: '⭕', category: 'basics', difficulty: 1,
		svg: wrap('<circle cx="100" cy="100" r="70"/>') },
	{ id: 'square', name: 'Soft Square', emoji: '🟪', category: 'basics', difficulty: 1,
		svg: wrap('<rect x="40" y="40" width="120" height="120" rx="14"/>') },
	{ id: 'triangle', name: 'Triangle', emoji: '🔺', category: 'basics', difficulty: 1,
		svg: wrap('<path d="M100 35 L170 160 L30 160 Z"/>') },
	{ id: 'heart', name: 'Heart', emoji: '💜', category: 'fun', difficulty: 2,
		svg: wrap('<path d="M100 165 C60 130 25 105 25 70 C25 45 45 30 65 30 C80 30 93 38 100 50 C107 38 120 30 135 30 C155 30 175 45 175 70 C175 105 140 130 100 165 Z"/>') },
	{ id: 'star', name: 'Star', emoji: '⭐', category: 'fun', difficulty: 2,
		svg: wrap('<path d="M100 25 L118 70 L167 74 L130 106 L141 154 L100 128 L59 154 L70 106 L33 74 L82 70 Z"/>') },
	{ id: 'crescent', name: 'Crescent Moon', emoji: '🌙', category: 'fun', difficulty: 2,
		svg: wrap('<path d="M130 30 A75 75 0 1 0 130 170 A60 60 0 1 1 130 30 Z"/>') },
	{ id: 'leaf', name: 'Leaf', emoji: '🍃', category: 'nature', difficulty: 2,
		svg: wrap('<path d="M100 170 C40 130 40 60 100 25 C160 60 160 130 100 170 Z"/><path d="M100 160 L100 45"/>') },
	{ id: 'tulip', name: 'Tulip', emoji: '🌷', category: 'nature', difficulty: 3,
		svg: wrap('<path d="M70 90 C70 55 80 45 100 30 C120 45 130 55 130 90 C130 115 115 130 100 130 C85 130 70 115 70 90 Z"/><path d="M100 130 L100 175"/><path d="M100 152 C85 142 75 142 64 148"/><path d="M100 158 C115 148 125 148 136 154"/>') },
];

export const outlineDataUri = (o: Outline): string =>
	`data:image/svg+xml;utf8,${encodeURIComponent(o.svg)}`;

export const outlineById = (id: string): Outline | undefined =>
	OUTLINES.find((o) => o.id === id);
