# Brand Alignment: Editorial Redesign

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Shift the Supervision website from dark-burgundy-cinematic to warm-white-editorial, matching the refined feel of the brand guidelines at docs.supervisionvp.com/brand.

**Architecture:** Pure CSS overhaul of `v1/styles.css`. Light warm-white (#FFFDF8) body background with charcoal (#2A2A2A) text. Burgundy becomes an accent for header, hero, and select feature sections. Stripes become clean graphic elements without glowing shadows. Cards get subtle light-on-white shadows. Typography hierarchy tightened to match brand guidelines spec.

**Tech Stack:** CSS custom properties, existing HTML structure (no HTML changes needed for most tasks)

---

### Task 1: Flip the Foundation — CSS Custom Properties

**Files:**
- Modify: `v1/styles.css` (lines 1-49, the `:root` block)

**Step 1: Replace the CSS custom properties**

Replace the `:root` variable block with light-foundation values:

```css
:root {
  /* Core brand colors - per brand guidelines */
  --burgundy: #7B0F0F;
  --burgundy-dark: #5C0A0A;
  --burgundy-darker: #3A0808;
  --cream: #FFEBC8;
  --cream-light: #FFFDF8;

  /* Signature stripe colors - per brand guidelines */
  --stripe-orange: #D95A02;
  --stripe-gold: #E6A32F;
  --stripe-teal: #0E5B66;

  /* NEW: Light-mode foundation */
  --bg: #FFFDF8;
  --bg-warm: #FFF8ED;
  --bg-burgundy: #7B0F0F;
  --charcoal: #2A2A2A;
  --charcoal-muted: #555;
  --charcoal-subtle: #888;

  /* Functional colors - now dark-on-light */
  --text: var(--charcoal);
  --text-muted: var(--charcoal-muted);
  --text-subtle: var(--charcoal-subtle);
  --border: rgba(42, 42, 42, 0.1);
  --border-hover: rgba(42, 42, 42, 0.2);

  /* Light-on-dark variants (for burgundy sections) */
  --text-on-dark: var(--cream);
  --text-on-dark-muted: rgba(255, 235, 200, 0.78);
  --text-on-dark-subtle: rgba(255, 235, 200, 0.5);
  --border-on-dark: rgba(255, 235, 200, 0.1);
  --border-on-dark-hover: rgba(255, 235, 200, 0.22);

  /* Shadows & Effects - refined, no glows */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 40px rgba(0,0,0,0.12);

  /* Layout */
  --radius: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --max-width: 1200px;
  --header-height: 72px;

  /* Typography */
  --font-display: 'Bebas Neue', 'Arial Narrow', sans-serif;
  --font-body: 'Archivo Narrow', 'Helvetica Neue', Arial, sans-serif;

  /* Animation */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 0.2s;
  --duration-normal: 0.35s;
  --duration-slow: 0.7s;
}
```

Key changes:
- Added `--bg`, `--bg-warm`, `--charcoal` family for light foundation
- `--text` now points to charcoal instead of cream
- Added `--text-on-dark` variants for burgundy sections
- Shadows reduced from heavy (0.35-0.45 alpha) to subtle (0.06-0.12)
- Removed all `--glow-*` variables
- Max-width tightened from 1400px to 1200px (more editorial)

**Step 2: Update body and background**

Replace the body styles and body::before/::after with:

```css
body {
  margin: 0;
  padding: 0;
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Remove `body::before` (atmospheric gradient) entirely.
Remove `body::after` (film grain) entirely.

**Step 3: Verify in browser**

Open `v1/index.html`. The page should now have a warm white background with dark text. The header and dark sections will look broken (they still reference old variables) — that's expected. We fix those next.

---

### Task 2: Header — Burgundy Bar on Light Page

**Files:**
- Modify: `v1/styles.css` (header section, ~lines 115-298)

**Step 1: Restyle the header for dark-on-light**

```css
header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-burgundy);
  border-bottom: none;
  transition: box-shadow var(--duration-normal) ease;
}

header.scrolled {
  box-shadow: var(--shadow-md);
}
```

**Step 2: Update nav link colors for dark header**

Nav links should use the light-on-dark palette since header is burgundy:

```css
.navlinks a {
  color: var(--text-on-dark-muted);
}
.navlinks a:hover {
  color: var(--text-on-dark);
}
.navlinks a.active {
  color: var(--text-on-dark);
}
```

**Step 3: Update brand name for dark header**

```css
.brandName {
  color: var(--cream);
}
.brandName span {
  color: var(--text-on-dark-muted);
}
```

**Step 4: Update CTA button in header**

The header CTA should be light-on-dark:

```css
.cta {
  /* Base CTA style - works on light backgrounds */
  color: var(--text);
  background: transparent;
  border: 1.5px solid var(--border-hover);
}
.cta:hover {
  background: rgba(42, 42, 42, 0.05);
  border-color: var(--charcoal);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}
