/* origr3n — Dark/Light Toggle */
(function () {
  'use strict';

  const STORAGE_KEY = 'origr3n-theme';
  const ATTR = 'data-theme';
  const ICON_DARK  = 'fa fa-moon-o';
  const ICON_LIGHT = 'fa fa-sun-o';

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function apply(theme) {
    document.documentElement.setAttribute(ATTR, theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function syncIcon(theme) {
    var icon = document.querySelector('#theme-toggle .fa');
    if (icon) {
      icon.className = theme === 'dark' ? ICON_DARK : ICON_LIGHT;
    }
  }

  function toggle() {
    var current = document.documentElement.getAttribute(ATTR) || 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    apply(next);
    syncIcon(next);
  }

  // Apply immediately (before paint) to avoid flash
  apply(getPreferred());

  document.addEventListener('DOMContentLoaded', function () {
    syncIcon(document.documentElement.getAttribute(ATTR) || 'dark');
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', toggle);
    });
  });
})();
