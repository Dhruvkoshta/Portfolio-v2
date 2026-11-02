export const site = {
	name: "Dhruv Koshta",
	fullName: "Dhruv Kumar Koshta",
	role: "Full-Stack & Systems Engineer",
	location: "Bengaluru, Karnataka, India",
	url: "https://dhruvkoshta.me",
	email: "dhruvkoshta@gmail.com",
	phone: "+91 8871339300",
	resumeUrl: "/Dhruv_Koshta_Resume.pdf",
	description:
		"Dhruv Kumar Koshta is a Full-Stack & Systems Engineer based in Bengaluru, India. Software intern at Dell Technologies, patent holder for an IoT hazard telemetry platform, and 5-star rated freelancer.",
	socials: {
		github: "https://github.com/DhruvKoshta",
		linkedin: "https://www.linkedin.com/in/dhruvkoshta",
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
