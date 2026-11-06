import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "~/lib/use-reduced-motion";

export interface PolaroidItem {
	id: string;
	img: string;
	label: string;
	rot: number;
	x: number;
	y: number;
	zIndex?: number;
}

export const POLAROID_DATA: PolaroidItem[] = [
	// Tier 1 (top row)
	{ id: "p1", x: 80, y: 70, rot: -3.5, label: "2025 + top-of-mountain dinner", img: "https://picsum.photos/id/10/600/750" },
	{ id: "p2", x: 340, y: 110, rot: 2.2, label: "2023 + cotton candy clouds", img: "https://picsum.photos/id/15/600/750" },
	{ id: "p3", x: 600, y: 65, rot: -4.0, label: "2025 + mount revelstoke national park", img: "https://picsum.photos/id/28/600/750" },
	{ id: "p4", x: 860, y: 95, rot: 1.8, label: "2024 + tokyo late night ramen", img: "https://picsum.photos/id/29/600/750" },
	{ id: "p5", x: 1120, y: 60, rot: -2.5, label: "2024 + kyoto golden pavilion", img: "https://picsum.photos/id/42/600/750" },
	{ id: "p6", x: 1380, y: 105, rot: 3.8, label: "2023 + highway 1 coastal run", img: "https://picsum.photos/id/48/600/750" },
	{ id: "p7", x: 1640, y: 75, rot: -1.5, label: "2025 + lake louise turquoise waters", img: "https://picsum.photos/id/54/600/750" },
	{ id: "p8", x: 1900, y: 115, rot: 4.2, label: "2024 + iceland black sand beach", img: "https://picsum.photos/id/65/600/750" },
	{ id: "p9", x: 2160, y: 80, rot: -3.0, label: "2023 + midnight coding session", img: "https://picsum.photos/id/76/600/750" },

	// Tier 2 (middle row)
	{ id: "p10", x: 50, y: 340, rot: 3.2, label: "2025 + swiss alps cable car", img: "https://picsum.photos/id/88/600/750" },
	{ id: "p11", x: 300, y: 320, rot: -2.8, label: "2024 + amsterdam canal morning", img: "https://picsum.photos/id/96/600/750" },
	{ id: "p12", x: 550, y: 360, rot: 4.5, label: "2023 + dolomites knife edge ridge", img: "https://picsum.photos/id/110/600/750" },
	{ id: "p13", x: 810, y: 330, rot: -1.8, label: "2025 + seattle pine tree fog", img: "https://picsum.photos/id/116/600/750" },
	{ id: "p14", x: 1060, y: 365, rot: 2.5, label: "2024 + banff sunburst peak", img: "https://picsum.photos/id/124/600/750" },
	{ id: "p15", x: 1320, y: 335, rot: -4.2, label: "2023 + neon street reflections", img: "https://picsum.photos/id/133/600/750" },
	{ id: "p16", x: 1580, y: 355, rot: 3.0, label: "2025 + yosemite half dome sunrise", img: "https://picsum.photos/id/142/600/750" },
	{ id: "p17", x: 1840, y: 325, rot: -2.2, label: "2024 + lofoten red cabin glow", img: "https://picsum.photos/id/152/600/750" },
	{ id: "p18", x: 2090, y: 350, rot: 4.0, label: "2023 + santorini whitewashed alleys", img: "https://picsum.photos/id/160/600/750" },

	// Tier 3 (bottom row)
	{ id: "p19", x: 90, y: 590, rot: -3.8, label: "2025 + shibuya crossing rainfall", img: "https://picsum.photos/id/164/600/750" },
	{ id: "p20", x: 350, y: 620, rot: 2.0, label: "2024 + oregon coastline bonfire", img: "https://picsum.photos/id/175/600/750" },
	{ id: "p21", x: 610, y: 580, rot: -4.5, label: "2023 + autumn in central park", img: "https://picsum.photos/id/180/600/750" },
	{ id: "p22", x: 870, y: 615, rot: 1.4, label: "2025 + lisbon tram no 28", img: "https://picsum.photos/id/193/600/750" },
	{ id: "p23", x: 1130, y: 585, rot: -2.9, label: "2024 + vancouver skyline at dusk", img: "https://picsum.photos/id/204/600/750" },
	{ id: "p24", x: 1390, y: 625, rot: 3.6, label: "2023 + mont blanc glacier walk", img: "https://picsum.photos/id/211/600/750" },
	{ id: "p25", x: 1650, y: 590, rot: -1.7, label: "2025 + zion canyon narrows hike", img: "https://picsum.photos/id/219/600/750" },
	{ id: "p26", x: 1910, y: 630, rot: 4.8, label: "2024 + golden hour flight home", img: "https://picsum.photos/id/225/600/750" },
	{ id: "p27", x: 2150, y: 595, rot: -3.2, label: "2025 + cafe corner pour-over", img: "https://picsum.photos/id/237/600/750" },
	{ id: "p28", x: 2280, y: 340, rot: 1.9, label: "2023 + desert stargazing night", img: "https://picsum.photos/id/249/600/750" },
];

