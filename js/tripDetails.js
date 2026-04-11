// ── 1. LIGHTBOX ─────────────────────────────────────
(function () {
  let images = [];
  let current = 0;

  window.openLightbox = function (index) {
    const gallery = document.getElementById('gallery');
    images = JSON.parse(gallery.dataset.images);
    current = index;
    const lb = document.getElementById('lightbox');
    lb.classList.remove('hidden');
    lb.classList.add('flex');
    updateLightbox();
  };

  window.closeLightbox = function () {
    const lb = document.getElementById('lightbox');
    lb.classList.add('hidden');
    lb.classList.remove('flex');
  };

  window.closeLb = function (e) {
    if (e.target.id === 'lightbox') closeLightbox();
  };

  window.shiftLb = function (dir) {
    current = (current + dir + images.length) % images.length;
    updateLightbox();
  };

  function updateLightbox() {
    document.getElementById('lbImg').src = images[current];
    document.getElementById('lbCounter').innerText = `${current + 1} / ${images.length}`;
  }
})();

// ── 2. CAR CARD SLIDER ──────────────────────────────
(function () {
  document.querySelectorAll('.slider-container').forEach(container => {
    const images = container.querySelectorAll('.slider-image');
    if (!images.length) return;

    let current = 0;

    function showSlide(i) {
      images.forEach((img, idx) => {
        img.style.opacity = idx === i ? '1' : '0';
        img.style.zIndex = idx === i ? '1' : '0';
      });
    }

    showSlide(0);

    let interval = setInterval(() => {
      current = (current + 1) % images.length;
      showSlide(current);
    }, 3500);

    container.querySelector('.prev')?.addEventListener('click', () => {
      current = (current - 1 + images.length) % images.length;
      showSlide(current);
    });

    container.querySelector('.next')?.addEventListener('click', () => {
      current = (current + 1) % images.length;
      showSlide(current);
    });

    container.addEventListener('mouseenter', () => clearInterval(interval));
    container.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        current = (current + 1) % images.length;
        showSlide(current);
      }, 3500);
    });
  });
})();





(function (){

// Section nav active state
const sectionLinks = document.querySelectorAll('.section-nav-link');
const sections = document.querySelectorAll('#overview, #journey, #inclusions, #knowbeforeyougo, #faq');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      sectionLinks.forEach(link => {
        link.classList.remove('text-teal-600', 'border-teal-500');
        link.classList.add('text-gray-600', 'border-transparent');
      });
      const active = document.querySelector(`.section-nav-link[href="#${entry.target.id}"]`);
      if (active) {
        active.classList.add('text-teal-600', 'border-teal-500');
        active.classList.remove('text-gray-600', 'border-transparent');
      }
    }
  });
}, { rootMargin: '-80px 0px -60% 0px' });

sections.forEach(s => observer.observe(s));




})()





const mainNav = document.getElementById('mainNav');
const sectionNav = document.getElementById('sectionNav');
const stickyForm = document.getElementById('stickyForm');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;

  if (current > lastScroll && current > 100) {
    // Scroll down — main nav hide, section nav upar shift
    mainNav.style.transform = 'translateY(-100%)';
    sectionNav.style.transform = 'translateY(-72px)';  // main nav ki height
    stickyForm.style.top = '48px';  // sirf section nav ki height
  } else {
    // Scroll up — sab wapas
    mainNav.style.transform = 'translateY(0)';
    sectionNav.style.transform = 'translateY(0)';
    stickyForm.style.top = '136px';
  }

  lastScroll = current;
});


