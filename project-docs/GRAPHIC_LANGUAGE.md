# Gravura Carmim: tinta em suspensão

Tese: pigmento que encontra uma forma, como a composição da tatuagem no corpo. O nome da artista ocupa a abertura; linhas verticais organizam capítulos completos.

Primitivas: planos retangulares, trilhos tipográficos, filetes e fotografia sem molduras inclinadas. Somente os índices reais dos capítulos, sem selos ou etiquetas fictícias. Nenhum emoji. Nenhum SVG no suminagashi.

Composição: trilho de 42px no mobile, 100px no desktop. Nome vertical legível sem bloquear o conteúdo. O corpo da seção flui ao lado. Galeria navegável por toque com acesso a todas as obras. Artista, processo e orçamento têm conteúdos distintos.

Alternativas avaliadas: deformar a imagem existente preservaria sua textura mas limitaria a transformação; simular líquido com múltiplos buffers ampliaria custo; campo de pigmento procedural com vórtices e bandas multiescala permite composição original controlada e movimento independente. Escolha: terceira alternativa em um canvas WebGL nativo, sem Three.js, modelos ou bibliotecas.

Shader original: domínio deformado por vórtices de amplitudes diferentes, bandas largas e filamentos finos de pigmento. Preto, osso, carmim e granulação; luz suave nas diferenças de densidade. Não se trata de uma simulação física exata do processo de suminagashi. A arte deve lembrar tinta em suspensão e nunca ondas luminosas ou uma superfície metálica.

Paleta: tinta #11100f, osso #e9e3d9, carmim #b92435, cinza #a69d98, linha #3c3432. Unbounded para marca e títulos; DM Sans para corpo; monospace do sistema em metadados. Serif removida para consolidar o brutalismo minimalista.

Licenças: código e shader próprios; fotos e imagem fallback fornecidos pelo cliente; fontes OFL locais com licenças. Nenhum asset, texto, geometria distintiva ou código de Faella reutilizado.

Referência estrutural inspecionada no navegador em 390 e 1440px: https://faellaink.com/. Leitura: apresentação forte, prova visual, artista, conversão, redes. Cursos e depoimentos não são transplantados pois não há conteúdo confirmado equivalente para Ítala.
