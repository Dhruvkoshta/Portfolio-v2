import { useCallback, useEffect, useRef, useState } from "react";
import { sections } from "~/lib/sections";

type TrackerItem = {
	id: string;
	index: string;
	title: string;
	label: string;
};

const TRACKER_ITEMS: readonly TrackerItem[] = [
	{ id: "me", index: "00", title: "Top", label: "Top" },
	...sections.map((section) => ({
		id: section.id,
		index: section.index,
		title: section.title,
		label: section.navLabel,
	})),
];

export function ScrollTracker() {
	const [activeId, setActiveId] = useState<string>("me");
	const activeIdRef = useRef<string>("me");
	const navRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		let rafId: number | null = null;

		const applyProgress = (progress: number) => {
			if (navRef.current) {
				navRef.current.style.setProperty("--tracker-progress", String(progress));
			}
		};

		const applyActiveId = (id: string) => {
			if (activeIdRef.current !== id) {
				activeIdRef.current = id;
				setActiveId(id);
			}
		};

		const updateActiveSection = () => {
			const scrollY = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const viewportTrigger = window.innerHeight * 0.35;
			const count = TRACKER_ITEMS.length;
			const listHeight = count * 24 + (count - 1) * 6; // 444px for 15 items

			// 1. If at the very top of the page
			if (scrollY < 40) {
				applyActiveId("me");
				const topFraction = Math.max(0, scrollY / 40);
				applyProgress((topFraction * 12) / listHeight);
				return;
			}

			// 2. If at the very bottom of the document
			if (docHeight > 0 && scrollY + window.innerHeight >= document.documentElement.scrollHeight - 40) {
				applyActiveId(TRACKER_ITEMS[count - 1].id);
				applyProgress(1);
				return;
			}

			// 3. Find active section based on viewportTrigger
			let activeIdx = 0;
			for (let i = 0; i < count; i++) {
				const el = document.getElementById(TRACKER_ITEMS[i].id);
				if (!el) continue;
				const rect = el.getBoundingClientRect();
				if (rect.top <= viewportTrigger && rect.bottom > 0) {
					activeIdx = i;
				}
			}

			applyActiveId(TRACKER_ITEMS[activeIdx].id);

			// 4. Calculate progress within the current active section
			const currentEl = document.getElementById(TRACKER_ITEMS[activeIdx].id);
			let intraProgress = 0;

			if (activeIdx < count - 1) {
				const nextEl = document.getElementById(TRACKER_ITEMS[activeIdx + 1].id);
				if (currentEl && nextEl) {
					const currentTop = currentEl.offsetTop;
					const nextTop = nextEl.offsetTop;
					const sectionSpan = nextTop - currentTop;
					if (sectionSpan > 0) {
						const scrolledIntoSection = scrollY + viewportTrigger - currentTop;
						intraProgress = Math.max(0, Math.min(1, scrolledIntoSection / sectionSpan));
					}
				}
			} else if (currentEl) {
				const currentTop = currentEl.offsetTop;
				const remainingScroll = docHeight - currentTop;
				if (remainingScroll > 0) {
					const scrolledIntoSection = scrollY - currentTop;
					intraProgress = Math.max(0, Math.min(1, scrolledIntoSection / remainingScroll));
				}
			}

			// Continuous section position (e.g. 6.0 when entering Education, 6.5 halfway through)
			const continuousIndex = activeIdx + intraProgress;

			// Position tip of the line on the center of notch continuousIndex
			// Notch i center is at: 12px + i * 30px
			const notchCenterY = 12 + continuousIndex * 30;
			const normalizedProgress = Math.max(0, Math.min(1, notchCenterY / listHeight));

			applyProgress(normalizedProgress);
		};

		const onScroll = () => {
			if (rafId !== null) return;
			rafId = window.requestAnimationFrame(() => {
				updateActiveSection();
				rafId = null;
			});
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		updateActiveSection();

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (rafId !== null) cancelAnimationFrame(rafId);
		};
	}, []);

	const scrollToSection = useCallback((id: string) => {
		const el = document.getElementById(id);
		if (!el) return;
		const prefersReducedMotion =
			typeof window !== "undefined" &&
			typeof window.matchMedia === "function" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		el.scrollIntoView({
			behavior: prefersReducedMotion ? "auto" : "smooth",
			block: "start",
		});
	}, []);

	return (
		<nav
			aria-label="Page sections progress"
			className="scroll-tracker"
			ref={navRef}
			style={{ "--tracker-progress": 0 } as React.CSSProperties}
		>
			<div aria-hidden="true" className="scroll-tracker__rail" />
			<div aria-hidden="true" className="scroll-tracker__progress" />
			<ul className="scroll-tracker__list">
				{TRACKER_ITEMS.map((item) => {
					const isActive = item.id === activeId;
					return (
						<li className="scroll-tracker__item" key={item.id}>
							<button
								aria-current={isActive ? "true" : undefined}
								aria-label={`${item.index} ${item.label}`}
								className="scroll-tracker__notch"
								data-active={isActive ? "true" : "false"}
								onClick={() => scrollToSection(item.id)}
								type="button"
							>
								<span className="scroll-tracker__dash" />
								<span aria-hidden="true" className="scroll-tracker__tooltip">
									<span className="scroll-tracker__tooltip-index">{item.index}</span>
									<span className="scroll-tracker__tooltip-label">{item.label}</span>
								</span>
							</button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
