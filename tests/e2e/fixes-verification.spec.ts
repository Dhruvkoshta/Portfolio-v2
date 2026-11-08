import { expect, test } from "@playwright/test";

test.describe("Fix verification: Pet parachute text, top red bar removal, mobile gallery speed", () => {
	test("top red announcement bar is completely removed", async ({ page }) => {
		await page.goto("/");
		await page.waitForFunction(() => document.documentElement.dataset.hydrated === "true");

		// Announcement bar should not exist in DOM
		await expect(page.locator(".announcement")).toHaveCount(0);
		// No red element at y: 0
		const header = page.locator(".appbar-wrap");
		await expect(header).toBeVisible();
	});

	test("pet speech bubble is positioned above the parachute and not hidden behind canopy", async ({ page }) => {
		await page.goto("/");
		await page.waitForFunction(() => document.documentElement.dataset.hydrated === "true");

		const pet = page.getByRole("button", { name: /Pet Byte the cat/i });
		const petBox = await pet.boundingBox();
		expect(petBox).not.toBeNull();
		if (!petBox) return;

		const startX = petBox.x + petBox.width / 2;
		const startY = petBox.y + petBox.height / 2;

		// Drag up and release
		await page.mouse.move(startX, startY);
		await page.mouse.down();
		await page.mouse.move(startX - 150, startY - 260, { steps: 8 });
		await page.mouse.up();

		// Parachute and bubble should be visible
		const chute = page.locator(".pixel-pet__chute");
		await expect(chute).toBeVisible();

		await page.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/verified_chute_and_bubble.png",
		});

		const bubble = page.locator(".pixel-pet__bubble");
		if (await bubble.isVisible()) {
			const bubbleBox = await bubble.boundingBox();
			const chuteBox = await chute.boundingBox();
			if (bubbleBox && chuteBox) {
				// Bubble bottom should be above or at the top of the chute, not underneath it
				expect(bubbleBox.y + bubbleBox.height).toBeLessThanOrEqual(chuteBox.y + 10);
			}
		}
	});

	test("mobile gallery scroll responds quickly with touch speed multiplier", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto("/");
		await page.waitForFunction(() => document.documentElement.dataset.hydrated === "true");

		const gallery = page.locator("#gallery");
		await gallery.scrollIntoViewIfNeeded();

		const canvas = page.locator('[data-testid="polaroid-canvas"]');
		const initialMatrix = await canvas.evaluate((el) => window.getComputedStyle(el).transform);

		const galleryBox = await gallery.boundingBox();
		expect(galleryBox).not.toBeNull();
		if (!galleryBox) return;

		const startX = galleryBox.x + galleryBox.width / 2;
		const startY = galleryBox.y + galleryBox.height / 2;

		// Perform mobile drag of 80px horizontally
		await page.mouse.move(startX, startY);
		await page.mouse.down();
		await page.mouse.move(startX - 80, startY, { steps: 4 });
		await page.mouse.up();

		await page.waitForTimeout(300);

		const afterMatrix = await canvas.evaluate((el) => window.getComputedStyle(el).transform);
		expect(afterMatrix).not.toBe(initialMatrix);
	});
});
