const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
for (const file of ["p5.merz.js", "p5.merz.min.js"]) {
const context = {};
vm.runInNewContext(fs.readFileSync(file, "utf8"), context);
vm.runInNewContext(
  fs.readFileSync("experiments/merz-parts/alphabet.js", "utf8"),
  context
);
for (const character of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
  for (const size of [40, 100, 170]) {
    for (const weight of [0.3, 0.65, 1]) {
      const original = context.Merz.satz(character, { size, weight });
      const adapted = context.MerzAlphabetStudy.letter(character, { size, weight });
      const { parts: legacyParts, ...whole } = adapted;
      const parts = context.Merz.bauteile(character, { size, weight });
      assert.equal(JSON.stringify(parts), JSON.stringify(legacyParts));
      assert.equal(JSON.stringify(whole), JSON.stringify(original));
      assert.ok(parts.length > 0);
      assert.equal(new Set(Array.from(parts, (part) => part.id)).size, parts.length);
      // Together the named parts cover every source segment exactly once.
      const segments = (paths) =>
        Array.from(paths)
          .flatMap((path) =>
            Array.from(path.points)
              .slice(1)
              .map((point, index) =>
                JSON.stringify([path.points[index], point, path.width])
              )
          )
          .sort();
      assert.deepEqual(
        segments(Array.from(parts).flatMap((part) => Array.from(part.paths))),
        segments(original.paths)
      );
      for (const part of parts) {
        const selected=context.Merz.bauteil(character,part.id,{size,weight});
        assert.equal(JSON.stringify(selected),JSON.stringify(part));
        selected.paths[0].points[0][0]=-999;
        assert.equal(JSON.stringify(context.Merz.bauteil(character,part.id,{size,weight})),JSON.stringify(part));
        assert.ok(part.paths[0].points.every((point) => point.every(Number.isFinite)));
        assert.equal(part.paths[0].width, original.paths[0].width);
      }
      parts[0].paths[0].points[0][0] = -500;
      assert.equal(JSON.stringify(whole), JSON.stringify(original));
      assert.equal(
        JSON.stringify(context.Merz.satz(character, { size, weight })),
        JSON.stringify(original)
      );
    }
  }
}
assert.throws(() => context.Merz.bauteil('R','missing'), /R has these parts: left-stem, bowl, lower-stem/);
assert.throws(() => context.Merz.bauteil('?', 'bowl'), /uppercase letter/);
assert.throws(() => context.Merz.bauteil('R', 'bowl', {size: -1}), /size/);
assert.throws(() => context.MerzAlphabetStudy.letter("?"), /uppercase letter/);
console.log(
  "Named-parts adapter: original geometry, stable roles and detached part edits passed for all 26 uppercase letters."
);

for (const text of [context.Merz.characters, "Room 12!", "A B\nC"]) {
  const options = { size: 70, spacing: 8, proportion: 0.8, leading: 105 };
  assert.equal(
    JSON.stringify(context.MerzAlphabetStudy.geometry(text, options)),
    JSON.stringify(context.Merz.satz(text, options))
  );
}
assert.equal(
  JSON.stringify(context.MerzAlphabetStudy.parts("R", { size: 90 })),
  JSON.stringify(context.MerzAlphabetStudy.letter("R", { size: 90 }).parts)
);
console.log("Candidate geometry/parts contract: complete character set and text metrics preserved.");

for (const invalid of ["?", "r", "AB", "1", "", null, ["A"]]) {
  assert.throws(() => context.Merz.bauteile(invalid), /uppercase letter/);
}
assert.throws(() => context.Merz.bauteile("A", {size: -1}));
assert.throws(() => context.Merz.bauteile("A", {weight: 2}));
console.log(file + ": core parts contract passed.");
}

const source = {}, built = {};
vm.runInNewContext(fs.readFileSync("p5.merz.js", "utf8"), source);
vm.runInNewContext(fs.readFileSync("p5.merz.min.js", "utf8"), built);
for (const character of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
  for (const proportion of [0.55, 1, 1.35]) {
    const options = { size: 120, weight: 0.6, proportion };
    const expected = JSON.stringify(source.Merz.bauteile(character, options));
    assert.equal(JSON.stringify(built.Merz.bauteile(character, options)), expected);
    const edited = source.Merz.bauteile(character, options);
    edited[0].paths[0].points[0][0] = -999;
    assert.equal(JSON.stringify(source.Merz.bauteile(character, options)), expected);
  }
}
console.log("Parts: source/min parity and independent results passed across proportions.");
