import { useSyncExternalStore } from "react";
import { sound } from "~/lib/sound";

export type RadioState = {
	readonly isPlaying: boolean;
	readonly isMuted: boolean;
	readonly volume: number;
	readonly currentTime: number;
	readonly duration: number;
};

const DEFAULT_STATE: RadioState = {
	isPlaying: false,
	isMuted: false,
	volume: 0.4,
	currentTime: 0,
	duration: 0,
};

class RadioManager {
	private audio: HTMLAudioElement | null = null;
	private state: RadioState = DEFAULT_STATE;
	private listeners = new Set<() => void>();

	constructor() {
		if (typeof window !== "undefined") {
			this.init();
		}
	}

	private init() {
		if (this.audio) return;
		try {
			const audio = new Audio("/media/broken-free.mp3");
			audio.loop = true;
			audio.volume = 0.4;
			this.audio = audio;

			audio.addEventListener("timeupdate", () => {
				this.updateState({ currentTime: audio.currentTime });
			});

			audio.addEventListener("loadedmetadata", () => {
				this.updateState({ duration: audio.duration || 0 });
			});

			audio.addEventListener("play", () => {
				this.updateState({ isPlaying: true });
			});

			audio.addEventListener("pause", () => {
				this.updateState({ isPlaying: false });
			});

			audio.addEventListener("ended", () => {
				this.updateState({ isPlaying: false });
			});

			audio.addEventListener("volumechange", () => {
				this.updateState({
					volume: audio.volume,
					isMuted: audio.muted,
				});
			});
		} catch {
			// Ignore audio init errors in unsupported environments
		}
	}

	private updateState(partial: Partial<RadioState>) {
		this.state = { ...this.state, ...partial };
		for (const listener of this.listeners) {
			listener();
		}
	}

	public getState(): RadioState {
		return this.state;
	}

	public subscribe(listener: () => void): () => void {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}

	public play() {
		this.init();
		if (!this.audio) return;
		sound.play("click");
		this.audio
			.play()
			.then(() => this.updateState({ isPlaying: true }))
			.catch(() => this.updateState({ isPlaying: false }));
	}

	public pause() {
		if (!this.audio) return;
		sound.play("click");
		this.audio.pause();
		this.updateState({ isPlaying: false });
	}

	public togglePlay() {
		if (this.state.isPlaying) {
			this.pause();
		} else {
			this.play();
		}
	}

	public restart() {
		this.init();
		if (!this.audio) return;
		sound.play("click");
		this.audio.currentTime = 0;
		this.updateState({ currentTime: 0 });
		if (!this.state.isPlaying) {
			this.audio
				.play()
				.then(() => this.updateState({ isPlaying: true }))
				.catch(() => this.updateState({ isPlaying: false }));
		}
	}

	public toggleMute() {
		this.init();
		if (!this.audio) return;
		sound.play("click");
		const nextMute = !this.state.isMuted;
		this.audio.muted = nextMute;
		this.updateState({ isMuted: nextMute });
	}

	public setVolume(vol: number) {
		this.init();
		if (!this.audio) return;
		const clamped = Math.max(0, Math.min(1, vol));
		this.audio.volume = clamped;
		if (clamped > 0 && this.state.isMuted) {
			this.audio.muted = false;
			this.updateState({ isMuted: false, volume: clamped });
		} else {
			this.updateState({ volume: clamped });
		}
	}
}

export const radio = new RadioManager();

export function useRadio() {
	const state = useSyncExternalStore(
		(cb) => radio.subscribe(cb),
		() => radio.getState(),
		() => DEFAULT_STATE,
	);

	return {
		...state,
		play: () => radio.play(),
		pause: () => radio.pause(),
		togglePlay: () => radio.togglePlay(),
		restart: () => radio.restart(),
		toggleMute: () => radio.toggleMute(),
		setVolume: (v: number) => radio.setVolume(v),
	};
}
