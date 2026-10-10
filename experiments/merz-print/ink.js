/* Separate study: static ink coverage, independent of p5's random state. */
(function (root) {
  'use strict';
  function hash(x, y, seed) {
    let n = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 1442695041);
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  }
  const ease = t => t * t * (3 - 2 * t);
  function field(x, y, seed) {
    const gx = Math.floor(x / 34), gy = Math.floor(y / 34);
    const u = ease(x / 34 - gx), v = ease(y / 34 - gy);
    const a = hash(gx, gy, seed), b = hash(gx + 1, gy, seed);
    const c = hash(gx, gy + 1, seed), d = hash(gx + 1, gy + 1, seed);
    return (a + (b - a) * u) * (1 - v) + (c + (d - c) * u) * v;
  }
  function coverage(x, y, amount, seed) {
    if (!Number.isFinite(amount) || amount < 0 || amount > 1) throw new RangeError('Ink amount must be 0..1');
    if (!Number.isSafeInteger(seed)) throw new TypeError('Seed must be an integer');
    if (amount === 0) return 1;
    const pressure = field(x, y, seed);
    const grain = hash(x, y, seed + 1);
    // Small uncovered points cluster where coverage is weaker. No displacement.
    if (grain < amount * .005 * (.2 + pressure)) return 0;
    return 1 - amount * (.03 + .22 * pressure + .05 * grain);
  }
  function apply(layer, amount, seed) {
    if (layer.pixelDensity() !== 1) throw new Error('Ink study requires pixelDensity(1)');
    if (amount === 0) return;
    layer.loadPixels();
    for (let y = 0; y < layer.height; y++) for (let x = 0; x < layer.width; x++) {
      const i = 4 * (y * layer.width + x) + 3;
      if (layer.pixels[i]) layer.pixels[i] = Math.round(layer.pixels[i] * coverage(x, y, amount, seed));
    }
    layer.updatePixels();
  }
  const api = { coverage, apply };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.MerzInkStudy = api;
})(globalThis);
