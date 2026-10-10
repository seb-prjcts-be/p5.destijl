const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
let reference;
for (const file of ["p5.merz.js", "p5.merz.min.js"]) {
  const ctx = {};
  vm.runInNewContext(fs.readFileSync(file, "utf8"), ctx);
  const api = ctx.Merz;
  const outline = [
    [0, 0],
    [180, 0],
    [180, 120],
    [0, 120]
  ];
  for (const source of [api.geometry("AB"), api.parts("R"), api.parts("R")[1]]) {
    const piece = api.fragment(source, outline);
    const clean = JSON.stringify(piece.outline());
    const torn = api.tear(piece, { amount: 0.7, seed: 17 });
    assert.equal(JSON.stringify(api.tear(piece, { amount: 0 }).outline()), clean);
    assert.equal(
      JSON.stringify(api.tear(torn, { amount: 0.7, seed: 17 }).outline()),
      JSON.stringify(torn.outline())
    );
    assert.notEqual(
      JSON.stringify(api.tear(piece, { amount: 0.7, seed: 18 }).outline()),
      JSON.stringify(torn.outline())
    );
    assert.equal(torn.width, piece.width);
    assert.equal(torn.height, piece.height);
    for (const [x, y] of torn.outline()) {
      assert.ok(x >= 0 && x <= 180 && y >= 0 && y <= 120);
    }
    const detached = piece.outline();
    detached[0][0] = -999;
    assert.equal(JSON.stringify(piece.outline()), clean);
    assert.throws(() => api.tear(piece, { amount: 2 }));
    assert.throws(() => api.tear(piece, { seed: NaN }));
  }
  assert.throws(() =>
    api.fragment(api.geometry("A"), [
      [0, 0],
      [10, 0],
      [5, 2],
      [10, 10],
      [0, 10]
    ])
  );
  assert.throws(() => api.fragment({}, outline));
  const result = JSON.stringify(
    api
      .tear(api.fragment(api.geometry("A"), outline), { amount: 0.8, seed: 42 })
      .outline()
  );
  if (reference) assert.equal(result, reference);
  reference = result;
}
console.log(
  "Fragments: source/min parity, input validation, fixed bounds, clean identity and seeded repeatability passed."
);
