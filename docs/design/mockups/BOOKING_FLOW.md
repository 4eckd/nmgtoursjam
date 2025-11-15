# Booking Flow Mockup

Multi-step booking wizard for tour reservations

## Design Overview

**Purpose**: Guide users through booking process with minimal friction
**Steps**: 4-step wizard (Date/Guests → Details → Payment → Confirmation)
**Progress Indicator**: Always visible at top
**Container Max Width**: 800px (centered)

---

## Step 1: Date & Guest Selection

### Desktop Layout

```
╔════════════════════════════════════════════════════════════════════════════╗
║                         BOOKING: Martha Brae Rafting                        ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║  PROGRESS INDICATOR                                                         ║
║  ┌─────────────────────────────────────────────────────────────────────┐   ║
║  │                                                                      │   ║
║  │   ●━━━━━━━━━○━━━━━━━━━○━━━━━━━━━○                                 │   ║
║  │   1         2         3         4                                   │   ║
║  │  Date &   Details   Payment  Confirm                               │   ║
║  │  Guests                                                             │   ║
║  │                                                                      │   ║
║  └─────────────────────────────────────────────────────────────────────┘   ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║  STEP 1: CHOOSE YOUR DATE & PARTY SIZE                                     ║
║  ┌─────────────────────────────────────────────────────────────────────┐   ║
║  │                                                                      │   ║
║  │  SELECT DATE                                                        │   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   ║
║  │                                                                      │   ║
║  │  ┌────────────────────────────────────────────────────────────┐    │   ║
║  │  │             📅 NOVEMBER 2025                               │    │   ║
║  │  │             ◀  November 2025  ▶                            │    │   ║
║  │  │                                                             │    │   ║
║  │  │   Sun   Mon   Tue   Wed   Thu   Fri   Sat                 │    │   ║
║  │  │                                   1     2                  │    │   ║
║  │  │    3     4     5     6     7     8     9                   │    │   ║
║  │  │   10    11    12    13    14   [15]   16                  │    │   ║
║  │  │   17    18    19    20    21    22    23                  │    │   ║
║  │  │   24    25    26    27    28    29    30                  │    │   ║
║  │  │                                                             │    │   ║
║  │  │  ● Available    ○ Limited    ⊗ Unavailable                │    │   ║
║  │  └────────────────────────────────────────────────────────────┘    │   ║
║  │                                                                      │   ║
║  │  Selected: Friday, November 15, 2025                                │   ║
║  │                                                                      │   ║
║  │  SELECT TIME SLOT                                                   │   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   ║
║  │                                                                      │   ║
║  │  ○ 9:00 AM - 12:00 PM  (6 spots left)                              │   ║
║  │  ● 1:00 PM - 4:00 PM   (4 spots left)  [SELECTED]                  │   ║
║  │  ⊗ 4:00 PM - 7:00 PM   (Fully booked)                              │   ║
║  │                                                                      │   ║
║  │  NUMBER OF GUESTS                                                   │   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   ║
║  │                                                                      │   ║
║  │  Adults (13+)                                                       │   ║
║  │  ┌─────────────────────────────────────────┐                       │   ║
║  │  │    [-]    2    [+]                      │                       │   ║
║  │  └─────────────────────────────────────────┘                       │   ║
║  │  $85.00 USD per adult                                              │   ║
║  │                                                                      │   ║
║  │  Children (4-12)                                                    │   ║
║  │  ┌─────────────────────────────────────────┐                       │   ║
║  │  │    [-]    0    [+]                      │                       │   ║
║  │  └─────────────────────────────────────────┘                       │   ║
║  │  $65.00 USD per child                                              │   ║
║  │                                                                      │   ║
║  │  Infants (0-3)  [Free]                                             │   ║
║  │  ┌─────────────────────────────────────────┐                       │   ║
║  │  │    [-]    0    [+]                      │                       │   ║
║  │  └─────────────────────────────────────────┘                       │   ║
║  │                                                                      │   ║
║  └─────────────────────────────────────────────────────────────────────┘   ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║  BOOKING SUMMARY                                                            ║
║  ┌─────────────────────────────────────────────────────────────────────┐   ║
║  │                                                                      │   ║
║  │  Martha Brae Rafting                                                │   ║
║  │  Friday, November 15, 2025 • 1:00 PM - 4:00 PM                     │   ║
║  │  2 Adults × $85.00                                   $170.00        │   ║
║  │  Service Fee                                          $15.00        │   ║
║  │  Taxes                                                $27.75        │   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   ║
║  │  Total                                               $212.75        │   ║
║  │                                                                      │   ║
║  └─────────────────────────────────────────────────────────────────────┘   ║
║                                                                             ║
║  [◀ Back to Tour]                            [Continue to Details →]      ║
║                                                   (emerald button)          ║
╚════════════════════════════════════════════════════════════════════════════╝
```

