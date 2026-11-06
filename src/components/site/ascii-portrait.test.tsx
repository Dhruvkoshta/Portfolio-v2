import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AsciiPortrait } from "./ascii-portrait";

describe("AsciiPortrait", () => {
	it("renders an accessible image canvas with responsive container and fallback", () => {
		render(
			<AsciiPortrait
				alt="Interactive ASCII portrait of Dhruv Koshta"
				src="/media/portrait/dhruv-portrait-360.webp"
			/>,
		);

		const canvas = screen.getByRole("img", {
			name: /Interactive ASCII portrait of Dhruv Koshta/i,
		});
		expect(canvas).toBeInTheDocument();
		expect(canvas.tagName.toLowerCase()).toBe("canvas");

		const container = screen.getByTestId("ascii-portrait");
		expect(container).toBeInTheDocument();
		expect(container.querySelector("img")).toHaveAttribute(
			"src",
			"/media/portrait/dhruv-portrait-360.webp",
		);
	});
});
