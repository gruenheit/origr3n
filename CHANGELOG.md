# Changelog

## [post-v1.1.0] — Showcase-Texte & Sicherheitskorrekturen (2026-06-17–23)

### Sicherheit & Korrekturen

- **XSS-Fix:** Template-Ausgaben escaped; interne Hostnamen und Ports aus Showcase-Seiten entfernt
- **CDN SRI:** Subresource Integrity Hashes ergänzt; `gruenheit.de`-CDN-Referenz entfernt, `metadata.json` auf v1.1.0 aktualisiert
- **`.github/` Struktur:** Issue-Templates und Security Policy eingerichtet
- Interne Domain-Links aus allen Showcase-Footern entfernt

### Showcase-Texte — DE überarbeitet

- KI-generierte Formulierungsmuster aufgebrochen — authentischere, konkretere Beschreibungen
- Quicksand-Karte: persönlicher Ton statt typografischer Fachbeschreibung
- Empty-State-Text kürzer und sachlicher
- Team-Use-Case → Merkliste-Fokus (treffender für private Nutzung)
- EU-Datenschutz-Argument und Bildwand-Referenz als Argument ergänzt
- Pocket als Alternativ-Nennung entfernt; „Selbermacher" → „Individualisten"
- Tagline „kein Datenbankserver" verschärft und gekürzt
- Diverse Einzelkorrekturen: Jargon, Anglizismen, Kommas, Parallelkonstrukte

### Showcase-Texte — EN synchronisiert

- EN-Version vollständig auf DE-Stand gebracht (Privacy, Stil, Use Cases)
- Quicksand card: `theme author's` statt `author's`, `connections` statt `requests`
- Futur-Formulierung korrigiert: „will notice" statt Präsens

---

## [v1.1.0] — Timeline Feature (2026-06-17, r=255)

- **Timeline Variant A:** day-separator dividers between link cards in the linklist — thin gradient line + uppercase date label
- Clock icon (`fa-clock-o`) in header icon row — Desktop + Mobile — toggles `body.origr3n-timeline`
- State persistent via `localStorage` (`origr3n-timeline`); separators injected/removed on toggle
- Icon styling: identical to all other header icons — `var(--text-muted)` default, gray circle + green on hover/active
- Light-mode fix: timeline buttons added to button-exclusion list (Light-Mode catch-all rule)
- CSS r=255

---

## [v1.0.0-pub] — GitHub-Veröffentlichung (2026-06-17, r=252 / JS r=16)

- i18n: JS-Strings (Select-Bar, Datum-Pille, Tag-Cloud) folgen `document.documentElement.lang`; DE + EN eingebaut, Fallback EN
- i18n: Templates (`addlink.html`, `linklist.html`) auf `t()`-Funktion umgestellt
- Such-Overlay: Awesomplete-Auswahl von Solid-Green auf Muted-Overlay (`rgba(61,142,18,0.18)`) geändert
- `/`-Shortcut öffnet Such-Overlay (Standard: GitHub, YouTube, Reddit)
- Screenshots erneuert: gr3n.de, englische UI, Safari Privat-Fenster, 1280 px
- README: englisch, v1.0.3+, Plugins-Sektion (markdown + markdown_toolbar), i18n-Abschnitt, `/`-Shortcut
- Security: `dockerbase`-Hostname, interne Ports und `4.gr3n.de` aus `_design/`-Dateien und CHANGELOG entfernt
- GitHub-Repo erstellt: `gruenheit/origr3n` · Topics gesetzt · Labels ergänzt (css, javascript, shaarli-compatibility)
- GitHub Release v1.0.0 erstellt mit nutzerorientierten Release Notes

---

## [v1.0.0] — Production Release (2026-06-16, r=244 / JS r=16)

