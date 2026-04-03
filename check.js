const counters = document.querySelectorAll('.stat-num');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => observer.observe(counter));

function animateCounter(el) {
  const target = +el.getAttribute('data-target');
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(2, -10 * progress);

    let value = Math.floor(ease * target);

    if (target === 98) el.textContent = value + '%';
    else el.textContent = value + '+';

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
