# BRKAR asset sources and exports

The shared compass artwork is preserved in `source/compass-mark-original.png` at its original 1254 × 1254 resolution. It is the existing project artwork, not a new logo exploration. Do not crop, redraw or change its colors as part of routine exports.

Production exports in `public/brand/`:

| File | Size | Purpose |
| --- | --- | --- |
| `compass-mark.webp` | 256 × 256, lossless WebP | Shared header and decorative family prompt. Preloaded in the document head. |
| `compass-mark.png` | 256 × 256, optimized PNG | Compatibility for older links to the previous asset path. |
| `favicon.png` | 64 × 64, optimized PNG | Browser tab icon. |

Exports preserve the source canvas, transparency, proportions and clear space. They were resized with Pillow's Lanczos filter. The live wordmark is text in `src/components.tsx`; the Arabic typography uses the self-hosted Noto Kufi Arabic font. There is no new outlined Arabic wordmark in this release.

Earlier vector concepts remain in `archive/brand-mark.svg`, `archive/mark-ink.svg` and `archive/mark-paper.svg`. These are historical concepts and are outside the public Hosting directory. Adventure illustrations live in `public/adventures/`; stateful teaching diagrams remain in the application source. The workshop concept image is in `src/assets/` and used only by the development gallery.

Before replacing the mark, review it at 40 px in the header, 105 px in the family prompt and 16–32 px as a browser icon, on the actual paper background. Use empty alternative text where the image is decorative; the home link supplies the accessible brand name.
