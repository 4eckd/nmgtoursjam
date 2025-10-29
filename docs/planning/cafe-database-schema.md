# Café/Bar/Grill - Database Schema Design

## Overview

This document defines the database schema extensions required to support the café, bar, and grill feature for NMG Tours Jamaica. The schema integrates with the existing tour booking system and follows the current Prisma ORM architecture.

---

## Schema Architecture

### Design Principles
1. **Separation of Concerns**: Café domain models are distinct but integrated with existing User and Tour models
2. **Scalability**: Support for menu expansion, high order volume, and complex reservations
3. **Data Integrity**: Strong relationships, cascade rules, and constraints
4. **Performance**: Indexed fields for common queries
5. **Flexibility**: Support for future features (delivery, catering, events)

---

## Entity Relationship Diagram

```
┌─────────────┐
│    User     │────────┐
└─────────────┘        │
       │               │
       │ 1:N           │ 1:N
       ▼               ▼
┌──────────────┐  ┌──────────────┐
│ Reservation  │  │  CafeOrder   │
└──────────────┘  └──────────────┘
       │                 │
       │ N:1             │ 1:N
       ▼                 ▼
┌──────────────┐  ┌──────────────┐
│    Table     │  │  OrderItem   │
└──────────────┘  └──────────────┘
                        │
                        │ N:1
                        ▼
                  ┌──────────────┐
                  │  MenuItem    │
                  └──────────────┘
                        │
                        │ N:1
                        ▼
                  ┌──────────────┐
                  │MenuCategory  │
                  └──────────────┘
```

---

## Core Models

### 1. MenuCategory

Organizes menu items into logical groups (Appetizers, Mains, Desserts, Beverages, Bar).

```prisma
model MenuCategory {
  id          String     @id @default(cuid())
  name        String     @unique // "Appetizers", "Mains", "Desserts", "Beverages", "Bar"
  slug        String     @unique // "appetizers", "mains"
  description String?
  displayOrder Int       @default(0) // Controls display sequence
  icon        String?    // Icon identifier for UI
  isActive    Boolean    @default(true)

  // Relations
  menuItems   MenuItem[]

  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@map("menu_categories")
}
```

**Indexes**: `name`, `slug`, `displayOrder`

**Initial Categories**:
- Appetizers & Starters
- Grilled Specialties
- Jamaican Classics
- Sides & Accompaniments
- Desserts
- Soft Beverages
- Smoothies & Juices
- Bar & Cocktails
- Wine & Beer

---

### 2. MenuItem

Individual menu items with detailed information.

```prisma
model MenuItem {
  id              String        @id @default(cuid())
  name            String        // "Jerk Chicken", "Ackee & Saltfish"
  slug            String        @unique // "jerk-chicken"
  description     String        @db.Text // Full description
  shortDescription String?      // Brief tagline

  // Pricing
  price           Decimal       @db.Money // Base price
  compareAtPrice  Decimal?      @db.Money // Original price for sales
  isOnSale        Boolean       @default(false)

  // Category & Classification
  category        MenuCategory  @relation(fields: [categoryId], references: [id])
  categoryId      String

  // Dietary & Allergen Info
  isVegetarian    Boolean       @default(false)
  isVegan         Boolean       @default(false)
  isGlutenFree    Boolean       @default(false)
  isDairyFree     Boolean       @default(false)
  isSpicy         Boolean       @default(false)
  spicyLevel      Int?          @default(0) // 0-5 scale
  allergens       String[]      // ["dairy", "nuts", "shellfish"]

  // Nutritional Information (optional)
  calories        Int?
  protein         Int?          // grams
  carbs           Int?          // grams
  fat             Int?          // grams

  // Media
  images          String[]      // Array of image URLs
  coverImage      String        // Primary image

  // Availability & Operations
  isAvailable     Boolean       @default(true)
  prepTimeMinutes Int           @default(15) // Estimated prep time
  portionSize     String?       // "Regular", "Large", "Family"
  servingInfo     String?       // "Serves 2-3 people"

  // Metadata
  isPopular       Boolean       @default(false) // Featured items
  isFeatured      Boolean       @default(false) // Homepage feature
  isSeasonalOnly  Boolean       @default(false)
  tags            String[]      // ["authentic", "spicy", "signature"]

  // Relations
  orderItems      OrderItem[]
  reviews         MenuItemReview[]

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@map("menu_items")
  @@index([categoryId])
  @@index([isAvailable])
  @@index([isPopular])
  @@index([slug])
}
```

