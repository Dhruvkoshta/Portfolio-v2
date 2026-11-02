import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
		return () => {};
	}
	const media = window.matchMedia(query);
	media.addEventListener("change", callback);
	return () => media.removeEventListener("change", callback);
}

function getSnapshot() {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
		return false;
	}
	return window.matchMedia(query).matches;
}

function getServerSnapshot() {
	return false;
}

export function useReducedMotion() {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
