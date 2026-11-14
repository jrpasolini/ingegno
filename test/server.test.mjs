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
  }finally{child.kill();}
});
