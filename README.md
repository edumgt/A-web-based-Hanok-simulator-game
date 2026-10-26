# Joseon Village Builder

A browser-based isometric studio for composing a Joseon-era Korean village. Place giwa-tile hanok, thatched cottages, taverns, forges, watermills, and magistrate halls on a 16×16 dimetric map, then light the scene for day or night and export a pixel-perfect snapshot.

The in-app interface is in Korean. This document describes the same product in English.

## What it is

The studio is a 2:1 dimetric town builder. Every cell is a 128×128 pixel-art tile drawn with nearest-neighbor scaling, so the art stays crisp at any zoom. Buildings are generated at runtime as isometric hanok — stone foundations (*gidan*), timber columns, *hanji* lattice doors (*changhomun*), curved tile roofs (*giwa*) or straw thatch (*choga*), *jangdokdae* jar platforms, and *ondol* chimneys — and painted over a shared world of roads, waterways, gardens, terrain, coasts, and landmarks.

The world is a 16×16 diamond grid (256 cells). Tiles are depth-sorted with a painter’s algorithm and rendered on a single canvas.

## Features

- **256-tile palette** across buildings, roads and waterways, gardens, terrain, biomes, and landmarks.
- **Procedural Joseon architecture.** Twenty signature buildings are drawn tile-by-tile (cottage, tavern, forge, granary, watermill, rice-cake house, herbal clinic, fortress tower, shrine, Cheomseongdae observatory, carpenter’s yard, market shop, stable, magistrate hall, library, kiln, gatehouse, greenhouse, beacon ferry, and a 99-kan yangban estate). Variants `b21`–`b56` reuse the same hanok grammar in giwa, thatch, *dancheong*, and stone styles, facing southwest or southeast.
- **90° rotation.** Press `R` to cycle 0° / 90° / 180° / 270°. Directional roads and slopes swap to the matching tile; other tiles are mirrored or shaded for a rear view.
- **Living scene.** A four-frame watermill, phased windmills, animated water, chimney and kiln smoke, a volcanic plume, and a circling eagle. Animation runs at about 2.8 frames per second and can be paused.
- **Day and night.** Night multiplies the scene with indigo and adds warm window, lantern, and forge glow.
- **Five village presets**, including a full hanok village, a riverside valley, a market street, a spacious realm, and an empty meadow.
- **Snapshot export.** Saves a 2,176×1,216 PNG of the whole map, with preview, download, and clipboard copy.
- **Desktop and touch.** Drag to paint, scroll to zoom, space or right-drag to pan. On touch, tap to place, drag to pan, and pinch to zoom.

## Quick start

