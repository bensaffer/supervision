# Supervision Design System

This document describes the design system for the Supervision website. Follow these guidelines when making changes or adding new components.

## Brand Overview

Supervision is a virtual production consulting company. The design aesthetic is **premium, cinematic, and production-forward** - sophisticated dark tones with signature colorful accents that represent the brand's creative expertise.

---

## Content Philosophy

Inspired by Steve Jobs' "Think Different" marketing philosophy: **don't sell the technology, sell what you stand for.**

### Core Principle

Supervision's website should never lead with the tech stack (LED walls, Unreal Engine, camera tracking). Instead, lead with the creative visions we help realise, the productions we enable, and the collaborative approach we bring.

### The Analogy

- **Nike** doesn't sell shoes — they honour great athletes.
- **Supervision** doesn't sell VP tech — we enable creative vision.

### In Practice

- Talk about the **production**, not the pipeline
- Talk about the **outcome**, not the toolchain
- Talk about **working alongside teams**, not delivering services
- Technology choices are a means, not the message
- Name the work and the people, not the specs

### What Supervision Stands For

- Starting with the creative vision, not the technology
- Working collaboratively alongside production teams
- Independence and honest, tool-agnostic guidance
- Making VP accessible and practical, not mystifying it

---

## Color Palette

### Core Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--burgundy` | `#7B0F0F` | Primary background, brand color |
| `--burgundy-dark` | `#5C0A0A` | Darker sections, gradients |
| `--burgundy-darker` | `#3A0808` | Deepest background, footer |
| `--cream` | `#FFEBC8` | Primary text color |
| `--cream-light` | `#FFFDF8` | Highlighted text, button text |

### Signature Stripe Colors

These three colors form the brand's signature accent system - used for stripes, glows, and highlights:

| Variable | Value | Usage |
|----------|-------|-------|
| `--stripe-orange` | `#D95A02` | Primary accent, CTAs, energy |
| `--stripe-gold` | `#E6A32F` | Secondary accent, labels, kickers |
| `--stripe-teal` | `#0E5B66` | Tertiary accent, contrast element |

### Functional Colors

```css
--text: var(--cream);                      /* Primary text */
--text-muted: rgba(255, 235, 200, 0.78);   /* Secondary text */
--text-subtle: rgba(255, 235, 200, 0.5);   /* Tertiary text, labels */
--border: rgba(255, 235, 200, 0.1);        /* Default borders */
--border-hover: rgba(255, 235, 200, 0.22); /* Hover state borders */
```

### Shadows & Glows

```css
--shadow-sm: 0 2px 8px rgba(0,0,0,0.2);
--shadow-md: 0 12px 40px rgba(0,0,0,0.35);
--shadow-lg: 0 24px 60px rgba(0,0,0,0.45);
--glow-orange: 0 0 80px rgba(217, 90, 2, 0.25);
--glow-teal: 0 0 80px rgba(14, 91, 102, 0.2);
--glow-gold: 0 0 60px rgba(230, 163, 47, 0.15);
```

---

## Typography

### Font Families

| Variable | Font | Usage |
|----------|------|-------|
| `--font-display` | Bebas Neue | Headlines, section titles, card titles |
| `--font-body` | Archivo Narrow | Body text, paragraphs, UI elements |

**Important:** Do NOT use Inter, Roboto, Plus Jakarta Sans, or generic system fonts. Archivo Narrow is the brand-specified body font.

### Display Typography (Bebas Neue)

Always uppercase. Use for headlines and titles only.

| Element | Size | Properties |
|---------|------|------------|
| Hero h1 | `clamp(46px, 5.5vw, 72px)` | `line-height: 0.96`, `letter-spacing: 0.008em` |
| Section h2 | `clamp(32px, 4.5vw, 48px)` | `letter-spacing: 0.02em` |
| Card h3 | `clamp(26px, 2.5vw, 32px)` | `letter-spacing: 0.02em` |

### Body Typography (Archivo Narrow)

| Element | Size | Line Height |
|---------|------|-------------|
| Body/Lede | 17-18px | 1.6-1.65 |
| Card text | 16-17px | 1.6-1.65 |
| Small text | 15px | 1.6 |
| Labels/Kickers | 11px | uppercase, `letter-spacing: 0.25em` |

### Kicker Style

Kickers (small labels above headlines) use gold color with an underline accent:

```css
.kicker {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--stripe-gold);
}
.kicker::after {
  /* Gold gradient underline */
  background: linear-gradient(90deg, var(--stripe-gold), transparent);
}
```

---

## Layout

### Container

```css
--max-width: 1400px;
padding: 0 48px; /* 24px on mobile */
```

### Section Spacing

- Standard section padding: `100px 0`
- Smaller sections (social proof): `64px 0`

### Grid Patterns

**Two-column equal:** `grid-template-columns: repeat(2, 1fr)` with `gap: 32px`

**Three-column:** `grid-template-columns: repeat(3, 1fr)` with `gap: 48px`

**Hero split:** `grid-template-columns: 1fr 1fr` with `gap: 80px`

### Border Radius

```css
--radius: 12px;      /* Buttons, small elements */
--radius-lg: 20px;   /* Cards */
--radius-xl: 28px;   /* Large cards, hero images */
```

---

## The Signature Stripe System

The stripe accent is the brand's most distinctive visual element. It consists of an orange-gold gradient bar paired with a teal bar.

### Logo Mark

Two stacked bars that animate on hover:

