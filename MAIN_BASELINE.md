# NMG Tours Jamaica - Main Branch Baseline

**Version**: 1.0.0
**Date**: 2025-11-15
**Branch**: `main` (production baseline)
**Status**: Production-ready foundation with 60% MVP complete

---

## 🎯 Main Branch Purpose

This is the **production baseline** for NMG Tours Jamaica. All production deployments are made from this branch.

**Branch Protection**:
- ✅ Requires pull request reviews
- ✅ Requires status checks to pass
- ✅ Requires conversation resolution before merge
- ✅ No direct pushes (all changes via PR from `integration/mvp-launch`)
- ✅ Branch is up-to-date before merging

---

## 📊 Current State (v1.0.0)

### Complete MVP Foundation (60%)

```
Foundation:         ████████████████████████ 100% ✅
Database:           ████████████████████████ 100% ✅
Tours System:       ████████████████░░░░░░░░  80% 🚧
Authentication:     ████████████░░░░░░░░░░░░  60% 🚧
Booking & Payments: ░░░░░░░░░░░░░░░░░░░░░░░░   0% ⏳

Overall Progress:   ████████████░░░░░░░░░░░░  60%
```

### What's Included in This Baseline

**📋 Complete Documentation** (30+ files):
- Design system (11 files): Mockups, flows, tokens, component library
- DevOps (5 files + 4 workflows): CI/CD, deployment, testing, branch strategy
- Planning (3 files): Feature milestones, version control tracking
- Templates (3 files): CLAUDE.md, CLAUDE_CLEAN.md, KICKSTARTER_CLAUDE.md
- Status tracking: MVP-STATUS.md, PROJECT-STATUS.md

**💻 Implemented Features**:
- Next.js 16 + React 19 + TypeScript 5 ✅
- Tailwind CSS 4 with emerald Jamaican theme ✅
- Prisma ORM + PostgreSQL (10 models) ✅
- 6 API endpoints (tours, bookings, categories, auth) ✅
- 8 React components ✅
- Authentication setup (NextAuth.js) ✅
- Tours listing and detail pages ✅
- Gallery page ✅
- Login/signup pages ✅

