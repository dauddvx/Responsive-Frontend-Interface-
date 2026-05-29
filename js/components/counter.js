/**
 * counter.js — Animated Number Roll-up
 * Responsive Frontend Interface
 */

'use strict';

import { $$, animateCounter, observe } from '../core/utils.js';

export function initCounters() {
  const counters = $$('[data-counter]');
  if (!counters.length) return;

  observe(counters, (entry, observer) => {
    if (!entry.isIntersecting) return;

    const el       = entry.target;
    const target   = parseInt(el.dataset.counter, 10);
    const suffix   = el.dataset.suffix ?? '';
    const duration = parseInt(el.dataset.duration ?? '2000', 10);

    animateCounter(el, target, duration, suffix);
    observer.unobserve(el); // Only animate once
  }, { threshold: 0.5 });
}
