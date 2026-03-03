/**
 * contact.js – Contact form submission via Formspree
 */

import { getData, getLang } from './i18n.js';

const FORMSPREE_ID = 'mbdavveb'; // ← replace this

export function initContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const btn  = form.querySelector('[type="submit"]');
    const feed = document.getElementById('contactFeedback');

    btn.disabled = true;
    btn.classList.add('loading');

    const payload = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('server');

      form.reset();
      setFeedback(feed, t('contact.form_success'), 'ok');
    } catch {
      setFeedback(feed, t('contact.form_error'), 'err');
    } finally {
      btn.disabled = false;
      btn.classList.remove('loading');
    }
  });
}

/* ── helpers ───────────────────────────────── */

function t(key) {
  try {
    const [ns, k] = key.split('.');
    const rawLang = getLang();
    const lang =
      rawLang === 'pt-BR'
        ? 'pt'
        : (rawLang && typeof rawLang === 'string' && rawLang.includes('-')
            ? rawLang.split('-')[0]
            : rawLang || 'pt');
    return getData()?.i18n?.[lang]?.[ns]?.[k] ?? _fallback[key] ?? key;
  } catch {
    return _fallback[key] ?? key;
  }
}

const _fallback = {
  'contact.form_success': 'Mensagem enviada! Entrarei em contato em breve. 👋',
  'contact.form_error':   'Não foi possível enviar. Tente o e-mail diretamente.',
};

function setFeedback(el, msg, type) {
  el.textContent = msg;
  el.className   = `contact__form-feedback contact__form-feedback--${type}`;
  setTimeout(() => {
    el.textContent = '';
    el.className   = 'contact__form-feedback';
  }, 7000);
}