- CSS-Refactor: Duplikate bereinigt (#shaarli-menu-shaare, #theme-toggle, .linklist-pages), -19 Zeilen netto
- Light-Mode: Such-Tag-Pill weißer Hintergrund + grüner Rand statt Dark-Mode-Grün (#1a3a0a)
- Light-Mode: Toolbar-Buttons (.btn) aus allgemeiner Button-Regel ausgenommen → Hover-Grün funktioniert
- Blockquote: 3px grüner Rand (statt 0.5em grau), font-style italic
- metadata.json: Version 0.1.0 → 1.0.0
- Erstmals live auf gr3n.de deployed

---

## [v1.4-dev] — Empty State, Such-Overlay Fixes, Footer-Band, Picwall (2026-06-16, r=198–237 / JS r=16)

### Empty State — 0 Suchergebnisse (r=229–237)
- `sad_star.png` aus Shaarli default-Theme als Illustration übernommen (300×300px RGBA)
- Template: `<div class="origr3n-sad-star">` statt `<img>` — RainTPL rewritet `<img src>`-Attribute (prepended Themepfad vor `{$asset_path}`); Lösung: CSS `background-image: url('../img/sad_star.png')`
- Text kontextabhängig: Suchbegriff / Tag / generisch (drei `{if=}`-Zweige in `linklist.html`)
- Pagination bei 0 Treffern ausgeblendet: `body:has(#origr3n-empty-state) .linklist-paging { display: none }`
- Dark Mode: `filter: invert(1) brightness(0.65); opacity: 0.7` — PNG ist für helle Hintergründe gemacht, Inversion macht helle Striche auf dunklem Grund

### Such-Overlay — JS r=16 (origr3n.js)
- **Immer Textmodus beim Öffnen:** `setTagMode(false)` im MutationObserver-Callback — verhinderte, dass Seiten mit Tag-Filter die Suche in Tag-Modus öffneten
- **Dual-Search-Bug behoben:** `setTagMode()` leert das inaktive Input-Feld beim Umschalten — verhindert, dass `?searchterm=x&searchtags=y` gleichzeitig gesendet wird
- **Awesomplete Enter-Race-Condition:** `awesomplete-selectcomplete`-Event übernimmt den Formular-Submit (nach Wertfüllung); `keydown`-Guard blockiert Browser-Enter wenn Dropdown sichtbar

### Footer-Band — Badges + Icon-Konsolidierung (r=221–228)
- Privat- und Pin-Badges aus dem Karten-Header entfernt (`.linklist-item-editbuttons { display: none !important }`)
- Badges als Status-Indikatoren im Footer-Band: `ctrl-visibility` und `ctrl-pin` via `:has()` sichtbar wenn privat/gepinnt
- Uniform-Icon-Größe: alle Footer-Icons auf `font-size: 0.82rem` — Lesezeichen-Icon war größer als andere
- Icon-Sortierung im Footer: `order`-Eigenschaft für visuelle Symmetrie

### Picwall — Layout-Optimierung (r=224–228)
- `max-width: 1316px` für `#content:has(#picwall-container)` — separat von anderen Seiten (1280px)
- Berechnung: `(1316–32)×20/24–24 = 1046px` → exakt 8 Tiles à 125px + 7 Gaps à 6.4px
- `justify-content: center` auf `.picwall-container` — letzte Zeile mit weniger als 8 Tiles wird zentriert
- `font-weight: 400 !important` auf `.picwall-pictureframe .info` — Hover-Text war unbeabsichtigt bold

### FAB (+ Floating Action Button)
- Nur auf Linklist sichtbar: `li:has(> #shaarli-menu-shaare) { display: none !important }` global; `body:has(#linklist)` hebt es wieder auf
- Position: `bottom: 4rem` (vorher 2rem) — mehr Abstand zum Seitenrand

### Entscheidung dokumentiert: Pinned-Checkbox im Addlink-Formular
- **Gewünscht:** `☑ PINNED` neben `☑ PRIVAT` beim Erstellen eines Links
- **Nicht umsetzbar im Theme:** Shaarlis `ShaarePublishController` kennt kein `lf_sticky`-POST-Feld; `sticky` wird über einen separaten Endpoint `/admin/shaare/{id}/pin?token=...` umgeschaltet, der die Link-ID nach dem Speichern benötigt
- **Lösung wenn gewünscht:** Shaarli-Plugin mit `hook_save_link` (~25 Zeilen PHP)

---

## [v1.4-dev] — Linklist-Redesign: Grid, TN rechts, Desc volle Breite (2026-06-16, r=195–197)

### Entscheidungen
- **Kein Link-Icon** — `fa-external-link` / `fa-sticky-note` aus `<h2>` entfernt; Domain + Titelfarbe übernehmen Orientierung vollständig
- **Thumbnail rechts (Layout B, 110×75px)** — dezente Vorschau, Text dominiert
- **Beschreibung volle Breite** — unterhalb des Titel+TN-Grids, nicht in der Textspalte

### linklist.html — Struktur-Rewrite
- `.linklist-item-title` als CSS Grid (`1fr auto`, `align-items: start`)
- Neues `.linklist-item-text` als Textspalte (editbuttons + h2 + domain)
- Thumbnail ans Ende des Grids verschoben (→ rechte Spalte)
- `.linklist-item-description` aus `.linklist-item-text` heraus — Geschwister von `.linklist-item-title`, volle Kartenbreite

### CSS — shaarli.min.css Overrides (r=196)
- `h2: padding: 0 !important` — shaarli.min.css hatte `padding: 3px 10px 0` → Titel stand 10px weiter rechts als Domain
- `.linklist-item-description: padding: 0 !important` — shaarli.min.css hatte `padding: 0 10px` → Beschreibung ebenfalls 10px versetzt
- Beide Elemente jetzt bündig mit Domain auf derselben x-Achse

### CSS — Thumbnail + Editbuttons (r=195, r=197)
- `.linklist-item-thumbnail`: `float: none !important; height: auto !important` — shaarli.min.css: `float: right; height: 90px`
- `.linklist-item-thumbnail .thumbnail img`: `width: 110px !important; height: 75px !important; object-fit: cover`
- `.linklist-item-editbuttons`: `float: none !important; display: flex !important; gap: 0.5rem` — shaarli.min.css: `float: right; margin: 0 1px` auf Kindern (zu eng)

---

## [v1.4-dev] — Linklist Thumbnail-Integration (Revert, 2026-06-16, r=190–194)

### Erkenntnisse (für nächste Session)
- **Grid-Ansatz (r=190):** Footer-Band endete nicht am rechten Rand; TN in der Ecke wirkte "extern" → verworfen
- **Float-Ansatz (r=191–193):** `float: right` funktioniert für Text-Wrap, verhindert aber saubere vertikale Textausrichtung (Titel, Domain, Beschreibung starten auf verschiedenen x-Positionen)
- **Icon-Hänger-Fix (r=192/193):** `inline-flex + width:100%` brach Float-Wrap (neuer BFC); `text-indent + padding-left` korrigiert das, löst aber das Ausrichtungsproblem nicht
- **Fazit (r=194 Revert):** Thumbnail-Integration benötigt echtes Card-Grid — Bild in eigener Grid-Spalte, Text in anderer; Float ist der falsche Ansatz dafür

---

## [v1.4-dev] — Tools-Seiten: cfg-*-Layout + Plugin-Admin-Tabelle (2026-06-15, r=181–189)

### pluginsadmin.html — komplettes Rewrite (r=182–187)
- Toggle-Switches (`cfg-toggle`) für alle Plugin-Checkboxen (Enabled + Disabled) — HTML-Wrapper `<label class="cfg-toggle"><input><span class="cfg-toggle-slider"></span></label>`
- `cfg-submit` für beide Submit-Buttons (rechts, kompakt)
- `window-subtitle` als Mikro-Caps-Trennlinie mit grünem Akzentstreifen links (`border-left: 3px solid var(--color-primary)`)
- Plugin-Tabelle: `table-layout: fixed`, feste Spaltenbreiten (64 / 170 / auto / 110px) — gleiche Ausrichtung zwischen Enabled- und Disabled-Tabelle
- Plugin-Config-Parameter: `cfg-row-field` + `cfg-input` — einheitlich mit anderen Formular-Seiten
- Breite auf `pure-u-lg-22-24` angehoben — vierspaltige Tabelle (inkl. Reihenfolge) hat genug Platz
- `text-transform: none` auf Beschreibungszellen — ALL-CAPS-Texte aus Plugin-Metadaten korrigiert
- `cfg-toggle-slider` Border auf `rgba(255,255,255,0.22)` — Off-State Track sichtbar auf dunklem Hintergrund

### server.html — Breite (r=181)
- Container von `pure-u-lg-1-2` auf `pure-u-lg-3-4` — Tabellenspalten wurden nicht abgeschnitten

### changetag.html — Panel-Breite (r=188)
- Beide Panels von `pure-u-lg-1-3` auf `pure-u-lg-1-2` — zwei nebeneinanderstehende Buttons haben Platz

### tools.html — Panel-Breite (r=189)
- Alle drei Panels (`Einstellungen`, `Lesezeichen`, `Ressourcen`) von `pure-u-lg-1-3` auf `pure-u-lg-1-2`
- "Lesezeichen (Bookmarklets)"-Titel bricht nicht mehr auf zwei Zeilen

---

## [v1.4-dev] — Addlink-Form + Editlink-Fixes + Markdown-Fullscreen (2026-06-15, r=151–165 / JS r=13)

### Addlink-Form (addlink.html, r=151–155)
- Deutsche Labels: "Link hinzufügen", "URL — oder leer lassen für eine Notiz", "Hinzufügen", "Mehrere Links", "Links hinzufügen"
- Awesomplete-Wrapper: `display: block !important; width: 100%` — Tags-Feld gleichbreit wie Textarea
- Beschreibungs-Labels (`label[for="shaare"]`, `label[for="urls"]`): `text-transform: none; font-size: 0.8rem` — kein CAPS-Stil
- Submit-Buttons: kompakter (`height: auto; min-width: 0; padding: 0.3rem 0.85rem`) — shaarli.min.css-Override (`height: 35px; min-width: 150px`) übersteuert
- Submit-Container rechtsbündig via `display: flex; justify-content: flex-end`
- `page-form-light .window-title`: `font-weight: 500` — schlankere Fensterüberschriften

### Input-Kontrast + URL-Tooltip (r=156–158)
- Focus-Hintergrund: `background: var(--bg-input) !important` — kein blendend-weißes Chrome-Focus
- Webkit-Autofill-Override: `-webkit-box-shadow: 0 0 0 1000px var(--bg-input) inset !important`
- URL-Tooltip auf `input[name="post"]` ergänzt (wie `lf_url` im Editlink)

### Editlink — Button-Reihenfolge (r=159–162)
- "Löschen" links, "Speichern" rechts: flexbox `order: 1/2` + `margin-right: auto` auf Löschen-Button
- Kein HTML-Eingriff — DOM-Reihenfolge unverändert, nur visuelle Umsortierung
- Früherer Ansatz (`margin-left: auto` auf Save) führte zu Überlappung — behoben

### Markdown-Toolbar (r=160–165)
- Expand-Button hover: `color: var(--color-primary)` — Plugin setzt `color: #333` → unsichtbar auf dunklem BG; html-Präfix erhöht Spezifität
- **Fullscreen-Modus** — Strategie: `body.md-nooverflow` (Bootstrap-Markdown setzt diese Klasse) zum Verstecken des Seitenheaders; `html .pure-g`-Präfix gegen Plugin-Regeln mit (0,4,0)-Spezifität
  - Seitenheader ausgeblendet: `body.md-nooverflow #shaarli-menu { display: none }`
  - Dunkler Hintergrund: `html .md-editor.md-fullscreen-mode { background: var(--bg-base) }`
  - Textarea alle Zustände: `:focus`, `:hover` explizit abgedeckt (Plugin hat alle drei mit `#fff !important`)
  - Toolbar oben: `top: 0; margin-top: 0` — Plugin schiebt via `.pure-g` auf 30px, beaten durch `html .pure-g`-Spezifität
  - Exit-Button (`.md-fullscreen-controls a`): hover → grün; Plugin: `color: #333` → unsichtbar
- Overflow-Fix: `overflow: hidden` auf `.md-editor`; `width: 100%; box-sizing: border-box` auf `.btn-toolbar` — Toolbar übersteht nicht mehr über Container

---

## [v1.4-dev] — Select-Modus + Karten-Badges + Footer-Stabilität (2026-06-15, r=141–150 / JS r=10–12)

### Select-Modus (r=141–150 / JS r=10–12)
- Neues Header-Icon `[data-select-toggle]` (Desktop + Mobile, nur für eingeloggte User): `fa-check-square-o`
- Klick aktiviert `body.select-mode`; alle Karten werden klickbar (Cursor, user-select)
- Karte klicken → `.selected` + nativer Shaarli-Checkbox gechecked → Bottom-Bar aktualisiert Zähler
- Bottom-Bar (`#origr3n-select-bar`, fixed bottom): Zähler | "alle wählen" | Löschen · Öffentlich · Privat · Abbrechen
- Action-Buttons proxyen auf native Shaarli-Elemente (`#actions-delete`, `.actions-change-visibility`)
- Abbrechen: `exitSelectMode()` — entfernt `body.select-mode`, uncheckt alle Checkboxen, löscht `.selected`
- Native `#actions`-Bar per `display: none !important` versteckt (Bottom-Bar ersetzt sie vollständig)
- Checkboxen (`link-checkbox`, `ctrl-checkbox`) per CSS unsichtbar gehalten — existieren für Shaarli-JS
- Dekoratives Karten-Highlight außerhalb Select-Modus beibehalten: Klick togglet `.selected` (kein Checkbox-Link), mehrere Karten gleichzeitig selektierbar; Klick außerhalb löscht alle
- Einschalten des Select-Modus löscht zuerst bestehende dekorative Highlights
- Select-Toggle-Icon: identisches Styling wie Suche/Filter/Mond — `var(--text-muted)` initial, runder Hover-Hintergrund; im Select-Modus hervorgehoben (`--bg-elevated` + `--color-primary`)
- Action-Buttons als reine Textlinks: kein Hintergrund, kein Border; Farben: rot/grün/amber/grau; globale `button { !important }`-Regeln übersteuert
- Icons (fa-trash, fa-globe, fa-user-secret) aus Action-Buttons entfernt — Farbe trägt semantische Bedeutung

### Privat-Karte Hover-Farbe (r=141)
- Hover-Border auf privaten Karten: grün → amber (`#b07820`)
- Zwei unabhängige Hover-Zustände: öffentlich = grüner Rand, privat = amber Rand

### Sticky-Badge — Icon statt Text (r=142–145)
- "Angeheftet"-Text durch `fa-bookmark`-Icon ersetzt (gleiche Icon-Familie wie Footer-Band)
- Iterationen: `fa-thumb-tack` (unsichtbar) → `fa-map-marker` (nutzer-Rückfrage) → `fa-bookmark` (bestätigt)
- Reihenfolge der Badges in `.linklist-item-editbuttons` getauscht: Privat-Label zuerst, Bookmark-Icon dahinter
- Blauer Rahmen aus `shaarli.min.css` (`.linklist-item-title .label-sticky { border: solid 1px #0b5ea6 }`) mit `border: none !important` überschrieben
- `color: var(--color-primary) !important; background: transparent !important; padding: 0 !important`

### Footer-Band Layout-Stabilität (r=146–147)
- **Problem:** Controls-Group (`display: none/flex` Toggle) entfernte das Element aus dem Flex-Flow → Tags und Datum-Pille sprangen beim Aufklappen
- **Fix:** `visibility: hidden/visible` statt `display: none/flex` — Controls immer im Flow, nur Sichtbarkeit wechselt
- Unified Padding auf `.linklist-item-infos`: kein Layout-Shift zwischen offen/geschlossen
- Dateblock immer `display: flex` — garantiert stabile Breite unabhängig vom Controls-Status

---

## [v1.4-dev] — Mobile Such-Overlay (2026-06-15, r=139–140)

### r=139–140 — Such-Overlay auf Mobile funktionsfähig ✅
- Doppel-Toggle-Bug behoben: eigener `.mobile-header-icons .subheader-opener`-Handler aus origr3n.js entfernt — Shaarli-JS deckt via `getElementsByClassName("subheader-opener")` bereits alle Opener ab; zwei Handler toggelten `open` sofort wieder weg
- CSS: `#search.subheader-form.open * { visibility: visible !important }` — shaarli.min.css setzt `.header-search * { visibility: hidden }` im `@media (max-width: 64em)`-Block; Kinder der Overlay-Form blieben dadurch unsichtbar

## [v1.4-dev] — Mobile Header (2026-06-15, r=138)

### r=138 — Mobile Header: kein Doppelheader, Titel-Ellipsis ✅
- `.menu-transform.pure-menu-horizontal { display: none }` in `@media (max-width: 63.99em)` — verhindert zweite Kopfleiste unter der Mobile-Bar
- `.shaarli-title-text`: `white-space: nowrap; text-overflow: ellipsis; min-width: 0` für lange Seitentitel
- `{$shaarlititle}` in `<span class="shaarli-title-text">` gewrappt — Voraussetzung für Ellipsis in Flex-Container
- `overflow: hidden` auf `.shaarli-title` selbst ergänzt
- CSS-Stand (r=126–137) komplett auf Dev deployed (war noch Jun 13 / r≈113)

## [v1.4-dev] — Mobile Header Icons + Filter-Panel (2026-06-15, r=126–137)

### r=137 — Mobile Header Icons ✅
- `.mobile-header-icons` in Mobile-Bar (`.pure-u-lg-0`) eingefügt: Moon, Suche, Filter (für eingeloggte User)
- Mobile-Bar wird Flex-Container: Logo (flex:1) | Icons | Hamburger (order:99)
- `.menu-toggle` bekommt `position: static !important` um in Flex-Flow zu rücken
- `syncIcon()` aktualisiert alle `[data-theme-toggle] .fa` (Desktop + Mobile)
- Filter-Panel-JS bindet an `.filter-btn-trigger` (Klasse auf beiden Buttons) statt `#filter-btn`

### r=136 — Double-Hiding-Fix: Delete/Pin/Visibility-Icons
- `.ctrl-delete a, .ctrl-pin a, .ctrl-visibility a`: `display: inline-flex !important`
- Ursache: shaarli.min.css + `pure-u-0 pure-u-lg-visible` auf Kind-Element UND Eltern-Element → doppelte Unterdrückung; `!important` auf `<a>` direkt nötig

### r=133–135 — Mobile-Buttons-Redundanz aufgelöst
- `.mobile-buttons { display: none !important }` — komplett ausgeblendet
- Shaarlis `.mobile-buttons` (Löschen/Pin/Sichtbarkeit auf Mobile) ist in origr3n redundant: Footer-Band auf allen Breiten übernimmt alle Aktionen
- Iterationen r=133/134 (`.footer-open`-Ansatz) gezeigt, dass Duplikate entstehen → r=135 zurück zu `none`

### r=128–132 — Pagination + Stats: dezent neu gestaltet
- Pagination: `fa-angle-left/right` statt `fa-arrow-circle-*`; Seitenanzahl als `font-weight:400` in `--text-muted`
- Obere Border aus `.linklist-paging` entfernt
- `.linkcount` ausgeblendet (top-right Sidebar); Stats als `.linklist-stats-bottom`: kursiv, 0.68rem, opacity 0.55
- Footer `#footer`: `font-size: 0.68rem; opacity: 0.45; border-top: none`
- Suchergebnis-Kontext-Bar `#search-result-block`: transparent, borderless, `--text-muted`
- Alte Filterleiste + Linksperpage ausgeblendet (`.linklist-filters, .linksperpage { display: none !important }`)

### r=126–127 — Filter-Panel ✅
- Trichter-Icon `#filter-btn` im Header (nur für eingeloggte User), runder Hover-Hintergrund wie Search-Icon
- `#filter-panel` (position: fixed, right: 8px): Sichtbarkeit-Pills (privat/öffentlich/ohne Tag) + pro-Seite-Pills (20/50/100)
- Pills: Border-Radius 999px, `active`-Klasse = `--color-primary` Hintergrund; Pill klicken = Toggle (Shaarli SessionFilterController)
- Active-Dot-Bug: `$visibility` ist PHP `null` (nicht `''`) wenn kein Filter → `{if="$visibility==='private' || $visibility==='public' || $untaggedonly"}` korrekte Prüfung
- Filter-Panel schließt per Escape, Außenklick, erneuter Pill-Klick (Toggle)

---

## [v1.4-dev] — Suche als Modal-Overlay (2026-06-15, r=122–125)

### r=125 — Modal-Overlay final ✅
- `#search.open` ist jetzt selbst der Backdrop (position: fixed; inset: 0; rgba-Hintergrund; flex-center)
- `<form>` darin als zentrierte Overlay-Box (480px, dark theme, keine Shaarli-Kollision mehr)
- Tag/Text-Toggle-Pill: ein Eingabefeld umschaltbar — "tags"-Pill aktiv = Awesomplete Tag-Suche, inaktiv = Volltextsuche
- Awesomplete-Dropdown Dark-Mode: bg-surface, grüne Marks statt gelb, selected = --color-primary
- Escape und Backdrop-Klick schließen Overlay; Autofocus auf Öffnung
- `#search-linklist` in linklist.html per CSS ausgeblendet

### r=122–124 — Overlay-Entwicklung
- r=122: Grundstruktur Overlay + Backdrop-Div (via JS), #search-linklist ausgeblendet
- r=123: Tag/Text-Toggle-Pill, Awesomplete-Styling, Suche-Nav-Link (dann wieder entfernt)
- r=124: `!important`-Fixes gegen shaarli.min.css-Overrides (width:100%, height:30px)

---

## [v1.4-dev] — Header-Ausrichtung: flex-wrap-Fix (2026-06-15, r=114–117)

### r=121 — Header-Ausrichtung visuell bestätigt ✅
- `transform: translateY(3px)` auf `.header-buttons` — optische Feinkorrektur von ~3px
- Hintergrund: `line-height: 52px` (Nav-Text) und `align-items: center` (Icon-Boxen) liegen geometrisch beide auf y=26px, aber Font-Icon-Rendering erzeugt eine optische Diskrepanz; `translateY` kompensiert ohne Layout-Impact
- Kein Einfluss auf Klick-Ziele oder Hover-Verhalten

### r=119–120 — line-height-Ansatz + Icon-Höhe
- r=119: `line-height: 52px !important` auf Nav-Links → Nav-Text-Zentrierung unabhängig von Flex-Container-Höhe; `justify-content: flex-end` auf `.header-buttons` für konsistente Icon-Position
- r=120: `height: 52px !important` auf Icon-`<li>`-Items (keine sichtbare Verbesserung)

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
- Dev-Umgebung: separater shaarli-dev Container, Deploy via rsync
- Cache-Busting: `?v={$version_hash}&r=N` in `includes.html`
