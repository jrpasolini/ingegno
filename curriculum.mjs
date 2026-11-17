import {NETWORK_CURRICULUM} from "./network-curriculum.mjs";
import {BATALHA_CURRICULUM,TRUNFO_CURRICULUM,XADREZ_CURRICULUM} from "./programming-curriculum.mjs";
/**
 * Guia curricular sintético e autoral para os simulados do Ingegno.
 *
 * As notas abaixo são paráfrases breves elaboradas a partir dos materiais didáticos
 * fornecidos pelo usuário. Não contêm os PDFs nem transcrições de suas questões.
 * Os números indicam páginas do respectivo material e servem para auditoria humana.
 *
 * IMPORTANTE: este arquivo é utilizado SOMENTE no servidor durante a geração com IA.
 * A fidelidade acadêmica da saída do modelo ainda precisa ser revisada por docente.
 */
export const CURRICULUM = Object.freeze({
  agil: {
    title: "Projeto Ágil",
    source: "Projeto ágil (00906)",
    modules: [
      {
        title: "Valores e princípios do Manifesto Ágil", pages: "3–9",
        guidance: "O Manifesto Ágil estabelece quatro pares de valores: indivíduos e interações, software funcionando, colaboração com o cliente e resposta às mudanças são mais valorizados que processos e ferramentas, documentação abrangente, negociação contratual e seguir um plano, respectivamente. Os itens à direita mantêm valor. Seus doze princípios incluem entrega frequente de valor, acolhimento de mudanças, comunicação, colaboração, confiança nas equipes, ritmo sustentável, qualidade técnica, simplicidade, auto-organização e reflexão para melhoria."
      },
      {
        title: "Extreme Programming (XP)", pages: "10–19",
        guidance: "XP é um método ágil de desenvolvimento de software com valores de comunicação, simplicidade, feedback, coragem e respeito. Entre suas práticas estão equipe inteira com o cliente, jogo de planejamento, pequenas entregas, programação em pares, propriedade coletiva de código, padrões de codificação, testes automatizados, integração contínua, refatoração e ritmo sustentável. Diferencie princípios, valores, práticas e os papéis presentes no XP."
      },
      {
        title: "Scrum e empirismo", pages: "20–32",
        guidance: "Scrum trabalha de modo iterativo e incremental com empirismo, transparência, inspeção e adaptação. Diferencie Product Owner, Scrum Master e equipe de desenvolvimento; backlog de produto, backlog da sprint e incremento; eventos de planejamento, reunião diária, revisão e retrospectiva. A sprint possui objetivo e um incremento; pontos por história e planning poker são técnicas possíveis de estimativa. Scrum é um framework, não uma lista de tarefas rígida."
      }
    ]
  },
  riscos: {
    title: "Análise de Riscos e Qualidade",
    source: "Análise de Riscos e Qualidade (03934)",
    modules: [
      {
        title: "Identificação e análise qualitativa de riscos", pages: "3–10",
        guidance: "Risco é uma condição ou evento futuro incerto com possível impacto positivo (oportunidade) ou negativo (ameaça); quando ocorre, deixa de ser apenas risco. A análise qualitativa usa probabilidade e impacto, definidos em escalas, para estimar severidade e priorizar riscos. Um registro pode identificar descrição, causa, consequência, categoria, responsáveis e avaliação de severidade."
      },
      {
        title: "Planejamento e respostas aos riscos", pages: "11–19",
        guidance: "O plano de resposta orienta execução, monitoramento e controle dos riscos. Para ameaças, estude estratégias de evitar, mitigar, transferir e aceitar; para oportunidades, explorar, melhorar, compartilhar e aceitar, conforme o contexto. Registre ações, responsáveis, status e reservas de contingência. Reserva de contingência e estimativas de custo precisam ser consideradas no planejamento do projeto."
      },
      {
        title: "Conceitos e ferramentas de qualidade", pages: "20–31",
        guidance: "Qualidade significa atendimento aos requisitos e critérios acordados. Diferencie prevenção de falhas, avaliação/inspeção e ações corretivas; use indicadores mensuráveis para analisar processos e entregas. Ferramentas e técnicas de qualidade ajudam a comparar práticas (benchmarking), identificar problemas, controlar processos e planejar melhoria. A inspeção verifica conformidade com requisitos."
      },
      {
        title: "Qualidade aplicada aos projetos", pages: "32–41",
        guidance: "A qualidade do projeto envolve requisitos técnicos e funcionais, padrões, tolerâncias, prazo e critérios objetivos de aceitação. Requisitos devem ser completos, claros, viáveis e mensuráveis. Estude planejamento, garantia e controle da qualidade, indicadores e validação das entregas com partes interessadas; não confunda cumprir prazo com atender integralmente à qualidade."
      }
    ]
  },
  planejamento: {
    title: "Planejamento de um Website",
    source: "Planejamento de um Website (00875)",
    modules: [
      {
        title: "Briefing e descoberta do contexto", pages: "3–16",
        guidance: "Briefing reúne informações iniciais do cliente, usuários, negócio, marca, objetivos e restrições para orientar um website. Inclua público-alvo, identidade visual, conteúdo, concorrentes, orçamento e expectativas. Uma pesquisa de concorrentes busca referências e oportunidades de diferenciação, não cópia de materiais proprietários. O briefing pode ser complementado quando surgirem informações importantes."
      },
      {
        title: "Objetivos do website", pages: "17–29",
        guidance: "Websites institucionais, de comércio eletrônico e de entretenimento podem ter finalidades diferentes. Defina objetivos claros, verificáveis e pertinentes ao público e ao negócio. A abordagem SMART auxilia a explicitar especificidade, mensuração, viabilidade, relevância e delimitação temporal. Distinga objetivo de negócio, necessidade do usuário, funcionalidade e métrica de êxito."
      },
      {
        title: "Levantamento e descrição de requisitos", pages: "30–40",
        guidance: "Requisitos funcionais definem serviços e comportamentos do website; não funcionais abrangem atributos de qualidade, desempenho, confiabilidade, proteção, usabilidade e restrições. Técnicas de elicitação incluem entrevistas, observação/etnografia e comunicação com usuários. Registros podem indicar nome, descrição, entradas, saídas, passos, pré-condições e pós-condições. Priorize consistência da interface e clareza dos requisitos."
      }
    ]
  },
  criacao: {
    title: "Criação de um Website",
    source: "Criação de um Website (00610)",
    modules: [
      {
        title: "Projeto do layout final", pages: "3–18",
        guidance: "O layout organiza conteúdo e componentes de uma página de acordo com objetivos, marca e público. Trabalhe hierarquia visual, alinhamento, proximidade, repetição, contraste, consistência, navegação e prototipagem. Proximidade agrupa informações relacionadas; contrastes e hierarquia destacam o essencial. Não confunda estética isolada com usabilidade."
      },
      {
        title: "Cores e tipografia digital", pages: "19–31",
        guidance: "Uma paleta coerente com a identidade da marca deve equilibrar contraste, harmonia, legibilidade e significado contextual das cores. Tipografia envolve escolha das fontes, tamanhos, pesos, hierarquia e espaçamento. A leitura é prejudicada por contraste insuficiente, tamanho excessivamente pequeno, linhas pouco organizadas ou fundos visualmente carregados. Evite excesso de cores e fontes."
      },
      {
        title: "Imagens, ícones e vídeos", pages: "32–41",
        guidance: "Recursos visuais devem contribuir para compreensão e identidade do website, em vez de servir como ornamento indiscriminado. Formato, dimensões, resolução apropriada e compressão das imagens influenciam desempenho; ícones consistentes facilitam reconhecimento; vídeos precisam ser pertinentes e não prejudicar a navegação. Considere responsividade e peso dos arquivos."
      },
      {
        title: "Estratégias de SEO", pages: "42–54",
        guidance: "SEO reúne práticas para melhorar a descoberta orgânica de páginas por mecanismos de busca. Considere palavras-chave relevantes, conteúdo útil, estrutura semântica, organização de títulos, links internos e externos adequados, velocidade, experiência de uso e indexabilidade. Diferencie busca orgânica de anúncios pagos e reconheça riscos de manipular resultados com práticas artificiais."
      }
    ]
  },
  redes: NETWORK_CURRICULUM,
  trunfo: TRUNFO_CURRICULUM,
  xadrez: XADREZ_CURRICULUM,
  batalha: BATALHA_CURRICULUM,
  interfaces: {
    title: "Evolução das Interfaces",
    source: "A evolução e importância da interface de um Website (00487)",
    modules: [
      {
        title: "Interfaces, IHC, usabilidade e acessibilidade", pages: "3–11",
        guidance: "Uma interface permite interação entre pessoas e sistemas, inclusive por meios físicos, perceptivos e conceituais. O usuário informa ações e recebe retornos visuais, auditivos ou outros. IHC investiga concepção, implementação e avaliação de sistemas interativos para uso humano. Diferencie usabilidade (eficácia, eficiência e satisfação), acessibilidade (redução de barreiras) e qualidades interna, externa e de uso. A evolução passou por chaves, cartões perfurados, terminais, GUI e interfaces imersivas."
      },
      {
        title: "Web 1.0 e Web 2.0", pages: "12–22",
        guidance: "A Web 1.0 é apresentada como centrada em leitura e páginas relativamente estáticas; a Web 2.0 amplia participação, publicação e colaboração dos usuários. Estude o papel de HTML na estrutura do conteúdo, CSS na apresentação, navegadores, W3C e ferramentas históricas como Flash e Dreamweaver. Reconheça transformação de sites informativos em ambientes interativos e sociais."
      },
      {
        title: "Web 3.0, Web 4.0 e web semântica", pages: "23–29",
        guidance: "O material apresenta Web 3.0 pela organização semântica dos dados, descoberta de informações, interoperabilidade, compartilhamento e automação, incluindo desafios de interpretação e ambiguidades. A Web 4.0 aparece como discussão de evolução da interação e de sistemas mais conectados e inteligentes. Trate essas gerações como concepções didáticas do material, não como padrões universais de classificação."
      },
      {
        title: "Evolução estética, funcional e estrutural dos websites", pages: "30–39",
        guidance: "O material acompanha a transição de páginas iniciais centradas em texto para layouts com tabelas, imagens, animações, CSS, ambientes colaborativos e interfaces responsivas. Mudanças no acesso móvel incentivam sites que se adaptem a diferentes telas sem comprometer o conteúdo. Diferencie design responsivo, adaptação às necessidades dos usuários e recursos decorativos; mantenha navegação intuitiva e legibilidade."
      }
    ]
  }
});

