// components/navbar.js

(function () {
  let isOpen = false;
  let lastScroll = 0;
  let hideTimeout;

  const overlay = document.getElementById('navOverlay');
  const drawer = document.getElementById('mobileMenu');
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const closeBtn = document.getElementById('drawerClose');
  const megaMenu = document.getElementById('megaMenu');
  const triggers = document.querySelectorAll('.mega-trigger');

  if (!navToggle || !mainNav) return;

  // ─────────────────────────
  // MOBILE DRAWER
  // ─────────────────────────
  function openNav() {
    isOpen = true;

    overlay?.classList.add('opacity-100', 'pointer-events-auto');

    drawer?.classList.remove('translate-x-full');
    drawer?.classList.add('translate-x-0');

    mainNav.style.transform = 'translateY(-100%)';

    navToggle.dataset.state = 'open';
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    isOpen = false;

    overlay?.classList.remove('opacity-100', 'pointer-events-auto');

    drawer?.classList.remove('translate-x-0');
    drawer?.classList.add('translate-x-full');

    mainNav.style.transform = 'translateY(0)';

    navToggle.dataset.state = 'closed';
    document.body.style.overflow = '';

    // sync scroll
    lastScroll = window.scrollY;
  }

  function toggleNav() {
    isOpen ? closeNav() : openNav();
  }

  navToggle.addEventListener('click', toggleNav);
  closeBtn?.addEventListener('click', closeNav);
  overlay?.addEventListener('click', closeNav);

  // ─────────────────────────
  // MEGA MENU (FIXED HOVER)
  // ─────────────────────────
  function showMega() {
    if (!megaMenu) return;
    clearTimeout(hideTimeout);

    megaMenu.classList.remove('opacity-0', 'pointer-events-none');
    megaMenu.classList.add('opacity-100', 'pointer-events-auto');
  }

  function hideMega() {
    if (!megaMenu) return;

    hideTimeout = setTimeout(() => {
      megaMenu.classList.remove('opacity-100', 'pointer-events-auto');
      megaMenu.classList.add('opacity-0', 'pointer-events-none');
    }, 120);
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
      if (window.innerWidth < 900) return;
      showMega();
    });
  });

  megaMenu?.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
  });

  megaMenu?.addEventListener('mouseleave', hideMega);

  // ─────────────────────────
  // SCROLL NAVBAR HIDE/SHOW
  // ─────────────────────────
  window.addEventListener('scroll', () => {
  if (isOpen) return;

  const current = window.scrollY;

  if (Math.abs(current - lastScroll) < 5) return;

  if (current > lastScroll && current > 100) {
    mainNav.style.transform = 'translateY(-100%)';
  } else {
    mainNav.style.transform = 'translateY(0)';
  }

  lastScroll = current;
});

})();
