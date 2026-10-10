const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
(async () => {
  for (const file of ['p5.merz.js', 'p5.merz.min.js']) {
    let loads = 0, added = 0, hooks;
    const context = {
      URL,
      document: { currentScript: { src: 'https://example.test/library/' + file }, fonts: { add() { added++; } } },
      FontFace: class {
        constructor(name, source) {
          assert.equal(name, 'Archivo Black');
          assert.ok(source.includes('https://example.test/library/assets/fonts/archivo-black/ArchivoBlack-Regular.ttf'));
        }
        async load() { loads++; if (loads === 1) throw new Error('network unavailable'); return this; }
      },
      p5: { registerAddon(addon) { hooks = {}; addon({}, {}, hooks); } }
    };
    vm.runInNewContext(fs.readFileSync(file, 'utf8'), context);
    await assert.rejects(hooks.presetup(), /network unavailable/);
    const first = context.Merz.ready();
    assert.equal(first, context.Merz.ready(), 'share pending font load');
    await first;
    await hooks.presetup();
    assert.equal(loads, 2, 'retry failure; reuse successful load');
    assert.equal(added, 1);
    const detached = {};
    vm.runInNewContext(fs.readFileSync(file, 'utf8'), detached);
    await assert.rejects(detached.Merz.ready(), /fontURL/);
  }
  console.log('Font loading: library-relative URL, shared promise, retry and setup hook passed for source/min.');
})().catch(error => { console.error(error); process.exitCode = 1; });
