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

## Períodos e disciplinas

No modo **Impara**, o menu **Período** filtra o menu **Disciplinas**. O mapa fica num único lugar: o array `PERIODS` em `public/periods.js`. O simulado continua enviando o `subjectId` da disciplina escolhida; a API não recebe o período. **Sapienza** segue misturando todas as disciplinas cadastradas.

Cada item de `PERIODS` tem:

- `id` — identificador interno estável. Não aparece na prova.
- `label` — texto do menu, por exemplo `5º Período`.
- `subjectIds` — ids das disciplinas daquele período, na ordem do menu. Os ids são os de `SUBJECTS` em `public/bank.js`.

Os períodos 1 a 4 já existem. O 4º período começa com Comportamento Organizacional e Programação Orientada a Objetos; para incluir outra disciplina desse período, acrescente o id em `subjectIds`. Os períodos 1 a 3 seguem vazios. Enquanto um período não tiver disciplinas, o menu mostra **Nenhuma disciplina cadastrada ainda** e o botão de iniciar o simulado fica desabilitado. A abertura continua em **Outros** enquanto esse período tiver disciplinas, com as nove disciplinas anteriores. Se Outros ficar vazio, abre o primeiro período que tiver alguma.

### Incluir um período

Edite só `public/periods.js` e acrescente um objeto ao array — por exemplo, para o 5º período:

```js
{ id: "5", label: "5º Período", subjectIds: [] },
```

Repita o mesmo formato para o 6º, 7º e 8º. Não é preciso alterar o HTML, o servidor nem o contrato da API. Quando houver disciplinas, coloque os ids em `subjectIds`.

### Incluir ou mover uma disciplina

1. Se a disciplina ainda não existe, acrescente-a em `SUBJECTS` dentro de `public/bank.js` (`id`, `name`, `icon`, `topics`) e as questões de demonstração em `BANK`, na chave igual ao `id`.
2. Em `public/periods.js`, coloque esse `id` no `subjectIds` do período certo. Cada id deve aparecer em exatamente um período. Uma disciplina nova, enquanto o período dela não estiver definido, entra em **Outros**.
3. Para a geração por IA, acrescente um módulo em `curriculum.mjs` ou num arquivo importado por ele, como `comportamento-curriculum.mjs` e `poo-curriculum.mjs`. Cada módulo tem `title` (o tema, igual ao item de `topics`) e `guidance` (paráfrase curta que orienta as questões). Não copie plano de ensino nem prova para o repositório. Sem essas notas, o modo demonstração continua funcionando; a IA não recebe o material dessa disciplina.

O nome exibido no menu vem de `SUBJECTS`. Mudar o nome lá atualiza o menu e a prova, sem editar o HTML. As notas entram no único pedido de questões feito à NVIDIA por simulado; não há chamada extra por período, tema ou questão. A correção continua com o pedido de parecer que já existia.

`npm test` confere se cada disciplina está em um único período. Incluir um período vazio, ou mais uma disciplina no 4º período, não exige alterar o teste. O teste registra que os períodos 1 a 3 começam sem disciplinas; ao preenchê-los, atualize essa expectativa em `test/periods.test.mjs`.

### Incluir um tema numa disciplina que já existe

No arquivo curricular da disciplina, acrescente um objeto `{ title, guidance }` ao array `modules` e o mesmo `title` em `topics`, dentro de `SUBJECTS`. A geração passa a usar o tema novo no próximo simulado, ainda em uma única chamada.

## Deploy
- **Render**: New Web Service → este repositório → Node → Build Command `npm install` → Start Command `npm start` → Auto Deploy ligado.
- **GitHub Pages**: Action `Deploy Pages demo` publica `public/` e utiliza banco de demonstração no navegador (Settings → Pages → Source: GitHub Actions).
- **Domínio**: Render só aceita hostname (não caminhos). Para exibir `https://jrpasolini.tech/ingegno/` sem substituir o serviço que atualmente atende `jrpasolini.tech`, configure proxy de caminho no host de origem ou na borda (por exemplo, Cloudflare Worker na rota `jrpasolini.tech/ingegno*`) apontando para o Render. O app já usa links relativos e responde em `/ingegno/`; `/ingegno` redireciona para a barra final.

