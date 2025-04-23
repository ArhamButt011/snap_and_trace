import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import type { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'

export async function PUT(req: NextRequest) {
  try {
    const { id, oldPassword, newPassword } = await req.json()

    if (!id || !oldPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Please provide the user ID, old password, and new password' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('snap_and_trace')
    const usersCollection = db.collection('users')

    const user = await usersCollection.findOne({ _id: new ObjectId(id) })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid old password' },
        { status: 401 },
      )
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password)
    if (isSamePassword) {
      return NextResponse.json(
        { error: 'New password cannot be the same as the old password' },
        { status: 400 },
      )
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { password: hashedNewPassword } },
    )

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: 'Failed to update password' },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error(`Error changing password: ${error}`)
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 },
    )
  }
}
