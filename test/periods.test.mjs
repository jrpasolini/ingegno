import test from "node:test";
import assert from "node:assert/strict";
import {SUBJECTS} from "../public/bank.js";
import {PERIODS,subjectsFor,defaultPeriod} from "../public/periods.js";

test("o período inicial preserva Outros e, sem ele, usa o primeiro com disciplinas",()=>{
  const periods=[
    {id:"1",label:"1º Período",subjectIds:[]},
    {id:"2",label:"2º Período",subjectIds:["redes"]},
    {id:"outros",label:"Outros",subjectIds:["agil","sumiu"]}
  ];
  const subjects=[{id:"agil",name:"Projeto Ágil"},{id:"redes",name:"Redes de Computadores"}];
  assert.equal(defaultPeriod(periods,subjects).id,"outros");
  assert.equal(defaultPeriod(periods.filter(period=>period.id!=="outros"),subjects).id,"2");
  assert.deepEqual(subjectsFor(periods[1],subjects).map(subject=>subject.name),["Redes de Computadores"]);
  assert.deepEqual(subjectsFor(periods[2],subjects).map(subject=>subject.id),["agil"]);
  assert.equal(defaultPeriod([{id:"vazio",label:"1º Período",subjectIds:[]}],subjects).id,"vazio");
});

test("os períodos 1 a 4 e Outros existem e cada disciplina está em um só",()=>{
  for(const label of ["1º Período","2º Período","3º Período","4º Período","Outros"]){
    assert.equal(PERIODS.filter(period=>period.label===label).length,1,label);
  }
  const ids=PERIODS.flatMap(period=>period.subjectIds);
  assert.equal(new Set(ids).size,ids.length);
  assert.deepEqual([...ids].sort(),SUBJECTS.map(subject=>subject.id).sort());
  assert.equal(defaultPeriod(PERIODS,SUBJECTS).label,"Outros");
  assert.equal(subjectsFor(defaultPeriod(PERIODS,SUBJECTS),SUBJECTS)[0].id,"agil");
  for(const label of ["1º Período","2º Período","3º Período"]){
    assert.deepEqual(subjectsFor(PERIODS.find(period=>period.label===label),SUBJECTS),[]);
  }
  const quarto=PERIODS.find(period=>period.label==="4º Período");
  assert.ok(quarto.subjectIds.includes("comportamento"));
  assert.ok(quarto.subjectIds.includes("poo"));
  const outros=PERIODS.find(period=>period.id==="outros");
  for(const id of ["agil","riscos","planejamento","criacao","interfaces","redes","trunfo","xadrez","batalha"]){
    assert.ok(outros.subjectIds.includes(id),id);
  }
  assert.equal(outros.subjectIds.includes("comportamento"),false);
  assert.equal(outros.subjectIds.includes("poo"),false);
});
