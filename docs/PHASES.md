# Phases

Each phase is scoped to fit one agent implementation under 200k tokens. If a phase grows past that, split it before starting. Every phase ends with the quality gate in `docs/QUALITY-GATES.md` and a short report.

## Phase 0 — Foundation

- TanStack Start + Vite + Cloudflare Workers migration.
- Design tokens, Inter font, base grid, announcement bar, appbar, footer.
- Site metadata, route shell, 404.
- Quality-gate scripts and baseline tests.
- No final content or heavy interactions.

## Phase 1 — Shell and hero

- Full-height page frame with hairlines and side rails.
- Sticky pill appbar, mobile menu, socials menu, keyboard shortcuts.
- Hero: dithered portrait, name, animated role line, fact grid.
- Polaroid collage with responsive count and parallax.
- All 16 section shells with compact placeholder states.
- Light theme only.

## Phase 2 — Real content sections

- Content layer and TypeScript types for every section.
- Featured and other projects, skills, education, experience, numbers.
- Ethical hacking, competitions, testimonials, portfolio evolution.
- Spotify facade, misc/orbit, as-a-kid gallery, contact intro.
- Dhruv supplies copy and media during this phase.

## Phase 3 — Interactions, sound, pet, radio

- Magnetic links, hover previews, cursor states, scroll reveals.
- WebAudio sound engine and SFX (Dhruv-supplied or synthesized fallback).
- Settings panel with persisted preferences.
- Pixel pet and radio player UI.
- Command palette and keyboard shortcut map.

## Phase 4 — Receipt contact

- Receipt form, validation, Turnstile, D1 storage.
- Email delivery through Cloudflare Email Service or Resend.
- Receipt download/print view.
- Durable Object rate limiting.

## Phase 5 — Presence and analytics

- Durable Object presence room with live cursors and facepile.
- Analytics Engine page views, referrers, and countries.
- KV-cached aggregate rows.
- Privacy controls and opt-out.

## Phase 6 — AI chat

- "Ask Dhruv" chat drawer with streaming responses.
- Workers AI plus retrieval over the site's own content.
- Rate limits, guardrails, and no message retention.
- Keyboard shortcut and mobile layout.

## Phase 7 — Dark mode and final audit

- Dark theme tokens and toggle.
- Full performance, accessibility, SEO, and security audit.
- Cloudflare cache rules and bindings verified.
- Production deploy to `dhruvkoshta.me`.
