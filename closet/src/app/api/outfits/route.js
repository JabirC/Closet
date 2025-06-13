//src/app/api/outfits/route.js


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

    const outfits = await db.outfit.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            clothingItem: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ outfits })
  } catch (error) {
    console.error('Error fetching outfits:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, clothingItemIds } = await request.json()

    const outfit = await db.outfit.create({
      data: {
        name,
        userId: session.user.id,
        items: {
          create: clothingItemIds.map(id => ({
            clothingItemId: id
          }))
        }
      },
      include: {
        items: {
          include: {
            clothingItem: true
          }
        }
      }
    })

    return NextResponse.json({ outfit })
  } catch (error) {
    console.error('Error creating outfit:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}