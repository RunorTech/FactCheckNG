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


const where: any = {}
if (lgaId) where.lgaId = lgaId
if (category) where.category = category


const claims = await prisma.claim.findMany({
where,
include: { lga: { include: { state: true } }, evidence: true, citations: true, comments: true }
})

return jsonResponse(claims)
} catch (err: any) {
return errorResponse(err.message)
}
}


export async function POST(req: Request) {
try {
const body = await req.json()
// const required = ['userId', 'title', 'description', 'lgaId', 'category']
// for (const r of required) if (!body[r]) return errorResponse(`${r} is required`, 400)


const claim = await prisma.claim.create({
data: {
title: body.title,
description: body.description,
category: body.category,

}
})
    console.log(claim)

return jsonResponse(claim, 201)
} catch (err: any) {
    console.log(err)

return errorResponse(err.message)
}
}