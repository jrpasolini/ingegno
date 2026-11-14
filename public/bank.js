// Questões autorais de demonstração inspiradas nos tópicos dos cinco materiais fornecidos.
// Os PDFs originais não são redistribuídos.
export const SUBJECTS = [
  { id: "agil", name: "Projeto Ágil", icon: "⚡", topics: ["Manifesto Ágil", "Extreme Programming", "Scrum"] },
  { id: "riscos", name: "Análise de Riscos e Qualidade", icon: "🛡️", topics: ["Riscos", "Probabilidade e impacto", "Qualidade"] },
  { id: "planejamento", name: "Planejamento de um Website", icon: "🧭", topics: ["Briefing", "Público-alvo", "Objetivos"] },
  { id: "criacao", name: "Criação de um Website", icon: "🎨", topics: ["Layout", "Design visual", "SEO"] },
  { id: "interfaces", name: "Evolução das Interfaces", icon: "🖥️", topics: ["IHC", "História da Web", "Acessibilidade"] }
];
// [enunciado, certa, errada1, errada2, errada3, explicação, tópico]
export const BANK = {
  agil: [
    ["Qual ação representa melhor a resposta ágil a mudanças?", "Adaptar o plano com base em feedback", "Proibir alterações após o início", "Priorizar documentos em vez de entregas", "Evitar validação com usuários", "O Manifesto Ágil valoriza responder às mudanças, sem dispensar o planejamento.", "Manifesto Ágil"],
    ["O que significa propriedade coletiva do código em XP?", "A equipe compartilha responsabilidade pelo código", "O autor de cada módulo tem acesso exclusivo", "Somente o gerente modifica o código", "Código não precisa de revisão", "A propriedade coletiva reduz dependências individuais e facilita melhorias.", "Extreme Programming"],
    ["Qual é uma finalidade da retrospectiva?", "Identificar melhorias para o próximo ciclo", "Atribuir culpa aos participantes", "Cancelar testes automatizados", "Aprovar contratos jurídicos", "Inspeção e adaptação constantes são centrais para a melhoria contínua.", "Manifesto Ágil"],
    ["Qual prática contribui para o ritmo sustentável?", "Evitar sobrecarga recorrente do time", "Exigir horas extras em todo sprint", "Trabalhar sem pausas até a entrega", "Planejar com capacidade infinita", "O princípio de desenvolvimento sustentável exige uma cadência possível de manter.", "Manifesto Ágil"],
    ["Na programação em par, o principal benefício esperado é...", "Revisar e compartilhar conhecimento durante a escrita", "Impedir que duas pessoas conversem", "Dispensar testes de aceitação", "Restringir o código a um único autor", "Programação em par amplia troca de conhecimento e detecção precoce de problemas.", "Extreme Programming"],
    ["Em Scrum, a Sprint Review serve principalmente para...", "Inspecionar o incremento com interessados e adaptar o backlog", "Substituir todo planejamento estratégico", "Avaliar individualmente salários", "Revisar apenas a sintaxe do código", "A Sprint Review ajuda a inspecionar resultados e adaptar os próximos passos.", "Scrum"]
  ],
  riscos: [
    ["Como distinguir um risco de um problema já ocorrido?", "O risco envolve incerteza sobre um evento futuro", "Todo risco já aconteceu", "Riscos são sempre oportunidades positivas", "Problemas nunca exigem ação", "Risco é uma condição incerta; quando o evento ocorre, passa a ser uma questão concreta.", "Riscos"],
    ["Na análise qualitativa, como priorizar um risco?", "Considerando probabilidade e impacto", "Apenas o nome do responsável", "Somente o orçamento inicial", "Exclusivamente a data do projeto", "Uma matriz de probabilidade e impacto apoia a classificação de severidade.", "Probabilidade e impacto"],
    ["O que significa mitigar uma ameaça?", "Reduzir sua probabilidade ou efeito", "Garantir que a ameaça aconteça", "Ignorar todas as consequências", "Transformar automaticamente o risco em oportunidade", "Mitigação busca reduzir a exposição ao risco negativo.", "Respostas aos riscos"],
    ["Qual exemplo representa transferência de risco?", "Contratar seguro para cobrir um prejuízo previsto", "Não registrar ocorrências", "Evitar qualquer planejamento", "Elevar voluntariamente a chance de falha", "Transferência realoca parte do ônus financeiro ou operacional a um terceiro.", "Respostas aos riscos"],
    ["Por que um registro de riscos precisa de atualização?", "Porque riscos e condições do projeto mudam", "Porque toda avaliação é definitiva", "Porque o risco não pode ser encerrado", "Porque questões não devem ser registradas", "Monitoramento contínuo permite incluir, reavaliar e encerrar riscos.", "Monitoramento"],
    ["Qual é um indicador de qualidade de projeto?", "Conformidade das entregas aos critérios definidos", "Quantidade de reuniões sem resultados", "Número de documentos duplicados", "Total de alterações rejeitadas", "Qualidade é verificada pela adequação das entregas aos requisitos e critérios.", "Qualidade"]
  ],
  planejamento: [
    ["Qual é o papel do briefing no planejamento web?", "Reunir necessidades, objetivos e restrições iniciais", "Substituir todo o processo de testes", "Determinar apenas a cor do botão principal", "Escolher o servidor sem considerar usuários", "Um briefing orienta o projeto com contexto e requisitos preliminares.", "Briefing"],
    ["Por que definir o público-alvo antes da interface?", "Para adequar recursos às necessidades dos usuários", "Para eliminar o uso de critérios de aceitação", "Para impedir melhorias de acessibilidade", "Para escolher sempre o layout mais complexo", "O público-alvo orienta decisões sobre conteúdo, navegação e requisitos.", "Público-alvo"],
    ["Qual característica torna um objetivo mensurável?", "Um critério de resultado verificável", "Uma descrição deliberadamente vaga", "Ausência de prazo ou indicador", "Uso de palavras sem relação com o usuário", "Objetivos verificáveis permitem acompanhar se o site atingiu os resultados desejados.", "Objetivos SMART"],
    ["Ao mapear requisitos iniciais, o que deve ser considerado?", "O que o usuário precisa realizar", "Apenas a preferência técnica do programador", "Somente as cores da marca", "Exclusivamente a quantidade de páginas", "Requisitos devem partir dos objetivos da aplicação e das tarefas dos usuários.", "Requisitos"],
    ["Qual é uma finalidade da análise de concorrentes?", "Identificar referências e diferenciais relevantes", "Copiar integralmente código proprietário", "Ignorar necessidades do público", "Impedir a criação de um briefing", "Comparar soluções ajuda a reconhecer expectativas e oportunidades de melhoria.", "Briefing"],
    ["Quando revisar o briefing?", "Quando novas informações relevantes alterarem premissas", "Nunca, depois da primeira reunião", "Somente após lançar o produto", "Apenas quando houver falha no servidor", "O briefing é um guia revisável durante a descoberta e evolução do projeto.", "Briefing"]
  ],
  criacao: [
    ["Qual princípio visual agrupa elementos relacionados?", "Proximidade", "Aleatoriedade", "Redundância", "Saturação", "A proximidade cria unidades visuais e melhora o entendimento da página.", "Princípios de design"],
    ["Por que o contraste é importante na interface?", "Destacar diferenças e hierarquia de informação", "Esconder ações importantes", "Eliminar completamente espaços em branco", "Fazer todos os elementos parecerem idênticos", "Contraste ajuda a distinguir elementos e orientar a atenção.", "Princípios de design"],
    ["O que caracteriza uma abordagem mobile-first?", "Projetar inicialmente para telas menores", "Bloquear acesso via computador", "Usar somente imagens pesadas", "Criar layouts fixos sem adaptação", "Mobile-first prioriza restrições do dispositivo menor e expande responsivamente.", "Layout"],
    ["Qual cuidado ajuda a melhorar o carregamento de páginas?", "Otimizar imagens antes da publicação", "Usar sempre arquivos sem compressão", "Duplicar cada textura decorativa", "Carregar todos os vídeos automaticamente", "Imagens otimizadas reduzem transferência e melhoram a experiência.", "Imagens"],
    ["O que significa SEO na prática?", "Aprimorar a descoberta orgânica do site por mecanismos de busca", "Exigir cadastro para toda navegação", "Usar exclusivamente publicidade paga", "Substituir acessibilidade por animações", "SEO reúne práticas técnicas e editoriais para facilitar indexação e relevância.", "SEO"],
    ["Qual escolha favorece legibilidade?", "Contraste adequado, hierarquia e espaçamento", "Textos minúsculos em todos os dispositivos", "Ausência completa de títulos", "Mistura aleatória de várias fontes", "Tipografia deve considerar tamanho, espaçamento, contraste e consistência.", "Tipografia"]
  ],
  interfaces: [
    ["O que estuda a interação humano-computador?", "A relação entre pessoas e sistemas interativos", "Somente o preço de equipamentos", "Apenas protocolos elétricos", "Exclusivamente a fabricação de teclados", "IHC investiga como projetar, avaliar e usar sistemas interativos.", "IHC"],
    ["Qual recurso representou uma forma inicial de entrada de dados?", "Cartões perfurados", "Telas sensíveis ao toque", "Assistentes de voz", "Realidade aumentada", "Cartões perfurados permitiam inserir instruções e dados em computadores antigos.", "História das interfaces"],
    ["O que caracteriza, de forma geral, a Web 1.0?", "Predominância de páginas de leitura e pouca interação", "Colaboração social instantânea como padrão", "Aplicativos móveis com GPS nativo", "Interfaces de realidade mista universais", "Na Web inicial, grande parte dos sites era estática e voltada à consulta de conteúdo.", "Evolução da Web"],
    ["Qual é uma característica marcante da Web 2.0?", "Participação e publicação de conteúdo pelos usuários", "Fim de toda comunicação entre navegadores", "Uso exclusivo de cartões perfurados", "Impossibilidade de criar comunidades", "A Web 2.0 ampliou conteúdo colaborativo, redes sociais e interação.", "Evolução da Web"],
    ["Uma interface acessível deve...", "Permitir uso por pessoas com diferentes capacidades", "Depender obrigatoriamente de mouse", "Esconder informações de leitores de tela", "Impedir navegação por teclado", "Acessibilidade busca remover barreiras de percepção, navegação e interação.", "Acessibilidade"],
    ["Por que feedback visual de uma ação é importante?", "Para mostrar ao usuário o efeito da interação", "Para tornar o sistema imprevisível", "Para dispensar totalmente navegação", "Para aumentar erros intencionais", "Feedback ajuda o usuário a perceber o estado e o resultado de suas ações.", "Usabilidade"]
  ]
};

