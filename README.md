# Shaarli-origr3n

A clean, opinionated [Shaarli](https://github.com/shaarli/Shaarli) theme built on the **gr3n design language**.

> Compatible with Shaarli v0.13+  
> Status: **v1.4-dev** — CSS r=194 · JS r=13 · Mobile Header ✅ · Such-Overlay Mobile ✅ · Select-Modus ✅ · Tools-Seiten cfg-Layout ✅ · Thumbnail-Integration offen (Grid-Ansatz) · Light Mode + Production-Deploy ausstehend

---

## Design-Sprache

- **Deep Forest** Farbpalette (`#3d8e12`) — Primary-Akzent für Titel, Tags, Icons
- **Quicksand** Variable Font (von `gruenheit.de/fonts/` — bei Bedarf selbst hosten)
- **Dark / Light Toggle** mit `localStorage`-Persistenz und `prefers-color-scheme`-Fallback
- CSS Custom Properties (Token-System) für konsistente Farben und Abstände

---

## Features

### Linklist (Hauptansicht)

- **Karten-Design:** 3px grüner Akzentrand links; private Karten amber (Hover-Rand + Stripe); Domain-Zeile unter Titel
- **Dekoratives Highlight:** Klick auf Kartenbereich togglet `.selected` (grüner Rahmen), mehrere Karten gleichzeitig; Klick außerhalb löscht alle
- **Select-Modus:** Header-Icon aktiviert `body.select-mode` — Karten anklicken selektiert + checkt native Shaarli-Checkboxen; Bottom-Bar mit Zähler, „alle wählen", Löschen/Öffentlich/Privat/Abbrechen; Action-Buttons als farbige Textlinks
- **Badges:** Privat-Label (amber) + Sticky-Badge (`fa-bookmark`, grün) in `.linklist-item-editbuttons`; Reihenfolge: Privat zuerst
- **Footer-Band:** Tags + Datum-Pille + Icons; Klick klappt auf/zu; Layout-stabil (visibility statt display, kein Reflow)
- **Footer-Icons (Variante E):** Grünskala — edit `#3d8e12`, delete `#5a7a4a`, pin/fa-bookmark `#3d8e12`
- **Visibility-Toggle:** fa-lock (amber) / fa-unlock-alt im Footer-Band — togglet Privat↔Öffentlich
- **Private-Share-Link:** amber `#d4851a` (fa-share-alt) — konsistent mit Privat-Badge
- **Datum-Pille = Permalink:** Klick öffnet `shaare/{shorturl}` direkt; Höhe auf Tag-Niveau angeglichen
- **Datumsformat:** „heute, HH:MM" / „gestern, HH:MM" / „11. Jun. 26" für ältere Einträge
- **Tag-Pills:** Grüner Rand, Hover-Inversion; kein redundantes Tag-Icon

### Header

- **FAB „+ Teilen":** Fixierter grüner Kreis (56×56px) unten rechts — immer erreichbar, ohne Nav zu belasten
- **Nav-Links:** `--text-secondary` Standard, `--color-primary` bei Hover; 0.875rem
- **Header-Icons:** runde Hover-Fläche (`border-radius: 50%`); Mond, Suche, Filter, Select-Toggle, Logout/Login; alle gleich gestylt — `var(--text-muted)` initial, `--color-primary` bei Hover; Select-Toggle bleibt im aktivem Modus hervorgehoben
- **Filter-Panel:** Sichtbarkeits- und Ergebnis-Pro-Seite-Pills; Position fixed

### Weitere Seiten

- **Tag-Cloud:** JS-Farbgradient — häufige Tags heller, seltene dunkler
- **Tag-Liste:** Grüne Zähler-Badges
- **Tools-Übersicht:** Akzentlinie links, Menüzeilen mit `→`-Pfeil; alle drei Panels einheitlich `1/2`-Breite
- **Tools-Unterseiten (cfg-*-Layout):** configure, changepassword, changetag, export, import, pluginsadmin, server — einheitliches Single-Column-Kartenformat mit `cfg-section`, `cfg-row`, `cfg-submit`, Toggle-Switches
- **Plugin-Administration:** Toggle-Switches für Plugin-Checkboxen, zweispaltige Tabelle mit festen Spaltenbreiten, Mikro-Caps-Sektions-Header mit grünem Akzent
- **Add/Edit-Formular:** Mikro-Caps Labels, vollbreite Inputs, Ghost-Red Delete, Markdown-Toolbar gestylt
- **PRIVAT-Haken:** Seitenstreifen wechselt live auf amber (CSS `:has()`, kein JS)
- **URL + Titel-Tooltip:** vollständiger Inhalt als Browser-Tooltip, aktualisiert sich beim Tippen

---

## Installation

1. Repository klonen oder herunterladen
2. `origr3n/`-Verzeichnis in das Shaarli-`tpl/`-Verzeichnis kopieren:
   ```bash
   cp -r origr3n/ /path/to/shaarli/tpl/
   ```
3. In Shaarli: **Tools → Theme ändern → origr3n**

---

## Entwicklung

```
Shaarli-origr3n/
├── origr3n/
│   ├── css/origr3n.css      — Haupt-Stylesheet (Token-System, alle Seiten)
│   ├── js/origr3n.js        — Dark/Light-Toggle, Suche-Overlay, Select-Modus, Filter-Panel
│   ├── includes.html        — Head: CSS-Einbindung (mit ?r=N Cache-Busting), JS-Snippets
│   ├── linklist.html        — Hauptansicht
│   └── ...                  — weitere Templates
├── _design/                 — Vergleichsseiten, Prototypen (nicht deployed)
├── CHANGELOG.md
└── README.md
```

**Deploy (Dev):**
```bash
scp origr3n/css/origr3n.css dockerbase:/srv/docker/shaarli-dev/theme/css/origr3n.css
scp origr3n/includes.html dockerbase:/srv/docker/shaarli-dev/theme/includes.html
# Bei Template-Änderungen:
scp origr3n/linklist.html dockerbase:/srv/docker/shaarli-dev/theme/linklist.html
```

Cache-Busting: `r=N` in `includes.html` bei CSS-Änderungen incrementieren.

---

## License

MIT — see [LICENSE](LICENSE)
