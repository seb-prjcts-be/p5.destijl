const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function check(file){const ctx={};vm.runInNewContext(fs.readFileSync(file,'utf8'),ctx);const api=ctx.Merz;
const digits=new Set();for(const c of '0123456789')digits.add(JSON.stringify(api.geometry(c).paths));assert.equal(digits.size,10);
assert.notEqual(JSON.stringify(api.geometry('0').paths),JSON.stringify(api.geometry('O').paths));
for(const char of api.characters)for(const weight of [.3,1]){const g=api.geometry(char,{weight,size:100});assert.ok(g.paths.length);for(const p of g.paths){assert.ok(p.width>0);assert.ok(p.points.length>=2);assert.ok(p.points.some(v=>v[0]!==p.points[0][0]||v[1]!==p.points[0][1]),'No zero-length strokes');for(const v of p.points)assert.ok(v.every(Number.isFinite));}}
assert.ok(api.geometry('.').width<api.geometry('A').width);
assert.equal(api.geometry('“Één” — € 12,50\r\n20:00').text,'"EEN" — € 12,50\n20:00');
const c=api.create({width:900,height:900});c.text('EXPO 2026\n10/10 — 20:00\n€ 12,50 (–25%) & MEER!',30,40,{size:50});c.text('<VORM> "RUIMTE"',30,400,{size:40});const svg=c.exportSVG();assert.ok(!svg.includes('<VORM>'));assert.ok((svg.match(/<path /g)||[]).length>40);return svg;}
assert.equal(check('p5.merz.js'),check('p5.merz.min.js'));console.log('Numerals and punctuation: finite strokes, compact metrics, Unicode normalization and source/min SVG parity passed.');
