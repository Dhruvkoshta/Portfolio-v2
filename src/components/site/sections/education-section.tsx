import {
	educationItems,
	favoriteCoursesRow1,
	favoriteCoursesRow2,
} from "~/data/content";

function BarcodeGraphic({ code }: { code: string }) {
	return (
		<div aria-hidden="true" className="tkt-card__barcode">
			<svg
				className="tkt-barcode-svg"
				height="24"
				preserveAspectRatio="none"
				viewBox="0 0 160 24"
				width="100%"
			>
				<rect fill="currentColor" height="24" width="2" x="0" />
				<rect fill="currentColor" height="24" width="1" x="4" />
				<rect fill="currentColor" height="24" width="3" x="7" />
				<rect fill="currentColor" height="24" width="1" x="12" />
				<rect fill="currentColor" height="24" width="4" x="15" />
				<rect fill="currentColor" height="24" width="2" x="21" />
				<rect fill="currentColor" height="24" width="1" x="25" />
				<rect fill="currentColor" height="24" width="3" x="28" />
				<rect fill="currentColor" height="24" width="2" x="33" />
				<rect fill="currentColor" height="24" width="4" x="37" />
				<rect fill="currentColor" height="24" width="1" x="43" />
				<rect fill="currentColor" height="24" width="2" x="46" />
				<rect fill="currentColor" height="24" width="3" x="50" />
				<rect fill="currentColor" height="24" width="1" x="55" />
				<rect fill="currentColor" height="24" width="4" x="58" />
				<rect fill="currentColor" height="24" width="2" x="64" />
				<rect fill="currentColor" height="24" width="1" x="68" />
				<rect fill="currentColor" height="24" width="3" x="71" />
				<rect fill="currentColor" height="24" width="2" x="76" />
				<rect fill="currentColor" height="24" width="4" x="80" />
				<rect fill="currentColor" height="24" width="1" x="86" />
				<rect fill="currentColor" height="24" width="2" x="89" />
				<rect fill="currentColor" height="24" width="3" x="93" />
				<rect fill="currentColor" height="24" width="1" x="98" />
				<rect fill="currentColor" height="24" width="4" x="101" />
				<rect fill="currentColor" height="24" width="2" x="107" />
				<rect fill="currentColor" height="24" width="1" x="111" />
				<rect fill="currentColor" height="24" width="3" x="114" />
				<rect fill="currentColor" height="24" width="2" x="119" />
				<rect fill="currentColor" height="24" width="4" x="123" />
				<rect fill="currentColor" height="24" width="1" x="129" />
				<rect fill="currentColor" height="24" width="2" x="132" />
				<rect fill="currentColor" height="24" width="3" x="136" />
				<rect fill="currentColor" height="24" width="1" x="141" />
				<rect fill="currentColor" height="24" width="4" x="144" />
				<rect fill="currentColor" height="24" width="2" x="150" />
				<rect fill="currentColor" height="24" width="1" x="154" />
				<rect fill="currentColor" height="24" width="3" x="157" />
			</svg>
			<span className="tkt-barcode-code">{code}</span>
		</div>
	);
}

export function EducationSection() {
	return (
		<div className="education-container">
			<div className="tkt">
				{educationItems.map((edu) => (
					<article className="tkt-card" key={edu.id}>
						<div className="tkt-card__top">
							<div className="tkt-card__head">
								<h3 className="tkt-card__title">
									<span>{edu.institution}</span>
									{edu.flag ? <span className="tkt-card__flag">{edu.flag}</span> : null}
								</h3>
								<p className="tkt-card__degree">{edu.degree}</p>
								<p className="tkt-card__period">{edu.period}</p>
							</div>

							<div className="tkt-card__divider">
								<span aria-hidden="true" className="tkt-notch tkt-notch--left" />
								<span aria-hidden="true" className="tkt-perf-line" />
								<span aria-hidden="true" className="tkt-notch tkt-notch--right" />
							</div>

							<div className="tkt-card__middle">
								<div className="tkt-card__score">{edu.score}</div>
								{edu.honors && edu.honors.length > 0 ? (
									<ul className="tkt-card__honors">
										{edu.honors.map((honor) => (
											<li className="tkt-card__honor" key={honor}>
												<span aria-hidden="true" className="tkt-bullet">
													•
												</span>
												<span>{honor}</span>
											</li>
										))}
									</ul>
								) : null}
							</div>
						</div>

						<div className="tkt-card__bottom">
							<BarcodeGraphic code={edu.barcode ?? "TKT-2024-EDU"} />
						</div>
					</article>
				))}
			</div>

			<div className="classes-ticker-section">
				<div className="classes-ticker__label">
					<span>Favorite Classes & Core Coursework</span>
				</div>

				<div aria-label="Favorite coursework ticker" className="classes-ticker" tabIndex={0}>
					<div className="classes-ticker__row">
						<div className="classes-ticker__track classes-ticker__track--left">
							{favoriteCoursesRow1.concat(favoriteCoursesRow1).map((course, idx) => (
								<span className="class-chip" key={`${course.name}-${idx}`}>
									<span className="class-chip__name">{course.name}</span>
									<span
										className={`class-chip__grade class-chip__grade--${course.grade
											.replace("+", "plus")
											.toLowerCase()}`}
									>
										{course.grade}
									</span>
								</span>
							))}
						</div>
					</div>

					<div className="classes-ticker__row">
						<div className="classes-ticker__track classes-ticker__track--right">
							{favoriteCoursesRow2.concat(favoriteCoursesRow2).map((course, idx) => (
								<span className="class-chip" key={`${course.name}-${idx}`}>
									<span className="class-chip__name">{course.name}</span>
									<span
										className={`class-chip__grade class-chip__grade--${course.grade
											.replace("+", "plus")
											.toLowerCase()}`}
									>
										{course.grade}
									</span>
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
