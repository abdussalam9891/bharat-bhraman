 document.addEventListener("DOMContentLoaded", () => {




// homepage tour
 (function initTourCarousel() {
  const track   = document.getElementById('tourTrack');
  const prevBtn = document.getElementById('tourPrev');
  const nextBtn = document.getElementById('tourNext');

  if (!track) return;

  const wrapper = track.parentElement;
  let position = 0;
  let isDragging = false;
  let startX = 0;
  let startPosition = 0;

  // ---------- helpers ----------
  function cardWidth() {
    const card = track.querySelector('article');
    return card ? card.offsetWidth + 28 : 328;
  }

  function maxScroll() {
    return track.scrollWidth - wrapper.offsetWidth;
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(val, max));
  }

  function update(withAnim = true) {
    track.style.transition = withAnim ? 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)' : 'none';
    track.style.transform  = `translateX(-${position}px)`;

    if (prevBtn) {
      prevBtn.style.opacity = position <= 0 ? '0.3' : '1';
      prevBtn.style.pointerEvents = position <= 0 ? 'none' : 'auto';
    }

    if (nextBtn) {
      nextBtn.style.opacity = position >= maxScroll() ? '0.3' : '1';
      nextBtn.style.pointerEvents = position >= maxScroll() ? 'none' : 'auto';
    }
  }

  // ---------- buttons ----------
  nextBtn?.addEventListener('click', () => {
    position = clamp(position + cardWidth(), 0, maxScroll());
    update(true);
  });

  prevBtn?.addEventListener('click', () => {
    position = clamp(position - cardWidth(), 0, maxScroll());
    update(true);
  });

  // ---------- touch swipe (mobile) ----------
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startPosition = position;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    const dx = e.touches[0].clientX - startX;
    position = clamp(startPosition - dx, 0, maxScroll());
    update(false);
  }, { passive: true });

  track.addEventListener('touchend', () => {
    update(true);
  });

  // ---------- mouse drag (desktop premium feel) ----------
  wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    startPosition = position;
    wrapper.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    wrapper.style.cursor = 'grab';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const dx = e.pageX - startX;
    position = clamp(startPosition - dx, 0, maxScroll());
    update(false);
  });

  wrapper.style.cursor = 'grab';

  // ---------- trackpad horizontal scroll ----------
  wrapper.addEventListener('wheel', (e) => {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);

    if (isHorizontal) {
      e.preventDefault();

      position = clamp(position + e.deltaX, 0, maxScroll());
      update(false);
    }
  }, { passive: false });

  // ---------- resize ----------
  window.addEventListener('resize', () => {
    position = clamp(position, 0, maxScroll());
    update(false);
  });

  // ---------- init ----------
  update(false);

})();



