/**
 * toast.js — Toast Notification Factory
 * Responsive Frontend Interface
 */

'use strict';

const ICONS = {
  success: '✅',
  error:   '❌',
  warning: '⚠️',
  info:    'ℹ️',
};

const DURATION = 4000; // ms

/**
 * Show a toast notification
 * @param {Object} options
 * @param {'success'|'error'|'warning'|'info'} options.type
 * @param {string} options.title
 * @param {string} [options.message]
 * @param {number} [options.duration]
 */
export function showToast({ type = 'info', title, message = '', duration = DURATION }) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
  toast.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
  toast.style.setProperty('--toast-duration', `${duration}ms`);

  toast.innerHTML = `
    <span class="toast__icon" aria-hidden="true">${ICONS[type] ?? ICONS.info}</span>
    <div class="toast__content">
      <p class="toast__title">${title}</p>
      ${message ? `<p class="toast__message">${message}</p>` : ''}
    </div>
    <button class="toast__dismiss" aria-label="Dismiss notification">✕</button>
  `;

  container.appendChild(toast);

  // Trigger entrance animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('is-visible'));
  });

  const dismiss = () => {
    toast.classList.add('is-hiding');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  };

  // Auto-dismiss
  const timer = setTimeout(dismiss, duration);

  // Manual dismiss
  toast.querySelector('.toast__dismiss').addEventListener('click', () => {
    clearTimeout(timer);
    dismiss();
  });
}
