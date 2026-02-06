# Website Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign Supervision VP website with cinematic/premium feel, clear two-audience fork, and polished micro-animations.

**Architecture:** Static HTML/CSS/JS site. CSS custom properties for theming. Intersection Observer API for scroll animations. Mobile-first responsive approach.

**Tech Stack:** HTML5, CSS3 (with custom properties), Vanilla JavaScript, Google Fonts (Bebas Neue, Inter)

---

## Phase 1: Foundation & CSS System

### Task 1: Update CSS Custom Properties

**Files:**
- Modify: `styles.css:1-40`

**Step 1: Replace the :root variables with updated design system**

```css
/* Supervision VP – Brand Stylesheet */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');

:root {
  /* Core brand colors */
  --burgundy: #8B1C23;
  --burgundy-dark: #6B151A;
  --burgundy-darker: #4A0E12;
  --cream: #F5E6D3;
  --cream-light: #FAF4ED;

  /* Signature stripe colors */
  --stripe-orange: #CC5500;
  --stripe-gold: #D4A84B;
  --stripe-teal: #1A6B6B;

  /* Functional colors */
  --text: var(--cream);
  --text-muted: rgba(245, 230, 211, 0.75);
  --text-subtle: rgba(245, 230, 211, 0.55);
  --border: rgba(245, 230, 211, 0.12);
  --border-hover: rgba(245, 230, 211, 0.25);

  /* Shadows & Effects */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.15);
  --shadow-md: 0 8px 30px rgba(0,0,0,0.25);
  --shadow-lg: 0 20px 50px rgba(0,0,0,0.35);
  --glow-orange: 0 0 60px rgba(204, 85, 0, 0.15);
  --glow-teal: 0 0 60px rgba(26, 107, 107, 0.15);

  /* Layout */
  --radius: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --max-width: 1200px;
  --header-height: 72px;

  /* Typography */
  --font-display: 'Bebas Neue', 'Arial Narrow', sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Animation */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 0.2s;
  --duration-normal: 0.3s;
  --duration-slow: 0.6s;
}
```

**Step 2: Verify in browser**

Open `index.html` in browser. Confirm page still renders (may look different with new values).

**Step 3: Commit**

```bash
git add styles.css
git commit -m "refactor: update CSS custom properties for new design system"
```

---

### Task 2: Add Animation Utility Classes

**Files:**
- Modify: `styles.css` (append to end)

**Step 1: Add scroll animation utility classes**

```css
/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays for children */
.stagger-1 { transition-delay: 0.1s; }
.stagger-2 { transition-delay: 0.2s; }
.stagger-3 { transition-delay: 0.3s; }
.stagger-4 { transition-delay: 0.4s; }

/* Fade variations */
.animate-fade {
  opacity: 0;
  transition: opacity var(--duration-slow) var(--ease-out);
}
.animate-fade.is-visible {
  opacity: 1;
}

/* Scale variation */
.animate-scale {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}
.animate-scale.is-visible {
  opacity: 1;
  transform: scale(1);
}

/* Slide from left */
.animate-slide-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}
.animate-slide-left.is-visible {
  opacity: 1;
  transform: translateX(0);
}

/* Slide from right */
.animate-slide-right {
  opacity: 0;
  transform: translateX(30px);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}
.animate-slide-right.is-visible {
  opacity: 1;
  transform: translateX(0);
}
```

**Step 2: Commit**

```bash
git add styles.css
git commit -m "feat: add scroll animation utility classes"
```

---

### Task 3: Update JavaScript for Scroll Animations

**Files:**
- Modify: `script.js`

**Step 1: Replace script.js with Intersection Observer implementation**

```javascript
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
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
}, { passive: true });
```

**Step 2: Add header scroll styles to CSS**

Add to `styles.css` in the header section:

```css
header.scrolled {
  background: rgba(139, 28, 35, 0.95);
  box-shadow: var(--shadow-md);
}
```

**Step 3: Verify in browser**

Open `index.html`, scroll down. Confirm header gets darker/shadow on scroll.

**Step 4: Commit**

```bash
git add script.js styles.css
git commit -m "feat: add Intersection Observer scroll animations and header scroll effect"
```

---

## Phase 2: Homepage Hero Redesign

### Task 4: Create Split Hero HTML Structure

**Files:**
- Modify: `index.html`

**Step 1: Replace the hero section with new split layout**