export function buildStudyContext(mode,subjectId,count,allocation=null){
  const ids=mode==="sapienza"?Object.keys(CURRICULUM):[subjectId];
  if(!ids.every(id=>Object.hasOwn(CURRICULUM,id)))throw new Error("Disciplina inexistente");
  const quotas=mode==="sapienza"?(allocation??Object.fromEntries(ids.map((id,i)=>[
    id,Math.floor(count/ids.length)+(i<count%ids.length?1:0)
  ]))):{[subjectId]:count};
  if(!ids.every(id=>Number.isInteger(quotas[id])&&quotas[id]>=0)||
     ids.reduce((sum,id)=>sum+quotas[id],0)!==count)throw new Error("Distribuição curricular inválida");
  return ids.filter(id=>quotas[id]>0).map(id=>{
    const item=CURRICULUM[id];
    const modules=item.modules.map((module,index)=>
      String(index+1)+". "+module.title+" (páginas "+module.pages+"): "+module.guidance
    ).join("\n");
    return "DISCIPLINA "+id+" — "+item.title+"; "+quotas[id]+
      " questão(ões). Material de referência: "+item.source+".\n"+modules;
  }).join("\n\n");
}

export function getCoverageSummary(){
  return Object.entries(CURRICULUM).map(([id,x])=>({id,title:x.title,modules:x.modules.length,source:x.source}));
}
