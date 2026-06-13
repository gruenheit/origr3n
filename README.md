# Shaarli-origr3n

A clean, opinionated [Shaarli](https://github.com/shaarli/Shaarli) theme built on the **gr3n design language**.

> Compatible with Shaarli v0.13+  
> Status: Phase 3 in Entwicklung — Dev-Instanz aktiv, Production-Deploy ausstehend

---

## Design-Sprache

- **Deep Forest** Farbpalette (`#3d8e12`) — Primary-Akzent für Titel, Tags, Icons
- **Quicksand** Variable Font (von `gruenheit.de/fonts/` — bei Bedarf selbst hosten)
- **Dark / Light Toggle** mit `localStorage`-Persistenz und `prefers-color-scheme`-Fallback
- CSS Custom Properties (Token-System) für konsistente Farben und Abstände

---

## Features

### Linklist (Hauptansicht)

- **Karten-Design:** 3px grüner Akzentrand links, private Links amber, Domain-Zeile unter Titel
- **Multi-Select:** Klick auf Kartenbereich selektiert Karte (grüner Rahmen); mehrere Karten gleichzeitig
- **Footer-Band:** Kompakter Streifen mit Tags + Datum-Pille; Klick klappt auf und zeigt Bearbeitungs-Icons
- **Datum-Pille = Permalink:** Klick auf Datum öffnet `shaare/{shorturl}` direkt
- **Datumsformat:** „heute, HH:MM" / „gestern, HH:MM" / „11. Jun. 26" für ältere Einträge
- **Tag-Pills:** Grüner Rand, Hover-Inversion; kein redundantes Tag-Icon

### Weitere Seiten

- **Tag-Cloud:** JS-Farbgradient — häufige Tags heller, seltene dunkler
- **Tag-Liste:** Grüne Zähler-Badges
- **Tools:** Akzentlinie links, Menüzeilen mit `→`-Pfeil
- **Add/Edit-Formular:** Mikro-Caps Labels, vollbreite Inputs, Ghost-Red Delete, Markdown-Toolbar gestylt

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
│   ├── js/origr3n.js        — Dark/Light-Toggle
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
