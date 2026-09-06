# Gravura Carmim

## Revisão vigente: identidade autoral e fundo contínuo
CONFIRMED: cliente autorizou todas as melhorias propostas, incluindo lettering próprio, tinta responsiva ao toque, fichas das obras e bastidores. Conteúdo ausente deve receber disclaimer. Solicitou fundo vivo no restante da página e autorizou exploração de Blender, Higgsfield e Seedance. Nenhum emoji.

Implementação: lettering original desenhado em paths (SVG apenas para a marca; suminagashi continua canvas WebGL), uma cena de tinta fixa atrás dos capítulos, proteção de contraste por superfícies translúcidas, controle de pausa global e gesto por pointer events passivos. As seis obras têm descrição visual factual, região, composição e detalhe ampliado da mesma fotografia. Desenho preparatório, fotografia cicatrizada específica e relato da artista são pendentes explicitamente sinalizados.

Retrato e três vídeos reais aguardam material, conforme avisos direcionados à Ítala. Blender 5.2.1 disponível localmente: cena em relevo, dois renders e master .blend gerados, com textura WebP incorporada ao site. Higgsfield teve instalação confirmada, mas conexão não concluída; ferramentas não disponíveis. Seedance não acionado e créditos não consumidos. Prompts e referências preparados em production/HIGGSFIELD-SEEDANCE.md. Gate PASS para entrega e publicação; geração remota não bloqueia a versão web.

## Revisão vigente: capítulos e suminagashi
CONFIRMED: a simplificação anterior foi excessiva. Referência estrutural Faella Ink inspecionada ao vivo no desktop e mobile. Cliente pede nomes das seções verticais na lateral esquerda, conteúdo completo, suminagashi autônomo sem SVG, originalidade e nenhum emoji. Direção: brutalismo minimalista, nome da artista como abertura e quatro capítulos completos: portfólio, artista, processo e formulário com dúvidas. Sem transplante de identidade ou conteúdo da referência.

Gate PASS para desenvolvimento e publicação no projeto existente. Suminagashi procedural original em canvas WebGL com alternativa estática gerada do mesmo shader. Não é simulação física exata de tinta; a deformação é calculada em tempo real. Movimento de pigmento, textura, pausa e limite de resolução documentados em GRAPHIC_LANGUAGE.md e MOTION_SPEC.md. Sem dependências adicionais.

Conteúdo: seis obras ampliáveis, fotografia real de tatuagem no capítulo da artista (retrato não recebido), três etapas do processo, registro cicatrizado, formulário de WhatsApp com quatro informações obrigatórias e nome opcional, três dúvidas. Atendimento e contatos mantidos. Nenhum depoimento fictício.

## Revisão vigente: simplificação
CONFIRMED: o cliente considerou a versão anterior excessiva e proibiu totalmente emojis no site. A nova revisão tem quatro seções: abertura, seleção de quatro obras, apresentação breve e contato. Foram retirados ticker, selos, frases repetidas, galeria duplicada, filtros e vídeo. Fundo abstrato limitado à abertura com deslocamento sutil pela rolagem; fotos reais recebem o protagonismo. Controles em texto, sem emojis ou símbolos decorativos. Formulário preservado sob abertura opcional; WhatsApp permanece visível. Publicação no mesmo projeto GitHub/Vercel autorizada pela continuidade do pedido. Gate PASS: conteúdo, destino e objetivo mantidos.

## Contexto e gate
Redesign de portfólio autoral guiado por referências. Marca parcial refinada a partir da escolha expressa de Gravura Carmim. Gate PASS para implementação local completa em 6 de setembro de 2026.

CONFIRMED: público interessado no repertório real da artista; orçamento no WhatsApp 5562993227097; Instagram italaartetattoo; atendimento em Anápolis, Goiânia e Brasília sem cidade base; formulário com ideia, região do corpo, tamanho e cidade; portfólio, processo, cicatrização, artista e contato.

CONFIRMED: dez referências mobile enviadas. Gravura Carmim domina a identidade; incorporar imagem vermelha do Brutalismo, vídeo da Galeria Rubi, faixa de obras da Noite Viva e gesto abstrato do Sumi. Desenvolver personalidade adicional, cabeçalho dinâmico, hover e rolagem expressiva.

Decisão: construção separada em itala-gravura-carmim. Não há pedido de substituição do site publicado nesta rodada. Entregar versão local revisável e pacote para publicação.

IMPORTANT: imagens existentes são capturas de portfólio, algumas com interface de Instagram. Utilizar os ativos autorizados sem inventar qualidade original. Fotografias em alta e retrato real permanecem pendências de conteúdo; não bloquear a construção. Não fabricar depoimentos, estatísticas, preços ou biografia.

## Direção
Preto de tinta #0b0909, papel #eee8dc, carmim #d31531, vinho #42151d, texto secundário #bcb0ac. Unbounded 800 para títulos de impacto; Cormorant Garamond itálico para pausas editoriais; DM Sans para leitura. Tipografia pesada alinhada à esquerda, amplos cortes de imagem, arte abstrata laqueada e selo IS original geométrico.

Assinatura: o caderno de gravuras se abre a partir de um campo de tinta em movimento. Abertura com dragão em vídeo normal, título sobreposto e pequenas provas fotográficas. A obra em destaque é revelada por uma moldura que se abre na rolagem. Portfólio alterna um conjunto de gravuras clicáveis e uma faixa editorial por toque.

## Motion
Rolagem nativa, requestAnimationFrame apenas quando há atualização; deslocamento e rotação limitados de camadas, sem alterar currentTime. Cabeçalho compacto ao rolar, progresso e seção ativa. Menu modal com entrada em etapas, foco contido e Escape. Galeria filtrável e lightbox com botões e teclado. Vídeo pausado fora de tela, em aba oculta e durante modais; economia de dados e movimento reduzido mantêm poster. Um botão global desliga movimento, com preferência local. Nenhum bloqueio da leitura por intro.

## Referências
21st: conexão gratuita indisponível; nenhuma chamada paga, obtenção de código ou instalação realizada.
Codrops: https://tympanus.net/codrops/2021/01/20/on-scroll-letter-animations/ consultado como princípio de ritmo tipográfico, sem código copiado.
MDN Intersection Observer: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API consultado para visibilidade e pausa de mídia.

## Tecnologia
HTML semântico, CSS mobile first, JavaScript nativo; sem dependência de produção. Fontes Google Fonts OFL hospedadas localmente com licenças. Imagens WebP responsivas otimizadas com sharp já disponível. Vídeo pertencente ao projeto. Sem CMS, backend, cobrança ou rastreamento introduzido.
