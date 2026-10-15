# Dra. Lizziara Torres — site institucional

Site responsivo em HTML, CSS e JavaScript puro. Não requer instalação, framework ou compilação. Direção visual editorial com Cormorant Garamond e Jost, base branca, preto e marrom cacau, com o taupe, o creme e o dourado dos arquivos da marca (`assets/pdf/`). Somente fotografias fornecidas na pasta original.

Desde 15/10/2026 o site abre com uma intro animada feita a partir da identidade visual e tem efeitos de rolagem em todas as seções. Ver "Identidade e movimento".

## Abrir

Abra `index.html` no navegador ou execute, na pasta do projeto:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Acesse http://127.0.0.1:4173. A intro toca uma vez por sessão; para revê-la, use http://127.0.0.1:4173/?intro=1 (`?intro=0` desliga). Para hospedar, envie apenas `index.html` e `assets/`, **sem `assets/pdf/`**: os PDFs da identidade (36 MB, incluindo o receituário) são material de trabalho e estão no `.gitignore`. Os MDs de briefing, a pasta original de fotos e `verification/` não precisam ser publicados.

## Arquivos

- `index.html`: conteúdo, links reais, SVGs de ícones, metadados e dados estruturados `Dentist` (subtipo de MedicalBusiness/LocalBusiness).
- `assets/css/style.css`: identidade, responsividade em 640/900/1200px, estados de foco e movimento reduzido.
- `assets/js/main.js`: menu com suporte a teclado, carrossel nativo, navegação ativa, botões persistentes, evento de conversão e os efeitos de rolagem (blocos que se repetem a cada volta à tela, títulos linha a linha, parallax, faixa editorial, filete dos passos e barra de progresso).
- `assets/js/intro.js`: intro "a assinatura", uma vez por sessão.
- `assets/favicon.svg`: símbolo oficial da marca, com o traço engrossado para aparecer no tamanho de aba.
- Marca: o símbolo e o nome LIZZIARA TORRES ficam no sprite do `index.html` (`#m-simbolo` e `#m-nome`), em vetores extraídos dos PDFs da identidade, sem redesenho. As linhas `#pena-*` são o caminho da "caneta" que escreve o monograma. O lema "Harmonização facial" é texto, como no logotipo oficial.
- `assets/img/`: 10 fotografias selecionadas, versões WebP responsivas e fallback JPG; aproximadamente 1,27 MB somando todas as versões. O navegador só baixa a versão apropriada de cada fotografia.
- `verification/`: capturas, relatórios e scripts usados durante a montagem. Ferramentas de teste não são dependências do site.

## Dados confirmados pelo cliente

- Nome: Dra. Lizziara Torres.
- Profissão e registro: Cirurgiã-Dentista — CRO 42848.
- Cidade: Governador Valadares, MG.
- WhatsApp confirmado: +55 31 99282-0091.
- Instagram: https://www.instagram.com/dralizziaratorres/.

Os 17 links de WhatsApp apontam para `https://wa.me/5531992820091` com mensagem codificada; os seis procedimentos têm mensagens específicas. Nenhuma mensagem foi enviada durante a verificação.

## Pendências de conteúdo — [PREENCHER]

1. Endereço completo, no contato e no rodapé. O cliente informou que ainda não dispõe dele.
2. Dias e horários de atendimento.
3. E-mail de contato; remover a linha caso não seja utilizado.
4. Instituição de formação, cursos e trajetória profissional.
5. Nome do procedimento em cada um dos três registros comparativos.
6. Confirmação da autorização de uso das imagens clínicas. Há aviso visível na seção e no rodapé; substituir pela informação confirmada antes de publicar.
7. Seis depoimentos reais, texto e nome/iniciais com autorização. Os espaços atuais estão identificados como pendentes e **não são avaliações reais**. Estrelas são apenas elementos de composição desses espaços; não há nota nem avaliação inventada em dados estruturados.
8. Revisar com a profissional os textos dos seis procedimentos (frase, descrição e "O que podemos trabalhar"), escritos sem promessa de resultado e com "conforme avaliação" onde a indicação varia. A toxina botulínica manteve o texto anterior. Conferir se cada item está dentro do que ela realiza e das regras de publicidade do CFO.
9. O receituário (`assets/pdf/Receituário.pdf`) traz e-mail, endereço (Rua Israel Pinheiro, 2200, sala 803, Centro) e o telefone (33) 99940-0000, que parece um número de exemplo. Nada disso foi usado no site: confirmar com a cliente antes de preencher os itens 1 e 3.

