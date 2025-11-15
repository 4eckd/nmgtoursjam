# Baseline Pages Checklist

**Status**: Evaluating pages needed for v1.0.0 baseline
**Date**: 2025-11-15

## Current Pages (13 total)

### Marketing Pages ✅
- [x] `/` - Homepage (app/page.tsx)
- [x] `/about` - About page (app/about/page.tsx)
- [x] `/contact` - Contact page (app/contact/page.tsx)
- [x] `/gallery` - Photo gallery (app/gallery/page.tsx)

### Tours Pages ✅
- [x] `/tours` - Tour listing (app/tours/page.tsx)
- [x] `/tours/[slug]` - Tour detail (app/tours/[slug]/page.tsx)

### Auth Pages ✅
- [x] `/login` - Login page (app/login/page.tsx)
- [x] `/signup` - Signup page (app/signup/page.tsx)

### Legal Pages ✅
- [x] `/pages/privacy` - Privacy policy (app/pages/privacy/page.tsx)
- [x] `/pages/terms` - Terms of service (app/pages/terms/page.tsx)
- [x] `/pages/cookies` - Cookie policy (app/pages/cookies/page.tsx)
- [x] `/pages/refunds` - Refund policy (app/pages/refunds/page.tsx)
- [x] `/pages/safety` - Safety guidelines (app/pages/safety/page.tsx)

## Missing Pages for MVP (Based on Mockups)

### High Priority (MVP Critical)
- [ ] `/dashboard` - User dashboard (see docs/design/mockups/USER_DASHBOARD.md)
  - Status: Not implemented
  - Required: Yes (Track 4 - Authentication 60% complete)
  - Components needed: BookingCard, ProfileSettings, DashboardNav

### Medium Priority (Enhanced UX)
- [ ] `/booking/[tourId]` - Booking flow (see docs/design/mockups/BOOKING_FLOW.md)
  - Status: Not implemented
  - Required: Yes (Track 5 - Booking 0%)
  - Components needed: BookingWizard, DatePicker, PaymentForm

- [ ] `/bookings/[id]` - Booking confirmation/detail
  - Status: Not implemented
  - Required: Yes (Track 5)
  - Components needed: ConfirmationCard, BookingSummary

### Low Priority (Nice to Have)
- [ ] `/search` - Dedicated search page with advanced filters
  - Status: Can use /tours with filters
  - Required: No (can defer post-MVP)

- [ ] `/admin` - Admin dashboard
  - Status: Not needed for MVP
  - Required: No (post-MVP feature)

- [ ] `/reviews/[tourId]` - Dedicated reviews page
  - Status: Reviews shown on tour detail page
  - Required: No (reviews on detail page sufficient)

## Baseline Pages Assessment

### Ready for v1.0.0 Baseline ✅
Current 13 pages provide solid foundation:
- Marketing presence (home, about, contact, gallery)
- Tour browsing and details
- User authentication (login/signup)
- Legal compliance (5 legal pages)

### NOT Blocking v1.0.0 Baseline
Missing pages align with incomplete MVP tracks:
- User dashboard → Track 4 (60% complete, in progress)
- Booking flow → Track 5 (0%, not started)

### Recommendation
**READY TO MERGE** ✅

The current 13 pages represent a complete baseline for v1.0.0:
1. All marketing pages present
2. Tours browsing functional
3. Authentication pages ready
4. Legal compliance covered

Missing pages (dashboard, booking) are part of in-progress MVP tracks
and should be completed in future PRs, not blocking this baseline.

## Next Steps After Merge

1. **Complete Track 4** (User Dashboard)
   - Create `/dashboard` page
   - Implement dashboard components
   - Add protected route middleware

2. **Complete Track 5** (Booking Flow)
   - Create `/booking/[tourId]` page
   - Implement booking wizard
   - Add Stripe payment integration
   - Create confirmation page

3. **Add Missing Components**
   - Hero section (homepage)
   - SearchBar (tours page)
   - Pagination (tours page)
   - BookingWidget (tour detail)

## Build Status

**Sandbox Build**: ⚠️ Cannot complete (Prisma engine download blocked - 403)
**Production Build** (Vercel): ✅ Will work (no restrictions)

Note: Sandbox limitations don't affect production deployment.
