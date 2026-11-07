import { AnimatePresence, motion } from "framer-motion";
import { useRadio } from "~/lib/radio";
import { PauseIcon, PlayIcon, RadioIcon, SpeakerIcon, SpeakerMuteIcon } from "./icons";

type AmbientRadioProps = {
	readonly compact?: boolean;
	readonly className?: string;
};

export function AmbientRadio({ compact = false, className = "" }: AmbientRadioProps) {
	const {
		isPlaying,
		isMuted,
		volume,
		currentTime,
		duration,
		togglePlay,
		toggleMute,
		setVolume,
	} = useRadio();

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVol = Number.parseFloat(e.target.value);
		setVolume(newVol);
	};

	const formatTime = (secs: number) => {
		if (Number.isNaN(secs) || secs < 0) return "0:00";
		const m = Math.floor(secs / 60);
		const s = Math.floor(secs % 60);
		return `${m}:${s < 10 ? "0" : ""}${s}`;
	};

	if (compact) {
		return (
			<div className={`radio-compact ${className}`}>
				<button
					aria-label={isPlaying ? "Radio: Pause stream" : "Radio: Play stream"}
					className={`radio-btn ${isPlaying ? "radio-btn--playing" : ""}`}
					onClick={togglePlay}
					title={
						isPlaying
							? "Pause Broken Free (RnB Instrumental)"
							: "Play Broken Free (RnB Instrumental)"
					}
					type="button"
				>
					<span className="inline-flex items-center justify-center w-[12px] h-[12px]">
						<AnimatePresence initial={false} mode="popLayout">
							<motion.span
								animate={{ opacity: 1, scale: 1 }}
								className="inline-flex items-center justify-center"
								exit={{ opacity: 0, scale: 0.8 }}
								initial={{ opacity: 0, scale: 0.8 }}
								key={isPlaying ? "pause" : "play"}
								transition={{ duration: 0.18, ease: "easeOut" }}
							>
								{isPlaying ? <PauseIcon size={12} /> : <PlayIcon size={12} />}
							</motion.span>
						</AnimatePresence>
					</span>
					<span className="radio-btn__label">Radio</span>
				</button>
			</div>
		);
	}

	return (
		<div
			aria-label="Ambient Radio Player"
			className={`ambient-radio ${isPlaying ? "ambient-radio--playing" : ""} ${className}`}
			role="region"
		>
			<div className="ambient-radio__header">
				<div className="ambient-radio__meta">
					<RadioIcon aria-hidden="true" className="ambient-radio__icon" size={16} />
					<div className="ambient-radio__info">
						<span className="ambient-radio__title">Broken Free — RnB Instrumental</span>
						<span className="ambient-radio__artist">Dhruv&apos;s Focus Soundtrack</span>
					</div>
				</div>

				{/* Animated equalizer bars */}
				<div
					aria-hidden="true"
					className={`ambient-radio__eq ${isPlaying ? "ambient-radio__eq--active" : ""}`}
				>
					<span className="ambient-radio__bar bar-1" />
					<span className="ambient-radio__bar bar-2" />
					<span className="ambient-radio__bar bar-3" />
					<span className="ambient-radio__bar bar-4" />
				</div>
			</div>

			<div className="ambient-radio__controls">
				<button
					aria-label={isPlaying ? "Pause soundtrack" : "Play Radio soundtrack"}
					className="ambient-radio__play-btn"
					onClick={togglePlay}
					type="button"
				>
					<span className="inline-flex items-center justify-center w-[14px] h-[14px]">
						<AnimatePresence initial={false} mode="popLayout">
							<motion.span
								animate={{ opacity: 1, scale: 1 }}
								className="inline-flex items-center justify-center"
								exit={{ opacity: 0, scale: 0.8 }}
								initial={{ opacity: 0, scale: 0.8 }}
								key={isPlaying ? "pause" : "play"}
								transition={{ duration: 0.18, ease: "easeOut" }}
							>
								{isPlaying ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
							</motion.span>
						</AnimatePresence>
					</span>
					<span>{isPlaying ? "Pause" : "Play Radio"}</span>
				</button>

				<div className="ambient-radio__time" aria-live="off">
					<span>{formatTime(currentTime)}</span>
					<span>/</span>
					<span>{duration ? formatTime(duration) : "4:02"}</span>
				</div>

				<div className="ambient-radio__volume-group">
					<button
						aria-label={isMuted ? "Unmute audio" : "Mute audio"}
						className="ambient-radio__mute-btn"
						onClick={toggleMute}
						type="button"
					>
						{isMuted || volume === 0 ? (
							<SpeakerMuteIcon size={14} />
						) : (
							<SpeakerIcon size={14} />
						)}
					</button>
					<label htmlFor="ambient-volume" className="sr-only">
						Radio Volume
					</label>
					<input
						id="ambient-volume"
						aria-valuemax={100}
						aria-valuemin={0}
						aria-valuenow={Math.round(volume * 100)}
						className="ambient-radio__slider"
						max="1"
						min="0"
						onChange={handleVolumeChange}
						step="0.05"
						type="range"
						value={isMuted ? 0 : volume}
					/>
				</div>
			</div>
		</div>
	);
}
