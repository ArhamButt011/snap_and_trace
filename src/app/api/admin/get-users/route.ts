import { NextResponse } from 'next/server'
import { Filter } from 'mongodb'
import clientPromise from '@/lib/mongodb'

interface User {
    name?: string
    email?: string
}

export async function GET(req: Request) {
    try {
        const client = await clientPromise
        const db = client.db('snap_and_trace')
        const usersCollection = db.collection('users')
        const url = new URL(req.url)
        const page = parseInt(url.searchParams.get('page') || '1', 10)
        const limit = parseInt(url.searchParams.get('limit') || '10', 10)
        const skip = (page - 1) * limit
        const searchQuery = url.searchParams.get('search') || ''
        let filter: Filter<User> = { role: 'admin' }

        if (searchQuery) {
            const searchRegex = { $regex: searchQuery, $options: 'i' }
            filter = {
                ...filter,
                $or: [
                    { username: searchRegex },
                    { email: searchRegex },
                    { createdAt: searchRegex },
                ],
            }
        }

        const users = await usersCollection
            .find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray()
        const totalUsers = await usersCollection.countDocuments(filter)

        return NextResponse.json(
            {
                users: users,
                totalUsers,
                page,
                totalPages: Math.ceil(totalUsers / limit),
            },
            { status: 200 },
        )
    } catch (error) {
        console.log('Error fetching users:', error)
        return NextResponse.json(
            { error: 'Failed to fetch users.' },
            { status: 500 },
        )
    }
}

export async function OPTIONS() {
    return NextResponse.json({ allowedMethods: ['GET'] })
}
