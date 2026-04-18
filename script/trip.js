




document.addEventListener("DOMContentLoaded", () => {



  //   SAFE ELEMENT SELECTION
const tourSection = document.querySelector("#tourSection");
if (!tourSection) {
  console.error("tourSection not found");
  return;
}

const buttons = tourSection.querySelectorAll("[data-filter]");
const tourContainer = document.getElementById("tourContainer");

const sortBtn = document.getElementById("tourSortBtn");
const sortMenu = document.getElementById("tourSortMenu");

let currentFilter = "all";
let currentSort = "";


//  GUARD (prevents crash)
if (!tourContainer || !sortBtn || !sortMenu) {
  console.warn("Tour filter system not initialized properly");
}


// FILTER
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;

    // active UI
    buttons.forEach(b => {
      b.classList.remove("bg-black", "text-white");
      b.classList.add("bg-white", "border");
    });

    btn.classList.add("bg-black", "text-white");
    btn.classList.remove("bg-white", "border");

    applyFilterAndSort();
  });
});


// SORT DROPDOWN
sortBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // 🔥 prevents instant close
  sortMenu.classList.toggle("hidden");
});


// SORT CLICK
tourSection.querySelectorAll("#tourSortMenu [data-sort]").forEach(item => {
  item.addEventListener("click", () => {
    sortMenu.classList.add("hidden");

    currentSort = item.dataset.sort;

    sortBtn.innerHTML = `
      ${item.textContent}
      <span class="text-xs">▼</span>
    `;

    applyFilterAndSort();
  });
});


// CLOSE DROPDOWN
document.addEventListener("click", (e) => {
  if (!sortBtn.contains(e.target) && !sortMenu.contains(e.target)) {
    sortMenu.classList.add("hidden");
  }
});


// ESC CLOSE
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    sortMenu.classList.add("hidden");
  }
});


 function applyFilterAndSort() {
  let cards = Array.from(tourContainer.querySelectorAll(".tour-card"));

  // FILTER
  cards.forEach(card => {
    const days = Number(card.dataset.days);

    if (
      currentFilter === "all" ||
      (currentFilter === "short" && days <= 4) ||
      (currentFilter === "medium" && days >= 5 && days <= 7) ||
      (currentFilter === "long" && days >= 8)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  // visible only
  let visibleCards = cards.filter(card => card.style.display !== "none");

  // SORT
  if (currentSort === "low") {
    visibleCards.sort((a, b) =>
      Number(a.dataset.price) - Number(b.dataset.price)
    );
  }

  if (currentSort === "high") {
    visibleCards.sort((a, b) =>
      Number(b.dataset.price) - Number(a.dataset.price)
    );
  }

  // re-append
  visibleCards.forEach(card => tourContainer.appendChild(card));

  cards
    .filter(card => card.style.display === "none")
    .forEach(card => tourContainer.appendChild(card));
}


// INIT
applyFilterAndSort();


});
