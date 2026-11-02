import { describe, expect, it } from "vitest";
import { messageInputSchema } from "./messages";

describe("Message Input Schema", () => {
	it("accepts valid message with replyTo", () => {
		const parsed = messageInputSchema.parse({
			message: "Hey Dhruv, loved your cartography project!",
			replyTo: "visitor@example.com",
		});
		expect(parsed.message).toBe("Hey Dhruv, loved your cartography project!");
		expect(parsed.replyTo).toBe("visitor@example.com");
	});

	it("accepts valid message with omitted replyTo", () => {
		const parsed = messageInputSchema.parse({
			message: "Quick question about the patent.",
		});
		expect(parsed.message).toBe("Quick question about the patent.");
		expect(parsed.replyTo).toBe("");
	});

	it("trims leading and trailing whitespace", () => {
		const parsed = messageInputSchema.parse({
			message: "   Hello there!   ",
			replyTo: "  dhruv@example.com  ",
		});
		expect(parsed.message).toBe("Hello there!");
		expect(parsed.replyTo).toBe("dhruv@example.com");
	});

	it("rejects messages shorter than 2 characters", () => {
		expect(() =>
			messageInputSchema.parse({
				message: "a",
			}),
		).toThrow();

		expect(() =>
			messageInputSchema.parse({
				message: "   ",
			}),
		).toThrow();
	});

	it("rejects messages exceeding 1000 characters", () => {
		const longMessage = "a".repeat(1001);
		expect(() =>
			messageInputSchema.parse({
				message: longMessage,
			}),
		).toThrow();
	});

	it("rejects reply-to exceeding 100 characters", () => {
		const longReply = "a".repeat(101);
		expect(() =>
			messageInputSchema.parse({
				message: "Valid message text",
				replyTo: longReply,
			}),
		).toThrow();
	});
});
