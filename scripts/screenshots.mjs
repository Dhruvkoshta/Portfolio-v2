/* global document, getComputedStyle */
import { chromium } from "@playwright/test";

const browser = await chromium.launch({ executablePath: "/usr/bin/chromium" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (message) => {
	if (message.type() === "error") errors.push(message.text());
});
page.on("pageerror", (error) => errors.push(error.message));

await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
await page.screenshot({ path: "/tmp/opencode/phase0-1440.png", fullPage: true });

for (const [width, height, name] of [
	[768, 1024, "768"],
	[390, 844, "390"],
]) {
	await page.setViewportSize({ width, height });
	await page.waitForTimeout(250);
	await page.screenshot({ path: `/tmp/opencode/phase0-${name}.png`, fullPage: true });
}

const metrics = await page.evaluate(() => ({
	title: document.title,
	height: document.documentElement.scrollHeight,
	bodyBg: getComputedStyle(document.body).backgroundColor,
	font: getComputedStyle(document.body).fontFamily,
	h1: document.querySelector("h1")?.textContent,
	nav: [...document.querySelectorAll("nav a")].map((a) => a.textContent?.trim()),
}));

console.log(JSON.stringify({ metrics, errors }, null, 2));
await browser.close();
