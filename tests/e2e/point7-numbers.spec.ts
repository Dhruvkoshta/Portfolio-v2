import { expect, test } from "@playwright/test";

test.describe("Point 7: By the Numbers (Statistics) Section Redesign", () => {
	test("renders 2-column split list, interactive tabs, flag tooltips, live dot, and catch 'em all view", async ({ page }) => {
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");

		const numbersSection = page.locator("#by-the-numbers");
		await expect(numbersSection).toBeVisible();
		await numbersSection.scrollIntoViewIfNeeded();
		await page.waitForTimeout(300);

		// Check tabs exist
		const statsTab = numbersSection.getByRole("tab", { name: "Stats" });
		const catchTab = numbersSection.getByRole("tab", { name: "Catch 'em All" });
		await expect(statsTab).toBeVisible();
		await expect(catchTab).toBeVisible();
		await expect(statsTab).toHaveAttribute("aria-selected", "true");

		// Check 2-column split list
		const splitList = numbersSection.locator(".idx__list--split");
		await expect(splitList).toBeVisible();

		// Check bold tabular metric values
		const metric50 = splitList.getByText("50+", { exact: true });
		await expect(metric50).toBeVisible();

		const metricGPA = splitList.getByText("8.8", { exact: true });
		await expect(metricGPA).toBeVisible();

		// Check typing speed with blinking caret
		const typingCaret = splitList.locator(".idx__caret");
		await expect(typingCaret).toBeVisible();

		// Check live visitor pulsating dot
		const liveDot = splitList.locator(".live-dot");
		await expect(liveDot).toBeVisible();

		// Check flags collection row
		const flagsRow = splitList.locator(".idx__marks");
		await expect(flagsRow).toBeVisible();

		// Hover over US or India flag
		const flag = flagsRow.locator(".idx__mark-flag").first();
		await expect(flag).toBeVisible();
		await flag.hover();
		await page.waitForTimeout(200);

		const flagTooltip = flag.locator(".flag-tooltip");
		await expect(flagTooltip).toBeVisible();

		// Capture screenshot of Stats view with flag hover
		await numbersSection.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point7_numbers_stats.png",
		});

		// Switch to Catch 'em All tab
		await catchTab.click();
		await page.waitForTimeout(200);
		await expect(catchTab).toHaveAttribute("aria-selected", "true");

		const catchWrapper = numbersSection.locator(".catch-wrapper");
		await expect(catchWrapper).toBeVisible();

		const catchGrid = numbersSection.locator(".catch-grid");
		await expect(catchGrid).toBeVisible();

		const catchCards = catchGrid.locator(".catch-card");
		expect(await catchCards.count()).toBeGreaterThanOrEqual(10);

		// Capture screenshot of Catch 'em All view
		await numbersSection.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point7_numbers_catch_em_all.png",
		});
	});
});
