import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    // Verify the outfit belongs to the user
    const outfit = await db.outfit.findFirst({
      where: {
        id: id,
        userId: session.user.id
      }
    })

    if (!outfit) {
      return NextResponse.json({ error: 'Outfit not found' }, { status: 404 })
    }

    // Delete the outfit (this will cascade delete outfit items)
    await db.outfit.delete({
      where: { id: id }
    })

    return NextResponse.json({ message: 'Outfit deleted successfully' })
  } catch (error) {
    console.error('Error deleting outfit:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}