import type { ReactNode } from "react";

type IconProps = {
	size?: number;
	className?: string;
};

/* -------------------------------------------------------------------------
   SVG Vector Icons for Technologies
------------------------------------------------------------------------- */

export function ReactIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeWidth="1.5"
			viewBox="-11.5 -10.23174 23 20.46348"
			width={size}
		>
			<circle cx="0" cy="0" fill="currentColor" r="2.05" />
			<g stroke="currentColor">
				<ellipse rx="11" ry="4.2" />
				<ellipse rx="11" ry="4.2" transform="rotate(60)" />
				<ellipse rx="11" ry="4.2" transform="rotate(120)" />
			</g>
		</svg>
	);
}

export function TypeScriptIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			viewBox="0 0 24 24"
			width={size}
		>
			<rect height="20" rx="4" stroke="currentColor" strokeWidth="1.75" width="20" x="2" y="2" />
			<path
				d="M7 9h6m-3 0v9M15 15.5c.8.9 2 1.3 3 1.3 1.2 0 1.8-.6 1.8-1.3 0-1.8-4-1.2-4-3.5 0-1.2 1-2 2.8-2 1 0 1.8.3 2.5.8"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.75"
			/>
		</svg>
	);
}

export function NextJsIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeWidth="1.75"
			viewBox="0 0 24 24"
			width={size}
		>
			<circle cx="12" cy="12" r="10" />
			<path d="M9 8v8l8.5-10" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M15 11.5v4.5" strokeLinecap="round" />
		</svg>
	);
}

export function NodeJsIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.75"
			viewBox="0 0 24 24"
			width={size}
		>
			<path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" />
			<path d="M12 22V12" />
			<path d="M12 12L3.5 7" />
			<path d="M12 12l8.5-5" />
		</svg>
	);
}

export function PythonIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="currentColor"
			height={size}
			viewBox="0 0 24 24"
			width={size}
		>
			<path d="M11.92 2c-3.1 0-5.12 1.3-5.12 3.8v2.4h5.24v.8H4.6c-2.3 0-4.1 1.7-4.1 4.2 0 2.5 1.7 4.1 4.1 4.1h2v-2.3c0-2.4 2-4.4 4.4-4.4h5.3v-4.8c0-2.5-2.2-3.8-4.38-3.8h-.02zm-1.8 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm1.96 18.5c3.1 0 5.12-1.3 5.12-3.8v-2.4h-5.24v-.8h7.44c2.3 0 4.1-1.7 4.1-4.2 0-2.5-1.7-4.1-4.1-4.1h-2v2.3c0 2.4-2 4.4-4.4 4.4h-5.3v4.8c0 2.5 2.2 3.8 4.38 3.8h.02zm1.8-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
		</svg>
	);
}

export function DockerIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="currentColor"
			height={size}
			viewBox="0 0 24 24"
			width={size}
		>
			<path d="M13.98 11.08h-2.12v-2.1h2.12v2.1zm-2.73 0H9.13v-2.1h2.12v2.1zm-2.73 0H6.4v-2.1h2.12v2.1zm8.18 0h-2.12v-2.1h2.12v2.1zm-2.72-2.7h-2.13v-2.1h2.13v2.1zm-2.73 0H9.13v-2.1h2.12v2.1zm-2.73 0H6.4v-2.1h2.12v2.1zm8.18 0h-2.12v-2.1h2.12v2.1zm-5.45-2.7H9.13v-2.1h2.12v2.1zm11.38 5.7c-.52-.37-1.7-.42-2.61-.17-.18-.83-.73-1.51-1.39-1.99l-.54-.37-.36.55c-.51.77-.67 1.83-.43 2.76-.32.18-.85.39-1.46.43H1.47c-.24 1.13-.1 2.3.43 3.32 1.05 2.05 3.3 3.38 6.47 3.38 6.78 0 11.23-3.79 12.35-7.79.52.06 1.45-.04 2.15-.72.07-.07.13-.15.19-.24l.1-.15-.19-.11z" />
		</svg>
	);
}

export function LinuxIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.75"
			viewBox="0 0 24 24"
			width={size}
		>
			<rect height="18" rx="3" width="20" x="2" y="3" />
			<path d="M7 8l4 4-4 4" />
			<path d="M13 16h4" />
		</svg>
	);
}

export function CppIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.75"
			viewBox="0 0 24 24"
			width={size}
		>
			<circle cx="12" cy="12" r="10" />
			<path d="M8.5 9.5a4 4 0 1 0 0 5" />
			<path d="M14 11v2m-1-1h2" />
			<path d="M18 11v2m-1-1h2" />
		</svg>
	);
}

