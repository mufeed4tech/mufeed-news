// Mufeed News — shared interactivity (mobile nav, dropdowns, ticker, mini panels)

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initDropdowns();
  initMiniPanels();
  initTicker();
});

/* ---------- Mobile hamburger toggle ---------- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

/* ---------- Section dropdown menus (News, Business, Technology, ...) ---------- */
function initDropdowns() {
  const items = document.querySelectorAll('.nav-item');

  items.forEach((item) => {
    const trigger = item.querySelector('.nav-link');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const willOpen = !item.classList.contains('is-open');
      closeAllDropdowns();
      if (willOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) closeAllDropdowns();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllDropdowns();
  });
}

function closeAllDropdowns() {
  document.querySelectorAll('.nav-item.is-open').forEach((item) => {
    item.classList.remove('is-open');
    const trigger = item.querySelector('.nav-link');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
}

/* ---------- Search / notification / account mini panels ---------- */
function initMiniPanels() {
  const triggers = [
    { btn: '#search-toggle', panel: '#search-panel' },
    { btn: '#bell-toggle', panel: '#notif-panel' },
    { btn: '#account-toggle', panel: '#account-panel' },
  ];

  triggers.forEach(({ btn, panel }) => {
    const btnEl = document.querySelector(btn);
    const panelEl = document.querySelector(panel);
    if (!btnEl || !panelEl) return;

    btnEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !panelEl.classList.contains('is-open');
      closeAllMiniPanels();
      if (willOpen) panelEl.classList.add('is-open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-actions')) closeAllMiniPanels();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllMiniPanels();
  });

  const searchForm = document.querySelector('#search-panel form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeAllMiniPanels();
    });
  }
}

function closeAllMiniPanels() {
  document.querySelectorAll('.mini-panel.is-open').forEach((p) => p.classList.remove('is-open'));
}

/* ---------- Breaking news ticker: duplicate content for seamless loop ---------- */
function initTicker() {
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  track.innerHTML += track.innerHTML;
}
