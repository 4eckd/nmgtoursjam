# Café/Bar/Grill - Platform Integration Guide

## Overview

This document details how the café feature integrates with the existing NMG Tours Jamaica platform, including shared components, data relationships, cross-promotion strategies, and unified user experiences.

---

## Integration Architecture

### High-Level Integration Points

```
┌─────────────────────────────────────────────────┐
│         NMG Tours Jamaica Platform              │
│                                                 │
│  ┌──────────────┐         ┌──────────────┐    │
│  │  Tours       │◄───────►│   Café       │    │
│  │  Booking     │  Link   │   Orders     │    │
│  └──────────────┘         └──────────────┘    │
│         │                        │             │
│         ├────────┬───────────────┤             │
│         │        │               │             │
│  ┌──────▼───┐ ┌─▼────────┐ ┌───▼────────┐   │
│  │   User   │ │ Payment  │ │ Navigation │   │
│  │  System  │ │ (Stripe) │ │  & Footer  │   │
│  └──────────┘ └──────────┘ └────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Shared Infrastructure

### 1. Authentication & User System

**Integration**: Both tours and café use the same NextAuth.js authentication system.

#### User Model Extensions

The existing `User` model needs to be extended to support café functionality:

```prisma
model User {
  id              String    @id @default(cuid())
  email           String    @unique
  name            String?
  role            Role      @default(USER)

  // Existing tour relations
  bookings        Booking[]
  reviews         Review[]
  savedTours      SavedTour[]

  // NEW: Café relations
  cafeOrders      CafeOrder[]
  reservations    Reservation[]
  menuItemReviews MenuItemReview[]

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}
```

#### Unified User Dashboard

**Route**: `/dashboard`

The user dashboard should show both tour bookings and café orders/reservations:

```typescript
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const session = await getServerSession();
  const user = await getUserData(session.user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1>My Dashboard</h1>

      <Tabs defaultValue="tours">
        <TabsList>
          <TabsTrigger value="tours">Tour Bookings</TabsTrigger>
          <TabsTrigger value="cafe-orders">Café Orders</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="tours">
          <TourBookingsList bookings={user.bookings} />
        </TabsContent>

        <TabsContent value="cafe-orders">
          <CafeOrdersList orders={user.cafeOrders} />
        </TabsContent>

        <TabsContent value="reservations">
          <ReservationsList reservations={user.reservations} />
        </TabsContent>

        <TabsContent value="profile">
          <ProfileSettings user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

### 2. Payment System Integration

**Shared Service**: Stripe (already configured)

#### Unified Payment Flow

Both tours and café orders use the same Stripe integration:

```typescript
// lib/stripe.ts (existing)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Extended for café orders
export async function createCafePaymentIntent(order: CafeOrder) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.totalAmount * 100), // cents
    currency: 'usd',
    metadata: {
      orderId: order.id,
      orderType: 'CAFE',
      customerEmail: order.customerEmail,
    },
  });

  return paymentIntent;
}

export async function createTourPaymentIntent(booking: Booking) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(booking.totalPrice * 100),
    currency: 'usd',
    metadata: {
      bookingId: booking.id,
      orderType: 'TOUR',
      customerEmail: booking.guestEmail,
    },
  });

  return paymentIntent;
}
```

#### Unified Webhook Handler

**Route**: `/api/webhooks/stripe`

The existing webhook should handle both tour and café payments:

```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const orderType = paymentIntent.metadata.orderType;

    if (orderType === 'TOUR') {
      await handleTourPaymentSuccess(paymentIntent);
    } else if (orderType === 'CAFE') {
      await handleCafePaymentSuccess(paymentIntent);
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCafePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata.orderId;

  await prisma.cafeOrder.update({
    where: { id: orderId },
    data: {
      paymentStatus: 'SUCCEEDED',
      paidAt: new Date(),
    },
  });

  // Send confirmation email
  await sendCafeOrderConfirmation(orderId);
}
```

---

### 3. Navigation & Layout Integration

#### Updated Navigation Component

**File**: `app/components/Navigation.tsx`

Add café menu item to the existing navigation:

```typescript
'use client';

export default function Navigation() {
  return (
    <nav className="bg-black/70 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <DesktopMenu>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/tours">Tours</NavLink>
            <NavLink href="/cafe">Café & Grill</NavLink> {/* NEW */}
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </DesktopMenu>

          <div className="flex items-center gap-4">
            <CartButton /> {/* NEW: Shows café cart item count */}
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

function CartButton() {
  const { itemCount } = useCafeStore();

  if (itemCount === 0) return null;

  return (
    <Link href="/cafe/orders/checkout">
      <button className="relative p-2 text-white hover:text-emerald-400">
        <ShoppingCart size={24} />
        <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      </button>
    </Link>
  );
}
```

#### Updated Footer Component

**File**: `app/components/Footer.tsx`

Add café links to footer:

```typescript
export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Tours Section (existing) */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Tours</h3>
            <ul className="space-y-2">
              <li><Link href="/tours">Browse Tours</Link></li>
              <li><Link href="/tours/rafting">Rafting Adventures</Link></li>
              <li><Link href="/tours/cultural">Cultural Experiences</Link></li>
            </ul>
          </div>

          {/* NEW: Café Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Café & Grill</h3>
            <ul className="space-y-2">
              <li><Link href="/cafe">About Our Café</Link></li>
              <li><Link href="/cafe/menu">View Menu</Link></li>
              <li><Link href="/cafe/reservations">Make a Reservation</Link></li>
              <li><Link href="/cafe/menu?category=bar">Bar & Cocktails</Link></li>
            </ul>
          </div>

          {/* Company Section (existing) */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/dashboard">My Account</Link></li>
            </ul>
          </div>

          {/* Legal Section (existing) */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/legal/terms">Terms of Service</Link></li>
              <li><Link href="/legal/privacy">Privacy Policy</Link></li>
              <li><Link href="/legal/refunds">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## Tour + Meal Package Integration

### 1. Database Linkage

#### Updated Tour Model

```prisma
model Tour {
  // ... existing fields ...

  // NEW: Meal package options
  hasMealPackage     Boolean   @default(false)
  mealPackagePrice   Decimal?  @db.Money
  mealPackageDescription String? @db.Text

  // ... existing relations ...
}
```

#### Updated Booking Model

```prisma
model Booking {
  // ... existing fields ...

  // NEW: Café integration
  includeMealPackage Boolean @default(false)
  cafeOrderId        String?  @unique
  mealPreference     String?  // "pre-tour", "post-tour"

  // ... existing relations ...
}
```

---

### 2. Tour Detail Page Integration

**File**: `app/tours/[slug]/page.tsx`

Add meal package section to tour detail pages:

```typescript
export default async function TourDetailPage({ params }) {
  const tour = await getTour(params.slug);

  return (
    <div>
      {/* Existing tour content */}
      <TourHero tour={tour} />
      <TourDescription tour={tour} />
      <TourHighlights tour={tour} />

      {/* NEW: Meal Package Section */}
      {tour.hasMealPackage && (
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-4">Add a Meal Package</h2>
          <MealPackageOptions
            tour={tour}
            onSelect={(option) => addMealToBooking(option)}
          />
        </section>
      )}

      <TourBookingWidget tour={tour} />
    </div>
  );
}
```

#### MealPackageOptions Component

```typescript
// app/components/tours/MealPackageOptions.tsx
'use client';

interface MealPackageOptionsProps {
  tour: Tour;
  onSelect: (option: MealOption) => void;
}

export function MealPackageOptions({ tour, onSelect }: MealPackageOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const mealOptions = [
    {
      id: 'pre-tour-breakfast',
      name: 'Pre-Tour Breakfast',
      description: 'Start your day with a hearty Jamaican breakfast before your tour',
      items: ['Ackee & Saltfish', 'Festival', 'Coffee or Juice'],
      price: 15.00,
      timing: 'pre-tour',
    },
    {
      id: 'post-tour-lunch',
      name: 'Post-Tour Lunch',
      description: 'Enjoy authentic Jamaican cuisine after your adventure',
      items: ['Jerk Chicken', 'Rice & Peas', 'Plantain', 'Soft Drink'],
      price: 22.00,
      timing: 'post-tour',
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {mealOptions.map(option => (
        <Card
          key={option.id}
          className={cn(
            "cursor-pointer transition-all",
            selectedOption === option.id && "ring-2 ring-emerald-500"
          )}
          onClick={() => {
            setSelectedOption(option.id);
            onSelect(option);
          }}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">{option.name}</h3>
              <Badge variant="success">${option.price}</Badge>
            </div>

            <p className="text-sm text-zinc-400 mb-4">{option.description}</p>

            <div>
              <p className="text-sm font-medium mb-2">Includes:</p>
              <ul className="text-sm text-zinc-300 space-y-1">
                {option.items.map(item => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <Badge variant="outline" className="mt-4">
              {option.timing === 'pre-tour' ? 'Before Tour' : 'After Tour'}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

---

### 3. Combined Booking Flow

#### Updated Booking Widget

```typescript
// app/components/tours/BookingWidget.tsx
'use client';

export function BookingWidget({ tour }: { tour: Tour }) {
  const [date, setDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [mealOption, setMealOption] = useState<MealOption | null>(null);

  const tourPrice = tour.price * guests;
  const mealPrice = mealOption ? mealOption.price * guests : 0;
  const totalPrice = tourPrice + mealPrice;

  async function handleBooking() {
    const booking = await createBooking({
      tourId: tour.id,
      date,
      guests,
      includeMealPackage: !!mealOption,
      mealPreference: mealOption?.timing,
    });

    // If meal package included, create linked café order
    if (mealOption) {
      await createLinkedCafeOrder({
        bookingId: booking.id,
        mealOption,
        guests,
      });
    }

    router.push(`/bookings/${booking.id}/success`);
  }

  return (
    <Card className="sticky top-24">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-6">Book This Tour</h3>

        <DatePicker selected={date} onChange={setDate} />
        <GuestSelector value={guests} onChange={setGuests} />

        {tour.hasMealPackage && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              Add Meal Package (Optional)
            </label>
            <Select
              value={mealOption?.id}
              onChange={(id) => setMealOption(getMealOption(id))}
            >
              <option value="">No meal</option>
              <option value="pre-tour-breakfast">Pre-Tour Breakfast (+$15/person)</option>
              <option value="post-tour-lunch">Post-Tour Lunch (+$22/person)</option>
            </Select>
          </div>
        )}

        <div className="border-t mt-6 pt-6">
          <div className="flex justify-between mb-2">
            <span>Tour: ${tour.price} × {guests}</span>
            <span>${tourPrice.toFixed(2)}</span>
          </div>
          {mealOption && (
            <div className="flex justify-between mb-2 text-emerald-500">
              <span>Meal: ${mealOption.price} × {guests}</span>
              <span>${mealPrice.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold mt-4">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full mt-6"
          onClick={handleBooking}
          disabled={!date}
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
}
```

---

## Cross-Promotion Strategies

### 1. Homepage Integration

**File**: `app/page.tsx`

Add café section to homepage:

```typescript
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedTours />

      {/* NEW: Café Promotion */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Authentic Jamaican Cuisine
              </h2>
              <p className="text-zinc-300 mb-6">
                Complement your adventure with delicious local flavors at our café and grill.
                Enjoy traditional dishes, fresh seafood, and tropical cocktails.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/cafe/menu">View Menu</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/cafe/reservations">Reserve a Table</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/images/cafe-hero.jpg"
                alt="NMG Café & Grill"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <UpcomingEvents />
      <Testimonials />
    </>
  );
}
```

---

### 2. Tour Confirmation Cross-Sell

**File**: `app/bookings/[id]/success/page.tsx`

Suggest café reservations after tour booking:

```typescript
export default async function BookingSuccessPage({ params }) {
  const booking = await getBooking(params.id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <SuccessAnimation />

      <h1 className="text-3xl font-bold text-center mb-2">Booking Confirmed!</h1>
      <p className="text-center text-zinc-400 mb-8">
        Confirmation sent to {booking.guestEmail}
      </p>

      <BookingSummary booking={booking} />

      {/* NEW: Cross-sell café */}
      {!booking.includeMealPackage && (
        <Card className="mt-8 bg-emerald-900/20 border-emerald-500">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Utensils size={24} className="text-emerald-400" />
              Complete Your Experience
            </h3>
            <p className="text-zinc-300 mb-4">
              Make a reservation at our café before or after your tour!
              Enjoy authentic Jamaican cuisine and refreshing tropical drinks.
            </p>
            <Button asChild>
              <Link href={`/cafe/reservations?date=${booking.date}`}>
                Reserve a Table
              </Link>
            </Button>
          </div>
        </Card>
      )}

      <div className="flex gap-4 mt-8">
        <Button asChild variant="outline">
          <Link href="/dashboard">View My Bookings</Link>
        </Button>
        <Button asChild>
          <Link href="/tours">Browse More Tours</Link>
        </Button>
      </div>
    </div>
  );
}
```

---

### 3. Café → Tours Cross-Promotion

**File**: `app/cafe/page.tsx`

Add tour suggestion banner on café landing page:

```typescript
export default function CafePage() {
  return (
    <>
      <CafeHero />
      <FeaturedMenuItems />

      {/* Cross-sell tours */}
      <section className="py-12 bg-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Make It a Full Day Experience
          </h2>
          <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
            Combine your meal with one of our exciting tour adventures!
            Book a rafting tour or cultural experience and enjoy a discounted meal package.
          </p>
          <Button asChild size="lg">
            <Link href="/tours">Explore Tours</Link>
          </Button>
        </div>
      </section>

      <AboutSection />
      <LocationHours />
    </>
  );
}
```

---

## Email & Notification Integration

### Unified Email Service

**File**: `lib/email.ts`

Extend existing email service to support café notifications:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Existing tour email
export async function sendTourConfirmation(booking: Booking) {
  await resend.emails.send({
    from: 'NMG Tours <bookings@nmgtoursjam.com>',
    to: booking.guestEmail,
    subject: `Tour Booking Confirmed - ${booking.tour.title}`,
    html: renderTourConfirmationEmail(booking),
  });
}

// NEW: Café order confirmation
export async function sendCafeOrderConfirmation(order: CafeOrder) {
  await resend.emails.send({
    from: 'NMG Café <cafe@nmgtoursjam.com>',
    to: order.customerEmail,
    subject: `Order Confirmed - ${order.orderNumber}`,
    html: renderCafeOrderEmail(order),
  });
}

// NEW: Reservation confirmation
export async function sendReservationConfirmation(reservation: Reservation) {
  await resend.emails.send({
    from: 'NMG Café <cafe@nmgtoursjam.com>',
    to: reservation.guestEmail,
    subject: `Table Reserved - ${formatDate(reservation.date)}`,
    html: renderReservationEmail(reservation),
  });
}

// NEW: Combined tour + meal confirmation
export async function sendCombinedBookingConfirmation(booking: Booking) {
  const cafeOrder = await getCafeOrderForBooking(booking.id);

  await resend.emails.send({
    from: 'NMG Tours & Café <bookings@nmgtoursjam.com>',
    to: booking.guestEmail,
    subject: `Complete Package Confirmed - Tour + Meal`,
    html: renderCombinedBookingEmail(booking, cafeOrder),
  });
}
```

### Email Templates

Create branded email templates that work for both tours and café:

```typescript
// lib/email-templates/combined-booking.tsx
export function CombinedBookingEmail({ booking, cafeOrder }) {
  return (
    <EmailLayout>
      <Header logo="/logo.png" />

      <Section>
        <Heading>Your Complete Experience is Confirmed!</Heading>
        <Text>
          Thank you for booking with NMG Tours Jamaica. We've confirmed both
          your tour and your meal reservation.
        </Text>
      </Section>

      <Section title="Tour Details">
        <Detail label="Tour" value={booking.tour.title} />
        <Detail label="Date" value={formatDate(booking.date)} />
        <Detail label="Guests" value={booking.guests} />
        <Detail label="Price" value={`$${booking.tourPrice}`} />
      </Section>

      <Section title="Meal Package">
        <Detail label="Type" value={cafeOrder.mealType} />
        <Detail label="Time" value={cafeOrder.mealTime} />
        <Detail label="Location" value="NMG Café & Grill" />
        <Detail label="Price" value={`$${cafeOrder.totalAmount}`} />
      </Section>

      <Section>
        <Button href={`https://nmgtoursjam.com/dashboard`}>
          View Full Details
        </Button>
      </Section>

      <Footer />
    </EmailLayout>
  );
}
```

---

## Analytics & Tracking Integration

### Unified Analytics

**File**: `lib/analytics.ts`

Track events for both tours and café:

```typescript
// Google Analytics 4 events
export function trackTourBooking(booking: Booking) {
  gtag('event', 'purchase', {
    transaction_id: booking.id,
    value: booking.totalPrice,
    currency: 'USD',
    items: [{
      item_id: booking.tourId,
      item_name: booking.tour.title,
      item_category: 'Tour',
      price: booking.tourPrice,
      quantity: booking.guests,
    }],
  });
}

export function trackCafeOrder(order: CafeOrder) {
  gtag('event', 'purchase', {
    transaction_id: order.id,
    value: order.totalAmount,
    currency: 'USD',
    items: order.items.map(item => ({
      item_id: item.menuItemId,
      item_name: item.name,
      item_category: 'Café',
      price: item.price,
      quantity: item.quantity,
    })),
  });
}

export function trackCombinedBooking(booking: Booking, order: CafeOrder) {
  const totalValue = booking.totalPrice + order.totalAmount;

  gtag('event', 'purchase', {
    transaction_id: `${booking.id}-${order.id}`,
    value: totalValue,
    currency: 'USD',
    items: [
      {
        item_id: booking.tourId,
        item_name: booking.tour.title,
        item_category: 'Tour',
        price: booking.tourPrice,
        quantity: booking.guests,
      },
      ...order.items.map(item => ({
        item_id: item.menuItemId,
        item_name: item.name,
        item_category: 'Café',
        price: item.price,
        quantity: item.quantity,
      })),
    ],
  });

  // Track package discount effectiveness
  gtag('event', 'package_booked', {
    package_type: 'tour_meal',
    discount_amount: calculateDiscount(booking, order),
  });
}
```

---

## Admin Dashboard Integration

### Unified Admin Portal

**Route**: `/admin`

Create a unified admin dashboard for both tours and café:

```typescript
// app/admin/page.tsx
export default async function AdminDashboard() {
  const stats = await getAdminStats();

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Tour Bookings (Today)"
          value={stats.tourBookingsToday}
          icon={<Calendar />}
          trend={stats.tourTrend}
        />
        <StatCard
          title="Café Orders (Today)"
          value={stats.cafeOrdersToday}
          icon={<Utensils />}
          trend={stats.cafeTrend}
        />
        <StatCard
          title="Reservations (Today)"
          value={stats.reservationsToday}
          icon={<Users />}
          trend={stats.reservationTrend}
        />
        <StatCard
          title="Total Revenue (Today)"
          value={`$${stats.totalRevenue}`}
          icon={<DollarSign />}
          trend={stats.revenueTrend}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <QuickActionCard
          title="Manage Tours"
          description="View and update tour listings"
          href="/admin/tours"
          icon={<MapPin />}
        />
        <QuickActionCard
          title="Manage Menu"
          description="Update café menu items"
          href="/admin/cafe/menu"
          icon={<UtensilsCrossed />}
        />
        <QuickActionCard
          title="View All Orders"
          description="Tour bookings and café orders"
          href="/admin/orders"
          icon={<FileText />}
        />
      </div>

      {/* Recent Activity */}
      <Tabs defaultValue="tour-bookings">
        <TabsList>
          <TabsTrigger value="tour-bookings">Tour Bookings</TabsTrigger>
          <TabsTrigger value="cafe-orders">Café Orders</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
        </TabsList>

        <TabsContent value="tour-bookings">
          <RecentTourBookings bookings={stats.recentBookings} />
        </TabsContent>

        <TabsContent value="cafe-orders">
          <RecentCafeOrders orders={stats.recentOrders} />
        </TabsContent>

        <TabsContent value="reservations">
          <RecentReservations reservations={stats.recentReservations} />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
```

---

## SEO Integration

### Sitemap Updates

**File**: `app/sitemap.ts`

Include café pages in sitemap:

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await getAllTours();
  const menuItems = await getAllMenuItems();

  return [
    // Existing tour pages
    { url: 'https://nmgtoursjam.com', priority: 1 },
    { url: 'https://nmgtoursjam.com/tours', priority: 0.9 },
    ...tours.map(tour => ({
      url: `https://nmgtoursjam.com/tours/${tour.slug}`,
      lastModified: tour.updatedAt,
      priority: 0.8,
    })),

    // NEW: Café pages
    { url: 'https://nmgtoursjam.com/cafe', priority: 0.9 },
    { url: 'https://nmgtoursjam.com/cafe/menu', priority: 0.9 },
    { url: 'https://nmgtoursjam.com/cafe/reservations', priority: 0.8 },
    ...menuItems.map(item => ({
      url: `https://nmgtoursjam.com/cafe/menu/${item.slug}`,
      lastModified: item.updatedAt,
      priority: 0.6,
    })),
  ];
}
```

### Structured Data

Add schema.org markup for café:

```typescript
// app/cafe/page.tsx
export default function CafePage() {
  const cafeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'NMG Café & Grill',
    image: 'https://nmgtoursjam.com/images/cafe-cover.jpg',
    description: 'Authentic Jamaican cuisine and tropical cocktails',
    servesCuisine: 'Jamaican',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main Street',
      addressLocality: 'Montego Bay',
      addressCountry: 'JM',
    },
    telephone: '+1-876-555-1234',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '22:00',
      },
    ],
    menu: 'https://nmgtoursjam.com/cafe/menu',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cafeSchema) }}
      />
      {/* Page content */}
    </>
  );
}
```

---

## Mobile App Considerations (Future)

### Unified Mobile Experience

When building a mobile app (Phase 2), ensure it supports both features:

```typescript
// Mobile app navigation structure
- Home
  - Featured Tours
  - Featured Menu Items
  - Quick Actions (Book Tour, Order Food, Reserve Table)

