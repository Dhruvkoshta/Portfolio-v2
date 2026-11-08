import { competitions } from "~/data/content";
import { AccordionRow } from "./accordion-row";

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
