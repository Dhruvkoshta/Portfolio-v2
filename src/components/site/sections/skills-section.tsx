import { coreCompetencies, skillCategories } from "~/data/content";

export function SkillsSection() {
	return (
		<div className="skills-container">
			<ul aria-label="Core competencies" className="sk">
				{coreCompetencies.map((comp) => (
					<li className="sk__row" key={comp.index}>
						<div className="sk__label">
							<span className="sk__no">{comp.index}</span>
							<h3 className="sk__name">{comp.name}</h3>
						</div>
						<p className="sk__body">{comp.description}</p>
					</li>
				))}
			</ul>

			<div className="skills-grid">
				{skillCategories.map((cat) => (
					<div className="skills-category" key={cat.label}>
						<h4 className="eyebrow">{cat.label}</h4>
						<div className="skills-tags">
							{cat.items.map((item) => (
								<span className="skills-chip" key={item}>
									{item}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
