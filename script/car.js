
const cars = [
  {
    id: 1,
    name: "Mahindra XUV700",
    seats: 7,
    type: "SUV",
    fuel: "Diesel",
    price: 4500,
    oldPrice: 5500,
    pricePerKm: 18,
    features: ["AC", "Comfortable Ride"],
    badge: "bestseller",
    images: [
      "/assets/carpic/mahindraSuv1.jpg",
      "/assets/carpic/mahindraSuv2.jpg",
      "/assets/carpic/mahindraSuv3.jpg",
      "/assets/carpic/mahindraSuv4.jpg"
    ]
  },
  {
    id: 2,
    name: "Maruti Swift",
    seats: 4,
    type: "Hatchback",
    fuel: "Petrol",
    price: 2800,
    oldPrice: 3200,
    pricePerKm: 11,
    features: ["AC", "Fuel Efficient"],
    badge: "budget",
    images: [
      "/assets/carpic/swift1.jpg",
      "/assets/carpic/swift2.jpg",
      "/assets/carpic/swift3.jpg",
      "/assets/carpic/swift4.jpg"
    ]
  },
  {
    id: 3,
    name: "Maruti Suzuki Dzire",
    seats: 4,
    type: "Sedan",
    fuel: "Petrol/CNG",
    price: 3200,
    oldPrice: 3800,
    pricePerKm: 13,
    features: ["AC", "Smooth Ride"],
    badge: "top",
    images: [
      "/assets/carpic/dzire1.jpg",
      "/assets/carpic/dzire2.jpg",
      "/assets/carpic/dzire3.jpg",
      "/assets/carpic/dzire4.jpg"
    ]
  },
  {
    id: 4,
    name: "Maruti Ertiga",
    seats: 7,
    type: "MUV",
    fuel: "Petrol",
    price: 3800,
    oldPrice: 4500,
    pricePerKm: 14,
    features: ["AC", "Spacious"],
    badge: "family",
    images: [
      "/assets/carpic/mahindraSuv1.jpg",
      "/assets/carpic/mahindraSuv2.jpg",
      "/assets/carpic/mahindraSuv3.jpg",
      "/assets/carpic/mahindraSuv4.jpg"
    ]
  },
  {
    id: 5,
    name: "Mahindra Scorpio N",
    seats: 7,
    type: "SUV",
    fuel: "Diesel",
    price: 4200,
    oldPrice: 5000,
    pricePerKm: 16,
    features: ["AC", "Off-Road"],
    badge: "adventure",
    images: [
      "/assets/carpic/scorpio1.jpg",
      "/assets/carpic/scorpio2.jpg",
      "/assets/carpic/scorpio3.jpg",
      "/assets/carpic/scorpio4.jpg"
    ]
  },
  {
    id: 6,
    name: "Toyota Innova Crysta",
    seats: 7,
    type: "MUV",
    fuel: "Diesel",
    price: 5000,
    oldPrice: 6000,
    pricePerKm: 18,
    features: ["AC", "Premium Interior"],
    badge: "popular",
    images: [
      "/assets/carpic/inova1.jpg",
      "/assets/carpic/inova2.jpg",
      "/assets/carpic/inova3.jpg",
      "/assets/carpic/inova4.jpg"
    ]
  },
  {
    id: 7,
    name: "Mahindra Thar",
    seats: 4,
    type: "SUV",
    fuel: "Diesel",
    price: 4200,
    oldPrice: 5000,
    pricePerKm: 18,
    features: ["AC", "4x4"],
    badge: "offroad",
    images: [
      "/assets/carpic/thar1.jpg",
      "/assets/carpic/thar2.jpg",
      "/assets/carpic/thar3.jpg",
      "/assets/carpic/thar4.jpg"
    ]
  },
  {
    id: 8,
    name: "Toyota Fortuner",
    seats: 7,
    type: "SUV",
    fuel: "Diesel",
    price: 7000,
    oldPrice: 8500,
    pricePerKm: 22,
    features: ["AC", "Luxury"],
    badge: "luxury",
    images: [
      "/assets/carpic/fortuner1.jpg",
      "/assets/carpic/fortuner2.jpg",
      "/assets/carpic/fortuner3.jpg",
      "/assets/carpic/f4.jpg"
    ]
  },
  {
    id: 9,
    name: "Tata Nexon",
    seats: 4,
    type: "SUV",
    fuel: "Petrol/CNG",
    price: 3200,
    oldPrice: 3380,
    pricePerKm: 13,
    features: ["AC", "Smooth Ride"],
    badge: "compact",
    images: [
      "/assets/carpic/nexon1.jpg",
      "/assets/carpic/nexon2.jpg",
      "/assets/carpic/nexon3.jpg",
      "/assets/carpic/nexon4.jpg"
    ]
  },
  {
    id: 10,
    name: "Tata Safari",
    seats: 7,
    type: "SUV",
    fuel: "Diesel",
    price: 4800,
    oldPrice: 5800,
    pricePerKm: 17,
    features: ["AC", "Panoramic Roof"],
    badge: "premium",
    images: [
      "/assets/carpic/safari1.jpg",
      "/assets/carpic/safari2.jpg",
      "/assets/carpic/safari3.jpg",
      "/assets/carpic/safari4.jpg"
    ]
  },
  {
    id: 11,
    name: "Maruti Ciaz",
    seats: 5,
    type: "Sedan",
    fuel: "Petrol",
    price: 3500,
    oldPrice: 4200,
    pricePerKm: 14,
    features: ["AC", "Corporate Comfort"],
    badge: "business",
    images: [
      "/assets/carpic/nexon1.jpg",
      "/assets/carpic/nexon2.jpg",
      "/assets/carpic/nexon3.jpg",
      "/assets/carpic/nexon4.jpg"
    ]
  }
];









