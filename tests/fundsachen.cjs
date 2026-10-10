const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
(async()=>{
  for(const file of ['p5.merz.js','p5.merz.min.js']) {
    let loads=0, snapshots=0, fail=false;
    const urls=[];
    const ctx={URL,document:{baseURI:'https://sketch.test/project/index.html',currentScript:{src:'https://example.test/lib/'+file}},loadImage:async url=>{
      loads++;urls.push(url);if(fail)throw new Error('offline');
      return {width:70,height:140,get(){snapshots++;return {canvas:{},width:70,height:140};}};
    }};
    vm.runInNewContext(fs.readFileSync(file,'utf8'),ctx);
    const detached={URL,location:{href:'https://sketch.test/project/index.html'},loadImage:ctx.loadImage};
    vm.runInNewContext(fs.readFileSync(file,'utf8'),detached);
    await assert.rejects(detached.Merz.fundsachen('001'),/Provide baseURL/);
    assert.equal(loads,0);
    const m=ctx.Merz;
    const entries=m.fundsachen.list();assert.equal(entries.length,28);
    assert.equal(new Set(entries.map(item=>item.id)).size,entries.length);
    assert.equal(new Set(entries.map(item=>item.name)).size,entries.length);
    assert.equal(JSON.stringify(entries),JSON.stringify(JSON.parse(fs.readFileSync('assets/fundsachen/catalogue.json','utf8'))));
    for(const item of entries){
      for(const file of [item.file,item.inkFile]){
        const png=fs.readFileSync('assets/fundsachen/'+file);
        assert.equal(png.readUInt32BE(16),item.width);assert.equal(png.readUInt32BE(20),item.height);
      }
      if(item.svgFile){const svg=fs.readFileSync('assets/fundsachen/'+item.svgFile,'utf8');assert.ok(svg.includes('<path '));assert.ok(!svg.includes('<image'));}
    }
    entries[0].crop[0]=-100;assert.equal(m.fundsachen.list()[0].crop[0],10);
    const [a,b]=await Promise.all([m.fundsachen('001'),m.fundsachen('merz-2-cover-m')]);
    assert.equal(loads,1);assert.equal(snapshots,2);assert.notEqual(a,b);
    assert.equal(urls[0],'https://example.test/lib/assets/fundsachen/merz-2-cover-m-ink.png');
    assert.equal((await m.fundsachen(1)).width,70);assert.equal(loads,1);
    assert.doesNotThrow(()=>m.tear(a,{amount:0.2,seed:17}));
    await assert.rejects(m.fundsachen('999'));assert.equal(loads,1);
    fail=true;await assert.rejects(m.fundsachen('002'));
    fail=false;await m.fundsachen('002');assert.equal(loads,3);
    await m.fundsachen('001',{baseURL:'https://other.test/samples/'});
    assert.equal(urls.at(-1),'https://other.test/samples/merz-2-cover-m-ink.png');
    await m.fundsachen('022',{url:'merz-8-cover-nasci.png'});
    assert.equal(urls.at(-1),'https://sketch.test/project/merz-8-cover-nasci.png');
    const count=loads;
    await assert.rejects(m.fundsachen('022',{url:'x.png',baseURL:'https://other.test/'}));
    await assert.rejects(m.fundsachen('022',{url:''}));
    assert.equal(loads,count);
    await m.fundsachen('001',{variant:'scan'});assert.ok(urls.at(-1).endsWith('/merz-2-cover-m.png'));
    await m.fundsachen('001',{variant:'svg'});assert.ok(urls.at(-1).endsWith('/merz-2-cover-m.svg'));
    await assert.rejects(m.fundsachen('022',{variant:'svg'}));
    await assert.rejects(m.fundsachen('001',{variant:'unknown'}));
    const draws=[]; let depth=0;
    Object.assign(ctx,{push(){depth++;},pop(){depth--;},imageMode(){},noTint(){},image(...args){draws.push(args);}});
    const priorLoads=loads, priorSnapshots=snapshots;
    await m.fundsachen('001',12,24,140);
    assert.deepEqual(draws[0].slice(1),[12,24,140,280]);
    assert.equal(loads,priorLoads); assert.equal(snapshots,priorSnapshots); assert.equal(depth,0);
    for(const args of [[NaN,0,140],[0,Infinity,140],[0,0,0],[0,0,undefined]]) await assert.rejects(m.fundsachen('001',...args));
    assert.equal(loads,priorLoads);
    ctx.image=()=>{throw new Error('drawing failed');};
    await assert.rejects(m.fundsachen('001',0,0,70)); assert.equal(depth,0);
  }
  console.log('Fundsachen: IDs/names, PNG dimensions, independent fragments, cache, retry and source/min passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