Também revisar a apresentação em primeira pessoa e a citação proposta no briefing com a profissional. Anos de experiência, volume de pacientes, certificações, promessa de resposta em uma hora e avaliação gratuita não foram inventados. Foram usados o registro confirmado e diferenciais sem métricas como prova inicial. Caso desejado, inserir esses dados apenas depois de fornecidos. A profissão foi corrigida de esteticista para cirurgiã-dentista conforme a informação posterior do cliente.

O site está implementado para revisão local. A publicação definitiva depende de preencher ou remover os espaços pendentes. Não foi realizado deploy.

## Fotografias utilizadas

| Seção | Original em imagens de ref/ | Nome em assets/img/ |
|---|---|---|
| Hero | IMG_0237.JPG.jpeg | hero-lizziara |
| Sobre | IMG_0275.JPG.jpeg | sobre-lizziara |
| CTA final | IMG_0252.JPG.jpeg | contato-lizziara |
| Faixa editorial | IMG_0233.JPG.jpeg | tratamento-toxina |
| Faixa editorial | IMG_0245.JPG.jpeg | tratamento-labial |
| Faixa editorial | IMG_0265.JPG.jpeg | tratamento-harmonizacao |
| Faixa editorial | IMG_0260.JPG.jpeg | tratamento-ultrassom |
| Resultado 01 | IMG_1322.JPG.jpeg | resultado-01 |
| Resultado 02 | IMG_1323.JPG.jpeg | resultado-02 |
| Resultado 03 | IMG_1331.JPG.jpeg | resultado-03 |

As montagens clínicas originais foram preservadas, sem criar uma nova sequência antes/depois, alterar resultados ou atribuir procedimentos que não foram informados. Por isso não há rótulos temporais adicionais sobre as fotos: o material fornecido usa fotografias principais com comparações menores inseridas. Os quatro retratos de estúdio que ilustravam os tratamentos (eram retratos da profissional, não demonstrações) saíram dos cartões: os seis procedimentos agora usam ícones em traço, e os retratos passaram para a faixa editorial decorativa, sem texto alternativo porque a faixa é oculta para leitores de tela.

## Identidade e movimento (15/10/2026)

Base: os PDFs da identidade em `assets/pdf/` (logotipo principal e alternativo, símbolo, submarca, pattern, destaques, feed, story, mockup e receituário). Os vetores foram extraídos com o MuPDF e medidos no navegador; as cores foram lidas dos próprios arquivos: taupe `#C4B4A4`, creme `#EBE3D4`, preto, branco e o dourado em degradê (`#FBEBC7` → `#946B36`), cujo tom mais escuro é o cacau que o site já usava.

