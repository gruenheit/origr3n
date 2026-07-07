# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added

- Legal notice and privacy policy pages for the showcase, linked in the footer (EN + DE).
- `t` and `d` keyboard shortcuts (open tag search, toggle timeline) alongside the existing `/`; the search overlay now shows the term and tag fields side by side so both can be combined in one query.
- `p` and `m` keyboard shortcuts (toggle "private only" filter, toggle multi-select) for logged-in users.
- Keyboard shortcuts help overlay, opened via `?` or a new "Keyboard shortcuts" footer link.
- Clear (×) button on every search field, including the tag-cloud and tag-list pages.

### Changed

- Replaced the default `favicon.ico` (glossy sphere, inherited from the Shaarli Material theme) with a flat green dot matching the theme's own brand mark.
- Desktop header icon buttons (`<button>` elements: theme toggle, timeline, filter, select) now share the same sizing/centering rule as the `<a>`-based icons, matching the pattern already used on mobile.

### Fixed

- Resolved a stuck GitHub Pages deployment.
- Removed legal-notice/privacy links accidentally hardcoded into the theme footer; moved to a site-specific plugin instead.
- Various copy-editing fixes in the German and English showcase text (punctuation, quotation marks).
- Awesomplete suggestion dropdown (dark-mode colors, left-aligned text, pointer arrow) now applies consistently to every search field instead of only the header overlay.
- Timeline toggle button label now respects the page language instead of always showing German.

---

## [v1.1.1] — Bugfix Release (2026-06-23)

### Added

- "Live instance" button on the showcase pages.

### Changed

- Refactored CSS custom properties and consolidated JS initialization into a single entry point.
- Revised showcase copy for clarity and accuracy (DE + EN).

### Fixed

- Visibility filter no longer loses search context when switching Private/Public.
- Filter panel pills and labels now respect browser language and visited-link styling.
- Fixed self-referential CSS custom properties for semantic colors.
- Fixed invisible link hover color inside card descriptions.
- Fixed asset path handling in `includes.html`.

### Security

- Replaced the Google Fonts CDN with locally bundled fonts.
- Escaped template outputs and removed internal hostnames from showcase pages.
- Added Subresource Integrity hashes for remaining CDN assets.

---

## [v1.1.0] — Timeline Feature (2026-06-17)

### Added

- Timeline view: day-separator dividers between link cards, toggled via a header icon, state persisted locally.

---

## [v1.0.0-pub] — GitHub Release (2026-06-17)

### Added

- Full i18n support (DE/EN) for templates and JS strings.
- `/` shortcut to open the search overlay.
- GitHub repository published with topics, labels, and release notes.

### Changed

- Search overlay selection highlight restyled.
- README rewritten in English.

### Security

- Removed internal hostnames and ports from design files and changelog history.

---

## [v1.0.0] — Initial Release (2026-06-16)

### Added

- Initial theme release: Deep Forest design language, dark/light mode, sticky header, search overlay, filter panel, timeline, select mode, tag cloud, markdown toolbar, full i18n support.

### Changed

- Minor CSS cleanup and light-mode refinements.

### Fixed

- Cross-browser layout fixes (Safari flex-wrap, mobile header/search overlay, footer band jumping, dual-search race condition, RainTPL image path rewriting).

---

*For earlier development history and iteration details, see the git log.*