```

Add a new `.cta-on-dark` utility or scope the header CTA:

```css
header .cta {
  color: var(--text-on-dark);
  border-color: var(--border-on-dark);
  background: rgba(255, 235, 200, 0.06);
}
header .cta:hover {
  background: rgba(255, 235, 200, 0.12);
  border-color: var(--border-on-dark-hover);
  box-shadow: none;
}
```

Remove the `.cta::before` shimmer sweep effect — too flashy for editorial feel.

**Step 5: Update `.cta.primary`**

```css
.cta.primary {
  background: var(--stripe-orange);
  border-color: var(--stripe-orange);
  color: #fff;
}
.cta.primary:hover {
  background: #E66A10;
  border-color: #E66A10;
  box-shadow: var(--shadow-md);
}
```

**Step 6: Verify** — Header should be a clean burgundy bar with cream text, sitting on top of the warm white page.

---

### Task 3: Hero Section — Clean Editorial Layout

**Files:**
- Modify: `v1/styles.css` (hero section, ~lines 300-542)

**Step 1: Update hero-split for light background**

The hero sits on the light body. Text should be dark:

```css
.hero-content h1 {
  color: var(--charcoal);
}

.hero-content .lede {
  color: var(--text-muted);
}

.hero-content .kicker {
  color: var(--stripe-orange);
}
.hero-content .kicker::after {
  background: linear-gradient(90deg, var(--stripe-orange), transparent);
}
```

**Step 2: Update hero image placeholder**

```css
.hero-image-placeholder {
  background: var(--bg-warm);
  border: 1px solid var(--border);
}

.placeholder-text {
  color: var(--text-subtle);
}
```

**Step 3: Refine hero stripes — graphic, not glowing**

```css
.hero-stripes::before {
  background: linear-gradient(90deg, var(--stripe-orange), var(--stripe-gold));
  box-shadow: none;
}
.hero-stripes::after {
  background: var(--stripe-teal);
  box-shadow: none;
}
```

**Step 4: Update client logos and labels**

```css
.logo-label {
  color: var(--text-subtle);
}
.client-logo {
  color: var(--text-muted);
  opacity: 0.6;
}
.client-logo:hover {
  opacity: 1;
}
```

**Step 5: Standard hero (non-split, used on subpages)**

```css
h1 {
  color: var(--charcoal);
}
.kicker {
  color: var(--stripe-orange);
}
.kicker::after {
  background: linear-gradient(90deg, var(--stripe-orange), transparent);
}
.lede {
  color: var(--text-muted);
}
```

**Step 6: Verify** — Hero section should feel like a magazine spread. Warm white bg, confident dark typography, clean stripe accents.

---

### Task 4: Fork Section — Burgundy Accent Section

**Files:**
- Modify: `v1/styles.css` (fork section, ~lines 667-860)

This section should stay dark (burgundy background) as a feature moment — a dark band breaking up the light page.

**Step 1: Style fork section as dark accent band**

```css
.fork-section {
  padding: 100px 0;
  background: var(--bg-burgundy);
  border-top: none;
  border-bottom: none;
}

.fork-intro h2 {
  color: var(--cream);
}
```

**Step 2: Fork cards on dark background**

```css
.fork-card {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-on-dark);
}
.fork-card:hover {
  border-color: var(--border-on-dark-hover);
  box-shadow: 0 8px 40px rgba(0,0,0,0.3);
}

