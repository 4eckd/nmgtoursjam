# User Flows

Complete user journey diagrams for NMG Tours Jamaica

---

## Flow 1: New Visitor Journey

```
┌─────────────┐
│   ENTRY     │
│  POINT      │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│  LANDING PAGE    │
│  • Hero section  │
│  • Featured tours│
│  • Testimonials  │
└────────┬─────────┘
         │
         ▼
    {What does
     user do?}
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌─────────┐
│Browse  │ │ Search  │
│Tours   │ │ Tours   │
└───┬────┘ └────┬────┘
    │           │
    └─────┬─────┘
          │
          ▼
   ┌──────────────┐
   │ TOUR LISTING │
   │ • Filters    │
   │ • Grid view  │
   │ • Search     │
   └──────┬───────┘
          │
          ▼
     {Select tour
      to view?}
          │
     ┌────┴────┐
     │YES      │NO
     ▼         ▼
┌──────────┐ [Continue
│  TOUR    │  browsing]
│  DETAIL  │      │
│ • Gallery│      │
│ • Info   │ ◀────┘
│ • Reviews│
└─────┬────┘
      │
      ▼
 {Ready to
  book?}
      │
  ┌───┴───┐
  │YES    │NO
  ▼       ▼
{User     [Save to
 logged?} wishlist]
  │           │
┌─┴─┐         │
│YES│NO       │
▼   ▼         │
│  ┌────────┐ │
│  │SIGN UP/│ │
│  │ LOGIN  │ │
│  └───┬────┘ │
│      │      │
└──────┼──────┘
       │
       ▼
┌──────────────┐
│   BOOKING    │
│   WIZARD     │
│ 1. Date      │
│ 2. Details   │
│ 3. Payment   │
│ 4. Confirm   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ CONFIRMATION │
│ • Ticket     │
│ • Email sent │
│ • Next steps │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  DASHBOARD   │
│ View booking │
└──────────────┘
```

---

## Flow 2: Returning User Journey

```
┌─────────────┐
│ LANDING or  │
│ TOURS PAGE  │
└──────┬──────┘
       │
       ▼
  [Logged in?]
       │
   ┌───┴───┐
   │NO     │YES
   ▼       ▼
┌──────┐  │
│LOGIN │  │
└───┬──┘  │
    │     │
    └──┬──┘
       │
       ▼
 {Where to go?}
       │
   ┌───┼────┐
   │   │    │
   ▼   ▼    ▼
┌────────┐ ┌──────────┐ ┌─────────┐
│Browse  │ │Dashboard │ │ Direct  │
│New     │ │View      │ │ Booking │
│Tours   │ │Existing  │ │ (Saved) │
└───┬────┘ └────┬─────┘ └────┬────┘
    │           │             │
    └─────┬─────┴─────────────┘
          │
          ▼
    [Quick booking
     with saved
     profile info]
          │
          ▼
   ┌──────────────┐
   │   BOOKING    │
   │   WIZARD     │
   │ (Pre-filled) │
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │ CONFIRMATION │
   └──────────────┘
```

---

## Flow 3: Detailed Booking Flow

```
┌───────────────┐
│  TOUR DETAIL  │
│  PAGE         │
└───────┬───────┘
        │
        ▼
 [Click "Book Now"]
        │
        ▼
 ┌──────────────────┐
 │ STEP 1:          │
 │ Date & Guests    │
 ├──────────────────┤
 │ • Calendar       │
 │ • Time slots     │
 │ • Adult count    │
 │ • Child count    │
 │ • Infant count   │
 └────────┬─────────┘
          │
     {Valid date
      selected?}
          │
      ┌───┴───┐
      │NO     │YES
      │       ▼
      │  {Availability
      │   check}
      │       │
      │   ┌───┴───┐
      │   │NO     │YES
      │   │       ▼
      │   │  [Calculate
      │   │   price]
      │   │       │
      │   │       ▼
      │   │  ┌────────────┐
      │   ▼  │ STEP 2:    │
      │[Error│ Guest Info │
      │ msg] ├────────────┤
      │   │  │• Name      │
      │   │  │• Email     │
      │   │  │• Phone     │
      │   │  │• Country   │
      │   │  │• Requests  │
      │   │  │• Pickup?   │
      │   │  └─────┬──────┘
      │   │        │
      └───┼────────┘
          │
     {Form valid?}
          │
      ┌───┴───┐
      │NO     │YES
      │       ▼
      │  {User logged in?}
      │       │
      │   ┌───┴───┐
      │   │NO     │YES
      │   ▼       ▼
      │┌──────┐   │
      ││Create│   │
      ││acct? │   │
      │└──┬───┘   │
      │   │YES/NO │
      │   └───┬───┘
      │       │
      │       ▼
      │  [Save form
      │   to session]
      │       │
      │       ▼
      │  ┌────────────┐
      ▼  │ STEP 3:    │
   [Show │ Payment    │
    errors├──────────  ┤
      ] │ • Card info │
        │ • Billing   │
        │ • Review    │
        └─────┬───────┘
              │
         {Validate
          payment?}
              │
          ┌───┴───┐
          │NO     │YES
          │       ▼
          │  [Process
          │   payment]
          │       │
          │   ┌───┴────┐
          │   │SUCCESS │FAIL
          │   ▼        ▼
          │┌────────┐ ┌──────┐
          ││STEP 4: │ │ Error│
          ││Confirm │ │ Page │
          │├────────┤ │Retry │
          ││• Ticket│ └──┬───┘
          ││• Email │    │
          ││• Next  │    │
          ││  steps │ ◀──┘
          │└───┬────┘
          │    │
          └────┘
               │
               ▼
        [Create booking
         in database]
               │
               ▼
        [Send confirmation
         email]
               │
               ▼
        [Send SMS reminder
         24h before]
               │
               ▼
           [Done]
```