// testimonials--------------------------------
 (function initReviewsCarousel() {
  const container = document.querySelector('.reviews-carousel-new');
  const track     = document.querySelector('.reviews-track-new');
  const dotsWrap  = document.querySelector('.reviews-dots');
  const origCards = [...track.querySelectorAll('.review-card-new')];
  const total     = origCards.length; // 7

  let current = 0;
  let vPos    = 0;    // visual/translate index — can enter clone zone (≥ total)
  let jumping = false;
  let timer;

  // ── Clone all cards and append for seamless forward loop ──
  origCards.forEach(card => track.appendChild(card.cloneNode(true)));
  const allCards = [...track.querySelectorAll('.review-card-new')]; // 14 total

  // ── Dots (one per original card only) ──
  origCards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'rc-dot';
    dot.addEventListener('click', () => moveTo(i));
    dotsWrap.appendChild(dot);
  });

  // ── Geometry helpers ──
  function gap()     { return 24; } // gap-6 = 24px
  function cardW()   { return allCards[0].offsetWidth + gap(); }
  function centerX() { return container.offsetWidth / 2 - allCards[0].offsetWidth / 2; }
  function offset(v) { return centerX() - v * cardW(); }

  // ── Apply active / adjacent classes to all 14 cards ──
  function applyClasses() {
    allCards.forEach((card, i) => {
      card.classList.remove('rc-active', 'rc-adjacent');
      const logical = i % total;
      const d = Math.min(
        Math.abs(logical - current),
        total - Math.abs(logical - current)
      );
      if (d === 0) card.classList.add('rc-active');
      else if (d === 1) card.classList.add('rc-adjacent');
    });
  }

  function applyDots() {
    [...dotsWrap.children].forEach((d, i) =>
      d.classList.toggle('rc-dot-active', i === current)
    );
  }

  // ── Core move function ──
  // logical  = 0-6 (destination card)
  // useClone = true only when wrapping last→first (shows clone zone)
  function moveTo(logical, useClone = false) {
    if (jumping) return;
    if (logical === current && !useClone) return;

    jumping = true;
    current = logical;
    vPos    = useClone ? total + logical : logical;

    track.style.transition = 'transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    track.style.transform  = `translateX(${offset(vPos)}px)`;

    applyClasses();
    applyDots();

    // After animation: if in clone zone, silently snap back to original position
    setTimeout(() => {
      if (vPos >= total) {
        vPos = logical;
        track.style.transition = 'none';
        track.style.transform  = `translateX(${offset(vPos)}px)`;
      }
      jumping = false;
    }, 700); // slightly > transition duration
  }

  // ── Auto-advance ──
  function advance() {
    const next = (current + 1) % total;
    // When wrapping from last card → first, animate through clone zone
    moveTo(next, current === total - 1);
  }

  // ── Per-card events ──
  // Click → focus that card | Hover → pause ONLY on that card
  allCards.forEach((card, i) => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
      const logical = i % total;
      if (logical === current) return; // already centered, ignore
      moveTo(logical);
    });

    card.addEventListener('mouseenter', () => clearInterval(timer));
    card.addEventListener('mouseleave', startAuto);
  });

  // ── Auto-scroll ──
  function startAuto() {
    clearInterval(timer);
    timer = setInterval(advance, 3200);
  }

  // ── Recalculate on resize ──
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    track.style.transform  = `translateX(${offset(vPos)}px)`;
  });



  // ── Touch / Trackpad swipe ──
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping   = false;

  container.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwiping   = false;
  }, { passive: true });

  container.addEventListener('touchmove', e => {
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    // Only hijack if clearly horizontal swipe
    if (!isSwiping && Math.abs(dx) > Math.abs(dy) + 5) {
      isSwiping = true;
    }
    if (isSwiping) e.preventDefault();
  }, { passive: false });

  container.addEventListener('touchend', e => {
    if (!isSwiping) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return; // ignore micro-swipes
    if (dx < 0) {
      // swipe left → next
      const next = (current + 1) % total;
      moveTo(next, current === total - 1);
    } else {
      // swipe right → prev
      const prev = (current - 1 + total) % total;
      moveTo(prev);
    }
  });

  // Trackpad wheel (horizontal)
  let wheelCooldown = false;
  container.addEventListener('wheel', e => {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (!isHorizontal) return;
    e.preventDefault();
    if (wheelCooldown) return;
    wheelCooldown = true;
    setTimeout(() => wheelCooldown = false, 750);

    if (e.deltaX > 0) {
      const next = (current + 1) % total;
      moveTo(next, current === total - 1);
    } else {
      const prev = (current - 1 + total) % total;
      moveTo(prev);
    }
  }, { passive: false });

  // ── Init ──
  track.style.transition = 'none';
  track.style.transform  = `translateX(${offset(0)}px)`;
  applyClasses();
  applyDots();
  startAuto();
})();









  // SCROLL TOP BUTTON
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        scrollTopBtn.classList.remove("hidden");
        scrollTopBtn.classList.add("flex");
      } else {
        scrollTopBtn.classList.add("hidden");
        scrollTopBtn.classList.remove("flex");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
// scroll top button




  // MEGA MENU
  const triggers = document.querySelectorAll(".mega-trigger");
  const megaMenu = document.getElementById("megaMenu");
  let menuTimeout;

  if (triggers.length && megaMenu) {
    triggers.forEach((trigger) => {
      trigger.addEventListener("mouseenter", () => {
        if (window.innerWidth < 900) return;

        clearTimeout(menuTimeout);
        megaMenu.classList.add("active");

        const panel = trigger.dataset.mega;

        document.querySelectorAll(".mega-panel").forEach((p) => {
          p.classList.toggle("hidden", p.dataset.panel !== panel);
          p.classList.toggle("flex", p.dataset.panel === panel);
        });
      });
    });

    megaMenu.addEventListener("mouseenter", () => clearTimeout(menuTimeout));

    megaMenu.addEventListener("mouseleave", () => {
      menuTimeout = setTimeout(() => megaMenu.classList.remove("active"), 200);
    });
  }






  // CARD IMAGE SLIDER (INSIDE CARD)
  document.querySelectorAll(".slider-container").forEach((slider) => {
    const images = slider.querySelectorAll(".slider-image");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    const dots = slider.querySelectorAll(".slider-dot");

    let current = 0;

    function showSlide(index) {
      images.forEach((img) =>
        img.classList.replace("opacity-100", "opacity-0")
      );

      dots.forEach((dot) =>
        dot.classList.replace("bg-white", "bg-white/50")
      );

      images[index].classList.replace("opacity-0", "opacity-100");
      dots[index]?.classList.replace("bg-white/50", "bg-white");

      current = index;
    }

    nextBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      showSlide((current + 1) % images.length);
    });

    prevBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      showSlide((current - 1 + images.length) % images.length);
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => showSlide(i));
    });
  });


  // CARD CLICK NAVIGATION
  window.goToPage = function (e, url) {
    if (e.target.closest("a, button")) return;

    if (e.ctrlKey || e.metaKey) {
      window.open(url, "_blank");
    } else {
      window.location.href = url;
    }
  };