---

## Step 2: Guest Details

```
╔════════════════════════════════════════════════════════════════════════════╗
║  PROGRESS INDICATOR                                                         ║
║   ●━━━━━━━━━●━━━━━━━━━○━━━━━━━━━○                                        ║
║   1         2         3         4                                          ║
║  Date &   Details   Payment  Confirm                                      ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║  STEP 2: GUEST INFORMATION                                                 ║
║  ┌─────────────────────────────────────────────────────────────────────┐   ║
║  │                                                                      │   ║
║  │  CONTACT PERSON                                                     │   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   ║
║  │                                                                      │   ║
║  │  First Name *                       Last Name *                     │   ║
║  │  ┌──────────────────────────┐      ┌──────────────────────────┐    │   ║
║  │  │  Sarah                   │      │  Thompson                │    │   ║
║  │  └──────────────────────────┘      └──────────────────────────┘    │   ║
║  │                                                                      │   ║
║  │  Email Address *                                                    │   ║
║  │  ┌────────────────────────────────────────────────────────────┐    │   ║
║  │  │  sarah.thompson@email.com                                  │    │   ║
║  │  └────────────────────────────────────────────────────────────┘    │   ║
║  │  We'll send your confirmation here                                 │   ║
║  │                                                                      │   ║
║  │  Phone Number *                     Country/Region *                │   ║
║  │  ┌──────────────────────────┐      ┌──────────────────────────┐    │   ║
║  │  │  +1 (416) 555-0123       │      │  🇨🇦 Canada          ▼ │    │   ║
║  │  └──────────────────────────┘      └──────────────────────────┘    │   ║
║  │                                                                      │   ║
║  │  SPECIAL REQUESTS (Optional)                                        │   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   ║
║  │                                                                      │   ║
║  │  ┌────────────────────────────────────────────────────────────┐    │   ║
║  │  │  Celebrating anniversary - any special touches would be    │    │   ║
║  │  │  appreciated! Also, one person has mild mobility issues... │    │   ║
║  │  │                                                             │    │   ║
║  │  └────────────────────────────────────────────────────────────┘    │   ║
║  │                                                                      │   ║
║  │  PICKUP LOCATION (Optional - $25 additional)                        │   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   ║
║  │                                                                      │   ║
║  │  ☑ I need hotel pickup/drop-off                                    │   ║
║  │                                                                      │   ║
║  │  Hotel Name                                                         │   ║
║  │  ┌────────────────────────────────────────────────────────────┐    │   ║
║  │  │  Hilton Rose Hall Resort                                   │    │   ║
║  │  └────────────────────────────────────────────────────────────┘    │   ║
║  │                                                                      │   ║
║  │  TERMS & CONDITIONS                                                 │   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   ║
║  │                                                                      │   ║
║  │  ☑ I agree to the cancellation policy                              │   ║
║  │  ☑ I have read and accept the terms of service                     │   ║
║  │  ☐ Subscribe to newsletter for exclusive deals                     │   ║
║  │                                                                      │   ║
║  └─────────────────────────────────────────────────────────────────────┘   ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║  BOOKING SUMMARY (Updated)                                                  ║
║  ┌─────────────────────────────────────────────────────────────────────┐   ║
║  │  2 Adults × $85.00                                   $170.00        │   ║
║  │  Hotel Pickup                                         $25.00        │   ║
║  │  Service Fee                                          $15.00        │   ║
║  │  Taxes                                                $31.50        │   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   ║
║  │  Total                                               $241.50        │   ║
║  └─────────────────────────────────────────────────────────────────────┘   ║
║                                                                             ║
║  [◀ Back]                                      [Continue to Payment →]    ║
╚════════════════════════════════════════════════════════════════════════════╝
```

