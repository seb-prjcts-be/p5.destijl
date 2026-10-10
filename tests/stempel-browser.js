function setup() {
  createCanvas(300, 240); pixelDensity(1); noLoop();
  const results = [];
  const word = Merz.geometry('M', {size:50});
  const bowl = Merz.parts('R',{size:40})[0];
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
  }
  render(globalThis);
  const a=drawingContext.getImageData(0,0,300,240).data;
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
