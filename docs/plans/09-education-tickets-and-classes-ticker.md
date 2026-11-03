# Plan 09: Education Tickets (Boarding Passes) & Favorite Classes Ticker

## 1. Overview & Reference Analysis
Looking at `image_e9fa9bcc-9d9f-4f20-aef5-70a8a00e7f18.png`:
- Section Title: `Education & Favorite Classes`
- Top Row: Boarding Pass / Ticket Cards
  - Perforated paper card design with circular notch cutouts on the side borders.
  - Institution with national flag emoji (e.g. `Columbia University 🇺🇸`, `University of Victoria 🇨🇦`, `Thompson Rivers University 🇨🇦` / Dhruv's `B.M.S. College of Engineering 🇮🇳`).
  - Degree and timeline: `B.E. in Electronics & Communication Engineering`, `Sep '21 — Jun '25`.
  - Prominent vivid red GPA text: `8.8 / 10 CGPA` (or `4.0 / 4.0 GPA`, `~4.12 GPA`).
  - Bulleted honors: `● Honors & Distinction`, `● Patent Granted`, `● Merit Scholarship`, etc.
  - Scannable vertical Barcode graphic printed at the bottom of each ticket!
- Bottom Row: Moving / Floating Favorite Classes Ticker
  - Continuous animated horizontal ticker tape:
    `Quantum Software Engineering A+  •  Calculus III & IV A+  •  Machine Learning A  •  Honors Seminar A+  •  Software Development A+  •  Web Development A+  •  Computer Graphics A+`
  - Subtle pause on hover.

## 2. Technical Design & Architecture
- **Component**: `src/components/site/sections-content.tsx` (`EducationSection`)
- **Card Styling (`src/styles/app.css`)**:
  - Notch cutouts generated using CSS radial-gradient masks or absolute notch circles (`.ticket__notch--left`, `.ticket__notch--right`).
  - Perforated dashed divider line (`border-bottom: 2px dashed var(--line)`).
  - SVG generated barcode at the base of each ticket.
- **Classes Ticker**:
  - Infinitely scrolling CSS keyframe animation (`@keyframes tickerTape`) with duplicated items for seamless looping.
  - Hover halts animation smoothly (`animation-play-state: paused`).

## 3. Implementation Steps
1. Create ticket card component with notch cutouts, bold red GPA highlights, and barcode SVG.
2. Build infinite CSS classes ticker with course codes and grades (`A+`, `A`).
3. Wire with Dhruv's verified academic records (B.M.S. College of Engineering, ECE, 8.8 CGPA, university distinctions).
4. Verify accessibility and responsive layout.

## 4. Acceptance Criteria
- [ ] Education cards look like genuine boarding pass tickets with cutouts and barcodes.
- [ ] Favorite classes continuously scroll in a smooth infinite horizontal marquee ticker.
- [ ] Motion is paused under `prefers-reduced-motion: reduce`.
