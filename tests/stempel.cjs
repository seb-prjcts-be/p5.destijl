const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
let baseline, linesBaseline;
for (const file of ['p5.merz.js', 'p5.merz.min.js']) {
  const calls = [];
  const p = {};
  for (const name of ['push','pop','applyMatrix','noFill','stroke','strokeCap','strokeJoin','strokeWeight','beginShape','vertex','endShape','noStroke','fill','textFont','textSize','textStyle','textAlign','textLeading','text','rect','rectMode','translate','scale']) p[name] = (...args) => calls.push([name,...args]);
  // Ten units per character; a seven-unit cap height with a one-unit left bearing.
  p.textWidth = s => { calls.push(['textWidth', s]); return s.length * 10; };
  p.textBounds = s => { calls.push(['textBounds', s]); return { x: 1, y: -7, w: s.length * 10, h: 7 }; };
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
  calls.length=0;
  assert.equal(m.stempel(word,28,98,{},p),1); const withOptions=JSON.stringify(calls); calls.length=0;
  assert.equal(m.stempel(word,28,98,p),1); // A drawing context may replace the options.
  assert.equal(JSON.stringify(calls),withOptions);
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
  // Lines, measure, spacing, stretch and rules.
  calls.length=0;
  assert.equal(m.stempel(['A','B'],0,0,{leading:40},p),1);
  assert.deepEqual(calls.filter(c=>c[0]==='text'),[['text','A',0,0],['text','B',0,40]]);
  const linesCalls=JSON.stringify(calls.filter(c=>c[0]==='text'));
  calls.length=0; m.stempel('A'+String.fromCharCode(10)+'B',0,0,{leading:40},p);
  assert.equal(JSON.stringify(calls.filter(c=>c[0]==='text')),linesCalls); // A line break is a line.
  calls.length=0; m.stempel(['A','B'],0,0,{rows:2,leading:10},p);
  assert.deepEqual(calls.filter(c=>c[0]==='text').map(c=>c[3]),[0,10,20,30]); // rows repeat the lines.
  calls.length=0; m.stempel('AB',0,0,{width:100},p);
  assert.deepEqual(calls.filter(c=>c[0]==='text'),[['text','A',0,0],['text','B',90,0]]); // Spaced to the measure.
  calls.length=0; m.stempel('AB',0,0,{spacing:5},p);
  assert.deepEqual(calls.filter(c=>c[0]==='text'),[['text','A',0,0],['text','B',15,0]]);
  calls.length=0; m.stempel('AB',0,0,{width:100,height:50},p);
  assert.deepEqual(calls.find(c=>c[0]==='scale').slice(1),[5,50/7]);
  assert.deepEqual(calls.find(c=>c[0]==='translate').slice(1),[-5,0]); // Ink box left at 0, bottom on the baseline.
  assert.equal(calls.filter(c=>c[0]==='text').length,1);
  calls.length=0; m.stempel(['A','BCD'],0,0,{leading:40,rule:{weight:6,color:'#b92d26'}},p);
  const rect=calls.find(c=>c[0]==='rect');
  assert.deepEqual(rect.slice(1),[0,13.5,30,6]); // Centred in the gap, spanning the longest line.
  assert.ok(calls.indexOf(rect)<calls.findIndex(c=>c[0]==='text')); // Rules lie under the text.
  assert.deepEqual(calls.filter(c=>c[0]==='fill').map(c=>c[1]).slice(0,3),['#20201e','#b92d26','#20201e']);
  calls.length=0; m.stempel(['A','B'],0,0,{rule:true,width:200},p);
  assert.deepEqual(calls.find(c=>c[0]==='rect').slice(3),[200,4]);
  calls.length=0; m.stempel('A',0,0,{rule:true},p);
  assert.ok(!calls.some(c=>c[0]==='rect'));
  for(const options of [{height:50},{width:100,spacing:2},{rule:{weight:0}},{rule:{colour:'#ffffff'}},{rule:'yes'},{width:0},{spacing:NaN}])assert.throws(()=>m.stempel('AB',0,0,options,p));
  assert.throws(()=>m.stempel(['A',1],0,0,p));
  assert.throws(()=>m.stempel([],0,0,p));
  // Segments on one line, alignment and rules before and after.
  calls.length=0; m.stempel([{text:'A',size:30},{text:'BC',size:10}],0,0,{gap:5},p);
  assert.deepEqual(calls.filter(c=>c[0]==='text'),[['text','A',0,0],['text','BC',15,0]]);
  assert.deepEqual(calls.filter(c=>c[0]==='textSize').map(c=>c[1]).slice(-2),[30,10]);
  calls.length=0; m.stempel([{text:'A'},{text:'BC'}],0,0,{width:100},p);
  assert.deepEqual(calls.filter(c=>c[0]==='text'),[['text','A',0,0],['text','BC',80,0]]); // Gaps fill the measure.
  calls.length=0; m.stempel([{text:'A'},{text:'BC'}],0,0,{size:20},p);
  assert.deepEqual(calls.filter(c=>c[0]==='text').map(c=>c[2]),[0,16]); // Default gap: 0.3 of the size.
  calls.length=0; m.stempel([{text:'A',width:50,height:20},{text:'B'}],0,0,{gap:5},p);
  assert.deepEqual(calls.find(c=>c[0]==='scale').slice(1),[5,20/7]);
  assert.deepEqual(calls.filter(c=>c[0]==='text').at(-1),['text','B',55,0]);
  calls.length=0; m.stempel([{text:'A',color:'#b92d26'},{text:'B'}],0,0,p);
  assert.deepEqual(calls.filter(c=>c[0]==='fill').map(c=>c[1]).slice(-2),['#b92d26','#20201e']);
  calls.length=0; m.stempel('AB',0,0,{align:'right'},p);
  assert.deepEqual(calls.filter(c=>c[0]==='text'),[['text','AB',-20,0]]);
  calls.length=0; m.stempel('AB',0,0,{align:'center'},p);
  assert.deepEqual(calls.filter(c=>c[0]==='text'),[['text','AB',-10,0]]);
  calls.length=0; m.stempel(['A','BCD'],0,0,{align:'right',leading:40,rule:true},p);
  assert.deepEqual(calls.find(c=>c[0]==='rect').slice(1),[-30,14.5,30,4]);
  calls.length=0; m.stempel(['A','B'],0,0,{leading:40,rule:{before:true,after:true}},p);
  assert.deepEqual(calls.filter(c=>c[0]==='rect').map(c=>c[2]),[-25.5,14.5,54.5]);
  calls.length=0; m.stempel('A',0,0,{leading:40,rule:{after:true}},p);
  assert.deepEqual(calls.filter(c=>c[0]==='rect').map(c=>c[2]),[14.5]);
  for(const source of [['A',{text:'B'}],[{text:'A',colour:'#ffffff'}],[{text:'A',height:5}],[{text:'A',width:10,spacing:1}],[{word:'A'}]])assert.throws(()=>m.stempel(source,0,0,p));
  for(const options of [{align:'top'},{gap:NaN},{rule:{before:1}}])assert.throws(()=>m.stempel('AB',0,0,options,p));
  calls.length=0; m.stempel(['A','BCD'],5,6,{rule:true,width:120,leading:40},p);
  const linesResult=JSON.stringify(calls); if(linesBaseline)assert.equal(linesResult,linesBaseline); linesBaseline=linesResult;
}
console.log('Stempel: transforms, source/min parity, global/instance routing, lines, segments, measure, spacing, stretch, alignment, rules, validation and state restoration passed.');
