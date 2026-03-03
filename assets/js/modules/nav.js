/** nav.js – active link on scroll, scroll-up button, smooth scroll, mobile nav */

export function initNav() {
  _activeLink();
  _scrollUp();
  _smoothScroll();
}

/* ── Active link highlighting via IntersectionObserver ────────────────── */
function _activeLink() {
  const sections = [...document.querySelectorAll('section[id]')];
  const links    = [...document.querySelectorAll('.nav__link, .mnav__link')];

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active-link'));
        const id = entry.target.id;
        document.querySelectorAll(`[href="#${id}"]`).forEach(l =>
          l.classList.add('active-link')
        );
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => obs.observe(s));
  // Set initial active on home
  document.querySelectorAll('[href="#home"]').forEach(l =>
    l.classList.add('active-link')
  );
}

/* ── Scroll-up button ──────────────────────────────────────────────────── */
function _scrollUp() {
  const btn = document.getElementById('scroll-up');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show-scroll', window.scrollY >= 400);
  }, { passive: true });

  btn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

/* ── Smooth scroll for anchor links ───────────────────────────────────── */
function _smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const sel = a.getAttribute('href');
      if (!sel || sel === '#') return;
      const target = document.querySelector(sel);
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height') || '64', 10
      );
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
}
