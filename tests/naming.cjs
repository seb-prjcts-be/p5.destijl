const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
for (const file of ['p5.merz.js','p5.merz.min.js']) {
  const ctx={};vm.runInNewContext(fs.readFileSync(file,'utf8'),ctx);
  assert.equal(ctx.Merz,ctx.DeStijl);
  assert.equal(ctx.MerzComposition,ctx.DeStijlComposition);
  assert.equal(JSON.stringify(ctx.Merz.geometry('MERZ')),JSON.stringify(ctx.DeStijl.geometry('MERZ')));
  assert.equal(typeof ctx.Merz.fragment,'function');
  assert.equal(typeof ctx.Merz.tear,'function');
}
console.log('Merz naming: source, min-build and API aliases passed.');
