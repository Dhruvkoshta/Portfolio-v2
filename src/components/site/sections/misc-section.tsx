import { miscSetups } from "~/data/content";
import { AccordionRow } from "./accordion-row";

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
