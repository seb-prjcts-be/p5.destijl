// A complete instance-mode p5 study. Geometry and shader remain outside Merz's API.
const W=600,H=760,study=MaterialStudy;
const state={seed:17,geometry:.2,ink:.12,scratches:.18,stains:.15,paper:false};
const views=new Map();
const variants=[['clean',false,false,false],['geometry-sheet',true,false,false],['ink-sheet',false,true,false],['both',true,true,false],['paper-sheet',false,false,true],['scratch-sheet',false,false,false,true,false],['stain-sheet',false,false,true,false,true]];
const vertex=`attribute vec2 position; varying vec2 uv; void main(){uv=(position+1.0)*.5;gl_Position=vec4(position,0.,1.);}`;
const fragment=`precision highp float; varying vec2 uv; uniform sampler2D source,wear; uniform vec2 size; uniform float seed,amount,scratchAmount;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7))+seed*74.7)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);}
void main(){vec4 c=texture2D(source,uv);vec2 p=vec2(uv.x,1.-uv.y)*size;
// Local contact patches leave the rest of the ink unchanged.
float contact=noise(p/25.)*.6+noise(p/7.)*.4;
float zone=texture2D(wear,uv).g;float pore=noise(p/1.4);float missing=zone*smoothstep(.79,.91,pore+(contact-.5)*.5);
float scar=texture2D(wear,uv).r;float keep=(1.-amount*missing)*(1.-scratchAmount*scar);float density=1.-amount*.025*zone*smoothstep(.55,.85,contact);
gl_FragColor=vec4(c.rgb*density,c.a*keep);}`;
function shaderPass(canvas,amount,seed,scratches=0){
 if(amount===0 && scratches===0)return canvas;
 const output=document.createElement('canvas');output.width=W;output.height=H;
 const gl=output.getContext('webgl',{premultipliedAlpha:false,preserveDrawingBuffer:true,alpha:true});
 if(!gl)throw new Error('This study needs WebGL for its ink comparison.');
 function compile(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}
 const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment),program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));gl.useProgram(program);
 const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const loc=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
 const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,canvas);
 const wear=gl.createTexture();gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,wear);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,scratchMask(seed));
 gl.uniform1i(gl.getUniformLocation(program,'wear'),1);gl.uniform1f(gl.getUniformLocation(program,'scratchAmount'),scratches);
 gl.uniform1i(gl.getUniformLocation(program,'source'),0);gl.uniform2f(gl.getUniformLocation(program,'size'),W,H);gl.uniform1f(gl.getUniformLocation(program,'seed'),seed+307);gl.uniform1f(gl.getUniformLocation(program,'amount'),amount);gl.viewport(0,0,W,H);gl.drawArrays(gl.TRIANGLES,0,6);
 if(gl.getError()!==gl.NO_ERROR)throw new Error('The ink shader did not complete.');
 // Copy before releasing the temporary GPU context.
 const copy=document.createElement('canvas');copy.width=W;copy.height=H;copy.getContext('2d').drawImage(output,0,0);gl.deleteTexture(tex);gl.deleteTexture(wear);gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);gl.getExtension('WEBGL_lose_context')?.loseContext();return copy;
}
// Fixed sparse contact tracks. Changing strength never redistributes the marks.
function scratchMask(seed){const c=document.createElement('canvas');c.width=W;c.height=H;const ctx=c.getContext('2d');ctx.fillStyle='black';ctx.fillRect(0,0,W,H);ctx.lineCap='round';
 // Green carries the shared contact support; red carries sparse abrasion.
 for(const r of study.regions(seed+601)){ctx.save();ctx.translate(r.x,r.y);ctx.scale(r.rx,r.ry);const g=ctx.createRadialGradient(0,0,0,0,0,1);g.addColorStop(0,'rgb(0,255,0)');g.addColorStop(.5,'rgb(0,128,0)');g.addColorStop(1,'rgb(0,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,1,0,Math.PI*2);ctx.fill();ctx.restore();}
 ctx.globalCompositeOperation='lighter';const direction=(study.hash(0,0,seed+401)-.5)*.7-.25;
 for(const [i,r] of study.regions(seed+601).entries()){const x=i===0?r.x-5:r.x-r.rx*.3,y=r.y,length=8+study.hash(i,3,seed+401)*16,angle=direction+(study.hash(i,4,seed+401)-.5)*.15;
 for(let strand=0;strand<3;strand++){ctx.strokeStyle=`rgba(255,0,0,${strand===0?.7:.2})`;ctx.lineWidth=strand===0?.55:.3;ctx.beginPath();for(let j=0;j<=12;j++){const t=j/12,breakup=.35*(study.field(t*5,i,seed+407)-.5),xx=x+Math.cos(angle)*length*t,yy=y+Math.sin(angle)*length*t+strand*1.4+breakup;if(j===0)ctx.moveTo(xx,yy);else ctx.lineTo(xx,yy);}ctx.stroke();}}
 return c;
}
// Small translucent deposits on the paper, rather than holes through the ink.
function stains(p,amount){if(amount===0)return;const ctx=p.drawingContext;ctx.save();
 for(let i=0;i<4;i++){const x=30+study.hash(i,1,state.seed+503)*(W-60),y=30+study.hash(i,2,state.seed+503)*(H-60),r=1.5+study.hash(i,3,state.seed+503)*5;
 ctx.save();ctx.translate(x,y);ctx.scale(1,.55+study.hash(i,4,state.seed+503)*.65);const g=ctx.createRadialGradient(0,0,0,0,0,r);g.addColorStop(0,`rgba(119,91,61,${amount*.16})`);g.addColorStop(.45,`rgba(139,113,78,${amount*.08})`);g.addColorStop(1,'rgba(139,113,78,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.restore();}
 ctx.restore();
}
function paper(p){
 p.loadPixels();for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=4*(y*W+x);const broad=study.field(x/42,y/42,state.seed+101)-.5;const fine=study.hash(x,y,state.seed+111)-.5;const v=broad*8+fine*2;p.pixels[i]=244+v;p.pixels[i+1]=243+v;p.pixels[i+2]=235+v;p.pixels[i+3]=255;}p.updatePixels();
 p.noFill();p.strokeWeight(.45);for(let i=0;i<1900;i++){const x=study.hash(i,1,state.seed+101)*W,y=study.hash(i,2,state.seed+101)*H,len=2+study.hash(i,3,state.seed+101)*8,angle=study.hash(i,4,state.seed+101)*Math.PI*2;p.stroke(102,94,78,12+study.hash(i,5,state.seed+101)*18);p.line(x,y,x+Math.cos(angle)*len,y+Math.sin(angle)*len);}p.noStroke();for(let i=0;i<140;i++){p.fill(90,82,67,30);p.ellipse(study.hash(i,6,state.seed+101)*W,study.hash(i,7,state.seed+101)*H,.6+study.hash(i,8,state.seed+101)*1.1,.5+study.hash(i,9,state.seed+101));}
}
function objects(p,amount){let id=0;function shape(points,c,limit=4,holes=[]){p.fill(c);p.noStroke();p.beginShape();for(const xy of study.contour(points,Math.min(amount,limit),state.seed+211,id++))p.vertex(...xy);for(const hole of holes){p.beginContour();for(const xy of study.contour(hole,Math.min(amount,limit,.3),state.seed+211,id++))p.vertex(...xy);p.endContour();}p.endShape(p.CLOSE);}function rect(x,y,w,h,c){shape([[x,y],[x+w,y],[x+w,y+h],[x,y+h]],c,Math.min(w,h)*.15);}
 const black='#20201e',red='#b92d26';rect(48,60,220,14,red);
 p.fill(black);p.noStroke();p.textFont('Georgia');p.textSize(66);p.text('Fundsachen',45,194);
 // Filled outlines keep openings empty, including over another colour.
 shape([[320,270],[540,270],[540,507],[508,507],[508,306],[450,306],[450,417],[414,417],[414,306],[356,306],[356,507],[320,507]],red);
 // One R outline, with a genuine counter and a connected diagonal leg.
 shape([[50,276],[151,276],[182,295],[182,342],[158,361],[128,361],[189,491],[146,491],[89,361],[81,361],[81,491],[50,491]],black,2,[[[81,303],[81,334],[145,334],[151,328],[151,309],[145,303]]]);
 // Negative opening assembled by separate bands; no background-colour overpaint.
 rect(50,534,350,7,black);rect(50,563,350,2,black);shape([[410,527],[545,554],[538,578],[403,551]],red);
 rect(280,460,140,29,black);
 p.fill(black);p.textFont('monospace');p.textSize(15);p.text('1 / 2 / 3',50,657);p.textSize(11);p.text('Kunst ist Form.',50,689);
}
function render(p,g,s,onlyPaper,scratchOnly=false,stainOnly=false){p.clear();const ground=onlyPaper||state.paper;if(ground)paper(p);else p.background('#f7f7f2');if(stainOnly||(g&&s&&state.paper))stains(p,state.stains);const layer=p.createGraphics(W,H);layer.pixelDensity(1);layer.clear();objects(layer,g?state.geometry:0);const canvas=shaderPass(layer.canvas,s?state.ink:0,state.seed,(scratchOnly||(g&&s))?state.scratches:0);p.drawingContext.drawImage(canvas,0,0);layer.remove();}
function update(){document.getElementById('geometry-value').value=state.geometry;document.getElementById('ink-value').value=state.ink;for(const id of ['scratches','stains'])document.getElementById(id+'-value').value=state[id];try{for(const {p,g,s,paper,scratchOnly,stainOnly} of views.values())render(p,g,s,paper,scratchOnly,stainOnly);document.getElementById('status').textContent=`Seven sheets ready. Pattern ${state.seed}. Each output is 600 × 760 pixels.`;}catch(e){document.getElementById('status').textContent=e.message;console.error(e);}}
for(const [id,g,s,paperFlag,scratchOnly,stainOnly] of variants)new p5(p=>{p.setup=()=>{p.createCanvas(W,H).parent(id);p.pixelDensity(1);p.noLoop();views.set(id,{p,g,s,paper:paperFlag,scratchOnly,stainOnly});render(p,g,s,paperFlag,scratchOnly,stainOnly);p.describe('A typographic material comparison with red and black shapes and open letter spaces.');if(views.size===7)update();};},document.getElementById(id));
for(const id of ['seed','geometry','ink','scratches','stains','paper'])document.getElementById(id).addEventListener('change',e=>{state[id]=id==='paper'?e.target.checked:Number(e.target.value);update();});
document.getElementById('actual').addEventListener('change',e=>document.querySelector('.matrix').classList.toggle('actual',e.target.checked));
document.getElementById('reset').addEventListener('click',()=>{Object.assign(state,{seed:17,geometry:.2,ink:.12,scratches:.18,stains:.15,paper:false});for(const id of ['seed','geometry','ink','scratches','stains'])document.getElementById(id).value=state[id];document.getElementById('paper').checked=false;update();});
for(const button of document.querySelectorAll('[data-save]'))button.addEventListener('click',()=>{const id=button.dataset.save;views.get(id).p.saveCanvas(`p5.merz-material-${id}-${state.seed}`,'png');});

// Run from the check button; compare final RGBA pixels and restore the selected state.
function fingerprint(p){const a=p.drawingContext.getImageData(0,0,W,H).data;let h=2166136261;for(const v of a)h=Math.imul(h^v,16777619);return h>>>0;}
document.getElementById('check').addEventListener('click',()=>{
 const before={...state},results=[];
 try{
 const hashes=()=>Object.fromEntries([...views].map(([id,v])=>[id,fingerprint(v.p)]));
 Object.assign(state,{seed:17,geometry:.2,ink:.12,scratches:.18,stains:.15,paper:false});update();const a=hashes();update();results.push(['repeat render',JSON.stringify(a)===JSON.stringify(hashes())]);
 state.seed=41;update();const b=hashes();results.push(['seed changes each treatment',a.both!==b.both&&a['paper-sheet']!==b['paper-sheet']&&a['geometry-sheet']!==b['geometry-sheet']&&a['scratch-sheet']!==b['scratch-sheet']&&a['stain-sheet']!==b['stain-sheet']]);results.push(['clean unaffected by seed',a.clean===b.clean]);
 state.seed=17;update();results.push(['return to seed',JSON.stringify(a)===JSON.stringify(hashes())]);
 Object.assign(state,{geometry:0,ink:0,scratches:0,stains:0});update();const z=hashes();results.push(['zero restores clean object variants',['geometry-sheet','ink-sheet','both'].every(id=>z[id]===z.clean)]);
 results.push(['zero scratches restores clean',z['scratch-sheet']===z.clean]);results.push(['zero stains preserves paper',z['stain-sheet']===z['paper-sheet']]);
 results.push(['independent contributions',a.clean!==a['geometry-sheet']&&a.clean!==a['ink-sheet']&&a.both!==a['geometry-sheet']]);
 Object.assign(state,{geometry:.2,ink:.12,scratches:.18,stains:.15,paper:false});update();
 function difference(left,right){const a=views.get(left).p.drawingContext.getImageData(0,0,W,H).data,b=views.get(right).p.drawingContext.getImageData(0,0,W,H).data;let changed=0,max=0;for(let i=0;i<a.length;i+=4){let d=0;for(let k=0;k<3;k++)d=Math.max(d,Math.abs(a[i+k]-b[i+k]));if(d)changed++;max=Math.max(max,d);}return {percent:100*changed/(W*H),max};}
 const scratches=difference('scratch-sheet','clean'),spots=difference('stain-sheet','paper-sheet');
 results.push([`sparse scratches (${scratches.percent.toFixed(3)}% of page pixels)`,scratches.percent>0&&scratches.percent<1]);
 results.push([`local stains (${spots.percent.toFixed(3)}% of page pixels; max RGB change ${spots.max})`,spots.percent>0&&spots.percent<1&&spots.max<12]);
 }catch(e){results.push([e.message,false]);}
 Object.assign(state,before);update();document.getElementById('checks').textContent=results.map(([name,ok])=>(ok?'PASS':'FAIL')+' '+name).join(' / ');
});
