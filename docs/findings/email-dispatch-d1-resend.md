# Email Dispatch and D1 Findings

## Diagnosis

`submitContactMessage` retrieves `RESEND_API_KEY` from the global
`cloudflare.env` binding and passes it to `sendReceiptEmail`. If the key is
missing, `sendReceiptEmail` returns `sent: false`; the handler then continues
and inserts the message into D1. Therefore, successful D1 storage does not
prove that email delivery succeeded. This behavior is implemented in
[`src/lib/email.ts`](../../src/lib/email.ts) and
[`src/server/messages.ts`](../../src/server/messages.ts).

Cloudflare documents importing `env` from `cloudflare:workers` to access
secrets outside a request handler, and documents `wrangler secret put` for
deploying encrypted Worker secrets:

- https://developers.cloudflare.com/workers/configuration/secrets/

This Worker configuration currently declares the `DB` D1 binding but no
`RESEND_API_KEY` binding or secret declaration in `wrangler.jsonc`. Configure
the deployed Worker with:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler deploy
```

For local development, use an untracked `.dev.vars` file:

```env
RESEND_API_KEY=re_...
```

## Resend requirements

The request shape used by the application (`from`, `to`, `subject`, and
`html`) is supported by Resend's Send Email API:

- https://resend.com/docs/api-reference/emails/send-email

Resend requires a verified sending domain for production sending. The current
`onboarding@resend.dev` sender is intended for testing and is restricted to
the account owner; sending to the portfolio owner's Gmail address should use a
sender on a verified domain, such as
`receipt@dhruvkoshta.me`, after DNS verification:

- https://resend.com/docs/dashboard/domains/introduction/
- https://resend.com/docs/api-reference/errors

The direct HTTP request should also include a `User-Agent`; Resend's API
introduction documents that requests without one can receive HTTP 403:

- https://resend.com/docs/api-reference/introduction

## Recommended production checklist

1. Create a Resend API key with email-send permission.
2. Add `dhruvkoshta.me` (or a sending subdomain) in Resend and publish the
   DNS records Resend provides.
3. Store the key with `npx wrangler secret put RESEND_API_KEY`.
4. Change the `from` address in `src/lib/email.ts` to the verified domain.
5. Add a `User-Agent` header to the Resend request.
6. Deploy and submit a test message; confirm `emailed: true` and inspect
   Worker/Resend logs for any HTTP error.
