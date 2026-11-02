# ADR-0001: TanStack Start on Cloudflare Workers

We are rebuilding the portfolio as a server-rendered React application with TanStack Start and Vite, deployed as one Cloudflare Worker. The reference design is server-rendered and the rebuild needs server functions for contact, presence, and AI, so a client-only SPA plus a separate API worker would split routing, data loading, and deployment. TanStack Start is Vite-based, officially supports Workers through `@cloudflare/vite-plugin`, and keeps the frontend in React and TypeScript. Next.js was rejected because it adds a second framework and runtime we do not need.

## Consequences

- The Worker owns SSR, server functions, and API routes; static assets are served by Workers Assets.
- Routing is file-based under `src/routes`, not React Router.
- Deploys use `wrangler deploy`; local development uses the Cloudflare Vite plugin.
- Cloudflare bindings (KV, D1, R2, Durable Objects, Analytics Engine, Queues) are added per phase, not all at once.
