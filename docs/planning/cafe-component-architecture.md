# Café/Bar/Grill - Component Architecture

## Overview

This document defines the frontend component architecture for the café feature, including page structure, reusable components, state management, and integration patterns with the existing NMG Tours platform.

**Framework**: Next.js 16 (App Router)
**UI Library**: React 19
**Styling**: Tailwind CSS 4
**State Management**: React hooks + Zustand (for complex state)
**Icons**: Lucide React

---

## Directory Structure

```
app/
├── cafe/
│   ├── page.tsx                    # Café landing page
│   ├── layout.tsx                  # Café-specific layout
│   ├── menu/
│   │   ├── page.tsx                # Menu browsing page
│   │   ├── [slug]/
│   │   │   └── page.tsx            # Menu item detail page
│   │   └── loading.tsx             # Menu loading state
│   ├── reservations/
│   │   ├── page.tsx                # Make a reservation
│   │   ├── [id]/
│   │   │   └── page.tsx            # Reservation confirmation
│   │   └── success/
│   │       └── page.tsx            # Booking success page
│   ├── orders/
│   │   ├── page.tsx                # Order history (protected)
│   │   ├── [id]/
│   │   │   └── page.tsx            # Order details & tracking
│   │   └── checkout/
│   │       └── page.tsx            # Order checkout
│   └── admin/
│       ├── page.tsx                # Admin dashboard
│       ├── menu/
│       │   ├── page.tsx            # Manage menu items
│       │   ├── new/
│       │   │   └── page.tsx        # Create menu item
│       │   └── [id]/
│       │       └── page.tsx        # Edit menu item
│       ├── orders/
│       │   └── page.tsx            # Order management
│       └── reservations/
│           └── page.tsx            # Reservation management
│
├── components/
│   ├── cafe/                       # Café-specific components
│   │   ├── menu/
│   │   │   ├── MenuCard.tsx
│   │   │   ├── MenuGrid.tsx
│   │   │   ├── MenuFilters.tsx
│   │   │   ├── MenuItemDetail.tsx
│   │   │   ├── CategoryNav.tsx
│   │   │   ├── DietaryBadges.tsx
│   │   │   └── SpicyLevelIndicator.tsx
│   │   ├── orders/
│   │   │   ├── OrderCart.tsx
│   │   │   ├── OrderSummary.tsx
│   │   │   ├── OrderStatusTracker.tsx
│   │   │   ├── OrderItemCard.tsx
│   │   │   ├── OrderHistory.tsx
│   │   │   └── CheckoutForm.tsx
│   │   ├── reservations/
│   │   │   ├── ReservationForm.tsx
│   │   │   ├── DateTimePicker.tsx
│   │   │   ├── TableAvailability.tsx
│   │   │   ├── PartySelector.tsx
│   │   │   └── ReservationCard.tsx
│   │   ├── reviews/
│   │   │   ├── ReviewForm.tsx
│   │   │   ├── ReviewCard.tsx
│   │   │   ├── StarRating.tsx
│   │   │   └── ReviewList.tsx
│   │   └── shared/
│   │       ├── CafeHero.tsx
│   │       ├── PriceTag.tsx
│   │       ├── PrepTimeIndicator.tsx
│   │       └── AllergenInfo.tsx
│   └── ui/                         # Shared UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Modal.tsx
│       ├── Badge.tsx
│       ├── Tabs.tsx
│       └── Toast.tsx
│
├── lib/
│   ├── cafe/
│   │   ├── api.ts                  # API client functions
│   │   ├── utils.ts                # Utility functions
│   │   ├── validation.ts           # Zod schemas
│   │   └── constants.ts            # Constants & enums
│   └── stores/
│       └── cafeStore.ts            # Zustand store for cart & state
│
└── types/
    └── cafe.ts                     # TypeScript types
```

---

## Page Components

### 1. Café Landing Page (`/cafe`)

**File**: `app/cafe/page.tsx`
**Type**: Server Component

**Purpose**: Main landing page showcasing the café, featured items, and CTAs for menu/reservations.

**Sections**:
```typescript
export default function CafePage() {
  return (
    <>
      <CafeHero />
      <FeaturedItems />
      <AboutSection />
      <LocationHours />
      <ReservationCTA />
      <InstagramFeed />
    </>
  );
}
```

**Key Features**:
- Hero section with café ambiance imagery
- Featured menu items (carousel or grid)
- Quick reservation button
- Operating hours and location
- Social proof (reviews, Instagram)

