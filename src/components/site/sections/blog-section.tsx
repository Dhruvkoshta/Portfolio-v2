import { ArrowUpRightIcon } from "../icons";
import { articles } from "~/data/content";
import { site } from "~/lib/site";

export function BlogSection() {
	return (
		<div className="blog-section">
			<div className="ed-callout">
				<div className="ed-callout__copy">
					<p className="eyebrow">Off-site / notes.dhruvkoshta.me</p>
					<p>Essays, working notes, and engineering deep dives.</p>
				</div>
				<a
					className="text-link"
					href={site.socials.notes}
					rel="noreferrer"
					target="_blank"
				>
					Read all notes
					<ArrowUpRightIcon aria-hidden="true" size={13} strokeWidth={1.75} />
				</a>
			</div>

			<ul
				aria-label="Articles list"
				className="idx__list"
				style={{ marginTop: "16px" }}
			>
				{articles.map((art) => (
					<li className="idx__row" key={art.title}>
						<div className="idx__grid">
							<span className="idx__details">
								<a
									className="idx__title-text text-link"
									href={art.url}
									rel="noreferrer"
									target="_blank"
								>
									{art.title}
								</a>
							</span>
							<span aria-hidden="true" className="idx__leader" />
							<div className="idx__trail">
								<span className="idx__flair">{art.category}</span>
								<span className="idx__meta">{art.year}</span>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
