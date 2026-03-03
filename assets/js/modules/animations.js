/**
 * animations.js
 * - Canvas particle-network hero background
 * - Fluid fade-in via IntersectionObserver
 * - Staggered timeline entrance
 * - Animated counters (ease-out cubic)
 * - Smooth progress bars
 */

/* ══════════════════════════════════════════
   1. CANVAS PARTICLE NETWORK (hero bg)
══════════════════════════════════════════ */
export function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Brand colours (match CSS vars)
  const C1 = { r: 205, g: 127, b: 50  }; // --brand-primary
  const C2 = { r: 78,  g: 205, b: 196 }; // --brand-accent

  const PARTICLE_COUNT = window.innerWidth < 600 ? 40 : 70;
  const MAX_DIST       = 130;
  const SPEED          = 0.35;

  let W, H, particles;
  let raf;

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : -10;
      this.vx = (Math.random() - 0.5) * SPEED;
      this.vy = (Math.random() - 0.5) * SPEED;
      this.r  = Math.random() * 1.8 + 0.8;
      const t = Math.random();
      this.color = { r: lerp(C1.r, C2.r, t), g: lerp(C1.g, C2.g, t), b: lerp(C1.b, C2.b, t) };
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -10) this.x = W + 10;
      if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10;
      if (this.y > H + 10) this.y = -10;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},0.7)`;
      ctx.fill();
    }
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const alpha = (1 - d / MAX_DIST) * 0.18;
          const c1 = particles[i].color, c2 = particles[j].color;
          const rr = (c1.r + c2.r) / 2, gg = (c1.g + c2.g) / 2, bb = (c1.b + c2.b) / 2;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${rr},${gg},${bb},${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    raf = requestAnimationFrame(loop);
  }

  // Pause when tab is hidden (battery / perf)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(loop);
  });

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); }, 150);
  });

  init();
  loop();
}


/* ══════════════════════════════════════════
   2. FADE-IN (fluid, GPU-accelerated)
══════════════════════════════════════════ */
export function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // Use requestAnimationFrame to avoid layout thrashing
        requestAnimationFrame(() => e.target.classList.add('visible'));
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => obs.observe(el));
}


/* ══════════════════════════════════════════
   3. TIMELINE – staggered slide-in
══════════════════════════════════════════ */
export function initTimeline() {
  const items = document.querySelectorAll('.timeline__item');
  if (!items.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger based on visual order
        const i = [...items].indexOf(entry.target);
        setTimeout(
          () => entry.target.classList.add('visible'),
          i * 100
        );
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => obs.observe(el));
}


/* ══════════════════════════════════════════
   4. COUNTERS – ease-out cubic
══════════════════════════════════════════ */
export function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const decimals = String(target).includes('.') ? 1 : 0;
    const dur      = 1600; // ms
    const startTs  = performance.now();

    function tick(now) {
      const elapsed  = now - startTs;
      const progress = Math.min(elapsed / dur, 1);
      const value    = target * easeOutCubic(progress);
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
}


/* ══════════════════════════════════════════
   5. PROGRESS BARS
══════════════════════════════════════════ */
export function initProgressBars() {
  const bars = document.querySelectorAll('.tech-item__progress[data-width]');
  if (!bars.length) return;

  // Set initial width to 0 so transition plays
  bars.forEach(bar => { bar.style.width = '0%'; });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bar = e.target;
        requestAnimationFrame(() => {
          // Small delay so CSS transition picks up the change
          setTimeout(() => { bar.style.width = bar.dataset.width; }, 80);
        });
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => obs.observe(bar));
}


/* ══════════════════════════════════════════
   6. WORK FILTERS – fade + scale
══════════════════════════════════════════ */
export function initWorkFilters() {
  const filters = document.querySelectorAll('.work__item');
  const cards   = document.querySelectorAll('.work__card');
  if (!filters.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active-work'));
      btn.classList.add('active-work');

      const val = btn.dataset.filter;

      cards.forEach(card => {
        const matches = val === 'all' || card.classList.contains(val);

        if (matches) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.opacity  = '0';
            card.style.transform = 'scale(0.96) translateY(8px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 350ms cubic-bezier(0.22,1,0.36,1), transform 350ms cubic-bezier(0.22,1,0.36,1)';
              card.style.opacity   = '1';
              card.style.transform = '';
            });
          });
        } else {
          card.style.transition = 'opacity 200ms ease, transform 200ms ease';
          card.style.opacity    = '0';
          card.style.transform  = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 210);
        }
      });
    });
  });
}
