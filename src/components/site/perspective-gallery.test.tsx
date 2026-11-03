import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PerspectiveGallery } from "./perspective-gallery";

describe("PerspectiveGallery Component", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders 3D perspective gallery container landmark", () => {
		render(<PerspectiveGallery />);
		const gallery = screen.getByRole("region", { name: /3d perspective gallery/i });
		expect(gallery).toBeInTheDocument();
	});
});
