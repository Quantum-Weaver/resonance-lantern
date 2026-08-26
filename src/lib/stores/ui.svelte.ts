// Cross-component UI signals that don't belong to any domain store.

// True while the ComfortBar's expanded panel is open. The Sidebar watches it
// and closes itself — the vessel opened the panel, they want to see it.
let comfortBarExpanded = $state(false);

// True while the nav drawer stands open. The ☰ lives in the ComfortBar.
// Nothing here persists; the drawer is closed at every launch.
let navOpen = $state(false);

export const uiStore = {
	get comfortBarExpanded() { return comfortBarExpanded; },
	setComfortBarExpanded(value: boolean) { comfortBarExpanded = value; },
	get navOpen() { return navOpen; },
	setNavOpen(value: boolean) { navOpen = value; },
	toggleNav() { navOpen = !navOpen; },
};
