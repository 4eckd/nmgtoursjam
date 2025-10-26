# NMGToursJam Website Engineering Project Plan

## Project Status Assessment
**Current State**: Fresh Next.js installation with default template  
**Target State**: Full-featured tourism platform for New Mexico tours and cultural experiences

## Project Overview

### Mission
Build a modern tourism platform showcasing New Mexico's unique tours, cultural "jams" (local gatherings/events), and authentic experiences.

### Core Value Propositions
- Discover authentic New Mexico experiences
- Book tours with local guides
- Find and attend cultural jams/events
- Support local tourism businesses

## Technical Architecture

### Technology Stack
```yaml
Frontend:
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Framer Motion (animations)
  - React Hook Form + Zod (forms)

Backend:
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL (Supabase)
  - NextAuth.js (authentication)
  - Stripe (payments)

Infrastructure:
  - Vercel (hosting)
  - Cloudinary (images)
  - SendGrid (emails)
  - Sentry (monitoring)
```

## Development Phases

## Phase 1: Project Foundation (Days 1-5)

### Day 1-2: Environment Setup
```bash
# 1. Install core dependencies
npm install typescript @types/react @types/node
npm install tailwindcss postcss autoprefixer
npm install @prisma/client prisma
npm install next-auth @auth/prisma-adapter
npm install framer-motion
npm install react-hook-form zod @hookform/resolvers
npm install lucide-react
npm install date-fns
npm install @tanstack/react-query
npm install stripe @stripe/stripe-js

# 2. Development dependencies
npm install -D @types/react-dom eslint-config-next
npm install -D prettier eslint-config-prettier
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Day 3: Project Structure Setup
```
nmgtoursjam/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (marketing)/
│   │   ├── page.tsx              # Homepage
│   │   ├── about/
│   │   ├── contact/
│   │   └── layout.tsx
│   ├── (app)/
│   │   ├── dashboard/
│   │   ├── tours/
│   │   │   ├── page.tsx          # Tour listing
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Tour detail
│   │   ├── jams/                 # Events/Jams
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   ├── bookings/
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   ├── tours/
│   │   ├── bookings/
│   │   └── webhooks/stripe/
│   └── layout.tsx
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── modal.tsx
│   ├── features/                 # Feature-specific components
│   │   ├── tours/
│   │   ├── bookings/
│   │   └── jams/
│   └── layouts/
│       ├── header.tsx
│       ├── footer.tsx
│       └── navigation.tsx
├── lib/
│   ├── db.ts                     # Prisma client
│   ├── auth.ts                   # NextAuth config
│   ├── stripe.ts                 # Stripe config
│   └── utils/
├── prisma/
│   └── schema.prisma
├── public/
├── styles/
│   └── globals.css
└── types/
    └── index.ts
