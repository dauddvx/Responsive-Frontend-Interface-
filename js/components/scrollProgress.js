/**
 * scrollProgress.js — Scroll Animations via Intersection Observer
 * Responsive Frontend Interface
 */

'use strict';

import { $$, observe } from '../core/utils.js';

export function initScrollAnimations() {
  // Animate elements with [data-animate]
  const animatedEls = $$('[data-animate]');
  if (animatedEls.length) {
    observe(animatedEls, (entry, observer) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  }

  // Stagger containers
  const staggerEls = $$('[data-animate-stagger]');
  if (staggerEls.length) {
    observe(staggerEls, (entry, observer) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
  }
}
