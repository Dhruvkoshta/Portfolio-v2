import { describe, expect, it } from "vitest";
import { site } from "~/lib/site";
import {
	articles,
	asAKidStory,
	competitions,
	coreCompetencies,
	educationItems,
	evolutions,
	experienceItems,
	featuredProjects,
	heroFacts,
	miscSetups,
	otherProjects,
	playlists,
	skillCategories,
	statistics,
	testimonial,
} from "./content";

describe("Content Layer Integrity", () => {
	it("provides valid site metadata matching the resume", () => {
		expect(site.fullName).toBe("Dhruv Kumar Koshta");
		expect(site.role).toContain("Systems Engineer");
		expect(site.email).toBe("dhruvkoshta@gmail.com");
		expect(site.phone).toBe("+91 8871339300");
		expect(site.resumeUrl).toBe("/Dhruv_Koshta_Resume.pdf");
	});

	it("has at least 6 verified hero facts", () => {
		expect(heroFacts.length).toBeGreaterThanOrEqual(6);
		for (const fact of heroFacts) {
			expect(fact.label.length).toBeGreaterThan(10);
			expect(fact.href.length).toBeGreaterThan(0);
		}
	});

	it("has complete experience records including Dell and Patent", () => {
		expect(experienceItems.length).toBeGreaterThanOrEqual(3);
		const dell = experienceItems.find((e) => e.company.includes("Dell"));
		expect(dell).toBeDefined();
		expect(dell?.role).toBe("Software Intern");
		expect(dell?.location).toContain("Bengaluru");

		const freelance = experienceItems.find((e) => e.id === "freelance");
		expect(freelance?.description).toContain("50+");

		const patent = experienceItems.find((e) => e.id === "patent");
		expect(patent?.tags).toContain("Patent No. 202441083752");
	});

	it("has verified statistics with valid values", () => {
		expect(statistics.length).toBeGreaterThanOrEqual(6);
		const cgpa = statistics.find((s) => s.value === "8.8");
		expect(cgpa).toBeDefined();
		const patentStat = statistics.find((s) => s.value === "1");
		expect(patentStat).toBeDefined();
	});

	it("has featured projects with valid media, tags, and titles", () => {
		expect(featuredProjects.length).toBeGreaterThanOrEqual(5);
		for (const project of featuredProjects) {
			expect(project.title.length).toBeGreaterThan(0);
			expect(project.desc.length).toBeGreaterThan(20);
			expect(project.tags.length).toBeGreaterThanOrEqual(3);
			expect(project.image.startsWith("/media/")).toBe(true);
		}
	});

	it("has secondary other projects including C proxy and Anonymus", () => {
		expect(otherProjects.length).toBeGreaterThanOrEqual(2);
		const anonymus = otherProjects.find((p) => p.id === "anonymus");
		expect(anonymus).toBeDefined();
	});

	it("has verified education entries for BMSCE and Little Kingdom", () => {
		expect(educationItems.length).toBeGreaterThanOrEqual(2);
		const bmsce = educationItems.find((e) => e.id === "bmsce");
		expect(bmsce?.score).toContain("8.8");
		expect(bmsce?.coursework?.length).toBeGreaterThan(4);
		const lks = educationItems.find((e) => e.id === "little-kingdom");
		expect(lks?.score).toContain("80%");
	});

	it("categorizes all skills into 4 distinct groups with core competencies", () => {
		expect(skillCategories.length).toBe(4);
		expect(coreCompetencies.length).toBe(5);
		for (const cat of skillCategories) {
			expect(cat.items.length).toBeGreaterThanOrEqual(4);
		}
	});

	it("includes awards, testimonials, playlists, and childhood story", () => {
		expect(competitions.length).toBeGreaterThanOrEqual(2);
		expect(competitions[0].title).toContain("AI VERSE");
		expect(testimonial.quote.length).toBeGreaterThan(30);
		expect(playlists.length).toBeGreaterThanOrEqual(4);
		expect(miscSetups.length).toBeGreaterThanOrEqual(2);
		expect(asAKidStory.length).toBeGreaterThan(50);
		expect(evolutions.length).toBe(3);
		expect(articles.length).toBeGreaterThanOrEqual(3);
	});
});
