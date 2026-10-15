async function setup() {
  noCanvas(); noLoop();
  const out = document.getElementById('result');
  const say = value => { out.textContent += '\n' + value; };
  const check = (ok, message) => { if (!ok) throw new Error(message); say('PASS ' + message); };
  try {
    out.textContent = '';
    const small = Merz.create({width:100,height:80});
    const large = Merz.create({width:220,height:140});
    const id = small.text('abc',0,0);
    large.plane(140,90,60,40,{color:'#b92d26'});
    document.getElementById('exports').innerHTML = small.exportSVG()+large.exportSVG()+large.exportSVG();
    const ids = Array.from(document.querySelectorAll('#exports [id]'), e=>e.id);
    check(new Set(ids).size===ids.length,'inline SVG ids are unique');
    for (const svg of document.querySelectorAll('#exports svg')) {
      const group=svg.querySelector('g[clip-path]');
      const target=document.getElementById(group.getAttribute('clip-path').slice(5,-1));
      check(target.closest('svg')===svg,'clip reference belongs to its SVG');
    }
    small.update(id,{text:'xé'});
    check(small.get(id).text==='XE'&&small.get(id).id===id,'normalization preserves the element id');
    const piece=await Merz.fundsachen('001');
    check(piece.width===70,'global Fundsachen resolves relative to the library');
    await new Promise((resolve,reject)=>new p5(p=>{p.setup=async()=>{try{p.noCanvas();p.noLoop();const f=await Merz.fundsachen('001',{},p);check(f.width===70,'instance Fundsachen resolves relative to the library');p.remove();resolve();}catch(e){reject(e);}}}));
    if(new URLSearchParams(location.search).has('bench')) {
      for(const size of [600,2000,4000]) {
        const layer=createGraphics(size,size);layer.pixelDensity(1);layer.background('#b92d26');
        const options={ink:.12,paper:.18,seed:713};
        let t=performance.now();const a=Merz.andruck(layer,options);const coldMs=performance.now()-t;
        const warm=[];let differences=0;
        for(let run=0;run<3;run++){
          t=performance.now();const b=Merz.andruck(layer,options);warm.push(Math.round(performance.now()-t));
          for(let i=0;i<a.pixels.length;i++)if(a.pixels[i]!==b.pixels[i])differences++;
        }
        say(JSON.stringify({size,coldMs:Math.round(coldMs),warmMs:warm,differences}));
        layer.remove();await new Promise(resolve=>setTimeout(resolve,0));
      }
    }
    say('DONE');
  } catch(e) {say('FAIL '+e.stack);}
}
