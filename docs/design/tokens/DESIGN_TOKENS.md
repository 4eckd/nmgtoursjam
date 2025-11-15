# Design Tokens

Core design system for NMG Tours Jamaica

## Brand Assets

### Logo
- **Location**: `/public/NMGTOURS.png`
- **Usage**: Main brand logo
- **Formats**: PNG (1680x1680px)
- **Alternative**: Favicon available at `/public/favicon.png`

**Logo Usage Guidelines**:
```tsx
// Next.js Image component
import Image from 'next/image'

<Image
  src="/NMGTOURS.png"
  alt="NMG Tours Jamaica"
  width={200}
  height={200}
  priority // For above-fold logo
/>
```

---

## Color Palette

### Primary Colors (Emerald - Jamaica Theme)

Emerald green represents Jamaica's lush tropical landscapes and vibrant culture.

```css
/* Primary Brand Color - Emerald */
--color-primary: #10b981;           /* Emerald 500 - Main CTAs, links, accents */
--color-primary-light: #34d399;     /* Emerald 400 - Hover states */
--color-primary-lighter: #6ee7b7;   /* Emerald 300 - Backgrounds */
--color-primary-dark: #059669;      /* Emerald 600 - Active states */
--color-primary-darker: #047857;    /* Emerald 700 - Pressed states */

/* Tailwind CSS Classes */
bg-emerald-500    /* Primary buttons, CTAs */
bg-emerald-400    /* Hover states */
bg-emerald-300    /* Light backgrounds */
text-emerald-500  /* Primary text accents */
border-emerald-500 /* Borders, outlines */
```

### Secondary Colors (Neutrals)

```css
/* Black & Dark Grays - Backgrounds, Navigation */
--color-secondary: #000000;         /* Pure black - Nav, footer */
--color-secondary-dark: #18181b;    /* Zinc 900 - Dark sections */
--color-gray-900: #18181b;          /* Zinc 900 */
--color-gray-800: #27272a;          /* Zinc 800 */
--color-gray-700: #3f3f46;          /* Zinc 700 */
--color-gray-600: #52525b;          /* Zinc 600 */
--color-gray-500: #71717a;          /* Zinc 500 */
--color-gray-400: #a1a1aa;          /* Zinc 400 - Secondary text */
--color-gray-300: #d4d4d8;          /* Zinc 300 */
--color-gray-200: #e4e4e7;          /* Zinc 200 - Borders */
--color-gray-100: #f4f4f5;          /* Zinc 100 */
--color-gray-50: #fafafa;           /* Zinc 50 */

/* White & Light Colors - Text, Contrast */
--color-white: #ffffff;             /* White - Primary text on dark */
--color-accent: #ffffff;            /* Accent white */
```

### Gradient Background

Multi-tone gradient for visual depth and tropical feel:

```css
--gradient-primary: linear-gradient(
  135deg,
  #4747475e 15%,    /* Gray with transparency */
  #853e3e83 50%,    /* Red-brown with transparency */
  #55d2836c 90%     /* Emerald with transparency */
);

/* Usage */
background: var(--gradient-primary);
background-repeat: no-repeat;
background-size: cover;
```

### Semantic Colors

```css
/* Success - Green */
--color-success: #10b981;           /* Emerald 500 */
--color-success-light: #d1fae5;     /* Emerald 100 */
--color-success-dark: #047857;      /* Emerald 700 */

/* Warning - Yellow */
--color-warning: #f59e0b;           /* Amber 500 */
--color-warning-light: #fef3c7;     /* Amber 100 */
--color-warning-dark: #d97706;      /* Amber 600 */

/* Error - Red */
--color-error: #ef4444;             /* Red 500 */
--color-error-light: #fee2e2;       /* Red 100 */
--color-error-dark: #dc2626;        /* Red 600 */

/* Info - Blue */
--color-info: #3b82f6;              /* Blue 500 */
--color-info-light: #dbeafe;        /* Blue 100 */
--color-info-dark: #2563eb;         /* Blue 600 */
```

### Component-Specific Colors

