# Brand Alignment Update — Design Document

**Date:** 2026-02-06
**Source:** Brand guidelines at `supervision-docs/public/brand/index.html`

## Summary

Update the Supervision website to align with the official brand guidelines. Three categories of change: font swap, color updates, and documentation.

## 1. Font Change

Swap the body font from Plus Jakarta Sans to Archivo Narrow.

- **Google Fonts import:** Replace `Plus+Jakarta+Sans:wght@400;500;600;700` with `Archivo+Narrow:wght@400;500;600;700`
- **CSS variable:** `--font-body: 'Archivo Narrow', 'Helvetica Neue', Arial, sans-serif`
- **Line-height:** Reduce `.lede` and `.hero-content .lede` line-height from 1.75–1.8 to 1.65
- Bebas Neue (display font) stays unchanged

## 2. Color Updates

### Core colors

| Variable | Old | New |
|----------|-----|-----|
| `--burgundy` | `#7A1820` | `#7B0F0F` |
| `--burgundy-dark` | `#5C1216` | `#5C0A0A` |
| `--burgundy-darker` | `#3D0B0E` | `#3A0808` |
| `--cream` | `#F5E6D3` | `#FFEBC8` |
| `--cream-light` | `#FDF8F3` | `#FFFDF8` |
| `--stripe-orange` | `#E85D04` | `#D95A02` |
| `--stripe-gold` | `#E9B44C` | `#E6A32F` |
| `--stripe-teal` | `#1B8585` | `#0E5B66` |

### Functional colors (cream rgba: 245,230,211 → 255,235,200)

- `--text-muted: rgba(255, 235, 200, 0.78)`
- `--text-subtle: rgba(255, 235, 200, 0.5)`
- `--border: rgba(255, 235, 200, 0.1)`
- `--border-hover: rgba(255, 235, 200, 0.22)`
- All other `rgba(245, 230, 211, ...)` instances in styles.css

### Glow/shadow rgba values

- Orange: `rgba(232, 93, 4, ...)` → `rgba(217, 90, 2, ...)`
- Teal: `rgba(27, 133, 133, ...)` → `rgba(14, 91, 102, ...)`
- Gold: `rgba(233, 180, 76, ...)` → `rgba(230, 163, 47, ...)`

### Header background

- `rgba(139, 28, 35, ...)` → `rgba(123, 15, 15, ...)`

### CTA primary hover

- `#F06B10` → `#E66A10` (slightly adjusted to match new orange)

### Inline styles

- `contact.html` line 41: `rgba(245,230,211,.82)` → `rgba(255,235,200,.82)`

## 3. Documentation

Update `v1/DESIGN-SYSTEM.md` to reflect:
- New font (Archivo Narrow replacing Plus Jakarta Sans)
- New color hex values
- Updated rgba values in code examples

## Files Affected

1. `v1/styles.css` — font import, all variables and rgba references
2. `v1/contact.html` — one inline style fix
3. `v1/DESIGN-SYSTEM.md` — documentation update

## Out of Scope

- Component restructuring
- Layout/spacing changes
- Animation timing changes
- JavaScript changes
- New pages or sections
