# Plan 12: Printed Receipt Email Dispatch to dhruvkoshta@gmail.com

## 1. Overview & Requirements
The user explicitly requested:
"12. make this Get in Contact via Printed Receipt section work by sending me the mail to dhruvkostha@gmail.com. setup whatever is required"

Currently, when a visitor prints a receipt message in `ContactReceiptSection`, it executes the TanStack Start server function `submitContactMessage` in `src/server/messages.ts`, which inserts the record into Cloudflare D1 database (`portfolio-db` table `messages`).
To make this actively notify Dhruv, we will wire instant email dispatch delivering the submitted receipt message directly to `dhruvkoshta@gmail.com`.

## 2. Technical Design & Architecture
- **Server Function**: `src/server/messages.ts` (`submitContactMessage`)
- **Email Delivery Service**:
  - Cloudflare Workers supports sending emails via:
    1. **Resend API** (or Cloudflare Email Routing / MailChannels API):
       - If `RESEND_API_KEY` is present in worker secrets/env, dispatch an HTTP POST to `https://api.resend.com/emails`.
       - Recipient: `dhruvkoshta@gmail.com`
       - Sender: `Portfolio Receipt <receipt@dhruvkoshta.me>` or `onboarding@resend.dev`
       - Subject: `New Portfolio Message from ${name || "Visitor"}`
       - HTML Body formatted like an authentic thermal receipt:
         ```html
         <div style="font-family: monospace; max-width: 400px; padding: 20px; border: 1px dashed #ccc;">
           <h2>PORTFOLIO RECEIPT #DK-${orderId}</h2>
           <p><strong>From:</strong> ${replyTo || "Anonymous"}</p>
           <p><strong>Date:</strong> ${new Date().toISOString()}</p>
           <hr style="border-top: 1px dashed #ccc;" />
           <p>${message}</p>
         </div>
         ```
    2. **Cloudflare Worker Secrets Binding**:
       - Bind `RESEND_API_KEY` in `wrangler.jsonc` and `worker-configuration.d.ts`.
    3. **Robust Fallback**:
       - If email dispatch API returns an error or is unconfigured, the message is still safely preserved in Cloudflare D1 `messages` table, and a direct `mailto:` link is surfaced so no visitor message is ever dropped.

## 3. Implementation Steps
1. Enhance `src/server/messages.ts` to include the email dispatch payload with thermal receipt styling.
2. Target `dhruvkoshta@gmail.com` as the primary recipient.
3. Add environment secret handling for `RESEND_API_KEY` in `wrangler.jsonc` and `worker-configuration.d.ts`.
4. Test message submission end-to-end with unit test and Playwright E2E.

## 4. Acceptance Criteria
- [ ] Submitting a message triggers email dispatch to `dhruvkoshta@gmail.com`.
- [ ] Email arrives formatted with receipt order number, reply-to address, timestamp, and message body.
- [ ] Database storage in Cloudflare D1 succeeds concurrently.
