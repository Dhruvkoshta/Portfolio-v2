import { useEffect, useState } from "react";
import { site } from "~/lib/site";
import { useReducedMotion } from "~/lib/use-reduced-motion";
import { FlagIndia } from "./icons";
import { PolaroidCollage } from "./polaroid-collage";

const role = "Full-Stack & Systems Engineer";
const flips: Record<number, string> = {
	1: "µ", // u -> µ
	7: "α", // a -> α
	14: "γ", // y -> γ
	17: "ε", // e -> ε
	21: "∈", // E -> ∈
	26: "ε", // e -> ε
	27: "ε", // e -> ε
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
		label: "Software Intern at Dell Technologies (Enterprise Software Infrastructure)",
		href: "#experience",
		external: false,
	},
	{
		label: "Level 1, 5-Star Freelancer with 50+ full-stack web applications deployed",
		href: "#experience",
		external: false,
	},
	{
		label: "Patent Granted (No. 202441083752) — Multi-Hazard Detection & Alert System",
		href: "#featured-projects",
		external: false,
	},
	{
		label: "1st Place Winner at AI VERSE 2.0 Hackathon (Team Terminal Titans)",
		href: "#competitions",
		external: false,
	},
	{
		label: "B.E. in Electronics & Communication at B.M.S. College of Engineering (CGPA 8.8)",
		href: "#education",
		external: false,
	},
	{
		label: "Official Resume (Sept 2026 PDF)",
		href: site.resumeUrl,
		external: true,
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
					Dhruv Koshta, Full-Stack & Systems Engineer based in Bengaluru, India
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
					<span className="hero__location">Bengaluru, India</span>
				</span>
			</h1>

			<p className="hero__intro">
				Full-Stack & Systems Engineer based in Bengaluru, India. Software intern at
				Dell Technologies, 5-star rated freelancer with 50+ web apps deployed, and
				patent holder for a multi-hazard IoT telemetry platform. Exploring the
				intersection of low-level systems, high-performance backends, and
				hardware telemetry.
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
