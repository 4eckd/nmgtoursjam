# Café/Bar/Grill - Development Roadmap & Implementation Checklist

## Project Timeline Overview

**Total Duration**: 8-10 weeks
**Team Size**: 2-3 developers (1 full-stack, 1 frontend, 1 backend/database)
**Development Branch**: `claude/street-vendor-cafe-mvp-011CUbDpczzSxPjQQNKukcb6`
**Integration Branch**: `integration/mvp-launch`
**Target MVP Launch**: Q1 2026

---

## Development Phases

### **Phase 1: Foundation & Infrastructure (Week 1-2)**
### **Phase 2: Menu System (Week 3-4)**
### **Phase 3: Order System (Week 5-6)**
### **Phase 4: Reservation System (Week 7)**
### **Phase 5: Integration & Testing (Week 8)**
### **Phase 6: Polish & Launch Prep (Week 9-10)**

---

## Phase 1: Foundation & Infrastructure (Week 1-2)

### 📋 Week 1: Database & API Setup

#### Database Schema
- [ ] **Create Prisma schema extensions**
  - [ ] Define MenuCategory model
  - [ ] Define MenuItem model with all fields
  - [ ] Define Table model
  - [ ] Define CafeOrder and OrderItem models
  - [ ] Define Reservation model
  - [ ] Define MenuItemReview model
  - [ ] Add café relationships to User model
  - [ ] Create enums (OrderType, OrderStatus, ReservationStatus, etc.)

- [ ] **Generate and test migrations**
  - [ ] Run `npx prisma migrate dev --name add_cafe_models`
  - [ ] Review generated SQL
  - [ ] Test migration on dev database
  - [ ] Verify all foreign keys and constraints

- [ ] **Create seed scripts**
  - [ ] Seed menu categories (8 categories)
  - [ ] Seed sample menu items (40-50 items)
  - [ ] Seed tables (indoor, outdoor, bar)
  - [ ] Run `npx prisma db seed`

#### API Routes Setup
- [ ] **Create API directory structure**
  ```bash
  app/api/cafe/
  ├── menu/
  │   ├── route.ts
  │   └── [slug]/route.ts
  ├── categories/route.ts
  ├── orders/
  │   ├── route.ts
  │   └── [id]/
  │       ├── route.ts
  │       └── status/route.ts
  ├── reservations/
  │   ├── route.ts
  │   ├── [id]/route.ts
  │   └── availability/route.ts
  └── reviews/route.ts
  ```

- [ ] **Implement core API endpoints**
  - [ ] GET `/api/cafe/menu` - List menu items with filters
  - [ ] GET `/api/cafe/menu/[slug]` - Get menu item details
  - [ ] GET `/api/cafe/categories` - List categories
  - [ ] POST `/api/cafe/orders` - Create order
  - [ ] GET `/api/cafe/orders/[id]` - Get order details
  - [ ] POST `/api/cafe/reservations` - Create reservation
  - [ ] GET `/api/cafe/reservations/availability` - Check availability

- [ ] **Set up validation schemas (Zod)**
  - [ ] Menu query parameters validation
  - [ ] Order creation validation
  - [ ] Reservation creation validation
  - [ ] Review submission validation

#### Authentication & Authorization
- [ ] **Extend NextAuth configuration**
  - [ ] Add café-related session data
  - [ ] Create role-based middleware for admin routes
  - [ ] Test protected endpoints

- [ ] **Create permission helpers**
  ```typescript
  // lib/cafe/auth.ts
  - canManageMenu(user)
  - canViewAllOrders(user)
  - canManageReservations(user)
  ```

---

### 📋 Week 2: Base Components & Utilities

#### UI Components Library
- [ ] **Create base UI components** (if not already exist)
  - [ ] Button component with variants (primary, outline, ghost)
  - [ ] Card component
  - [ ] Input component
  - [ ] Select component
  - [ ] Modal/Dialog component
  - [ ] Badge component
  - [ ] Tabs component
  - [ ] Toast/Notification component
  - [ ] LoadingSpinner component

