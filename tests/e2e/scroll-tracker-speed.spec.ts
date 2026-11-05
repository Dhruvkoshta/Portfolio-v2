import { expect, test } from "@playwright/test";

test.describe("Scroll Tracker Speed & Section Sync", () => {
	test("progress line aligns with active section and does not run faster than Education", async ({ page }) => {
		await page.goto("/");
		await page.waitForFunction(
			() => document.documentElement.dataset.hydrated === "true",
		);

		// Scroll to Education section
		const educationSection = page.locator("#education");
		await expect(educationSection).toBeVisible();
		await educationSection.scrollIntoViewIfNeeded();
		await page.waitForTimeout(400);

		// Verify Education notch is active
		const educationNotch = page.locator(".scroll-tracker__notch[aria-label*='Education']");
		await expect(educationNotch).toHaveAttribute("data-active", "true");

		// Measure progress value
		const tracker = page.locator(".scroll-tracker");
		const style = await tracker.getAttribute("style");
		expect(style).toContain("--tracker-progress");

		// Extract the --tracker-progress value
		const match = style?.match(/--tracker-progress:\s*([0-9.]+)/);
		expect(match).not.toBeNull();
		const progressVal = parseFloat(match![1]);

		// Education is index 6 of 14 (ratio = 6/14 ≈ 0.428).
		// Previously it was overshooting past 0.65 (Notch 9).
		// It must now be closely aligned with Education (between 0.40 and 0.50).
		expect(progressVal).toBeGreaterThanOrEqual(0.40);
		expect(progressVal).toBeLessThanOrEqual(0.50);

		// Capture screenshot showing proper alignment of progress line and active Education notch
		await page.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/tracker_education_synced.png",
			clip: { x: 0, y: 150, width: 900, height: 600 },
		});
	});
});
