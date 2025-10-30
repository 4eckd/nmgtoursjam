# Changelog

All notable changes to the NMG Tours Jamaica project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - 2025-10-29

#### CSS Design System v2.0.0
- **Implemented comprehensive CSS variable system** for consistent theming
  - Brand colors (emerald primary, hover states, active states)
  - Surface colors (dark, elevated, card with transparency)
  - Content colors (primary, secondary, tertiary text)
  - Border colors (primary, secondary, accent)
  - Difficulty badge colors (easy, moderate, challenging, extreme)
  - Semantic colors (success, warning, error, info with backgrounds)
  - Spacing system (page, section, card, button, gaps)
  - Typography scale (12px to 72px with line heights)
  - Effects (shadows, blur, border radius, opacity levels)
  - Z-index layers (9 levels from background to tooltip)
  - Transitions (fast, base, slow, slower)
- **Tailwind theme integration** - mapped CSS variables to Tailwind utilities
- **Eliminated hard-coded values** - all colors and spacing now use CSS variables
- **File**: `app/globals.css` - 300+ lines of design tokens

#### UI Component Library
- **Button component** (`app/components/ui/Button.tsx`)
  - 4 variants: primary, secondary, ghost, danger
  - 3 sizes: sm, md, lg
  - Loading state with spinner
  - Full-width option
  - TypeScript typed with comprehensive props
  - Integrated with CSS variable system
- **Badge component** (`app/components/ui/Badge.tsx`)
  - 7 variants: difficulty, category, featured, success, warning, error, info
  - Difficulty-specific colors (EASY, MODERATE, CHALLENGING, EXTREME)
  - 3 sizes: sm, md, lg
  - Specialized components: DifficultyBadge, CategoryBadge, FeaturedBadge
  - TypeScript typed
- **Barrel export** (`app/components/ui/index.ts`) for clean imports

#### Database Enhancements
- **Expanded seed data** with 5 additional Jamaican tours:
  - Dunn's River Falls Climb ($80, Challenging)
  - Blue Hole Mineral Spring ($65, Moderate)
  - Mayfield Falls Nature Tour ($70, Moderate)
  - Mystic Mountain Bobsled ($90, Moderate)
  - Black River Safari ($75, Easy)
- Total tours in database: **8 authentic Jamaican experiences**
- Enhanced tour descriptions, highlights, and details
- Realistic pricing and difficulty levels

#### Component Integration (Phase 3)
- **Integrated Button component** across 4 pages:
  - Homepage CTAs (Explore Tours, Contact Us)
  - About page CTA (Browse Tours)
  - Contact page submit button
  - Tour listing page with Book Now buttons
- **Integrated Badge components** in tour system:
  - DifficultyBadge on tour cards and detail pages
  - CategoryBadge for tour categories
  - FeaturedBadge for highlighted tours
- **Removed duplicate component code** - eliminated 150+ lines
- **Consistent styling** across all interactive elements

#### Documentation System
- **Consolidated CHANGELOG.md** into `docs/` as single source of truth
- **Created VERSIONING-STRATEGY.md** - comprehensive semantic versioning guide
  - Git tagging strategy
  - Release workflow
  - Version lifecycle (0.x.x → 1.x.x)
  - Practical examples for all release types
- **Updated README.md** - project-specific homepage with badges and features
- **Updated docs/README.md** - Jamaica-focused, MVP complete status
- **Moved DEPLOYMENT-QUICKSTART.md** to docs/ for better organization
- **Updated planning documents**:
  - `docs/planning/development-checklist.md` - all MVP tasks marked complete
  - `docs/planning/engineering-plan.md` - complete rewrite reflecting Jamaica focus
  - `docs/PROJECT-STATUS.md` - added recent work and commit history
- **Removed stray files** - PR_BODY.md, duplicate CHANGELOG.md from root

#### CI/CD & Automation
- **GitHub Actions workflow** for automatic version tagging
  - Triggers on push to main branch
  - Reads version from package.json
  - Creates annotated Git tags automatically
  - Generates GitHub releases with changelog
  - Workflow file: `.github/workflows/version-tag.yml`

#### Configuration Updates
- **Claude Code settings** - added permissions for GitHub CLI commands
- **VS Code workspace** - configured PostgreSQL database connection
  - SQLTools extension integration
  - Local database connection settings

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

## [0.8.0] - TRACK 5: Booking & Payment System (100% MVP Complete)

**Features:**
- Complete Stripe payment integration
- Multi-step booking wizard with date selection, guest count, and details form
- Email notifications via Resend
- Booking success page with confirmation details
- User dashboard with booking history

**Status:** MVP development complete at 100%

