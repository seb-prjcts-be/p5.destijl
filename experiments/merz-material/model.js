(function(root){
  'use strict';
  function hash(x,y,seed){const n=Math.sin(x*127.1+y*311.7+seed*74.7)*43758.5453;return n-Math.floor(n);}
  function field(x,y,seed){const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;const a=fx*fx*(3-2*fx),b=fy*fy*(3-2*fy);return (1-b)*((1-a)*hash(ix,iy,seed)+a*hash(ix+1,iy,seed))+b*((1-a)*hash(ix,iy+1,seed)+a*hash(ix+1,iy+1,seed));}
  // A few shared page-space contact patches; most of the sheet is untouched.
  function regions(seed){return Array.from({length:3},(_,i)=>({x:i===0?430+(hash(i,1,seed)-.5)*12:45+hash(i,1,seed)*510,y:i===0?360+(hash(i,2,seed)-.5)*70:70+hash(i,2,seed)*540,rx:34+hash(i,3,seed)*40,ry:20+hash(i,4,seed)*35}));}
  function contactRegion(x,y,seed){let v=0;for(const r of regions(seed)){const d=Math.hypot((x-r.x)/r.rx,(y-r.y)/r.ry);if(d<1){const t=1-d;v=Math.max(v,t*t*(3-2*t));}}return v;}
  // Displace actual contour vertices. Each edge tapers to its fixed corners.
  function contour(points,amount,seed,id){const out=[];points.forEach((a,i)=>{const b=points[(i+1)%points.length],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),n=Math.max(1,Math.ceil(len/2));for(let j=0;j<n;j++){const t=j/n,x=a[0]+dx*t,y=a[1]+dy*t;const d=amount*contactRegion(x,y,seed+390)*Math.sin(Math.PI*t)*(field(x/13,y/13,seed+id*19)-.5)*2;out.push([x-d*dy/len,y+d*dx/len]);}});return out;}
  const api={hash,field,regions,contactRegion,contour};if(typeof module!=='undefined')module.exports=api;else root.MaterialStudy=api;
})(typeof globalThis!=='undefined'?globalThis:this);
