# Changelog

## [v1.4-dev] — Header-Ausrichtung: flex-wrap-Fix (2026-06-15, r=114–117)

### r=117 — Header-Ausrichtung gelöst ✅
- **Root Cause gefunden:** PureCSS `.pure-g` setzt `flex-wrap: wrap` + `align-content: flex-start` — bei einem Flex-Container mit `flex-wrap: wrap` positioniert `align-content: flex-start` die gesamte Flex-Zeile am oberen Rand des Containers; `align-items: center` zentriert dann nur *innerhalb dieser oben-sitzenden Zeile*, nicht im 52px-Container
- **Fix:** `flex-wrap: nowrap !important` auf `#shaarli-menu .pure-menu-horizontal` — deaktiviert `align-content` effektiv, gibt `align-items: center` die Kontrolle zurück
- **Diagnose-Methode:** Temporäre `outline`-Farben auf `.pure-menu-horizontal` (blau), `.header-buttons` (rot), `.pure-menu-list` (grün) haben gezeigt, dass die gesamte Flex-Zeile am oberen Rand saß
- CSS-Ansatz gewechselt: Grid → Flexbox auf `.pure-menu-horizontal` (Grid hatte dasselbe Problem)
- Status: **visuell bestätigt** — Icons und Nav-Links auf gleicher Höhe ✅

### r=114–116 — Diagnose-Iterationen
- r=114: CSS-Grid → `#shaarli-menu`-Präfix auf `.header-buttons`; Icon-Box saß weiterhin oben
- r=115: Grid → Flexbox gewechselt; Problem blieb (same root cause)
- r=116: Diagnose-Outlines added (temporär); Root Cause identifiziert
- RainTPL-Bug-Fix (includes.html): `{$root_path}/tpl/origr3n/css/origr3n.css` statt `{$asset_path}` — doppelter Pfad-Bug in href-Attributen mit `&param=value` umgangen

---

## [v1.4-dev] — Header-Ausrichtung: defensive Guards (2026-06-14, r=111–113)

### r=113 — shaarli.min.css Interferenz neutralisiert
- `#shaarli-menu`: `background`, `position`, `z-index`, `max-height`, `overflow` alle auf `!important` gesetzt
  → verhindert dass `shaarli.min.css`'s `.shaarli-menu { background: var(--main-color); max-height: 45px; overflow: hidden }` jemals gewinnen kann
- `.pure-u-lg-5-6`: `align-self: stretch !important; height: 52px !important` ergänzt
  → Nav-Spalte füllt garantiert die volle Grid-Zeilenhöhe; Mittellinie ist jetzt identisch zur Icon-Spalte
- Grid-Struktur und FAB unverändert
- Status: deployed, visuell noch nicht bestätigt

### r=111–112 — Flex-Experiment (reverted)
- Versuch `display: flex` statt `display: grid` auf `.pure-menu-horizontal` — führte zu grünem Header
- FAB-Spezifizitätsproblem: `> .pure-menu-item { display: flex }` (1,3,0) gewann gegen FAB-Regel `li:has()` (1,0,1)
- Beide Revisionen reverted; r=110 wiederhergestellt als Basis für r=113

### Technische Erkenntnisse
- `shaarli.min.css` Klassen-Selektor `.shaarli-menu` (Spezifizität 10) hat `background: var(--main-color)` — ohne `!important` auf `#shaarli-menu` kann unter bestimmten Render-Bedingungen das Grün durchscheinen
- `max-height: 45px; overflow: hidden` in `shaarli.min.css` kürzt den Header auf 45px — muss explizit überschrieben werden
- Warum `display: flex` den grünen Header auslöst: nicht vollständig verstanden; defensive Guards lösen das Problem zuverlässig ohne die Ursache kennen zu müssen

---

## [v1.4-dev] — Header-Nav & FAB (2026-06-13–14, r=91–110)

### FAB — Floating Action Button (r=95–98)
- "+ Teilen" aus der Nav-Leiste entfernt; ersetzt durch FAB: fixierter grüner Kreis (56×56px) unten rechts
- CSS-Only: `li:has(> #shaarli-menu-shaare) { position: fixed; bottom: 2rem; right: 2rem }` — kein Template-Eingriff
- Plus-Symbol als CSS-Kreuz (2px `::before` + `::after`), Font Awesome Icon ausgeblendet
- Hover: leichtes Scale + vertiefter Schatten

### Nav-Links — Hover & Textgröße (r=91–94)
- **Variant A:** Hover = grüner Text (`--color-primary`), kein Hintergrund; Standardzustand `--text-secondary`
- **Font-Size:** 0.875rem (nav-Links kleiner als Titel)
- **Weißer Balken global unterdrückt:** `shaarli.min.css` setzt `.pure-menu-item:hover::after { background:#fff; height:4px }` für alle Items — in `#shaarli-menu` komplett unterdrückt via `content:none !important`
- **Icon-Hover:** `border-radius: 50%` — runde Hover-Fläche auf allen drei Header-Icons

