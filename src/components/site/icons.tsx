import type { ReactNode, SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
	size?: number | string;
};

function Icon({ children, size = 14, ...props }: IconProps & { children: ReactNode }) {
	return (
		<svg
			aria-hidden="true"
			fill="currentColor"
			height={size}
			viewBox="0 0 24 24"
			width={size}
			{...props}
		>
			{children}
		</svg>
	);
}

export function GitHubIcon(props: IconProps) {
	return (
		<Icon {...props}>
			<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.42.36.79 1.08.79 2.18v3.23c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
		</Icon>
	);
}

export function LinkedInIcon(props: IconProps) {
	return (
		<Icon {...props}>
			<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45Z" />
		</Icon>
	);
}

export function XIcon(props: IconProps) {
	return (
		<Icon {...props}>
			<path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.23l-4.88-6.38L6.5 22H3.38l7.24-8.28L3 2h6.39l4.41 5.83L18.9 2Zm-1.1 18.2h1.72L7.28 3.7H5.43L17.8 20.2Z" />
		</Icon>
	);
}

export function SpotifyIcon(props: IconProps) {
	return (
		<svg
			aria-hidden="true"
			fill="currentColor"
			height={props.size ?? 14}
			viewBox="0 0 24 24"
			width={props.size ?? 14}
			{...props}
		>
			<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
		</svg>
	);
}

function StrokeIcon({
	children,
	size = 14,
	...props
}: IconProps & { children: ReactNode }) {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			height={size}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.75"
			viewBox="0 0 24 24"
			width={size}
			{...props}
		>
			{children}
		</svg>
	);
}

export function ArrowUpRightIcon(props: IconProps) {
	return (
		<StrokeIcon {...props}>
			<path d="M7 17 17 7M7 7h10v10" />
		</StrokeIcon>
	);
}

export function CloseIcon(props: IconProps) {
	return (
		<StrokeIcon {...props}>
			<path d="M18 6 6 18M6 6l12 12" />
		</StrokeIcon>
	);
}

export function MenuIcon(props: IconProps) {
	return (
		<StrokeIcon {...props}>
			<path d="M4 6h16M4 12h16M4 18h16" />
		</StrokeIcon>
	);
}

export function ArrowUpIcon(props: IconProps) {
	return (
		<StrokeIcon {...props}>
			<path d="m5 12 7-7 7 7M12 19V5" />
		</StrokeIcon>
	);
}

export function CommandIcon(props: IconProps) {
	return (
		<StrokeIcon {...props}>
			<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
		</StrokeIcon>
	);
}

export function MailIcon(props: IconProps) {
	return (
		<StrokeIcon {...props}>
			<rect height="16" rx="2" width="20" x="2" y="4" />
			<path d="m22 7-10 6L2 7" />
		</StrokeIcon>
	);
}

export function NotebookPenIcon(props: IconProps) {
	return (
		<StrokeIcon {...props}>
			<path d="M4 4h11l5 5v11H4zM14 4v5h5M8 13h7M8 17h5" />
		</StrokeIcon>
	);
}

export function SparklesIcon(props: IconProps) {
	return (
		<StrokeIcon {...props}>
			<path d="m12 3 1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2ZM5 3v4M3 5h4M19 17v4M17 19h4" />
		</StrokeIcon>
	);
}

export function PrinterIcon(props: IconProps) {
	return (
		<StrokeIcon {...props}>
			<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" />
		</StrokeIcon>
	);
}

export function FlagIndia(props: IconProps) {
	return (
		<svg
			aria-hidden="true"
			height="16"
			viewBox="0 0 24 16"
			width="24"
			{...props}
		>
			<rect fill="#ff9933" height="5.34" width="24" />
			<rect fill="#ffffff" height="5.33" width="24" y="5.34" />
			<rect fill="#138808" height="5.33" width="24" y="10.67" />
			<circle
				cx="12"
				cy="8"
				fill="none"
				r="2.1"
				stroke="#000080"
				strokeWidth="0.65"
			/>
			<path
				d="M12 6.2v3.6M10.2 8h3.6M10.7 6.7l2.6 2.6M13.3 6.7l-2.6 2.6"
				stroke="#000080"
				strokeWidth="0.45"
			/>
		</svg>
	);
}

export function SpeakerIcon(props: IconProps) {
	return (
		<StrokeIcon {...props}>
			<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
			<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
			<path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
		</StrokeIcon>
	);
}

export function SpeakerMuteIcon(props: IconProps) {
	return (
		<StrokeIcon {...props}>
			<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
			<line x1="23" x2="17" y1="9" y2="15" />
			<line x1="17" x2="23" y1="9" y2="15" />
		</StrokeIcon>
	);
}

export function PlayIcon(props: IconProps) {
	return (
		<svg
			aria-hidden="true"
			fill="currentColor"
			height={props.size ?? 14}
			viewBox="0 0 24 24"
			width={props.size ?? 14}
			{...props}
		>
			<polygon points="6 3 20 12 6 21 6 3" />
		</svg>
	);
}

export function PauseIcon(props: IconProps) {
	return (
		<svg
			aria-hidden="true"
			fill="currentColor"
			height={props.size ?? 14}
			viewBox="0 0 24 24"
			width={props.size ?? 14}
			{...props}
		>
			<rect height="16" width="4" x="6" y="4" />
			<rect height="16" width="4" x="14" y="4" />
		</svg>
	);
}

export function RadioIcon(props: IconProps) {
	return (
		<StrokeIcon {...props}>
			<circle cx="12" cy="12" r="2" />
			<path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
		</StrokeIcon>
	);
}

export function HeartIcon(props: IconProps) {
	return (
		<svg
			aria-hidden="true"
			fill="currentColor"
			height={props.size ?? 14}
			viewBox="0 0 24 24"
			width={props.size ?? 14}
			{...props}
		>
			<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
		</svg>
	);
}


export function CheckIcon(props: IconProps) {
	return (
		<StrokeIcon {...props}>
			<path d="M20 6 9 17l-5-5" />
		</StrokeIcon>
	);
}

export function CopyIcon(props: IconProps) {
	return (
		<StrokeIcon {...props}>
			<rect height="13" rx="2" width="13" x="9" y="9" />
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
		</StrokeIcon>
	);
}
