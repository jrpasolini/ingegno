import test from "node:test";
import assert from "node:assert/strict";
import {SUBJECTS,BANK,createDemoQuestions,hasSemesterCoverage,interleaveSemester,createSemesterAllocation} from "../public/bank.js";

test("seis disciplinas e quatro alternativas por questão",()=>{
  assert.equal(SUBJECTS.length,6);
  assert.equal(new Set(SUBJECTS.map(s=>s.id)).size,6);
  for(const s of SUBJECTS){
    assert.ok(BANK[s.id].length>=5);
    const qs=createDemoQuestions("impara",s.id,5);
    assert.equal(qs.length,5);
    for(const q of qs){
      assert.equal(q.options.length,4);
      assert.ok(q.correctIndex>=0&&q.correctIndex<4);
      assert.equal(new Set(q.options).size,4);
      assert.ok(q.explanation.length>10);
    }
  }
});

test("Redes de Computadores possui vinte questões autorais de demonstração",()=>{
  const qs=createDemoQuestions("impara","redes",20);
  assert.equal(qs.length,20);
  assert.equal(new Set(qs.map(q=>q.prompt)).size,20);
  assert.ok(qs.some(q=>q.topic==="Modelo OSI"));
  assert.ok(qs.some(q=>q.topic.includes("Atraso")));
  assert.ok(qs.some(q=>q.topic.includes("História")));
});

test("Sapienza com cinco questões seleciona cinco das seis matérias",()=>{
  for(let i=0;i<25;i++){
    const qs=createDemoQuestions("sapienza",null,5);
    assert.equal(qs.length,5);
    assert.equal(new Set(qs.map(q=>q.subjectId)).size,5);
    assert.equal(hasSemesterCoverage(qs,5),true);
  }
});

test("Sapienza com dez, quinze ou vinte questões cobre todas as seis",()=>{
  for(const count of [10,15,20]){
    const qs=createDemoQuestions("sapienza",null,count);
    assert.ok(hasSemesterCoverage(qs,count));
    const per=SUBJECTS.map(s=>qs.filter(q=>q.subjectId===s.id).length);
    assert.ok(per.every(n=>n>=Math.floor(count/6)&&n<=Math.ceil(count/6)));
    assert.equal(per.reduce((a,b)=>a+b,0),count);
    const mixed=interleaveSemester([...qs].sort((a,b)=>a.subjectId.localeCompare(b.subjectId)));
    assert.ok(hasSemesterCoverage(mixed,count));
    for(let i=0;i+6<=count;i+=6){
      assert.equal(new Set(mixed.slice(i,i+6).map(q=>q.subjectId)).size,6);
    }
    assert.deepEqual(new Set(mixed.map(q=>q.id)),new Set(qs.map(q=>q.id)));
  }
});

test("a alocação da geração por IA usa quantidades inteiras e equilibradas",()=>{
  for(const count of [5,10,15,20]){
    for(let n=0;n<10;n++){
      const allocation=createSemesterAllocation(count);
      assert.deepEqual(new Set(Object.keys(allocation)),new Set(SUBJECTS.map(s=>s.id)));
      assert.equal(Object.values(allocation).reduce((a,b)=>a+b,0),count);
      assert.ok(Object.values(allocation).every(x=>x>=Math.floor(count/6)&&x<=Math.ceil(count/6)));
    }
  }
});

test("rejeita provas incompletas, enviesadas e matérias desconhecidas",()=>{
  assert.equal(hasSemesterCoverage(createDemoQuestions("impara","agil",5),5),false);
  const qs=createDemoQuestions("sapienza",null,10);
  const groups=Object.groupBy(qs,q=>q.subjectId);
  const repeated=Object.keys(groups).filter(id=>groups[id].length===2);
  assert.ok(repeated.length>=2);
  const tampered=qs.map(q=>({...q}));
  tampered.find(q=>q.subjectId===repeated[1]).subjectId=repeated[0];
  assert.equal(hasSemesterCoverage(tampered,10),false);
  assert.equal(hasSemesterCoverage([{subjectId:"nao-existe"}],1),false);
  assert.equal(hasSemesterCoverage(qs.slice(0,9),10),false);
});
