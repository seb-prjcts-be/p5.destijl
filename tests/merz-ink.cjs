const assert = require('node:assert/strict');
const { coverage, apply } = require('../experiments/merz-print/ink.js');
for (let y = 0; y < 80; y++) for (let x = 0; x < 80; x++) {
  assert.equal(coverage(x, y, 0, 17), 1);
  const light = coverage(x, y, .25, 17), strong = coverage(x, y, .8, 17);
  assert.ok(strong >= 0 && strong <= light && light <= 1);
  assert.equal(strong, coverage(x, y, .8, 17));
}
assert.notEqual(coverage(51, 39, .6, 17), coverage(51, 39, .6, 18));
assert.throws(() => coverage(0, 0, NaN, 17));
assert.throws(() => coverage(0, 0, .5, 1.2));
const layer = { width: 2, height: 1, pixels: [20, 30, 40, 255, 50, 60, 70, 0], pixelDensity: () => 1, loadPixels() {}, updatePixels() {} };
const before = layer.pixels.slice(); apply(layer, 0, 17); assert.deepEqual(layer.pixels, before);
apply(layer, .6, 17);
assert.deepEqual(layer.pixels.slice(0, 3), before.slice(0, 3));
assert.deepEqual(layer.pixels.slice(4), before.slice(4));
assert.ok(layer.pixels[3] <= before[3]);
console.log('Merz ink: clean identity, deterministic coverage, monotonic strength, alpha-only application passed');
