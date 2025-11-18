# MVP Development Milestones

This document outlines the 5 parallel development tracks for the NMG Tours Jamaica MVP launch.

## Overview

The MVP follows a **parallel development strategy** with 5 tracks that can be worked on simultaneously. TRACK 2 (Database & Infrastructure) is the critical path that unblocks other tracks.

### Status Legend
- ✅ **Completed** - Implemented, tested, and merged
- 🚧 **In Progress** - Currently being developed
- ⏳ **Blocked** - Waiting on dependencies
- 📋 **Planned** - Ready to start

---

## TRACK 1: Marketing & Content 🎨
**Duration:** 3-5 days | **Priority:** Medium | **Status:** 📋 Planned

### Description
Public-facing pages and content that showcase the NMG Tours Jamaica brand and build trust with potential customers.

### Goals
- Create engaging hero section with Jamaican imagery
- Build photo gallery showcasing tour experiences
- Write compelling about page content
- Implement functional contact form

### Features

#### 1.1 Hero Section Enhancement
- [ ] Full-screen video background option
- [ ] Dynamic text with Caveat font accents
- [ ] Call-to-action buttons (Book Now, View Tours)
- [ ] Emerald green gradient overlays
- [ ] Mobile-optimized layout

#### 1.2 Gallery Page
- [ ] Responsive photo grid (3 columns desktop, 1 mobile)
- [ ] Lightbox for full-size images
- [ ] Category filters (Rafting, Adventure, Culture)
- [ ] Lazy loading for performance
- [ ] Image optimization with Next.js Image

#### 1.3 About Page Content
- [ ] Company story and mission
- [ ] Team member profiles (guides)
- [ ] Safety certifications and credentials
- [ ] Jamaica tourism board partnerships
- [ ] Customer satisfaction statistics

#### 1.4 Contact Form Backend
- [ ] Form validation (client and server-side)
- [ ] Email integration (Resend or SendGrid)
- [ ] Auto-reply to customers
- [ ] Admin notification system
- [ ] Tour inquiry pre-fill from URL params

### Technical Requirements
- Next.js Server Actions for form handling
- TypeScript form validation with Zod
- Email templates with React Email
- Rate limiting to prevent spam
- Accessibility (WCAG AA compliance)

### Success Criteria
- ✅ Hero section loads in <2 seconds
- ✅ Gallery supports 100+ images without lag
- ✅ Contact form submissions confirmed within 5 seconds
- ✅ Mobile-first responsive design
- ✅ SEO-optimized content

### Dependencies
- None (can start immediately)

### Deliverables
- `/` - Enhanced homepage with hero
- `/gallery` - Photo gallery page
- `/about` - About page with content
- `/contact` - Working contact form
- Email templates
- Image assets (optimized)

---

## TRACK 2: Database & Infrastructure 🔧
**Duration:** 2-3 days | **Priority:** Critical | **Status:** ✅ Completed

### Description
**CRITICAL PATH** - Database setup, ORM configuration, and API infrastructure that enables all other features.

### Goals
- ✅ Set up Prisma ORM with PostgreSQL/SQLite
- ✅ Design database schema for tours, bookings, users
- ✅ Create API route structure
- ✅ Implement database abstraction layer
- ✅ Seed database with sample data

### Features Completed

#### 2.1 Database Abstraction Layer ✅
- [x] Auto-detection of Prisma availability
- [x] Graceful fallback to static data
- [x] Consistent API for data access
- [x] TypeScript type safety

#### 2.2 Prisma Schema ✅
- [x] User model with authentication fields
- [x] Tour model with full details
- [x] Category model for tour types
- [x] Image model for tour galleries
- [x] Availability model for date-based bookings
- [x] Booking model with payment integration
- [x] Review model with moderation

#### 2.3 API Routes ✅
- [x] GET /api/tours (with filters)
- [x] GET /api/tours/[slug]
- [x] GET /api/categories
- [x] POST /api/bookings (ready for implementation)
- [x] Authentication endpoints (NextAuth)

#### 2.4 Data Seeding ✅
- [x] Sample tours (Martha Brae, Rio Grande, White River)
- [x] Categories (Rafting, Adventure, Culture)
- [x] Availability for next 30 days
- [x] Admin user account

