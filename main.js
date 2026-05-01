// ── LANGUAGE ENGINE ──

function getLang() {
  return localStorage.getItem('lang') || 'en';
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  applyLang(lang);
  updateLangUI(lang);
  // Update html lang attribute
  document.documentElement.lang = lang;
}

function applyLang(lang) {
  const t = translations[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });
  // Update page title if defined
  const titleKey = document.body.getAttribute('data-title-key');
  if (titleKey && t[titleKey]) {
    document.title = t[titleKey] + ' — Paula Budge';
  }
}

function updateLangUI(lang) {
  document.querySelectorAll('.lang-opt').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang') === lang);
    el.setAttribute('aria-current', el.getAttribute('data-lang') === lang ? 'true' : 'false');
  });
}

// ── NAV TOGGLE ──

function toggleMenu(btn) {
  const menu = document.getElementById('mobile-menu');
  const isOpen = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
  btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.querySelector('.nav-toggle');
  if (!menu) return;
  menu.classList.remove('open');
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
  }
}

// ── INIT ──

document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Apply saved language
  const lang = getLang();
  applyLang(lang);
  updateLangUI(lang);
  document.documentElement.lang = lang;

  // Lang switcher clicks
  document.querySelectorAll('.lang-opt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setLang(btn.getAttribute('data-lang'));
      closeMobileMenu();
    });
  });
});
