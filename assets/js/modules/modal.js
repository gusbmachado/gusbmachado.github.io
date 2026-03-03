/** modal.js – PDF viewer modal */

export function initModal() {
  const modal   = document.getElementById('pdfModal');
  const frame   = document.getElementById('pdfFrame');
  const closeBtn = document.getElementById('pdfClose');
  const dlBtn   = document.getElementById('pdfDownload');
  const titleEl = document.getElementById('pdfModalTitle');
  if (!modal || !frame) return;

  function open(src, title = 'PDF') {
    frame.src = src;
    if (dlBtn)   dlBtn.href = src;
    if (titleEl) titleEl.textContent = title;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    requestAnimationFrame(() => closeBtn?.focus());
  }

  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => { frame.src = ''; }, 300);
    document.body.classList.remove('no-scroll');
  }

  // Delegate clicks – works for dynamically injected elements too
  document.addEventListener('click', e => {
    const trigger = e.target.closest('.js-open-pdf');
    if (!trigger) return;
    e.preventDefault();
    const src   = trigger.dataset.pdf || trigger.getAttribute('href');
    const title = trigger.dataset.title || 'PDF';
    if (src) open(src, title);
  });

  closeBtn?.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
}
