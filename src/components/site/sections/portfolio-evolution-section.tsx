import { evolutions } from "~/data/content";

export function PortfolioEvolutionSection() {
	return (
		<div className="evolution-grid">
			{evolutions.map((item) => (
				<div
					className={`evolution-card ${item.current ? "evolution-card--current" : ""}`}
					key={item.year}
				>
					<span
						className="eyebrow"
						style={
							item.current
								? { color: "var(--accent-hover)", fontWeight: 600 }
								: undefined
						}
					>
						{item.year}
					</span>
					<h3 className="evolution-card__title">{item.title}</h3>
					<p className="evolution-card__desc">{item.desc}</p>
				</div>
			))}
		</div>
	);
}