Find the existing `<section class="hero">` and replace with:

```html
<section class="hero-split">
  <div class="hero-content animate-on-scroll">
    <div class="kicker">Virtual Production • Production-Led</div>
    <h1>Virtual production that starts with your problem, not the technology</h1>
    <p class="lede">
      We help productions and organisations use VP when it genuinely makes sense – and tell you when it doesn't.
    </p>
    <div class="hero-logos animate-fade stagger-2">
      <span class="logo-label">Trusted by</span>
      <div class="logo-strip">
        <span class="client-logo">BBC</span>
        <span class="client-logo">ITV</span>
        <span class="client-logo">Dyson</span>
        <span class="client-logo">BAFTA</span>
        <span class="client-logo">Apple</span>
      </div>
    </div>
  </div>
  <div class="hero-visual animate-scale stagger-1">
    <div class="hero-image-wrapper">
      <div class="hero-image-placeholder">
        <!-- Replace with actual image: <img src="path/to/hero.jpg" alt="Virtual production on set"> -->
        <div class="placeholder-text">Hero Image</div>
      </div>
      <div class="hero-stripes" aria-hidden="true"></div>
    </div>
  </div>
</section>
```

**Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add split hero HTML structure"
```

---

### Task 5: Style the Split Hero

**Files:**
- Modify: `styles.css`

**Step 1: Add hero-split styles**

Add after the existing hero styles (or replace them):

```css
/* ============================================
   SPLIT HERO
   ============================================ */
.hero-split {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: center;
  min-height: calc(100vh - var(--header-height) - 100px);
  padding: 60px 0 80px;
}

.hero-content {
  max-width: 600px;
}

.hero-content .kicker {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--stripe-gold);
  margin-bottom: 20px;
}

.hero-content h1 {
  font-family: var(--font-display);
  font-size: clamp(42px, 5vw, 64px);
  font-weight: 400;
  line-height: 1.0;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: var(--cream);
  margin: 0 0 24px;
}

.hero-content .lede {
  font-size: 18px;
  line-height: 1.7;
  color: var(--text-muted);
  margin: 0 0 32px;
}

/* Hero logos */
.hero-logos {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.logo-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.logo-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
}

.client-logo {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  opacity: 0.7;
  transition: opacity var(--duration-fast) ease;
}

.client-logo:hover {
  opacity: 1;
}

/* Hero visual */
.hero-visual {
  position: relative;
}

.hero-image-wrapper {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.hero-image-placeholder {
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, var(--burgundy-dark), var(--burgundy-darker));
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
}

.hero-image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-text {
  font-size: 14px;
  color: var(--text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Stripe accent on hero image */
.hero-stripes {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 60%;
  height: 12px;
  display: flex;
  gap: 4px;
  z-index: -1;
}

.hero-stripes::before,
.hero-stripes::after {
  content: '';
  flex: 1;
  border-radius: 4px;
}

.hero-stripes::before {
  background: linear-gradient(90deg, var(--stripe-orange), var(--stripe-gold));
}

.hero-stripes::after {
  flex: 0.6;
  background: var(--stripe-teal);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-split {
    grid-template-columns: 1fr;
    gap: 40px;
    min-height: auto;
    padding: 40px 0 60px;
  }

  .hero-content {
    max-width: 100%;
    text-align: center;
  }

  .hero-logos {
    align-items: center;
  }

  .logo-strip {
    justify-content: center;
  }

  .hero-visual {
    max-width: 500px;
    margin: 0 auto;
  }
}
```

**Step 2: Verify in browser**

Open `index.html`. Confirm:
- Split layout with text left, image placeholder right
- Logos display below the lede
- Stripe accent appears on image
- Responsive layout stacks on narrow viewport

**Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: style split hero section"
```

---

## Phase 3: The Fork Section

### Task 6: Create Fork Section HTML

**Files:**
- Modify: `index.html`

**Step 1: Replace the existing fork section**

Find `<section class="fork" id="fork">` and replace entirely with:

```html
<section class="fork-section" id="fork">
  <div class="fork-intro animate-on-scroll">
    <h2>How can we help?</h2>
  </div>

  <div class="fork-cards">
    <a href="vp-commercials.html" class="fork-card fork-card--productions animate-on-scroll stagger-1">
      <div class="fork-card-stripe"></div>
      <div class="fork-card-content">
        <h3>TV, Film & Commercials</h3>
        <p>We help productions solve real problems with VP – narrative, factual, branded content.</p>
      </div>
      <div class="fork-card-reveal">
        <ul>
          <li>Schedule & budget-led approach</li>
          <li>Plates, LED, CG – whatever fits</li>
          <li>On-set and post supervision</li>
        </ul>
      </div>
      <div class="fork-card-cta">
        Explore VP for productions <span class="arrow">→</span>
      </div>
    </a>

    <a href="vp-inhouse.html" class="fork-card fork-card--inhouse animate-on-scroll stagger-2">
      <div class="fork-card-stripe"></div>
      <div class="fork-card-content">
        <h3>In-House & Corporate</h3>
        <p>Build VP capability for ongoing content creation – without the massive upfront spend.</p>
      </div>
      <div class="fork-card-reveal">
        <ul>
          <li>Feasibility & planning</li>
          <li>Training & upskilling</li>
          <li>Scalable system design</li>
        </ul>
      </div>
      <div class="fork-card-cta">
        Explore VP in-house <span class="arrow">→</span>
      </div>
    </a>
  </div>
</section>
```

**Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add fork section HTML with two-path structure"
```

---

### Task 7: Style the Fork Section

**Files:**
- Modify: `styles.css`

**Step 1: Add fork section styles**

```css
/* ============================================
   FORK SECTION
   ============================================ */
.fork-section {
  padding: 80px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg,
    rgba(107, 21, 26, 0.3) 0%,
    rgba(74, 14, 18, 0.5) 100%
  );
}

.fork-intro {
  text-align: center;
  margin-bottom: 48px;
}

.fork-intro h2 {
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--cream);
  margin: 0;
}

