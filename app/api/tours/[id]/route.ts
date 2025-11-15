import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/tours/[id] - Get a single tour by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const tour = await prisma.tour.findFirst({
      where: {
        OR: [
          { id },
          { slug: id },
        ],
        isActive: true,
      },
      include: {
        category: true,
        images: {
          orderBy: { order: 'asc' },
        },
        reviews: {
          where: { isApproved: true, isHidden: false },
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        availability: {
          where: {
            date: { gte: new Date() },
            isBlocked: false,
          },
          orderBy: { date: 'asc' },
          take: 30,
        },
      },
    })

    if (!tour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ tour })
  } catch (error) {
    console.error('Error fetching tour:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tour' },
      { status: 500 }
    )
  }
}

// PATCH /api/tours/[id] - Update a tour (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // TODO: Add authentication check for admin role

    const tour = await prisma.tour.update({
      where: { id },
      data: body,
      include: {
        category: true,
        images: true,
      },
    })

    return NextResponse.json({ tour })
  } catch (error) {
    console.error('Error updating tour:', error)
    return NextResponse.json(
      { error: 'Failed to update tour' },
      { status: 500 }
    )
  }
}

// DELETE /api/tours/[id] - Delete a tour (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // TODO: Add authentication check for admin role

    await prisma.tour.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting tour:', error)
    return NextResponse.json(
      { error: 'Failed to delete tour' },
      { status: 500 }
    )
  }
}
