# Plan 05: Navbar Pop-Up / Jump Micro-Interaction

## 1. Overview & Reference Analysis
The user requested: "There is subtle animation on the navbar, but when we go over there's the animation to pop it up. So they jump kind of."
In Matthew Trent's implementation (`.ed3__appbar-link.magnetic-hover`), hovering individual items triggers a playful tactile "pop" or "jump":
- An instantaneous slight vertical lift (`translateY(-2px)` to `-3px`) combined with a quick micro-scale (`scale(1.04)`).
- When hovered, the item pops up with snappy physics (`cubic-bezier(0.34, 1.56, 0.64, 1)` - slight overshoot bounce).
- On pointer exit, it settles smoothly back to neutral.

## 2. Technical Design & Architecture
- **Component**: `src/components/site/site-header.tsx`
- **CSS Micro-Interaction (`src/styles/app.css`)**:
  ```css
  .appbar__link {
    transition:
      transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
      background-color 0.15s ease,
      box-shadow 0.2s ease,
      color 0.15s ease;
    will-change: transform;
  }

  @media (hover: hover) and (pointer: fine) {
    .appbar__link:hover {
      transform: translateY(-2px) scale(1.04);
      background-color: var(--chrome-hover-plate);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    }
    
    .appbar__link:active {
      transform: translateY(0px) scale(0.97);
    }
  }
  ```
- **Optional Magnetic Assist**:
  - Connect with `useMagnetic` hook (`src/lib/use-magnetic.ts`) to add cursor pull within a small threshold.

## 3. Implementation Steps
1. Add bouncy spring hover micro-interaction to `.appbar__link`, `.appbar__home-mark`, and bottom dock buttons.
2. Ensure `prefers-reduced-motion: reduce` suppresses the bounce (`transform: none !important`).
3. Verify keyboard `:focus-visible` receives appropriate highlight and non-disruptive pop.

## 4. Acceptance Criteria
- [ ] Nav items jump/pop subtly on hover with delightful tactile overshoot.
- [ ] Clicking gives immediate pressed feedback (`scale(0.97)`).
- [ ] Motion is suppressed under reduced motion settings.
