import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ComponentType,
} from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
	ArrowUpIcon,
	ArrowUpRightIcon,
	CommandIcon,
	GitHubIcon,
	LinkedInIcon,
	MailIcon,
	MenuIcon,
	NotebookPenIcon,
	SparklesIcon,
	XIcon,
} from "./icons";
import { primaryNav, site } from "~/lib/site";
import { ShortcutsDialog, SiteMenuDialog } from "./site-menu";

type Panel = "socials" | "misc" | "ask" | null;
type SocialIcon = ComponentType<{ "aria-hidden"?: boolean; className?: string }>;

const socialLinks: readonly {
	label: string;
	href: string;
	icon: SocialIcon;
	external: boolean;
}[] = [
	{
		label: "GitHub",
		href: site.socials.github,
		icon: GitHubIcon,
		external: true,
	},
	{
		label: "LinkedIn",
		href: site.socials.linkedin,
		icon: LinkedInIcon,
		external: true,
	},
	{ label: "X", href: site.socials.x, icon: XIcon, external: true },
	{
		label: "Resume (PDF)",
		href: site.resumeUrl,
		icon: NotebookPenIcon,
		external: true,
	},
	{
		label: "Notes",
		href: site.socials.notes,
		icon: NotebookPenIcon,
		external: true,
	},
	{ label: "Email", href: `mailto:${site.email}`, icon: MailIcon, external: false },
];

function prefersReducedMotion() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: prefersReducedMotion() ? "auto" : "smooth",
	});
}

function scrollToId(id: string) {
	const element = document.getElementById(id);
	if (!element) return;
	element.scrollIntoView({
		block: "start",
		behavior: prefersReducedMotion() ? "auto" : "smooth",
	});
}

function focusTrigger(panel: Exclude<Panel, null>) {
	document
		.querySelector<HTMLElement>(`[data-panel-trigger="${panel}"]`)
		?.focus();
}

