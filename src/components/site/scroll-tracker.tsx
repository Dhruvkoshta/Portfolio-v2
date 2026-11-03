import { useCallback, useEffect, useState } from "react";
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
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		if (typeof window === "undefined") return;

		let rafId: number | null = null;

		const updateActiveSection = () => {
			const scrollY = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
			setScrollProgress(progress);

			// If at top of the document
			if (scrollY < 120) {
				setActiveId("me");
				return;
			}

			// If at bottom of the document
			if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 60) {
				setActiveId(TRACKER_ITEMS[TRACKER_ITEMS.length - 1].id);
				return;
			}

			// Find active section in viewport
			const viewportTrigger = window.innerHeight * 0.35;
			let currentActive = "me";

			for (const item of TRACKER_ITEMS) {
				const el = document.getElementById(item.id);
				if (!el) continue;
				const rect = el.getBoundingClientRect();
				if (rect.top <= viewportTrigger && rect.bottom > 0) {
					currentActive = item.id;
				}
			}

			setActiveId(currentActive);
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
		el.scrollIntoView({ behavior: "smooth", block: "start" });
	}, []);

	return (
		<nav
			aria-label="Page sections progress"
			className="scroll-tracker"
			style={{ "--tracker-progress": scrollProgress } as React.CSSProperties}
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