**Key Indexes**:
- `categoryId` (frequent filtering)
- `isAvailable` (query available items)
- `isPopular`, `isFeatured` (homepage queries)
- `slug` (item detail pages)

---

### 3. Table

Physical tables for reservation management.

```prisma
model Table {
  id            String        @id @default(cuid())
  tableNumber   String        @unique // "T1", "T2", "BAR-1"
  name          String?       // "Beachview Table", "Corner Booth"
  capacity      Int           // Number of seats
  location      TableLocation // INDOOR, OUTDOOR, BAR, PATIO

  // Attributes
  isAvailable   Boolean       @default(true) // Temporarily unavailable
  canBeCombined Boolean       @default(false) // Can join with other tables

  // Relations
  reservations  Reservation[]
  orders        CafeOrder[]

  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@map("tables")
  @@index([capacity])
  @@index([location])
}

enum TableLocation {
  INDOOR
  OUTDOOR
  BAR
  PATIO
  PRIVATE
}
```

**Initial Setup**:
- 15 indoor tables (2-6 capacity)
- 10 outdoor tables (2-4 capacity)
- 8 bar seats
- 2 private tables (6-10 capacity)

---

### 4. Reservation

Table reservations for customers.

```prisma
model Reservation {
  id              String            @id @default(cuid())
  reservationNumber String          @unique @default(cuid()) // RES-XXXX

  // Customer Info
  user            User?             @relation(fields: [userId], references: [id])
  userId          String?
  guestName       String            // For non-registered users
  guestEmail      String
  guestPhone      String

  // Reservation Details
  date            DateTime          // Date of reservation
  time            String            // "18:30", "19:00"
  partySize       Int               // Number of guests
  duration        Int               @default(90) // Expected duration in minutes

  // Table Assignment
  table           Table?            @relation(fields: [tableId], references: [id])
  tableId         String?
  preferredLocation TableLocation?  // Customer preference

  // Special Requests
  specialRequests String?           @db.Text
  occasion        String?           // "Birthday", "Anniversary", "Business"
  dietaryNeeds    String?           // Special dietary requirements

  // Status
  status          ReservationStatus @default(PENDING)
  confirmationSentAt DateTime?
  reminderSentAt  DateTime?

  // Notes (internal)
  staffNotes      String?           @db.Text

  // Relations
  cafeOrder       CafeOrder?        // If they place an order

  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  @@map("reservations")
  @@index([date, time])
  @@index([status])
  @@index([userId])
  @@index([guestEmail])
}

enum ReservationStatus {
  PENDING      // Awaiting confirmation
  CONFIRMED    // Confirmed by staff/system
  SEATED       // Customer has arrived and seated
  COMPLETED    // Reservation completed
  CANCELLED    // Cancelled by customer/staff
  NO_SHOW      // Customer didn't show up
}
```

---

### 5. CafeOrder

Customer orders (dine-in, takeout, or linked to tour packages).

