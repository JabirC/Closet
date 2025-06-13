//src/app/api/clothes/route.js

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

    const clothes = await db.clothingItem.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ clothes })
  } catch (error) {
    console.error('Error fetching clothes:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check upload limits
    const user = await db.user.findUnique({
      where: { id: session.user.id }
    })

    const uploadLimit = user.tier === 'free' ? 10 : 100
    
    if (user.uploadCount >= uploadLimit) {
      return NextResponse.json({ 
        error: 'Upload limit reached. Please upgrade your plan.' 
      }, { status: 403 })
    }

    const { name, category, tags, imageUrl } = await request.json()

    const clothingItem = await db.clothingItem.create({
      data: {
        name,
        category,
        tags,
        imageUrl,
        userId: session.user.id
      }
    })

    // Increment upload count
    await db.user.update({
      where: { id: session.user.id },
      data: { uploadCount: { increment: 1 } }
    })

    return NextResponse.json({ clothingItem })
  } catch (error) {
    console.error('Error creating clothing item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}