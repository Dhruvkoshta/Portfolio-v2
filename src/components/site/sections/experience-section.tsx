import { useState } from "react";
import { ArrowUpRightIcon } from "../icons";
import { TechBadge } from "../tech-icons";
import { sound } from "~/lib/sound";
import { experienceItems } from "~/data/content";
import { AccordionRow } from "./accordion-row";

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
