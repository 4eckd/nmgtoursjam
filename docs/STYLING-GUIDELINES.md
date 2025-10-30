# NMG Tours Jamaica - Styling Guidelines

**Version**: 2.0.0
**Last Updated**: 2025-10-29
**Status**: Living Document

This document defines the comprehensive styling standards for the NMG Tours Jamaica platform, ensuring visual consistency, accessibility, and adherence to the Jamaican-inspired brand identity.

---

## 🚨 CRITICAL RULE: NO HARD-CODED VALUES

**ALL styling values MUST use CSS variables or Tailwind theme tokens. Direct color codes, pixel values, and hard-coded sizes are STRICTLY PROHIBITED.**

### Why This Matters
- **Consistency**: One source of truth for all design tokens
- **Maintainability**: Change once, update everywhere
- **Themability**: Easy dark/light mode switching
- **Scalability**: Design system scales with the project
- **Performance**: CSS variables enable runtime theming

### Enforcement
```tsx
// ❌ NEVER DO THIS - Hard-coded values
<div className="text-[#10b981] bg-[#000000] p-[24px]">
<button style={{ color: '#fff', padding: '1rem 1.5rem' }}>

// ✅ ALWAYS DO THIS - Variables and tokens
<div className="text-primary bg-surface-dark p-6">
<button className="text-white px-6 py-3">
```

**All PRs will be rejected if they contain hard-coded CSS values.**

---

## 🎨 Brand Identity

### Core Philosophy
NMG Tours Jamaica represents authentic Jamaican experiences through a modern, vibrant, and welcoming visual identity that reflects the island's natural beauty and cultural richness.

### Brand Attributes
- **Authentic**: Genuine local experiences, not touristy
- **Vibrant**: Energetic colors reflecting Jamaica's lush landscapes
- **Welcoming**: Warm and approachable design
- **Professional**: Trustworthy and reliable booking platform
- **Sustainable**: Eco-conscious tourism practices

---

## 🎨 CSS Variable System

### Design Token Architecture

All colors, spacing, typography, and effects are defined as CSS variables in `app/globals.css`. Components MUST use these variables via Tailwind theme extensions.

**Variable Naming Convention**:
```css
--{category}-{variant}-{modifier}

Examples:
--color-primary         /* Brand emerald green */
--color-primary-hover   /* Lighter emerald for hovers */
--color-primary-active  /* Darker emerald for active */
--spacing-section       /* Standard section padding */
--radius-card          /* Card border radius */
```

### CSS Variable Categories

1. **Colors**: `--color-*` (brand, semantic, surfaces)
2. **Spacing**: `--spacing-*` (containers, sections, elements)
3. **Typography**: `--font-*`, `--text-*`, `--leading-*`
4. **Effects**: `--shadow-*`, `--blur-*`, `--opacity-*`
5. **Borders**: `--radius-*`, `--border-*`
6. **Z-Index**: `--z-*` (layering system)

### Accessing Variables in Components

```tsx
// ✅ Via Tailwind theme tokens
<div className="bg-primary text-on-primary">

// ✅ Via Tailwind utilities with theme variables
<div className="bg-surface-dark text-content-primary">

// ❌ NEVER use arbitrary values with hard-coded colors
<div className="bg-[#10b981] text-[#ffffff]">

// ❌ NEVER use inline styles with hard-coded values
<div style={{ backgroundColor: '#10b981' }}>
```

---

## 🌈 Color System

### Primary Brand Colors

#### Emerald Green (Primary)
**CSS Variables** (defined in `globals.css`):
```css
--color-primary: #10b981;           /* Emerald-500 - Main brand */
--color-primary-hover: #34d399;     /* Emerald-400 - Hover states */
--color-primary-active: #059669;    /* Emerald-600 - Active states */
--color-primary-muted: rgba(16, 185, 129, 0.1);  /* 10% opacity */
```

**Tailwind Theme Tokens** (use these in components):
```tsx
// Primary colors via theme
bg-primary              → var(--color-primary)
bg-primary-hover        → var(--color-primary-hover)
bg-primary-active       → var(--color-primary-active)
bg-primary/10           → var(--color-primary) at 10% opacity
text-primary            → var(--color-primary)
border-primary          → var(--color-primary)
```

**Usage**:
- Primary call-to-action buttons
- Interactive elements (links, hover states)
- Brand accents and highlights
- Featured badges and tags

