# Plan 01: Segmented Scroll Tracker / Scroll Progress Indicator

## 1. Overview & Reference Analysis
From the reference full-page layout (PDF Page 1, left margin), there is a persistent, segmented vertical rail indicator running down the left boundary of the viewport.
As the user scrolls through the portfolio, the vertical rail highlights each discrete section (Hero, Experience, Numbers, Blog, Featured Projects, Other Projects, Education, Competitions, Testimonials, Spotify, Contact) using segmented indicator ticks or active fill lines that correspond to the active section.

## 2. Technical Design & Architecture
- **Component**: `src/components/site/scroll-tracker.tsx`
- **Hook / State**:
  - Track active section using an `IntersectionObserver` across all section IDs registered in `src/lib/sections.ts`.
  - Measure overall page scroll percentage (`window.scrollY / (scrollHeight - clientHeight)`).
  - Smoothly interpolate the progress indicator position using CSS custom properties (`--scroll-progress`, `--active-segment-index`).
- **Styling (`src/styles/app.css`)**:
  - Fixed positioning: `position: fixed; left: 16px; top: 50%; transform: translateY(-50%); z-index: 50;`
  - Subtle hairline rail with tick marks corresponding to each section.
  - Active pip/pill that slides between segments with spring easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - Hover tooltip on each segment showing the section title with click-to-scroll functionality.
  - Mobile responsive: hidden on viewports `< 1024px` to keep mobile screens clean.

## 3. Implementation Steps
1. Create `src/components/site/scroll-tracker.tsx` mapping over active sections with `IntersectionObserver`.
2. Support smooth scroll on click with accessibility keyboard navigation (`role="navigation"`, `aria-label="Page section progress"`).
3. Mount `<ScrollTracker />` inside `src/routes/__root.tsx`.
4. Style the rail, segment nodes, active indicator line, and hover labels in `src/styles/app.css`.
5. Unit test in Vitest and verify Playwright E2E coverage.

## 4. Verification Seams & Acceptance Criteria
- [ ] Left-side vertical rail stays fixed and aligned.
- [ ] Active segment updates in real-time as sections scroll into view.
- [ ] Clicking any segment smoothly scrolls to that section.
- [ ] Accessible `aria-valuenow` / `aria-current="step"` semantics.
