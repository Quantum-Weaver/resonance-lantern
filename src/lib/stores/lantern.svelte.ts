import Database from '@tauri-apps/plugin-sql';
import { browser } from '$app/environment';
import type { Session, RefImage } from '$lib/types/types';

// The Lantern store — the practice journal. Same idiom as its parent
// (Resonance Echoes): Svelte 5 runes + tauri-plugin-sql, local-first,
// nothing leaves the device. A journal, never a scoreboard.

let db: Database | null = null;
let sessions = $state<Session[]>([]);
let refs = $state<RefImage[]>([]);
let loading = $state(false);
let dbError = $state<string | null>(null);

function generateId(): string {
	if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
		return crypto.randomUUID();
	}
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

const toSession = (r: Record<string, unknown>): Session => ({
	id: r.id as string,
	startedAt: r.started_at as number,
	durationMin: r.duration_min == null ? null : (r.duration_min as number),
	referenceName: (r.reference_name as string) ?? null,
	outlineId: (r.outline_id as string) ?? null,
	capturePath: (r.capture_path as string) ?? null,
	note: (r.note as string) ?? null,
});

const toRef = (r: Record<string, unknown>): RefImage => ({
	id: r.id as string,
	name: r.name as string,
	path: r.path as string,
	lastUsed: r.last_used as number,
});

async function initDB() {
	if (!browser || db) return;
	try {
		db = await Database.load('sqlite:lantern.db');
		await loadAll();
	} catch (e) {
		dbError = e instanceof Error ? e.message : String(e);
		console.error('[lanternStore] initDB failed:', e);
	}
}

async function loadAll() {
	if (!db) return;
	loading = true;
	try {
		const q = <T>(sql: string) => db!.select<Record<string, unknown>[]>(sql);
		sessions = (await q('SELECT * FROM sessions ORDER BY started_at DESC LIMIT 300')).map(toSession);
		refs = (await q('SELECT * FROM refs ORDER BY last_used DESC LIMIT 12')).map(toRef);
	} catch (e) {
		console.error('[lanternStore] loadAll failed:', e);
	} finally {
		loading = false;
	}
}

// A practice session begins the moment tracing starts.
async function startSession(referenceName: string | null, outlineId: string | null) {
	if (!db) throw new Error('Database not ready — close and reopen the app.');
	const id = generateId();
	await db.execute(
		'INSERT INTO sessions (id, started_at, reference_name, outline_id) VALUES ($1,$2,$3,$4)',
		[id, Date.now(), referenceName, outlineId]
	);
	await loadAll();
	return id;
}

async function endSession(id: string, capturePath?: string | null) {
	if (!db) return;
	const s = sessions.find((x) => x.id === id);
	if (!s) return;
	const mins = Math.max(1, Math.round((Date.now() - s.startedAt) / 60000));
	await db.execute(
		'UPDATE sessions SET duration_min=$1, capture_path=COALESCE($2, capture_path) WHERE id=$3',
		[mins, capturePath ?? null, id]
	);
	await loadAll();
}

// Remember a reference for the recent shelf.
async function touchRef(name: string, path: string) {
	if (!db) return;
	const existing = refs.find((r) => r.path === path);
	if (existing) {
		await db.execute('UPDATE refs SET last_used=$1 WHERE id=$2', [Date.now(), existing.id]);
	} else {
		await db.execute(
			'INSERT INTO refs (id, name, path, last_used) VALUES ($1,$2,$3,$4)',
			[generateId(), name, path, Date.now()]
		);
	}
	await loadAll();
}

// ——— comfort prefs (localStorage, purged with everything else) ———
const PREF_PREFIX = 'resonance-lantern-';
function getPref(key: string, fallback: number): number {
	if (!browser) return fallback;
	const v = localStorage.getItem(PREF_PREFIX + key);
	const n = v == null ? NaN : parseFloat(v);
	return Number.isFinite(n) ? n : fallback;
}
function setPref(key: string, value: number) {
	try { localStorage.setItem(PREF_PREFIX + key, String(value)); } catch {}
}

// ——— sovereignty (license §7 — features, not promises) ———
async function exportAll(): Promise<string> {
	return JSON.stringify(
		{ exported_at: new Date().toISOString(), app: 'resonance-lantern', sessions, refs },
		null, 2
	);
}

async function purgeAll() {
	if (!db) throw new Error('Database not ready — nothing was purged');
	await db.execute('DELETE FROM sessions');
	await db.execute('DELETE FROM refs');
	if (browser) {
		const doomed: string[] = [];
		for (let i = 0; i < localStorage.length; i++) {
			const k = localStorage.key(i);
			if (k?.startsWith(PREF_PREFIX)) doomed.push(k);
		}
		doomed.forEach((k) => localStorage.removeItem(k));
	}
	await loadAll();
}

export const lanternStore = {
	get sessions() { return sessions; },
	get refs() { return refs; },
	get loading() { return loading; },
	get dbError() { return dbError; },

	// Gentle insights — presence of practice, never pressure.
	get totalSessions() { return sessions.length; },
	get totalMinutes() {
		return sessions.reduce((s, x) => s + (x.durationMin ?? 0), 0);
	},
	get thisWeekSessions() {
		const weekAgo = Date.now() - 7 * 86_400_000;
		return sessions.filter((s) => s.startedAt >= weekAgo).length;
	},
	get mostPracticed(): string | null {
		const counts = new Map<string, number>();
		for (const s of sessions) {
			const k = s.outlineId ?? s.referenceName;
			if (k) counts.set(k, (counts.get(k) ?? 0) + 1);
		}
		let best: string | null = null; let n = 0;
		counts.forEach((v, k) => { if (v > n) { n = v; best = k; } });
		return best;
	},

	initDB,
	loadAll,
	startSession,
	endSession,
	touchRef,
	getPref,
	setPref,
	exportAll,
	purgeAll,
};
