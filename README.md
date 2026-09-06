# Ítala Sarah | Gravura Carmim

Site completo para avaliação da nova direção autoral, construído a partir das dez referências escolhidas. Mobile first com vídeo, navegação dinâmica, galeria, artista, processo, cicatrização, dúvidas e orçamento no WhatsApp.

## Abrir
Abra index.html no navegador ou execute node serve.cjs e acesse http://127.0.0.1:4182.
Não requer instalação, build, chave de API ou serviço pago. Fontes, fotografias e vídeo são locais.

## O que experimentar
1. Role a abertura: o plano do dragão se move com a página e o cabeçalho fica compacto.
2. Abra Menu. Navegue pelas seções ou pressione Escape.
3. Observe a moldura da obra vermelha se abrir conforme entra na tela.
4. Filtre o portfólio. Toque em uma gravura, navegue pelas obras e abra a conversa sobre seu projeto.
5. Deslize a faixa Histórias com pulso ou use Anterior e Próximo.
6. Abra as dúvidas.
7. Preencha a ideia, região, tamanho e cidade. Preparar mensagem gera o link; só Abrir WhatsApp abre o aplicativo. O visitante decide enviar.
8. Pause o movimento pelo controle da abertura. A escolha fica salva neste navegador.

## Publicação
Copiar index.html, styles.css, app.js e a pasta assets para um servidor estático ou GitHub Pages. Não há caminho absoluto de produção nem URL de origem hardcoded.
O novo site está separado do laboratório e da V3. Esta entrega não alterou o site publicado.

## Arquivos
index.html: conteúdo semântico e oito obras.
styles.css: sistema visual, estilos mobile e melhorias progressivas para telas maiores.
app.js: vídeo, movimento, menu, filtros, lightbox e formulário.
assets: mídia responsiva, poster, fundo abstrato, fontes e suas licenças.
project-docs/DISCOVERY_STATE.md: escopo, direção e decisão de movimento.
qa: capturas e resultados de testes em 360, 390, 768 e 1440 pixels.

## Conteúdo e limites
As fotografias autorizadas do portfólio atual são capturas e algumas contêm elementos da interface do Instagram. Estão preservadas e otimizadas, mas originais em alta devem substituí-las para o acabamento definitivo.
O bloco A artista usa uma fotografia de tatuagem, não um retrato inventado. A redação em primeira pessoa é proposta editorial para revisão pela Ítala. Não há depoimentos fictícios.
Teste automatizado em Chromium com emulação de toque não equivale a teste físico em iPhone. Safari real e rede móvel são verificações recomendadas antes do lançamento definitivo.
Não há CMS, rastreamento, backend de formulário ou dados pessoais armazenados. O orçamento é enviado por ação explícita do visitante no WhatsApp.

## Créditos e referências
Fotografias e vídeo: materiais disponibilizados no projeto da Ítala.
Fundo abstrato: imagem fornecida e aprovada pelo cliente.
Fontes: Unbounded, Cormorant Garamond e DM Sans, Google Fonts, SIL Open Font License. As cópias da licença estão em assets/fonts.
Codrops foi consultado como referência de ritmo e tipografia em movimento: https://tympanus.net/codrops/2021/01/20/on-scroll-letter-animations/
MDN para visibilidade e reprodução: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
21st: conexão gratuita indisponível, nenhum código obtido ou instalado.
Código, composição, máscaras, selo IS e favicon desta versão são originais. Não há Three.js ou GSAP nesta implementação; as interações usam APIs nativas.
