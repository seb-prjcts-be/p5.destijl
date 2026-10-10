/* global p5, MerzBars */
(() => {
  const form=document.getElementById('layout');let scene,painter;
  const value=id=>document.getElementById(id).value;
  function update(){
    if(!form.checkValidity()){document.getElementById('page-notice').textContent='Enter measurements within the indicated range.';return;}
    let title;
    try {title=Merz.satz(value('title'),{size:Number(value('size')),spacing:Number(value('spacing')),weight:1});}
    catch(error){document.getElementById('page-notice').textContent=error.message;return;}
    title.paths=title.paths.map(p=>({...p,fill:value('colour'),points:p.points.map(v=>[v[0]+Number(value('x')),v[1]+Number(value('y'))])}));
    const texts=value('info').split('\n').map((text,i)=>({text,x:Number(value('info-x')),y:Number(value('info-y'))+i*28,size:20}));
    const vertical=value('direction')==='vertical';texts.push({text:'p5.merz / form study',x:vertical?850:75,y:vertical?750:1030,size:16,angle:vertical?-90:0});
    const rects=value('panel')==='none'?[]:[{x:75,y:Number(value('panel-y')),w:260,h:140,fill:MerzBars.palette[value('panel')]}];
    scene={width:900,height:1100,title:title.text||'Page study',paths:title.paths,rects,texts};
    const clipped=scene.paths.some(p=>p.points.some(([x,y])=>x-p.width/2<0||x+p.width/2>900||y-p.width/2<0||y+p.width/2>1100));
    const altered=title.text!==value('title').toUpperCase().trim();
    document.getElementById('page-notice').textContent=[clipped?'The heading extends beyond the page. Move it or reduce its size to show it in full.':'',altered?'Heading drawn as: '+(title.text||'no letters A-Z'):''].filter(Boolean).join(' ');
    if(painter){const colourName={none:'none',red:'red',blue:'blue',yellow:'yellow'}[value('panel')];painter.describe('Page with heading '+title.text+', small text and '+(colourName==='none'?'no colour plane.':'a '+colourName+' colour plane.'));painter.redraw();}
  }
  form.addEventListener('submit',e=>e.preventDefault());form.addEventListener('input',update);
  document.getElementById('restart-page').addEventListener('click',()=>{form.reset();update();});
  document.getElementById('save-page').addEventListener('click',()=>{if(form.checkValidity())MerzBars.download(scene,'p5.merz-page.svg');});
  update();new p5(p=>{p.setup=()=>{p.createCanvas(900,1100).parent('page');p.pixelDensity(1);p.noLoop();painter=p;update();};p.draw=()=>MerzBars.draw(p,scene);});
})();
