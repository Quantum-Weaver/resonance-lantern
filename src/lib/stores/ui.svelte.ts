// Cross-component UI signals that don't belong to any domain store.
// (Pattern ported from Compass v2 — the template inherits its improvements.)

// True while the ComfortBar's expanded panel is open. The Sidebar watches it
// and closes itself — the vessel opened the panel, they want to see it.
let comfortBarExpanded = $state(false);

// True while the nav drawer stands open. The ☰ lives in the ComfortBar —
// the family's bought lesson: a floating toggle buried Echoes' Settings
// foot for weeks, so the trigger lives in the bar, always. Nothing here
// persists; the drawer is closed at every launch, by the family's design.
let navOpen = $state(false);

export const uiStore = {
	get comfortBarExpanded() { return comfortBarExpanded; },
	setComfortBarExpanded(value: boolean) { comfortBarExpanded = value; },
	get navOpen() { return navOpen; },
	setNavOpen(value: boolean) { navOpen = value; },
	toggleNav() { navOpen = !navOpen; },
};
