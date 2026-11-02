import { expect, test, type Page } from "@playwright/test";

async function gotoHome(page: Page) {
	await page.goto("/");
	await page.waitForFunction(
		() => document.documentElement.dataset.hydrated === "true",
	);
}

test("home page renders the hero and every section", async ({ page }) => {
	await gotoHome(page);

	await expect(page.getByRole("heading", { level: 1 })).toContainText(
		"Dhruv Koshta",
	);
	await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
	await expect(
		page
			.getByRole("navigation", { name: "Primary" })
			.getByRole("link", { name: /Notes/ }),
	).toHaveAttribute("href", "https://notes.dhruvkoshta.me");

	await expect(page.locator(".ed-section")).toHaveCount(15);
	await expect(page.locator("#experience h2")).toHaveText("Experience");
	await expect(page.locator("#contact h2")).toContainText(
		"Get in Contact via Printed Receipt",
	);
});

test("socials menu opens and closes with escape", async ({ page }) => {
	await gotoHome(page);

	const trigger = page.getByRole("button", { name: /Socials/ });
	await trigger.click();
	const panel = page.getByRole("group", { name: "Social links" });
	await expect(panel).toBeVisible();
	await expect(panel.getByRole("link", { name: "GitHub" })).toBeVisible();

	await page.keyboard.press("Escape");
	await expect(panel).toBeHidden();
	await expect(trigger).toBeFocused();
});

test("keyboard shortcuts dialog opens with a question mark", async ({
	page,
}) => {
	await gotoHome(page);

	await page.keyboard.press("?");
	const dialog = page.getByRole("dialog", { name: "Shortcuts" });
	await expect(dialog).toBeVisible();
	await expect(dialog.getByText("Show this panel")).toBeVisible();

	await page.keyboard.press("Escape");
	await expect(dialog).toBeHidden();
});

test("mobile menu lists the section index", async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await gotoHome(page);

	await page.getByRole("button", { name: /menu/i }).click();
	const dialog = page.getByRole("dialog", { name: "All sections" });
	await expect(dialog).toBeVisible();
	await expect(dialog.getByRole("link", { name: "Experience" })).toBeVisible();

	await dialog.getByRole("link", { name: "Contact" }).click();
	await expect(dialog).toBeHidden();
	await expect(page).toHaveURL(/#contact$/);
});

test("the page never scrolls sideways", async ({ page }) => {
	for (const width of [390, 768, 1440]) {
		await page.setViewportSize({ width, height: 900 });
		await gotoHome(page);
		const scrollX = await page.evaluate(() => {
			window.scrollTo(500, 0);
			return window.scrollX;
		});
		expect(scrollX).toBe(0);
	}
});

test("unknown routes render the 404 page", async ({ page }) => {
	await page.goto("/this-does-not-exist");
	await expect(page.getByText("This page went")).toBeVisible();
});

test.describe("reduced motion", () => {
	test.use({ reducedMotion: "reduce" });

	test("disables parallax and smooth scrolling", async ({ page }) => {
		await gotoHome(page);

		const styles = await page.evaluate(() => {
			const track = document.querySelector(".polaroid-life");
			const polaroid = document.querySelector(".polaroid");
			return {
				parallax: track
					? getComputedStyle(track).getPropertyValue("--parallax").trim()
					: null,
				transition: polaroid
					? getComputedStyle(polaroid).transitionDuration
					: null,
				scrollBehavior: getComputedStyle(document.documentElement)
					.scrollBehavior,
			};
		});

		expect(styles.parallax === "0" || styles.parallax === "").toBe(true);
		expect(Number.parseFloat(styles.transition ?? "1")).toBeLessThan(0.01);
		expect(styles.scrollBehavior).toBe("auto");
	});
});
