import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendReceiptEmail } from "./email";

describe("sendReceiptEmail", () => {
	const originalFetch = globalThis.fetch;

	beforeEach(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	it("returns sent: false when no API key is provided", async () => {
		const res = await sendReceiptEmail({
			messageId: "msg_12345_abc",
			message: "Test inquiry message",
			replyTo: "visitor@example.com",
			timestamp: Date.now(),
			apiKey: undefined,
		});

		expect(res.sent).toBe(false);
		expect(res.reason).toContain("RESEND_API_KEY");
	});

	it("dispatches email to dhruvkoshta@gmail.com with formatted receipt when API key is present", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({ id: "email_res_123" }),
		});
		globalThis.fetch = mockFetch;

		const res = await sendReceiptEmail({
			messageId: "msg_12345_abcdef",
			message: "Excited about your autonomous systems work!",
			replyTo: "director@tech.org",
			timestamp: 1700000000000,
			apiKey: "re_mock_test_key",
		});

		expect(res.sent).toBe(true);
		expect(mockFetch).toHaveBeenCalledTimes(1);

		const [url, options] = mockFetch.mock.calls[0];
		expect(url).toBe("https://api.resend.com/emails");
		expect(options.method).toBe("POST");
		expect(options.headers.Authorization).toBe("Bearer re_mock_test_key");

		const body = JSON.parse(options.body);
		expect(body.to).toContain("dhruvkoshta@gmail.com");
		expect(body.reply_to).toBe("director@tech.org");
		expect(body.subject).toContain("Portfolio Receipt");
		expect(body.html).toContain("PORTFOLIO RECEIPT INQUIRY");
		expect(body.html).toContain("Excited about your autonomous systems work!");
	});

	it("handles API failure gracefully without throwing", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: false,
			status: 401,
			text: async () => "Unauthorized API key",
		});
		globalThis.fetch = mockFetch;

		const res = await sendReceiptEmail({
			messageId: "msg_fail",
			message: "Failure check",
			replyTo: "visitor@example.com",
			timestamp: Date.now(),
			apiKey: "invalid_key",
		});

		expect(res.sent).toBe(false);
		expect(res.reason).toContain("401");
	});
});
