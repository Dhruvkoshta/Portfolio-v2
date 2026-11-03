import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ScrollEdgeBlur } from "./scroll-edge-blur";

describe("ScrollEdgeBlur Component", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders aria-hidden blur container with layers", () => {
		const { container } = render(<ScrollEdgeBlur />);
		const root = container.querySelector(".scroll-edge-blur--top");
		expect(root).toBeInTheDocument();
		expect(root).toHaveAttribute("aria-hidden", "true");

		const layers = container.querySelectorAll(".scroll-edge-blur__layer");
		expect(layers.length).toBe(6);
	});
});
