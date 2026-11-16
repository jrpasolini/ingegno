import test from "node:test";
import assert from "node:assert/strict";
import {CURRICULUM,buildStudyContext,getCoverageSummary} from "../curriculum.mjs";
import {SUBJECTS,createSemesterAllocation} from "../public/bank.js";

test("as seis matérias possuem sínteses por capítulo e identificação da fonte",()=>{
  assert.deepEqual(new Set(Object.keys(CURRICULUM)),new Set(SUBJECTS.map(s=>s.id)));
  for(const s of SUBJECTS){
    const entry=CURRICULUM[s.id];
    assert.ok(entry.modules.length>=3,s.id+" sem módulos");
    assert.ok(entry.source.length>18);
    for(const module of entry.modules){
      assert.ok(module.title.length>8);
      assert.match(module.pages,/^\d+–\d+$/);
      assert.ok(module.guidance.length>150);
      assert.ok(!/https?:\/\//.test(module.guidance));
    }
  }
});

test("Impara fornece somente o conteúdo da matéria selecionada",()=>{
  const context=buildStudyContext("impara","interfaces",10);
  assert.match(context,/Web 1\.0 e Web 2\.0/);
  assert.match(context,/Web 3\.0/);
  assert.match(context,/web semântica/i);
  assert.doesNotMatch(context,/DISCIPLINA agil/);
  assert.doesNotMatch(context,/DISCIPLINA redes/);
});

test("Redes inclui os quatro capítulos: acesso, desempenho, camadas e história",()=>{
  const context=buildStudyContext("impara","redes",10);
  assert.match(context,/Conceitos básicos e organização da internet/);
  assert.match(context,/Parâmetros de desempenho/);
  assert.match(context,/Protocolos, camadas OSI, TCP\/IP/);
  assert.match(context,/Histórico das redes/);
  assert.match(context,/sistemas finais/i);
  assert.match(context,/encapsulamento/i);
  assert.doesNotMatch(context,/DISCIPLINA interfaces/);
});

test("Sapienza usa quotas inteiras para seis matérias em cada tamanho",()=>{
  for(const count of [5,10,15,20]){
    const allocation=createSemesterAllocation(count);
    const context=buildStudyContext("sapienza",null,count,allocation);
    for(const s of SUBJECTS){
      if(allocation[s.id]){
        assert.ok(context.includes("DISCIPLINA "+s.id),s.id);
        assert.ok(context.includes("; "+allocation[s.id]+" questão(ões)."),s.id);
      }else assert.ok(!context.includes("DISCIPLINA "+s.id),s.id);
    }
  }
});

test("rejeita plano inválido e não publica conteúdo didático no resumo de metadados",()=>{
  assert.throws(()=>buildStudyContext("impara","invalid",5));
  assert.throws(()=>buildStudyContext("sapienza",null,10,{redes:10}));
  const summary=getCoverageSummary();
  assert.equal(summary.length,6);
  assert.ok(summary.every(s=>!Object.hasOwn(s,"guidance")&&!Object.hasOwn(s,"text")));
});
