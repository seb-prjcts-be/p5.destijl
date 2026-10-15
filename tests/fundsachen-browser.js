async function setup() {
  createCanvas(360,220);pixelDensity(1);noLoop();
  const results=[];
  const full=new URLSearchParams(location.search).has('full');
  const sampleIds=new Set(['001','003','006','007','009','011','022','025','028']);
  try {
    const a=await Merz.fundsachen('001');
    const b=await Merz.fundsachen('merz-2-cover-m');
    const imageA=a.bau(globalThis),imageB=b.bau(globalThis);
    imageA.loadPixels();imageB.loadPixels();
    results.push(['number/name pixel parity',imageA.pixels.every((v,i)=>v===imageB.pixels[i])]);
    const local=await Merz.fundsachen('001',{url:'../assets/fundsachen/merz-2-cover-m-ink.png'});
    const localImage=local.bau(globalThis);localImage.loadPixels();
    results.push(['downloaded-file route',imageA.pixels.every((v,i)=>v===localImage.pixels[i])]);
    const all=Merz.fundsachen.list();
    const list=full?all:all.filter(item=>sampleIds.has(item.id));
    for(let i=0;i<list.length;i++){
      const item=list[i],piece=await Merz.fundsachen(item.id);
      results.push([item.id+' dimensions',piece.width===item.width&&piece.height===item.height]);
      const ink=piece.bau(globalThis);ink.loadPixels();
      results.push([item.id+' transparent and opaque pixels',ink.pixels.some((v,i)=>i%4===3&&v===0)&&ink.pixels.some((v,i)=>i%4===3&&v===255)]);
      const scan=(await Merz.fundsachen(item.id,{variant:'scan'})).bau(globalThis);scan.loadPixels();
      results.push([item.id+' original scan opaque',scan.pixels.every((v,i)=>i%4!==3||v===255)]);
      if(item.svgFile){
        const vector=(await Merz.fundsachen(item.id,{variant:'svg'})).bau(globalThis);vector.loadPixels();
        let mismatch=0;
        for(let j=3;j<ink.pixels.length;j+=4)if((ink.pixels[j]>=128)!==(vector.pixels[j]>=128))mismatch++;
        results.push([item.id+' SVG silhouette agreement',mismatch/(piece.width*piece.height)<.04]);
      }
      Merz.stempel(Merz.riss(piece,{amount:0.15,seed:17}),[{x:10+i*100,y:10}]);
    }
    await new Promise((resolve,reject)=>new p5(p=>{p.setup=async()=>{try{
      p.createCanvas(90,150);p.pixelDensity(1);p.noLoop();
      const piece=await Merz.fundsachen(1,{},p);const image=piece.bau(p);image.loadPixels();
      results.push(['instance pixels',imageA.pixels.every((v,i)=>v===image.pixels[i])]);
      const original=await p.loadImage('../assets/fundsachen/merz-2-cover-m-ink.png');
      p.clear(); p.image(original,3,4,70,140); p.loadPixels();
      const expected=Array.from(p.pixels);
      p.clear(); await Merz.fundsachen('001',3,4,70,p); p.loadPixels();
      // Separate decoded canvases can differ by one RGB level after alpha compositing.
      results.push(['direct drawing instance parity',expected.length === p.pixels.length && expected.every((v,i)=>i%4===3 ? v===p.pixels[i] : Math.abs(v-p.pixels[i])<=1)]);
      p.remove(); resolve();
    }catch(error){reject(error);}};}));
  }catch(error){results.push([error.message,false]);}
  const assetRequests=performance.getEntriesByType('resource').filter(entry=>entry.name.includes('/assets/fundsachen/')).length;
  results.push([(full?'full catalogue':'representative sample')+'; '+assetRequests+' asset resource entries',true]);
  document.getElementById('result').textContent=results.map(([name,ok])=>(ok?'PASS ':'FAIL ')+name).join('\n');
}