// why choose us
//----------------------REVEAL ON SCROLL------------------

function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // trigger once
      }
    });
  }, {
    threshold: 0.2
  });

  elements.forEach(el => observer.observe(el));
}
// run after DOM loads
document.addEventListener("DOMContentLoaded", initReveal);
// why choose us
//----------------------REVEAL ON SCROLL------------------












// motion recommendation

(function () {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }

    });
  }, { threshold: 0.3 });

  revealEls.forEach(el => observer.observe(el));
})();



// tour card's heading below hero of  home page
(function initSectionHeadingReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('heading-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.section-heading-wrapper').forEach(el => observer.observe(el));
})();


// homepage hero counter
 // COUNTER ANIMATION----------------------------------------------
  const counters = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));

  function animateCounter(el) {
    const target = +el.getAttribute('data-target');
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(2, -10 * progress);

      let value = Math.floor(ease * target);

      if (target === 98) el.textContent = value + '%';
      else el.textContent = value + '+';

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // homepage HERO IMAGE ROTATION--------------------
  const slides = document.querySelectorAll('.hero-img');
  let currentSlide = 0;

  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
  // homepage hero image rotation -----------------------





// footer
(function initFooterAccordion() {
  document.querySelectorAll('.footer-acc-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const acc = trigger.closest('.footer-acc');
      const isOpen = acc.classList.contains('open');

      // Close all first (one open at a time)
      document.querySelectorAll('.footer-acc.open').forEach(el => el.classList.remove('open'));

      // Toggle clicked one
      if (!isOpen) acc.classList.add('open');
    });
  });
})();





// car section home page carousel
(function initCarCarousel() {
  const track   = document.getElementById('carTrack');
  const prevBtn = document.getElementById('carPrev');
  const nextBtn = document.getElementById('carNext');
  if (!track || !prevBtn || !nextBtn) return;

  let position = 0;

  function getCardWidth() {
    const card = track.querySelector('article');
    if (!card) return 328;
    return card.offsetWidth + 28; // card + gap-7 (28px)
  }

  function getMaxScroll() {
    return track.scrollWidth - track.parentElement.offsetWidth;
  }

  nextBtn.addEventListener('click', () => {
    position = Math.min(position + getCardWidth(), getMaxScroll());
    track.style.transform = `translateX(-${position}px)`;
  });

  prevBtn.addEventListener('click', () => {
    position = Math.max(position - getCardWidth(), 0);
    track.style.transform = `translateX(-${position}px)`;
  });
})();

});
