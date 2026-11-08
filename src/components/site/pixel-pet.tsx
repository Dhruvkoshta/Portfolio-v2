import { useEffect, useRef, useState } from "react";
import { sound } from "~/lib/sound";
import { useReducedMotion } from "~/lib/use-reduced-motion";
import { HeartIcon } from "./icons";

const IDLE_DIALOGUES = [
	"Still shipping! ✦",
	"Patent No. 202441083752",
	"Listening to Electric 🎧",
	"Purrr... 50+ apps deployed!",
	"BMSCE CGPA 8.8!",
	"Dell Tech software intern!",
	"System reliability: 100%",
	"Click me again! 🐾",
	"Drag me up! I have a parachute 🪂",
];

const GRAB_DIALOGUES = [
	"wheeeee! hold on tight!",
	"put me down! or drop me!",
	"i can see my house from here!",
	"can you drop me? i wanna fly!",
	"going up! don't drop me yet!",
];

const FLOAT_DIALOGUES = [
	"🪂 wheeeeeee!",
	"look at me float!",
	"airborne Byte!",
	"gliding smoothly...",
	"parachuting down!",
];

const LAND_DIALOGUES = [
	"stuck the landing! 🐾",
	"that was awesome!",
	"let's do that again!",
	"touchdown safe and sound!",
];

