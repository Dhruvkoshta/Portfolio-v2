import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function gotoHome(page: Page) {
	await page.goto("/");
	await page.waitForFunction(
		() => document.documentElement.dataset.hydrated === "true",
	);
}

async function expectNoViolations(page: Page) {
	const results = await new AxeBuilder({ page }).withTags(tags).analyze();
	const messages = results.violations.map(
		(violation) => `${violation.id}: ${violation.help}`,
	);
	expect(messages).toEqual([]);
}

test("home page has no accessibility violations", async ({ page }) => {
	await gotoHome(page);
	await expectNoViolations(page);
});

test("socials panel has no accessibility violations", async ({ page }) => {
	await gotoHome(page);
	await page.getByRole("button", { name: /Socials/ }).click();
	await expect(page.getByRole("group", { name: "Social links" })).toBeVisible();
	await expectNoViolations(page);
});

test("shortcuts dialog has no accessibility violations", async ({ page }) => {
	await gotoHome(page);
	await page.keyboard.press("?");
	await expect(page.getByRole("dialog", { name: "Shortcuts" })).toBeVisible();
	await expectNoViolations(page);
});

test("mobile menu has no accessibility violations", async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await gotoHome(page);
	await page.getByRole("button", { name: /menu/i }).click();
	await expect(
		page.getByRole("dialog", { name: "All sections" }),
	).toBeVisible();
	await expectNoViolations(page);
});
