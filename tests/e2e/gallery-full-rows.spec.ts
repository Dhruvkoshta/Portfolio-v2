import { expect, test } from "@playwright/test";

test.describe("Polaroid Gallery Mechanics & Lightbox", () => {
	test("displays scattered Polaroid cards, click-to-focus lightbox, and drag disambiguation", async ({
		page,
	}) => {
		await page.goto("/");
		await page.waitForFunction(
			() => document.documentElement.dataset.hydrated === "true",
		);

		const gallery = page.locator("#gallery");
		await expect(gallery).toBeVisible();
		await gallery.scrollIntoViewIfNeeded();

		const canvas = page.locator('[data-testid="polaroid-canvas"]');
		await expect(canvas).toBeVisible();

		// Verify 25+ Polaroid cards with correct caption formatting (YYYY + text)
		const cards = canvas.locator('[data-testid="polaroid-card"]');
		const count = await cards.count();
		expect(count).toBeGreaterThanOrEqual(25);

		const centerCard = canvas.locator('[data-testid="polaroid-card"]').nth(13);
		const captionText = await centerCard.locator("p").innerText();
		expect(captionText).toMatch(/^\d{4}\s\+\s.+$/);

		// Test click-to-focus lightbox state
		await centerCard.click();

		// Backdrop overlay should be visible with blur and white wash
		const backdrop = gallery.locator('[aria-label="Close focused photo"]');
		await expect(backdrop).toBeVisible();

		// Pressing Escape should close the modal
		await page.keyboard.press("Escape");
		await expect(backdrop).not.toBeVisible();

		// Open again and close by clicking the backdrop
		await centerCard.click();
		await expect(backdrop).toBeVisible();
		await backdrop.click({ position: { x: 20, y: 20 } });
		await expect(backdrop).not.toBeVisible();

		// Test drag vs click disambiguation: dragging > 5px should NOT open lightbox
		const initialTransform = await canvas.evaluate(
			(el) => window.getComputedStyle(el).transform,
		);

		const galleryBox = await gallery.boundingBox();
		expect(galleryBox).not.toBeNull();

		if (galleryBox) {
			const startX = galleryBox.x + galleryBox.width / 2;
			const startY = galleryBox.y + galleryBox.height / 2;

			await page.mouse.move(startX, startY);
			await page.mouse.down();
			await page.mouse.move(startX - 80, startY - 40, { steps: 5 });
			await page.mouse.up();

			// Wait for spring settling
			await page.waitForTimeout(400);

			// Lightbox should not be open
			await expect(backdrop).not.toBeVisible();

			// Canvas transform should have shifted
			const pannedTransform = await canvas.evaluate(
				(el) => window.getComputedStyle(el).transform,
			);
			expect(pannedTransform).not.toBe(initialTransform);
		}
	});
});
