'use client'

/**
 * Booking Wizard Component
 * Multi-step form for booking tours with date selection, guest count, and checkout
 */

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Calendar, Users, CreditCard, Loader2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { getStripe } from '@/lib/stripe-client'

interface Tour {
  id: string
  title: string
  price: number
  currency: string
  maxGroupSize: number
  duration: number
}

interface BookingWizardProps {
  tour: Tour
  onClose: () => void
}

interface AvailabilityDate {
  date: string
  slots: number
  booked: number
  isBlocked: boolean
}

export default function BookingWizard({ tour, onClose }: BookingWizardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Wizard state
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Form data
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [guests, setGuests] = useState(1)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')

  // Availability data
  const [availableDates, setAvailableDates] = useState<AvailabilityDate[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Initialize form with user data if logged in
  useEffect(() => {
    if (session?.user) {
      setGuestName(session.user.name || '')
      setGuestEmail(session.user.email || '')
    }
  }, [session])

  // Fetch availability for current month
  useEffect(() => {
    fetchAvailability()
  }, [currentMonth, tour.id])

  async function fetchAvailability() {
    try {
      const year = currentMonth.getFullYear()
      const month = currentMonth.getMonth() + 1
      const response = await fetch(`/api/availability?tourId=${tour.id}&year=${year}&month=${month}`)

      if (!response.ok) throw new Error('Failed to fetch availability')

      const data = await response.json()
      setAvailableDates(data.availability || [])
    } catch (err) {
      console.error('Error fetching availability:', err)
      setError('Failed to load availability')
    }
  }

  function handlePreviousMonth() {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)
    if (newMonth >= new Date()) {
      setCurrentMonth(newMonth)
    }
  }

  function handleNextMonth() {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)
    setCurrentMonth(newMonth)
  }

  function isDateAvailable(date: Date): boolean {
    const dateStr = date.toISOString().split('T')[0]
    const availability = availableDates.find(a => a.date === dateStr)
    if (!availability) return false
    return !availability.isBlocked && (availability.slots - availability.booked) > 0
  }

  function getAvailableSlots(date: Date): number {
    const dateStr = date.toISOString().split('T')[0]
    const availability = availableDates.find(a => a.date === dateStr)
    if (!availability) return 0
    return availability.slots - availability.booked
  }

  async function handleSubmit() {
    // Check if user is authenticated
    if (status !== 'authenticated') {
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
      return
    }

    // Validate step 1
    if (step === 1 && !selectedDate) {
      setError('Please select a date')
      return
    }

    // Validate step 2
    if (step === 2) {
      const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : 0
      if (guests < 1) {
        setError('Please select at least 1 guest')
        return
      }
      if (guests > tour.maxGroupSize) {
        setError(`Maximum ${tour.maxGroupSize} guests allowed`)
        return
      }
      if (guests > availableSlots) {
        setError(`Only ${availableSlots} slots available for this date`)
        return
      }
      setStep(3)
      return
    }

    // Validate step 3
    if (!guestName || !guestEmail || !guestPhone) {
      setError('Please fill in all required fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(guestEmail)) {
      setError('Please enter a valid email address')
      return
    }

    // Create checkout session
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/bookings/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tour.id,
          tourDate: selectedDate?.toISOString(),
          guests,
          guestName,
          guestEmail,
          guestPhone,
          specialRequests,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout URL
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err instanceof Error ? err.message : 'Failed to proceed to checkout')
      setLoading(false)
    }
  }

  const totalPrice = tour.price * guests

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Book Your Tour</h2>
            <p className="text-gray-600">{tour.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close booking wizard"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                <div className="flex-1 ml-3">
                  <p className={`text-sm font-medium ${step >= s ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {s === 1 && 'Select Date'}
                    {s === 2 && 'Choose Guests'}
                    {s === 3 && 'Confirm Details'}
                  </p>
                </div>
                {s < 3 && (
                  <div className={`h-1 flex-1 mx-2 ${step > s ? 'bg-emerald-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Step 1: Date Selection */}
          {step === 1 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePreviousMonth}
                  disabled={currentMonth <= new Date()}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-bold text-gray-900">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                    {day}
                  </div>
                ))}

                {/* Generate calendar days */}
                {(() => {
                  const year = currentMonth.getFullYear()
                  const month = currentMonth.getMonth()
                  const firstDay = new Date(year, month, 1).getDay()
                  const daysInMonth = new Date(year, month + 1, 0).getDate()
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)

                  const days = []

                  // Empty cells for days before month starts
                  for (let i = 0; i < firstDay; i++) {
                    days.push(<div key={`empty-${i}`} />)
                  }

                  // Days of the month
                  for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(year, month, day)
                    const isPast = date < today
                    const available = isDateAvailable(date)
                    const isSelected = selectedDate?.toDateString() === date.toDateString()
                    const availableSlots = getAvailableSlots(date)

                    days.push(
                      <button
                        key={day}
                        onClick={() => !isPast && available && setSelectedDate(date)}
                        disabled={isPast || !available}
                        className={`aspect-square p-2 rounded-lg text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-600 ring-offset-2'
                            : isPast
                            ? 'text-gray-300 cursor-not-allowed'
                            : available
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <div>{day}</div>
                        {available && !isPast && (
                          <div className="text-xs mt-1">{availableSlots} left</div>
                        )}
                      </button>
                    )
                  }

                  return days
                })()}
              </div>

              {selectedDate && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-emerald-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Selected: {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-emerald-700 text-sm mt-1">
                    {getAvailableSlots(selectedDate)} slots available
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Guest Count */}
          {step === 2 && (
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                <Users className="w-5 h-5 inline mr-2" />
                Number of Guests
              </label>
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-xl"
                >
                  -
                </button>
                <div className="flex-1 text-center">
                  <div className="text-4xl font-bold text-gray-900">{guests}</div>
                  <div className="text-sm text-gray-600">
                    {guests === 1 ? 'guest' : 'guests'} • Max {tour.maxGroupSize}
                  </div>
                </div>
                <button
                  onClick={() => setGuests(Math.min(tour.maxGroupSize, guests + 1))}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-xl"
                >
                  +
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Price per person:</span>
                  <span className="font-semibold text-gray-900">${tour.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Number of guests:</span>
                  <span className="font-semibold text-gray-900">{guests}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="font-bold text-emerald-600 text-2xl">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {selectedDate && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900 text-sm">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Tour Date: {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Guest Details */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="guestName" className="block text-gray-700 font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  id="guestName"
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="guestEmail" className="block text-gray-700 font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  id="guestEmail"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="guestPhone" className="block text-gray-700 font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  id="guestPhone"
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="+1 (876) 123-4567"
                  required
                />
              </div>

              <div>
                <label htmlFor="specialRequests" className="block text-gray-700 font-semibold mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="specialRequests"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Dietary restrictions, accessibility needs, etc."
                />
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tour:</span>
                    <span className="text-gray-900 font-medium">{tour.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-900 font-medium">
                      {selectedDate?.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="text-gray-900 font-medium">{guests}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className="font-bold text-emerald-600">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-4">
          {step > 1 && (
            <button
              onClick={() => {
                setStep(step - 1)
                setError('')
              }}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={() => {
              if (step < 3) {
                if (step === 1 && !selectedDate) {
                  setError('Please select a date')
                  return
                }
                setStep(step + 1)
                setError('')
              } else {
                handleSubmit()
              }
            }}
            disabled={loading}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : step === 3 ? (
              <>
                <CreditCard className="w-5 h-5" />
                Proceed to Payment
              </>
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
