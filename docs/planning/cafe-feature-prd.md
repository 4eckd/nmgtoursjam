# Café/Bar/Grill Feature - Product Requirements Document (PRD)

## Executive Summary

**Feature Name**: NMG Café & Grill
**Version**: 1.0 - MVP
**Target Launch**: Q1 2026
**Owner**: Development Team
**Status**: Planning Phase

### Overview
Add a fully integrated café, bar, and grill feature to the NMG Tours Jamaica platform to enhance the tourist experience by offering authentic Jamaican cuisine, beverages, and casual dining options. This feature will serve as both a standalone business and a complementary service for tour customers.

### Strategic Goals
1. **Revenue Diversification**: Create an additional revenue stream beyond tour bookings
2. **Enhanced Customer Experience**: Provide pre/post-tour dining options for tourists
3. **Extended Engagement**: Increase time visitors spend on-site and with the brand
4. **Local Culture Showcase**: Highlight authentic Jamaican cuisine and beverages
5. **Competitive Advantage**: Differentiate from tour-only competitors

---

## Problem Statement

### Current Gaps
- Tourists booking tours have no integrated dining options
- No food/beverage services to complement tour experiences
- Missing opportunity for pre-tour meetups or post-tour celebrations
- Lost revenue from customers seeking nearby dining

### User Pain Points
- **Tourists**: Need to research separate restaurants before/after tours
- **Tour Operators**: Limited options for group dining recommendations
- **Business**: Missing cross-sell opportunities between tours and dining

---

## Target Users

### Primary Personas

#### 1. **Tourist Diner** (Primary)
- **Demographics**: Ages 25-55, international/domestic tourists
- **Needs**: Quick, authentic meals near tour locations
- **Behaviors**: Books tours online, seeks local food experiences
- **Goals**: Enjoy Jamaican cuisine, convenient dining near activities

#### 2. **Tour Customer** (Primary)
- **Demographics**: Active tour bookers
- **Needs**: Integrated dining for pre/post-tour meals
- **Behaviors**: Values convenience, prefers bundled services
- **Goals**: Complete experience packages

#### 3. **Local Patron** (Secondary)
- **Demographics**: Jamaica residents, ages 20-65
- **Needs**: Quality casual dining, bar atmosphere
- **Behaviors**: Repeat customers, social dining
- **Goals**: Relaxing environment, good food/drinks

#### 4. **Event Groups** (Secondary)
- **Demographics**: Corporate groups, families, celebrations
- **Needs**: Group reservations, private dining
- **Behaviors**: Plans ahead, larger orders
- **Goals**: Memorable group experiences

---

## Feature Requirements

### MVP Features (Must Have)

#### 1. **Menu Management System**
- **Menu Categories**:
  - Appetizers (starters, small plates)
  - Main Courses (grill items, traditional Jamaican dishes)
  - Sides & Accompaniments
  - Desserts
  - Beverages (soft drinks, juices, smoothies)
  - Bar/Alcoholic Beverages (rum cocktails, beer, wine)

- **Menu Item Details**:
  - Name, description, price
  - Category, dietary tags (vegetarian, vegan, gluten-free, spicy)
  - Allergen information
  - Preparation time estimate
  - Availability status (in stock, sold out)
  - High-quality food photography
  - Portion sizes

#### 2. **Digital Menu & Ordering**
- **Customer-Facing Menu**:
  - Browse menu by category
  - Filter by dietary preferences
  - Search menu items
  - View detailed item information
  - See daily specials

- **Order Types**:
  - Dine-in ordering (table service)
  - Takeout/pickup orders
  - Future: Delivery integration

#### 3. **Table Reservation System**
- **Reservation Features**:
  - Date/time selection
  - Party size (2-20 guests)
  - Special requests/occasions
  - Seating preferences (indoor/outdoor, bar area)
  - Contact information

- **Management Features**:
  - View daily reservations
  - Table assignment
  - Capacity management
  - Reservation confirmations via email/SMS

#### 4. **Order Management**
- **Order Processing**:
  - Order creation (walk-in, online, phone)
  - Order status tracking (received → preparing → ready → served)
  - Kitchen display system (KDS) integration
  - Order modifications
  - Split bills

- **Payment Processing**:
  - Integrated with existing Stripe setup
  - Multiple payment methods
  - Tipping options
  - Receipt generation
  - Order history

#### 5. **Tour-Dining Integration**
- **Package Deals**:
  - Tour + Meal combos
  - Discount for combined bookings
  - Pre-tour breakfast packages
  - Post-tour lunch/dinner packages