const CANVAS_WIDTH = 2500;
const CANVAS_HEIGHT = 900;
const VIEWPORT_HEIGHT = 520;

function playShutterSound(isOpen: boolean) {
	try {
		const AudioCtx =
			window.AudioContext ||
			(window as unknown as { webkitAudioContext: typeof window.AudioContext })
				.webkitAudioContext;
		if (!AudioCtx) return;
		const ctx = new AudioCtx();
		const now = ctx.currentTime;

		if (isOpen) {
			// Shutter click tone
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "sine";
			osc.frequency.setValueAtTime(1200, now);
			osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);
			gain.gain.setValueAtTime(0.06, now);
			gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start(now);
			osc.stop(now + 0.06);

			// Subtle paper flutter burst
			const bufferSize = Math.floor(ctx.sampleRate * 0.05);
			const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
			const data = buffer.getChannelData(0);
			for (let i = 0; i < bufferSize; i++) {
				data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
			}
			const noise = ctx.createBufferSource();
			noise.buffer = buffer;
			const filter = ctx.createBiquadFilter();
			filter.type = "bandpass";
			filter.frequency.setValueAtTime(2000, now);
			const noiseGain = ctx.createGain();
			noiseGain.gain.setValueAtTime(0.04, now);
			noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
			noise.connect(filter);
			filter.connect(noiseGain);
			noiseGain.connect(ctx.destination);
			noise.start(now);
			noise.stop(now + 0.06);
		} else {
			// Soft set-down tone
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "sine";
			osc.frequency.setValueAtTime(300, now);
			osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
			gain.gain.setValueAtTime(0.04, now);
			gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start(now);
			osc.stop(now + 0.06);
		}
	} catch {
		// Ignore audio error if blocked
	}
}

