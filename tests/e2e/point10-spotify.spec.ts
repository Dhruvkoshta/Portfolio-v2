import { expect, test } from "@playwright/test";

test.describe("Point 10: Spotify Bookshelf with Sliding Vinyl Record & Custom Playlist", () => {
	test("renders wooden bookshelf with colorful book spines, sliding vinyl disc, tabs, and direct playlist link", async ({ page }) => {
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");

		const spotifySection = page.locator("#spotify");
		await expect(spotifySection).toBeVisible();
		await spotifySection.scrollIntoViewIfNeeded();
		await page.waitForTimeout(300);

		// Check tabs exist
		const playlistsTab = spotifySection.getByRole("tab", { name: "Playlists" });
		const controlTab = spotifySection.getByRole("tab", { name: "Control my Music" });
		await expect(playlistsTab).toBeVisible();
		await expect(controlTab).toBeVisible();
		await expect(playlistsTab).toHaveAttribute("aria-selected", "true");

		// Check bookshelf scene and wooden shelf plinth
		const shelfScene = spotifySection.locator(".bookshelf-scene");
		await expect(shelfScene).toBeVisible();

		const shelfPlinth = shelfScene.locator(".shelf-plinth");
		await expect(shelfPlinth).toBeVisible();

		// Check left and right book clusters
		const bookSpines = shelfScene.locator(".book-spine");
		expect(await bookSpines.count()).toBeGreaterThanOrEqual(10);

		// Check Vinyl & Sleeve unit
		const vinylUnit = shelfScene.locator(".vinyl-sleeve-unit");
		await expect(vinylUnit).toBeVisible();
		await expect(vinylUnit).toHaveAttribute("href", "https://open.spotify.com/playlist/7IbpZshuCcooJoDMvOs9Yp");

		// Check album sleeve and vinyl disc
		const albumSleeve = vinylUnit.locator(".album-sleeve");
		const vinylDisc = vinylUnit.locator(".vinyl-disc");
		await expect(albumSleeve).toBeVisible();
		await expect(vinylDisc).toBeVisible();

		// Check vinyl label text
		const vinylLabel = vinylDisc.locator(".vinyl-label__text");
		await expect(vinylLabel).toContainText("countryish");

		// Hover over the vinyl unit to trigger the slide-out micro-interaction
		await vinylUnit.hover();
		await page.waitForTimeout(300);

		// Capture screenshot of Vinyl slide-out hover state
		await shelfScene.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point10_spotify_vinyl_hover.png",
		});

		// Check subtext listening activity and audio wave
		const subtext = spotifySection.locator(".spotify-shelf-subtext");
		await expect(subtext).toBeVisible();
		await expect(subtext.locator(".spotify-presence-wave")).toBeVisible();
		await expect(subtext.getByText(/Lightning Speed/i)).toBeVisible();

		// Capture screenshot of full Spotify section
		await spotifySection.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point10_spotify_full.png",
		});

		// Switch to "Control my Music" tab
		await controlTab.click();
		await page.waitForTimeout(200);
		await expect(controlTab).toHaveAttribute("aria-selected", "true");

		const controlStage = spotifySection.locator(".spotify-control-stage");
		await expect(controlStage).toBeVisible();

		// Capture screenshot of Control my Music view
		await spotifySection.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/point10_spotify_control.png",
		});
	});
});
