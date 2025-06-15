// src/app/api/clothes/[id]/route.js
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

    // Await params before using
    const { id } = await params

    // Start a transaction to handle all related operations
    await db.$transaction(async (tx) => {
      // First, find all outfits that contain this clothing item
      const outfitsWithItem = await tx.outfit.findMany({
        where: {
          userId: session.user.id,
          items: {
            some: {
              clothingItemId: id
            }
          }
        },
        include: {
          items: true
        }
      })

      // Check which outfits will become empty after removing this item
      const outfitsToDelete = outfitsWithItem.filter(outfit => 
        outfit.items.length === 1 && outfit.items[0].clothingItemId === id
      )

      // Delete outfits that will become empty
      if (outfitsToDelete.length > 0) {
        await tx.outfit.deleteMany({
          where: {
            id: {
              in: outfitsToDelete.map(outfit => outfit.id)
            }
          }
        })
      }

      // Verify the clothing item belongs to the user
      const clothingItem = await tx.clothingItem.findFirst({
        where: {
          id: id,
          userId: session.user.id
        }
      })

      if (!clothingItem) {
        throw new Error('Clothing item not found')
      }

      // Delete the clothing item (this will cascade delete outfit items)
      await tx.clothingItem.delete({
        where: { id: id }
      })

      // Decrease upload count
      await tx.user.update({
        where: { id: session.user.id },
        data: { uploadCount: { decrement: 1 } }
      })
    })

    return NextResponse.json({ 
      message: 'Clothing item deleted successfully',
      updatedUploadCount: true 
    })
  } catch (error) {
    console.error('Error deleting clothing item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}