---

## Flow 4: Review Submission Flow

```
┌───────────────┐
│  Tour         │
│  Completed    │
└───────┬───────┘
        │
        ▼
 [24 hours after
  tour ends]
        │
        ▼
┌───────────────┐
│ Email:        │
│ "How was      │
│  your tour?"  │
└───────┬───────┘
        │
   {User clicks
    review link}
        │
        ▼
┌───────────────┐
│ LOGIN/AUTH    │
│ (if needed)   │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ REVIEW FORM   │
├───────────────┤
│ • Star rating │
│ • Title       │
│ • Description │
│ • Photos (opt)│
│ • Recommend?  │
└───────┬───────┘
        │
   {Submit?}
        │
    ┌───┴───┐
    │NO     │YES
    │       ▼
    │  {Validate
    │   content}
    │       │
    │   ┌───┴───┐
    │   │FAIL   │PASS
    │   ▼       ▼
    │[Show   [Save review
    │errors]  to database]
    │   │        │
    │   │        ▼
    │   │   [Notify guide
    │   │    of review]
    │   │        │
    │   │        ▼
    │   │   [Thank you
    │   │    message]
    │   │        │
    │   │        ▼
    │   │   [Redirect to
    │   │    dashboard]
    │   │        │
    └───┼────────┘
        │
        ▼
   [Discard
    draft?]
        │
    ┌───┴───┐
    │YES    │NO
    │       ▼
    │  [Save draft
    │   to session]
    │       │
    └───┬───┘
        │
        ▼
      [Exit]
```

---

## Flow 5: Tour Search & Discovery

```
┌───────────────┐
│  LANDING or   │
│  TOURS PAGE   │
└───────┬───────┘
        │
   {How to search?}
        │
    ┌───┼───┐
    │   │   │
    ▼   ▼   ▼
┌──────┐ ┌──────┐ ┌──────┐
│Search│ │Filter│ │Browse│
│ Bar  │ │Panel │ │Grid  │
└───┬──┘ └───┬──┘ └───┬──┘
    │        │        │
    └────┬───┴────────┘
         │
         ▼
    [Apply filters/
     search query]
         │
         ▼
    [API request
     with params]
         │
         ▼
    {Results found?}
         │
     ┌───┴───┐
     │NO     │YES
     │       ▼
     │  [Display tour
     │   grid with
     │   results]
     │       │
     │       ▼
     │  {User action?}
     │       │
     │   ┌───┼───┐
     │   │   │   │
     │   ▼   ▼   ▼
     │┌────┐┌────┐┌────┐
     ││View││Save││Refine
     ││Tour││Tour││Search
     │└─┬──┘└──┬─┘└──┬─┘
     │  │      │     │
     │  │      │     │
     │  │      │     └──┐
     │  │      │        │
     ▼  ▼      ▼        │
 ┌────────┐┌──────────┐│
 │"No     ││Tour      ││
 │results"││Detail    ││
 │        ││Page      ││
 │Suggest:││          ││
 │• Clear ││          ││
 │  filters││        ││
 │• Browse││          ││
 │  all   ││          ││
 │  tours ││          ││
 └────────┘└──────────┘│
                       │
            ◀──────────┘
```

---

## Flow 6: Account Management

