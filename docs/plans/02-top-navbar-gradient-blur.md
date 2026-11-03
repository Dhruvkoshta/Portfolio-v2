# Plan 02: Top Navbar Progressive Gradient Blur (Scrim)

## 1. Overview & Reference Analysis
On `matthewtrent.me`, the top viewport area contains a progressive gradient blur (often referred to as a "scrim" or multi-stop backdrop blur). Rather than a simple hard-edged frosted rectangle, the blur intensity starts maximum at the top edge of the window (`y = 0`) and softly diffuses downwards to `0%` blur at around `80px–100px`. As portfolio content scrolls under the header, it smoothly melts away into the background without harsh clipping lines.

## 2. Technical Design & Architecture
- **Component / Element**: Top scrim element `<div aria-hidden="true" className="top-scrim" />` anchored fixed at `top: 0; left: 0; right: 0; pointer-events: none;`.
- **CSS Progressive Blur Architecture (`src/styles/app.css`)**:
  - Modern progressive blur can be achieved using CSS `mask-image`:
    ```css
    .top-scrim {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 90px;
      z-index: 55;
      pointer-events: none;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0.8) 50%,
        rgba(0, 0, 0, 0) 100%
      );
      -webkit-mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0.8) 50%,
        rgba(0, 0, 0, 0) 100%
      );
    }
    ```
  - Paired with a delicate white/subtle background gradient overlay:
    `background: linear-gradient(to bottom, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100%);`
- **Z-Index Layering**:
  - Content sections: `z-index: 1–10`
  - `.top-scrim`: `z-index: 55` (sits directly below `.appbar-wrap`)
  - `.appbar-wrap`: `z-index: 60` (sits above scrim so buttons & links are interactive)

## 3. Implementation Steps
1. Add `.top-scrim` element in `src/routes/__root.tsx` right above `<SiteHeader />`.
2. Add progressive gradient blur CSS rules in `src/styles/app.css` with webkit fallbacks.
3. Test scroll behavior on Chromium, Safari/WebKit, and Firefox.
4. Verify accessibility and zero interference with click events (`pointer-events: none`).

## 4. Acceptance Criteria
- [ ] Content softly and progressively blurs as it passes underneath the top header area.
- [ ] No harsh border-box edge behind the nav bar.
- [ ] Interactive buttons in the appbar remain completely clickable and accessible.
