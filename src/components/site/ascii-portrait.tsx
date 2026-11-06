import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "~/lib/use-reduced-motion";

interface AsciiPortraitProps {
	alt?: string;
	className?: string;
	columns?: number;
	src?: string;
}

interface Particle {
	baseX: number;
	baseY: number;
	char: string;
	col: number;
	color: string;
	depth: number;
	row: number;
	vx: number;
	vy: number;
	x: number;
	y: number;
}

const CHAR_RAMP = [" ", "·", ":", "+", "*", "%", "#", "@"];

export function AsciiPortrait({
	alt = "Interactive ASCII portrait of Dhruv Koshta",
	className = "",
	columns = 54,
	src = "/media/portrait/dhruv-portrait-360.webp",
}: AsciiPortraitProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const reduced = useReducedMotion();
	const [isReady, setIsReady] = useState(false);

	const particlesRef = useRef<Particle[]>([]);
	const gridRef = useRef({ cols: columns, rows: 70 });
	const gazeRef = useRef({
		currentX: 0,
		currentY: 0,
		targetX: 0,
		targetY: 0,
	});
	const mouseRef = useRef({
		isHovering: false,
		x: -9999,
		y: -9999,
	});
	const rafRef = useRef<number | null>(null);

	// 1. Load image and generate sampling grid
	useEffect(() => {
		let isMounted = true;
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.src = src;

		img.onload = () => {
			if (!isMounted) return;

			const origW = img.naturalWidth || img.width || 360;
			const origH = img.naturalHeight || img.height || 464;
			const cols = columns;
			const rows = Math.round(cols * (origH / origW));
			gridRef.current = { cols, rows };

			const offscreen = document.createElement("canvas");
			offscreen.width = cols;
			offscreen.height = rows;
			const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
			if (!offCtx) return;

			offCtx.drawImage(img, 0, 0, cols, rows);
			const imgData = offCtx.getImageData(0, 0, cols, rows).data;

			const pts: Particle[] = [];
			for (let r = 0; r < rows; r++) {
				for (let c = 0; c < cols; c++) {
					const idx = (r * cols + c) * 4;
					const a = imgData[idx + 3];
					if (a < 35) continue; // transparent background

					const lum =
						(0.299 * imgData[idx] +
							0.587 * imgData[idx + 1] +
							0.114 * imgData[idx + 2]) /
						255;

					let d = 1 - lum;
					if (d > 0.35) d = Math.min(1, d * 1.25);
					const charIdx = Math.min(
						CHAR_RAMP.length - 1,
						Math.max(0, Math.floor(d * CHAR_RAMP.length)),
					);
					const char = CHAR_RAMP[charIdx];
					if (char === " ") continue;

					// 3D parallax depth calculation: face center around col=0.62, row=0.28
					const normC = c / cols;
					const normR = r / rows;
					const distFromFace = Math.hypot(normC - 0.62, normR - 0.28);
					const depth = 0.8 + Math.max(0, 1.0 - distFromFace * 2.2) * 1.4;

					const color =
						lum < 0.22 ? "#050505" : lum < 0.45 ? "#18181b" : "#44444c";

					pts.push({
						baseX: 0,
						baseY: 0,
						char,
						col: c,
						color,
						depth,
						row: r,
						vx: 0,
						vy: 0,
						x: 0,
						y: 0,
					});
				}
			}

			particlesRef.current = pts;
			setIsReady(true);
		};

		return () => {
			isMounted = false;
		};
	}, [src, columns]);

	// 2. Window viewport gaze tracker
	useEffect(() => {
		if (reduced) return;

		const handlePointerMove = (e: PointerEvent) => {
			if (!containerRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			const dx = e.clientX - cx;
			const dy = e.clientY - cy;
			const dist = Math.hypot(dx, dy);
			const angle = Math.atan2(dy, dx);
			const strength = Math.min(dist / 380, 1.0);

			gazeRef.current.targetX = Math.cos(angle) * strength * 5.0;
			gazeRef.current.targetY = Math.sin(angle) * strength * 5.0;
		};

		const handlePointerLeave = () => {
			// Idle state: smoothly transition portrait back to resting center
			gazeRef.current.targetX = 0;
			gazeRef.current.targetY = 0;
		};

		window.addEventListener("pointermove", handlePointerMove, { passive: true });
		window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerleave", handlePointerLeave);
		};
	}, [reduced]);

	// 3. Canvas rendering & physics loop
	useEffect(() => {
		if (!isReady || !canvasRef.current || !containerRef.current) return;

		const canvas = canvasRef.current;
		const container = containerRef.current;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let width = container.clientWidth || 176;
		let height = container.clientHeight || 227;

		const updateCanvasSize = () => {
			if (!container || !canvas) return;
			const w = container.clientWidth || 176;
			const h = container.clientHeight || 227;
			width = w;
			height = h;

			const dpr = window.devicePixelRatio || 1;
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			const { cols, rows } = gridRef.current;
			const cellW = width / cols;
			const cellH = height / rows;

			const pts = particlesRef.current;
			for (let i = 0; i < pts.length; i++) {
				const p = pts[i];
				p.baseX = (p.col + 0.5) * cellW;
				p.baseY = (p.row + 0.5) * cellH;
				if (p.x === 0 && p.y === 0) {
					p.x = p.baseX;
					p.y = p.baseY;
				}
			}
		};

		updateCanvasSize();

		const resizeObserver = new ResizeObserver(() => {
			updateCanvasSize();
		});
		resizeObserver.observe(container);

		const render = () => {
			const gaze = gazeRef.current;
			if (reduced) {
				gaze.currentX = 0;
				gaze.currentY = 0;
			} else {
				gaze.currentX += (gaze.targetX - gaze.currentX) * 0.12;
				gaze.currentY += (gaze.targetY - gaze.currentY) * 0.12;
			}

			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, width, height);

			const { rows } = gridRef.current;
			const fontSize = Math.max(3.8, Math.round((height / rows) * 1.1 * 10) / 10);
			ctx.font = `bold ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			const mouse = mouseRef.current;
			const repulsionRadius = Math.max(30, width * 0.22);
			const pts = particlesRef.current;
			const len = pts.length;
			const gx = gaze.currentX;
			const gy = gaze.currentY;

			for (let i = 0; i < len; i++) {
				const p = pts[i];

				if (!reduced && mouse.isHovering) {
					const pdx = p.x - mouse.x;
					const pdy = p.y - mouse.y;
					const pdist = Math.hypot(pdx, pdy);
					if (pdist < repulsionRadius && pdist > 0) {
						const force = (1 - pdist / repulsionRadius) * 5.2;
						const angle = Math.atan2(pdy, pdx);
						p.vx += Math.cos(angle) * force + (Math.random() - 0.5) * 1.0;
						p.vy += Math.sin(angle) * force + (Math.random() - 0.5) * 1.0;
					}
				}

				const tx = p.baseX + gx * p.depth;
				const ty = p.baseY + gy * p.depth;

				if (reduced) {
					p.x = p.baseX;
					p.y = p.baseY;
				} else {
					const springX = (tx - p.x) * 0.16;
					const springY = (ty - p.y) * 0.16;
					p.vx = (p.vx + springX) * 0.78;
					p.vy = (p.vy + springY) * 0.78;
					p.x += p.vx;
					p.y += p.vy;
				}

				ctx.fillStyle = p.color;
				ctx.fillText(p.char, p.x, p.y);
			}

			if (!reduced) {
				rafRef.current = requestAnimationFrame(render);
			}
		};

		if (reduced) {
			render();
		} else {
			rafRef.current = requestAnimationFrame(render);
		}

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			resizeObserver.disconnect();
		};
	}, [isReady, reduced]);

	const updateMouse = (clientX: number, clientY: number, hovering: boolean) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		mouseRef.current.isHovering = hovering;
		mouseRef.current.x = clientX - rect.left;
		mouseRef.current.y = clientY - rect.top;
	};

	const handlePointerEnter = (e: React.PointerEvent) => {
		updateMouse(e.clientX, e.clientY, true);
	};

	const handlePointerMove = (e: React.PointerEvent) => {
		updateMouse(e.clientX, e.clientY, true);
	};

	const handlePointerLeave = () => {
		mouseRef.current.isHovering = false;
		mouseRef.current.x = -9999;
		mouseRef.current.y = -9999;
	};

	return (
		<div
			className={`ascii-portrait ${className}`}
			data-testid="ascii-portrait"
			onPointerEnter={handlePointerEnter}
			onPointerLeave={handlePointerLeave}
			onPointerMove={handlePointerMove}
			ref={containerRef}
		>
			<canvas
				aria-label={alt}
				className="ascii-portrait__canvas"
				ref={canvasRef}
				role="img"
			/>

			{/* Accessible fallback for non-JS / SSR environments */}
			<picture
				aria-hidden="true"
				className={`ascii-portrait__fallback ${isReady ? "ascii-portrait__fallback--hidden" : ""}`}
			>
				<source
					sizes="(max-width: 600px) 132px, 176px"
					srcSet="/media/portrait/dhruv-portrait-360.avif 360w, /media/portrait/dhruv-portrait-480.avif 480w, /media/portrait/dhruv-portrait-720.avif 720w"
					type="image/avif"
				/>
				<source
					sizes="(max-width: 600px) 132px, 176px"
					srcSet="/media/portrait/dhruv-portrait-360.webp 360w, /media/portrait/dhruv-portrait-480.webp 480w, /media/portrait/dhruv-portrait-720.webp 720w"
					type="image/webp"
				/>
				<img
					alt=""
					decoding="async"
					height={464}
					loading="eager"
					src="/media/portrait/dhruv-portrait-360.webp"
					width={360}
				/>
			</picture>
		</div>
	);
}