```css
.logoMark::before {
  background: linear-gradient(90deg, var(--stripe-orange), var(--stripe-gold));
  box-shadow: 0 0 12px rgba(217, 90, 2, 0.3);
}
.logoMark::after {
  background: var(--stripe-teal);
  box-shadow: 0 0 12px rgba(14, 91, 102, 0.25);
}
```

### Section Stripes

Used on hero images, footer, and CTA boxes:

- **Hero stripes:** Positioned bottom-right of hero image, slightly skewed (`transform: skewX(-3deg)`)
- **Footer stripe:** Full-width at top of footer, animated shimmer on orange-gold, pulse on teal
- **CTA box stripe:** Gradient across top using all three colors

### Card Stripes

Fork cards have colored top stripes that expand on hover:

- Productions card: Teal stripe
- In-house card: Orange-gold gradient

```css
.fork-card-stripe {
  height: 5px; /* Expands to 8px on hover */
  transition: height var(--duration-normal) var(--ease-spring);
}
```

---

## Components

### Buttons (CTA)

```html
<a class="cta" href="#">Default Button</a>
<a class="cta primary" href="#">Primary Button</a>
```

- Default: Semi-transparent with cream border
- Primary: Orange background with glow on hover
- Both have shimmer sweep effect on hover
- Lift effect: `transform: translateY(-2px)` on hover

### Cards

**Standard Card:**
```css
.card {
  background: linear-gradient(180deg, rgba(123, 15, 15, 0.5), rgba(92, 10, 10, 0.35));
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
}
```

**Fork Card:** Large interactive cards with stripe accent, reveal content on hover

**Diff Card:** Left-aligned with colored dot indicator, subtle background

**Work Card:** Image card with gradient overlay, hover reveals "View project" CTA

### Pills

Rounded tags for metadata:

```html
<span class="pill"><span class="dot teal"></span> Label</span>
```

### Navigation

Nav links have animated underlines that grow from center on hover:

```css
.navlinks a::after {
  background: linear-gradient(90deg, var(--stripe-gold), var(--stripe-orange));
  /* Width animates from 0 to 24px on hover */
}
```

---

## Animation

### Timing

```css
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);    /* Smooth deceleration */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy, playful */
--duration-fast: 0.2s;
--duration-normal: 0.35s;
--duration-slow: 0.7s;
```

### Scroll Animations

Elements with `.animate-on-scroll` fade in and slide up when visible:

```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
}
.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

Use `.stagger-1`, `.stagger-2`, `.stagger-3` for sequential reveal delays.

### Hover Interactions

- **Cards:** Lift up 4-6px with enhanced shadow
- **Buttons:** Lift 2px with shimmer sweep
- **Stripes:** Expand height, add glow
- **Dots:** Scale up 1.2-1.3x with colored glow
- **Images:** Scale 1.08x

---

## Background & Texture

### Gradient Background

The body has layered radial gradients creating atmospheric glows:

```css
body::before {
  background:
    radial-gradient(ellipse at 15% -10%, rgba(orange) ...),
    radial-gradient(ellipse at 85% 5%, rgba(teal) ...),
    radial-gradient(ellipse at 50% 110%, rgba(gold) ...),
    linear-gradient(175deg, burgundy colors);
}
```

### Film Grain

A subtle SVG noise texture overlay adds cinematic depth:

```css
body::after {
  background-image: url("data:image/svg+xml,...noise filter...");
  opacity: 0.025;
  mix-blend-mode: overlay;
}
```

---

## Responsive Breakpoints

| Breakpoint | Usage |
|------------|-------|
| `1024px` | Hero stacks, nav collapses |
| `900px` | Fork cards stack, diff cards stack |
| `768px` | Work cards stack, smaller typography |

### Mobile Considerations

- Container padding reduces to 24px
- Centered text alignment for stacked layouts
- Kicker underlines center themselves
- Card reveal content shows by default (no hover on touch)

---

## File Structure

```
v1/
├── index.html          # Homepage
├── work.html           # Portfolio
├── how-we-work.html    # Methodology
├── about.html          # Company info
├── contact.html        # Contact page
├── vp-commercials.html # Product page
├── vp-inhouse.html     # Product page
├── styles.css          # All styles (single file)
├── script.js           # Scroll animations
└── DESIGN-SYSTEM.md    # This file
```

---

## Do's and Don'ts

### Do

- Use the signature stripe colors for accents and highlights
- Maintain generous whitespace and padding
- Use Bebas Neue for headlines (always uppercase)
- Add glow effects to interactive stripe elements
- Use the spring easing for playful micro-interactions

### Don't

- Use Inter, Roboto, Plus Jakarta Sans, or generic fonts
- Create thin columns of text (aim for 50-70ch line length)
- Use flat colors without gradients or depth
- Forget the film grain texture overlay
- Add stripes without the proper glow shadows
- Use purple gradients or other "AI slop" aesthetics

---

## Adding New Sections

When adding a new section:

1. Wrap content in `.container`
2. Use `padding: 100px 0` for vertical spacing
3. Add `.animate-on-scroll` to key elements
4. Use stagger classes for sequential reveals
5. Follow existing typography scale
6. Consider adding stripe accents for visual interest

```html
<section class="new-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="smallcaps">Label</span>
      <h2>Section Title</h2>
    </div>
    <!-- Content with .animate-on-scroll .stagger-1, .stagger-2, etc. -->
  </div>
</section>
```
