export type FactItem = {
	readonly label: string;
	readonly href: string;
	readonly external: boolean;
};

export type ExperienceItem = {
	readonly id: string;
	readonly role: string;
	readonly company: string;
	readonly location: string;
	readonly period: string;
	readonly flair?: string;
	readonly highlight?: string;
	readonly isEarlierRole?: boolean;
	readonly defaultOpen?: boolean;
	readonly description: string;
	readonly tags: readonly string[];
	readonly technologies?: readonly string[];
	readonly repository?: string;
	readonly website?: string;
};

export type StatItem = {
	readonly label: string;
	readonly value: string;
	readonly href: string;
	readonly note?: string;
};

export type ArticleItem = {
	readonly title: string;
	readonly category: string;
	readonly year: string;
	readonly url: string;
};

export type ProjectItem = {
	readonly id: string;
	readonly title: string;
	readonly subtitle: string;
	readonly year: string;
	readonly dateSpan?: string;
	readonly desc: string;
	readonly tags: readonly string[];
	readonly image: string;
	readonly video?: string;
	readonly patent?: boolean;
	readonly github?: string;
	readonly website?: string;
	readonly teaser?: string;
};

export type OtherProjectItem = {
	readonly id: string;
	readonly title: string;
	readonly subtitle: string;
	readonly year: string;
	readonly flair?: string;
	readonly defaultOpen?: boolean;
	readonly desc: string;
	readonly tags: readonly string[];
	readonly github?: string;
	readonly website?: string;
};

export type EducationItem = {
	readonly id: string;
	readonly institution: string;
	readonly degree: string;
	readonly location: string;
	readonly period: string;
	readonly score: string;
	readonly leadership?: readonly string[];
	readonly coursework?: readonly string[];
	readonly summary?: string;
};

export type SkillCategory = {
	readonly label: string;
	readonly items: readonly string[];
};

export type CoreCompetency = {
	readonly index: string;
	readonly name: string;
	readonly description: string;
};

export type ResearchItem = {
	readonly title: string;
	readonly flair: string;
	readonly category: string;
};

export type CompetitionItem = {
	readonly id: string;
	readonly title: string;
	readonly subtitle: string;
	readonly meta: string;
	readonly flair: string;
	readonly defaultOpen?: boolean;
	readonly description: string;
	readonly tags: readonly string[];
};

export type TestimonialItem = {
	readonly quote: string;
	readonly author: string;
};

export type EvolutionItem = {
	readonly year: string;
	readonly title: string;
	readonly desc: string;
	readonly current?: boolean;
};

export type PlaylistItem = {
	readonly title: string;
	readonly count: string;
	readonly tag: string;
};

export type MiscSetupItem = {
	readonly title: string;
	readonly subtitle: string;
	readonly flair: string;
	readonly meta: string;
	readonly body: string;
	readonly defaultOpen?: boolean;
};
