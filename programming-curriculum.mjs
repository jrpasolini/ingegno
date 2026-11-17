/**
 * Sínteses autorais dos três desafios em C enviados pelo estudante.
 * Não distribuímos os PDFs nem copiamos enunciados de entrega.
 * As páginas correspondem a cada material para conferência pedagógica.
 */
export const TRUNFO_CURRICULUM = {
  title: "Super Trunfo em C",
  source: "Super Trunfo em C: desenvolvendo a lógica do jogo (47262)",
  modules: [
    {
      title: "Decisão simples, composta e operadores relacionais", pages: "4–14",
      guidance: "Estruturas de decisão fazem o programa seguir caminhos diferentes conforme uma condição. O if executa um bloco somente quando a condição é verdadeira. O if-else escolhe entre dois blocos. Em C, zero é tratado como falso e qualquer outro número como verdadeiro. Operadores relacionais como maior, menor, maior ou igual, menor ou igual, igual e diferente comparam valores. O nível novato aplica essa lógica à comparação de um único atributo entre cartas."
    },
    {
      title: "Operadores lógicos, decisões encadeadas e menus", pages: "15–33",
      guidance: "Operadores lógicos combinam condições: && exige que todas sejam verdadeiras, || exige ao menos uma, e ! inverte o resultado. Uma decisão aninhada coloca um if dentro de outro, e a condição interna só é avaliada se a externa for verdadeira. Uma decisão encadeada, com else if, testa alternativas em sequência. O switch escolhe um case pelo valor de uma variável; break impede a execução dos cases seguintes, e default cobre um valor não previsto. O nível aventureiro usa essas estruturas em menus e em comparações com vários atributos."
    },
    {
      title: "Operador ternário e comparação de dois atributos", pages: "34–39",
      guidance: "O operador ternário, escrito como condição ? valor se verdadeira : valor se falsa, resume um if-else simples em uma expressão. No nível mestre, o jogador escolhe dois atributos numéricos diferentes para comparar as cartas. A regra geral do material é vencer a carta de maior valor. A exceção didática é a densidade demográfica, em que vence o menor valor. O menu precisa impedir a escolha repetida do mesmo atributo."
    }
  ]
};

export const XADREZ_CURRICULUM = {
  title: "Xadrez em C",
  source: "Movimentação de peças de xadrez (47263)",
  modules: [
    {
      title: "for, while e do-while", pages: "4–13",
      guidance: "Estruturas de repetição executam um bloco enquanto uma condição permanecer verdadeira. O for reúne inicialização, teste e atualização. O while testa a condição antes do bloco e pode não executar nenhuma vez. O do-while executa o bloco ao menos uma vez e só depois testa a condição. O nível novato usa esses laços para simular deslocamentos em linha reta da torre, do bispo e da rainha, registrando cada casa percorrida."
    },
    {
      title: "Loops aninhados e movimento do cavalo", pages: "14–20",
      guidance: "Um loop aninhado coloca uma repetição dentro de outra: para cada passo do laço externo, o interno completa o próprio ciclo. O nível aventureiro usa esse recurso para simular o movimento em L do cavalo, combinando um deslocamento maior em uma direção com um deslocamento perpendicular. Os contadores de cada laço precisam limitar as casas percorridas e evitar um avanço além do movimento previsto."
    },
    {
      title: "Recursividade e laços com várias condições", pages: "21–26",
      guidance: "No nível mestre, os deslocamentos lineares da torre, do bispo e da rainha passam a funções recursivas, que chamam a si mesmas e dependem de uma condição de parada. O bispo também pode ser expresso com laços aninhados. O cavalo é refinado com laços aninhados e múltiplas condições, no exemplo do material em L de duas casas para cima e uma para a direita. Sem critério de parada, a repetição ou a recursão não termina."
    }
  ]
};

export const BATALHA_CURRICULUM = {
  title: "Batalha Naval em C",
  source: "Jogo de Batalha Naval (47264)",
  modules: [
    {
      title: "Vetores, matrizes e tabuleiro inicial", pages: "4–14",
      guidance: "Um vetor é um array unidimensional de elementos do mesmo tipo, acessados por índice que em C começa em zero. Uma matriz tem duas ou mais dimensões; a bidimensional funciona como uma grade acessada por linha e coluna. O nível novato representa o tabuleiro por uma matriz 10x10 iniciada com zero, no sentido de água, e posiciona navios na horizontal e na vertical com vetores de tamanho fixo."
    },
    {
      title: "Laços aninhados e navios diagonais", pages: "15–20",
      guidance: "Laços percorrem vetores e, quando aninhados, percorrem linhas e colunas de uma matriz. O nível aventureiro mantém o tabuleiro 10x10, com zero para água, e marca posições ocupadas por navio com o valor três. Dois navios ficam na horizontal ou na vertical. Outros dois ocupam diagonais, em que linha e coluna variam juntas. O acesso precisa permanecer dentro dos limites da matriz."
    },
    {
      title: "Condicionais e áreas de habilidade", pages: "21–30",
      guidance: "Condicionais dentro de laços aninhados alteram ou contam elementos conforme valor e posição. O nível mestre cria matrizes de habilidade para cone, cruz e octaedro, com 1 na área afetada e 0 fora dela. Cada habilidade tem um ponto de origem no tabuleiro, e sua matriz é sobreposta à grade sem ultrapassar os limites. A saída distingue água, navios e áreas de efeito. Índice fora da matriz é um erro a evitar."
    }
  ]
};
