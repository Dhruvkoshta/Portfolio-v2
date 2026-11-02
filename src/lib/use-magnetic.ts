import { useEffect, useRef } from "react";
import { useReducedMotion } from "./use-reduced-motion";

type MagneticOptions = {
	readonly strength?: number;
	readonly radius?: number;
};

/**
 * Custom hook applying a subtle magnetic pull toward the cursor on hover.
 * Automatically disabled when `prefers-reduced-motion: reduce` or on touch/coarse pointers.
 */
export function useMagnetic<T extends HTMLElement>({
	strength = 0.25,
	radius = 45,
}: MagneticOptions = {}) {
	const ref = useRef<T>(null);
	const reduced = useReducedMotion();

	useEffect(() => {
		const element = ref.current;
		if (!element || reduced) return;

		// Skip on touch-only devices
		if (window.matchMedia("(pointer: coarse)").matches) return;

		let frameId: number | null = null;
		let targetX = 0;
		let targetY = 0;
		let currentX = 0;
		let currentY = 0;

		const updateTransform = () => {
			currentX += (targetX - currentX) * 0.2;
			currentY += (targetY - currentY) * 0.2;

			if (Math.abs(targetX - currentX) < 0.05 && Math.abs(targetY - currentY) < 0.05) {
				currentX = targetX;
				currentY = targetY;
				element.style.transform =
					currentX === 0 && currentY === 0
						? ""
						: `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
				frameId = null;
				return;
			}

			element.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
			frameId = requestAnimationFrame(updateTransform);
		};

		const requestUpdate = () => {
			if (frameId === null) {
				frameId = requestAnimationFrame(updateTransform);
			}
		};

		const handlePointerMove = (e: PointerEvent) => {
			const rect = element.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;
			const dx = e.clientX - centerX;
			const dy = e.clientY - centerY;
			const distance = Math.hypot(dx, dy);

			if (distance < radius) {
				targetX = dx * strength;
				targetY = dy * strength;
			} else {
				targetX = 0;
				targetY = 0;
			}
			requestUpdate();
		};

		const handlePointerLeave = () => {
			targetX = 0;
			targetY = 0;
			requestUpdate();
		};

		element.addEventListener("pointermove", handlePointerMove);
		element.addEventListener("pointerleave", handlePointerLeave);

		return () => {
			element.removeEventListener("pointermove", handlePointerMove);
			element.removeEventListener("pointerleave", handlePointerLeave);
			if (frameId !== null) cancelAnimationFrame(frameId);
			element.style.transform = "";
		};
	}, [reduced, strength, radius]);

	return ref;
}