### Technical Achievements
- ✅ SQLite for local development
- ✅ PostgreSQL-ready for production
- ✅ Zero-config deployment support
- ✅ Build succeeds in any environment
- ✅ Comprehensive documentation

### Success Criteria
- ✅ Database schema supports all MVP features
- ✅ API endpoints respond in <200ms
- ✅ Seeded data includes realistic tour information
- ✅ Build passes without database connection
- ✅ Easy migration path to production database

### Dependencies
- None (foundation for all other tracks)

### Deliverables
- ✅ `lib/db.ts` - Database abstraction layer
- ✅ `prisma/schema.prisma` - Complete database schema
- ✅ `prisma/seed.ts` - Seed data script
- ✅ API routes for tours, categories, bookings
- ✅ `.env` configuration
- ✅ `DATABASE_SETUP.md` documentation

### Next Steps
- [ ] Deploy to Supabase (optional)
- [ ] Set up production database
- [ ] Enable real-time availability updates

---

## TRACK 3: Tours System Enhancement 🏞️
**Duration:** 4-6 days | **Priority:** High | **Status:** 📋 Planned

### Description
Advanced tour browsing features including search, filters, sorting, and pagination to help users find their perfect experience.

### Goals
- Build comprehensive tour filtering system
- Implement full-text search
- Add sorting capabilities
- Create pagination for large tour lists
- Optimize tour discovery experience

### Features

#### 3.1 Advanced Filtering UI
- [ ] Price range slider (min/max)
- [ ] Difficulty level buttons (Easy, Moderate, Challenging, Extreme)
- [ ] Duration filters (Half-day, Full-day, Multi-day)
- [ ] Category checkboxes (Rafting, Adventure, Culture, etc.)
- [ ] Location/city filters
- [ ] Group size filters
- [ ] Clear all filters button
- [ ] Active filter badges

#### 3.2 Search Functionality
- [ ] Full-text search across title, description, highlights
- [ ] Search suggestions/autocomplete
- [ ] Search results highlighting
- [ ] Search analytics tracking
- [ ] Recent searches (client-side)
- [ ] Popular searches display

#### 3.3 Sorting Options
- [ ] Price (Low to High, High to Low)
- [ ] Duration (Shortest, Longest)
- [ ] Rating (Highest rated)
- [ ] Popularity (Most booked)
- [ ] Newest additions
- [ ] Featured first

#### 3.4 Pagination
- [ ] Page size selector (12, 24, 48 tours)
- [ ] Previous/Next navigation
- [ ] Jump to page numbers
- [ ] Infinite scroll option
- [ ] Total results counter
- [ ] Load more button (mobile)

#### 3.5 Tour Cards Enhancement
- [ ] Quick view modal (preview without navigation)
- [ ] Favorite/wishlist button
- [ ] Share button (social media)
- [ ] Availability indicator (Available today, Limited slots)
- [ ] Price comparison (from $X)
- [ ] Rating stars with count

### Technical Requirements
- Use Next.js server components for filtering
- URL state management (search params)
- Debounced search input
- Optimistic UI updates
- Loading skeletons
- Error boundaries

### Success Criteria
- ✅ Filters apply in <100ms
- ✅ Search returns results in <300ms
- ✅ Pagination supports 1000+ tours
- ✅ Mobile-friendly filter UI
- ✅ Accessible keyboard navigation

### Dependencies
- ✅ TRACK 2: Database & Infrastructure (completed)

### Deliverables
- Enhanced `/tours` page with filters
- `TourFilters` component
- `TourSearch` component
- `TourSort` component
- `Pagination` component
- URL state management utilities

---

## TRACK 4: Authentication & User Management 🔐
**Duration:** 3-4 days | **Priority:** High | **Status:** 📋 Planned

### Description
User authentication system with NextAuth.js, user dashboard for managing bookings, and profile management.

### Goals
- Implement NextAuth.js with multiple providers
- Create user registration and login flows
- Build user dashboard
- Enable profile management
- Set up protected routes

### Features

#### 4.1 NextAuth.js Setup
- [ ] Credentials provider (email/password)
- [ ] Google OAuth provider
- [ ] Facebook OAuth provider (optional)
- [ ] Email verification
- [ ] Password reset flow
- [ ] Session management
- [ ] JWT tokens
- [ ] Secure cookie configuration

