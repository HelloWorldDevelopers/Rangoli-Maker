# Rangoli Maker

One project, two experiences that share a drawing engine and a brand:

- **Rangoli for Kids** (`#kids`): Brush · Pencil · Fill · Stickers · Patterns · Eraser · colour pots · Undo · Clear · Save, plus Surprise and colour-in designs.
- **Rangoli Studio** (`#studio`):
  - Brush engine: brush, pencil, pen (calligraphy), marker, chalk, spray, airbrush, highlighter, custom stamp tip; size, opacity, hardness, spacing, smoothing, pen pressure, round/square tip; built-in and saved presets.
  - Tools: select, brush, eraser, fill (bucket), line, curve, circle, petal, polygon, dot, stamp, pan.
  - Colour: wheel, HEX, RGB, two colours with swap, solid / radial / linear gradient / rainbow / pattern fills, recent and favourite colours, five rangoli palettes.
  - Effects: glow, glitter, drop shadow, metallic, powder texture; blur through hardness.
  - Symmetry: radial (1–36 segments, mirror, rotation), repeat grid, border; motif rings; snapping, rings, kolam dot grid.
  - Editing: select, move, resize, rotate, flip, duplicate, copy/paste, reorder, apply style, delete; layers with lock, hide, opacity, merge down; history list; undo/redo.
  - Text tool (any font loaded on the page, works with symmetry), eyedropper, box (marquee) selection.
  - Reference image for tracing (never exported), layer blend modes and thumbnails, colour harmony, recolour.
  - New-design templates, a "My designs" library with thumbnails (open, rename, duplicate, delete, save a copy).
  - Canvas shapes 1:1 to 2:1 plus Fit (matches the device's screen), pinch-zoom and two-finger pan, full screen, hideable sidebar (edge tab, button or \\).
  - Export: PNG, JPG, WEBP, SVG, PDF, WebM video, project JSON; optional stencil (black outlines on white).

The home page (no hash) introduces both. All three views are available in Marathi, English and Hindi.

## Folder layout

```
rangoli-maker/
  src/
    shared/   core.js (vector model, symmetry renderer, export, generators)
              ui.js (icons, toast, confirm) · brand.css · home.html
    kids/     kids.html · kids.css · kids.js
    studio/   studio.html · studio.css · studio.js
    app.js    router and home page
  build.js    combines src/ into dist/rangoli-maker.html
  tests/      test-dom.js (browser simulation of all three views)
  dist/       rangoli-maker.html (the built page)
```

## Build and test

```
node build.js
node tests/test-dom.js
```

The test uses jsdom from `../khel-shala/node_modules`.
