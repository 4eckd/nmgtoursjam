/**
 * Tours API Route
 * GET /api/tours - List all tours with filtering, sorting, and pagination
 * POST /api/tours - Create a new tour (admin only - not yet implemented)
 */

import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  handleApiError,
  parsePagination,
  parseSort,
  handleCORS,
} from '@/lib/api-utils'

// ============================================
// GET /api/tours
// ============================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse pagination
    const { page, limit, skip } = parsePagination(searchParams)

    // Parse sorting
    const { orderBy } = parseSort(searchParams)

    // Parse filters
    const categorySlug = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const difficulty = searchParams.get('difficulty')

    // Build where clause
    const where: any = {
      isActive: true, // Only show active tours
    }

    // Category filter
    if (categorySlug) {
      where.category = {
        slug: categorySlug,
      }
    }

    // Featured filter
    if (featured === 'true') {
      where.featured = true
    }

    // Search filter (title or description)
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { shortDesc: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) {
        where.price.gte = parseFloat(minPrice)
      }
      if (maxPrice) {
        where.price.lte = parseFloat(maxPrice)
      }
    }

    // Difficulty filter
    if (difficulty) {
      where.difficulty = difficulty.toUpperCase()
    }

    // Execute queries
    const [tours, total] = await Promise.all([
      prisma.tour.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
              icon: true,
            },
          },
          images: {
            take: 1,
            orderBy: { order: 'asc' },
          },
          _count: {
            select: {
              reviews: true,
              bookings: true,
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.tour.count({ where }),
    ])

    // Calculate average ratings for each tour
    const toursWithRatings = await Promise.all(
      tours.map(async (tour: any) => {
        const avgRating = await prisma.review.aggregate({
          where: { tourId: tour.id, isApproved: true },
          _avg: { rating: true },
        })

        return {
          ...tour,
          averageRating: avgRating._avg.rating || 0,
          reviewCount: tour._count.reviews,
          bookingCount: tour._count.bookings,
        }
      })
    )

    return successResponse(toursWithRatings, {
      page,
      limit,
      total,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

// ============================================
// OPTIONS /api/tours (CORS)
// ============================================

export async function OPTIONS() {
  return handleCORS()
}

// ============================================
// POST /api/tours (Future: Admin only)
// ============================================

// export async function POST(request: NextRequest) {
//   // TODO: Implement after authentication is set up
//   return errorResponse('Not implemented', 501, 'NOT_IMPLEMENTED')
// }
