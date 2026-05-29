/**
 * carousel.js — Touch/Keyboard/Auto-play Testimonials Carousel
 * Responsive Frontend Interface
 */

'use strict';

import { $, $$ } from '../core/utils.js';

export function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track     = $('.carousel__track', carousel);
  const slides    = $$('.carousel__slide', carousel);
  const dotsWrap  = $('.carousel__dots', carousel);
  const prevBtn   = $('.carousel__arrow--prev', carousel);
  const nextBtn   = $('.carousel__arrow--next', carousel);

  if (!slides.length) return;

  let current   = 0;
  let autoTimer = null;
  const total   = slides.length;

  /* ── Build Dots ── */
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = $$('.carousel__dot', dotsWrap);

  /* ── Render ── */
  function render() {
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    slides.forEach((s, i) => {
      s.setAttribute('aria-hidden', i !== current ? 'true' : 'false');
    });
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === total - 1;
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    render();
    resetAuto();
  }

  function next() { if (current < total - 1) goTo(current + 1); else goTo(0); }
  function prev() { if (current > 0) goTo(current - 1); else goTo(total - 1); }

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  /* ── Auto-play ── */
  function startAuto() {
    autoTimer = setInterval(next, 5000);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  startAuto();

  // Pause on hover / focus
  carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusin',   () => clearInterval(autoTimer));
  carousel.addEventListener('focusout',  startAuto);

  /* ── Keyboard ── */
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  });

  /* ── Touch / Swipe ── */
  let touchStartX = 0;
  let touchEndX   = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  }, { passive: true });

  /* ── Initial render ── */
  render();
}
