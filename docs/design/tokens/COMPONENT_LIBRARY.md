# Component Library

Comprehensive inventory of UI components for NMG Tours Jamaica

## Component Status Legend

- ✅ **Implemented** - Component exists and is functional
- 🚧 **In Progress** - Currently being built
- 📋 **Planned** - Designed but not yet implemented
- ❌ **Not Started** - Needs to be built

---

## Layout Components

### Navigation

| Component | Status | Location | Description |
|-----------|--------|----------|-------------|
| Navigation.tsx | ✅ | `app/components/Navigation.tsx` | Global navigation bar with menu |
| Footer.tsx | ✅ | `app/components/Footer.tsx` | Global footer with links |
| MobileMenu.tsx | 📋 | - | Hamburger menu for mobile |
| Breadcrumbs.tsx | 📋 | - | Navigation breadcrumbs |

**Navigation Component**:
```tsx
// Current implementation exists
// Features: Logo, menu links, mobile hamburger
// Responsive: Yes
// Accessibility: Keyboard navigation
```

### Container

| Component | Status | Description |
|-----------|--------|-------------|
| Container | 📋 | Max-width container (1400px) with responsive padding |
| Section | 📋 | Full-width section with consistent spacing |
| Grid | 📋 | Responsive grid layout (1/2/3 columns) |

---

## Marketing Components

### Homepage

| Component | Status | Location | Description |
|-----------|--------|----------|-------------|
| Hero.tsx | 📋 | `app/components/marketing/Hero.tsx` | Hero section with video background |
| FeaturedTours.tsx | 📋 | `app/components/marketing/FeaturedTours.tsx` | Showcase tour grid |
| Testimonials.tsx | 📋 | `app/components/marketing/Testimonials.tsx` | Customer review carousel |
| Newsletter.tsx | 📋 | `app/components/marketing/Newsletter.tsx` | Email signup form |
| Stats.tsx | 📋 | `app/components/marketing/Stats.tsx` | Key metrics display |
| WhyChooseUs.tsx | 📋 | `app/components/marketing/WhyChooseUs.tsx` | Features grid |

**Hero Component Spec**:
```tsx
interface HeroProps {
  title: string
  subtitle: string
  backgroundVideo?: string
  backgroundImage: string
  ctaPrimary: { text: string; href: string }
  ctaSecondary?: { text: string; href: string }
  showSearch?: boolean
}

// Features:
// - Video background with fallback
// - Gradient overlay
// - Search bar integration
// - Responsive text sizing
```

---

## Tour Components

### Tour Display

| Component | Status | Location | Description |
|-----------|--------|----------|-------------|
| TourCard.tsx | 📋 | `app/components/tours/TourCard.tsx` | Tour preview card |
| TourGrid.tsx | 📋 | `app/components/tours/TourGrid.tsx` | Grid layout wrapper |
| TourList.tsx | 📋 | `app/components/tours/TourList.tsx` | List view wrapper |
| TourFilters.tsx | 📋 | `app/components/tours/TourFilters.tsx` | Filter sidebar |
| TourSearch.tsx | 📋 | `app/components/tours/TourSearch.tsx` | Search with autocomplete |
| TourGallery.tsx | 📋 | `app/components/tours/TourGallery.tsx` | Image gallery + lightbox |
| RelatedTours.tsx | 📋 | `app/components/tours/RelatedTours.tsx` | Similar tours carousel |

**TourCard Component Spec**:
```tsx
interface TourCardProps {
  tour: {
    id: string
    slug: string
    title: string
    description: string
    price: number
    duration: number
    rating: number
    reviewCount: number
    coverImage: string
    location: string
    difficulty?: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme'
  }
  variant?: 'grid' | 'list'
  showSaveButton?: boolean
  onSave?: () => void
}

// Features:
// - Image with lazy loading
// - Star rating display
// - Price formatting
// - Hover animations
// - Save to wishlist button
```

### Tour Details

| Component | Status | Location | Description |
|-----------|--------|----------|-------------|
| BookingWidget.tsx | 📋 | `app/components/tours/BookingWidget.tsx` | Sticky booking form |
| TourTabs.tsx | 📋 | `app/components/tours/TourTabs.tsx` | Tab navigation |
| TourHighlights.tsx | 📋 | `app/components/tours/TourHighlights.tsx` | What's included/excluded |
| TourReviews.tsx | 📋 | `app/components/tours/TourReviews.tsx` | Reviews section |
| TourFAQ.tsx | 📋 | `app/components/tours/TourFAQ.tsx` | FAQ accordion |
| GuideCard.tsx | 📋 | `app/components/tours/GuideCard.tsx` | Guide profile display |

**BookingWidget Component Spec**:
```tsx
interface BookingWidgetProps {
  tourId: string
  basePrice: number
  availability: Date[]
  maxGuests: number
  sticky?: boolean
  onBook: (data: BookingData) => void
}

// Features:
// - Date picker with availability
// - Guest selector
// - Price calculation
// - Sticky positioning on scroll
// - Mobile bottom sheet on small screens
```

---

## Booking Components

### Booking Flow

