'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
}

interface TourFiltersProps {
  categories: Category[]
  onFilterChange: (filters: FilterState) => void
  onSearchChange: (search: string) => void
  onSortChange: (sort: string) => void
}

export interface FilterState {
  category: string
  difficulty: string
  minPrice: string
  maxPrice: string
}

const DIFFICULTY_OPTIONS = [
  { value: '', label: 'All Levels' },
  { value: 'EASY', label: 'Easy' },
  { value: 'MODERATE', label: 'Moderate' },
  { value: 'CHALLENGING', label: 'Challenging' },
  { value: 'EXTREME', label: 'Extreme' },
]

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'duration-asc', label: 'Duration: Short to Long' },
  { value: 'duration-desc', label: 'Duration: Long to Short' },
  { value: 'newest', label: 'Newest First' },
]

export default function TourFilters({
  categories,
  onFilterChange,
  onSearchChange,
  onSortChange,
}: TourFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    difficulty: '',
    minPrice: '',
    maxPrice: '',
  })
  const [sort, setSort] = useState('featured')

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onSearchChange(value)
  }

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSortChange = (value: string) => {
    setSort(value)
    onSortChange(value)
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      difficulty: '',
      minPrice: '',
      maxPrice: '',
    }
    setFilters(clearedFilters)
    setSearch('')
    setSort('featured')
    onFilterChange(clearedFilters)
    onSearchChange('')
    onSortChange('featured')
  }

  const hasActiveFilters =
    filters.category ||
    filters.difficulty ||
    filters.minPrice ||
    filters.maxPrice ||
    search

  return (
    <div className="mb-8">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search tours..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="sm:w-64">
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-400/50 transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-black">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            isOpen || hasActiveFilters
              ? 'bg-emerald-400 text-black'
              : 'bg-black/40 backdrop-blur-md border border-white/10 text-white hover:border-emerald-400/50'
          }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="bg-black/30 px-2 py-0.5 rounded-full text-xs">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-4 py-2.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-400/50 transition-colors cursor-pointer"
              >
                <option value="" className="bg-black">
                  All Categories
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug} className="bg-black">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="w-full px-4 py-2.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-400/50 transition-colors cursor-pointer"
              >
                {DIFFICULTY_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-black"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price Filter */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Min Price (USD)
              </label>
              <input
                type="number"
                placeholder="0"
                min="0"
                step="10"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="w-full px-4 py-2.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400/50 transition-colors"
              />
            </div>

            {/* Max Price Filter */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Max Price (USD)
              </label>
              <input
                type="number"
                placeholder="500"
                min="0"
                step="10"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-full px-4 py-2.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400/50 transition-colors"
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
