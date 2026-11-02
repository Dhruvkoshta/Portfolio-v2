import { describe, expect, it } from "vitest";
import { sections } from "./sections";
import { primaryNav, site } from "./site";

describe("site config", () => {
	it("uses the canonical .me domain", () => {
		expect(site.url).toBe("https://dhruvkoshta.me");
	});

	it("has a unique keyboard key for every primary nav item", () => {
		const keys = primaryNav.map((item) => item.key);
		expect(new Set(keys).size).toBe(keys.length);
	});

	it("points the notes link at the notes subdomain", () => {
		const notes = primaryNav.find((item) => item.label === "Notes");
		expect(notes && "href" in notes ? notes.href : undefined).toBe(
			"https://notes.dhruvkoshta.me",
		);
	});
});

describe("section index", () => {
	it("keeps the hero plus fifteen anchored sections", () => {
		expect(sections).toHaveLength(15);
		expect(sections.length + 1).toBe(16);
	});

	it("uses unique, stable ids and indexes", () => {
		const ids = sections.map((section) => section.id);
		const indexes = sections.map((section) => section.index);
		expect(new Set(ids).size).toBe(ids.length);
		expect(new Set(indexes).size).toBe(indexes.length);
		expect(ids).not.toContain("me");
	});

	it("has copy for every section", () => {
		for (const section of sections) {
			expect(section.title.length).toBeGreaterThan(0);
			expect(section.blurb.length).toBeGreaterThan(20);
		}
	});
});
