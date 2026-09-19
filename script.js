const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const countTargets = document.querySelectorAll('.count');

const numberObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      let start = 0;
      const duration = 1200;
      const step = Math.ceil(target / (duration / 16));

      const tick = () => {
        start += step;
        if (start >= target) {
          el.textContent = target;
          numberObserver.unobserve(el);
          return;
        }
        el.textContent = start;
        requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    });
  },
  { threshold: 0.7 }
);

countTargets.forEach((count) => numberObserver.observe(count));

const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 2 - 1;
    const y = ((event.clientY - top) / height) * 2 - 1;

    card.style.transform = `perspective(1000px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-4px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

const orbSet = document.querySelectorAll('.orb');
window.addEventListener('pointermove', (event) => {
  const x = (event.clientX / window.innerWidth) - 0.5;
  const y = (event.clientY / window.innerHeight) - 0.5;

  orbSet.forEach((orb, index) => {
    const speed = (index + 1) * 10;
    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});
