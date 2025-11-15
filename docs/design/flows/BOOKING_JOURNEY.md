# Booking Journey

Detailed booking process flow for NMG Tours Jamaica

## Complete Booking Journey Map

```
┌──────────────────────────────────────────────────────────────────────┐
│                         BOOKING JOURNEY                               │
│                    From Discovery to Confirmation                    │
└──────────────────────────────────────────────────────────────────────┘

STAGE 1: DISCOVERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Entry Point: Landing Page / Tour Listing
Goal: Find the perfect tour

User Actions:
• Browse featured tours
• Search by location/activity
• Filter by price/duration/difficulty
• Read tour descriptions
• View photos and reviews

System Actions:
• Display personalized recommendations
• Track search queries
• Show real-time availability
• Highlight popular tours

Decision Point: {Has user found a tour of interest?}
├─ NO → Continue browsing, refine search
└─ YES → Proceed to STAGE 2


STAGE 2: CONSIDERATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Page: Tour Detail Page
Goal: Evaluate if tour meets needs

User Actions:
• View image gallery
• Read full description and itinerary
• Check what's included/excluded
• Read customer reviews
• View guide profile
• Check meeting point location
• Compare with similar tours

System Actions:
• Display comprehensive tour information
• Show review ratings and distribution
• Highlight unique selling points
• Suggest alternative dates if selected date full
• Track time on page for analytics

Decision Point: {Ready to book this tour?}
├─ NO → Save to wishlist for later OR return to browsing
└─ YES → Proceed to STAGE 3


STAGE 3: PLANNING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Page: Booking Widget / Booking Step 1
Goal: Select date and party size

User Actions:
• Open calendar
• Select preferred date
• Choose time slot (if multiple available)
• Specify number of adults
• Specify number of children
• Specify number of infants
• Review calculated price

System Actions:
• Show availability calendar
• Highlight available dates (green), limited (yellow), full (gray)
• Validate minimum/maximum group size
• Calculate real-time pricing
• Apply any active promotions/discounts
• Show price breakdown

Decision Point: {Date and guests selected?}
├─ NO → Adjust selections until satisfied
└─ YES → {Is user logged in?}
    ├─ NO → Redirect to login/signup OR offer guest checkout
    └─ YES → Proceed to STAGE 4


STAGE 4: INFORMATION GATHERING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Page: Booking Step 2 - Guest Information
Goal: Collect necessary booking details

User Actions:
• Enter/confirm contact name
• Enter/confirm email address
• Enter/confirm phone number
• Select country/region
• Add special requests (optional)
• Select pickup location (if applicable)
• Review terms and conditions
• Accept cancellation policy

System Actions:
• Pre-fill information if user logged in
• Validate email format
• Validate phone number format
• Show pickup fee if selected
• Update total price with add-ons
• Auto-save form data to prevent loss

Decision Point: {All required information provided?}
├─ NO → Show validation errors, highlight missing fields
└─ YES → Proceed to STAGE 5


STAGE 5: PAYMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Page: Booking Step 3 - Payment
Goal: Securely process payment

User Actions:
• Select payment method (card/PayPal/etc)
• Enter card details
• Enter billing address
• Review final price
• Confirm booking

System Actions:
• Load Stripe payment form
• Encrypt card information
• Validate card details
• Calculate final total with taxes
• Create pending booking record
• Process payment via Stripe API
• Handle 3D Secure authentication if required

Decision Point: {Payment successful?}
├─ NO → Show error message, allow retry
│       • Insufficient funds → Suggest alternative payment
│       • Card declined → Check details, try different card
│       • Technical error → Contact support
└─ YES → Proceed to STAGE 6


STAGE 6: CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Page: Booking Step 4 - Confirmation
Goal: Provide booking confirmation and next steps

User Actions:
• View booking confirmation
• Download mobile ticket
• Add to calendar
• Share with travel companions
• Review what to bring

System Actions:
• Update booking status to "Confirmed"
• Generate unique booking number
• Send confirmation email immediately
• Send SMS confirmation (if enabled)
• Create mobile ticket QR code
• Schedule reminder emails:
  - 7 days before: "Your tour is coming up"
  - 24 hours before: "Your tour is tomorrow"
  - 2 hours after: "How was your tour?" (review request)
• Notify tour guide of new booking
• Update tour availability count

Post-Booking Actions:
• Redirect to user dashboard
• Show "Book another tour" suggestions
• Offer to create account (if guest checkout)


STAGE 7: PRE-TOUR REMINDERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Timeline: Days leading up to tour
Goal: Keep customer informed and excited

System Actions:
• T-7 days: Email with packing checklist
• T-3 days: SMS reminder with guide contact
• T-24 hours: Final reminder with weather forecast
• T-2 hours: "Heading out soon?" notification

User Actions:
• View booking details in dashboard
• Download ticket to phone
• Contact guide if questions
• Modify booking if needed
• Cancel if plans change


STAGE 8: TOUR DAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current: Day of tour
Goal: Smooth check-in and great experience

User Actions:
• Show mobile ticket/QR code at meeting point
• Enjoy the tour
• Take photos
• Interact with guide

System Actions:
• Guide scans ticket to confirm attendance
• Update booking status to "In Progress"
• Collect tour feedback (optional mid-tour)


STAGE 9: POST-TOUR REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Timeline: 2-24 hours after tour completion
Goal: Collect feedback and encourage reviews

System Actions:
• T+2 hours: "How was your tour?" email
• Update booking status to "Completed"
• Request star rating and written review
• Offer photo upload
• Suggest related tours

User Actions:
• Rate tour (1-5 stars)
• Write review
• Upload photos
• Share on social media
• Book another tour


STAGE 10: LOYALTY & RETENTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Timeline: Ongoing
Goal: Turn one-time customers into repeat visitors

System Actions:
• Send "We miss you" email after 30 days
• Offer loyalty discounts on 2nd+ booking
• Seasonal tour recommendations
• Birthday/anniversary special offers
• Newsletter with new tours and Jamaica tips

User Actions:
• Browse new tours
• Use loyalty discount
• Refer friends
• Follow on social media
• Subscribe to newsletter
```

