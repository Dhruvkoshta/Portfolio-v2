import { expect, test } from "@playwright/test";

test.describe("Point 9: Education Boarding Pass Tickets & Favorite Classes Ticker", () => {
	test("renders 3 boarding pass ticket cards with cutouts, barcodes, bold red scores, and infinite marquee classes ticker", async ({ page }) => {
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");

		const eduSection = page.locator("#education");
		await expect(eduSection).toBeVisible();
		await eduSection.scrollIntoViewIfNeeded();
		await page.waitForTimeout(300);

		// Check 3 ticket cards exist
		const ticketCards = eduSection.locator(".tkt-card");
		await expect(ticketCards).toHaveCount(3);

		// Verify first card: BMSCE
		const bmsceCard = ticketCards.first();
		await expect(bmsceCard).toBeVisible();
		await expect(bmsceCard.locator(".tkt-card__title")).toContainText("B.M.S. College of Engineering");
		await expect(bmsceCard.locator(".tkt-card__flag")).toContainText("🇮🇳");
		await expect(bmsceCard.locator(".tkt-card__degree")).toContainText("Electronics & Communication");

		// Verify circular cutout notches and perforated line
		await expect(bmsceCard.locator(".tkt-notch--left")).toBeVisible();
		await expect(bmsceCard.locator(".tkt-notch--right")).toBeVisible();
		await expect(bmsceCard.locator(".tkt-perf-line")).toBeVisible();

		// Verify prominent red score
		const score = bmsceCard.locator(".tkt-card__score");
		await expect(score).toHaveText("8.8 / 10 CGPA");
		const scoreColor = await score.evaluate((el) => window.getComputedStyle(el).color);
		expect(scoreColor).toMatch(/rgb\((253,\s*1,\s*12|239,\s*68,\s*68)\)/);

		// Verify barcode SVG and serial code
		const barcode = bmsceCard.locator(".tkt-card__barcode");
		await expect(barcode).toBeVisible();
		await expect(barcode.locator(".tkt-barcode-svg")).toBeVisible();
		await expect(barcode.locator(".tkt-barcode-code")).toHaveText("BMSCE-2023-ECE-88");

		// Check Favorite Classes ticker section
		const tickerSection = eduSection.locator(".classes-ticker-section");
		await expect(tickerSection).toBeVisible();

		const ticker = tickerSection.locator(".classes-ticker");
		await expect(ticker).toBeVisible();

		const trackLeft = ticker.locator(".classes-ticker__track--left");
		const trackRight = ticker.locator(".classes-ticker__track--right");
		await expect(trackLeft).toBeVisible();
		await expect(trackRight).toBeVisible();

		// Verify course chips
		const chips = ticker.locator(".class-chip");
		expect(await chips.count()).toBeGreaterThanOrEqual(16);

		const firstChip = chips.first();
		await expect(firstChip.locator(".class-chip__name")).toBeVisible();
		await expect(firstChip.locator(".class-chip__grade")).toBeVisible();

		// Capture screenshot of Ticket Cards
		await eduSection.locator(".tkt").screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point9_education_tickets.png",
		});

		// Capture screenshot of full Education Section with Classes Ticker
		await eduSection.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point9_education_full.png",
		});
	});
});
