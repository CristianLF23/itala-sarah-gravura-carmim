# Movimento da tinta

Intenção: pigmento se move sozinho na abertura, criando continuidade orgânica dentro da estrutura tipográfica rígida. Rolagem normal, sem pin ou seek de vídeo. Fotos e botões têm respostas discretas ao hover.

Orçamento: um quad e um programa WebGL; nenhum asset de terceiros, nenhuma textura por frame, nenhum pós processamento. Resolução limitada a 1 milhão de pixels e DPR máximo 1.25, alvo 30fps. Reduzir resolução caso intervalos medidos fiquem acima de 50ms de forma sustentada. Conteúdo HTML independente do canvas.

Pausa: fora da viewport, aba oculta, galeria aberta, botão Pausar tinta. Retomar sem salto de tempo. prefers-reduced-motion e economia de dados usam fallback estático e não iniciam o loop. Falha de compilação ou perda de contexto mostra fallback. ResizeObserver altera somente o buffer quando necessário.

QA: comprovar mudança visual autônoma, pixels estáveis durante pausa e fora da tela, retomada, movimento reduzido, indisponibilidade e perda/restauração de contexto, alinhamento das legendas verticais em 360/390/768/1440, galeria e formulário. Medidas no Chromium local são emulação, não benchmark de aparelho físico.

Orientação técnica consultada: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices
