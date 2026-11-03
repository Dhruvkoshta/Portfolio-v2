import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { useReducedMotion } from "~/lib/use-reduced-motion";

type Polaroid = {
	slug: string;
	alt: string;
	caption: string;
	rotation: number;
	offsetY: number;
};

const polaroids: readonly Polaroid[] = [
	{
		slug: "cartonoir",
		alt: "CartoNoir map poster of New Delhi",
		caption: "2024 ✦ CartoNoir",
		rotation: -7,
		offsetY: 8,
	},
	{
		slug: "rayfall",
		alt: "Rayfall arcade shooter gameplay",
		caption: "2023 ✦ Rayfall",
		rotation: 5,
		offsetY: -12,
	},
	{
		slug: "proctoai",
		alt: "ProctoAI dashboard and code editor",
		caption: "2024 ✦ ProctoAI",
		rotation: -4,
		offsetY: 16,
	},
	{
		slug: "vibelink",
		alt: "VibeLink realtime chat interface",
		caption: "2024 ✦ VibeLink",
		rotation: 6,
		offsetY: -6,
	},
	{
		slug: "anonymus",
		alt: "Anonymus security dashboard",
		caption: "2024 ✦ Anonymus",
		rotation: -5,
		offsetY: 14,
	},
	{
		slug: "hazard",
		alt: "IoT hazard monitoring dashboard",
		caption: "2024 ✦ Hazard monitor",
		rotation: 4,
		offsetY: -10,
	},
	{
		slug: "webserver",
		alt: "C-powered proxy web server interface",
		caption: "2023 ✦ C proxy server",
		rotation: -6,
		offsetY: 10,
	},
];

export function PolaroidCollage() {
	const containerRef = useRef<HTMLElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const reduced = useReducedMotion();

	const [isDragging, setIsDragging] = useState(false);
	const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
	const velocityRef = useRef(0);
	const lastXRef = useRef(0);
	const lastTimeRef = useRef(0);
	const animationFrameRef = useRef<number | null>(null);

	// Mouse drag inertia
	const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
		if (reduced || !trackRef.current) return;
		setIsDragging(true);
		dragStartRef.current = {
			x: e.clientX,
			scrollLeft: trackRef.current.scrollLeft,
		};
		lastXRef.current = e.clientX;
		lastTimeRef.current = performance.now();
		velocityRef.current = 0;

		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
			animationFrameRef.current = null;
		}

		(e.target as HTMLElement).setPointerCapture?.(e.pointerId);
	};

	const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
		if (!isDragging || !trackRef.current) return;
		const dx = e.clientX - dragStartRef.current.x;
		trackRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;

		const now = performance.now();
		const dt = now - lastTimeRef.current;
		if (dt > 10) {
			velocityRef.current = (e.clientX - lastXRef.current) / dt;
			lastXRef.current = e.clientX;
			lastTimeRef.current = now;
		}
	};

	const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
		if (!isDragging || !trackRef.current) return;
		setIsDragging(false);
		(e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

		// Apply inertia
		let v = velocityRef.current * -16;
		const step = () => {
			if (!trackRef.current || Math.abs(v) < 0.5) return;
			trackRef.current.scrollLeft += v;
			v *= 0.92;
			animationFrameRef.current = requestAnimationFrame(step);
		};
		animationFrameRef.current = requestAnimationFrame(step);
	};

	// Parallax scroll on vertical scroll
	useEffect(() => {
		const element = containerRef.current;
		if (!element || reduced) return;

		let frame = 0;
		const update = () => {
			frame = 0;
			const rect = element.getBoundingClientRect();
			const viewport = window.innerHeight;
			const progress = Math.max(
				-1,
				Math.min(1, (viewport * 0.5 - rect.top) / (viewport * 0.8)),
			);
			element.style.setProperty("--parallax", progress.toFixed(3));
		};

		const handleScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, [reduced]);

	return (
		<section
			aria-label="Polaroid gallery"
			className="polaroid-life polaroid-life--ready"
			ref={containerRef}
		>
			<div className="polaroid-life__hint-wrap">
				<span className="polaroid-life__hint">
					Drag, click, or horizontal scroll
				</span>
			</div>

			<div
				aria-label="Project polaroids, scroll horizontally"
				className={`polaroid-life__track ${
					isDragging ? "polaroid-life__track--dragging" : ""
				}`}
				onPointerCancel={onPointerUp}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				ref={trackRef}
				role="region"
				tabIndex={0}
			>
				<div className="polaroid-life__scatter">
					{polaroids.map((polaroid, index) => {
						const base = `/media/polaroids/${polaroid.slug}`;
						const sizes =
							"(max-width: 720px) 210px, (max-width: 1100px) 220px, 230px";

						return (
							<figure
								className="polaroid polaroid-intro-card polaroid-intro-card--interactive"
								key={polaroid.slug}
								style={
									{
										"--intro-rot": `${polaroid.rotation}deg`,
										"--intro-y": `${polaroid.offsetY}px`,
										"--item-index": index,
									} as CSSProperties
								}
							>
								<div className="polaroid-intro-card__bob">
									<div className="polaroid-intro-card__frame">
										<div className="polaroid-intro-card__image-slot">
											<picture>
												<source
													sizes={sizes}
													srcSet={`${base}-480.avif 480w, ${base}-960.avif 960w`}
													type="image/avif"
												/>
												<source
													sizes={sizes}
													srcSet={`${base}-480.webp 480w, ${base}-960.webp 960w`}
													type="image/webp"
												/>
												<img
													alt={polaroid.alt}
													className="polaroid-intro-card__image"
													decoding="async"
													draggable={false}
													height={300}
													loading={index < 3 ? "eager" : "lazy"}
													src={`${base}-480.webp`}
													width={210}
												/>
											</picture>
										</div>
										<figcaption className="polaroid-intro-card__caption">
											{polaroid.caption}
										</figcaption>
									</div>
								</div>
							</figure>
						);
					})}
				</div>
			</div>
		</section>
	);
}
