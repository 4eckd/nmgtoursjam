'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'

interface GalleryImage {
  url: string
  alt: string
  caption: string | null
}

interface ImageGalleryProps {
  images: GalleryImage[]
  tourTitle: string
}

export default function ImageGallery({ images, tourTitle }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  if (images.length === 0) {
    return (
      <div className="relative h-[60vh] bg-gradient-to-br from-emerald-600 to-emerald-900">
        <div className="absolute inset-0 flex items-center justify-center text-white/50">
          Tour Image Coming Soon
        </div>
      </div>
    )
  }

  const mainImage = images[currentIndex]
  const thumbnails = images.slice(0, 5) // Show max 5 thumbnails

  return (
    <>
      {/* Main Gallery */}
      <div className="relative h-[60vh] bg-black">
        {/* Main Image */}
        <div className="relative h-full w-full">
          {mainImage.url.startsWith('/tours/') ? (
            <Image
              src={mainImage.url}
              alt={mainImage.alt}
              fill
              className="object-cover object-center"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center text-white/50">
              Tour Image Coming Soon
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Image Caption */}
          {mainImage.caption && (
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-sm sm:text-base">{mainImage.caption}</p>
            </div>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Expand Button */}
          <button
            onClick={() => openLightbox(currentIndex)}
            className="absolute bottom-6 right-6 p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all z-10"
            aria-label="View fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-6 right-6 px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-full text-sm z-10">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-6 right-6 flex gap-2 overflow-x-auto z-10 scrollbar-hide">
            {thumbnails.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                  currentIndex === index
                    ? 'ring-4 ring-emerald-400 scale-105'
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
              >
                {image.url.startsWith('/tours/') ? (
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-900" />
                )}
              </button>
            ))}
            {images.length > 5 && (
              <div className="h-20 w-28 flex-shrink-0 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white text-sm font-semibold">
                +{images.length - 5} more
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all z-20"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm z-20">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Main Lightbox Image */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto p-12">
            {mainImage.url.startsWith('/tours/') ? (
              <Image
                src={mainImage.url}
                alt={mainImage.alt}
                fill
                className="object-contain"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center text-white/50">
                Tour Image Coming Soon
              </div>
            )}
          </div>

          {/* Navigation in Lightbox */}
          {images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all z-20"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Caption in Lightbox */}
          {mainImage.caption && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-3xl px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg z-20">
              <p className="text-center">{mainImage.caption}</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
