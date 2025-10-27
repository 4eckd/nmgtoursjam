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
├── planning/
│   ├── engineering-plan.md
│   └── development-checklist.md
└── guides/
    └── quick-start-guide.md
```

### Color System & Theming

**Important**: The site uses Jamaican-inspired colors with emerald green as the primary brand color, representing the island's lush landscapes and vibrant culture.

**Color Palette**:
- **Primary**: Emerald (#10b981) - Main CTAs, links, accents
- **Secondary**: Black/Dark grays - Backgrounds, navigation
- **Accent**: White/Light colors - Text, contrast elements
- **Gradient**: Multi-tone gradient (gray → red-brown → emerald) for visual depth

**Usage in Components**:
```tsx
// Primary brand color (emerald)
<button className="bg-emerald-400 hover:bg-emerald-300">Book Now</button>

// Dark backgrounds with transparency
<div className="bg-black/70 backdrop-blur-md">

// Text colors
<p className="text-white">Main content</p>
<p className="text-zinc-400">Secondary text</p>
```

### Font System

Two Google Fonts are configured in `app/layout.tsx`:
- **Poppins** (primary): Clean, modern sans-serif for body text and UI
  - Weights: 400 (regular), 600 (semibold), 700 (bold)
  - Variable: `--font-poppins`
- **Caveat** (accent): Handwritten script for personality and brand touches
  - Weights: 400 (regular), 700 (bold)
  - Variable: `--font-caveat`

These are loaded via `next/font/google` for automatic optimization and zero layout shift.

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

## Reference Documentation

- **Next.js 16**: https://nextjs.org/docs
- **Tailwind CSS 4**: https://tailwindcss.com/docs
- **Prisma ORM**: https://www.prisma.io/docs
- **NextAuth.js**: https://next-auth.js.org/
- **Stripe Docs**: https://stripe.com/docs
- **Lucide Icons**: https://lucide.dev/
- **Project Planning**: See `docs/planning/` folder for roadmap and checklists

## Project Identity

**Name**: NMG Tours Jamaica
**Tagline**: "Authentic Island Experiences"
**Focus**: Rafting tours, cultural experiences, and authentic Jamaican adventures
**Brand Colors**: Emerald green (#10b981), Black, White
**Target Audience**: Tourists seeking authentic, locally-guided experiences in Jamaica
