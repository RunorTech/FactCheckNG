/* eslint-disable @typescript-eslint/no-explicit-any */
// -----------------------------
// FILE: app/api/likes/route.ts
// toggle like: POST to create (will fail if exists), DELETE with body to remove
// -----------------------------
import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '../_helpers/response'


export async function POST(req: Request) {
try {
const body = await req.json()
if (!body.claimId || !body.userId) return errorResponse('claimId and userId required', 400)
const like = await prisma.like.create({ data: { claimId: body.claimId, userId: body.userId } })
return jsonResponse(like, 201)
} catch (err: any) {
// unique constraint -> already liked
return errorResponse(err.message)
}
}


export async function DELETE(req: Request) {
try {
const body = await req.json()
if (!body.claimId || !body.userId) return errorResponse('claimId and userId required', 400)
await prisma.like.delete({ where: { claimId_userId: { claimId: body.claimId, userId: body.userId } } })
return new Response(null, { status: 204 })
} catch (err: any) {
return errorResponse(err.message)
}
}
