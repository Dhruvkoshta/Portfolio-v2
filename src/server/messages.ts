import { createServerFn } from "@tanstack/react-start";
import { messageInputSchema, type SubmitMessageResult } from "~/lib/messages";

export const submitContactMessage = createServerFn({ method: "POST" })
	.validator((data: unknown) => messageInputSchema.parse(data))
	.handler(async ({ data }): Promise<SubmitMessageResult> => {
		const messageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
		const timestamp = Date.now();

		try {
			let db: D1Database | undefined;
			try {
				const cloudflare = await import("cloudflare:workers");
				db = cloudflare.env?.DB;
			} catch {
				// Not in workerd environment (e.g. tests or local mock)
			}

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
						"unread",
					)
					.run();

				return {
					success: true,
					id: messageId,
					fallback: false,
				};
			}

			// Fallback if D1 is not bound
			return {
				success: true,
				id: messageId,
				fallback: true,
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
