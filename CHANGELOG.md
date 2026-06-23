# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Fixed (2026-06-23)

- **Visibility filter preserves search context** — Clicking Private/Public in the filter panel previously redirected via HTTP Referer, which Cloudflare and some browsers strip, causing the search query (`?searchtags=…`) to be lost. Fixed via `fetch()` to set the session flag, then explicit redirect back to `window.location.pathname + search`. (r=19)

- **Filter panel labels now follow browser language** — "Sichtbarkeit", "privat", "öffentlich", "ohne Tag", "pro Seite" were hardcoded in `page.header.html`. Moved `_lang`/`_i18n`/`_t` to the IIFE top level (shared across all modules); `initFilterPanel()` now translates section labels and pill text via JS on init. JS cache-busting bumped to `r=18`.

### Added (2026-06-23)

- **Live instance button in showcase** — Both `docs/index.html` (EN) and `docs/shaarli-showcase-de.html` (DE) now include a "Live instance" / "Live-Instanz" button linking to `https://gr3n.de/?searchtags=demo+`. This is a real Shaarli installation running origr3n, filtered to links tagged `demo` (~25 entries). The tag was renamed from `test` → `demo` on 2026-06-23 for clarity.

  > **Operational note:** The `demo` tag on gr3n.de is a hard dependency for this button and for the reference in PR shaarli/Shaarli#2225. It must not be renamed or deleted. If gr3n.de's data is ever reset, restoring the `demo` tag with representative links is the first recovery step.

### Security (2026-06-23)

- **Removed Google Fonts CDN from showcase pages** — `docs/index.html` and `docs/shaarli-showcase-de.html` loaded Quicksand from `fonts.googleapis.com` without SRI (not possible for dynamic Google Fonts responses). Replaced with local `@font-face` declarations pointing to the bundled `../origr3n/fonts/Quicksand-*.woff2` files already in the repo.

### Bug Fixes (2026-06-23)

- **Fixed: semantic color variables were self-referential** — `--color-success`, `--color-public`, `--color-private`, `--color-private-h`, `--color-success-l`, `--color-amber` all pointed to themselves (circular CSS custom property references resolve as invalid). Restored correct hex values: `#5cb81a`, `#5a7a4a`, `#d4851a`, `#e8a030`, `#6abf3a`, `#b07820`. Private card amber border, public/private control icons, and tag badges now render correctly. (r=257)
- **Fixed: description body links invisible on hover** — `shaarli.min.css` overrides all in-card link hover colors to `#252525` (near-black). origr3n's `!important` counter-override only covered `.linklist-item-title h2 a` and `.linklist-real-url`, not generic `<a>` tags inside `.linklist-item-description`. Added explicit rules for initial and hover states on description links. Hover now shows `--color-primary-h` (#4aa316) with underline. (r=258)

### JS Refactoring (2026-06-23)

- **Consolidated DOMContentLoaded handlers:** Merged 4 separate IIFE blocks into a single outer IIFE with named init functions (`initTheme`, `initSearch`, `initSelectMode`, `initFilterPanel`) called from one `DOMContentLoaded` listener
- Anti-FOUC `apply()` for theme still runs immediately before DOM parse
- JS cache-busting bumped to `r=17`

### CSS Refactoring & Template Fix (2026-06-23)

- **CSS Custom Properties:** Replaced ~39 hard-coded values with variables for secondary colors, rgba transparencies, and button dimensions
  - `--color-primary-rgb` for `rgba()` transparencies (4 locations)
  - `--color-success`, `--color-public`, `--color-private`, `--color-amber` for semantic colors (~23 locations)
  - `--size-icon-btn`, `--size-fab`, `--size-header` for fixed dimensions (12 locations)
- **`includes.html` fix:** Switched CSS inclusion from `{$root_path}/tpl/origr3n/` to `{$asset_path}/` — more robust, no hardcoded theme path
- **RainTPL behavior documented:** Asset `href` attributes using `{$asset_path}` require a `#` at the end of the URL; without it, RainTPL normalizes the path twice (no visual effect, but CSS fails to load)

### Showcase Copy & Security Fixes (2026-06-17–23)

#### Security & Corrections

- **XSS fix:** Escaped template outputs; removed internal hostnames and ports from showcase pages
- **CDN SRI:** Added Subresource Integrity hashes; removed `gruenheit.de` CDN reference; updated `metadata.json` to v1.1.0
- **`.github/` structure:** Set up issue templates and security policy
- Removed internal domain links from all showcase footers

#### Showcase Copy — DE rewritten

- Rewrote showcase copy for both DE and EN versions with more authentic, concrete descriptions
- Quicksand card: personal tone instead of typographic jargon
- Empty state text: shorter and more direct
- Team use-case → bookmark-list focus (more accurate for personal use)
- Added EU privacy argument and image-wall reference
- Removed Pocket as alternative mention; "DIY crowd" phrasing refined
- Tagline "no database server" sharpened and shortened
- Various fixes: jargon, anglicisms, commas, parallel constructs

#### Showcase Copy — EN synchronized

- EN version fully brought up to DE level (privacy, style, use cases)
- Quicksand card: `theme author's` instead of `author's`, `connections` instead of `requests`
- Fixed future tense: "will notice" instead of present tense

