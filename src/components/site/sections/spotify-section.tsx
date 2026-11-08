import { useState } from "react";
import { SpotifyIcon } from "../icons";
import { AmbientRadio } from "../ambient-radio";
import { sound } from "~/lib/sound";
import { playlists } from "~/data/content";

export function SpotifySection() {
	const [activeTab, setActiveTab] = useState<"playlists" | "control">("playlists");
	const spotifyPlaylistUrl = "https://open.spotify.com/playlist/7IbpZshuCcooJoDMvOs9Yp";

	const leftSpines = [
		{ title: "matt's coffee shop", bg: "#b45309", color: "#fff", width: 28 },
		{ title: "privilege of pressure", bg: "#1e3a8a", color: "#e0e7ff", width: 34 },
		{ title: "demanding excellence", bg: "#991b1b", color: "#fee2e2", width: 30 },
	];

	const rightSpines = [
		{ title: "the web", bg: "#065f46", color: "#d1fae5", width: 26 },
		{ title: "playing ping-pong with your boomer", bg: "#7c2d12", color: "#ffedd5", width: 32 },
		{ title: "v", bg: "#374151", color: "#f3f4f6", width: 22 },
		{ title: "as we fall.", bg: "#581c87", color: "#f3e8ff", width: 28 },
		{ title: "university is fun!", bg: "#831843", color: "#fce7f3", width: 30 },
		{ title: "nebulosity", bg: "#1e293b", color: "#e2e8f0", width: 26 },
		{ title: "run, boy, run", bg: "#b45309", color: "#fef3c7", width: 32 },
		{ title: "proj. academia", bg: "#14532d", color: "#dcfce7", width: 28 },
		{ title: "expeditionary", bg: "#701a75", color: "#fae8ff", width: 34 },
		{ title: "AGAIN!?", bg: "#9f1239", color: "#ffe4e6", width: 24 },
		{ title: "slowly.", bg: "#334155", color: "#f1f5f9", width: 26 },
	];

	const handleTabChange = (tab: "playlists" | "control") => {
		sound.playAccordion(true);
		setActiveTab(tab);
	};

	return (
		<div className="spotify-shelf-wrapper">
			{/* Header Tab Bar matching reference */}
			<div className="spotify-head-controls">
				<div aria-label="Spotify views" className="ed3__section-tabs" role="tablist">
					<button
						aria-selected={activeTab === "playlists"}
						className={`ed3__section-tabs__tab ${
							activeTab === "playlists" ? "ed3__section-tabs__tab--active" : ""
						}`}
						onClick={() => handleTabChange("playlists")}
						role="tab"
						type="button"
					>
						Playlists
					</button>
					<span aria-hidden="true" className="ed3__section-tabs__slash">
						/
					</span>
					<button
						aria-selected={activeTab === "control"}
						className={`ed3__section-tabs__tab ${
							activeTab === "control" ? "ed3__section-tabs__tab--active" : ""
						}`}
						onClick={() => handleTabChange("control")}
						role="tab"
						type="button"
					>
						Control my Music
					</button>
				</div>
			</div>

			{activeTab === "playlists" ? (
				<div className="spotify-shelf-stage">
					{/* Bookshelf Container */}
					<div className="bookshelf-scene">
						{/* Items row resting on shelf */}
						<div className="bookshelf-content">
							{/* Left Book Spines */}
							<div className="book-cluster book-cluster--left">
								{leftSpines.map((book) => (
									<a
										aria-label={book.title}
										className="book-spine"
										href={spotifyPlaylistUrl}
										key={book.title}
										rel="noreferrer"
										style={{
											backgroundColor: book.bg,
											color: book.color,
											width: `${book.width}px`,
										}}
										target="_blank"
									>
										<span className="book-spine__text">{book.title}</span>
									</a>
								))}
							</div>

							{/* Centerpiece Vinyl & Sleeve */}
							<a
								className="vinyl-sleeve-unit"
								href={spotifyPlaylistUrl}
								rel="noreferrer"
								target="_blank"
							>
								{/* Realistic Sliding Vinyl Record */}
								<div aria-hidden="true" className="vinyl-disc">
									{/* Outer Grooves */}
									<div className="vinyl-groove vinyl-groove--1" />
									<div className="vinyl-groove vinyl-groove--2" />
									<div className="vinyl-groove vinyl-groove--3" />
									{/* Center Label */}
									<div className="vinyl-label">
										<div className="vinyl-label__ring">
											<span className="vinyl-label__text">✦ countryish (74 tracks) ✦</span>
										</div>
										<div className="vinyl-center-hole" />
									</div>
								</div>

								{/* Album Sleeve Cover (4 Quadrants) */}
								<div className="album-sleeve">
									<div className="album-sleeve__grid">
										<div className="album-sleeve__cell album-sleeve__cell--1" />
										<div className="album-sleeve__cell album-sleeve__cell--2" />
										<div className="album-sleeve__cell album-sleeve__cell--3" />
										<div className="album-sleeve__cell album-sleeve__cell--4" />
									</div>
									<div className="album-sleeve__overlay">
										<span className="album-sleeve__tag">Dhruv&apos;s Focus & Flow</span>
										<SpotifyIcon className="album-sleeve__icon" size={20} />
									</div>
								</div>
							</a>

							{/* Right Book Spines */}
							<div className="book-cluster book-cluster--right">
								{rightSpines.map((book) => (
									<a
										aria-label={book.title}
										className="book-spine"
										href={spotifyPlaylistUrl}
										key={book.title}
										rel="noreferrer"
										style={{
											backgroundColor: book.bg,
											color: book.color,
											width: `${book.width}px`,
										}}
										target="_blank"
									>
										<span className="book-spine__text">{book.title}</span>
									</a>
								))}
							</div>
						</div>

						{/* 3D Wooden Shelf Plinth & Supports */}
						<div aria-hidden="true" className="shelf-plinth">
							<div className="shelf-plinth__top" />
							<div className="shelf-plinth__front" />
							<div className="shelf-bracket shelf-bracket--left" />
							<div className="shelf-bracket shelf-bracket--right" />
						</div>
					</div>

					{/* Under-shelf track activity indicator */}
					<div className="spotify-shelf-subtext">
						<div className="spotify-presence-wave">
							<span className="wave-bar wave-bar--1" />
							<span className="wave-bar wave-bar--2" />
							<span className="wave-bar wave-bar--3" />
						</div>
						<div className="spotify-shelf-caption">
							<span className="spotify-shelf-time">Listened 2 hours ago to</span>
							<span className="spotify-shelf-track">
								<a
									className="text-link"
									href={spotifyPlaylistUrl}
									rel="noreferrer"
									target="_blank"
								>
									Lightning Speed
								</a>{" "}
								<span className="spotify-shelf-by">by</span>{" "}
								<a
									className="text-link"
									href={spotifyPlaylistUrl}
									rel="noreferrer"
									target="_blank"
								>
									Timmy McKeever
								</a>
							</span>
						</div>
					</div>

					{/* Curated list under shelf */}
					<div className="spotify-curated-list">
						<ul aria-label="Curated playlists" className="idx__list">
							{playlists.map((pl) => (
								<li className="idx__row" key={pl.title}>
									<div className="idx__grid">
										<span className="idx__details">
											<a
												className="idx__title-text text-link"
												href={spotifyPlaylistUrl}
												rel="noreferrer"
												target="_blank"
											>
												{pl.title}
											</a>
										</span>
										<span aria-hidden="true" className="idx__leader" />
										<div className="idx__trail">
											<span className="idx__flair">{pl.tag}</span>
											<span className="idx__meta">{pl.count}</span>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			) : (
				<div className="spotify-control-stage">
					<AmbientRadio />
				</div>
			)}
		</div>
	);
}
