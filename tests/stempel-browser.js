function setup() {
  createCanvas(300, 240); pixelDensity(1); noLoop();
  const loaded = name => Array.from(document.fonts).some(face => face.family.replaceAll('"', '') === name && face.status === 'loaded');
  const results = [['printer case loaded before setup', loaded('Merz Grotesk 100') && loaded('Merz Grotesk 62') && loaded('Merz Antiqua')]];
  const word = Merz.satz('M', {size:50});
  const bowl = Merz.bauteile('R',{size:40})[0];
  const piece = Merz.ausschnitt(word, 0, 0, 50, 50);
  const sites = [{x:20,y:10,angle:13,color:'#b92d26'},{x:105,y:20,scale:0.8}];
  function render(p) {
    p.clear(); p.push(); p.translate(9,12); p.angleMode(p.DEGREES);
    Merz.stempel(word,sites,p); p.translate(0,70); Merz.stempel(bowl,sites,p);
    p.translate(0,65); p.imageMode(p.CENTER); p.tint(0,100);
    const before=p.drawingContext.getTransform().toString();
    Merz.stempel(piece,sites,p);
    results.push(['transform restored', before===p.drawingContext.getTransform().toString()]);
    p.pop();
    Merz.stempel('DADA Dada', 4, 235, {size: 15}, p);
  }
  render(globalThis);
  const a=drawingContext.getImageData(0,0,300,240).data;
  const g2=createGraphics(300,120); g2.pixelDensity(1);
  const inkBox=()=>{const d=g2.drawingContext.getImageData(0,0,300,120).data;let x0=300,x1=-1,y0=120,y1=-1;
    for(let i=3;i<d.length;i+=4)if(d[i]>0){const px=(i>>2)%300,py=Math.floor((i>>2)/300);x0=Math.min(x0,px);x1=Math.max(x1,px);y0=Math.min(y0,py);y1=Math.max(y1,py);}
    return {x0,x1,y0,y1,w:x1-x0+1,h:y1-y0+1};};
  g2.clear(); Merz.stempel('MERZ',10,80,{size:60,stretch:62},g2); const narrow=inkBox();
  g2.clear(); Merz.stempel('MERZ',10,80,{size:60,stretch:125},g2); const wide=inkBox();
  results.push(['stretch changes the width', wide.w > narrow.w * 1.4]);
  g2.clear(); Merz.stempel('8',10,80,{size:60,font:'antiqua',weight:500},g2); const antiqua=inkBox();
  g2.clear(); Merz.stempel('8',10,80,{size:60,weight:500},g2); const grotesk=inkBox();
  results.push(['antiqua differs from grotesk', antiqua.w !== grotesk.w || antiqua.h !== grotesk.h]);
  g2.remove();
  new p5(p=>{p.setup=()=>{
    p.createCanvas(300,240);p.pixelDensity(1);p.noLoop();render(p);
    const b=p.drawingContext.getImageData(0,0,300,240).data;
    results.push(['global/instance pixel parity',a.every((v,i)=>v===b[i])]);
    results.push(['visible output',a.some((v,i)=>i%4===3&&v>0)]);
    const g=p.createGraphics(300,240);g.pixelDensity(1);render(g);
    const c=g.drawingContext.getImageData(0,0,300,240).data;
    results.push(['graphics pixel parity',a.every((v,i)=>v===c[i])]);g.remove();
    document.getElementById('result').textContent=results.map(([name,ok])=>(ok?'PASS ':'FAIL ')+name).join('\n');
  };});
}
