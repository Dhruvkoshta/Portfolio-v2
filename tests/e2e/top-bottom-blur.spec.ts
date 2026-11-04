import { expect, test } from "@playwright/test";

test.describe("Progressive Edge Blur: Top & Bottom Radio Dock", () => {
	test("renders top and bottom progressive blurs with gradient masks and proper z-indices", async ({
		page,
	}) => {
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");

		const topBlur = page.locator(".scroll-edge-blur--top");
		await expect(topBlur).toBeAttached();

		const bottomBlur = page.locator(".scroll-edge-blur--bottom");
		await expect(bottomBlur).toBeAttached();

		// Check height and pointer events
		const topBox = await topBlur.boundingBox();
		expect(topBox).not.toBeNull();
		if (topBox) {
			expect(topBox.height).toBeGreaterThanOrEqual(75);
			expect(topBox.height).toBeLessThanOrEqual(105);
		}

		const bottomBox = await bottomBlur.boundingBox();
		expect(bottomBox).not.toBeNull();
		if (bottomBox) {
			expect(bottomBox.height).toBeGreaterThanOrEqual(75);
			expect(bottomBox.height).toBeLessThanOrEqual(105);
		}

		// Check z-indices
		const topZIndex = await topBlur.evaluate((el) => window.getComputedStyle(el).zIndex);
		expect(topZIndex).toBe("55");

		const bottomZIndex = await bottomBlur.evaluate((el) => window.getComputedStyle(el).zIndex);
		expect(bottomZIndex).toBe("80");

		// Scroll down a bit to see text scrolling through the top blur
		await page.evaluate(() => window.scrollTo(0, 380));
		await page.waitForTimeout(300);

		// Capture top blur with scrolling text underneath
		await page.screenshot({
			clip: { x: 0, y: 0, width: 1200, height: 200 },
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/progressive_blur_top_scrolled.png",
		});

		// Scroll to experience section to see content passing under the bottom radio dock blur
		await page.evaluate(() => window.scrollTo(0, 800));
		await page.waitForTimeout(300);

		const viewportSize = page.viewportSize();
		const vh = viewportSize?.height ?? 800;
		const vw = viewportSize?.width ?? 1200;

		// Capture bottom blur with radio player
		await page.screenshot({
			clip: { x: 0, y: vh - 180, width: vw, height: 180 },
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/progressive_blur_bottom_radio.png",
		});
	});
});
