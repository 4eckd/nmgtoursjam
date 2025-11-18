import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, MapPin } from 'lucide-react'

interface TourCardProps {
  id: string
  title: string
  slug: string
  shortDesc: string
  price: number
  currency: string
  duration: number
  maxGroupSize: number
  difficulty: string
  city: string
  coverImage: string
  category: {
    name: string
    slug: string
  }
  featured?: boolean
  reviewCount?: number
  rating?: number
  _count?: {
    reviews: number
  }
}

export default function TourCard({
  title,
  slug,
  shortDesc,
  price,
  currency,
  duration,
  maxGroupSize,
  difficulty,
  city,
  coverImage,
  category,
  featured = false,
  reviewCount,
  rating: _rating,
  _count,
}: TourCardProps) {
  // Support both reviewCount prop and _count.reviews from database
  // TODO: Display review count and rating in the UI
  const _totalReviews = reviewCount || _count?.reviews || 0
  return (
    <div className="group bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20">
      {/* Tour Image */}
      <Link href={`/tours/${slug}`} className="relative block h-56 overflow-hidden">
        <div className="relative h-full w-full bg-gradient-to-br from-emerald-600 to-emerald-900">
          {coverImage && coverImage.startsWith('/tours/') ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm">
              Tour Image Coming Soon
            </div>
          )}
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 right-3 bg-emerald-400 text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
            Featured
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
          {category.name}
        </div>
      </Link>

      {/* Tour Content */}
      <div className="p-6">
        {/* Title */}
        <Link href={`/tours/${slug}`}>
          <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-zinc-300 mb-4 line-clamp-2 text-sm">
          {shortDesc}
        </p>

        {/* Tour Details */}
        <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>{duration}h</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Max {maxGroupSize}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{city}</span>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="mb-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              difficulty === 'EASY'
                ? 'bg-emerald-400/20 text-emerald-400'
                : difficulty === 'MODERATE'
                ? 'bg-yellow-400/20 text-yellow-400'
                : difficulty === 'CHALLENGING'
                ? 'bg-orange-400/20 text-orange-400'
                : 'bg-red-400/20 text-red-400'
            }`}
          >
            {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
          </span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <span className="text-zinc-400 text-xs block">From</span>
            <span className="text-emerald-400 font-bold text-xl">
              ${price}
              <span className="text-sm text-zinc-400 ml-1">
                {currency === 'USD' ? 'USD' : currency}
              </span>
            </span>
          </div>
          <Link
            href={`/tours/${slug}`}
            className="px-5 py-2.5 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition-colors text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
