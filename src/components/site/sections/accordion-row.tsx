import { useState, type ReactNode } from "react";
import { sound } from "~/lib/sound";

export type AccordionRowProps = {
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
