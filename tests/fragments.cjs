const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
let reference;
for (const file of ["p5.merz.js", "p5.merz.min.js"]) {
  const ctx = {};
  vm.runInNewContext(fs.readFileSync(file, "utf8"), ctx);
  const api = ctx.Merz;
  const word = api.satz('MERZ', { size: 180 });
  const strips = api.splitter(word, { rows: 3 });
  assert.equal(typeof strips[0].bau, 'function');
  assert.deepEqual(Object.keys(strips[0]).sort(), ['bau', 'height', 'outline', 'width', 'x', 'y']);
  assert.equal(strips.length, 3);
  const letter=api.satz('L',{size:100});
  const bounds=api.splitter(letter)[0];
  assert.deepEqual([bounds.x,bounds.y,bounds.width,bounds.height],[2,2,96,96]);
  for(const char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'){
    const options={rows:2,columns:2};
    assert.equal(JSON.stringify(api.splitter(api.satz(char),options).map(p=>p.outline())),
      JSON.stringify(api.splitter(api.bauteile(char),options).map(p=>p.outline())),'matching bounds for '+char);
  }
  const grid = api.splitter(word, { rows: 2, columns: 3 });
  assert.equal(grid.length,6);
  assert.equal(grid[0].outline()[1][0],grid[1].x);
  assert.equal(grid[0].outline()[2][1],grid[3].y);
  for (const source of [api.bauteile('R'), api.bauteile('R')[1]]) assert.equal(api.splitter(source, { columns: 2 }).length, 2);
  let snapshots = 0;
  api.splitter({ width: 100, height: 80, get() { snapshots++; return {}; } }, { rows: 4, columns: 5 });
  assert.equal(snapshots, 1);
  for (const options of [{ rows: 0 }, { columns: 1.5 }, { rows: 1025 }, { rows: 181 }, { cols: 3 }, null]) {
    assert.throws(() => api.splitter(word, options));
  }
  assert.throws(() => api.splitter(api.satz('')));
  const outline = [
    [0, 0],
    [180, 0],
    [180, 120],
    [0, 120]
  ];
  for (const source of [api.satz("AB"), api.bauteile("R"), api.bauteile("R")[1]]) {
    assert.equal(JSON.stringify(api.ausschnitt(source, 0, 0, 180, 120).outline()), JSON.stringify(outline));
    const oval = api.rundschnitt(source, -12, 8, 80, 40);
    assert.deepEqual([oval.x, oval.y, oval.width, oval.height], [-12, 8, 80, 40]);
    for (const [x, y] of oval.outline()) {
      assert.ok(Math.abs(((x - 28) / 40) ** 2 + ((y - 28) / 20) ** 2 - 1) < 1e-12);
    }
    assert.equal(JSON.stringify(api.rundschnitt(source, 0, 0, 40).outline()), JSON.stringify(api.rundschnitt(source, 0, 0, 40, 40).outline()));
    assert.equal(JSON.stringify(api.riss(oval, { amount: 0 }).outline()), JSON.stringify(oval.outline()));
    for (const method of [api.ausschnitt, api.rundschnitt]) {
      for (const args of [[0,0,0,20], [0,0,20,-1], [NaN,0,20,20], [0,0,Infinity,20], [0,0,5000,5000]]) {
        assert.throws(() => method(source, ...args));
      }
    }
    const piece = api.schnitt(source, outline);
    const clean = JSON.stringify(piece.outline());
    const torn = api.riss(piece, { amount: 0.7, seed: 17 });
    assert.equal(JSON.stringify(api.riss(piece, { amount: 0 }).outline()), clean);
    assert.equal(
      JSON.stringify(api.riss(torn, { amount: 0.7, seed: 17 }).outline()),
      JSON.stringify(torn.outline())
    );
    assert.notEqual(
      JSON.stringify(api.riss(piece, { amount: 0.7, seed: 18 }).outline()),
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
    assert.throws(() => api.riss(piece, { amount: 2 }));
    assert.throws(() => api.riss(piece, { seed: NaN }));
  }
  assert.throws(() =>
    api.schnitt(api.satz("A"), [
      [0, 0],
      [10, 0],
      [5, 2],
      [10, 10],
      [0, 10]
    ])
  );
  assert.throws(() => api.schnitt({}, outline));
  // A fragment can be cut again; the new cut starts from its source material.
  const strip = api.ausschnitt(word, 10, 0, 200, 80);
  assert.equal(JSON.stringify(api.rundschnitt(strip, 10, 0, 200, 80).outline()), JSON.stringify(api.rundschnitt(word, 10, 0, 200, 80).outline()));
  assert.equal(JSON.stringify(api.splitter(strip, { rows: 2 }).map(p => [p.x, p.y, p.width, p.height])), JSON.stringify([[10, 0, 200, 40], [10, 40, 200, 40]]));
  assert.equal(JSON.stringify(api.ausschnitt(api.riss(strip, { amount: 0.5 }), 10, 0, 200, 80).outline()), JSON.stringify(strip.outline()));
  const result = JSON.stringify(
    [api.riss(api.schnitt(api.satz("A"), outline), { amount: 0.8, seed: 42 }).outline(),
     api.riss(api.rundschnitt(api.satz("A"), 0, 0, 180, 120), { amount: 0.8, seed: 42 }).outline(),
     api.splitter(word, { rows: 3, columns: 2 }).map(p => p.outline())]
  );
  if (reference) assert.equal(result, reference);
  reference = result;
}
console.log(
  "Fragments: source/min parity, input validation, fixed bounds, clean identity and seeded repeatability passed."
);
