const assert = require('node:assert/strict');
const {ageCoverage, applyAge} = require('../experiments/merz-surface/surface.js');
for(let y=0;y<840;y+=7) for(let x=0;x<600;x+=7) {
  assert.equal(ageCoverage(x,y,0,17,600,840),1);
  const light=ageCoverage(x,y,.2,17,600,840);
  const strong=ageCoverage(x,y,.8,17,600,840);
  assert.ok(strong<=light && strong>=0 && light<=1);
  assert.equal(strong,ageCoverage(x,y,.8,17,600,840));
}
const clean=Uint8ClampedArray.from({length:80*100*4},(_,i)=>i%4===3?255:80+i%3);
function render(amount,seed) {
  const layer={width:80,height:100,pixels:clean.slice(),pixelDensity:()=>1,loadPixels(){},updatePixels(){}};
  applyAge(layer,amount,seed);return layer.pixels;
}
assert.deepEqual(render(0,17),clean);
const first=render(.8,17);render(.2,99);
assert.deepEqual(render(.8,17),first);
assert.notDeepEqual(first,render(.8,18));
for(let i=0;i<clean.length;i++) if(i%4!==3) assert.equal(first[i],clean[i]);
assert.throws(()=>render(-1,17),RangeError);
assert.throws(()=>render(.2,1.2),TypeError);
console.log('Surface study: zero identity, repeatability, seed distinction, monotonic loss and alpha-only treatment passed.');
