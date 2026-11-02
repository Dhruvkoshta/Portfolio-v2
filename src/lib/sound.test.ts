import { beforeEach, describe, expect, it } from "vitest";
import { sound } from "./sound";

describe("Sound Engine", () => {
	beforeEach(() => {
		localStorage.clear();
		sound.setEnabled(false);
	});

	it("defaults to muted/disabled", () => {
		expect(sound.isEnabled()).toBe(false);
	});

	it("toggles enabled state and persists in localStorage", () => {
		const newState = sound.toggle();
		expect(newState).toBe(true);
		expect(sound.isEnabled()).toBe(true);
		expect(localStorage.getItem("dhruvkoshta-sound-enabled")).toBe("true");

		sound.toggle();
		expect(sound.isEnabled()).toBe(false);
		expect(localStorage.getItem("dhruvkoshta-sound-enabled")).toBe("false");
	});

	it("does not throw when play is called while muted", () => {
		expect(() => sound.play("click")).not.toThrow();
		expect(() => sound.play("pop")).not.toThrow();
		expect(() => sound.play("chime")).not.toThrow();
	});

	it("does not throw when play is called while enabled even without AudioContext", () => {
		sound.setEnabled(true);
		expect(() => sound.play("click")).not.toThrow();
		expect(() => sound.play("shutter")).not.toThrow();
		expect(() => sound.play("switch")).not.toThrow();
	});
});