- **Cross-Promotion**:
  - Suggest dining when booking tours
  - Suggest tours when making reservations
  - Loyalty rewards for multi-service use

#### 6. **Menu Display Pages**
- **Public Menu Page** (`/cafe/menu`)
  - Full browsable menu
  - Filtering and search
  - Nutritional information
  - Print-friendly version

- **Cafe Landing Page** (`/cafe`)
  - Hero section with ambiance photos
  - About the café/grill
  - Location and hours
  - Featured dishes
  - Reservation CTA

- **Reservation Page** (`/cafe/reservations`)
  - Booking form
  - Availability calendar
  - Confirmation flow

---

### Phase 2 Features (Should Have)

#### 7. **Customer Features**
- User reviews and ratings for menu items
- Favorite items/custom menu
- Dietary preference profiles
- Order history and reordering
- Digital loyalty card

#### 8. **Operational Features**
- Inventory management
- Supplier order tracking
- Staff scheduling
- Table turnover analytics
- Popular items dashboard

#### 9. **Marketing Features**
- Daily specials management
- Happy hour configurations
- Email campaigns for café events
- Social media integration
- Special events calendar

---

### Future Enhancements (Nice to Have)

#### 10. **Advanced Features**
- Mobile app ordering
- QR code menu scanning
- Delivery service integration
- Catering services
- Private event bookings
- Live music event calendar
- Chef's tasting menu experiences
- Cooking classes/workshops

---

## User Stories

### Customer User Stories

**As a tourist**, I want to:
- Browse the café menu online before visiting
- Make a reservation for after my tour
- Order food for pickup while on a tour
- See authentic Jamaican dishes with photos
- Filter menu by dietary restrictions
- Pay with international credit cards

**As a tour customer**, I want to:
- Book a tour + meal package at a discount
- Reserve a table automatically after my tour
- Have a place to meet my tour group beforehand
- Celebrate with my group after the tour

**As a local patron**, I want to:
- Make quick reservations online
- See daily specials
- Order takeout online
- Earn loyalty rewards
- Book tables for special occasions

### Admin User Stories

**As a café manager**, I want to:
- Update menu items and prices easily
- Manage daily reservations
- Track order status in real-time
- View sales analytics
- Manage staff schedules
- Handle inventory levels

**As a kitchen staff member**, I want to:
- See incoming orders clearly
- Mark items as preparing/ready
- Flag items as sold out
- View prep time estimates
- Communicate with front-of-house

---

## Technical Requirements

### Performance
- Menu page load: < 2 seconds
- Order submission: < 1 second
- Real-time order updates: < 3 seconds
- Image optimization: WebP format, lazy loading
- Mobile-first responsive design

### Accessibility
- WCAG AA compliance
- Screen reader compatible
- Keyboard navigation
- High contrast mode support
- Allergen information clearly marked

### Security
- PCI DSS compliance for payments
- Data encryption (at rest and in transit)
- Secure order processing
- Customer data privacy (GDPR compliant)
- Staff authentication and role-based access

### Scalability
- Support 100+ concurrent orders
- Handle 50+ reservations per day
- Menu database: 200+ items
- Order history retention: 2 years

---

## Design Requirements

### Brand Integration
- Use existing emerald green brand colors
- Jamaican cultural elements in design
- Food photography showcasing local ingredients
- Warm, inviting atmosphere in imagery

### UI Components Needed
- Menu card component
- Order cart/summary
- Reservation form
- Table availability calendar
- Order status tracker
- Payment form
- Receipt display

### Mobile Experience
- Touch-optimized menu browsing
- Easy-to-use order cart
- Simple reservation form
- Mobile payment options
- SMS order confirmations

---

## Success Metrics

### Business KPIs
- **Revenue Metrics**:
  - Monthly café revenue: $15,000+ (target)
  - Average order value: $25+
  - Tour + meal package conversion: 20%+

- **Customer Metrics**:
  - Online reservations per week: 30+
  - Repeat customer rate: 40%+
  - Customer satisfaction score: 4.5+/5.0

- **Operational Metrics**:
  - Table turnover rate: 2.5x per shift
  - Order accuracy: 95%+
  - Average prep time: < 25 minutes

### Technical KPIs
- Page load time: < 2s
- Mobile traffic: 70%+
- Order completion rate: 85%+
- System uptime: 99.5%+

---

## User Flows

