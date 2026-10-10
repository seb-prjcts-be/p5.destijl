const button=document.getElementById('run');
async function runCase(path) {
  const frame=document.createElement('iframe');
  frame.title=path;frame.style.cssText='width:100%;height:220px;border:1px solid #d2d2c9';
  const url=new URL(path,location.href);
  if(document.getElementById('full').checked&&path.startsWith('fundsachen-'))url.searchParams.set('full','1');
  return new Promise(resolve=>{
    let timer, finished=false;
    const finish=(ok,detail)=>{if(finished)return;finished=true;clearInterval(timer);frame.remove();resolve({ok,detail});};
    const started=performance.now();
    let clicked=false;
    frame.onload=()=>{
      const win=frame.contentWindow;
      win.addEventListener('error',e=>finish(false,e.message));
      win.addEventListener('unhandledrejection',e=>finish(false,String(e.reason)));
    };
    frame.onerror=()=>finish(false,'Could not load test page');
    frame.src=url.href;document.getElementById('host').append(frame);
    timer=setInterval(()=>{
      try {
        const doc=frame.contentDocument;
        const run=doc.querySelector('#run,#run-checks');
        if(run&&!clicked&&(path!=='merz-surface-browser.html'||doc.querySelector('canvas'))){
          clicked=true;run.click();
        }
        const result=doc.querySelector('#result')?.textContent||'';
        if(/(^|\n)FAIL[: ]/.test(result))return finish(false,result);
        const complete=path.startsWith('audit-')?result.includes('DONE'):
          path==='merz-standalone-browser.html'?result.includes('sketches rendered without'):
          /^PASS[: ]/.test(result.trim());
        if(complete)return finish(true,result.trim());
      }catch(error){return finish(false,error.message);}
      if(performance.now()-started>90000)finish(false,'Timed out after 90 seconds');
    },200);
  });
}
button.addEventListener('click',async()=>{
  button.disabled=true;document.getElementById('full').disabled=true;
  const status=document.getElementById('status'),list=document.getElementById('results');list.replaceChildren();
  let failed=0;
  try{
    const response=await fetch('browser-cases.json');if(!response.ok)throw new Error('Cannot load browser test list');
    const cases=await response.json();
    for(const [index,path] of cases.entries()){
      status.textContent='Running '+(index+1)+' / '+cases.length+': '+path;
      const result=await runCase(path);if(!result.ok)failed++;
      const row=document.createElement('li'),details=document.createElement('details'),summary=document.createElement('summary'),pre=document.createElement('pre');
      summary.textContent=(result.ok?'PASS ':'FAIL ')+path;pre.textContent=result.detail;
      details.append(summary,pre);row.append(details);list.append(row);
    }
    status.textContent=(failed?'FAIL: '+failed+' of '+cases.length:'PASS: all '+cases.length)+' browser pages completed.';
  }catch(error){status.textContent='FAIL: '+error.message;}
  finally{button.disabled=false;document.getElementById('full').disabled=false;}
});
