/* eslint-disable @typescript-eslint/no-explicit-any */
// -----------------------------
// FILE: app/api/comments/route.ts
// create and list comments (global / by claim filter)
// -----------------------------
import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '../_helpers/response'


export async function GET(req: Request) {
try {
const url = new URL(req.url)
const claimId = url.searchParams.get('claimId')
const where: any = {}
if (claimId) where.claimId = claimId
const comments = await prisma.comment.findMany({ where, include: { replies: true } })
return jsonResponse(comments)
} catch (err: any) {
return errorResponse(err.message)
}
}


export async function POST(req: Request) {
try {
const body = await req.json()
const required = ['claimId', 'userId', 'content']
for (const r of required) if (!body[r]) return errorResponse(`${r} is required`, 400)
const comment = await prisma.comment.create({ data: { claimId: body.claimId, userId: body.userId, content: body.content, parentId: body.parentId } })
return jsonResponse(comment, 201)
} catch (err: any) {
return errorResponse(err.message)
}
}