.fork-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

/* Fork Card */
.fork-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  text-decoration: none;
  overflow: hidden;
  transition: transform var(--duration-normal) var(--ease-out),
              border-color var(--duration-normal) ease,
              box-shadow var(--duration-normal) ease;
}

.fork-card:hover {
  transform: translateY(-6px);
  border-color: var(--border-hover);
  box-shadow: var(--shadow-lg);
}

/* Stripe accent */
.fork-card-stripe {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  transition: height var(--duration-normal) ease;
}

.fork-card--productions .fork-card-stripe {
  background: var(--stripe-teal);
}

.fork-card--inhouse .fork-card-stripe {
  background: var(--stripe-orange);
}

.fork-card:hover .fork-card-stripe {
  height: 6px;
}

/* Card content */
.fork-card-content {
  flex: 1;
}

.fork-card h3 {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--cream);
  margin: 0 0 12px;
}

.fork-card p {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0;
}

/* Reveal content on hover */
.fork-card-reveal {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height var(--duration-normal) var(--ease-out),
              opacity var(--duration-normal) ease,
              margin var(--duration-normal) ease;
}

.fork-card:hover .fork-card-reveal {
  max-height: 150px;
  opacity: 1;
  margin-top: 20px;
}

.fork-card-reveal ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.fork-card-reveal li {
  position: relative;
  padding-left: 16px;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.fork-card-reveal li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--stripe-gold);
}

/* CTA */
.fork-card-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  font-size: 14px;
  font-weight: 600;
  color: var(--stripe-gold);
}

.fork-card-cta .arrow {
  transition: transform var(--duration-fast) ease;
}

.fork-card:hover .fork-card-cta .arrow {
  transform: translateX(6px);
}

/* Responsive */
@media (max-width: 768px) {
  .fork-cards {
    grid-template-columns: 1fr;
  }

  .fork-card {
    padding: 24px;
  }

  .fork-card-reveal {
    max-height: none;
    opacity: 1;
    margin-top: 16px;
  }
}
```

**Step 2: Verify in browser**

Open `index.html`. Confirm:
- Two cards side by side
- Teal stripe on Productions, Orange on In-house
- Hover reveals bullet points
- Arrow animates on hover
- Cards lift with shadow on hover

**Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: style fork section with hover reveal cards"
```

---

## Phase 4: Social Proof & Differentiators

### Task 8: Add Social Proof Bar

**Files:**
- Modify: `index.html`

**Step 1: Add social proof section after the fork**

Insert after `</section><!-- end fork-section -->`:

