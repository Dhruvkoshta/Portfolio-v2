import { site } from "~/lib/site";
import type {
	ArticleItem,
	CompetitionItem,
	CoreCompetency,
	EducationItem,
	EvolutionItem,
	ExperienceItem,
	FactItem,
	MiscSetupItem,
	OtherProjectItem,
	PlaylistItem,
	ProjectItem,
	ResearchItem,
	SkillCategory,
	StatItem,
	TestimonialItem,
} from "./types";

export const heroFacts: readonly FactItem[] = [
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
];

export const experienceItems: readonly ExperienceItem[] = [
	{
		id: "dell",
		company: "Dell Technologies",
		role: "Software Intern",
		location: "Bengaluru, India",
		period: "2026",
		highlight: "Enterprise Software Infrastructure",
		defaultOpen: true,
		description:
			"Contributed to enterprise software infrastructure, focusing on low-level performance analysis, system integrations, and software reliability. Assisted in streamlining core tooling and infrastructure workflows, working directly with software infrastructure stacks.",
		tags: [
			"Enterprise Infrastructure",
			"Low-Level Performance",
			"System Integrations",
			"Software Reliability",
			"Core Tooling",
			"Linux Systems",
		],
		technologies: ["Linux", "C++", "Python", "Docker", "Git"],
	},
	{
		id: "freelance",
		company: "Fiverr / Freelance",
		role: "Full-Stack & Systems Engineer",
		location: "Remote",
		period: "2023 — present",
		highlight: "Level 1, 5★ rated • 50+ apps deployed",
		defaultOpen: true,
		description:
			"Earned Level 1, 5-star rated freelancer status by building and deploying 50+ full-stack web applications for international clients. Designed end-to-end architectures using Next.js, React, Node.js, Express, Python, and SQL databases. Containerized client applications with Docker and configured Nginx reverse proxies for deployment, caching, and traffic handling.",
		tags: [
			"50+ Apps Deployed",
			"Next.js",
			"React",
			"Node.js",
			"Express",
			"Python",
			"SQL Databases",
			"Docker",
			"Nginx Proxies",
		],
		technologies: ["Next.js", "React", "Node.js", "Python", "Docker", "SQL Databases", "Nginx"],
	},
	{
		id: "patent",
		company: "Multi-Hazard Detection & Alert System",
		role: "Lead Hardware Architect & Research Assistant",
		location: "Bengaluru, India",
		period: "2024 — 25",
		highlight: "Patent Granted (No. 202441083752)",
		defaultOpen: true,
		description:
			"Published and granted national patent (Patent No. 202441083752). Engineered an end-to-end multi-hazard telemetry pipeline with wireless and serial transmission for fault-tolerant sensor streams to a central gateway. Developed full-stack React + Node.js dashboard ingesting real-time environmental telemetry with threat thresholds and instant warning triggers.",
		tags: [
			"Patent No. 202441083752",
			"IoT Telemetry",
			"ESP32",
			"LoRa Wireless",
			"Serial Transmission",
			"React",
			"Node.js",
			"SQLite",
			"Sockets",
		],
		technologies: ["ESP32", "LoRa Wireless", "React", "Node.js", "SQLite", "Sockets", "C++"],
		repository: "https://github.com/Dhruvkoshta/Monitoring-System",
	},
	{
		id: "leadership",
		company: "PhaseShift (National Symposium)",
		role: "Senior Coordinator (Info Dev)",
		location: "B.M.S. College of Engineering",
		period: "2024 — present",
		highlight: "Led developer outreach & ticketing platform",
		defaultOpen: false,
		description:
			"Senior Coordinator (Info Dev) for PhaseShift — BMSCE's premier national annual tech symposium. Architected event registrations, ticketing infrastructure, and web systems, coordinating developer workflows across campus.",
		tags: [
			"Senior Coordinator",
			"PhaseShift (National Symposium)",
			"Ticketing Platform",
			"Event Infrastructure",
			"Developer Outreach",
		],
		technologies: ["React", "Next.js", "Node.js", "Git", "Cloudflare"],
	},
	{
		id: "utsav",
		company: "Utsav 2025 & Campus Ambassador",
		role: "Junior Coordinator & Campus Lead",
		location: "Bengaluru, India",
		period: "2023 — 24",
		highlight: "Campus outreach & event operations",
		isEarlierRole: true,
		defaultOpen: false,
		description:
			"Coordinated logistics and web outreach for Utsav, one of India's largest collegiate festivals. Managed technical support and handled student developer outreach programs.",
		tags: [
			"Junior Coordinator",
			"Campus Ambassador",
			"Operations",
			"Event Systems",
		],
		technologies: ["React", "TypeScript", "Git"],
	},
	{
		id: "hardware-iot",
		company: "Embedded & Edge Systems Lab",
		role: "Firmware & Systems Developer",
		location: "Bengaluru, India",
		period: "2023",
		highlight: "Microcontroller C/C++ & sensor protocols",
		isEarlierRole: true,
		defaultOpen: false,
		description:
			"Designed low-power firmware for ESP32 and ARM Cortex-M microcontrollers. Implemented I2C, SPI, and UART protocols connecting environmental sensors to telemetry nodes.",
		tags: [
			"Embedded C/C++",
			"ESP32",
			"ARM Cortex",
			"I2C / SPI / UART",
			"Sensors",
		],
		technologies: ["C++", "ESP32", "Linux", "Git"],
	},
	{
		id: "terminal-titans",
		company: "AI VERSE 2.0 (Terminal Titans)",
		role: "Full-Stack & Systems Lead",
		location: "Bengaluru, India",
		period: "2023",
		highlight: "1st Place Winner",
		isEarlierRole: true,
		defaultOpen: false,
		description:
			"Led Team Terminal Titans to 1st place overall at the AI VERSE 2.0 Hackathon. Architected real-time low-latency AI inference backend and full-stack client interface in 24 hours.",
		tags: [
			"1st Place Winner",
			"Hackathon Lead",
			"AI Inference",
			"Low Latency",
			"React",
			"FastAPI",
		],
		technologies: ["Python", "PyTorch", "React", "FastAPI"],
	},
	{
		id: "open-source-tools",
		company: "Open Source Developer",
		role: "Independent Software Author",
		location: "GitHub",
		period: "2022 — 23",
		highlight: "34+ public repositories & Linux utilities",
		isEarlierRole: true,
		defaultOpen: false,
		description:
			"Authored and published over 34 public repositories including custom dotfiles, terminal automation scripts, high-performance web templates, and IoT hardware drivers.",
		tags: [
			"34+ Repositories",
			"Linux Tooling",
			"Shell Scripting",
			"Web Utilities",
			"C++ / TypeScript",
		],
		technologies: ["Linux", "Git", "Python", "TypeScript", "C++"],
		repository: "https://github.com/Dhruvkoshta",
	},
	{
		id: "early-freelance",
		company: "Early Web Client Work",
		role: "Junior Web Developer",
		location: "Freelance",
		period: "2022",
		highlight: "First commercial web apps",
		isEarlierRole: true,
		defaultOpen: false,
		description:
			"Built custom landing pages, small business websites, and interactive tools for early clients. Set up responsive typography, SEO, and fast hosting deployments.",
		tags: [
			"HTML5 / CSS3",
			"JavaScript",
			"Responsive Design",
			"Client Web Apps",
		],
		technologies: ["React", "JavaScript", "CSS", "Git"],
	},
];

