# Supervision Website Prototyping

## Project Overview

This is a website prototype for Supervision, a UK-based virtual production consulting company. The site is built with plain HTML, CSS, and vanilla JavaScript (no frameworks).

## Project Structure

```
v1/                     # Current working version
├── index.html          # Homepage
├── work.html           # Portfolio page
├── how-we-work.html    # Methodology page
├── about.html          # Company info
├── contact.html        # Contact page
├── vp-commercials.html # VP for productions product page
├── vp-inhouse.html     # VP in-house product page
├── styles.css          # All styling (single file)
├── script.js           # Scroll animations and interactions
└── DESIGN-SYSTEM.md    # Design system documentation
```

## Design System

**Important:** Before making any visual changes, read `v1/DESIGN-SYSTEM.md`. It documents:

- Color palette and CSS variables
- Typography (fonts, scales, usage)
- The signature stripe accent system (orange/gold + teal)
- Component patterns (buttons, cards, navigation)
- Animation and interaction patterns
- Layout guidelines and responsive breakpoints

The design aesthetic is premium, cinematic, and production-forward. Key things to maintain:

- **Fonts:** Bebas Neue (display) + Archivo Narrow (body) — do NOT use Inter, Plus Jakarta Sans, or generic fonts
- **Colors:** Deep burgundy background with cream text and orange/gold/teal accents
- **Stripes:** The colored stripe accents are the brand's signature element
- **Texture:** Subtle film grain overlay for depth

## Tech Stack

- Pure HTML5, CSS3, JavaScript (ES6)
- No build process or bundlers
- Google Fonts for typography
- CSS custom properties for theming
- Intersection Observer for scroll animations