export function shuffle(items){
  const out=[...items];
  for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}
  return out;
}
export function hasSemesterCoverage(questions,count){
  return questions.length===count&&SUBJECTS.every(s=>questions.filter(q=>q.subjectId===s.id).length===count/SUBJECTS.length);
}
export function interleaveSemester(questions){
  const pools=shuffle(SUBJECTS).map(s=>shuffle(questions.filter(q=>q.subjectId===s.id)));
  const out=[];
  while(pools.some(p=>p.length))for(const pool of pools)if(pool.length)out.push(pool.pop());
  return out;
}
export function createDemoQuestions(mode, subjectId, count) {
  const ids = mode === "sapienza" ? SUBJECTS.map(s => s.id) : [subjectId];
  if (ids.some(id => !BANK[id])) throw new Error("Disciplina inválida");
  const pools = shuffle(ids).map(id => shuffle(BANK[id].map((row, i) => ({ id: id + "-" + i, subjectId: id, row }))));
  const picks = [];
  while (picks.length < count && pools.some(p => p.length)) {
    for (const pool of pools) { if (picks.length < count && pool.length) picks.push(pool.pop()); }
  }
  return picks.map((item, n) => {
    const r = item.row;
    const answers = [r[1], r[2], r[3], r[4]].map((label, i) => ({ label, correct: i === 0 }));
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return {
      id: "q" + n,
      subjectId: item.subjectId,
      topic: r[6],
      prompt: r[0],
      options: answers.map(a => a.label),
      correctIndex: answers.findIndex(a => a.correct),
      explanation: r[5]
    };
  });
}