.fork-card h3 {
  color: var(--cream);
}
.fork-card p {
  color: var(--text-on-dark-muted);
}
.fork-card-cta {
  color: var(--stripe-gold);
  border-top-color: var(--border-on-dark);
}
.fork-card-reveal li {
  color: var(--text-on-dark-muted);
}
```

**Step 3: Clean up stripe accents on fork cards**

Remove glow box-shadows from fork card stripes:

```css
.fork-card--productions .fork-card-stripe {
  box-shadow: none;
}
.fork-card--inhouse .fork-card-stripe {
  box-shadow: none;
}
.fork-card--productions:hover .fork-card-stripe {
  box-shadow: none;
}
.fork-card--inhouse:hover .fork-card-stripe {
  box-shadow: none;
}
```

**Step 4: Verify** — Fork section should be a confident dark burgundy band with clean cards. Stripes are graphic, not glowing.

---

### Task 5: Social Proof & Differentiators — Light Sections

**Files:**
- Modify: `v1/styles.css` (social proof + differentiators, ~lines 1148-1266)

**Step 1: Social proof on light background**

```css
.social-proof {
  padding: 64px 0;
  background: var(--bg);
  text-align: center;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.proof-text {
  color: var(--charcoal);
}
.proof-logos .client-logo {
  color: var(--text-muted);
}
```

**Step 2: Differentiators on light background**

```css
.differentiators {
  padding: 100px 0;
}

.diff-card {
  background: var(--bg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}
.diff-card:hover {
  background: var(--bg);
  border-color: var(--border-hover);
  box-shadow: var(--shadow-md);
}

.diff-card h3 {
  color: var(--charcoal);
}
.diff-card p {
  color: var(--text-muted);
}
```

**Step 3: Remove glow from diff dots**

```css
.diff-card:nth-child(1):hover .diff-dot { box-shadow: none; }
.diff-card:nth-child(2):hover .diff-dot { box-shadow: none; }
.diff-card:nth-child(3):hover .diff-dot { box-shadow: none; }
```

**Step 4: Verify** — These sections should feel clean and airy on white.

---

### Task 6: Featured Work & Cards — Light Editorial

**Files:**
- Modify: `v1/styles.css` (featured work + cards, ~lines 592-665 and 1268-1424)

**Step 1: General card style for light background**

```css
.card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: all var(--duration-normal) var(--ease-out);
}
.card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.card.subtle {
  background: var(--bg-warm);
  box-shadow: none;
}
.card h3 {
  color: var(--charcoal);
}
.card p {
  color: var(--text-muted);
}
```

**Step 2: Featured work section**

```css
.featured-work {
  padding: 100px 0;
  background: var(--bg-warm);
}

.section-header h2 {
  color: var(--charcoal);
}

.smallcaps {
  color: var(--text-subtle);
}
```

**Step 3: Work cards on warm background**

```css
.work-card {
  background: var(--bg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}
.work-card:hover {
  box-shadow: var(--shadow-lg);
}
.work-card::before {
  background: linear-gradient(180deg, transparent 50%, rgba(255, 253, 248, 0.95) 100%);
  opacity: 0;
}
.work-card-image {
  background: var(--bg-warm);
}
.work-card-tag {
  color: var(--stripe-orange);
}
.work-card h3 {
  color: var(--charcoal);
}
.work-card p {
  color: var(--text-muted);
}
.work-card-hover {
  color: var(--stripe-orange);
}
```

**Step 4: Verify** — Cards should feel like editorial content blocks. Clean white on warm cream.

---

### Task 7: CTA Box & Footer

**Files:**
- Modify: `v1/styles.css` (CTA + footer, ~lines 1426-1003)

**Step 1: CTA box on light page**

```css
.cta-box {
  background: var(--bg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
}
.cta-box::before {
  /* Keep the stripe - it's a nice graphic element */
}
.cta-box h2 {
  color: var(--charcoal);
}
.cta-box p {
  color: var(--text-muted);
}
```

**Step 2: Footer — dark burgundy**

Footer stays dark as the anchor:

```css
.footer {
  background: var(--bg-burgundy);
}

.footer-stripe::before {
  box-shadow: none;
}
.footer-stripe::after {
  box-shadow: none;
}

.footer-tagline {
  color: var(--text-on-dark-muted);
}
.footer-label {
  color: var(--text-on-dark-subtle);
}
.footer-links a,
.footer-contact a,
.footer-contact p {
  color: var(--text-on-dark-muted);
}
.footer-links a:hover,
.footer-contact a:hover {
  color: var(--cream);
}
.footer-bottom p {
  color: var(--text-on-dark-subtle);
}
.footer-grid {
  border-bottom-color: var(--border-on-dark);
}
```

**Step 3: Verify** — CTA box clean on white. Footer is a grounding dark burgundy band.

---

### Task 8: Utility & Polish Pass

**Files:**
- Modify: `v1/styles.css` (various)

**Step 1: Links**

```css
a {
  color: var(--stripe-orange);
  transition: color 0.2s ease;
}
a:hover {
  color: var(--burgundy);
}
```

**Step 2: Breadcrumbs**

```css
.breadcrumbs {
  color: var(--text-subtle);
}
.breadcrumbs a {
  color: var(--text-muted);
}
.breadcrumbs a:hover {
  color: var(--text);
}
```

**Step 3: HR divider**

```css
.hr {
  background: var(--border);
}
```

**Step 4: List text**

```css
.list {
  color: var(--text-muted);
}
.list b {
  color: var(--text);
}
```

**Step 5: Pills**

```css
.pill {
  color: var(--text-muted);
  background: var(--bg-warm);
  border: 1px solid var(--border);
}
.pill:hover {
  background: rgba(42, 42, 42, 0.05);
  border-color: var(--border-hover);
}
```

**Step 6: Section titles**

```css
.sectionTitle {
  color: var(--text-subtle);
}
```

**Step 7: Remove the logoMark glow box-shadows**

```css
.logoMark::before {
  box-shadow: none;
}
.logoMark::after {
  box-shadow: none;
}
```

**Step 8: Verify full site** — Open each page and confirm the editorial feel is consistent. Light, warm, clean.

---

### Task 9: Update DESIGN-SYSTEM.md

**Files:**
- Modify: `v1/DESIGN-SYSTEM.md`

Update the design system documentation to reflect the new light-editorial direction. Update color usage descriptions, shadow values, and the overall design philosophy to match the brand guidelines alignment.
