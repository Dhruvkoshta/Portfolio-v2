import type { ReactNode } from "react";
import type { SectionMeta } from "~/lib/sections";

type SectionShellProps = {
	section: SectionMeta;
	children?: ReactNode;
};

function SectionPlaceholder({ section }: { section: SectionMeta }) {
	return (
		<div className="placeholder" data-status="placeholder">
			<div className="placeholder__row">
				<span aria-hidden="true" className="placeholder__dot" />
				<span className="placeholder__title">Awaiting content</span>
				<span aria-hidden="true" className="placeholder__leader" />
				<span className="placeholder__meta">Phase 2</span>
			</div>
			<p className="placeholder__note">{section.blurb}</p>
		</div>
	);
}

export function SectionShell({ section, children }: SectionShellProps) {
	const titleId = `${section.id}-title`;

	return (
		<section
			aria-labelledby={titleId}
			className="ed-section"
			data-section={section.id}
			id={section.id}
		>
			<div className="ed-section__head">
				<h2 id={titleId}>{section.title}</h2>
			</div>
			<div className="ed-section__body">
				{children ?? <SectionPlaceholder section={section} />}
			</div>
		</section>
	);
}