---

### 2. Menu Browsing Page (`/cafe/menu`)

**File**: `app/cafe/menu/page.tsx`
**Type**: Server Component with Client Components for filters

**Purpose**: Browse full menu with filtering, search, and category navigation.

**Layout**:
```typescript
export default async function MenuPage({ searchParams }) {
  const menuItems = await getMenuItems(searchParams);
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <MenuHeader />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters (Desktop) */}
        <aside className="lg:w-64">
          <MenuFilters categories={categories} />
        </aside>

        {/* Menu Grid */}
        <main className="flex-1">
          <CategoryNav categories={categories} />
          <MenuGrid items={menuItems} />
        </main>
      </div>
    </div>
  );
}
```

**Key Features**:
- Category navigation (sticky on scroll)
- Dietary filters (vegetarian, vegan, gluten-free)
- Price range slider
- Search functionality
- Sort options (popular, price, name)
- Responsive grid layout (1/2/3 columns)

---

### 3. Menu Item Detail Page (`/cafe/menu/[slug]`)

**File**: `app/cafe/menu/[slug]/page.tsx`
**Type**: Server Component

**Purpose**: Detailed view of a single menu item with full description, images, nutritional info, and reviews.

**Layout**:
```typescript
export default async function MenuItemPage({ params }) {
  const item = await getMenuItem(params.slug);
  const reviews = await getMenuItemReviews(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <ImageGallery images={item.images} />

        {/* Item Info */}
        <div>
          <MenuItemDetail item={item} />
          <AddToOrderButton itemId={item.id} />
        </div>
      </div>

      {/* Tabs: Description, Nutrition, Reviews */}
      <Tabs>
        <TabPanel label="Description">
          <ItemDescription content={item.description} />
        </TabPanel>
        <TabPanel label="Nutrition">
          <NutritionalInfo data={item.nutritionalInfo} />
        </TabPanel>
        <TabPanel label="Reviews">
          <ReviewList reviews={reviews} />
        </TabPanel>
      </Tabs>

      {/* Related Items */}
      <RelatedItems categoryId={item.categoryId} />
    </div>
  );
}
```

---

### 4. Reservation Page (`/cafe/reservations`)

**File**: `app/cafe/reservations/page.tsx`
**Type**: Client Component (form interactions)

**Purpose**: Make a table reservation with date/time selection and guest details.

**Layout**:
```typescript
'use client';

export default function ReservationPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1>Reserve a Table</h1>

      <StepIndicator currentStep={step} totalSteps={3} />

      {step === 1 && (
        <DateTimeStep onNext={(data) => handleStepData(data)} />
      )}
      {step === 2 && (
        <GuestDetailsStep onNext={(data) => handleStepData(data)} />
      )}
      {step === 3 && (
        <ConfirmationStep data={reservationData} onSubmit={submitReservation} />
      )}
    </div>
  );
}
```

**Key Features**:
- Multi-step form (date/time → details → confirmation)
- Real-time availability checking
- Party size selector (1-20)
- Special requests textarea
- Dietary needs notation
- Email/SMS confirmation

---

### 5. Order Checkout Page (`/cafe/orders/checkout`)

**File**: `app/cafe/orders/checkout/page.tsx`
**Type**: Client Component

**Purpose**: Complete order with payment processing.

**Layout**:
```typescript
'use client';

export default function CheckoutPage() {
  const { cart, total } = useCafeStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Summary (Sticky) */}
        <div className="lg:col-span-1">
          <OrderSummary items={cart} total={total} />
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <CheckoutForm
            orderType={orderType}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  );
}
```

**Key Features**:
- Order type selection (dine-in, takeout)
- Guest contact information
- Pickup time selection (takeout)
- Special instructions
- Stripe payment element
- Tip calculator
- Order confirmation

---

### 6. Order Tracking Page (`/cafe/orders/[id]`)

**File**: `app/cafe/orders/[id]/page.tsx`
**Type**: Client Component (real-time updates)

**Purpose**: Track order status in real-time.

**Layout**:
```typescript
'use client';

export default function OrderTrackingPage({ params }) {
  const { data: order, isLoading } = useOrder(params.id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1>Order #{order?.orderNumber}</h1>

      {/* Status Tracker */}
      <OrderStatusTracker status={order?.status} timeline={order?.timeline} />

      {/* Order Details */}
      <Card>
        <OrderItemsList items={order?.items} />
        <OrderPricing pricing={order?.pricing} />
      </Card>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <Button onClick={downloadReceipt}>Download Receipt</Button>
        {order?.status === 'READY' && (
          <Button variant="primary">Ready for Pickup</Button>
        )}
      </div>
    </div>
  );
}
```

