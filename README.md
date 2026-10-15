# Dra. Lizziara Torres — site institucional

Site responsivo em HTML, CSS e JavaScript puro. Não requer instalação, framework ou compilação. Direção visual editorial com Cormorant Garamond e Jost, base branca, preto e marrom cacau. Somente fotografias fornecidas na pasta original.

## Abrir

Abra `index.html` no navegador ou execute, na pasta do projeto:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Acesse http://127.0.0.1:4173. Para hospedar, envie apenas `index.html` e `assets/`. Os MDs de briefing, a pasta original de fotos e `verification/` não precisam ser publicados.

## Arquivos

- `index.html`: conteúdo, links reais, SVGs de ícones, metadados e dados estruturados `Dentist` (subtipo de MedicalBusiness/LocalBusiness).
- `assets/css/style.css`: identidade, responsividade em 640/900/1200px, estados de foco e movimento reduzido.
- `assets/js/main.js`: menu com suporte a teclado, carrossel nativo, navegação ativa, entrada suave, botões persistentes e evento de conversão.
- `assets/favicon.svg`: monograma LT.
- `assets/img/`: 10 fotografias selecionadas, versões WebP responsivas e fallback JPG; aproximadamente 1,27 MB somando todas as versões. O navegador só baixa a versão apropriada de cada fotografia.
- `verification/`: capturas, relatórios e scripts usados durante a montagem. Ferramentas de teste não são dependências do site.

## Dados confirmados pelo cliente

- Nome: Dra. Lizziara Torres.
- Profissão e registro: Cirurgiã-Dentista — CRO 42848.
- Cidade: Governador Valadares, MG.
- WhatsApp confirmado: +55 31 99282-0091.
- Instagram: https://www.instagram.com/dralizziaratorres/.

Os 15 links de WhatsApp apontam para `https://wa.me/5531992820091` com mensagem codificada; os quatro tratamentos têm mensagens específicas. Nenhuma mensagem foi enviada durante a verificação.

## Pendências de conteúdo — [PREENCHER]

1. Endereço completo, no contato e no rodapé. O cliente informou que ainda não dispõe dele.
2. Dias e horários de atendimento.
3. E-mail de contato; remover a linha caso não seja utilizado.
4. Instituição de formação, cursos e trajetória profissional.
5. Nome do procedimento em cada um dos três registros comparativos.
6. Confirmação da autorização de uso das imagens clínicas. Há aviso visível na seção e no rodapé; substituir pela informação confirmada antes de publicar.
7. Seis depoimentos reais, texto e nome/iniciais com autorização. Os espaços atuais estão identificados como pendentes e **não são avaliações reais**. Estrelas são apenas elementos de composição desses espaços; não há nota nem avaliação inventada em dados estruturados.

Também revisar a apresentação em primeira pessoa e a citação proposta no briefing com a profissional. Anos de experiência, volume de pacientes, certificações, promessa de resposta em uma hora e avaliação gratuita não foram inventados. Foram usados o registro confirmado e diferenciais sem métricas como prova inicial. Caso desejado, inserir esses dados apenas depois de fornecidos. A profissão foi corrigida de esteticista para cirurgiã-dentista conforme a informação posterior do cliente.

O site está implementado para revisão local. A publicação definitiva depende de preencher ou remover os espaços pendentes. Não foi realizado deploy.

## Fotografias utilizadas

| Seção | Original em imagens de ref/ | Nome em assets/img/ |
|---|---|---|
| Hero | IMG_0237.JPG.jpeg | hero-lizziara |
| Sobre | IMG_0275.JPG.jpeg | sobre-lizziara |
| CTA final | IMG_0252.JPG.jpeg | contato-lizziara |
| Toxina | IMG_0233.JPG.jpeg | tratamento-toxina |
| Preenchimento | IMG_0245.JPG.jpeg | tratamento-labial |
| Harmonização | IMG_0265.JPG.jpeg | tratamento-harmonizacao |
| Ultrassom | IMG_0260.JPG.jpeg | tratamento-ultrassom |
| Resultado 01 | IMG_1322.JPG.jpeg | resultado-01 |
| Resultado 02 | IMG_1323.JPG.jpeg | resultado-02 |
| Resultado 03 | IMG_1331.JPG.jpeg | resultado-03 |

As montagens clínicas originais foram preservadas, sem criar uma nova sequência antes/depois, alterar resultados ou atribuir procedimentos que não foram informados. Por isso não há rótulos temporais adicionais sobre as fotos: o material fornecido usa fotografias principais com comparações menores inseridas. Fotos de estúdio nos tratamentos são retratos da profissional, não demonstrações do procedimento.

Hero/sobre/contato têm versões de até 1600px no maior lado; os demais, até 800px. Todas as imagens têm dimensões explícitas, texto alternativo e carregamento tardio, exceto o hero prioritário. Os HEICs foram inspecionados com suporte a HEIF, mas nenhum foi necessário entre as fotos selecionadas. Nenhum vídeo MOV é carregado; futuramente pode ser convertido a MP4 para um bloco editorial.

## Verificações

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
