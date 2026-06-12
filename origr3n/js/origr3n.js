/* origr3n — Dark/Light Toggle */
(function () {
  'use strict';

  const STORAGE_KEY = 'origr3n-theme';
  const ATTR = 'data-theme';

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function apply(theme) {
    document.documentElement.setAttribute(ATTR, theme);
    localStorage.setItem(STORAGE_KEY, theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? 'Hell' : 'Dunkel';
  }

  function toggle() {
    const current = document.documentElement.getAttribute(ATTR) || 'dark';
    apply(current === 'dark' ? 'light' : 'dark');
  }

  // Apply immediately (before paint) to avoid flash
  apply(getPreferred());

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', toggle);
  });
})();