### Flow 1: Browse Menu & Make Reservation
```
1. User visits /cafe
2. Clicks "View Menu"
3. Browses menu items
4. Clicks "Make Reservation"
5. Selects date, time, party size
6. Enters contact info
7. Receives confirmation email
8. System sends reminder 24h before
```

### Flow 2: Order Takeout
```
1. User visits /cafe/menu
2. Filters menu (e.g., "vegetarian")
3. Adds items to cart
4. Clicks "Checkout"
5. Selects "Pickup"
6. Chooses pickup time
7. Enters contact info
8. Completes payment
9. Receives order confirmation with pickup time
10. Gets notification when order ready
```

### Flow 3: Book Tour + Meal Package
```
1. User on tour detail page
2. Sees "Add lunch package" option
3. Selects meal package
4. Chooses meal time (pre/post-tour)
5. Adds to booking
6. Proceeds to checkout with combined price
7. Receives confirmation for tour + meal
```

---

## Competitive Analysis

### Competitors
1. **Local Jamaican Restaurants**: Traditional restaurants with no tour integration
2. **Resort Dining**: Higher prices, less authentic
3. **Street Food Vendors**: Informal, no reservations

### Competitive Advantages
- **Integration**: Seamless tour + dining booking
- **Convenience**: Online ordering and reservations
- **Authenticity**: Local Jamaican cuisine
- **Technology**: Modern digital experience
- **Location**: Near tour departure points

---

## Risks & Mitigation

### Technical Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Payment system failure | High | Low | Backup payment methods, thorough testing |
| Order sync issues | Medium | Medium | Real-time database, error handling |
| High traffic crashes | High | Low | Load testing, CDN, caching |

### Business Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low adoption | High | Medium | Marketing campaigns, tour bundles |
| Food safety issues | High | Low | Strict protocols, training |
| Staff shortage | Medium | Medium | Hiring plan, cross-training |
| Supplier delays | Medium | Medium | Multiple supplier relationships |

### Operational Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Kitchen capacity | Medium | Medium | Capacity planning, prep stations |
| Reservation no-shows | Low | High | Confirmation reminders, deposit policy |
| Menu item stockouts | Low | High | Inventory alerts, menu management |

---

## Dependencies

### Internal Dependencies
- Existing authentication system (NextAuth.js)
- Payment infrastructure (Stripe)
- Email notification system
- User database
- Booking system architecture

### External Dependencies
- Payment gateway (Stripe)
- SMS provider (for confirmations)
- Cloud storage (for menu images)
- Analytics platform

### Team Dependencies
- Frontend development
- Backend/API development
- Database design
- UI/UX design
- Content (menu photography, descriptions)
- QA testing

---

## Stakeholder Requirements

### Business Stakeholders
- Clear ROI within 6 months
- Integration with existing tour bookings
- Operational dashboard for insights
- Marketing integration

### Technical Team
- Use existing tech stack (Next.js, TypeScript, Prisma)
- Reusable components
- API-first design
- Comprehensive testing

### Operations Team
- Easy menu management
- Clear order workflow
- Staff training materials
- Support documentation

---

## Open Questions

1. **Operating Hours**: What are the café operating hours? (Suggest: 7am-10pm daily)
2. **Capacity**: How many tables/seats? (Suggest: 60-80 capacity)
3. **Staff**: How many staff needed? (Suggest: 2 cooks, 3 servers, 1 manager)
4. **Delivery**: Will we offer delivery? (Suggest: Phase 2)
5. **Alcohol License**: What alcohol licensing is required in Jamaica?
6. **Pricing Strategy**: Premium pricing or value pricing?
7. **Tour Integration**: Mandatory meal packages or optional add-ons?
8. **Menu Size**: How many menu items to launch with? (Suggest: 40-50 items)

---

## Next Steps

### Immediate Actions
1. ✅ Review and approve this PRD
2. ⏳ Finalize café operating model (hours, capacity, staffing)
3. ⏳ Create database schema design
4. ⏳ Design API architecture
5. ⏳ Create UI/UX mockups
6. ⏳ Develop menu content and photography plan

### Week 1 Priorities
- Database schema design and approval
- API endpoint specification
- Component library planning
- Development roadmap creation

---

## Approval Sign-off

| Role | Name | Status | Date |
|------|------|--------|------|
| Product Owner | TBD | Pending | - |
| Technical Lead | TBD | Pending | - |
| Operations Manager | TBD | Pending | - |
| Business Owner | TBD | Pending | - |

---

**Document Version**: 1.0
**Last Updated**: October 29, 2025
**Next Review**: After stakeholder feedback
