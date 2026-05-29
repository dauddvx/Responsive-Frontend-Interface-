/**
 * theme.js — Dark / Light Mode Toggle
 * Responsive Frontend Interface
 */

'use strict';

const STORAGE_KEY = 'rfi-theme';
const DARK  = 'dark';
const LIGHT = 'light';

export function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Determine initial theme
  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored ?? (prefersDark ? DARK : LIGHT);

  applyTheme(initial, toggle);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === DARK ? LIGHT : DARK, toggle);
  });

  // Sync when OS preference changes (if no manual override stored)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? DARK : LIGHT, toggle);
    }
  });
}

function applyTheme(theme, toggleEl) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);

  const isDark = theme === DARK;
  toggleEl.textContent = isDark ? '☀️' : '🌙';
  toggleEl.setAttribute(
    'aria-label',
    isDark ? 'Switch to light mode' : 'Switch to dark mode'
  );
}
