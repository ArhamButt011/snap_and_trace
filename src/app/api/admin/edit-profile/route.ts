import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'path'
import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'
import { addNotification } from '@/lib/notifications'

const SECRET_KEY = process.env.JWT_SECRET as string

// export const config = { runtime: 'experimental-edge' }
export const runtime = 'nodejs'


type UpdateData = {
    username?: string
    image?: string
}

export async function PUT(req: Request) {
    try {
        const formData = await req.formData()
        const id = formData.get('id') as string
        const username = formData.get('name') as string
        const file = formData.get('file')

        if (!id) {
            return NextResponse.json({ status: 'fail', error: 'No _id provided' })
        }

        const client = await clientPromise
        const db = client.db('snap_and_trace')
        const usersCollection = db.collection('users')

        const existingUser = await usersCollection.findOne({
            _id: new ObjectId(id),
        })
        if (!existingUser) {
            return NextResponse.json({ status: 'fail', error: 'User not found' })
        }

        const updateData: UpdateData = {}

        if (username && username !== existingUser.username) {
            updateData.username = username
        }

        if (file && file instanceof Blob) {
            const arrayBuffer = await file.arrayBuffer()
            const buffer = new Uint8Array(arrayBuffer)

            const uploadsDir = path.join(process.cwd(), 'public/uploads')

            if (existingUser.image) {
                const oldImagePath = path.join(
                    uploadsDir,
                    path.basename(existingUser.image),
                )
                try {
                    await fs.unlink(oldImagePath)
                    console.log(`Deleted old image: ${oldImagePath}`)
                } catch (error) {
                    console.warn(`Failed to delete old image: ${oldImagePath}`, error)
                }
            }

            // Save the new image
            const fileName = `${id}_${Date.now()}_${file.name}`
            const filePath = path.join(uploadsDir, fileName)
            await fs.writeFile(filePath, buffer)
            updateData.image = `/uploads/${fileName}`
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({
                status: 'success',
                message: 'No changes detected, user data remains the same',
                data: existingUser,
            })
        }

        const result = await usersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData },
        )

        if (result.modifiedCount === 0) {
            return NextResponse.json({ status: 'fail', error: 'No document updated' })
        }

        const updatedUser = await usersCollection.findOne({ _id: new ObjectId(id) })
        if (!updatedUser) {
            return NextResponse.json({
                status: 'fail',
                error: 'User not found after update',
            })
        }

        const newToken = jwt.sign(
            {
                id: updatedUser._id.toString(),
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
            },
            SECRET_KEY,
            { expiresIn: '24h' },
        )

        if (
            updatedUser.role !== 'admin' &&
            (updateData.username || updateData.image)
        ) {
            await addNotification(id, '', 'profile_update')
        }

        return NextResponse.json({
            status: 'success',
            message: 'User updated successfully',
            data: updatedUser,
            token: newToken,
        })
    } catch (e) {
        console.error(e)
        return NextResponse.json({
            status: 'fail',
            error: e instanceof Error ? e.message : 'Unknown error occurred',
        })
    }
}
