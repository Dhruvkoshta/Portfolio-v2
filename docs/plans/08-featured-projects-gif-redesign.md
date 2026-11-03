# Plan 08: Featured Projects GIF & Terminal Canvas Redesign (Exact Image Match)

## 1. Overview & Reference Analysis
Looking at `image_2f3cd7b5-ede8-49e7-b354-ea1723e4ae54.png`:
- Left margin header: Year tag `2025` (or project year) anchored beside the project.
- Main project card:
  - Big dark screen/canvas container (chalkboard / terminal aesthetic with 4 corner `+` crosshair marks).
  - Inside the screen: Animated running GIF of the project live demo interface.
  - Project Title: `Kurlox: Novel Decentralized P2P Search Engine in 384D Space` (or Dhruv's projects: `Multi-Hazard IoT Early Alert System`, `ProctoAI`, `CartoNoir`, etc.).
  - Project description: multi-line summary of technical architecture and innovations.
  - Action links row: `Repo ↗  |  Website ↗  |  Teaser Video ↗`.
  - Bottom metadata bar:
    - Left side: Row of colorful tech stack icons / logos (Docker, Rust, Go, Python, React, etc.).
    - Right side: Date span in monospace, e.g. `April '24 — February '25`.

## 2. Technical Design & Architecture
- **Component**: `src/components/site/sections-content.tsx` (`FeaturedProjectsSection`)
- **Animated GIF / Media Assets**:
  - Store animated GIFs / optimized WebM videos in `public/media/projects/` capturing live website gameplay/interaction.
  - Add corner `+` crosshairs in SVG/CSS on the four corners of the media frame.
- **Data Model (`src/data/content.ts`)**:
  - Add fields for tech stack icons, year watermark, date span, and video/GIF media paths.

## 3. Implementation Steps
1. Prepare animated GIF/video assets for Dhruv's featured projects:
   - Multi-Hazard IoT Early Alert System (Patent No. 202441083752)
   - ProctoAI (AI Proctoring & Code Evaluation Engine)
   - CartoNoir (Vector Cartography & Map Generator)
   - VibeLink (Real-time P2P WebRTC Chat)
   - Rayfall (Fast Arcade Canvas Engine)
2. Redesign `FeaturedProjectsSection` with the exact chalkboard/terminal canvas styling, corner `+` markers, and bottom tech icon row.
3. Add keyboard accessible interactive links with hover states.

## 4. Acceptance Criteria
- [ ] Card layout faithfully matches `image.png` with corner crosshairs, big media frame, and date margin.
- [ ] High-frame-rate animated GIF or looping muted video captures the running live project demo.
- [ ] Tech stack icons and date ranges render along the bottom bar.
