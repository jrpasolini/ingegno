import test from "node:test";
import assert from "node:assert/strict";
import {CURRICULUM,buildStudyContext,getCoverageSummary} from "../curriculum.mjs";
import {SUBJECTS,createSemesterAllocation} from "../public/bank.js";

test("as matérias possuem sínteses por capítulo e identificação da fonte",()=>{
  assert.deepEqual(new Set(Object.keys(CURRICULUM)),new Set(SUBJECTS.map(s=>s.id)));
  for(const s of SUBJECTS){
    const entry=CURRICULUM[s.id];
    assert.ok(entry.modules.length>=3,s.id+" sem módulos");
    assert.ok(entry.source.length>18);
    for(const module of entry.modules){
      assert.ok(module.title.length>8);
      if(module.pages) assert.match(module.pages,/^\d+–\d+$/);
      assert.ok(module.guidance.length>150,module.title);
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

test("Sapienza usa quotas inteiras para cada matéria e tamanho",()=>{
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

test("os três desafios em C têm módulos próprios e ficam isolados no Impara",()=>{
  const trunfo=buildStudyContext("impara","trunfo",5);
  assert.match(trunfo,/operador ternário/i);
  assert.match(trunfo,/switch/i);
  assert.doesNotMatch(trunfo,/DISCIPLINA xadrez/);
  const xadrez=buildStudyContext("impara","xadrez",5);
  assert.match(xadrez,/do-while/i);
  assert.match(xadrez,/recursiv/i);
  assert.doesNotMatch(xadrez,/DISCIPLINA batalha/);
  const batalha=buildStudyContext("impara","batalha",5);
  assert.match(batalha,/10x10/);
  assert.match(batalha,/cone/i);
  assert.doesNotMatch(batalha,/DISCIPLINA trunfo/);
});

test("as disciplinas novas entram no mesmo prompt, sem páginas inventadas",()=>{
  const comportamento=buildStudyContext("impara","comportamento",6);
  for(const title of ["As pessoas nas organizações","A motivação e o trabalho","Comunicação no ambiente de trabalho","Liderança, poder e autoridade","Ética, inclusão e diversidade","Desenvolvimento de equipes de alta performance"]){
    assert.match(comportamento,new RegExp(title));
  }
  assert.doesNotMatch(comportamento,/páginas /);
  assert.doesNotMatch(comportamento,/DISCIPLINA poo/);
  const poo=buildStudyContext("impara","poo",5);
  for(const title of ["Introdução à programação OO em Java","Herança em Java","Persistência com JPA e ORM","Threads e multiprogramação","Exceções em Java"]){
    assert.match(poo,new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")));
  }
  assert.match(poo,/Liskov/);
  assert.match(poo,/equals/);
  assert.match(poo,/JDBC/);
  assert.match(poo,/java\.lang/);
  assert.match(poo,/try-catch/);
  assert.doesNotMatch(poo,/DISCIPLINA comportamento/);
  assert.deepEqual(CURRICULUM.comportamento.modules.map(module=>module.title),SUBJECTS.find(subject=>subject.id==="comportamento").topics);
  assert.deepEqual(CURRICULUM.poo.modules.map(module=>module.title),SUBJECTS.find(subject=>subject.id==="poo").topics);
});

test("rejeita plano inválido e não publica conteúdo didático no resumo de metadados",()=>{
  assert.throws(()=>buildStudyContext("impara","invalid",5));
  assert.throws(()=>buildStudyContext("sapienza",null,10,{redes:10}));
  const summary=getCoverageSummary();
  assert.equal(summary.length,SUBJECTS.length);
  assert.ok(summary.every(s=>!Object.hasOwn(s,"guidance")&&!Object.hasOwn(s,"text")));
});
