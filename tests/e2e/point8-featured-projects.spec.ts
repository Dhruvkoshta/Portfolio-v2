import { expect, test } from "@playwright/test";

test.describe("Point 8: Featured Projects Card Layout & Terminal Canvas Redesign", () => {
	test("renders left year rail, terminal media canvas with corner pluses, action links, tech badges, and date span", async ({ page }) => {
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");

		const featuredSection = page.locator("#featured-projects");
		await expect(featuredSection).toBeVisible();
		await featuredSection.scrollIntoViewIfNeeded();
		await page.waitForTimeout(300);

		// Verify project items exist
		const projectItems = featuredSection.locator(".wk__item");
		expect(await projectItems.count()).toBeGreaterThanOrEqual(4);

		// First project: ProctoAI
		const firstItem = projectItems.first();
		await expect(firstItem).toBeVisible();

		// Check left year rail
		const year = firstItem.locator(".wk__year");
		await expect(year).toHaveText("2024");

		// Check terminal media canvas
		const media = firstItem.locator(".wk__media");
		await expect(media).toBeVisible();

		// Check corner plus markers
		const pluses = media.locator(".wk__plus");
		await expect(pluses).toHaveCount(4);

		// Check title
		const title = firstItem.locator(".wk__title");
		await expect(title).toContainText("ProctoAI");

		// Check action links
		const links = firstItem.locator(".wk__links");
		await expect(links.getByRole("link", { name: "Repo" })).toBeVisible();
		await expect(links.getByRole("link", { name: "Website" })).toBeVisible();

		// Check footer with tech badges and date span
		const footer = firstItem.locator(".wk__footer");
		await expect(footer).toBeVisible();

		const techStack = footer.locator(".wk__tech-stack");
		await expect(techStack).toBeVisible();

		const techBadges = techStack.locator(".tech-badge");
		expect(await techBadges.count()).toBeGreaterThanOrEqual(3);

		const dateSpan = footer.locator(".wk__date-span");
		await expect(dateSpan).toHaveText("Aug '24 — Oct '24");

		// Check Patent project
		const patentBadge = featuredSection.locator(".wk__badge").first();
		await expect(patentBadge).toHaveText("Patent Granted");

		// Hover on a tech badge to show tooltip
		const firstBadge = techBadges.first();
		await firstBadge.hover();
		await page.waitForTimeout(200);

		const tooltip = firstBadge.locator(".tech-badge__tooltip");
		await expect(tooltip).toBeVisible();

		// Capture screenshot with tech tooltip hover
		await firstItem.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point8_featured_projects_hover.png",
		});

		// Capture full featured projects section screenshot
		await featuredSection.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point8_featured_projects_initial.png",
		});
	});
});
