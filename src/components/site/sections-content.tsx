import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRightIcon, PrinterIcon, SpotifyIcon } from "./icons";
import { TechBadge } from "./tech-icons";
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
	favoriteCoursesRow1,
	favoriteCoursesRow2,
	featuredProjects,
	miscSetups,
	otherProjects,
	playlists,
	skillCategories,
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
		const nextState = !isOpen;
		sound.playAccordion(nextState);
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
		const nextState = allExpanded === true ? false : true;
		sound.playAccordion(nextState);
		setAllExpanded(nextState);
		const nextOpen: Record<string, boolean> = {};
		experienceItems.forEach((item) => {
			nextOpen[item.id] = nextState;
		});
		setOpenItems(nextOpen);
	};

	const handleToggleEarlier = () => {
		const next = !showEarlier;
		sound.playAccordion(next);
		setShowEarlier(next);
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
								{item.technologies && item.technologies.length > 0 ? (
									<div aria-label="Technologies used" className="idx__tech-stack">
										{item.technologies.map((tech) => (
											<TechBadge key={tech} name={tech} />
										))}
									</div>
								) : null}
							</div>
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
	const [activeTab, setActiveTab] = useState<"stats" | "catch">("stats");
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

	const handleTabChange = (tab: "stats" | "catch") => {
		sound.playAccordion(true);
		setActiveTab(tab);
	};

	const statsList = [
		{
			value: "1",
			label: "National patent granted for Multi-Hazard Detection & Alert System (No. 202441083752)",
			href: "#featured-projects",
		},
		{
			value: "50+",
			label: "Full-stack web applications deployed for global clients (5★ rated on Fiverr)",
			href: "#experience",
		},
		{
			value: "8.8",
			label: "Cumulative GPA in B.E. Electronics & Communication at BMSCE",
			href: "#education",
		},
		{
			value: "1st",
			label: "Place Winner at AI VERSE 2.0 Hackathon (Team Terminal Titans)",
			href: "#competitions",
		},
		{
			value: "34+",
			label: "Public open-source repositories and Linux system tools on GitHub",
			href: site.socials.github,
		},
		{
			value: "18",
			label: "Artistic vector styles engineered for CartoNoir map generator",
			href: "https://github.com/Dhruvkoshta/CartoNoir",
		},
		{
			value: "118",
			label: "Peak WPM when typing",
			href: "https://monkeytype.com",
			isTyping: true,
		},
		{
			isFlags: true,
			flags: [
				{ code: "🇺🇸", name: "United States" },
				{ code: "🇮🇳", name: "India" },
				{ code: "🇬🇧", name: "United Kingdom" },
				{ code: "🇩🇪", name: "Germany" },
				{ code: "🇸🇬", name: "Singapore" },
				{ code: "🇨🇦", name: "Canada" },
				{ code: "🇦🇺", name: "Australia" },
				{ code: "🇯🇵", name: "Japan" },
			],
			label: "Weekly top portfolio viewers",
			href: site.socials.github,
		},
		{
			value: `${liveCount} live`,
			label: "Live readers currently connected via Cloudflare Durable Objects WebSocket",
			href: "#hero",
			isLive: true,
		},
		{
			value: analytics ? analytics.totalViews.toLocaleString() : "1,420+",
			label: "Anonymous page views recorded via Cloudflare D1 edge analytics",
			href: site.socials.github,
		},
	];

	const countriesCaught = [
		{ flag: "🇮🇳", name: "India", region: "Origin • Bengaluru", caught: true },
		{ flag: "🇺🇸", name: "United States", region: "Cloudflare Global Edge", caught: true },
		{ flag: "🇬🇧", name: "United Kingdom", region: "London Edge", caught: true },
		{ flag: "🇩🇪", name: "Germany", region: "Frankfurt Edge", caught: true },
		{ flag: "🇸🇬", name: "Singapore", region: "APAC Hub", caught: true },
		{ flag: "🇨🇦", name: "Canada", region: "Toronto Edge", caught: true },
		{ flag: "🇯🇵", name: "Japan", region: "Tokyo Edge", caught: true },
		{ flag: "🇦🇺", name: "Australia", region: "Sydney Edge", caught: true },
		{ flag: "🇫🇷", name: "France", region: "Paris Edge", caught: true },
		{ flag: "🇳🇱", name: "Netherlands", region: "Amsterdam Edge", caught: true },
		{ flag: "🇸🇪", name: "Sweden", region: "Stockholm Edge", caught: false },
		{ flag: "🇧🇷", name: "Brazil", region: "São Paulo Edge", caught: false },
	];

	return (
		<div className="numbers-wrapper">
			{/* Top Tab Bar matching reference layout */}
			<div className="numbers-head-controls">
				<div aria-label="By the numbers views" className="ed3__section-tabs" role="tablist">
					<button
						aria-selected={activeTab === "stats"}
						className={`ed3__section-tabs__tab ${
							activeTab === "stats" ? "ed3__section-tabs__tab--active" : ""
						}`}
						onClick={() => handleTabChange("stats")}
						role="tab"
						type="button"
					>
						Stats
					</button>
					<span aria-hidden="true" className="ed3__section-tabs__slash">
						/
					</span>
					<button
						aria-selected={activeTab === "catch"}
						className={`ed3__section-tabs__tab ${
							activeTab === "catch" ? "ed3__section-tabs__tab--active" : ""
						}`}
						onClick={() => handleTabChange("catch")}
						role="tab"
						type="button"
					>
						Catch &apos;em All
					</button>
				</div>
			</div>

			{activeTab === "stats" ? (
				<div className="idx">
					<ul aria-label="By the numbers" className="idx__list idx__list--split">
						{statsList.map((stat, idx) => (
							<li className="idx__row idx__row--stat" key={idx}>
								<div className="idx__grid">
									<span className="idx__details">
										{stat.isFlags ? (
											<span className="idx__marks">
												{stat.flags?.map((f) => (
													<span
														aria-label={f.name}
														className="idx__mark-flag"
														key={f.code}
														role="img"
														tabIndex={0}
													>
														{f.code}
														<span className="flag-tooltip" role="tooltip">
															{f.name}
														</span>
													</span>
												))}
											</span>
										) : (
											<a
												className="idx__title idx__title--link idx__title--tabular"
												href={stat.href}
												{...(stat.href?.startsWith("http")
													? { rel: "noreferrer", target: "_blank" }
													: {})}
											>
												{stat.isLive ? (
													<span aria-hidden="true" className="live-dot" />
												) : null}
												<span className="idx__title-text">{stat.value}</span>
											</a>
										)}
										<span className="idx__sub">
											{stat.label}
											{stat.isTyping ? (
												<span aria-hidden="true" className="idx__caret">
													|
												</span>
											) : null}
										</span>
									</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className="catch-wrapper">
					<div className="catch-header">
						<span className="catch-summary">
							<strong>10 / 240</strong> Countries Collected (4.2% of global edge routes)
						</span>
					</div>
					<div className="catch-grid">
						{countriesCaught.map((country) => (
							<div className="catch-card" key={country.name}>
								<span aria-hidden="true" className="catch-card__flag">
									{country.flag}
								</span>
								<div className="catch-card__info">
									<span className="catch-card__name">{country.name}</span>
									<span className="catch-card__region">{country.region}</span>
								</div>
								<span
									className={`catch-card__status ${
										country.caught ? "catch-card__status--caught" : "catch-card__status--waiting"
									}`}
								>
									{country.caught ? "✓ Caught" : "Waiting"}
								</span>
							</div>
						))}
					</div>
				</div>
			)}
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
				<article className="wk__item" key={project.id}>
					<div className="wk__year-col">
						<span className="wk__year">{project.year}</span>
					</div>

					<div className="wk__card">
						<div className="wk__media">
							{project.video ? (
								<video
									autoPlay
									className="wk__video"
									loop
									muted
									playsInline
									src={project.video}
								/>
							) : (
								<img
									alt={`${project.title} - ${project.subtitle}`}
									className="wk__img"
									decoding="async"
									loading="lazy"
									src={project.image}
								/>
							)}
							<span aria-hidden="true" className="wk__pluses">
								<span className="wk__plus wk__plus--tl">+</span>
								<span className="wk__plus wk__plus--tr">+</span>
								<span className="wk__plus wk__plus--bl">+</span>
								<span className="wk__plus wk__plus--br">+</span>
							</span>
						</div>

						<div className="wk__caption">
							<div className="wk__header">
								<h3 className="wk__title">
									<span className="wk__title-text">
										{project.title}: {project.subtitle}
									</span>
									{project.patent ? (
										<span className="wk__badge">Patent Granted</span>
									) : null}
								</h3>
							</div>

							<p className="wk__desc">{project.desc}</p>

							<div className="wk__links">
								{project.github ? (
									<a
										className="wk__link"
										href={project.github}
										rel="noreferrer"
										target="_blank"
									>
										<span>Repo</span>
										<ArrowUpRightIcon size={11} />
									</a>
								) : null}
								{project.github && project.website ? (
									<span aria-hidden="true" className="wk__link-sep">
										/
									</span>
								) : null}
								{project.website ? (
									<a
										className="wk__link"
										href={project.website}
										rel="noreferrer"
										target="_blank"
									>
										<span>Website</span>
										<ArrowUpRightIcon size={11} />
									</a>
								) : null}
								{project.teaser || project.patent ? (
									<>
										<span aria-hidden="true" className="wk__link-sep">
											/
										</span>
										<a
											className="wk__link"
											href={project.teaser ?? project.github}
											rel="noreferrer"
											target="_blank"
										>
											<span>{project.patent ? "Patent Details" : "Teaser Video"}</span>
											<ArrowUpRightIcon size={11} />
										</a>
									</>
								) : null}
							</div>

							<div className="wk__footer">
								<div aria-label="Technology stack" className="wk__tech-stack">
									{project.tags
										.filter((t) => t !== "Patent Granted")
										.map((t) => (
											<TechBadge key={t} name={t} />
										))}
								</div>
								{project.dateSpan ? (
									<span className="wk__date-span">{project.dateSpan}</span>
								) : null}
							</div>
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

function BarcodeGraphic({ code }: { code: string }) {
	return (
		<div aria-hidden="true" className="tkt-card__barcode">
			<svg
				className="tkt-barcode-svg"
				height="24"
				preserveAspectRatio="none"
				viewBox="0 0 160 24"
				width="100%"
			>
				<rect fill="currentColor" height="24" width="2" x="0" />
				<rect fill="currentColor" height="24" width="1" x="4" />
				<rect fill="currentColor" height="24" width="3" x="7" />
				<rect fill="currentColor" height="24" width="1" x="12" />
				<rect fill="currentColor" height="24" width="4" x="15" />
				<rect fill="currentColor" height="24" width="2" x="21" />
				<rect fill="currentColor" height="24" width="1" x="25" />
				<rect fill="currentColor" height="24" width="3" x="28" />
				<rect fill="currentColor" height="24" width="2" x="33" />
				<rect fill="currentColor" height="24" width="4" x="37" />
				<rect fill="currentColor" height="24" width="1" x="43" />
				<rect fill="currentColor" height="24" width="2" x="46" />
				<rect fill="currentColor" height="24" width="3" x="50" />
				<rect fill="currentColor" height="24" width="1" x="55" />
				<rect fill="currentColor" height="24" width="4" x="58" />
				<rect fill="currentColor" height="24" width="2" x="64" />
				<rect fill="currentColor" height="24" width="1" x="68" />
				<rect fill="currentColor" height="24" width="3" x="71" />
				<rect fill="currentColor" height="24" width="2" x="76" />
				<rect fill="currentColor" height="24" width="4" x="80" />
				<rect fill="currentColor" height="24" width="1" x="86" />
				<rect fill="currentColor" height="24" width="2" x="89" />
				<rect fill="currentColor" height="24" width="3" x="93" />
				<rect fill="currentColor" height="24" width="1" x="98" />
				<rect fill="currentColor" height="24" width="4" x="101" />
				<rect fill="currentColor" height="24" width="2" x="107" />
				<rect fill="currentColor" height="24" width="1" x="111" />
				<rect fill="currentColor" height="24" width="3" x="114" />
				<rect fill="currentColor" height="24" width="2" x="119" />
				<rect fill="currentColor" height="24" width="4" x="123" />
				<rect fill="currentColor" height="24" width="1" x="129" />
				<rect fill="currentColor" height="24" width="2" x="132" />
				<rect fill="currentColor" height="24" width="3" x="136" />
				<rect fill="currentColor" height="24" width="1" x="141" />
				<rect fill="currentColor" height="24" width="4" x="144" />
				<rect fill="currentColor" height="24" width="2" x="150" />
				<rect fill="currentColor" height="24" width="1" x="154" />
				<rect fill="currentColor" height="24" width="3" x="157" />
			</svg>
			<span className="tkt-barcode-code">{code}</span>
		</div>
	);
}

export function EducationSection() {
	return (
		<div className="education-container">
			<div className="tkt">
				{educationItems.map((edu) => (
					<article className="tkt-card" key={edu.id}>
						<div className="tkt-card__top">
							<div className="tkt-card__head">
								<h3 className="tkt-card__title">
									<span>{edu.institution}</span>
									{edu.flag ? <span className="tkt-card__flag">{edu.flag}</span> : null}
								</h3>
								<p className="tkt-card__degree">{edu.degree}</p>
								<p className="tkt-card__period">{edu.period}</p>
							</div>

							<div className="tkt-card__divider">
								<span aria-hidden="true" className="tkt-notch tkt-notch--left" />
								<span aria-hidden="true" className="tkt-perf-line" />
								<span aria-hidden="true" className="tkt-notch tkt-notch--right" />
							</div>

							<div className="tkt-card__middle">
								<div className="tkt-card__score">{edu.score}</div>
								{edu.honors && edu.honors.length > 0 ? (
									<ul className="tkt-card__honors">
										{edu.honors.map((honor) => (
											<li className="tkt-card__honor" key={honor}>
												<span aria-hidden="true" className="tkt-bullet">
													•
												</span>
												<span>{honor}</span>
											</li>
										))}
									</ul>
								) : null}
							</div>
						</div>

						<div className="tkt-card__bottom">
							<BarcodeGraphic code={edu.barcode ?? "TKT-2024-EDU"} />
						</div>
					</article>
				))}
			</div>

			<div className="classes-ticker-section">
				<div className="classes-ticker__label">
					<span>Favorite Classes & Core Coursework</span>
				</div>

				<div aria-label="Favorite coursework ticker" className="classes-ticker" tabIndex={0}>
					<div className="classes-ticker__row">
						<div className="classes-ticker__track classes-ticker__track--left">
							{favoriteCoursesRow1.concat(favoriteCoursesRow1).map((course, idx) => (
								<span className="class-chip" key={`${course.name}-${idx}`}>
									<span className="class-chip__name">{course.name}</span>
									<span
										className={`class-chip__grade class-chip__grade--${course.grade
											.replace("+", "plus")
											.toLowerCase()}`}
									>
										{course.grade}
									</span>
								</span>
							))}
						</div>
					</div>

					<div className="classes-ticker__row">
						<div className="classes-ticker__track classes-ticker__track--right">
							{favoriteCoursesRow2.concat(favoriteCoursesRow2).map((course, idx) => (
								<span className="class-chip" key={`${course.name}-${idx}`}>
									<span className="class-chip__name">{course.name}</span>
									<span
										className={`class-chip__grade class-chip__grade--${course.grade
											.replace("+", "plus")
											.toLowerCase()}`}
									>
										{course.grade}
									</span>
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
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
   08. Competitions & Hackathons Section
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
	const [activeTab, setActiveTab] = useState<"playlists" | "control">("playlists");
	const spotifyPlaylistUrl = "https://open.spotify.com/playlist/7IbpZshuCcooJoDMvOs9Yp";

	const leftSpines = [
		{ title: "matt's coffee shop", bg: "#d97706", color: "#fff", width: 28 },
		{ title: "privilege of pressure", bg: "#1e3a8a", color: "#e0e7ff", width: 34 },
		{ title: "demanding excellence", bg: "#991b1b", color: "#fee2e2", width: 30 },
	];

	const rightSpines = [
		{ title: "the web", bg: "#065f46", color: "#d1fae5", width: 26 },
		{ title: "playing ping-pong with your boomer", bg: "#7c2d12", color: "#ffedd5", width: 32 },
		{ title: "v", bg: "#374151", color: "#f3f4f6", width: 22 },
		{ title: "as we fall.", bg: "#581c87", color: "#f3e8ff", width: 28 },
		{ title: "university is fun!", bg: "#831843", color: "#fce7f3", width: 30 },
		{ title: "nebulosity", bg: "#1e293b", color: "#e2e8f0", width: 26 },
		{ title: "run, boy, run", bg: "#b45309", color: "#fef3c7", width: 32 },
		{ title: "proj. academia", bg: "#14532d", color: "#dcfce7", width: 28 },
		{ title: "expeditionary", bg: "#701a75", color: "#fae8ff", width: 34 },
		{ title: "AGAIN!?", bg: "#9f1239", color: "#ffe4e6", width: 24 },
		{ title: "slowly.", bg: "#334155", color: "#f1f5f9", width: 26 },
	];

	const handleTabChange = (tab: "playlists" | "control") => {
		sound.playAccordion(true);
		setActiveTab(tab);
	};

	return (
		<div className="spotify-shelf-wrapper">
			{/* Header Tab Bar matching reference */}
			<div className="spotify-head-controls">
				<div aria-label="Spotify views" className="ed3__section-tabs" role="tablist">
					<button
						aria-selected={activeTab === "playlists"}
						className={`ed3__section-tabs__tab ${
							activeTab === "playlists" ? "ed3__section-tabs__tab--active" : ""
						}`}
						onClick={() => handleTabChange("playlists")}
						role="tab"
						type="button"
					>
						Playlists
					</button>
					<span aria-hidden="true" className="ed3__section-tabs__slash">
						/
					</span>
					<button
						aria-selected={activeTab === "control"}
						className={`ed3__section-tabs__tab ${
							activeTab === "control" ? "ed3__section-tabs__tab--active" : ""
						}`}
						onClick={() => handleTabChange("control")}
						role="tab"
						type="button"
					>
						Control my Music
					</button>
				</div>
			</div>

			{activeTab === "playlists" ? (
				<div className="spotify-shelf-stage">
					{/* Bookshelf Container */}
					<div className="bookshelf-scene">
						{/* Items row resting on shelf */}
						<div className="bookshelf-content">
							{/* Left Book Spines */}
							<div className="book-cluster book-cluster--left">
								{leftSpines.map((book) => (
									<a
										aria-label={book.title}
										className="book-spine"
										href={spotifyPlaylistUrl}
										key={book.title}
										rel="noreferrer"
										style={{
											backgroundColor: book.bg,
											color: book.color,
											width: `${book.width}px`,
										}}
										target="_blank"
									>
										<span className="book-spine__text">{book.title}</span>
									</a>
								))}
							</div>

							{/* Centerpiece Vinyl & Sleeve */}
							<a
								aria-label="Dhruv's Spotify Playlist - Open in Spotify"
								className="vinyl-sleeve-unit"
								href={spotifyPlaylistUrl}
								rel="noreferrer"
								target="_blank"
							>
								{/* Realistic Sliding Vinyl Record */}
								<div aria-hidden="true" className="vinyl-disc">
									{/* Outer Grooves */}
									<div className="vinyl-groove vinyl-groove--1" />
									<div className="vinyl-groove vinyl-groove--2" />
									<div className="vinyl-groove vinyl-groove--3" />
									{/* Center Label */}
									<div className="vinyl-label">
										<div className="vinyl-label__ring">
											<span className="vinyl-label__text">✦ countryish (74 tracks) ✦</span>
										</div>
										<div className="vinyl-center-hole" />
									</div>
								</div>

								{/* Album Sleeve Cover (4 Quadrants) */}
								<div className="album-sleeve">
									<div className="album-sleeve__grid">
										<div className="album-sleeve__cell album-sleeve__cell--1" />
										<div className="album-sleeve__cell album-sleeve__cell--2" />
										<div className="album-sleeve__cell album-sleeve__cell--3" />
										<div className="album-sleeve__cell album-sleeve__cell--4" />
									</div>
									<div className="album-sleeve__overlay">
										<span className="album-sleeve__tag">Dhruv&apos;s Focus & Flow</span>
										<SpotifyIcon className="album-sleeve__icon" size={20} />
									</div>
								</div>
							</a>

							{/* Right Book Spines */}
							<div className="book-cluster book-cluster--right">
								{rightSpines.map((book) => (
									<a
										aria-label={book.title}
										className="book-spine"
										href={spotifyPlaylistUrl}
										key={book.title}
										rel="noreferrer"
										style={{
											backgroundColor: book.bg,
											color: book.color,
											width: `${book.width}px`,
										}}
										target="_blank"
									>
										<span className="book-spine__text">{book.title}</span>
									</a>
								))}
							</div>
						</div>

						{/* 3D Wooden Shelf Plinth & Supports */}
						<div aria-hidden="true" className="shelf-plinth">
							<div className="shelf-plinth__top" />
							<div className="shelf-plinth__front" />
							<div className="shelf-bracket shelf-bracket--left" />
							<div className="shelf-bracket shelf-bracket--right" />
						</div>
					</div>

					{/* Under-shelf track activity indicator */}
					<div className="spotify-shelf-subtext">
						<div className="spotify-presence-wave">
							<span className="wave-bar wave-bar--1" />
							<span className="wave-bar wave-bar--2" />
							<span className="wave-bar wave-bar--3" />
						</div>
						<div className="spotify-shelf-caption">
							<span className="spotify-shelf-time">Listened 2 hours ago to</span>
							<span className="spotify-shelf-track">
								<a
									className="text-link"
									href={spotifyPlaylistUrl}
									rel="noreferrer"
									target="_blank"
								>
									Lightning Speed
								</a>{" "}
								<span className="spotify-shelf-by">by</span>{" "}
								<a
									className="text-link"
									href={spotifyPlaylistUrl}
									rel="noreferrer"
									target="_blank"
								>
									Timmy McKeever
								</a>
							</span>
						</div>
					</div>

					{/* Curated list under shelf */}
					<div className="spotify-curated-list">
						<ul aria-label="Curated playlists" className="idx__list">
							{playlists.map((pl) => (
								<li className="idx__row" key={pl.title}>
									<div className="idx__grid">
										<span className="idx__details">
											<a
												className="idx__title-text text-link"
												href={spotifyPlaylistUrl}
												rel="noreferrer"
												target="_blank"
											>
												{pl.title}
											</a>
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
				</div>
			) : (
				<div className="spotify-control-stage">
					<AmbientRadio />
				</div>
			)}
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
