/**
 * Builds public/media/logo-reveal.png from the painting keyframes.
 *
 *   node scripts/build-logo-reveal.cjs [keyframe folder, default media-originals/logo-keyframes]
 *
 * Input: the keyframe screenshots (white strokes on black, same canvas,
 * each one a little further into the stroke), in name order.
 * Output: one opaque PNG the home page reads pixel by pixel. Per pixel:
 *   red         when that pixel gets painted, 0–255 across the animation
 *               (256 steps of about 5 ms: finer than one screen frame)
 *   blue        how much paint is there in the finished logo (the brush texture)
 * It is opaque on purpose: browsers alter the colours of see-through pixels
 * when a page reads them, which would scramble the timing.
 * Also writes public/media/logo-paint.png: the finished logo on its own
 * (white, paint as transparency), cropped identically, shown once the
 * animation ends and whenever it doesn't run.
 *
 * How the timing is worked out: each keyframe is compared with the one before
 * to find the newly painted area. Inside it, every pixel's distance along the
 * paint from where the brush was in the previous frame is measured. Those
 * distances are chained frame after frame, so the brush moves at an even
 * speed through the whole stroke, in the order it was actually painted.
 */
const fs = require("fs");
const path = require("path");
const sharp = require(require.resolve("sharp", { paths: [process.cwd()] }));

const SRC = process.argv[2] || "media-originals/logo-keyframes"; // kept out of the site and git
const OUT = "public/media/logo-reveal.png";
const OUT_STILL = "public/media/logo-paint.png"; // the finished painting, same crop: white with paint as alpha
const PAINTED = 0.25; // coverage above this counts as painted
const VISIBLE = 0.02; // faint edge pixels still get a time, so edges fade in with their stroke
const PAD = 16;
const BRIDGE = 3; // px: thickens paint so dry-brush gaps don't split a stroke into islands
const SEED_RADIUS = 30; // px around the brush tip where each new step starts
const OLD_COST = 2.5; // crossing earlier paint costs more, so the walk follows the new stroke

