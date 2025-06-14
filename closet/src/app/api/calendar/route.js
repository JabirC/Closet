// src/app/api/calendar/route.js
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const calendarEntries = await db.calendarEntry.findMany({
      where: { userId: session.user.id },
      include: {
        outfit: {
          include: {
            items: {
              include: {
                clothingItem: true
              }
            }
          }
        }
      }
    })

    // Transform to the format expected by the frontend
    const calendar = {}
    calendarEntries.forEach(entry => {
      calendar[entry.date] = {
        outfitId: entry.outfitId,
        outfit: entry.outfit
      }
    })

    return NextResponse.json({ calendar })
  } catch (error) {
    console.error('Error fetching calendar:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { date, outfitId } = await request.json()

    // Verify the outfit belongs to the user
    const outfit = await db.outfit.findFirst({
      where: {
        id: outfitId,
        userId: session.user.id
      }
    })

    if (!outfit) {
      return NextResponse.json({ error: 'Outfit not found' }, { status: 404 })
    }

    // Upsert calendar entry
    const calendarEntry = await db.calendarEntry.upsert({
      where: {
        userId_date: {
          userId: session.user.id,
          date: date
        }
      },
      update: {
        outfitId: outfitId
      },
      create: {
        userId: session.user.id,
        date: date,
        outfitId: outfitId
      },
      include: {
        outfit: {
          include: {
            items: {
              include: {
                clothingItem: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({ calendarEntry })
  } catch (error) {
    console.error('Error updating calendar:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 })
    }

    await db.calendarEntry.deleteMany({
      where: {
        userId: session.user.id,
        date: date
      }
    })

    return NextResponse.json({ message: 'Calendar entry deleted successfully' })
  } catch (error) {
    console.error('Error deleting calendar entry:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}