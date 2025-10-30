import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, MapPin } from 'lucide-react'
import { DifficultyBadge, CategoryBadge, FeaturedBadge } from '@/app/components/ui'

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
}: TourCardProps) {
  return (
    <div className="group bg-surface-card backdrop-blur-md rounded-lg overflow-hidden border border-border-primary hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent">
      {/* Tour Image */}
      <Link href={`/tours/${slug}`} className="relative block h-56 overflow-hidden">
        <div className="relative h-full w-full bg-gradient-to-br from-primary to-primary-active">
          {coverImage && coverImage.startsWith('/tours/') ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-content-secondary text-sm">
              Tour Image Coming Soon
            </div>
          )}
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 right-3">
            <FeaturedBadge />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <CategoryBadge category={category.name} />
        </div>
      </Link>

      {/* Tour Content */}
      <div className="p-6">
        {/* Title */}
        <Link href={`/tours/${slug}`}>
          <h3 className="text-2xl font-bold mb-2 text-content-primary group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-content-secondary mb-4 line-clamp-2 text-sm">
          {shortDesc}
        </p>

        {/* Tour Details */}
        <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
          <div className="flex items-center gap-1.5 text-content-secondary">
            <Clock className="w-4 h-4 text-primary" />
            <span>{duration}h</span>
          </div>
          <div className="flex items-center gap-1.5 text-content-secondary">
            <Users className="w-4 h-4 text-primary" />
            <span>Max {maxGroupSize}</span>
          </div>
          <div className="flex items-center gap-1.5 text-content-secondary">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{city}</span>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="mb-4">
          <DifficultyBadge difficulty={difficulty as 'EASY' | 'MODERATE' | 'CHALLENGING' | 'EXTREME'} />
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border-primary">
          <div>
            <span className="text-content-secondary text-xs block">From</span>
            <span className="text-primary font-bold text-xl">
              ${price}
              <span className="text-sm text-content-secondary ml-1">
                {currency === 'USD' ? 'USD' : currency}
              </span>
            </span>
          </div>
          <Link
            href={`/tours/${slug}`}
            className="px-5 py-2.5 bg-primary text-content-on-primary font-semibold rounded-full hover:bg-primary-hover transition-colors text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
