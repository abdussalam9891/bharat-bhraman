// Images
function createImages(wrapper, images) {
  images.forEach((img, i) => {
    const image = document.createElement("img");
    image.src = img;
    image.className = `slider-image absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === 0 ? "opacity-100" : "opacity-0"}`;
    wrapper.appendChild(image);
  });
}

// Overlay + Arrows
function createOverlay(wrapper) {
  const overlay = document.createElement("div");
  overlay.className = "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent";

  const prev = document.createElement("button");
  prev.className = "prev absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/50 opacity-0 group-hover:opacity-100 transition";
  prev.textContent = "<";

  const next = document.createElement("button");
  next.className = "next absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/50 opacity-0 group-hover:opacity-100 transition";
  next.textContent = ">";

  wrapper.append(overlay, prev, next);
}

// Badge
function createBadge(wrapper, text) {
  if (!text) return;

  const badge = document.createElement("div");
  badge.className = "absolute top-4 left-4 z-30 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[0.7rem] font-semibold px-3 py-1 rounded-full shadow-lg pointer-events-none";
  badge.textContent = text;

  wrapper.appendChild(badge);
}

// Dots
function createDots(wrapper, count) {
  const dotContainer = document.createElement("div");
  dotContainer.className = "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition z-20";

  const dots = [];

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");
    dot.className = `slider-dot w-2 h-2 rounded-full cursor-pointer ${i === 0 ? "bg-white" : "bg-white/50"}`;
    dotContainer.appendChild(dot);
    dots.push(dot);
  }

  wrapper.appendChild(dotContainer);
  return dots;
}

// Slider Logic
function initSlider(wrapper, dots, card, speed = 3000) {
  const images = wrapper.querySelectorAll(".slider-image");
  const prev = wrapper.querySelector(".prev");
  const next = wrapper.querySelector(".next");

  if (!images.length || !prev || !next) return;

  let index = 0;
  let interval;

  function showSlide(i) {
    images.forEach((img, idx) => {
      img.classList.toggle("opacity-100", idx === i);
      img.classList.toggle("opacity-0", idx !== i);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle("bg-white", idx === i);
      dot.classList.toggle("bg-white/50", idx !== i);
    });
  }

  function nextSlide() {
    index = (index + 1) % images.length;
    showSlide(index);
  }

  function prevSlide() {
    index = (index - 1 + images.length) % images.length;
    showSlide(index);
  }

  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      showSlide(index);
    });
  });

  function startAuto() {
    interval = setInterval(nextSlide, speed);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  card.addEventListener("mouseenter", stopAuto);
  card.addEventListener("mouseleave", startAuto);

  startAuto();
}




function initScroller(container, prevBtn, nextBtn, gap = 24) {
  if (!container || !prevBtn || !nextBtn) return;

  function getScrollAmount() {
    const card = container.querySelector("article");
    return card ? card.offsetWidth + gap : 300;
  }

  nextBtn.addEventListener("click", () => {
    container.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth"
    });
  });

  prevBtn.addEventListener("click", () => {
    container.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth"
    });
  });
}