- **Intro "a assinatura"** (`assets/js/intro.js`, roteiro no fim do `style.css`): a página taupe da marca com o padrão de monogramas ao fundo; uma "caneta" escreve o monograma oficial em dourado (laço, L e pingo do i), um brilho corre por dentro do dourado, a câmera se afasta e LIZZIARA TORRES sobe letra a letra com "Harmonização facial" embaixo. A cortina sobe em 2,9 s e o site entra. Toca uma vez por sessão e pula com Esc, Tab, Enter, rolagem, roda, toque ou clique. Não aparece com movimento reduzido, com âncora na URL, sem JavaScript ou se o arquivo não carregar; nesses casos a cobertura taupe some sozinha em 4,8 s.
- **Hero**: cortina taupe que continua a da intro, foto que assenta, título em três linhas que sobem, a assinatura escrita atrás do texto e o selo da submarca sobre a foto. Com a rolagem, a foto desce mais devagar que a página e o anel do selo gira. Nada se move sozinho depois da entrada.
- **Rolagem**: blocos sobem e aparecem; títulos sobem linha a linha, cada linha de dentro da própria máscara; ícones são desenhados; a assinatura se escreve nas seções "O jeito de cuidar" (agora no taupe da marca) e "Agendamento"; a foto do "Sobre" abre em cortina com a moldura dourada andando em outra velocidade; o padrão de monogramas anda mais devagar nas faixas escuras; uma faixa editorial leva a frase "essencialmente você" para um lado e os retratos para o outro; o filete dourado dos passos cresce e acende 01, 02 e 03; uma barra dourada sob o cabeçalho mostra o progresso da leitura. Cada efeito se repete quando o bloco sai da tela e volta, rolando para baixo ou para cima.
- **Regras**: sem JavaScript tudo aparece no estado final; com `prefers-reduced-motion` nada se move e nada fica escondido; o que já está na tela ao carregar não é escondido. Tudo que acompanha a rolagem anda só por `transform`. Onde o navegador tem linhas do tempo de rolagem (Chrome, Edge, Safari 26), o próprio CSS move as camadas no compositor (`animation-timeline`); nos outros, o `main.js` faz a mesma conta com uma leitura de posição por quadro, só para as camadas perto da tela.
- **Procedimentos**: os seis que a profissional realiza, em cartões com ícone em traço próprio (seringa, gota, agulha com fio, caneta de microagulhamento, caneta de plasma e camadas da pele), cada um com link de WhatsApp com mensagem própria.

Hero/sobre/contato têm versões de até 1600px no maior lado; os demais, até 800px. Todas as imagens têm dimensões explícitas, texto alternativo e carregamento tardio, exceto o hero prioritário. Os HEICs foram inspecionados com suporte a HEIF, mas nenhum foi necessário entre as fotos selecionadas. Nenhum vídeo MOV é carregado; futuramente pode ser convertido a MP4 para um bloco editorial.

## Verificações

### 15/10/2026: intro, movimento e seis procedimentos

Edge headless (Windows), servidor local. Scripts em `verification/ferramentas/`, evidências em `verification/` (fora do git).

- **Responsividade, 18 telas** (`qa-responsivo.js`): 280×653, 320×568, 360×740, 375×667, 390×844, 414×896, 430×932, 844×390, 768×1024, 820×1180, 1024×768, 1180×820, 1280×800, 1366×768, 1440×900, 1600×900, 1920×1080 e 2560×1440. Todas OK:
  - sem rolagem lateral e nenhum texto cortado ou mais largo que a tela;
  - nenhum alvo de toque abaixo de 24 px. Os links do rodapé têm 28 px, e o menu do desktop e o botão do menu, herdados, têm 32 a 37 px;
  - sem palavra sozinha na última linha de títulos, frases e botões;
  - CTA visível na primeira tela (no hero ou no cabeçalho);
  - imagens nítidas para a densidade de cada tela, fontes carregadas e nenhuma imagem quebrada;
  - selo dentro da foto sem tocar a legenda e cabeçalho sem sobreposição;
  - nenhum bloco preso no estado inicial depois de rolar até ele;
  - nenhum erro de console.

  Capturas da página inteira em `verification/responsivo/capturas/`.
