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

    // Verify the clothing item belongs to the user
    const clothingItem = await db.clothingItem.findFirst({
      where: {
        id: id,
        userId: session.user.id
      }
    })

    if (!clothingItem) {
      return NextResponse.json({ error: 'Clothing item not found' }, { status: 404 })
    }

    // Delete the clothing item (this will cascade delete outfit items)
    await db.clothingItem.delete({
      where: { id: id }
    })

    // Decrease upload count
    await db.user.update({
      where: { id: session.user.id },
      data: { uploadCount: { decrement: 1 } }
    })

    return NextResponse.json({ message: 'Clothing item deleted successfully' })
  } catch (error) {
    console.error('Error deleting clothing item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}