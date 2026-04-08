 document.addEventListener("DOMContentLoaded", () => {




  (function initReviewsCarousel() {
  const container = document.querySelector('.reviews-carousel-new');
  const track     = document.querySelector('.reviews-track-new');
  const dotsWrap  = document.querySelector('.reviews-dots');
  const cards     = [...document.querySelectorAll('.review-card-new')];
  const total     = cards.length;
  let current     = 0;
  let timer;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'rc-dot';
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function updateDots() {
    [...dotsWrap.children].forEach((d, i) => {
      d.classList.toggle('rc-dot-active', i === current);
    });
  }

  function goTo(index) {
    current = ((index % total) + total) % total;

    cards.forEach((card, i) => {
      card.classList.remove('rc-active', 'rc-adjacent');
      const diff = Math.min(
        Math.abs(i - current),
        total - Math.abs(i - current)
      );
      if (diff === 0) card.classList.add('rc-active');
      else if (diff === 1) card.classList.add('rc-adjacent');
    });

    // Translate track so active card is centered
    const cardW   = cards[0].offsetWidth + 24; // 24 = gap-6
    const centerX = container.offsetWidth / 2 - cards[0].offsetWidth / 2;
    track.style.transform = `translateX(${centerX - current * cardW}px)`;

    updateDots();
  }

  function startAuto() {
    timer = setInterval(() => goTo(current + 1), 3200);
  }

  function stopAuto() {
    clearInterval(timer);
  }

  container.addEventListener('mouseenter', stopAuto);
  container.addEventListener('mouseleave',  startAuto);

  // Init
  goTo(0);
  startAuto();
})();





















  // NAVBAR / MOBILE MENU
  const toggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const nav = document.getElementById("mainNav");

  if (toggle && navLinks) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();

      toggle.classList.toggle("active");

      navLinks.classList.toggle("hidden");
      navLinks.classList.toggle("flex");
    });

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.add("hidden");
        navLinks.classList.remove("flex");
        toggle.classList.remove("active");
      }
    });
  }


  // NAVBAR HIDE ON SCROLL
  let lastScroll = 0;

  if (nav) {
    window.addEventListener("scroll", () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 100) {
        nav.classList.add("hidden-up");
      } else {
        nav.classList.remove("hidden-up");
      }

      lastScroll = current;
    });
  }


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


  // COUNTER ANIMATION
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


  // HERO IMAGE ROTATION
  const slides = document.querySelectorAll('.hero-img');
  let currentSlide = 0;

  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);



  // GSAP SCROLL ANIMATION (MAIN FEATURE)
  gsap.registerPlugin(ScrollTrigger);

  const track = document.querySelector("#tourTrack");

  if (track) {
    const totalWidth = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: "#tourPin",
        start: "top top",
        end: () => "+=" + (track.scrollWidth - window.innerWidth),
        scrub: true,
        pin: true,
        anticipatePin: 1
      }
    });
  }
  ScrollTrigger.refresh();
















  // sticky bar 2
/* SCROLL REVEAL */
(function () {

  /* SCROLL REVEAL */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {

        setTimeout(() => {
          entry.target.classList.add('active');
        }, index * 120);

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealEls.forEach(el => revealObserver.observe(el));


  /* COUNTER */
  const counterEls = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        const el = entry.target;
        const target = +el.dataset.target;
        let count = 0;

        const update = () => {
          const increment = target / 60;
          count += increment;

          if (count < target) {
            el.innerText = Math.floor(count);
            requestAnimationFrame(update);
          } else {
            el.innerText = target + (target === 98 ? '%' : '+');
          }
        };

        update();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.6 });

  counterEls.forEach(el => counterObserver.observe(el));

})();


// why choose us

(function () {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {

        setTimeout(() => {
          entry.target.classList.add('active');
        }, index * 120);

        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealEls.forEach(el => observer.observe(el));
})();


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

});
