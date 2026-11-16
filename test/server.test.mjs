import test from "node:test";
import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {setTimeout as sleep} from "node:timers/promises";
test("backend responde, cria sessão e corrige deterministicamente",async()=>{
  const port=33000+Math.floor(Math.random()*2000);
  const origin="http://127.0.0.1:"+port;
  const child=spawn(process.execPath,["server.mjs"],{env:{...process.env,PORT:String(port),NVIDIA_API_KEY:""},stdio:"pipe"});
  try{
    let ready=false;
    for(let i=0;i<50;i++){
      try{const r=await fetch(origin+"/health");if(r.ok){ready=true;break;}}catch{}
      await sleep(80);
    }
    assert.ok(ready,"O servidor precisa iniciar");
    const redirect=await fetch(origin+"/ingegno",{redirect:"manual"});
    assert.equal(redirect.status,302);
    assert.equal(redirect.headers.get("location"),"/ingegno/");
    const home=await fetch(origin+"/ingegno/");
    assert.equal(home.status,200);
    assert.match(await home.text(),/GENIO/);
    const portrait=await fetch(origin+"/ingegno/assets/einstein-matricial-original.png");
    assert.equal(portrait.status,200);
    assert.equal(portrait.headers.get("content-type"),"image/png");
    const portraitBytes=Buffer.from(await portrait.arrayBuffer());
    assert.equal(portraitBytes.subarray(0,8).toString("hex"),"89504e470d0a1a0a");
    const request=await fetch(origin+"/ingegno/api/session",{method:"POST",headers:{"content-type":"application/json"},
      body:JSON.stringify({mode:"sapienza",count:5})});
    assert.equal(request.status,200);
    const s=await request.json();
    assert.equal(s.engine,"demo");assert.equal(s.questions.length,5);
    assert.equal(new Set(s.questions.map(q=>q.subjectId)).size,5);
    assert.ok(s.questions.every(q=>!("correctIndex" in q)));
    const graded=await fetch(origin+"/ingegno/api/grade",{method:"POST",headers:{"content-type":"application/json"},
      body:JSON.stringify({sessionId:s.sessionId,answers:[null,null,null,null,null]})});
    assert.equal(graded.status,200);
    const result=await graded.json();
    assert.equal(result.correct,0);assert.equal(result.total,5);
    assert.ok(result.results.every(q=>Number.isInteger(q.correctIndex)&&q.explanation));
    assert.equal(result.tutor.source,"local");
    assert.match(result.tutor.summary,/0 de 5/);
    assert.ok(result.tutor.steps.length>0);
    const performanceModule=await fetch(origin+"/ingegno/performance.js");
    assert.equal(performanceModule.status,200);
    const manifestResponse=await fetch(origin+'/ingegno/manifest.webmanifest');
    assert.equal(manifestResponse.status,200);
    assert.match(manifestResponse.headers.get('content-type'),/application\/manifest\+json/);
    const manifest=await manifestResponse.json();
    assert.equal(manifest.scope,'/ingegno/');assert.equal(manifest.start_url,'/ingegno/');
    for(const icon of [...manifest.icons,{src:'./assets/apple-touch-icon.png'}]){
      const response=await fetch(new URL(icon.src,origin+'/ingegno/manifest.webmanifest'));
      assert.equal(response.status,200);assert.equal(response.headers.get('content-type'),'image/png');
      const bytes=Buffer.from(await response.arrayBuffer());
      assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
      if(icon.sizes)assert.equal(bytes.readUInt32BE(16)+'x'+bytes.readUInt32BE(20),icon.sizes);
    }
    const worker=await fetch(origin+'/ingegno/sw.js');assert.equal(worker.status,200);
    assert.match(worker.headers.get('content-type'),/javascript/);
    const pwa=await fetch(origin+'/ingegno/pwa.js');assert.equal(pwa.status,200);
    const semester=await fetch(origin+'/ingegno/api/session',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({mode:'sapienza',subjectId:'agil',count:20})});
    const semesterData=await semester.json();assert.equal(semesterData.questions.length,20);
    const sixCounts=['agil','riscos','planejamento','criacao','interfaces','redes'].map(id=>semesterData.questions.filter(q=>q.subjectId===id).length);
    assert.ok(sixCounts.every(n=>n>=3&&n<=4));
    const listResponse=await fetch(origin+'/ingegno/api/subjects');
    const list=await listResponse.json();
    assert.equal(list.subjects.length,6);
    assert.ok(list.subjects.some(s=>s.id==='redes'&&s.name==='Redes de Computadores'));
    const networkSession=await fetch(origin+'/ingegno/api/session',{method:'POST',
      headers:{'content-type':'application/json'},body:JSON.stringify({mode:'impara',subjectId:'redes',count:20})});
    assert.equal(networkSession.status,200);
    const networkData=await networkSession.json();
    assert.equal(networkData.questions.length,20);
    assert.ok(networkData.questions.every(q=>q.subjectId==='redes'&&!Object.hasOwn(q,'correctIndex')));
    const networkModule=await fetch(origin+'/ingegno/networks.js');
    assert.equal(networkModule.status,200);
    assert.match(networkModule.headers.get('content-type'),/text\/javascript/);
  }finally{child.kill();}
});