```prisma
model CafeOrder {
  id              String         @id @default(cuid())
  orderNumber     String         @unique @default(cuid()) // ORD-XXXX

  // Customer Info
  user            User?          @relation(fields: [userId], references: [id])
  userId          String?
  customerName    String         // For walk-ins
  customerEmail   String?
  customerPhone   String?

  // Order Type & Details
  orderType       OrderType      // DINE_IN, TAKEOUT, DELIVERY
  status          OrderStatus    @default(PENDING)

  // Dine-in Specific
  table           Table?         @relation(fields: [tableId], references: [id])
  tableId         String?
  reservation     Reservation?   @relation(fields: [reservationId], references: [id])
  reservationId   String?        @unique

  // Takeout Specific
  pickupTime      DateTime?      // Expected pickup time

  // Tour Integration
  linkedTourBooking String?      // Reference to tour booking ID
  isTourPackage   Boolean        @default(false)

  // Order Items
  items           OrderItem[]

  // Pricing
  subtotal        Decimal        @db.Money
  taxAmount       Decimal        @db.Money
  tipAmount       Decimal        @default(0) @db.Money
  discountAmount  Decimal        @default(0) @db.Money
  totalAmount     Decimal        @db.Money

  // Payment
  paymentStatus   PaymentStatus  @default(PENDING)
  paymentIntentId String?        // Stripe payment intent
  paymentMethod   String?        // "card", "cash"
  paidAt          DateTime?

  // Special Instructions
  specialInstructions String?    @db.Text

  // Timestamps
  orderedAt       DateTime       @default(now())
  prepStartedAt   DateTime?
  readyAt         DateTime?
  servedAt        DateTime?
  completedAt     DateTime?

  // Staff Notes
  staffNotes      String?        @db.Text

  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  @@map("cafe_orders")
  @@index([orderNumber])
  @@index([status])
  @@index([userId])
  @@index([orderType])
  @@index([orderedAt])
}

enum OrderType {
  DINE_IN
  TAKEOUT
  DELIVERY       // Future
}

enum OrderStatus {
  PENDING        // Order received
  CONFIRMED      // Order confirmed by staff
  PREPARING      // Kitchen is preparing
  READY          // Ready for pickup/serving
  SERVED         // Served to customer (dine-in)
  COMPLETED      // Order completed
  CANCELLED      // Cancelled
}

enum PaymentStatus {
  PENDING
  PROCESSING
  SUCCEEDED
  FAILED
  REFUNDED
  PARTIALLY_REFUNDED
}
```

---

### 6. OrderItem

Individual items within an order.

```prisma
model OrderItem {
  id              String     @id @default(cuid())

  // Relations
  order           CafeOrder  @relation(fields: [orderId], references: [id], onDelete: Cascade)
  orderId         String
  menuItem        MenuItem   @relation(fields: [menuItemId], references: [id])
  menuItemId      String

  // Item Details (snapshot at time of order)
  name            String     // Item name at time of order
  price           Decimal    @db.Money // Price at time of order
  quantity        Int        @default(1)

  // Customizations
  modifications   String?    @db.Text // "No onions, extra spicy"
  portionSize     String?    // "Regular", "Large"

  // Pricing
  itemTotal       Decimal    @db.Money // price * quantity

  // Status
  status          OrderItemStatus @default(PENDING)

  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt

  @@map("order_items")
  @@index([orderId])
  @@index([menuItemId])
}

enum OrderItemStatus {
  PENDING        // Not started
  PREPARING      // Being prepared
  READY          // Ready to serve
  SERVED         // Served to customer
  CANCELLED      // Cancelled
}
```

---

### 7. MenuItemReview

Customer reviews for menu items.

```prisma
model MenuItemReview {
  id              String     @id @default(cuid())

  // Relations
  menuItem        MenuItem   @relation(fields: [menuItemId], references: [id], onDelete: Cascade)
  menuItemId      String
  user            User       @relation(fields: [userId], references: [id])
  userId          String
  order           CafeOrder? @relation(fields: [orderId], references: [id])
  orderId         String?

  // Review Content
  rating          Int        // 1-5 stars
  title           String?    // Optional review title
  comment         String?    @db.Text

  // Review Metadata
  wouldRecommend  Boolean    @default(true)
  images          String[]   // Optional customer photos

  // Moderation
  isApproved      Boolean    @default(false)
  moderatedAt     DateTime?
  moderatedBy     String?    // Staff user ID

  // Staff Response
  staffResponse   String?    @db.Text
  respondedAt     DateTime?

  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt

  @@map("menu_item_reviews")
  @@index([menuItemId])
  @@index([userId])
  @@index([rating])
  @@unique([userId, menuItemId, orderId]) // One review per item per order
}
```

---

### 8. DailySpecial (Optional - MVP Phase 2)

Manage daily specials and promotions.