**Examples**:
```tsx
// ✅ CORRECT - Using theme tokens
<button className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white">
  Book Now
</button>

// ✅ CORRECT - Using semantic class names
<a className="text-primary hover:text-primary-hover">Tours</a>

// ✅ CORRECT - Using theme with opacity
<span className="bg-primary text-white">Featured</span>

// ❌ WRONG - Hard-coded color values
<button className="bg-emerald-500 hover:bg-emerald-400">Book Now</button>
<button className="bg-[#10b981]">Book Now</button>
```

#### Black & Dark Grays (Secondary)
```css
/* Backgrounds, text, navigation */
--black: #000000
--zinc-900: #18181b  /* Dark backgrounds */
--zinc-800: #27272a  /* Cards, containers */
--zinc-700: #3f3f46  /* Borders, dividers */
```

**Usage**:
- Navigation bars and headers
- Dark mode backgrounds
- Card backgrounds with transparency
- Text on light backgrounds

**Examples**:
```tsx
// Navigation
<nav className="bg-black/90 backdrop-blur-md">

// Card
<div className="bg-zinc-800/70 backdrop-blur-sm">

// Text
<h1 className="text-zinc-900">
```

#### White & Light Colors (Contrast)
```css
/* Text, contrast elements */
--white: #ffffff
--zinc-100: #f4f4f5  /* Light backgrounds */
--zinc-200: #e4e4e7  /* Borders */
--zinc-400: #a1a1aa  /* Secondary text */
```

**Usage**:
- Primary text on dark backgrounds
- Light backgrounds for content areas
- Secondary text and metadata
- Card borders

**Examples**:
```tsx
// Text on dark
<p className="text-white">Main content</p>
<p className="text-zinc-400">Secondary info</p>

// Light background
<section className="bg-zinc-100">
```

### Accent & Semantic Colors

#### Success (Green)
```css
--green-500: #22c55e   /* Success messages */
--green-600: #16a34a   /* Success hover */
```

#### Warning (Yellow/Amber)
```css
--amber-500: #f59e0b   /* Warnings */
--amber-600: #d97706   /* Warning hover */
```

#### Error (Red)
```css
--red-500: #ef4444     /* Errors, deletions */
--red-600: #dc2626     /* Error hover */
```

#### Info (Blue)
```css
--blue-500: #3b82f6    /* Information */
--blue-600: #2563eb    /* Info hover */
```

### Gradient System

#### Hero Gradients
```tsx
// Dark atmospheric gradient for hero sections
<div className="bg-gradient-to-b from-black/30 via-black/70 to-emerald-800/95">

// Subtle overlay for images
<div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent">
```

#### Card Gradients
```tsx
// Subtle depth on cards
<div className="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90">
```

### Transparency & Overlays

```tsx
// Glass morphism effect
<div className="bg-black/70 backdrop-blur-md">

// Light overlay
<div className="bg-white/10 backdrop-blur-sm">

// Card transparency
<div className="bg-zinc-800/80">
```

---

## 📝 Typography

### Font Stack

#### Primary Font: Poppins
**Purpose**: Body text, UI elements, headings
**Weights**: 400 (Regular), 600 (Semibold), 700 (Bold)
**Variable**: `--font-poppins`

```tsx
// Applied in layout.tsx
<body className={`${poppins.variable} font-poppins`}>
```

**Character**: Modern, clean, highly legible sans-serif. Professional and approachable.

**Usage**:
- All body text
- Headings (H1-H6)
- Navigation items
- Button labels
- Form inputs
- Data tables

#### Accent Font: Caveat
**Purpose**: Brand personality, handwritten touches
**Weights**: 400 (Regular), 700 (Bold)
**Variable**: `--font-caveat`

**Character**: Casual handwritten script. Adds warmth and personality.

**Usage**:
- Taglines and slogans
- Special callouts
- Testimonial quotes
- Feature highlights
- Decorative headings (sparingly)

**Example**:
```tsx
<span className="font-caveat text-2xl">
  Authentic Island Experiences
</span>
```

### Type Scale

#### Headings
```tsx
// H1 - Page titles
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">

// H2 - Section titles
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">

// H3 - Subsection titles
<h3 className="text-2xl md:text-3xl font-semibold">

// H4 - Card titles
<h4 className="text-xl md:text-2xl font-semibold">

// H5 - Small headings
<h5 className="text-lg md:text-xl font-semibold">

// H6 - Labels
<h6 className="text-base font-semibold">
```

