import { expect, test } from "@playwright/test";

test.describe("Point 5: Navbar Pop-Up Jump & Left-to-Center Scroll Travel", () => {
	test("pops up nav items on hover and slides left-to-center as page scrolls", async ({ page }) => {
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");

		const appbar = page.locator(".appbar");
		const left = page.locator(".appbar-left");
		await expect(appbar).toBeVisible();

		// Check initial position at top of page (dock-progress is 0)
		const initialLeftBox = await left.boundingBox();
		expect(initialLeftBox).not.toBeNull();

		// Hover an item to verify the pop-up/jump transform
		const projectsLink = appbar.getByRole("link", { name: /projects/i });
		await expect(projectsLink).toBeVisible();
		await projectsLink.hover();
		await page.waitForTimeout(300);

		// Capture item hover jump screenshot
		await page.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point5_navbar_jump_hover.png",
			clip: { x: 0, y: 0, width: 1280, height: 120 },
		});

		// Now scroll down past 160px so dock-progress reaches 1.0
		await page.mouse.move(0, 500);
		await page.evaluate(() => {
			window.scrollTo({ top: 300, behavior: "instant" });
			window.dispatchEvent(new Event("scroll"));
		});
		await page.waitForTimeout(400);

		// The left capsule should have translated toward the center
		const scrolledLeftBox = await left.boundingBox();
		expect(scrolledLeftBox).not.toBeNull();
		if (initialLeftBox && scrolledLeftBox) {
			expect(scrolledLeftBox.x).toBeGreaterThan(initialLeftBox.x);
		}

		// Capture center-docked navbar screenshot
		await page.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point5_navbar_center_docked.png",
			clip: { x: 0, y: 0, width: 1280, height: 120 },
		});
	});
});
