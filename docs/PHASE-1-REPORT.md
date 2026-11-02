# Phase 1 report — shell and hero

Status: complete. Light theme only, as planned.

## Delivered

- Page frame with hairline rails, rail ticks, plus marks, and the 800px editorial column.
- Sticky glass appbar with Home, Projects, Notes, Socials, Misc., and Ask Dhruv.
- Socials panel, Misc. panel, mobile all-sections dialog, and keyboard shortcuts dialog.
- Keyboard shortcuts: `h`, `p`, `s`, `n`, `m`, `g`, `c`, `?`, and `Esc`, paused while typing.
- Hero with dithered portrait, flag byline, animated role glyphs, intro, and six fact links.
- Full-bleed polaroid strip with seven responsive AVIF/WebP images and scroll parallax.
- All 15 below-hero sections, in the target's order, with honest placeholder states.
- Blog, Spotify, and contact callouts wired to their real destinations.
- Footer, 404, skip link, focus management, and reduced-motion handling.

## Gate results

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run lint` | Pass, zero warnings |
| `npm run test` | 6/6 pass |
| `npm run build` | Pass |
| `npm run e2e` | 11/11 pass at 390, 768, and 1440 |
| `npx wrangler types` | Pass |
| `npx wrangler deploy --dry-run` | Pass, no bindings yet |
| Lighthouse mobile | 100 Performance, 100 A11y, 100 Best Practices, 100 SEO |
| Core Web Vitals (lab) | LCP 0.8s, CLS 0, TBT 0ms, INP 88ms at 4x CPU throttle |
| Initial JS | 119.32KB gzip (`index` 116.32KB + route chunk 3.00KB) |
| Font | 48,256-byte Inter Latin variable subset, preloaded |
| Images | AVIF/WebP, `srcset`, intrinsic dimensions, lazy below the fold |
| axe | Clean on home, socials panel, shortcuts dialog, and mobile menu |
| Cache headers | Hashed assets/fonts immutable; media one week with SWR |
| Console | No errors during screenshots or tests |

## Notes and deviations

- The announcement bar uses `--accent-hover` (`#d5010a`) as its background. White on the
  brand red (`#fd010c`) is 4.05:1 and fails WCAG AA for the 13px label. The brighter red
  remains the brand accent everywhere else.
- The hero portrait and polaroid images are stand-ins built from existing project media
  and the legacy caricature. They are not the final personal photos.
- The target's right-hand appbar cluster (presence, weather, avatars) is deferred to
  Phase 5 because it depends on live presence.
- The menu and panel transitions are intentionally restrained; magnetic links, sound,
  radio, pet, and cursor states are Phase 3.
- The favicon is a 32px crop of the existing DHRUV mark; the full mark stays in
  `src/assets/brand/` for the eventual OG image or press kit.

## Inputs needed for Phase 2

- Portrait photo and 8–12 personal life photos with captions.
- Current role, location line, and a one-paragraph intro in Dhruv's voice.
- Experience rows, education, skills, numbers, competitions, and testimonials.
- Spotify playlist URLs, or confirmation that the section stays a facade.
- Confirmation of which projects are featured and which belong in the other-projects index.
