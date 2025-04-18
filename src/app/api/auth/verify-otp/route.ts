import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export const POST = async (req: NextRequest) => {
    const { email, otp } = await req.json()

    if (!email || !otp) {
        return NextResponse.json(
            { success: false, message: 'Email and OTP are required' },
            { status: 400 }
        )
    }

    try {
        const client = await clientPromise
        const db = client.db('snap_and_trace')
        const usersCollection = db.collection('users')

        const user = await usersCollection.findOne({ email })

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Email not found' },
                { status: 400 }
            )
        }

        const now = new Date()
        const otpExpiresAt = new Date(user.otpExpiresAt)

        if (now > otpExpiresAt) {
            return NextResponse.json(
                { success: false, message: 'OTP has expired. Please request a new one.' },
                { status: 400 }
            )
        }

        if (otp === user.otp) {
            await usersCollection.updateOne(
                { email },
                { $unset: { otp: "", otpExpiresAt: "" } }
            )

            return NextResponse.json(
                { success: true, message: 'OTP verified successfully' },
                { status: 200 }
            )
        } else {
            return NextResponse.json(
                { success: false, message: 'Invalid OTP' },
                { status: 400 }
            )
        }
    } catch (error) {
        console.error('Error verifying OTP:', error)
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        )
    }
}
