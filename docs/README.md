# NMG Tours Jamaica Documentation

Welcome to the NMG Tours Jamaica project documentation. This comprehensive guide contains everything you need to understand, develop, and deploy this modern tourism booking platform for authentic Jamaican island experiences.

## 📚 Documentation Structure

### 📋 Planning & Status Documents
- **[Project Status](./PROJECT-STATUS.md)** - Current development status and progress tracking
- **[TRACK 1 Status](./TRACK1-STATUS.md)** - Marketing & Content (Foundation)
- **[TRACK 2 Status](./TRACK2-STATUS.md)** - Database & Infrastructure
- **[TRACK 3 Status](./TRACK3-STATUS.md)** - Tours System
- **[TRACK 4 Status](./TRACK4-STATUS.md)** - Authentication & User Management
- **[TRACK 5 Status](./TRACK5-STATUS.md)** - Booking & Payment System

### 🚀 Deployment & Production
- **[Production Deployment Guide](./PRODUCTION-DEPLOYMENT.md)** - Complete production setup and deployment instructions
- **[Deployment Quick Start](./DEPLOYMENT-QUICKSTART.md)** - Express 5-minute deployment path

### 🔧 Technical Documents
- **[Structure](./STRUCTURE.md)** - Codebase architecture and directory organization
- **[Styling Guidelines](./STYLING-GUIDELINES.md)** - Design system, color palette, and component styling standards
- **[Contributing](./CONTRIBUTING.md)** - Contribution guidelines and development workflow
- **[Security](./SECURITY.md)** - Security policies and vulnerability reporting
- **[Changelog](./CHANGELOG.md)** - Complete version history and release notes

## 🎯 Project Overview

**NMG Tours Jamaica** is a full-stack tourism booking platform specializing in rafting tours and cultural adventures across Jamaica.

### Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **Authentication**: NextAuth.js v5
- **Payments**: Stripe
- **Email**: Resend
- **Hosting**: Vercel
- **Package Manager**: pnpm

### 📈 Current Status: MVP Complete (100%)

**✅ All Tracks Completed:**
- **TRACK 1**: Foundation & Marketing - ✅ Complete
  - Responsive navigation and footer
  - Homepage with hero section
  - About, Contact, and Gallery pages
  - Emerald/black design system

- **TRACK 2**: Database & Infrastructure - ✅ Complete
  - PostgreSQL on Supabase
  - Prisma ORM with comprehensive schema (10 models)
  - API routes for tours and bookings
  - Database seeding with 8 Jamaican tours

- **TRACK 3**: Tours System - ✅ Complete
  - Tour listing with filtering, search, and sorting
  - Tour detail pages with image galleries
  - Categories API endpoint
  - Mobile-responsive design

- **TRACK 4**: Authentication & User Management - ✅ Complete
  - NextAuth.js v5 with credentials + Google OAuth
  - Login/signup flows
  - Protected routes and session management
  - User dashboard

- **TRACK 5**: Booking & Payment System - ✅ Complete
  - Multi-step booking wizard
  - Stripe payment integration
  - Email notifications via Resend
  - Booking confirmation and history

**🎉 MVP Status**: Ready for production deployment

## 🚦 Getting Started

### For New Developers

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nmgtoursjam.git
   cd nmgtoursjam
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Fill in the required values:
   - `DATABASE_URL` - PostgreSQL connection string (Supabase)
   - `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
   - `STRIPE_SECRET_KEY` - Stripe secret key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
   - `RESEND_API_KEY` - Resend email API key
   - `EMAIL_FROM` - Sender email address

4. **Set up the database**
   ```bash
   pnpm db:push     # Push schema to database
   pnpm db:seed     # Seed with sample data
   ```

5. **Run development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

### Quick Reference Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm start            # Run production build
pnpm lint             # Run ESLint

# Database
pnpm db:generate      # Generate Prisma Client
pnpm db:push          # Push schema (dev)
pnpm db:migrate       # Create migration (prod)
pnpm db:seed          # Seed database
pnpm db:studio        # Open Prisma Studio
```

## 🏗️ Key Features

### For Tourists
- Browse authentic Jamaican tours (rafting, cultural, adventure)
- Advanced filtering and search
- Secure Stripe payment processing
- Email booking confirmations
- User dashboard with booking history
- Review and rating system

### For Administrators
- Complete user and booking management
- Tour content management via Prisma Studio
- Payment tracking
- Email automation

## 🛠️ Development Workflow

### Branch Strategy

**Main Branches:**
- `main` - Production-ready code
- `integration/mvp-launch` - Integration branch for MVP features

**Feature Branch Pattern:**
```bash
# Create feature branch from integration
git checkout integration/mvp-launch
git pull
git checkout -b feature/your-feature-name

# Work on feature...
pnpm build  # Verify build passes

# Create PR to integration branch (NOT main)
gh pr create --base integration/mvp-launch \
  --title "feat(scope): description"
```

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat(scope): description` - New features
- `fix(scope): description` - Bug fixes
- `refactor(scope): description` - Code refactoring
- `docs: description` - Documentation only
- `style: description` - Formatting/styling
- `test: description` - Adding tests
- `chore: description` - Dependencies, tooling

## 📊 Project Architecture

### Directory Structure
```
app/
├── (marketing)/         # Public pages
│   ├── page.tsx        # Homepage
│   ├── about/
│   ├── contact/
│   └── gallery/
├── tours/              # Tour browsing
│   ├── page.tsx       # Tour listing
│   └── [slug]/        # Tour details
├── dashboard/          # User dashboard
├── bookings/           # Booking flow
├── legal/              # Legal pages
├── api/                # API routes
│   ├── tours/
│   ├── bookings/
│   ├── categories/
│   └── webhooks/
├── components/         # React components
└── layout.tsx          # Root layout

prisma/
├── schema.prisma       # Database schema
└── seed.ts            # Seed data

docs/                   # Documentation (you are here)
```

### Design System

**Color Palette:**
- **Primary**: Emerald (#10b981) - Brand color, CTAs, accents
- **Secondary**: Black/Dark grays - Backgrounds, navigation
- **Accent**: White/Light colors - Text, contrast

**Fonts:**
- **Poppins** - Body text and UI (400, 600, 700)
- **Caveat** - Accent and personality touches (400, 700)

**Responsive Breakpoints:**
- Mobile: 375px (default)
- Tablet: 768px (md:)
- Desktop: 1024px (lg:)
- Large: 1440px (xl:)

## 📝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

Key points:
- All PRs must pass `pnpm build`
- Follow TypeScript strict mode
- Maintain WCAG AA accessibility compliance
- Mobile-first responsive design
- Test at all breakpoints

## 🔐 Security

See [SECURITY.md](./SECURITY.md) for security policies and vulnerability reporting.

## 📞 Support & Resources

- **Issues**: [GitHub Issues](https://github.com/yourusername/nmgtoursjam/issues)
- **Documentation**: This directory
- **Changelog**: [CHANGELOG.md](./CHANGELOG.md)

## 🚀 Quick Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)

---

**Last Updated**: October 2025
**Version**: 0.8.0 (MVP Complete)
