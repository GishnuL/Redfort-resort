/**
 * Responsive image generator (sharp pipeline).
 *
 * Rooms  → src/assets/responsive/<name>-<w>.webp   (Vite-hashed via import.meta.glob)
 * Hero   → public/outlook-<w>.webp                 (stable URL for <link rel=preload>)
 *
 * Never upscales: a width is skipped when it is >= the source width.
 * Run: node scripts/gen-images.mjs
 */
import sharp from 'sharp';
import { mkdirSync, statSync } from 'fs';
import path from 'path';

const QUALITY = 78;
const EFFORT = 6;
const ROOM_WIDTHS = [480, 768, 960, 1280];   // gallery thumbs + lightbox
const HERO_WIDTHS = [480, 768, 960];          // mobile→laptop (source is 985px)

const ASSET_DIR = 'src/assets';
const ROOM_OUT = 'src/assets/responsive';
const PUBLIC_DIR = 'public';

mkdirSync(ROOM_OUT, { recursive: true });

const summary = [];

async function generate(srcFile, baseName, widths, outDir) {
  const meta = await sharp(srcFile).metadata();
  for (const w of widths) {
    if (w >= meta.width) continue; // never upscale
    const outFile = path.join(outDir, `${baseName}-${w}.webp`);
    const info = await sharp(srcFile)
      .resize(w)
      .webp({ quality: QUALITY, effort: EFFORT })
      .toFile(outFile);
    summary.push({
      file: outFile.replace(/\\/g, '/'),
      dims: `${info.width}x${info.height}`,
      KB: +(statSync(outFile).size / 1024).toFixed(1),
    });
  }
  return meta;
}

const rooms = ['room1', 'room2', 'room3', 'room4', 'room5'];
for (const r of rooms) {
  await generate(`${ASSET_DIR}/${r}.webp`, r, ROOM_WIDTHS, ROOM_OUT);
}
await generate(`${PUBLIC_DIR}/outlook.webp`, 'outlook', HERO_WIDTHS, PUBLIC_DIR);

console.table(summary);
const total = summary.reduce((a, s) => a + s.KB, 0);
console.log('Variants generated:', summary.length, '| total added KB:', total.toFixed(1));
