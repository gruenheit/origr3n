# Changelog

## [v1.1] — Post-v1.0 Verbesserungen (2026-06-13, r=66–70)

### Visibility-Toggle im Footer-Band (r=67–69)
- Neues Icon **fa-lock** (amber) / **fa-unlock-alt** (muted) direkt im Footer-Band
- Klick auf Icon togglet Privat↔Öffentlich via `/admin/shaare/visibility` (kein JS, Server-Redirect)
- Reihenfolge: lock · edit · delete · pin · multi
- share-alt links der Datum-Pille (vor `linkdate` im Template verschoben)

### Visuelle Zustände (r=70)
- **selected vs. footer-open getrennt:** selected = grünes Tint `rgba(61,142,18,0.07)` + Glow-Ring; footer-open unterdrückt Hover-Rahmen via `:not(.selected):hover`
- **Markdown-Überschriften in Karten** auf `1.05rem` begrenzt — kein Editorial-Durchbruch mehr

### Multi-Checkbox (r=66)
- `0.75rem` — visuell auf Icon-Niveau angeglichen; `border-radius: 1px`

---

## [v1.0] — Linklist-Karten abgeschlossen (2026-06-13, r=65)

**Meilenstein:** Darstellung der Linklist-Karten vollständig. Nächster Schritt: Header-Bereich (Suche, Filter, Toolbar).

### Footer-Band — Icons & Interaktion (r=52–65)
- **Variante E Grünskala:** multi `#5cb81a` (hl), bearbeiten `#3d8e12` (primary), löschen `#5a7a4a` (muted), pin `#3d8e12` / pinned `#5cb81a`
- **Icons:** fa-times (löschen), fa-bookmark (pin) — Labels entfernt, nur Icons
- **Multi-Checkbox:** nativer `<input>` mit `appearance: none` — Quadrat-Outline unchecked, grün gefüllt mit SVG-Haken bei `:checked`; keine FA-Icon-Attrappe, zuverlässig klickbar
- **Vertikale Ausrichtung:** `display: inline-flex; align-items: center` auf allen Controls-Items
- **Private-Share-Link** (`fa-share-alt`): amber `#d4851a`, Hover `#e8a030`
- **Trenner** entfernt: kein `border-right`, keine `&middot;` zwischen Tags
- **Tag-Abstand:** `gap: 0.4rem`

### Datum-Pille (r=61)
- Auf Tag-Höhe angeglichen: `font-size: 0.76rem`, `padding: 0.1rem 0.4rem`

### Formulare — Erweiterungen (r=64–65)
- **Seitenstreifen amber bei PRIVAT:** `:has([name="lf_private"]:checked)` — live, kein JS
- **Titel-Feld Tooltip:** vollständiger Titel als Browser-Tooltip, analog URL-Feld

---

## [Unreleased] — Phase 3: Templates

### Linklist — Interaktion (2026-06-13, r=51)
- Multi-Select: Klick auf Karte toggled `.selected`-Klasse (grüner Rahmen), mehrere Karten gleichzeitig selektierbar
- Footer-Band auf/zuklappbar: Klick auf Footer-Band toggled `.footer-open`; zeigt Bearbeitungs-Icons (Stift, Papierkorb, Pin, Checkbox)
- Datum-Pille = Permalink: Klick navigiert zu `shaare/{shorturl}` (stopPropagation verhindert Footer-Aufklappen)
- Datumsformat kompakt: „11. Jun. 26" für ältere Einträge; „heute/gestern, HH:MM" für aktuelle
- Sternchen-Suffix entfernt (Shaarli setzt `updated_timestamp` immer — kein nutzbares Signal)
- Event-Propagation-Muster: drei unabhängige Click-Zonen gestaffelt via `stopPropagation`

