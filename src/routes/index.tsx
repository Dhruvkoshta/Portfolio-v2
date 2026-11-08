import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "~/components/site/hero";
import { SectionShell } from "~/components/site/section-shell";
import {
	AsAKidSection,
	BlogSection,
	CompetitionsSection,
	ContactReceiptSection,
	EducationSection,
	ExperienceSection,
	FeaturedProjectsSection,
	MiscSection,
	NumbersSection,
	OtherProjectsSection,
	PortfolioEvolutionSection,
	SkillsSection,
	SpotifySection,
	WhatOthersSaySection,
} from "~/components/site/sections";
import { sections } from "~/lib/sections";
import { site } from "~/lib/site";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: `${site.name} — ${site.role}` },
			{ name: "description", content: site.description },
		],
		links: [
			{
				rel: "preload",
				as: "image",
				href: "/media/portrait/dhruv-portrait-360.avif",
				type: "image/avif",
				imageSrcSet:
					"/media/portrait/dhruv-portrait-360.avif 360w, /media/portrait/dhruv-portrait-480.avif 480w, /media/portrait/dhruv-portrait-720.avif 720w",
				imageSizes: "(max-width: 600px) 132px, 176px",
				fetchPriority: "high",
			},
		],
	}),
	component: HomePage,
});

function sectionContent(id: string) {
	switch (id) {
		case "experience":
			return <ExperienceSection />;
		case "by-the-numbers":
			return <NumbersSection />;
		case "blog":
			return <BlogSection />;
		case "featured-projects":
			return <FeaturedProjectsSection />;
		case "other-projects":
			return <OtherProjectsSection />;
		case "education":
			return <EducationSection />;
		case "skills":
			return <SkillsSection />;
		case "competitions":
			return <CompetitionsSection />;
		case "what-others-say":
			return <WhatOthersSaySection />;
		case "portfolio-evolution":
			return <PortfolioEvolutionSection />;
		case "spotify":
			return <SpotifySection />;
		case "misc":
			return <MiscSection />;
		case "as-a-kid":
			return <AsAKidSection />;
		case "contact":
			return <ContactReceiptSection />;
		default:
			return undefined;
	}
}

function HomePage() {
	return (
		<div className="ed3 ed3--ruled">
			<div aria-hidden="true" className="ed3__guides" />

			<div className="ed3__shell">
				<Hero />

				<div className="ed-sections">
					{sections.map((section) => (
						<SectionShell key={section.id} section={section}>
							{sectionContent(section.id)}
						</SectionShell>
					))}
				</div>
			</div>
		</div>
	);
}
