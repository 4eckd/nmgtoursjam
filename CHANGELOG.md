# Changelog

All notable changes to the NMG Tours Jamaica project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed - 2025-10-29

#### UI Rendering & Layout Fixes

- **Fixed footer rendering** across all pages - removed conflicting layout wrappers that prevented footer from displaying correctly
- **Fixed background image conflicts** - centralized background management in root layout, removed duplicate fixed backgrounds from individual pages
- **Fixed navigation duplication** - eliminated conflicting page-level navigation controls
- **Fixed legal page routing** - moved legal pages from `/pages/*` to correct `/legal/*` directory structure
- **Fixed inconsistent theming on legal pages** - converted all legal pages from gray/white theme to consistent emerald/black site theme

#### Technical Improvements

- **Standardized layout architecture**:
  - Centralized background image and gradient overlay in `app/layout.tsx`
  - Implemented z-index layering system: background (-z-30), gradient (-z-20), content (z-0)
  - Set minimum height on main content to ensure footer placement
  - Removed inline styles in favor of Tailwind utility classes

- **Page-level optimizations**:
  - Homepage: Converted to server component, removed duplicate backgrounds
  - About Page: Cleaned up hero section structure, removed fixed overlays
  - Contact Page: Removed unnecessary Image imports, simplified layout
  - Tours Page: Streamlined structure, removed duplicate backgrounds
  - Legal Pages: Complete refactor with glass morphism design, consistent color scheme

#### Design System Consistency

- Applied **emerald/black theme** consistently across all pages
- Implemented **glass morphism effects** (`bg-black/40 backdrop-blur-md`) on legal pages
- Updated legal page typography:
  - Headings: `text-emerald-400` (primary brand color)
  - Body text: `text-zinc-300` (high contrast)
  - Secondary text: `text-zinc-400` (reduced emphasis)
- Removed 200+ lines of redundant code while improving consistency

#### Build & Deployment

- ✅ All 23 routes build successfully without errors
- ✅ Legal page routes now accessible at correct URLs:
  - `/legal/privacy` - Privacy Policy
  - `/legal/terms` - Terms & Conditions
  - `/legal/cookies` - Cookie Policy
  - `/legal/refunds` - Refund & Cancellation Policy
  - `/legal/safety` - Safety Guidelines
- ✅ Footer links now resolve correctly
- ✅ Responsive design maintained across all breakpoints
- ✅ No hydration mismatches or rendering errors

#### Files Changed

- `app/layout.tsx` - Centralized background and gradient management
- `app/page.tsx` - Simplified homepage structure
- `app/about/page.tsx` - Removed duplicate backgrounds
- `app/contact/page.tsx` - Cleaned up layout
- `app/tours/page.tsx` - Streamlined structure
- `app/legal/privacy/page.tsx` - Complete theme refactor
- `app/legal/terms/page.tsx` - Complete theme refactor
- `app/legal/cookies/page.tsx` - Complete theme refactor
- `app/legal/refunds/page.tsx` - Complete theme refactor
- `app/legal/safety/page.tsx` - Complete theme refactor

---

## Previous Releases

### [0.8.0] - TRACK 5: Booking & Payment System (100% MVP Complete)

**Features:**
- Complete Stripe payment integration
- Multi-step booking wizard with date selection, guest count, and details form
- Email notifications via Resend
- Booking success page with confirmation details
- User dashboard with booking history

**Status:** MVP development complete at 100%

### [0.6.0] - TRACK 4: Authentication & User Management

**Features:**
- NextAuth.js v5 implementation with credentials and Google OAuth
- User registration and login flows
- Protected routes and session management
- User dashboard

### [0.5.0] - TRACK 3: Tours System

**Features:**
- Tour listing page with advanced filtering and search
- Tour detail pages with image galleries
- Database integration with Prisma ORM
- Tour categories and dynamic content

### [0.3.0] - TRACK 2: Database & Infrastructure

**Features:**
- PostgreSQL database on Supabase
- Prisma ORM setup and schema design
- Database seeding scripts
- API route structure

### [0.1.0] - TRACK 1: Foundation & Marketing

**Features:**
- Next.js 16 + React 19 + TypeScript setup
- Responsive navigation and footer
- Homepage with hero section
- About, Contact, and Gallery pages
- Emerald/black design system

---

## Links

- [Repository](https://github.com/yourusername/nmgtoursjam)
- [Live Site](https://www.nmgtoursjam.com)
- [Project Documentation](./docs/)
