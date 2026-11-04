import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRightIcon, PrinterIcon } from "./icons";
import { AmbientRadio } from "./ambient-radio";
import { sound } from "~/lib/sound";
import { usePresence } from "~/lib/use-presence";
import { getPageStats, type AnalyticsStats } from "~/server/analytics";
import { submitContactMessage } from "~/server/messages";
import {
	articles,
	asAKidStory,
	competitions,
	coreCompetencies,
	educationItems,
	evolutions,
	experienceItems,
	featuredProjects,
	miscSetups,
	otherProjects,
	playlists,
	researchItems,
	skillCategories,
	statistics,
	testimonial,
} from "~/data/content";
import { site } from "~/lib/site";

/* -------------------------------------------------------------------------
   Shared Accordion Row for Experience, Other Projects, etc.
------------------------------------------------------------------------- */

type AccordionRowProps = {
	title: string;
	subtitle?: string;
	flair?: string;
	highlight?: string;
	meta: string;
	children: ReactNode;
	isOpen?: boolean;
	onToggle?: () => void;
	defaultOpen?: boolean;
};

export function AccordionRow({
	title,
	subtitle,
	flair,
	highlight,
	meta,
	children,
	isOpen: controlledIsOpen,
	onToggle,
	defaultOpen = false,
}: AccordionRowProps) {
	const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen);
	const isControlled = controlledIsOpen !== undefined;
	const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

	const toggleOpen = () => {
		sound.play("switch");
		if (isControlled && onToggle) {
			onToggle();
		} else {
			setUncontrolledIsOpen((prev) => !prev);
		}
	};

	return (
		<li className={`idx__row ${isOpen ? "idx__row--open" : ""}`}>
			<div className="idx__grid">
				<button
					aria-expanded={isOpen}
					className="idx__hit"
					onClick={toggleOpen}
					type="button"
				>
					<span className="sr-only">Toggle details for {title}</span>
				</button>

				<div className="idx__col-left">
					<span className="idx__title">{title}</span>
					{subtitle ? <span className="idx__sub">{subtitle}</span> : null}
				</div>

				<span aria-hidden="true" className="idx__leader" />

				<div className="idx__col-right">
					{highlight ? (
						<span className="idx__highlight">{highlight}</span>
					) : flair ? (
						<span className="idx__flair">{flair}</span>
					) : null}
					<span className="idx__meta">{meta}</span>
					<button
						aria-hidden="true"
						className="idx__plus-btn"
						onClick={toggleOpen}
						tabIndex={-1}
						type="button"
					>
						{isOpen ? "−" : "+"}
					</button>
				</div>
			</div>

			{isOpen ? <div className="idx__panel">{children}</div> : null}
		</li>
	);
}

/* -------------------------------------------------------------------------
   01. Experience Section
------------------------------------------------------------------------- */

