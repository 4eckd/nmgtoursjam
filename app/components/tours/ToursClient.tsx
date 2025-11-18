'use client'

import { useState, useMemo } from 'react'
import TourCard from './TourCard'
import TourFilters, { FilterState } from './TourFilters'

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
  city: string
  coverImage: string
  category: {
    id: string
    name: string
    slug: string
  }
  featured: boolean
  createdAt: string
  _count: {
    reviews: number
  }
}

interface Category {
  id: string
  name: string
  slug: string
}

interface ToursClientProps {
  initialTours: Tour[]
  categories: Category[]
}

export default function ToursClient({
  initialTours,
  categories,
}: ToursClientProps) {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    difficulty: '',
    minPrice: '',
    maxPrice: '',
  })
  const [sort, setSort] = useState('featured')

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    let result = [...initialTours]

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (tour) =>
          tour.title.toLowerCase().includes(searchLower) ||
          tour.description.toLowerCase().includes(searchLower) ||
          tour.shortDesc.toLowerCase().includes(searchLower) ||
          tour.city.toLowerCase().includes(searchLower)
      )
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter((tour) => tour.category.slug === filters.category)
    }

    // Apply difficulty filter
    if (filters.difficulty) {
      result = result.filter((tour) => tour.difficulty === filters.difficulty)
    }

    // Apply price range filter
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice)
      result = result.filter((tour) => tour.price >= minPrice)
    }

    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice)
      result = result.filter((tour) => tour.price <= maxPrice)
    }

    // Apply sorting
    switch (sort) {
      case 'featured':
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        break
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'duration-asc':
        result.sort((a, b) => a.duration - b.duration)
        break
      case 'duration-desc':
        result.sort((a, b) => b.duration - a.duration)
        break
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
    }

    return result
  }, [initialTours, search, filters, sort])

  return (
    <>
      {/* Filters */}
      <TourFilters
        categories={categories}
        onFilterChange={setFilters}
        onSearchChange={setSearch}
        onSortChange={setSort}
      />

      {/* Stats Bar */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Available Tours</h2>
          <p className="text-zinc-400 text-sm">
            {filteredTours.length}{' '}
            {filteredTours.length === 1 ? 'tour' : 'tours'}{' '}
            {search || filters.category || filters.difficulty || filters.minPrice || filters.maxPrice
              ? 'found'
              : 'available'}
          </p>
        </div>
      </div>

      {/* Tours Grid */}
      {filteredTours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <TourCard
              key={tour.id}
              id={tour.id}
              title={tour.title}
              slug={tour.slug}
              shortDesc={tour.shortDesc}
              price={tour.price}
              currency={tour.currency}
              duration={tour.duration}
              maxGroupSize={tour.maxGroupSize}
              difficulty={tour.difficulty}
              city={tour.city}
              coverImage={tour.coverImage}
              category={tour.category}
              featured={tour.featured}
              reviewCount={tour._count.reviews}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-12 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              No Tours Found
            </h3>
            <p className="text-zinc-400 mb-6">
              {search || filters.category || filters.difficulty || filters.minPrice || filters.maxPrice
                ? 'Try adjusting your filters or search terms to find more tours.'
                : 'We\'re currently updating our tour offerings. Please check back soon!'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