---

## Key Touchpoints

### Email Communications

1. **Booking Confirmation** (Immediate)
   - Subject: "Your Jamaica Adventure is Confirmed! 🎉"
   - Booking details
   - Mobile ticket link
   - What to bring
   - Contact information

2. **7-Day Reminder** (T-7 days)
   - Subject: "Your Martha Brae Tour is Next Week!"
   - Packing checklist
   - Weather forecast
   - Local tips

3. **24-Hour Reminder** (T-24 hours)
   - Subject: "Tomorrow's the Day! See You at Martha Brae 🚣"
   - Final details
   - Guide introduction
   - Emergency contact

4. **Review Request** (T+2 hours)
   - Subject: "How Was Your Tour with Marcus?"
   - Star rating prompt
   - Review form link
   - Photo upload option

5. **Follow-up & Upsell** (T+7 days)
   - Subject: "Miss Jamaica Already? Here Are More Adventures"
   - Related tour recommendations
   - Loyalty discount code
   - Social media links

### SMS Communications

1. **Booking Confirmation** (Immediate)
   - "Confirmed! Martha Brae Rafting - Nov 15 @ 1PM. Check email for details."

2. **Pre-Tour Reminder** (T-24 hours)
   - "Reminder: Your tour is tomorrow at 1PM! Your guide Marcus will meet you at the pickup point."

3. **Day-of Reminder** (T-2 hours)
   - "Your tour starts in 2 hours! Download your ticket: [link]"

---

## Abandonment Recovery

### Cart Abandonment (Did not complete booking)

If user leaves during booking flow:

1. **Save Progress**: Store form data in session
2. **Email Reminder** (T+1 hour): "Complete your booking for Martha Brae"
3. **Incentive** (T+24 hours): "Still thinking? Here's 10% off if you book today"
4. **Final Reminder** (T+7 days): "We saved your booking! Dates filling up fast"

### Payment Failure Recovery

If payment fails:

1. **Immediate retry** option on screen
2. **Email with retry link** (T+10 minutes)
3. **Alternative payment methods** suggested
4. **Hold reservation** for 30 minutes

---

## Conversion Optimization Points

### Reduce Friction

- **Guest checkout** option (no forced account creation)
- **Saved payment methods** for returning users
- **Auto-fill** from user profile
- **Mobile wallet** support (Apple Pay, Google Pay)
- **Multiple currencies** (USD, CAD, GBP, EUR)

### Build Trust

- **Secure badge** (SSL, Stripe verified)
- **Money-back guarantee** prominently displayed
- **Free cancellation** highlighted
- **Recent bookings** social proof ("5 people booked this today")
- **Verified reviews** with photos

### Reduce Uncertainty

- **Live chat** support during booking
- **FAQ** accordion on booking page
- **Real-time availability** updates
- **Clear pricing** (no hidden fees)
- **Refund policy** clearly stated

---

## Analytics Tracking

Track these metrics at each stage:

| Stage | Key Metric | Target |
|-------|------------|--------|
| Discovery | Tour detail views | 40% of listing page visits |
| Consideration | Time on tour page | >2 minutes |
| Planning | Booking initiation rate | 15% of tour views |
| Information | Form completion rate | 80% of starts |
| Payment | Payment success rate | 95% of attempts |
| Confirmation | Email open rate | 80% |
| Post-tour | Review rate | 30% of completions |

---

**Last Updated**: 2025-11-15
**Version**: 1.0