## [0.6.0] - TRACK 4: Authentication & User Management

**Features:**
- NextAuth.js v5 implementation with credentials and Google OAuth
- User registration and login flows
- Protected routes and session management
- User dashboard

## [0.5.0] - TRACK 3: Tours System

**Features:**
- Tour listing page with advanced filtering and search
- Tour detail pages with image galleries
- Database integration with Prisma ORM
- Tour categories and dynamic content

## [0.3.0] - TRACK 2: Database & Infrastructure

**Features:**
- PostgreSQL database on Supabase
- Prisma ORM setup and schema design
- Database seeding scripts
- API route structure

## [0.2.1] - 2025-10-28

### Added
- **Navigation & Routing (TRACK 1 Progress)**
  - Global navigation bar with NMG Tours branding
  - Mobile-responsive hamburger menu
  - `/tours` page with rafting tour listings (Martha Brae, Rio Grande, White River)
  - `/gallery` page with photo grid layout and social media integration
  - Complete footer navigation with main pages and legal links

### Changed
- Rewrote Navigation component using inline styles for better reliability (replaced Tailwind classes that weren't rendering)
- Updated footer to include Tours, Gallery, and Cookies links
- Improved navigation z-index and positioning for guaranteed visibility

### Removed
- Removed conflicting `app/legal/layout.tsx` that was overriding global navigation
- Removed duplicate `/home` directory causing build conflicts

### Fixed
- **CRITICAL**: Fixed navigation invisibility issue - navigation now renders correctly on all pages
- Fixed legal page routing - all `/legal/*` routes now accessible with global navigation
- Fixed landing page layout to work properly with fixed navigation bar
- Fixed background image positioning for better display
- Fixed footer link organization with visual separator between sections

### Known Issues
- Legal pages (terms, privacy, cookies, refunds, safety) theming issues resolved in v0.8.0+
- Background image `NMGTOURS.png` may need physical file replacement if showing outdated colors

## [0.2.0] - 2025-01-28

### Added
- **Database Infrastructure (TRACK 2 Complete)**
  - Prisma ORM setup with PostgreSQL (Supabase)
  - Comprehensive schema with 10 models: Users, Tours, Bookings, Reviews, Categories, Images, Availability
  - NextAuth.js compatible authentication models
  - Proper relationships, indexes, and cascading deletes
- **API Routes**
  - `/api/tours` - Tour listing with filtering (featured, category, difficulty, price, search)
  - `/api/tours/[id]` - Individual tour CRUD operations
  - `/api/bookings` - Booking creation and management
- **Seed Data**
  - 8 realistic Jamaican tours (Martha Brae, Rio Grande, White River, Dunn's River, Blue Hole, Mayfield Falls, Mystic Mountain, Black River Safari)
  - Categories with icons
  - 30 days of pre-seeded availability
  - Admin user for testing
- **Developer Experience**
  - Database management scripts in package.json (generate, push, migrate, seed, studio)
  - Updated .env.example with Supabase connection format
  - Prisma Client singleton for Next.js best practices

### Changed
- Moved `prisma` from devDependencies to dependencies for Vercel deployment
- Updated Next.js 16 API routes to handle async params

### Removed
- Removed `prisma.config.ts` (caused Vercel build issues)
- Removed deprecated `prisma` section from package.json

### Fixed
- Fixed Vercel deployment issues with Prisma configuration
- Fixed Next.js 16 TypeScript errors with async route params
- Fixed pnpm-lock.yaml sync issues

## [0.1.0] - TRACK 1: Foundation & Marketing

**Features:**
- Next.js 16 + React 19 + TypeScript setup
- Responsive navigation and footer
- Homepage with hero section
- About, Contact, and Gallery pages
- Emerald/black design system
- Initial project creation with planning documentation
- Engineering plan with 13-week timeline
- Development checklist with 200+ tasks
- Technical specification
- Quick start guide
- Contributing guidelines

---

## Version History Guidelines

### Version Numbering
- **Major (X.0.0)**: Incompatible API changes, major feature releases
- **Minor (0.X.0)**: New functionality in a backwards compatible manner
- **Patch (0.0.X)**: Backwards compatible bug fixes

### Categories
- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Vulnerability fixes

### Example Entry
```markdown
## [1.0.0] - 2024-12-01

### Added
- Tour booking system with real-time availability
- Stripe payment integration
- Email notifications for bookings

### Fixed
- Mobile navigation menu overflow issue
- Date picker timezone handling
```

---

## Links

- [Repository](https://github.com/yourusername/nmgtoursjam)
- [Live Site](https://www.nmgtoursjam.com)
- [Project Documentation](./docs/)
