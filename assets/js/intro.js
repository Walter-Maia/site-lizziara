/* Intro "a assinatura": a caneta escreve o monograma oficial em dourado sobre o taupe da marca e o nome sobe letra a letra.
   Os vetores vêm do sprite do index.html (#m-simbolo, #m-nome e as linhas da caneta #pena-*), extraídos dos PDFs da identidade.
   Mesma infraestrutura da intro da Liga ForDoctor: decisão no <head>, cobertura CSS com failsafe, dois rAF antes de tocar,
   fim natural + duas travas, pular por Esc/Tab/Enter/rolagem/roda/toque/clique/aba oculta, uma vez por sessão.
   Roteiro de tempos: comentário "Intro" em assets/css/style.css. */
(function () {
  'use strict';
  var raiz = document.documentElement;
  if (!raiz.classList.contains('intro-ativa')) return;

  var DURACAO = 2900;   // fim da coreografia (ms); igual ao --rise-start do CSS
  var SAIDA = 750;      // a cortina sobe
  var overlay = null, feito = false, timers = [];
  // caixa de cada letra do nome oficial (x e largura no sistema do nome, 792,83 × 65,9), medida no próprio vetor:
  // cada letra vira uma camada do tamanho dela (e não da largura do nome inteiro), bem menos para o navegador desenhar
  var LETRAS = [[0, 41.49], [52.4, 9.87], [73.36, 48.85], [134.13, 48.85], [193.89, 9.86], [214.02, 57.09], [281.74, 51.06], [340.96, 57.09], [433.39, 50.41], [486.56, 69.82], [567.56, 51.05], [630.98, 51.05], [694.4, 44.01], [746.93, 45.9]];

  function libera() {
    raiz.classList.remove('intro-ativa', 'intro-saindo');
    raiz.style.removeProperty('--rise-start');
  }
  function limpa() {
    timers.forEach(clearTimeout);
    document.removeEventListener('keydown', aoTeclar, true);
    document.removeEventListener('visibilitychange', aoOcultar);
    document.removeEventListener('wheel', aoGesto, true);
    document.removeEventListener('touchstart', aoGesto, true);
    document.removeEventListener('pointerdown', aoGesto, true);
    window.removeEventListener('scroll', aoGesto);
  }
  function termina(natural) {
    if (feito) return;
    feito = true;
    limpa();
    try { sessionStorage.setItem('lizziara-intro', '1'); } catch (e) { /* storage bloqueado */ }
    if (natural) { raiz.classList.add('intro-saindo'); raiz.classList.remove('intro-ativa'); } else libera();
    if (!overlay) return;
    overlay.classList.add(natural ? 'lz-saindo' : 'lz-pulada');
    if (!natural) overlay.style.cssText = 'opacity:0;transition:opacity .25s';
    // continua capturando cliques até sair do DOM
    setTimeout(function () { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, natural ? SAIDA + 40 : 300);
    if (natural) setTimeout(libera, SAIDA + 1600);
  }
  var ROLAGEM = { ' ': 1, PageDown: 1, PageUp: 1, ArrowDown: 1, ArrowUp: 1, End: 1, Home: 1 };
  function aoTeclar(e) {
    if (ROLAGEM[e.key]) { e.preventDefault(); termina(false); }
    else if (e.key === 'Escape' || e.key === 'Tab' || e.key === 'Enter') termina(false);
  }
  function aoOcultar() { if (document.hidden) termina(false); }
  function aoGesto(e) {
    if (e.type === 'pointerdown' && e.pointerType === 'touch') return;
    if (e.cancelable && (e.type === 'wheel' || e.type === 'touchstart')) e.preventDefault();
    termina(false);
  }

  function palco() {
    // as 14 letras do nome oficial viram camadas HTML (uma por letra) que sobem no compositor, lisas mesmo com a página ocupada
    var nome = '';
    var paths = document.querySelectorAll('#m-nome path');
    [].forEach.call(paths, function (p, i) {
      var c = paths.length === LETRAS.length ? LETRAS[i] : [0, 792.83];
      nome += '<div class="lz-letra" style="--i:' + i + ';left:' + (c[0] / 7.9283).toFixed(3) + '%;width:' + (c[1] / 7.9283).toFixed(3) + '%"><svg viewBox="' + c[0] + ' 0 ' + c[1] + ' 65.9" focusable="false"><path d="' + p.getAttribute('d') + '"/></svg></div>';
    });
    if (!nome) throw new Error('vetores da marca ausentes');
    // padrão de monogramas como ladrilho de fundo (imagem pequena repetida), feito do símbolo oficial: o navegador desenha o
    // ladrilho uma vez e repete, em vez de pintar centenas de cópias do símbolo numa camada do tamanho da tela
    var simbolo = document.querySelector('#m-simbolo').innerHTML;
    var ladrilho = '<svg xmlns="http://www.w3.org/2000/svg" width="132" height="150" viewBox="0 0 132 150" fill="#fff">' +
      '<svg x="14" y="12" width="44" height="45" viewBox="0 0 267.89 274.42">' + simbolo + '</svg>' +
      '<svg x="80" y="87" width="44" height="45" viewBox="0 0 267.89 274.42">' + simbolo + '</svg></svg>';
    // coordenadas do logotipo principal do PDF (símbolo acima do nome); o símbolo usa o próprio sistema (267,89 × 274,42).
    // O brilho é um segundo preenchimento do próprio símbolo, com um degradê que corre da esquerda para a direita: fica
    // sempre dentro do desenho (o brilho anterior era um retângulo recortado por máscara e vazava nas pontas).
    return '<div class="lz-padrao" style="background-image:url(&quot;data:image/svg+xml,' + encodeURIComponent(ladrilho) + '&quot;)"></div>' +
      '<div class="lz-palco"><div class="lz-cam">' +
        '<svg class="lz-svg" viewBox="143.59 476.78 792.83 323.42" aria-hidden="true" focusable="false">' +
          '<defs>' +
            '<mask id="lz-caneta" maskUnits="userSpaceOnUse" x="-20" y="-20" width="310" height="320"><use class="pena lz-p-laco" href="#pena-laco"/><use class="pena lz-p-l" href="#pena-l"/><use class="pena lz-p-i" href="#pena-i"/></mask>' +
            '<linearGradient id="lz-g-brilho" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="64" y2="30" gradientTransform="translate(-220 0)">' +
              '<stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>' +
              '<animateTransform class="lz-brilho-anda" attributeName="gradientTransform" type="translate" from="-140 0" to="360 0" dur="0.6s" begin="indefinite" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/>' +
            '</linearGradient>' +
          '</defs>' +
          '<svg x="441.29" y="476.78" width="197.41" height="202.22" viewBox="0 0 267.89 274.42" overflow="visible">' +
            '<g mask="url(#lz-caneta)"><use class="lz-simbolo" href="#m-simbolo"/><use href="#m-simbolo" fill="url(#lz-g-brilho)"/></g>' +
          '</svg>' +
        '</svg>' +
        '<div class="lz-nome" aria-hidden="true">' + nome + '</div>' +
      '</div><p class="lz-lema">Harmonização facial</p></div>';
  }

  try {
    if (performance.now() > 3000 || window.pageYOffset > 4) throw new Error('chegou tarde');
    overlay = document.createElement('div');
    overlay.className = 'lz-intro';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = palco();
    document.body.appendChild(overlay);

    document.addEventListener('keydown', aoTeclar, true);
    document.addEventListener('visibilitychange', aoOcultar);
    document.addEventListener('wheel', aoGesto, { capture: true, passive: false });
    document.addEventListener('touchstart', aoGesto, { capture: true, passive: false });
    document.addEventListener('pointerdown', aoGesto, true);
    window.addEventListener('scroll', aoGesto, { passive: true });

    var toca = function () {
      if (feito || overlay.classList.contains('lz-tocando')) return;
      overlay.classList.add('lz-tocando');
      // o brilho é SMIL: começa 1,5 s depois do início, junto com o fim da caneta
      var brilho = overlay.querySelector('.lz-brilho-anda');
      if (brilho && brilho.beginElementAt) { try { brilho.beginElementAt(1.5); } catch (e) { /* sem SMIL: sem brilho */ } }
      // o site entra quando a cortina começa a subir, contando do relógio real da página
      raiz.style.setProperty('--rise-start', ((performance.now() + DURACAO) / 1000).toFixed(2) + 's');
      timers.push(setTimeout(function () { termina(true); }, DURACAO));
    };
    requestAnimationFrame(function () { requestAnimationFrame(toca); });
    timers.push(setTimeout(toca, 250));                                                         // aba sem rAF
    timers.push(setTimeout(function () { if (!overlay.classList.contains('lz-tocando')) termina(false); }, 1500));
    timers.push(setTimeout(function () { termina(false); }, DURACAO + 2000));
  } catch (erro) {
    termina(false);
  }
})();
