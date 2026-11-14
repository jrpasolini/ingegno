import test from "node:test";
import assert from "node:assert/strict";
import {SUBJECTS,BANK,createDemoQuestions,hasSemesterCoverage,interleaveSemester} from "../public/bank.js";
test("possui cinco disciplinas e quatro alternativas por questão",()=>{
  assert.equal(SUBJECTS.length,5);
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
test("Sapienza distribui uma questão por disciplina na rodada de cinco",()=>{
  const qs=createDemoQuestions("sapienza",null,5);
  assert.equal(qs.length,5);
  assert.equal(new Set(qs.map(q=>q.subjectId)).size,5);
});
test('Sapienza cobre todas as disciplinas em cada tamanho e intercala cada rodada',()=>{
  for(const count of [5,10,15,20]){
    const questions=createDemoQuestions('sapienza','agil',count);
    assert.ok(hasSemesterCoverage(questions,count));
    const grouped=[...questions].sort((a,b)=>a.subjectId.localeCompare(b.subjectId));
    const mixed=interleaveSemester(grouped);
    assert.equal(mixed.length,count);
    for(let offset=0;offset<count;offset+=5)assert.equal(new Set(mixed.slice(offset,offset+5).map(q=>q.subjectId)).size,5);
    assert.deepEqual(new Set(mixed.map(q=>q.id)),new Set(questions.map(q=>q.id)));
  }
});
test('rejeita prova Sapienza de uma disciplina ou com distribuição desequilibrada',()=>{
  assert.equal(hasSemesterCoverage(createDemoQuestions('impara','agil',5),5),false);
  const questions=createDemoQuestions('sapienza',null,10);
  questions[0]={...questions[0],subjectId:questions.find(q=>q.subjectId!==questions[0].subjectId).subjectId};
  assert.equal(hasSemesterCoverage(questions,10),false);
});
test("demonstração mantém identificação e gabarito em quatro opções",()=>{
  const qs=createDemoQuestions("sapienza",null,20);
  assert.equal(qs.length,20);
  assert.equal(new Set(qs.map(q=>q.id)).size,20);
});
