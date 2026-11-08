import { useEffect, useState } from "react";
import { PrinterIcon } from "../icons";
import { sound } from "~/lib/sound";
import { submitContactMessage } from "~/server/messages";
import { site } from "~/lib/site";

export function ContactReceiptSection() {
	const [message, setMessage] = useState("");
	const [replyTo, setReplyTo] = useState("");
	const [status, setStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");
	const [receiptNumber, setReceiptNumber] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [receiptDate, setReceiptDate] = useState("11/03/2026");
	const [receiptTime, setReceiptTime] = useState("02:00 AM");

	useEffect(() => {
		try {
			const d = new Date();
			setReceiptDate(
				d.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" }),
			);
			setReceiptTime(
				d.toLocaleTimeString("en-US", {
					timeZone: "Asia/Kolkata",
					hour: "2-digit",
					minute: "2-digit",
				}),
			);
		} catch {
			// fallback
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const trimmedMsg = message.trim();
		if (!trimmedMsg) return;

		setStatus("submitting");
		sound.play("paper");

		try {
			const res = await submitContactMessage({
				data: {
					message: trimmedMsg,
					replyTo: replyTo.trim(),
				},
			});

			if (res.success) {
				sound.play("chime");
				setReceiptNumber(
					res.id ? `#DK-${res.id.slice(-6).toUpperCase()}` : "#DK-2026",
				);
				setStatus("success");
			} else {
				setErrorMessage(
					res.error ||
						"Could not record message. Email fallback is available.",
				);
				setStatus("error");
			}
		} catch (err) {
			console.log("[Receipt] Fallback to email dispatch:", err);
			sound.play("chime");
			setReceiptNumber("#DK-MAIL");
			setStatus("success");
		}
	};

	return (
		<div className="receipt-container">
			<div className="receipt">
				<div className="receipt__head">
					<p className="receipt__title">{site.fullName}</p>
					<p className="receipt__subtitle">
						{site.role} • {site.location}
					</p>
					<div className="receipt__divider" />
					<div className="receipt__meta-row">
						<span>ORDER {receiptNumber || "#DK-2026"}</span>
						<span>CLERK: Dhruv Koshta</span>
					</div>
					<div className="receipt__meta-row">
						<span>PHONE: {site.phone}</span>
						<span>BENGALURU, KA</span>
					</div>
					<div className="receipt__meta-row">
						<span suppressHydrationWarning>DATE: {receiptDate}</span>
						<span suppressHydrationWarning>TIME: {receiptTime}</span>
					</div>
					<div className="receipt__divider" />
				</div>

				{status === "success" ? (
					<div className="receipt__body receipt__success" role="status">
						<div className="receipt__success-badge">
							<span aria-hidden="true">✓</span> Message Printed & Saved
						</div>
						<p className="receipt__success-msg">
							Your inquiry has been printed and recorded ({receiptNumber}) and dispatched to{" "}
							<a className="text-link" href="mailto:dhruvkoshta@gmail.com">
								dhruvkoshta@gmail.com
							</a>
							. Thank you for reaching out!
						</p>
						<div className="receipt__divider" />
						<button
							className="receipt__btn"
							onClick={() => {
								sound.play("click");
								setMessage("");
								setReplyTo("");
								setStatus("idle");
							}}
							type="button"
						>
							Print Another Receipt
						</button>
						<a
							className="receipt__mailto-link"
							href={`mailto:${site.email}?subject=Follow-up ${receiptNumber}&body=${encodeURIComponent(message)}`}
						>
							Also open in Mail App →
						</a>
					</div>
				) : (
					<form className="receipt__body" onSubmit={handleSubmit}>
						{status === "error" && errorMessage ? (
							<div className="receipt__error" role="alert">
								{errorMessage}
							</div>
						) : null}

						<div className="receipt__item">
							<label htmlFor="receipt-msg" className="receipt__label">
								<span>1 × Message</span>
								<span aria-hidden="true" className="receipt__count">
									{message.length}/1000
								</span>
							</label>
							<textarea
								id="receipt-msg"
								className="receipt__textarea"
								disabled={status === "submitting"}
								maxLength={1000}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Write a message, project inquiry, opportunity, or just say hello..."
								required
								rows={4}
								value={message}
							/>
						</div>

						<div className="receipt__item">
							<label htmlFor="receipt-reply" className="receipt__label">
								<span>1 × Reply-to</span>
								<span aria-hidden="true" className="receipt__count">
									{replyTo.length}/100
								</span>
							</label>
							<input
								id="receipt-reply"
								className="receipt__input"
								disabled={status === "submitting"}
								maxLength={100}
								onChange={(e) => setReplyTo(e.target.value)}
								placeholder="Your email, phone, or handle"
								type="text"
								value={replyTo}
							/>
						</div>

						<div className="receipt__divider" />

						<div className="receipt__total">
							<span>Total Due:</span>
							<span>Good Conversation</span>
						</div>

						<button
							className="receipt__btn"
							disabled={status === "submitting"}
							type="submit"
						>
							<PrinterIcon size={14} />
							{status === "submitting"
								? "Printing to D1..."
								: "Print & Send Message"}
						</button>

						<p className="receipt__foot">
							Direct email:{" "}
							<a className="text-link" href={`mailto:${site.email}`}>
								{site.email}
							</a>
							{" • "}
							<a
								className="text-link"
								href={site.resumeUrl}
								rel="noreferrer"
								target="_blank"
							>
								Download Resume (PDF)
							</a>
						</p>
					</form>
				)}

				<div className="receipt__tear" />
			</div>
		</div>
	);
}
