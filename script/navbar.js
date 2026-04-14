// script/navbar.js

document.addEventListener('DOMContentLoaded', initNavbar);

function initNavbar() {
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
    lastScroll = window.scrollY;
  }

  navToggle.addEventListener('click', () => isOpen ? closeNav() : openNav());
  closeBtn?.addEventListener('click', closeNav);
  overlay?.addEventListener('click', closeNav);

  // Mega menu
  function showMega() {
    if (!megaMenu) return;
    clearTimeout(hideTimeout);
    megaMenu.style.opacity = '1';
    megaMenu.style.pointerEvents = 'auto';
  }

  function hideMega() {
    if (!megaMenu) return;
    hideTimeout = setTimeout(() => {
      megaMenu.style.opacity = '0';
      megaMenu.style.pointerEvents = 'none';
    }, 120);
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
      if (window.innerWidth < 900) return;
      showMega();
    });
    trigger.addEventListener('mouseleave', () => {
      if (window.innerWidth < 900) return;
      hideMega();
    });
  });

  megaMenu?.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
  megaMenu?.addEventListener('mouseleave', hideMega);

  // Scroll hide/show
  window.addEventListener('scroll', () => {
    if (isOpen) return;
    const current = window.scrollY;
    if (Math.abs(current - lastScroll) < 5) return;
    mainNav.style.transform = current > lastScroll && current > 100
      ? 'translateY(-100%)'
      : 'translateY(0)';
    lastScroll = current;
  });
}
