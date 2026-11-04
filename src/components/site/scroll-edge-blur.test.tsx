import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ScrollEdgeBlur } from "./scroll-edge-blur";

describe("ScrollEdgeBlur Component", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders aria-hidden blur container with layers for both top and bottom", () => {
		const { container } = render(<ScrollEdgeBlur />);
		const top = container.querySelector(".scroll-edge-blur--top");
		expect(top).toBeInTheDocument();
		expect(top).toHaveAttribute("aria-hidden", "true");

		const bottom = container.querySelector(".scroll-edge-blur--bottom");
		expect(bottom).toBeInTheDocument();
		expect(bottom).toHaveAttribute("aria-hidden", "true");

		const layers = container.querySelectorAll(".scroll-edge-blur__layer");
		expect(layers.length).toBe(12);
	});
});
