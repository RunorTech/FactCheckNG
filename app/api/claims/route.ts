/* eslint-disable @typescript-eslint/no-explicit-any */
// -----------------------------
// FILE: app/api/claims/route.ts
// List and Create claims
// -----------------------------
import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '../_helpers/response'
import { getIO } from "@/lib/socket";


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
include: { lga: { include: { state: true } }, evidence: true, citations: true, comments: true, profile: true, likes: true }
})

return jsonResponse({claims: claims})
} catch (err: any) {
return errorResponse(err.message)
}
}


export async function POST(req: Request) {
try {
 const body = await req.json()
    // console.log("Incoming body:", body)
     const io = getIO();
    let profile;
    const existingProfile = await prisma.profile.findUnique({
      where: { fullName: `${body.firstName} ${body.lastName}` },
    })
    if(!existingProfile) {
    const newProfile = await prisma.profile.create({
         data: {
        id: crypto.randomUUID(),
        fullName: `${body.firstName} ${body.lastName}`,
        location: body.location,
        bio: body.career,
      },
    })
    profile = newProfile
    } else {
    profile = existingProfile
    }
    

    // 2️⃣ Create or find state
    const state = await prisma.state.upsert({
      where: { name: body.state.toLowerCase() },
      update: {},
      create: { name: body.state.toLowerCase() },
    })



    // 3️⃣ Create or find LGA
    const lga = await prisma.lGA.upsert({
      where: {
        name_stateId: {
          name: body.lga.toLowerCase(),
          stateId: state.id,
        },
      },
      update: {},
      create: {
        name: body.lga.toLowerCase(),
        stateId: state.id,
      },
    })

    // 4️⃣ Create claim
    const claim = await prisma.claim.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        isAnonymous: body.anonymous,
        attachments: body.attachments || "",
        userId: profile.id,
        lgaId: lga.id,
      },
    })
    if(claim.id){
    io?.emit("claim:created", { timestamp: new Date().toISOString(),});
    }


    return jsonResponse({ message: "Claim created successfully"}, 201)

} catch (err: any) {
    console.log(err)

return errorResponse(err.message)
}
}