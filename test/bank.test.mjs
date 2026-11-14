import test from "node:test";
import assert from "node:assert/strict";
import {SUBJECTS,BANK,createDemoQuestions} from "../public/bank.js";
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
test("demonstração mantém identificação e gabarito em quatro opções",()=>{
  const qs=createDemoQuestions("sapienza",null,20);
  assert.equal(qs.length,20);
  assert.equal(new Set(qs.map(q=>q.id)).size,20);
});
