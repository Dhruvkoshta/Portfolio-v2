import { createServerFn } from "@tanstack/react-start";
import { sendReceiptEmail } from "~/lib/email";
import { messageInputSchema, type SubmitMessageResult } from "~/lib/messages";

export const submitContactMessage = createServerFn({ method: "POST" })
	.validator((data: unknown) => messageInputSchema.parse(data))
	.handler(async ({ data }): Promise<SubmitMessageResult> => {
		const messageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
		const timestamp = Date.now();

		try {
			let db: D1Database | undefined;
			let resendApiKey: string | undefined;

			try {
				const cloudflare = await import("cloudflare:workers");
				db = cloudflare.env?.DB;
				const envRecord = cloudflare.env as unknown as
					| Record<string, string | undefined>
					| undefined;
				resendApiKey = envRecord?.RESEND_API_KEY;
			} catch {
				// Not in workerd environment (e.g. tests or local mock)
			}

			// Also check process.env fallback if in Node environment
			if (!resendApiKey && typeof process !== "undefined" && process.env?.RESEND_API_KEY) {
				resendApiKey = process.env.RESEND_API_KEY;
			}

			// 1. Dispatch email directly to dhruvkoshta@gmail.com
			const emailResult = await sendReceiptEmail({
				messageId,
				message: data.message,
				replyTo: data.replyTo || "",
				timestamp,
				apiKey: resendApiKey,
			});

			const emailStatus = emailResult.sent
				? "emailed"
				: `email_failed: ${emailResult.reason ? emailResult.reason.slice(0, 100) : "unknown"}`;

			// 2. Persist in D1 database if available
			if (db) {
				await db
					.prepare(
						"INSERT INTO messages (id, created_at, message, reply_to, status) VALUES (?, ?, ?, ?, ?)",
					)
					.bind(
						messageId,
						timestamp,
						data.message,
						data.replyTo || "",
						emailStatus,
					)
					.run();

				return {
					success: true,
					id: messageId,
					fallback: false,
					emailed: emailResult.sent,
					emailReason: emailResult.reason,
				};
			}

			// Fallback if D1 is not bound
			return {
				success: true,
				id: messageId,
				fallback: true,
				emailed: emailResult.sent,
				emailReason: emailResult.reason,
			};
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Failed to save message";
			return {
				success: false,
				error: errorMessage,
				fallback: true,
			};
		}
	});
