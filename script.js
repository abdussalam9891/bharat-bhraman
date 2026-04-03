document.addEventListener("DOMContentLoaded", () => {


  // car card
  document.querySelectorAll(".slider-container").forEach((container) => {
    let images = container.querySelectorAll(".slider-image");
    let index = 0;

    const show = (i) => {
      images.forEach((img) => (img.style.opacity = "0"));
      images[i].style.opacity = "1";
    };

    container.querySelector(".next").onclick = () => {
      index = (index + 1) % images.length;
      show(index);
    };

    container.querySelector(".prev").onclick = () => {
      index = (index - 1 + images.length) % images.length;
      show(index);
    };
  });


  // mobile view ---------------------------
  const toggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const nav = document.getElementById("mainNav");

  if (toggle && navLinks) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();

      toggle.classList.toggle("active");

      if (navLinks.classList.contains("hidden")) {
        navLinks.classList.remove("hidden");
        navLinks.classList.add("flex");
      } else {
        navLinks.classList.add("hidden");
        navLinks.classList.remove("flex");
      }
    });

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.add("hidden");
        navLinks.classList.remove("flex");
        toggle.classList.remove("active");
      }
    });
  }

  // SCROLL TOP---------------------//
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





  // navbar hide when scroll --------------------------
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

  //MEGA MENU--------------------------//
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

    nav?.addEventListener("mouseleave", () => {
      menuTimeout = setTimeout(() => megaMenu.classList.remove("active"), 200);
    });





    // mobile click
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        if (window.innerWidth >= 900) return;

        e.preventDefault();

        megaMenu.classList.toggle("active");

        const panel = trigger.dataset.mega;

        document.querySelectorAll(".mega-panel").forEach((p) => {
          p.classList.toggle("hidden", p.dataset.panel !== panel);
          p.classList.toggle("flex", p.dataset.panel === panel);
        });
      });
    });
  }







  // FEATURED TOUR CAROUSEL
  const track = document.getElementById("tourTrack");
  const next = document.getElementById("tourNext");
  const prev = document.getElementById("tourPrev");

  if (track) {
    const cardWidth = 320 + 28;

    // buttons
    next?.addEventListener("click", () => {
      track.scrollBy({ left: cardWidth, behavior: "smooth" });
    });

    prev?.addEventListener("click", () => {
      track.scrollBy({ left: -cardWidth, behavior: "smooth" });
    });

    // DRAG (DESKTOP)
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener("mouseleave", () => (isDown = false));
    track.addEventListener("mouseup", () => (isDown = false));

    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });


    // TOUCH (MOBILE)
    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });




    // AUTOPLAY
   let autoScroll;

    function startAuto() {
      autoScroll = setInterval(() => {
        track.scrollBy({ left: cardWidth, behavior: "smooth" });
      }, 4000);
    }

    function stopAuto() {
      clearInterval(autoScroll);
    }

    startAuto();

    track.addEventListener("mouseenter", stopAuto);
    track.addEventListener("mouseleave", startAuto);
    track.addEventListener("touchstart", stopAuto);
  }


  // REVEAL ANIMATION
  const cards = document.querySelectorAll(".card-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.2 },
  );

  cards.forEach((card) => observer.observe(card));

 // CARD SLIDER
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


  //card click
  window.goToPage = function (e, url) {
    if (e.target.closest("a, button")) return;

    if (e.ctrlKey || e.metaKey) {
      window.open(url, "_blank");
    } else {
      window.location.href = url;
    }
  };









});
