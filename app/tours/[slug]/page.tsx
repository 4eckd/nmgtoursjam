import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Clock,
  Users,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Star,
  ArrowLeft,
} from 'lucide-react'
import { getTourBySlug } from '@/lib/db'

interface TourDetailProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TourDetailPage({ params }: TourDetailProps) {
  const { slug } = await params
  const tour = await getTourBySlug(slug)

  if (!tour) {
    notFound()
  }

  // Mock reviews for now
  const reviews = [
    {
      id: '1',
      rating: 5,
      title: 'Absolutely Amazing Experience!',
      comment:
        "Our guide Marcus was incredible! The ride was so peaceful and the scenery was breathtaking. He shared amazing stories about Jamaica and made us feel like family. Highly recommend for a romantic getaway!",
      createdAt: '2025-11-10',
      user: {
        name: 'Sarah T.',
        image: null,
      },
    },
    {
      id: '2',
      rating: 5,
      title: 'Perfect Family Activity',
      comment:
        'Took our kids (ages 8 and 12) and they loved it! Very safe, Marcus was patient with the kids and taught them about the local plants.',
      createdAt: '2025-11-05',
      user: {
        name: 'John M.',
        image: null,
      },
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image */}
      <section className="relative h-96">
        <div className="absolute inset-0">
          <div className="relative h-full w-full bg-gradient-to-br from-emerald-600 to-emerald-900">
            {tour.coverImage && tour.coverImage.startsWith('/tours/') ? (
              <Image
                src={tour.coverImage}
                alt={tour.title}
                fill
                className="object-cover object-center"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/50 text-lg">
                Tour Image Coming Soon
              </div>
            )}
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        {/* Back Button */}
        <Link
          href="/tours"
          className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-black/70 backdrop-blur-md text-white rounded-full hover:bg-black/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Tours</span>
        </Link>

        {/* Breadcrumb */}
        <div className="absolute bottom-6 left-6 z-20">
          <p className="text-zinc-300 text-sm mb-2">
            Home &gt; Tours &gt; {tour.title}
          </p>
        </div>
      </section>

      {/* Tour Details */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-400/20 text-emerald-400 rounded-full text-sm font-semibold">
                  {tour.category.name}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    tour.difficulty === 'EASY'
                      ? 'bg-emerald-400/20 text-emerald-400'
                      : tour.difficulty === 'MODERATE'
                      ? 'bg-yellow-400/20 text-yellow-400'
                      : tour.difficulty === 'CHALLENGING'
                      ? 'bg-orange-400/20 text-orange-400'
                      : 'bg-red-400/20 text-red-400'
                  }`}
                >
                  {tour.difficulty.charAt(0) +
                    tour.difficulty.slice(1).toLowerCase()}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {tour.title}
              </h1>

              <p className="text-xl text-zinc-300 mb-6">{tour.shortDesc}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(tour.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-zinc-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white font-semibold">
                  {tour.rating.toFixed(1)}
                </span>
                <span className="text-zinc-400">
                  ({tour.reviewCount}{' '}
                  {tour.reviewCount === 1 ? 'review' : 'reviews'})
                </span>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span>{tour.duration} hours</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span>Max {tour.maxGroupSize}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>{tour.city}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span>
                    ${tour.price} {tour.currency}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                About This Experience
              </h2>
              <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                {tour.description}
              </p>
            </div>

            {/* Highlights */}
            {tour.highlights.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Highlights
                </h2>
                <ul className="space-y-3">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Included / Not Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  What's Included
                </h2>
                <ul className="space-y-3">
                  {tour.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  What's Not Included
                </h2>
                <ul className="space-y-3">
                  {tour.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What to Bring */}
            {tour.whatToBring.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">
                  What to Bring
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.whatToBring.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Meeting Point */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                Meeting Point
              </h2>
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold mb-1">
                    {tour.meetingPoint}
                  </p>
                  <p className="text-zinc-400">{tour.city}, Jamaica</p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                Customer Reviews
              </h2>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-zinc-600'
                          }`}
                        />
                      ))}
                      <span className="text-zinc-400 text-sm ml-2">
                        {new Date(review.createdAt).toLocaleDateString(
                          'en-US',
                          { month: 'short', day: 'numeric', year: 'numeric' }
                        )}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      "{review.title}"
                    </h3>
                    <p className="text-zinc-300 mb-3">{review.comment}</p>
                    <p className="text-zinc-400 text-sm">
                      — {review.user.name} • Verified Booking
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
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
                    Contact us for availability
                  </p>
                </div>

                {/* Book Now Button */}
                <Link
                  href={`/contact?tour=${tour.slug}`}
                  className="block w-full px-6 py-4 bg-emerald-400 text-black text-center font-bold rounded-lg hover:bg-emerald-300 transition-colors mb-4"
                >
                  Book Now
                </Link>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Instant Confirmation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Free Cancellation (24h notice)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Mobile Ticket Accepted</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-500 text-center">
                  Contact us to check availability and complete your booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
