/**
 * navbar.js — Sticky Nav, Hamburger, Active Link Tracking
 * Responsive Frontend Interface
 */

'use strict';

import { $$, throttle } from '../core/utils.js';

export function initNavbar() {
  initSticky();
  initHamburger();
  initActiveLinks();
  initScrollProgress();
  initBackToTop();
}

/* ── Sticky Glass Effect ── */
function initSticky() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = throttle(() => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, 100);

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── Hamburger / Mobile Menu ── */
function initHamburger() {
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = $$('.mobile-menu__link');
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    // Move focus to first link
    const firstLink = mobileMenu.querySelector('.mobile-menu__link');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  // Close on link click
  mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* ── Active Link on Scroll (Intersection Observer) ── */
function initActiveLinks() {
  const sections  = $$('section[id]');
  const navLinks  = $$('.nav__link[href^="#"]');
  const mobileLinks = $$('.mobile-menu__link[href^="#"]');
  const allLinks  = [...navLinks, ...mobileLinks];

  if (!sections.length || !allLinks.length) return;

  const setActive = (id) => {
    allLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ── Scroll Progress Bar ── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  const update = throttle(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
    bar.style.width = `${pct}%`;
  }, 16);

  window.addEventListener('scroll', update, { passive: true });
}

/* ── Back to Top ── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const toggle = throttle(() => {
    btn.classList.toggle('is-visible', window.scrollY > 500);
  }, 200);

  window.addEventListener('scroll', toggle, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
