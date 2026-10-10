const assert=require('node:assert/strict');
require('../experiments/letter-as-plane/model.js');
const study=globalThis.MerzStudy;
assert.equal(study.normalize('één <&> woord!'),'EEN WOORD');
assert.equal(study.build({word:'123'}).rects.length,0);
assert.throws(()=>study.build({weight:NaN}),RangeError);
assert.throws(()=>study.build({proportion:3}),RangeError);
let count=0;
for(const word of ['MERZ','ABCDEFGHIJKLMNOPQRSTUVWXYZ','A A A A A A A A A A A A A A A A','MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM']){
  for(const proportion of [0.55,1,1.35])for(const weight of [0.35,1])for(const spacing of [0.12,1.6]){
    const scene=study.build({word,proportion,weight,spacing});
    for(const r of scene.rects){assert.ok(r.w>0&&r.h>0);assert.ok(r.x>=0&&r.y>=0&&r.x+r.w<=scene.width&&r.y+r.h<=scene.height);}
    assert.deepEqual(scene,study.build({word,proportion,weight,spacing}));
    const svg=study.svg(scene);assert.equal((svg.match(/<rect /g)||[]).length,scene.rects.length+1);
    count++;
  }
}
assert.ok(study.build({colour:0}).rects.every(r=>r.fill===study.palette.ink));
assert.ok(study.build({colour:1}).rects.every(r=>r.fill!==study.palette.ink));
console.log(count+' geometry cases passed: bounds, repeatability, SVG parity, normalization and colour extremes.');
