// Observations describe this attempt, never mastery beyond the sampled questions.
export function examOutcome(correct,total){
  return total>0&&correct/total>=.5?'APROVADO':'REPROVADO';
}
export function teacherVerdict(correct,total){
  const ratio=total>0?correct/total:0;
  return {note:(ratio*10).toLocaleString('pt-BR',{maximumFractionDigits:1}),
    caption:correct===0?'Zero. Vamos revisar juntos!':ratio>=.8?'Parabéns!':ratio>=.5?'Bom!':'Precisa melhorar',
    ink:ratio>=.5?'blue':'red'};
}
export function analyzePerformance(results) {
  const groups=new Map();
  for(const q of results){
    const key=q.subject+' · '+q.topic;
    const row=groups.get(key)||{label:key,total:0,correct:0};
    row.total++;if(q.correct)row.correct++;groups.set(key,row);
  }
  const topics=[...groups.values()];
  const strengths=topics.filter(t=>t.correct===t.total).sort((a,b)=>b.total-a.total);
  const priorities=topics.filter(t=>t.correct<t.total).sort((a,b)=>(b.total-b.correct)-(a.total-a.correct));
  const correct=results.filter(q=>q.correct).length;
  const summary=`Você acertou ${correct} de ${results.length} questões nesta tentativa. `+
    (strengths.length?`Seu destaque foi ${strengths[0].label}. `:'Ainda não houve um tópico com todas as respostas corretas. ')+
    (priorities.length?`Comece a revisão por ${priorities[0].label}.`:'Você acertou todos os tópicos avaliados. Experimente novas questões para ampliar a prática.');
  const steps=priorities.slice(0,3).map(t=>`Revise ${t.label}; explique o conceito com suas palavras e refaça as questões que errou (${t.total-t.correct} de ${t.total}).`);
  if(!steps.length)steps.push('Faça um novo desafio e pratique os mesmos conceitos em situações diferentes.');
  return {strengths,priorities,summary,steps};
}
