const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  vm = require("node:vm");
let reference;
for (const file of ["p5.merz.js", "p5.merz.min.js"]) {
  let data;
  const context = {
    document: {
      createElement() {
        return {
          getContext() {
            return {
              drawImage(source) {
                data = source.data.slice();
              },
              getImageData() {
                return { data };
              }
            };
          }
        };
      }
    }
  };
  vm.runInNewContext(fs.readFileSync(file, "utf8"), context);
  const p = {
    createImage(width, height) {
      return {
        width,
        height,
        pixels: new Uint8ClampedArray(width * height * 4),
        loadPixels() {},
        updatePixels() {}
      };
    }
  };
  const rgba = new Uint8ClampedArray(80 * 60 * 4);
  for (let i = 0; i < rgba.length; i += 4) rgba.set([185, 45, 38, 255], i);
  const source = { width: 80, height: 60, canvas: { data: rgba }, get() {} };
  const surface = (options) =>
    Array.from(context.Merz.surface(source, options, p).pixels);
  const clean = surface({ ink: 0, paper: 0 }),
    light = surface({ ink: 0.12, paper: 0, seed: 17 });
  assert.deepEqual(clean, Array.from(rgba));
  assert.ok(light.some((v, i) => i % 4 === 3 && v < clean[i]));
  surface({ ink: 1, paper: 1, seed: 100 });
  assert.deepEqual(surface({ ink: 0.12, paper: 0, seed: 17 }), light);
  assert.notDeepEqual(surface({ ink: 0.12, paper: 0, seed: 18 }), light);
  const strong = surface({ ink: 1, paper: 0, seed: 17 });
  assert.ok(strong.every((v, i) => i % 4 !== 3 || v <= light[i]));
  const paper = surface({ ink: 0, paper: 0.18 });
  assert.ok(paper.every((v, i) => i % 4 !== 3 || v === 255));
  assert.deepEqual(Array.from(rgba), clean);
  for (const options of [{ ink: -1 }, { ink: 2 }, { paper: 2 }, { seed: NaN }])
    assert.throws(() => surface(options));
  if (reference) assert.deepEqual(light, reference);
  reference = light;
}
console.log(
  "Surface: CPU source/min parity, zero identity, deterministic seeds, amount ordering, independent materials and input validation passed."
);
