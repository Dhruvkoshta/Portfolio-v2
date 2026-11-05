import { expect, test, type Page } from "@playwright/test";

async function gotoHome(page: Page) {
	await page.goto("/");
	await page.waitForFunction(
		() => document.documentElement.dataset.hydrated === "true",
	);
}

test.describe("Point 11: Remove Ethical Hacking Section Completely", () => {
	test("ethical-hacking section is completely absent from DOM, nav, and menus", async ({ page }) => {
		await gotoHome(page);

		// 1. Confirm #ethical-hacking element is NOT present
		const ethicalHackingSection = page.locator("#ethical-hacking");
		await expect(ethicalHackingSection).toHaveCount(0);

		// 2. Confirm total section count is 14
		const sections = page.locator(".ed-section");
		await expect(sections).toHaveCount(14);

		// 3. Confirm Competitions section index in tracker is "08"
		const competitionsNotch = page.getByRole("button", { name: "08 Competitions" });
		await expect(competitionsNotch).toBeVisible();

		// 4. Confirm Contact section index in tracker is "14"
		const contactNotch = page.getByRole("button", { name: "14 Contact" });
		await expect(contactNotch).toBeVisible();

		// 5. Confirm scroll tracker does not have an ethical-hacking item
		const trackerNotch = page.locator(".ed3-tracker__notch[href='#ethical-hacking']");
		await expect(trackerNotch).toHaveCount(0);

		// 6. Confirm mobile/all-sections menu does not have Ethical Hacking
		await page.setViewportSize({ width: 390, height: 844 });
		await gotoHome(page);
		await page.getByRole("button", { name: /menu/i }).click();
		const dialog = page.getByRole("dialog", { name: "All sections" });
		await expect(dialog).toBeVisible();
		await expect(dialog.getByRole("link", { name: /ethical hacking/i })).toHaveCount(0);
	});
});
