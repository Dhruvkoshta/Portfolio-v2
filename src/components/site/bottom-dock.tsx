import { useEffect, useRef, useState } from "react";
import { sound } from "~/lib/sound";

export function BottomDock() {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [hovered, setHovered] = useState(false);

	useEffect(() => {
		const audio = new Audio("/media/electric.mp3");
		audio.loop = true;
		audio.volume = 0.4;
		audioRef.current = audio;

		const handleEnded = () => setIsPlaying(false);
		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.pause();
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

	const restartTrack = () => {
		const audio = audioRef.current;
		if (!audio) return;
		sound.play("click");
		audio.currentTime = 0;
		if (!isPlaying) {
			audio
				.play()
				.then(() => setIsPlaying(true))
				.catch(() => setIsPlaying(false));
		}
	};

	return (
		<aside aria-label="Audio dock" className="ed3-bottom-dock">
			<div className="ed3-bottom-dock__lift ed3-bottom-dock__lift--shown">
				<nav aria-label="Player" className="ed3-dock">
					<div className="ed3__appbar-glass-shell">
						<div className="ed3__appbar-nav ed3-glass">
							<span
								aria-label="Radio"
								className="ed3-bottom-dock__radio"
								role="group"
							>
								{/* Restart / previous track button */}
								<button
									aria-label="Restart track"
									className="ed3-bottom-dock__btn ed3-bottom-dock__btn--icon"
									onClick={restartTrack}
									title="Restart stream"
									type="button"
								>
									<span
										aria-hidden="true"
										className="ed3-bottom-dock__glyph ed3-bottom-dock__glyph--prev"
									>
										◄
									</span>
								</button>

								{/* Main Radio Play/Pause button */}
								<button
									aria-label={
										isPlaying ? "Pause ambient radio" : "Play ambient radio"
									}
									aria-pressed={isPlaying}
									className={`ed3-bottom-dock__btn ed3-bottom-dock__btn--main ${
										isPlaying ? "ed3-bottom-dock__btn--playing" : ""
									}`}
									onClick={togglePlay}
									onMouseEnter={() => setHovered(true)}
									onMouseLeave={() => setHovered(false)}
									title={
										isPlaying
											? "Pause Electric (Lofi Focus)"
											: "Play Electric (Lofi Focus)"
									}
									type="button"
								>
									<span className="ed3-bottom-dock__label">
										{isPlaying && hovered ? "Pause" : "Radio"}
									</span>
									{isPlaying ? (
										<span
											aria-hidden="true"
											className="ed3-bottom-dock__bars"
										>
											<span className="ed3-bottom-dock__bar" />
											<span className="ed3-bottom-dock__bar" />
											<span className="ed3-bottom-dock__bar" />
										</span>
									) : (
										<span
											aria-hidden="true"
											className="ed3-bottom-dock__glyph ed3-bottom-dock__glyph--play"
										>
											►
										</span>
									)}
								</button>
							</span>
						</div>
					</div>
				</nav>
			</div>
		</aside>
	);
}
