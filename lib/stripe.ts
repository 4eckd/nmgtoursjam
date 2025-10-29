/**
 * Stripe Configuration for NMG Tours Jamaica
 * Server-side and client-side Stripe instances
 */

import Stripe from 'stripe'

// Server-side Stripe instance
// Note: During build time, this may not be available - that's okay
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY not set - Stripe functionality will be disabled')
}

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2025-09-30.clover',
      typescript: true,
    })
  : null

// Helper function to format currency for Stripe (cents)
export function formatAmountForStripe(amount: number, currency: string): number {
  // Stripe expects amounts in the smallest currency unit (e.g., cents for USD)
  return Math.round(amount * 100)
}

// Helper function to format currency for display
export function formatAmountForDisplay(amount: number, currency: string): string {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  return numberFormat.format(amount)
}
