// DATA
const tours = [
  {
    title: "Golden Triangle",
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
    title: "Kerala",
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
    badge: "Bestseller",
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
    badge: "Most Booked",
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
    badge: "Spiritual",
    images: ["tourimages/kashi1.jpg","tourimages/kashi2.jpg","tourimages/kashi3.jpg","tourimages/kashi4.jpg"]
  },
  {
    title: "Andaman Islands",
    location: "Port Blair - Havelock - Neil Island",
    days: "7 Days",
    rating: "★ 4.9",
    type: "Private",
    booked: "Top Pick",
    price: "₹24,000",
    oldPrice: "₹28,000",
    link: "andamanIsland.html",
    badge: "Top Pick",
    images: ["tourimages/portblair1.jpg","tourimages/portblair2.jpg","tourimages/andaman1.jpg","tourimages/andaman2.jpg","tourimages/andaman3.jpg"]
  }
];


// INIT
const container = document.getElementById("cardContainer");
const template = document.getElementById("tour-card-template");

// RENDER
if (container && template) {
  tours.forEach((tour, index) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".title").textContent = tour.title;
    clone.querySelector(".location").textContent = tour.location;
    clone.querySelector(".booked").textContent = tour.booked;

    const card = clone.querySelector("article");

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

    const wrapper = clone.querySelector(".images-wrapper");

    createImages(wrapper, tour.images);
    createOverlay(wrapper);
    createBadge(wrapper, tour.badge);
    const dots = createDots(wrapper, tour.images.length);

    initSlider(wrapper, dots, card);

    container.appendChild(clone);
  });

  if (typeof initReveal === "function") {
    initReveal();
  }
}

// SCROLL
initScroller(
  document.getElementById("cardContainer"),
  document.getElementById("tourPrev"),
  document.getElementById("tourNext"),
  24
);
