/**
 * main.js – Portfolio entry point (ES Module)
 * Orchestrates all feature modules after i18n data is loaded.
 */

import { initI18n }      from './modules/i18n.js';
import { initTheme }     from './modules/theme.js';
import { initNav }       from './modules/nav.js';
import { initRender }    from './modules/render.js';
import { initModal }     from './modules/modal.js';
import { initContact }   from './modules/contact.js';
import {
  initHeroCanvas,
  initFadeIn,
  initTimeline,
  initCounters,
  initProgressBars,
  initWorkFilters
} from './modules/animations.js';

async function boot() {
  // 1. Theme first (prevents flash of wrong colour scheme)
  initTheme();

  // 2. Load JSON + initialise i18n (applies data-i18n translations)
  const data = await initI18n('./assets/data/portfolio.json');

  // 3. Render dynamic sections from JSON data
  initRender(data);

  // 4. UI / interaction modules
  initNav();
  initModal();
  initContact();

  // 5. Animations (after render so elements exist in DOM)
  initHeroCanvas();
  initFadeIn();
  initTimeline();
  initCounters();
  initProgressBars();
  initWorkFilters();
}

// Run after DOM is parsed (module scripts are deferred by default)
boot().catch(err => console.error('[portfolio] boot error:', err));
