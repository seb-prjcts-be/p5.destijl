(function (root) {
  'use strict';
  // Study glyphs designed here, not a transcription of a historical font.
  const glyphs = {
    A:['11111','10001','11111','10001','10001'], B:['11110','10001','11110','10001','11111'],
    C:['11111','10000','10000','10000','11111'], D:['11110','10001','10001','10001','11110'],
    E:['11111','10000','11110','10000','11111'], F:['11111','10000','11110','10000','10000'],
    G:['11111','10000','10111','10001','11111'], H:['10001','10001','11111','10001','10001'],
    I:['11111','00100','00100','00100','11111'], J:['00001','00001','00001','10001','11111'],
    K:['10001','10011','11100','10011','10001'], L:['10000','10000','10000','10000','11111'],
    M:['11111','10101','10101','10001','10001'], N:['10001','11001','10101','10011','10001'],
    O:['11111','10001','10001','10001','11111'], P:['11111','10001','11111','10000','10000'],
    Q:['11111','10001','10001','10011','11111'], R:['11111','10001','11111','10010','10001'],
    S:['11111','10000','11111','00001','11111'], T:['11111','00100','00100','00100','00100'],
    U:['10001','10001','10001','10001','11111'], V:['10001','10001','10001','01010','01110'],
    W:['10001','10001','10101','10101','11111'], X:['10001','01010','00100','01010','10001'],
    Y:['10001','10001','11111','00100','00100'], Z:['11111','00011','00100','11000','11111']
  };
  const palette = Object.freeze({paper:'#f7f7f2',ink:'#20201e',red:'#b92d26',blue:'#234b92',yellow:'#e8bb32'});
  const defaults = Object.freeze({word:'MERZ',proportion:1,weight:1,spacing:0.45,colour:0.35});
  function normalize(text) {
    return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z\s]/g,'').replace(/\s+/g,' ').trim().slice(0,32);
  }
  function build(options = {}) {
    const cfg = {...defaults,...options};
    for (const [key,min,max] of [['proportion',0.55,1.35],['weight',0.35,1],['spacing',0.12,1.6],['colour',0,1]]) {
      if (!Number.isFinite(cfg[key]) || cfg[key] < min || cfg[key] > max) throw new RangeError(key+' out of range');
    }
    const text = normalize(cfg.word);
    const rows = text ? text.split(' ').flatMap(word => word.match(/.{1,8}/g)) : [];
    const width=900, height=1000, margin=76, usable=width-2*margin;
    const maxLetters=Math.max(1,...rows.map(row=>row.length));
    const unit=Math.min(43,usable/(maxLetters*5*cfg.proportion+(maxLetters-1)*cfg.spacing), 700/Math.max(5,rows.length*6.7-1.7));
    const letterWidth=5*unit*cfg.proportion, letterHeight=5*unit;
    const rects=[], guides=[];
    let index=0;
    rows.forEach((row,rowIndex)=>{
      const y=148+rowIndex*6.7*unit;
      const rowWidth=row.length*letterWidth+(row.length-1)*unit*cfg.spacing;
      const offset=rowIndex%2===0?0:Math.min(unit*1.5,usable-rowWidth);
      Array.from(row).forEach((character,column)=>{
        const x=margin+offset+column*(letterWidth+unit*cfg.spacing);
        guides.push({x,y,w:letterWidth,h:letterHeight,character});
        glyphs[character].forEach((line,r)=>{
          let c=0;
          while(c<5){
            if(line[c]==='0'){c++;continue;}
            const start=c;
            while(c<5&&line[c]==='1')c++;
            const hash=((index+1)*37+r*19+start*11)%100;
            const accent=hash<cfg.colour*100;
            const fill=accent?[palette.red,palette.blue,palette.yellow][(index+r+start)%3]:palette.ink;
            rects.push({x:x+(start+(1-cfg.weight)/2)*unit*cfg.proportion,y:y+(r+(1-cfg.weight)/2)*unit,w:(c-start-1+cfg.weight)*unit*cfg.proportion,h:cfg.weight*unit,fill,letter:index});
          }
        });
        index++;
      });
    });
    return {width,height,text,rects,guides,palette,options:cfg};
  }
  function svg(scene) {
    const n=v=>Number(v.toFixed(4));
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${scene.width}" height="${scene.height}" viewBox="0 0 ${scene.width} ${scene.height}"><title>${scene.text || 'Empty letter study'} - p5.merz</title><desc>A geometric letter study inspired by Theo van Doesburg, using our own letter drawings.</desc><rect width="100%" height="100%" fill="${palette.paper}"/>`+scene.rects.map(r=>`<rect x="${n(r.x)}" y="${n(r.y)}" width="${n(r.w)}" height="${n(r.h)}" fill="${r.fill}"/>`).join('')+'</svg>';
  }
  root.MerzStudy=Object.freeze({build,svg,normalize,defaults,palette});
})(globalThis);
