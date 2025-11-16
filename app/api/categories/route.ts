/**
 * Categories API Route
 * GET /api/categories - List all tour categories with tour counts
 */

import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  successResponse,
  handleApiError,
  handleCORS,
} from '@/lib/api-utils'

// ============================================
// GET /api/categories
// ============================================

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { tours: { where: { isActive: true } } },
        },
      },
    })

    // Transform to include tour count as a top-level field
    const categoriesWithCounts = categories.map((category: any) => ({
      ...category,
      tourCount: category._count.tours,
    }))

    return successResponse(categoriesWithCounts, {
      total: categories.length,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

// ============================================
// OPTIONS /api/categories (CORS)
// ============================================

export async function OPTIONS() {
  return handleCORS()
}
