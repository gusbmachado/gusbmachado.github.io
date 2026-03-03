/** theme.js – dark / light toggle with system-preference detection */

export function initTheme() {
  const btn  = document.getElementById('themeToggle');
  if (!btn) return;

  const icon = btn.querySelector('i');
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const startLight  = saved === 'light' || (!saved && !prefersDark);

  function apply(light) {
    document.body.classList.toggle('light-mode', light);
    if (icon) {
      icon.className = light ? 'bx bx-sun' : 'bx bx-moon';
    }
    btn.setAttribute('aria-pressed', String(!light));
  }

  apply(startLight);

  btn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    apply(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}
