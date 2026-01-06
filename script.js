// Supervision VP – Site Scripts

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.1
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Optionally unobserve after animating (better performance)
      // animationObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .animate-fade, .animate-scale, .animate-slide-left, .animate-slide-right'
  );
  animatedElements.forEach(el => animationObserver.observe(el));
});

// Smooth scroll for anchor links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;

  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Header scroll effect
const header = document.querySelector('header');

if (header) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}
