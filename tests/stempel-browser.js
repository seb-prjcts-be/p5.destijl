function setup() {
  createCanvas(300, 240); pixelDensity(1); noLoop();
  const results = [['Archivo Black loaded before setup', Array.from(document.fonts).some(face => face.family.replaceAll('"', '') === 'Archivo Black' && face.status === 'loaded')]];
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
  // Measure, stretch and rules are checked on the rendered ink.
  const g2=createGraphics(300,120); g2.pixelDensity(1);
  const inkBox=()=>{const d=g2.drawingContext.getImageData(0,0,300,120).data;let x0=300,x1=-1,y0=120,y1=-1;
    for(let i=3;i<d.length;i+=4)if(d[i]>0){const px=(i>>2)%300,py=Math.floor((i>>2)/300);x0=Math.min(x0,px);x1=Math.max(x1,px);y0=Math.min(y0,py);y1=Math.max(y1,py);}
    return {x0,x1,y0,y1,w:x1-x0+1,h:y1-y0+1};};
  g2.clear(); Merz.stempel('MERZ',10,80,{width:200},g2); const spaced=inkBox();
  results.push(['width fills the measure', Math.abs(spaced.x1-210)<=4 && spaced.x0>=10 && spaced.x0<=14]);
  g2.clear(); Merz.stempel('MERZ',10,80,{width:200,height:60},g2); const stretched=inkBox();
  results.push(['width and height fill the ink box', Math.abs(stretched.w-200)<=2 && Math.abs(stretched.h-60)<=2 && Math.abs(stretched.x0-10)<=1 && Math.abs(stretched.y1-79)<=1]);
  g2.clear(); Merz.stempel(['AB','CD'],10,40,{leading:50,rule:{weight:6,color:'#b92d26'}},g2);
  const d2=g2.drawingContext.getImageData(0,0,300,120).data; const at=(x,y)=>d2.slice((y*300+x)*4,(y*300+x)*4+4);
  g2.textFont('Archivo Black'); g2.textSize(32); const cap=g2.textBounds('H',0,0).h; const mid=at(12,Math.round(40+(50-cap)/2));
  results.push(['rule between the lines', mid[0]>150 && mid[1]<90 && mid[3]>0]);
  results.push(['no rule above the first line', at(12,8)[3]===0]);
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
