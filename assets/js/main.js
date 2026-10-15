/* Navegação, leitura e conversão. Sem dependências. */
(() => {
  'use strict';
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-nav');
  const hero = document.querySelector('.hero');
  const floating = document.querySelector('.floating-wa');
  const mobileBooking = document.querySelector('.mobile-booking');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function setMenu(open, restoreFocus = true) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', open);
    if (open) menu.querySelector('a').focus();
    else if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setMenu(menu.hidden));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    setMenu(false, false);
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  }));
  document.addEventListener('keydown', event => {
    if (menu.hidden) return;
    if (event.key === 'Escape') setMenu(false);
    if (event.key !== 'Tab') return;
    const focusable = [toggle, ...menu.querySelectorAll('a')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    } else if (!focusable.includes(document.activeElement)) {
      event.preventDefault(); first.focus();
    }
  });
  window.matchMedia('(min-width: 1200px)').addEventListener('change', event => {
    if (event.matches && !menu.hidden) setMenu(false, false);
  });

  /* Um único tratamento de scroll, limitado a um frame. */
  let scheduled = false;
  function updateScroll() {
    const y = window.scrollY;
    const range = document.documentElement.scrollHeight - window.innerHeight;
    const pastHero = hero.getBoundingClientRect().bottom <= header.offsetHeight;
    header.classList.toggle('scrolled', y > 15);
    floating.classList.toggle('visible', range > 0 && y / range > .25);
    mobileBooking.classList.toggle('visible', pastHero);
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { requestAnimationFrame(updateScroll); scheduled = true; }
  }, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();

  /* Rolagem nativa: arrastar, teclado e botões. */
  const track = document.querySelector('.results-track');
  const previous = document.querySelector('[data-carousel-direction="-1"]');
  const next = document.querySelector('[data-carousel-direction="1"]');
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

  if ('IntersectionObserver' in window) {
    /* Todo o conteúdo permanece visível se JS ou o observador não estiver disponível. */
    if (!reduceMotion.matches) {
      const reveals = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: .06 });
      reveals.forEach(element => observer.observe(element));
      document.documentElement.classList.add('motion-ready');
    }
    const navLinks = document.querySelectorAll('.desktop-nav a');
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
    document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
  }

  /* Somente mensura o clique se o cliente já tiver instalado o GA4. */
  document.querySelectorAll('[data-cta]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'whatsapp_click', { cta: link.dataset.cta });
      }
    });
  });
})();