export function PerspectiveGallery() {
	const containerRef = useRef<HTMLDivElement>(null);
	const reduced = useReducedMotion();

	const [activeCardId, setActiveCardId] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [viewportWidth, setViewportWidth] = useState(800);

	// Pan position motion values
	const rawPanX = useMotionValue(-850);
	const rawPanY = useMotionValue(-190);

	const panX = useSpring(rawPanX, {
		stiffness: reduced ? 1000 : 360,
		damping: reduced ? 100 : 25,
		mass: 0.25,
	});
	const panY = useSpring(rawPanY, {
		stiffness: reduced ? 1000 : 360,
		damping: reduced ? 100 : 25,
		mass: 0.25,
	});

	// Track pointer for drag vs click disambiguation
	const pointerDownRef = useRef<{
		panX: number;
		panY: number;
		time: number;
		x: number;
		y: number;
	} | null>(null);
	const hasInitializedRef = useRef(false);

	// Calculate bounds
	const minPanX = Math.min(0, viewportWidth - CANVAS_WIDTH);
	const maxPanX = 0;
	const minPanY = Math.min(0, VIEWPORT_HEIGHT - CANVAS_HEIGHT);
	const maxPanY = 0;

	const clampX = useCallback(
		(val: number) => Math.max(minPanX - 40, Math.min(maxPanX + 40, val)),
		[minPanX, maxPanX],
	);
	const clampY = useCallback(
		(val: number) => Math.max(minPanY - 30, Math.min(maxPanY + 30, val)),
		[minPanY, maxPanY],
	);

	// Measure viewport width
	useEffect(() => {
		if (!containerRef.current) return;
		const el = containerRef.current;
		const updateWidth = () => {
			const w = el.clientWidth || 800;
			setViewportWidth(w);
			if (!hasInitializedRef.current) {
				hasInitializedRef.current = true;
				const initialX = Math.round((w - CANVAS_WIDTH) / 2);
				const initialY = Math.round((VIEWPORT_HEIGHT - CANVAS_HEIGHT) / 2);
				rawPanX.set(initialX);
				rawPanY.set(initialY);
			}
		};
		updateWidth();

		if (typeof ResizeObserver !== "undefined") {
			const ro = new ResizeObserver(() => updateWidth());
			ro.observe(el);
			return () => ro.disconnect();
		}
		return undefined;
	}, [rawPanX, rawPanY]);

	// Close on Escape key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && activeCardId) {
				playShutterSound(false);
				setActiveCardId(null);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [activeCardId]);

	const applyPanDelta = useCallback(
		(deltaX: number, deltaY: number, deltaMode = 0) => {
			let dx = Number.isFinite(deltaX) ? deltaX : 0;
			let dy = Number.isFinite(deltaY) ? deltaY : 0;

			// Normalize deltaMode: 1 = DOM_DELTA_LINE (Firefox/mice), 2 = DOM_DELTA_PAGE
			if (deltaMode === 1) {
				dx *= 36;
				dy *= 36;
			} else if (deltaMode === 2) {
				dx *= 400;
				dy *= 400;
			}

			// If vertical wheel is used with little/no horizontal delta (standard mouse wheel),
			// translate vertical wheel to horizontal pan so the user can fluidly explore the 2500px wide gallery
			if (Math.abs(dx) < 1 && Math.abs(dy) > 0) {
				dx = dy * 2.5;
				dy = dy * 0.4;
			} else {
				// Trackpad two-finger swipe or Shift+wheel: apply responsive speed multiplier
				dx *= 2.2;
				dy *= 2.2;
			}

			const nextX = Math.max(minPanX, Math.min(maxPanX, rawPanX.get() - dx));
			const nextY = Math.max(minPanY, Math.min(maxPanY, rawPanY.get() - dy));
			rawPanX.set(nextX);
			rawPanY.set(nextY);
		},
		[minPanX, maxPanX, minPanY, maxPanY, rawPanX, rawPanY],
	);

	// Native wheel listener for 2D trackpad / wheel panning with e.preventDefault()
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const onWheel = (e: WheelEvent) => {
			e.preventDefault();
			applyPanDelta(e.deltaX, e.deltaY, e.deltaMode);
		};

		el.addEventListener("wheel", onWheel, { passive: false });
		return () => el.removeEventListener("wheel", onWheel);
	}, [applyPanDelta]);

	// Window-level pointer drag listeners
	useEffect(() => {
		if (!isDragging) return;

		const handlePointerMove = (e: PointerEvent) => {
			if (!pointerDownRef.current) return;
			const dx = e.clientX - pointerDownRef.current.x;
			const dy = e.clientY - pointerDownRef.current.y;

			if (Math.hypot(dx, dy) > 5) {
				const nextX = clampX(pointerDownRef.current.panX + dx);
				const nextY = clampY(pointerDownRef.current.panY + dy);
				rawPanX.set(nextX);
				rawPanY.set(nextY);
			}
		};

		const handlePointerUp = () => {
			setIsDragging(false);

			// Spring back into strict bounds if pushed past edge buffer
			const curX = rawPanX.get();
			const curY = rawPanY.get();
			if (curX < minPanX) rawPanX.set(minPanX);
			if (curX > maxPanX) rawPanX.set(maxPanX);
			if (curY < minPanY) rawPanY.set(minPanY);
			if (curY > maxPanY) rawPanY.set(maxPanY);

			setTimeout(() => {
				pointerDownRef.current = null;
			}, 100);
		};

		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("pointerup", handlePointerUp);
		window.addEventListener("pointercancel", handlePointerUp);

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerup", handlePointerUp);
			window.removeEventListener("pointercancel", handlePointerUp);
		};
	}, [isDragging, clampX, clampY, minPanX, maxPanX, minPanY, maxPanY, rawPanX, rawPanY]);

	// Pointer drag handlers
	const handlePointerDown = (e: React.PointerEvent) => {
		// Only primary click
		if (e.button !== 0) return;
		pointerDownRef.current = {
			x: e.clientX,
			y: e.clientY,
			panX: rawPanX.get(),
			panY: rawPanY.get(),
			time: Date.now(),
		};
		setIsDragging(true);
	};

	const handleCardClick = (cardId: string, e: React.MouseEvent) => {
		e.stopPropagation();
		// Distinguish between drag (> 5px) and click (< 5px)
		if (pointerDownRef.current) {
			const dist = Math.hypot(
				e.clientX - pointerDownRef.current.x,
				e.clientY - pointerDownRef.current.y,
			);
			if (dist > 5) return;
		}

		if (activeCardId === cardId) {
			playShutterSound(false);
			setActiveCardId(null);
		} else {
			playShutterSound(true);
			setActiveCardId(cardId);
		}
	};

	const handleBackdropClick = () => {
		playShutterSound(false);
		setActiveCardId(null);
	};

	const handleContainerKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowRight") {
			e.preventDefault();
			applyPanDelta(200, 0);
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			applyPanDelta(-200, 0);
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			applyPanDelta(0, 140);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			applyPanDelta(0, -140);
		}
	};

	const activeCard = POLAROID_DATA.find((c) => c.id === activeCardId);

	return (
		<div className="w-full relative my-8">
			{/* Outer Frame & Architectural Container */}
			<div
				aria-label="3D perspective gallery"
				className={`h-[520px] w-full overflow-hidden bg-[#f4f4f5] relative border border-neutral-300 rounded-none select-none focus:outline-none focus:ring-1 focus:ring-neutral-400 ${
					isDragging ? "cursor-grabbing" : "cursor-grab"
				}`}
				id="gallery"
				onKeyDown={handleContainerKeyDown}
				onPointerDown={handlePointerDown}
				ref={containerRef}
				role="region"
				tabIndex={0}
			>
				{/* 4 Corner Intersection Nodes centered on vertices */}
				<span
					aria-hidden="true"
					className="w-1.5 h-1.5 rounded-full bg-neutral-400 absolute -top-[3px] -left-[3px] z-10 pointer-events-none"
				/>
				<span
					aria-hidden="true"
					className="w-1.5 h-1.5 rounded-full bg-neutral-400 absolute -top-[3px] -right-[3px] z-10 pointer-events-none"
				/>
				<span
					aria-hidden="true"
					className="w-1.5 h-1.5 rounded-full bg-neutral-400 absolute -bottom-[3px] -left-[3px] z-10 pointer-events-none"
				/>
				<span
					aria-hidden="true"
					className="w-1.5 h-1.5 rounded-full bg-neutral-400 absolute -bottom-[3px] -right-[3px] z-10 pointer-events-none"
				/>

				{/* 2D Panning Canvas Plane */}
				<motion.div
					className="absolute w-[2500px] h-[900px] will-change-transform polaroid-canvas"
					data-testid="polaroid-canvas"
					style={{
						x: panX,
						y: panY,
					}}
				>
					{POLAROID_DATA.map((card) => {
						const isCardActive = activeCardId === card.id;

						return (
							<div
								className={`absolute bg-white p-2.5 pb-4 shadow-md border border-neutral-200/80 w-56 cursor-zoom-in transition-all duration-200 hover:scale-[1.04] hover:!rotate-0 hover:z-20 ${
									activeCardId && !isCardActive ? "opacity-20 pointer-events-none" : "opacity-100"
								}`}
								data-testid="polaroid-card"
								key={card.id}
								onClick={(e) => handleCardClick(card.id, e)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										handleCardClick(card.id, e as unknown as React.MouseEvent);
									}
								}}
								role="button"
								style={{
									left: card.x,
									top: card.y,
									transform: `rotate(${card.rot}deg)`,
									zIndex: card.zIndex ?? 1,
								}}
								tabIndex={0}
							>
								{/* Polaroid Image */}
								<div className="w-full aspect-[4/5] bg-neutral-200 overflow-hidden rounded-none pointer-events-none">
									<img
										alt={card.label}
										className="w-full h-full object-cover"
										draggable={false}
										loading="lazy"
										src={card.img}
									/>
								</div>

								{/* Polaroid Caption */}
								<p className="text-[11px] text-neutral-700 font-medium font-mono text-center truncate px-1 pt-2.5 pointer-events-none">
									{card.label}
								</p>
							</div>
						);
					})}
				</motion.div>

				{/* Click-to-Focus Lightbox State Overlay */}
				<AnimatePresence>
					{activeCard ? (
						<motion.div
							animate={{ opacity: 1 }}
							className="absolute inset-0 z-20"
							exit={{ opacity: 0 }}
							initial={{ opacity: 0 }}
							key={`lightbox-${activeCard.id}`}
							transition={{ duration: 0.25 }}
						>
							{/* Soft washed out backdrop */}
							<div
								aria-label="Close focused photo"
								className="absolute inset-0 bg-white/80 backdrop-blur-[2px] cursor-zoom-out"
								onClick={handleBackdropClick}
								role="button"
								tabIndex={0}
							/>

							{/* Elevated focused card centered in viewport frame */}
							<div className="absolute inset-0 z-30 flex items-center justify-center p-6 pointer-events-none">
								<motion.div
									animate={{ scale: 1, rotate: 0 }}
									className="bg-white p-3.5 pb-5 shadow-2xl border border-neutral-200 w-72 sm:w-80 max-h-[440px] pointer-events-auto cursor-zoom-out"
									exit={{ scale: 0.85, opacity: 0 }}
									initial={{ scale: 0.85, rotate: activeCard.rot }}
									onClick={handleBackdropClick}
									transition={{
										type: "spring",
										stiffness: reduced ? 1000 : 320,
										damping: reduced ? 100 : 28,
										mass: 0.5,
									}}
								>
									<div className="w-full aspect-[4/5] bg-neutral-200 overflow-hidden rounded-none">
										<img
											alt={activeCard.label}
											className="w-full h-full object-cover"
											draggable={false}
											src={activeCard.img}
										/>
									</div>

									<p className="text-xs text-neutral-800 font-medium font-mono text-center truncate px-1 pt-3">
										{activeCard.label}
									</p>
								</motion.div>
							</div>
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>

			{/* Muted Helper Caption below bottom border */}
			<p className="text-xs text-neutral-400 text-center mt-2 font-mono">
				Drag, click, or horizontal scroll
			</p>
		</div>
	);
}