---

## [v1.1.0] — Timeline Feature (2026-06-17)

### Added

- **Timeline variant A:** Day-separator dividers between link cards in the linklist — thin gradient line with uppercase date label
- Clock icon (`fa-clock-o`) in the header icon row (desktop + mobile) — toggles `body.origr3n-timeline`
- State persisted via `localStorage` (`origr3n-timeline`); separators injected/removed on toggle
- Icon styling: identical to all other header icons — `var(--text-muted)` default, gray circle + green on hover/active
- Light-mode fix: timeline buttons added to button-exclusion list (light-mode catch-all rule)

---

## [v1.0.0-pub] — GitHub Release (2026-06-17)

### Added

- **i18n:** JS strings (select bar, date pill, tag cloud) follow `document.documentElement.lang`; DE + EN built in, fallback EN
- **i18n:** Templates (`addlink.html`, `linklist.html`) switched to `t()` function
- `/` shortcut opens the search overlay (default: GitHub, YouTube, Reddit)
- Screenshots refreshed: gr3n.de, English UI, Safari private window, 1280 px

### Changed

- Search overlay: Awesomplete selection highlight changed from solid green to muted overlay (`rgba(61,142,18,0.18)`)
- README rewritten in English; added v1.0.3+ requirements, plugins section (markdown + markdown_toolbar), i18n section, `/` shortcut documentation

### Security

- Removed internal hostname, ports, and `4.gr3n.de` references from `_design/` files and CHANGELOG

### Added

- GitHub repository published: `gruenheit/origr3n` · topics set · labels added (css, javascript, shaarli-compatibility)
- GitHub Release v1.0.0 with user-facing release notes

---

## [v1.0.0] — Initial Release (2026-06-16)

### Added

- Theme structure following Shaarli standard (`tpl/`-compatible)
- Design language: Deep Forest (`#3d8e12`), Quicksand variable font, dark/light toggle
- CSS token system: `:root` (dark) and `[data-theme="light"]` (light) — all colors, spacing, and shadows as custom properties
- Sticky header with blur backdrop
- Header icon row: moon/sun toggle, search, logout/login with separator; round hover backgrounds
- Search as modal overlay with tag/text toggle pill, Awesomplete dark-mode styling, escape + backdrop-click to close
- Filter panel (fixed right): visibility pills (private/public/untagged) + per-page pills (20/50/100)
- Link cards: `border-left` accent (green public, amber private), domain line below title, footer band with edit/delete/pin/share icons
- Footer band: collapsible on click, tag pills with hover inversion, compact date pill as permalink
- Select mode: header toggle activates card selection, bottom action bar (delete/public/private/cancel) proxies native Shaarli elements
- Timeline feature: day-separator dividers toggled via clock icon, state persisted in `localStorage`
- Empty state: contextual text (search term / tag / generic) with `sad_star.png` illustration, pagination hidden at 0 results
- Picwall layout: `max-width: 1316px` for exact 8-tile rows, centered last row
- Tag cloud: JS color gradient (dark green → light green by frequency)
- Add/edit forms: micro-caps labels, full-width inputs, ghost delete button, URL tooltip, date pill with relative formatting
- Markdown toolbar: dark/light styling, fullscreen mode support, correct CSS load order after plugin loop
- Admin pages: toggle switches for plugin checkboxes, fixed-column plugin table, cfg-row-field layout
- i18n: JS strings and templates follow `document.documentElement.lang` (DE + EN, fallback EN)
- `origr3n.js`: theme toggle syncs desktop + mobile; select mode; search overlay; date formatting; filter panel
- Dev environment: separate `shaarli-dev` container, deploy via rsync, cache busting via `?v={$version_hash}&r=N`

### Changed

- CSS refactor: removed duplicates (`#shaarli-menu-shaare`, `#theme-toggle`, `.linklist-pages`), −19 lines net
- Light mode: search tag pill gets white background + green border instead of dark-mode green
- Light mode: toolbar buttons (`.btn`) excluded from the general button rule so hover-green works correctly
- Blockquote: 3px green left border (replacing 0.5em gray), `font-style: italic`
- `metadata.json`: version `0.1.0` → `1.0.0`

### Fixed

- PureCSS `flex-wrap: wrap` + `align-content: flex-start` conflict with `align-items: center` in Safari — fixed via `flex-wrap: nowrap !important`
- Mobile header: suppressed duplicate header bar; title ellipsis for long site names
- Mobile search overlay: fixed double-toggle bug by removing redundant JS handler; forced child visibility against `shaarli.min.css` media-query override
- Footer band layout stability: replaced `display: none/flex` toggle with `visibility: hidden/visible` to prevent tag and date pill jumping
- Dual-search bug: `setTagMode()` now clears the inactive input field to prevent simultaneous `?searchterm=x&searchtags=y` submissions
- Awesomplete enter race condition: `awesomplete-selectcomplete` event handles form submit after value fill; `keydown` guard blocks browser enter when dropdown is visible
- RainTPL `<img src>` rewrite: used CSS `background-image: url('../img/...')` instead of `<img>` to avoid theme-path prepend
- First deployed live on gr3n.de

---

*For earlier development history and iteration details, see the git log.*
