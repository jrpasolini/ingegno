import {SUBJECTS,createDemoQuestions,hasSemesterCoverage} from "./bank.js";
import {analyzePerformance,teacherVerdict,examOutcome} from "./performance.js";
const $=id=>document.getElementById(id);
const state={mode:"impara",count:10,time:"none",questions:[],answers:[],current:0,sessionId:null,demoQuestions:[],
  started:0,ticker:null,deadline:0,questionDeadline:0,finishing:false};
const escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function visible(id){for(const page of document.querySelectorAll(".page"))page.classList.toggle("active",page.id===id);window.scrollTo({top:0,behavior:"smooth"});}
function setNotice(id,message){$(id).textContent=message||"";}
// Highlight only known exam topics/actions; every source fragment is escaped.
function markStudyText(value,terms){
  const source=String(value),lower=source.toLocaleLowerCase('pt-BR');let cursor=0,html="";
  const words=[...new Set(terms.filter(Boolean))].sort((a,b)=>b.length-a.length);
  while(cursor<source.length){
    let next=-1,term="";
    for(const word of words){const index=lower.indexOf(word.toLocaleLowerCase('pt-BR'),cursor);if(index>=0&&(next<0||index<next)){next=index;term=word;}}
    if(next<0){html+=escape(source.slice(cursor));break;}
    html+=escape(source.slice(cursor,next))+'<strong class="pen-key">'+escape(source.slice(next,next+term.length))+'</strong>';
    cursor=next+term.length;
  }
  return html;
}
document.querySelectorAll("[data-mode]").forEach(button=>button.addEventListener("click",()=>{
  state.mode=button.dataset.mode;
  document.querySelectorAll("[data-mode]").forEach(b=>{const active=b===button;b.classList.toggle("selected",active);b.setAttribute("aria-pressed",String(active));});
  const sap=state.mode==="sapienza";$("subject-wrap").hidden=sap;$("sapienza-hint").hidden=!sap;
  $("start-btn").querySelector("span").textContent=sap?"ACEITAR O DESAFIO":"COMEÇAR O SIMULADO";
}));
document.querySelectorAll("[data-count]").forEach(button=>button.addEventListener("click",()=>{
  state.count=Number(button.dataset.count);
  document.querySelectorAll("[data-count]").forEach(b=>b.classList.toggle("selected",b===button));
}));
document.querySelectorAll("[data-time]").forEach(button=>button.addEventListener("click",()=>{
  state.time=button.dataset.time;
  document.querySelectorAll("[data-time]").forEach(b=>b.classList.toggle("selected",b===button));
  $("time-hint").textContent=state.time==="none"?"Sem limite de tempo. Respire e raciocine.":
    state.time==="total"?"90 segundos por questão, somados em um único cronômetro.":
    "75 segundos por pergunta. Quando o tempo acaba, seguimos adiante.";
}));
function stopTimer(){clearInterval(state.ticker);state.ticker=null;}
function displayClock(seconds){const s=Math.max(0,Math.ceil(seconds));return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");}
function tick(){
  if(state.finishing)return;
  if(state.time==="none"){$("timer").textContent="SEM LIMITE";return;}
  const deadline=state.time==="total"?state.deadline:state.questionDeadline;
  const remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));
  $("timer").textContent="⏱ "+displayClock(remaining);
  if(remaining<=0){
    if(state.time==="total")finish();
    else if(state.current>=state.questions.length-1)finish();
    else{state.current++;state.questionDeadline=Date.now()+75000;renderQuestion();}
  }
}
async function start(){
  if(state.finishing)return;
  const btn=$("start-btn");btn.disabled=true;
  const configuration=[...document.querySelectorAll('.mode-card,[data-count],[data-time],#subject')];
  const unlock=()=>{btn.disabled=false;configuration.forEach(control=>{control.disabled=false;});};
  configuration.forEach(control=>{control.disabled=true;});
  setNotice("start-notice","Genio está preparando seu desafio…");
  const subjectId=$("subject").value;
  const requestedMode=state.mode;
  let session;
  try{
    const r=await fetch("./api/session",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({mode:requestedMode,...(requestedMode==="impara"?{subjectId}:{}),count:state.count})});
    if(!r.ok){
      if(r.status!==404)throw Error((await r.json().catch(()=>({}))).error||"Falha na API.");
      throw Error("API_OFFLINE");
    }
    session=await r.json();if(!Array.isArray(session.questions)||!session.questions.length)throw Error("Simulado vazio");
    if(requestedMode==="sapienza"&&!hasSemesterCoverage(session.questions,state.count))throw Error("SEMESTER_INCOMPLETE");
  }catch(e){
    if(!["API_OFFLINE","SEMESTER_INCOMPLETE","Failed to fetch"].includes(e.message)&&e.name!=="TypeError"){
      setNotice("start-notice",e.message);unlock();return;
    }
    const qs=createDemoQuestions(state.mode,subjectId,state.count);
    state.demoQuestions=qs;
    session={sessionId:null,engine:"demo",questions:qs.map(q=>({id:q.id,subjectId:q.subjectId,
      subject:SUBJECTS.find(s=>s.id===q.subjectId)?.name||"",topic:q.topic,prompt:q.prompt,options:q.options})),
      notice:(e.message==="SEMESTER_INCOMPLETE"?"A prova recebida não cobria todas as disciplinas. Ativamos uma rodada demonstrativa equilibrada, sem IA. ":"Modo demonstração local: questões sem IA. ")+(qs.length<state.count?"Disponíveis: "+qs.length+".":"")};
  }
  state.sessionId=session.sessionId;state.questions=session.questions;
  state.answers=state.questions.map(()=>null);state.current=0;state.finishing=false;
  state.started=Date.now();state.deadline=Date.now()+state.questions.length*90000;
  state.questionDeadline=Date.now()+75000;
  setNotice("quiz-notice",session.notice||"");
  unlock();stopTimer();visible("quiz");renderQuestion();tick();state.ticker=setInterval(tick,500);
}
function renderQuestion(){
  const q=state.questions[state.current],n=state.current+1;
  $("counter").textContent="QUESTÃO "+String(n).padStart(2,"0")+" / "+String(state.questions.length).padStart(2,"0");
  $("quiz-mode").textContent=state.mode.toUpperCase();
  $("progress-fill").style.width=(100*(state.current+1)/state.questions.length)+"%";
  $("question-tag").textContent=(q.subject||SUBJECTS.find(s=>s.id===q.subjectId)?.name||"DISCIPLINA").toUpperCase()+" / "+q.topic.toUpperCase();
  $("question-text").textContent=q.prompt;
  const letters="ABCD";$("answers").innerHTML=q.options.map((option,i)=>
    '<button type="button" class="answer'+(state.answers[state.current]===i?' selected':'')+
    '" data-option="'+i+'" aria-pressed="'+(state.answers[state.current]===i)+'">'+
    '<span class="letter">'+letters[i]+'</span><span>'+escape(option)+'</span></button>').join("");
  document.querySelectorAll("[data-option]").forEach(btn=>btn.addEventListener("click",()=>{
    state.answers[state.current]=Number(btn.dataset.option);
    renderQuestion();
  }));
  $("answered-summary").textContent=state.answers[state.current]===null?"Selecione uma alternativa.":"Alternativa registrada.";
  $("next-btn").textContent=n===state.questions.length?"CONCLUIR →":"PRÓXIMA QUESTÃO →";
  $("next-btn").disabled=state.answers[state.current]===null;
}
function demoGrade(){
  const results=state.demoQuestions.map((q,i)=>({...q,
    subject:SUBJECTS.find(s=>s.id===q.subjectId)?.name||"",chosenIndex:state.answers[i],
    correct:state.answers[i]===q.correctIndex}));
  const correct=results.filter(x=>x.correct).length;
  return {results,correct,total:results.length,percentage:Math.round(correct*100/results.length)};
}
async function finish(){
  if(state.finishing)return;state.finishing=true;stopTimer();
  const elapsedSeconds=(Date.now()-state.started)/1000;
  setNotice("quiz-notice","Genio está preparando seu veredito…");$("next-btn").disabled=true;
  let grade;
  try{
    if(state.sessionId){
      const r=await fetch("./api/grade",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({sessionId:state.sessionId,answers:state.answers})});
      const data=await r.json();if(!r.ok)throw Error(data.error||"Falha na correção");
      grade=data;
    }else grade=demoGrade();
  }catch(e){
    setNotice("quiz-notice","Não foi possível corrigir: "+e.message+". Você pode sair e iniciar outra sessão.");
    state.finishing=false;return;
  }
  $("score").innerHTML=grade.correct+"<span>/"+grade.total+"</span>";
  const verdict=teacherVerdict(grade.correct,grade.total);
  $("pen-grade").textContent=verdict.note;$("pen-verdict").textContent=verdict.caption;
  $("teacher-grade").dataset.ink=verdict.ink;
  $("percent").textContent=grade.percentage+"% DE ACERTOS";
  $("duration").textContent=displayClock(elapsedSeconds)+" DE ESTUDO";
  $("score-caption").textContent=grade.percentage>=80?"Bravo! Continue aprofundando.":grade.percentage>=50?"Um bom começo. Revise os conceitos.":"Cada erro é uma nova oportunidade de aprender.";
  $("review-count").textContent="· "+(grade.total-grade.correct)+" para revisar";
  const analysis=analyzePerformance(grade.results),tutor=grade.tutor||{...analysis,source:"local"};
  $("strength-topic").textContent=analysis.strengths.map(t=>t.label+` (${t.correct}/${t.total})`).join("; ")||"Continue praticando os tópicos avaliados.";
  $("priority-topic").textContent=analysis.priorities.map(t=>t.label+` (${t.total-t.correct} para revisar)`).join("; ")||"Nenhum erro nos tópicos avaliados.";
  const studyTerms=[...grade.results.map(q=>q.topic),'explique','refaça','novo desafio',grade.correct+' de '+grade.total];
  $("genio-reading").innerHTML=markStudyText(tutor.summary,studyTerms);
  $("study-plan").innerHTML=tutor.steps.map(s=>'<li><span>'+markStudyText(s,studyTerms)+'</span></li>').join("");
  $("tutor-source").textContent=tutor.source==="ai"?"Parecer por IA · "+tutor.model+" · baseado nesta tentativa; pode conter imprecisões.":"Leitura dos seus acertos e erros nesta tentativa · sem parecer gerado por IA.";
  $("review-errors").setAttribute("aria-pressed","false");$("review-empty").hidden=true;
  $("review-errors").textContent="Revisar meus erros";
  $("exam-stamp")?.remove();
  $("review").innerHTML=grade.results.map((q,i)=>{
    const chosen=q.chosenIndex===null?"Sem resposta":q.options[q.chosenIndex];
    const letters="ABCD",annotation=q.correct?(i%2?'Muito bem!':'Boa!'):(q.chosenIndex===null?'Faltou responder!':'Reveja este conceito!');
    const stamp=i===0?'<div id="exam-stamp" class="exam-stamp '+(examOutcome(grade.correct,grade.total)==='APROVADO'?'stamp-approved':'stamp-failed')+'" aria-label="Resultado da prova: '+examOutcome(grade.correct,grade.total)+'">'+examOutcome(grade.correct,grade.total)+'</div>':'';
    return '<article class="review-card '+(q.correct?'is-correct':'is-incorrect')+'">'+stamp+'<svg class="pen-mark" aria-hidden="true"><use href="#'+(q.correct?'pen-check':'pen-cross')+'"/></svg><div class="review-meta"><span>'+escape(q.subject)+' · '+escape(q.topic)+'</span><span class="sr-only">'+
      (q.correct?"Resposta correta":"Resposta incorreta ou não respondida")+'</span></div><h4>'+String(i+1).padStart(2,"0")+'. '+escape(q.prompt)+'</h4>'+
      '<p class="'+(q.correct?"right-answer":"wrong-answer")+'">Sua resposta: <span class="answer-circle">'+(q.chosenIndex===null?'—':letters[q.chosenIndex])+'</span> '+escape(chosen)+'</p>'+
      '<p class="right-answer">Gabarito: <span class="key-letter">'+letters[q.correctIndex]+'</span> '+escape(q.options[q.correctIndex])+'</p>'+
      '<div class="pen-annotation">'+annotation+'</div>'+
      '<p class="explain"><strong>Genio explica:</strong> '+escape(q.explanation)+'</p></article>';
  }).join("");
  visible("result");state.finishing=false;
}
$("start-btn").addEventListener("click",start);
$("next-btn").addEventListener("click",()=>{
  if(state.answers[state.current]===null)return;
  if(state.current===state.questions.length-1)finish();
  else{state.current++;state.questionDeadline=Date.now()+75000;renderQuestion();}
});
$("quit-btn").addEventListener("click",()=>{
  if(confirm("Sair do simulado? As respostas desta sessão serão perdidas.")){
    stopTimer();state.sessionId=null;state.finishing=false;visible("welcome");
  }
});
$("again-btn").addEventListener("click",()=>{stopTimer();visible("welcome");setNotice("start-notice","");});
$("retry-btn").addEventListener("click",async()=>{const btn=$("retry-btn");btn.disabled=true;visible("welcome");try{await start();}finally{btn.disabled=false;}});
$("review-errors").addEventListener("click",()=>{
  const btn=$("review-errors"),filter=btn.getAttribute("aria-pressed")!=="true";
  btn.setAttribute("aria-pressed",String(filter));btn.textContent=filter?"Ver gabarito completo":"Revisar meus erros";
  document.querySelectorAll("#review .review-card").forEach(card=>{card.hidden=filter&&card.classList.contains("is-correct");});
  $("review-empty").hidden=!(filter&&!document.querySelector("#review .is-incorrect"));
  const firstVisible=[...document.querySelectorAll('#review .review-card')].find(card=>!card.hidden);
  const stamp=$("exam-stamp");
  if(stamp)(firstVisible||$("review-empty")).prepend(stamp);
});
