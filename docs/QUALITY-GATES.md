# Quality Gates

Run after every phase, before handing back.

| Check | Command / target |
| --- | --- |
| TypeScript | `npm run typecheck` — zero errors |
| Lint | `npm run lint` — zero warnings |
| Unit tests | `npm run test` — all pass |
| Build | `npm run build` |
| Worker dry run | `npx wrangler deploy --dry-run` |
| E2E smoke | `npm run e2e` at 390, 768, 1440 |
| Lighthouse mobile | Performance >= 95, A11y/Best Practices/SEO = 100 |
| Core Web Vitals | LCP <= 1.8s, INP <= 200ms, CLS <= 0.05 |
| Initial JS | <= 120KB gzip on the home page |
| Fonts | One variable font, Latin subset, preloaded, <= 50KB |
| Images | AVIF/WebP, `srcset`, width/height, lazy below the fold |
| Motion | `prefers-reduced-motion` respected |
| Sound | Off by default, user initiated |
| Accessibility | axe clean, keyboard navigable, visible focus |
| Cloudflare | `wrangler types`, bindings resolve, cache headers verified |

## Manual checks

- 390px, 768px, and 1440px screenshots.
- Keyboard-only pass through the appbar, sections, and contact form.
- Reduced-motion pass with animations disabled.
- Sound-off pass with no autoplay.
- Slow 4G Lighthouse pass with cache disabled.
