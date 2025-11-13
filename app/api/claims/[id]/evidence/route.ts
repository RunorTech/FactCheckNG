/* eslint-disable @typescript-eslint/no-explicit-any */
// -----------------------------
// FILE: app/api/claims/[id]/evidence/route.ts
// Create evidence for a claim, list evidence
// -----------------------------
import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '@/app/api/_helpers/response'
import { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const evidence = await prisma.evidence.findMany({ where: { claimId: id } })
    return jsonResponse(evidence)
  } catch (err: any) {
    return errorResponse(err.message)
  }
}

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const body = await req.json()

    if (!body.type || !body.url) {
      return errorResponse('type and url are required', 400)
    }

    const ev = await prisma.evidence.create({
      data: {
        claimId: id,
        type: body.type,
        url: body.url,
        caption: body.caption,
      },
    })

    return jsonResponse(ev, 201)
  } catch (err: any) {
    return errorResponse(err.message)
  }
}