### Header-Ausrichtung — in Arbeit (r=98–110)
- **Ziel:** Titel, Nav-Links und Icons vertikal auf gleicher Höhe
- **Problem:** PureCSS `.pure-g` setzt `align-content: flex-start` — überschreibt `align-items: center` in bestimmten Browsern (Safari/WebKit)
- **Ansatz ab r=107:** `display: grid !important` auf dem Container — umgeht PureCSS-Flexbox-Interferenz komplett
- **Problem grid r=107–108:** PureCSS-Kinder (`pure-u-lg-5-6`, `pure-u-lg-1-6`) hatten `width: 83%/17%` relativ zur Grid-Zelle statt zum Container → Icons schrumpften auf ~2.8% Breite
- **Fix r=109:** `width: 100% !important` auf beiden Kindern — füllen ihre Grid-Zelle vollständig
- **Aktuell r=110:** `align-items: stretch` statt `center` — beide Spalten dehnen sich auf volle Row-Höhe, zentrieren Inhalt intern → nav-Links und Icons auf identischer y-Position

### Technische Erkenntnisse dieser Session
- PureCSS `align-content: flex-start` auf `.pure-g` interferiert mit `align-items: center` in Safari — Grid als sicherer Ausweg
- In CSS Grid werden `width: N%` auf Kindern relativ zur Grid-Zelle berechnet, nicht zum Container → `width: 100% !important` auf Grid-Items nötig
- `align-items: center` auf Grid zentriert Items als Block (unterschiedliche Höhen bleiben unterschiedlich zentriert) → `align-items: stretch` + interne `align-items: center` für konsistente Mittellinie

---

## [v1.3] — Header Icon-Reihe (2026-06-13, r=78–90)

### Icon-Reihe rechts — Variante C implementiert
- Pill-Toggle "Hell/Dunkel" durch Icon-Toggle ersetzt: Mond (`fa-moon-o`) / Sonne (`fa-sun-o`)
- RSS-Icon entfernt — Icon-Reihe: Mond | Separator | Suche | Logout/Login
- Separator: `.nav-sep::after` (1px × 16px, `var(--border-color)`)
- Single-Icon-Ansatz: ein `<i>`-Element, Klasse wird per `syncIcon()` beim Toggle getauscht
- Hover: `color: --text-primary` (weiß), kein grüner Akzent
- JS Cache-Busting: `&r=2` in `page.footer.html` ergänzt

### Bugfixes dieser Session
- **Weißer Balken** (`::after`): `shaarli.min.css` setzt `.pure-menu-item:hover::after { background:#fff; height:4px }` — in `.header-buttons` unterdrückt via `content:none !important`
- **Icon-Reihe unsichtbar:** `pure-u-0 { display:none !important }` schlug `pure-u-lg-visible` — explizites `display:inline-flex !important` in Media Query ergänzt
- **Icon-Liste vertikal:** `.header-buttons .pure-menu-list { display:flex }` explizit gesetzt
- **Mond-Hover grün:** Duplikat `#theme-toggle:hover { color: --color-primary }` korrigiert auf `--text-primary`
- **"Hell"-Text (JS-Cache):** Safari cachte alte `origr3n.js` mit `btn.textContent = 'Hell'`; `&r=2` erzwingt Neuladen

---

## [v1.2] — Kartendesign-Verfeinerung (2026-06-13, r=71–77)

### Kein permanenter Akzentstreifen auf öffentlichen Karten (r=75–76)
- Normalkarten: kein grüner left-Stripe — ruhigere Darstellung bei langen Listen
- Amber left-Stripe bleibt als Sicherheitssignal auf privaten Karten (explizite Safety-Anforderung)
- Selected: 1px grüner Rahmen + Glow-Ring; kein Stripe, kein Hintergrund-Tint
- Hover: 1px grüner Rahmen (keine Box-Shadow)

### Private Karten — Korrekturen (r=71–74)
- Grüner Hintergrund-Tint auf `.selected` entfernt (r=71) — zerstörte Footer-Band-Kontrast
- Private+Selected: amber gewinnt komplett, kein Mischsignal grün/amber (r=72)
- Amber border-left 3px → 2px: Irradiation-Kompensation — amber erscheint optisch breiter (r=73)
- Amber Glow-Ring entfernt: hohe Luminanz von #b07820 macht Glow-Ring überflüssig und wuchtig (r=74)

### Markdown-Blockquote (r=77)
- Blockquote border-left: `--color-primary` → `--text-muted` (grau, dark+light)
- Kein semantischer Konflikt mehr mit Karten-Akzentfarben

---

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
