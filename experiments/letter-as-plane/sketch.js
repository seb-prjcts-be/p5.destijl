/* global p5, DeStijlStudy */
(() => {
  const form=document.getElementById('controls');
  const ids=['proportion','weight','spacing','colour'];
  let scene;
  let painter;
  function update(){
    const options={word:form.elements.word.value};
    for(const id of ids){options[id]=Number(document.getElementById(id).value);document.getElementById(id+'-value').value=options[id].toFixed(2);}
    scene=DeStijlStudy.build(options);
    document.getElementById('notice').textContent=scene.text ? (scene.text!==options.word.toUpperCase().trim()?'Drawn as: '+scene.text:''):'Type a word using letters A-Z.';
    if(painter){painter.describe('Geometric letter study of '+(scene.text||'an empty page')+'. Rectangular parts in black, red, blue and yellow.');painter.redraw();}
  }
  form.addEventListener('submit',event=>event.preventDefault());
  form.addEventListener('input',update);
  document.getElementById('restart').addEventListener('click',()=>{form.reset();update();});
  document.getElementById('export').addEventListener('click',()=>{
    const url=URL.createObjectURL(new Blob([DeStijlStudy.svg(scene)],{type:'image/svg+xml;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='p5.merz-'+(scene.text.toLowerCase().replace(/ /g,'-')||'study')+'.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  update();
  if(typeof p5==='undefined'){document.getElementById('notice').textContent='p5.js could not load. Reload the page.';return;}
  new p5(p=>{
    p.setup=()=>{p.createCanvas(scene.width,scene.height).parent('canvas-host');p.pixelDensity(1);p.noLoop();painter=p;update();};
    p.draw=()=>{
      p.background(scene.palette.paper);
      if(document.getElementById('grid').checked){
        p.stroke('#d6d6cc');p.strokeWeight(1);
        for(const g of scene.guides){for(let i=0;i<=5;i++){p.line(g.x+g.w*i/5,g.y,g.x+g.w*i/5,g.y+g.h);p.line(g.x,g.y+g.h*i/5,g.x+g.w,g.y+g.h*i/5);}}
      }
      p.noStroke();for(const r of scene.rects){p.fill(r.fill);p.rect(r.x,r.y,r.w,r.h);}
    };
  });
})();