```prisma
model DailySpecial {
  id              String     @id @default(cuid())
  title           String     // "Tuesday Taco Special"
  description     String     @db.Text

  // Linked Menu Item (optional)
  menuItem        MenuItem?  @relation(fields: [menuItemId], references: [id])
  menuItemId      String?

  // Pricing
  specialPrice    Decimal    @db.Money
  savingsAmount   Decimal?   @db.Money

  // Schedule
  daysOfWeek      Int[]      // [1,2,3] = Mon, Tue, Wed
  startDate       DateTime
  endDate         DateTime?
  timeSlot        String?    // "Lunch", "Dinner", "Happy Hour"

  // Display
  image           String?
  isActive        Boolean    @default(true)
  priority        Int        @default(0)

  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt

  @@map("daily_specials")
  @@index([startDate, endDate])
}
```

---

## Schema Integration with Existing Models

### Update User Model

Add café-related relationships to the existing `User` model:

```prisma
model User {
  // ... existing fields ...

  // Café Relations (ADD THESE)
  cafeOrders      CafeOrder[]
  reservations    Reservation[]
  menuItemReviews MenuItemReview[]

  // ... existing timestamps ...
}
```

### Update Tour Model (Optional)

Add optional meal package integration:

```prisma
model Tour {
  // ... existing fields ...

  // Meal Package Options (ADD THESE)
  hasMealPackage  Boolean   @default(false)
  mealPackagePrice Decimal? @db.Money
  mealDescription String?   @db.Text

  // ... existing timestamps ...
}
```

### Update Booking Model

Link tour bookings with café orders:

```prisma
model Booking {
  // ... existing fields ...

  // Café Integration (ADD THIS)
  includeMealPackage Boolean @default(false)
  cafeOrderId        String?  @unique
  mealPreference     String?  // "pre-tour", "post-tour"

  // ... existing timestamps ...
}
```

---

## Database Migrations

### Migration Strategy

1. **Phase 1**: Core café models (MenuCategory, MenuItem, Table)
2. **Phase 2**: Order system (CafeOrder, OrderItem)
3. **Phase 3**: Reservation system (Reservation)
4. **Phase 4**: Integration (update User, Tour, Booking)
5. **Phase 5**: Reviews and specials (MenuItemReview, DailySpecial)

### Sample Migration Commands

```bash
# Generate migration for café models
npx prisma migrate dev --name add_cafe_models

# Review generated SQL
cat prisma/migrations/[timestamp]_add_cafe_models/migration.sql

# Apply migration
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed database with initial data
npx prisma db seed
```

---

## Seed Data Structure

### Initial Menu Categories

```typescript
const menuCategories = [
  { name: "Appetizers & Starters", slug: "appetizers", displayOrder: 1 },
  { name: "Grilled Specialties", slug: "grilled", displayOrder: 2 },
  { name: "Jamaican Classics", slug: "jamaican-classics", displayOrder: 3 },
  { name: "Sides", slug: "sides", displayOrder: 4 },
  { name: "Desserts", slug: "desserts", displayOrder: 5 },
  { name: "Beverages", slug: "beverages", displayOrder: 6 },
  { name: "Bar & Cocktails", slug: "bar", displayOrder: 7 },
];
```

### Sample Menu Items

```typescript
const sampleMenuItems = [
  {
    name: "Jerk Chicken",
    slug: "jerk-chicken",
    description: "Authentic Jamaican jerk chicken marinated in traditional spices, grilled to perfection",
    categorySlug: "grilled",
    price: 18.99,
    isPopular: true,
    isSpicy: true,
    spicyLevel: 3,
    prepTimeMinutes: 20,
  },
  {
    name: "Ackee & Saltfish",
    slug: "ackee-saltfish",
    description: "Jamaica's national dish - sautéed ackee fruit with salted cod, onions, and peppers",
    categorySlug: "jamaican-classics",
    price: 16.99,
    isFeatured: true,
    prepTimeMinutes: 15,
  },
  // ... more items
];
```

### Initial Tables

