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

## Limitações MVP
- Sessões armazenadas em memória do processo (perdidas no reinício), sem contas ou histórico permanente.
- Geração por IA requer uma chave e está sujeita a limites e termos de prototipagem da NVIDIA.
- Questões geradas são verificadas estruturalmente, mas **não recebem revisão acadêmica independente**; não trate uma saída do modelo como gabarito validado.
- Rate limiting simples em memória, pensado para protótipo.

**Genio Academy, powered by Ingegno.**
