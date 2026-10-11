const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
for (const file of ['p5.merz.js', 'p5.merz.min.js']) {
  const ctx = {}; vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx);
  const m = ctx.Merz;
  assert.equal(typeof m.bogen, 'function');
  const calls = [];
  const p = { width: 120, height: 100, push() {}, applyMatrix() {}, image() {}, createGraphics() { calls.push('createGraphics'); throw new Error('stop'); } };
  // Options are validated before any graphics exist.
  for (const options of [null, [], { colour: '#ffffff' }, { paper: 2 }, { ink: -1 }, { seed: 1.5 }, { width: 0 }, { height: 12.5 }, { color: 'red' }]) {
    assert.throws(() => m.bogen(options, p));
  }
  assert.equal(calls.length, 0);
  assert.throws(() => m.bogen({}, {}), /drawing context/);
  assert.throws(() => m.bogen({}, { createGraphics() {}, image() {} }), /canvas size/);
  assert.throws(() => m.bogen({ width: 40 }, { createGraphics() {}, image() {} }), /canvas size/);
  assert.throws(() => m.bogen({}, p), /stop/);
  assert.throws(() => m.bogen(p), /stop/); // A context may replace the options.
  assert.throws(() => m.bogen({ width: 40, height: 30 }, { ...p, width: undefined, height: undefined }), /stop/);
  assert.equal(calls.length, 3);
}
console.log('Bogen: option validation, context detection and size checks passed for source/min.');