export function PixelPet() {
	const reduced = useReducedMotion();
	const [happiness, setHappiness] = useState(0);
	const [dialogue, setDialogue] = useState<string | null>(null);
	const [isSleeping, setIsSleeping] = useState(false);
	const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
	const [minimized, setMinimized] = useState(false);

	// Physics / Dragging / Floating State
	const [isDragging, setIsDragging] = useState(false);
	const [isFloating, setIsFloating] = useState(false);
	const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [swingAngle, setSwingAngle] = useState(0);

	// Refs for animation & drag gesture
	const petRef = useRef<HTMLButtonElement | null>(null);
	const dragStartRef = useRef<{ pointerId: number; startX: number; startY: number; initialOffsetX: number; initialOffsetY: number } | null>(null);
	const isDraggingRef = useRef(false);
	const offsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const velocityRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });
	const lastPosRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
	const animFrameRef = useRef<number>(0);
	const floatTimeRef = useRef(0);
	const hasMovedRef = useRef(false);

	// Keep offsetRef synchronized
	useEffect(() => {
		offsetRef.current = offset;
	}, [offset]);

	// Periodically say random quotes while grounded
	useEffect(() => {
		const interval = setInterval(() => {
			if (!isSleeping && !isDragging && !isFloating && Math.random() > 0.6) {
				const randomQuote = IDLE_DIALOGUES[Math.floor(Math.random() * IDLE_DIALOGUES.length)];
				setDialogue(randomQuote);
				const timeout = setTimeout(() => setDialogue(null), 3500);
				return () => clearTimeout(timeout);
			}
		}, 8000);

		return () => clearInterval(interval);
	}, [isSleeping, isDragging, isFloating]);

	// Floating parachute physics loop
	useEffect(() => {
		if (!isFloating) return;

		floatTimeRef.current = 0;
		let lastTimestamp = performance.now();

		const tick = (now: number) => {
			const dt = Math.min((now - lastTimestamp) / 1000, 0.05);
			lastTimestamp = now;
			floatTimeRef.current += dt;

			// Gentle downward descent speed (~85px/s)
			const descentSpeed = 85;
			const nextY = offsetRef.current.y + descentSpeed * dt;

			// Gentle horizontal swaying/swinging motion
			const swayFrequency = 2.4;
			const swayAmplitude = 24;
			const swing = Math.sin(floatTimeRef.current * swayFrequency);
			setSwingAngle(swing * 12); // degrees

			// Progress horizontal position smoothly back toward rest origin (x = 0) with gentle sway
			const nextX = offsetRef.current.x * Math.exp(-0.8 * dt) + swing * (swayAmplitude * dt);

			if (nextY >= 0) {
				// Landed on bottom dock!
				setOffset({ x: 0, y: 0 });
				setSwingAngle(0);
				setIsFloating(false);
				sound.play("pop");

				// Landing dialogue
				const landQuote = LAND_DIALOGUES[Math.floor(Math.random() * LAND_DIALOGUES.length)];
				setDialogue(landQuote);
				const t = setTimeout(() => setDialogue(null), 3200);
				return () => clearTimeout(t);
			} else {
				setOffset({ x: nextX, y: nextY });
				animFrameRef.current = requestAnimationFrame(tick);
			}
		};

		animFrameRef.current = requestAnimationFrame(tick);
		return () => {
			if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
		};
	}, [isFloating]);

	// Pointer drag handlers
	const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
		if (e.button !== 0) return; // primary button only

		const pointerId = e.pointerId;
		const startX = e.clientX;
		const startY = e.clientY;
		const initialOffsetX = offsetRef.current.x;
		const initialOffsetY = offsetRef.current.y;

		dragStartRef.current = {
			pointerId,
			startX,
			startY,
			initialOffsetX,
			initialOffsetY,
		};
		lastPosRef.current = { x: startX, y: startY, time: performance.now() };
		velocityRef.current = { vx: 0, vy: 0 };
		hasMovedRef.current = false;

		const onPointerMove = (ev: PointerEvent) => {
			if (!dragStartRef.current || ev.pointerId !== pointerId) return;

			const dx = ev.clientX - dragStartRef.current.startX;
			const dy = ev.clientY - dragStartRef.current.startY;

			if (!hasMovedRef.current && Math.hypot(dx, dy) > 4) {
				hasMovedRef.current = true;
				isDraggingRef.current = true;
				setIsDragging(true);
				setIsFloating(false);
				setSwingAngle(0);

				sound.play("switch");
				const grabQuote = GRAB_DIALOGUES[Math.floor(Math.random() * GRAB_DIALOGUES.length)];
				setDialogue(grabQuote);
			}

			if (isDraggingRef.current) {
				const now = performance.now();
				const dt = Math.max((now - lastPosRef.current.time) / 1000, 0.008);
				const vx = (ev.clientX - lastPosRef.current.x) / dt;
				const vy = (ev.clientY - lastPosRef.current.y) / dt;
				velocityRef.current = { vx, vy };
				lastPosRef.current = { x: ev.clientX, y: ev.clientY, time: now };

				const newOffsetX = dragStartRef.current.initialOffsetX + dx;
				const newOffsetY = Math.min(0, dragStartRef.current.initialOffsetY + dy);

				const dragTilt = Math.max(-25, Math.min(25, -vx * 0.04));
				setSwingAngle(dragTilt);
				setOffset({ x: newOffsetX, y: newOffsetY });
			}
		};

		const onPointerUp = (ev: PointerEvent) => {
			if (ev.pointerId !== pointerId) return;

			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", onPointerUp);
			window.removeEventListener("pointercancel", onPointerUp);

			const wasDragging = isDraggingRef.current;
			dragStartRef.current = null;
			isDraggingRef.current = false;
			setIsDragging(false);

			if (!wasDragging) {
				handlePet();
				return;
			}

			const heightAboveRest = -offsetRef.current.y;
			if (heightAboveRest > 40) {
				setIsFloating(true);
				sound.play("pop");

				const floatQuote = FLOAT_DIALOGUES[Math.floor(Math.random() * FLOAT_DIALOGUES.length)];
				setDialogue(floatQuote);
			} else {
				setOffset({ x: 0, y: 0 });
				setSwingAngle(0);
				sound.play("switch");
			}
		};

		window.addEventListener("pointermove", onPointerMove, { passive: true });
		window.addEventListener("pointerup", onPointerUp, { passive: true });
		window.addEventListener("pointercancel", onPointerUp, { passive: true });
	};


	const handlePet = () => {
		sound.play("pop");
		setHappiness((prev) => prev + 1);
		setIsSleeping(false);

		// Random message
		const randomQuote = IDLE_DIALOGUES[Math.floor(Math.random() * IDLE_DIALOGUES.length)];
		setDialogue(randomQuote);

		// Spawn floating heart
		if (!reduced) {
			const newHeart = { id: Date.now() + Math.random(), x: Math.random() * 20 - 10 };
			setHearts((prev) => [...prev.slice(-3), newHeart]);
			setTimeout(() => {
				setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
			}, 1200);
		}
	};

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
			className="pixel-pet-container"
			style={{
				transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
				transition: isDragging || isFloating ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
			}}
		>
			{/* Speech bubble */}
			{dialogue ? (
				<div className="pixel-pet__bubble" role="status">
					<span>{dialogue}</span>
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
					className={`pixel-pet ${isSleeping ? "pixel-pet--sleep" : "pixel-pet--awake"} ${isDragging ? "pixel-pet--dragging" : ""} ${isFloating ? "pixel-pet--floating" : ""}`}
					onPointerDown={handlePointerDown}
					ref={petRef}
					style={{
						transform: `rotate(${swingAngle}deg)`,
						transformOrigin: isDragging || isFloating ? "50% 0%" : "50% 100%",
					}}
					type="button"
				>
					{/* Parachute Canopy & Rigging Lines */}
					{isFloating ? (
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
