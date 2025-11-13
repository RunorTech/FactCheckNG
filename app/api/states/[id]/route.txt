/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '../../_helpers/response'


export async function GET(_req: Request, { params }: { params: { id: string } }) {
try {
const state = await prisma.state.findUnique({ where: { id: params.id }, include: { lgas: true } })
if (!state) return errorResponse('State not found', 404)
return jsonResponse(state)
} catch (err: any) {
return errorResponse(err.message)
}
}


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
try {
const body = await req.json()
const updated = await prisma.state.update({ where: { id: params.id }, data: { name: body.name } })
return jsonResponse(updated)
} catch (err: any) {
return errorResponse(err.message)
}
}


export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
try {
await prisma.state.delete({ where: { id: params.id } })
return new Response(null, { status: 204 })
} catch (err: any) {
return errorResponse(err.message)
}
}