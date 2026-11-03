# Plan 07: By the Numbers Section Redesign (Exact Image Match)

## 1. Overview & Reference Analysis
From the reference image and PDF:
- Section Header: `By the Numbers` with subtitle / pill `Stats w/ AI Count` or live analytics indicators.
- Distinct 2-column or 3-column prominent grid cards showcasing impactful metrics:
  - `12M+` ↗ (Instagram / Social Content views)
  - `3,182` ↗ (Discord / Community members)
  - `3,300+` ↗ (Stack Overflow reputation)
  - `1,782+` ↗ (LeetCode problems solved / algorithmic problems)
  - `1,000+` ↗ (Open-source package weekly downloads)
  - `223` ↗ (Peak WPM typing speed on Monkeytype)
  - Global flags row: `🇺🇸 🇮🇳 🇨🇳 🇹🇼 🇸🇬` Weekly top portfolio viewers
  - Live visitor stats & AI citations.

## 2. Technical Design & Architecture
- **Component**: `src/components/site/sections-content.tsx` (`NumbersSection`)
- **Visual Design**:
  - Huge bold metric headers (`font-size: clamp(28px, 4vw, 42px); font-weight: 700; letter-spacing: -0.03em;`).
  - Small diagonal link arrow `↗` with magnetic hover feedback.
  - Descriptive mono/sans subtitle below the number.
  - Interactive click navigating to verified sources (GitHub, StackOverflow, Monkeytype, LeetCode, etc.).
  - Preserves real-time Cloudflare D1 edge analytics and live Durable Object presence count.

## 3. Implementation Steps
1. Structure statistics data in `src/data/content.ts` with big number values, metric titles, and external URLs.
2. Build responsive grid layout in `NumbersSection` matching the reference screenshot.
3. Add counter roll-up animations / hover lift interactions.
4. Verify accessibility and responsive layout across desktop and mobile.

## 4. Acceptance Criteria
- [ ] Section showcases huge bold numbers with diagonal link indicators.
- [ ] Incorporates top viewer country flags and verified technical metrics.
- [ ] Fully responsive with zero horizontal overflow.
