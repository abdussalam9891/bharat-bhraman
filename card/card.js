//-----------------DATA-------------------
const tours = [
  {
    title: "Golden Triangle 5 Days 4 Nights Tour Package",
    location: "Delhi - Agra - Jaipur",
    days: "5 Days",
    rating: "★ 4.7 (180)",
    type: "Private",
    booked: "180+ travelers booked this",
    price: "₹14,999",
    oldPrice: "₹19,999",
    link: "goldentriangle.html",
    badge: "Save ₹4,000",
    images: ["images/d2.jpg", "images/d7.jpg", "images/r6.jpg"]
  },
  {
    title: "Kerala 7 Days 6 Nights Backwater Tour Package",
    location: "Kochi - Munnar - Alleppey",
    days: "7 Days",
    rating: "★ 4.8 (220)",
    type: "Private",
    booked: "220+ travelers booked this",
    price: "₹20,000",
    oldPrice: "₹25,000",
    link: "kerala.html",
    badge: "Save ₹5,000",
    images: ["images/kerala1.jpg", "images/kerala2.jpg", "images/kerala3.jpg"]
  },
  {
    title: "Goa Beach Escape",
    location: "Panaji - Calangute - Palolem",
    days: "3 Days",
    rating: "★ 4.9",
    type: "Private",
    booked: "Bestseller",
    price: "₹7,500",
    oldPrice: "₹9,000",
    link: "goa.html",
    badge: "🔥 Bestseller",
    images: ["tourimages/goa1.jpg","tourimages/goa2.jpg","tourimages/goa3.jpg","tourimages/goa4.jpg"]
  },
  {
    title: "Manali Snow Trip",
    location: "Delhi - Kullu - Manali",
    days: "5 Days",
    rating: "★ 4.8",
    type: "Private",
    booked: "Most Booked",
    price: "₹13,500",
    oldPrice: "₹16,000",
    link: "manali.html",
    badge: "❄️ Most Booked",
    images: ["tourimages/manali1.jpg","tourimages/manali2.jpg","tourimages/manali3.jpg","tourimages/manali4.jpg","tourimages/manali5.jpg"]
  },
  {
    title: "Varanasi Spiritual Tour",
    location: "Varanasi - Sarnath - Bodh Gaya",
    days: "4 Days",
    rating: "★ 4.7",
    type: "Private",
    booked: "Spiritual",
    price: "₹8,500",
    oldPrice: "₹10,000",
    link: "kashi.html",
    badge: "🪔 Spiritual",
    images: ["tourimages/kashi1.jpg","tourimages/kashi2.jpg","tourimages/kashi3.jpg","tourimages/kashi4.jpg"]
  },
  {
    title: "Andaman Islands 7 Days Tour",
    location: "Port Blair - Havelock - Neil Island",
    days: "7 Days",
    rating: "★ 4.9",
    type: "Private",
    booked: "Top Pick",
    price: "₹24,000",
    oldPrice: "₹28,000",
    link: "andamanIsland.html",
    badge: "🏝️ Top Pick",
    images: ["tourimages/portblair1.jpg","tourimages/portblair2.jpg","tourimages/andaman1.jpg","tourimages/andaman2.jpg","tourimages/andaman3.jpg"]
  }
];



