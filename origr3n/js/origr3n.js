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
      if (active) termInput.value = '';
      else tagsInput.value = '';
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

    var searchOpeners = document.querySelectorAll('.subheader-opener[data-open-id="search"]');

    new MutationObserver(function () {
      var isOpen = panel.classList.contains('open');
      searchOpeners.forEach(function (btn) { btn.classList.toggle('origr3n-active', isOpen); });
      if (isOpen) {
        setTagMode(false);
        if (termInput) { termInput.focus(); termInput.select(); }
      }
    }).observe(panel, { attributes: true, attributeFilter: ['class'] });

    /* Awesomplete: Nach Auswahl eines Vorschlags sofort das Formular absenden.
       Verhindert den Race mit dem Browser-Submit der noch den getippten Wert nimmt. */
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
  });
})();

/* origr3n — Select-Modus mit Bottom-Bar */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    /* Bottom-Bar dynamisch erstellen */
    var bar = document.createElement('div');
    bar.id = 'origr3n-select-bar';

    var countEl = document.createElement('span');
    countEl.id = 'origr3n-select-count';
    countEl.textContent = '0 ausgewählt';

    var selectAllBtn = document.createElement('a');
    selectAllBtn.id = 'origr3n-select-all';
    selectAllBtn.href = '#';
    selectAllBtn.textContent = 'alle wählen';

    var actionsEl = document.createElement('div');
    actionsEl.className = 'origr3n-select-actions';

    var deleteBtn = document.createElement('button');
    deleteBtn.id = 'origr3n-action-delete';
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Löschen';

    var publicBtn = document.createElement('button');
    publicBtn.id = 'origr3n-action-public';
    publicBtn.type = 'button';
    publicBtn.textContent = 'Öffentlich';

    var privateBtn = document.createElement('button');
    privateBtn.id = 'origr3n-action-private';
    privateBtn.type = 'button';
    privateBtn.textContent = 'Privat';

    var cancelBtn = document.createElement('button');
    cancelBtn.id = 'origr3n-select-cancel';
    cancelBtn.type = 'button';
    cancelBtn.textContent = 'Abbrechen';

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
      countEl.textContent = n + ' ausgewählt';
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
      selectAllBtn.textContent = doSelect ? 'alle abwählen' : 'alle wählen';
      updateCount();
    });

    /* Abbrechen */
    cancelBtn.addEventListener('click', function () {
      exitSelectMode();
      selectAllBtn.textContent = 'alle wählen';
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
  });
})();

/* origr3n — Filter Panel */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var btns = document.querySelectorAll('.filter-btn-trigger');
    var panel = document.getElementById('filter-panel');
    if (!btns.length || !panel) return;

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
  });
})();
