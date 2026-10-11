const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
(async () => {
  for (const file of ['p5.merz.js', 'p5.merz.min.js']) {
    let loads = 0, added = 0, hooks;
    const names = new Set(), sources = new Set(), descriptors = [];
    const context = {
      URL,
      document: { currentScript: { src: 'https://example.test/library/' + file }, fonts: { add() { added++; } } },
      FontFace: class {
        constructor(name, source, options) {
          names.add(name); sources.add(source); descriptors.push(options);
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
    // Seven faces per attempt: six grotesk widths and one antiqua. The failed attempt is retried once.
    assert.equal(loads, 14, 'retry failure; reuse successful load');
    assert.equal(added, 7);
    assert.deepEqual([...names].sort(), ['Merz Antiqua', 'Merz Grotesk 100', 'Merz Grotesk 112', 'Merz Grotesk 125', 'Merz Grotesk 62', 'Merz Grotesk 75', 'Merz Grotesk 87']);
    assert.deepEqual([...sources].sort(), ['url("https://example.test/library/assets/fonts/archivo/Archivo-Variable.ttf")', 'url("https://example.test/library/assets/fonts/bodoni-moda/BodoniModa-Variable.ttf")']);
    assert.ok(descriptors.some(d => d.stretch === '62%' && d.weight === '100 900'));
    assert.ok(descriptors.some(d => d.weight === '400 900' && d.stretch === undefined));
    const detached = {};
    vm.runInNewContext(fs.readFileSync(file, 'utf8'), detached);
    await assert.rejects(detached.Merz.ready(), /fontsURL/);
    const custom = { ...context, document: { fonts: { add() {} } } };
    vm.runInNewContext(fs.readFileSync(file, 'utf8'), custom);
    sources.clear();
    await custom.Merz.ready({ fontsURL: 'https://cdn.test/fonts/' });
    assert.ok([...sources].every(source => source.startsWith('url("https://cdn.test/fonts/')), 'fontsURL names the folder');
  }
  console.log('Font loading: seven faces from two files, library-relative folder, fontsURL, shared promise, retry and setup hook passed for source/min.');
})().catch(error => { console.error(error); process.exitCode = 1; });
