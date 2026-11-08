import { ArrowUpRightIcon } from "../icons";
import { otherProjects } from "~/data/content";
import { AccordionRow } from "./accordion-row";

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
