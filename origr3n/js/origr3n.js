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
    document.querySelectorAll('[data-theme-toggle] .fa').forEach(function (icon) {
      icon.className = theme === 'dark' ? ICON_DARK : ICON_LIGHT;
    });
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

/* origr3n — Search Overlay: Tag-Toggle, Escape, Autofocus */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var panel = document.getElementById('search');
    if (!panel) return;

    var termInput = panel.querySelector('input[name="searchterm"]');
    var tagsInput = panel.querySelector('input[name="searchtags"]');
    var tagsToggle = panel.querySelector('#search-tag-toggle');

    function setTagMode(active) {
      if (!termInput || !tagsInput) return;
      tagsInput.style.display = active ? '' : 'none';
      termInput.style.display = active ? 'none' : '';
      if (tagsToggle) tagsToggle.classList.toggle('active', active);
    }

    if (tagsToggle) {
      tagsToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var tagMode = tagsInput && tagsInput.style.display !== 'none';
        setTagMode(!tagMode);
        var inp = panel.querySelector('input[name="' + (tagMode ? 'searchterm' : 'searchtags') + '"]');
        if (inp) inp.focus();
      });
    }

    new MutationObserver(function () {
      if (panel.classList.contains('open')) {
        var hasTag = tagsInput && tagsInput.value.trim().length > 0;
        setTagMode(hasTag);
        var inp = hasTag ? tagsInput : termInput;
        if (inp) { inp.focus(); inp.select(); }
      }
    }).observe(panel, { attributes: true, attributeFilter: ['class'] });

    function closeSearch() {
      panel.classList.remove('open');
    }

    /* Klick auf Backdrop (#search selbst, außerhalb der Form) → schließen */
    panel.addEventListener('click', function (e) {
      if (!e.target.closest('.searchform')) closeSearch();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) closeSearch();
    });
  });
})();

/* origr3n — Filter Panel */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var btns = document.querySelectorAll('.filter-btn-trigger');
    var panel = document.getElementById('filter-panel');
    if (!btns.length || !panel) return;

    btns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        panel.classList.toggle('open');
      });
    });

    document.addEventListener('click', function (e) {
      if (!panel.classList.contains('open')) return;
      var clickedBtn = false;
      btns.forEach(function (b) { if (b.contains(e.target)) clickedBtn = true; });
      if (!e.target.closest('#filter-panel') && !clickedBtn) {
        panel.classList.remove('open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });
  });
})();