```
┌───────────────┐
│  USER         │
│  DASHBOARD    │
└───────┬───────┘
        │
   {What action?}
        │
   ┌────┼─────┐
   │    │     │
   ▼    ▼     ▼
┌───────┐┌──────┐┌─────────┐
│View   ││Modify││Manage   │
│Booking││Booking Account  │
└───┬───┘└───┬──┘└────┬────┘
    │        │        │
    ▼        ▼        ▼
┌────────┐┌───────┐┌─────────┐
│• Details││• Date ││• Profile│
│• Ticket ││• Guests│• Password
│• Guide  ││• Add-ons│• Payment
│         ││       ││• Notif  │
│[Download││{Within││         │
│ ticket] ││cancel ││[Update] │
│         ││period?}│         │
│[Get     ││  │YES││         │
│directions││ │NO │└─────────┘
│         ││  ▼   ▼│
│[Contact ││[Allow][Block]
│ guide]  ││cancel││
└─────────┘│      ││
           ▼      ▼│
      [Process] [Show
       refund]  error]
           │      │
           ▼      │
      [Update     │
       booking]   │
           │      │
           ▼      │
      [Send       │
       email]     │
           │      │
           └──┬───┘
              │
              ▼
         [Redirect to
          dashboard]
```

---

## Flow 7: Guest Checkout (No Account)

```
┌───────────────┐
│  TOUR DETAIL  │
└───────┬───────┘
        │
        ▼
 [Click "Book Now"]
        │
        ▼
 {User logged in?}
        │
    ┌───┴───┐
    │YES    │NO
    │       ▼
    │  ┌────────────┐
    │  │ "Continue  │
    │  │  as guest  │
    │  │  or login?"│
    │  └─────┬──────┘
    │        │
    │    ┌───┴───┐
    │    │Guest  │Login
    │    │       ▼
    │    │   [Login flow]
    │    │       │
    └────┼───────┘
         │
         ▼
  ┌──────────────┐
  │ GUEST        │
  │ BOOKING      │
  ├──────────────┤
  │ • Enter email│
  │ • Phone      │
  │ • Name       │
  │ • No account │
  │   created    │
  └──────┬───────┘
         │
         ▼
  [Standard booking
   flow continues]
         │
         ▼
  ┌──────────────┐
  │ Post-booking │
  │ "Create      │
  │  account?"   │
  └──────┬───────┘
         │
     {Create?}
         │
     ┌───┴───┐
     │NO     │YES
     │       ▼
     │  [Set password,
     │   create account
     │   with booking]
     │       │
     └───┬───┘
         │
         ▼
    [Confirmation
     page]
```

---

## Flow 8: Cancellation & Refund

```
┌───────────────┐
│  DASHBOARD    │
│  My Bookings  │
└───────┬───────┘
        │
        ▼
 [Click "Cancel
  Booking"]
        │
        ▼
 ┌──────────────────┐
 │ WARNING MODAL    │
 ├──────────────────┤
 │ "Are you sure?"  │
 │                  │
 │ • Refund amount  │
 │ • Policy details │
 │ • Deadline shown │
 └────────┬─────────┘
          │
     {Confirm?}
          │
      ┌───┴───┐
      │NO     │YES
      │       ▼
      │  {Within cancel
      │   period?}
      │       │
      │   ┌───┴───┐
      │   │NO     │YES
      │   ▼       ▼
      │[Show    [Process
      │ error:  cancellation]
      │ "Too        │
      │  late"]     ▼
      │   │    [Initiate
      │   │     refund via
      │   │     Stripe]
      │   │         │
      │   │         ▼
      │   │    [Update booking
      │   │     status]
      │   │         │
      │   │         ▼
      │   │    [Notify guide]
      │   │         │
      │   │         ▼
      │   │    [Send confirmation
      │   │     email to user]
      │   │         │
      │   │         ▼
      │   │    [Show success:
      │   │     "Refund in 5-7
      │   │      business days"]
      │   │         │
      └───┼─────────┘
          │
          ▼
     [Return to
      dashboard]
```

---

## Key Decision Points

Throughout these flows, key decision points include:

1. **Authentication Gates**
   - Booking requires login (or guest checkout)
   - Viewing bookings requires login
   - Saving tours requires login

2. **Validation Checkpoints**
   - Date availability
   - Form validation
   - Payment verification
   - Cancellation policy enforcement

3. **Communication Triggers**
   - Booking confirmation email
   - 24-hour reminder SMS/email
   - Review request email (post-tour)
   - Cancellation confirmation
   - Guide notifications

4. **Error Handling**
   - Invalid form input → Show inline errors
   - Payment failure → Retry with clear message
   - No availability → Suggest alternative dates
   - API failure → Graceful degradation

## Analytics Tracking Points

Each flow should track:
- Entry points
- Exit points
- Drop-off rates
- Time spent on each step
- Completion rates
- Error frequencies

This data will inform UX improvements and conversion optimization.
