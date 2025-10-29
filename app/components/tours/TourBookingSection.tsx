'use client'

/**
 * Tour Booking Section - Client Component
 * Handles the booking sidebar with BookingWizard modal
 */

import { useState } from 'react'
import { Calendar } from 'lucide-react'
import BookingWizard from '@/app/components/booking/BookingWizard'

interface Tour {
  id: string
  title: string
  price: number
  currency: string
  maxGroupSize: number
  duration: number
}

interface TourBookingSectionProps {
  tour: Tour
  availabilityCount: number
}

export default function TourBookingSection({ tour, availabilityCount }: TourBookingSectionProps) {
  const [showBookingWizard, setShowBookingWizard] = useState(false)

  return (
    <>
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6">
            {/* Price */}
            <div className="mb-6 pb-6 border-b border-white/10">
              <div className="text-zinc-400 text-sm mb-1">From</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-emerald-400">
                  ${tour.price}
                </span>
                <span className="text-zinc-400">
                  {tour.currency} / person
                </span>
              </div>
            </div>

            {/* Availability Notice */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Available Dates</span>
              </div>
              <p className="text-sm text-zinc-400">
                {availabilityCount > 0
                  ? `${availabilityCount} dates available in the next 30 days`
                  : 'Contact us for availability'}
              </p>
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => setShowBookingWizard(true)}
              className="w-full px-6 py-4 bg-emerald-400 text-black text-center font-bold rounded-lg hover:bg-emerald-300 transition-colors mb-4"
            >
              Book Now
            </button>

            <p className="text-xs text-zinc-500 text-center">
              Choose your dates and complete your booking securely
            </p>

            <div className="mt-6 pt-6 border-t border-white/10 text-sm text-zinc-400 space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free cancellation up to 48 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Instant confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Secure payment via Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Wizard Modal */}
      {showBookingWizard && (
        <BookingWizard
          tour={tour}
          onClose={() => setShowBookingWizard(false)}
        />
      )}
    </>
  )
}
