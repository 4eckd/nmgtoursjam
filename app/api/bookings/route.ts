import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// GET /api/bookings - List user's bookings
export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        tour: {
          select: {
            title: true,
            coverImage: true,
            duration: true,
            city: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ bookings, count: bookings.length })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { tourId, tourDate, guests, guestName, guestEmail, guestPhone, specialRequests } = body

    const userId = session.user.id

    // Get tour details
    const tour = await prisma.tour.findUnique({
      where: { id: tourId },
    })

    if (!tour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      )
    }

    // Calculate total price
    const totalPrice = Number(tour.price) * guests

    // Check availability
    const availability = await prisma.availability.findFirst({
      where: {
        tourId,
        date: new Date(tourDate),
        isBlocked: false,
      },
    })

    if (availability && availability.booked + guests > availability.slots) {
      return NextResponse.json(
        { error: 'Not enough slots available' },
        { status: 400 }
      )
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        tourId,
        tourDate: new Date(tourDate),
        guests,
        totalPrice,
        guestName,
        guestEmail,
        guestPhone,
        specialRequests,
        status: 'PENDING',
        paymentStatus: 'PENDING',
      },
      include: {
        tour: true,
      },
    })

    // Update availability
    if (availability) {
      await prisma.availability.update({
        where: { id: availability.id },
        data: { booked: { increment: guests } },
      })
    }

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}
