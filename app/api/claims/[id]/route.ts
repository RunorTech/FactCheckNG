/* eslint-disable @typescript-eslint/no-explicit-any */
// -----------------------------
// FILE: app/api/claims/[id]/route.ts
// Read, Update, Delete a claim
// -----------------------------
import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '../../_helpers/response'


export async function GET(_req: Request, { params }: { params: { id: string } }) {
try {
const claim = await prisma.claim.findUnique({
where: { id: params.id },
include: {
lga: { include: { state: true } },
evidence: true,
citations: true,
comments: { include: { replies: true } },
likes: true
}
})
if (!claim) return errorResponse('Claim not found', 404)
return jsonResponse(claim)
} catch (err: any) {
return errorResponse(err.message)
}
}


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
try {
const body = await req.json()
const allowed = [
'title', 'description', 'verdict', 'verdictSummary', 'verdictDate', 'investigatorNotes', 'investigatorId', 'views', 'isAnonymous', 'category'
]
const data: any = {}
for (const k of allowed) if (body[k] !== undefined) data[k === 'verdictSummary' ? 'verdictSummary' : k] = body[k]


const updated = await prisma.claim.update({ where: { id: params.id }, data })
return jsonResponse(updated)
} catch (err: any) {
return errorResponse(err.message)
}
}


export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
try {
await prisma.claim.delete({ where: { id: params.id } })
return new Response(null, { status: 204 })
} catch (err: any) {
return errorResponse(err.message)
}
}