---

## Step 3: Payment

```
╔════════════════════════════════════════════════════════════════════════════╗
║  PROGRESS INDICATOR                                                         ║
║   ●━━━━━━━━━●━━━━━━━━━●━━━━━━━━━○                                        ║
║   1         2         3         4                                          ║
║  Date &   Details   Payment  Confirm                                      ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║  STEP 3: PAYMENT INFORMATION                                               ║
║  ┌─────────────────────────────────────────────────────────────────────┐   ║
║  │                                                                      │   ║
║  │  🔒 Secure Payment powered by Stripe                                │   ║
║  │                                                                      │   ║
║  │  PAYMENT METHOD                                                     │   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   ║
║  │                                                                      │   ║
║  │  ● Credit/Debit Card    ○ PayPal    ○ Apple Pay    ○ Google Pay   │   ║
║  │                                                                      │   ║
║  │  Card Number *                                                      │   ║
║  │  ┌────────────────────────────────────────────────────────────┐    │   ║
║  │  │  💳 1234 5678 9012 3456                                    │    │   ║
║  │  └────────────────────────────────────────────────────────────┘    │   ║
║  │                                                                      │   ║
║  │  Cardholder Name *                                                  │   ║
║  │  ┌────────────────────────────────────────────────────────────┐    │   ║
║  │  │  SARAH THOMPSON                                            │    │   ║
║  │  └────────────────────────────────────────────────────────────┘    │   ║
║  │                                                                      │   ║
║  │  Expiry Date *                      CVV *                           │   ║
║  │  ┌──────────────────────────┐      ┌──────────────────────────┐    │   ║
║  │  │  MM / YY  [11 / 27]      │      │  123              [?]    │    │   ║
║  │  └──────────────────────────┘      └──────────────────────────┘    │   ║
║  │                                     3 digits on back of card        │   ║
║  │                                                                      │   ║
║  │  BILLING ADDRESS                                                    │   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   ║
║  │                                                                      │   ║
║  │  ☑ Same as contact information                                     │   ║
║  │                                                                      │   ║
║  │  PAYMENT PROTECTION                                                 │   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   ║
║  │                                                                      │   ║
║  │  ✓ Your payment is secured with 256-bit SSL encryption             │   ║
║  │  ✓ We never store your full card details                           │   ║
║  │  ✓ Free cancellation up to 24 hours before tour                    │   ║
║  │  ✓ Full refund if tour is cancelled by operator                    │   ║
║  │                                                                      │   ║
║  │  By completing this purchase, you agree to our Terms of Service    │   ║
║  │  and Privacy Policy.                                                │   ║
║  │                                                                      │   ║
║  └─────────────────────────────────────────────────────────────────────┘   ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║  FINAL SUMMARY                                                              ║
║  ┌─────────────────────────────────────────────────────────────────────┐   ║
║  │  Martha Brae Rafting                                                │   ║
║  │  Friday, Nov 15, 2025 • 1:00 PM                                    │   ║
║  │  2 Adults • Hotel Pickup Included                                   │   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   ║
║  │  Total Charge:                                $241.50 USD           │   ║
║  └─────────────────────────────────────────────────────────────────────┘   ║
║                                                                             ║
║  [◀ Back]                              [Complete Booking →]                ║
║                                          (Large emerald button)             ║
╚════════════════════════════════════════════════════════════════════════════╝
```

---

## Step 4: Confirmation

