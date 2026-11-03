import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePresence } from "./use-presence";

describe("usePresence Hook", () => {
	it("initializes with at least 1 viewer and connection state", () => {
		const { result } = renderHook(() => usePresence());
		expect(result.current.count).toBeGreaterThanOrEqual(1);
		expect(typeof result.current.connected).toBe("boolean");
	});
});
