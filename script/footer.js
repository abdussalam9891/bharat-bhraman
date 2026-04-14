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