```html
<section class="social-proof animate-fade">
  <div class="container">
    <p class="proof-text">BAFTA-nominated work. Major broadcasters. Global brands.</p>
    <div class="proof-logos">
      <span class="client-logo">BBC</span>
      <span class="client-logo">ITV</span>
      <span class="client-logo">Dyson</span>
      <span class="client-logo">BAFTA</span>
      <span class="client-logo">World Productions</span>
      <span class="client-logo">Apple</span>
    </div>
  </div>
</section>
```

**Step 2: Add styles**

```css
/* ============================================
   SOCIAL PROOF BAR
   ============================================ */
.social-proof {
  padding: 48px 0;
  background: var(--burgundy-darker);
  text-align: center;
}

.proof-text {
  font-family: var(--font-display);
  font-size: clamp(20px, 3vw, 28px);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--cream);
  margin: 0 0 24px;
}

.proof-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  align-items: center;
}

.proof-logos .client-logo {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-muted);
  opacity: 0.6;
  transition: opacity var(--duration-fast) ease;
}

.proof-logos .client-logo:hover {
  opacity: 1;
}
```

**Step 3: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add social proof bar section"
```

---

### Task 9: Add Differentiators Section

**Files:**
- Modify: `index.html`

**Step 1: Add differentiators section**

Insert after the social proof section:

```html
<section class="differentiators">
  <div class="container">
    <div class="diff-grid">
      <div class="diff-card animate-on-scroll stagger-1">
        <div class="diff-dot" style="background: var(--stripe-teal);"></div>
        <h3>Production-first</h3>
        <p>We start with schedule, budget, and risk – not the technology.</p>
      </div>
      <div class="diff-card animate-on-scroll stagger-2">
        <div class="diff-dot" style="background: var(--stripe-orange);"></div>
        <h3>Tool-agnostic</h3>
        <p>Plates, LED, CG, AI – we use what fits the problem.</p>
      </div>
      <div class="diff-card animate-on-scroll stagger-3">
        <div class="diff-dot" style="background: var(--stripe-gold);"></div>
        <h3>Honest advice</h3>
        <p>We'll tell you if VP isn't right for your project.</p>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Add styles**

```css
/* ============================================
   DIFFERENTIATORS
   ============================================ */
.differentiators {
  padding: 80px 0;
}

.diff-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.diff-card {
  text-align: center;
  padding: 32px 24px;
}

.diff-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 auto 20px;
}

.diff-card h3 {
  font-family: var(--font-display);
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--cream);
  margin: 0 0 12px;
}

.diff-card p {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0;
}

@media (max-width: 768px) {
  .diff-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

**Step 3: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add differentiators section"
```

---

## Phase 5: Featured Work & Final CTA

### Task 10: Add Featured Work Section

**Files:**
- Modify: `index.html`

**Step 1: Add featured work section**

```html
<section class="featured-work">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="smallcaps">Selected Work</span>
      <h2>Projects we've supervised</h2>
    </div>

    <div class="work-grid">
      <a href="work.html" class="work-card animate-on-scroll stagger-1">
        <div class="work-card-image">
          <div class="placeholder-text">Vigil Image</div>
        </div>
        <div class="work-card-content">
          <span class="work-card-tag">Narrative</span>
          <h3>Vigil</h3>
          <p>BBC</p>
        </div>
        <div class="work-card-hover">View project →</div>
      </a>

      <a href="work.html" class="work-card animate-on-scroll stagger-2">
        <div class="work-card-image">
          <div class="placeholder-text">Dyson Image</div>
        </div>
        <div class="work-card-content">
          <span class="work-card-tag">Commercial</span>
          <h3>Dyson</h3>
          <p>Cube Studios</p>
        </div>
        <div class="work-card-hover">View project →</div>
      </a>
    </div>

    <div class="work-more animate-fade">
      <a href="work.html" class="cta">See all work</a>
    </div>
  </div>
</section>
```

**Step 2: Add styles**