### Linklist — Visuelles Design (2026-06-13, r=33–44)
- Kartenstruktur Direction A: `border-left: 3px solid var(--color-primary)`, private Links amber
- Domain-Zeile unterhalb Titel via `parse_url` in RainTPL
- Footer-Band als eigenständige Zone: negative Margins, erhöhter Hintergrund, `border-top`
- Tag-Pills: grüner Rand, Hover-Inversion (grün gefüllt, weißer Text)
- Tags-Icon (`fa-tags`) ausgeblendet; Tag-Wrapper (`span.label-tag`) auf transparent zurückgesetzt
- Permalink-Label dauerhaft ausgeblendet (Zugang via Datum-Pille)
- URL-Block ausgeblendet; Controls-Group ausgeblendet (erscheint beim Footer-Aufklappen)
- Datums-Pille: dezent grün, kein Hintergrund, `border: 1px solid rgba(61,142,18,0.25)`
- Titel: `1.1rem`, `font-weight: 600`, `letter-spacing: 0.01em`
- Weißes Hintergrundproblem behoben: `background: var(--bg-surface) !important` auf Karte + Infos

### Linklist — Technische Fixes
- PureCSS-Konflikt: `.pure-u-lg-visible { display: inline !important }` → eigenes `!important` nötig
- Tag-Doppelrand: `span.label-tag` und `a` hatten je eigene `border + padding` → Wrapper auf transparent
- Tag-Farbe: Spezifitäts-Fix `.linklist-item-infos .linklist-item-tags a` (0,2,1 schlägt 0,1,1)
- Footer-Höhe vereinheitlicht: Tags-Div `margin: 0.4rem 0 0.3rem` → `0` (Flex-Container-Problem)
- PureCSS-Width: `.pure-u-lg-7-12` = 58.33% auf dateblock → `width: auto !important` immer

### Formulare — Add/Edit (2026-06-13, r=17–33)
- Mikro-Caps Labels, volle Input-Breiten, Ghost-Red Delete-Button
- Datum-Pille im Edit-Formular: `data-ts`-Attribut, JS formatiert zu „heute/gestern/D. Mon JJ, HH:MM"
- URL-Tooltip: vollständige URL als Browser-Tooltip via JS
- EasyMDE-Editor: Dark/Light gestylt
- markdown_toolbar: CSS-Ladereihenfolge-Fix (origr3n.css nach Plugin-Loop)
- Toolbar-Targeting: `.md-editor .btn` statt globalem `.btn`

### Weitere Seiten (2026-06-12–13)
- **Tag-Cloud:** JS-Farbgradient (dunkelgrün→hellgrün nach Häufigkeit); Suchbutton kompakt
- **Tag-Liste:** Grüne Badges + grüne Namen, Abstand Badge↔Name korrekt
- **Tools:** Direction B — Linklist-Akzent (`border-left`); Menüzeilen mit `→`-Pfeil; Bookmarklets als Ghost-Buttons

---

## [Phase 2] — Design-System

### CSS-Grundgerüst
- Token-System: `:root` (Dark), `[data-theme="light"]` (Light) — alle Farben, Abstände, Schatten als Custom Properties
- Quicksand Variable Font von `gruenheit.de/fonts/`

### Navigation & Layout
- Sticky Header mit Blur-Backdrop
- Ghost-Button Dark/Light-Toggle als `<li>` in `.header-buttons`
- Mobile: Hamburger-Menü, offenes Menü, Theme-Toggle im Mobile-Menü

### Badges & Labels
- `.label-private` (amber), `.label-sticky`, `.label-tag`, `.label-filter` (neutral)
- Section 22: alle Badge-Typen, Light-Mode-Karten, Inputs, Filter-Buttons

### Markdown & Code
- Section 23: Markdown Dark-Mode Overrides (blockquote, pre, code, table)

### origr3n.js
- `querySelectorAll('[data-theme-toggle]')` — Desktop + Mobile synchron

---

## [Phase 1] — Fundament

### Added
- Theme-Struktur nach Shaarli-Standard (`tpl/`-kompatibel)
- gr3n Design Language: Deep Forest (#3d8e12), Quicksand, Dark/Light-Toggle
- Dev-Umgebung: shaarli-dev Container (dockerbase:5378), Deploy via scp
- Cache-Busting: `?v={$version_hash}&r=N` in `includes.html`
