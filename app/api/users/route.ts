/* eslint-disable @typescript-eslint/no-explicit-any */
// -----------------------------
// FILE: app/api/claims/route.ts
// List and Create claims
// -----------------------------
import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '../_helpers/response'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const lgaId = url.searchParams.get('lgaId')
    const category = url.searchParams.get('category')
    const page = Number(url.searchParams.get("page") || 1)
    const limit = Number(url.searchParams.get("limit") || 3)
    const query = url.searchParams.get("query")

    const skip = (page - 1) * limit

    const where: any = {}
    if (lgaId) where.lgaId = lgaId
    if (category) where.category = category

    // 1️⃣ count total rows
    const total_users = await prisma.profile.count({ where })

    // 2️⃣ fetch paginated rows
    const users = await prisma.profile.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
    
      }
    })

    const results = {
      status: "ok",
      request_id: 1,
      parameters: {
        query: query || "",
        page,
        limit,
      },
      data: {
        count: total_users,
        data: users,
      },
    }

    return jsonResponse(results)

  } catch (err: any) {
    return errorResponse(err.message)
  }
}