/* eslint-disable @typescript-eslint/no-explicit-any */
// -----------------------------
// FILE: app/api/claims/[id]/route.ts
// Read, Update, Delete a claim
// -----------------------------
import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '../../_helpers/response'
import { NextRequest } from 'next/server'
import { emitWsEvent } from '@/lib/socket'

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    const claim = await prisma.claim.findUnique({
      where: { id },
      include: {
        lga: { include: { state: true } },
        evidence: true,
        citations: true,
        comments: { include: { replies: true } },
        likes: true,
        profile: true, // ✅ Include author info if you’ve related Claim → Profile
      },
    })

    if (!claim) return errorResponse('Claim not found', 404)
    return jsonResponse({claim: claim})
  } catch (err: any) {
    return errorResponse(err.message)
  }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const body = await req.json()

    const allowed = [
      'title',
      'description',
      'verdict',
      'verdictSummary',
      'verdictDate',
      'investigatorNotes',
      'investigatorId',
      'views',
      'isAnonymous',
      'category',
    ]

    const data: Record<string, any> = {}
    for (const k of allowed) if (body[k] !== undefined) data[k] = body[k]

    const updated = await prisma.claim.update({ where: { id }, data })
    return jsonResponse(updated)
  } catch (err: any) {
    return errorResponse(err.message)
  }
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    await prisma.claim.delete({ where: { id } })
    await emitWsEvent("claim:deleted", new Date().toISOString());
        
    return jsonResponse({ message: "Claim deleted successfully"}, 201)
    // return new Response(null, { status: 204 })
  } catch (err: any) {
    return errorResponse(err.message)
  }
}
