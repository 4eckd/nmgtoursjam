'use client'

import Image from 'next/image'
import Link from 'next/link'
import TourCard from '@/app/components/tours/TourCard'
import { getFeaturedTours } from '@/app/data/tours'
import { Star, Users, CheckCircle, Leaf } from 'lucide-react'

export default function Home() {
  const featuredTours = getFeaturedTours()

  return (
    <div className="relative w-full overflow-hidden text-white font-poppins">
      {/* Background Image - Fixed position for full viewport coverage */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/NMGTOURS.png"
          alt="NMG Tours Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/50 via-black/70 to-emerald-800/95 -z-10" />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-caveat">
          Authentic Island Experiences
        </h1>
        <div className="w-32 h-1 bg-emerald-400 mb-6 rounded-full"></div>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-zinc-200">
          Discover Jamaica&apos;s hidden gems with local guides. Rafting tours,
          cultural jams, and island adventures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            href="/tours"
            className="px-8 py-4 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition text-lg"
          >
            Explore Tours →
          </Link>
          <Link
            href="/gallery"
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition text-lg border border-white/20"
          >
            View Gallery
          </Link>
        </div>

        {/* Search Bar Placeholder */}
        <div className="w-full max-w-2xl mt-8">
          <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-6 py-4 flex items-center gap-3">
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
              placeholder="Search tours, locations, experiences..."
              className="bg-transparent flex-1 outline-none text-white placeholder-zinc-400"
              disabled
            />
            <button
              disabled
              className="px-6 py-2 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition text-sm"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-caveat">
            Popular Island Experiences
          </h2>
          <p className="text-xl text-zinc-300">
            Handpicked tours by local experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredTours.map((tour) => (
            <TourCard
              key={tour.id}
              {...tour}
              _count={{ reviews: tour.reviewCount }}
            />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/tours"
            className="inline-block px-8 py-4 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition text-lg"
          >
            View All Tours →
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-caveat">
            Why Choose NMG Tours Jamaica?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-8 text-center hover:border-emerald-400/50 transition-all">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-400/20 rounded-full flex items-center justify-center">
              <span className="text-4xl">🏝️</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Local Guides</h3>
            <p className="text-zinc-300">
              Authentic experiences with locals who know the island best
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-8 text-center hover:border-emerald-400/50 transition-all">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-400/20 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Expert Guides</h3>
            <p className="text-zinc-300">
              Born and raised in Jamaica with years of experience
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-8 text-center hover:border-emerald-400/50 transition-all">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-400/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">
              Safe & Insured
            </h3>
            <p className="text-zinc-300">
              Safety is our top priority with full insurance coverage
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-8 text-center hover:border-emerald-400/50 transition-all">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-400/20 rounded-full flex items-center justify-center">
              <Leaf className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Eco-Friendly</h3>
            <p className="text-zinc-300">
              Sustainable tourism practices protecting Jamaica&apos;s beauty
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-caveat">
            What Our Travelers Say
          </h2>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-8 md:p-12">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <blockquote className="text-xl md:text-2xl text-center text-zinc-200 mb-6 italic">
            &quot;Best rafting experience ever! Our guide Marcus was amazing and
            showed us the real Jamaica. Can&apos;t wait to come back!&quot;
          </blockquote>

          <p className="text-center text-zinc-400">
            — Sarah T. (Toronto, Canada)
          </p>

          <div className="flex justify-center gap-2 mt-8">
            <button className="w-2 h-2 rounded-full bg-emerald-400"></button>
            <button className="w-2 h-2 rounded-full bg-white/30"></button>
            <button className="w-2 h-2 rounded-full bg-white/30"></button>
            <button className="w-2 h-2 rounded-full bg-white/30"></button>
            <button className="w-2 h-2 rounded-full bg-white/30"></button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-emerald-400 mb-2">
              10,000+
            </div>
            <div className="text-zinc-300">Happy Travelers</div>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-emerald-400 mb-2">
              500+
            </div>
            <div className="text-zinc-300">Tours Completed</div>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-emerald-400 mb-2">
              4.9
            </div>
            <div className="text-zinc-300">Average Rating</div>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-emerald-400 mb-2">
              100%
            </div>
            <div className="text-zinc-300">Local Guides</div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Island Vibes
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Get exclusive deals and tour updates weekly
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 px-6 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 outline-none focus:border-white/60 transition"
              disabled
            />
            <button
              disabled
              className="px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-black/90 transition whitespace-nowrap"
            >
              Subscribe →
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-emerald-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Exclusive discounts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>No spam</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for footer */}
      <div className="h-20"></div>
    </div>
  )
}