- [ ] **Test components in Storybook** (optional)

#### Café-Specific Shared Components
- [ ] **Create shared café components**
  - [ ] PriceTag component
  - [ ] DietaryBadges component (vegetarian, vegan, GF icons)
  - [ ] SpicyLevelIndicator component (chili peppers)
  - [ ] PrepTimeIndicator component
  - [ ] AllergenInfo component
  - [ ] CafeHero component (landing page hero)

#### Utilities & Helpers
- [ ] **Create utility functions** (`lib/cafe/utils.ts`)
  - [ ] `formatPrice(amount)` - Format currency
  - [ ] `formatTime(date)` - Format time strings
  - [ ] `calculateOrderTotal(items)` - Order total calculation
  - [ ] `getSpicyLabel(level)` - Spicy level text
  - [ ] `getDietaryLabel(item)` - Dietary tags

- [ ] **Create constants** (`lib/cafe/constants.ts`)
  - [ ] OPERATING_HOURS
  - [ ] TABLE_LOCATIONS
  - [ ] ORDER_STATUSES
  - [ ] DIETARY_OPTIONS
  - [ ] ALLERGEN_LIST

#### State Management
- [ ] **Set up Zustand store** (`lib/stores/cafeStore.ts`)
  - [ ] Cart state (items, total, itemCount)
  - [ ] Cart actions (add, remove, update, clear)
  - [ ] Order flow state (orderType, tableId)
  - [ ] Persist cart to localStorage

- [ ] **Test store functionality**
  - [ ] Add items to cart
  - [ ] Update quantities
  - [ ] Calculate totals correctly
  - [ ] Persist on page reload

#### TypeScript Types
- [ ] **Create type definitions** (`types/cafe.ts`)
  - [ ] MenuItem, MenuCategory types
  - [ ] Order, OrderItem types
  - [ ] Reservation, Table types
  - [ ] CartItem, OrderFlow types
  - [ ] API response types

---

## Phase 2: Menu System (Week 3-4)

### 📋 Week 3: Menu Browsing & Display

#### Landing Page
- [ ] **Create café landing page** (`app/cafe/page.tsx`)
  - [ ] Hero section with café images
  - [ ] Featured menu items carousel
  - [ ] About the café section
  - [ ] Location and hours
  - [ ] Call-to-action buttons (View Menu, Reserve Table)
  - [ ] Instagram feed integration (optional)

#### Menu Browsing Page
- [ ] **Create menu page** (`app/cafe/menu/page.tsx`)
  - [ ] Fetch menu items server-side
  - [ ] Implement search params for filtering
  - [ ] SEO optimization (metadata, structured data)

- [ ] **Build MenuGrid component**
  - [ ] Responsive grid layout (1/2/3 columns)
  - [ ] Display MenuCard for each item
  - [ ] Loading states
  - [ ] Empty state ("No items found")

- [ ] **Build MenuCard component**
  - [ ] Item image with aspect ratio
  - [ ] Item name and price
  - [ ] Short description (2-line clamp)
  - [ ] Dietary badges
  - [ ] Spicy indicator
  - [ ] Prep time
  - [ ] "Add to Order" button
  - [ ] "Sold Out" state

- [ ] **Build CategoryNav component**
  - [ ] Horizontal scrolling category chips
  - [ ] Active category highlight
  - [ ] Sticky on scroll (desktop)
  - [ ] Smooth scroll to category sections

#### Menu Filters
- [ ] **Build MenuFilters component**
  - [ ] Category checkboxes
  - [ ] Dietary filters (vegetarian, vegan, gluten-free)
  - [ ] Price range slider
  - [ ] Search input
  - [ ] Sort dropdown (popular, price, name)
  - [ ] Clear filters button
  - [ ] Mobile: Slide-out drawer
  - [ ] Desktop: Fixed sidebar

- [ ] **Implement filter logic**
  - [ ] Update URL search params on filter change
  - [ ] Fetch filtered results from API
  - [ ] Show active filter count

