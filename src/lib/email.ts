function escapeHtml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

export type SendEmailOptions = {
	messageId: string;
	message: string;
	replyTo: string;
	timestamp: number;
	apiKey?: string;
};

export type SendEmailResult = {
	sent: boolean;
	reason?: string;
};

export async function sendReceiptEmail({
	messageId,
	message,
	replyTo,
	timestamp,
	apiKey,
}: SendEmailOptions): Promise<SendEmailResult> {
	const targetEmail = "dhruvkoshta@gmail.com";
	const orderNumber = `DK-${messageId.slice(-6).toUpperCase()}`;
	const dateStr = new Date(timestamp).toUTCString();

	if (!apiKey) {
		console.log(
			`[Email] RESEND_API_KEY not configured. Message ${messageId} stored for ${targetEmail}.`,
		);
		return { sent: false, reason: "RESEND_API_KEY not set" };
	}

	const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: ui-monospace, Menlo, Monaco, "Cascadia Mono", monospace; background-color: #f5f5f5; padding: 20px; color: #18181b; }
    .receipt { max-width: 440px; margin: 0 auto; background: #ffffff; padding: 24px; border: 1px dashed #d4d4d8; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .head { text-align: center; border-bottom: 1px dashed #e4e4e7; padding-bottom: 16px; margin-bottom: 16px; }
    .title { font-size: 16px; font-weight: bold; letter-spacing: 0.05em; margin: 0; }
    .sub { font-size: 12px; color: #71717a; margin-top: 4px; }
    .row { display: flex; justify-content: space-between; font-size: 11px; color: #52525b; margin: 4px 0; }
    .divider { border-top: 1px dashed #e4e4e7; margin: 16px 0; }
    .msg-label { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #71717a; margin-bottom: 6px; }
    .msg-body { font-size: 13px; line-height: 1.5; white-space: pre-wrap; background: #fafafa; padding: 12px; border-radius: 4px; border: 1px solid #f4f4f5; }
    .foot { text-align: center; font-size: 10px; color: #a1a1aa; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="head">
      <div class="title">PORTFOLIO RECEIPT INQUIRY</div>
      <div class="sub">Dhruv Koshta • Systems Engineer</div>
    </div>
    <div class="row"><span>ORDER NO:</span><strong>#${orderNumber}</strong></div>
    <div class="row"><span>DATE:</span><span>${dateStr}</span></div>
    <div class="row"><span>REPLY-TO:</span><strong>${replyTo || "Anonymous Visitor"}</strong></div>
    <div class="divider"></div>
    <div class="msg-label">1 × INCOMING MESSAGE</div>
    <div class="msg-body">${escapeHtml(message)}</div>
    <div class="divider"></div>
    <div class="foot">
      Delivered directly to ${targetEmail} from portfolio receipt printer
    </div>
  </div>
</body>
</html>
`;

	try {
		const res = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
				"User-Agent": "DhruvKoshtaPortfolio/1.0",
			},
			body: JSON.stringify({
				from: "Dhruv Koshta Portfolio <onboarding@resend.dev>",
				to: [targetEmail],
				reply_to: replyTo || undefined,
				subject: `🧾 Portfolio Receipt #${orderNumber} from ${replyTo || "Visitor"}`,
				html,
			}),
		});

		if (!res.ok) {
			const errText = await res.text();
			console.error("[Email] Resend dispatch failed:", res.status, errText);
			return { sent: false, reason: `HTTP ${res.status}: ${errText}` };
		}

		return { sent: true };
	} catch (err) {
		console.error("[Email] Exception sending email:", err);
		return { sent: false, reason: String(err) };
	}
}
