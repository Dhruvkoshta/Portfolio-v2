import { useEffect, useRef, useState } from "react";
import { sound } from "~/lib/sound";

export const IDLE_DIALOGUES = [
	"Still shipping! ✦",
	"Patent No. 202441083752",
	"Listening to Electric 🎧",
	"Purrr... 50+ apps deployed!",
	"BMSCE CGPA 8.8!",
	"Dell Tech software intern!",
	"System reliability: 100%",
	"Click me again! 🐾",
	"Drag me up! I have a parachute 🪂",
];

export const GRAB_DIALOGUES = [
	"wheeeee! hold on tight!",
	"put me down! or drop me!",
	"i can see my house from here!",
	"can you drop me? i wanna fly!",
	"going up! don't drop me yet!",
];

export const FLOAT_DIALOGUES = [
	"🪂 wheeeeeee!",
	"look at me float!",
	"airborne Byte!",
	"gliding smoothly...",
	"parachuting down!",
];

export const LAND_DIALOGUES = [
	"stuck the landing! 🐾",
	"that was awesome!",
	"let's do that again!",
	"touchdown safe and sound!",
];

export type PixelPetPhysics = {
	isDragging: boolean;
	isFloating: boolean;
	offset: { x: number; y: number };
	swingAngle: number;
	dialogue: string | null;
	setDialogue: (d: string | null) => void;
	handlePointerDown: (e: React.PointerEvent<HTMLButtonElement>) => void;
};

