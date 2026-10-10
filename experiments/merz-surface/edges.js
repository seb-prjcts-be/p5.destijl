/* Local raster study: imperfect ink edges, not a library API. */
(function (root) {
  "use strict";
  function hash(x, y, seed) {
    let n =
      Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 1442695041);
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  }
  function field(x, y, seed) {
    const gx = Math.floor(x / 12),
      gy = Math.floor(y / 12);
    const ease = (t) => t * t * (3 - 2 * t);
    const u = ease(x / 12 - gx),
      v = ease(y / 12 - gy);
    const a = hash(gx, gy, seed),
      b = hash(gx + 1, gy, seed);
    const c = hash(gx, gy + 1, seed),
      d = hash(gx + 1, gy + 1, seed);
    return (a + (b - a) * u) * (1 - v) + (c + (d - c) * u) * v;
  }
  function apply(layer, amount, seed) {
    if (!Number.isFinite(amount) || amount < 0 || amount > 1)
      throw new RangeError("Amount must be between 0 and 1");
    if (!Number.isSafeInteger(seed)) throw new TypeError("Seed must be an integer");
    if (layer.pixelDensity() !== 1) throw new Error("Use pixelDensity(1)");
    if (amount === 0) return;
    layer.loadPixels();
    const source = layer.pixels.slice();
    const { width, height } = layer;
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++) {
        const i = 4 * (y * width + x),
          alpha = source[i + 3];
        let low = alpha,
          high = alpha,
          donor = i;
        // A fixed two-pixel neighbourhood: changing strength never moves the pattern.
        for (let dy = -2; dy <= 2; dy++)
          for (let dx = -2; dx <= 2; dx++) {
            if (dx * dx + dy * dy > 4) continue;
            const nx = x + dx,
              ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              low = 0;
              continue;
            }
            const j = 4 * (ny * width + nx),
              a = source[j + 3];
            low = Math.min(low, a);
            if (a > high) {
              high = a;
              donor = j;
            }
          }
        const noise = field(x, y, seed);
        if (alpha > low && noise < 0.4) {
          layer.pixels[i + 3] = Math.round(
            alpha - ((alpha - low) * amount * 0.8 * (0.4 - noise)) / 0.4
          );
        } else if (alpha === 0 && high > 0 && noise > 0.6) {
          layer.pixels[i] = source[donor];
          layer.pixels[i + 1] = source[donor + 1];
          layer.pixels[i + 2] = source[donor + 2];
          layer.pixels[i + 3] = Math.round(
            (high * amount * 0.65 * (noise - 0.6)) / 0.4
          );
        }
      }
    layer.updatePixels();
  }
  const api = { apply };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.MerzEdgeStudy = api;
})(globalThis);
