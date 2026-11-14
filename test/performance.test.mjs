import test from 'node:test';
import assert from 'node:assert/strict';
import {analyzePerformance,teacherVerdict} from '../public/performance.js';
const q=(topic,correct)=>({subject:'Projeto Ágil',topic,correct});
test('nota manuscrita usa a proporção real e avaliações coerentes',()=>{
  assert.deepEqual(teacherVerdict(0,5),{note:'0',caption:'Zero. Vamos revisar juntos!',ink:'red'});
  assert.equal(teacherVerdict(2,5).caption,'Precisa melhorar');
  assert.equal(teacherVerdict(3,5).note,'6');
  assert.equal(teacherVerdict(3,5).caption,'Bom!');
  assert.equal(teacherVerdict(4,5).caption,'Parabéns!');
  assert.equal(teacherVerdict(5,5).note,'10');
  assert.equal(teacherVerdict(1,3).note,'3,3');
});
test('prioriza erros por tópico e não trata acerto parcial como ponto forte',()=>{
  const result=analyzePerformance([q('Scrum',true),q('Scrum',false),q('XP',true),q('Manifesto',false),q('Manifesto',false)]);
  assert.deepEqual(result.strengths.map(t=>t.label),['Projeto Ágil · XP']);
  assert.equal(result.priorities[0].label,'Projeto Ágil · Manifesto');
  assert.equal(result.priorities[0].total-result.priorities[0].correct,2);
  assert.match(result.summary,/2 de 5/);assert.equal(result.steps.length,2);
});
test('prova perfeita propõe nova prática sem inventar dificuldade',()=>{
  const result=analyzePerformance([q('Scrum',true)]);
  assert.equal(result.priorities.length,0);assert.match(result.summary,/todos os tópicos avaliados/);
  assert.equal(result.steps.length,1);
});
test('prova sem acertos não inventa ponto forte',()=>{
  const result=analyzePerformance([q('Scrum',false),q('XP',false)]);
  assert.equal(result.strengths.length,0);assert.equal(result.priorities.length,2);
  assert.match(result.summary,/0 de 2/);
});
