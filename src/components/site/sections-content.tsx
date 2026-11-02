import { useState, type ReactNode } from "react";
import { ArrowUpRightIcon, PrinterIcon } from "./icons";
import { site } from "~/lib/site";

/* -------------------------------------------------------------------------
   Shared Accordion Row for Experience, Other Projects, etc.
------------------------------------------------------------------------- */

type AccordionRowProps = {
	title: string;
	subtitle?: string;
	flair?: string;
	meta: string;
	children: ReactNode;
	defaultOpen?: boolean;
};

export function AccordionRow({
	title,
	subtitle,
	flair,
	meta,
	children,
	defaultOpen = false,
}: AccordionRowProps) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<li className="idx__row">
			<div className="idx__grid">
				<button
					aria-expanded={isOpen}
					className="idx__hit"
					onClick={() => setIsOpen((prev) => !prev)}
					type="button"
				>
					<span className="sr-only">Toggle details for {title}</span>
				</button>

				<span className="idx__details">
					<span className="idx__title">
						<span className="idx__title-text">{title}</span>
					</span>
					{subtitle ? <span className="idx__sub">{subtitle}</span> : null}
				</span>

				<span aria-hidden="true" className="idx__leader" />

				<div className="idx__trail">
					{flair ? <span className="idx__flair">{flair}</span> : null}
					<span className="idx__meta">{meta}</span>
				</div>

				<button
					aria-hidden="true"
					className="idx__plus-btn"
					onClick={() => setIsOpen((prev) => !prev)}
					tabIndex={-1}
					type="button"
				>
					{isOpen ? "−" : "+"}
				</button>
			</div>

			{isOpen ? <div className="idx__panel">{children}</div> : null}
		</li>
	);
}

/* -------------------------------------------------------------------------
   01. Experience Section
------------------------------------------------------------------------- */

export function ExperienceSection() {
	return (
		<div className="idx">
			<ul aria-label="Experience history" className="idx__list">
				<AccordionRow
					defaultOpen
					flair="Founder / Lead"
					meta="2023 — present"
					subtitle="Independent Software & Systems Engineer"
					title="Full-Stack & Systems Engineering"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Architected and shipped production web applications, high-throughput
							proxy services, and developer tooling. Built CartoNoir (minimalist
							vector map generation across 18 artistic themes), VibeLink
							(real-time chat with Redis and Socket.io), and Anonymus.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">Next.js</span>
							<span className="idx__tag">TypeScript</span>
							<span className="idx__tag">React</span>
							<span className="idx__tag">Node.js</span>
							<span className="idx__tag">Express</span>
							<span className="idx__tag">PostgreSQL</span>
							<span className="idx__tag">Drizzle ORM</span>
							<span className="idx__tag">Docker</span>
							<span className="idx__tag">Redis</span>
						</div>
						<div className="idx__foot">
							<a
								className="idx__link"
								href={site.socials.github}
								rel="noreferrer"
								target="_blank"
							>
								GitHub Profile
								<ArrowUpRightIcon size={12} />
							</a>
						</div>
					</div>
				</AccordionRow>

				<AccordionRow
					defaultOpen
					flair="Patent Granted ✦"
					meta="2023 — 2024"
					subtitle="Lead Researcher & Hardware Architect"
					title="IoT Hazard Monitoring Platform"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Designed and patented an end-to-end multi-hazard monitoring system
							detecting fire, flood levels, and seismic activity. Integrated
							ESP32 microcontrollers with long-range LoRa wireless mesh, local
							SQLite buffering, and an interactive React web dashboard with Web
							Serial hardware telemetry.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">Patent Granted</span>
							<span className="idx__tag">ESP32</span>
							<span className="idx__tag">LoRa</span>
							<span className="idx__tag">React</span>
							<span className="idx__tag">Web Serial</span>
							<span className="idx__tag">Socket.io</span>
							<span className="idx__tag">Node.js</span>
						</div>
						<div className="idx__foot">
							<a
								className="idx__link"
								href="https://github.com/Dhruvkoshta/Monitoring-System"
								rel="noreferrer"
								target="_blank"
							>
								Repository
								<ArrowUpRightIcon size={12} />
							</a>
						</div>
					</div>
				</AccordionRow>

				<AccordionRow
					flair="Client Projects"
					meta="2022 — 2024"
					subtitle="Frontend & Full-Stack Developer"
					title="Freelance Design & Web Engineering"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Delivered performant client web solutions, custom dashboards, and
							responsive product experiences. Focused on component modularity,
							type safety, and crisp interaction design.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">React</span>
							<span className="idx__tag">Next.js</span>
							<span className="idx__tag">Tailwind CSS</span>
							<span className="idx__tag">REST APIs</span>
						</div>
					</div>
				</AccordionRow>

				<AccordionRow
					flair="B.Tech"
					meta="2022 — present"
					subtitle="Electronics & Communication Engineering"
					title="Engineering Degree Coursework"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Deepening understanding of low-level hardware-software boundaries:
							computer architecture, microprocessors, signal processing,
							networking fundamentals, and embedded C/C++ firmware.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">C</span>
							<span className="idx__tag">C++</span>
							<span className="idx__tag">Assembly</span>
							<span className="idx__tag">Microcontrollers</span>
							<span className="idx__tag">Networking</span>
						</div>
					</div>
				</AccordionRow>
			</ul>
		</div>
	);
}

