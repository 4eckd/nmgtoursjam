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
import ImageGallery from '@/app/components/tours/ImageGallery'
import TourBookingSection from '@/app/components/tours/TourBookingSection'

interface TourDetailProps {
  params: Promise<{
    slug: string
  }>
}

interface Tour {
  id: string
  title: string
  slug: string
  description: string
  shortDesc: string
  price: number
  currency: string
  duration: number
  maxGroupSize: number
  difficulty: string
  meetingPoint: string
  city: string
  coverImage: string
  included: string[]
  notIncluded: string[]
  highlights: string[]
  whatToBring: string[]
  category: {
    id: string
    name: string
    slug: string
  }
  images: {
    id: string
    url: string
    alt: string | null
    caption: string | null
    order: number
  }[]
  reviews: {
    id: string
    rating: number
    title: string | null
    comment: string
    createdAt: string
    user: {
      name: string | null
      image: string | null
    }
  }[]
  availability: {
    id: string
    date: string
    slots: number
    booked: number
  }[]
}

async function getTour(slug: string): Promise<Tour | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/tours/${slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.tour
  } catch (error) {
    console.error('Error fetching tour:', error)
    return null
  }
}

export default async function TourDetailPage({ params }: TourDetailProps) {
  const { slug } = await params
  const tour = await getTour(slug)

  if (!tour) {
    notFound()
  }

  // Calculate average rating
  const avgRating =
    tour.reviews.length > 0
      ? tour.reviews.reduce((sum, r) => sum + r.rating, 0) / tour.reviews.length
      : 0

  // Get all images including cover
  const allImages = [
    { url: tour.coverImage, alt: tour.title, caption: null },
    ...tour.images.map((img) => ({
      url: img.url,
      alt: img.alt || tour.title,
      caption: img.caption,
    })),
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Gallery */}
      <section className="relative">
        <ImageGallery images={allImages} tourTitle={tour.title} />

        {/* Back Button */}
        <Link
          href="/tours"
          className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-black/70 backdrop-blur-md text-white rounded-full hover:bg-black/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Tours</span>
        </Link>
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
                  {tour.difficulty.charAt(0) + tour.difficulty.slice(1).toLowerCase()}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {tour.title}
              </h1>

              <p className="text-xl text-zinc-300 mb-6">{tour.shortDesc}</p>

              {/* Rating */}
              {tour.reviews.length > 0 && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(avgRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-zinc-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-semibold">
                    {avgRating.toFixed(1)}
                  </span>
                  <span className="text-zinc-400">
                    ({tour.reviews.length}{' '}
                    {tour.reviews.length === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}

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
                <h2 className="text-2xl font-bold text-white mb-4">Highlights</h2>
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
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6">
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
          </div>

          {/* Booking Sidebar */}
          <TourBookingSection
            tour={{
              id: tour.id,
              title: tour.title,
              price: tour.price,
              currency: tour.currency,
              maxGroupSize: tour.maxGroupSize,
              duration: tour.duration,
            }}
            availabilityCount={tour.availability.length}
          />
        </div>
      </section>
    </div>
  )
}
