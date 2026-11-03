# Plan 03: 3D Parallax Perspective Framer Motion Gallery

## 1. Overview & Reference Analysis
The user requested integrating the provided Framer Motion 3D matrix parallax gallery component:
- 4-column multi-image grid (`UNSPLASH_IMAGES` or customized project frames).
- Scroll-driven spring physics using `useScroll`, `useTransform`, and `useSpring`.
- Expanding banner transition:
  - Width: `90vw -> 100vw`
  - Height: `80vh -> 100vh`
  - Border radius: `48px -> 0px`
- 3D Matrix animations:
  - `rotateY`: `-45deg -> -8deg`
  - `rotateX`: `25deg -> 4deg`
  - `rotateZ`: `15deg -> 2deg`
  - `translateZ`: `-800px -> 0px`
  - `perspective: 1000px`
- Staggered vertical parallax columns (`yCol1`, `yCol2`, `yCol3`, `yCol4`).
- Ambient inset shadows on edges creating a deep atmospheric vignette.

## 2. Technical Design & Architecture
- **Dependency**: Install `framer-motion` (or verify compatibility with React 19 / TanStack Start SSR).
- **Component**: `src/components/site/perspective-gallery.tsx`
- **SSR Handling**:
  - `framer-motion` scroll hooks must run safely on the client side with `useEffect` or lazy hydration to prevent any SSR hydration mismatch.
  - Graceful fallback for `prefers-reduced-motion: reduce`: static layout without aggressive 3D rotations or multi-viewport sticky locks.
- **Section Mount**:
  - Integrate into `src/components/site/hero.tsx` or as the gallery showcase below Hero.
  - Keep project thumbnails and photography crisp and responsive.

## 3. Implementation Steps
1. Install `framer-motion` via `npm install framer-motion`.
2. Author `src/components/site/perspective-gallery.tsx` using the user's provided code structure, adapted for TanStack Start SSR safety.
3. Replace the old polaroid component in `src/components/site/hero.tsx` with `<PerspectiveGallery />`.
4. Style container, columns, cards, and inset vignette shadows.
5. Verify build (`npm run build`), unit tests, and Playwright E2E tests (`TMPDIR=/tmp npm run e2e`).

## 4. Acceptance Criteria
- [ ] 3D perspective tilts smoothly as user scrolls through the gallery track.
- [ ] 4 columns shift with staggered parallax velocities.
- [ ] Expanding banner morphs from rounded inset card to full-width viewport stage.
- [ ] Zero SSR hydration errors or crashes in TanStack Start.