```typescript
const tables = [
  { tableNumber: "T1", capacity: 2, location: "INDOOR" },
  { tableNumber: "T2", capacity: 4, location: "INDOOR" },
  { tableNumber: "T3", capacity: 4, location: "INDOOR" },
  { tableNumber: "P1", capacity: 2, location: "OUTDOOR" },
  { tableNumber: "P2", capacity: 4, location: "OUTDOOR" },
  { tableNumber: "BAR-1", capacity: 1, location: "BAR" },
  // ... more tables
];
```

---

## Database Indexes Strategy

### High-Priority Indexes

```prisma
// Most frequent queries
@@index([categoryId, isAvailable]) // MenuItem browsing
@@index([date, time, status])       // Reservation lookups
@@index([orderNumber])              // Order tracking
@@index([userId, createdAt])        // User order history
@@index([status, orderedAt])        // Kitchen queue
```

### Composite Indexes

```prisma
@@index([isAvailable, isPopular, categoryId]) // Homepage featured items
@@index([date, status, tableId])               // Table availability
@@index([orderType, status, orderedAt])        // Order management dashboard
```

---

## Data Integrity Rules

### Cascade Rules

```prisma
// Delete order items when order is deleted
order CafeOrder @relation(..., onDelete: Cascade)

// Delete reviews when menu item is deleted
menuItem MenuItem @relation(..., onDelete: Cascade)

// Prevent table deletion if active reservations exist
table Table @relation(..., onDelete: Restrict)
```

### Validation Rules

- **MenuItem.price**: Must be > 0
- **Reservation.partySize**: Must be between 1 and 20
- **OrderItem.quantity**: Must be > 0
- **MenuItemReview.rating**: Must be between 1 and 5
- **Table.capacity**: Must be > 0

---

## Performance Considerations

### Query Optimization

```typescript
// Efficient menu browsing with category prefetch
const menuWithCategory = await prisma.menuItem.findMany({
  where: { isAvailable: true },
  include: { category: true },
  orderBy: { category: { displayOrder: 'asc' } }
});

// Reservation availability check
const availableTables = await prisma.table.findMany({
  where: {
    capacity: { gte: partySize },
    reservations: {
      none: {
        date: selectedDate,
        time: selectedTime,
        status: { in: ['CONFIRMED', 'SEATED'] }
      }
    }
  }
});
```

### Caching Strategy

- Cache menu items (TTL: 5 minutes)
- Cache menu categories (TTL: 1 hour)
- Real-time order status (no caching)
- Cache table layout (TTL: 30 minutes)

---

## Backup & Data Retention

### Backup Schedule
- **Full backup**: Daily at 2 AM
- **Incremental backup**: Every 4 hours
- **Point-in-time recovery**: 30-day retention

### Data Retention Policy
- **Active orders**: Indefinite
- **Completed orders**: 2 years
- **Cancelled orders**: 6 months
- **Reservations**: 1 year
- **Reviews**: Indefinite (unless deleted by admin)

---

## Security Considerations

### Sensitive Data
- Payment details stored in Stripe (PCI compliance)
- Customer contact info encrypted at rest
- Staff notes visible only to authorized roles

### Access Control
```typescript
// Role-based access example
- Customer: Read own orders, make reservations
- Staff: Read all orders, update order status
- Manager: Full CRUD on menu, view analytics
- Admin: Full access to all models
```

---

## Testing Data

### Test Seed Script

```typescript
// prisma/seed-cafe-test.ts
async function seedCafeData() {
  // Create test categories
  await prisma.menuCategory.createMany({ data: testCategories });

  // Create test menu items
  await prisma.menuItem.createMany({ data: testMenuItems });

  // Create test tables
  await prisma.table.createMany({ data: testTables });

  // Create test reservations
  await prisma.reservation.createMany({ data: testReservations });
}
```

---

## Next Steps

1. ✅ **Review schema design** with team
2. ⏳ **Create Prisma migration files**
3. ⏳ **Set up seed scripts** for initial data
4. ⏳ **Test migrations** on development database
5. ⏳ **Create API endpoints** using this schema
6. ⏳ **Document query patterns** for frontend team

---

**Document Version**: 1.0
**Last Updated**: October 29, 2025
**Schema Version**: Compatible with Prisma 5.x
