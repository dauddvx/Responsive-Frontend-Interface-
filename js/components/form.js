/**
 * form.js — Contact Form Validation & Submission
 * Responsive Frontend Interface
 */

'use strict';

import { $ } from '../core/utils.js';
import { showToast } from './toast.js';

const RULES = {
  name: {
    required: true,
    minLength: 2,
    message: 'Please enter your full name (min 2 characters).',
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address.',
  },
  subject: {
    required: true,
    minLength: 5,
    message: 'Subject must be at least 5 characters.',
  },
  message: {
    required: true,
    minLength: 20,
    message: 'Message must be at least 20 characters.',
  },
};

export function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const inputs = form.querySelectorAll('[data-field]');

  // Real-time validation on blur
  inputs.forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      // Clear error as user types after it was shown
      if (input.classList.contains('is-invalid')) validateField(input);
    });
  });

  // Submit
  form.addEventListener('submit', handleSubmit);
}

function validateField(input) {
  const fieldName = input.dataset.field;
  const rule = RULES[fieldName];
  if (!rule) return true;

  const value = input.value.trim();
  const errorEl = document.getElementById(`error-${fieldName}`);

  let valid = true;
  let msg   = '';

  if (rule.required && !value) {
    valid = false;
    msg   = rule.message;
  } else if (rule.minLength && value.length < rule.minLength) {
    valid = false;
    msg   = rule.message;
  } else if (rule.pattern && !rule.pattern.test(value)) {
    valid = false;
    msg   = rule.message;
  }

  input.classList.toggle('is-invalid', !valid);
  input.classList.toggle('is-valid', valid && value.length > 0);
  input.setAttribute('aria-invalid', !valid ? 'true' : 'false');

  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.classList.toggle('is-visible', !valid);
  }

  return valid;
}

async function handleSubmit(e) {
  e.preventDefault();

  const form   = e.target;
  const inputs = form.querySelectorAll('[data-field]');
  const btn    = form.querySelector('.form-submit');

  // Validate all fields
  let allValid = true;
  inputs.forEach((input) => {
    if (!validateField(input)) allValid = false;
  });

  if (!allValid) {
    // Focus first invalid field
    const firstInvalid = form.querySelector('.is-invalid');
    if (firstInvalid) firstInvalid.focus();

    showToast({
      type: 'error',
      title: 'Form has errors',
      message: 'Please fix the highlighted fields before submitting.',
    });
    return;
  }

  // Show loading state
  btn.classList.add('is-loading');
  btn.querySelector('.form-submit__text').textContent = 'Sending…';

  // Simulate async submission (replace with real fetch in production)
  try {
    await simulateSend(2000);

    form.reset();
    inputs.forEach((input) => {
      input.classList.remove('is-valid', 'is-invalid');
    });

    showToast({
      type: 'success',
      title: 'Message sent! 🎉',
      message: 'Thanks for reaching out. I\'ll reply within 24 hours.',
    });
  } catch {
    showToast({
      type: 'error',
      title: 'Submission failed',
      message: 'Something went wrong. Please try again.',
    });
  } finally {
    btn.classList.remove('is-loading');
    btn.querySelector('.form-submit__text').textContent = 'Send Message';
  }
}

/** Simulates a network request */
function simulateSend(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 90% success rate
      Math.random() > 0.1 ? resolve() : reject(new Error('Network error'));
    }, ms);
  });
}
