# Ítala Sarah | Gravura Carmim

Revisão simplificada: abertura com tinta carmim, quatro obras, apresentação breve e contato. Interface sem emojis e sem símbolos decorativos nos controles.

## Uso
Abra index.html ou execute node serve.cjs. HTML, CSS e JavaScript nativo, sem build ou dependências de produção. Ativos e fontes locais.

Obras abre a seleção. Toque em uma fotografia para ampliar; use Anterior, Próxima ou teclado. Escape fecha e devolve o foco. O contato abre WhatsApp; o formulário opcional prepara a mensagem sem enviá-la automaticamente.

## Publicação
GitHub: https://github.com/CristianLF23/itala-sarah-gravura-carmim
Vercel: https://itala-sarah-gravura-carmim.vercel.app
A branch main está conectada à Vercel. Arquivos de produção: index.html, styles.css, app.js e assets. .vercelignore exclui scripts locais e QA do deploy.

## Direção e validação
O princípio de contenção da skill frontend-design orientou a retirada de elementos concorrentes: vídeo, ticker, galeria duplicada, filtros, selos e blocos repetidos. A assinatura é a imagem de tinta na abertura; a galeria usa fotografias grandes, espaçamento e assimetria apenas no desktop. O mobile mantém uma obra por linha.

QA em Chromium, larguras 360, 390, 768 e 1440: navegação de galeria, fechamento, mensagem de WhatsApp, ausência de overflow e emojis. Conteúdo disponível sem JavaScript; movimento reduzido desliga o deslocamento do fundo. Emulação não equivale a teste em iPhone físico.

Fotografias existentes do projeto, algumas contendo interface de captura do Instagram. Fontes Unbounded, Cormorant Garamond e DM Sans sob SIL Open Font License, incluída em assets/fonts. Sem depoimentos inventados, backend ou rastreamento.
