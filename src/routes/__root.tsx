/// <reference types="vite/client" />
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { NotFound } from "~/components/site/not-found";
import { SiteFooter } from "~/components/site/site-footer";
import { SiteHeader } from "~/components/site/site-header";
import { site } from "~/lib/site";
import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover",
			},
			{ name: "theme-color", content: "#ffffff" },
			{ title: `${site.name} — ${site.role}` },
			{ name: "description", content: site.description },
			{ property: "og:title", content: `${site.name} — ${site.role}` },
			{ property: "og:description", content: site.description },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: site.url },
			{ property: "og:site_name", content: site.name },
			{ property: "og:image", content: `${site.url}/og/home.jpg` },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{
				property: "og:image:alt",
				content: "Dhruv Koshta's portfolio, with a dithered portrait and project polaroids.",
			},
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: `${site.name} — ${site.role}` },
			{ name: "twitter:description", content: site.description },
			{ name: "twitter:image", content: `${site.url}/og/home.jpg` },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "canonical", href: site.url },
			{
				rel: "preload",
				href: "/fonts/inter-latin-wght-normal.woff2",
				as: "font",
				type: "font/woff2",
				crossOrigin: "anonymous",
			},
			{ rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
			{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
		],
	}),
	shellComponent: RootDocument,
	component: RootLayout,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en" data-theme="light">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}

function RootLayout() {
	useEffect(() => {
		document.documentElement.dataset.hydrated = "true";
	}, []);

	return (
		<>
			<SiteHeader />
			<main id="main-content">
				<Outlet />
			</main>
			<SiteFooter />
		</>
	);
}
