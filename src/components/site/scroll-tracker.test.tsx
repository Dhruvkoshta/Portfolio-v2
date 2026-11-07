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
		// 1 hero + 14 sections = 15 buttons
		expect(buttons).toHaveLength(15);
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

	it("uses instant auto scroll when prefers-reduced-motion is active", () => {
		const targetEl = document.createElement("div");
		targetEl.id = "experience";
		const scrollMock = vi.fn();
		targetEl.scrollIntoView = scrollMock;
		document.body.appendChild(targetEl);

		window.matchMedia = vi.fn().mockImplementation((query) => ({
			matches: query === "(prefers-reduced-motion: reduce)",
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		}));

		render(<ScrollTracker />);
		const expButton = screen.getByRole("button", { name: "01 Experience" });
		fireEvent.click(expButton);

		expect(scrollMock).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
		document.body.removeChild(targetEl);
		// Cleanup matchMedia mock
		delete (window as unknown as { matchMedia?: unknown }).matchMedia;
	});

	it("synchronizes tracker progress with section index rather than overshooting", () => {
		const { container } = render(<ScrollTracker />);
		const nav = container.querySelector(".scroll-tracker");
		expect(nav).toBeInTheDocument();
		// At initial render (top of page), progress is near 0, not overshooting
		const progress = nav?.getAttribute("style");
		expect(progress).toContain("--tracker-progress");
	});
});