---

### 📋 Week 4: Menu Item Details & Reviews

#### Menu Item Detail Page
- [ ] **Create detail page** (`app/cafe/menu/[slug]/page.tsx`)
  - [ ] Fetch item data server-side
  - [ ] Generate static params for popular items
  - [ ] SEO optimization (Open Graph, Twitter cards)

- [ ] **Build MenuItemDetail component**
  - [ ] Image gallery with lightbox
  - [ ] Item name and description
  - [ ] Price display
  - [ ] Category badge
  - [ ] Dietary badges
  - [ ] Allergen information
  - [ ] Prep time estimate
  - [ ] Portion size info
  - [ ] "Add to Order" button (quantity selector)

- [ ] **Build info tabs**
  - [ ] Description tab (full description)
  - [ ] Nutrition tab (calories, macros)
  - [ ] Reviews tab (ratings and comments)

#### Review System
- [ ] **Build ReviewList component**
  - [ ] Display average rating (stars)
  - [ ] Rating distribution chart
  - [ ] Individual review cards
  - [ ] Pagination
  - [ ] Sort by (recent, highest rated)

- [ ] **Build ReviewCard component**
  - [ ] Star rating display
  - [ ] Review title and comment
  - [ ] User name and avatar
  - [ ] Date posted
  - [ ] "Would recommend" badge
  - [ ] Staff response (if any)

- [ ] **Build ReviewForm component**
  - [ ] Star rating input (interactive)
  - [ ] Title input
  - [ ] Comment textarea
  - [ ] "Would recommend" checkbox
  - [ ] Image upload (optional)
  - [ ] Submit button
  - [ ] Show only to users who ordered the item

- [ ] **Implement review API**
  - [ ] POST `/api/cafe/reviews` endpoint
  - [ ] Validation (must have ordered item)
  - [ ] Prevent duplicate reviews per order

#### Related Items
- [ ] **Build RelatedItems component**
  - [ ] Query items in same category
  - [ ] Display 4-6 related items
  - [ ] Carousel on mobile
  - [ ] Grid on desktop

---

## Phase 3: Order System (Week 5-6)

### 📋 Week 5: Shopping Cart & Order Creation

#### Shopping Cart
- [ ] **Build OrderCart component**
  - [ ] Fixed cart button (bottom-right on mobile)
  - [ ] Badge showing item count
  - [ ] Slide-out cart modal
  - [ ] List cart items with thumbnails
  - [ ] Quantity controls (+/- buttons)
  - [ ] Remove item button
  - [ ] Subtotal calculation
  - [ ] "Proceed to Checkout" button
  - [ ] Empty cart state

- [ ] **Build CartItem component**
  - [ ] Item thumbnail
  - [ ] Item name and price
  - [ ] Quantity selector
  - [ ] Modifications display (if any)
  - [ ] Item total
  - [ ] Remove button

- [ ] **Implement cart logic**
  - [ ] Add item to cart
  - [ ] Update quantity (with validation)
  - [ ] Remove item
  - [ ] Clear entire cart
  - [ ] Calculate totals (subtotal, tax, tip)
  - [ ] Persist to localStorage

#### Order Type Selection
- [ ] **Build OrderTypeSelector component**
  - [ ] Dine-in option
  - [ ] Takeout option
  - [ ] Visual selection (large buttons with icons)
  - [ ] Update store state

- [ ] **Conditional flows**
  - [ ] Dine-in: Show table selection (optional)
  - [ ] Takeout: Show pickup time selector

---

### 📋 Week 6: Checkout & Order Tracking

#### Checkout Page
- [ ] **Create checkout page** (`app/cafe/orders/checkout/page.tsx`)
  - [ ] Protect route (optional auth)
  - [ ] Clear layout (summary + form)

