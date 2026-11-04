/**
 * Lightweight procedural WebAudio sound synthesizer for UI micro-interactions.
 * Generates synthetic clicks, pops, switches, and chimes without loading external audio files.
 * Defaults to muted until the user explicitly toggles sound on, respecting user preference and audio policies.
 */

export type SoundEffect = "click" | "pop" | "shutter" | "switch" | "chime" | "paper";

const STORAGE_KEY = "dhruvkoshta-sound-enabled";

class SoundManager {
	private audioCtx: AudioContext | null = null;
	private enabled = false;

	constructor() {
		if (typeof window !== "undefined") {
			try {
				const saved = localStorage.getItem(STORAGE_KEY);
				// Default to false (opt-in) unless user previously enabled it
				this.enabled = saved === "true";
			} catch {
				this.enabled = false;
			}
		}
	}

	public isEnabled(): boolean {
		return this.enabled;
	}

	public setEnabled(enable: boolean): void {
		this.enabled = enable;
		if (typeof window !== "undefined") {
			try {
				localStorage.setItem(STORAGE_KEY, String(enable));
			} catch {
				// ignore storage errors
			}
		}
		if (enable) {
			this.initContext();
			this.play("pop");
		}
	}

	public toggle(): boolean {
		this.setEnabled(!this.enabled);
		return this.enabled;
	}

	private initContext(): AudioContext | null {
		if (typeof window === "undefined") return null;
		if (!this.audioCtx) {
			const AudioContextClass =
				window.AudioContext ||
				(window as unknown as { webkitAudioContext: typeof AudioContext })
					.webkitAudioContext;
			if (AudioContextClass) {
				try {
					this.audioCtx = new AudioContextClass();
				} catch {
					return null;
				}
			}
		}
		if (this.audioCtx && this.audioCtx.state === "suspended") {
			this.audioCtx.resume().catch(() => {});
		}
		return this.audioCtx;
	}

	public playAccordion(opening: boolean): void {
		if (typeof window === "undefined") return;
		try {
			const ctx = this.initContext();
			if (!ctx) return;
			const now = ctx.currentTime;
			if (opening) {
				// Crisp tactile open click: rising pitch micro-pulse
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "sine";
				osc.frequency.setValueAtTime(440, now);
				osc.frequency.exponentialRampToValueAtTime(760, now + 0.035);
				gain.gain.setValueAtTime(0.09, now);
				gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(now);
				osc.stop(now + 0.04);
			} else {
				// Crisp tactile close snap: falling pitch micro-pulse
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "sine";
				osc.frequency.setValueAtTime(640, now);
				osc.frequency.exponentialRampToValueAtTime(320, now + 0.03);
				gain.gain.setValueAtTime(0.08, now);
				gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(now);
				osc.stop(now + 0.035);
			}
		} catch {
			// Fail silently if audio is restricted
		}
	}

	public play(effect: SoundEffect): void {
		if (!this.enabled || typeof window === "undefined") return;

		try {
			const ctx = this.initContext();
			if (!ctx) return;

			const now = ctx.currentTime;

			switch (effect) {
				case "click": {
					// Crisp mechanical click
					const osc = ctx.createOscillator();
					const gain = ctx.createGain();
					osc.type = "sine";
					osc.frequency.setValueAtTime(800, now);
					osc.frequency.exponentialRampToValueAtTime(180, now + 0.035);

					gain.gain.setValueAtTime(0.08, now);
					gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

					osc.connect(gain);
					gain.connect(ctx.destination);
					osc.start(now);
					osc.stop(now + 0.04);
					break;
				}

				case "pop": {
					// Warm rounded pop
					const osc = ctx.createOscillator();
					const gain = ctx.createGain();
					osc.type = "sine";
					osc.frequency.setValueAtTime(450, now);
					osc.frequency.exponentialRampToValueAtTime(110, now + 0.06);

					gain.gain.setValueAtTime(0.12, now);
					gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

					osc.connect(gain);
					gain.connect(ctx.destination);
					osc.start(now);
					osc.stop(now + 0.065);
					break;
				}

				case "shutter": {
					// Dual-click camera shutter
					const osc1 = ctx.createOscillator();
					const gain1 = ctx.createGain();
					osc1.type = "triangle";
					osc1.frequency.setValueAtTime(1200, now);
					gain1.gain.setValueAtTime(0.06, now);
					gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
					osc1.connect(gain1);
					gain1.connect(ctx.destination);
					osc1.start(now);
					osc1.stop(now + 0.025);

					const osc2 = ctx.createOscillator();
					const gain2 = ctx.createGain();
					osc2.type = "triangle";
					osc2.frequency.setValueAtTime(850, now + 0.04);
					gain2.gain.setValueAtTime(0.06, now + 0.04);
					gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
					osc2.connect(gain2);
					gain2.connect(ctx.destination);
					osc2.start(now + 0.04);
					osc2.stop(now + 0.075);
					break;
				}

				case "switch": {
					// Soft switch toggle
					const osc = ctx.createOscillator();
					const gain = ctx.createGain();
					osc.type = "sine";
					osc.frequency.setValueAtTime(320, now);
					osc.frequency.exponentialRampToValueAtTime(640, now + 0.05);

					gain.gain.setValueAtTime(0.07, now);
					gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

					osc.connect(gain);
					gain.connect(ctx.destination);
					osc.start(now);
					osc.stop(now + 0.055);
					break;
				}

				case "chime": {
					// Pleasant two-tone chime for completion/print
					const chord = [523.25, 659.25, 783.99]; // C5, E5, G5
					chord.forEach((freq, i) => {
						const osc = ctx.createOscillator();
						const gain = ctx.createGain();
						const start = now + i * 0.05;
						osc.type = "sine";
						osc.frequency.setValueAtTime(freq, start);

						gain.gain.setValueAtTime(0.05, start);
						gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

						osc.connect(gain);
						gain.connect(ctx.destination);
						osc.start(start);
						osc.stop(start + 0.26);
					});
					break;
				}

				case "paper": {
					// White noise sweep for receipt tearing/printing
					const bufferSize = ctx.sampleRate * 0.08;
					const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
					const data = buffer.getChannelData(0);
					for (let i = 0; i < bufferSize; i++) {
						data[i] = Math.random() * 2 - 1;
					}

					const noise = ctx.createBufferSource();
					noise.buffer = buffer;

					const filter = ctx.createBiquadFilter();
					filter.type = "bandpass";
					filter.frequency.setValueAtTime(1500, now);

					const gain = ctx.createGain();
					gain.gain.setValueAtTime(0.04, now);
					gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

					noise.connect(filter);
					filter.connect(gain);
					gain.connect(ctx.destination);
					noise.start(now);
					noise.stop(now + 0.08);
					break;
				}
			}
		} catch {
			// Fail silently if audio is restricted
		}
	}
}

export const sound = new SoundManager();
