import { useState } from "react";
import {
	CheckIcon,
	GitHubIcon,
	LinkedInIcon,
	MailIcon,
	XIcon,
} from "./icons";
import { site } from "~/lib/site";

export function SiteFooter() {
	const [copied, setCopied] = useState(false);

	const handleCopyEmail = (e: React.MouseEvent) => {
		e.preventDefault();
		navigator.clipboard.writeText(site.email).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<footer className="ed3-footer" data-section="footer">
			<div className="ed3-footer__inner">
				<div className="ed3-footer__traditional" id="traditional">
					<h2 className="ed3__section-title">
						Or be More Traditional <span className="ed3__section-title__muted">(& Boring)</span>
					</h2>

					<div className="ed3-footer__objectives">
						{/* Recruiters */}
						<div className="ed3-footer__objective">
							<h3 className="ed3-footer__objective-tag">Recruiters</h3>
							<p className="ed3-footer__objective-desc">
								Open to full-stack, distributed systems, and product engineering
								roles, or collaborating with cracked founders.
							</p>
							<div className="ed3-footer__channels">
								<a
									aria-label="Email Dhruv"
									className="ed3-footer__channel"
									href={`mailto:${site.email}`}
									onClick={handleCopyEmail}
									title={copied ? "Email copied!" : "Click to copy email"}
								>
									{copied ? <CheckIcon size={16} /> : <MailIcon size={16} />}
								</a>
								<a
									aria-label="LinkedIn profile"
									className="ed3-footer__channel"
									href={site.socials.linkedin}
									rel="noreferrer"
									target="_blank"
								>
									<LinkedInIcon size={15} />
								</a>
							</div>
						</div>

						{/* Builders */}
						<div className="ed3-footer__objective">
							<h3 className="ed3-footer__objective-tag">Builders</h3>
							<p className="ed3-footer__objective-desc">
								Check out my repositories on GitHub and connect on socials.
								Let&apos;s build and ship something great together!
							</p>
							<div className="ed3-footer__channels">
								<a
									aria-label="GitHub profile"
									className="ed3-footer__channel"
									href={site.socials.github}
									rel="noreferrer"
									target="_blank"
								>
									<GitHubIcon size={15} />
								</a>
								<a
									aria-label="X profile"
									className="ed3-footer__channel"
									href={site.socials.x}
									rel="noreferrer"
									target="_blank"
								>
									<XIcon size={14} />
								</a>
							</div>
						</div>

						{/* Others */}
						<div className="ed3-footer__objective">
							<h3 className="ed3-footer__objective-tag">Others</h3>
							<p className="ed3-footer__objective-desc">
								Curious mind, hardware tinkerer, and tech enthusiast. Always
								happy to chat and exchange ideas!
							</p>
							<div className="ed3-footer__channels">
								<a
									aria-label="Email Dhruv"
									className="ed3-footer__channel"
									href={`mailto:${site.email}`}
								>
									<MailIcon size={16} />
								</a>
								<a
									aria-label="X profile"
									className="ed3-footer__channel"
									href={site.socials.x}
									rel="noreferrer"
									target="_blank"
								>
									<XIcon size={14} />
								</a>
							</div>
						</div>
					</div>
				</div>

				<div className="ed3-footer__bar">
					<p className="ed3-footer__credit">
						{site.name} © Copyright {new Date().getFullYear()} /{" "}
						<a className="text-link" href="#me">
							Back to top
						</a>
					</p>

					<nav aria-label="Footer links" className="ed3-footer__nav">
						<a href={site.socials.github} rel="noreferrer" target="_blank">
							GitHub
						</a>
						<a href={site.socials.linkedin} rel="noreferrer" target="_blank">
							LinkedIn
						</a>
						<a href={site.socials.x} rel="noreferrer" target="_blank">
							X
						</a>
						<a href={site.socials.notes} rel="noreferrer" target="_blank">
							Notes
						</a>
					</nav>
				</div>

				<div className="ed3-footer__signoff">
					<span aria-hidden="true" className="ed3-footer__wordmark">
						Goodbye 👋
					</span>
				</div>
			</div>
		</footer>
	);
}