const cars = [
  {
    name: "Mahindra XUV700",
    specs: "7 Seater • SUV • Diesel",
    features: "₹18/km • AC • Comfortable Ride",
    price: "₹4500/day",
    oldPrice: "₹5500/day",
    save: "Save ₹1000",
    badge: "🔥 Bestseller",
    link: "https://wa.me/919006143335?text=Hi%2C%20I%20want%20to%20book%20Mahindra%20XUV700%20for%20rent.",
    images: [
      "carpic/mahindraSuv1.jpg",
      "carpic/mahindraSuv2.jpg",
      "carpic/mahindraSuv3.jpg",
      "carpic/mahindraSuv4.jpg"
    ]
  },

  {
    name: "Maruti Suzuki Dzire",
    specs: "4 Seater • Sedan • Petrol/CNG",
    features: "₹13/km • AC • Smooth City Ride",
    price: "₹3200/day",
    oldPrice: "₹3800/day",
    save: "Save ₹600",
    badge: "⭐ Top Choice",
    link: "https://wa.me/919006143335?text=Hi%2C%20I%20want%20to%20book%20Maruti%20Suzuki%20Dzire%20for%20rent.",
    images: [
      "carpic/dzire1.jpg",
      "carpic/dzire2.jpg",
      "carpic/dzire3.jpg",
      "carpic/dzire4.jpg"
    ]
  },

  {
    name: "Toyota Innova Crysta",
    specs: "7 Seater • MUV • Diesel",
    features: "₹18/km • AC • Premium Interior",
    price: "₹5000/day",
    oldPrice: "₹6000/day",
    save: "Save ₹1000",
    badge: "🔥 Most Booked",
    link: "https://wa.me/919006143335?text=Hi%2C%20I%20want%20to%20book%20Toyota%20Innova%20Crysta%20for%20rent.",
    images: [
      "carpic/inova1.jpg",
      "carpic/inova2.jpg",
      "carpic/inova3.jpg",
      "carpic/inova4.jpg"
    ]
  },

  {
    name: "Mahindra Thar — Adventure 4x4",
    specs: "4 Seater • 4x4 SUV • Diesel",
    features: "₹18/km • AC • 4WD Mountain Beast",
    price: "₹4200/day",
    oldPrice: "₹5000/day",
    save: "Save ₹800",
    badge: "🧗 Off-Road King",
    link: "https://wa.me/919006143335?text=Hi%2C%20I%20want%20to%20book%20Mahindra%20Thar%20for%20rent.",
    images: [
      "carpic/thar1.jpg",
      "carpic/thar2.jpg",
      "carpic/thar3.jpg",
      "carpic/thar4.jpg"
    ]
  },

  {
    name: "Toyota Fortuner",
    specs: "7 Seater • Premium SUV • Diesel",
    features: "₹22/km • AC • Ultimate Luxury",
    price: "₹7000/day",
    oldPrice: "₹8500/day",
    save: "Save ₹1500",
    badge: "👑 Luxury Pick",
    link: "https://wa.me/919006143335?text=Hi%2C%20I%20want%20to%20book%20Toyota%20Fortuner%20for%20rent.",
    images: [
      "carpic/fortuner1.jpg",
      "carpic/fortuner2.jpg",
      "carpic/fortuner3.jpg",
      "carpic/f4.jpg"
    ]
  }
];






//-------------------------INIT------------------------
const container = document.getElementById("cardContainer");
const template = document.getElementById("tour-card-template");

if (!container || !template) {
  console.error("Card system not found");
}

//-------------------MAIN RENDER--------------------
tours.forEach((tour, index) => {
  const clone = template.content.cloneNode(true);

  // TEXT
  clone.querySelector(".title").textContent = tour.title;
  clone.querySelector(".location").textContent = tour.location;
  clone.querySelector(".booked").textContent = tour.booked;

  // GET CARD ONCE
  const card = clone.querySelector("article");

  // ANIMATION
  card.classList.add("reveal");
  card.style.transitionDelay = `${index * 0.1}s`;

  clone.querySelector(".meta").innerHTML = `
    <span>${tour.days}</span>
    <span class="text-gray-300">•</span>
    <span class="text-amber-500 font-medium">${tour.rating}</span>
    <span class="text-gray-300">•</span>
    <span>${tour.type}</span>
  `;

  clone.querySelector(".price").innerHTML = `
    <div class="font-semibold text-[1.35rem] text-ink-900">${tour.price}</div>
    <div class="text-[0.75rem] text-gray-400 line-through">${tour.oldPrice}</div>
  `;

  clone.querySelector(".cta").href = tour.link;

  // IMAGE SYSTEM
  const wrapper = clone.querySelector(".images-wrapper");

  createImages(wrapper, tour.images);
  createOverlay(wrapper);
  createBadge(wrapper, tour.badge);
  const dots = createDots(wrapper, tour.images.length);

  // SLIDER
  initSlider(wrapper, dots, card);

  // ADD TO DOM
  container.appendChild(clone);
});


