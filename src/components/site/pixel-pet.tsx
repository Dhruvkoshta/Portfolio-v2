import { useEffect, useState } from "react";
import { sound } from "~/lib/sound";
import { useReducedMotion } from "~/lib/use-reduced-motion";
import {
	IDLE_DIALOGUES,
	usePixelPetPhysics,
} from "~/lib/use-pixel-pet-physics";
import { HeartIcon } from "./icons";

export function PixelPet() {
	const reduced = useReducedMotion();
	const [happiness, setHappiness] = useState(0);
	const [isSleeping, setIsSleeping] = useState(false);
	const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
	const [minimized, setMinimized] = useState(false);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		try {
			const saved = localStorage.getItem("show-pet");
			if (saved === "false") setVisible(false);
		} catch {
			// ignore localStorage error
		}

		const handleToggle = (e: Event) => {
			const custom = e as CustomEvent<{ visible: boolean }>;
			if (typeof custom.detail?.visible === "boolean") {
				setVisible(custom.detail.visible);
			}
		};
		window.addEventListener("toggle-pixel-pet", handleToggle);
		return () => window.removeEventListener("toggle-pixel-pet", handleToggle);
	}, []);

	const handlePet = () => {
		sound.play("pop");
		setHappiness((prev) => prev + 1);
		setIsSleeping(false);

		// Random message
		const randomQuote =
			IDLE_DIALOGUES[Math.floor(Math.random() * IDLE_DIALOGUES.length)];
		physics.setDialogue(randomQuote);

		// Spawn floating heart
		if (!reduced) {
			const newHeart = {
				id: Date.now() + Math.random(),
				x: Math.random() * 20 - 10,
			};
			setHearts((prev) => [...prev.slice(-3), newHeart]);
			setTimeout(() => {
				setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
			}, 1200);
		}
	};

	const physics = usePixelPetPhysics({
		isSleeping,
		onPet: handlePet,
	});

	if (!visible) return null;

	if (minimized) {
		return (
			<button
				aria-label="Byte: wake pixel companion"
				className="pixel-pet-dock"
				onClick={() => {
					setMinimized(false);
					sound.play("click");
				}}
				title="Wake Byte the Pixel Cat"
				type="button"
			>
				<span className="pixel-pet-dock__badge">🐾 Byte</span>
			</button>
		);
	}

	return (
		<aside
			aria-label="Pixel Companion Byte"
			className={`pixel-pet-container ${physics.isFloating ? "pixel-pet-container--floating" : ""}`}
			style={{
				transform: `translate3d(${physics.offset.x}px, ${physics.offset.y}px, 0)`,
				transition:
					physics.isDragging || physics.isFloating
						? "none"
						: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
			}}
		>
			{/* Speech bubble */}
			{physics.dialogue ? (
				<div className="pixel-pet__bubble" role="status">
					<span>{physics.dialogue}</span>
					<div className="pixel-pet__bubble-arrow" />
				</div>
			) : null}

			{/* Floating hearts */}
			{hearts.map((heart) => (
				<span
					aria-hidden="true"
					className="pixel-pet__heart"
					key={heart.id}
					style={{ transform: `translateX(${heart.x}px)` }}
				>
					<HeartIcon size={12} />
				</span>
			))}

			<div className="pixel-pet__wrap">
				<button
					aria-label={`Pet Byte the cat. Current happiness: ${happiness}. ${isSleeping ? "Asleep" : "Awake"}`}
					className={`pixel-pet ${isSleeping ? "pixel-pet--sleep" : "pixel-pet--awake"} ${physics.isDragging ? "pixel-pet--dragging" : ""} ${physics.isFloating ? "pixel-pet--floating" : ""}`}
					onPointerDown={physics.handlePointerDown}
					style={{
						transform: `rotate(${physics.swingAngle}deg)`,
						transformOrigin:
							physics.isDragging || physics.isFloating ? "50% 0%" : "50% 100%",
					}}
					type="button"
				>
					{/* Parachute Canopy & Rigging Lines */}
					{physics.isFloating ? (
						<span aria-hidden="true" className="pixel-pet__chute">
							<span className="pixel-pet__chute-canopy" />
							<span className="pixel-pet__chute-line pixel-pet__chute-line--l" />
							<span className="pixel-pet__chute-line pixel-pet__chute-line--r" />
						</span>
					) : null}

					{/* Crisp Retro Pixel Cat SVG */}
					<svg
						aria-hidden="true"
						className="pixel-pet__sprite"
						height="40"
						viewBox="0 0 24 24"
						width="40"
					>
						{/* Ears */}
						<rect fill="var(--ink)" height="3" width="2" x="4" y="3" />
						<rect fill="var(--ink)" height="3" width="2" x="18" y="3" />
						<rect fill="var(--accent)" height="2" width="1" x="5" y="4" />
						<rect fill="var(--accent)" height="2" width="1" x="18" y="4" />

						{/* Head */}
						<rect fill="var(--ink)" height="10" width="16" x="4" y="6" />

						{/* Eyes */}
						{isSleeping ? (
							<>
								<rect fill="var(--bg)" height="1" width="3" x="7" y="10" />
								<rect fill="var(--bg)" height="1" width="3" x="14" y="10" />
							</>
						) : (
							<>
								<rect fill="var(--bg)" height="3" width="2" x="7" y="9" />
								<rect fill="var(--bg)" height="3" width="2" x="15" y="9" />
								<rect fill="var(--accent)" height="1" width="1" x="8" y="10" />
								<rect fill="var(--accent)" height="1" width="1" x="16" y="10" />
							</>
						)}

						{/* Snout & Whiskers */}
						<rect fill="var(--accent)" height="1" width="2" x="11" y="12" />
						<rect fill="var(--line-strong)" height="1" width="2" x="2" y="11" />
						<rect fill="var(--line-strong)" height="1" width="2" x="20" y="11" />

						{/* Body */}
						<rect fill="var(--ink)" height="6" width="12" x="6" y="16" />

						{/* Paws */}
						<rect fill="var(--line-strong)" height="2" width="2" x="7" y="21" />
						<rect fill="var(--line-strong)" height="2" width="2" x="15" y="21" />

						{/* Tail */}
						<rect fill="var(--ink)" height="5" width="2" x="18" y="16" />
						<rect fill="var(--ink)" height="2" width="2" x="20" y="15" />
					</svg>
				</button>

				<div className="pixel-pet__actions">
					<button
						aria-label={isSleeping ? "Wake up Byte" : "Put Byte to sleep"}
						className="pixel-pet__tool-btn"
						onClick={() => {
							sound.play("switch");
							setIsSleeping((prev) => !prev);
						}}
						title={isSleeping ? "Wake Byte" : "Sleep Byte"}
						type="button"
					>
						<span aria-hidden="true">{isSleeping ? "💤" : "🌙"}</span>
					</button>

					<button
						aria-label="Minimize pet companion"
						className="pixel-pet__tool-btn"
						onClick={() => {
							sound.play("click");
							setMinimized(true);
						}}
						title="Minimize"
						type="button"
					>
						<span aria-hidden="true">−</span>
					</button>
				</div>
			</div>
		</aside>
	);
}
