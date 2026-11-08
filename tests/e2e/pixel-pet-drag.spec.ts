import { expect, test } from "@playwright/test";

test.describe("Pixel Pet Byte: Drag & Parachute Floating", () => {
	test("allows dragging the cat anywhere and dropping it to float down with parachute", async ({ page }) => {
		await page.goto("/");
		await page.waitForFunction(
			() => document.documentElement.dataset.hydrated === "true",
		);

		const pet = page.getByRole("button", { name: /Pet Byte the cat/i });
		await expect(pet).toBeVisible();

		const petBox = await pet.boundingBox();
		expect(petBox).not.toBeNull();
		if (!petBox) return;

		const startX = petBox.x + petBox.width / 2;
		const startY = petBox.y + petBox.height / 2;

		// 1. Drag the cat high up into the viewport
		await page.mouse.move(startX, startY);
		await page.mouse.down();
		await page.mouse.move(startX - 200, startY - 300, { steps: 10 });
		await page.waitForTimeout(100);

		// During drag, the pet should have dragging state
		await expect(pet).toHaveClass(/pixel-pet--dragging/);

		// 2. Release mouse to drop Byte
		await page.mouse.up();

		// 3. Cat should now be floating with parachute deployed
		await expect(pet).toHaveClass(/pixel-pet--floating/);
		const chute = page.locator(".pixel-pet__chute");
		await expect(chute).toBeVisible();

		// Check parachute canopy and lines
		const canopy = page.locator(".pixel-pet__chute-canopy");
		await expect(canopy).toBeVisible();

		// Save screenshot of cat floating with parachute
		await page.screenshot({
			path: "/home/dhruv/.t3/userdata/providers/antigravity/ac0a3dfd6dddb20962cecff6ee5fe65e19d3923be20e52c5ab52ff877f7e4c32/antigravity-acp/brain/bf0baa6d-55ac-4d9f-b7e6-43e9a0e41734/byte_parachute_floating.png",
		});

		// 4. Wait for gentle descent and landing
		// As it floats down, it should eventually touch down and land
		await expect(pet).not.toHaveClass(/pixel-pet--floating/, { timeout: 10000 });
		await expect(chute).not.toBeAttached();
	});
});
