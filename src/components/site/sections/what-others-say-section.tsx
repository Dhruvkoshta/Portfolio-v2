import { testimonial } from "~/data/content";

export function WhatOthersSaySection() {
	return (
		<div className="testimonials">
			<blockquote className="quote-card">
				<p className="quote-card__text">{testimonial.quote}</p>
				<footer className="quote-card__author">{testimonial.author}</footer>
			</blockquote>
		</div>
	);
}
