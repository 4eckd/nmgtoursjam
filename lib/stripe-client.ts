/**
 * Client-side Stripe configuration
 * Used for Stripe Elements and client-side payment processing
 */

import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

    if (!publishableKey) {
      console.error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')
      return Promise.resolve(null)
    }

    stripePromise = loadStripe(publishableKey)
  }

  return stripePromise
}