```

### Day 4-5: Database Schema Design
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id              String    @id @default(cuid())
  email           String    @unique
  name            String?
  emailVerified   DateTime?
  image           String?
  hashedPassword  String?
  role            Role      @default(USER)
  
  accounts        Account[]
  sessions        Session[]
  bookings        Booking[]
  reviews         Review[]
  savedTours      SavedTour[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Tour {
  id              String    @id @default(cuid())
  title           String
  slug            String    @unique
  description     String    @db.Text
  shortDesc       String
  price           Decimal   @db.Money
  duration        Int       // in hours
  difficulty      Difficulty
  maxGroupSize    Int
  
  // Location
  meetingPoint    String
  city            String
  state           String    @default("NM")
  coordinates     Json?     // {lat, lng}
  
  // Media
  images          Image[]
  coverImage      String
  
  // Features
  included        String[]
  notIncluded     String[]
  highlights      String[]
  
  // Relations
  guide           Guide     @relation(fields: [guideId], references: [id])
  guideId         String
  category        Category  @relation(fields: [categoryId], references: [id])
  categoryId      String
  
  bookings        Booking[]
  reviews         Review[]
  availability    Availability[]
  savedByUsers    SavedTour[]
  
  // Status
  isActive        Boolean   @default(true)
  featured        Boolean   @default(false)
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Jam {
  id              String    @id @default(cuid())
  title           String
  slug            String    @unique
  description     String    @db.Text
  type            JamType   // MUSIC, CULTURAL, FOOD, ART, etc.
  
  // Event Details
  date            DateTime
  startTime       String
  endTime         String
  venue           String
  address         String
  city            String
  coordinates     Json?
  
  // Capacity & Pricing
  capacity        Int?
  ticketPrice     Decimal?  @db.Money
  isFree          Boolean   @default(false)
  
  // Media
  images          Image[]
  coverImage      String
  
  // Relations
  host            Host      @relation(fields: [hostId], references: [id])
  hostId          String
  bookings        Booking[]
  
  // Status
  isActive        Boolean   @default(true)
  isCancelled     Boolean   @default(false)
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Booking {
  id              String    @id @default(cuid())
  bookingNumber   String    @unique
  
  // Relations
  user            User      @relation(fields: [userId], references: [id])
  userId          String
  tour            Tour?     @relation(fields: [tourId], references: [id])
  tourId          String?
  jam             Jam?      @relation(fields: [jamId], references: [id])
  jamId           String?
  
  // Booking Details
  date            DateTime
  guests          Int
  totalPrice      Decimal   @db.Money
  
  // Payment
  paymentStatus   PaymentStatus @default(PENDING)
  paymentIntentId String?
  
  // Contact Info (for guests)
  guestName       String?
  guestEmail      String?
  guestPhone      String?
  specialRequests String?
  
  status          BookingStatus @default(CONFIRMED)
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

// Enums
enum Role {
  USER
  GUIDE
  HOST
  ADMIN
}

enum Difficulty {
  EASY
  MODERATE
  CHALLENGING
  EXTREME
}

enum JamType {
  MUSIC
  CULTURAL
  FOOD
  ART
  DANCE
  WORKSHOP
  OTHER
}

enum PaymentStatus {
  PENDING
  PROCESSING
  SUCCEEDED
  FAILED
  REFUNDED
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
  NO_SHOW
}
```

## Phase 2: Core Features Implementation (Days 6-20)

### Week 2: Authentication & User Management
- [ ] NextAuth.js setup with credentials + OAuth
- [ ] User registration flow
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User dashboard layout
- [ ] Profile management

### Week 3: Tour Management System
```typescript
// Key Components to Build:

// 1. Tour Listing Page
- Tour grid/list view toggle
- Advanced filtering (price, duration, difficulty, category)
- Sort options (price, rating, popularity)
- Pagination or infinite scroll
- Search functionality

// 2. Tour Detail Page
- Image gallery with lightbox
- Tour information tabs
- Availability calendar
- Booking widget
- Reviews section
- Related tours
- Guide profile card

// 3. Tour Search & Filters
- Location-based search
- Date availability
- Group size
- Price range slider
- Category checkboxes
- Difficulty filter
```

### Week 4: Jam/Event System
- [ ] Event listing page
- [ ] Event detail view
- [ ] Calendar view
- [ ] Event categories
- [ ] RSVP/Ticketing system
- [ ] Reminder notifications setup

## Phase 3: Booking & Payment System (Days 21-30)

### Booking Flow Implementation
```typescript
// app/components/features/bookings/BookingFlow.tsx
Steps:
1. Select Date & Guests
2. Review Booking Details
3. Guest Information
4. Payment (Stripe)
5. Confirmation

// Key Features:
- Real-time availability checking
- Dynamic pricing calculation
- Group booking support
- Booking modifications
- Cancellation handling
```

### Stripe Integration
- [ ] Payment intent creation
- [ ] Card element integration
- [ ] Webhook handling
- [ ] Refund processing
- [ ] Invoice generation

## Phase 4: Content Management (Days 31-40)

### Admin Dashboard
```typescript
// Admin Features:
1. Tour Management
   - Create/Edit/Delete tours
   - Manage availability
   - Set pricing rules
   - Upload images

2. Booking Management
   - View all bookings
   - Process refunds
   - Generate reports
   - Export data

3. User Management
   - View users
   - Manage roles
   - Handle support tickets

4. Analytics Dashboard
   - Revenue metrics
   - Booking trends
   - Popular tours
   - User demographics
```

### Guide Portal
- [ ] Guide registration
- [ ] Tour creation interface
- [ ] Availability management
- [ ] Earnings dashboard
- [ ] Review management

## Phase 5: Advanced Features (Days 41-50)

### Review System
- [ ] Star rating component
- [ ] Written reviews
- [ ] Photo uploads
- [ ] Review moderation
- [ ] Response from guides