#### 4.2 Authentication Pages
- [ ] `/login` - Login form with validation
- [ ] `/signup` - Registration form
- [ ] `/forgot-password` - Password reset request
- [ ] `/reset-password/[token]` - Password reset form
- [ ] `/verify-email/[token]` - Email verification
- [ ] OAuth callback handlers

#### 4.3 User Dashboard (`/dashboard`)
- [ ] Dashboard overview with stats
- [ ] Upcoming bookings card
- [ ] Past bookings history
- [ ] Favorite tours list
- [ ] Account settings link
- [ ] Quick actions (Book again, Leave review)

#### 4.4 Profile Management
- [ ] Edit profile form (name, email, phone)
- [ ] Change password
- [ ] Upload profile picture
- [ ] Email preferences
- [ ] Notification settings
- [ ] Delete account (with confirmation)

#### 4.5 Protected Routes
- [ ] Middleware for route protection
- [ ] Redirect to login for unauthenticated users
- [ ] Role-based access control (USER, GUIDE, ADMIN)
- [ ] Admin dashboard (future)

### Technical Requirements
- NextAuth.js 5.0 (latest beta)
- Prisma adapter for NextAuth
- bcryptjs for password hashing
- Email service (Resend) for verification
- Zod validation for forms
- Server actions for form handling

### Success Criteria
- ✅ Login completes in <2 seconds
- ✅ OAuth providers work seamlessly
- ✅ Email verification sent within 30 seconds
- ✅ Dashboard loads user data in <500ms
- ✅ Forms have real-time validation
- ✅ Secure password requirements enforced

### Dependencies
- ✅ TRACK 2: Database & Infrastructure (completed)

### Deliverables
- `/login` - Login page
- `/signup` - Registration page
- `/dashboard` - User dashboard
- `/dashboard/profile` - Profile settings
- `/dashboard/bookings` - Booking history
- NextAuth configuration
- Protected route middleware
- Email templates

---

## TRACK 5: Booking & Payment Flow 💳
**Duration:** 5-7 days | **Priority:** Critical | **Status:** ⏳ Blocked

### Description
Complete booking system with multi-step wizard, Stripe payment integration, and email confirmations.

### Goals
- Build intuitive multi-step booking wizard
- Integrate Stripe for secure payments
- Implement booking confirmation emails
- Create booking management dashboard
- Handle cancellations and refunds

### Features

#### 5.1 Multi-Step Booking Wizard

**Step 1: Select Date & Time**
- [ ] Calendar date picker
- [ ] Available slots display
- [ ] Time slot selection
- [ ] Group size selector
- [ ] Real-time availability checking

**Step 2: Guest Information**
- [ ] Guest name(s) input
- [ ] Email address
- [ ] Phone number
- [ ] Special requests textarea
- [ ] Terms & conditions checkbox
- [ ] Form validation

**Step 3: Payment**
- [ ] Booking summary review
- [ ] Price breakdown (base, taxes, total)
- [ ] Stripe payment element
- [ ] Credit card input
- [ ] Promo code field (optional)
- [ ] Secure payment badge

**Step 4: Confirmation**
- [ ] Booking confirmation screen
- [ ] Booking reference number
- [ ] Email confirmation sent
- [ ] Calendar add button
- [ ] Print receipt option
- [ ] Next steps instructions

#### 5.2 Stripe Integration
- [ ] Stripe payment intents
- [ ] Webhook handlers for payment events
- [ ] Payment confirmation
- [ ] Failed payment handling
- [ ] Refund processing
- [ ] Test mode for development

#### 5.3 Email Notifications
- [ ] Booking confirmation email (customer)
- [ ] Booking notification email (admin)
- [ ] Payment receipt
- [ ] 24-hour reminder email
- [ ] Cancellation confirmation
- [ ] Email templates with branding

#### 5.4 Booking Management
- [ ] View booking details
- [ ] Cancel booking (24h notice)
- [ ] Request reschedule
- [ ] Download receipt
- [ ] Contact support about booking
- [ ] Leave review after tour

#### 5.5 Admin Features (Basic)
- [ ] View all bookings
- [ ] Mark booking as completed
- [ ] Issue refunds
- [ ] Update booking status
- [ ] Contact customer

