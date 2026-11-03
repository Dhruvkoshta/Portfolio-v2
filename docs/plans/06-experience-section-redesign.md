# Plan 06: Experience Section Redesign (Exact Image Match)

## 1. Overview & Reference Analysis
Looking at the reference image (`image_dcc91cbc-27b1-4bb4-ac67-1ec7eb18f79a.png`):
- Section Title: `Experience`
- Layout of each row:
  - Left column: Company Name in bold ink (e.g. `Sorce (YC F25)`, `Probe`, `Magi Network`, `Cortex Labs`, `Confesi`, `Fiverr` — or Dhruv's verified companies: `Dell Technologies`, `Multi-Hazard Detection System`, `Freelance Full-Stack`, `CartoNoir`, etc.).
  - Role subtitle in soft muted gray (e.g. `Founding Member of Technical Staff`, `Software Engineer Intern`, `Software Developer & Research Assistant`).
  - Subtle dotted leader line bridging the role and the badge (`. . . . . . . . . . . . . . . . .`).
  - Vivid Red Accent Highlight text / badge:
    - `Recruited + return offer (prev. intern)`
    - `Return offer`
    - `Recruited + return offer as co-founder`
    - `Asked to return`
    - `250k+ lines of code, pre-AI`
  - Right aligned Year / Date range in muted monospace: `2025 — present`, `2025`, `2024`, `2023 — 24`, `2022 — 24`, `2022`.
- Bottom Controls:
  - Button: `Show 5 more earlier roles`
  - Link/Toggle: `Expand all`

## 2. Technical Design & Architecture
- **Component**: `src/components/site/sections-content.tsx` (`ExperienceSection`)
- **Data Model (`src/data/content.ts`)**:
  - Update `experienceItems` with typed fields:
    ```ts
    export type ExperienceItem = {
      id: string;
      company: string;
      role: string;
      badge: string; // Red accent text
      dateRange: string;
      description: string;
      tags: readonly string[];
      link?: string;
      isEarlierRole?: boolean;
    };
    ```
- **CSS Architecture (`src/styles/app.css`)**:
  - Dotted leader using `background-image: radial-gradient(circle, var(--line-strong) 1px, transparent 1px); background-size: 8px 1px; background-repeat: repeat-x;`.
  - Red accent highlight: `color: #ef4444; font-weight: 500; font-size: 13px;` (clean typographical presentation matching image).
  - Expand/collapse accordion animation on row click with detailed project descriptions and tech stack tags.

## 3. Implementation Steps
1. Update `experienceItems` in `src/data/content.ts` with exact badges and structured dates.
2. Refactor `ExperienceSection` in `src/components/site/sections-content.tsx` to match the exact row layout with dotted leader, red accent highlights, and "Show more earlier roles" / "Expand all" controls.
3. Style the grid, hover state, red accent text, and dotted leaders in `src/styles/app.css`.
4. Ensure full keyboard accessibility (`Enter` / `Space` to expand rows).

## 4. Acceptance Criteria
- [ ] Rows exactly replicate the typography, dotted leader, vivid red highlights, and year alignment shown in reference `image.png`.
- [ ] Clickable accordion reveals in-depth descriptions and links.
- [ ] "Show more earlier roles" and "Expand all" work seamlessly.