#### Body Text
```tsx
// Large body
<p className="text-lg md:text-xl">

// Regular body
<p className="text-base">

// Small text
<p className="text-sm">

// Extra small (metadata)
<p className="text-xs">
```

### Font Weights
```tsx
// Regular - body text
className="font-normal"  // 400

// Semibold - subheadings, emphasis
className="font-semibold"  // 600

// Bold - headings, CTAs
className="font-bold"  // 700
```

### Line Heights
```tsx
// Tight - headings
className="leading-tight"  // 1.25

// Normal - body text
className="leading-normal"  // 1.5

// Relaxed - long-form content
className="leading-relaxed"  // 1.625
```

### Letter Spacing
```tsx
// Headings
className="tracking-tight"  // -0.025em

// Body text
className="tracking-normal"  // 0em

// All caps labels
className="tracking-wider uppercase"  // 0.05em
```

---

## 🎯 Component Patterns

### Buttons

#### Primary Button
```tsx
<button className="
  bg-emerald-500
  hover:bg-emerald-400
  active:bg-emerald-600
  text-white
  font-semibold
  px-6 py-3
  rounded-lg
  transition-colors
  duration-200
  focus:outline-none
  focus:ring-2
  focus:ring-emerald-500
  focus:ring-offset-2
">
  Book Now
</button>
```

#### Secondary Button (Outline)
```tsx
<button className="
  border-2
  border-emerald-500
  text-emerald-500
  hover:bg-emerald-500
  hover:text-white
  font-semibold
  px-6 py-3
  rounded-lg
  transition-all
  duration-200
  focus:outline-none
  focus:ring-2
  focus:ring-emerald-500
">
  Learn More
</button>
```

#### Ghost Button
```tsx
<button className="
  text-white
  hover:bg-white/10
  font-semibold
  px-6 py-3
  rounded-lg
  transition-colors
  duration-200
">
  Cancel
</button>
```

### Cards

#### Standard Card
```tsx
<div className="
  bg-zinc-800/70
  backdrop-blur-sm
  rounded-xl
  overflow-hidden
  shadow-lg
  hover:shadow-2xl
  transition-shadow
  duration-300
">
  {/* Card content */}
</div>
```

#### Interactive Card (Clickable)
```tsx
<div className="
  bg-zinc-800/70
  backdrop-blur-sm
  rounded-xl
  overflow-hidden
  shadow-lg
  hover:shadow-2xl
  hover:scale-105
  transition-all
  duration-300
  cursor-pointer
">
  {/* Card content */}
</div>
```

### Forms

#### Input Fields
```tsx
<input className="
  w-full
  px-4 py-3
  bg-zinc-800/50
  border border-zinc-700
  rounded-lg
  text-white
  placeholder-zinc-500
  focus:border-emerald-500
  focus:outline-none
  focus:ring-2
  focus:ring-emerald-500/50
  transition-colors
" />
```

#### Select Dropdowns
```tsx
<select className="
  w-full
  px-4 py-3
  bg-zinc-800/50
  border border-zinc-700
  rounded-lg
  text-white
  focus:border-emerald-500
  focus:outline-none
  focus:ring-2
  focus:ring-emerald-500/50
  transition-colors
  cursor-pointer
">
  <option>Select option</option>
</select>
```

#### Textarea
```tsx
<textarea className="
  w-full
  px-4 py-3
  bg-zinc-800/50
  border border-zinc-700
  rounded-lg
  text-white
  placeholder-zinc-500
  focus:border-emerald-500
  focus:outline-none
  focus:ring-2
  focus:ring-emerald-500/50
  transition-colors
  resize-vertical
  min-h-[120px]
" />
```

### Badges

#### Difficulty Badges
```tsx
// EASY
<span className="bg-green-500/20 text-green-400 border border-green-500/30">

// MODERATE
<span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">

// CHALLENGING
<span className="bg-orange-500/20 text-orange-400 border border-orange-500/30">

// EXTREME
<span className="bg-red-500/20 text-red-400 border border-red-500/30">
```

#### Category Badges
```tsx
<span className="
  bg-emerald-500/20
  text-emerald-400
  border border-emerald-500/30
  px-3 py-1
  rounded-full
  text-sm
  font-semibold
">
  Category Name
</span>
```