```css
/* ============================================
   FEATURED WORK
   ============================================ */
.featured-work {
  padding: 80px 0;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(107, 21, 26, 0.2) 100%
  );
}

.section-header {
  margin-bottom: 40px;
}

.section-header .smallcaps {
  display: block;
  margin-bottom: 8px;
}

.section-header h2 {
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 36px);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--cream);
  margin: 0;
}

.work-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.work-card {
  position: relative;
  display: block;
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  background: var(--burgundy-dark);
  border: 1px solid var(--border);
  transition: transform var(--duration-normal) var(--ease-out),
              border-color var(--duration-normal) ease,
              box-shadow var(--duration-normal) ease;
}

.work-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-hover);
  box-shadow: var(--shadow-lg);
}

.work-card-image {
  aspect-ratio: 16/10;
  background: linear-gradient(135deg, var(--burgundy-dark), var(--burgundy-darker));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.work-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}

.work-card:hover .work-card-image img {
  transform: scale(1.05);
}

.work-card-content {
  padding: 20px;
}

.work-card-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--stripe-gold);
}

.work-card h3 {
  font-family: var(--font-display);
  font-size: 24px;
  text-transform: uppercase;
  color: var(--cream);
  margin: 8px 0 4px;
}

.work-card p {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}

.work-card-hover {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--stripe-gold);
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity var(--duration-normal) ease,
              transform var(--duration-normal) var(--ease-out);
}

.work-card:hover .work-card-hover {
  opacity: 1;
  transform: translateX(0);
}

.work-more {
  text-align: center;
}

@media (max-width: 768px) {
  .work-grid {
    grid-template-columns: 1fr;
  }
}
```

**Step 3: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add featured work section"
```

---

### Task 11: Add Final CTA Section

**Files:**
- Modify: `index.html`

**Step 1: Add final CTA section before footer**

```html
<section class="final-cta">
  <div class="container">
    <div class="cta-box animate-scale">
      <h2>Not sure where to start?</h2>
      <p>No pitch deck. No pressure. Just a conversation about what you're trying to achieve.</p>
      <a href="contact.html" class="cta primary">Start a conversation</a>
    </div>
  </div>
</section>
```

**Step 2: Add styles**

```css
/* ============================================
   FINAL CTA
   ============================================ */
.final-cta {
  padding: 80px 0;
}

.cta-box {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 48px;
  background: linear-gradient(135deg,
    rgba(204, 85, 0, 0.1) 0%,
    rgba(26, 107, 107, 0.1) 100%
  );
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
}

.cta-box h2 {
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 36px);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--cream);
  margin: 0 0 16px;
}

.cta-box p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0 0 28px;
}

.cta.primary {
  background: var(--stripe-orange);
  border-color: var(--stripe-orange);
  color: var(--cream-light);
  padding: 14px 28px;
  font-size: 15px;
}

.cta.primary:hover {
  background: #E05F00;
  border-color: #E05F00;
  box-shadow: var(--glow-orange);
}
```

**Step 3: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add final CTA section"
```

---

## Phase 6: Update Footer

### Task 12: Redesign Footer

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

**Step 1: Replace footer HTML**

```html
<footer class="footer">
  <div class="footer-stripe" aria-hidden="true"></div>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="brand">
          <div class="logoMark" aria-hidden="true"></div>
          <div class="brandName">Supervision<span>Virtual Production</span></div>
        </div>
        <p class="footer-tagline">Production-led virtual production.</p>
      </div>
      <div class="footer-links">
        <span class="footer-label">Navigation</span>
        <a href="work.html">Work</a>
        <a href="how-we-work.html">How We Work</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="footer-contact">
        <span class="footer-label">Get in touch</span>
        <a href="mailto:hello@supervision.film">hello@supervision.film</a>
        <p>UK-based</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Supervision. All rights reserved.</p>
    </div>
  </div>
</footer>
```

**Step 2: Update footer styles**