### Technical Requirements
- Stripe SDK integration
- Server-side payment validation
- Webhook signature verification
- Email service (Resend)
- React Email for templates
- Form state management (React Hook Form)
- Optimistic UI updates

### Success Criteria
- ✅ Booking flow completes in <3 minutes
- ✅ Payment processing in <5 seconds
- ✅ Confirmation email sent within 30 seconds
- ✅ 99.9% payment success rate (valid cards)
- ✅ Mobile-friendly checkout
- ✅ PCI compliance through Stripe

### Dependencies
- ✅ TRACK 2: Database & Infrastructure (completed)
- ⏳ TRACK 4: Authentication & User Management (for user bookings)

### Deliverables
- `/tours/[slug]/book` - Booking wizard
- `/dashboard/bookings/[id]` - Booking details
- `/api/bookings` - Booking API endpoints
- `/api/stripe/webhook` - Stripe webhook handler
- Stripe integration utilities
- Email templates
- Booking confirmation page

---

## Post-MVP Features (Deferred)

These features are **not** part of the MVP but are planned for future releases:

### Phase 2 (Post-Launch)
- Admin dashboard for tour management
- Review and rating system (customer-facing)
- Map integration (location-based search)
- Multi-language support (English, Spanish)
- Gift cards and vouchers
- Group booking discounts

### Phase 3 (Growth)
- Mobile app (React Native)
- Live chat support
- Advanced analytics dashboard
- Loyalty/rewards program
- Partner/affiliate program
- API for third-party integrations

### Phase 4 (Scale)
- Multi-currency support
- Dynamic pricing (seasonal, demand-based)
- AI-powered tour recommendations
- Virtual tour previews (360°)
- Live tour tracking
- Custom tour builder

---

## Development Workflow

### Starting a New Track

1. **Create Feature Branch**
   ```bash
   git checkout integration/mvp-launch
   git pull
   git checkout -b feature/track-X-feature-name
   ```

2. **Implement Features**
   - Follow component library in `docs/design/tokens/COMPONENT_LIBRARY.md`
   - Use design tokens from `docs/design/tokens/DESIGN_TOKENS.md`
   - Test at mobile (375px), tablet (768px), desktop (1440px)

3. **Verify Build**
   ```bash
   pnpm build
   ```

4. **Create Pull Request**
   ```bash
   gh pr create --base integration/mvp-launch \
     --title "feat(track-X): Feature Name" \
     --body "Description..."
   ```

### Code Review Checklist

- [ ] Build passes (`pnpm build`)
- [ ] TypeScript types are complete (no `any`)
- [ ] Components are responsive (mobile-first)
- [ ] Accessibility tested (WCAG AA)
- [ ] Performance budget met (Lighthouse >80)
- [ ] Documentation updated
- [ ] No console errors or warnings

### Merging Strategy

1. **PR Review** - At least 1 approval required
2. **CI/CD Checks** - All workflows must pass
3. **Merge to Integration** - Squash and merge
4. **Integration Testing** - Verify on preview deployment
5. **Merge to Main** - When MVP complete

---

## Timeline

### Week 1
- ✅ TRACK 2: Database & Infrastructure (Days 1-3)
- 📋 TRACK 1: Marketing & Content (Days 1-5)

### Week 2
- 📋 TRACK 3: Tours System (Days 1-6)
- 📋 TRACK 4: Authentication (Days 1-4)

### Week 3
- 📋 TRACK 5: Booking Flow (Days 1-7)
- 📋 Integration testing
- 📋 Bug fixes

### Week 4
- 📋 Final testing
- 📋 Performance optimization
- 📋 Production deployment
- 🚀 **MVP LAUNCH**

---

## Resources

- [Project Documentation](../../CLAUDE.md)
- [Design System](../design/README.md)
- [Component Library](../design/tokens/COMPONENT_LIBRARY.md)
- [DevOps Guide](../devops/README.md)
- [Database Setup](../../DATABASE_SETUP.md)
- [Engineering Plan](./engineering-plan.md)

---

## Progress Tracking

Track progress at: [GitHub Project Board](https://github.com/4eckd/nmgtoursjam/projects)

**Last Updated:** 2025-01-18
**MVP Target Date:** 2025-02-15
**Current Track:** TRACK 2 (✅ Completed)
**Next Track:** TRACK 3 or TRACK 5 (recommended)