Requires Node.js (or [Bun](https://bun.sh)).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server binds to `0.0.0.0:3000`.

```bash
npm run build   # production bundle in dist/
npm run lint    # TypeScript check (tsc --noEmit)
```

`predev`, `prebuild`, and `prelint` install dependencies automatically if `node_modules` is missing.

## Controls

| Action | How |
| --- | --- |
| Place a tile | Left-click or drag across cells. Tap on touch. |
| Pick up a tile (eyedropper) | `Alt`+click, or right-click without dragging. |
| Rotate the brush 90° | `R`, or the rotate buttons in the header, brush card, and sidebar. |
| Undo | Undo button, or `Ctrl`/`Cmd`+`Z`. Up to 40 steps. |
| Pan | Hold `Space` and drag, middle-click, right-drag, or drag outside the grid. On touch, drag. |
| Zoom | Mouse wheel (0.25×–3×, centered on the cursor), `+` / `−`, or pinch (0.14×–3×). Click the zoom readout to snap to 100%. |
| Recenter | **화면 중앙** (Center view). |
| Day / night | **낮 / 밤** toggle. |
| Pause motion | **애니메이션** toggle. |
| Load a layout | Preset pills in the sidebar. Switching a preset is undoable. |
| Export | **스냅샷 PNG 저장**. Preview, download, or copy the image. `Esc` closes the dialog. |

The brush card shows the Korean name, tile code, category, and a short architectural note for Joseon buildings.

## Village presets

| Preset | Korean label | Intent |
| --- | --- | --- |
| `village` | 조선 한옥마을 | A settled hanok village. This is the default map. |
| `riverside` | 청계천과 한옥계곡 | Houses along a stream and valley. |
| `market` | 종로 저잣거리 | A dense market street. |
| `spacious` | 조선 팔도 삼천리 | A wide, sparsely built realm. |
| `meadow` | 청초한 들판 비우기 | Clears the map to open meadow. |

## Palette

Filter the sidebar tray by category. Counts match the category pills.

| Category | Count | Contents |
| --- | --- | --- |
| All | 256 | Every tile. |
| Buildings | 56 | Joseon houses, workshops, civic halls, and gates. Primary tiles `b01`–`b20` are unique drawings; `b21`–`b56` are oriented hanok variants. |
| Roads & waterways | 36 | Straight roads, corners, T-junctions, bridges, river bends, fords, quays, and plazas. |
| Gardens & ornaments | 12 | Fountains, wells, market stalls, trees, lanterns, statues, carts, and canals. |
| Terrain & hills | 44 | Ramps, stairs, streams, plateaus, forest clearings, and farm plots. |
| Coasts & forests | 58 | Beaches, harbors, desert, ice, wetlands, and sea tiles. |
| Landmarks & animals | 50 | Wildlife, processions, ruins, terraces, and scenic set pieces. |

### Signature buildings

| ID | Name | Notes |
| --- | --- | --- |
| `b01` | Chogajip | Thatched cottage, *ondol* chimney, *jangdokdae*. |
| `b02` | Jumak | Roadside tavern with a *pyeongsang* bench and *cheongsachorong* lanterns. |
| `b03` | Daejanggan | Open forge, anvil, and charcoal hearth. |
| `b04` | Grain granary | Raised timber storehouse with a roof vane. |
| `b05` | Mullebang-atgan | Watermill; the wheel is a four-frame animation. |
| `b06` | Tteokbang | Rice-cake house with steamers and *songpyeon*. |
| `b07` | Hanyakbang | Herbal clinic with medicine drawers and drying herbs. |
| `b08` | Eupseong tower | Granite bastion and banner pavilion. |
| `b09` | Seowon shrine | Giwa hall and miniature *hongsalmun*. |
| `b10` | Cheomseongdae | Bottle-shaped stone observatory. |
| `b11` | Carpenter’s yard | Timber workshop and log stack. |
| `b12` | Sijeon shop | Silk and goods stall on a market street. |
| `b13` | Stable & granary | Ox stall and straw store. |
| `b14` | Gwana dongheon | Magistrate hall with *dancheong* and a ceremonial drum. |
| `b15` | Kyujanggak | Two-story archive pavilion. |
| `b16` | Kiln & brewery | Climbing kiln and porcelain display. |
| `b17` | Fortress gate | Arched gate with a pavilion over the road. |
| `b18` | Royal greenhouse | Oiled-*hanji* glasshouse and terraced flowers. |
| `b19` | Beacon & ferry | Signal brazier and riverside landing. |
| `b20` | Yangban estate | L-shaped *sarangchae* / *anchae*, *daecheong-maru*, pine court. |

## How rendering works

1. `src/joseonHouseTiles.js` draws each hanok on an offscreen 128×128 canvas. The ground diamond is `(64, 64) → (128, 96) → (64, 128) → (0, 96)`. World points project as `isoX = 64 + (x − y)` and `isoY = 96 + (x + y) / 2 − z`.
2. On startup, those data-URLs replace the matching building entries in the embedded tile atlas. The watermill also supplies four animation frames.
3. `src/studioEngine.js` caches every tile, precomputes 90° / 180° / 270° variants, and paints the grid back-to-front. Animated water shares one phase; windmills are offset per cell so they do not spin in lockstep.
4. A ghost of the active brush and a diamond outline follow the cursor. Night lighting is a multiply overlay plus screen-blended window glow, applied after the tiles.

Undo stores full grid copies (capped at 40). There is no server and no saved project file — the map lives in memory until you export a PNG or reload the page.

## Project layout

```
index.html                 App shell, fonts, Korean title
vite.config.ts             Vite + React, port 3000
package.json
tsconfig.json
metadata.json              Studio name and description
src/main.tsx               React entry
src/App.tsx                Studio markup (header, sidebar, canvas, snapshot dialog)
src/studioEngine.js        Camera, input, palette, presets, render loop, export
src/joseonHouseTiles.js    Procedural hanok tile generator
src/styles.css             Studio layout and theme
```

## Stack

- [React 19](https://react.dev/) for the shell
- [Vite 8](https://vite.dev/) for dev and production builds
- TypeScript for the app entry and config (`allowJs` so the studio engine stays plain JavaScript)
- Canvas 2D for all world rendering — no WebGL and no tile image files on disk

Tiles and entity sprites are embedded as data-URLs inside `studioEngine.js`, then overwritten for Joseon buildings at init. That file is large because of the atlas.

## Browser notes

- Use a current Chromium, Firefox, or Safari. Snapshot copy uses the async Clipboard API and falls back to a download link.
- `imageSmoothingEnabled` is off so tiles stay pixelated.
- The layout is usable below 768px wide; the camera fit zoom is tighter on small screens.
