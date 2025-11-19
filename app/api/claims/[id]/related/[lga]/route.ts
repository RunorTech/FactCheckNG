/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '../../../../_helpers/response'
import { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, context: { params: Promise<{ lga: string, id: string }> }) {
  try {
    const { lga, id } = await context.params

    const lgaBd = await prisma.lGA.findFirst({where: {name: lga}})
    if(!lgaBd) return errorResponse('Lga not found', 404)

    const claims = await prisma.claim.findMany({
      where: { lga: lgaBd, NOT: { id } },
      include: {
        lga: { include: { state: true } },
        evidence: true,
        citations: true,
        comments: { include: { replies: true } },
        likes: true,
        profile: true, // ✅ Include author info if you’ve related Claim → Profile
      },
    })

    if (!claims) return errorResponse('Claim not found', 404)
    return jsonResponse({claims: claims.slice(0, 3)})
  } catch (err: any) {
    return errorResponse(err.message)
  }
}