- [ ] **Build CheckoutForm component**
  - [ ] Guest info section
    - [ ] Name input (required)
    - [ ] Email input (required, validation)
    - [ ] Phone input (required, formatting)
  - [ ] Order details section
    - [ ] Order type display
    - [ ] Pickup time selector (takeout)
    - [ ] Table number display (dine-in)
    - [ ] Special instructions textarea
  - [ ] Payment section
    - [ ] Stripe payment element
    - [ ] Tip selector (%, custom, no tip)
    - [ ] Order summary (sticky on scroll)
  - [ ] Submit button
  - [ ] Loading state during submission
  - [ ] Error handling

- [ ] **Build OrderSummary component**
  - [ ] List all cart items
  - [ ] Subtotal
  - [ ] Tax calculation (13% Jamaica GCT)
  - [ ] Tip amount
  - [ ] Discount (if applicable)
  - [ ] Grand total (prominent)

#### Payment Integration
- [ ] **Set up Stripe integration**
  - [ ] Create payment intent on order creation
  - [ ] Integrate Stripe Elements
  - [ ] Handle payment confirmation
  - [ ] Handle payment errors
  - [ ] Create webhook handler (`/api/cafe/webhooks/stripe`)

#### Order Confirmation
- [ ] **Create order success page** (`app/cafe/orders/[id]/success`)
  - [ ] Order number display (large, prominent)
  - [ ] Success animation/icon
  - [ ] Order summary
  - [ ] Estimated ready time
  - [ ] Next steps (dine-in vs. takeout)
  - [ ] Email confirmation sent message
  - [ ] "Track Order" button
  - [ ] "View Menu" button

#### Order Tracking
- [ ] **Create order tracking page** (`app/cafe/orders/[id]/page.tsx`)
  - [ ] Fetch order data
  - [ ] Real-time status updates (polling or WebSocket)
  - [ ] Protect route (auth required for own orders)

- [ ] **Build OrderStatusTracker component**
  - [ ] Visual progress indicator (stepper)
  - [ ] Current status highlight
  - [ ] Timestamp for each stage
  - [ ] Animated transitions
  - [ ] ETA display

- [ ] **Build OrderDetails component**
  - [ ] Order number
  - [ ] Order type
  - [ ] Table number (dine-in) or pickup time (takeout)
  - [ ] List of items
  - [ ] Pricing breakdown
  - [ ] Payment status
  - [ ] Special instructions

- [ ] **Order actions**
  - [ ] Download receipt (PDF)
  - [ ] Cancel order (if allowed)
  - [ ] Contact support button

#### Order History
- [ ] **Create order history page** (`app/cafe/orders/page.tsx`)
  - [ ] List user's past orders
  - [ ] Filter by status (completed, cancelled)
  - [ ] Sort by date
  - [ ] Pagination
  - [ ] Click to view details

- [ ] **Build OrderHistoryCard component**
  - [ ] Order number and date
  - [ ] Status badge
  - [ ] Item count
  - [ ] Total amount
  - [ ] "View Details" link
  - [ ] "Reorder" button (add items to cart)

---

## Phase 4: Reservation System (Week 7)

### 📋 Week 7: Table Reservations

#### Reservation Page
- [ ] **Create reservation page** (`app/cafe/reservations/page.tsx`)
  - [ ] Multi-step form layout
  - [ ] Progress indicator
  - [ ] Optional auth (guests can reserve)

#### Step 1: Date & Time Selection
- [ ] **Build DateTimePicker component**
  - [ ] Party size selector (1-20)
  - [ ] Date picker (Calendar component)
    - [ ] Disable past dates
    - [ ] Disable fully booked dates
    - [ ] Show available slots per date
  - [ ] Time slot selector
    - [ ] Fetch available times from API
    - [ ] Show 30-minute intervals
    - [ ] Disable unavailable times
    - [ ] Highlight popular times
  - [ ] Preferred seating (indoor, outdoor, bar)
  - [ ] Continue button

- [ ] **Build PartySelector component**
  - [ ] Number picker (1-20)
  - [ ] Visual representation (person icons)
  - [ ] Large parties warning (>10 guests: "Please call us")

