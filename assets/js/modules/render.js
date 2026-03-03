/**
 * render.js – Dynamic section rendering from portfolio.json data
 * Reads from the parsed data object (not from DOM / portfolioData global)
 */

import { getLang, onLangChange } from './i18n.js';
import { initFadeIn } from './animations.js';

/* Helper: get localised field (supports string shorthand) */
function t(field, lang) {
  if (!field) return '';
  const k = lang === 'en' ? 'en' : lang === 'es' ? 'es' : 'pt';
  return typeof field === 'object' ? (field[k] || field.pt || '') : field;
}

function reObserveFadeIn(container) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        requestAnimationFrame(() => e.target.classList.add('visible'));
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
  container.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════════
   TIMELINE
══════════════════════════════════════════ */
function renderTimeline(data, lang) {
  const container = document.querySelector('.timeline');
  if (!container || !data?.timeline?.length) return;

  container.innerHTML = data.timeline.map((item, i) => `
    <div class="timeline__item" style="--delay:${i * 100}ms">
      <span class="timeline__dot"></span>
      <div class="timeline__card fade-in">
        <p class="timeline__period">${t(item.period, lang)}</p>
        <h3 class="timeline__role">${t(item.role, lang)}</h3>
        <p class="timeline__company">${item.company}</p>
        ${t(item.description, lang) ? `<p class="timeline__description">${t(item.description, lang)}</p>` : ''}
        <div class="timeline__tags">
          ${item.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  reObserveFadeIn(container);

  // Staggered slide-in
  requestAnimationFrame(() => {
    container.querySelectorAll('.timeline__item').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 100 + 50);
    });
  });
}

/* ══════════════════════════════════════════
   PROJECTS GRID
══════════════════════════════════════════ */
function renderProjects(data, lang) {
  const container = document.querySelector('.work__container');
  if (!container || !data?.projects?.length) return;
  const i18n = data.i18n[lang === 'en' ? 'en' : lang === 'es' ? 'es' : 'pt'];

  container.innerHTML = data.projects.map(p => `
    <article class="work__card ${p.category.join(' ')} fade-in">
      <img src="${p.img}" alt="${t(p.title, lang)}" class="work__img" loading="lazy">
      <div class="work__content">
        <h3 class="work__title">${t(p.title, lang)}</h3>
        <p class="work__tech">${p.tech}</p>
        <p class="work__description">${t(p.description, lang)}</p>
        <a href="${p.link}" ${p.link !== '#' ? 'target="_blank" rel="noopener"' : ''}
           class="work__button">
          ${p.link !== '#' ? i18n.work.view_demo : i18n.work.view_details}
          <i class="bx bx-right-arrow-alt"></i>
        </a>
      </div>
    </article>
  `).join('');

  reObserveFadeIn(container);
}

/* ══════════════════════════════════════════
   CURRENTLY BUILDING
══════════════════════════════════════════ */
function renderBuildingNow(data, lang) {
  const container = document.getElementById('building-list');
  if (!container || !data?.buildingNow?.length) return;

  container.innerHTML = data.buildingNow.map((item, i) => `
    <div class="building__card fade-in" style="transition-delay:${i * 80}ms">
      <div class="building__pulse"></div>
      <div>
        <p class="building__card-title">${t(item.title, lang)}</p>
        <span class="building__card-subtitle">${t(item.subtitle, lang)}</span>
      </div>
    </div>
  `).join('');

  reObserveFadeIn(container);
}

/* ══════════════════════════════════════════
   DOCUMENTS & CERTIFICATIONS
══════════════════════════════════════════ */
function renderDocuments(data, lang) {
  const container = document.querySelector('.documents__grid');
  if (!container || !data?.documents) return;
  const d     = data.documents;
  const certs = data.certifications || [];
  const lk    = lang === 'en' ? 'en' : lang === 'es' ? 'es' : 'pt';
  const i18n  = data.i18n[lk].documents;
  const gen   = data.i18n[lk].general;

  function badge(file, isDownload = true) {
    if (isDownload) {
      return `<a href="${file.href}" download class="doc-lang-badge">
        <i class="bx bxs-download"></i> ${file.lang_label}</a>`;
    }
    return `<a href="${file.href}" class="doc-lang-badge js-open-pdf"
        data-pdf="${file.href}" data-title="${i18n.view}">
      <i class="bx bx-show"></i> ${gen.download === 'Baixar' ? 'Ver' : (gen.download === 'Download' ? 'View' : 'Ver')}</a>`;
  }

  const docCards = [
    {
      icon: 'bxs-file-doc',
      titleKey: 'cv_title',
      descKey: 'cv_desc',
      files: d.cv.files,
      hasView: false
    },
    {
      icon: 'bxs-envelope',
      titleKey: 'cover_title',
      descKey: 'cover_desc',
      files: d.cover.files,
      viewHref: d.cover.view_href,
      hasView: true
    },
    {
      icon: 'bxs-graduation',
      titleKey: 'transcripts_title',
      descKey: 'transcripts_desc',
      files: d.transcripts.files,
      hasView: false
    },
    {
      icon: 'bxs-award',
      titleKey: 'diploma_title',
      descKey: 'diploma_desc',
      files: d.diploma.files,
      viewHref: d.diploma.view_href,
      hasView: true
    }
  ].map(card => `
    <div class="doc-card fade-in">
      <div class="doc-card__header">
        <div class="doc-card__icon"><i class="bx ${card.icon}"></i></div>
        <h3 class="doc-card__title">${i18n[card.titleKey]}</h3>
      </div>
      <p class="doc-card__description">${i18n[card.descKey]}</p>
      <div class="doc-card__languages">
        ${card.hasView && card.viewHref ? `
          <a href="${card.viewHref}" class="doc-lang-badge js-open-pdf"
             data-pdf="${card.viewHref}" data-title="${i18n[card.titleKey]}">
            <i class="bx bx-show"></i> ${i18n.view}
          </a>` : ''}
        ${card.files.map(f => badge(f)).join('')}
      </div>
    </div>
  `).join('');

  const certCards = certs.map(cert => `
    <div class="doc-card fade-in">
      <div class="doc-card__header">
        <div class="doc-card__icon"><i class="bx bxs-certification"></i></div>
        <h3 class="doc-card__title">${cert.title}
          <small style="display:block;font-weight:500;font-size:0.78rem;color:var(--text-tertiary);margin-top:2px">
            ${cert.issuer}
          </small>
        </h3>
      </div>
      <div class="doc-card__languages">
        <a class="doc-lang-badge" href="${cert.credential_url}" target="_blank" rel="noopener">
          <i class="bx bx-link-external"></i> ${i18n.credential}
        </a>
      </div>
    </div>
  `).join('');

  container.innerHTML = docCards + certCards;
  reObserveFadeIn(container);
}

/* ══════════════════════════════════════════
   PUBLIC INIT
══════════════════════════════════════════ */
export function initRender(data) {
  const lang = getLang();

  renderTimeline(data, lang);
  renderProjects(data, lang);
  renderBuildingNow(data, lang);
  renderDocuments(data, lang);

  // Re-render translatable dynamic sections on language change
  onLangChange(newLang => {
    renderTimeline(data, newLang);
    renderProjects(data, newLang);
    renderBuildingNow(data, newLang);
    renderDocuments(data, newLang);
  });
}
