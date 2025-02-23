import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Delete existing records
  await prisma.user.deleteMany({})

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'ADMIN',
      },
    }),
    prisma.user.create({
      data: {
        email: 'user@example.com',
        name: 'Regular User',
        role: 'USER',
      },
    }),
  ])

  console.log('Seeded users:', users)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 