| Component | Status | Location | Description |
|-----------|--------|----------|-------------|
| BookingStepper.tsx | 📋 | `app/components/booking/BookingStepper.tsx` | Progress indicator |
| DatePicker.tsx | 📋 | `app/components/booking/DatePicker.tsx` | Calendar date selection |
| GuestSelector.tsx | 📋 | `app/components/booking/GuestSelector.tsx` | Guest count input |
| GuestInfoForm.tsx | 📋 | `app/components/booking/GuestInfoForm.tsx` | Guest details form |
| PaymentForm.tsx | 📋 | `app/components/booking/PaymentForm.tsx` | Stripe payment integration |
| BookingSummary.tsx | 📋 | `app/components/booking/BookingSummary.tsx` | Order summary |
| BookingConfirmation.tsx | 📋 | `app/components/booking/BookingConfirmation.tsx` | Success screen |

**BookingStepper Component Spec**:
```tsx
interface BookingStepperProps {
  currentStep: 1 | 2 | 3 | 4
  steps: Array<{
    number: number
    label: string
    shortLabel?: string
  }>
  onStepClick?: (step: number) => void
  allowNavigateBack?: boolean
}

// Features:
// - Visual progress indicator
// - Active/completed/upcoming states
// - Click to navigate (optional)
// - Responsive labels
```

---

## Dashboard Components

### User Dashboard

| Component | Status | Location | Description |
|-----------|--------|----------|-------------|
| DashboardLayout.tsx | 📋 | `app/components/dashboard/DashboardLayout.tsx` | Dashboard shell with sidebar |
| DashboardSidebar.tsx | 📋 | `app/components/dashboard/DashboardSidebar.tsx` | Navigation sidebar |
| BookingCard.tsx | 📋 | `app/components/dashboard/BookingCard.tsx` | Booking summary card |
| SavedToursGrid.tsx | 📋 | `app/components/dashboard/SavedToursGrid.tsx` | Wishlist display |
| ReviewCard.tsx | 📋 | `app/components/dashboard/ReviewCard.tsx` | User review display |
| ReviewForm.tsx | 📋 | `app/components/dashboard/ReviewForm.tsx` | Write review form |
| ProfileSettings.tsx | 📋 | `app/components/dashboard/ProfileSettings.tsx` | User settings form |

**BookingCard Component Spec**:
```tsx
interface BookingCardProps {
  booking: {
    id: string
    tourTitle: string
    date: Date
    guests: number
    totalPrice: number
    status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
    bookingNumber: string
    tourImage: string
  }
  variant?: 'upcoming' | 'past'
  actions?: Array<'view' | 'modify' | 'cancel' | 'review' | 'rebook'>
}

// Features:
// - Status badge with color coding
// - Action buttons based on status
// - Countdown timer for upcoming tours
// - Review prompt for past tours
```

---

## UI Components (Reusable)

### Buttons

| Component | Status | Location | Description |
|-----------|--------|----------|-------------|
| Button.tsx | 📋 | `app/components/ui/Button.tsx` | Primary, secondary, ghost variants |
| IconButton.tsx | 📋 | `app/components/ui/IconButton.tsx` | Icon-only button |
| ButtonGroup.tsx | 📋 | `app/components/ui/ButtonGroup.tsx` | Button group container |

**Button Component Spec**:
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
}

// Variants:
// - primary: bg-emerald-400 hover:bg-emerald-300
// - secondary: border-emerald-400 text-emerald-400
// - ghost: transparent with border
// - danger: bg-red-500 hover:bg-red-400
```

### Form Inputs

| Component | Status | Location | Description |
|-----------|--------|----------|-------------|
| Input.tsx | 📋 | `app/components/ui/Input.tsx` | Text input with validation |
| Textarea.tsx | 📋 | `app/components/ui/Textarea.tsx` | Multi-line text input |
| Select.tsx | 📋 | `app/components/ui/Select.tsx` | Dropdown select |
| Checkbox.tsx | 📋 | `app/components/ui/Checkbox.tsx` | Checkbox input |
| Radio.tsx | 📋 | `app/components/ui/Radio.tsx` | Radio button |
| Toggle.tsx | 📋 | `app/components/ui/Toggle.tsx` | Toggle switch |
| Slider.tsx | 📋 | `app/components/ui/Slider.tsx` | Range slider |

**Input Component Spec**:
```tsx
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
  required?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

// Features:
// - Floating label (optional)
// - Error state with message
// - Icon support
// - Accessible (ARIA labels)
```

### Feedback

| Component | Status | Location | Description |
|-----------|--------|----------|-------------|
| Alert.tsx | 📋 | `app/components/ui/Alert.tsx` | Alert messages |
| Toast.tsx | 📋 | `app/components/ui/Toast.tsx` | Toast notifications |
| Modal.tsx | 📋 | `app/components/ui/Modal.tsx` | Modal dialog |
| Drawer.tsx | 📋 | `app/components/ui/Drawer.tsx` | Side drawer |
| Tooltip.tsx | 📋 | `app/components/ui/Tooltip.tsx` | Tooltip overlay |
| Skeleton.tsx | 📋 | `app/components/ui/Skeleton.tsx` | Loading skeleton |
| Spinner.tsx | 📋 | `app/components/ui/Spinner.tsx` | Loading spinner |

**Modal Component Spec**:
```tsx
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  children: React.ReactNode
}

