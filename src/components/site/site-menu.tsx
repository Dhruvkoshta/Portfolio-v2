import { useEffect, useRef, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRightIcon, CloseIcon, GitHubIcon, LinkedInIcon, XIcon } from "./icons";
import { sections } from "~/lib/sections";
import { site } from "~/lib/site";

type DialogProps = {
	open: boolean;
	onClose: () => void;
};

function useModal({ open, onClose }: DialogProps) {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = ref.current;
		if (!dialog) return;

		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	}, [open]);

	useEffect(() => {
		const dialog = ref.current;
		if (!dialog) return;

		const handleCancel = (event: Event) => {
			event.preventDefault();
			onClose();
		};
		const handleClose = () => onClose();

		dialog.addEventListener("cancel", handleCancel);
		dialog.addEventListener("close", handleClose);
		return () => {
			dialog.removeEventListener("cancel", handleCancel);
			dialog.removeEventListener("close", handleClose);
		};
	}, [onClose]);

	return ref;
}

function handleBackdropClick(
	event: MouseEvent<HTMLDialogElement>,
	onClose: () => void,
) {
	if (event.target === event.currentTarget) onClose();
}

export function SiteMenuDialog({ open, onClose }: DialogProps) {
	const ref = useModal({ open, onClose });

	return (
		<dialog
			ref={ref}
			aria-labelledby="site-menu-title"
			className="site-dialog site-dialog--menu"
			onClick={(event) => handleBackdropClick(event, onClose)}
		>
			<div className="menu-sheet">
				<div className="menu-sheet__head">
					<div>
						<p className="eyebrow">Index</p>
						<h2 id="site-menu-title">All sections</h2>
					</div>
					<button
						aria-label="Close menu"
						className="icon-button"
						onClick={onClose}
						type="button"
					>
						<CloseIcon aria-hidden="true" size={15} strokeWidth={1.75} />
					</button>
				</div>

				<nav aria-label="All sections" className="menu-sheet__nav">
					<Link className="menu-row" onClick={onClose} to="/">
						<span className="menu-row__index">00</span>
						<span className="menu-row__label">Home</span>
						<span aria-hidden="true" className="menu-row__arrow">
							→
						</span>
					</Link>
					{sections.map((section) => (
						<Link
							className="menu-row"
							hash={section.id}
							key={section.id}
							onClick={onClose}
							to="/"
						>
							<span className="menu-row__index">{section.index}</span>
							<span className="menu-row__label">{section.navLabel}</span>
							<span aria-hidden="true" className="menu-row__arrow">
								→
							</span>
						</Link>
					))}
					<a
						className="menu-row"
						href={site.socials.notes}
						onClick={onClose}
						rel="noreferrer"
						target="_blank"
					>
						<span className="menu-row__index">↗</span>
						<span className="menu-row__label">Notes, off-site</span>
						<ArrowUpRightIcon
							aria-hidden="true"
							className="menu-row__arrow"
							size={12}
							strokeWidth={1.75}
						/>
					</a>
				</nav>

				<div className="menu-sheet__foot">
					<a
						aria-label="GitHub"
						href={site.socials.github}
						rel="noreferrer"
						target="_blank"
					>
						<GitHubIcon />
						<span>GitHub</span>
					</a>
					<a
						aria-label="LinkedIn"
						href={site.socials.linkedin}
						rel="noreferrer"
						target="_blank"
					>
						<LinkedInIcon />
						<span>LinkedIn</span>
					</a>
					<a
						aria-label="X"
						href={site.socials.x}
						rel="noreferrer"
						target="_blank"
					>
						<XIcon />
						<span>X</span>
					</a>
					<a href={`mailto:${site.email}`}>{site.email}</a>
				</div>
			</div>
		</dialog>
	);
}

const shortcuts = [
	{ keys: ["H"], label: "Back to the top" },
	{ keys: ["P"], label: "Featured projects" },
	{ keys: ["S"], label: "Open socials" },
	{ keys: ["N"], label: "Open notes in a new tab" },
	{ keys: ["M"], label: "Open the misc. menu" },
	{ keys: ["G"], label: "Open Ask Dhruv" },
	{ keys: ["C"], label: "Jump to contact" },
	{ keys: ["?"], label: "Show this panel" },
	{ keys: ["Esc"], label: "Close a panel or menu" },
];

export function ShortcutsDialog({ open, onClose }: DialogProps) {
	const ref = useModal({ open, onClose });

	return (
		<dialog
			ref={ref}
			aria-labelledby="shortcuts-title"
			className="site-dialog site-dialog--shortcuts"
			onClick={(event) => handleBackdropClick(event, onClose)}
		>
			<div className="shortcuts">
				<div className="shortcuts__head">
					<div>
						<p className="eyebrow">Keyboard</p>
						<h2 id="shortcuts-title">Shortcuts</h2>
					</div>
					<button
						aria-label="Close shortcuts"
						className="icon-button"
						onClick={onClose}
						type="button"
					>
						<CloseIcon aria-hidden="true" size={15} strokeWidth={1.75} />
					</button>
				</div>
				<dl className="shortcuts__list">
					{shortcuts.map((shortcut) => (
						<div className="shortcut" key={shortcut.label}>
							<dt>{shortcut.label}</dt>
							<dd>
								{shortcut.keys.map((key) => (
									<kbd key={key}>{key}</kbd>
								))}
							</dd>
						</div>
					))}
				</dl>
				<p className="shortcuts__note">
					Shortcuts pause while you are typing in a field.
				</p>
			</div>
		</dialog>
	);
}
