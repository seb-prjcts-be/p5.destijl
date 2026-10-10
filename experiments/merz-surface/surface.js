/* Local study helpers. No new library API. */
(function (root) {
  "use strict";
  function hash(x, y, seed) {
    let n =
      Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 1442695041);
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  }
  function validate(amount, seed) {
    if (!Number.isFinite(amount) || amount < 0 || amount > 1)
      throw new RangeError("Amount must be 0.0.1");
    if (!Number.isSafeInteger(seed)) throw new TypeError("Seed must be an integer");
  }
  function ageCoverage(x, y, amount, seed, width, height) {
    validate(amount, seed);
    if (amount === 0) return 1;
    let region = 0;
    for (let i = 0; i < 5; i++) {
      const cx = hash(i, 1, seed) * width,
        cy = hash(i, 2, seed) * height;
      const radius = (0.12 + 0.13 * hash(i, 3, seed)) * Math.min(width, height);
      const d = Math.hypot(x - cx, y - cy) / radius;
      region = Math.max(region, Math.max(0, 1 - d) ** 2);
    }
    // Loss clusters in broad regions with a fixed fine pattern inside them.
    const grain = hash(x, y, seed + 7);
    return grain < amount * region * 0.18 ? 0 : 1 - amount * region * 0.65;
  }
  function applyAge(layer, amount, seed) {
    validate(amount, seed);
    if (layer.pixelDensity() !== 1) throw new Error("Use pixelDensity(1)");
    if (amount === 0) return;
    layer.loadPixels();
    for (let y = 0; y < layer.height; y++)
      for (let x = 0; x < layer.width; x++) {
        const i = 4 * (y * layer.width + x) + 3;
        if (layer.pixels[i])
          layer.pixels[i] = Math.round(
            layer.pixels[i] * ageCoverage(x, y, amount, seed, layer.width, layer.height)
          );
      }
    layer.updatePixels();
  }
  const api = {
    ageCoverage: ageCoverage,
    applyAge: applyAge
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.MerzSurfaceStudy = api;
})(globalThis);
