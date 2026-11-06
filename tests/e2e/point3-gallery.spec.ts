import { expect, test } from "@playwright/test";

test.describe("Point 3: Perspective Gallery Inner Bounding & Scroll", () => {
	test("fits within inner content boundaries, renders corner nodes, helper text, and responds to scroll", async ({
		page,
	}) => {
		await page.goto("/");
		await page.waitForFunction(
			() => document.documentElement.dataset.hydrated === "true",
		);

		// Locate the gallery frame
		const gallery = page.locator("#gallery");
		await expect(gallery).toBeVisible();
		await gallery.scrollIntoViewIfNeeded();

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

		// Verify 4 corner nodes exist
		const cornerNodes = gallery.locator("span.rounded-full.bg-neutral-400");
		await expect(cornerNodes).toHaveCount(4);

		// Verify helper caption below
		const caption = page.getByText("Drag, click, or horizontal scroll");
		await expect(caption).toBeVisible();

		// Locate 2D panning canvas
		const canvas = page.locator('[data-testid="polaroid-canvas"]');
		await expect(canvas).toBeVisible();

		// Verify 25+ Polaroid cards are loaded
		const cards = canvas.locator('[data-testid="polaroid-card"]');
		const cardCount = await cards.count();
		expect(cardCount).toBeGreaterThanOrEqual(25);

		// Record initial canvas transform
		const initialTransform = await canvas.evaluate(
			(el) => window.getComputedStyle(el).transform,
		);

		// Pan canvas via drag interaction
		if (galleryBox) {
			const startX = galleryBox.x + galleryBox.width / 2;
			const startY = galleryBox.y + galleryBox.height / 2;

			await page.mouse.move(startX, startY);
			await page.mouse.down();
			await page.mouse.move(startX - 100, startY - 50, { steps: 5 });
			await page.mouse.up();
			await page.waitForTimeout(500);
		}

		const scrolledTransform = await canvas.evaluate(
			(el) => window.getComputedStyle(el).transform,
		);
		expect(scrolledTransform).not.toBe(initialTransform);
	});
});
