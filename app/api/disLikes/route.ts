/* eslint-disable @typescript-eslint/no-explicit-any */
// -----------------------------
// FILE: app/api/likes/route.ts
// toggle like: POST to create (will fail if exists), DELETE with body to remove
// -----------------------------
import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '../_helpers/response'
import { emitWsEvent } from '@/lib/socket';


export async function POST(req: Request) {
    try {
        const body = await req.json()
        if (!body.claimId || !body.userId) return errorResponse('claimId and userId required', 400)
        let profile;
        const existingProfile = await prisma.profile.findUnique({
            where: { userId: body.userId },
        })

        if (!existingProfile) {
            return jsonResponse({ message: "NO profile found" }, 102)

        } else {
            profile = existingProfile
        }

        const like = await prisma.like.findUnique({
            where: {
                claimId_userId: {
                    claimId: body.claimId,
                    userId: profile.id,
                }
            }
        })

        if (like) {
            await prisma.like.delete({ where: { id: like.id } })
        }
        const disLike = await prisma.disLike.upsert({
            where: {
                claimId_userId: {
                    claimId: body.claimId,
                    userId: profile.id,
                }
            }, update: {}, create: { claimId: body.claimId, userId: profile.id }
        })

        await emitWsEvent("claim:updated", new Date().toISOString());
        return jsonResponse(disLike, 201)
    } catch (err: any) {
        // unique constraint -> already liked
        return errorResponse(err.message)
    }
}


// export async function DELETE(req: Request) {
// try {
// const body = await req.json()
// if (!body.claimId || !body.userId) return errorResponse('claimId and userId required', 400)
// await prisma.like.delete({ where: { claimId_userId: { claimId: body.claimId, userId: body.userId } } })
// return new Response(null, { status: 204 })
// } catch (err: any) {
// return errorResponse(err.message)
// }
// }
