import { expect, test } from "@playwright/test";

test.describe("Point 6: Experience Section Redesign", () => {
	test("renders company name, role, dotted leader, red highlight, and earlier roles controls", async ({ page }) => {
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");

		const expSection = page.locator("#experience");
		await expect(expSection).toBeVisible();

		// Check primary experience rows
		const dellRow = expSection.getByText("Dell Technologies", { exact: true });
		await expect(dellRow).toBeVisible();

		const highlight = expSection.getByText("Enterprise Software Infrastructure", { exact: true });
		await expect(highlight).toBeVisible();

		// Check red accent styling on highlight text
		const color = await highlight.evaluate((el) => window.getComputedStyle(el).color);
		// rgb(253, 1, 12) or #fd010c
		expect(color).toMatch(/rgb\((253,\s*1,\s*12|239,\s*68,\s*68)\)/);

		// Check dotted leader exists
		const leader = expSection.locator(".idx__leader").first();
		await expect(leader).toBeVisible();

		// Check Show earlier roles button
		const showEarlierBtn = expSection.getByRole("button", { name: /show \d+ more earlier roles/i });
		await expect(showEarlierBtn).toBeVisible();

		// Check Expand all toggle
		const expandAllBtn = expSection.getByRole("button", { name: /expand all/i });
		await expect(expandAllBtn).toBeVisible();

		// Verify tech badges exist
		const techBadge = expSection.locator(".tech-badge").first();
		await expect(techBadge).toBeVisible();

		// Hover over tech badge to show tooltip
		await techBadge.hover();
		await page.waitForTimeout(200);
		const tooltip = techBadge.locator(".tech-badge__tooltip");
		await expect(tooltip).toBeVisible();

		// Capture hover tooltip screenshot
		await expSection.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point6_experience_tech_hover.png",
		});

		// Capture initial Experience section screenshot
		await expSection.scrollIntoViewIfNeeded();
		await page.waitForTimeout(300);
		await expSection.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point6_experience_initial.png",
		});

		// Click "Show earlier roles"
		await showEarlierBtn.scrollIntoViewIfNeeded();
		await showEarlierBtn.click();
		await page.waitForTimeout(200);

		// Earlier roles should now be visible
		await expect(expSection.getByText("AI VERSE 2.0 (Terminal Titans)", { exact: true })).toBeVisible();
		await expect(expSection.getByText("1st Place Winner", { exact: true })).toBeVisible();

		// Capture expanded earlier roles screenshot
		await expSection.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point6_experience_earlier_roles.png",
		});
	});
});
