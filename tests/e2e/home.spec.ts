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

test("sound toggle button and shortcut 'u' toggle interface audio", async ({ page }) => {
	await gotoHome(page);

	const soundBtn = page.getByRole("button", { name: /interface sounds/i });
	await expect(soundBtn).toBeVisible();
	await expect(soundBtn).toHaveAttribute("aria-label", "Enable interface sounds");

	// Click to enable
	await soundBtn.click();
	await expect(soundBtn).toHaveAttribute("aria-label", "Mute interface sounds");

	// Press 'u' key shortcut to toggle back
	await page.keyboard.press("u");
	await expect(soundBtn).toHaveAttribute("aria-label", "Enable interface sounds");
});

test("pixel pet Byte is interactive and reacts to petting", async ({ page }) => {
	await gotoHome(page);

	const petBtn = page.getByRole("button", { name: /Pet Byte the cat/i });
	await expect(petBtn).toBeVisible();
	await expect(petBtn).toHaveAttribute("aria-label", /Current happiness: 0/);

	// Pet Byte
	await petBtn.click();
	await expect(petBtn).toHaveAttribute("aria-label", /Current happiness: 1/);
});

test("ambient radio player is accessible in the bottom dock and spotify section", async ({ page }) => {
	await gotoHome(page);

	const bottomRadioBtn = page.getByRole("button", { name: /play ambient radio/i });
	await expect(bottomRadioBtn).toBeVisible();

	// Full player in Spotify section
	const radioPlayer = page.getByRole("region", { name: "Ambient Radio Player" });
	await expect(radioPlayer).toBeVisible();
	await expect(radioPlayer.getByText("Electric — Lofi Stream")).toBeVisible();
});

test("thermal receipt form validates input and submits message", async ({ page }) => {
	await gotoHome(page);

	const msgInput = page.getByLabel("1 × Message");
	const replyInput = page.getByLabel("1 × Reply-to");
	const submitBtn = page.getByRole("button", { name: "Print & Send Message" });

	await expect(msgInput).toBeVisible();
	await expect(replyInput).toBeVisible();

	// Fill message and replyTo
	await msgInput.fill("Hello Dhruv! Great portfolio and engineering craftsmanship.");
	await replyInput.fill("recruiter@example.com");

	// Submit receipt
	await submitBtn.click();

	// Verify printed confirmation
	await expect(page.getByText("Message Printed & Saved")).toBeVisible();
	await expect(page.getByRole("button", { name: "Print Another Receipt" })).toBeVisible();
});

test("live presence room displays count in header and by-the-numbers section", async ({ page }) => {
	await gotoHome(page);

	const presenceBadge = page.locator(".appbar__presence");
	await expect(presenceBadge).toBeVisible();
	await expect(presenceBadge.locator(".appbar__presence-count")).toBeVisible();
	await expect(presenceBadge.locator(".appbar__presence-label")).toHaveText("live");

	const numbersSection = page.locator("#by-the-numbers");
	await expect(numbersSection).toBeVisible();
	await expect(numbersSection.getByText(/Live readers currently connected/i)).toBeVisible();
});
