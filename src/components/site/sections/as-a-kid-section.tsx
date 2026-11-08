import { asAKidStory } from "~/data/content";

export function AsAKidSection() {
	return (
		<div className="as-a-kid-block">
			<p className="hero__intro" style={{ marginTop: 0 }}>
				{asAKidStory}
			</p>
		</div>
	);
}
