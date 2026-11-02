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
				{/* 1. Dell Technologies */}
				<AccordionRow
					defaultOpen
					flair="Software Intern"
					meta="Jun 26 — Aug 26"
					subtitle="Bengaluru, India"
					title="Dell Technologies"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Contributed to enterprise software infrastructure, focusing on
							low-level performance analysis, system integrations, and
							software reliability. Assisted in streamlining core tooling and
							infrastructure workflows, working directly with software
							infrastructure stacks.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">Enterprise Infrastructure</span>
							<span className="idx__tag">Low-Level Performance</span>
							<span className="idx__tag">System Integrations</span>
							<span className="idx__tag">Software Reliability</span>
							<span className="idx__tag">Core Tooling</span>
							<span className="idx__tag">Linux Systems</span>
						</div>
					</div>
				</AccordionRow>

				{/* 2. Freelance */}
				<AccordionRow
					defaultOpen
					flair="Level 1, 5★ Rated"
					meta="2023 — present"
					subtitle="Full-Stack & Systems Engineer (Fiverr & Remote)"
					title="Freelance (Self-Employed)"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Earned Level 1, 5-star rated freelancer status by building and
							deploying 50+ full-stack web applications for international
							clients. Designed end-to-end architectures using Next.js, React,
							Node.js, Express, Python, and SQL databases. Containerized client
							applications with Docker and configured Nginx reverse proxies for
							deployment, caching, and traffic handling.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">50+ Apps Deployed</span>
							<span className="idx__tag">Next.js</span>
							<span className="idx__tag">React</span>
							<span className="idx__tag">Node.js</span>
							<span className="idx__tag">Express</span>
							<span className="idx__tag">Python</span>
							<span className="idx__tag">SQL Databases</span>
							<span className="idx__tag">Docker</span>
							<span className="idx__tag">Nginx Proxies</span>
						</div>
					</div>
				</AccordionRow>

				{/* 3. Patent & Publications */}
				<AccordionRow
					defaultOpen
					flair="Patent Granted ✦"
					meta="Patent 202441083752"
					subtitle="Lead Researcher & Hardware Architect"
					title="Multi-Hazard Detection and Alert System"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Published and granted national patent (Patent No. 202441083752).
							Engineered an end-to-end multi-hazard telemetry pipeline with
							wireless and serial transmission for fault-tolerant sensor streams
							to a central gateway. Developed full-stack React + Node.js
							dashboard ingesting real-time environmental telemetry with threat
							thresholds and instant warning triggers.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">Patent No. 202441083752</span>
							<span className="idx__tag">IoT Telemetry</span>
							<span className="idx__tag">ESP32</span>
							<span className="idx__tag">LoRa Wireless</span>
							<span className="idx__tag">Serial Transmission</span>
							<span className="idx__tag">React</span>
							<span className="idx__tag">Node.js</span>
							<span className="idx__tag">SQLite</span>
							<span className="idx__tag">Sockets</span>
						</div>
						<div className="idx__foot">
							<a
								className="idx__link"
								href="https://github.com/Dhruvkoshta/Monitoring-System"
								rel="noreferrer"
								target="_blank"
							>
								Patent Implementation Repository
								<ArrowUpRightIcon size={12} />
							</a>
						</div>
					</div>
				</AccordionRow>

				{/* 4. Campus Leadership & Coordination */}
				<AccordionRow
					flair="Leadership"
					meta="2023 — 2027"
					subtitle="B.M.S. College of Engineering (Bengaluru)"
					title="PhaseShift & Student Leadership"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Senior Coordinator (Info Dev) for PhaseShift — BMSCE&apos;s
							national annual tech symposium. Junior Coordinator for Utsav
							2025 and Campus Ambassador, organizing technical events and
							leading developer outreach.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">Senior Coordinator</span>
							<span className="idx__tag">PhaseShift (National Symposium)</span>
							<span className="idx__tag">Junior Coordinator (Utsav 2025)</span>
							<span className="idx__tag">Campus Ambassador</span>
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
	{
		label: "Patent granted for Multi-Hazard Detection & Alert System (No. 202441083752)",
		value: "1",
		href: "#featured-projects",
	},
	{
		label: "Full-stack web applications built & deployed for global clients (5★ rated)",
		value: "50+",
		href: "#experience",
	},
	{
		label: "Cumulative Grade Point Average (CGPA) in B.E. ECE at B.M.S. College of Engg",
		value: "8.8",
		href: "#education",
	},
	{
		label: "1st Place Winner at AI VERSE 2.0 Hackathon (Team Terminal Titans)",
		value: "1st",
		href: "#competitions",
	},
	{
		label: "Public open-source repositories and system tools on GitHub",
		value: "34",
		href: site.socials.github,
	},
	{
		label: "Artistic themes engineered for CartoNoir vector map generator",
		value: "18",
		href: "https://github.com/Dhruvkoshta/CartoNoir",
	},
	{
		label: "Lighthouse mobile audit score across Performance, A11y, Best Practices & SEO",
		value: "100%",
		href: "#",
	},
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
		title: "Writing a Multi-Threaded HTTP Proxy Server in C with POSIX Sockets",
		category: "Systems & C",
		year: "2023",
		url: site.socials.notes,
	},
	{
		title: "Real-Time Proctoring Anomaly Detection Pipelines with AI Vision Models",
		category: "AI & Systems",
		year: "2024",
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
	subtitle: string;
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
		title: "ProctoAI",
		subtitle: "AI-Powered Proctoring & Exam Integrity Platform",
		year: "2024",
		desc: "Automated online examination proctoring platform monitoring candidate video feeds to detect unauthorized behavior. Implemented real-time anomaly detection pipelines with low latency and automated incident reporting.",
		tags: ["Next.js", "Python", "OpenCV / AI Vision", "Node.js", "TypeScript", "Tailwind CSS"],
		image: "/media/polaroids/proctoai-480.webp",
		github: "https://github.com/Dhruvkoshta/TerminalTitans",
		website: "https://terminal-titans-web.vercel.app/",
	},
	{
		title: "C-Powered Proxy Web Server",
		subtitle: "Proxy & Traffic Management",
		year: "2023",
		desc: "Lightweight concurrent reverse proxy with dynamic request routing, in-memory caching, and load balancing. Native socket programming and POSIX threads minimize overhead and maximize throughput.",
		tags: ["C", "POSIX Sockets", "HTTP", "Cache Architecture", "Pthreads", "Semaphores"],
		image: "/media/polaroids/webserver-480.webp",
		github: "https://github.com/Dhruvkoshta/Web-Server-in-C",
	},
	{
		title: "Multi-Hazard Detection and Alert System",
		subtitle: "Patent No. 202441083752",
		year: "2024",
		desc: "End-to-end multi-hazard telemetry pipeline with wireless and serial transmission for fault-tolerant sensor streams to a central gateway. Full-stack React + Node.js dashboard ingesting real-time environmental telemetry with threat thresholds and instant warning triggers.",
		tags: ["Patent Granted", "ESP32", "LoRa Wireless", "Serial Protocol", "React", "Node.js", "SQLite"],
		image: "/media/polaroids/hazard-480.webp",
		patent: true,
		github: "https://github.com/Dhruvkoshta/Monitoring-System",
	},
	{
		title: "VibeLink",
		subtitle: "Real-Time Chat Platform",
		year: "2024",
		desc: "Real-time messaging platform with instant bidirectional communication, public channels, and private rooms. Persistent message stores and WebSocket state management ensure synchronized statuses and low-latency delivery.",
		tags: ["React", "Next.js", "Node.js", "WebSockets", "SQL", "Redis"],
		image: "/media/polaroids/vibelink-480.webp",
		github: "https://github.com/Dhruvkoshta/VibeLink",
		website: "https://vibelink.dhruvkoshta.dev",
	},
	{
		title: "CartoNoir",
		subtitle: "Minimalist City Map Poster Generator",
		year: "2024",
		desc: "Full-stack web application that generates beautiful, minimalist map posters for any city in the world across 18 unique artistic themes, creating print-ready high-resolution artwork in minutes.",
		tags: ["React", "Docker", "Node.js", "Express", "Python", "AWS S3"],
		image: "/media/polaroids/cartonoir-480.webp",
		github: "https://github.com/Dhruvkoshta/CartoNoir",
	},
];

