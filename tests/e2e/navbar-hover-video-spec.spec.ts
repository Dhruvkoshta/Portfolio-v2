import { expect, test } from "@playwright/test";

test.describe("Navbar Hover Interaction Matching Video Reference", () => {
	test("renders floating pill navbar with all 6 items and kbd badges", async ({
		page,
	}) => {
		await page.goto("/");
		await page.waitForFunction(
			() => document.documentElement.dataset.hydrated === "true",
		);

		const nav = page.getByRole("navigation", { name: "Primary" });
		await expect(nav).toBeVisible();

		// Check all 6 nav items
		await expect(nav.getByRole("link", { name: /home/i })).toBeVisible();
		await expect(nav.getByRole("link", { name: /blog/i })).toBeVisible();
		await expect(nav.getByRole("link", { name: /résumé/i })).toBeVisible();
		await expect(nav.getByRole("button", { name: /socials/i })).toBeVisible();
		await expect(nav.getByRole("button", { name: /misc/i })).toBeVisible();
		await expect(nav.getByRole("button", { name: /mattgpt/i })).toBeVisible();

		// Check kbd badges
		await expect(nav.locator(".appbar__kbd")).toHaveText([
			"h",
			"b",
			"r",
			"s",
			"m",
			"g",
		]);

		// Capture idle navbar screenshot
		await page.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/navbar_idle.png",
			clip: { x: 0, y: 0, width: 1280, height: 160 },
		});
	});

	test("slides hover pill across items and lifts résumé on hover", async ({
		page,
	}) => {
		await page.goto("/");
		await page.waitForFunction(
			() => document.documentElement.dataset.hydrated === "true",
		);

		const nav = page.getByRole("navigation", { name: "Primary" });

		// Hover Home
		const homeLink = nav.getByRole("link", { name: /home/i });
		await homeLink.hover();
		await page.waitForTimeout(200);

		// Hover Blog
		const blogLink = nav.getByRole("link", { name: /blog/i });
		await blogLink.hover();
		await page.waitForTimeout(200);

		// Hover Résumé
		const resumeLink = nav.getByRole("link", { name: /résumé/i });
		await resumeLink.hover();
		await page.waitForTimeout(200);

		// Capture Résumé hover screenshot
		await page.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/navbar_resume_hover.png",
			clip: { x: 0, y: 0, width: 1280, height: 160 },
		});
	});

	test("hovering socials opens anchored card with contact, email, and social links", async ({
		page,
	}) => {
		await page.goto("/");
		await page.waitForFunction(
			() => document.documentElement.dataset.hydrated === "true",
		);

		const nav = page.getByRole("navigation", { name: "Primary" });
		const socialsBtn = nav.getByRole("button", { name: /socials/i });

		await socialsBtn.hover();
		await page.waitForTimeout(250);

		const panel = page.getByRole("group", { name: "Social links" });
		await expect(panel).toBeVisible();

		// Check all items
		await expect(panel.getByText("Contact Form")).toBeVisible();
		await expect(panel.getByText("Email")).toBeVisible();
		await expect(panel.getByText("LinkedIn")).toBeVisible();
		await expect(panel.getByText("GitHub")).toBeVisible();
		await expect(panel.getByText("X")).toBeVisible();
		await expect(panel.getByText("Instagram")).toBeVisible();
		await expect(panel.getByText("Discord")).toBeVisible();
		await expect(panel.getByText("RSS")).toBeVisible();

		// Capture Socials dropdown screenshot
		await page.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/navbar_socials_dropdown.png",
			clip: { x: 300, y: 0, width: 700, height: 400 },
		});
	});

	test("hovering misc opens anchored card with interactive toggles and credits", async ({
		page,
	}) => {
		await page.goto("/");
		await page.waitForFunction(
			() => document.documentElement.dataset.hydrated === "true",
		);

		const nav = page.getByRole("navigation", { name: "Primary" });
		const miscBtn = nav.getByRole("button", { name: /misc/i });

		await miscBtn.hover();
		await page.waitForTimeout(250);

		const panel = page.getByRole("group", { name: "Misc options" });
		await expect(panel).toBeVisible();

		// Check all toggles and credits
		await expect(panel.getByText("Show Pet")).toBeVisible();
		await expect(panel.getByText("Show Live Cursors")).toBeVisible();
		await expect(panel.getByText("Open on Hover")).toBeVisible();
		await expect(panel.getByText("Sound Effects")).toBeVisible();
		await expect(panel.getByText("Credits")).toBeVisible();

		// Test toggle Pet switch
		const petSwitch = panel.getByRole("switch", {
			name: /Toggle Byte pet visibility/i,
		});
		await expect(petSwitch).toHaveAttribute("aria-checked", "true");
		await petSwitch.click();
		await expect(petSwitch).toHaveAttribute("aria-checked", "false");

		// Capture Misc dropdown screenshot
		await page.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/navbar_misc_dropdown.png",
			clip: { x: 400, y: 0, width: 650, height: 350 },
		});
	});

	test("hovering mattgpt opens AI guide guide card", async ({ page }) => {
		await page.goto("/");
		await page.waitForFunction(
			() => document.documentElement.dataset.hydrated === "true",
		);

		const nav = page.getByRole("navigation", { name: "Primary" });
		const mattGptBtn = nav.getByRole("button", { name: /mattgpt/i });

		await mattGptBtn.hover();
		await page.waitForTimeout(250);

		const panel = page.getByRole("group", { name: "MattGPT AI Guide" });
		await expect(panel).toBeVisible();
		await expect(panel.getByText("MattGPT Assistant")).toBeVisible();

		// Capture MattGPT dropdown screenshot
		await page.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/navbar_mattgpt_dropdown.png",
			clip: { x: 500, y: 0, width: 600, height: 320 },
		});
	});

	test("navbar stays light under OS dark color-scheme and clock time is not squished", async ({
		page,
	}) => {
		await page.emulateMedia({ colorScheme: "dark" });
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto("/");
		await page.waitForFunction(
			() => document.documentElement.dataset.hydrated === "true",
		);

		const nav = page.getByRole("navigation", { name: "Primary" });
		await expect(nav).toBeVisible();

		// Check clock elements
		const clockCity = page.locator(".appbar__clock-city");
		const clockTime = page.locator(".appbar__clock-time");
		await expect(clockCity).toBeVisible();
		await expect(clockTime).toBeVisible();

		// Verify clock city and time are horizontally adjacent (not stacked vertically)
		const cityBox = await clockCity.boundingBox();
		const timeBox = await clockTime.boundingBox();
		expect(cityBox).not.toBeNull();
		expect(timeBox).not.toBeNull();
		if (cityBox && timeBox) {
			// City and time must share roughly the same vertical center line
			expect(Math.abs(cityBox.y - timeBox.y)).toBeLessThan(5);
			// Time must be positioned to the right of city
			expect(timeBox.x).toBeGreaterThan(cityBox.x);
		}

		// Capture full header screenshot showing centered light frosted navbar and right capsule with unsquished time
		await page.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/navbar_fixed_header.png",
			clip: { x: 0, y: 0, width: 1440, height: 180 },
		});
	});
});
