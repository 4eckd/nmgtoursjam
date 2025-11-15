# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **NMG Tours Jamaica** - a modern tourism booking platform for authentic Jamaican island experiences, specializing in rafting tours and cultural adventures. The project is built with Next.js 16, React 19, TypeScript, and uses an emerald/green theme reflecting Jamaica's vibrant natural beauty.

**Current Status**: MVP development phase - foundation complete with navigation, routing, and basic pages. Currently implementing parallel development tracks for tour listings, booking system, and database integration.

**Tech Stack**:
- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, responsive mobile-first design
- **UI Components**: Lucide React icons, custom components
- **Database**: PostgreSQL with Prisma ORM (Supabase hosting)
- **Authentication**: NextAuth.js (planned)
- **Payments**: Stripe integration (planned)
- **Package Manager**: pnpm
- **Deployment**: Vercel

## Commands

### Development
```bash
pnpm dev              # Start development server on localhost:3000
pnpm build            # Production build (must pass before merging)
pnpm start            # Run production build locally
pnpm lint             # Run ESLint (currently basic Next.js config)
```

### Git Workflow
See parallel branch strategy below. Key points:

**Current Integration Branch**: `integration/mvp-launch`
- All feature branches should be created from and merged back into this branch
- Do NOT merge directly to `main` - integration branch will be merged to main when MVP is complete
- Run `pnpm build` before every merge to ensure stability

**Feature Branch Pattern**: `feature/<feature-name>`
```bash
# Create new feature branch
git checkout integration/mvp-launch
git pull
git checkout -b feature/database-setup

# Verify build works before merging
pnpm build

# Create PR to integration branch (not main)
gh pr create --base integration/mvp-launch \
  --title "feat(database): Set up Prisma with Tours and Bookings models"
```

**Commit Convention**: Conventional Commits format
- `feat(scope): description` - New features
- `fix(scope): description` - Bug fixes
- `refactor(scope): description` - Code refactoring
- `docs: description` - Documentation only
- `style: description` - Formatting/styling only
- `test: description` - Adding tests
- `chore: description` - Dependencies, tooling

## Architecture

### Directory Structure
```
app/
├── (auth)/                 # Auth route group (planned)
│   ├── login/
│   └── signup/
├── (marketing)/            # Public-facing pages
│   ├── page.tsx           # Homepage with hero section
│   ├── about/
│   ├── contact/
│   └── gallery/
├── tours/                  # Tour browsing and details
│   ├── page.tsx           # Tour listing
│   └── [slug]/
│       └── page.tsx       # Tour detail page
├── dashboard/              # User dashboard (planned)
├── api/                    # API routes
│   ├── tours/
│   ├── bookings/
│   └── auth/
├── components/
│   ├── Navigation.tsx     # Global navigation
│   └── Footer.tsx         # Global footer
├── legal/                  # Legal pages
│   ├── terms/
│   ├── privacy/
│   └── refunds/
└── layout.tsx              # Root layout

prisma/
└── schema.prisma           # Database schema

docs/                       # Project documentation
├── design/                 # Design system (11 files)
│   ├── README.md          # Design system overview
│   ├── STATUS.md          # Implementation tracking
│   ├── mockups/           # ASCII wireframes (5 files)
│   ├── flows/             # User journeys (2 files)
│   └── tokens/            # Design tokens & component library (2 files)
├── devops/                 # DevOps documentation (5 files)
│   ├── README.md          # CI/CD overview
│   ├── CI_CD_SETUP.md     # Pipeline documentation
│   ├── DEPLOYMENT.md      # Vercel deployment guide
│   ├── TESTING.md         # Testing strategy
│   └── BRANCH_STRATEGY.md # Git workflow
├── planning/
│   ├── engineering-plan.md
│   └── development-checklist.md
├── technical/
│   └── technical-specification.md
└── guides/
    ├── quick-start-guide.md
    └── deployment-guide.md
```

### Color System & Theming

