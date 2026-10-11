const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
for (const file of ['p5.merz.js', 'p5.merz.min.js']) {
  const ctx = {}; vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx);
  const m = ctx.Merz;
  assert.equal(m.bogen, undefined);
  const calls = [];
  const p = { width: 120, height: 100, push() {}, applyMatrix() {}, image() {}, createGraphics() { calls.push('createGraphics'); throw new Error('stop'); } };
  // Sheet options are validated before any graphics exist.
  for (const options of [[], { colour: '#ffffff' }, { paper: 2 }, { ink: -1 }, { seed: 1.5 }, { width: 0 }, { height: 12.5 }, { color: 'red' }]) {
    assert.throws(() => m.andruck(options, p));
  }
  assert.equal(calls.length, 0);
  assert.throws(() => m.andruck({}, {}), /drawing context/);
  assert.throws(() => m.andruck({}, { createGraphics() {}, image() {} }), /canvas size/);
  assert.throws(() => m.andruck({ width: 40 }, { createGraphics() {}, image() {} }), /canvas size/);
  assert.throws(() => m.andruck({}, p), /stop/);
  assert.throws(() => m.andruck(undefined, p), /stop/); // No options at all.
  assert.throws(() => m.andruck({ width: 40, height: 30 }, { ...p, width: undefined, height: undefined }), /stop/);
  assert.equal(calls.length, 3);
  // An image source still goes to the surface treatment, not to a sheet.
  assert.throws(() => m.andruck({ canvas: {}, get() {}, width: 10, height: 10 }, { ink: 0.2 }, {}), /drawing context/);
}
console.log('Sheet: andruck(options) validation, context detection and size checks passed for source/min.');
