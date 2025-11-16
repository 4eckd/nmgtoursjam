import { NextResponse } from 'next/server'
import { getAllCategories } from '@/lib/db'

// GET /api/categories - List all categories
export async function GET() {
  try {
    const categories = await getAllCategories()

    return NextResponse.json({ categories, count: categories.length })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
