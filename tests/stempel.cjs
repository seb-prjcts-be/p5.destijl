const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
let baseline;
for (const file of ['p5.merz.js', 'p5.merz.min.js']) {
  const calls = [];
  const p = {};
  for (const name of ['push','pop','applyMatrix','noFill','stroke','strokeCap','strokeJoin','strokeWeight','beginShape','vertex','endShape','noStroke','fill','textFont','textSize','textStyle','textAlign','textLeading','text']) p[name] = (...args) => calls.push([name,...args]);
  const ctx = { ...p }; vm.runInNewContext(fs.readFileSync(file,'utf8'), ctx);
  const m = ctx.Merz;
  const word = m.satz('MERZ'); const original = JSON.stringify(word);
  assert.equal(m.stempel(word, [{x:12,y:25,angle:90,scale:2,color:'#b92d26'}],p),1);
  const matrix = calls.find(c => c[0] === 'applyMatrix');
  assert.ok(Math.abs(matrix[1]) < 1e-12); assert.equal(matrix[2],2); assert.equal(matrix[3],-2);
  assert.deepEqual(matrix.slice(5),[12,25]);
  assert.equal(calls.at(-1)[0],'pop'); assert.equal(JSON.stringify(word),original);
  calls.length=0;
  m.stempel(m.bauteile('R'),[{x:0,y:0}]); // Global mode.
  const result=JSON.stringify(calls); if(baseline)assert.equal(result,baseline); baseline=result;
  calls.length=0;
  assert.throws(()=>m.stempel(word,[{x:0,y:0},{x:1,y:1,scale:0}],p));
  assert.equal(calls.length,0); // Validate all copies before drawing any.
  assert.throws(()=>m.stempel(word,[{x:0,y:0,colour:'#ffffff'}],p));
  assert.throws(()=>m.stempel({},[],p));
  assert.equal(m.stempel(word,[],p),0);
  calls.length=0;
  assert.equal(m.stempel('rrrt',{x:28,y:98,size:105,color:'#b92d26',rows:4,leading:20},p),1);
  assert.deepEqual(calls.filter(c=>c[0]==='text'),[['text','rrrt',0,0],['text','rrrt',0,20],['text','rrrt',0,40],['text','rrrt',0,60]]);
  assert.ok(calls.some(c=>c[0]==='textFont'&&c[1]==='Archivo Black'));
  assert.equal(calls.at(-1)[0],'pop');
  calls.length=0;
  assert.throws(()=>m.stempel('x',[{x:0,y:0},{x:0,y:0,rows:1.5}],p));
  assert.equal(calls.length,0);
  m.stempel('global',{x:0,y:0});
  assert.ok(calls.some(c=>c[0]==='text'));
  for(const source of ['rrrt',word,m.bauteile('R')]){
    calls.length=0;
    m.stempel(source,{x:28,y:98,color:'#b92d26'},p);
    const expected=JSON.stringify(calls);
    calls.length=0;
    m.stempel(source,28,98,{color:'#b92d26'},p);
    assert.equal(JSON.stringify(calls),expected);
  }
  calls.length=0;
  m.stempel('rrrt',28,98);
  assert.ok(calls.some(c=>c[0]==='textSize'&&c[1]===32));
  assert.deepEqual(calls.find(c=>c[0]==='applyMatrix').slice(5),[28,98]);
  calls.length=0;
  for(const args of [[0,NaN],[0,0,null],[0,0,{x:4}],[0,0,{size:0}]])assert.throws(()=>m.stempel('x',...args));
  assert.equal(calls.length,0);
  calls.length=0;
  m.stempel(word,-10,42,{repeat:4,stepY:58,offsetX:-150,color:['#b92d26','#20201e']},p);
  assert.deepEqual(calls.filter(c=>c[0]==='applyMatrix').map(c=>c.slice(5)),[[-10,42],[-160,100],[-10,158],[-160,216]]);
  assert.deepEqual(calls.filter(c=>c[0]==='stroke').map(c=>c[1]),['#b92d26','#20201e','#b92d26','#20201e']);
  calls.length=0;
  for(const options of [{repeat:0},{repeat:1025},{color:[]},{angle:[0,NaN]},{scale:[1,0]},{stepY:Infinity}])assert.throws(()=>m.stempel(word,0,0,options,p));
  assert.equal(calls.length,0);
  const textBroken={...p,text(){throw new Error('text failed');}};
  assert.throws(()=>m.stempel('x',{x:0,y:0},textBroken));
  assert.equal(calls.at(-1)[0],'pop');
  const broken={...p,vertex(){throw new Error('draw failed');}};
  assert.throws(()=>m.stempel(word,[{x:0,y:0}],broken));
  assert.equal(calls.at(-1)[0],'pop');
}
console.log('Stempel: transforms, source/min parity, global/instance routing, validation and state restoration passed.');
