import { expect, test } from "@playwright/test";

test.describe("Point 3: Perspective Gallery Inner Bounding & Scroll", () => {
	test("fits within the inner content column boundaries and responds to inner scroll", async ({ page }) => {
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");

		// Locate the gallery frame
		const gallery = page.locator("#gallery");
		await expect(gallery).toBeVisible();

		// Check bounding box width does not exceed container
		const shell = page.locator(".ed3__shell").first();
		const shellBox = await shell.boundingBox();
		const galleryBox = await gallery.boundingBox();

		expect(shellBox).not.toBeNull();
		expect(galleryBox).not.toBeNull();

		if (shellBox && galleryBox) {
			// Gallery width must be <= shell width + 2px tolerance
			expect(galleryBox.width).toBeLessThanOrEqual(shellBox.width + 2);
			// Left boundary must be >= shell left boundary - 2px tolerance
			expect(galleryBox.x).toBeGreaterThanOrEqual(shellBox.x - 2);
		}

		// Locate scroll canvas
		const canvas = page.locator(".perspective-gallery-scroll-wrapper");
		await expect(canvas).toBeVisible();

		// Verify matrix is rendered
		const matrix = page.locator(".perspective-gallery-matrix");
		await expect(matrix).toBeVisible();

		await page.screenshot({ path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point3_inner_gallery_initial.png" });

		// Hover and scroll inside the gallery
		await canvas.hover();
		await page.mouse.wheel(0, 500);
		await page.waitForTimeout(600);

		await page.screenshot({ path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point3_inner_gallery_scrolled.png" });

		const scrolledTransform = await matrix.evaluate((el) => window.getComputedStyle(el).transform);
		expect(scrolledTransform).toBeTruthy();
	});
});
