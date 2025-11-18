'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

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
  backgroundImage?: string
}

export default function Hero({
  title = 'Authentic Island Experiences',
  subtitle = 'NMG Tours Jamaica',
  description = "Discover Jamaica's hidden gems with local guides. Rafting tours, cultural jams, and island adventures.",
  primaryCTA = {
    text: 'Explore Tours →',
    href: '/tours',
  },
  secondaryCTA = {
    text: 'View Gallery',
    href: '/gallery',
  },
  showSearch = true,
  backgroundImage = '/NMGTOURS.png',
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
      className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image - Fixed position for full viewport coverage */}
      <div
        className="fixed inset-0 -z-20"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
        aria-hidden="true"
      >
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="fixed inset-0 bg-gradient-to-b from-black/50 via-black/70 to-emerald-800/95 -z-10"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div
        className={`relative z-10 max-w-5xl pt-20 transition-all duration-1000 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Subtitle */}
        {subtitle && (
          <p
            className="text-emerald-400 text-sm md:text-base font-semibold uppercase tracking-wider mb-4 transition-all duration-1000 delay-100"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Main Title */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-caveat text-white leading-tight transition-all duration-1000 delay-200"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {title}
        </h1>

        {/* Decorative Line */}
        <div
          className="w-32 h-1 bg-emerald-400 mx-auto mb-6 rounded-full transition-all duration-1000 delay-300"
          aria-hidden="true"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          }}
        />

        {/* Description */}
        <p
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-zinc-200 leading-relaxed transition-all duration-1000 delay-400"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {description}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-8 justify-center transition-all duration-1000 delay-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <Link
            href={primaryCTA.href}
            className="px-8 py-4 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition-all duration-300 text-lg shadow-lg hover:shadow-emerald-400/50 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
            aria-label={primaryCTA.text}
          >
            {primaryCTA.text}
          </Link>
          <Link
            href={secondaryCTA.href}
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 text-lg border border-white/20 hover:border-white/40 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
            aria-label={secondaryCTA.text}
          >
            {secondaryCTA.text}
          </Link>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div
            className="w-full max-w-2xl mt-8 mx-auto transition-all duration-1000 delay-600"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-6 py-4 flex items-center gap-3 hover:border-emerald-400/50 transition-colors">
              <svg
                className="w-5 h-5 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <label htmlFor="hero-search" className="sr-only">
                Search tours, locations, experiences
              </label>
              <input
                id="hero-search"
                type="search"
                placeholder="Search tours, locations, experiences..."
                className="bg-transparent flex-1 outline-none text-white placeholder-zinc-400 focus:placeholder-zinc-500 transition-colors"
                aria-label="Search tours"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition-all duration-300 text-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label="Search"
              >
                Search
              </button>
            </div>
          </div>
        )}
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
