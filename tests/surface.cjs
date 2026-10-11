const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  vm = require("node:vm");
let reference;
for (const file of ["p5.merz.js", "p5.merz.min.js"]) {
  let data, hypotCalls=0;
  const countedMath=Object.create(Math);
  countedMath.hypot=(...args)=>{hypotCalls++;return Math.hypot(...args);};
  const context = {
    Math: countedMath,
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
    Array.from(context.Merz.andruck(source, options, p).pixels);
  const clean = surface({ ink: 0, paper: 0 }),
    light = surface({ ink: 0.12, paper: 0, seed: 17 });
  const computed=hypotCalls;
  assert.deepEqual(surface({ink:.12,paper:0,seed:17}),light);
  assert.equal(hypotCalls,computed,'same mask is reused');
  rgba[0]=12;
  assert.equal(surface({ink:.12,paper:0,seed:17})[0],12,'cache does not hold source pixels');
  rgba[0]=185;
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
  assert.equal(require('node:crypto').createHash('sha256').update(Buffer.from([...light,...strong,...paper])).digest('hex'),'b33b929451b19453db227c3c1dc7c06966073791763fc8e159a1b016e0ba0c5b','original CPU bytes');
  for(let seed=200;seed<206;seed++)surface({ink:.12,paper:0,seed});
  const evicted=hypotCalls;assert.deepEqual(surface({ink:.12,paper:0,seed:17}),light);assert.ok(hypotCalls>evicted,'evicted masks recompute identically');
  if (reference) assert.deepEqual(light, reference);
  reference = light;
}
console.log(
  "Surface: CPU source/min parity, zero identity, deterministic seeds, amount ordering, independent materials and input validation passed."
);