**🎨 Design System**:
- 100+ CSS design tokens ✅
- Emerald color palette (#10b981) ✅
- Poppins + Caveat fonts ✅
- Logo integration with hover effects ✅
- Responsive breakpoints (375, 768, 1024, 1440px) ✅
- Container max-width 1400px ✅

**🔧 DevOps Infrastructure**:
- 4 GitHub Actions workflows ✅
- Vercel deployment configuration ✅
- Performance budgets (Lighthouse CI) ✅
- Security scanning (daily) ✅
- Branch protection strategy ✅

---

## 📁 Repository Structure

```
nmgtoursjam/
├── 📄 README.md                    # Project overview
├── 📄 CLAUDE.md                    # Claude Code guide (brand-specific)
├── 📄 CLAUDE_CLEAN.md             # Generic template for future projects
├── 📄 CLAUDE_USAGE.md             # Token usage tracking
├── 📄 KICKSTARTER_CLAUDE.md       # Design/DevOps kickstart guide
├── 📄 MVP-STATUS.md               # MVP development status
├── 📄 lighthouse-budget.json      # Performance budgets
│
├── .github/
│   └── workflows/                 # 4 CI/CD workflows
│       ├── ci.yml                 # Main CI pipeline
│       ├── preview-deploy.yml     # Preview deployments
│       ├── lighthouse.yml         # Performance audits
│       └── security-scan.yml      # Security scans
│
├── app/
│   ├── api/
│   │   ├── auth/                  # NextAuth routes
│   │   ├── bookings/              # Booking API
│   │   ├── categories/            # Categories API
│   │   └── tours/                 # Tours API
│   ├── components/
│   │   ├── Navigation.tsx         # Global nav
│   │   ├── Footer.tsx             # Global footer
│   │   ├── SessionProvider.tsx    # Auth session
│   │   └── tours/                 # 4 tour components
│   ├── tours/
│   │   ├── page.tsx               # Tour listing
│   │   └── [slug]/page.tsx        # Tour detail
│   ├── pages/                     # Legal pages
│   ├── login/page.tsx             # Login page
│   ├── signup/page.tsx            # Signup page
│   ├── gallery/page.tsx           # Gallery page
│   ├── about/page.tsx             # About page
│   ├── contact/page.tsx           # Contact page
│   ├── page.tsx                   # Homepage
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Design tokens
│
├── prisma/
│   ├── schema.prisma              # Database schema (10 models)
│   ├── seed.ts                    # Seed data (3 tours)
│   └── README.md                  # Database docs
│
├── docs/
│   ├── design/                    # 11 design files
│   │   ├── README.md
│   │   ├── STATUS.md
│   │   ├── mockups/               # 5 wireframes
│   │   ├── flows/                 # 2 journey diagrams
│   │   └── tokens/                # 2 token specs
│   ├── devops/                    # 5 DevOps files
│   │   ├── README.md
│   │   ├── CI_CD_SETUP.md
│   │   ├── DEPLOYMENT.md
│   │   ├── TESTING.md
│   │   └── BRANCH_STRATEGY.md
│   ├── planning/                  # 3 planning files
│   │   ├── FEATURE_MILESTONES.md
│   │   ├── VERSION_CONTROL_TRACKING.md
│   │   └── development-checklist.md
│   ├── PROJECT-STATUS.md
│   ├── TRACK2-STATUS.md
│   ├── TRACK3-STATUS.md
│   ├── TRACK4-STATUS.md
│   ├── CHANGELOG.md
│   ├── LICENSE
│   └── SECURITY.md
│
├── lib/
│   └── prisma.ts                  # Database client
│
├── types/
│   └── next-auth.d.ts            # Auth types
│
├── auth.config.ts                 # NextAuth config
├── auth.ts                        # NextAuth setup
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL database (Supabase recommended)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/4eckd/nmgtoursjam.git
cd nmgtoursjam

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database URL and secrets

# Run database migrations
pnpm prisma generate
pnpm prisma db push

# Seed database with sample data
pnpm prisma db seed

# Start development server
pnpm dev
```

### Environment Variables

Required in `.env.local`:

```bash
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional (for production)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

---

## 🔄 Development Workflow

### Branch Strategy

```
main (production)
  ↑
  └── integration/mvp-launch (staging)
        ↑
        ├── feature/M1.1-hero-section
        ├── feature/M2.1-database-schema
        ├── feature/M3.1-tour-listing
        └── feature/M5.1-booking-wizard
```

### Creating New Features

```bash
# 1. Start from integration branch
git checkout integration/mvp-launch
git pull

# 2. Create feature branch
git checkout -b feature/M3.1-tour-search

# 3. Develop and commit
git add .
git commit -m "feat(tours): implement search functionality"

# 4. Push to remote
git push -u origin feature/M3.1-tour-search

# 5. Create PR to integration branch (NOT main)
gh pr create --base integration/mvp-launch \
  --title "feat(tours): Implement search and filters (M3.1)"

# 6. After merge, integration → main happens via release PR
```

### Merging to Main

**Only release-ready work merges to main via PR from integration branch**:

```bash
# When ready for production release:
git checkout integration/mvp-launch
git pull

# Create release PR
gh pr create --base main \
  --title "release: v1.1.0 - Complete Tours System" \
  --body "Release notes..."
```

---

## 📈 Quality Gates

Every PR to main must pass:

**Code Quality**:
- ✅ ESLint: 0 errors
- ✅ TypeScript: 0 type errors
- ✅ Build: `pnpm build` succeeds
- ✅ Prettier: Code formatted

**Testing**:
- ✅ Unit tests: 70%+ coverage
- ✅ Integration tests: Critical paths
- ✅ Manual QA: 3 breakpoints tested

**Performance**:
- ✅ Lighthouse Performance: >80
- ✅ First Contentful Paint: <2s
- ✅ Time to Interactive: <3.5s

**Accessibility**:
- ✅ Lighthouse Accessibility: >90
- ✅ WCAG AA compliance
- ✅ Keyboard navigation: 100%

---

## 📊 Component Status

**Implemented** (8/80 = 10%):
- ✅ Navigation
- ✅ Footer
- ✅ SessionProvider
- ✅ SessionProviderWrapper
- ✅ TourCard
- ✅ TourFilters
- ✅ ImageGallery
- ✅ ToursClient

**High Priority for MVP** (22 remaining):
- ⏳ Hero
- ⏳ Features
- ⏳ Testimonials
- ⏳ CTA
- ⏳ SearchBar
- ⏳ Pagination
- ⏳ TourDetailTabs
- ⏳ ReviewCard
- ⏳ BookingWidget
- ⏳ DatePicker
- ⏳ GuestSelector
- ⏳ TravelerForm
- ⏳ PaymentForm
- ⏳ ConfirmationCard
- ⏳ UserDashboard
- ⏳ BookingCard
- ⏳ ProfileSettings
- ⏳ Button
- ⏳ Input
- ⏳ Select
- ⏳ Modal
- ⏳ Toast

---

## 🗄️ Database Schema

**10 Models**:
1. **Tour** - Tour listings (title, description, price, duration, category)
2. **Booking** - Customer bookings (tour, user, date, guests, status)
3. **User** - User accounts (name, email, password, role)
4. **Review** - Tour reviews (tour, user, rating, comment)
5. **Category** - Tour categories (name, slug, description)
6. **Image** - Tour images (tour, url, alt, order)
7. **Availability** - Tour availability (tour, date, spots, booked)
8. **Payment** - Payment transactions (booking, amount, status, stripe)
9. **Contact** - Contact submissions (name, email, message, status)
10. **Settings** - Site configuration (key, value, type)

**API Endpoints** (6):
- `GET /api/tours` - List tours with filters
- `GET /api/tours/[id]` - Get tour details
- `POST /api/tours` - Create tour (admin)
- `POST /api/bookings` - Create booking
- `GET /api/categories` - List categories
- `POST /api/auth/register` - Register user

---

## 🎨 Design Tokens

**Colors**:
```css
--color-primary: #10b981;        /* Emerald 500 */
--color-primary-light: #34d399;  /* Emerald 400 */
--color-primary-dark: #059669;   /* Emerald 600 */
```

**Typography**:
```css
--font-primary: 'Poppins', sans-serif;
--font-accent: 'Caveat', cursive;
```

**Container**:
```css
--container-max: 1400px;
--container-padding: 1rem;
```

**Breakpoints**:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px
- Wide: 1440px

---

## 🔐 Security

**Implemented**:
- ✅ NextAuth.js for authentication
- ✅ bcrypt password hashing
- ✅ CSRF protection
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection (React)
- ✅ GitHub secret scanning
- ✅ Dependency auditing (daily)

**Pending**:
- ⏳ Rate limiting
- ⏳ OAuth providers (Google)
- ⏳ Two-factor authentication
- ⏳ Email verification

---

## 📊 Performance

**Current Targets** (enforced by Lighthouse CI):
- Performance: >80
- Accessibility: >90
- Best Practices: >80
- SEO: >80
- PWA: >50

**Optimization**:
- ✅ Next.js Image optimization
- ✅ Code splitting (automatic)
- ✅ Font optimization (next/font)
- ⏳ Lazy loading below fold
- ⏳ Bundle size monitoring
- ⏳ CDN for static assets

---

## 🚀 Deployment

**Platform**: Vercel

**Automatic Deployments**:
- `main` branch → Production (nmgtoursjam.vercel.app)
- Pull Requests → Preview deployments
- `integration/mvp-launch` → Staging (optional)

**Environment Variables** (Vercel):
- `DATABASE_URL` - PostgreSQL connection
- `NEXTAUTH_SECRET` - Auth secret
- `NEXTAUTH_URL` - Production URL
- `STRIPE_SECRET_KEY` - Stripe API key
- `STRIPE_PUBLISHABLE_KEY` - Stripe public key

**Deployment Checklist**:
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Seed data loaded (if needed)
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Analytics enabled

---

## 📝 Documentation

**Main Guides**:
- [CLAUDE.md](CLAUDE.md) - Complete development guide
- [MVP-STATUS.md](MVP-STATUS.md) - Current progress
- [docs/README.md](docs/README.md) - Documentation hub

**Design**:
- [Design System](docs/design/README.md) - Complete overview
- [Mockups](docs/design/mockups/) - 5 wireframes
- [Component Library](docs/design/tokens/COMPONENT_LIBRARY.md) - 80+ components

**DevOps**:
- [CI/CD Setup](docs/devops/CI_CD_SETUP.md) - Pipeline docs
- [Deployment](docs/devops/DEPLOYMENT.md) - Vercel guide
- [Branch Strategy](docs/devops/BRANCH_STRATEGY.md) - Git workflow

**Planning**:
- [Feature Milestones](docs/planning/FEATURE_MILESTONES.md) - 15 milestones
- [Version Control](docs/planning/VERSION_CONTROL_TRACKING.md) - Automation

---

## 🎯 Roadmap

### Immediate (This Week)
- [ ] Complete Track 3 - Tours System (20% remaining)
- [ ] Complete Track 4 - Authentication (40% remaining)
- [ ] Add unit tests (0% → 70%)

### Short-Term (2 Weeks)
- [ ] Start Track 5 - Booking & Payments
- [ ] Implement hero section
- [ ] Add contact form
- [ ] Performance optimization

### Medium-Term (1 Month)
- [ ] Complete MVP (100%)
- [ ] Launch to production
- [ ] User acceptance testing
- [ ] Marketing site live

### Long-Term (3 Months)
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Advanced analytics
- [ ] Multi-language support

---

## 🤝 Contributing

This is a production branch. All contributions must:

1. Start from `integration/mvp-launch` branch
2. Follow conventional commit format
3. Pass all quality gates
4. Be reviewed and approved
5. Merge to `integration` first, then to `main` via release PR

See [BRANCH_STRATEGY.md](docs/devops/BRANCH_STRATEGY.md) for details.

---

## 📞 Support

**Documentation**: `docs/` directory
**Issues**: GitHub Issues
**Discussions**: GitHub Discussions

---

## 📄 License

See [LICENSE](docs/LICENSE)

---

**Maintained by**: NMG Tours Jamaica Development Team
**Last Updated**: 2025-11-15
**Version**: 1.0.0
**Status**: Production Baseline Ready 🚀