export function SiteHeader() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});
	const [openPanel, setOpenPanel] = useState<Panel>(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const [shortcutsOpen, setShortcutsOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);
	const focusTriggerAfterClose = useRef<Panel>(null);

	const togglePanel = useCallback((panel: Exclude<Panel, null>) => {
		setOpenPanel((current) => {
			if (current === panel) {
				focusTriggerAfterClose.current = panel;
				return null;
			}
			return panel;
		});
	}, []);

	useEffect(() => {
		if (openPanel) {
			panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
			return;
		}

		const panel = focusTriggerAfterClose.current;
		if (panel) {
			focusTriggerAfterClose.current = null;
			focusTrigger(panel);
		}
	}, [openPanel]);

	useEffect(() => {
		if (!openPanel) return;

		const handlePointerDown = (event: PointerEvent) => {
			const target = event.target;
			if (target instanceof Element && target.closest("[data-appbar-menu]")) {
				return;
			}
			setOpenPanel(null);
		};

		document.addEventListener("pointerdown", handlePointerDown);
		return () => document.removeEventListener("pointerdown", handlePointerDown);
	}, [openPanel]);

	useEffect(() => {
		if (!openPanel) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key !== "Escape") return;
			event.preventDefault();
			const panel = openPanel;
			setOpenPanel(null);
			focusTrigger(panel);
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [openPanel]);

	useEffect(() => {
		const handleShortcut = (event: KeyboardEvent) => {
			if (
				event.defaultPrevented ||
				event.repeat ||
				event.metaKey ||
				event.ctrlKey ||
				event.altKey ||
				document.querySelector("dialog[open]")
			) {
				return;
			}

			const target = event.target;
			if (
				target instanceof HTMLElement &&
				(target.isContentEditable ||
					/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
			) {
				return;
			}

			const key = event.key.toLowerCase();

			if (key === "?") {
				event.preventDefault();
				setOpenPanel(null);
				setShortcutsOpen(true);
				return;
			}

			if (key === "h") {
				event.preventDefault();
				scrollToTop();
				return;
			}

			if (key === "p") {
				event.preventDefault();
				scrollToId("featured-projects");
				return;
			}

			if (key === "c") {
				event.preventDefault();
				scrollToId("contact");
				return;
			}

			if (key === "n") {
				event.preventDefault();
				window.open(site.socials.notes, "_blank", "noopener,noreferrer");
				return;
			}

			if (key === "s") {
				event.preventDefault();
				togglePanel("socials");
				return;
			}

			if (key === "m") {
				event.preventDefault();
				togglePanel("misc");
				return;
			}

			if (key === "g") {
				event.preventDefault();
				togglePanel("ask");
			}
		};

		window.addEventListener("keydown", handleShortcut);
		return () => window.removeEventListener("keydown", handleShortcut);
	}, [togglePanel]);

	return (
		<>
			<a className="skip-link" href="#main-content">
				Skip to main content
			</a>

			<div className="announcement">
				<p>Open to interesting problems and good conversations.</p>
			</div>

			<header className="appbar-wrap">
				<div className="appbar-shell">
					<nav aria-label="Primary" className="appbar">
						{primaryNav.map((item) =>
							item.external ? (
								<a
									aria-keyshortcuts={item.key.toUpperCase()}
									className="appbar__link"
									href={item.href}
									key={item.label}
									rel="noreferrer"
									target="_blank"
								>
									<span>{item.label}</span>
									<ArrowUpRightIcon
										aria-hidden="true"
										className="appbar__external"
										size={11}
										strokeWidth={1.75}
									/>
									<kbd aria-hidden="true" className="appbar__kbd">
										{item.key}
									</kbd>
								</a>
							) : (
								<Link
									aria-current={
										item.label === "Home" && pathname === "/"
											? "page"
											: undefined
									}
									aria-keyshortcuts={item.key.toUpperCase()}
									className={[
										"appbar__link",
										item.label === "Home" && pathname === "/"
											? "appbar__link--current"
											: "",
									]
										.filter(Boolean)
										.join(" ")}
									hash={item.hash}
									key={item.label}
									to={item.to}
								>
									<span>{item.label}</span>
									<kbd aria-hidden="true" className="appbar__kbd">
										{item.key}
									</kbd>
								</Link>
							),
						)}
						<span aria-hidden="true" className="appbar__rule" />

						<div className="appbar__menu" data-appbar-menu>
							<button
								aria-controls="appbar-socials-panel"
								aria-expanded={openPanel === "socials"}
								aria-haspopup="true"
								aria-keyshortcuts="S"
								className="appbar__link"
								data-panel-trigger="socials"
								onClick={() => togglePanel("socials")}
								type="button"
							>
								<span>Socials</span>
								<kbd aria-hidden="true" className="appbar__kbd">
									s
								</kbd>
							</button>
							{openPanel === "socials" ? (
								<div
									aria-label="Social links"
									className="appbar__panel"
									id="appbar-socials-panel"
									ref={panelRef}
									role="group"
								>
									{socialLinks.map((social) => {
										const Icon = social.icon;
										return (
											<a
												className="appbar__panel-row"
												href={social.href}
												key={social.label}
												onClick={() => setOpenPanel(null)}
												{...(social.external
													? { rel: "noreferrer", target: "_blank" }
													: {})}
											>
												<Icon aria-hidden />
												<span>{social.label}</span>
												{social.external ? (
													<ArrowUpRightIcon
														aria-hidden="true"
														className="appbar__panel-arrow"
														size={11}
														strokeWidth={1.75}
													/>
												) : null}
											</a>
										);
									})}
								</div>
							) : null}
						</div>

						<div className="appbar__menu" data-appbar-menu>
							<button
								aria-controls="appbar-misc-panel"
								aria-expanded={openPanel === "misc"}
								aria-haspopup="true"
								aria-keyshortcuts="M"
								className="appbar__link"
								data-panel-trigger="misc"
								onClick={() => togglePanel("misc")}
								type="button"
							>
								<span>Misc.</span>
								<kbd aria-hidden="true" className="appbar__kbd">
									m
								</kbd>
							</button>
							{openPanel === "misc" ? (
								<div
									aria-label="Site menu"
									className="appbar__panel"
									id="appbar-misc-panel"
									ref={panelRef}
									role="group"
								>
									<button
										className="appbar__panel-row"
										onClick={() => {
											setOpenPanel(null);
											scrollToTop();
										}}
										type="button"
									>
										<ArrowUpIcon aria-hidden="true" size={14} strokeWidth={1.75} />
										<span>Back to top</span>
										<kbd aria-hidden="true">H</kbd>
									</button>
									<button
										className="appbar__panel-row"
										onClick={() => {
											setOpenPanel(null);
											setShortcutsOpen(true);
										}}
										type="button"
									>
										<CommandIcon
											aria-hidden="true"
											size={14}
											strokeWidth={1.75}
										/>
										<span>Keyboard shortcuts</span>
										<kbd aria-hidden="true">?</kbd>
									</button>
									<button
										className="appbar__panel-row"
										onClick={() => {
											setOpenPanel(null);
											setMenuOpen(true);
										}}
										type="button"
									>
										<MenuIcon
											aria-hidden="true"
											size={14}
											strokeWidth={1.75}
										/>
										<span>All sections</span>
										<span aria-hidden="true" className="appbar__panel-arrow">
											→
										</span>
									</button>
									<a
										className="appbar__panel-row"
										href={`mailto:${site.email}`}
										onClick={() => setOpenPanel(null)}
									>
										<MailIcon aria-hidden="true" size={14} strokeWidth={1.75} />
										<span>Email me</span>
									</a>
								</div>
							) : null}
						</div>

						<div className="appbar__menu" data-appbar-menu>
							<button
								aria-controls="appbar-ask-panel"
								aria-expanded={openPanel === "ask"}
								aria-haspopup="true"
								aria-keyshortcuts="G"
								className="appbar__link appbar__link--ask"
								data-panel-trigger="ask"
								onClick={() => togglePanel("ask")}
								type="button"
							>
								<SparklesIcon
									aria-hidden="true"
									className="appbar__ask-icon"
									size={12}
									strokeWidth={1.75}
								/>
								<span>Ask Dhruv</span>
								<kbd aria-hidden="true" className="appbar__kbd">
									g
								</kbd>
							</button>
							{openPanel === "ask" ? (
								<div
									aria-label="Ask Dhruv"
									className="appbar__panel appbar__panel--ask"
									id="appbar-ask-panel"
									ref={panelRef}
									role="group"
								>
									<p className="eyebrow">Phase 6 / AI guide</p>
									<p className="appbar__ask-title">Ask Dhruv</p>
									<p className="appbar__ask-copy">
										A small guide trained on this site. It ships in Phase 6.
										Email works today.
									</p>
									<a
										className="appbar__ask-link"
										href={`mailto:${site.email}`}
										onClick={() => setOpenPanel(null)}
									>
										Email Dhruv
										<ArrowUpRightIcon
											aria-hidden="true"
											size={12}
											strokeWidth={1.75}
										/>
									</a>
								</div>
							) : null}
						</div>
					</nav>

					<button
						aria-expanded={menuOpen}
						aria-haspopup="dialog"
						aria-label="Open menu"
						className="appbar__mobile"
						onClick={() => setMenuOpen(true)}
						type="button"
					>
						<MenuIcon aria-hidden="true" size={16} strokeWidth={1.75} />
					</button>

					<Link
						aria-label="DK, Dhruv Koshta, home"
						className="appbar__home-mark"
						onClick={scrollToTop}
						to="/"
					>
						DK
					</Link>
				</div>
			</header>

			<SiteMenuDialog onClose={() => setMenuOpen(false)} open={menuOpen} />
			<ShortcutsDialog
				onClose={() => setShortcutsOpen(false)}
				open={shortcutsOpen}
			/>
		</>
	);
}
