# Plan 10: Spotify Bookshelf with Sliding Vinyl Record & Custom Playlist

## 1. Overview & Reference Analysis
Looking at `image_dcff9405-e948-443f-99b5-fd4b086964ae.png`:
- Header: `Spotify` with Spotify icon, right controls: `Playlists  /  Control my Music`.
- Graphic: Wooden shelf mounted on wall supports.
- Bookshelf Spine Array:
  - Colorful vertical book spines standing on the shelf:
    - Left book cluster: `matt's coffee shop`, `privilege of pressure`, `demanding excellence`.
    - Right book cluster: `the web`, `playing ping-pong with your boomer`, `v`, `as we fall.`, `university is fun!`, `nebulosity`, `run, boy, run`, `proj. academia`, `expeditionary`, `AGAIN!?`, `slowly.`.
- Centerpiece Album & Vinyl Record:
  - 4-quadrant album cover artwork on the shelf.
  - A realistic black vinyl record sliding / slipping upwards-outwards from behind the album sleeve!
  - Circular vinyl grooves with white center label and circular curved text: `✦ countryish (74 tracks)` (or user's provided Spotify playlist).
- Underneath shelf:
  - Subtle avatar facepile / audio wave dots.
  - Text: `Listened 6 hours ago to [Lightning Speed ↗] by [Timmy McKeever ↗]`.
- User's Target Spotify Playlist:
  - URL: `https://open.spotify.com/playlist/7IbpZshuCcooJoDMvOs9Yp`
  - Integration: clicking the album/vinyl or books launches the user's Spotify playlist, and track listing can be previewed or opened in Spotify.

## 2. Technical Design & Architecture
- **Component**: `src/components/site/sections-content.tsx` (`SpotifySection`)
- **Visual Asset Architecture**:
  - CSS / SVG bookshelf rendering with 3D drop shadow.
  - Spine books with vertical rotated typography (`writing-mode: vertical-rl; transform: rotate(180deg)`), embossed debossing, and distinct palette colors (amber, navy, forest green, crimson, purple, khaki).
  - Vinyl record with spinning animation and interactive hover: when hovering the center sleeve, the vinyl record slides out smoothly (`transform: translateY(-40px) rotate(45deg)`).
  - Link directly to `https://open.spotify.com/playlist/7IbpZshuCcooJoDMvOs9Yp`.

## 3. Implementation Steps
1. Construct the Spotify bookshelf component in `SpotifySection`.
2. Model the colored book spines with vertical typography and click actions.
3. Build the interactive vinyl record sliding animation with realistic grooved SVG.
4. Link metadata to `https://open.spotify.com/playlist/7IbpZshuCcooJoDMvOs9Yp`.

## 4. Acceptance Criteria
- [ ] Visual appearance accurately mirrors reference `image.png` with wooden shelf, book spines, and vinyl record sleeve.
- [ ] Hovering the vinyl causes it to slide out with smooth rotation.
- [ ] Directly connects to `https://open.spotify.com/playlist/7IbpZshuCcooJoDMvOs9Yp`.
