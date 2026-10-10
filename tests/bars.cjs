const assert=require('node:assert/strict');
require('../experiments/shared/bars.js');
const bars=globalThis.DeStijlBars;
const first=bars.word('NN',{size:100,spacing:10});
const spaced=bars.word('NN',{size:100,spacing:30});
assert.deepEqual(first.paths[0],spaced.paths[0]);
assert.equal(spaced.paths[1].points[0][0]-first.paths[1].points[0][0],20);
for(const weight of [.35,.6,1]){
  const n=bars.word('N',{size:100,weight});
  assert.equal(n.paths.length,1);assert.equal(n.paths[0].points.length,4);
  assert.equal(n.paths[0].width,weight*20);
  const all=bars.word('ABCDEFGHIJKLMNOPQRSTUVWXYZ',{size:100,weight});
  for(const path of all.paths)for(let i=1;i<path.points.length;i++){
    const a=path.points[i-1],b=path.points[i];assert.ok(a[0]===b[0]||a[1]===b[1],'Only orthogonal segments');
  }
}
const scene={width:900,height:1100,title:'A & B <test>',paths:first.paths,texts:[{x:10,y:20,size:20,text:'<script> & "tekst"'}]};
const svg=bars.svg(scene);assert.ok(svg.includes('&lt;script&gt;'));assert.ok(!svg.includes('<script>'));assert.ok(svg.includes('overflow="hidden"'));
assert.equal((svg.match(/<path /g)||[]).length,first.paths.length);
assert.throws(()=>bars.word('A',{size:NaN}),TypeError);
assert.throws(()=>bars.word('A',{size:-1}),RangeError);
assert.equal(bars.word('één!').text,'EEN');
console.log('Continuous bars, orthogonality, independent spacing, input validation and SVG checked.');