```css
/* Overlay backgrounds */
--color-overlay: rgba(0, 0, 0, 0.7);           /* Black with 70% opacity */
--color-overlay-light: rgba(0, 0, 0, 0.5);     /* Black with 50% opacity */

/* Glass morphism */
--color-glass: rgba(0, 0, 0, 0.7);             /* Dark glass */
--backdrop-blur: 12px;                          /* Blur amount */

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

---

## Typography

### Font Families

```css
--font-primary: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-accent: 'Caveat', cursive;
--font-mono: 'Menlo', 'Monaco', 'Courier New', monospace;
```

**Primary Font (Poppins)**:
- Use for: Body text, headings, UI elements
- Weights: 400 (Regular), 600 (SemiBold), 700 (Bold)
- Style: Clean, modern, highly readable

**Accent Font (Caveat)**:
- Use for: Handwritten touches, brand personality
- Weights: 400 (Regular), 700 (Bold)
- Style: Casual, friendly, approachable

### Font Sizes

```css
/* Text sizes */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px - Base size */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
--text-7xl: 4.5rem;      /* 72px */

/* Tailwind CSS classes */
text-xs, text-sm, text-base, text-lg, text-xl,
text-2xl, text-3xl, text-4xl, text-5xl, text-6xl
```

### Font Weights

```css
--font-normal: 400;
--font-semibold: 600;
--font-bold: 700;

/* Tailwind CSS classes */
font-normal, font-semibold, font-bold
```

### Line Heights

```css
--leading-tight: 1.25;    /* Tight spacing */
--leading-normal: 1.5;    /* Normal spacing */
--leading-relaxed: 1.75;  /* Relaxed spacing */
--leading-loose: 2;       /* Loose spacing */

/* Tailwind CSS classes */
leading-tight, leading-normal, leading-relaxed, leading-loose
```

### Typography Scale

```css
/* Headings */
h1 {
  font-size: var(--text-5xl);    /* 48px */
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}

h2 {
  font-size: var(--text-4xl);    /* 36px */
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}

h3 {
  font-size: var(--text-3xl);    /* 30px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
}

h4 {
  font-size: var(--text-2xl);    /* 24px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
}

h5 {
  font-size: var(--text-xl);     /* 20px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
}

h6 {
  font-size: var(--text-lg);     /* 18px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
}

/* Body text */
p {
  font-size: var(--text-base);   /* 16px */
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
}

/* Small text */
small {
  font-size: var(--text-sm);     /* 14px */
}
```

---

## Spacing System

Based on 4px base unit for consistent vertical rhythm.

```css
--space-0: 0;           /* 0px */
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-7: 1.75rem;     /* 28px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
--space-32: 8rem;       /* 128px */

/* Tailwind CSS classes */
p-4, m-4, px-4, py-4, mt-4, mb-4, ml-4, mr-4
gap-4, space-x-4, space-y-4
```

### Common Spacing Patterns

```css
/* Section padding */
--section-padding-y: var(--space-16);  /* 64px top/bottom */
--section-padding-x: var(--space-8);   /* 32px left/right */

/* Card padding */
--card-padding: var(--space-6);        /* 24px */

/* Component gaps */
--gap-sm: var(--space-2);              /* 8px */
--gap-md: var(--space-4);              /* 16px */
--gap-lg: var(--space-6);              /* 24px */
--gap-xl: var(--space-8);              /* 32px */
```

---

## Breakpoints

Responsive breakpoints for mobile-first design.

```css
--mobile: 375px;        /* Small phones */
--tablet: 768px;        /* Tablets */
--desktop: 1024px;      /* Laptops/desktops */
--wide: 1440px;         /* Large desktops */
--container-max: 1400px; /* Max container width */

/* Tailwind CSS breakpoints */
sm: @media (min-width: 640px)
md: @media (min-width: 768px)
lg: @media (min-width: 1024px)
xl: @media (min-width: 1280px)
2xl: @media (min-width: 1536px)
```

### Container Sizes

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1400px;  /* Our custom max */
```

---

## Border Radius

```css
--radius-none: 0;
--radius-sm: 0.125rem;   /* 2px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-3xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* Fully rounded */

/* Tailwind CSS classes */
rounded-none, rounded-sm, rounded-md, rounded-lg,
rounded-xl, rounded-2xl, rounded-3xl, rounded-full
```

### Component Border Radius

```css
--card-radius: var(--radius-xl);      /* 12px */
--button-radius: var(--radius-lg);    /* 8px */
--input-radius: var(--radius-md);     /* 6px */
--badge-radius: var(--radius-full);   /* Fully rounded */
```

---

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
             0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
             0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
             0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
--shadow-none: 0 0 #0000;

/* Tailwind CSS classes */
shadow-sm, shadow-md, shadow-lg, shadow-xl, shadow-2xl
```

---

## Z-Index Scale

```css
--z-0: 0;           /* Base level */
--z-10: 10;         /* Dropdowns */
--z-20: 20;         /* Sticky headers */
--z-30: 30;         /* Modals */
--z-40: 40;         /* Notifications */
--z-50: 50;         /* Tooltips */
--z-auto: auto;
```

---

## Transitions & Animations

```css
/* Duration */
--duration-75: 75ms;
--duration-100: 100ms;
--duration-150: 150ms;
--duration-200: 200ms;
--duration-300: 300ms;
--duration-500: 500ms;
--duration-700: 700ms;
--duration-1000: 1000ms;

/* Timing functions */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Common transitions */
--transition-base: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-colors: color 200ms cubic-bezier(0.4, 0, 0.2, 1),
                     background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-transform: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);

