export type SectionMeta = {
	id: string;
	index: string;
	title: string;
	navLabel: string;
	meta: string;
	blurb: string;
};

/**
 * The fifteen sections below the hero, in page order. Ids are stable because
 * the appbar, menus, and deep links all target them.
 */
export const sections: readonly SectionMeta[] = [
	{
		id: "experience",
		index: "01",
		title: "Experience",
		navLabel: "Experience",
		meta: "Roles",
		blurb:
			"Roles, dates, and the one-line outcomes that mattered. A dense index, not a résumé dump.",
	},
	{
		id: "by-the-numbers",
		index: "02",
		title: "By the Numbers",
		navLabel: "Numbers",
		meta: "Stats",
		blurb:
			"Verified counts, distances, and the odd statistic that is genuinely worth bragging about.",
	},
	{
		id: "blog",
		index: "03",
		title: "Blog & Writing",
		navLabel: "Writing",
		meta: "Notes",
		blurb:
			"Essays and working notes live at notes.dhruvkoshta.me. The latest posts will be pulled in here.",
	},
	{
		id: "featured-projects",
		index: "04",
		title: "Featured Projects",
		navLabel: "Projects",
		meta: "Case studies",
		blurb:
			"Deep dives into the projects that best show how I think, build, and finish things.",
	},
	{
		id: "other-projects",
		index: "05",
		title: "Other Projects",
		navLabel: "Other projects",
		meta: "Index",
		blurb:
			"A dense index of everything else: experiments, developer tools, and old ideas that escaped the folder.",
	},
	{
		id: "education",
		index: "06",
		title: "Education & Favorite Classes",
		navLabel: "Education",
		meta: "Classes",
		blurb:
			"Degrees, coursework, and the classes that quietly changed how I work.",
	},
	{
		id: "skills",
		index: "07",
		title: "Skills & Competencies",
		navLabel: "Skills",
		meta: "Toolkit",
		blurb:
			"Languages, frameworks, and systems I reach for, grouped by the kind of problem they solve.",
	},
	{
		id: "ethical-hacking",
		index: "08",
		title: "Ethical Hacking",
		navLabel: "Security",
		meta: "Disclosures",
		blurb:
			"Responsible disclosures and security work, published only once the affected teams have had their say.",
	},
	{
		id: "competitions",
		index: "09",
		title: "Competitions & Hackathons",
		navLabel: "Competitions",
		meta: "Wins",
		blurb:
			"Hackathons, prizes, and the teams behind them. The useful part is what got shipped afterwards.",
	},
	{
		id: "what-others-say",
		index: "10",
		title: "What Others Say",
		navLabel: "Praise",
		meta: "Quotes",
		blurb:
			"Kind words from people I have shipped with, kept short and attributed.",
	},
	{
		id: "portfolio-evolution",
		index: "11",
		title: "Portfolio Evolution",
		navLabel: "Evolution",
		meta: "History",
		blurb:
			"Every previous version of this site, with screenshots and an honest note on what changed.",
	},
	{
		id: "spotify",
		index: "12",
		title: "Spotify",
		navLabel: "Spotify",
		meta: "Playlists",
		blurb:
			"Playlists for focus, plus the music that actually soundtracks the work.",
	},
	{
		id: "misc",
		index: "13",
		title: "Misc.",
		navLabel: "Misc.",
		meta: "Orbit",
		blurb:
			"People in my orbit, things I use every day, and the occasional tangent worth keeping.",
	},
	{
		id: "as-a-kid",
		index: "14",
		title: "As a Kid",
		navLabel: "As a kid",
		meta: "Archive",
		blurb:
			"Old photos, early projects, and evidence that the obsession started long before the job title.",
	},
	{
		id: "contact",
		index: "15",
		title: "Get in Contact via Printed Receipt",
		navLabel: "Contact",
		meta: "Receipt",
		blurb:
			"The receipt printer lands in Phase 4. Until then, email is the fastest route.",
	},
] as const;
