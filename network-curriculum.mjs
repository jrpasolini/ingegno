/**
 * Síntese autoral do material enviado "Redes de Computadores Estacio 2025.1.pdf",
 * cujo título interno é "Redes de computadores e a internet", Prof. Fabio
 * Henrique Silva, 39 páginas. Não distribuímos o PDF nem copiamos as provas.
 * Páginas correspondem ao PDF original para conferência pedagógica.
 */
export const NETWORK_CURRICULUM = {
  title: "Redes de Computadores",
  source: "Redes de computadores e a internet (Estácio 2025.1)",
  modules: [
    {
      title: "Conceitos básicos e organização da internet", pages: "3–12",
      guidance: "O material define uma rede como módulos processadores interligados para trocar informações e compartilhar recursos. A internet é apresentada por três componentes: sistemas finais (hosts), redes de acesso e núcleo da rede. Clientes e servidores são sistemas finais; a função de servidor é determinada pelo software que oferece serviços, não pelo porte do hardware. Redes de acesso conectam hosts ao roteador de borda e podem usar meios guiados, como fibra óptica, par trançado e coaxial, ou não guiados, como rádio, Wi-Fi e redes móveis. Estude LAN, Ethernet, Wi-Fi IEEE 802.11, FTTH e acesso discado. No núcleo, roteadores e switches interligam redes por ISPs; pontos de presença (PoP), multi-homing, peering e pontos de troca de tráfego (IXP) apoiam interconexão. Aplicações comunicam-se por APIs como sockets."
    },
    {
      title: "Parâmetros de desempenho: atrasos, perdas, jitter e vazão", pages: "13–18",
      guidance: "O atraso de cada nó soma processamento, espera em fila, transmissão e propagação. Processamento inclui examinar cabeçalho; fila varia com o tráfego e o uso de buffers; transmissão depende do comprimento do pacote e da taxa do enlace; propagação depende da distância e velocidade do sinal no meio. Jitter é a variação do atraso, importante para multimídia e videoconferência. Se o buffer finito do roteador estiver cheio, novos pacotes podem ser descartados. O atraso fim a fim agrega os atrasos ao longo do percurso, e traceroute permite observar saltos e tempos de ida e volta. Vazão média corresponde aos bits recebidos por unidade de tempo e pode ser limitada por enlaces congestionados."
    },
    {
      title: "Protocolos, camadas OSI, TCP/IP e encapsulamento", pages: "19–27",
      guidance: "Um protocolo especifica formato e ordem de mensagens e ações realizadas em sua transmissão ou recepção. Cada camada de arquitetura de redes presta serviços à camada superior e usa a inferior. O modelo OSI tem sete camadas em sequência: aplicação, apresentação, sessão, transporte, rede, enlace e física. O texto apresenta a pilha TCP/IP original de quatro camadas e usa, didaticamente, cinco: aplicação, transporte, rede, enlace e física; apresentação e sessão não aparecem separadas. Na aplicação estão HTTP, DNS e SMTP. TCP é orientado à conexão, com mecanismos de entrega ordenada, fluxo e congestionamento; UDP é não orientado à conexão e não fornece as mesmas garantias. IP atua no endereçamento lógico e encaminhamento. No encapsulamento, mensagem de aplicação vira segmento na camada de transporte, datagrama na camada de rede, quadro na camada de enlace e bits na camada física."
    },
    {
      title: "Histórico das redes e evolução da internet", pages: "28–37",
      guidance: "O percurso histórico apresentado começa com a comutação de circuitos da telefonia e sua alternativa, a comutação de pacotes. A ARPANET, iniciada na década de 1960, é citada como predecessora direta da internet moderna, com primeiros nós em 1969 e aplicações de correio eletrônico no início dos anos 1970. Vinton Cerf e Robert Kahn contribuíram para a interconexão de redes. Em 1983, a ARPANET adotou TCP/IP em substituição ao NCP; o DNS facilitou o uso de nomes legíveis. O desenvolvimento da World Wide Web por Tim Berners-Lee no CERN, entre 1989 e 1991, foi importante para a popularização da internet. O material também acompanha expansão da banda larga DSL, cabo, FTTH, Wi-Fi, 4G/5G, computação em nuvem e dispositivos conectados. Diferencie a internet como infraestrutura de redes e a Web como serviço sobre essa infraestrutura."
    }
  ]
};
