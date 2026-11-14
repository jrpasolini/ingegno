import http from "node:http";
import {readFile} from "node:fs/promises";
import {randomUUID} from "node:crypto";
import {SUBJECTS,createDemoQuestions} from "./public/bank.js";
const BASE="/ingegno", MODEL=process.env.NVIDIA_MODEL||"nvidia/nemotron-3.5-lightning-30b-a3b", sessions=new Map(),limits=new Map();
const send=(res,status,data)=>{res.writeHead(status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"});res.end(JSON.stringify(data));};
const publicQ=q=>({id:q.id,subjectId:q.subjectId,subject:SUBJECTS.find(s=>s.id===q.subjectId)?.name||"",topic:q.topic,prompt:q.prompt,options:q.options});
async function body(req){let s="";for await(const c of req){s+=c;if(s.length>16000)throw Error("Requisição longa");}return JSON.parse(s||"{}");}
function limit(req){const ip=String(req.headers["x-forwarded-for"]||req.socket.remoteAddress).split(",")[0];const n=Date.now(),hist=(limits.get(ip)||[]).filter(t=>n-t<600000);if(hist.length>=5)return false;hist.push(n);limits.set(ip,hist);return true;}
function validate(raw,mode,subjectId,count){
  if(!Array.isArray(raw)||raw.length!==count)throw Error("Quantidade inesperada");
  const ids=new Set(mode==="impara"?[subjectId]:SUBJECTS.map(s=>s.id)), seen=new Set();
  const out=raw.map((q,i)=>{
    if(!ids.has(q.subjectId)||typeof q.prompt!=="string"||q.prompt.length<15||
      !Array.isArray(q.options)||q.options.length!==4||q.options.some(o=>typeof o!=="string"||!o.trim())||
      new Set(q.options.map(o=>o.trim().toLowerCase())).size!==4||
      !Number.isInteger(q.correctIndex)||q.correctIndex<0||q.correctIndex>3||
      typeof q.explanation!=="string"||q.explanation.length<20)throw Error("Questão inválida");
    if(seen.has(q.prompt.toLowerCase()))throw Error("Questão repetida");seen.add(q.prompt.toLowerCase());
    return {id:"q"+i,subjectId:q.subjectId,topic:String(q.topic||"Conceitos").slice(0,90),
      prompt:q.prompt.slice(0,700),options:q.options.map(x=>x.slice(0,250)),correctIndex:q.correctIndex,explanation:q.explanation.slice(0,1200)};
  });
  if(mode==="sapienza"&&count>=5&&new Set(out.map(q=>q.subjectId)).size<5)throw Error("Distribuição incompleta");
  return out;
}
async function generate(mode,subjectId,count){
  const selected=mode==="sapienza"?SUBJECTS:SUBJECTS.filter(s=>s.id===subjectId);
  const syllabus=selected.map(s=>s.id+": "+s.name+" ("+s.topics.join(", ")+")").join("; ");
  const task="Produza EXATAMENTE "+count+" questões universitárias ORIGINAIS em português brasileiro, quatro opções distintas e UMA correta. Programa: "+syllabus+
    ". Não alegue conhecer PDFs completos. Modo Sapienza: distribua por todas as CINCO disciplinas, com pelo menos uma questão de cada. "+
    "Questões objetivas, sem ambiguidades, explicações didáticas, respostas corretas em posições variadas. "+
    "Responda somente ARRAY JSON com objetos {subjectId,topic,prompt,options:[quatro strings],correctIndex:inteiro 0..3,explanation:string}.";
  const c=new AbortController(), t=setTimeout(()=>c.abort(),75000);
  try{
    const r=await fetch("https://integrate.api.nvidia.com/v1/chat/completions",{
      method:"POST",signal:c.signal,headers:{"Authorization":"Bearer "+process.env.NVIDIA_API_KEY,"content-type":"application/json"},
      body:JSON.stringify({model:MODEL,messages:[{role:"system",content:"Você é Genio, tutor acadêmico. Devolva exclusivamente JSON válido."},{role:"user",content:task}],
        stream:false,temperature:0.6,top_p:0.95,max_tokens:7500,chat_template_kwargs:{enable_thinking:false}})});
    if(!r.ok)throw Error("NVIDIA HTTP "+r.status);
    const data=await r.json(),raw=String(data.choices?.[0]?.message?.content||"").replace(/<think>[\s\S]*?<\/think>/g,"");
    const a=raw.indexOf("["),b=raw.lastIndexOf("]");
    if(a<0||b<a)throw Error("JSON ausente");
    return validate(JSON.parse(raw.slice(a,b+1)),mode,subjectId,count);
  }finally{clearTimeout(t);}
}
async function api(req,res,path){
  if(path==="/api/health"&&req.method==="GET")return send(res,200,{ok:true,version:"0.1.0",aiConfigured:Boolean(process.env.NVIDIA_API_KEY),model:MODEL});
  if(path==="/api/subjects"&&req.method==="GET")return send(res,200,{subjects:SUBJECTS});
  if(path==="/api/session"&&req.method==="POST"){
    let p;try{p=await body(req);}catch{return send(res,400,{error:"Dados inválidos"});}
    const n=Number(p.count);
    if(!["impara","sapienza"].includes(p.mode)||![5,10,15,20].includes(n)||
      (p.mode==="impara"&&!SUBJECTS.some(s=>s.id===p.subjectId)))return send(res,400,{error:"Configuração inválida"});
    let q=null,engine="demo",notice="";
    if(process.env.NVIDIA_API_KEY){
      if(!limit(req))return send(res,429,{error:"Limite de gerações atingido (5 a cada 10 minutos)."});
      try{q=await generate(p.mode,p.subjectId,n);engine="nemotron";notice="Questões geradas por IA: ainda não revisadas por especialista.";}
      catch(e){console.error("NVIDIA:",e.message);notice="IA indisponível; banco demonstrativo ativado.";}
    }else{notice="Modo demonstração: configure NVIDIA_API_KEY no Render para usar o Nemotron.";}
    if(!q)q=createDemoQuestions(p.mode,p.subjectId,n);
    if(q.length<n)notice+=" Apenas "+q.length+" questões demonstrativas disponíveis.";
    for(const [id,s] of sessions)if(Date.now()-s.time>3600000)sessions.delete(id);
    if(sessions.size>250)sessions.delete(sessions.keys().next().value);
    const sessionId=randomUUID();sessions.set(sessionId,{time:Date.now(),questions:q});
    return send(res,200,{sessionId,engine,notice,actualCount:q.length,questions:q.map(publicQ)});
  }
  if(path==="/api/grade"&&req.method==="POST"){
    let p;try{p=await body(req);}catch{return send(res,400,{error:"Respostas inválidas"});}
    const s=sessions.get(p.sessionId);
    if(!s||Date.now()-s.time>3600000)return send(res,404,{error:"Sessão expirada"});
    if(!Array.isArray(p.answers)||p.answers.length!==s.questions.length||
      p.answers.some(x=>x!==null&&(!Number.isInteger(x)||x<0||x>3)))return send(res,400,{error:"Respostas inválidas"});
    const results=s.questions.map((q,i)=>({...publicQ(q),correctIndex:q.correctIndex,explanation:q.explanation,
      chosenIndex:p.answers[i],correct:p.answers[i]===q.correctIndex}));
    sessions.delete(p.sessionId);const correct=results.filter(x=>x.correct).length;
    return send(res,200,{correct,total:results.length,percentage:Math.round(correct*100/results.length),results});
  }
  return send(res,404,{error:"Rota não encontrada"});
}
async function handler(req,res){
  const path=new URL(req.url||"/","http://localhost").pathname;
  if(path==="/health")return send(res,200,{ok:true});
  if(path==="/"||path===BASE){res.writeHead(302,{location:BASE+"/"});res.end();return;}
  if(path.startsWith(BASE+"/api/"))return api(req,res,path.slice(BASE.length));
  if(!["GET","HEAD"].includes(req.method))return send(res,405,{error:"Método inválido"});
  const files={"/ingegno/":["index.html","text/html"],"/ingegno/index.html":["index.html","text/html"],
    "/ingegno/app.js":["app.js","text/javascript"],"/ingegno/styles.css":["styles.css","text/css"],
    "/ingegno/bank.js":["bank.js","text/javascript"],
    "/ingegno/assets/einstein-matricial.webp":["assets/einstein-matricial.webp","image/webp"],
    "/ingegno/assets/einstein-matricial-original.png":["assets/einstein-matricial-original.png","image/png"],
    "/ingegno/assets/gradiente-msx-polaroid.webp":["assets/gradiente-msx-polaroid.webp","image/webp"]};
  if(!files[path])return send(res,404,{error:"Não encontrado"});
  const [file,mime]=files[path],data=await readFile(new URL("./public/"+file,import.meta.url));
  res.writeHead(200,{"content-type":mime.startsWith("image/")?mime:mime+"; charset=utf-8","x-content-type-options":"nosniff",
    "content-security-policy":"default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; connect-src 'self'; img-src 'self' data:; base-uri 'self'"});
  res.end(req.method==="HEAD"?undefined:data);
}
http.createServer((req,res)=>Promise.resolve(handler(req,res)).catch(e=>{
  console.error("Servidor:",e.message);if(!res.headersSent)send(res,500,{error:"Erro interno"});
})).listen(Number(process.env.PORT||3000),"0.0.0.0",()=>console.log("Ingegno pronto"));