- **Intro** (`qa-intro.js`): toca e limpa o estado, não repete na sessão e toca na primeira visita. Esc, Tab (o foco vai para "Pular para o conteúdo") e a roda do mouse pulam. Não aparece com movimento reduzido, com âncora na URL, com o `intro.js` bloqueado nem sem JavaScript. Vídeos e folhas de quadros em `verification/rascunho/intro-1440*` e `intro-390*`.
- **Movimento** (`qa-movimento.js`, em 1440 e 390):
  - o hero entra e assenta;
  - os cartões tocam ao entrar, armam ao sair e tocam de novo na volta, vindo de baixo e de cima;
  - os títulos sobem por linha, com o itálico e o texto completos;
  - a assinatura se escreve até o fim;
  - a foto do hero, o selo, o padrão, a faixa, o filete dos passos e a barra de progresso andam com a rolagem;
  - com movimento reduzido: nenhuma animação rodando, nada escondido, nada deslocado.
- **Funcional** (`qa-funcional.js`):
  - primeiro Tab no "Pular para o conteúdo";
  - um H1, IDs únicos e imagens com `alt`;
  - os seis procedimentos na ordem pedida;
  - 17 links de WhatsApp com o número e a mensagem certos, cada procedimento com a sua;
  - evento `whatsapp_click` com a posição do botão;
  - menu do desktop e do celular: foco preso, Esc devolve o foco, link leva à seção;
  - barra do celular, botão flutuante e carrossel funcionando.
- **Texto**: comparado com a versão anterior, só mudaram os procedimentos, o lema "Harmonização facial" no logotipo e o depoimento pendente que citava o preenchimento labial.
- **Corrigido durante o QA**:
  - em 390 px algo passava 23 px da tela;
  - o cartão cortado na borda do carrossel ficava invisível;
  - havia palavras sozinhas em títulos e botões;
  - os links do rodapé tinham 22 px;
  - a legenda da foto estava em 8 px;
  - em 2560 px a coluna do contato ficava com cerca de 120 px. Esse defeito existia antes: o recuo usava a largura da janela, mas a grade para em 1440 px;
  - o nome da intro tinha um contorno escuro herdado.
- **Desempenho** (`qa-desempenho.js` e `trace-estilo.js`, CPU 4× mais lenta, rolagem real da página inteira):
  - **Celular (390 px)**: thread principal com cerca de 100 ms/s na versão anterior e cerca de 167 ms/s na nova; quadros acima de 34 ms em 0 a 0,1% nas duas.
  - **Desktop (1440 px)**: cerca de 200 ms/s na versão anterior (0,1% de quadros longos) e cerca de 720 ms/s na nova (12% a 16% de quadros longos, p95 de 50 a 67 ms). O custo vem das entradas que tocam em sequência quando a página rola rápido do topo ao fim e de volta, com três colunas na tela. Sem a CPU desacelerada, é cerca de um quarto disso. Ainda assim, é o ponto a vigiar num notebook fraco: se aparecer engasgo, a primeira coisa a cortar é o desenho dos ícones e a repetição das entradas no desktop.
  - **Otimização feita**:
    - entradas por `transform`;
    - títulos animados por linha, não por palavra;
    - armar sem transição;
    - linha dourada e sublinhado do menu só com `transform`/`opacity`;
    - parallax, faixa, selo, filete e barra de progresso por linhas do tempo de rolagem do CSS onde o navegador tem esse recurso.
    - camada própria para os traços desenhados (só o ícone repinta, não o cartão);
    - camada mantida nos blocos enquanto estão armados ou tocando.
  - **Resultado**: os recálculos de estilo das animações dos títulos caíram de cerca de 900 para cerca de 250 por rolagem, e os cartões deixaram de repintar a cada quadro.
  - **Ressalva**: as medições foram feitas com outros processos ocupando de 6% a 100% da CPU, e os números de uma mesma versão variaram até 2× entre rodadas. Vale repetir com a máquina livre e com o Lighthouse na hospedagem.