export const statistics: readonly StatItem[] = [
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
];

export const articles: readonly ArticleItem[] = [
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

export const featuredProjects: readonly ProjectItem[] = [
	{
		id: "proctoai",
		title: "ProctoAI",
		subtitle: "AI-Powered Proctoring & Exam Integrity Platform",
		year: "2024",
		dateSpan: "Aug '24 — Oct '24",
		desc: "Automated online examination proctoring platform monitoring candidate video feeds to detect unauthorized behavior. Implemented real-time anomaly detection pipelines with low latency and automated incident reporting.",
		tags: ["Next.js", "Python", "OpenCV / AI Vision", "Node.js", "TypeScript", "Tailwind CSS"],
		image: "/media/polaroids/proctoai-480.webp",
		github: "https://github.com/Dhruvkoshta/TerminalTitans",
		website: "https://terminal-titans-web.vercel.app/",
		teaser: "https://github.com/Dhruvkoshta/TerminalTitans",
	},
	{
		id: "hazard-system",
		title: "Multi-Hazard Detection and Alert System",
		subtitle: "Patent No. 202441083752",
		year: "2024",
		dateSpan: "Feb '24 — Dec '24",
		desc: "End-to-end multi-hazard telemetry pipeline with wireless and serial transmission for fault-tolerant sensor streams to a central gateway. Full-stack React + Node.js dashboard ingesting real-time environmental telemetry with threat thresholds and instant warning triggers.",
		tags: ["Patent Granted", "ESP32", "LoRa Wireless", "Serial Protocol", "React", "Node.js", "SQLite"],
		image: "/media/polaroids/hazard-480.webp",
		patent: true,
		github: "https://github.com/Dhruvkoshta/Monitoring-System",
		website: "https://github.com/Dhruvkoshta/Monitoring-System",
	},
	{
		id: "cartonoir",
		title: "CartoNoir",
		subtitle: "Minimalist City Map Poster Generator",
		year: "2024",
		dateSpan: "Jul '24 — Nov '24",
		desc: "Full-stack web application that generates beautiful, minimalist map posters for any city in the world across 18 unique artistic themes, creating print-ready high-resolution artwork in minutes.",
		tags: ["React", "Docker", "Node.js", "Express", "Python", "AWS S3"],
		image: "/media/polaroids/cartonoir-480.webp",
		github: "https://github.com/Dhruvkoshta/CartoNoir",
		website: "https://github.com/Dhruvkoshta/CartoNoir",
	},
	{
		id: "c-proxy",
		title: "C-Powered Proxy Web Server",
		subtitle: "Proxy & Traffic Management",
		year: "2023",
		dateSpan: "May '23 — Nov '23",
		desc: "Lightweight concurrent reverse proxy with dynamic request routing, in-memory caching, and load balancing. Native socket programming and POSIX threads minimize overhead and maximize throughput.",
		tags: ["C", "POSIX Sockets", "HTTP", "Cache Architecture", "Pthreads", "Semaphores"],
		image: "/media/polaroids/webserver-480.webp",
		github: "https://github.com/Dhruvkoshta/Web-Server-in-C",
	},
	{
		id: "vibelink",
		title: "VibeLink",
		subtitle: "Real-Time Chat Platform",
		year: "2024",
		dateSpan: "Jan '24 — May '24",
		desc: "Real-time messaging platform with instant bidirectional communication, public channels, and private rooms. Persistent message stores and WebSocket state management ensure synchronized statuses and low-latency delivery.",
		tags: ["React", "Next.js", "Node.js", "WebSockets", "SQL", "Redis"],
		image: "/media/polaroids/vibelink-480.webp",
		github: "https://github.com/Dhruvkoshta/VibeLink",
		website: "https://vibelink.dhruvkoshta.dev",
	},
];

export const otherProjects: readonly OtherProjectItem[] = [
	{
		id: "anonymus",
		title: "Anonymus",
		subtitle: "Secure Anonymous Messaging Platform",
		year: "2024",
		flair: "Live App",
		defaultOpen: true,
		desc: "Anonymous communication stripping metadata and identifiers to preserve privacy. Features rate-limiting, secure query validation, and input sanitization against malicious traffic and spoofing.",
		tags: [
			"Next.js",
			"Node.js",
			"SQL",
			"Cryptographic Hashing",
			"Metadata Stripping",
			"Rate Limiting",
		],
		github: "https://github.com/Dhruvkoshta/Anonymus",
		website: "https://anonymus.dhruvkoshta.dev",
	},
	{
		id: "rayfall",
		title: "Rayfall",
		subtitle: "Fast-Paced 2D Arcade Game in C++",
		year: "2023",
		flair: "Game Dev",
		defaultOpen: false,
		desc: "Fast-paced 2D arcade shooter game developed in C++ using Raylib and custom GLSL shaders. Features custom collision detection, particle physics, and an in-game upgrade shop.",
		tags: ["C++", "Raylib", "GLSL Shaders", "CMake"],
		github: "https://github.com/Dhruvkoshta/Rayfall",
	},
	{
		id: "portfolio-v2",
		title: "Portfolio Website v2",
		subtitle: "Interactive 3D WebGL Globe & Showcase",
		year: "2023",
		flair: "Portfolio",
		defaultOpen: false,
		desc: "Second portfolio iteration built with Next.js, Framer Motion, and a WebGL globe visualizing real-time viewer locations and interactive project cards.",
		tags: ["Next.js", "React", "WebGL", "Framer Motion"],
	},
];

export const educationItems: readonly EducationItem[] = [
	{
		id: "bmsce",
		institution: "B.M.S. College of Engineering",
		degree: "Bachelor of Engineering (B.E.) in Electronics and Communication Engineering",
		location: "Bengaluru, Karnataka, India",
		period: "2023 — 2027 (Expected Aug 2027)",
		score: "CGPA 8.8 / 10.0",
		leadership: [
			"Senior Coordinator (Info Dev), PhaseShift — BMSCE national tech symposium",
			"Junior Coordinator, Utsav 2025",
			"Campus Ambassador representing student engineering initiatives",
		],
		coursework: [
			"Computer Architecture & Microprocessors (8085 / 8086 / ARM)",
			"Data Structures & Algorithms in C / C++",
			"Operating Systems, POSIX Threads, Sockets & Concurrency",
			"Embedded Systems & Microcontroller Interfacing (ESP32 / AVR)",
			"Wireless Communication Protocols, Serial Data & LoRa Telemetry",
			"Database Management Systems & Relational SQL",
			"Digital Signal Processing & Signals and Systems",
		],
	},
	{
		id: "little-kingdom",
		institution: "Little Kingdom School",
		degree: "Senior Secondary • High School Diploma",
		location: "Jabalpur, Madhya Pradesh, India",
		period: "Completed 2023",
		score: "80%",
		summary:
			"Strong academic focus in Mathematics, Physics, and foundational Computer Science. The playground where tinkering with radios and circuits first sparked a passion for engineering.",
	},
];

export const skillCategories: readonly SkillCategory[] = [
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

export const coreCompetencies: readonly CoreCompetency[] = [
	{
		index: "001",
		name: "Enterprise Infrastructure",
		description:
			"Experience at Dell Technologies contributing to enterprise software infrastructure, low-level performance analysis, system integrations, and reliability.",
	},
	{
		index: "002",
		name: "Full-Stack Velocity",
		description:
			"Level 1, 5-star rated freelancer with 50+ full-stack web applications shipped for international clients using Next.js, React, Node.js, Express, and SQL.",
	},
	{
		index: "003",
		name: "Systems & Socket Programming",
		description:
			"Lightweight concurrent reverse proxies in C using POSIX sockets, pthreads, and HTTP cache architecture to minimize overhead and maximize throughput.",
	},
	{
		index: "004",
		name: "Hardware-Software Co-Design",
		description:
			"Granted patent (No. 202441083752) for multi-hazard IoT telemetry pipelines combining ESP32, LoRa wireless mesh, and real-time React dashboards.",
	},
	{
		index: "005",
		name: "DevOps & Containerization",
		description:
			"Containerizing client and internal applications with Docker, configuring Nginx reverse proxies, caching, rate-limiting, and traffic management.",
	},
];

export const researchItems: readonly ResearchItem[] = [
	{
		title: "Anonymous Communication: Metadata Stripping & Cryptographic Hashing",
		flair: "Privacy Research",
		category: "Application Security",
	},
	{
		title: "Input Sanitization & Secure Query Validation Against Spoofing",
		flair: "Sanitization",
		category: "Web Security",
	},
	{
		title: "Fault-Tolerant LoRa Mesh Telemetry & Serial Data Integrity (Patent)",
		flair: "Hardware Security",
		category: "IoT Protocol",
	},
];

export const competitions: readonly CompetitionItem[] = [
	{
		id: "ai-verse",
		title: "AI VERSE 2.0 Hackathon",
		subtitle: "Team Terminal Titans",
		meta: "1st Place",
		flair: "1st Place Winner 🏆",
		defaultOpen: true,
		description:
			"Led team Terminal Titans to first place and the top cash prize for architecting an end-to-end AI application under competitive time constraints. Designed the high-throughput backend, AI inference pipeline, and real-time monitoring interface.",
		tags: [
			"1st Place Winner",
			"Team Terminal Titans",
			"Top Cash Prize",
			"AI Application Architecture",
		],
	},
	{
		id: "patent-comp",
		title: "Multi-Hazard Detection and Alert System",
		subtitle: "National Intellectual Property Office",
		meta: "Patent 202441083752",
		flair: "National Patent",
		defaultOpen: true,
		description:
			"Patent granted for multi-hazard monitoring combining wireless and serial transmission for fault-tolerant sensor streams to a central gateway, with real-time React environmental telemetry.",
		tags: [
			"Patent Granted",
			"Telemetry Pipeline",
			"Hardware-Software Codesign",
		],
	},
];

export const testimonial: TestimonialItem = {
	quote:
		"“Dhruv combines rare low-level systems depth with remarkable full-stack execution speed — whether analyzing enterprise software infrastructure, engineering C socket proxies, or shipping 50+ web applications for international clients.”",
	author: "— Engineering Peer & Collaborator",
};

export const evolutions: readonly EvolutionItem[] = [
	{
		year: "2022",
		title: "v1: HTML, CSS & JavaScript",
		desc: "First portfolio website. Static HTML, custom CSS animations, and pure JavaScript. The foundation of learning web design.",
	},
	{
		year: "2023",
		title: "v2: Next.js & WebGL Globe",
		desc: "Modern React and Next.js redesign featuring an interactive 3D WebGL globe, dark mode, and Framer Motion micro-interactions.",
	},
	{
		year: "2026 (Current)",
		title: "v3: TanStack Start on Cloudflare",
		desc: "Inspired by the Matthew Trent aesthetic: hairline editorial grid, instant edge SSR, 100/100 Lighthouse performance, zero layout shifts.",
		current: true,
	},
];

export const playlists: readonly PlaylistItem[] = [
	{ title: "Deep Focus & Flow State", count: "120 tracks", tag: "Focus" },
	{ title: "Late Night Coding & Systems", count: "85 tracks", tag: "Vibes" },
	{ title: "Electronic & Ambient Synth", count: "64 tracks", tag: "Ambient" },
	{ title: "High-Energy Debugging", count: "90 tracks", tag: "Energy" },
];

export const miscSetups: readonly MiscSetupItem[] = [
	{
		title: "Developer Setup",
		subtitle: "Hardware & Software Environment",
		flair: "Daily Drivers",
		meta: "Tools",
		body: "Operating System: Arch Linux / Debian. Editor: Neovim & VS Code. Terminal: Ghostty & Alacritty with Tmux. Shell: Bash / Zsh. Hardware: ESP32 microcontrollers, LoRa transceivers, and mechanical keyboards.",
		defaultOpen: true,
	},
	{
		title: "Someone in My Orbit",
		subtitle: "Founders, creators & friends",
		flair: "Collaborators",
		meta: "Network",
		body: "Engineers, hardware tinkerers, Terminal Titans teammates, and open-source builders whose projects and portfolios inspire continuous shipping.",
		defaultOpen: false,
	},
];

export const asAKidStory =
	"Growing up in Jabalpur, Madhya Pradesh, I spent my childhood taking apart broken radios, exploring household circuits, and playing football and cricket. Long before writing my first line of C or Python, I was obsessed with understanding how electronic machines and physical systems function from the inside out. That curiosity led directly to Little Kingdom School, moving to Bengaluru for engineering at B.M.S. College of Engineering, and building full-stack software and hardware platforms.";
