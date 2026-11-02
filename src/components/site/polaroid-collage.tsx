import { useEffect, useRef, type CSSProperties } from "react";
import { useReducedMotion } from "~/lib/use-reduced-motion";

type Polaroid = {
	slug: string;
	alt: string;
	caption: string;
	rotation: number;
	offset: number;
	depth: number;
	scale: number;
};

const polaroids: readonly Polaroid[] = [
	{
		slug: "cartonoir",
		alt: "CartoNoir map poster of New Delhi",
		caption: "2024 ✦ CartoNoir",
		rotation: -8,
		offset: 30,
		depth: 0.7,
		scale: 1.12,
	},
	{
		slug: "rayfall",
		alt: "Rayfall arcade shooter gameplay",
		caption: "2023 ✦ Rayfall",
		rotation: 6,
		offset: 2,
		depth: 0.4,
		scale: 0.94,
	},
	{
		slug: "proctoai",
		alt: "ProctoAI dashboard and code editor",
		caption: "2024 ✦ ProctoAI",
		rotation: -3,
		offset: 48,
		depth: 0.9,
		scale: 1.02,
	},
	{
		slug: "vibelink",
		alt: "VibeLink realtime chat interface",
		caption: "2024 ✦ VibeLink",
		rotation: 7,
		offset: 14,
		depth: 0.5,
		scale: 1.08,
	},
	{
		slug: "anonymus",
		alt: "Anonymus security dashboard",
		caption: "2024 ✦ Anonymus",
		rotation: -6,
		offset: 40,
		depth: 0.8,
		scale: 0.92,
	},
	{
		slug: "hazard",
		alt: "IoT hazard monitoring dashboard",
		caption: "2024 ✦ Hazard monitor",
		rotation: 5,
		offset: 8,
		depth: 0.6,
		scale: 1.04,
	},
	{
		slug: "webserver",
		alt: "C-powered proxy web server interface",
		caption: "2023 ✦ C proxy server",
		rotation: -5,
		offset: 34,
		depth: 0.75,
		scale: 0.95,
	},
];

export function PolaroidCollage() {
	const ref = useRef<HTMLElement>(null);
	const reduced = useReducedMotion();

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		if (reduced) {
			element.style.setProperty("--parallax", "0");
			return;
		}

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
		<section aria-label="Polaroid gallery" className="polaroid-life" ref={ref}>
			<div
				aria-label="Project polaroids, scroll horizontally"
				className="polaroid-life__track"
				role="group"
				tabIndex={0}
			>
				{polaroids.map((polaroid, index) => {
					const base = `/media/polaroids/${polaroid.slug}`;
					const sizes =
						"(max-width: 720px) 58vw, (max-width: 1100px) 28vw, 250px";

					return (
						<figure
							className="polaroid"
							key={polaroid.slug}
							style={
								{
									"--rot": `${polaroid.rotation}deg`,
									"--offset": polaroid.offset,
									"--depth": polaroid.depth,
									"--scale": polaroid.scale,
								} as CSSProperties
							}
						>
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
									className="polaroid__image"
									decoding="async"
									height={600}
									loading={index < 4 ? "eager" : "lazy"}
									src={`${base}-480.webp`}
									width={480}
								/>
							</picture>
							<figcaption>{polaroid.caption}</figcaption>
						</figure>
					);
				})}
			</div>
			<p className="polaroid-life__hint">A few frames from the workbench</p>
		</section>
	);
}