// Features:
// - Backdrop overlay
// - Smooth open/close animation
// - Trap focus inside modal
// - Escape key to close
// - Scroll lock on body
```

### Display

| Component | Status | Location | Description |
|-----------|--------|----------|-------------|
| Card.tsx | 📋 | `app/components/ui/Card.tsx` | Content card container |
| Badge.tsx | 📋 | `app/components/ui/Badge.tsx` | Status badges |
| Tag.tsx | 📋 | `app/components/ui/Tag.tsx` | Removable tags |
| Avatar.tsx | 📋 | `app/components/ui/Avatar.tsx` | User avatar |
| Rating.tsx | 📋 | `app/components/ui/Rating.tsx` | Star rating display |
| Tabs.tsx | 📋 | `app/components/ui/Tabs.tsx` | Tab navigation |
| Accordion.tsx | 📋 | `app/components/ui/Accordion.tsx` | Accordion/collapse |
| Pagination.tsx | 📋 | `app/components/ui/Pagination.tsx` | Page navigation |

**Card Component Spec**:
```tsx
interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  clickable?: boolean
  onClick?: () => void
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}

// Variants:
// - default: bg-white shadow-md
// - outlined: border-zinc-200 border-2
// - elevated: shadow-lg
```

**Rating Component Spec**:
```tsx
interface RatingProps {
  value: number // 0-5
  maxRating?: number // default 5
  size?: 'sm' | 'md' | 'lg'
  readonly?: boolean
  onChange?: (rating: number) => void
  showValue?: boolean
  color?: string // default emerald-400
}

// Features:
// - Half-star support
// - Interactive or readonly
// - Keyboard accessible
// - Customizable color
```

---

## Specialized Components

### Image Components

| Component | Status | Location | Description |
|-----------|--------|----------|-------------|
| ImageGallery.tsx | 📋 | `app/components/ui/ImageGallery.tsx` | Gallery with lightbox |
| ImageCarousel.tsx | 📋 | `app/components/ui/ImageCarousel.tsx` | Image slider |
| OptimizedImage.tsx | 📋 | `app/components/ui/OptimizedImage.tsx` | Next.js Image wrapper |

### Search & Filter

| Component | Status | Location | Description |
|-----------|--------|----------|-------------|
| SearchBar.tsx | 📋 | `app/components/ui/SearchBar.tsx` | Search input with autocomplete |
| FilterPanel.tsx | 📋 | `app/components/ui/FilterPanel.tsx` | Reusable filter sidebar |
| SortDropdown.tsx | 📋 | `app/components/ui/SortDropdown.tsx` | Sort options dropdown |

### Data Display

| Component | Status | Location | Description |
|-----------|--------|----------|-------------|
| EmptyState.tsx | 📋 | `app/components/ui/EmptyState.tsx` | No data placeholder |
| ErrorState.tsx | 📋 | `app/components/ui/ErrorState.tsx` | Error message display |
| LoadingState.tsx | 📋 | `app/components/ui/LoadingState.tsx` | Loading placeholder |

---

## Development Priority

### Phase 1: Foundation (Week 1-2)
1. ✅ Navigation (done)
2. ✅ Footer (done)
3. 📋 Button
4. 📋 Input
5. 📋 Card
6. 📋 Modal

### Phase 2: Marketing (Week 3-4)
1. 📋 Hero
2. 📋 FeaturedTours
3. 📋 TourCard
4. 📋 TourGrid
5. 📋 Testimonials
6. 📋 Newsletter

### Phase 3: Tours (Week 5-6)
1. 📋 TourFilters
2. 📋 TourSearch
3. 📋 TourGallery
4. 📋 BookingWidget
5. 📋 TourReviews
6. 📋 TourFAQ

### Phase 4: Booking (Week 7-8)
1. 📋 BookingStepper
2. 📋 DatePicker
3. 📋 GuestSelector
4. 📋 PaymentForm
5. 📋 BookingSummary
6. 📋 BookingConfirmation

### Phase 5: Dashboard (Week 9-10)
1. 📋 DashboardLayout
2. 📋 BookingCard
3. 📋 SavedToursGrid
4. 📋 ReviewForm
5. 📋 ProfileSettings

---

## Testing Requirements

Each component should include:

- ✓ **Unit tests** (Jest + React Testing Library)
- ✓ **Accessibility tests** (a11y compliance)
- ✓ **Responsive tests** (mobile, tablet, desktop)
- ✓ **Storybook stories** (component documentation)

---

## Documentation Standards

Each component file should include:

```tsx
/**
 * ComponentName
 *
 * Description of what the component does
 *
 * @example
 * ```tsx
 * <ComponentName
 *   prop1="value"
 *   prop2={123}
 * />
 * ```
 */
```

---

**Last Updated**: 2025-11-15
**Total Components**: 80+
**Implemented**: 2
**In Progress**: 0
**Planned**: 78+