- **Lighthouse mobile** (local, mesma máquina carregada, em sequência):
  - versão nova, com a intro tocando como numa primeira visita: **Desempenho 86, Acessibilidade 100, Boas Práticas 100, SEO 100**, FCP 3,1 s, LCP 3,3 s, TBT 0 ms, CLS 0;
  - versão anterior, nas mesmas condições: 88, 100, 100 e 100, CLS 0,003.

  Os 99 de 09/09 foram medidos com a máquina livre, então não dá para comparar diretamente. A primeira rodada acusou contraste baixo no texto do hero porque pegou o meio do fade de entrada. O texto agora entra por recorte, sempre com a cor final.

### 15/10/2026, segunda rodada: abertura

Relato: às vezes a abertura ficava parada numa tela escura e não carregava; e, depois do logo, aparecia ao lado do ícone uma letra parecida com um "C" antes do nome.

- **O "C"**: era o brilho que atravessava o dourado. Ele era um retângulo branco recortado por uma máscara do símbolo; com a câmera se afastando, a máscara era desenhada em resolução menor e o branco vazava na ponta da cauda e embaixo do L (confirmado congelando a intro com e sem o brilho). Agora o brilho é um segundo preenchimento do próprio símbolo, com um degradê que corre por dentro: não tem como sair do desenho. O nome também passou a nascer só com a câmera parada no enquadramento final, para nenhuma letra aparecer solta perto do ícone.
- **Tela parada**: a tela escura não se repetiu em 8 gravações (normal, CPU 6× mais lenta, rede 3G sem cache, GPU real; 390 e 1440 px; nenhum quadro escuro). O que se repete é a página levar segundos para o primeiro layout em máquina lenta ou ocupada (igual à versão anterior), com a caneta travando no começo da intro. Correções:
  - as seções abaixo da dobra só são montadas quando chegam perto da tela (`content-visibility`): no carregamento o navegador monta cerca de 270 objetos em vez de 1.230; com a CPU 4× mais lenta, o layout do carregamento caiu de cerca de 3,2 s para 1,5–2 s e a intro passou a começar bem antes;
  - o `main.js` só registra os efeitos de rolagem e monta os títulos (o que força um layout da página) depois da intro e da entrada do hero; sem intro, quando o navegador fica ocioso;
  - as letras do nome sobem em camadas HTML (compositor), lisas mesmo com a página ocupada; cada camada tem o tamanho da própria letra (caixas medidas no vetor oficial), cerca de 17× menos área para o navegador desenhar do que camadas da largura do nome;
  - o padrão de monogramas da intro virou um ladrilho pequeno (feito do símbolo oficial) repetido como imagem de fundo, em vez de um SVG do tamanho da tela com centenas de cópias do símbolo;
  - a própria camada da intro some sozinha em 6 s, mesmo se o JavaScript parar (a cobertura do `<html>` já sumia em 4,8 s);
  - o fundo provisório da foto do hero passou do cinza quase preto para o taupe da marca: com a foto ainda carregando (rede lenta), a primeira tela não parece mais uma tela preta.
  - o `content-visibility` vale só durante a abertura: o `main.js` marca o `<html>` com `.montado` depois dela, no primeiro clique num link interno ou, já no `<head>`, quando a URL vem com âncora ou é recarga ou volta do histórico. Sem isso, a rolagem até uma seção errava o lugar em até 450 px (o teste funcional pegou isso no menu do celular).
  - abrindo a página direto numa seção (`#sobre`, `#contato`…), a âncora era empurrada pelas fontes e pelos títulos que assentam depois. Isso já acontecia na versão anterior: parava a 52–73 px do topo, em vez de 100. Agora a página volta à âncora quando tudo assenta, a não ser que a pessoa já tenha rolado, e para nos 100 px previstos em 390 e 1440 px.
