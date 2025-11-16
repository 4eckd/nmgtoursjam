import { NextRequest, NextResponse } from 'next/server'
import { getAllTours, getFeaturedTours, getToursByCategory, searchTours } from '@/lib/db'

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

    let tours

    // Handle search queries
    if (search) {
      tours = await searchTours(search)
    }
    // Handle featured tours
    else if (featured === 'true') {
      tours = await getFeaturedTours()
    }
    // Handle category filter
    else if (category) {
      tours = await getToursByCategory(category)
    }
    // Get all tours
    else {
      tours = await getAllTours()
    }

    // Apply client-side filters (for static data mode)
    let filteredTours = tours

    if (difficulty) {
      filteredTours = filteredTours.filter(tour => tour.difficulty === difficulty)
    }

    if (minPrice || maxPrice) {
      filteredTours = filteredTours.filter(tour => {
        const price = tour.price
        if (minPrice && price < parseFloat(minPrice)) return false
        if (maxPrice && price > parseFloat(maxPrice)) return false
        return true
      })
    }

    return NextResponse.json({ tours: filteredTours, count: filteredTours.length })
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
    // TODO: Add authentication check for admin role
    // TODO: Implement tour creation when database is available

    return NextResponse.json(
      { error: 'Tour creation not available in static data mode' },
      { status: 501 }
    )
  } catch (error) {
    console.error('Error creating tour:', error)
    return NextResponse.json(
      { error: 'Failed to create tour' },
      { status: 500 }
    )
  }
}
