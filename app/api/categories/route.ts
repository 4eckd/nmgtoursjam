import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/categories - List all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { tours: true },
        },
      },
    })

    return NextResponse.json({ categories, count: categories.length })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
