/**
 * Stripe Webhook Handler
 * Processes payment events from Stripe (payment success, failure, refunds)
 */

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendBookingConfirmationEmail } from '@/lib/email'
import Stripe from 'stripe'

// Disable body parsing for webhooks
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  // Check if Stripe is configured
  if (!stripe) {
    console.error('Stripe not configured')
    return NextResponse.json({ error: 'Payment system not configured' }, { status: 500 })
  }

  const body = await request.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle different event types
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Handle successful checkout session completion
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const bookingId = session.metadata?.bookingId

  if (!bookingId) {
    console.error('No bookingId in session metadata')
    return
  }

  // Update booking with payment info
  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      paymentStatus: 'SUCCEEDED',
      status: 'CONFIRMED',
      paymentIntentId: session.payment_intent as string,
    },
    include: {
      tour: {
        select: {
          title: true,
          meetingPoint: true,
        },
      },
    },
  })

  // Update availability
  await prisma.availability.updateMany({
    where: {
      tourId: booking.tourId,
      date: booking.tourDate,
    },
    data: {
      booked: { increment: booking.guests },
    },
  })

  // Send confirmation email
  const tourDateFormatted = booking.tourDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  await sendBookingConfirmationEmail({
    customerEmail: booking.guestEmail,
    customerName: booking.guestName,
    bookingNumber: booking.bookingNumber,
    tourTitle: booking.tour.title,
    tourDate: tourDateFormatted,
    guests: booking.guests,
    totalPrice: `${booking.currency} $${Number(booking.totalPrice).toFixed(2)}`,
    meetingPoint: booking.tour.meetingPoint,
  })

  console.log(`Booking ${bookingId} confirmed and email sent`)
}

/**
 * Handle successful payment intent
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata?.bookingId

  if (!bookingId) {
    console.log('No bookingId in payment intent metadata')
    return
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      paymentStatus: 'SUCCEEDED',
      paymentIntentId: paymentIntent.id,
    },
  })

  console.log(`Payment succeeded for booking ${bookingId}`)
}

/**
 * Handle failed payment intent
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata?.bookingId

  if (!bookingId) {
    console.log('No bookingId in payment intent metadata')
    return
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      paymentStatus: 'FAILED',
      status: 'CANCELLED',
    },
  })

  console.log(`Payment failed for booking ${bookingId}`)
}

/**
 * Handle charge refund
 */
async function handleChargeRefunded(charge: Stripe.Charge) {
  const paymentIntentId = charge.payment_intent as string

  if (!paymentIntentId) {
    console.log('No payment intent in charge')
    return
  }

  // Find booking by payment intent ID
  const booking = await prisma.booking.findUnique({
    where: { paymentIntentId },
  })

  if (!booking) {
    console.log(`No booking found for payment intent ${paymentIntentId}`)
    return
  }

  // Calculate refund amount
  const refundAmount = charge.amount_refunded / 100 // Convert from cents

  await prisma.booking.update({
    where: { id: booking.id },
    data: {
      paymentStatus: charge.refunded ? 'REFUNDED' : 'PARTIALLY_REFUNDED',
      refundAmount: refundAmount,
      refundStatus: 'COMPLETED',
    },
  })

  // Update availability (return slots)
  await prisma.availability.updateMany({
    where: {
      tourId: booking.tourId,
      date: booking.tourDate,
    },
    data: {
      booked: { decrement: booking.guests },
    },
  })

  console.log(`Refund processed for booking ${booking.id}: $${refundAmount}`)
}