#### Featured Badge
```tsx
<span className="
  bg-gradient-to-r from-amber-500 to-orange-500
  text-white
  px-3 py-1
  rounded-full
  text-xs
  font-bold
  uppercase
  tracking-wider
">
  Featured
</span>
```

---

## 📐 Spacing & Layout

### Container Widths
```tsx
// Full width (hero sections)
<div className="w-full">

// Content container (max-width)
<div className="container mx-auto px-4 max-w-7xl">

// Narrow content (blog posts)
<div className="container mx-auto px-4 max-w-4xl">
```

### Padding Scale
```tsx
// Extra small
className="p-2"      // 0.5rem (8px)

// Small
className="p-4"      // 1rem (16px)

// Medium
className="p-6"      // 1.5rem (24px)

// Large
className="p-8"      // 2rem (32px)

// Extra large
className="p-12"     // 3rem (48px)

// Responsive padding
className="p-4 md:p-8 lg:p-12"
```

### Margin Scale
```tsx
// Vertical spacing between sections
className="my-8 md:my-12 lg:my-16"

// Spacing between elements
className="space-y-4"      // 1rem gap
className="space-y-6"      // 1.5rem gap
className="space-y-8"      // 2rem gap
```

### Grid Layouts
```tsx
// Responsive tour grid
<div className="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-6
">

// Gallery grid
<div className="
  grid
  grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-4
">
```

---

## 📱 Responsive Design

### Breakpoint Strategy
```css
/* Mobile-first approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large displays */
```

### Testing Breakpoints
- **375px**: Mobile (iPhone SE, small phones)
- **768px**: Tablet (iPad)
- **1440px**: Desktop (standard laptop)

### Mobile-First Examples
```tsx
// Typography
<h1 className="text-3xl md:text-5xl lg:text-6xl">

// Spacing
<div className="p-4 md:p-8 lg:p-12">

// Layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Visibility
<div className="hidden md:block">  // Desktop only
<div className="md:hidden">         // Mobile only
```

---

## ♿ Accessibility Standards

### WCAG AA Compliance

#### Color Contrast Ratios
- **Normal text** (< 18pt): Minimum 4.5:1
- **Large text** (≥ 18pt or 14pt bold): Minimum 3:1
- **UI components**: Minimum 3:1 against adjacent colors

#### Tested Combinations
```tsx
// ✅ PASS - White on Emerald-500
<div className="bg-emerald-500 text-white">  // 3.91:1

// ✅ PASS - White on Black
<div className="bg-black text-white">  // 21:1

// ✅ PASS - Zinc-900 on White
<div className="bg-white text-zinc-900">  // 18.7:1

// ⚠️ CHECK - Zinc-400 on Black (use for secondary text only)
<div className="bg-black text-zinc-400">  // 4.54:1
```

### Focus States
```tsx
// All interactive elements MUST have visible focus
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-emerald-500
  focus:ring-offset-2
">
```

### ARIA Labels
```tsx
// Buttons without text
<button aria-label="Close modal">
  <XIcon />
</button>

// Navigation
<nav aria-label="Main navigation">

// Form fields
<input
  type="email"
  id="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
```

### Semantic HTML
```tsx
// ✅ Use semantic elements
<header>
<nav>
<main>
<article>
<section>
<aside>
<footer>

// ❌ Avoid div soup
<div class="header">
<div class="nav">
```

### Keyboard Navigation
- All interactive elements accessible via Tab key
- Logical tab order (top to bottom, left to right)
- Skip links for main content
- Modal traps focus when open

### Touch Targets
- **Minimum size**: 44x44px (WCAG 2.1 AAA)
- **Recommended**: 48x48px for mobile
- Adequate spacing between clickable elements

---

## 🎭 Animation & Transitions

### Transition Durations
```tsx
// Quick interactions (hover, focus)
className="transition-colors duration-200"

// Standard transitions (cards, modals)
className="transition-all duration-300"

// Slow transitions (page transitions)
className="transition-all duration-500"
```

### Hover Effects
```tsx
// Scale up
className="hover:scale-105 transition-transform duration-300"

// Lift (shadow)
className="hover:shadow-2xl transition-shadow duration-300"

// Color change
className="hover:bg-emerald-400 transition-colors duration-200"
```

### Loading States
```tsx
// Skeleton loader
<div className="animate-pulse bg-zinc-800/50 h-64 rounded-lg" />

// Spinner
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
```