(async () => {
  const files = fs.readdirSync(SRC).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort();
  if (files.length < 2) throw new Error("Need at least two keyframes in " + SRC);

  // Brightness of every frame (0–255), on the full canvas
  const frames = [];
  let W, H;
  for (const f of files) {
    const { data, info } = await sharp(path.join(SRC, f))
      .flatten({ background: "#000000" })
      .toColourspace("b-w")
      .raw()
      .toBuffer({ resolveWithObject: true });
    W = info.width;
    H = info.height;
    frames.push(data);
  }

  // Crop everything to the finished logo plus a little padding
  const last = frames[frames.length - 1];
  const vis = VISIBLE * 255;
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++)
      if (last[y * W + x] > vis) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
  x0 = Math.max(0, x0 - PAD); y0 = Math.max(0, y0 - PAD);
  x1 = Math.min(W - 1, x1 + PAD); y1 = Math.min(H - 1, y1 + PAD);
  const w = x1 - x0 + 1, h = y1 - y0 + 1, N = w * h;
  const crop = (src) => {
    const out = new Uint8Array(N);
    for (let y = 0; y < h; y++) out.set(src.subarray((y + y0) * W + x0, (y + y0) * W + x0 + w), y * w);
    return out;
  };
  const cov = frames.map(crop);
  const final = cov[cov.length - 1];

  // Thicken a mask by r px (square), to bridge dry-brush gaps
  const dilate = (m, r) => {
    const tmp = new Uint8Array(N), out = new Uint8Array(N);
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        let v = 0;
        for (let d = -r; d <= r && !v; d++) { const xx = x + d; if (xx >= 0 && xx < w && m[y * w + xx]) v = 1; }
        tmp[y * w + x] = v;
      }
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        let v = 0;
        for (let d = -r; d <= r && !v; d++) { const yy = y + d; if (yy >= 0 && yy < h && tmp[yy * w + x]) v = 1; }
        out[y * w + x] = v;
      }
    return out;
  };

  // Painted masks (cumulative: paint never disappears) and their walkable, thickened versions
  const paint = (k) => {
    const m = new Uint8Array(N), t = PAINTED * 255;
    for (let i = 0; i < N; i++) for (let j = 0; j <= k; j++) if (cov[j][i] > t) { m[i] = 1; break; }
    return m;
  };
  const painted = [], walk = [];
  for (let k = 0; k < cov.length; k++) {
    painted.push(paint(k));
    walk.push(dilate(painted[k], BRIDGE));
  }

  // Min-heap of (distance, pixel) in typed arrays
  let hd = new Float64Array(1 << 16), hi = new Int32Array(1 << 16), hn = 0;
  const push = (d, i) => {
    if (hn === hd.length) {
      const nd = new Float64Array(hn * 2); nd.set(hd); hd = nd;
      const ni = new Int32Array(hn * 2); ni.set(hi); hi = ni;
    }
    let k = hn++;
    while (k > 0) {
      const p = (k - 1) >> 1;
      if (hd[p] <= d) break;
      hd[k] = hd[p]; hi[k] = hi[p]; k = p;
    }
    hd[k] = d; hi[k] = i;
  };
  const pop = () => {
    const i = hi[0];
    const d = hd[--hn], j = hi[hn];
    let k = 0;
    for (;;) {
      let c = 2 * k + 1;
      if (c >= hn) break;
      if (c + 1 < hn && hd[c + 1] < hd[c]) c++;
      if (hd[c] >= d) break;
      hd[k] = hd[c]; hi[k] = hi[c]; k = c;
    }
    hd[k] = d; hi[k] = j;
    return i;
  };
  const NB = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, Math.SQRT2], [1, -1, Math.SQRT2], [-1, 1, Math.SQRT2], [-1, -1, Math.SQRT2]];

  // Walk the keyframes, chaining distance along the stroke
  const time = new Float32Array(N).fill(-1);
  const empty = new Uint8Array(N);
  let offset = 0;
  let tip = null; // where the brush was at the end of the previous step: [x, y]
  for (let k = 0; k < walk.length; k++) {
    // The walk travels over thickened paint (isNew/isOld), but only the
    // real newly painted pixels (fresh) get this step's times
    const isOld = k ? walk[k - 1] : empty;
    const isNew = new Uint8Array(N), fresh = new Uint8Array(N);
    let count = 0, cx = 0, cy = 0;
    for (let i = 0; i < N; i++) {
      if (walk[k][i] && !isOld[i]) isNew[i] = 1;
      if (painted[k][i] && !(k && painted[k - 1][i])) { fresh[i] = 1; count++; cx += i % w; cy += (i / w) | 0; }
    }
    if (!count) continue;
    if (!tip) tip = [cx / count, cy / count];

    // Start from every new pixel near the tip (falling back to the nearest one)
    const dist = new Float32Array(N).fill(Infinity);
    hn = 0;
    let nearest = -1, nearestD = Infinity;
    for (let i = 0; i < N; i++) {
      if (!isNew[i] && !fresh[i]) continue;
      const d = Math.hypot((i % w) - tip[0], ((i / w) | 0) - tip[1]);
      if (d < nearestD) { nearestD = d; nearest = i; }
      if (d <= SEED_RADIUS) { dist[i] = d; push(d, i); }
    }
    if (!hn) { dist[nearest] = 0; push(0, nearest); }
    while (hn) {
      const i = pop(), d = dist[i], x = i % w, y = (i / w) | 0;
      for (const [dx, dy, len] of NB) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const j = ny * w + nx;
        if (!isNew[j] && !isOld[j] && !fresh[j]) continue;
        const nd = d + len * (isNew[j] ? 1 : OLD_COST);
        if (nd < dist[j]) { dist[j] = nd; push(nd, j); }
      }
    }

    // Times for this step; the step's length is where 99% of its paint is done
    const ds = [];
    for (let i = 0; i < N; i++) if (fresh[i] && isFinite(dist[i])) ds.push(dist[i]);
    ds.sort((a, b) => a - b);
    const length = ds.length ? ds[Math.floor((ds.length - 1) * 0.99)] : 0;
    let unreached = 0;
    for (let i = 0; i < N; i++) {
      if (!fresh[i]) continue;
      if (isFinite(dist[i])) time[i] = offset + Math.min(dist[i], length);
      else unreached++;
    }

    // New tip: the centre of the furthest few percent of this step's paint
    const cut = ds.length ? ds[Math.floor((ds.length - 1) * 0.97)] : 0;
    let tx = 0, ty = 0, tn = 0;
    for (let i = 0; i < N; i++)
      if (fresh[i] && dist[i] >= cut && isFinite(dist[i])) { tx += i % w; ty += (i / w) | 0; tn++; }
    if (tn) tip = [tx / tn, ty / tn];
    console.log(`${files[k]}: ${count} new px, length ${length.toFixed(0)}${unreached ? `, ${unreached} unreached` : ""}`);
    offset += length;
  }

  // Remaining paint pixels (faint edges, stray specks) take the time of the nearest timed pixel
  const queue = new Int32Array(N);
  let qh = 0, qt = 0;
  for (let i = 0; i < N; i++) if (time[i] >= 0) queue[qt++] = i;
  while (qh < qt) {
    const i = queue[qh++], x = i % w, y = (i / w) | 0;
    for (const [dx, dy] of NB) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const j = ny * w + nx;
      if (time[j] < 0) { time[j] = time[i]; queue[qt++] = j; }
    }
  }

  // Pack: red = time, blue = paint, alpha always full
  const out = Buffer.alloc(N * 4);
  for (let i = 0; i < N; i++) {
    // empty background carries no time, which keeps the file small
    out[i * 4] = final[i] ? Math.round((Math.max(0, time[i]) / offset) * 255) : 0;
    out[i * 4 + 1] = 0;
    out[i * 4 + 2] = final[i];
    out[i * 4 + 3] = 255;
  }
  await sharp(out, { raw: { width: w, height: h, channels: 4 } }).png({ compressionLevel: 9 }).toFile(OUT);
  const still = Buffer.alloc(N * 4, 255);
  for (let i = 0; i < N; i++) still[i * 4 + 3] = final[i];
  await sharp(still, { raw: { width: w, height: h, channels: 4 } }).png({ compressionLevel: 9 }).toFile(OUT_STILL);
  console.log(`wrote ${OUT} and ${OUT_STILL}: ${w}x${h}, total stroke length ${offset.toFixed(0)} px`);
})();
