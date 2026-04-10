document.addEventListener("DOMContentLoaded", () => {
  // homepage tour
  (function initTourCarousel() {
    const track = document.getElementById("tourTrack");
    const prevBtn = document.getElementById("tourPrev");
    const nextBtn = document.getElementById("tourNext");

    if (!track) return;

    const wrapper = track.parentElement;
    let position = 0;
    let isDragging = false;
    let startX = 0;
    let startPosition = 0;

    // ---------- helpers ----------
    function cardWidth() {
      const card = track.querySelector("article");
      return card ? card.offsetWidth + 28 : 328;
    }

    function maxScroll() {
      return track.scrollWidth - wrapper.offsetWidth;
    }

    function clamp(val, min, max) {
      return Math.max(min, Math.min(val, max));
    }

    function update(withAnim = true) {
      track.style.transition = withAnim
        ? "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)"
        : "none";
      track.style.transform = `translateX(-${position}px)`;

      if (prevBtn) {
        prevBtn.style.opacity = position <= 0 ? "0.3" : "1";
        prevBtn.style.pointerEvents = position <= 0 ? "none" : "auto";
      }

      if (nextBtn) {
        nextBtn.style.opacity = position >= maxScroll() ? "0.3" : "1";
        nextBtn.style.pointerEvents = position >= maxScroll() ? "none" : "auto";
      }
    }

    // ---------- buttons ----------
    nextBtn?.addEventListener("click", () => {
      position = clamp(position + cardWidth(), 0, maxScroll());
      update(true);
    });

    prevBtn?.addEventListener("click", () => {
      position = clamp(position - cardWidth(), 0, maxScroll());
      update(true);
    });

    // ---------- touch swipe (mobile) ----------
    track.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        startPosition = position;
      },
      { passive: true },
    );

    track.addEventListener(
      "touchmove",
      (e) => {
        const dx = e.touches[0].clientX - startX;
        position = clamp(startPosition - dx, 0, maxScroll());
        update(false);
      },
      { passive: true },
    );

    track.addEventListener("touchend", () => {
      update(true);
    });

    // ---------- mouse drag (desktop premium feel) ----------
    wrapper.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX;
      startPosition = position;
      wrapper.style.cursor = "grabbing";
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      wrapper.style.cursor = "grab";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      const dx = e.pageX - startX;
      position = clamp(startPosition - dx, 0, maxScroll());
      update(false);
    });

    wrapper.style.cursor = "grab";

    // ---------- trackpad horizontal scroll ----------
    wrapper.addEventListener(
      "wheel",
      (e) => {
        const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);

        if (isHorizontal) {
          e.preventDefault();

          position = clamp(position + e.deltaX, 0, maxScroll());
          update(false);
        }
      },
      { passive: false },
    );

    // ---------- resize ----------
    window.addEventListener("resize", () => {
      position = clamp(position, 0, maxScroll());
      update(false);
    });

    // ---------- init ----------
    update(false);
  })();

  // testimonials--------------------------------
  (function initReviewsCarousel() {
    const container = document.querySelector(".reviews-carousel-new");
    const track = document.querySelector(".reviews-track-new");
    const dotsWrap = document.querySelector(".reviews-dots");

    if (!container || !track || !dotsWrap) return;

    const origCards = [...track.querySelectorAll(".review-card-new")];
    if (!origCards.length) return;

    const total = origCards.length;
    let current = 0;
    let vPos = 0;
    let jumping = false;
    let timer;

    origCards.forEach((card) => track.appendChild(card.cloneNode(true)));
    const allCards = [...track.querySelectorAll(".review-card-new")];

    origCards.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "rc-dot";
      dot.addEventListener("click", () => moveTo(i));
      dotsWrap.appendChild(dot);
    });

    const gap = () => 24;
    const cardW = () => allCards[0].offsetWidth + gap();
    const centerX = () =>
      container.offsetWidth / 2 - allCards[0].offsetWidth / 2;
    const offset = (v) => centerX() - v * cardW();

    function applyClasses() {
      allCards.forEach((card, i) => {
        card.classList.remove("rc-active", "rc-adjacent");
        const logical = i % total;
        const d = Math.min(
          Math.abs(logical - current),
          total - Math.abs(logical - current),
        );
        if (d === 0) card.classList.add("rc-active");
        else if (d === 1) card.classList.add("rc-adjacent");
      });
    }

    function applyDots() {
      [...dotsWrap.children].forEach((d, i) =>
        d.classList.toggle("rc-dot-active", i === current),
      );
    }

    function moveTo(logical, useClone = false) {
      if (jumping) return;
      if (logical === current && !useClone) return;
      jumping = true;
      current = logical;
      vPos = useClone ? total + logical : logical;
      track.style.transition = "transform 0.6s cubic-bezier(.2,.65,.3,1)";
      track.style.transform = `translateX(${offset(vPos)}px)`;
      applyClasses();
      applyDots();
      setTimeout(() => {
        if (vPos >= total) {
          vPos = logical;
          track.style.transition = "none";
          track.style.transform = `translateX(${offset(vPos)}px)`;
        }
        jumping = false;
      }, 650);
    }

    function advance() {
      const next = (current + 1) % total;
      moveTo(next, current === total - 1);
    }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(advance, 3200);
    }

    allCards.forEach((card, i) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => moveTo(i % total));
      card.addEventListener("mouseenter", () => clearInterval(timer));
      card.addEventListener("mouseleave", startAuto);
    });

    window.addEventListener("resize", () => {
      track.style.transition = "none";
      track.style.transform = `translateX(${offset(vPos)}px)`;
    });

    let startX = 0,
      startY = 0,
      isSwiping = false;

    container.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = false;
      },
      { passive: true },
    );

    container.addEventListener(
      "touchmove",
      (e) => {
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        if (!isSwiping && Math.abs(dx) > Math.abs(dy) + 5) isSwiping = true;
        if (isSwiping) e.preventDefault();
      },
      { passive: false },
    );

    container.addEventListener("touchend", (e) => {
      if (!isSwiping) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 40) return;
      if (dx < 0) moveTo((current + 1) % total, current === total - 1);
      else moveTo((current - 1 + total) % total);
    });

    let cooldown = false;
    container.addEventListener(
      "wheel",
      (e) => {
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
        e.preventDefault();
        if (cooldown) return;
        cooldown = true;
        setTimeout(() => (cooldown = false), 700);
        if (e.deltaX > 0) moveTo((current + 1) % total, current === total - 1);
        else moveTo((current - 1 + total) % total);
      },
      { passive: false },
    );

    track.style.transition = "none";
    track.style.transform = `translateX(${offset(0)}px)`;
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

  //  navbar --------------------------
  (function () {
    function initNavbar() {
      const megaMenu = document.getElementById("megaMenu");
      const triggers = document.querySelectorAll(".mega-trigger");
      const panels = document.querySelectorAll(".mega-panel");
      const navToggle = document.getElementById("navToggle");
      const mobileMenu = document.getElementById("mobileMenu");
      const overlay = document.getElementById("navOverlay");

      console.log("INIT RUNNING", { navToggle, triggers, megaMenu });

      // ── Mega menu ──
      if (megaMenu && triggers.length) {
        function showMega(panelKey) {
          megaMenu.classList.add("active");
          panels.forEach((p) => {
            const match = p.dataset.panel === panelKey;
            p.classList.toggle("hidden", !match);
            p.classList.toggle("flex", match);
          });
        }

        function hideMega() {
          megaMenu.classList.remove("active");
        }

        let hideTimeout;

        triggers.forEach((trigger) => {
          trigger.addEventListener("mouseenter", () => {
            if (window.innerWidth < 900) return;
            clearTimeout(hideTimeout);
            showMega(trigger.dataset.mega);
          });

          trigger.addEventListener("mouseleave", () => {
            if (window.innerWidth < 900) return;
            hideTimeout = setTimeout(hideMega, 120);
          });
        });

        megaMenu.addEventListener("mouseenter", () => {
          clearTimeout(hideTimeout);
        });

        megaMenu.addEventListener("mouseleave", () => {
          hideTimeout = setTimeout(hideMega, 120);
        });
      }

      // ── Mobile menu ──
      if (navToggle && mobileMenu && overlay) {
        navToggle.addEventListener("click", () => {
          mobileMenu.classList.toggle("open");
          overlay.classList.toggle("active");
          navToggle.classList.toggle("active");
        });

        overlay.addEventListener("click", () => {
          mobileMenu.classList.remove("open");
          overlay.classList.remove("active");
          navToggle.classList.remove("active");
        });
      }
    }

    // SAFE INIT
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initNavbar);
    } else {
      initNavbar();
    }
  })();

  // CARD IMAGE SLIDER (INSIDE CARD)
  document.querySelectorAll(".slider-container").forEach((slider) => {
    const images = slider.querySelectorAll(".slider-image");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    const dots = slider.querySelectorAll(".slider-dot");

    let current = 0;

    function showSlide(index) {
      images.forEach((img) =>
        img.classList.replace("opacity-100", "opacity-0"),
      );

      dots.forEach((dot) => dot.classList.replace("bg-white", "bg-white/50"));

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

  // at your own pace section
  (function () {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("active");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
  })();

  // why choose us
  //----------------------REVEAL ON SCROLL------------------

  function initReveal() {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // trigger once
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    elements.forEach((el) => observer.observe(el));
  }
  // run after DOM loads
  document.addEventListener("DOMContentLoaded", initReveal);
  // why choose us
  //----------------------REVEAL ON SCROLL------------------

  // motion recommendation

  (function () {
    const revealEls = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");

            // stop observing after first reveal
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 },
    );

    revealEls.forEach((el) => observer.observe(el));
  })();

  // tour card's heading below hero of  home page
  (function initSectionHeadingReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("heading-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    document
      .querySelectorAll(".section-heading-wrapper")
      .forEach((el) => observer.observe(el));
  })();

  // homepage hero counter
  const counters = document.querySelectorAll(".stat-num");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 },
  );

  counters.forEach((counter) => observer.observe(counter));

  function animateCounter(el) {
    const target = +el.getAttribute("data-target");
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(2, -10 * progress);

      let value = Math.floor(ease * target);

      if (target === 100) el.textContent = value + "%";
      else el.textContent = value + "+";

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // homepage HERO IMAGE ROTATION--------------------
  (function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-img");
    if (!slides.length) return;

    let currentSlide = 0;

    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 5000);
  })();
  // homepage hero image rotation -----------------------

  // footer  -------------------------------
  (function initFooterAccordion() {
    const accs = document.querySelectorAll(".footer-acc");
    accs.forEach((acc) => {
      const trigger = acc.querySelector(".footer-acc-trigger");
      trigger.addEventListener("click", () => {
        const isOpen = acc.classList.contains("open");
        accs.forEach((a) => a.classList.remove("open"));
        if (!isOpen) acc.classList.add("open");
      });
    });
  })();

  window.addEventListener("load", function () {
    if (window.lucide) {
      lucide.createIcons();
    }
  });

  // // car section home page carousel
  // (function initCarCarousel() {
  //   const track   = document.getElementById('carTrack');
  //   const prevBtn = document.getElementById('carPrev');
  //   const nextBtn = document.getElementById('carNext');
  //   if (!track || !prevBtn || !nextBtn) return;

  //   let position = 0;

  //   function getCardWidth() {
  //     const card = track.querySelector('article');
  //     if (!card) return 328;
  //     return card.offsetWidth + 28; // card + gap-7 (28px)
  //   }

  //   function getMaxScroll() {
  //     return track.scrollWidth - track.parentElement.offsetWidth;
  //   }

  //   nextBtn.addEventListener('click', () => {
  //     position = Math.min(position + getCardWidth(), getMaxScroll());
  //     track.style.transform = `translateX(-${position}px)`;
  //   });

  //   prevBtn.addEventListener('click', () => {
  //     position = Math.max(position - getCardWidth(), 0);
  //     track.style.transform = `translateX(-${position}px)`;
  //   });
  // })();
});