// helper
function formatSpecs(car) {
  return `${car.seats} Seater • ${car.type} • ${car.fuel}`;
}

function formatFeatures(car) {
  return `₹${car.pricePerKm}/km • ${car.features.join(" • ")}`;
}

function calculateSavings(car) {
  return car.oldPrice - car.price;
}






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






//render

function renderCars(carList, mode = "home") {
  const carContainer = document.getElementById("carTrack");
  const carTemplate = document.getElementById("car-card-template");

  if (!carContainer || !carTemplate) return;

  carContainer.innerHTML = "";

  // Grid mode: override container classes
 if (mode === "grid") {

  carContainer.classList.remove("flex", "overflow-x-auto", "snap-x", "snap-mandatory");
  carContainer.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-7");
} else {
  carContainer.classList.remove("grid");
  carContainer.classList.add(
  "flex",
  "overflow-x-auto",
  "gap-7",
  "snap-x",
  "snap-mandatory",
  "no-scrollbar"
);
}

  carList.forEach((car, index) => {
    const clone = carTemplate.content.cloneNode(true);

    clone.querySelector(".car-title").textContent = car.name;
    clone.querySelector(".car-specs").textContent = formatSpecs(car);
    clone.querySelector(".car-features").textContent = formatFeatures(car);

    clone.querySelector(".car-price").innerHTML = `
      <div class="text-xs text-gray-400 line-through">₹${car.oldPrice}/day</div>
      <div class="font-bold text-lg text-gray-900">₹${car.price}/day</div>
      <div class="text-[0.65rem] text-green-600">Save ₹${car.oldPrice - car.price}</div>
    `;

    clone.querySelector(".car-cta").onclick = () => openModal(car.id);

    const card = clone.querySelector("article");

     if (mode === "grid") {
  card.classList.remove("min-w-[300px]", "max-w-[320px]");
}
    card.classList.add("reveal");
    card.style.transitionDelay = `${Math.min(index * 0.08, 0.5)}s`;

    const wrapper = clone.querySelector(".images-wrapper");
    createImages(wrapper, car.images);
    createBadge(wrapper, car.badge);
    const dots = createDots(wrapper, car.images.length);
    initSlider(wrapper, dots);

    carContainer.appendChild(clone);
  });

  if (typeof initReveal === "function") initReveal();





}




 const page = document.body.dataset.page;

if (page === "home") {
  renderCars(cars.slice(0, 6), "home");
} else if (page === "cars") {
  renderCars(cars, "grid");
}




