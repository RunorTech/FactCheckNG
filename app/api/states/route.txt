/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '../_helpers/response'


export async function GET() {
try {
const states = await prisma.state.findMany({ include: { lgas: true } })
return jsonResponse(states)
} catch (err: any) {
return errorResponse(err.message)
}
}


export async function POST(req: Request) {
try {
const body = await req.json()
if (!body.name) return errorResponse('name is required', 400)
const state = await prisma.state.create({ data: { name: body.name } })
return jsonResponse(state, 201)
} catch (err: any) {
return errorResponse(err.message)
}
}