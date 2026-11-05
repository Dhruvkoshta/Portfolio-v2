import { z } from "zod";

export const messageInputSchema = z.object({
	message: z
		.string()
		.trim()
		.min(2, "Message must be at least 2 characters")
		.max(1000, "Message cannot exceed 1000 characters"),
	replyTo: z
		.string()
		.trim()
		.max(100, "Reply-to cannot exceed 100 characters")
		.optional()
		.default(""),
	turnstileToken: z.string().optional(),
});

export type MessageInput = z.infer<typeof messageInputSchema>;

export interface MessageRecord {
	id: string;
	created_at: number;
	message: string;
	reply_to: string;
	user_agent?: string;
	country?: string;
	ip_hash?: string;
	status: string;
}

export interface SubmitMessageResult {
	success: boolean;
	id?: string;
	error?: string;
	fallback?: boolean;
	emailed?: boolean;
}
