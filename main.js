document.querySelectorAll('.year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

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
