const track = document.getElementById("galleryTrack");
const slides = track.children;
let index = 0;
let interval;

function showSlide(i) {
  track.style.transform = `translateX(-${i * 100}%)`;
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

document.getElementById("nextBtn").onclick = nextSlide;
document.getElementById("prevBtn").onclick = prevSlide;

// AUTO PLAY
function startAuto() {
  interval = setInterval(nextSlide, 3500);
}

function stopAuto() {
  clearInterval(interval);
}

startAuto();

// PAUSE ON HOVER
const container = track.parentElement;
container.addEventListener("mouseenter", stopAuto);
container.addEventListener("mouseleave", startAuto);

