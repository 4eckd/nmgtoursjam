'use client'

import Image from 'next/image'
import TourCard from '@/app/components/tours/TourCard'
import { staticTours } from '@/app/data/tours'

export default function ToursPage() {
  const tours = staticTours

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="fixed inset-0 -z-20">
          <Image
            src="/NMGTOURS.png"
            alt="Rafting Tours Background"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="fixed inset-0 bg-black/60 -z-10" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-caveat text-white">
            Explore Jamaica Tours
          </h1>
          <p className="text-xl text-zinc-200">
            Discover authentic island experiences
          </p>
          <p className="text-emerald-400 mt-4 font-semibold">
            {tours.length} tours found
          </p>
        </div>
      </section>

      {/* Tours Listing Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {tours.length > 0 ? (
          <>
            {/* Search and Sort Bar */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-96">
                <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search tours..."
                    className="bg-transparent flex-1 outline-none text-white placeholder-zinc-400"
                    disabled
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <span className="text-zinc-400 text-sm">Sort by:</span>
                <select
                  disabled
                  className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 text-white outline-none"
                >
                  <option>Price (Low to High)</option>
                  <option>Price (High to Low)</option>
                  <option>Duration</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            {/* Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <TourCard
                  key={tour.id}
                  {...tour}
                  _count={{ reviews: tour.reviewCount }}
                />
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                disabled
                className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg text-white hover:border-emerald-400/50 transition disabled:opacity-50"
              >
                ◀ Previous
              </button>
              <button className="px-4 py-2 bg-emerald-400 text-black rounded-lg font-semibold">
                1
              </button>
              <button className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg text-white hover:border-emerald-400/50 transition">
                2
              </button>
              <button className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg text-white hover:border-emerald-400/50 transition">
                3
              </button>
              <button
                disabled
                className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg text-white hover:border-emerald-400/50 transition disabled:opacity-50"
              >
                Next ▶
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-12 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                No Tours Available
              </h3>
              <p className="text-zinc-400 mb-6">
                We're currently updating our tour offerings. Please check back
                soon!
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
