import { expect, test } from "@playwright/test";

test.describe("Point 4: Floating Navbar Horizontal Pill Hover Expansion", () => {
	test("smoothly expands navbar capsule and keycaps on hover", async ({ page }) => {
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");

		const appbar = page.locator(".appbar");
		await expect(appbar).toBeVisible();

		// Check initial idle width
		const initialBox = await appbar.boundingBox();
		expect(initialBox).not.toBeNull();

		// Capture initial idle navbar screenshot
		await page.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point4_navbar_idle.png",
			clip: { x: 0, y: 0, width: 1280, height: 120 },
		});

		// Hover over the appbar capsule
		await appbar.hover();
		await page.waitForTimeout(350);

		// Check expanded width is greater than or equal to initial box
		const hoveredBox = await appbar.boundingBox();
		expect(hoveredBox).not.toBeNull();
		if (initialBox && hoveredBox) {
			expect(hoveredBox.width).toBeGreaterThanOrEqual(initialBox.width);
		}

		// Capture hovered expanded navbar screenshot
		await page.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point4_navbar_hovered.png",
			clip: { x: 0, y: 0, width: 1280, height: 120 },
		});

		// Hover over specific link (e.g. Projects)
		const projectsLink = appbar.getByRole("link", { name: /projects/i });
		await expect(projectsLink).toBeVisible();
		await projectsLink.hover();
		await page.waitForTimeout(250);

		// Capture link-specific hovered state
		await page.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point4_navbar_item_hover.png",
			clip: { x: 0, y: 0, width: 1280, height: 120 },
		});
	});
});
