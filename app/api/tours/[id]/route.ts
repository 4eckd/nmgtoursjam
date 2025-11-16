/**
 * Tour Detail API Route
 * GET /api/tours/[id] - Get single tour by ID or slug
 * PATCH /api/tours/[id] - Update tour (admin only - not yet implemented)
 * DELETE /api/tours/[id] - Soft delete tour (admin only - not yet implemented)
 */

import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  handleApiError,
  handleCORS,
  createApiError,
} from '@/lib/api-utils'

// ============================================
// GET /api/tours/[id]
// ============================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Find tour by ID or slug
    const tour = await prisma.tour.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        isActive: true,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            icon: true,
          },
        },
        images: {
          orderBy: { order: 'asc' },
        },
        reviews: {
          where: {
            isApproved: true,
            isHidden: false,
          },
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 20, // Limit to 20 most recent reviews
        },
        availability: {
          where: {
            date: { gte: new Date() },
            isBlocked: false,
          },
          orderBy: { date: 'asc' },
          take: 60, // Next 60 days
        },
        _count: {
          select: {
            reviews: true,
            bookings: true,
          },
        },
      },
    })

    if (!tour) {
      throw createApiError('Tour not found', 404, 'TOUR_NOT_FOUND')
    }

    // Calculate average rating
    const avgRating = await prisma.review.aggregate({
      where: {
        tourId: tour.id,
        isApproved: true,
      },
      _avg: { rating: true },
      _count: true,
    })

    // Add calculated fields
    const tourWithStats = {
      ...tour,
      averageRating: avgRating._avg.rating || 0,
      reviewCount: avgRating._count,
      bookingCount: tour._count.bookings,
    }

    return successResponse(tourWithStats)
  } catch (error) {
    return handleApiError(error)
  }
}

// ============================================
// OPTIONS /api/tours/[id] (CORS)
// ============================================

export async function OPTIONS() {
  return handleCORS()
}

// ============================================
// PATCH /api/tours/[id] (Future: Admin only)
// ============================================

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   // TODO: Implement after authentication is set up
//   return errorResponse('Not implemented', 501, 'NOT_IMPLEMENTED')
// }

// ============================================
// DELETE /api/tours/[id] (Future: Admin only)
// ============================================

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   // TODO: Implement after authentication is set up
//   // Should soft-delete by setting isActive: false
//   return errorResponse('Not implemented', 501, 'NOT_IMPLEMENTED')
// }
