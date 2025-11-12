/* eslint-disable @typescript-eslint/no-explicit-any */
// -----------------------------
// FILE: app/api/lgas/route.ts
// list and create LGA
// -----------------------------
import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '../_helpers/response'


export async function GET() {
try {
const lgas = await prisma.lGA.findMany({ include: { state: true } })

return jsonResponse(lgas)
} catch (err: any) {
return errorResponse(err.message)
}
}


export async function POST(req: Request) {
try {
const body = await req.json()
const { name, stateId } = body
if (!name || !stateId) return errorResponse('name and stateId are required', 400)
const lga = await prisma.lGA.create({ data: { name, stateId } })
return jsonResponse(lga, 201)
} catch (err: any) {
return errorResponse(err.message)
}
}