#### Step 2: Guest Details
- [ ] **Build GuestDetailsForm component**
  - [ ] Name input (required)
  - [ ] Email input (required)
  - [ ] Phone input (required)
  - [ ] Special requests textarea
  - [ ] Occasion selector (Birthday, Anniversary, etc.)
  - [ ] Dietary needs textarea
  - [ ] Marketing opt-in checkbox
  - [ ] Back/Continue buttons

#### Step 3: Confirmation
- [ ] **Build ReservationConfirmation component**
  - [ ] Review all details
    - [ ] Date, time, party size
    - [ ] Guest information
    - [ ] Special requests
  - [ ] Edit buttons for each section
  - [ ] Terms and conditions checkbox
  - [ ] Confirm button
  - [ ] Loading state during submission

#### Reservation Success
- [ ] **Create success page** (`app/cafe/reservations/[id]/success`)
  - [ ] Reservation number (large)
  - [ ] Success message
  - [ ] Confirmation details
  - [ ] Add to calendar button (Google/Apple)
  - [ ] Confirmation email sent message
  - [ ] Cancellation policy
  - [ ] "View Menu" button

#### Reservation Management
- [ ] **Create my reservations page** (`app/cafe/reservations/page.tsx`)
  - [ ] List upcoming reservations
  - [ ] List past reservations
  - [ ] Filter and sort options

- [ ] **Build ReservationCard component**
  - [ ] Date and time (prominent)
  - [ ] Party size
  - [ ] Status badge (Confirmed, Seated, Completed)
  - [ ] Special requests snippet
  - [ ] Actions:
    - [ ] View details
    - [ ] Modify (if allowed)
    - [ ] Cancel (with confirmation)

#### Availability Checking
- [ ] **Implement availability logic**
  - [ ] GET `/api/cafe/reservations/availability` endpoint
  - [ ] Query tables by capacity and location
  - [ ] Check existing reservations for conflicts
  - [ ] Return available time slots
  - [ ] Suggest alternative times if unavailable

---

## Phase 5: Integration & Testing (Week 8)

### 📋 Week 8: Tours Integration & Admin Tools

#### Tour + Meal Packages
- [ ] **Update tour detail pages**
  - [ ] Add "Add Meal Package" section
  - [ ] Display available meal options
  - [ ] Meal time selector (pre-tour, post-tour)
  - [ ] Meal package pricing (discounted)
  - [ ] Add to tour booking flow

- [ ] **Update booking flow**
  - [ ] Include meal selection in checkout
  - [ ] Create café order linked to tour booking
  - [ ] Combined confirmation email

- [ ] **Create package management**
  - [ ] Define meal packages (breakfast, lunch, dinner)
  - [ ] Set package pricing and items
  - [ ] Link packages to specific tours

#### Cross-Promotion
- [ ] **Menu page: Suggest tours**
  - [ ] "Planning a tour? Check out our experiences" banner
  - [ ] Link to tours page

- [ ] **Tour pages: Suggest café**
  - [ ] "Grab a bite before/after your tour" banner
  - [ ] Link to café menu

#### Admin Dashboard
- [ ] **Create admin landing page** (`app/cafe/admin/page.tsx`)
  - [ ] Protect route (admin only)
  - [ ] Overview cards (revenue, orders, reservations)
  - [ ] Charts (revenue by day, popular items)
  - [ ] Recent orders list
  - [ ] Quick actions

- [ ] **Menu management** (`app/cafe/admin/menu/page.tsx`)
  - [ ] List all menu items (table view)
  - [ ] Search and filter
  - [ ] Edit button (inline or modal)
  - [ ] Delete button (with confirmation)
  - [ ] "Create New Item" button
  - [ ] Bulk actions (activate/deactivate)

- [ ] **Create/Edit menu item** (`app/cafe/admin/menu/new`)
  - [ ] Form with all fields
    - [ ] Name, slug, description
    - [ ] Category selector
    - [ ] Price inputs
    - [ ] Dietary checkboxes
    - [ ] Allergen multi-select
    - [ ] Image upload (Cloudinary)
    - [ ] Prep time, portion size
  - [ ] Validation
  - [ ] Save button
  - [ ] Preview

