// Mapa período → disciplinas da tela inicial (modo Impara).
// Incluir o 5º, 6º, 7º ou 8º período: acrescente um objeto neste array.
// Colocar uma disciplina num período: use o id definido em SUBJECTS (public/bank.js).
// Cada id deve aparecer em um único período. A ordem de subjectIds é a ordem do menu.
// Para outra disciplina do 4º período, acrescente o id ao array deste período.
export const PERIODS = [
  { id: "1", label: "1º Período", subjectIds: [] },
  { id: "2", label: "2º Período", subjectIds: [] },
  { id: "3", label: "3º Período", subjectIds: [] },
  { id: "4", label: "4º Período", subjectIds: ["comportamento", "poo"] },
  {
    id: "outros",
    label: "Outros",
    subjectIds: ["agil", "riscos", "planejamento", "criacao", "interfaces", "redes", "trunfo", "xadrez", "batalha"]
  }
];

export function subjectsFor(period, subjects) {
  const byId = new Map(subjects.map(subject => [subject.id, subject]));
  return (period?.subjectIds ?? []).map(id => byId.get(id)).filter(Boolean);
}

export function defaultPeriod(periods, subjects) {
  const ready = periods.filter(period => subjectsFor(period, subjects).length > 0);
  return ready.find(period => period.id === "outros") || ready[0] || periods[0];
}