## Conteúdo acadêmico e geração por IA

O arquivo `curriculum.mjs` contém **sínteses originais e curtas** dos materiais acadêmicos. O PDF original **não é publicado**. O backend envia essas notas no único prompt de geração da NVIDIA Build, para que o modelo produza questões alinhadas aos temas. Comportamento Organizacional e Programação Orientada a Objetos seguem o mesmo caminho: a paráfrase fica no repositório; o plano de ensino e a prova não.

| Disciplina | Material | Capítulos |
| --- | --- | --- |
| Projeto Ágil | Projeto ágil (00906) | Manifesto Ágil, Extreme Programming, Scrum |
| Análise de Riscos e Qualidade | Análise de Riscos e Qualidade (03934) | Análise de riscos, respostas, conceitos e elementos de qualidade |
| Planejamento de um Website | Planejamento de um Website (00875) | Briefing, objetivos, levantamento e descrição de requisitos |
| Criação de um Website | Criação de um Website (00610) | Layout, cores e tipografia, mídias e SEO |
| Evolução das Interfaces | A evolução e importância da interface de um Website (00487) | IHC/usabilidade, Web 1.0/2.0, Web 3.0/4.0, evolução do design |
| Redes de Computadores | Redes de computadores e a internet (Estácio 2025.1) | Redes de acesso e ISPs, atrasos e vazão, OSI/TCP-IP e história da internet |
| Super Trunfo em C | Super Trunfo em C: desenvolvendo a lógica do jogo (47262) | Decisão simples e composta, operadores lógicos e switch, ternário e dois atributos |
| Xadrez em C | Movimentação de peças de xadrez (47263) | for/while/do-while, laços aninhados e cavalo, recursividade |
| Batalha Naval em C | Jogo de Batalha Naval (47264) | Vetores e tabuleiro 10x10, navios diagonais, habilidades em matriz |
| Comportamento Organizacional | Plano de ensino, paráfrase dos seis temas | Pessoas, motivação, comunicação, liderança, ética e equipes |
| Programação Orientada a Objetos | Temas de Java, paráfrase | Introdução à OO, herança, JPA/ORM, threads e exceções |

Os nove uploads recentes de `00487` têm exatamente o **mesmo conteúdo** (mesmo hash SHA-256), por isso representam um único material — não nove disciplinas. Além dessas nove fontes, o 4º período tem as duas sínteses acima. O plano de ensino e a prova que originaram essas sínteses não estão no repositório.

- **Impara** fornece ao modelo as notas de uma disciplina; **Sapienza** utiliza todas as disciplinas cadastradas e distribui as perguntas com diferenças de no máximo uma questão por matéria. Com menos questões do que disciplinas, algumas ficam de fora daquela rodada; com 15 ou 20, o conjunto atual entra inteiro.
- O banco `public/bank.js` continua sendo uma **demonstração offline** de questões autorais e poderá conter menos questões do que o tamanho solicitado em Impara. Para geração dinâmica com base nos capítulos, é necessário `NVIDIA_API_KEY`.
- A verificação da saída da IA checa formato, unicidade das alternativas e cobertura de disciplinas, mas não substitui **revisão humana de precisão pedagógica**. Uma referência resumida não equivale ao documento integral.

## Limitações MVP
- Sessões armazenadas em memória do processo (perdidas no reinício), sem contas ou histórico permanente.
- Geração por IA requer uma chave e está sujeita a limites e termos de prototipagem da NVIDIA.
- Questões geradas são verificadas estruturalmente, mas **não recebem revisão acadêmica independente**; não trate uma saída do modelo como gabarito validado.
- Rate limiting simples em memória, pensado para protótipo.

**Genio Academy, powered by Ingegno.**
