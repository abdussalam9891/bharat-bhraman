// ELEMENTS
const buttons = document.querySelectorAll("[data-filter]");
const container = document.getElementById("carContainer");

const sortBtn = document.getElementById("sortBtn");
const sortMenu = document.getElementById("sortMenu");

let currentFilter = "all";
let currentSort = "";


//  FILTER + ACTIVE UI
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


// SORT DROPDOWN TOGGLE
sortBtn.addEventListener("click", () => {
  sortMenu.classList.toggle("hidden");
});


//  SORT OPTION CLICK
document.querySelectorAll("[data-sort]").forEach(item => {
  item.addEventListener("click", () => {
    sortMenu.classList.add("hidden");

    currentSort = item.dataset.sort;

    // update button label
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


// CLOSE ON ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    sortMenu.classList.add("hidden");
  }
});


//-----------MAIN FUNCTION-------------
function applyFilterAndSort() {
  let cards = Array.from(container.children);

  // FILTER
  cards.forEach(card => {
    if (currentFilter === "all" || card.dataset.type === currentFilter) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  // ONLY visible cards
  let visibleCards = cards.filter(card => card.style.display !== "none");

  // SORT (numeric fix)
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

  // append visible first
  visibleCards.forEach(card => container.appendChild(card));

  // then hidden
  cards
    .filter(card => card.style.display === "none")
    .forEach(card => container.appendChild(card));
}
