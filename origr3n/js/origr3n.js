/* origr3n — all modules in one IIFE, single DOMContentLoaded entry point */
(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════
     Shared i18n — strings follow <html lang="...">
  ══════════════════════════════════════════════════════════════ */

  var _lang = (document.documentElement.lang || 'en').toLowerCase().split('-')[0];
  var _i18n = {
    de: { selected: ' ausgewählt', selectAll: 'alle wählen', selectNone: 'alle abwählen',
          del: 'Löschen', pub: 'Öffentlich', priv: 'Privat', cancel: 'Abbrechen',
          filterVisibility: 'Sichtbarkeit', filterPrivate: 'privat',
          filterPublic: 'öffentlich', filterUntagged: 'ohne Tag', filterPerPage: 'pro Seite' },
    en: { selected: ' selected', selectAll: 'select all', selectNone: 'deselect all',
          del: 'Delete', pub: 'Public', priv: 'Private', cancel: 'Cancel',
          filterVisibility: 'Visibility', filterPrivate: 'Private',
          filterPublic: 'Public', filterUntagged: 'Untagged', filterPerPage: 'per page' }
  };
  var _t = _i18n[_lang] || _i18n.en;

  /* ══════════════════════════════════════════════════════════════
     Dark/Light Toggle
     apply() runs immediately to avoid flash before paint
  ══════════════════════════════════════════════════════════════ */

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

  // Runs immediately (before DOM) — Anti-FOUC
  apply(getPreferred());

  function initTheme() {
    syncIcon(document.documentElement.getAttribute(ATTR) || 'dark');
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', toggle);
    });
  }

  /* ══════════════════════════════════════════════════════════════
     Search Overlay: Tag-Toggle, Escape, Autofocus
  ══════════════════════════════════════════════════════════════ */

  /* Clear-Button (×) je Feld — sichtbar sobald Inhalt vorhanden; gilt für jedes Suchfeld im Theme */
  function initClearButtons() {
    document.querySelectorAll('.search-field-clear').forEach(function (btn) {
      var field = btn.closest('.search-field');
      var input = field && field.querySelector('input[type="text"]');
      if (!input) return;
      function sync() { btn.classList.toggle('visible', input.value.length > 0); }
      sync();
      input.addEventListener('input', sync);
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        input.value = '';
        sync();
        input.focus();
      });
    });
  }

  function initSearch() {
    var panel = document.getElementById('search');
    if (!panel) return;

    var termInput = panel.querySelector('input[name="searchterm"]');
    var tagsInput = panel.querySelector('input[name="searchtags"]');

    var searchOpeners = document.querySelectorAll('.subheader-opener[data-open-id="search"]');

    new MutationObserver(function () {
      var isOpen = panel.classList.contains('open');
      searchOpeners.forEach(function (btn) { btn.classList.toggle('origr3n-active', isOpen); });
      if (isOpen && termInput) { termInput.focus(); termInput.select(); }
    }).observe(panel, { attributes: true, attributeFilter: ['class'] });

    /* Nach Awesomplete-Auswahl sofort absenden — verhindert Race mit Browser-Submit */
    if (tagsInput) {
      tagsInput.addEventListener('awesomplete-selectcomplete', function () {
        var form = panel.querySelector('form');
        if (form) form.submit();
      });

      /* Enter wenn Dropdown offen: Awesomplete übernehmen lassen, kein Browser-Submit */
      tagsInput.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') return;
        var list = panel.querySelector('.awesomplete ul');
        if (list && !list.hidden && list.childElementCount > 0) {
          e.preventDefault();
        }
      });
    }

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

    /* Suche öffnen + Cursor gezielt platzieren: / → Suchbegriff, t → Tags (beide Felder bleiben erhalten) */
    function openSearchAndFocus(input) {
      if (!panel.classList.contains('open')) {
        var opener = document.querySelector('.subheader-opener[data-open-id="search"]');
        if (opener) opener.click();
      }
      /* nach dem MutationObserver (fokussiert beim Öffnen immer das Suchfeld) ggf. auf Tags umlenken */
      Promise.resolve().then(function () {
        if (input) { input.focus(); input.select(); }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key !== '/' && e.key !== 't') return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
      e.preventDefault();
      openSearchAndFocus(e.key === '/' ? termInput : tagsInput);
    });
  }

  /* ══════════════════════════════════════════════════════════════
     Select-Modus mit Bottom-Bar
  ══════════════════════════════════════════════════════════════ */

  function initSelectMode() {
    /* Bottom-Bar dynamisch erstellen */
    var bar = document.createElement('div');
    bar.id = 'origr3n-select-bar';

    var countEl = document.createElement('span');
    countEl.id = 'origr3n-select-count';
    countEl.textContent = '0' + _t.selected;

    var selectAllBtn = document.createElement('a');
    selectAllBtn.id = 'origr3n-select-all';
    selectAllBtn.href = '#';
    selectAllBtn.textContent = _t.selectAll;

    var actionsEl = document.createElement('div');
    actionsEl.className = 'origr3n-select-actions';

    var deleteBtn = document.createElement('button');
    deleteBtn.id = 'origr3n-action-delete';
    deleteBtn.type = 'button';
    deleteBtn.textContent = _t.del;

    var publicBtn = document.createElement('button');
    publicBtn.id = 'origr3n-action-public';
    publicBtn.type = 'button';
    publicBtn.textContent = _t.pub;

    var privateBtn = document.createElement('button');
    privateBtn.id = 'origr3n-action-private';
    privateBtn.type = 'button';
    privateBtn.textContent = _t.priv;

    var cancelBtn = document.createElement('button');
    cancelBtn.id = 'origr3n-select-cancel';
    cancelBtn.type = 'button';
    cancelBtn.textContent = _t.cancel;

    actionsEl.appendChild(deleteBtn);
    actionsEl.appendChild(publicBtn);
    actionsEl.appendChild(privateBtn);
    bar.appendChild(countEl);
    bar.appendChild(selectAllBtn);
    bar.appendChild(actionsEl);
    bar.appendChild(cancelBtn);
    document.body.appendChild(bar);

    function updateCount() {
      var n = document.querySelectorAll('.link-checkbox:checked').length;
      countEl.textContent = n + _t.selected;
    }

    function exitSelectMode() {
      document.body.classList.remove('select-mode');
      document.querySelectorAll('.link-checkbox').forEach(function (cb) {
        if (cb.checked) {
          cb.checked = false;
          cb.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      document.querySelectorAll('.linklist-item.selected').forEach(function (i) {
        i.classList.remove('selected');
      });
      updateCount();
    }

    /* Select-Toggle-Buttons (Desktop + Mobile) */
    document.querySelectorAll('[data-select-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (document.body.classList.contains('select-mode')) {
          exitSelectMode();
        } else {
          document.querySelectorAll('.linklist-item.selected').forEach(function (i) {
            i.classList.remove('selected');
          });
          document.body.classList.add('select-mode');
          updateCount();
        }
      });
    });

    /* Alle wählen / alle abwählen */
    selectAllBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var allCbs = document.querySelectorAll('.link-checkbox');
      var checkedCount = document.querySelectorAll('.link-checkbox:checked').length;
      var doSelect = checkedCount < allCbs.length;
      allCbs.forEach(function (cb) {
        if (cb.checked !== doSelect) {
          cb.checked = doSelect;
          cb.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      document.querySelectorAll('.linklist-item').forEach(function (item) {
        var cb = item.querySelector('.link-checkbox');
        item.classList.toggle('selected', doSelect && !!cb);
      });
      selectAllBtn.textContent = doSelect ? _t.selectNone : _t.selectAll;
      updateCount();
    });

    /* Cancel */
    cancelBtn.addEventListener('click', function () {
      exitSelectMode();
      selectAllBtn.textContent = _t.selectAll;
    });

    /* Action-Buttons → native Shaarli-Elemente triggern */
    deleteBtn.addEventListener('click', function () {
      var native = document.getElementById('actions-delete');
      if (native) native.click();
    });
    publicBtn.addEventListener('click', function () {
      var native = document.querySelector('.actions-change-visibility[data-visibility="public"]');
      if (native) native.click();
    });
    privateBtn.addEventListener('click', function () {
      var native = document.querySelector('.actions-change-visibility[data-visibility="private"]');
      if (native) native.click();
    });

    /* Checkbox-Änderung → Zähler aktualisieren */
    document.addEventListener('change', function (e) {
      if (e.target.classList.contains('link-checkbox')) updateCount();
    });
  }

  /* ══════════════════════════════════════════════════════════════
     Filter Panel
  ══════════════════════════════════════════════════════════════ */

  function initFilterPanel() {
    var btns = document.querySelectorAll('.filter-btn-trigger');
    var panel = document.getElementById('filter-panel');
    if (!btns.length || !panel) return;

    /* Translate hardcoded labels in page.header.html */
    var labels = panel.querySelectorAll('.filter-panel-label');
    if (labels[0]) labels[0].textContent = _t.filterVisibility;
    if (labels[1]) labels[1].textContent = _t.filterPerPage;

    function setPillText(selector, text) {
      var el = panel.querySelector(selector);
      if (!el) return;
      var icon = el.querySelector('i');
      var node = icon ? icon.nextSibling : el.firstChild;
      while (node) {
        if (node.nodeType === 3) { node.textContent = ' ' + text; break; }
        node = node.nextSibling;
      }
    }
    setPillText('a[href*="visibility/private"]', _t.filterPrivate);
    setPillText('a[href*="visibility/public"]',  _t.filterPublic);
    setPillText('a[href*="untagged-only"]',       _t.filterUntagged);

    /* Preserve search context when toggling visibility.
       Shaarli redirects via HTTP Referer — unreliable with Cloudflare/Safari.
       Instead: fetch the session-setter, then reload current URL. */
    panel.querySelectorAll('a[href*="/admin/visibility/"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var returnTo = window.location.pathname + window.location.search + window.location.hash;
        fetch(link.href, { credentials: 'same-origin', redirect: 'manual' })
          .then(function ()  { window.location.href = returnTo; })
          .catch(function () { window.location.href = returnTo; });
      });
    });

    function syncFilterActive() {
      var isOpen = panel.classList.contains('open');
      btns.forEach(function (btn) { btn.classList.toggle('origr3n-active', isOpen); });
    }

    btns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        panel.classList.toggle('open');
        syncFilterActive();
      });
    });

    document.addEventListener('click', function (e) {
      if (!panel.classList.contains('open')) return;
      var clickedBtn = false;
      btns.forEach(function (b) { if (b.contains(e.target)) clickedBtn = true; });
      if (!e.target.closest('#filter-panel') && !clickedBtn) {
        panel.classList.remove('open');
        syncFilterActive();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        panel.classList.remove('open');
        syncFilterActive();
      }
    });
  }

  /* ══════════════════════════════════════════════════════════════
     Single initialization entry point
  ══════════════════════════════════════════════════════════════ */

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initClearButtons();
    initSearch();
    initSelectMode();
    initFilterPanel();
  });

})();