- **Resultado** (CPU normal, 390 px, `intro-quadros.js`):
  - durante a coreografia, de 175 a 191 quadros, com 1% a 2,7% acima de 34 ms;
  - os quadros longos ficam no primeiro meio segundo ou na subida da cortina. Nesses momentos o trace mostra só o processo da GPU, enviando a foto do hero e as camadas da página, e o cache de disco do navegador; a thread principal e a intro não aparecem;
  - a escrita do monograma e a subida do nome ficam lisas;
  - o `main.js` só trabalha depois da abertura (cerca de 56 ms, aos 5,8 s).
- **Testes depois das correções**: intro (10 cenários), efeitos em 1440 e 390 px, funcional (13 itens) e responsividade em 280, 390, 768, 1440 e 2560 px, todos OK. Vídeos finais em `verification/rascunho/abertura-final-1440.mp4` e `abertura-final-390.mp4`.
- **Nota sobre os testes**: os scripts de intro e funcional usavam uma porta fixa de depuração do Edge e às vezes se ligavam a um navegador de teste antigo, travado naquela porta, o que parecia a página travando. Agora usam porta aleatória. Nas sondas, a página respondeu a cada 300 ms durante toda a intro.

### 09/09/2026: versão anterior

- Chromium/Playwright: 320, 375, 390, 640, 900, 1200 e 1440px, sem overflow horizontal.
- Em 390px, CTA de WhatsApp visível no cabeçalho no primeiro frame, sem rolagem. Foto 4:5 aparece antes do texto.
- Menu abre e fecha, Escape fecha e devolve foco, Tab permanece no menu enquanto aberto.
- Carrossel avança no mobile; setas ficam desabilitadas quando não há conteúdo fora da área visível.
- Barra inferior aparece depois do hero; círculo verde é exclusivo do desktop após 25% da rolagem.
- 15 links de WhatsApp válidos estruturalmente e com o número confirmado; evento `whatsapp_click` verificado com função de teste, sem coletar dados.
- Nenhuma imagem quebrada, nenhum erro JavaScript; um único H1.
- `prefers-reduced-motion` mantém o conteúdo visível sem entrada animada.
- Capturas de hero, tratamentos, sobre e CTA final em `verification/390-*.png` e `verification/1440-*.png`.
- Lighthouse mobile local em 09/09/2026: **Performance 99, Acessibilidade 100, Boas Práticas 100, SEO 100**. CLS 0,003. Relatório em `verification/lighthouse.json`. A CLI apresentou erro de limpeza do diretório temporário no Windows após gravar o relatório; a auditoria foi concluída e os resultados foram preservados. Resultados na hospedagem podem variar.

## Contrastes calculados

| Texto / fundo | Razão |
|---|---|
| Preto / branco | 18,79:1 |
| Preto / off-white | 17,14:1 |
| Grafite / branco | 6,91:1 |
| Grafite / off-white | 6,31:1 |
| Cacau / branco, ou branco / cacau | 8,63:1 |
| Cacau / off-white | 7,87:1 |
| Branco / espresso | 14,11:1 |
| Camelo / preto | 7,47:1 |
| Camelo / espresso | 5,61:1 |
| Areia / espresso | 11,02:1 |
| Preto / verde WhatsApp | 9,48:1 |

Todos os pares de texto sólido atendem AA. Champanhe aparece somente em filetes e estrelas decorativas. As legendas brancas sobre fotografia foram verificadas visualmente, pois o contraste depende do recorte e não pode ser representado por um único par de cores.

## Hospedagem e mensuração

Ao definir o domínio, substituir `og:image` por uma URL HTTPS absoluta, adicionar canonical/og:url e completar o endereço/horários no JSON-LD. Dados desconhecidos foram omitidos do JSON-LD para não publicar endereço ou horário fictício. Configurar cache de arquivos estáticos e compressão na hospedagem.

O Google Fonts é carregado de forma assíncrona, com `display=swap`, preconnect e fallback para JavaScript desativado. Não há outras dependências externas de execução. O snippet GA4/Pixel está reservado em comentário no head: quando `gtag` existir, o JS envia `whatsapp_click` com a posição do CTA. Analytics não foi instalado nem ativado.