### Search & Discovery
- [ ] Full-text search
- [ ] Map integration (Mapbox)
- [ ] "Near me" functionality
- [ ] Saved searches
- [ ] Wishlist feature

### Email Notifications
```typescript
// Email Templates:
- Welcome email
- Booking confirmation
- Booking reminder (24h before)
- Review request (post-tour)
- Password reset
- Payment receipt
```

## Phase 6: Mobile Optimization & PWA (Days 51-55)

### Responsive Design
- [ ] Mobile-first approach
- [ ] Touch-friendly interfaces
- [ ] Optimized images
- [ ] Simplified navigation

### Progressive Web App
```javascript
// next.config.js PWA setup
- Service worker
- Offline functionality
- App manifest
- Push notifications
- Install prompt
```

## Phase 7: Testing & Quality Assurance (Days 56-60)

### Testing Strategy
```bash
# Unit Tests (Jest + React Testing Library)
npm install -D jest @testing-library/react @testing-library/jest-dom

# E2E Tests (Playwright)
npm install -D @playwright/test

# Test Coverage Goals:
- Components: 80%
- API Routes: 90%
- Critical Paths: 100%
```

### Performance Optimization
- [ ] Lighthouse audit (target 90+ scores)
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading
- [ ] CDN setup

## Phase 8: Launch Preparation (Days 61-65)

### Pre-Launch Checklist
- [ ] Security audit
- [ ] GDPR compliance
- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] SSL certificate
- [ ] Backup strategy
- [ ] Error monitoring (Sentry)
- [ ] Analytics (GA4, Hotjar)

### Deployment Configuration
```yaml
# vercel.json
{
  "buildCommand": "prisma generate && next build",
  "env": {
    "DATABASE_URL": "@database_url",
    "NEXTAUTH_SECRET": "@nextauth_secret",
    "STRIPE_SECRET_KEY": "@stripe_secret",
    "SENDGRID_API_KEY": "@sendgrid_key"
  }
}
```

## Marketing Website Content Structure

### Homepage Sections
1. **Hero Section**
   - Compelling headline: "Discover Authentic New Mexico"
   - Video background of NM landscapes
   - Search bar for tours/jams
   - CTA buttons

2. **Featured Tours**
   - Curated selection
   - "Best sellers" badge
   - Quick booking option

3. **Upcoming Jams**
   - Event calendar preview
   - Filter by type
   - "This weekend" section

4. **Why Choose NMGToursJam**
   - Local expertise
   - Authentic experiences
   - Safety commitment
   - Sustainability focus

5. **Testimonials**
   - Customer reviews
   - Video testimonials
   - Trust badges

6. **Newsletter Signup**
   - Email capture
   - Welcome discount

## Success Metrics

### Technical KPIs
- Page load time < 3s
- Lighthouse score > 90
- Zero critical security issues
- 99.9% uptime

### Business KPIs
- Booking conversion rate > 5%
- User retention rate > 40%
- Average session duration > 3 min
- Mobile traffic > 60%

## Risk Mitigation

### Technical Risks
1. **Performance Issues**
   - Mitigation: Regular performance audits, CDN usage
   
2. **Security Vulnerabilities**
   - Mitigation: Regular updates, security headers, OWASP compliance

3. **Scalability Concerns**
   - Mitigation: Serverless architecture, database optimization

### Business Risks
1. **Low Adoption**
   - Mitigation: Beta testing, early user feedback
   
2. **Payment Issues**
   - Mitigation: Multiple payment options, clear policies

## Timeline Summary

- **Foundation**: Days 1-5
- **Core Features**: Days 6-30
- **Advanced Features**: Days 31-50
- **Polish & Testing**: Days 51-60
- **Launch Prep**: Days 61-65

**Total Timeline**: ~13 weeks for full implementation

## Next Immediate Steps

1. **Day 1-2**: Set up development environment
2. **Day 3**: Initialize project structure
3. **Day 4-5**: Configure database and authentication
4. **Week 2**: Build authentication system
5. **Week 3**: Implement tour listing and details

## Development Commands

```bash
# Start development
npm run dev

# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

This engineering plan provides a clear roadmap to transform your current Next.js setup into a fully functional tourism platform for New Mexico. Each phase builds upon the previous one, ensuring steady progress toward launch.