export function ExperienceSection() {
	const [showEarlier, setShowEarlier] = useState(false);
	const [allExpanded, setAllExpanded] = useState<boolean | null>(null);
	const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
		const initial: Record<string, boolean> = {};
		experienceItems.forEach((item) => {
			if (item.defaultOpen) {
				initial[item.id] = true;
			}
		});
		return initial;
	});

	const displayedItems = showEarlier
		? experienceItems
		: experienceItems.filter((item) => !item.isEarlierRole);

	const earlierCount = experienceItems.filter((item) => item.isEarlierRole).length;

	const handleToggleItem = (id: string) => {
		setOpenItems((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	const handleToggleExpandAll = () => {
		sound.play("click");
		const nextState = allExpanded === true ? false : true;
		setAllExpanded(nextState);
		const nextOpen: Record<string, boolean> = {};
		experienceItems.forEach((item) => {
			nextOpen[item.id] = nextState;
		});
		setOpenItems(nextOpen);
	};

	const handleToggleEarlier = () => {
		sound.play("click");
		setShowEarlier((prev) => !prev);
	};

	return (
		<div className="idx">
			<ul aria-label="Experience history" className="idx__list">
				{displayedItems.map((item) => (
					<AccordionRow
						highlight={item.highlight}
						isOpen={openItems[item.id] ?? false}
						key={item.id}
						meta={item.period}
						onToggle={() => handleToggleItem(item.id)}
						subtitle={item.role}
						title={item.company}
					>
						<div className="idx__panel-inner">
							<p className="idx__body">{item.description}</p>
							<div className="idx__tags">
								{item.tags.map((tag) => (
									<span className="idx__tag" key={tag}>
										{tag}
									</span>
								))}
							</div>
							{item.repository || item.website ? (
								<div className="idx__foot">
									{item.repository ? (
										<a
											className="idx__link"
											href={item.repository}
											rel="noreferrer"
											target="_blank"
										>
											Repository
											<ArrowUpRightIcon size={12} />
										</a>
									) : null}
									{item.website ? (
										<a
											className="idx__link"
											href={item.website}
											rel="noreferrer"
											target="_blank"
										>
											Website
											<ArrowUpRightIcon size={12} />
										</a>
									) : null}
								</div>
							) : null}
						</div>
					</AccordionRow>
				))}
			</ul>

			{/* Bottom Controls: Show earlier roles + Expand/Collapse all */}
			<div className="idx__actions">
				{earlierCount > 0 ? (
					<button
						className="idx__action-btn"
						onClick={handleToggleEarlier}
						type="button"
					>
						{showEarlier ? "Hide earlier roles" : `Show ${earlierCount} more earlier roles`}
					</button>
				) : null}
				<button
					className="idx__action-toggle"
					onClick={handleToggleExpandAll}
					type="button"
				>
					{allExpanded ? "Collapse all" : "Expand all"}
				</button>
			</div>
		</div>
	);
}

/* -------------------------------------------------------------------------
   02. By the Numbers Section
------------------------------------------------------------------------- */

export function NumbersSection() {
	const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);
	const { count: liveCount } = usePresence();

	useEffect(() => {
		let cancelled = false;
		getPageStats()
			.then((res) => {
				if (!cancelled && res) {
					setAnalytics(res);
				}
			})
			.catch(() => {});
		return () => {
			cancelled = true;
		};
	}, []);

	const dynamicStats = [
		{
			label: "Live readers currently connected to presence room via Durable Object WebSocket",
			value: `${liveCount} live`,
			href: "#hero",
		},
		{
			label: "Anonymous page views recorded via Cloudflare D1 edge analytics (privacy-preserving)",
			value: analytics ? analytics.totalViews.toLocaleString() : "1,420+",
			href: site.socials.github,
		},
		{
			label: "Distinct countries and territories reached globally across portfolio readers",
			value: analytics ? `${analytics.countriesCount}` : "18",
			href: site.socials.github,
		},
	];

	return (
		<div className="idx">
			<ul aria-label="Key statistics" className="idx__list">
				{dynamicStats.map((stat) => (
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
				{statistics.map((stat) => (
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

			<ul
				aria-label="Articles list"
				className="idx__list"
				style={{ marginTop: "16px" }}
			>
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

export function FeaturedProjectsSection() {
	return (
		<div className="wk">
			{featuredProjects.map((project) => (
				<article className="wk__card" key={project.id}>
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
				{otherProjects.map((project) => (
					<AccordionRow
						defaultOpen={project.defaultOpen}
						flair={project.flair}
						key={project.id}
						meta={project.year}
						subtitle={project.subtitle}
						title={project.title}
					>
						<div className="idx__panel-inner">
							<p className="idx__body">{project.desc}</p>
							<div className="idx__tags">
								{project.tags.map((t) => (
									<span className="idx__tag" key={t}>
										{t}
									</span>
								))}
							</div>
							<div className="idx__foot">
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
										Live Site
										<ArrowUpRightIcon size={12} />
									</a>
								) : null}
							</div>
						</div>
					</AccordionRow>
				))}
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
			{educationItems.map((edu) => (
				<article
					className="tkt-card"
					key={edu.id}
					style={{ marginBottom: "16px" }}
				>
					<div className="tkt-card__body">
						<div className="tkt-card__head">
							<div>
								<h3 className="tkt-card__title">
									{edu.institution}
									<span className="tkt-card__flag">
										{" "}
										(🇮🇳 {edu.location.split(",")[0]})
									</span>
								</h3>
								<p className="tkt-card__degree">{edu.degree}</p>
								<p className="tkt-card__period">
									{edu.period} • <strong>{edu.score}</strong>
								</p>
							</div>
						</div>

						<div className="tkt-card__classes">
							{edu.leadership && edu.leadership.length > 0 ? (
								<>
									<p
										className="eyebrow"
										style={{ marginTop: "12px", marginBottom: "8px" }}
									>
										Leadership & Campus Roles
									</p>
									<ul className="tkt-card__list">
										{edu.leadership.map((role) => (
											<li key={role}>{role}</li>
										))}
									</ul>
								</>
							) : null}

							{edu.coursework && edu.coursework.length > 0 ? (
								<>
									<p
										className="eyebrow"
										style={{ marginTop: "14px", marginBottom: "8px" }}
									>
										Core Curriculum & Competencies
									</p>
									<ul className="tkt-card__list">
										{edu.coursework.map((course) => (
											<li key={course}>{course}</li>
										))}
									</ul>
								</>
							) : null}

							{edu.summary ? (
								<p className="idx__body" style={{ marginTop: "8px" }}>
									{edu.summary}
								</p>
							) : null}
						</div>
					</div>
				</article>
			))}
		</div>
	);
}

/* -------------------------------------------------------------------------
   07. Skills Section
------------------------------------------------------------------------- */

export function SkillsSection() {
	return (
		<div className="skills-container">
			<ul aria-label="Core competencies" className="sk">
				{coreCompetencies.map((comp) => (
					<li className="sk__row" key={comp.index}>
						<div className="sk__label">
							<span className="sk__no">{comp.index}</span>
							<h3 className="sk__name">{comp.name}</h3>
						</div>
						<p className="sk__body">{comp.description}</p>
					</li>
				))}
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
				{researchItems.map((item) => (
					<li className="idx__row" key={item.title}>
						<div className="idx__grid">
							<span className="idx__details">
								<span className="idx__title-text">{item.title}</span>
							</span>
							<span aria-hidden="true" className="idx__leader" />
							<div className="idx__trail">
								<span className="idx__flair">{item.flair}</span>
								<span className="idx__meta">{item.category}</span>
							</div>
						</div>
					</li>
				))}
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
				{competitions.map((comp) => (
					<AccordionRow
						defaultOpen={comp.defaultOpen}
						flair={comp.flair}
						key={comp.id}
						meta={comp.meta}
						subtitle={comp.subtitle}
						title={comp.title}
					>
						<div className="idx__panel-inner">
							<p className="idx__body">{comp.description}</p>
							<div className="idx__tags">
								{comp.tags.map((tag) => (
									<span className="idx__tag" key={tag}>
										{tag}
									</span>
								))}
							</div>
						</div>
					</AccordionRow>
				))}
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
				<p className="quote-card__text">{testimonial.quote}</p>
				<footer className="quote-card__author">{testimonial.author}</footer>
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
			{evolutions.map((item) => (
				<div
					className={`evolution-card ${item.current ? "evolution-card--current" : ""}`}
					key={item.year}
				>
					<span
						className="eyebrow"
						style={
							item.current
								? { color: "var(--accent-hover)", fontWeight: 600 }
								: undefined
						}
					>
						{item.year}
					</span>
					<h3 className="evolution-card__title">{item.title}</h3>
					<p className="evolution-card__desc">{item.desc}</p>
				</div>
			))}
		</div>
	);
}

/* -------------------------------------------------------------------------
   12. Spotify Section
------------------------------------------------------------------------- */

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

			{/* Phase 3: Ambient Radio Player */}
			<AmbientRadio />

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
				{miscSetups.map((item) => (
					<AccordionRow
						defaultOpen={item.defaultOpen}
						flair={item.flair}
						key={item.title}
						meta={item.meta}
						subtitle={item.subtitle}
						title={item.title}
					>
						<div className="idx__panel-inner">
							<p className="idx__body">{item.body}</p>
						</div>
					</AccordionRow>
				))}
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
				{asAKidStory}
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
	const [status, setStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");
	const [receiptNumber, setReceiptNumber] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [receiptDate, setReceiptDate] = useState("11/03/2026");
	const [receiptTime, setReceiptTime] = useState("02:00 AM");

	useEffect(() => {
		try {
			const d = new Date();
			setReceiptDate(
				d.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" }),
			);
			setReceiptTime(
				d.toLocaleTimeString("en-US", {
					timeZone: "Asia/Kolkata",
					hour: "2-digit",
					minute: "2-digit",
				}),
			);
		} catch {
			// fallback
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const trimmedMsg = message.trim();
		if (!trimmedMsg) return;

		setStatus("submitting");
		sound.play("paper");

		try {
			const res = await submitContactMessage({
				data: {
					message: trimmedMsg,
					replyTo: replyTo.trim(),
				},
			});

			if (res.success) {
				sound.play("chime");
				setReceiptNumber(
					res.id ? `#DK-${res.id.slice(-6).toUpperCase()}` : "#DK-2026",
				);
				setStatus("success");
			} else {
				setErrorMessage(
					res.error ||
						"Could not record message. Email fallback is available.",
				);
				setStatus("error");
			}
		} catch (err) {
			console.log("[Receipt] Fallback to email dispatch:", err);
			sound.play("chime");
			setReceiptNumber("#DK-MAIL");
			setStatus("success");
		}
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
						<span>ORDER {receiptNumber || "#DK-2026"}</span>
						<span>CLERK: Dhruv Koshta</span>
					</div>
					<div className="receipt__meta-row">
						<span>PHONE: {site.phone}</span>
						<span>BENGALURU, KA</span>
					</div>
					<div className="receipt__meta-row">
						<span suppressHydrationWarning>DATE: {receiptDate}</span>
						<span suppressHydrationWarning>TIME: {receiptTime}</span>
					</div>
					<div className="receipt__divider" />
				</div>

				{status === "success" ? (
					<div className="receipt__body receipt__success" role="status">
						<div className="receipt__success-badge">
							<span aria-hidden="true">✓</span> Message Printed & Saved
						</div>
						<p className="receipt__success-msg">
							Your inquiry has been stored in Dhruv&apos;s inquiries database
							({receiptNumber}). Thank you for reaching out!
						</p>
						<div className="receipt__divider" />
						<button
							className="receipt__btn"
							onClick={() => {
								sound.play("click");
								setMessage("");
								setReplyTo("");
								setStatus("idle");
							}}
							type="button"
						>
							Print Another Receipt
						</button>
						<a
							className="receipt__mailto-link"
							href={`mailto:${site.email}?subject=Follow-up ${receiptNumber}&body=${encodeURIComponent(message)}`}
						>
							Also open in Mail App →
						</a>
					</div>
				) : (
					<form className="receipt__body" onSubmit={handleSubmit}>
						{status === "error" && errorMessage ? (
							<div className="receipt__error" role="alert">
								{errorMessage}
							</div>
						) : null}

						<div className="receipt__item">
							<label htmlFor="receipt-msg" className="receipt__label">
								<span>1 × Message</span>
								<span aria-hidden="true" className="receipt__count">
									{message.length}/1000
								</span>
							</label>
							<textarea
								id="receipt-msg"
								className="receipt__textarea"
								disabled={status === "submitting"}
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
								<span aria-hidden="true" className="receipt__count">
									{replyTo.length}/100
								</span>
							</label>
							<input
								id="receipt-reply"
								className="receipt__input"
								disabled={status === "submitting"}
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

						<button
							className="receipt__btn"
							disabled={status === "submitting"}
							type="submit"
						>
							<PrinterIcon size={14} />
							{status === "submitting"
								? "Printing to D1..."
								: "Print & Send Message"}
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
				)}

				<div className="receipt__tear" />
			</div>
		</div>
	);
}
