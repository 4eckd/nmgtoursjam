// Database abstraction layer
// Gracefully falls back to static data when Prisma is unavailable
import { staticTours, getTourBySlug as getStaticTourBySlug, getFeaturedTours as getStaticFeaturedTours, type Tour as StaticTour } from '@/app/data/tours'

// Try to import Prisma, but gracefully handle if it's not available
let prisma: any = null
let hasPrisma = false

try {
  // Attempt to load Prisma client
  const { PrismaClient } = require('@prisma/client')
  prisma = new PrismaClient()
  hasPrisma = true
  console.log('✅ Prisma client initialized')
} catch (error) {
  console.warn('⚠️  Prisma unavailable, using static data mode')
  hasPrisma = false
}

// Database mode indicator
export const isDatabaseConnected = hasPrisma

/**
 * Get all tours
 * Falls back to static data if database is unavailable
 */
export async function getAllTours(): Promise<StaticTour[]> {
  if (!hasPrisma || !prisma) {
    return staticTours
  }

  try {
    const tours = await prisma.tour.findMany({
      where: { isActive: true },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        images: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    // Transform to match StaticTour interface
    return tours.map((tour: any) => ({
      ...tour,
      price: Number(tour.price),
      rating: 4.8, // TODO: Calculate from reviews
      reviewCount: 0, // TODO: Count from reviews
    }))
  } catch (error) {
    console.error('Database error, falling back to static data:', error)
    return staticTours
  }
}

/**
 * Get featured tours
 * Falls back to static data if database is unavailable
 */
export async function getFeaturedTours(): Promise<StaticTour[]> {
  if (!hasPrisma || !prisma) {
    return getStaticFeaturedTours()
  }

  try {
    const tours = await prisma.tour.findMany({
      where: {
        isActive: true,
        featured: true,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        images: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return tours.map((tour: any) => ({
      ...tour,
      price: Number(tour.price),
      rating: 4.8,
      reviewCount: 0,
    }))
  } catch (error) {
    console.error('Database error, falling back to static data:', error)
    return getStaticFeaturedTours()
  }
}

/**
 * Get tour by slug
 * Falls back to static data if database is unavailable
 */
export async function getTourBySlug(slug: string): Promise<StaticTour | null> {
  if (!hasPrisma || !prisma) {
    return getStaticTourBySlug(slug) || null
  }

  try {
    const tour = await prisma.tour.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        images: {
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!tour) return null

    return {
      ...tour,
      price: Number(tour.price),
      rating: 4.8,
      reviewCount: 0,
    }
  } catch (error) {
    console.error('Database error, falling back to static data:', error)
    return getStaticTourBySlug(slug) || null
  }
}

/**
 * Get all categories
 */
export async function getAllCategories() {
  if (!hasPrisma || !prisma) {
    // Extract unique categories from static data
    const categoriesMap = new Map()
    staticTours.forEach(tour => {
      if (!categoriesMap.has(tour.category.slug)) {
        categoriesMap.set(tour.category.slug, tour.category)
      }
    })
    return Array.from(categoriesMap.values())
  }

  try {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' },
    })
  } catch (error) {
    console.error('Database error, falling back to static categories:', error)
    const categoriesMap = new Map()
    staticTours.forEach(tour => {
      if (!categoriesMap.has(tour.category.slug)) {
        categoriesMap.set(tour.category.slug, tour.category)
      }
    })
    return Array.from(categoriesMap.values())
  }
}

/**
 * Filter tours by category
 */
export async function getToursByCategory(categorySlug: string): Promise<StaticTour[]> {
  if (!hasPrisma || !prisma) {
    return staticTours.filter(tour => tour.category.slug === categorySlug)
  }

  try {
    const tours = await prisma.tour.findMany({
      where: {
        isActive: true,
        category: {
          slug: categorySlug,
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        images: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    return tours.map((tour: any) => ({
      ...tour,
      price: Number(tour.price),
      rating: 4.8,
      reviewCount: 0,
    }))
  } catch (error) {
    console.error('Database error, falling back to static data:', error)
    return staticTours.filter(tour => tour.category.slug === categorySlug)
  }
}

/**
 * Search tours by query
 */
export async function searchTours(query: string): Promise<StaticTour[]> {
  const lowerQuery = query.toLowerCase()

  if (!hasPrisma || !prisma) {
    return staticTours.filter(tour =>
      tour.title.toLowerCase().includes(lowerQuery) ||
      tour.description.toLowerCase().includes(lowerQuery) ||
      tour.shortDesc.toLowerCase().includes(lowerQuery)
    )
  }

  try {
    const tours = await prisma.tour.findMany({
      where: {
        isActive: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { shortDesc: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        images: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    return tours.map((tour: any) => ({
      ...tour,
      price: Number(tour.price),
      rating: 4.8,
      reviewCount: 0,
    }))
  } catch (error) {
    console.error('Database error, falling back to static search:', error)
    return staticTours.filter(tour =>
      tour.title.toLowerCase().includes(lowerQuery) ||
      tour.description.toLowerCase().includes(lowerQuery) ||
      tour.shortDesc.toLowerCase().includes(lowerQuery)
    )
  }
}

// Cleanup on app shutdown
if (hasPrisma && prisma) {
  process.on('beforeExit', async () => {
    await prisma.$disconnect()
  })
}
