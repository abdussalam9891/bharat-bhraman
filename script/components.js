async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  const res = await fetch(file);
  const data = await res.text();
  el.innerHTML = data;
}

/* ---------------- NAVBAR ---------------- */

function initNavbar() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("navOverlay");

  if (!toggle || !menu || !overlay) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    overlay.classList.toggle("active");
    toggle.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    menu.classList.remove("open");
    overlay.classList.remove("active");
    toggle.classList.remove("active");
  });
}

/* ---------------- MEGA MENU ---------------- */

function initMegaMenu() {
  const trigger = document.querySelector(".mega-trigger");
  const menu = document.getElementById("megaMenu");
  const panel = document.querySelector('.mega-panel');

  if (!menu || !trigger || !panel) return;

  let timeout;

  trigger.addEventListener("click", (e) => e.preventDefault());

  trigger.addEventListener("mouseenter", () => {
    clearTimeout(timeout);

    panel.classList.remove("hidden"); // 🔥 show panel
    menu.classList.add("active");
  });

  menu.addEventListener("mouseenter", () => {
    clearTimeout(timeout);
  });

  menu.addEventListener("mouseleave", () => {
    timeout = setTimeout(() => {
      menu.classList.remove("active");
      panel.classList.add("hidden"); // 🔥 hide again
    }, 150);
  });
}




/* ---------------- ACTIVE LINK ---------------- */

function setActiveNav() {
  const path = window.location.pathname.split("/").pop();

  document.querySelectorAll(".nav-link, .mobile-link").forEach(link => {
    const href = link.getAttribute("href");

    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

/* ---------------- NAVBAR SCROLL ---------------- */
function initNavbarHideOnScroll() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // at top → always show
    if (currentScroll <= 0) {
      nav.style.transform = "translateY(0)";
      return;
    }

    // scrolling down → hide
    if (currentScroll > lastScroll) {
      nav.style.transform = "translateY(-100%)";
    }
    // scrolling up → show
    else {
      nav.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });
}
/* ---------------- FOOTER ---------------- */
function initFooterAccordion() {
  document.querySelectorAll('.footer-acc-trigger').forEach(trigger => {

    trigger.addEventListener('click', () => {
      const acc = trigger.closest('.footer-acc');
      const body = acc.querySelector('.footer-acc-body');
      const isOpen = acc.classList.contains("open");

      // close all
      document.querySelectorAll('.footer-acc').forEach(el => {
        el.classList.remove("open");
        el.querySelector('.footer-acc-body').style.maxHeight = null;
      });

      // open current
      if (!isOpen) {
        acc.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });

  });
}

/* ---------------- INIT ---------------- */

async function initLayout() {
  await loadComponent("navbar", "./components/navbar.html");
  await loadComponent("footer", "./components/footer.html");

  //  INIT AFTER LOAD
  initNavbar();
  initMegaMenu();
  setActiveNav();

  initNavbarHideOnScroll();
  initFooterAccordion();
}

initLayout();
