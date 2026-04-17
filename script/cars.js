//-----------------DATA-------------------



const cars = [
  {
    name: "Mahindra XUV700",
    specs: "7 Seater • SUV • Diesel",
    features: "₹18/km • AC • Comfortable Ride",
    price: "₹4500/day",
    oldPrice: "₹5500/day",
    save: "Save ₹1000",
    badge: "Bestseller",
    link: "/index.html#form",
    images: [
      "/assets/carpic/mahindraSuv1.jpg",
      "/assets/carpic/mahindraSuv2.jpg",
      "/assets/carpic/mahindraSuv3.jpg",
      "/assets/carpic/mahindraSuv4.jpg"
    ]
  },

  {
    name: "Maruti Suzuki Dzire",
    specs: "4 Seater • Sedan • Petrol/CNG",
    features: "₹13/km • AC • Smooth City Ride",
    price: "₹3200/day",
    oldPrice: "₹3800/day",
    save: "Save ₹600",
    badge: "Top Choice",
    link: "/index.html#form",
    images: [
      "/assets/carpic/dzire1.jpg",
      "/assets/carpic/dzire2.jpg",
      "/assets/carpic/dzire3.jpg",
      "/assets/carpic/dzire4.jpg"
    ]
  },

  {
    name: "Toyota Innova Crysta",
    specs: "7 Seater • MUV • Diesel",
    features: "₹18/km • AC • Premium Interior",
    price: "₹5000/day",
    oldPrice: "₹6000/day",
    save: "Save ₹1000",
    badge: "Most Booked",
    link: "/index.html#form",
    images: [
      "/assets/carpic/inova1.jpg",
      "/assets/carpic/inova2.jpg",
      "/assets/carpic/inova3.jpg",
      "/assets/carpic/inova4.jpg"
    ]
  },

  {
    name: "Mahindra Thar",
    specs: "4 Seater • SUV • Diesel",
    features: "₹18/km • AC • 4WD Mountain Beast",
    price: "₹4200/day",
    oldPrice: "₹5000/day",
    save: "Save ₹800",
    badge: "Off-Road King",
    link: "/index.html#form",
    images: [
      "/assets/carpic/thar1.jpg",
      "/assets/carpic/thar2.jpg",
      "/assets/carpic/thar3.jpg",
      "/assets/carpic/thar4.jpg"
    ]
  },

  {
    name: "Toyota Fortuner",
    specs: "7 Seater • Premium SUV • Diesel",
    features: "₹22/km • AC • Ultimate Luxury",
    price: "₹7000/day",
    oldPrice: "₹8500/day",
    save: "Save ₹1500",
    badge: "Luxury Pick",
    link: "/index.html#form",
    images: [
      "/assets/carpic/fortuner1.jpg",
      "/assets/carpic/fortuner2.jpg",
      "/assets/carpic/fortuner3.jpg",
      "/assets/carpic/f4.jpg"
    ]
  }
];




// INIT
const carContainer = document.getElementById("carTrack");
const carTemplate = document.getElementById("car-card-template");

// RENDER
if (carContainer && carTemplate) {
  cars.forEach((car, index) => {
    const clone = carTemplate.content.cloneNode(true);

    clone.querySelector(".car-title").textContent = car.name;
    clone.querySelector(".car-specs").textContent = car.specs;
    clone.querySelector(".car-features").textContent = car.features;

    clone.querySelector(".car-price").innerHTML = `
      <div class="text-xs text-gray-400 line-through">${car.oldPrice}</div>
      <div class="font-bold text-lg text-gray-900">${car.price}</div>
      <div class="text-[0.65rem] text-green-600">${car.save}</div>
    `;

   const cta = clone.querySelector(".car-cta");
   cta.setAttribute("data-car", car.name);


    const card = clone.querySelector("article");

    card.classList.add("reveal");
    card.style.transitionDelay = `${Math.min(index * 0.08, 0.5)}s`;

    const wrapper = clone.querySelector(".images-wrapper");

    createImages(wrapper, car.images);
    createOverlay(wrapper);
    createBadge(wrapper, car.badge);
    const dots = createDots(wrapper, car.images.length);

    initSlider(wrapper, dots, card);

    carContainer.appendChild(clone);
  });





  if (typeof initReveal === "function") {
    initReveal();
  }
}


// document.addEventListener("click", (e) => {
//   const btn = e.target.closest(".car-cta");
//   if (!btn) return;

//   e.preventDefault();

//   const carName = btn.getAttribute("data-car");
//   if (!carName) return;

//   // always save to localStorage
//   localStorage.setItem("selectedCar", carName);

//   const formSection = document.getElementById("form");
//   const carSelect = document.querySelector('select[name="car_preference"]');

//   if (carSelect) {
//     // form already loaded — update directly
//     carSelect.value = carName;
//     formSection.scrollIntoView({ behavior: "smooth" });
//   } else {
//     // form not loaded yet — scroll, loadForm() will pick up localStorage
//     formSection.scrollIntoView({ behavior: "smooth" });
//   }
// });






document.addEventListener("click", (e) => {
  const btn = e.target.closest(".car-cta");
  if (!btn) return;

  e.preventDefault();

  const carName = btn.getAttribute("data-car");
  if (!carName) return;

  // store always
  localStorage.setItem("selectedCar", carName);

  const formSection = document.getElementById("form");

  if (formSection) {
    formSection.scrollIntoView({ behavior: "smooth" });

    // if form already loaded → update instantly
    const carSelect = document.querySelector('select[name="car_preference"]');
    if (carSelect) {
      carSelect.value = carName;
    }

  } else {
    // different page case
    window.location.href = "/index.html#form";
  }
});


