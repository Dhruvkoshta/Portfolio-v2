import { ArrowUpRightIcon } from "../icons";
import { TechBadge } from "../tech-icons";
import { featuredProjects } from "~/data/content";

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