---

## 🖼️ Images & Media

### Image Optimization
```tsx
// Always use Next.js Image component
import Image from 'next/image'

<Image
  src="/tours/martha-brae-main.jpg"
  alt="Bamboo rafting on Martha Brae River"
  width={800}
  height={600}
  className="rounded-lg"
  priority={isAboveFold}
/>
```

### Aspect Ratios
```tsx
// Tour cards (landscape)
className="aspect-[4/3]"

// Gallery images (square)
className="aspect-square"

// Hero sections (wide)
className="aspect-[21/9]"
```

### Background Images
```tsx
// With overlay
<div className="
  relative
  bg-cover
  bg-center
  before:absolute
  before:inset-0
  before:bg-black/60
"
style={{ backgroundImage: 'url(/hero.jpg)' }}>
  {/* Content */}
</div>
```

---

## 📏 Iconography

### Icon Library: Lucide React
```tsx
import {
  Calendar,
  Users,
  MapPin,
  Star,
  Clock,
  DollarSign
} from 'lucide-react'

<Calendar className="w-5 h-5 text-emerald-500" />
```

### Icon Sizes
```tsx
// Extra small (inline with text)
className="w-4 h-4"

// Small (labels, badges)
className="w-5 h-5"

// Medium (buttons, cards)
className="w-6 h-6"

// Large (features, highlights)
className="w-8 h-8"

// Extra large (hero, empty states)
className="w-12 h-12"
```

### Icon Colors
```tsx
// Primary
className="text-emerald-500"

// Secondary
className="text-zinc-400"

// On dark backgrounds
className="text-white"

// Success
className="text-green-500"

// Error
className="text-red-500"
```

---

## 🚫 Don'ts - Common Mistakes to Avoid

### Typography
- ❌ Don't use more than 2-3 font weights
- ❌ Don't mix too many font sizes on one page
- ❌ Don't use all caps for long text (accessibility)
- ❌ Don't use font sizes smaller than 14px for body text

### Colors
- ❌ Don't use pure black (#000) for text on white (use zinc-900)
- ❌ Don't use low-contrast color combinations
- ❌ Don't use color as the only indicator (accessibility)
- ❌ Don't overuse the primary emerald color (saves impact)

### Layout
- ❌ Don't forget mobile-first design
- ❌ Don't use fixed pixel widths (use responsive units)
- ❌ Don't create horizontal scroll on mobile
- ❌ Don't use inconsistent spacing

### Accessibility
- ❌ Don't forget alt text on images
- ❌ Don't remove focus outlines without custom alternatives
- ❌ Don't use div/span for clickable elements (use button/a)
- ❌ Don't forget keyboard navigation

---

## ✅ Best Practices Checklist

### Before Committing Code
- [ ] All interactive elements have hover states
- [ ] Focus states are visible on all interactive elements
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Component is tested at 375px, 768px, 1440px
- [ ] Images have descriptive alt text
- [ ] Typography uses the defined scale
- [ ] Spacing uses Tailwind's spacing scale
- [ ] Semantic HTML tags are used
- [ ] Touch targets are minimum 44x44px
- [ ] Animations use appropriate durations
- [ ] No console errors or warnings

### Design Review
- [ ] Follows mobile-first approach
- [ ] Uses brand colors appropriately
- [ ] Typography hierarchy is clear
- [ ] Spacing is consistent with other pages
- [ ] Component reuses existing patterns
- [ ] Accessibility requirements met
- [ ] Performance optimized (lazy loading, etc.)

---

## 📚 Resources

### External Documentation
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js Image Optimization](https://nextjs.org/docs/api-reference/next/image)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lucide Icons](https://lucide.dev/)

### Internal Documentation
- [CLAUDE.md](../CLAUDE.md) - Project overview and commands
- [Component Patterns](./technical/technical-specification.md) - Architecture details
- [Development Checklist](./planning/development-checklist.md) - Task tracking

---

## 📝 Version History

### v1.0.0 (2025-10-29)
- Initial styling guidelines document
- Defined color system with Jamaican emerald theme
- Established typography scale with Poppins/Caveat
- Component patterns for buttons, cards, forms
- Accessibility standards (WCAG AA)
- Responsive design breakpoints
- Animation and transition guidelines

---

**Maintained by**: NMG Tours Jamaica Development Team
**Questions**: Refer to CLAUDE.md or create a GitHub Discussion
