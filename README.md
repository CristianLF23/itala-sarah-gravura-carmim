# Ítala Sarah: capítulos e tinta em suspensão

Revisão com suminagashi procedural animado, organização por trilhos verticais e conteúdo completo. Mobile first, sem emojis.

## Acessar
https://itala-sarah-gravura-carmim.vercel.app

Código: https://github.com/CristianLF23/itala-sarah-gravura-carmim

Localmente, abra index.html ou execute node serve.cjs. Não há build nem dependências de produção. Fontes e ativos locais; conteúdo funciona sem JavaScript. A branch main está conectada à Vercel.

## Estrutura
Abertura com a marca e tinta animada. Portfólio com seis fotografias ampliáveis. Artista com apresentação e repertório. Processo com três etapas e um registro cicatrizado. Projeto com formulário visível, WhatsApp direto e perguntas frequentes.

Os trilhos identificam as quatro seções na lateral esquerda, inclusive no mobile. A fotografia do capítulo da artista mostra uma tatuagem do portfólio, não um retrato da artista.

## Arte e movimento
sumi.js contém um shader original que produz camadas de pigmento preto, osso e carmim, com deformações por vórtices e filamentos. A imagem é calculada pelo navegador e se transforma autonomamente. Não é SVG, vídeo, translação de foto ou simulação física exata de tinta sobre água.

Um único canvas e quad, um programa, sem texturas ou pós processamento por frame. Limite de 1 milhão de pixels, DPR até 1.25 e alvo de 30fps. O teste local em Chromium 1440x900 mediu aproximadamente 30fps, com buffer 1094x830; isso não é benchmark de iPhone físico. Qualidade é reduzida se o tempo de frame degrada de forma sustentada.

Pausar tinta interrompe a animação, que também pausa fora da viewport, em aba oculta e durante a galeria. Movimento reduzido, economia de dados, erro ou falta de WebGL mostram assets/sumi-poster.webp, renderizado a partir do mesmo shader. Perda e restauração do contexto foram verificadas.

## Interações
Toque na fotografia para ampliar. Anterior e Próxima percorrem as seis obras; as setas do teclado também funcionam. Escape fecha e devolve o foco. O formulário requer ideia, região do corpo, tamanho e cidade; nome é opcional. Preparar meu projeto cria um link de WhatsApp. Somente o visitante abre e envia a mensagem.

## Verificação e publicação
qa/chapters.cjs verifica 360, 390, 768 e 1440px, overflow, ausência de emojis no texto da interface, galeria, WhatsApp, FAQ, pausa, retomada, parada fora de tela, mudança visual autônoma e alternativas sem JavaScript/WebGL ou com movimento reduzido. Capturas disponíveis na entrega local. Os scripts QA usam o runtime desta estação e não são dependências do site.

.vercelignore exclui QA, documentos e mídias legadas não usadas. Produção requer index.html, styles.css, app.js, sumi.js e assets utilizados. Arquivos alterados e commits preservam as revisões anteriores no Git.

## Referências e direitos
Faella Ink foi inspecionado em desktop e mobile para entender o encadeamento de portfólio, artista e contato: https://faellaink.com/. Nenhum código, mídia, texto ou identidade visual desse site foi reutilizado.

MDN foi consultado para a implementação WebGL: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices

Código e shader originais. Fotografias autorizadas do projeto da Ítala, algumas com elementos incorporados das capturas do Instagram. Originais fotográficos e retrato real ainda podem melhorar o acabamento. Unbounded e DM Sans sob SIL Open Font License, com licenças na pasta fonts. Sem conteúdo de avaliações inventado, rastreamento, backend ou serviços pagos.

A skill graphic-element-generation orientou a escolha do campo procedural e seus limites de densidade, textura, contraste e movimento. Direção e orçamento registrados em project-docs/GRAPHIC_LANGUAGE.md e MOTION_SPEC.md.
