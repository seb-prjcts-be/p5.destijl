const assert = require("node:assert/strict");
const { apply } = require("../experiments/merz-surface/edges.js");
const width = 64,
  height = 64;
const clean = new Uint8ClampedArray(width * height * 4);
for (let y = 12; y < 52; y++)
  for (let x = 12; x < 52; x++) {
    const i = 4 * (y * width + x);
    clean.set([185, 45, 38, 255], i);
  }
function render(amount, seed) {
  const layer = {
    width,
    height,
    pixels: clean.slice(),
    pixelDensity: () => 1,
    loadPixels() {},
    updatePixels() {}
  };
  apply(layer, amount, seed);
  return layer.pixels;
}
assert.deepEqual(render(0, 17), clean);
const light = render(0.3, 17),
  strong = render(0.8, 17);
render(0.5, 91);
assert.deepEqual(render(0.8, 17), strong);
assert.notDeepEqual(strong, render(0.8, 18));
let lost = 0,
  added = 0;
for (let y = 0; y < height; y++)
  for (let x = 0; x < width; x++) {
    const i = 4 * (y * width + x),
      original = clean[i + 3];
    assert.ok(Math.abs(strong[i + 3] - original) >= Math.abs(light[i + 3] - original));
    if (original && strong[i + 3] < original) lost++;
    if (!original && strong[i + 3] > 0) added++;
    if (x >= 14 && x < 50 && y >= 14 && y < 50) assert.equal(strong[i + 3], 255);
    if (x < 10 || x > 53 || y < 10 || y > 53) assert.equal(strong[i + 3], 0);
    if (strong[i + 3])
      assert.deepEqual(Array.from(strong.slice(i, i + 3)), [185, 45, 38]);
  }
assert.ok(lost > 0 && added > 0);
assert.throws(() => render(-1, 17), RangeError);
assert.throws(() => render(1.1, 17), RangeError);
assert.throws(() => render(0.3, 1.5), TypeError);
console.log(
  "Ink edges: zero identity, fixed seeded pattern, monotonic strength, unchanged interior, bounded spread and colour preservation passed."
);
