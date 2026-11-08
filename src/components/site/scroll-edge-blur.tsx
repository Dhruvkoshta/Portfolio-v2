import type { CSSProperties } from "react";

const TOP_LAYERS = [
	{
		blur: "0.4375px",
		mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 60%)",
		zIndex: 1,
	},
	{
		blur: "0.875px",
		mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 80%)",
		zIndex: 2,
	},
	{
		blur: "1.75px",
		mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%)",
		zIndex: 3,
	},
	{
		blur: "3.5px",
		mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 1) 100%, rgba(0, 0, 0, 0) 100%)",
		zIndex: 4,
	},
	{
		blur: "7px",
		mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 1) 100%, rgba(0, 0, 0, 1) 100%)",
		zIndex: 5,
	},
] as const;

const BOTTOM_LAYERS = [
	{
		blur: "0.4375px",
		mask: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 60%)",
		zIndex: 1,
	},
	{
		blur: "0.875px",
		mask: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 80%)",
		zIndex: 2,
	},
	{
		blur: "1.75px",
		mask: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%)",
		zIndex: 3,
	},
	{
		blur: "3.5px",
		mask: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 1) 100%, rgba(0, 0, 0, 0) 100%)",
		zIndex: 4,
	},
	{
		blur: "7px",
		mask: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 1) 100%, rgba(0, 0, 0, 1) 100%)",
		zIndex: 5,
	},
] as const;

export function ScrollEdgeBlur() {
	return (
		<>
			{/* Top Progressive Edge Blur (height 80px-100px, z-index below navbar) */}
			<div
				aria-hidden="true"
				className="scroll-edge-blur scroll-edge-blur--top"
			>
				<div
					className="scroll-edge-blur__safe"
					style={{
						backdropFilter: "blur(7px)",
						WebkitBackdropFilter: "blur(7px)",
					}}
				/>
				<div className="scroll-edge-blur__stack">
					{TOP_LAYERS.map((layer, index) => (
						<div
							className="scroll-edge-blur__layer"
							key={`top-${index}`}
							style={
								{
									"--blur": layer.blur,
									"--mask": layer.mask,
									backdropFilter: `blur(${layer.blur})`,
									WebkitBackdropFilter: `blur(${layer.blur})`,
									maskImage: layer.mask,
									WebkitMaskImage: layer.mask,
									zIndex: layer.zIndex,
								} as CSSProperties
							}
						/>
					))}
				</div>
			</div>

			{/* Bottom Progressive Edge Blur (behind bottom radio bar, z-index below dock) */}
			<div
				aria-hidden="true"
				className="scroll-edge-blur scroll-edge-blur--bottom"
			>
				<div
					className="scroll-edge-blur__safe scroll-edge-blur__safe--bottom"
					style={{
						backdropFilter: "blur(7px)",
						WebkitBackdropFilter: "blur(7px)",
					}}
				/>
				<div className="scroll-edge-blur__stack">
					{BOTTOM_LAYERS.map((layer, index) => (
						<div
							className="scroll-edge-blur__layer"
							key={`bottom-${index}`}
							style={
								{
									"--blur": layer.blur,
									"--mask": layer.mask,
									backdropFilter: `blur(${layer.blur})`,
									WebkitBackdropFilter: `blur(${layer.blur})`,
									maskImage: layer.mask,
									WebkitMaskImage: layer.mask,
									zIndex: layer.zIndex,
								} as CSSProperties
							}
						/>
					))}
				</div>
			</div>
		</>
	);
}
