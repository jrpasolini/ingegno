// Questões autorais de demonstração sobre os três desafios em C.
// Os PDFs originais não são redistribuídos.
export const TRUNFO_QUESTIONS = [
  ["Em C, quando o bloco de um if é executado?", "Quando a condição avaliada é verdadeira", "Sempre, independentemente da condição", "Somente quando a condição é zero", "Apenas se existir um else", "O if só entra no bloco quando a condição é verdadeira.", "Estruturas de decisão"],
  ["Qual valor é tratado como falso em uma condição de C?", "Zero", "Qualquer número positivo", "Qualquer número diferente de zero", "O resultado de uma comparação verdadeira", "Em C, zero é falso e os demais números são verdadeiros.", "Estruturas de decisão"],
  ["O que o operador && exige para produzir verdadeiro?", "Que as duas condições conectadas sejam verdadeiras", "Que apenas uma condição seja verdadeira", "Que as duas condições sejam falsas", "Que nenhuma comparação seja feita", "O E lógico só resulta verdadeiro quando todas as partes são verdadeiras.", "Operadores lógicos"],
  ["Qual é a diferença prática entre if aninhado e else if?", "No aninhado, o teste interno depende do externo; no else if, as alternativas são sequenciais", "Os dois testam todas as condições ao mesmo tempo", "else if só funciona dentro de um switch", "O if aninhado dispensa qualquer condição", "No aninhamento, a condição interna só é avaliada se a externa for verdadeira.", "Decisões aninhadas e encadeadas"],
  ["Por que um case de switch costuma terminar com break?", "Para não continuar executando os cases seguintes", "Para tornar a condição sempre falsa", "Para substituir o default por um laço", "Para comparar duas cartas automaticamente", "Sem break, a execução segue para os cases de baixo.", "Switch e menus"],
  ["No desafio mestre do Super Trunfo, qual é a exceção à regra de vencer o maior valor?", "Na densidade demográfica, vence o menor valor", "Na população, vence sempre o menor valor", "Todos os atributos vencem pelo menor valor", "O empate é declarado sem comparar atributos", "A regra geral compara pelo maior valor, com essa exceção didática.", "Operador ternário"]
];

export const XADREZ_QUESTIONS = [
  ["Qual laço pode executar o bloco zero vezes?", "while, se a condição já começar falsa", "do-while, porque testa a condição depois", "for, porque ignora a condição", "Nenhum laço pode ser pulado", "O while verifica a condição antes de entrar no bloco.", "for, while e do-while"],
  ["O que distingue o do-while do while?", "O do-while executa o bloco ao menos uma vez", "O do-while nunca testa condição", "O while sempre executa o bloco antes do teste", "Os dois têm a mesma ordem de teste e execução", "No do-while, a condição é verificada depois da primeira execução.", "for, while e do-while"],
  ["Em laços aninhados, quando o laço interno termina um ciclo?", "Para cada passo do laço externo, antes do próximo passo externo", "Uma única vez, antes de o externo começar", "Somente depois que todos os externos acabarem", "Apenas se os dois usarem a mesma variável", "O interno completa suas repetições a cada iteração do externo.", "Loops aninhados"],
  ["Qual movimento o material associa ao cavalo?", "Um L, com deslocamento maior em um sentido e um passo perpendicular", "Qualquer número de casas em linha reta", "Somente a diagonal, como o bispo", "Uma casa para qualquer lado, como o rei", "O L combina duas casas numa direção e uma na perpendicular.", "Movimento do cavalo"],
  ["O que uma função recursiva precisa ter para terminar?", "Uma condição de parada", "Um switch sem default", "A garantia de chamar a si mesma para sempre", "Um vetor de tamanho zero", "Sem condição de parada, a recursão não se encerra.", "Recursividade"],
  ["No nível mestre, o que substitui os laços simples da torre, do bispo e da rainha?", "Funções recursivas que descrevem cada deslocamento", "Uma única matriz 10x10", "Menus switch sem repetição", "Comparações ternárias de atributos", "O material pede recursão para os movimentos lineares dessas peças.", "Recursividade"]
];

export const BATALHA_QUESTIONS = [
  ["Em C, qual é o índice do primeiro elemento de um vetor?", "Zero", "Um", "O tamanho do vetor", "Menos um", "Arrays em C são indexados a partir de zero.", "Vetores"],
  ["Como o nível novato representa a água no tabuleiro?", "Matriz 10x10 iniciada com zero", "Vetor de dez posições iniciado com três", "Matriz 5x5 iniciada com um", "Dez variáveis soltas, uma por navio", "Zero marca água na grade fixa de dez por dez.", "Tabuleiro"],
  ["Para percorrer todas as células de uma matriz bidimensional, o que se usa?", "Dois laços aninhados, um para linhas e outro para colunas", "Um único if sem repetição", "Um switch com um case por célula", "Somente recursão, sem índice", "Cada laço percorre uma dimensão da grade.", "Loops aninhados"],
  ["No nível aventureiro, qual valor marca uma posição ocupada por navio?", "Três", "Zero", "Um", "Menos um", "Zero continua sendo água e três indica navio.", "Tabuleiro"],
  ["O que caracteriza um navio diagonal nesse desafio?", "Linha e coluna variam juntas", "Apenas a coluna muda e a linha fica fixa", "O navio ocupa uma única célula", "A posição pode ficar fora da matriz", "Na diagonal, os dois índices avançam ou recuam juntos, dentro dos limites.", "Matrizes"],
  ["Nas matrizes de habilidade, o que significam 1 e 0?", "1 é área afetada e 0 é área não afetada", "1 é água e 0 é navio", "Os dois valores indicam navios de tipos diferentes", "1 encerra o programa e 0 inicia o laço", "A habilidade usa 1 e 0 antes de ser sobreposta ao tabuleiro.", "Habilidades em matriz"]
];