/* Tailwind CSS classes */
transition-all, transition-colors, transition-transform
duration-150, duration-200, duration-300
ease-in, ease-out, ease-in-out
```

---

## Logo & Brand Integration

### Logo with Color Variables

```css
/* Logo container styling */
.logo-container {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* Logo image */
.logo {
  width: 40px;
  height: 40px;
  /* Add emerald glow effect on hover */
  transition: filter var(--duration-300) var(--ease-in-out);
}

.logo:hover {
  filter: drop-shadow(0 0 8px var(--color-primary));
}

/* Logo text (if separate from image) */
.logo-text {
  font-family: var(--font-primary);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-white);
  /* Emerald accent on part of text */
}

.logo-text-accent {
  color: var(--color-primary);
}
```

### Responsive Logo Sizes

```css
/* Mobile */
@media (max-width: 640px) {
  .logo { width: 32px; height: 32px; }
  .logo-text { font-size: var(--text-lg); }
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1023px) {
  .logo { width: 36px; height: 36px; }
  .logo-text { font-size: var(--text-xl); }
}

/* Desktop */
@media (min-width: 1024px) {
  .logo { width: 40px; height: 40px; }
  .logo-text { font-size: var(--text-2xl); }
}
```

---

## Usage Guidelines

### Button Colors

```css
/* Primary button (emerald) */
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
}

.btn-primary:hover {
  background-color: var(--color-primary-light);
}

.btn-primary:active {
  background-color: var(--color-primary-dark);
}

/* Secondary button (outline) */
.btn-secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-secondary:hover {
  background-color: rgba(16, 185, 129, 0.1);
}

/* Ghost button */
.btn-ghost {
  background-color: transparent;
  color: var(--color-white);
  border: 1px solid var(--color-white);
}

.btn-ghost:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
```

### Text Colors

```css
/* Primary text (on dark backgrounds) */
.text-primary {
  color: var(--color-white);
}

/* Secondary text */
.text-secondary {
  color: var(--color-gray-400);
}

/* Accent text (emerald) */
.text-accent {
  color: var(--color-primary);
}

/* On light backgrounds */
.text-dark {
  color: var(--color-gray-900);
}
```

---

## Implementation in app/globals.css

All design tokens are defined in `app/globals.css` using CSS custom properties (CSS variables) for easy theme switching and maintenance.

```css
:root {
  /* All tokens defined here */
  --color-primary: #10b981;
  /* ... etc */
}

/* Tailwind theme configuration uses these tokens */
@theme inline {
  --color-primary: var(--color-primary);
  /* ... etc */
}
```

---

## Quick Reference

**Primary Actions**: `bg-emerald-400 hover:bg-emerald-300 text-white`
**Secondary Actions**: `border-emerald-400 text-emerald-400 hover:bg-emerald-400/10`
**Text on Dark**: `text-white`
**Text on Light**: `text-zinc-900`
**Borders**: `border-zinc-200` (light) or `border-zinc-700` (dark)
**Shadows**: `shadow-md` (default), `shadow-lg` (elevated)
**Rounded Corners**: `rounded-xl` (cards), `rounded-lg` (buttons)
**Spacing**: `p-6` (cards), `gap-4` (flex grids), `mt-8` (sections)

---

**Last Updated**: 2025-11-15
**Version**: 1.0
