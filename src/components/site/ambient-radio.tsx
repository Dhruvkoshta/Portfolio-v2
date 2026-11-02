import { useEffect, useRef, useState } from "react";
import { sound } from "~/lib/sound";
import { PauseIcon, PlayIcon, RadioIcon, SpeakerIcon, SpeakerMuteIcon } from "./icons";

type AmbientRadioProps = {
	readonly compact?: boolean;
	readonly className?: string;
};

export function AmbientRadio({ compact = false, className = "" }: AmbientRadioProps) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [volume, setVolume] = useState(0.4);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		const audio = new Audio("/media/electric.mp3");
		audio.loop = true;
		audio.volume = 0.4;
		audioRef.current = audio;

		const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
		const handleLoadedMetadata = () => setDuration(audio.duration || 0);
		const handleEnded = () => setIsPlaying(false);

		audio.addEventListener("timeupdate", handleTimeUpdate);
		audio.addEventListener("loadedmetadata", handleLoadedMetadata);
		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.pause();
			audio.removeEventListener("timeupdate", handleTimeUpdate);
			audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
			audio.removeEventListener("ended", handleEnded);
			audioRef.current = null;
		};
	}, []);

	const togglePlay = () => {
		const audio = audioRef.current;
		if (!audio) return;

		sound.play("click");

		if (isPlaying) {
			audio.pause();
			setIsPlaying(false);
		} else {
			audio
				.play()
				.then(() => setIsPlaying(true))
				.catch(() => setIsPlaying(false));
		}
	};

	const toggleMute = () => {
		const audio = audioRef.current;
		if (!audio) return;
		sound.play("click");
		const nextMute = !isMuted;
		audio.muted = nextMute;
		setIsMuted(nextMute);
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVol = Number.parseFloat(e.target.value);
		setVolume(newVol);
		if (audioRef.current) {
			audioRef.current.volume = newVol;
			if (newVol > 0 && isMuted) {
				audioRef.current.muted = false;
				setIsMuted(false);
			}
		}
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
					title={isPlaying ? "Pause Electric (Lofi)" : "Play Electric (Lofi)"}
					type="button"
				>
					{isPlaying ? <PauseIcon size={12} /> : <PlayIcon size={12} />}
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
						<span className="ambient-radio__title">Electric — Lofi Stream</span>
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
					{isPlaying ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
					<span>{isPlaying ? "Pause" : "Play Radio"}</span>
				</button>

				<div className="ambient-radio__time" aria-live="off">
					<span>{formatTime(currentTime)}</span>
					<span>/</span>
					<span>{duration ? formatTime(duration) : "0:25"}</span>
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