**Important**: The site uses Jamaican-inspired colors with emerald green as the primary brand color, representing the island's lush landscapes and vibrant culture.

**Color Palette**:
- **Primary**: Emerald (#10b981) - Main CTAs, links, accents
- **Primary Light**: Emerald (#34d399) - Hover states
- **Primary Dark**: Emerald (#059669) - Active states
- **Secondary**: Black/Dark grays - Backgrounds, navigation
- **Accent**: White/Light colors - Text, contrast elements
- **Gradient**: Multi-tone gradient (gray → red-brown → emerald) for visual depth
  - CSS: `linear-gradient(135deg, #4747475e 15%, #853e3e83 50%, #55d2836c 90%)`

**CSS Design Tokens** (defined in `app/globals.css`):
```css
--color-primary: #10b981;           /* Emerald 500 - Main brand */
--color-primary-light: #34d399;     /* Emerald 400 - Hover */
--color-primary-dark: #059669;      /* Emerald 600 - Active */
--color-secondary: #000000;         /* Black - Backgrounds */
--color-white: #ffffff;             /* White - Text */
--gradient-primary: linear-gradient(135deg, #4747475e 15%, #853e3e83 50%, #55d2836c 90%);
```

**Usage in Components**:
```tsx
// ✅ Using Tailwind classes
<button className="bg-emerald-400 hover:bg-emerald-300">Book Now</button>

// ✅ Using CSS variables
<div style={{ color: 'var(--color-primary)' }}>

// ✅ Dark backgrounds with transparency
<div className="bg-black/70 backdrop-blur-md">

// ✅ Text colors
<p className="text-white">Main content</p>
<p className="text-zinc-400">Secondary text</p>
```

**Reference**: See `docs/design/tokens/DESIGN_TOKENS.md` for complete design token specifications.

### Font System

Two Google Fonts are configured in `app/layout.tsx`:
- **Poppins** (primary): Clean, modern sans-serif for body text and UI
  - Weights: 400 (regular), 600 (semibold), 700 (bold)
  - Variable: `--font-poppins`
- **Caveat** (accent): Handwritten script for personality and brand touches
  - Weights: 400 (regular), 700 (bold)
  - Variable: `--font-caveat`

These are loaded via `next/font/google` for automatic optimization and zero layout shift.

**Typography Scale** (CSS Design Tokens):
```css
--font-primary: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-accent: 'Caveat', cursive;

--font-xs: 0.75rem;      /* 12px */
--font-sm: 0.875rem;     /* 14px */
--font-base: 1rem;       /* 16px */
--font-lg: 1.125rem;     /* 18px */
--font-xl: 1.25rem;      /* 20px */
--font-2xl: 1.5rem;      /* 24px */
--font-3xl: 1.875rem;    /* 30px */
--font-4xl: 2.25rem;     /* 36px */
--font-5xl: 3rem;        /* 48px */
```

**Reference**: See `docs/design/tokens/DESIGN_TOKENS.md` for complete typography specifications.

### Logo System

**Logo File**: `/public/NMGTOURS.png`
- **Dimensions**: 1680x1680px (square)
- **Format**: PNG with transparency
- **Usage**: Navigation, footer, social media

**Logo Integration in CSS** (`app/globals.css`):
```css
.logo {
  width: 40px;
  height: 40px;
  transition: filter var(--duration-300) var(--ease-in-out);
}

.logo:hover {
  filter: drop-shadow(0 0 8px var(--color-primary));
}

/* Responsive sizing */
@media (min-width: 768px) {
  .logo {
    width: 48px;
    height: 48px;
  }
}
```

**Logo Usage in Components**:
```tsx
import Image from 'next/image'

<Image
  src="/NMGTOURS.png"
  alt="NMG Tours Jamaica"
  width={40}
  height={40}
  className="logo"
/>
```

**Logo Color Relationships**:
- Primary emerald green (#10b981) used in logo is our main brand color
- Logo hover effect uses CSS variables for consistency
- All brand colors derived from logo color palette

### Component Patterns

**Client vs Server Components**:
- Most components should be Server Components by default
- Use `'use client'` only when needed (useState, useEffect, event handlers)
- Current client components: Navigation.tsx, page.tsx (homepage), home/page.tsx

**Accessibility Requirements**:
- All interactive elements must have proper ARIA labels
- Keyboard navigation must work fully (test with Tab key)
- Focus states must be visible
- Semantic HTML (nav, header, section, main, footer, etc.)
- Minimum touch target size: 44x44px for mobile
- Color contrast ratios meeting WCAG AA standards

**Responsive Design**:
- Mobile-first approach (design for mobile, enhance for desktop)
- Tailwind breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Navigation has hamburger menu for mobile, horizontal menu for desktop
- Test all pages at: 375px (mobile), 768px (tablet), 1440px (desktop)

### State Management

**Current State**: React hooks (useState, useEffect) for local component state

**Planned State Management**:
- **Zustand** for global state:
  - Booking flow state (multi-step form)
  - User session data
  - Cart/selected tours
  - UI state (modals, notifications)

### Styling Approach

**Tailwind CSS Utility-First**:
- Tailwind classes for all styling (no CSS modules or styled-components)
- Responsive classes: `md:`, `lg:`, `xl:` prefixes
- Custom gradient backgrounds in layout.tsx
- Glass morphism: `bg-black/70 backdrop-blur-md`

**Color Usage**:
```tsx
// ✅ Correct - Use Tailwind color classes
<div className="text-white bg-emerald-400">

// ✅ Correct - Custom gradients
<div className="bg-gradient-to-b from-black/30 via-black/70 to-emerald-800/95">

// ✅ Correct - Transparency
<div className="bg-black/70 backdrop-blur-md">
```

### Container & Layout System

**Max Container Width**: 1400px
- All content should be constrained to this width on larger screens
- Use padding for mobile/tablet to ensure content doesn't touch edges

```css
--container-max: 1400px;
--container-padding: 1rem;  /* 16px */
```

**Responsive Breakpoints** (Tailwind):
```css
--breakpoint-xs: 375px;   /* Mobile small */
--breakpoint-sm: 640px;   /* Mobile large / Phablet */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1440px;  /* Wide desktop */
```

**Reference**: See `docs/design/tokens/DESIGN_TOKENS.md` for complete spacing and layout specifications.

## Design System

### Mockups & Wireframes

**Available Mockups** (ASCII wireframes in `docs/design/mockups/`):
1. **LANDING_PAGE.md** - Homepage with hero, featured tours, testimonials
2. **TOUR_LISTING.md** - Tour browse page with filters and search
3. **TOUR_DETAIL.md** - Individual tour page with booking widget
4. **BOOKING_FLOW.md** - 4-step booking wizard (Date → Details → Payment → Confirmation)
5. **USER_DASHBOARD.md** - User account dashboard

All mockups show responsive layouts for:
- Desktop (1440px)
- Tablet (768px)
- Mobile (375px)

**Reference**: See `docs/design/README.md` for complete design system overview.

### User Flows

**Available User Journey Diagrams** (`docs/design/flows/`):
1. **USER_FLOWS.md** - 8 complete user journeys with decision trees
2. **BOOKING_JOURNEY.md** - Detailed 10-stage booking process

Flows cover:
- New visitor discovery
- Tour search and filtering
- Booking process
- User authentication
- Review submission
- Dashboard management
- Mobile app flows (future)
- Admin workflows (future)

### Component Library

**Component Inventory**: 80+ components documented in `docs/design/tokens/COMPONENT_LIBRARY.md`

**Categories**:
1. **Marketing Components** (12) - Hero, Features, Testimonials, CTA, Gallery, etc.
2. **Tour Components** (15) - Tour cards, filters, search, detail views, etc.
3. **Booking Components** (8) - Wizard, date picker, payment forms, confirmation, etc.
4. **Dashboard Components** (10) - Booking cards, stats, profile settings, etc.
5. **Form Components** (18) - Inputs, selects, checkboxes, validation, etc.
6. **Layout Components** (5) - Navigation, Footer, Container, Grid, etc.
7. **UI Components** (14) - Buttons, modals, tooltips, badges, cards, etc.

**Current Status**: 2/74 implemented (Navigation, Footer)

**Priority Levels**:
- **High**: Core MVP components (booking flow, tour listings, hero)
- **Medium**: Enhanced features (reviews, filters, dashboard)
- **Low**: Nice-to-haves (animations, advanced search, admin tools)

**Reference**: See `docs/design/STATUS.md` for implementation tracking.

## DevOps & CI/CD

### CI/CD Pipeline

**7-Stage Pipeline** (GitHub Actions):
1. **Code Quality** - ESLint, Prettier, TypeScript
2. **Security** - npm audit, secret scanning, CodeQL
3. **Build** - Next.js production build
4. **Test** - Unit tests, integration tests (when implemented)
5. **Preview** - Automatic Vercel preview deployments
6. **Performance** - Lighthouse CI audits
7. **Deploy** - Production deployment to Vercel

**GitHub Actions Workflows** (`.github/workflows/`):
- **ci.yml** - Main CI pipeline (runs on push to feature/*, PRs)
- **preview-deploy.yml** - Automatic preview deployments for PRs
- **lighthouse.yml** - Performance budgets and audits
- **security-scan.yml** - Daily security scans

**Performance Budgets** (enforced by Lighthouse CI):
- Performance: >80
- Accessibility: >90
- Best Practices: >80
- SEO: >80
- PWA: >50

**Reference**: See `docs/devops/` for complete CI/CD documentation.

### Testing Strategy

**Test Pyramid** (70% unit, 20% integration, 10% E2E):
- **Unit Tests**: Jest + React Testing Library (planned)
- **Integration Tests**: API route testing (planned)
- **E2E Tests**: Playwright for critical user flows (planned)

**Reference**: See `docs/devops/TESTING.md` for testing strategy.

### Branch Strategy

**Protected Branches**:
- `main` - Production (protected, requires PR, passing checks)
- `integration/mvp-launch` - Integration branch for MVP (all features merge here first)

**Branch Types**:
- `feature/*` - New features (merge to integration)
- `fix/*` - Bug fixes (merge to integration)
- `hotfix/*` - Emergency fixes (merge to main + integration)
- `claude/*` - Claude Code sessions (merge to integration)

**Reference**: See `docs/devops/BRANCH_STRATEGY.md` for complete workflow.

### Deployment

**Platform**: Vercel
- **Production**: Auto-deploy from `main` branch
- **Preview**: Auto-deploy from PRs to `main` or `integration/*`
- **Domain**: TBD (pending Vercel configuration)

**Environment Variables** (required):
- `DATABASE_URL` - PostgreSQL connection string (Supabase)
- `NEXTAUTH_SECRET` - NextAuth.js secret (planned)
- `NEXTAUTH_URL` - App URL (planned)
- `STRIPE_SECRET_KEY` - Stripe API key (planned)
- `STRIPE_PUBLISHABLE_KEY` - Stripe public key (planned)

**Reference**: See `docs/devops/DEPLOYMENT.md` for deployment guide.

## Development Guidelines

### When Adding New Components

1. **Location**: Place in appropriate subfolder of `app/components/`
   - Layout components: `app/components/` (Navigation.tsx, Footer.tsx)
   - Feature-specific: `app/components/tours/`, `app/components/booking/`
   - Reusable UI: `app/components/ui/` (Button, Card, Modal, etc.)

2. **TypeScript**: All components must be typed
   ```tsx
   interface ButtonProps {
     variant?: 'primary' | 'outline' | 'ghost'
     size?: 'sm' | 'md' | 'lg'
     children: React.ReactNode
   }

   export function Button({ variant = 'primary', ... }: ButtonProps) {
   ```

3. **Accessibility**: Include ARIA attributes, semantic HTML, keyboard support

4. **Responsive**: Use Tailwind responsive classes (sm:, md:, lg:)

5. **Theme-aware**: Support both light and dark themes via CSS variables

### When Building New Features

Follow this workflow for all new features:

1. **Create feature branch** from `integration/mvp-launch`
2. **Build component** with TypeScript types
3. **Test responsive design** (mobile → tablet → desktop)
4. **Verify build passes**: `pnpm build`
5. **Create PR** to integration branch
6. **Merge after review** and delete feature branch

### Accessibility Standards

Aim for WCAG AA compliance:
- Normal text: 4.5:1 contrast ratio minimum
- Large text (18pt+): 3:1 minimum
- Interactive elements: visible focus states
- Forms: proper labels and error messages
- Images: descriptive alt text

Test with browser DevTools accessibility panel before committing.

### Build Verification

**ALWAYS run `pnpm build` before creating PRs**. The build:
- Type-checks all TypeScript
- Verifies Next.js can compile pages
- Catches many runtime errors

Common build errors:
- Hydration mismatches (use `useState` + `useEffect` pattern for theme-dependent rendering)
- Missing dependencies
- Type errors in components

## MVP Parallel Development Strategy

### 5 Development Tracks (Run in Parallel)

**TRACK 1: Marketing & Content** 🎨
- Hero section with video background
- Gallery page with photo grid
- About page content
- Contact form (frontend)
- Duration: 3-5 days

**TRACK 2: Database & Infrastructure** 🔧
- Prisma setup with PostgreSQL (Supabase)
- Schema design (Tours, Bookings, Users)
- API route structure
- Seed data creation
- Duration: 2-3 days
- **CRITICAL PATH** - blocks other tracks

**TRACK 3: Tours System** 🏞️
- Tour listing page with filters
- Tour detail page with gallery
- Search and sort functionality
- API endpoints for tours
- Duration: 4-6 days
- Dependencies: TRACK 2

**TRACK 4: Authentication & User Management** 🔐
- NextAuth.js setup
- Login/signup pages
- User dashboard
- Protected routes
- Duration: 3-4 days
- Dependencies: TRACK 2

**TRACK 5: Booking & Payment Flow** 💳
- Multi-step booking wizard
- Stripe payment integration
- Booking confirmation
- Email notifications
- Duration: 5-7 days
- Dependencies: TRACK 2, 3, 4

### Post-MVP Features (Deferred)

- Admin dashboard for tour management
- Review and rating system
- Map integration (location-based search)
- Multi-language support
- Mobile app (React Native)
- Advanced analytics
- Loyalty/rewards program

### Technical Decisions

- **Database**: PostgreSQL on Supabase (free tier for MVP)
- **Payments**: Stripe (industry standard)
- **Authentication**: NextAuth.js with credentials + OAuth
- **Email**: Resend or SendGrid
- **Images**: Cloudinary (free tier)
- **Analytics**: Vercel Analytics (built-in)

## Important Constraints

1. **No Direct Main Merges**: All work goes through `integration/mvp-launch` first
2. **Build Must Pass**: Run `pnpm build` successfully before any PR
3. **Mobile First**: Design and test mobile (375px) before desktop
4. **TypeScript**: All components must be properly typed (avoid `any`)
5. **Responsive**: Test at 375px, 768px, 1440px breakpoints
6. **Accessibility**: WCAG AA compliance minimum
7. **Performance**: Lighthouse score >80 for mobile

## Common Tasks

### Add a New Page
```bash
# Create page file in app router
mkdir -p app/tours
touch app/tours/page.tsx

# Build the page component with TypeScript
# Test responsive design
# Verify build passes

pnpm build
git add .
git commit -m "feat(tours): add tour listing page"
```

### Add API Endpoint
```bash
# Create API route
mkdir -p app/api/tours
touch app/api/tours/route.ts

# Implement GET/POST handlers
# Test with curl or Postman
# Verify build passes

pnpm build
git add .
git commit -m "feat(api): add tours endpoint"
```

### Add New Dependency
```bash
pnpm add <package-name>           # Production dependency
pnpm add -D <package-name>        # Dev dependency

# Update package.json
# Test that build still works
pnpm build

git add package.json pnpm-lock.yaml
git commit -m "chore(deps): add <package-name>"
```

## Path Aliases

TypeScript is configured with path aliases in `tsconfig.json`:
- `@/*` maps to root directory

Usage:
```tsx
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'
import { prisma } from '@/lib/prisma'
```

## Documentation Hub

### Internal Documentation

**Design System** (`docs/design/`):
- [Design System README](docs/design/README.md) - Complete overview
- [Implementation Status](docs/design/STATUS.md) - Component progress tracking
- [Design Tokens](docs/design/tokens/DESIGN_TOKENS.md) - CSS variables, colors, typography
- [Component Library](docs/design/tokens/COMPONENT_LIBRARY.md) - 80+ component inventory
- [Mockups](docs/design/mockups/) - 5 ASCII wireframe files
- [User Flows](docs/design/flows/) - Journey diagrams and booking process

**DevOps** (`docs/devops/`):
- [DevOps README](docs/devops/README.md) - CI/CD architecture overview
- [CI/CD Setup](docs/devops/CI_CD_SETUP.md) - Complete pipeline documentation
- [Deployment Guide](docs/devops/DEPLOYMENT.md) - Vercel deployment instructions
- [Testing Strategy](docs/devops/TESTING.md) - Test pyramid and frameworks
- [Branch Strategy](docs/devops/BRANCH_STRATEGY.md) - Git workflow and conventions

**Planning** (`docs/planning/`):
- [Engineering Plan](docs/planning/engineering-plan.md) - 13-week roadmap
- [Development Checklist](docs/planning/development-checklist.md) - 200+ task items

**Technical** (`docs/technical/`):
- [Technical Specification](docs/technical/technical-specification.md) - Architecture decisions

**Guides** (`docs/guides/`):
- [Quick Start Guide](docs/guides/quick-start-guide.md) - Setup instructions
- [Deployment Guide](docs/guides/deployment-guide.md) - Vercel walkthrough

**Other**:
- [KICKSTARTER_CLAUDE.md](KICKSTARTER_CLAUDE.md) - Generic template for design/DevOps kickstart
- [CLAUDE_USAGE.md](CLAUDE_USAGE.md) - Token usage tracking for billing
- [docs/README.md](docs/README.md) - Documentation hub index

### External Reference Documentation

**Framework & Tools**:
- [Next.js 16](https://nextjs.org/docs) - React framework
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS 4](https://tailwindcss.com/docs) - Styling framework
- [TypeScript 5](https://www.typescriptlang.org/docs/) - Type system
- [Lucide Icons](https://lucide.dev/) - Icon library

**Backend & Database**:
- [Prisma ORM](https://www.prisma.io/docs) - Database toolkit
- [Supabase](https://supabase.com/docs) - PostgreSQL hosting
- [NextAuth.js](https://next-auth.js.org/) - Authentication (planned)

**Payments & Services**:
- [Stripe Docs](https://stripe.com/docs) - Payment processing (planned)
- [Resend](https://resend.com/docs) - Email service (planned)

**DevOps & Deployment**:
- [Vercel](https://vercel.com/docs) - Hosting platform
- [GitHub Actions](https://docs.github.com/actions) - CI/CD
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) - Performance auditing

**Testing**:
- [Jest](https://jestjs.io/) - Unit testing (planned)
- [Playwright](https://playwright.dev/) - E2E testing (planned)
- [React Testing Library](https://testing-library.com/react) - Component testing (planned)

## Project Identity

**Name**: NMG Tours Jamaica
**Tagline**: "Authentic Island Experiences"
**Focus**: Rafting tours, cultural experiences, and authentic Jamaican adventures
**Brand Colors**: Emerald green (#10b981), Black, White
**Target Audience**: Tourists seeking authentic, locally-guided experiences in Jamaica
