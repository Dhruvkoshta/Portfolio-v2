import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ScrollTracker } from "./scroll-tracker";

describe("ScrollTracker Component", () => {
	afterEach(() => {
		cleanup();
	});
	it("renders navigation landmark with all section notches", () => {
		render(<ScrollTracker />);
		const nav = screen.getByRole("navigation", { name: /page sections progress/i });
		expect(nav).toBeInTheDocument();

		const buttons = screen.getAllByRole("button");
		// 1 hero + 15 sections = 16 buttons
		expect(buttons).toHaveLength(16);
		expect(buttons[0]).toHaveAttribute("aria-label", "00 Top");
	});

	it("smooth scrolls to target element when clicked", () => {
		const targetEl = document.createElement("div");
		targetEl.id = "experience";
		const scrollMock = vi.fn();
		targetEl.scrollIntoView = scrollMock;
		document.body.appendChild(targetEl);

		render(<ScrollTracker />);
		const expButton = screen.getByRole("button", { name: "01 Experience" });
		fireEvent.click(expButton);

		expect(scrollMock).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
		document.body.removeChild(targetEl);
	});
});
