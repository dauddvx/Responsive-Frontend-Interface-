/**
 * app.js — Entry Point: Bootstrap All Modules
 * Responsive Frontend Interface
 */

'use strict';

import { initTheme }           from './components/theme.js';
import { initNavbar }          from './components/navbar.js';
import { initScrollAnimations } from './components/scrollProgress.js';
import { initCounters }        from './components/counter.js';
import { initCarousel }        from './components/carousel.js';
import { initPortfolio }       from './components/portfolio.js';
import { initForm }            from './components/form.js';

document.addEventListener('DOMContentLoaded', () => {
  // Phase 1 — Foundation
  initTheme();
  initNavbar();

  // Phase 2 — Animations & Scroll Effects
  initScrollAnimations();
  initCounters();

  // Phase 3 — Interactive Components
  initCarousel();
  initPortfolio();
  initForm();

  console.log('%c🚀 Responsive Frontend Interface loaded', 'color: #6c63ff; font-weight: bold; font-size: 14px;');
});
