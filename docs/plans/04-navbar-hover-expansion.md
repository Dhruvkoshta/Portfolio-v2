# Plan 04: Navbar Expansion on Hover

## 1. Overview & Reference Analysis
On hover, the navbar capsule expands dynamically:
- In idle state, the navbar maintains a compact, clean profile with icon/short labels.
- When hovering over the navbar or specific navigation items, the capsule expands with fluid spring-like padding/width interpolation, revealing additional context or full labels (e.g. keyboard shortcuts `<kbd>`, descriptive labels, and submenu triggers).
- Transitions are smooth and physics-based (`transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1), padding 0.25s cubic-bezier(0.16, 1, 0.3, 1)`).

## 2. Technical Design & Architecture
- **Component**: `src/components/site/site-header.tsx`
- **State & CSS Architecture**:
  - Add state/class `.appbar--hovered` or pure CSS `:hover` selector on `.appbar` / `.appbar-left`.
  - When hovered:
    - Gap slightly expands from `2px` to `6px`.
    - Inner item padding expands smoothly (`padding: 5px 10px`).
    - The keycap `<kbd>` badges smoothly transition from subtle opacity (`opacity: 0.65`) to full contrast (`opacity: 1`), with subtle border highlighting.
    - Outer pill shadow increases slightly to create a floating physical layer effect (`box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12)`).

## 3. Implementation Steps
1. Update `.appbar` and `.appbar__link` styles in `src/styles/app.css` to add hover expansion transitions.
2. Ensure touch devices ignore hover expansion via `@media (hover: hover) and (pointer: fine)`.
3. Add subtle tactile click and hover sounds (`sound.play("click")` or subtle tick) via `src/lib/sound.ts`.
4. Ensure no horizontal content layout shifts or overflow.

## 4. Acceptance Criteria
- [ ] Hovering over the navbar smoothly expands the capsule without layout jank.
- [ ] Shortcut badges and labels reveal with fluid spring easing.
- [ ] Gracefully disabled on mobile touch devices.
