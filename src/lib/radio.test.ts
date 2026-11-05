import { beforeEach, describe, expect, it, vi } from "vitest";
import { radio } from "./radio";

describe("RadioManager", () => {
	beforeEach(() => {
		radio.pause();
	});

	it("returns initial state with default volume and not playing", () => {
		const state = radio.getState();
		expect(state.isPlaying).toBe(false);
		expect(state.volume).toBe(0.4);
		expect(state.currentTime).toBe(0);
	});

	it("updates muted and volume state properly", () => {
		radio.setVolume(0.8);
		expect(radio.getState().volume).toBe(0.8);

		radio.toggleMute();
		expect(radio.getState().isMuted).toBe(true);

		radio.toggleMute();
		expect(radio.getState().isMuted).toBe(false);
	});

	it("clamps volume between 0 and 1", () => {
		radio.setVolume(1.5);
		expect(radio.getState().volume).toBe(1);

		radio.setVolume(-0.2);
		expect(radio.getState().volume).toBe(0);
	});

	it("allows subscribing to state changes", () => {
		const listener = vi.fn();
		const unsubscribe = radio.subscribe(listener);

		radio.setVolume(0.5);
		expect(listener).toHaveBeenCalled();

		unsubscribe();
		listener.mockClear();
		radio.setVolume(0.6);
		expect(listener).not.toHaveBeenCalled();
	});
});
