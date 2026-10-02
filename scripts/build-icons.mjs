/**
 * Regenerates the NOVAIRE icon set from the master brand mark.
 *
 * Why: the supplied favicon.ico exported the crest inside the full canvas
 * without trimming, so at 16x16 the mark occupied only 8x10 px with hairline
 * strokes — it read as "too small". This script:
 *
 *   1. finds the mark's true alpha bounds (sharp.trim() matches on RGB, not
 *      alpha, so it cannot do this for us);
 *   2. fills the tile with the mark so it scales to the full icon box;
 *   3. dilates strokes on the small sizes so they survive the downscale;
 *   4. emits a consistent favicon.ico + PNG set.
 *
 * Run: node scripts/build-icons.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(root, 'assets', 'logo-master.png');

/** Tight alpha bounds of the mark inside the master image. */
async function alphaBounds(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * c + 3] > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

const markBox = await alphaBounds(source);

/**
 * Render the mark onto a transparent square tile of `size` px.
 *
 * `grow` widens the strokes (px at final resolution) — a legibility
 * transform for the small sizes only. `pad` leaves breathing room so the
 * dilated mark never touches the tile edge.
 */
async function render(size, { grow = 0, pad = 0 } = {}) {
  // Supersample so sub-pixel stroke widths stay fractional and the final
  // downscale antialiases cleanly.
  const ss = 4;
  const avail = Math.max(1, size - pad * 2);
  const scale = (avail * ss) / Math.max(markBox.width, markBox.height);
  const tw = Math.round(markBox.width * scale);
  const th = Math.round(markBox.height * scale);

  const alpha = await sharp(source)
    .extract(markBox)
    .resize(tw, th, { fit: 'fill', kernel: 'lanczos3' })
    .ensureAlpha()
    .extractChannel('alpha')
    .raw()
    .toBuffer();

  let a = alpha;
  if (grow > 0) {
    // Blur + low threshold approximates a morphological dilation: the blur
    // spreads the stroke outward, re-thresholding keeps the edge hard.
    // sharp requires sigma >= 0.3.
    a = await sharp(a, { raw: { width: tw, height: th, channels: 1 } })
      .blur(Math.max(0.3, grow))
      .threshold(40)
      .raw()
      .toBuffer();
  }

  const rw = Math.max(1, Math.round(tw / ss));
  const rh = Math.max(1, Math.round(th / ss));

  // Downsample the supersampled mask to the final resolution. Averaging is
  // what antialiases the dilated hard edge.
  const mask = await sharp(a, { raw: { width: tw, height: th, channels: 1 } })
    .resize(rw, rh, { fit: 'fill', kernel: 'lanczos3' })
    .raw()
    .toBuffer();

  // Sample the master's colour at the final resolution; the mask drives
  // alpha, so the mark stays a flat gold shape with clean edges instead of a
  // mushy resampled gradient.
  const src = await sharp(source)
    .extract(markBox)
    .resize(rw, rh, { fit: 'fill', kernel: 'lanczos3' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Centred, fully transparent tile. Transparent pixels must stay 0,0,0,0 so
  // alpha-based tooling downstream behaves correctly.
  const tile = Buffer.alloc(size * size * 4);
  const ox = Math.round((size - rw) / 2);
  const oy = Math.round((size - rh) / 2);

  for (let y = 0; y < rh; y++) {
    for (let x = 0; x < rw; x++) {
      const v = mask[y * rw + x];
      if (!v) continue;
      const tx = ox + x;
      const ty = oy + y;
      if (tx < 0 || ty < 0 || tx >= size || ty >= size) continue;
      const s = (y * rw + x) * src.info.channels;
      const i = (ty * size + tx) * 4;
      tile[i] = src.data[s];
      tile[i + 1] = src.data[s + 1];
      tile[i + 2] = src.data[s + 2];
      tile[i + 3] = v;
    }
  }

  return sharp(tile, { raw: { width: size, height: size, channels: 4 } })
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();
}

/** Minimal ICO writer using PNG-embedded entries. */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;

  entries.forEach(({ size, data }, i) => {
    const o = i * 16;
    dir[o] = size >= 256 ? 0 : size;
    dir[o + 1] = size >= 256 ? 0 : size;
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt32LE(data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += data.length;
  });

  return Buffer.concat([header, dir, ...entries.map((e) => e.data)]);
}

// size, grow (stroke widening in final px), pad (tile margin in px)
const TARGETS = [
  { size: 16, grow: 1.5, pad: 0 },
  { size: 32, grow: 1.0, pad: 0 },
  { size: 48, grow: 0.7, pad: 0 },
  { size: 64, grow: 0.5, pad: 0 },
  { size: 128, grow: 0.3, pad: 2 },
  { size: 180, grow: 0, pad: 10 },
  { size: 192, grow: 0, pad: 10 },
  { size: 512, grow: 0, pad: 28 },
];

const rendered = new Map();
for (const t of TARGETS) {
  rendered.set(t.size, await render(t.size, t));
}

const bySize = (n) => rendered.get(n);

await mkdir(path.join(root, 'public', 'logo'), { recursive: true });

const loose = [
  ['public/logo/favicon-16x16.png', 16],
  ['public/logo/favicon-32x32.png', 32],
  ['public/logo/favicon-48x48.png', 48],
  ['public/logo/apple-touch-icon.png', 180],
  ['public/logo/android-chrome-192x192.png', 192],
  ['public/logo/android-chrome-512x512.png', 512],
];

for (const [file, size] of loose) {
  const png = bySize(size);
  await writeFile(path.join(root, file), png);
  console.log(`${file.padEnd(38)} ${String(size).padStart(3)}px  ${String(png.length).padStart(5)}b`);
}

// Next.js metadata routes.
await writeFile(path.join(root, 'app', 'apple-icon.png'), bySize(180));
await writeFile(path.join(root, 'app', 'icon.png'), bySize(512));

// Favicon: 16 / 32 / 48.
const ico = buildIco([16, 32, 48].map((size) => ({ size, data: bySize(size) })));
await writeFile(path.join(root, 'app', 'favicon.ico'), ico);
console.log(`${'app/favicon.ico'.padEnd(38)} 16/32/48  ${String(ico.length).padStart(5)}b`);

// Header mark: trimmed, no dilation, generous resolution.
const header = await sharp(source)
  .extract(markBox)
  .resize({ height: 160, fit: 'inside' })
  .png({ compressionLevel: 9, effort: 10 })
  .toFile(path.join(root, 'public', 'logo', 'mark.png'));
console.log(
  `${'public/logo/mark.png'.padEnd(38)} ${header.width}x${header.height}  header mark`
);

// Verify: report ink coverage + bounding box for every size.
console.log('\nverification (ink coverage vs tile):');
for (const [size] of loose.map(([, s]) => [s])) {
  const { data, info } = await sharp(bySize(size)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;
  let ink = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * c + 3] > 8) {
        ink++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  console.log(
    `  ${String(size).padStart(3)}px  box ${String(bw).padStart(3)}x${String(bh).padStart(3)}  ` +
      `fills ${((100 * bw) / size).toFixed(0)}%w x ${((100 * bh) / size).toFixed(0)}%h  ` +
      `ink ${(100 * ink / (w * h)).toFixed(1)}%`
  );
}
