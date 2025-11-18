import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/tours - List all tours with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const search = searchParams.get('search')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = { isActive: true }

    if (featured === 'true') {
      where.featured = true
    }

    if (category) {
      where.category = { slug: category }
    }

    if (difficulty) {
      where.difficulty = difficulty
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { shortDesc: { contains: search, mode: 'insensitive' } },
      ]
    }

    const tours = await prisma.tour.findMany({
      where,
      include: {
        category: true,
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
        _count: {
          select: { reviews: true },
        },
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json({ tours, count: tours.length })
  } catch (error) {
    console.error('Error fetching tours:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tours' },
      { status: 500 }
    )
  }
}

// POST /api/tours - Create a new tour (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Add authentication check for admin role

    const tour = await prisma.tour.create({
      data: {
        ...body,
        slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      },
      include: {
        category: true,
        images: true,
      },
    })

    return NextResponse.json({ tour }, { status: 201 })
  } catch (error) {
    console.error('Error creating tour:', error)
    return NextResponse.json(
      { error: 'Failed to create tour' },
      { status: 500 }
    )
  }
}
