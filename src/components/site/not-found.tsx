import { Link } from "@tanstack/react-router";

export function NotFound() {
	return (
		<div className="page-frame">
			<div className="page-frame__rail page-frame__rail--left" aria-hidden="true" />
			<div className="page-frame__content">
				<section className="not-found">
					<p className="eyebrow">404</p>
					<h1>
						This page went <span className="muted">missing.</span>
					</h1>
					<p className="lede">
						The link is broken, or the page moved. The good stuff is still on the
						home page.
					</p>
					<Link className="button" to="/">
						Back home
					</Link>
				</section>
			</div>
			<div className="page-frame__rail page-frame__rail--right" aria-hidden="true" />
		</div>
	);
}
