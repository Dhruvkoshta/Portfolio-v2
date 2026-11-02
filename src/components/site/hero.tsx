import { useEffect, useState } from "react";
import { site } from "~/lib/site";
import { useReducedMotion } from "~/lib/use-reduced-motion";
import { FlagIndia } from "./icons";
import { PolaroidCollage } from "./polaroid-collage";

const role = "Software Engineer";
const flips: Record<number, string> = {
	1: "0", // o -> 0
	2: "ƒ", // f -> ƒ
	5: "α", // a -> α
	7: "ε", // e -> ε
	9: "∈", // E -> ∈
	14: "ε", // e -> ε
	15: "ε", // e -> ε
};

function RoleLine() {
	const reduced = useReducedMotion();
	const [flipped, setFlipped] = useState(false);

	useEffect(() => {
		if (reduced) return;

		let timeout: ReturnType<typeof setTimeout>;
		const interval = setInterval(() => {
			setFlipped(true);
			timeout = setTimeout(() => setFlipped(false), 1200);
		}, 5000);

		return () => {
			clearInterval(interval);
			clearTimeout(timeout);
		};
	}, [reduced]);

	return (
		<span
			aria-hidden="true"
			className="role-line"
			onMouseEnter={() => setFlipped(true)}
			onMouseLeave={() => setFlipped(false)}
		>
			{role.split("").map((character, index) => (
				<span className="role-line__letter" key={`${character}-${index}`}>
					<span className="role-line__strut">
						{character === " " ? "\u00a0" : character}
					</span>
					{flipped && flips[index] ? (
						<span className="role-line__face">{flips[index]}</span>
					) : null}
				</span>
			))}
		</span>
	);
}

const facts = [
	{
		label: "7 featured projects, from city maps to hazard monitors",
		href: "#featured-projects",
		external: false,
	},
	{
		label: "34 public repositories on GitHub",
		href: site.socials.github,
		external: true,
	},
	{
		label: "Patent granted for an IoT hazard monitoring system",
		href: "#featured-projects",
		external: false,
	},
	{
		label: "Full-stack work across TypeScript, C++, and systems",
		href: "#skills",
		external: false,
	},
	{
		label: "Based in India, building for the web",
		href: "#contact",
		external: false,
	},
	{
		label: "Open to interesting problems and collaborations",
		href: `mailto:${site.email}`,
		external: false,
	},
] as const;

export function Hero() {
	return (
		<section aria-labelledby="hero-title" className="hero" id="me">
			<div className="hero__portrait">
				<picture>
					<source
						sizes="(max-width: 600px) 132px, 176px"
						srcSet="/media/portrait/dhruv-dither-360.avif 360w, /media/portrait/dhruv-dither-480.avif 480w, /media/portrait/dhruv-dither-720.avif 720w"
						type="image/avif"
					/>
					<source
						sizes="(max-width: 600px) 132px, 176px"
						srcSet="/media/portrait/dhruv-dither-360.webp 360w, /media/portrait/dhruv-dither-480.webp 480w, /media/portrait/dhruv-dither-720.webp 720w"
						type="image/webp"
					/>
					<img
						alt="A dithered line portrait of Dhruv Koshta."
						decoding="async"
						fetchPriority="high"
						height={399}
						loading="eager"
						src="/media/portrait/dhruv-dither-360.webp"
						width={360}
					/>
				</picture>

				{/* 4 corner crosshairs around portrait */}
				<span aria-hidden="true" className="hero__portrait-plus hero__portrait-plus--tl">
					+
				</span>
				<span aria-hidden="true" className="hero__portrait-plus hero__portrait-plus--tr">
					+
				</span>
				<span aria-hidden="true" className="hero__portrait-plus hero__portrait-plus--bl">
					+
				</span>
				<span aria-hidden="true" className="hero__portrait-plus hero__portrait-plus--br">
					+
				</span>
			</div>

			<h1 className="hero__byline" id="hero-title">
				<span className="sr-only">
					Dhruv Koshta, Software Engineer based in India
				</span>
				<span aria-hidden="true" className="hero__byline-visual">
					<span className="hero__name">Dhruv Koshta</span>
					<span className="hero__paren">(</span>
					<FlagIndia className="hero__flag" />
					<span className="hero__paren">)</span>
					<span className="hero__slash">/</span>
					<span className="hero__role">
						<RoleLine />
					</span>
					<span className="hero__slash">/</span>
					<span className="hero__location">India</span>
				</span>
			</h1>

			<p className="hero__intro">
				Full-stack engineer from India. I build web products, developer tools,
				and hardware systems — from map posters and realtime chat to a
				patent-granted hazard monitor. Still curious, still shipping.
			</p>

			<ul className="hero__facts">
				{facts.map((fact) => (
					<li key={fact.label}>
						<span aria-hidden="true" className="hero__fact-dot" />
						<a
							href={fact.href}
							{...(fact.external
								? { rel: "noreferrer", target: "_blank" }
								: {})}
						>
							{fact.label}
						</a>
					</li>
				))}
			</ul>

			<PolaroidCollage />
		</section>
	);
}
