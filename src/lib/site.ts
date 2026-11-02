export const site = {
	name: "Dhruv Koshta",
	role: "Software Engineer",
	location: "India",
	url: "https://dhruvkoshta.me",
	email: "dhruvkoshta@gmail.com",
	description:
		"Dhruv Koshta is a full-stack software engineer from India. Projects, experiments, and notes on building for the web.",
	socials: {
		github: "https://github.com/Dhruvkoshta",
		linkedin: "https://www.linkedin.com/in/dhruv-koshta-15252b296/",
		x: "https://x.com/dhruvkoshta04",
		notes: "https://notes.dhruvkoshta.me",
	},
} as const;

export type PrimaryNavItem =
	| {
			label: string;
			key: string;
			to: "/";
			hash?: string;
			external?: false;
	  }
	| {
			label: string;
			key: string;
			href: string;
			external: true;
	  };

export const primaryNav: readonly PrimaryNavItem[] = [
	{ label: "Home", key: "h", to: "/" },
	{ label: "Projects", key: "p", to: "/", hash: "featured-projects" },
	{ label: "Notes", key: "n", href: site.socials.notes, external: true },
];
