# Movimento da tinta

Revisão de fundo contínuo: um canvas fixo ocupa o viewport e segue visível nos demais capítulos, substituindo a regra de pausa ao sair da abertura. Continua pausando quando o canvas está fora da viewport, aba oculta, modal aberto, pausa manual ou movimento reduzido. Nenhum segundo contexto WebGL. Deslocamento suave da composição acompanha o progresso da página. Gesto por pointer events passivos adiciona um vórtice local e dissipa sua influência; links, formulário e rolagem nativa preservados. O controle de pausa é global.

Revisão de intensidade solicitada pelo cliente: velocidade temporal de 0.11 para 0.22; amplitudes dos quatro vórtices de 0.35/0.28/0.23/0.28 para 0.60/0.50/0.44/0.48. Deslocamento de fundo de 0.08 para 0.12. Composição inicial preservada por compensação dos termos em cosseno. Mesmo orçamento de renderização e controles de pausa.

Intenção: pigmento se move sozinho na abertura, criando continuidade orgânica dentro da estrutura tipográfica rígida. Rolagem normal, sem pin ou seek de vídeo. Fotos e botões têm respostas discretas ao hover.

Orçamento: um quad e um programa WebGL; nenhum asset de terceiros, nenhuma textura por frame, nenhum pós processamento. Resolução limitada a 1 milhão de pixels e DPR máximo 1.25, alvo 30fps. Reduzir resolução caso intervalos medidos fiquem acima de 50ms de forma sustentada. Conteúdo HTML independente do canvas.

Pausa: fora da viewport, aba oculta, galeria aberta, botão Pausar tinta. Retomar sem salto de tempo. prefers-reduced-motion e economia de dados usam fallback estático e não iniciam o loop. Falha de compilação ou perda de contexto mostra fallback. ResizeObserver altera somente o buffer quando necessário.

QA: comprovar mudança visual autônoma, pixels estáveis durante pausa e fora da tela, retomada, movimento reduzido, indisponibilidade e perda/restauração de contexto, alinhamento das legendas verticais em 360/390/768/1440, galeria e formulário. Medidas no Chromium local são emulação, não benchmark de aparelho físico.

Orientação técnica consultada: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices
