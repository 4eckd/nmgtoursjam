# Design & UX Documentation

This directory contains all design mockups, user flows, and UX documentation for the **NMG Tours Jamaica** project.

## Directory Contents

### 📐 Mockups
- **LANDING_PAGE.md** - ASCII wireframes for homepage (desktop, tablet, mobile)
- **TOUR_LISTING.md** - Tour browsing page with filters and search
- **TOUR_DETAIL.md** - Individual tour page with booking widget
- **BOOKING_FLOW.md** - Multi-step booking wizard
- **USER_DASHBOARD.md** - User account dashboard

Shows responsive grid breakpoints, component specifications, and layout measurements.

### 🔄 User Flows
- **USER_FLOWS.md** - Complete user journey diagrams
  - New visitor onboarding
  - Login flow
  - Tour browsing and selection
  - Booking process
  - Review submission
- **BOOKING_JOURNEY.md** - Detailed booking flow with decision points

### 🎨 Design Tokens
- **DESIGN_TOKENS.md** - Core design system (colors, typography, spacing)
- **COMPONENT_LIBRARY.md** - Component inventory and status

### 📊 Status Tracking
- **STATUS.md** - Implementation tracking and progress

## Current Implementation Status

⚠️ **Important: Component Architecture**

We are building with **Next.js 16 App Router** with server and client components.

```
┌─────────────────────────────────────────────────────────────┐
│                    CURRENT STATUS                            │
├─────────────────────────────────────────────────────────────┤
│  Framework: Next.js 16 (App Router)                         │
│  Components: React 19 + TypeScript                          │
│  Styling: Tailwind CSS 4                                    │
│  Status: MVP Foundation Complete                            │
│                                                              │
│  ✅ Navigation component                                    │
│  ✅ Footer component                                        │
│  ✅ Basic routing structure                                │
│  ❌ Tour components (not yet built)                        │
│  ❌ Booking components (not yet built)                     │
│  ❌ Dashboard components (not yet built)                   │
└─────────────────────────────────────────────────────────────┘
```

## Recommended Next Steps

### Phase 1: Build Marketing Components (3-5 days)
Create components based on LANDING_PAGE.md mockup:

```bash
app/components/marketing/
├── Hero.tsx              # Hero section with CTA
├── FeaturedTours.tsx     # Tour showcase grid
├── Testimonials.tsx      # Customer reviews
├── Newsletter.tsx        # Email signup
└── Stats.tsx             # Key metrics
```

### Phase 2: Build Tour System (4-6 days)
Create components based on TOUR_LISTING.md and TOUR_DETAIL.md:

```bash
app/components/tours/
├── TourCard.tsx          # Tour preview card
├── TourGrid.tsx          # Grid layout
├── TourFilters.tsx       # Filter sidebar
├── TourSearch.tsx        # Search bar
├── TourGallery.tsx       # Image gallery
└── BookingWidget.tsx     # Sticky booking form
```

### Phase 3: Build Booking Flow (5-7 days)
Create components based on BOOKING_FLOW.md:

```bash
app/components/booking/
├── DatePicker.tsx        # Date selection
├── GuestSelector.tsx     # Guest count
├── BookingStepper.tsx    # Progress indicator
├── PaymentForm.tsx       # Stripe integration
└── Confirmation.tsx      # Success screen
```

## Design System Alignment

### What's Consistent ✓
- Color palette (emerald primary, black/white contrast)
- Typography scale (Poppins + Caveat fonts)
- Spacing system (4px/8px grid)
- Responsive breakpoints (375px, 768px, 1024px, 1440px)
- Component styling principles

### What Needs Building
- Full UI component library (buttons, cards, inputs, modals)
- Tour-specific components
- Booking wizard components
- Dashboard components
- Admin components (future)

## Design Tokens

Our design system uses CSS custom properties defined in:

```
app/globals.css           # Design tokens and global styles
```

These tokens align with:
- React component props
- Tailwind CSS configuration
- Brand identity guidelines

## Mockup Conventions

### ASCII Art Symbols
- `═, ║, ╔, ╗, ╚, ╝` - Section borders
- `┌, ┐, └, ┘, │, ─` - Component borders
- `▼, ▶, ◀, ▲` - Arrows/indicators
- `✓, ⊗` - Status indicators
- `{...}` - Decision points in flows
- `[...]` - Clickable elements/buttons

### Responsive Breakpoints
- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1023px (2 columns)
- **Desktop**: 1024px+ (3 columns)
- **Max Container**: 1400px

## Contributing

When adding new pages or components:

1. **Create ASCII mockup first** - Add to mockups/ directory
2. **Document user flow** - Update flows/USER_FLOWS.md
3. **Build React component** - Use app/components/
4. **Test responsive behavior** - Verify on mobile, tablet, desktop
5. **Update STATUS.md** - Keep implementation status current
6. **Update this README** - Document any new patterns

## Related Documentation

- **CLAUDE.md** - Project overview and development guidelines
- **docs/planning/** - Engineering roadmap and checklists
- **docs/guides/** - Quick start and deployment guides
- **docs/technical/** - Technical specifications
- **app/components/** - React component source code

## Brand Identity

**Name**: NMG Tours Jamaica
**Tagline**: "Authentic Island Experiences"
**Focus**: Rafting tours, cultural experiences, and authentic Jamaican adventures
**Brand Colors**: Emerald green (#10b981), Black, White
**Theme**: Tropical, vibrant, culturally rich
**Target Audience**: Tourists seeking authentic, locally-guided experiences in Jamaica

---

**Last Updated**: 2025-11-15
**Maintained By**: Development Team
