import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, newPassword } = await req.json()

    if (!email || !newPassword) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('snap_and_trace')
    const usersCollection = db.collection('users')

    const user = await usersCollection.findOne({ email })
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await usersCollection.updateOne(
      { email },
      {
        $set: { password: hashedPassword },
        $unset: { otp: '', otpExpiresAt: '' },
      }
    )

    return NextResponse.json({ success: true, message: 'Password reset successfully' }, { status: 200 })
  } catch (error) {
    console.error('Reset Password Error:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
