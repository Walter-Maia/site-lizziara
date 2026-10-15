/* Navegação, leitura, conversão e movimento. Sem dependências.
   Regra geral: sem JS todo o conteúdo aparece; com movimento reduzido tudo nasce no estado final;
   o que está na tela no carregamento não é escondido; os efeitos de entrada se repetem a cada volta à tela. */
(() => {
  'use strict';
  const doc = document;
  const raiz = doc.documentElement;
  const header = doc.querySelector('.header');
  const toggle = doc.querySelector('.menu-toggle');
  const menu = doc.querySelector('.mobile-nav');
  const hero = doc.querySelector('.hero');
  const floating = doc.querySelector('.floating-wa');
  const mobileBooking = doc.querySelector('.mobile-booking');
  const progresso = doc.querySelector('.progresso');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const temIO = 'IntersectionObserver' in window;
  const semMovimento = () => reduceMotion.matches || !temIO;

  function setMenu(open, restoreFocus = true) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    doc.body.classList.toggle('menu-open', open);
    if (open) menu.querySelector('a').focus();
    else if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setMenu(menu.hidden));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    setMenu(false, false);
    const target = doc.querySelector(link.getAttribute('href'));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  }));
  doc.addEventListener('keydown', event => {
    if (menu.hidden) return;
    if (event.key === 'Escape') setMenu(false);
    if (event.key !== 'Tab') return;
    const focusable = [toggle, ...menu.querySelectorAll('a')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && doc.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && doc.activeElement === last) {
      event.preventDefault(); first.focus();
    } else if (!focusable.includes(doc.activeElement)) {
      event.preventDefault(); first.focus();
    }
  });
  window.matchMedia('(min-width: 1200px)').addEventListener('change', event => {
    if (event.matches && !menu.hidden) setMenu(false, false);
  });

  /* Camadas que andam com a rolagem. Onde o navegador tem linhas do tempo de rolagem (animation-timeline), o CSS faz tudo no
     compositor e aqui só ficam as classes (cabeçalho, botões, passos acesos). Nos outros, cada camada mede um contêiner que
     não se move e escreve só transform (ou --k nos passos); só as perto da tela são calculadas; lê tudo antes de escrever. */
  const rolagemNoCss = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline: view()'));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const progressoNaTela = (r, vh) => clamp((vh - r.top) / (vh + r.height), 0, 1);
  const camadas = [];
  const TIPOS = {
    // foto do hero: desce mais devagar que a página (a imagem sobra 10% em cima e embaixo da moldura)
    hero: (el, r) => { const s = clamp(-r.top / r.height, 0, 1); el.style.transform = `translate3d(0,${(s * .1 * r.height).toFixed(1)}px,0)`; },
    // anel do selo: gira com a rolagem
    selo: (el, r) => { el.style.transform = `rotate(${(-r.top * .14).toFixed(2)}deg)`; },
    // padrão de monogramas e assinaturas: mais devagar que a página
    padrao: (el, r, vh) => { el.style.transform = `translate3d(0,${((.5 - progressoNaTela(r, vh)) * 160).toFixed(1)}px,0)`; },
    marca: (el, r, vh) => { el.style.transform = `translate3d(0,${((.5 - progressoNaTela(r, vh)) * 110).toFixed(1)}px,0)`; },
    // moldura dourada do "Sobre": na diagonal, contra a foto
    moldura: (el, r, vh) => { const d = (.5 - progressoNaTela(r, vh)) * 56; el.style.transform = `translate3d(${(-d * .5).toFixed(1)}px,${d.toFixed(1)}px,0)`; },
    // fotos em moldura fixa: a imagem sobra 8% em cima e embaixo
    foto: (el, r, vh) => { el.style.transform = `translate3d(0,${((progressoNaTela(r, vh) - .5) * .14 * r.height).toFixed(1)}px,0)`; }
  };
  const medidaDe = (el, tipo) => {
    if (tipo === 'selo') return hero;
    if (tipo === 'hero') return el.parentElement;
    if (tipo === 'foto') return el.parentElement;
    if (tipo === 'moldura') return el.parentElement;
    return el.closest('section, .faixa') || el.parentElement;
  };
  // faixa editorial: a frase vai para a esquerda e os retratos para a direita
  const faixa = doc.querySelector('[data-faixa]');
  const linhasDaFaixa = faixa ? [...faixa.querySelectorAll('[data-faixa-linha]')] : [];
  let larguras = [];
  const medeFaixa = () => { larguras = linhasDaFaixa.map(l => Math.max(0, l.scrollWidth - window.innerWidth * .92)); };
  // passos: o filete dourado cresce enquanto a lista atravessa a tela e acende cada número
  const passos = doc.querySelector('[data-passos]');
  const linhaDosPassos = passos && passos.querySelector('.steps-linha');
  const listaDePassos = passos ? [...passos.querySelectorAll('.step')] : [];

  let pedido = 0;
  let movendo = false;
  function quadro() {
    pedido = 0;
    const vh = window.innerHeight;
    const y = window.scrollY;
    const alcance = doc.documentElement.scrollHeight - vh;
    const passouDoHero = hero.getBoundingClientRect().bottom <= header.offsetHeight;
    const lidas = movendo && !rolagemNoCss ? camadas.filter(c => c.perto).map(c => [c, c.medida.getBoundingClientRect()]) : [];
    const rFaixa = movendo && !rolagemNoCss && faixa && faixa.perto ? faixa.getBoundingClientRect() : null;
    const rPassos = movendo && passos && passos.perto ? passos.getBoundingClientRect() : null;
    // escritas
    header.classList.toggle('scrolled', y > 15);
    floating.classList.toggle('visible', alcance > 0 && y / alcance > .25);
    mobileBooking.classList.toggle('visible', passouDoHero);
    if (!movendo) return;
    if (!rolagemNoCss) progresso.style.transform = `scaleX(${alcance > 0 ? clamp(y / alcance, 0, 1).toFixed(4) : 0})`;
    lidas.forEach(([c, r]) => TIPOS[c.tipo](c.el, r, vh));
    if (rFaixa) {
      const p = progressoNaTela(rFaixa, vh);
      linhasDaFaixa.forEach((l, i) => {
        const x = Number(l.dataset.faixaLinha) < 0 ? -larguras[i] * p : -larguras[i] * (1 - p);
        l.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      });
    }
    if (rPassos) {
      // mesma faixa do CSS (animation-range: cover 22vh cover 62%)
      const k = clamp((vh * .78 - rPassos.top) / ((vh + rPassos.height) * .62 - vh * .22), 0, 1);
      if (!rolagemNoCss) linhaDosPassos.style.setProperty('--k', k.toFixed(3));
      listaDePassos.forEach((s, i) => s.classList.toggle('ativo', k >= (listaDePassos.length > 1 ? i / (listaDePassos.length - 1) : 0) * .98));
    }
  }
  const agenda = () => { if (!pedido) pedido = requestAnimationFrame(quadro); };
  window.addEventListener('scroll', agenda, { passive: true });
  window.addEventListener('resize', () => { medeFaixa(); agenda(); }, { passive: true });

  function ligaMovimento() {
    if (semMovimento() || movendo) return;
    movendo = true;
    const perto = new IntersectionObserver(entradas => {
      entradas.forEach(e => { e.target.perto = e.isIntersecting; camadas.forEach(c => { if (c.medida === e.target) c.perto = e.isIntersecting; }); });
      agenda();
    }, { rootMargin: '30% 0px' });
    if (!rolagemNoCss) doc.querySelectorAll('[data-parallax]').forEach(el => {
      const tipo = el.dataset.parallax;
      if (!TIPOS[tipo]) return;
      const medida = medidaDe(el, tipo);
      camadas.push({ el, tipo, medida, perto: false });
      perto.observe(medida);
    });
    if (faixa && !rolagemNoCss) { medeFaixa(); perto.observe(faixa); }
    if (passos) { passos.classList.add('passos-vivos'); perto.observe(passos); }
    // as fotos da faixa só carregam quando entram na tela; a largura muda quando elas chegam
    if (faixa && !rolagemNoCss) faixa.querySelectorAll('img').forEach(img => img.addEventListener('load', () => { medeFaixa(); agenda(); }));
  }
  function desligaMovimento() {
    movendo = false;
    camadas.forEach(c => { c.el.style.transform = ''; });
    linhasDaFaixa.forEach(l => { l.style.transform = ''; });
    if (progresso) progresso.style.transform = '';
    if (passos) { passos.classList.remove('passos-vivos'); linhaDosPassos.style.removeProperty('--k'); }
  }
  ligaMovimento();
  reduceMotion.addEventListener('change', () => { if (reduceMotion.matches) desligaMovimento(); else ligaMovimento(); agenda(); });
  agenda();

  /* Rolagem nativa: arrastar, teclado e botões. */
  const track = doc.querySelector('.results-track');
  const previous = doc.querySelector('[data-carousel-direction="-1"]');
  const next = doc.querySelector('[data-carousel-direction="1"]');
  function updateCarousel() {
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }
  function moveCarousel(direction) {
    const card = track.querySelector('.result-card');
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + 24), behavior: reduceMotion.matches ? 'instant' : 'smooth' });
  }
  [previous, next].forEach(button => button.addEventListener('click', () => moveCarousel(Number(button.dataset.carouselDirection))));
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); moveCarousel(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  track.addEventListener('scroll', updateCarousel, { passive: true });
  window.addEventListener('resize', updateCarousel, { passive: true });
  updateCarousel();

  /* Efeitos que se repetem: cada bloco volta ao estado inicial (.armada) quando sai inteiro da tela e toca (.tocando)
     quando volta, rolando para baixo ou para cima. Os que entram juntos tocam em sequência (90 ms entre eles). */
  const PASSOS_DO_OBSERVADOR = Array.from({ length: 21 }, (_, i) => i / 20);
  const efeitos = new Map();
  const arma = f => { clearTimeout(f.timer); f.estado = 'armado'; f.op.arma(f.el); };
  const conclui = f => { clearTimeout(f.timer); f.estado = 'final'; f.op.conclui(f.el); };
  const toca = (f, ordem) => {
    f.estado = 'tocando';
    f.op.toca(f.el, ordem);
    f.timer = setTimeout(() => { if (f.estado === 'tocando') conclui(f); }, f.op.duracao + ordem * 90);
  };
  // blocos mais altos que a tela tocam com uma fração menor visível
  const limiar = f => Math.max(.05, Math.min(f.op.limiar, .6 * window.innerHeight / Math.max(1, f.el.getBoundingClientRect().height)));
  const observador = temIO ? new IntersectionObserver(entradas => {
    const agora = [];
    entradas.forEach(e => {
      const f = efeitos.get(e.target);
      if (!f) return;
      if (reduceMotion.matches) { if (f.estado !== 'final') conclui(f); return; }
      if (!e.isIntersecting) { if (f.estado !== 'armado') arma(f); return; }
      if (f.estado === 'armado' && (e.intersectionRatio >= limiar(f) || e.intersectionRect.height >= .5 * window.innerHeight)) agora.push(f);
    });
    agora.sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    agora.forEach((f, i) => toca(f, Math.min(i, 5)));
  }, { threshold: PASSOS_DO_OBSERVADOR }) : null;
  const repete = (el, op) => {
    if (!el || semMovimento()) return;
    efeitos.set(el, { el, op, estado: 'final', timer: 0 });
    observador.observe(el);
  };
  const porClasses = (armada, ativa, extra = {}) => Object.assign({
    limiar: .25, duracao: 1500,
    arma: el => { el.classList.remove(ativa); el.classList.add(armada); },
    toca: el => { el.classList.add(ativa); el.classList.remove(armada); },
    conclui: el => { el.classList.remove(armada, ativa); }
  }, extra);

  /* Fim da abertura: as seções passam a ser montadas normalmente (ver content-visibility no CSS). Também na hora, se a URL
     já vem com âncora ou no primeiro clique num link interno, para a rolagem chegar ao lugar certo. */
  const montaSecoes = () => raiz.classList.add('montado');
  if (location.hash) montaSecoes();
  // link para uma seção: as fontes e os títulos por linha assentam depois da rolagem inicial e empurram a âncora; volta a
  // ela quando tudo assenta, a não ser que a pessoa já tenha rolado ou usado o teclado
  const alvoInicial = location.hash.length > 1 ? doc.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
  let mexeu = false;
  const reposiciona = () => { if (alvoInicial && !mexeu) alvoInicial.scrollIntoView({ block: 'start', behavior: 'instant' }); };
  if (alvoInicial) {
    ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(t => window.addEventListener(t, () => { mexeu = true; }, { once: true, passive: true }));
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(() => requestAnimationFrame(reposiciona));
  }
  doc.addEventListener('click', e => { if (e.target.closest && e.target.closest('a[href^="#"]')) montaSecoes(); }, true);
  /* A abertura vem primeiro. Registrar os efeitos e montar os títulos por linha força um layout da página inteira: com a
     intro tocando isso travaria a caneta, então espera a intro e a entrada do hero terminarem. Sem intro, espera o navegador
     ficar ocioso (no máximo 2 s), para não disputar com a entrada do hero. */
  const iniciaEfeitos = () => {
    montaSecoes();
    // blocos que sobem e aparecem; o atraso em sequência vai no próprio elemento
    doc.querySelectorAll('.reveal').forEach(el => repete(el, porClasses('armada', 'tocando', {
      limiar: .2, duracao: 1100,
      toca: (alvo, ordem) => { alvo.style.transitionDelay = ordem ? ordem * 90 + 'ms' : ''; alvo.classList.add('tocando'); alvo.classList.remove('armada'); },
      conclui: alvo => { alvo.classList.remove('armada', 'tocando'); alvo.style.transitionDelay = ''; }
    })));
    doc.querySelectorAll('.revela-grupo').forEach(el => repete(el, porClasses('armada', 'tocando', { limiar: .25, duracao: 1600 })));
    // ícones desenhados, assinaturas escritas e a cortina da foto do "Sobre"
    doc.querySelectorAll('[data-desenha]').forEach(el => repete(el, porClasses('armada', 'tocando', { limiar: .5, duracao: 1800 })));
    doc.querySelectorAll('[data-assinatura]').forEach(el => repete(el, porClasses('armada', 'tocando', { limiar: .3, duracao: 2600 })));
    doc.querySelectorAll('[data-revela-foto]').forEach(el => repete(el, porClasses('armada', 'tocando', { limiar: .2, duracao: 2000 })));

    /* Títulos H2 linha a linha: cada linha visual sobe de dentro da própria máscara, 95 ms entre linhas. O <em> continua
       dentro de cada linha. Uma animação por linha, não por palavra: com a página rolando, o navegador atualiza o estilo de
       toda animação em andamento a cada quadro, então menos elementos animados é menos trabalho. */
    (function titulos() {
      const lista = [...doc.querySelectorAll('[data-titulo]')];
      if (!lista.length || semMovimento()) return;
      const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      // as palavras (com a marca de itálico) e as quebras forçadas, lidas uma vez do HTML original
      const tokens = h => {
        const t = [];
        const anda = (no, em) => no.childNodes.forEach(f => {
          if (f.nodeType === 3) f.textContent.split(/\s+/).filter(Boolean).forEach(p => t.push({ p, em }));
          else if (f.tagName === 'BR') t.push({ br: true });
          else if (f.nodeType === 1) anda(f, em || f.tagName === 'EM');
        });
        anda(h, false);
        return t;
      };
      const itens = lista.map(h => ({ h, t: tokens(h) }));
      // uma linha de palavras: abre e fecha o <em> só onde o itálico começa e termina
      const linha = toks => {
        let s = ''; let em = false;
        toks.forEach((x, i) => { const sep = i ? ' ' : ''; if (x.em !== em) { s += em ? '</em>' + sep : sep + '<em>'; em = x.em; } else s += sep; s += esc(x.p); });
        return s + (em ? '</em>' : '');
      };
      // em três passos para o navegador calcular o layout uma vez: escreve as palavras soltas, lê onde cada uma caiu, escreve as linhas
      const monta = () => {
        itens.forEach(it => { it.h.innerHTML = it.t.map(x => x.br ? '<br>' : '<span data-p>' + (x.em ? '<em>' + esc(x.p) + '</em>' : esc(x.p)) + '</span>').join(' '); });
        itens.forEach(it => {
          const ps = [...it.h.querySelectorAll('[data-p]')];
          const grupos = []; let topo = null; let k = 0;
          it.t.forEach(x => {
            if (x.br) { topo = null; return; }
            const t = ps[k++].offsetTop;
            if (topo === null || Math.abs(t - topo) > 4) { grupos.push([]); topo = t; }
            grupos[grupos.length - 1].push(x);
          });
          it.grupos = grupos;
        });
        // o espaço depois de cada linha mantém as palavras separadas para leitores de tela
        itens.forEach(it => { it.h.innerHTML = it.grupos.map((g, i) => '<span class="lin"><span class="lin-in" style="--l:' + Math.min(i, 8) + '">' + linha(g) + '</span></span> ').join(''); });
      };
      monta();
      lista.forEach(h => repete(h, porClasses('titulo-armado', 'titulo-tocando', { limiar: .6, duracao: 1900 })));
      // a quebra de linha muda com a largura e com a chegada da fonte: refaz as linhas (as classes de estado continuam no título)
      let largura = window.innerWidth; let espera = 0;
      window.addEventListener('resize', () => {
        clearTimeout(espera);
        espera = setTimeout(() => { if (window.innerWidth !== largura) { largura = window.innerWidth; requestAnimationFrame(monta); } }, 200);
      });
      if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(() => requestAnimationFrame(monta));
    })();
    // os títulos acabaram de virar linhas: se a página abriu numa âncora, volta a ela
    requestAnimationFrame(reposiciona);
  };
  const quandoLivre = f => ('requestIdleCallback' in window ? requestIdleCallback(f, { timeout: 2000 }) : setTimeout(f, 400));
  const naAbertura = () => raiz.classList.contains('intro-ativa') || raiz.classList.contains('intro-saindo');
  if (naAbertura() && 'MutationObserver' in window) {
    let pronto = false;
    const vai = () => { if (pronto) return; pronto = true; espera.disconnect(); clearTimeout(trava); quandoLivre(iniciaEfeitos); };
    const espera = new MutationObserver(() => { if (!naAbertura()) vai(); });
    espera.observe(raiz, { attributes: true, attributeFilter: ['class'] });
    const trava = setTimeout(vai, 7000);
  } else quandoLivre(iniciaEfeitos);

  if (temIO) {
    const navLinks = doc.querySelectorAll('.desktop-nav a');
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    doc.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
  }

  /* Somente mensura o clique se o cliente já tiver instalado o GA4. */
  doc.querySelectorAll('[data-cta]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'whatsapp_click', { cta: link.dataset.cta });
      }
    });
  });
})();
