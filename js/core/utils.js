/**
 * utils.js — Shared Helper Utilities
 * Responsive Frontend Interface
 */

'use strict';

/**
 * Shorthand DOM selectors
 * @param {string} selector
 * @param {Element} [context=document]
 */
export const $ = (selector, context = document) =>
  context.querySelector(selector);

export const $$ = (selector, context = document) =>
  [...context.querySelectorAll(selector)];

/**
 * Debounce — delays execution until after wait ms have elapsed
 * @param {Function} fn
 * @param {number} wait
 */
export function debounce(fn, wait = 200) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

/**
 * Throttle — limits execution to once per limit ms
 * @param {Function} fn
 * @param {number} limit
 */
export function throttle(fn, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Observe elements with IntersectionObserver
 * @param {string|Element|NodeList} target
 * @param {Function} callback  — called with (entry, observer)
 * @param {IntersectionObserverInit} [options]
 */
export function observe(target, callback, options = {}) {
  const defaultOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px',
    ...options,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => callback(entry, observer));
  }, defaultOptions);

  if (typeof target === 'string') {
    $$(target).forEach((el) => observer.observe(el));
  } else if (target instanceof NodeList || Array.isArray(target)) {
    target.forEach((el) => observer.observe(el));
  } else if (target instanceof Element) {
    observer.observe(target);
  }

  return observer;
}

/**
 * Trap focus inside an element (for modals/menus)
 * @param {Element} container
 * @param {KeyboardEvent} e
 */
export function trapFocus(container, e) {
  const focusable = $$([
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(','), container).filter(el => !el.closest('[hidden]'));

  if (!focusable.length) return;

  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

/**
 * Clamp a number between min and max
 */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/**
 * Linear interpolation
 */
export const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Format a number with optional suffix (K, M)
 */
export function formatNumber(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(0) + 'K';
  return String(n);
}

/**
 * Animate a counter from 0 to target
 * @param {Element} el
 * @param {number} target
 * @param {number} duration ms
 * @param {string} [suffix]
 */
export function animateCounter(el, target, duration = 2000, suffix = '') {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
