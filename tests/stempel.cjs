const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
let baseline;
for (const file of ['p5.merz.js', 'p5.merz.min.js']) {
  const calls = [];
  const p = {};
  for (const name of ['push','pop','applyMatrix','noFill','stroke','strokeCap','strokeJoin','strokeWeight','beginShape','vertex','endShape']) p[name] = (...args) => calls.push([name,...args]);
  const ctx = { ...p }; vm.runInNewContext(fs.readFileSync(file,'utf8'), ctx);
  const m = ctx.Merz;
  const word = m.geometry('MERZ'); const original = JSON.stringify(word);
  assert.equal(m.stempel(word, [{x:12,y:25,angle:90,scale:2,color:'#b92d26'}],p),1);
  const matrix = calls.find(c => c[0] === 'applyMatrix');
  assert.ok(Math.abs(matrix[1]) < 1e-12); assert.equal(matrix[2],2); assert.equal(matrix[3],-2);
  assert.deepEqual(matrix.slice(5),[12,25]);
  assert.equal(calls.at(-1)[0],'pop'); assert.equal(JSON.stringify(word),original);
  calls.length=0;
  m.stempel(m.parts('R'),[{x:0,y:0}]); // Global mode.
  const result=JSON.stringify(calls); if(baseline)assert.equal(result,baseline); baseline=result;
  calls.length=0;
  assert.throws(()=>m.stempel(word,[{x:0,y:0},{x:1,y:1,scale:0}],p));
  assert.equal(calls.length,0); // Validate all copies before drawing any.
  assert.throws(()=>m.stempel(word,[{x:0,y:0,colour:'#ffffff'}],p));
  assert.throws(()=>m.stempel({},[],p));
  assert.equal(m.stempel(word,[],p),0);
  const broken={...p,vertex(){throw new Error('draw failed');}};
  assert.throws(()=>m.stempel(word,[{x:0,y:0}],broken));
  assert.equal(calls.at(-1)[0],'pop');
}
console.log('Stempel: transforms, source/min parity, global/instance routing, validation and state restoration passed.');
