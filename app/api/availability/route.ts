/**
 * Availability API
 * Fetches tour availability for a given month
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tourId = searchParams.get('tourId')
    const year = parseInt(searchParams.get('year') || '')
    const month = parseInt(searchParams.get('month') || '')

    if (!tourId || !year || !month) {
      return NextResponse.json(
        { error: 'Missing required parameters: tourId, year, month' },
        { status: 400 }
      )
    }

    // Get first and last day of month
    const firstDay = new Date(year, month - 1, 1)
    const lastDay = new Date(year, month, 0, 23, 59, 59)

    // Fetch availability for the month
    const availability = await prisma.availability.findMany({
      where: {
        tourId,
        date: {
          gte: firstDay,
          lte: lastDay,
        },
      },
      select: {
        date: true,
        slots: true,
        booked: true,
        isBlocked: true,
      },
      orderBy: {
        date: 'asc',
      },
    })

    // Format dates as ISO strings for easier client-side handling
    const formattedAvailability = availability.map((a) => ({
      date: a.date.toISOString().split('T')[0], // YYYY-MM-DD format
      slots: a.slots,
      booked: a.booked,
      isBlocked: a.isBlocked,
    }))

    return NextResponse.json({
      availability: formattedAvailability,
      count: formattedAvailability.length,
    })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}