/* -------------------------------------------------------------------------
   02. By the Numbers Section
------------------------------------------------------------------------- */

const stats = [
	{ label: "Patent granted for IoT Hazard Monitoring System", value: "1", href: "#featured-projects" },
	{ label: "Featured software and hardware projects shipped", value: "7", href: "#featured-projects" },
	{ label: "Public open-source repositories on GitHub", value: "34", href: site.socials.github },
	{ label: "Production languages and frameworks across stack", value: "10+", href: "#skills" },
	{ label: "Artistic themes engineered for CartoNoir map generator", value: "18", href: "https://github.com/Dhruvkoshta/CartoNoir" },
	{ label: "Lighthouse mobile audit score across all categories", value: "100%", href: "#" },
] as const;

export function NumbersSection() {
	return (
		<div className="idx">
			<ul aria-label="Key statistics" className="idx__list">
				{stats.map((stat) => (
					<li className="idx__row idx__row--stat" key={stat.label}>
						<div className="idx__grid">
							<span className="idx__details">
								<a
									className="idx__title-text text-link"
									href={stat.href}
									{...(stat.href.startsWith("http")
										? { rel: "noreferrer", target: "_blank" }
										: {})}
								>
									{stat.label}
								</a>
							</span>
							<span aria-hidden="true" className="idx__leader" />
							<div className="idx__trail">
								<span className="idx__stat-val">{stat.value}</span>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

/* -------------------------------------------------------------------------
   03. Blog Section
------------------------------------------------------------------------- */

const articles = [
	{
		title: "Building an IoT Hazard Monitor with ESP32, LoRa, and Web Serial",
		category: "Hardware & IoT",
		year: "2024",
		url: site.socials.notes,
	},
	{
		title: "Writing a Multi-Threaded HTTP Proxy Server in C from Scratch",
		category: "Systems & C",
		year: "2023",
		url: site.socials.notes,
	},
	{
		title: "Minimalist Vector Map Poster Generation with Canvas and SVG",
		category: "Web & Graphics",
		year: "2024",
		url: site.socials.notes,
	},
];

export function BlogSection() {
	return (
		<div className="blog-section">
			<div className="ed-callout">
				<div className="ed-callout__copy">
					<p className="eyebrow">Off-site / notes.dhruvkoshta.me</p>
					<p>Essays, working notes, and engineering deep dives.</p>
				</div>
				<a
					className="text-link"
					href={site.socials.notes}
					rel="noreferrer"
					target="_blank"
				>
					Read all notes
					<ArrowUpRightIcon aria-hidden="true" size={13} strokeWidth={1.75} />
				</a>
			</div>

			<ul aria-label="Articles list" className="idx__list" style={{ marginTop: "16px" }}>
				{articles.map((art) => (
					<li className="idx__row" key={art.title}>
						<div className="idx__grid">
							<span className="idx__details">
								<a
									className="idx__title-text text-link"
									href={art.url}
									rel="noreferrer"
									target="_blank"
								>
									{art.title}
								</a>
							</span>
							<span aria-hidden="true" className="idx__leader" />
							<div className="idx__trail">
								<span className="idx__flair">{art.category}</span>
								<span className="idx__meta">{art.year}</span>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

/* -------------------------------------------------------------------------
   04. Featured Projects Section
------------------------------------------------------------------------- */

type FeaturedProject = {
	title: string;
	year: string;
	desc: string;
	tags: string[];
	image: string;
	patent?: boolean;
	github?: string;
	website?: string;
};

const featuredProjects: FeaturedProject[] = [
	{
		title: "CartoNoir: Minimalist City Map Poster Generator",
		year: "2024",
		desc: "Full-stack web application that generates beautiful, minimalist map posters for any city in the world. Choose from 18 unique artistic themes and create stunning print-ready artwork in minutes.",
		tags: ["React", "Docker", "Node.js", "Express", "AWS S3", "Python"],
		image: "/media/polaroids/cartonoir-480.webp",
		github: "https://github.com/Dhruvkoshta/CartoNoir",
	},
	{
		title: "IoT Hazard Monitoring System",
		year: "2024",
		desc: "A comprehensive IoT platform designed to detect fire, floods, and earthquakes using ESP32 and LoRa. Features a Node.js backend for telemetry logging and an interactive React dashboard with Web Serial hardware support.",
		tags: ["ESP32", "LoRa", "Node.js", "React", "SQLite", "Socket.io", "Drizzle"],
		image: "/media/polaroids/hazard-480.webp",
		patent: true,
		github: "https://github.com/Dhruvkoshta/Monitoring-System",
	},
	{
		title: "Rayfall: 2D Arcade Shooter in C++",
		year: "2023",
		desc: "Fast-paced 2D arcade shooter game developed in C++ using Raylib and GLSL shaders. Features custom collision detection, particle physics, and an in-game upgrade shop.",
		tags: ["C++", "Raylib", "GLSL", "CMake"],
		image: "/media/polaroids/rayfall-480.webp",
		github: "https://github.com/Dhruvkoshta/Rayfall",
	},
	{
		title: "ProctoAI: AI-Powered Academic Proctoring",
		year: "2024",
		desc: "An AI-powered proctoring platform ensuring academic integrity through real-time face recognition, room scanning, and browser locking, featuring a comprehensive instructor dashboard and coding environment.",
		tags: ["Next.js", "TypeScript", "tRPC", "PostgreSQL", "Drizzle", "Tailwind CSS"],
		image: "/media/polaroids/proctoai-480.webp",
		github: "https://github.com/Dhruvkoshta/TerminalTitans",
		website: "https://terminal-titans-web.vercel.app/",
	},
	{
		title: "VibeLink: Real-Time Community Chat",
		year: "2024",
		desc: "A modern, real-time chat platform connecting users through private and public channels. Features WebSocket streaming, Redis pub/sub messaging, and PostgreSQL database persistence.",
		tags: ["TypeScript", "Express", "Redis", "PostgreSQL", "Socket.io", "Tailwind CSS"],
		image: "/media/polaroids/vibelink-480.webp",
		github: "https://github.com/Dhruvkoshta/VibeLink",
		website: "https://vibelink.dhruvkoshta.dev",
	},
];

export function FeaturedProjectsSection() {
	return (
		<div className="wk">
			{featuredProjects.map((project) => (
				<article className="wk__card" key={project.title}>
					<div className="wk__media">
						<img
							alt={project.title}
							className="wk__img"
							decoding="async"
							loading="lazy"
							src={project.image}
						/>
						<span aria-hidden="true" className="wk__pluses">
							<span className="wk__plus wk__plus--tl">+</span>
							<span className="wk__plus wk__plus--tr">+</span>
							<span className="wk__plus wk__plus--bl">+</span>
							<span className="wk__plus wk__plus--br">+</span>
						</span>
					</div>

					<div className="wk__caption">
						<div className="wk__header">
							<span className="wk__year">{project.year}</span>
							<h3 className="wk__title">
								{project.title}
								{project.patent ? (
									<span className="wk__badge">Patent Granted</span>
								) : null}
							</h3>
						</div>

						<p className="wk__desc">{project.desc}</p>

						<div className="wk__tags">
							{project.tags.map((t) => (
								<span className="idx__tag" key={t}>
									{t}
								</span>
							))}
						</div>

						<div className="wk__links">
							{project.github ? (
								<a
									className="idx__link"
									href={project.github}
									rel="noreferrer"
									target="_blank"
								>
									GitHub
									<ArrowUpRightIcon size={12} />
								</a>
							) : null}
							{project.website ? (
								<a
									className="idx__link"
									href={project.website}
									rel="noreferrer"
									target="_blank"
								>
									Live Demo
									<ArrowUpRightIcon size={12} />
								</a>
							) : null}
						</div>
					</div>
				</article>
			))}
		</div>
	);
}

/* -------------------------------------------------------------------------
   05. Other Projects Section
------------------------------------------------------------------------- */

export function OtherProjectsSection() {
	return (
		<div className="idx">
			<ul aria-label="Other projects list" className="idx__list">
				<AccordionRow
					flair="Live App"
					meta="2024"
					subtitle="Anonymous Messaging with AI Summaries"
					title="Anonymus"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							An anonymous feedback and messaging platform that allows users to
							receive or send messages without revealing their identity or email.
							Includes AI-powered message sentiment and summary features via
							Gemini API.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">Next.js</span>
							<span className="idx__tag">TypeScript</span>
							<span className="idx__tag">Gemini API</span>
							<span className="idx__tag">Shadcn UI</span>
							<span className="idx__tag">Tailwind CSS</span>
						</div>
						<div className="idx__foot">
							<a
								className="idx__link"
								href="https://github.com/Dhruvkoshta/Anonymus"
								rel="noreferrer"
								target="_blank"
							>
								GitHub
								<ArrowUpRightIcon size={12} />
							</a>
							<a
								className="idx__link"
								href="https://anonymus.dhruvkoshta.dev"
								rel="noreferrer"
								target="_blank"
							>
								Live Site
								<ArrowUpRightIcon size={12} />
							</a>
						</div>
					</div>
				</AccordionRow>

				<AccordionRow
					flair="Systems"
					meta="2023"
					subtitle="High-Performance Reverse Proxy & Caching"
					title="C-Powered Proxy Web Server"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							A lightweight, multi-threaded reverse proxy and caching web server
							written from scratch in C. Built using POSIX threads, semaphores,
							and socket programming to route web traffic and handle concurrent
							requests with high efficiency.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">C</span>
							<span className="idx__tag">Pthreads</span>
							<span className="idx__tag">Semaphores</span>
							<span className="idx__tag">Sockets</span>
							<span className="idx__tag">HTTP Caching</span>
						</div>
						<div className="idx__foot">
							<a
								className="idx__link"
								href="https://github.com/Dhruvkoshta/Web-Server-in-C"
								rel="noreferrer"
								target="_blank"
							>
								GitHub
								<ArrowUpRightIcon size={12} />
							</a>
						</div>
					</div>
				</AccordionRow>

				<AccordionRow
					flair="Portfolio"
					meta="2023"
					subtitle="Interactive 3D WebGL Globe & Showcase"
					title="Portfolio Website v2"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Second portfolio iteration built with Next.js, Framer Motion, and
							a WebGL Cobe globe visualizing real-time viewer locations and
							interactive project cards.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">Next.js</span>
							<span className="idx__tag">React</span>
							<span className="idx__tag">WebGL</span>
							<span className="idx__tag">Framer Motion</span>
						</div>
					</div>
				</AccordionRow>
			</ul>
		</div>
	);
}

/* -------------------------------------------------------------------------
   06. Education Section
------------------------------------------------------------------------- */

export function EducationSection() {
	return (
		<div className="tkt">
			<article className="tkt-card">
				<div className="tkt-card__body">
					<div className="tkt-card__head">
						<div>
							<h3 className="tkt-card__title">
								B.Tech in Electronics & Communication Engineering
								<span className="tkt-card__flag"> (🇮🇳)</span>
							</h3>
							<p className="tkt-card__degree">
								Hardware-Software Systems & Computer Science Track
							</p>
							<p className="tkt-card__period">2022 — present</p>
						</div>
					</div>

					<div className="tkt-card__classes">
						<p className="eyebrow" style={{ marginTop: "12px", marginBottom: "8px" }}>
							Selected Coursework & Competencies
						</p>
						<ul className="tkt-card__list">
							<li>Computer Architecture & Microprocessors (8085 / 8086 / ARM)</li>
							<li>Data Structures & Algorithms in C / C++</li>
							<li>Embedded Systems & Microcontroller Interfacing (ESP32 / AVR)</li>
							<li>Wireless Communication Protocols & LoRa Telemetry</li>
							<li>Operating Systems & Concurrency (Threads, Semaphores)</li>
							<li>Database Management Systems & SQL</li>
							<li>Digital Signal Processing & Fourier Analysis</li>
						</ul>
					</div>
				</div>
			</article>
		</div>
	);
}

/* -------------------------------------------------------------------------
   07. Skills Section
------------------------------------------------------------------------- */

const skillCategories = [
	{
		label: "Frontend",
		items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
	},
	{
		label: "Backend & Systems",
		items: ["Node.js", "Express", "PostgreSQL", "Drizzle ORM", "Redis", "Socket.io", "Nginx"],
	},
	{
		label: "Languages",
		items: ["TypeScript", "JavaScript", "C", "C++", "Python", "Assembly (x86/ARM)"],
	},
	{
		label: "Tools, DevOps & Hardware",
		items: ["Docker", "Linux / POSIX", "Git", "ESP32", "LoRa", "Neovim", "AWS S3"],
	},
];

export function SkillsSection() {
	return (
		<div className="skills-container">
			<ul aria-label="Core competencies" className="sk">
				<li className="sk__row">
					<div className="sk__label">
						<span className="sk__no">001</span>
						<h3 className="sk__name">Specialization</h3>
					</div>
					<p className="sk__body">
						Full-stack web engineering, real-time communications, and
						hardware-to-cloud IoT architectures.
					</p>
				</li>
				<li className="sk__row">
					<div className="sk__label">
						<span className="sk__no">002</span>
						<h3 className="sk__name">Technology Stack</h3>
					</div>
					<p className="sk__body">
						Comfortable across TypeScript, modern React, C, C++, Node.js, and
						PostgreSQL with Drizzle ORM.
					</p>
				</li>
				<li className="sk__row">
					<div className="sk__label">
						<span className="sk__no">003</span>
						<h3 className="sk__name">Systems & Networking</h3>
					</div>
					<p className="sk__body">
						Experience with socket programming, multi-threaded C proxies,
						semaphores, and LoRa long-range wireless telemetry.
					</p>
				</li>
				<li className="sk__row">
					<div className="sk__label">
						<span className="sk__no">004</span>
						<h3 className="sk__name">Hardware-Software Codesign</h3>
					</div>
					<p className="sk__body">
						Granted patent for IoT hazard monitoring platform: combining sensors,
						microcontrollers, and web dashboards.
					</p>
				</li>
				<li className="sk__row">
					<div className="sk__label">
						<span className="sk__no">005</span>
						<h3 className="sk__name">0→1 Product Velocity</h3>
					</div>
					<p className="sk__body">
						Taking ideas from circuit prototypes and scratch repositories to
						shipped web applications.
					</p>
				</li>
			</ul>

			<div className="skills-grid">
				{skillCategories.map((cat) => (
					<div className="skills-category" key={cat.label}>
						<h4 className="eyebrow">{cat.label}</h4>
						<div className="skills-tags">
							{cat.items.map((item) => (
								<span className="skills-chip" key={item}>
									{item}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

/* -------------------------------------------------------------------------
   08. Ethical Hacking Section
------------------------------------------------------------------------- */

export function EthicalHackingSection() {
	return (
		<div className="idx">
			<div className="ed-callout">
				<div className="ed-callout__copy">
					<p className="eyebrow">Responsible Research & Security</p>
					<p>
						Practical security research focusing on authentication hardening,
						authorization boundary audits, and hardware security across
						wireless sensor telemetry.
					</p>
				</div>
				<span className="idx__flair">Responsible Disclosure</span>
			</div>
			<ul className="idx__list" style={{ marginTop: "16px" }}>
				<li className="idx__row">
					<div className="idx__grid">
						<span className="idx__details">
							<span className="idx__title-text">
								LoRa Wireless Mesh Telemetry Security & Integrity
							</span>
						</span>
						<span aria-hidden="true" className="idx__leader" />
						<div className="idx__trail">
							<span className="idx__meta">Hardware Security</span>
						</div>
					</div>
				</li>
				<li className="idx__row">
					<div className="idx__grid">
						<span className="idx__details">
							<span className="idx__title-text">
								Web Application Authorization & Rate Limiting Audits
							</span>
						</span>
						<span aria-hidden="true" className="idx__leader" />
						<div className="idx__trail">
							<span className="idx__meta">Application Security</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
}

/* -------------------------------------------------------------------------
   09. Competitions Section
------------------------------------------------------------------------- */

export function CompetitionsSection() {
	return (
		<div className="idx">
			<ul aria-label="Competitions & Hackathons" className="idx__list">
				<AccordionRow
					defaultOpen
					flair="Patent Granted"
					meta="2024"
					subtitle="National Intellectual Property Office"
					title="IoT Hazard Monitoring System Patent"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Filed and granted patent for multi-hazard monitoring combining
							sensor fusion (flame, gas, flood, tremor) and decentralized LoRa
							broadcast protocols with real-time web telemetry.
						</p>
					</div>
				</AccordionRow>

				<AccordionRow
					flair="36h Hackathon"
					meta="2024"
					subtitle="Terminal Titans"
					title="ProctoAI — Academic Integrity Engine"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Engineered full-stack proctoring system with real-time biometric
							verification, room environment auditing, and instructor
							oversight dashboard under hackathon deadline.
						</p>
					</div>
				</AccordionRow>
			</ul>
		</div>
	);
}

/* -------------------------------------------------------------------------
   10. What Others Say Section
------------------------------------------------------------------------- */

export function WhatOthersSaySection() {
	return (
		<div className="testimonials">
			<blockquote className="quote-card">
				<p className="quote-card__text">
					“Dhruv has a rare balance of deep curiosity for low-level systems and
					fast velocity in shipping modern web applications. His dedication to
					understanding how hardware and software integrate is evident in every
					project he builds.”
				</p>
				<footer className="quote-card__author">
					— Engineering Peer & Collaborator
				</footer>
			</blockquote>
		</div>
	);
}

/* -------------------------------------------------------------------------
   11. Portfolio Evolution Section
------------------------------------------------------------------------- */

export function PortfolioEvolutionSection() {
	return (
		<div className="evolution-grid">
			<div className="evolution-card">
				<span className="eyebrow">2022</span>
				<h3 className="evolution-card__title">v1: HTML, CSS & JavaScript</h3>
				<p className="evolution-card__desc">
					First portfolio website. Static HTML, custom CSS animations, and pure
					JavaScript. The foundation of learning web design.
				</p>
			</div>

			<div className="evolution-card">
				<span className="eyebrow">2023</span>
				<h3 className="evolution-card__title">v2: Next.js & WebGL Globe</h3>
				<p className="evolution-card__desc">
					Modern React and Next.js redesign featuring an interactive 3D WebGL
					globe, dark mode, and Framer Motion micro-interactions.
				</p>
			</div>

			<div className="evolution-card evolution-card--current">
				<span className="eyebrow" style={{ color: "var(--accent-hover)", fontWeight: 600 }}>
					2026 (Current)
				</span>
				<h3 className="evolution-card__title">
					v3: TanStack Start on Cloudflare
				</h3>
				<p className="evolution-card__desc">
					Inspired by the Matthew Trent aesthetic: hairline editorial grid,
					instant edge SSR, 100/100 Lighthouse performance, zero layout shifts.
				</p>
			</div>
		</div>
	);
}

/* -------------------------------------------------------------------------
   12. Spotify Section
------------------------------------------------------------------------- */

const playlists = [
	{ title: "Deep Focus & Flow State", count: "120 tracks", tag: "Focus" },
	{ title: "Late Night Coding & Systems", count: "85 tracks", tag: "Vibes" },
	{ title: "Electronic & Ambient Synth", count: "64 tracks", tag: "Ambient" },
	{ title: "High-Energy Debugging", count: "90 tracks", tag: "Energy" },
];

export function SpotifySection() {
	return (
		<div className="idx">
			<div className="ed-callout">
				<div className="ed-callout__copy">
					<p className="eyebrow">Audio & Soundtracks</p>
					<p>Music and ambient soundscapes that soundtrack the engineering work.</p>
				</div>
				<span className="idx__flair">Playlists</span>
			</div>

			<ul aria-label="Curated playlists" className="idx__list" style={{ marginTop: "16px" }}>
				{playlists.map((pl) => (
					<li className="idx__row" key={pl.title}>
						<div className="idx__grid">
							<span className="idx__details">
								<span className="idx__title-text">{pl.title}</span>
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
	);
}

/* -------------------------------------------------------------------------
   13. Misc Section
------------------------------------------------------------------------- */

export function MiscSection() {
	return (
		<div className="idx">
			<ul aria-label="Daily tools and orbit" className="idx__list">
				<AccordionRow
					defaultOpen
					flair="Daily Drivers"
					meta="Tools"
					subtitle="Hardware & Software Environment"
					title="Developer Setup"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Operating System: Arch Linux / Debian. Editor: Neovim & VS Code.
							Terminal: Alacritty / Ghostty with Tmux. Shell: Bash / Zsh.
							Keyboard: Mechanical with tactile switches.
						</p>
					</div>
				</AccordionRow>

				<AccordionRow
					flair="Collaborators"
					meta="Network"
					subtitle="Founders, creators & friends"
					title="Someone in My Orbit"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Cracked engineers, hardware tinkerers, and open-source builders
							whose projects and portfolios are always worth the detour.
						</p>
					</div>
				</AccordionRow>
			</ul>
		</div>
	);
}

/* -------------------------------------------------------------------------
   14. As A Kid Section
------------------------------------------------------------------------- */

export function AsAKidSection() {
	return (
		<div className="as-a-kid-block">
			<p className="hero__intro" style={{ marginTop: 0 }}>
				I spent my childhood taking apart toy gadgets, exploring broken radios,
				and playing football and cricket outdoors. Long before writing my first
				line of code, I had an insatiable obsession with understanding how
				machines, circuits, and systems work from the inside out. That childhood
				curiosity directly led me to electronics, microcontrollers, and software
				engineering.
			</p>
		</div>
	);
}

/* -------------------------------------------------------------------------
   15. Contact Receipt Section
------------------------------------------------------------------------- */

export function ContactReceiptSection() {
	const [message, setMessage] = useState("");
	const [replyTo, setReplyTo] = useState("");
	const [sent, setSent] = useState(false);

	const handlePrint = (e: React.FormEvent) => {
		e.preventDefault();
		if (!message.trim()) return;
		const mailtoUrl = `mailto:${site.email}?subject=Message from ${encodeURIComponent(replyTo || "Portfolio Visitor")}&body=${encodeURIComponent(message)}`;
		window.location.href = mailtoUrl;
		setSent(true);
	};

	return (
		<div className="receipt-container">
			<div className="receipt">
				<div className="receipt__head">
					<p className="receipt__title">{site.name}</p>
					<p className="receipt__subtitle">{site.url.replace("https://", "")}</p>
					<div className="receipt__divider" />
					<div className="receipt__meta-row">
						<span>ORDER #DK-2026</span>
						<span>CLERK: Dhruv</span>
					</div>
					<div className="receipt__meta-row">
						<span>DATE: {new Date().toLocaleDateString("en-US")}</span>
						<span>TIME: {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
					</div>
					<div className="receipt__divider" />
				</div>

				<form className="receipt__body" onSubmit={handlePrint}>
					<div className="receipt__item">
						<label htmlFor="receipt-msg" className="receipt__label">
							<span>1 × Message</span>
							<span className="receipt__count">{message.length}/1000</span>
						</label>
						<textarea
							id="receipt-msg"
							className="receipt__textarea"
							maxLength={1000}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Write a message, project inquiry, or just say hello..."
							required
							rows={4}
							value={message}
						/>
					</div>

					<div className="receipt__item">
						<label htmlFor="receipt-reply" className="receipt__label">
							<span>1 × Reply-to</span>
							<span className="receipt__count">{replyTo.length}/100</span>
						</label>
						<input
							id="receipt-reply"
							className="receipt__input"
							maxLength={100}
							onChange={(e) => setReplyTo(e.target.value)}
							placeholder="Your email or handle"
							type="text"
							value={replyTo}
						/>
					</div>

					<div className="receipt__divider" />

					<div className="receipt__total">
						<span>Total Due:</span>
						<span>Good Conversation</span>
					</div>

					<button className="receipt__btn" type="submit">
						<PrinterIcon size={14} />
						{sent ? "Opening Mail Client..." : "Print & Send Message"}
					</button>

					<p className="receipt__foot">
						Direct email:{" "}
						<a className="text-link" href={`mailto:${site.email}`}>
							{site.email}
						</a>
					</p>
				</form>
				<div className="receipt__tear" />
			</div>
		</div>
	);
}
