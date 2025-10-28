# Changelog

All notable changes to the NMGToursJam project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- None

### Changed
- None

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- None

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
  - 3 realistic Jamaican rafting tours (Martha Brae, Rio Grande, White River)
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

## [0.1.0] - 2024-10-26

### Added
- Initial project creation
- Basic Next.js setup with create-next-app
- Project planning documentation
  - Engineering plan with 13-week timeline
  - Development checklist with 200+ tasks
  - Technical specification
  - Quick start guide
- Contributing guidelines
- Documentation structure

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