import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL + "?statement_cache_size=0",
      },
    },
  })
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL + "?statement_cache_size=0",
        },
      },
    })
  }
  prisma = (global as any).prisma
}

export default prisma

export async function connectPrisma() {
  try {
    await prisma.$connect()
  } catch (error) {
    console.error('Error connecting to the database', error)
    throw error
  }
}

export async function disconnectPrisma() {
  await prisma.$disconnect()
}