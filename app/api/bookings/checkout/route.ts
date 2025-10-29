/**
 * Stripe Checkout Session API
 * Creates a Stripe Checkout session for tour bookings
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { formatAmountForStripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { tourId, tourDate, guests, guestName, guestEmail, guestPhone, specialRequests } = body

    // Validate required fields
    if (!tourId || !tourDate || !guests || !guestName || !guestEmail || !guestPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get tour details
    const tour = await prisma.tour.findUnique({
      where: { id: tourId },
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        currency: true,
        coverImage: true,
        maxGroupSize: true,
      },
    })

    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
    }

    // Check availability
    const availability = await prisma.availability.findFirst({
      where: {
        tourId,
        date: new Date(tourDate),
        isBlocked: false,
      },
    })

    if (!availability) {
      return NextResponse.json({ error: 'No availability for this date' }, { status: 400 })
    }

    if (availability.booked + guests > availability.slots) {
      return NextResponse.json(
        { error: `Only ${availability.slots - availability.booked} slots available` },
        { status: 400 }
      )
    }

    // Calculate total price
    const totalPrice = Number(tour.price) * guests

    // Create pending booking in database
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        tourId,
        tourDate: new Date(tourDate),
        guests,
        totalPrice,
        currency: tour.currency,
        guestName,
        guestEmail,
        guestPhone,
        specialRequests,
        status: 'PENDING',
        paymentStatus: 'PENDING',
      },
    })

    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment system not configured' },
        { status: 500 }
      )
    }

    // Create Stripe Checkout Session
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: guestEmail,
      client_reference_id: booking.id,
      line_items: [
        {
          price_data: {
            currency: tour.currency.toLowerCase(),
            unit_amount: formatAmountForStripe(Number(tour.price), tour.currency),
            product_data: {
              name: tour.title,
              description: `${guests} ${guests === 1 ? 'guest' : 'guests'} • ${new Date(tourDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}`,
              images: tour.coverImage ? [`${baseUrl}${tour.coverImage}`] : [],
            },
          },
          quantity: guests,
        },
      ],
      metadata: {
        bookingId: booking.id,
        tourId: tour.id,
        userId: session.user.id,
        tourDate: tourDate,
        guests: guests.toString(),
      },
      success_url: `${baseUrl}/bookings/${booking.id}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/tours/${tour.slug}?booking_cancelled=true`,
    })

    // Update booking with Stripe session ID
    await prisma.booking.update({
      where: { id: booking.id },
      data: { stripeSessionId: checkoutSession.id },
    })

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
      bookingId: booking.id,
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
