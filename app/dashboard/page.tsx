/**
 * User Dashboard Page
 * Displays user's bookings and account information
 */

import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { Calendar, Clock, Users, MapPin, CreditCard, ChevronRight } from 'lucide-react'

export default async function DashboardPage() {
  // Check if user is authenticated
  const session = await auth()
  if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard')
  }

  // Fetch user's bookings
  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
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
    },
    orderBy: { createdAt: 'desc' },
  })

  // Separate upcoming and past bookings
  const now = new Date()
  const upcomingBookings = bookings.filter(b => b.tourDate >= now && b.status !== 'CANCELLED')
  const pastBookings = bookings.filter(b => b.tourDate < now || b.status === 'CANCELLED')

  function getStatusColor(status: string) {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'CANCELLED':
        return 'bg-red-100 text-red-700 border-red-300'
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  function getPaymentStatusColor(status: string) {
    switch (status) {
      case 'SUCCEEDED':
        return 'text-emerald-600'
      case 'PENDING':
        return 'text-yellow-600'
      case 'FAILED':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {session.user.name?.split(' ')[0] || 'traveler'}!
          </h1>
          <p className="text-gray-400">Manage your bookings and explore new adventures</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{upcomingBookings.length}</p>
                <p className="text-gray-400 text-sm">Upcoming Tours</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{pastBookings.length}</p>
                <p className="text-gray-400 text-sm">Past Tours</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{bookings.length}</p>
                <p className="text-gray-400 text-sm">Total Bookings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Upcoming Tours</h2>

          {upcomingBookings.length === 0 ? (
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No upcoming tours</h3>
              <p className="text-gray-400 mb-6">Start planning your next Jamaican adventure!</p>
              <Link
                href="/tours"
                className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
              >
                Browse Tours
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:border-emerald-400/50 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {booking.tour.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Booking #{booking.bookingNumber}
                        </p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 text-gray-300">
                        <Calendar className="w-5 h-5 text-emerald-400" />
                        <span>
                          {booking.tourDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-300">
                        <Users className="w-5 h-5 text-emerald-400" />
                        <span>{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-300">
                        <MapPin className="w-5 h-5 text-emerald-400" />
                        <span>{booking.tour.city}, Jamaica</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-emerald-400" />
                        <span className={`font-semibold ${getPaymentStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus === 'SUCCEEDED' ? 'Paid' : booking.paymentStatus}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-white font-bold">
                          ${Number(booking.totalPrice).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/tours/${booking.tour.slug}`}
                      className="flex items-center justify-between w-full px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg transition-colors"
                    >
                      <span className="font-semibold">View Tour Details</span>
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Past Tours</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pastBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          {booking.tour.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Booking #{booking.bookingNumber}
                        </p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {booking.tourDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Ready for your next adventure?</h2>
          <p className="text-emerald-100 mb-6">Explore our amazing tours and book your next unforgettable experience</p>
          <Link
            href="/tours"
            className="inline-block px-8 py-3 bg-white text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Browse All Tours
          </Link>
        </div>
      </div>
    </div>
  )
}
