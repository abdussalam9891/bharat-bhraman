// LIGHTBOX
(function () {
  let images = [];
  let current = 0;

  window.openLightbox = function (index) {
    const gallery = document.getElementById('gallery');
    images = JSON.parse(gallery.dataset.images);
    current = index;
    const lb = document.getElementById('lightbox');
    lb.classList.remove('hidden');
    lb.classList.add('flex');
    updateLightbox();
  };

  window.closeLightbox = function () {
    const lb = document.getElementById('lightbox');
    lb.classList.add('hidden');
    lb.classList.remove('flex');
  };

  window.closeLb = function (e) {
    if (e.target.id === 'lightbox') closeLightbox();
  };

  window.shiftLb = function (dir) {
    current = (current + dir + images.length) % images.length;
    updateLightbox();
  };

  function updateLightbox() {
    document.getElementById('lbImg').src = images[current];
    document.getElementById('lbCounter').innerText = `${current + 1} / ${images.length}`;
  }
})();

// CAR CARD SLIDER
(function () {
  document.querySelectorAll('.slider-container').forEach(container => {
    const images = container.querySelectorAll('.slider-image');
    if (!images.length) return;

    let current = 0;

    function showSlide(i) {
      images.forEach((img, idx) => {
        img.style.opacity = idx === i ? '1' : '0';
        img.style.zIndex = idx === i ? '1' : '0';
      });
    }

    showSlide(0);

    let interval = setInterval(() => {
      current = (current + 1) % images.length;
      showSlide(current);
    }, 3500);

    container.querySelector('.prev')?.addEventListener('click', () => {
      current = (current - 1 + images.length) % images.length;
      showSlide(current);
    });

    container.querySelector('.next')?.addEventListener('click', () => {
      current = (current + 1) % images.length;
      showSlide(current);
    });

    container.addEventListener('mouseenter', () => clearInterval(interval));
    container.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        current = (current + 1) % images.length;
        showSlide(current);
      }, 3500);
    });
  });
})();










