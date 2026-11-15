# Ingegno — engine da Genio Academy

**Impara. Sbaglia. Migliora.** — Aprenda. Erre. Melhore.

Aplicação educacional com dois modos: **Impara** (disciplina escolhida) e **Sapienza** (mistura das disciplinas do semestre), perguntas de quatro alternativas, correção objetiva e explicação dos erros.

## Arquitetura
- Uma origem Git: `github.com/jrpasolini/ingegno`.
- **Render Web Service (Node.js)**: frontend e API em `/ingegno/`; geração opcional via NVIDIA Build usando `nvidia/nemotron-3.5-lightning-30b-a3b`.
- **GitHub Pages**: espelho estático de demonstração, sem chave nem API privada.
- Materiais acadêmicos originais **não** são redistribuídos no repositório; questões iniciais são autorais.

## Como executar
```sh
npm install
npm start
# http://localhost:3000/ingegno/
```

Sem a variável `NVIDIA_API_KEY`, o backend usa questões demonstrativas locais; quantidade disponível pode ser menor que o número pedido.

Para habilitar geração dinâmica, configure **NVIDIA_API_KEY** nos secrets do Render. Nunca coloque a chave no frontend ou no GitHub. Configurações opcionais: `NVIDIA_MODEL`, `PORT`.

## Deploy
- **Render**: New Web Service → este repositório → Node → Build Command `npm install` → Start Command `npm start` → Auto Deploy ligado.
- **GitHub Pages**: Action `Deploy Pages demo` publica `public/` e utiliza banco de demonstração no navegador (Settings → Pages → Source: GitHub Actions).
- **Domínio**: Render só aceita hostname (não caminhos). Para exibir `https://jrpasolini.tech/ingegno/` sem substituir o serviço que atualmente atende `jrpasolini.tech`, configure proxy de caminho no host de origem ou na borda (por exemplo, Cloudflare Worker na rota `jrpasolini.tech/ingegno*`) apontando para o Render. O app já usa links relativos e responde em `/ingegno/`; `/ingegno` redireciona para a barra final.

## Conteúdo acadêmico e geração por IA

O arquivo `curriculum.mjs` contém **sínteses originais e curtas**, organizadas por capítulo e página, dos cinco materiais acadêmicos fornecidos. O PDF original **não é publicado**. O backend utiliza essas notas no prompt da NVIDIA Build para que o Nemotron produza questões alinhadas à ementa.

| Disciplina | Material | Capítulos |
| --- | --- | --- |
| Projeto Ágil | Projeto ágil (00906) | Manifesto Ágil, Extreme Programming, Scrum |
| Análise de Riscos e Qualidade | Análise de Riscos e Qualidade (03934) | Análise de riscos, respostas, conceitos e elementos de qualidade |
| Planejamento de um Website | Planejamento de um Website (00875) | Briefing, objetivos, levantamento e descrição de requisitos |
| Criação de um Website | Criação de um Website (00610) | Layout, cores e tipografia, mídias e SEO |
| Evolução das Interfaces | A evolução e importância da interface de um Website (00487) | IHC/usabilidade, Web 1.0/2.0, Web 3.0/4.0, evolução do design |

Os nove uploads recentes de `00487` têm exatamente o **mesmo conteúdo** (mesmo hash SHA-256), por isso representam um único material — não nove disciplinas. O índice contém cinco fontes diferentes no total.

- **Impara** fornece ao modelo as notas de uma disciplina; **Sapienza** fornece as cinco e exige distribuição equilibrada (1 a 4 perguntas por disciplina, conforme o tamanho da prova).
- O banco `public/bank.js` continua sendo uma **demonstração offline** de questões autorais e poderá conter menos questões do que o tamanho solicitado em Impara. Para geração dinâmica com base nos capítulos, é necessário `NVIDIA_API_KEY`.
- A verificação da saída da IA checa formato, unicidade das alternativas e cobertura de disciplinas, mas não substitui **revisão humana de precisão pedagógica**. Uma referência resumida não equivale ao documento integral.

## Limitações MVP
- Sessões armazenadas em memória do processo (perdidas no reinício), sem contas ou histórico permanente.
- Geração por IA requer uma chave e está sujeita a limites e termos de prototipagem da NVIDIA.
- Questões geradas são verificadas estruturalmente, mas **não recebem revisão acadêmica independente**; não trate uma saída do modelo como gabarito validado.
- Rate limiting simples em memória, pensado para protótipo.

**Genio Academy, powered by Ingegno.**