```
╔════════════════════════════════════════════════════════════════════════════╗
║                         ✓ BOOKING CONFIRMED!                               ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║  ┌─────────────────────────────────────────────────────────────────────┐   ║
║  │                                                                      │   ║
║  │                           ✓                                         │   ║
║  │                     (large checkmark)                               │   ║
║  │                                                                      │   ║
║  │              Thank you for your booking, Sarah!                     │   ║
║  │                                                                      │   ║
║  │     Your Martha Brae Rafting adventure is confirmed                │   ║
║  │                                                                      │   ║
║  │                 Booking #: NMG-2025-11-001234                       │   ║
║  │                                                                      │   ║
║  └─────────────────────────────────────────────────────────────────────┘   ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║  BOOKING DETAILS                                                            ║
║  ┌─────────────────────────────────────────────────────────────────────┐   ║
║  │                                                                      │   ║
║  │  📅 Date & Time                                                     │   ║
║  │     Friday, November 15, 2025 at 1:00 PM                           │   ║
║  │                                                                      │   ║
║  │  👥 Guests                                                          │   ║
║  │     2 Adults                                                        │   ║
║  │                                                                      │   ║
║  │  📍 Pickup Location                                                 │   ║
║  │     Hilton Rose Hall Resort                                         │   ║
║  │     Pickup time: 12:15 PM                                           │   ║
║  │                                                                      │   ║
║  │  💰 Total Paid                                                      │   ║
║  │     $241.50 USD                                                     │   ║
║  │                                                                      │   ║
║  │  📧 Confirmation Email Sent To                                      │   ║
║  │     sarah.thompson@email.com                                        │   ║
║  │                                                                      │   ║
║  └─────────────────────────────────────────────────────────────────────┘   ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║  WHAT'S NEXT?                                                               ║
║  ┌─────────────────────────────────────────────────────────────────────┐   ║
║  │                                                                      │   ║
║  │  1️⃣  Check your email for full details and mobile ticket           │   ║
║  │                                                                      │   ║
║  │  2️⃣  We'll send a reminder 24 hours before your tour               │   ║
║  │                                                                      │   ║
║  │  3️⃣  Your guide Marcus will contact you 1 day before               │   ║
║  │                                                                      │   ║
║  │  4️⃣  Be ready for pickup at 12:15 PM on Nov 15                     │   ║
║  │                                                                      │   ║
║  └─────────────────────────────────────────────────────────────────────┘   ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║  ACTIONS                                                                    ║
║  ┌─────────────────────────────────────────────────────────────────────┐   ║
║  │                                                                      │   ║
║  │  [📱 Download Mobile Ticket]    [📧 Email Receipt]                 │   ║
║  │                                                                      │   ║
║  │  [📅 Add to Calendar]            [📤 Share with Friends]            │   ║
║  │                                                                      │   ║
║  └─────────────────────────────────────────────────────────────────────┘   ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║  ┌─────────────────────────────────────────────────────────────────────┐   ║
║  │  💡 Explore more tours while you're here!                           │   ║
║  │                                                                      │   ║
║  │  [Browse All Tours]              [View My Dashboard]                │   ║
║  │                                                                      │   ║
║  └─────────────────────────────────────────────────────────────────────┘   ║
╚════════════════════════════════════════════════════════════════════════════╝
```

---

## Mobile Layout (< 640px)

(Progress bar sticky at top, form fields stack vertically, booking summary becomes expandable accordion at bottom)

---

## Component Specifications

### Progress Indicator
- **Active Step**: Emerald circle, filled
- **Completed**: Emerald circle with checkmark
- **Upcoming**: Gray circle, outline only
- **Connector Line**: Solid when complete, dashed when upcoming

### Date Picker Calendar
- **Size**: Full width on mobile, 400px desktop
- **Available Days**: White background, hover: emerald/10
- **Selected**: Emerald background, white text
- **Unavailable**: Gray text, no hover

### Form Inputs
- **Height**: 48px (accessible touch target)
- **Border**: 1px zinc-300, focus: emerald-400
- **Error State**: Red border, error message below
- **Success State**: Green checkmark icon

### Payment Form (Stripe Elements)
- **Card Input**: Stripe's card element with custom styling
- **Security Icons**: SSL badge, card brand icons
- **Error Display**: Inline below field

### Booking Summary (Sticky)
- **Desktop**: Fixed right sidebar
- **Mobile**: Expandable bottom sheet
- **Update**: Real-time price calculation

## Validation Rules

- **Email**: Valid email format
- **Phone**: Valid international format
- **Card**: Luhn algorithm validation
- **Required Fields**: Show error on blur or submit

## Accessibility

- Form fields properly labeled
- Error messages associated with fields (aria-describedby)
- Progress indicator screen reader friendly
- Success confirmation announced
- Keyboard navigation throughout

## Implementation Notes

1. Auto-save form data to sessionStorage (prevent data loss)
2. Validate each step before allowing "Continue"
3. Use Stripe Elements for PCI compliance
4. Send confirmation email immediately
5. Create booking record before payment
6. Handle payment webhooks for async confirmation
7. Show loading state during payment processing
8. Implement analytics tracking for abandonment points
