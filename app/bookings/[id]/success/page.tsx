/**
 * Booking Success Page
 * Shown after successful Stripe checkout
 */

import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Calendar, Users, MapPin, Mail, Phone, ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

interface BookingSuccessPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ session_id?: string }>
}

export default async function BookingSuccessPage({ params, searchParams }: BookingSuccessPageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const bookingId = resolvedParams.id
  const sessionId = resolvedSearchParams.session_id

  // Get authenticated user
  const session = await auth()
  if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard')
  }

  // Fetch booking details
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      tour: {
        select: {
          title: true,
          slug: true,
          coverImage: true,
          duration: true,
          city: true,
          meetingPoint: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  if (!booking) {
    notFound()
  }

  // Verify this booking belongs to the authenticated user
  if (booking.userId !== session.user.id) {
    redirect('/dashboard')
  }

  const tourDateFormatted = booking.tourDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const tourTimeFormatted = booking.tourDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Your Jamaican adventure is all set
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4">
            <p className="text-emerald-100 text-sm font-medium">Booking Number</p>
            <p className="text-white text-2xl font-bold">{booking.bookingNumber}</p>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{booking.tour.title}</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">{tourDateFormatted}</p>
                  <p className="text-gray-600">at {tourTimeFormatted}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                  </p>
                  <p className="text-gray-600">{booking.guestName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Meeting Point</p>
                  <p className="text-gray-600">{booking.tour.meetingPoint}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Confirmation Email</p>
                  <p className="text-gray-600">{booking.guestEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Contact Number</p>
                  <p className="text-gray-600">{booking.guestPhone}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total Paid</span>
                <span className="text-2xl font-bold text-gray-900">
                  {booking.currency} ${Number(booking.totalPrice).toFixed(2)}
                </span>
              </div>
            </div>

            {booking.specialRequests && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Special Requests</p>
                <p className="text-gray-600">{booking.specialRequests}</p>
              </div>
            )}
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-amber-900 mb-3">Important Information</h3>
          <ul className="space-y-2 text-amber-800">
            <li className="flex gap-2">
              <span>•</span>
              <span>A confirmation email has been sent to {booking.guestEmail}</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Please arrive 15 minutes before your scheduled tour time</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Bring this booking number and a valid ID</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Cancellation policy: Full refund if cancelled 48+ hours in advance</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center flex items-center justify-center gap-2"
          >
            View My Bookings
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/tours"
            className="flex-1 bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-600 font-semibold py-3 px-6 rounded-lg transition-colors text-center"
          >
            Browse More Tours
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">Need help with your booking?</p>
          <Link
            href="/contact"
            className="text-emerald-600 hover:text-emerald-700 font-semibold underline"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
