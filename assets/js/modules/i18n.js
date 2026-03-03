/**
 * i18n.js – JSON-driven translation system
 * Reads data-i18n="section.key" attributes and replaces textContent.
 * data-i18n-html attributes replace innerHTML (supports rich text).
 */

const SUPPORTED = ['pt-BR', 'en', 'es'];
let _data = null;
let _currentLang = 'pt-BR';
const _listeners = new Set();

/** Resolve a dot-path like "hero.description" inside an object */
function resolve(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj) ?? '';
}

/** Apply translations to all [data-i18n] / [data-i18n-html] elements */
function applyTranslations(lang) {
  if (!_data) return;
  const key = lang === 'en' ? 'en' : lang === 'es' ? 'es' : 'pt';
  const t = _data.i18n[key];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const text = resolve(t, el.dataset.i18n);
    if (text) el.textContent = text;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const html = resolve(t, el.dataset.i18nHtml);
    if (html) el.innerHTML = html;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const text = resolve(t, el.dataset.i18nPlaceholder);
    if (text) el.setAttribute('placeholder', text);
  });
}

/** Change language: persists, updates html[lang], notifies listeners */
export function setLanguage(lang) {
  if (!SUPPORTED.includes(lang)) lang = 'pt-BR';
  _currentLang = lang;

  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem('language', lang);

  // Update language selector buttons
  document.querySelectorAll('.lang-option').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  applyTranslations(lang);
  _listeners.forEach(fn => fn(lang));
}

export function getLang() { return _currentLang; }
export function getData()  { return _data; }

/** Subscribe to language-change events */
export function onLangChange(fn) { _listeners.add(fn); }

/** Initialise: fetch JSON, pick initial language, wire buttons */
export async function initI18n(dataUrl = './assets/data/portfolio.json') {
  const res = await fetch(dataUrl);
  _data = await res.json();

  const browserLang = (navigator.language || '').toLowerCase();
  const fallback    = browserLang.startsWith('es') ? 'es'
                    : browserLang.startsWith('en') ? 'en'
                    : 'pt-BR';
  const saved   = localStorage.getItem('language');
  const initial = SUPPORTED.includes(saved) ? saved : fallback;

  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') setLanguage(btn.dataset.lang);
    });
  });

  setLanguage(initial);
  return _data;
}