export function usePixelPetPhysics(options: {
	isSleeping: boolean;
	onPet: () => void;
}): PixelPetPhysics {
	const { isSleeping, onPet } = options;
	const [dialogue, setDialogue] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [isFloating, setIsFloating] = useState(false);
	const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [swingAngle, setSwingAngle] = useState(0);

	const dragStartRef = useRef<{
		pointerId: number;
		startX: number;
		startY: number;
		initialOffsetX: number;
		initialOffsetY: number;
	} | null>(null);
	const isDraggingRef = useRef(false);
	const offsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const velocityRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });
	const lastPosRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
	const animFrameRef = useRef<number>(0);
	const floatTimeRef = useRef(0);
	const hasMovedRef = useRef(false);

	useEffect(() => {
		offsetRef.current = offset;
	}, [offset]);

	// Periodically say random quotes while grounded
	useEffect(() => {
		const interval = setInterval(() => {
			if (!isSleeping && !isDragging && !isFloating && Math.random() > 0.6) {
				const randomQuote = IDLE_DIALOGUES[Math.floor(Math.random() * IDLE_DIALOGUES.length)];
				setDialogue(randomQuote);
				const timeout = setTimeout(() => setDialogue(null), 3500);
				return () => clearTimeout(timeout);
			}
		}, 8000);

		return () => clearInterval(interval);
	}, [isSleeping, isDragging, isFloating]);

	// Floating parachute physics loop
	useEffect(() => {
		if (!isFloating) return;

		floatTimeRef.current = 0;
		let lastTimestamp = performance.now();

		const tick = (now: number) => {
			const dt = Math.min((now - lastTimestamp) / 1000, 0.05);
			lastTimestamp = now;
			floatTimeRef.current += dt;

			// Gentle downward descent speed (~85px/s)
			const descentSpeed = 85;
			const nextY = offsetRef.current.y + descentSpeed * dt;

			// Gentle horizontal swaying/swinging motion
			const swayFrequency = 2.4;
			const swayAmplitude = 24;
			const swing = Math.sin(floatTimeRef.current * swayFrequency);
			setSwingAngle(swing * 12); // degrees

			// Progress horizontal position smoothly back toward rest origin (x = 0) with gentle sway
			const nextX = offsetRef.current.x * Math.exp(-0.8 * dt) + swing * (swayAmplitude * dt);

			if (nextY >= 0) {
				// Landed on bottom dock!
				setOffset({ x: 0, y: 0 });
				setSwingAngle(0);
				setIsFloating(false);
				sound.play("pop");

				// Landing dialogue
				const landQuote = LAND_DIALOGUES[Math.floor(Math.random() * LAND_DIALOGUES.length)];
				setDialogue(landQuote);
				const t = setTimeout(() => setDialogue(null), 3200);
				return () => clearTimeout(t);
			}

			setOffset({ x: nextX, y: nextY });
			animFrameRef.current = requestAnimationFrame(tick);
		};

		animFrameRef.current = requestAnimationFrame(tick);
		return () => {
			if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
		};
	}, [isFloating]);

	// Pointer drag handlers
	const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
		if (e.button !== 0) return; // primary button only

		const pointerId = e.pointerId;
		const startX = e.clientX;
		const startY = e.clientY;
		const initialOffsetX = offsetRef.current.x;
		const initialOffsetY = offsetRef.current.y;

		dragStartRef.current = {
			pointerId,
			startX,
			startY,
			initialOffsetX,
			initialOffsetY,
		};
		lastPosRef.current = { x: startX, y: startY, time: performance.now() };
		velocityRef.current = { vx: 0, vy: 0 };
		hasMovedRef.current = false;

		const onPointerMove = (ev: PointerEvent) => {
			if (!dragStartRef.current || ev.pointerId !== pointerId) return;

			const dx = ev.clientX - dragStartRef.current.startX;
			const dy = ev.clientY - dragStartRef.current.startY;

			if (!hasMovedRef.current && Math.hypot(dx, dy) > 4) {
				hasMovedRef.current = true;
				isDraggingRef.current = true;
				setIsDragging(true);
				setIsFloating(false);
				setSwingAngle(0);

				sound.play("switch");
				const grabQuote = GRAB_DIALOGUES[Math.floor(Math.random() * GRAB_DIALOGUES.length)];
				setDialogue(grabQuote);
			}

			if (isDraggingRef.current) {
				const now = performance.now();
				const dt = Math.max((now - lastPosRef.current.time) / 1000, 0.008);
				const vx = (ev.clientX - lastPosRef.current.x) / dt;
				const vy = (ev.clientY - lastPosRef.current.y) / dt;
				velocityRef.current = { vx, vy };
				lastPosRef.current = { x: ev.clientX, y: ev.clientY, time: now };

				const newOffsetX = dragStartRef.current.initialOffsetX + dx;
				const newOffsetY = Math.min(0, dragStartRef.current.initialOffsetY + dy);

				const dragTilt = Math.max(-25, Math.min(25, -vx * 0.04));
				setSwingAngle(dragTilt);
				setOffset({ x: newOffsetX, y: newOffsetY });
			}
		};

		const onPointerUp = (ev: PointerEvent) => {
			if (ev.pointerId !== pointerId) return;

			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", onPointerUp);
			window.removeEventListener("pointercancel", onPointerUp);

			const wasDragging = isDraggingRef.current;
			dragStartRef.current = null;
			isDraggingRef.current = false;
			setIsDragging(false);

			if (!wasDragging) {
				onPet();
				return;
			}

			const heightAboveRest = -offsetRef.current.y;
			if (heightAboveRest > 40) {
				setIsFloating(true);
				sound.play("pop");

				const floatQuote = FLOAT_DIALOGUES[Math.floor(Math.random() * FLOAT_DIALOGUES.length)];
				setDialogue(floatQuote);
			} else {
				setOffset({ x: 0, y: 0 });
				setSwingAngle(0);
				sound.play("switch");
			}
		};

		window.addEventListener("pointermove", onPointerMove, { passive: true });
		window.addEventListener("pointerup", onPointerUp, { passive: true });
		window.addEventListener("pointercancel", onPointerUp, { passive: true });
	};

	return {
		isDragging,
		isFloating,
		offset,
		swingAngle,
		dialogue,
		setDialogue,
		handlePointerDown,
	};
}