- [ ] **Order management** (`app/cafe/admin/orders/page.tsx`)
  - [ ] List all orders (table view)
  - [ ] Filter by status, type, date
  - [ ] Search by order number or customer name
  - [ ] Status update dropdown
  - [ ] View details modal
  - [ ] Export orders (CSV)

- [ ] **Reservation management** (`app/cafe/admin/reservations/page.tsx`)
  - [ ] List all reservations (table view)
  - [ ] Calendar view (optional)
  - [ ] Filter by date, status
  - [ ] Assign table
  - [ ] Update status (Confirmed → Seated → Completed)
  - [ ] Send reminder emails manually
  - [ ] Export reservations

#### Testing
- [ ] **Unit tests**
  - [ ] Test Zustand store actions
  - [ ] Test utility functions (formatPrice, calculateTotal)
  - [ ] Test API route handlers

- [ ] **Integration tests**
  - [ ] Test order flow (add to cart → checkout → payment)
  - [ ] Test reservation flow (date/time → details → confirmation)
  - [ ] Test menu filtering and search

- [ ] **E2E tests (Playwright)**
  - [ ] Complete order placement (happy path)
  - [ ] Make reservation (happy path)
  - [ ] Browse menu and add items to cart
  - [ ] Admin: Update order status
  - [ ] Error scenarios (payment failure, no availability)

---

## Phase 6: Polish & Launch Prep (Week 9-10)

### 📋 Week 9: UX Polish & Performance

#### UI/UX Improvements
- [ ] **Loading states**
  - [ ] Skeleton loaders for menu items
  - [ ] Spinner during API calls
  - [ ] Optimistic updates for cart actions

- [ ] **Error handling**
  - [ ] Toast notifications for errors
  - [ ] Error boundaries for component crashes
  - [ ] Friendly error messages
  - [ ] Retry buttons for failed requests

- [ ] **Animations**
  - [ ] Page transitions (Framer Motion)
  - [ ] Cart item add animation
  - [ ] Modal enter/exit animations
  - [ ] Hover states on cards
  - [ ] Loading animations

- [ ] **Accessibility audit**
  - [ ] Run axe DevTools
  - [ ] Fix all WCAG AA issues
  - [ ] Test keyboard navigation
  - [ ] Test with screen reader (NVDA/JAWS)
  - [ ] Add ARIA labels where needed
  - [ ] Ensure focus management in modals

#### Performance Optimization
- [ ] **Image optimization**
  - [ ] Convert images to WebP
  - [ ] Use Next.js Image component everywhere
  - [ ] Add blur placeholders
  - [ ] Lazy load below-fold images

- [ ] **Code splitting**
  - [ ] Lazy load admin components
  - [ ] Lazy load modals
  - [ ] Dynamic imports for heavy libraries

- [ ] **Caching**
  - [ ] Set cache headers for menu items
  - [ ] Implement ISR for menu pages
  - [ ] Use React Query caching

- [ ] **Bundle analysis**
  - [ ] Run `next build` and analyze bundle
  - [ ] Remove unused dependencies
  - [ ] Code-split large components

- [ ] **Lighthouse audit**
  - [ ] Run Lighthouse on all pages
  - [ ] Fix performance issues (target >80)
  - [ ] Fix accessibility issues (target 100)
  - [ ] Fix SEO issues (target 100)
  - [ ] Fix best practices (target 100)

---

### 📋 Week 10: Launch Preparation

#### Content & Data
- [ ] **Menu content**
  - [ ] Write descriptions for all items
  - [ ] Professional food photography (40-50 items)
  - [ ] Optimize and upload images
  - [ ] Verify nutritional information
  - [ ] Verify allergen information

- [ ] **Copy and messaging**
  - [ ] Landing page copy
  - [ ] About section
  - [ ] Legal pages (terms, privacy for café)
  - [ ] Email templates (confirmation, reminder)
  - [ ] SMS templates (order ready, reservation reminder)