---

## Reusable Components

### Menu Components

#### MenuCard

**File**: `app/components/cafe/menu/MenuCard.tsx`
**Type**: Client Component

**Purpose**: Display a single menu item in grid/list view.

```typescript
interface MenuCardProps {
  item: MenuItem;
  variant?: 'grid' | 'list';
  showAddButton?: boolean;
}

export function MenuCard({ item, variant = 'grid', showAddButton = true }: MenuCardProps) {
  return (
    <Card className={cn("relative", variant === 'grid' ? 'h-full' : 'flex')}>
      {/* Item Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={item.coverImage}
          alt={item.name}
          fill
          className="object-cover"
        />
        {item.isPopular && <PopularBadge />}
        {item.isSpicy && <SpicyLevelIndicator level={item.spicyLevel} />}
      </div>

      {/* Item Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <PriceTag price={item.price} compareAt={item.compareAtPrice} />
        </div>

        <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
          {item.shortDescription}
        </p>

        <div className="flex gap-2 mt-3">
          <DietaryBadges item={item} />
        </div>

        <div className="flex items-center justify-between mt-4">
          <PrepTimeIndicator minutes={item.prepTimeMinutes} />

          {showAddButton && (
            <Button
              size="sm"
              onClick={() => addToCart(item)}
              disabled={!item.isAvailable}
            >
              {item.isAvailable ? 'Add to Order' : 'Sold Out'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
```

---

#### MenuFilters

**File**: `app/components/cafe/menu/MenuFilters.tsx`
**Type**: Client Component

**Purpose**: Filter menu items by various criteria.

```typescript
interface MenuFiltersProps {
  categories: Category[];
  onFilterChange: (filters: MenuFilters) => void;
}

export function MenuFilters({ categories, onFilterChange }: MenuFiltersProps) {
  const [filters, setFilters] = useState<MenuFilters>({
    categoryId: null,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    priceRange: [0, 50],
  });

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <FilterSection title="Category">
        {categories.map(cat => (
          <Checkbox
            key={cat.id}
            label={cat.name}
            checked={filters.categoryId === cat.id}
            onChange={() => toggleCategory(cat.id)}
          />
        ))}
      </FilterSection>

      {/* Dietary Filters */}
      <FilterSection title="Dietary">
        <Checkbox
          label="Vegetarian"
          checked={filters.isVegetarian}
          onChange={() => toggleFilter('isVegetarian')}
        />
        <Checkbox
          label="Vegan"
          checked={filters.isVegan}
          onChange={() => toggleFilter('isVegan')}
        />
        <Checkbox
          label="Gluten-Free"
          checked={filters.isGlutenFree}
          onChange={() => toggleFilter('isGlutenFree')}
        />
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <RangeSlider
          min={0}
          max={50}
          value={filters.priceRange}
          onChange={(range) => updateFilter('priceRange', range)}
        />
        <div className="flex justify-between text-sm">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </FilterSection>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  );
}
```

---

### Order Components

#### OrderCart

**File**: `app/components/cafe/orders/OrderCart.tsx`
**Type**: Client Component

**Purpose**: Shopping cart sidebar/modal for managing order items.

```typescript
'use client';

export function OrderCart() {
  const { cart, updateQuantity, removeItem, total } = useCafeStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Cart Button (Fixed) */}
      <button
        className="fixed bottom-4 right-4 bg-emerald-500 text-white p-4 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Your Order">
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-full mt-4"
                onClick={() => router.push('/cafe/orders/checkout')}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
```

---

#### OrderStatusTracker

**File**: `app/components/cafe/orders/OrderStatusTracker.tsx`
**Type**: Client Component

**Purpose**: Visual progress indicator for order status.

