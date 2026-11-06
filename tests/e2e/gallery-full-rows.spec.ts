import { expect, test } from "@playwright/test";

test.describe("Gallery End of Scroll Full Rows", () => {
	test("displays all full rows with balanced columns at the end of scroll on desktop and mobile", async ({
		page,
	}) => {
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");

		const gallery = page.locator("#gallery");
		await expect(gallery).toBeVisible();

		const wrapper = page.locator(".perspective-gallery-scroll-wrapper");
		await expect(wrapper).toBeVisible();

		// Scroll inner gallery wrapper to the end of scroll
		await wrapper.evaluate((el) => {
			el.scrollTop = el.scrollHeight - el.clientHeight;
			el.dispatchEvent(new Event("scroll"));
		});

		// Wait for Framer Motion spring to settle
		await page.waitForTimeout(600);

		// Verify every column has cards visible inside the gallery frame
		const colCardsInfo = await gallery.evaluate((gal) => {
			const galRect = gal.getBoundingClientRect();
			const cols = Array.from(gal.querySelectorAll(".perspective-gallery-col"));
			return cols.map((col, ci) => {
				const cards = Array.from(col.querySelectorAll(".perspective-gallery__card"));
				const visibleCards = cards.filter((card) => {
					const cr = card.getBoundingClientRect();
					return cr.bottom > galRect.top + 20 && cr.top < galRect.bottom - 20;
				});
				return {
					colIndex: ci,
					totalCards: cards.length,
					visibleCount: visibleCards.length,
				};
			});
		});

		// Expect 4 columns
		expect(colCardsInfo).toHaveLength(4);

		// Every column must have all 3 cards visible within the gallery frame
		for (const col of colCardsInfo) {
			expect(col.totalCards).toBe(3);
			expect(col.visibleCount).toBe(3);
		}
	});
});
