(function(root){
  'use strict';
  const L=.5, R=4.5, M=2.5;
  const path=(...points)=>points;
  // Own continuous-stroke redraws informed by the alphabet reproduction.
  const glyphs={
    A:[path([L,R],[L,L],[R,L],[R,R]),path([L,M],[R,M])],
    B:[path([L,R],[L,L],[R,L],[R,R],[L,R]),path([L,M],[R,M])],
    C:[path([R,L],[L,L],[L,R],[R,R])],
    D:[path([L,L],[R,L],[R,R],[L,R],[L,L])],
    E:[path([R,L],[L,L],[L,R],[R,R]),path([L,M],[R,M])],
    F:[path([L,R],[L,L],[R,L]),path([L,M],[R,M])],
    G:[path([R,L],[L,L],[L,R],[R,R],[R,M],[3,M])],
    H:[path([L,L],[L,R]),path([R,L],[R,R]),path([L,M],[R,M])],
    I:[path([M,L],[M,R])],J:[path([R,L],[R,R],[L,R])],
    K:[path([L,L],[L,R]),path([L,M],[R,M],[R,L]),path([3,M],[3,R])],
    L:[path([L,L],[L,R],[R,R])],
    M:[path([L,R],[L,L],[R,L],[R,R]),path([M,L],[M,3])],
    N:[path([L,R],[L,L],[R,L],[R,R])],
    O:[path([L,L],[R,L],[R,R],[L,R],[L,L])],
    P:[path([L,R],[L,L],[R,L],[R,M],[L,M])],
    Q:[path([L,L],[R,L],[R,R],[L,R],[L,L]),path([M,3.5],[M,5])],
    R:[path([L,R],[L,L],[R,L],[R,M],[L,M]),path([3,M],[3,R])],
    S:[path([R,L],[L,L],[L,M],[R,M],[R,R],[L,R])],
    T:[path([L,L],[R,L]),path([M,L],[M,R])],
    U:[path([L,L],[L,R],[R,R],[R,L])],
    V:[path([L,L],[L,R],[R,R],[R,L])],
    W:[path([L,L],[L,R],[R,R],[R,L]),path([M,2],[M,R])],
    X:[path([L,L],[1.5,L],[1.5,M],[3.5,M],[3.5,R],[R,R]),path([R,L],[3.5,L],[3.5,M],[1.5,M],[1.5,R],[L,R])],
    Y:[path([L,L],[L,M],[R,M],[R,L]),path([M,M],[M,R])],
    Z:[path([L,L],[R,L],[R,M],[L,M],[L,R],[R,R])]
  };
  const palette={paper:'#f7f7f2',ink:'#20201e',red:'#b92d26',blue:'#234b92',yellow:'#e8bb32'};
  function normalize(text){return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z\s]/g,'').replace(/\s+/g,' ').trim();}
  function word(text,{x=0,y=0,size=100,weight=1,proportion=1,spacing=12,fill=palette.ink}={}){
    for(const value of [x,y,size,weight,proportion,spacing])if(!Number.isFinite(value))throw new TypeError('Measurements must be finite');
    if(size<=0||weight<=0||weight>1||proportion<.55||proportion>1.35||spacing<0)throw new RangeError('Letter measurement out of range');
    const normalized=normalize(text),unit=size/5,paths=[];
    let cursor=x;
    for(const char of normalized){
      if(char===' '){cursor+=size*.5+spacing;continue;}
      glyphs[char].forEach(points=>paths.push({points:points.map(([px,py])=>[cursor+px*unit*proportion,y+py*unit]),width:unit*weight,fill}));
      cursor+=size*proportion+spacing;
    }
    return {text:normalized,paths,width:normalized?cursor-x-spacing:0,height:size};
  }
  const escape=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  function svg(scene){
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${scene.width}" height="${scene.height}" viewBox="0 0 ${scene.width} ${scene.height}" overflow="hidden"><title>${escape(scene.title||'p5.merz study')}</title><rect width="100%" height="100%" fill="${palette.paper}"/>`+
      (scene.rects||[]).map(r=>`<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${r.fill}"/>`).join('')+
      (scene.paths||[]).map(p=>`<path d="${p.points.map((v,i)=>(i?'L':'M')+v.join(' ')).join(' ')}" fill="none" stroke="${p.fill}" stroke-width="${p.width}" stroke-linejoin="miter" stroke-linecap="square"/>`).join('')+
      (scene.texts||[]).map(t=>`<text x="${t.x}" y="${t.y}" font-family="Trebuchet MS, Arial, sans-serif" font-size="${t.size}" fill="${t.fill||palette.ink}"${t.angle?` transform="rotate(${t.angle} ${t.x} ${t.y})"`:''}>${escape(t.text)}</text>`).join('')+'</svg>';
  }
  function draw(p,scene){
    p.background(palette.paper);p.noStroke();for(const r of scene.rects||[]){p.fill(r.fill);p.rect(r.x,r.y,r.w,r.h);}
    p.noFill();p.strokeCap(p.PROJECT);p.strokeJoin(p.MITER);
    for(const line of scene.paths||[]){p.stroke(line.fill);p.strokeWeight(line.width);p.beginShape();line.points.forEach(v=>p.vertex(...v));p.endShape();}
    p.noStroke();p.textFont('Trebuchet MS');for(const t of scene.texts||[]){p.push();p.translate(t.x,t.y);p.rotate((t.angle||0)*Math.PI/180);p.fill(t.fill||palette.ink);p.textSize(t.size);p.text(t.text,0,0);p.pop();}
  }
  function download(scene,name){const url=URL.createObjectURL(new Blob([svg(scene)],{type:'image/svg+xml;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  root.MerzBars=Object.freeze({word,svg,draw,download,normalize,palette});
})(globalThis);
