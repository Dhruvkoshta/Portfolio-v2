import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useMagnetic } from "./use-magnetic";

describe("useMagnetic Hook", () => {
	it("returns a ref object", () => {
		const { result } = renderHook(() => useMagnetic());
		expect(result.current).toHaveProperty("current");
	});
});