```css
/* ============================================
   FOOTER
   ============================================ */
.footer {
  position: relative;
  padding: 60px 0 32px;
  background: var(--burgundy-darker);
}

.footer-stripe {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  display: flex;
}

.footer-stripe::before,
.footer-stripe::after {
  content: '';
  height: 100%;
}

.footer-stripe::before {
  flex: 2;
  background: linear-gradient(90deg, var(--stripe-orange) 0%, var(--stripe-orange) 50%, var(--stripe-gold) 50%, var(--stripe-gold) 100%);
}

.footer-stripe::after {
  flex: 1;
  background: var(--stripe-teal);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--border);
}

.footer-brand .brand {
  margin-bottom: 16px;
}

.footer-tagline {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}

.footer-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-subtle);
  margin-bottom: 16px;
}

.footer-links,
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a,
.footer-contact a,
.footer-contact p {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
  transition: color var(--duration-fast) ease;
}

.footer-links a:hover,
.footer-contact a:hover {
  color: var(--cream);
}

.footer-bottom {
  padding-top: 24px;
}

.footer-bottom p {
  font-size: 13px;
  color: var(--text-subtle);
  margin: 0;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

**Step 3: Commit**

```bash
git add index.html styles.css
git commit -m "feat: redesign footer with stripe accent and grid layout"
```

---

## Phase 7: Update Remaining Pages

### Task 13: Update Productions Path Page (vp-commercials.html)

**Files:**
- Modify: `vp-commercials.html`

**Step 1: Restructure the page with new sections**

Replace the entire `<main>` content with the new structure following the design doc. Include:
- Hero with background image placeholder
- How We Work timeline
- Case study cards
- Client logos section
- FAQ accordion
- Final CTA

(Full HTML provided in implementation - approximately 150 lines)

**Step 2: Commit**

```bash
git add vp-commercials.html
git commit -m "feat: redesign productions path page"
```

---

### Task 14: Update In-House Path Page (vp-inhouse.html)

**Files:**
- Modify: `vp-inhouse.html`

**Step 1: Restructure with new sections**

Follow design doc structure:
- Hero
- What it doesn't have to mean (myth-busting)
- Use cases
- How we help (services)
- What to expect
- Final CTA

**Step 2: Commit**

```bash
git add vp-inhouse.html
git commit -m "feat: redesign in-house path page"
```

---

### Task 15: Update Header on All Pages

**Files:**
- Modify: All HTML files

**Step 1: Ensure consistent header across all pages**

All pages should have identical header structure. Copy the header from index.html to:
- about.html
- work.html
- how-we-work.html
- contact.html
- vp-commercials.html
- vp-inhouse.html

**Step 2: Commit**

```bash
git add *.html
git commit -m "chore: sync header across all pages"
```

---

### Task 16: Update Footer on All Pages

**Files:**
- Modify: All HTML files

**Step 1: Copy new footer to all pages**

**Step 2: Commit**

```bash
git add *.html
git commit -m "chore: sync footer across all pages"
```

---

## Phase 8: Polish & Refinement

### Task 17: Add Hover Effects to All Interactive Elements

**Files:**
- Modify: `styles.css`

**Step 1: Audit and enhance hover states**

Ensure consistent hover effects on:
- All links (subtle underline or color shift)
- All buttons (lift + glow)
- All cards (lift + shadow)
- Navigation items (background highlight)

**Step 2: Commit**

```bash
git add styles.css
git commit -m "polish: enhance hover states across all interactive elements"
```

---

### Task 18: Add Parallax to Hero Image

**Files:**
- Modify: `script.js`
- Modify: `styles.css`

**Step 1: Add parallax effect**

```javascript
// Parallax effect for hero image
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    heroVisual.style.transform = `translateY(${rate}px)`;
  }, { passive: true });
}
```

**Step 2: Commit**

```bash
git add script.js
git commit -m "feat: add parallax effect to hero image"
```

---

### Task 19: Add Animated Stripe Gradient

**Files:**
- Modify: `styles.css`

**Step 1: Add keyframe animation for stripes**

```css
@keyframes stripeShimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.footer-stripe::before {
  background: linear-gradient(90deg,
    var(--stripe-orange),
    var(--stripe-gold),
    var(--stripe-orange)
  );
  background-size: 200% 100%;
  animation: stripeShimmer 8s ease infinite;
}
```

**Step 2: Commit**

```bash
git add styles.css
git commit -m "feat: add animated shimmer to stripe accents"
```

---

### Task 20: Final Review & Cleanup

**Files:**
- All files

**Step 1: Remove old/unused CSS**

Audit styles.css for any unused classes from the old design.

**Step 2: Test all pages in browser**

- Check all pages render correctly
- Test all hover effects
- Test all scroll animations
- Test responsive layouts at 320px, 768px, 1024px, 1440px
- Check all links work

**Step 3: Commit**

```bash
git add .
git commit -m "chore: cleanup unused styles and final polish"
```

---

## Summary

**Total Tasks:** 20
**Estimated Implementation:** Methodical execution with visual verification at each step.

**Key Checkpoints:**
- After Task 5: Hero should be visually complete
- After Task 7: Fork section should be interactive
- After Task 11: Homepage should be complete
- After Task 16: All pages should have consistent chrome
- After Task 20: Full site polish complete
