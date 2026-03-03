# gusbmachado.github.io

Personal portfolio — **Gustavo Barcelos Machado**  
Mobile & Frontend Engineer · Flutter · React · TypeScript

Live → **[gusbmachado.github.io](https://gusbmachado.github.io)**

---

## Stack

| Layer | Tech |
|-------|------|
| Markup | HTML5 semantic |
| Style | CSS custom properties, no framework |
| Scripts | Vanilla JS · **native ES Modules** · no bundler |
| Data / i18n | Single `portfolio.json` (pt-BR · en · es) |
| Animations | Canvas API (particle network) · IntersectionObserver · RAF |
| Contact form | [Formspree](https://formspree.io) (serverless) |
| Hosting | GitHub Pages (static, zero-config) |

---

## Structure

```
├── index.html                   # Minimal skeleton; all data injected by JS
└── assets/
    ├── css/
    │   └── styles.css
    ├── data/
    │   └── portfolio.json       # Single source of truth: i18n + all section data
    ├── img/
    ├── js/
    │   ├── main.js              # ES module entry point
    │   └── modules/
    │       ├── i18n.js          # JSON fetch, data-i18n attribute system
    │       ├── theme.js         # Dark / light toggle
    │       ├── nav.js           # Active link (IntersectionObserver) + scroll-up
    │       ├── animations.js    # Hero canvas, fade-in, counters, progress bars, filters
    │       ├── render.js        # Renders timeline, projects, documents from JSON
    │       ├── modal.js         # PDF viewer modal
    │       └── contact.js       # Contact form → Formspree
    └── pdf/
```

---

## i18n

Translations are stored in `assets/data/portfolio.json` under `i18n.pt`, `i18n.en`, `i18n.es`.  
HTML elements carry `data-i18n="section.key"` (textContent) or `data-i18n-html` (innerHTML with tags).  
No external library — the `i18n.js` module fetches the JSON once and applies all attributes on language switch.

---

## Contact form setup

The form posts to [Formspree](https://formspree.io) (free tier: 50 submissions/month).

## Sections

| # | ID | Content |
|---|----|---------|
| 1 | `#home` | Hero — canvas particle network, stats, CTAs |
| 2 | `#about` | Summary, info boxes |
| 3 | `#experience` | Timeline (rendered from JSON) |
| 4 | `#work` | Filterable project grid + "currently building" strip |
| 5 | `#documents` | CV, certificates — PDF modal viewer |
| 6 | `#contact` | Contact form + compensation panel |