if (typeof initReveal === "function") {
  initReveal();
}

//---------------------- HELPERS-------------------

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
  prev.className = "prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition";
  prev.textContent = "←";

  const next = document.createElement("button");
  next.className = "next absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition";
  next.textContent = "→";

  wrapper.append(overlay, prev, next);
}

// Badge
function createBadge(wrapper, text) {
  if (!text) return;

  const badge = document.createElement("div");
  badge.className = "absolute top-3 left-3 z-10 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[0.7rem] font-semibold px-3 py-1 rounded-full shadow-lg";
  badge.textContent = text;

  wrapper.appendChild(badge);
}

// Dots
function createDots(wrapper, count) {
  const dotContainer = document.createElement("div");
  dotContainer.className = "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition z-10";

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
function initSlider(wrapper, dots, card) {
  const images = wrapper.querySelectorAll(".slider-image");
  const prev = wrapper.querySelector(".prev");
  const next = wrapper.querySelector(".next");

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

  // events
  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      showSlide(index);
    });
  });

  // autoplay
  function startAuto() {
    interval = setInterval(nextSlide, 3000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  card.addEventListener("mouseenter", stopAuto);
  card.addEventListener("mouseleave", startAuto);

  startAuto();
}



// SCROLL BUTTONS
const prevBtn = document.getElementById("tourPrev");
const nextBtn = document.getElementById("tourNext");
const containerEl = document.getElementById("cardContainer");

function getScrollAmount() {
  const card = containerEl.querySelector("article");
  return card ? card.offsetWidth + 24 : 300; // 24 = gap
}

nextBtn.addEventListener("click", () => {
  containerEl.scrollBy({
    left: getScrollAmount(),
    behavior: "smooth"
  });
});

prevBtn.addEventListener("click", () => {
  containerEl.scrollBy({
    left: -getScrollAmount(),
    behavior: "smooth"
  });
});






/// ================= INIT =================
const carContainer = document.getElementById("carTrack");
const carTemplate = document.getElementById("car-card-template");
const carPrev = document.getElementById("carPrev");
const carNext = document.getElementById("carNext");

// ================= RENDER =================
if (carContainer && carTemplate) {

  cars.forEach((car, index) => {
    const clone = carTemplate.content.cloneNode(true);

    // TEXT
    clone.querySelector(".car-title").textContent = car.name;
    clone.querySelector(".car-specs").textContent = car.specs;
    clone.querySelector(".car-features").textContent = car.features;

    clone.querySelector(".car-price").innerHTML = `
      <div class="text-xs text-gray-400 line-through">${car.oldPrice}</div>
      <div class="font-bold text-lg text-gray-900">${car.price}</div>
      <div class="text-[0.65rem] text-green-600">${car.save}</div>
    `;

    clone.querySelector(".car-cta").href = car.link;

    // CARD
    const card = clone.querySelector("article");

    // 🔥 UNIVERSAL ANIMATION
    card.classList.add("reveal");
    card.style.transitionDelay = `${Math.min(index * 0.08, 0.5)}s`;

    // IMAGE SYSTEM (REUSED)
    const wrapper = clone.querySelector(".images-wrapper");

    createImages(wrapper, car.images);
    createOverlay(wrapper);
    const dots = createDots(wrapper, car.images.length);

    initSlider(wrapper, dots, card);

    // ADD TO DOM
    carContainer.appendChild(clone);
  });

  // 🔥 IMPORTANT: trigger reveal AFTER render
  if (typeof initReveal === "function") {
    initReveal();
  }
}

// ================= SCROLL =================
function initScroller(container, prevBtn, nextBtn, gap = 24) {
  if (!container || !prevBtn || !nextBtn) return;

  function getScrollAmount() {
    const card = container.querySelector("article");
    return card ? card.getBoundingClientRect().width + gap : 300;
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


// TOUR
initScroller(
  document.getElementById("cardContainer"),
  document.getElementById("tourPrev"),
  document.getElementById("tourNext"),
  24
);

// CAR
initScroller(
  document.getElementById("carTrack"),
  document.getElementById("carPrev"),
  document.getElementById("carNext"),
  28
);
