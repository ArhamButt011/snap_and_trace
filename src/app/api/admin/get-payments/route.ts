import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

export async function GET(req: Request) {
    try {
        const client = await clientPromise
        const db = client.db('snap_and_trace')
        const paymentCollection = db.collection('payments')

        const url = new URL(req.url)
        const page = parseInt(url.searchParams.get('page') || '1', 10)
        const limit = parseInt(url.searchParams.get('limit') || '10', 10)
        const skip = (page - 1) * limit
        const searchQuery = url.searchParams.get('search') || ''

        const matchStage: any = {}

        if (searchQuery) {
            const searchRegex = { $regex: searchQuery, $options: 'i' }
            matchStage.$or = [
                { file_name: searchRegex },
                { trace_type: searchRegex },
                { total_charges: searchRegex },
            ]
        }

        // Main data pipeline
        const pipeline = [
            { $match: matchStage },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays: true,
                },
            },
        ]

        const payments = await paymentCollection.aggregate(pipeline).toArray()
        const totalPayments = await paymentCollection.countDocuments(matchStage)

        // Sum of total_charges
        const sumPipeline = [
            { $match: matchStage },
            {
                $group: {
                    _id: null,
                    totalChargesSum: {
                        $sum: {
                            $toDouble: '$total_charges', // convert to number if stored as string
                        },
                    },
                },
            },
        ]

        const sumResult = await paymentCollection.aggregate(sumPipeline).toArray()
        const totalChargesSum = sumResult[0]?.totalChargesSum || 0

        return NextResponse.json(
            {
                payments,
                totalPayments,
                totalChargesSum,
                page,
                totalPages: Math.ceil(totalPayments / limit),
            },
            { status: 200 },
        )
    } catch (error) {
        console.log('Error fetching payments:', error)
        return NextResponse.json(
            { error: 'Failed to fetch payments.' },
            { status: 500 },
        )
    }
}
