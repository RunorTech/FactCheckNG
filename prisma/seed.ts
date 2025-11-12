import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {
// Create example states + lgas
const lagos = await prisma.state.upsert({
where: { name: 'Lagos' },
update: {},
create: { name: 'Lagos' }
})


await prisma.lGA.upsert({
where: { name_stateId: { name: 'Ikeja', stateId: lagos.id } },
update: {},
create: { name: 'Ikeja', stateId: lagos.id }
})


console.log('Seed complete')
}


main()
.catch(e => { console.error(e); process.exit(1) })
.finally(async () => await prisma.$disconnect())