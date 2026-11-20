/**
 * Síntese autoral dos temas de Programação Orientada a Objetos em Java.
 * Provas e apostilas originais não são redistribuídas. Para incluir outro tema,
 * acrescente um objeto ao array modules.
 */
export const POO_CURRICULUM = {
  title: "Programação Orientada a Objetos",
  source: "Temas de Programação Orientada a Objetos em Java. Quatro alternativas e uma única resposta correta; algumas questões podem pedir a alternativa incorreta.",
  modules: [
    {
      title: "Introdução à programação OO em Java",
      guidance: "Uma classe descreve estado e comportamento; um objeto é uma instância concreta, criada e manipulada em separado das outras. Herança e polimorfismo aparecem aqui como visão geral: uma referência da superclasse pode apontar para um objeto especializado e a operação efetiva depende do objeto real. Agrupe objetos com arrays e coleções, sem confundir o índice com o conteúdo. O ambiente de desenvolvimento reúne o JDK, que fornece compilador e runtime, e IDEs como o Eclipse, que editam e executam projetos, mas não são a linguagem. Estruturas principais incluem decisões: um else se liga ao if mais próximo. Uma interface é um contrato de operações que classes diferentes implementam à sua maneira. Ela não é instanciada com new, não declara construtores, não usa métodos protected ou private, pode sobrecarregar assinaturas e combinar métodos abstratos, métodos estáticos e constantes. Não é um lugar para variáveis de instância não inicializadas. A interface permite polimorfismo sem ser, por si só, herança simples de classe."
    },
    {
      title: "Herança em Java",
      guidance: "A hierarquia Java usa extends: a subclasse reutiliza e especializa a superclasse. O princípio de substituição de Liskov pede que um objeto da subclasse possa ocupar o lugar da superclasse sem quebrar o que o código cliente espera. Nas bibliotecas, o Collections framework aplica essa ideia: contratos como lista, conjunto e mapa são especializados por implementações concretas, com diferenças práticas de ordem, duplicidade e chave. A classe Object oferece operações herdadas por todas as classes. equals compara equivalência lógica; == compara referências, então dois objetos distintos com o mesmo conteúdo podem ser iguais por equals e diferentes por ==. hashCode precisa ser coerente com equals. toString produz uma representação legível do objeto. Não trate equals como um método que só devolve falso."
    },
    {
      title: "Persistência com JPA e ORM",
      guidance: "JDBC é uma camada de middleware: deixa o acesso a bancos relacionais menos preso ao dialeto de um único fornecedor, sem ser interface gráfica, fila de mensagens ou o próprio banco. O JPA é o mecanismo padrão de ORM do Java. Ele trabalha com classes anotadas, usa uma unidade de persistência configurada em arquivo próprio e mapeia relacionamentos do modelo. A adoção reduz código repetitivo de persistência, mas não elimina o JDBC nem o driver sob o provedor. Não afirme que o JPA substitui o banco, que dispensa qualquer configuração ou que serve apenas a bancos não relacionais."
    },
    {
      title: "Threads e multiprogramação",
      guidance: "Multiprogramação obtém uma forma limitada de paralelismo mesmo com uma única CPU, alternando o uso do processador. Em Java, uma thread é criada com a classe Thread do pacote java.lang e representa uma linha de execução que pode avançar de modo concorrente, não uma tarefa obrigatoriamente sequencial nem um tipo de java.util. Threads são objetos que cooperam e compartilham memória, tela ou outros recursos. Cada uma tem a própria pilha, com variáveis locais e frames dos métodos em execução, o que permite a troca rápida entre elas. Em uma interface gráfica, várias threads podem parecer simultâneas mesmo quando há um só núcleo."
    },
    {
      title: "Exceções em Java",
      guidance: "Uma exceção é um objeto que representa uma condição inesperada durante a execução, seja um erro, seja uma entrada surpreendente. O trecho que detecta a condição a lança; o ambiente de execução também pode lançá-la. O tratamento usa try-catch: o bloco protegido fica no try e o catch recebe o tipo de exceção que sabe tratar. Exceções não são códigos numéricos soltos nem um substituto para todo if. Não invente uma hierarquia de classes de exceção além desta descrição, e não trate o simples fato de capturar uma exceção como se o problema tivesse sido corrigido."
    }
  ]
};