export function FeaturedProjectsSection() {
	return (
		<div className="wk">
			{featuredProjects.map((project) => (
				<article className="wk__card" key={project.title}>
					<div className="wk__media">
						<img
							alt={`${project.title} - ${project.subtitle}`}
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
								{project.title}: {project.subtitle}
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
				{/* Anonymus */}
				<AccordionRow
					defaultOpen
					flair="Live App"
					meta="2024"
					subtitle="Secure Anonymous Messaging Platform"
					title="Anonymus"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Anonymous communication stripping metadata and identifiers to
							preserve privacy. Features rate-limiting, secure query validation,
							and input sanitization against malicious traffic and spoofing.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">Next.js</span>
							<span className="idx__tag">Node.js</span>
							<span className="idx__tag">SQL</span>
							<span className="idx__tag">Cryptographic Hashing</span>
							<span className="idx__tag">Metadata Stripping</span>
							<span className="idx__tag">Rate Limiting</span>
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

				{/* Rayfall */}
				<AccordionRow
					flair="Game Dev"
					meta="2023"
					subtitle="Fast-Paced 2D Arcade Game in C++"
					title="Rayfall"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Fast-paced 2D arcade shooter game developed in C++ using Raylib
							and custom GLSL shaders. Features custom collision detection,
							particle physics, and an in-game upgrade shop.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">C++</span>
							<span className="idx__tag">Raylib</span>
							<span className="idx__tag">GLSL Shaders</span>
							<span className="idx__tag">CMake</span>
						</div>
						<div className="idx__foot">
							<a
								className="idx__link"
								href="https://github.com/Dhruvkoshta/Rayfall"
								rel="noreferrer"
								target="_blank"
							>
								GitHub
								<ArrowUpRightIcon size={12} />
							</a>
						</div>
					</div>
				</AccordionRow>

				{/* Portfolio Website v2 */}
				<AccordionRow
					flair="Portfolio"
					meta="2023"
					subtitle="Interactive 3D WebGL Globe & Showcase"
					title="Portfolio Website v2"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Second portfolio iteration built with Next.js, Framer Motion, and
							a WebGL globe visualizing real-time viewer locations and
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
			{/* B.M.S. College of Engineering */}
			<article className="tkt-card">
				<div className="tkt-card__body">
					<div className="tkt-card__head">
						<div>
							<h3 className="tkt-card__title">
								B.M.S. College of Engineering
								<span className="tkt-card__flag"> (🇮🇳 Bengaluru)</span>
							</h3>
							<p className="tkt-card__degree">
								Bachelor of Engineering (B.E.) in Electronics and Communication
								Engineering
							</p>
							<p className="tkt-card__period">
								2023 — 2027 (Expected Aug 2027) • <strong>CGPA 8.8 / 10.0</strong>
							</p>
						</div>
					</div>

					<div className="tkt-card__classes">
						<p
							className="eyebrow"
							style={{ marginTop: "12px", marginBottom: "8px" }}
						>
							Leadership & Campus Roles
						</p>
						<ul className="tkt-card__list">
							<li>
								<strong>Senior Coordinator (Info Dev)</strong>, PhaseShift —
								BMSCE national tech symposium
							</li>
							<li>
								<strong>Junior Coordinator</strong>, Utsav 2025
							</li>
							<li>
								<strong>Campus Ambassador</strong> representing student
								engineering initiatives
							</li>
						</ul>

						<p
							className="eyebrow"
							style={{ marginTop: "14px", marginBottom: "8px" }}
						>
							Core Curriculum & Systems Competencies
						</p>
						<ul className="tkt-card__list">
							<li>Computer Architecture & Microprocessors (8085 / 8086 / ARM)</li>
							<li>Data Structures & Algorithms in C / C++</li>
							<li>Operating Systems, POSIX Threads, Sockets & Concurrency</li>
							<li>Embedded Systems & Microcontroller Interfacing (ESP32 / AVR)</li>
							<li>Wireless Communication Protocols, Serial Data & LoRa Telemetry</li>
							<li>Database Management Systems & Relational SQL</li>
							<li>Digital Signal Processing & Signals and Systems</li>
						</ul>
					</div>
				</div>
			</article>

			{/* Little Kingdom School */}
			<article className="tkt-card" style={{ marginTop: "16px" }}>
				<div className="tkt-card__body">
					<div className="tkt-card__head">
						<div>
							<h3 className="tkt-card__title">
								Little Kingdom School
								<span className="tkt-card__flag"> (🇮🇳 Jabalpur)</span>
							</h3>
							<p className="tkt-card__degree">
								Senior Secondary • High School Diploma
							</p>
							<p className="tkt-card__period">
								Jabalpur, Madhya Pradesh, India • <strong>80%</strong>
							</p>
						</div>
					</div>
					<div className="tkt-card__classes">
						<p className="idx__body" style={{ marginTop: "8px" }}>
							Strong academic focus in Mathematics, Physics, and foundational
							Computer Science. The playground where tinkering with radios and
							circuits first sparked a passion for engineering.
						</p>
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
		label: "Programming Languages",
		items: ["C", "C++", "TypeScript", "JavaScript", "Python", "SQL", "Assembly"],
	},
	{
		label: "Web & Frameworks",
		items: ["Next.js", "React.js", "Node.js", "Express.js", "WebSockets", "Tailwind CSS"],
	},
	{
		label: "Systems & DevOps",
		items: [
			"Docker",
			"Kubernetes",
			"Nginx",
			"Arch Linux",
			"Linux Kernel Tools",
			"Neovim",
			"Git",
		],
	},
	{
		label: "Hardware & Protocols",
		items: [
			"IoT Telemetry",
			"Serial Communication",
			"Networking Protocols",
			"Sockets",
			"ESP32",
			"LoRa",
		],
	},
];

export function SkillsSection() {
	return (
		<div className="skills-container">
			<ul aria-label="Core competencies" className="sk">
				<li className="sk__row">
					<div className="sk__label">
						<span className="sk__no">001</span>
						<h3 className="sk__name">Enterprise Infrastructure</h3>
					</div>
					<p className="sk__body">
						Experience at Dell Technologies contributing to enterprise software
						infrastructure, low-level performance analysis, system integrations,
						and reliability.
					</p>
				</li>
				<li className="sk__row">
					<div className="sk__label">
						<span className="sk__no">002</span>
						<h3 className="sk__name">Full-Stack Velocity</h3>
					</div>
					<p className="sk__body">
						Level 1, 5-star rated freelancer with 50+ full-stack web applications
						shipped for international clients using Next.js, React, Node.js,
						Express, and SQL.
					</p>
				</li>
				<li className="sk__row">
					<div className="sk__label">
						<span className="sk__no">003</span>
						<h3 className="sk__name">Systems & Socket Programming</h3>
					</div>
					<p className="sk__body">
						Lightweight concurrent reverse proxies in C using POSIX sockets,
						pthreads, and HTTP cache architecture to minimize overhead and
						maximize throughput.
					</p>
				</li>
				<li className="sk__row">
					<div className="sk__label">
						<span className="sk__no">004</span>
						<h3 className="sk__name">Hardware-Software Co-Design</h3>
					</div>
					<p className="sk__body">
						Granted patent (No. 202441083752) for multi-hazard IoT telemetry
						pipelines combining ESP32, LoRa wireless mesh, and real-time React
						dashboards.
					</p>
				</li>
				<li className="sk__row">
					<div className="sk__label">
						<span className="sk__no">005</span>
						<h3 className="sk__name">DevOps & Containerization</h3>
					</div>
					<p className="sk__body">
						Containerizing client and internal applications with Docker,
						configuring Nginx reverse proxies, caching, rate-limiting, and
						traffic management.
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
   08. Ethical Hacking & Research Section
------------------------------------------------------------------------- */

export function EthicalHackingSection() {
	return (
		<div className="idx">
			<div className="ed-callout">
				<div className="ed-callout__copy">
					<p className="eyebrow">Responsible Research & Security</p>
					<p>
						Practical security research focusing on cryptographic hashing,
						metadata stripping, input sanitization, and wireless telemetry
						fault-tolerance.
					</p>
				</div>
				<span className="idx__flair">Responsible Disclosure</span>
			</div>
			<ul className="idx__list" style={{ marginTop: "16px" }}>
				<li className="idx__row">
					<div className="idx__grid">
						<span className="idx__details">
							<span className="idx__title-text">
								Anonymous Communication: Metadata Stripping & Cryptographic Hashing
							</span>
						</span>
						<span aria-hidden="true" className="idx__leader" />
						<div className="idx__trail">
							<span className="idx__flair">Privacy Research</span>
							<span className="idx__meta">Application Security</span>
						</div>
					</div>
				</li>
				<li className="idx__row">
					<div className="idx__grid">
						<span className="idx__details">
							<span className="idx__title-text">
								Input Sanitization & Secure Query Validation Against Spoofing
							</span>
						</span>
						<span aria-hidden="true" className="idx__leader" />
						<div className="idx__trail">
							<span className="idx__flair">Sanitization</span>
							<span className="idx__meta">Web Security</span>
						</div>
					</div>
				</li>
				<li className="idx__row">
					<div className="idx__grid">
						<span className="idx__details">
							<span className="idx__title-text">
								Fault-Tolerant LoRa Mesh Telemetry & Serial Data Integrity (Patent)
							</span>
						</span>
						<span aria-hidden="true" className="idx__leader" />
						<div className="idx__trail">
							<span className="idx__flair">Hardware Security</span>
							<span className="idx__meta">IoT Protocol</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
}

/* -------------------------------------------------------------------------
   09. Competitions & Hackathons Section
------------------------------------------------------------------------- */

export function CompetitionsSection() {
	return (
		<div className="idx">
			<ul aria-label="Competitions & Hackathons" className="idx__list">
				{/* AI VERSE 2.0 Hackathon */}
				<AccordionRow
					defaultOpen
					flair="1st Place Winner 🏆"
					meta="1st Place"
					subtitle="Team Terminal Titans"
					title="AI VERSE 2.0 Hackathon"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Led team Terminal Titans to first place and the top cash prize for
							architecting an end-to-end AI application under competitive time
							constraints. Designed the high-throughput backend, AI inference
							pipeline, and real-time monitoring interface.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">1st Place Winner</span>
							<span className="idx__tag">Team Terminal Titans</span>
							<span className="idx__tag">Top Cash Prize</span>
							<span className="idx__tag">AI Application Architecture</span>
						</div>
					</div>
				</AccordionRow>

				{/* Patent Grant */}
				<AccordionRow
					defaultOpen
					flair="National Patent"
					meta="Patent 202441083752"
					subtitle="National Intellectual Property Office"
					title="Multi-Hazard Detection and Alert System"
				>
					<div className="idx__panel-inner">
						<p className="idx__body">
							Patent granted for multi-hazard monitoring combining wireless and
							serial transmission for fault-tolerant sensor streams to a central
							gateway, with real-time React environmental telemetry.
						</p>
						<div className="idx__tags">
							<span className="idx__tag">Patent Granted</span>
							<span className="idx__tag">Telemetry Pipeline</span>
							<span className="idx__tag">Hardware-Software Codesign</span>
						</div>
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
					“Dhruv combines rare low-level systems depth with remarkable
					full-stack execution speed — whether analyzing enterprise software
					infrastructure, engineering C socket proxies, or shipping 50+ web
					applications for international clients.”
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
				<span
					className="eyebrow"
					style={{ color: "var(--accent-hover)", fontWeight: 600 }}
				>
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

			<ul
				aria-label="Curated playlists"
				className="idx__list"
				style={{ marginTop: "16px" }}
			>
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
							Terminal: Ghostty & Alacritty with Tmux. Shell: Bash / Zsh.
							Hardware: ESP32 microcontrollers, LoRa transceivers, and mechanical
							keyboards.
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
							Engineers, hardware tinkerers, Terminal Titans teammates, and
							open-source builders whose projects and portfolios inspire
							continuous shipping.
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
				Growing up in Jabalpur, Madhya Pradesh, I spent my childhood taking apart
				broken radios, exploring household circuits, and playing football and cricket.
				Long before writing my first line of C or Python, I was obsessed with
				understanding how electronic machines and physical systems function from
				the inside out. That curiosity led directly to Little Kingdom School,
				moving to Bengaluru for engineering at B.M.S. College of Engineering, and
				building full-stack software and hardware platforms.
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
					<p className="receipt__title">{site.fullName}</p>
					<p className="receipt__subtitle">
						{site.role} • {site.location}
					</p>
					<div className="receipt__divider" />
					<div className="receipt__meta-row">
						<span>ORDER #DK-2026</span>
						<span>CLERK: Dhruv Koshta</span>
					</div>
					<div className="receipt__meta-row">
						<span>PHONE: {site.phone}</span>
						<span>BENGALURU, KA</span>
					</div>
					<div className="receipt__meta-row">
						<span>DATE: {new Date().toLocaleDateString("en-US")}</span>
						<span>
							TIME:{" "}
							{new Date().toLocaleTimeString("en-US", {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</span>
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
							placeholder="Write a message, project inquiry, opportunity, or just say hello..."
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
							placeholder="Your email, phone, or handle"
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
						{" • "}
						<a
							className="text-link"
							href={site.resumeUrl}
							rel="noreferrer"
							target="_blank"
						>
							Download Resume (PDF)
						</a>
					</p>
				</form>
				<div className="receipt__tear" />
			</div>
		</div>
	);
}