- [ ] **Seed production database**
  - [ ] Migrate production database
  - [ ] Seed categories
  - [ ] Seed menu items
  - [ ] Seed tables

#### SEO & Marketing
- [ ] **SEO setup**
  - [ ] Meta tags for all pages
  - [ ] Open Graph images
  - [ ] Structured data (MenuItem, Restaurant)
  - [ ] Sitemap.xml (include café pages)
  - [ ] Robots.txt

- [ ] **Analytics**
  - [ ] Set up Google Analytics 4
  - [ ] Track key events (order placed, reservation made)
  - [ ] Set up conversion goals
  - [ ] Set up Vercel Analytics

- [ ] **Marketing materials**
  - [ ] Social media announcement posts
  - [ ] Email campaign to existing customers
  - [ ] QR code for physical menu (links to digital menu)
  - [ ] Promotional graphics

#### Security & Compliance
- [ ] **Security audit**
  - [ ] Review authentication flows
  - [ ] Review authorization checks
  - [ ] Review payment security (PCI compliance)
  - [ ] Review data encryption
  - [ ] Set up rate limiting

- [ ] **Legal compliance**
  - [ ] Privacy policy (include café data usage)
  - [ ] Terms of service (include café terms)
  - [ ] Refund policy
  - [ ] GDPR compliance (if applicable)
  - [ ] Cookie consent (if needed)

#### Deployment
- [ ] **Staging deployment**
  - [ ] Deploy to staging environment
  - [ ] Test all flows end-to-end
  - [ ] Test payment (test mode)
  - [ ] Test email notifications
  - [ ] Test SMS notifications
  - [ ] UAT with stakeholders

- [ ] **Production deployment**
  - [ ] Run final build: `pnpm build`
  - [ ] Verify no errors or warnings
  - [ ] Merge feature branch → integration branch
  - [ ] Create PR from integration → main
  - [ ] Deploy to production
  - [ ] Verify deployment
  - [ ] Monitor error logs

- [ ] **Post-launch monitoring**
  - [ ] Set up error monitoring (Sentry)
  - [ ] Set up uptime monitoring
  - [ ] Monitor order volume
  - [ ] Monitor reservation volume
  - [ ] Monitor performance metrics
  - [ ] Gather user feedback

#### Documentation
- [ ] **User documentation**
  - [ ] How to order online guide
  - [ ] How to make reservations guide
  - [ ] FAQ page
  - [ ] Video tutorial (optional)

- [ ] **Staff documentation**
  - [ ] Admin dashboard user guide
  - [ ] Order management workflow
  - [ ] Reservation management workflow
  - [ ] Troubleshooting guide

- [ ] **Developer documentation**
  - [ ] Update CLAUDE.md with café feature
  - [ ] API documentation (OpenAPI/Swagger)
  - [ ] Component documentation
  - [ ] Database schema documentation
  - [ ] Deployment guide

---

## Git Workflow

### Branch Strategy

```bash
# Feature development (current branch)
claude/street-vendor-cafe-mvp-011CUbDpczzSxPjQQNKukcb6

# Create sub-branches for major features
git checkout -b feature/cafe-database
git checkout -b feature/cafe-menu-ui
git checkout -b feature/cafe-orders
git checkout -b feature/cafe-reservations

# Merge completed features back to main café branch
git checkout claude/street-vendor-cafe-mvp-011CUbDpczzSxPjQQNKukcb6
git merge feature/cafe-database
git push -u origin claude/street-vendor-cafe-mvp-011CUbDpczzSxPjQQNKukcb6

# Final merge to integration branch
git checkout integration/mvp-launch
git merge claude/street-vendor-cafe-mvp-011CUbDpczzSxPjQQNKukcb6
```

### Commit Conventions

Follow existing project conventions:

