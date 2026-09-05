# Direção visual — A Paz do Diabo

## Ground truth da referência

Esta página é uma **clonagem de alta fidelidade** da referência fornecida em `https://embrace-your-story-08.lovable.app/`. A referência prevalece sobre qualquer preferência estética genérica: preservar a narrativa, a atmosfera, os contrastes, a hierarquia, o conteúdo e o ritmo vertical da landing page. As extensões solicitadas devem parecer nativas da página original, sem introduzir um novo sistema visual.

## Design Read

- **Artefato:** landing page de venda de e-book espiritual.
- **Público:** leitores cristãos interessados em reflexão, fé e transformação pessoal.
- **Linguagem visual:** editorial devocional barroca, escura, cinematográfica e iluminada por dourado de vitral.
- **Modo:** extensão com preservação estrita.
- **Variação visual:** 2/10.
- **Intensidade de movimento:** 3/10; entradas suaves e discretas.
- **Densidade de informação:** 6/10.
- **Dependência de assets:** 9/10.
- **Fidelidade de marca/referência:** 10/10.

## Sistema preservado

- **Paleta:** fundo quase preto e marrom-carvão; texto marfim; acentos em dourado envelhecido; superfícies de papel em creme quente; linhas e bordas em ouro de baixa opacidade.
- **Tipografia:** serif display de alto contraste para títulos e preço; sans-serif neutra e compacta para corpo, metadados e CTAs.
- **Espaçamento:** ritmo amplo, com seções respiradas e divisores ornamentais; escala base aproximada de 8 px.
- **Raio de borda:** baixo a moderado; mockups com cantos arredondados de dispositivo, cards mais contidos e sem excesso de pílulas.
- **Sombras:** sombras profundas e difusas nos dispositivos; brilho dourado pontual apenas em focos interativos.
- **Movimento:** `cubic-bezier(0.23, 1, 0.32, 1)`, 700–1000 ms na entrada dos dispositivos, stagger curto entre mockups; respeitar `prefers-reduced-motion`.

## Arquitetura da página

1. Hero com fundo fotográfico de vitral, título central, oferta limitada, subtítulo, dois CTAs e prova de garantia/acesso.
2. Seção de capítulos com seis blocos editoriais numerados em algarismos romanos.
3. Seção de promessas com frases de transformação, iniciais ornamentais e referências bíblicas.
4. Seção sobre C. H. Spurgeon com retrato, biografia e métricas.
5. Seção de oferta com contagem regressiva, capa, lista de bônus, preço e CTA.
6. **Extensão solicitada:** faixa de mockups com a capa e páginas internas dos e-books, incluindo tablet e telefone, entrada suave ao aparecer no viewport e CTA diretamente abaixo dos mockups.
7. Garantia, FAQ expansível, CTA final e rodapé.

## Decisões da extensão

- Os mockups usarão a capa do e-book e páginas internas editoriais reais, com composição de tablet + telefone, preservando o contraste escuro e o dourado da referência.
- A animação será uma entrada de `opacity + translateY + leve rotate`, sem escalar a partir de zero, com atraso pequeno entre dispositivos.
- O CTA abaixo dos mockups será visualmente equivalente ao CTA principal: “QUERO MINHA PAZ AGORA — R$ 27,90”, com linha de apoio “Acesso liberado em menos de 2 minutos”.
- Os assets visuais gerados ficam fora do diretório do projeto e são referenciados pelos caminhos persistentes fornecidos pelo ambiente.

## Contratos de conteúdo

Preservar os textos existentes na referência, incluindo título, subtítulo, capítulos, promessas, biografia, oferta, garantia, perguntas frequentes e CTA. Não criar avaliações, depoimentos ou métricas de clientes que não existam na referência.

## Brand essence

**Uma leitura breve e incisiva para quem quer distinguir a paz que adormece da paz que transforma.** Personalidade: sóbria, penetrante, luminosa.

## Brand voice

Headlines são contemplativas e afirmativas; CTAs são diretos, urgentes e sem exagero; microcopy transmite segurança e clareza. Exemplos preservados: “A paz que o mundo oferece é uma ilusão. A paz de Deus transforma.” e “A Paz Verdadeira Está a Um Clique de Distância”.

## Wordmark & símbolo

O símbolo de apoio é uma estrela de oito pontas em ouro envelhecido, sem texto, usada como marca ornamental no header, favicon e divisores. O wordmark continua sendo tipográfico em serif editorial, sem converter o nome em imagem.

## Cor proprietária

**Ouro Vitral — `#C8A45D`**, um dourado queimado e antigo usado apenas para iluminar promessa, ação e detalhe editorial.