- Tours
  - Browse
  - Search
  - My Bookings

- Café
  - Menu
  - Cart
  - My Orders
  - Reservations

- Profile
  - Tour History
  - Café Order History
  - Reservation History
  - Settings
```

---

## Testing Integration

### E2E Test Scenarios

Test integrated flows:

```typescript
// tests/e2e/integrated-booking.spec.ts
test('User books tour with meal package', async ({ page }) => {
  // Navigate to tour
  await page.goto('/tours/rafting-adventure');

  // Select date and guests
  await page.click('[data-testid="date-picker"]');
  await selectDate(futureDate);
  await page.fill('[data-testid="guests-input"]', '2');

  // Add meal package
  await page.click('[data-testid="add-meal-package"]');
  await page.selectOption('[data-testid="meal-option"]', 'post-tour-lunch');

  // Verify combined price
  const total = await page.textContent('[data-testid="total-price"]');
  expect(total).toContain('$144.00'); // (50 + 22) * 2

  // Complete booking
  await page.click('[data-testid="book-now"]');
  await fillGuestInfo(page);
  await fillPaymentInfo(page);
  await page.click('[data-testid="confirm-booking"]');

  // Verify success
  await expect(page).toHaveURL(/\/bookings\/.*\/success/);
  await expect(page.locator('h1')).toContainText('Booking Confirmed');

  // Verify both tour and meal are confirmed
  await expect(page.locator('[data-testid="tour-confirmation"]')).toBeVisible();
  await expect(page.locator('[data-testid="meal-confirmation"]')).toBeVisible();
});
```

---

## Performance Considerations

### Caching Strategy

- **Shared Data**: User session, payment methods (cache across features)
- **Tour-Specific**: Tour listings, availability (5-minute cache)
- **Café-Specific**: Menu items (5-minute cache), orders (no cache)

### Database Optimization

- Index foreign keys: `userId`, `tourId`, `cafeOrderId`
- Optimize joint queries for combined bookings
- Use database transactions for creating linked orders

---

## Security Considerations

### Authorization Checks

Ensure users can only access their own data across both systems:

```typescript
// middleware.ts
export function checkAuthorization(userId: string, resourceId: string, resourceType: 'tour' | 'cafe') {
  if (resourceType === 'tour') {
    return prisma.booking.findFirst({
      where: { id: resourceId, userId },
    });
  } else {
    return prisma.cafeOrder.findFirst({
      where: { id: resourceId, userId },
    });
  }
}
```

---

## Migration Strategy

### Gradual Rollout

1. **Week 1**: Launch café as standalone feature (no tour integration)
2. **Week 2**: Add navigation links and cross-promotion banners
3. **Week 3**: Enable tour + meal packages
4. **Week 4**: Full integration (unified dashboard, combined emails)

### Feature Flags

Use feature flags to control rollout:

```typescript
// lib/feature-flags.ts
export const FEATURES = {
  CAFE_ENABLED: true,
  TOUR_MEAL_PACKAGES: false, // Enable later
  UNIFIED_DASHBOARD: false,  // Enable later
};

// Usage
if (FEATURES.TOUR_MEAL_PACKAGES) {
  return <MealPackageOptions />;
}
```

---

## Success Metrics

### Integration KPIs

- **Cross-sell Rate**: % of tour bookings that add meal packages
- **Combined AOV**: Average order value for tour + meal vs. tour only
- **Return Rate**: % of café customers who book tours (and vice versa)
- **Unified Dashboard Usage**: % of users accessing both sections

### Target Goals

- Cross-sell rate: 20%+ (1 in 5 tour bookings add meal)
- Combined AOV increase: 30%+ vs. tour-only bookings
- Return rate: 15%+ (café customers booking tours within 30 days)

---

## Conclusion

This integration creates a cohesive platform where tours and café complement each other, providing customers with a complete experience while maximizing revenue opportunities through package deals and cross-promotion.

---

**Document Version**: 1.0
**Last Updated**: October 29, 2025
**Status**: Ready for Implementation
