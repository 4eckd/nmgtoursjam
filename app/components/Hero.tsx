'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Search, MapPin, Calendar } from 'lucide-react'

interface HeroProps {
  title?: string
  subtitle?: string
  description?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  showSearch?: boolean
}

export default function Hero({
  title = 'Discover Jamaica',
  subtitle = 'Authentic Island Adventures',
  description = "Experience the real Jamaica with local guides. From bamboo rafting to hidden waterfalls - create memories that last a lifetime.",
  primaryCTA = {
    text: 'Explore Tours',
    href: '/tours',
  },
  secondaryCTA = {
    text: 'View Gallery',
    href: '/gallery',
  },
  showSearch = true,
}: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Fade-in animation on mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate parallax offset (subtle effect)
  const parallaxOffset = scrollY * 0.5

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      aria-label="Hero section"
    >
      {/* Video Background with Fallback Pattern */}
      <div
        className="absolute inset-0 -z-20"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
        aria-hidden="true"
      >
        {/* Geometric pattern background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950">
          {/* Animated circles for visual interest */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-emerald-600/15 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      {/* Overlay for better text contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 -z-10"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div
            className={`text-left transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-2 mb-6 transition-all duration-1000 delay-100"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">100% Authentic Jamaican Tours</span>
            </div>

            {/* Main Title */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight transition-all duration-1000 delay-200"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              className="text-2xl md:text-3xl font-caveat text-emerald-300 mb-6 transition-all duration-1000 delay-300"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {subtitle}
            </p>

            {/* Description */}
            <p
              className="text-lg md:text-xl mb-8 text-zinc-200 leading-relaxed transition-all duration-1000 delay-400"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {description}
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-8 transition-all duration-1000 delay-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <Link
                href={primaryCTA.href}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-400 transition-all duration-300 text-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/50 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
                aria-label={primaryCTA.text}
              >
                {primaryCTA.text}
                <Calendar className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-900 font-semibold rounded-xl hover:bg-zinc-100 transition-all duration-300 text-lg shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
                aria-label={secondaryCTA.text}
              >
                {secondaryCTA.text}
              </Link>
            </div>

            {/* Trust Badges */}
            <div
              className="flex flex-wrap items-center gap-6 text-sm text-zinc-300 transition-all duration-1000 delay-600"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium">10,000+ Travelers</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Instant Booking</span>
              </div>
            </div>
          </div>

          {/* Right Column - Search Card */}
          {showSearch && (
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Your Adventure</h3>

                <form className="space-y-4">
                  {/* Destination */}
                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                      Destination
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="destination"
                        type="text"
                        placeholder="Where to?"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="date"
                        type="date"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                      />
                    </div>
                  </div>

                  {/* Activity Type */}
                  <div>
                    <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-2">
                      Activity Type
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="activity"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 appearance-none bg-white"
                      >
                        <option>All Activities</option>
                        <option>Rafting Tours</option>
                        <option>Waterfalls</option>
                        <option>Cultural Tours</option>
                        <option>Adventure</option>
                      </select>
                    </div>
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-400 transition-colors duration-300 shadow-lg shadow-emerald-500/30"
                  >
                    Search Tours
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
          })
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-all duration-300 animate-bounce focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-2"
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}
