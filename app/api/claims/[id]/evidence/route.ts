/* eslint-disable @typescript-eslint/no-explicit-any */
// -----------------------------
// FILE: app/api/claims/[id]/evidence/route.ts
// Create evidence for a claim, list evidence
// -----------------------------
import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '@/app/api/_helpers/response'


export async function GET(_req: Request, { params }: { params: { id: string } }) {
try {
const evidence = await prisma.evidence.findMany({ where: { claimId: params.id } })
return jsonResponse(evidence)
} catch (err: any) {
return errorResponse(err.message)
}
}


export async function POST(req: Request, { params }: { params: { id: string } }) {
try {
const body = await req.json()
if (!body.type || !body.url) return errorResponse('type and url are required', 400)
const ev = await prisma.evidence.create({ data: { claimId: params.id, type: body.type, url: body.url, caption: body.caption } })
return jsonResponse(ev, 201)
} catch (err: any) {
return errorResponse(err.message)
}
}