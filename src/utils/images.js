/**
 * Responsive image registry.
 *
 * Room variants live in src/assets/responsive/<name>-<w>.webp and are imported
 * (and content-hashed) by Vite via import.meta.glob, so they keep long-term
 * caching. The hero image is served from /public (stable URL) so it can be
 * preloaded — its srcset is built from BASE_URL.
 *
 * Each entry exposes: { src, srcSet, width, height }
 *  - src    : sensible single-URL fallback for non-srcset browsers
 *  - srcSet : "<url> <w>w, ..." ascending
 *  - width/height : intrinsic ratio of the source (for CLS-safe <img>)
 */

// Eager URL imports of every generated room variant (hashed by Vite).
const roomVariants = import.meta.glob('../assets/responsive/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

// Intrinsic source dimensions (for aspect-ratio / width-height attributes).
const ROOM_DIMS = {
  room1: [3817, 2746],
  room2: [3640, 2433],
  room3: [3817, 2862],
  room4: [3817, 2862],
  room5: [3817, 2862],
};

function buildRoom(name) {
  const entries = Object.entries(roomVariants)
    .map(([path, url]) => {
      const m = path.match(new RegExp(`/${name}-(\\d+)\\.webp$`));
      return m ? { w: Number(m[1]), url } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.w - b.w);

  const srcSet = entries.map((e) => `${e.url} ${e.w}w`).join(', ');
  // Prefer the 960w variant as the fallback src; else the largest available.
  const fallback = entries.find((e) => e.w === 960) || entries[entries.length - 1];
  const [width, height] = ROOM_DIMS[name];

  return { src: fallback.url, srcSet, width, height };
}

export const ROOM_IMG = {
  room1: buildRoom('room1'),
  room2: buildRoom('room2'),
  room3: buildRoom('room3'),
  room4: buildRoom('room4'),
  room5: buildRoom('room5'),
};

// Hero image — stable /public URLs (must match the index.html preload exactly).
const BASE = import.meta.env.BASE_URL;
export const OUTLOOK_IMG = {
  src: `${BASE}outlook.webp`,
  srcSet: `${BASE}outlook-480.webp 480w, ${BASE}outlook-768.webp 768w, ${BASE}outlook.webp 985w`,
  width: 985,
  height: 739,
};

// Shared `sizes` presets for the contexts these images render in.
export const SIZES = {
  hero: '100vw',
  galleryTile: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw',
  lightbox: '(min-width: 880px) 880px, 96vw',
  aboutPrimary: '(min-width: 1024px) 45vw, 90vw',
  aboutSecondary: '(min-width: 1024px) 40vw, 90vw',
};