```bash
# Feature commits
git commit -m "feat(cafe): add menu browsing page"
git commit -m "feat(cafe): implement order cart functionality"
git commit -m "feat(cafe): add reservation system"

# Bug fixes
git commit -m "fix(cafe): resolve cart total calculation issue"

# Refactoring
git commit -m "refactor(cafe): extract MenuCard component"

# Documentation
git commit -m "docs(cafe): add API design document"

# Tests
git commit -m "test(cafe): add order flow integration tests"
```

### Build Verification

**CRITICAL**: Always run `pnpm build` before merging:

```bash
# Before every PR
pnpm build

# If build passes
git push -u origin <branch-name>

# If build fails
# Fix errors, commit, and try again
```

---

## Success Criteria

### MVP Launch Checklist

#### Functionality
- [ ] Users can browse menu with filters
- [ ] Users can view menu item details
- [ ] Users can add items to cart
- [ ] Users can place orders (dine-in, takeout)
- [ ] Users can pay via Stripe
- [ ] Users can track order status
- [ ] Users can make reservations
- [ ] Users can view reservation details
- [ ] Admin can manage menu items
- [ ] Admin can manage orders
- [ ] Admin can manage reservations
- [ ] Tour + meal packages work

#### Performance
- [ ] Lighthouse score >80 (mobile)
- [ ] Page load time <3s
- [ ] Order placement <2s
- [ ] No console errors in production

#### Accessibility
- [ ] WCAG AA compliance
- [ ] Keyboard navigation works
- [ ] Screen reader compatible

#### Security
- [ ] Authentication working
- [ ] Authorization checks in place
- [ ] Payment data secure (PCI compliant)
- [ ] No exposed API keys

#### SEO
- [ ] Meta tags on all pages
- [ ] Sitemap generated
- [ ] Structured data implemented

#### Documentation
- [ ] User guides complete
- [ ] Admin guides complete
- [ ] Developer docs updated

---

## Post-Launch Roadmap (Phase 2 Features)

### Month 2-3: Enhancements
- [ ] Delivery integration (third-party or in-house)
- [ ] Loyalty program
- [ ] Order ahead (schedule for later)
- [ ] Group ordering (split bills)
- [ ] Gift cards
- [ ] Catering services

### Month 4-6: Advanced Features
- [ ] Mobile app (React Native)
- [ ] QR code ordering (scan at table)
- [ ] Kitchen display system (KDS)
- [ ] Inventory management
- [ ] Staff scheduling
- [ ] Advanced analytics dashboard

---

## Resources & Dependencies

### External Services
- **Stripe**: Payment processing (already set up)
- **Cloudinary**: Image hosting for menu photos
- **SendGrid/Resend**: Email notifications
- **Twilio**: SMS notifications (optional)
- **Vercel**: Hosting and deployment

### Required Assets
- Food photography (40-50 items)
- Café exterior/interior photos
- Logo variations for café branding
- Social media graphics

### Team Resources
- 1 Full-stack developer (database + API)
- 1 Frontend developer (UI components + pages)
- 1 Designer (mockups + assets)
- 1 Content writer (menu descriptions)
- 1 Photographer (food + venue)
- 1 QA tester

---

## Risk Management

### Technical Risks
| Risk | Mitigation |
|------|------------|
| Payment integration issues | Test thoroughly in Stripe test mode |
| Real-time order updates not working | Implement fallback polling mechanism |
| Image loading slow | Use WebP, optimize, lazy load |
| Database performance | Index frequently queried fields |

### Business Risks
| Risk | Mitigation |
|------|------------|
| Low adoption | Marketing campaign, tour integration |
| No-show reservations | Implement deposit system (Phase 2) |
| Kitchen capacity | Start with limited menu, scale gradually |

---

## Contacts & Support

- **Technical Questions**: Tag @4eckd in GitHub
- **Design Review**: [Design team contact]
- **Content Review**: [Content team contact]
- **Deployment Help**: Vercel support

---

**Document Version**: 1.0
**Last Updated**: October 29, 2025
**Timeline**: 8-10 weeks to MVP launch
**Status**: Planning Complete - Ready for Implementation
