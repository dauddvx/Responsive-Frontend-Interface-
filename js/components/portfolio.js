/**
 * portfolio.js — Filterable Grid + Project Modal
 * Responsive Frontend Interface
 */

'use strict';

import { $, $$, trapFocus } from '../core/utils.js';
import { projects } from '../data/content.js';

export function initPortfolio() {
  renderGrid();
  initFilter();
  initModal();
}

/* ── Render Grid ── */
function renderGrid(filter = 'all') {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  grid.innerHTML = filtered.map((p) => `
    <article
      class="portfolio-card"
      data-id="${p.id}"
      tabindex="0"
      role="button"
      aria-label="View project: ${p.title}"
    >
      <div class="portfolio-card__thumb">
        <div class="portfolio-card__thumb-placeholder">${p.emoji}</div>
        <div class="portfolio-card__overlay">
          <span class="portfolio-card__view-btn">View Project →</span>
        </div>
      </div>
      <div class="portfolio-card__body">
        <div class="portfolio-card__tags">
          ${p.tags.map((t) => `<span class="portfolio-card__tag">${t}</span>`).join('')}
        </div>
        <h3 class="portfolio-card__title">${p.title}</h3>
        <p class="portfolio-card__desc">${p.desc}</p>
      </div>
    </article>
  `).join('');

  // Attach open-modal events after rendering
  $$('.portfolio-card', grid).forEach((card) => {
    const open = () => openModal(parseInt(card.dataset.id, 10));
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
}

/* ── Filter ── */
function initFilter() {
  const bar = document.querySelector('.filter-bar');
  if (!bar) return;

  // Event delegation
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    $$('.filter-btn', bar).forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    renderGrid(btn.dataset.filter);
  });
}

/* ── Modal ── */
let previousFocus = null;

function initModal() {
  const overlay = document.getElementById('project-modal');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.modal__close');

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
    if (e.key === 'Tab' && overlay.classList.contains('is-open')) {
      const modalEl = overlay.querySelector('.modal');
      trapFocus(modalEl, e);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
}

function openModal(id) {
  const project = projects.find((p) => p.id === id);
  if (!project) return;

  const overlay = document.getElementById('project-modal');
  if (!overlay) return;

  previousFocus = document.activeElement;

  // Populate
  overlay.querySelector('.modal__header-placeholder').textContent = project.emoji;
  overlay.querySelector('.modal__title').textContent    = project.title;
  overlay.querySelector('.modal__desc').textContent     = project.longDesc;
  overlay.querySelector('.modal__tags').innerHTML       =
    project.tags.map((t) => `<span class="modal__tag">${t}</span>`).join('');

  overlay.querySelector('[data-meta="year"]').textContent     = project.year;
  overlay.querySelector('[data-meta="role"]').textContent     = project.role;
  overlay.querySelector('[data-meta="duration"]').textContent = project.duration;

  const liveLink = overlay.querySelector('[data-link="live"]');
  const codeLink = overlay.querySelector('[data-link="code"]');
  if (liveLink) liveLink.href = project.liveUrl;
  if (codeLink) codeLink.href = project.codeUrl;

  // Open
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // Focus close button
  const closeBtn = overlay.querySelector('.modal__close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
}

function closeModal() {
  const overlay = document.getElementById('project-modal');
  if (!overlay) return;

  overlay.classList.remove('is-open');
  document.body.style.overflow = '';

  if (previousFocus) {
    previousFocus.focus();
    previousFocus = null;
  }
}
