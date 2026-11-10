import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { animate, AnimatePresence, motion, useMotionValue } from "framer-motion";
import {
	ArrowUpRightIcon,
	CursorIcon,
	DiscordIcon,
	GitHubIcon,
	HeartIcon,
	InstagramIcon,
	LinkedInIcon,
	MailIcon,
	MenuIcon,
	MessageSquareIcon,
	MousePointerClickIcon,
	PawIcon,
	RssIcon,
	SparklesIcon,
	SpeakerIcon,
	SpeakerMuteIcon,
	XIcon,
} from "./icons";
import { sound } from "~/lib/sound";
import { usePresence } from "~/lib/use-presence";
import { site } from "~/lib/site";
import { ShortcutsDialog, SiteMenuDialog } from "./site-menu";

type NavItemId = "home" | "blog" | "resume" | "socials" | "misc" | "mattgpt";
type DropdownId = "socials" | "misc" | "mattgpt";

function prefersReducedMotion() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

function ToggleSwitch({
	enabled,
	onToggle,
	label,
}: {
	enabled: boolean;
	onToggle: () => void;
	label: string;
}) {
	return (
		<div className="flex items-center gap-1.5">
			<span className="text-[10px] font-mono text-neutral-400 select-none">
				{enabled ? "on" : "off"}
			</span>
			<button
				type="button"
				role="switch"
				aria-checked={enabled}
				aria-label={label}
				onClick={(e) => {
					e.stopPropagation();
					onToggle();
				}}
				className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 ${
					enabled
						? "bg-neutral-900"
						: "bg-neutral-200"
				}`}
			>
				<motion.span
					layout
					transition={{ type: "spring", stiffness: 500, damping: 30 }}
					className={`pointer-events-none block h-3 w-3 rounded-full shadow-sm ${
						enabled
							? "bg-white translate-x-3"
							: "bg-white translate-x-0"
					}`}
				/>
			</button>
		</div>
	);
}

export function SiteHeader() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	const [hoveredNavId, setHoveredNavId] = useState<NavItemId | null>(null);
	const [activeDropdown, setActiveDropdown] = useState<DropdownId | null>(null);
	const [openOnHover, setOpenOnHover] = useState(true);
	const [showPet, setShowPet] = useState(true);
	const [showLiveCursors, setShowLiveCursors] = useState(true);
	const [soundActive, setSoundActive] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [shortcutsOpen, setShortcutsOpen] = useState(false);
	const [blrTime, setBlrTime] = useState("");
	const { count: presenceCount } = usePresence();

	const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const navRef = useRef<HTMLElement>(null);
	const socialsTriggerRef = useRef<HTMLButtonElement>(null);
	const miscTriggerRef = useRef<HTMLButtonElement>(null);
	const mattGptTriggerRef = useRef<HTMLButtonElement>(null);
	const openedByHoverTimeRef = useRef<number>(0);

	// Single sliding hover pill, measured against the hovered item so the
	// highlight can never lag behind or land on the wrong item.
	const pillX = useMotionValue(0);
	const pillY = useMotionValue(0);
	const pillWidth = useMotionValue(0);
	const pillHeight = useMotionValue(0);
	const pillOpacity = useMotionValue(0);

	useEffect(() => {
		setSoundActive(sound.isEnabled());

		try {
			const savedPet = localStorage.getItem("show-pet");
			if (savedPet === "false") setShowPet(false);
			const savedHover = localStorage.getItem("open-on-hover");
			if (savedHover === "false") setOpenOnHover(false);
		} catch {
			// ignore localStorage error
		}

		const updateTime = () => {
			try {
				const formatted = new Intl.DateTimeFormat("en-US", {
					timeZone: "Asia/Kolkata",
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				}).format(new Date());
				setBlrTime(formatted);
			} catch {
				setBlrTime("");
			}
		};
		updateTime();
		const interval = setInterval(updateTime, 10000);
		return () => clearInterval(interval);
	}, []);

	const handleToggleSound = useCallback(() => {
		const next = sound.toggle();
		setSoundActive(next);
	}, []);

	const handleTogglePet = useCallback(() => {
		sound.play("click");
		setShowPet((prev) => {
			const next = !prev;
			try {
				localStorage.setItem("show-pet", String(next));
			} catch {
				// ignore localStorage error
			}
			window.dispatchEvent(
				new CustomEvent("toggle-pixel-pet", { detail: { visible: next } }),
			);
			return next;
		});
	}, []);

	const handleToggleLiveCursors = useCallback(() => {
		sound.play("click");
		setShowLiveCursors((prev) => !prev);
	}, []);

	const handleToggleOpenOnHover = useCallback(() => {
		sound.play("click");
		setOpenOnHover((prev) => {
			const next = !prev;
			try {
				localStorage.setItem("open-on-hover", String(next));
			} catch {
				// ignore localStorage error
			}
			return next;
		});
	}, []);

	const handleLinkHover = useCallback(() => {
		if (sound.isEnabled()) {
			sound.play("click");
		}
	}, []);

	const handleNavHover = useCallback(
		(id: NavItemId) => {
			setHoveredNavId(id);
			handleLinkHover();

			if (openOnHover) {
				if (hoverTimeoutRef.current) {
					clearTimeout(hoverTimeoutRef.current);
					hoverTimeoutRef.current = null;
				}
				if (id === "socials" || id === "misc" || id === "mattgpt") {
					openedByHoverTimeRef.current = Date.now();
					setActiveDropdown(id);
				} else {
					setActiveDropdown(null);
				}
			}
		},
		[openOnHover, handleLinkHover],
	);

	const handleNavMouseLeave = useCallback(() => {
		setHoveredNavId(null);
		if (openOnHover) {
			if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
			hoverTimeoutRef.current = setTimeout(() => {
				setActiveDropdown(null);
			}, 280);
		}
	}, [openOnHover]);

	const handleDropdownMouseEnter = useCallback(() => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
			hoverTimeoutRef.current = null;
		}
	}, []);

	const handleDropdownMouseLeave = useCallback(() => {
		if (openOnHover) {
			if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
			hoverTimeoutRef.current = setTimeout(() => {
				setActiveDropdown(null);
			}, 280);
		}
	}, [openOnHover]);

	// Move the shared hover pill to whichever item is currently hovered.
	useEffect(() => {
		const nav = navRef.current;
		if (!nav) return;

		const controls: { stop: () => void }[] = [];
		const measure = () => {
			controls.forEach((control) => control.stop());
			controls.length = 0;

			if (!hoveredNavId) {
				controls.push(animate(pillOpacity, 0, { duration: 0.16, ease: "easeOut" }));
				return;
			}

			const item = nav.querySelector<HTMLElement>(`[data-nav-item="${hoveredNavId}"]`);
			if (!item) return;

			const navRect = nav.getBoundingClientRect();
			const itemRect = item.getBoundingClientRect();
			const spring = { type: "spring", stiffness: 520, damping: 34, mass: 0.9 } as const;

			controls.push(
				animate(pillX, itemRect.left - navRect.left - nav.clientLeft, spring),
				animate(pillY, itemRect.top - navRect.top - nav.clientTop, spring),
				animate(pillWidth, itemRect.width, spring),
				animate(pillHeight, itemRect.height, spring),
				animate(pillOpacity, 1, { duration: 0.12 }),
			);
		};

		measure();
		window.addEventListener("resize", measure);

		return () => {
			window.removeEventListener("resize", measure);
			controls.forEach((control) => control.stop());
		};
	}, [hoveredNavId, pillX, pillY, pillWidth, pillHeight, pillOpacity]);

	// Close on click outside
	useEffect(() => {
		if (!activeDropdown) return;

		const handlePointerDown = (event: PointerEvent) => {
			const target = event.target;
			if (target instanceof Element && navRef.current?.contains(target)) {
				return;
			}
			setActiveDropdown(null);
		};

		document.addEventListener("pointerdown", handlePointerDown);
		return () => document.removeEventListener("pointerdown", handlePointerDown);
	}, [activeDropdown]);

	// Keyboard shortcuts
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

			if (key === "escape") {
				if (activeDropdown) {
					event.preventDefault();
					const last = activeDropdown;
					setActiveDropdown(null);
					if (last === "socials") socialsTriggerRef.current?.focus();
					else if (last === "misc") miscTriggerRef.current?.focus();
					else if (last === "mattgpt") mattGptTriggerRef.current?.focus();
					return;
				}
			}

			if (key === "?") {
				event.preventDefault();
				sound.play("click");
				setActiveDropdown(null);
				setShortcutsOpen(true);
				return;
			}

			if (key === "u") {
				event.preventDefault();
				handleToggleSound();
				return;
			}

			if (key === "h") {
				event.preventDefault();
				sound.play("click");
				setActiveDropdown(null);
				scrollToTop();
				return;
			}

			if (key === "b") {
				event.preventDefault();
				sound.play("click");
				setActiveDropdown(null);
				scrollToId("blog");
				return;
			}

			if (key === "p") {
				event.preventDefault();
				sound.play("click");
				setActiveDropdown(null);
				scrollToId("featured-projects");
				return;
			}

			if (key === "c") {
				event.preventDefault();
				sound.play("click");
				setActiveDropdown(null);
				scrollToId("contact");
				return;
			}

			if (key === "r") {
				event.preventDefault();
				sound.play("click");
				setActiveDropdown(null);
				window.open(site.resumeUrl, "_blank", "noopener,noreferrer");
				return;
			}

			if (key === "s") {
				event.preventDefault();
				sound.play("click");
				setActiveDropdown((cur) => (cur === "socials" ? null : "socials"));
				return;
			}

			if (key === "m") {
				event.preventDefault();
				sound.play("click");
				setActiveDropdown((cur) => (cur === "misc" ? null : "misc"));
				return;
			}

			if (key === "g") {
				event.preventDefault();
				sound.play("click");
				setActiveDropdown((cur) => (cur === "mattgpt" ? null : "mattgpt"));
			}
		};

		window.addEventListener("keydown", handleShortcut);
		return () => window.removeEventListener("keydown", handleShortcut);
	}, [activeDropdown, handleToggleSound]);

	const socialsList = [
		{
			id: "contact",
			label: "Contact Form",
			icon: MessageSquareIcon,
			action: () => {
				sound.play("click");
				setActiveDropdown(null);
				scrollToId("contact");
			},
			external: false,
		},
		{
			id: "email",
			label: "Email",
			icon: MailIcon,
			href: `mailto:${site.email}`,
			external: false,
		},
		{
			id: "linkedin",
			label: "LinkedIn",
			icon: LinkedInIcon,
			href: site.socials.linkedin,
			external: true,
		},
		{
			id: "github",
			label: "GitHub",
			icon: GitHubIcon,
			href: site.socials.github,
			external: true,
		},
		{
			id: "x",
			label: "X",
			icon: XIcon,
			href: site.socials.x,
			external: true,
		},
		{
			id: "instagram",
			label: "Instagram",
			icon: InstagramIcon,
			href: "https://instagram.com/dhruvkoshta",
			external: true,
		},
		{
			id: "discord",
			label: "Discord",
			icon: DiscordIcon,
			href: "https://discord.com/users/dhruvkoshta",
			external: true,
		},
		{
			id: "rss",
			label: "RSS",
			icon: RssIcon,
			href: "https://notes.dhruvkoshta.me/rss.xml",
			external: true,
		},
	];

	return (
		<>
			<a className="skip-link" href="#main-content">
				Skip to main content
			</a>

			<header className="appbar-wrap">
				<div className="appbar-shell">
					<div className="appbar-left">
						{/* Floating Centered Pill Navbar */}
						<nav
							ref={navRef}
							aria-label="Primary"
							onMouseLeave={handleNavMouseLeave}
							className="appbar"
						>
							{/* Shared sliding hover pill (positioned by JS measurement) */}
							<motion.div
								aria-hidden="true"
								className="rounded-full bg-neutral-200/60 pointer-events-none"
								data-pill=""
								style={{
									x: pillX,
									y: pillY,
									width: pillWidth,
									height: pillHeight,
									opacity: pillOpacity,
								}}
							/>

							{/* Item 1: Home (key 'h') */}
							<div
								className="relative"
								data-nav-item="home"
								onMouseEnter={() => handleNavHover("home")}
							>
								<Link
									to="/"
									aria-label="Home Projects"
									aria-current={pathname === "/" ? "page" : undefined}
									aria-keyshortcuts="H"
									className={[
										"appbar__link",
										pathname === "/" ? "appbar__link--current" : "",
									]
										.filter(Boolean)
										.join(" ")}
									onClick={() => {
										sound.play("click");
										scrollToTop();
									}}
								>
									<span>Home</span>
									<kbd aria-hidden="true" className="appbar__kbd">
										h
									</kbd>
								</Link>
							</div>

							{/* Item 2: Blog (key 'b') */}
							<div
								className="relative"
								data-nav-item="blog"
								onMouseEnter={() => handleNavHover("blog")}
							>
								<a
									href="https://notes.dhruvkoshta.me"
									target="_blank"
									rel="noreferrer"
									aria-label="Blog Notes"
									aria-keyshortcuts="B"
									className="appbar__link"
									onClick={() => sound.play("click")}
								>
									<span>Blog</span>
									<kbd aria-hidden="true" className="appbar__kbd">
										b
									</kbd>
								</a>
							</div>

							{/* Item 3: Résumé (key 'r') with Upward Spring Micro-Interaction */}
							<div
								className="relative"
								data-nav-item="resume"
								onMouseEnter={() => handleNavHover("resume")}
							>
								<a
									href={site.resumeUrl}
									target="_blank"
									rel="noreferrer"
									aria-label="Résumé"
									aria-keyshortcuts="R"
									className="appbar__link"
									onClick={() => sound.play("click")}
								>
									<motion.span
										animate={{ y: hoveredNavId === "resume" ? -3.5 : 0 }}
										transition={{ type: "spring", stiffness: 400, damping: 25 }}
										className="inline-flex items-center gap-1"
									>
										<span>Résumé</span>
										<motion.span
											animate={{
												y: hoveredNavId === "resume" ? -5.5 : 0,
												x: hoveredNavId === "resume" ? 1.5 : 0,
											}}
											transition={{ type: "spring", stiffness: 400, damping: 25 }}
											className="inline-block text-neutral-400"
										>
											<ArrowUpRightIcon size={11} strokeWidth={1.75} />
										</motion.span>
									</motion.span>
									<kbd aria-hidden="true" className="appbar__kbd">
										r
									</kbd>
								</a>
							</div>

							{/* Item 4: Socials (key 's') with Hover Dropdown Card */}
							<div
								className="relative"
								data-nav-item="socials"
								onMouseEnter={() => handleNavHover("socials")}
							>
								<button
									ref={socialsTriggerRef}
									type="button"
									aria-controls="appbar-socials-panel"
									aria-expanded={activeDropdown === "socials"}
									aria-haspopup="true"
									aria-keyshortcuts="S"
									data-panel-trigger="socials"
									className="appbar__link"
									onMouseEnter={handleDropdownMouseEnter}
									onClick={() => {
										sound.play("click");
										setActiveDropdown((cur) => {
											if (
												Date.now() - (openedByHoverTimeRef.current ?? 0) < 600
											) {
												return "socials";
											}
											return cur === "socials" ? null : "socials";
										});
									}}
								>
									<span>Socials</span>
									<kbd aria-hidden="true" className="appbar__kbd">
										s
									</kbd>
								</button>

								{/* Socials Floating Card */}
								<AnimatePresence>
									{activeDropdown === "socials" && (
										<motion.div
											id="appbar-socials-panel"
											role="group"
											aria-label="Social links"
											initial={{ opacity: 0, y: -4, scale: 0.97 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={{ opacity: 0, y: -4, scale: 0.97 }}
											transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
											className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 z-50 min-w-[210px] before:absolute before:-top-3 before:left-0 before:right-0 before:h-4 before:content-['']"
											onMouseEnter={handleDropdownMouseEnter}
											onMouseLeave={handleDropdownMouseLeave}
										>
											<div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-200/80 p-1.5 space-y-0.5">
												{socialsList.map((item) => {
													const Icon = item.icon;
													const content = (
														<>
															<div className="flex items-center gap-2">
																<Icon
																	size={14}
																	className="text-neutral-500"
																/>
																<span className="text-xs text-neutral-800 font-medium">
																	{item.label}
																</span>
															</div>
															{item.external ? (
																<ArrowUpRightIcon
																	size={11}
																	strokeWidth={1.75}
																	className="text-neutral-400 group-hover:text-neutral-700 transition-colors"
																/>
															) : (
																<span className="text-neutral-400 text-[11px] group-hover:text-neutral-700 transition-colors">
																	&gt;
																</span>
															)}
														</>
													);

													if ("href" in item && item.href) {
														return (
															<a
																key={item.id}
																href={item.href}
																{...(item.external
																	? { target: "_blank", rel: "noreferrer" }
																	: {})}
																onClick={() => {
																	sound.play("click");
																	setActiveDropdown(null);
																}}
																onMouseEnter={handleLinkHover}
																className="group flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer text-left w-full"
															>
																{content}
															</a>
														);
													}

													return (
														<button
															key={item.id}
															type="button"
															onClick={item.action}
															onMouseEnter={handleLinkHover}
															className="group flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer text-left w-full"
														>
															{content}
														</button>
													);
												})}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							{/* Item 5: Misc (key 'm') with Interactive Toggles */}
							<div
								className="relative"
								data-nav-item="misc"
								onMouseEnter={() => handleNavHover("misc")}
							>
								<button
									ref={miscTriggerRef}
									type="button"
									aria-controls="appbar-misc-panel"
									aria-expanded={activeDropdown === "misc"}
									aria-haspopup="true"
									aria-keyshortcuts="M"
									data-panel-trigger="misc"
									className="appbar__link"
									onMouseEnter={handleDropdownMouseEnter}
									onClick={() => {
										sound.play("click");
										setActiveDropdown((cur) => {
											if (
												Date.now() - (openedByHoverTimeRef.current ?? 0) < 600
											) {
												return "misc";
											}
											return cur === "misc" ? null : "misc";
										});
									}}
								>
									<span>Misc</span>
									<kbd aria-hidden="true" className="appbar__kbd">
										m
									</kbd>
								</button>

								{/* Misc Floating Card */}
								<AnimatePresence>
									{activeDropdown === "misc" && (
										<motion.div
											id="appbar-misc-panel"
											role="group"
											aria-label="Misc options"
											initial={{ opacity: 0, y: -4, scale: 0.97 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={{ opacity: 0, y: -4, scale: 0.97 }}
											transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
											className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 z-50 min-w-[230px] before:absolute before:-top-3 before:left-0 before:right-0 before:h-4 before:content-['']"
											onMouseEnter={handleDropdownMouseEnter}
											onMouseLeave={handleDropdownMouseLeave}
										>
											<div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-200/80 p-2 space-y-1">
												{/* Toggle 1: Show Pet */}
												<div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-neutral-100/70 transition-colors">
													<div className="flex items-center gap-2">
														<PawIcon
															size={14}
															className="text-neutral-500"
														/>
														<span className="text-xs text-neutral-800 font-medium">
															Show Pet
														</span>
													</div>
													<ToggleSwitch
														enabled={showPet}
														onToggle={handleTogglePet}
														label="Toggle Byte pet visibility"
													/>
												</div>

												{/* Toggle 2: Show Live Cursors */}
												<div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-neutral-100/70 transition-colors">
													<div className="flex items-center gap-2">
														<CursorIcon
															size={14}
															className="text-neutral-500"
														/>
														<span className="text-xs text-neutral-800 font-medium">
															Show Live Cursors
														</span>
													</div>
													<ToggleSwitch
														enabled={showLiveCursors}
														onToggle={handleToggleLiveCursors}
														label="Toggle live cursors"
													/>
												</div>

												{/* Toggle 3: Open on Hover */}
												<div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-neutral-100/70 transition-colors">
													<div className="flex items-center gap-2">
														<MousePointerClickIcon
															size={14}
															className="text-neutral-500"
														/>
														<span className="text-xs text-neutral-800 font-medium">
															Open on Hover
														</span>
													</div>
													<ToggleSwitch
														enabled={openOnHover}
														onToggle={handleToggleOpenOnHover}
														label="Toggle opening menus on hover"
													/>
												</div>

												{/* Toggle 4: Sound Effects */}
												<div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-neutral-100/70 transition-colors">
													<div className="flex items-center gap-2">
														<SpeakerIcon
															size={14}
															className="text-neutral-500"
														/>
														<span className="text-xs text-neutral-800 font-medium">
															Sound Effects
														</span>
													</div>
													<ToggleSwitch
														enabled={soundActive}
														onToggle={() => {
															handleToggleSound();
														}}
														label="Toggle interface sound effects"
													/>
												</div>

												{/* Divider */}
												<div className="h-px bg-neutral-200/80 my-1" />

												{/* Credits Button */}
												<button
													type="button"
													onClick={() => {
														sound.play("click");
														setActiveDropdown(null);
														setMenuOpen(true);
													}}
													onMouseEnter={handleLinkHover}
													className="group flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer text-left w-full"
												>
													<div className="flex items-center gap-2">
														<HeartIcon
															size={14}
															className="text-neutral-500"
														/>
														<span className="text-xs text-neutral-800 font-medium">
															Credits
														</span>
													</div>
													<span className="text-neutral-400 text-[11px] group-hover:text-neutral-700 transition-colors">
														&gt;
													</span>
												</button>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							{/* Item 6: MattGPT (key 'g') */}
							<div
								className="relative"
								data-nav-item="mattgpt"
								onMouseEnter={() => handleNavHover("mattgpt")}
							>
								<button
									ref={mattGptTriggerRef}
									type="button"
									aria-controls="appbar-ask-panel"
									aria-expanded={activeDropdown === "mattgpt"}
									aria-haspopup="true"
									aria-keyshortcuts="G"
									data-panel-trigger="ask"
									className="appbar__link"
									onMouseEnter={handleDropdownMouseEnter}
									onClick={() => {
										sound.play("click");
										setActiveDropdown((cur) => {
											if (
												Date.now() - (openedByHoverTimeRef.current ?? 0) < 600
											) {
												return "mattgpt";
											}
											return cur === "mattgpt" ? null : "mattgpt";
										});
									}}
								>
									<SparklesIcon
										size={12}
										strokeWidth={1.75}
										className="text-amber-500"
									/>
									<span>MattGPT</span>
									<kbd aria-hidden="true" className="appbar__kbd">
										g
									</kbd>
								</button>

								{/* MattGPT Floating Card */}
								<AnimatePresence>
									{activeDropdown === "mattgpt" && (
										<motion.div
											id="appbar-ask-panel"
											role="group"
											aria-label="MattGPT AI Guide"
											initial={{ opacity: 0, y: -4, scale: 0.97 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={{ opacity: 0, y: -4, scale: 0.97 }}
											transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
											className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 z-50 min-w-[260px] before:absolute before:-top-3 before:left-0 before:right-0 before:h-4 before:content-['']"
											onMouseEnter={handleDropdownMouseEnter}
											onMouseLeave={handleDropdownMouseLeave}
										>
											<div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-200/80 p-3 space-y-2 text-left">
												<div className="flex items-center gap-1.5">
													<SparklesIcon size={13} className="text-amber-500" />
													<span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
														Phase 6 / AI Guide
													</span>
												</div>
												<p className="text-xs font-semibold text-neutral-900">
													MattGPT Assistant
												</p>
												<p className="text-[11px] text-neutral-500 leading-relaxed">
													A contextual AI guide trained on project telemetry, IoT
													patents, and systems architecture.
												</p>
												<a
													href={`mailto:${site.email}`}
													onClick={() => {
														sound.play("click");
														setActiveDropdown(null);
													}}
													className="inline-flex items-center gap-1 text-xs text-neutral-800 font-medium underline underline-offset-2 hover:text-black pt-1"
												>
													<span>Email directly</span>
													<ArrowUpRightIcon size={11} strokeWidth={1.75} />
												</a>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</nav>
					</div>

					{/* Right status & presence capsule */}
					<div className="appbar-right">
						<button
							type="button"
							aria-keyshortcuts="U"
							aria-label={
								soundActive
									? "Mute interface sounds"
									: "Enable interface sounds"
							}
							title={
								soundActive
									? "Sound ON (Press U to mute)"
									: "Sound OFF (Press U to enable)"
							}
							className={`appbar__link appbar__link--sound ${
								soundActive ? "appbar__link--sound-active" : ""
							}`}
							onClick={handleToggleSound}
							onMouseEnter={handleLinkHover}
						>
							{soundActive ? (
								<SpeakerIcon aria-hidden="true" size={13} strokeWidth={1.75} />
							) : (
								<SpeakerMuteIcon
									aria-hidden="true"
									size={13}
									strokeWidth={1.75}
								/>
							)}
							<kbd aria-hidden="true" className="appbar__kbd">
								u
							</kbd>
						</button>

						<div
							aria-label={`${presenceCount} live ${presenceCount === 1 ? "reader" : "readers"}`}
							className="appbar__presence"
							role="status"
							title={`${presenceCount} ${presenceCount === 1 ? "reader" : "readers"} browsing dhruvkoshta.me right now`}
						>
							<span aria-hidden="true" className="appbar__presence-dot" />
							<span className="appbar__presence-count">{presenceCount}</span>
							<span className="appbar__presence-label">live</span>
						</div>

						{blrTime ? (
							<div
								className="appbar__clock"
								title={`Bengaluru local time: ${blrTime}`}
							>
								<span aria-hidden="true" className="appbar__clock-dot" />
								<span className="appbar__clock-city">BLR</span>
								<span className="appbar__clock-time">{blrTime}</span>
							</div>
						) : null}
					</div>

					{/* Mobile drawer menu button */}
					<button
						aria-expanded={menuOpen}
						aria-haspopup="dialog"
						aria-label="Open menu"
						className="appbar__mobile"
						onClick={() => {
							sound.play("click");
							setMenuOpen(true);
						}}
						type="button"
					>
						<MenuIcon aria-hidden="true" size={16} strokeWidth={1.75} />
					</button>

					{/* Mobile home mark */}
					<Link
						aria-label="DK, Dhruv Koshta, home"
						className="appbar__home-mark"
						onClick={() => {
							sound.play("click");
							scrollToTop();
						}}
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
