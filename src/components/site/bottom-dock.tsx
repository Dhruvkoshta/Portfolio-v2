import { useState } from "react";
import { useRadio } from "~/lib/radio";

export function BottomDock() {
	const { isPlaying, togglePlay, restart } = useRadio();
	const [hovered, setHovered] = useState(false);

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
									onClick={restart}
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
									aria-label={isPlaying ? "Pause Radio" : "Play Radio"}
									aria-pressed={isPlaying}
									className={`ed3-bottom-dock__btn ed3-bottom-dock__btn--main ${
										isPlaying ? "ed3-bottom-dock__btn--playing" : ""
									}`}
									onClick={togglePlay}
									onMouseEnter={() => setHovered(true)}
									onMouseLeave={() => setHovered(false)}
									title={
										isPlaying
											? "Pause Broken Free (RnB Focus)"
											: "Play Broken Free (RnB Focus)"
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
