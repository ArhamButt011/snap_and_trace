import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import clientPromise from '@/lib/mongodb'
import nodemailer from 'nodemailer'

const emailSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validation = emailSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
    }

    const { email } = validation.data

    const client = await clientPromise
    const db = client.db('snap_and_trace')
    const usersCollection = db.collection('users')

    const user = await usersCollection.findOne({ email })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const otp = Math.floor(10000 + Math.random() * 90000).toString()
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await usersCollection.updateOne(
      { email },
      { $set: { otp, otpExpiresAt } }
    )

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Snap & Trace" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Snap & Trace OTP',
      html: `<p>Your OTP is: <b>${otp}</b>. It will expire in 10 minutes.</p>`,
    })

    return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 })
  } catch (err: any) {
    console.error('Send OTP Error:', err)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
