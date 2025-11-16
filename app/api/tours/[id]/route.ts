import { NextRequest, NextResponse } from 'next/server'
import { getTourBySlug } from '@/lib/db'

// GET /api/tours/[id] - Get a single tour by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Try to get by slug (most common), fallback to ID
    const tour = await getTourBySlug(id)

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
    // TODO: Add authentication check for admin role
    // TODO: Implement tour updates when database is available

    return NextResponse.json(
      { error: 'Tour updates not available in static data mode' },
      { status: 501 }
    )
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
    // TODO: Add authentication check for admin role
    // TODO: Implement tour deletion when database is available

    return NextResponse.json(
      { error: 'Tour deletion not available in static data mode' },
      { status: 501 }
    )
  } catch (error) {
    console.error('Error deleting tour:', error)
    return NextResponse.json(
      { error: 'Failed to delete tour' },
      { status: 500 }
    )
  }
}