```typescript
interface OrderStatusTrackerProps {
  status: OrderStatus;
  timeline: OrderTimeline;
}

const ORDER_STAGES = [
  { key: 'PENDING', label: 'Order Received', icon: CheckCircle },
  { key: 'CONFIRMED', label: 'Confirmed', icon: Clock },
  { key: 'PREPARING', label: 'Preparing', icon: ChefHat },
  { key: 'READY', label: 'Ready', icon: BellRing },
  { key: 'SERVED', label: 'Served', icon: Utensils },
];

export function OrderStatusTracker({ status, timeline }: OrderStatusTrackerProps) {
  const currentIndex = ORDER_STAGES.findIndex(stage => stage.key === status);

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="absolute top-5 left-0 w-full h-1 bg-zinc-200">
        <div
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${(currentIndex / (ORDER_STAGES.length - 1)) * 100}%` }}
        />
      </div>

      {/* Stages */}
      <div className="flex justify-between relative">
        {ORDER_STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const isComplete = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={stage.key} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  "border-2 bg-white transition-colors",
                  isComplete ? "border-emerald-500 text-emerald-500" : "border-zinc-300 text-zinc-300",
                  isCurrent && "ring-4 ring-emerald-100"
                )}
              >
                <Icon size={20} />
              </div>
              <span className={cn(
                "text-xs mt-2 text-center",
                isComplete ? "text-emerald-600 font-semibold" : "text-zinc-400"
              )}>
                {stage.label}
              </span>
              {timeline[stage.key] && (
                <span className="text-xs text-zinc-400 mt-1">
                  {formatTime(timeline[stage.key])}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

---

### Reservation Components

#### DateTimePicker

**File**: `app/components/cafe/reservations/DateTimePicker.tsx`
**Type**: Client Component

**Purpose**: Select reservation date and time with availability checking.

```typescript
'use client';

export function DateTimePicker({ onSelect }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [partySize, setPartySize] = useState(2);

  const { data: availability, isLoading } = useAvailability({
    date: selectedDate,
    partySize,
  });

  const availableTimes = availability?.suggestedTimes || [];

  return (
    <div className="space-y-6">
      {/* Party Size */}
      <div>
        <label className="block text-sm font-medium mb-2">Party Size</label>
        <PartySelector value={partySize} onChange={setPartySize} max={20} />
      </div>

      {/* Date Picker */}
      <div>
        <label className="block text-sm font-medium mb-2">Select Date</label>
        <Calendar
          selected={selectedDate}
          onSelect={setSelectedDate}
          minDate={new Date()}
          maxDate={addMonths(new Date(), 2)}
          disabled={[{ dayOfWeek: [0, 6] }]} // Disable weekends if needed
        />
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <label className="block text-sm font-medium mb-2">Select Time</label>
          {isLoading ? (
            <LoadingSpinner />
          ) : availableTimes.length === 0 ? (
            <p className="text-sm text-zinc-400">No available times for this date</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "py-2 px-4 rounded border text-sm",
                    selectedTime === time
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-white text-zinc-700 border-zinc-300 hover:border-emerald-500"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Continue Button */}
      <Button
        onClick={() => onSelect({ date: selectedDate, time: selectedTime, partySize })}
        disabled={!selectedDate || !selectedTime}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );
}
```

---

## State Management

### Zustand Store

**File**: `lib/stores/cafeStore.ts`

**Purpose**: Global state for shopping cart and order flow.

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  modifications?: string;
  image: string;
}

interface CafeStore {
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;

  // Computed
  total: number;
  itemCount: number;

  // Order Flow
  orderType: 'DINE_IN' | 'TAKEOUT';
  setOrderType: (type: 'DINE_IN' | 'TAKEOUT') => void;
  tableId?: string;
  setTableId: (id: string) => void;

  // Reservation (temporary during booking flow)
  reservationData?: ReservationData;
  setReservationData: (data: ReservationData) => void;
  clearReservationData: () => void;
}

export const useCafeStore = create<CafeStore>()(
  persist(
    (set, get) => ({
      cart: [],
      orderType: 'DINE_IN',

      addToCart: (item) => {
        const existing = get().cart.find(i => i.menuItemId === item.menuItemId);
        if (existing) {
          set({
            cart: get().cart.map(i =>
              i.menuItemId === item.menuItemId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          });
        } else {
          set({ cart: [...get().cart, { ...item, quantity: 1 }] });
        }
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity === 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.menuItemId === itemId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (itemId) => {
        set({ cart: get().cart.filter(item => item.menuItemId !== itemId) });
      },

      clearCart: () => set({ cart: [] }),

      get total() {
        return get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      get itemCount() {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      },

      setOrderType: (type) => set({ orderType: type }),
      setTableId: (id) => set({ tableId: id }),
      setReservationData: (data) => set({ reservationData: data }),
      clearReservationData: () => set({ reservationData: undefined }),
    }),
    {
      name: 'cafe-store',
      partialze: (state) => ({
        cart: state.cart,
        orderType: state.orderType,
      }),
    }
  )
);
```

---

## API Client Functions

**File**: `lib/cafe/api.ts`

**Purpose**: Centralized API client functions with error handling.

```typescript
import { z } from 'zod';

// Menu API
export async function getMenuItems(params?: MenuQueryParams) {
  const searchParams = new URLSearchParams(params as any);
  const res = await fetch(`/api/cafe/menu?${searchParams}`);
  if (!res.ok) throw new Error('Failed to fetch menu items');
  return res.json();
}

export async function getMenuItem(slug: string) {
  const res = await fetch(`/api/cafe/menu/${slug}`);
  if (!res.ok) throw new Error('Menu item not found');
  return res.json();
}

// Order API
export async function createOrder(data: CreateOrderInput) {
  const res = await fetch('/api/cafe/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create order');
  }
  return res.json();
}

export async function getOrder(id: string) {
  const res = await fetch(`/api/cafe/orders/${id}`);
  if (!res.ok) throw new Error('Order not found');
  return res.json();
}

// Reservation API
export async function createReservation(data: CreateReservationInput) {
  const res = await fetch('/api/cafe/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create reservation');
  }
  return res.json();
}

export async function checkAvailability(params: AvailabilityParams) {
  const searchParams = new URLSearchParams(params as any);
  const res = await fetch(`/api/cafe/reservations/availability?${searchParams}`);
  if (!res.ok) throw new Error('Failed to check availability');
  return res.json();
}

// Review API
export async function createReview(data: CreateReviewInput) {
  const res = await fetch('/api/cafe/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to submit review');
  return res.json();
}
```

---

## Custom Hooks

### useMenu

```typescript
export function useMenu(params?: MenuQueryParams) {
  return useQuery({
    queryKey: ['menu', params],
    queryFn: () => getMenuItems(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### useOrder

```typescript
export function useOrder(orderId: string) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrder(orderId),
    refetchInterval: 10000, // Poll every 10s for real-time updates
  });
}
```

### useAvailability

```typescript
export function useAvailability(params: AvailabilityParams) {
  return useQuery({
    queryKey: ['availability', params],
    queryFn: () => checkAvailability(params),
    enabled: !!params.date && !!params.partySize,
  });
}
```

---

## Responsive Design Breakpoints

```typescript
// Tailwind breakpoints (matching existing project)
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop

// Component behavior
- MenuCard: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)
- MenuFilters: Hidden sidebar (mobile) → Visible (desktop)
- OrderCart: Full-screen modal (mobile) → Sidebar (desktop)
```

---

## Accessibility Requirements

- **ARIA Labels**: All interactive elements
- **Keyboard Navigation**: Full support (Tab, Enter, Escape)
- **Focus States**: Visible focus rings
- **Screen Readers**: Proper semantic HTML and ARIA roles
- **Color Contrast**: WCAG AA compliance (4.5:1 for text)
- **Touch Targets**: Minimum 44x44px
- **Alt Text**: Descriptive alt text for all images

---

## Performance Optimization

### Image Optimization
```typescript
// Use Next.js Image component with optimization
<Image
  src={item.coverImage}
  alt={item.name}
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL={item.blurDataUrl}
  priority={isAboveFold}
/>
```

### Code Splitting
```typescript
// Lazy load heavy components
const AdminDashboard = lazy(() => import('@/components/cafe/admin/Dashboard'));
const ReviewModal = lazy(() => import('@/components/cafe/reviews/ReviewModal'));
```

### Caching Strategy
- Menu items: 5-minute stale time
- Order status: Poll every 10 seconds
- Categories: 1-hour cache
- User orders: On-demand fetch

---

## Testing Strategy

### Unit Tests
- Component rendering
- State management (Zustand store)
- Utility functions
- Form validation

### Integration Tests
- Order flow (add to cart → checkout → payment)
- Reservation flow (date/time → details → confirmation)
- Menu filtering and search

### E2E Tests (Playwright)
- Complete order placement
- Make reservation
- Browse menu and view details
- Admin order management

---

## Next Steps

1. ✅ **Review component architecture** with design team
2. ⏳ **Create Figma mockups** for key pages
3. ⏳ **Set up component library** (Storybook optional)
4. ⏳ **Implement base UI components** (Button, Card, Input)
5. ⏳ **Build menu browsing** page first
6. ⏳ **Implement order cart** and state management

---

**Document Version**: 1.0
**Last Updated**: October 29, 2025
**Framework**: Next.js 16 + React 19