export function DatabaseIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.75"
			viewBox="0 0 24 24"
			width={size}
		>
			<ellipse cx="12" cy="5" rx="9" ry="3" />
			<path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
			<path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
		</svg>
	);
}

export function GitIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.75"
			viewBox="0 0 24 24"
			width={size}
		>
			<circle cx="6" cy="6" r="3" />
			<circle cx="6" cy="18" r="3" />
			<circle cx="18" cy="9" r="3" />
			<path d="M6 9v6" />
			<path d="M9 15l6-3" />
		</svg>
	);
}

export function HardwareIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.75"
			viewBox="0 0 24 24"
			width={size}
		>
			<rect height="12" rx="2" width="12" x="6" y="6" />
			<path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4M18 9h4m-4 6h4" />
		</svg>
	);
}

export function WirelessIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.75"
			viewBox="0 0 24 24"
			width={size}
		>
			<path d="M5 12.55a11 11 0 0 1 14.08 0" />
			<path d="M1.42 9a16 16 0 0 1 21.16 0" />
			<path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
			<line x1="12" x2="12.01" y1="20" y2="20" />
		</svg>
	);
}

export function SocketIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.75"
			viewBox="0 0 24 24"
			width={size}
		>
			<path d="M6 9a6 6 0 0 0 12 0" />
			<path d="M12 15v5" />
			<path d="M9 3v4" />
			<path d="M15 3v4" />
		</svg>
	);
}

export function CloudflareIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="currentColor"
			height={size}
			viewBox="0 0 24 24"
			width={size}
		>
			<path d="M19.4 12.2a4.9 4.9 0 0 0-4.7-3.6c-2.3 0-4.3 1.5-4.8 3.7A5 5 0 0 0 4.6 17h14.8a3.6 3.6 0 0 0 0-7.2c-.3 0-.6.1-.9.2.1-.6.1-1.2-.1-1.8z" />
		</svg>
	);
}

export function NginxIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.75"
			viewBox="0 0 24 24"
			width={size}
		>
			<polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
			<path d="M9 16V8l6 8V8" />
		</svg>
	);
}

export function PyTorchIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.75"
			viewBox="0 0 24 24"
			width={size}
		>
			<path d="M12 3v3" />
			<path d="M17 7l-2 2" />
			<path d="M12 6a7 7 0 1 0 7 7c0-2.5-1.5-4.5-3.5-5.5" />
		</svg>
	);
}

export function GenericCodeIcon({ size = 15, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.75"
			viewBox="0 0 24 24"
			width={size}
		>
			<polyline points="16 18 22 12 16 6" />
			<polyline points="8 6 2 12 8 18" />
		</svg>
	);
}

/* -------------------------------------------------------------------------
   Helper to map tech name to matching icon component
------------------------------------------------------------------------- */

function getTechIcon(name: string): ReactNode {
	const key = name.toLowerCase().trim();

	if (key.includes("react")) return <ReactIcon />;
	if (key.includes("typescript") || key === "ts") return <TypeScriptIcon />;
	if (key.includes("next")) return <NextJsIcon />;
	if (key.includes("node")) return <NodeJsIcon />;
	if (key.includes("python")) return <PythonIcon />;
	if (key.includes("docker")) return <DockerIcon />;
	if (key.includes("linux")) return <LinuxIcon />;
	if (key.includes("c++") || key.includes("cpp")) return <CppIcon />;
	if (key.includes("sql") || key.includes("db") || key.includes("mongo")) return <DatabaseIcon />;
	if (key.includes("git")) return <GitIcon />;
	if (key.includes("esp") || key.includes("hardware") || key.includes("telemetry")) return <HardwareIcon />;
	if (key.includes("lora") || key.includes("wireless") || key.includes("rf")) return <WirelessIcon />;
	if (key.includes("socket")) return <SocketIcon />;
	if (key.includes("cloudflare")) return <CloudflareIcon />;
	if (key.includes("nginx")) return <NginxIcon />;
	if (key.includes("torch") || key.includes("ai") || key.includes("ml")) return <PyTorchIcon />;

	return <GenericCodeIcon />;
}

/* -------------------------------------------------------------------------
   TechBadge with Hover Tooltip Component
------------------------------------------------------------------------- */

export function TechBadge({ name }: { name: string }) {
	return (
		<span aria-label={name} className="tech-badge" role="img" tabIndex={0}>
			{getTechIcon(name)}
			<span className="tech-badge__tooltip" role="tooltip">
				{name}
			</span>
		</span>
	);
}
