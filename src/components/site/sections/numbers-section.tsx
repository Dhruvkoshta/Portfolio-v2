import { useEffect, useState } from "react";
import { sound } from "~/lib/sound";
import { usePresence } from "~/lib/use-presence";
import { getPageStats, type AnalyticsStats } from "~/server/analytics";
import { site } from "~/lib/site";

export function NumbersSection() {
	const [activeTab, setActiveTab] = useState<"stats" | "catch">("stats");
	const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);
	const { count: liveCount } = usePresence();

	useEffect(() => {
		let cancelled = false;
		getPageStats()
			.then((res) => {
				if (!cancelled && res) {
					setAnalytics(res);
				}
			})
			.catch(() => {});
		return () => {
			cancelled = true;
		};
	}, []);

	const handleTabChange = (tab: "stats" | "catch") => {
		sound.playAccordion(true);
		setActiveTab(tab);
	};

	const statsList = [
		{
			value: "1",
			label: "National patent granted for Multi-Hazard Detection & Alert System (No. 202441083752)",
			href: "#featured-projects",
		},
		{
			value: "50+",
			label: "Full-stack web applications deployed for global clients (5★ rated on Fiverr)",
			href: "#experience",
		},
		{
			value: "8.8",
			label: "Cumulative GPA in B.E. Electronics & Communication at BMSCE",
			href: "#education",
		},
		{
			value: "1st",
			label: "Place Winner at AI VERSE 2.0 Hackathon (Team Terminal Titans)",
			href: "#competitions",
		},
		{
			value: "34+",
			label: "Public open-source repositories and Linux system tools on GitHub",
			href: site.socials.github,
		},
		{
			value: "18",
			label: "Artistic vector styles engineered for CartoNoir map generator",
			href: "https://github.com/Dhruvkoshta/CartoNoir",
		},
		{
			value: "118",
			label: "Peak WPM when typing",
			href: "https://monkeytype.com",
			isTyping: true,
		},
		{
			isFlags: true,
			flags: [
				{ code: "🇺🇸", name: "United States" },
				{ code: "🇮🇳", name: "India" },
				{ code: "🇬🇧", name: "United Kingdom" },
				{ code: "🇩🇪", name: "Germany" },
				{ code: "🇸🇬", name: "Singapore" },
				{ code: "🇨🇦", name: "Canada" },
				{ code: "🇦🇺", name: "Australia" },
				{ code: "🇯🇵", name: "Japan" },
			],
			label: "Weekly top portfolio viewers",
			href: site.socials.github,
		},
		{
			value: `${liveCount} live`,
			label: "Live readers currently connected via Cloudflare Durable Objects WebSocket",
			href: "#hero",
			isLive: true,
		},
		{
			value: analytics ? analytics.totalViews.toLocaleString() : "1,420+",
			label: "Anonymous page views recorded via Cloudflare D1 edge analytics",
			href: site.socials.github,
		},
	];

	const countriesCaught = [
		{ flag: "🇮🇳", name: "India", region: "Origin • Bengaluru", caught: true },
		{ flag: "🇺🇸", name: "United States", region: "Cloudflare Global Edge", caught: true },
		{ flag: "🇬🇧", name: "United Kingdom", region: "London Edge", caught: true },
		{ flag: "🇩🇪", name: "Germany", region: "Frankfurt Edge", caught: true },
		{ flag: "🇸🇬", name: "Singapore", region: "APAC Hub", caught: true },
		{ flag: "🇨🇦", name: "Canada", region: "Toronto Edge", caught: true },
		{ flag: "🇯🇵", name: "Japan", region: "Tokyo Edge", caught: true },
		{ flag: "🇦🇺", name: "Australia", region: "Sydney Edge", caught: true },
		{ flag: "🇫🇷", name: "France", region: "Paris Edge", caught: true },
		{ flag: "🇳🇱", name: "Netherlands", region: "Amsterdam Edge", caught: true },
		{ flag: "🇸🇪", name: "Sweden", region: "Stockholm Edge", caught: false },
		{ flag: "🇧🇷", name: "Brazil", region: "São Paulo Edge", caught: false },
	];

	return (
		<div className="numbers-wrapper">
			{/* Top Tab Bar matching reference layout */}
			<div className="numbers-head-controls">
				<div aria-label="By the numbers views" className="ed3__section-tabs" role="tablist">
					<button
						aria-selected={activeTab === "stats"}
						className={`ed3__section-tabs__tab ${
							activeTab === "stats" ? "ed3__section-tabs__tab--active" : ""
						}`}
						onClick={() => handleTabChange("stats")}
						role="tab"
						type="button"
					>
						Stats
					</button>
					<span aria-hidden="true" className="ed3__section-tabs__slash">
						/
					</span>
					<button
						aria-selected={activeTab === "catch"}
						className={`ed3__section-tabs__tab ${
							activeTab === "catch" ? "ed3__section-tabs__tab--active" : ""
						}`}
						onClick={() => handleTabChange("catch")}
						role="tab"
						type="button"
					>
						Catch &apos;em All
					</button>
				</div>
			</div>

			{activeTab === "stats" ? (
				<div className="idx">
					<ul aria-label="By the numbers" className="idx__list idx__list--split">
						{statsList.map((stat, idx) => (
							<li className="idx__row idx__row--stat" key={idx}>
								<div className="idx__grid">
									<span className="idx__details">
										{stat.isFlags ? (
											<span className="idx__marks">
												{stat.flags?.map((f) => (
													<span
														aria-label={f.name}
														className="idx__mark-flag"
														key={f.code}
														role="img"
														tabIndex={0}
													>
														{f.code}
														<span className="flag-tooltip" role="tooltip">
															{f.name}
														</span>
													</span>
												))}
											</span>
										) : (
											<a
												className="idx__title idx__title--link idx__title--tabular"
												href={stat.href}
												{...(stat.href?.startsWith("http")
													? { rel: "noreferrer", target: "_blank" }
													: {})}
											>
												{stat.isLive ? (
													<span aria-hidden="true" className="live-dot" />
												) : null}
												<span className="idx__title-text">{stat.value}</span>
											</a>
										)}
										<span className="idx__sub">
											{stat.label}
											{stat.isTyping ? (
												<span aria-hidden="true" className="idx__caret">
													|
												</span>
											) : null}
										</span>
									</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className="catch-wrapper">
					<div className="catch-header">
						<span className="catch-summary">
							<strong>10 / 240</strong> Countries Collected (4.2% of global edge routes)
						</span>
					</div>
					<div className="catch-grid">
						{countriesCaught.map((country) => (
							<div className="catch-card" key={country.name}>
								<span aria-hidden="true" className="catch-card__flag">
									{country.flag}
								</span>
								<div className="catch-card__info">
									<span className="catch-card__name">{country.name}</span>
									<span className="catch-card__region">{country.region}</span>
								</div>
								<span
									className={`catch-card__status ${
										country.caught ? "catch-card__status--caught" : "catch-card__status--waiting"
									}`}
								>
									{country.caught ? "✓ Caught" : "Waiting"}
								</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
