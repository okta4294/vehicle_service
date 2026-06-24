import ws from 'ws'
import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

// Siapkan WebSockets untuk lingkungan Node.js murni agar adapter berjalan
neonConfig.webSocketConstructor = ws

const globalForPrisma = globalThis as unknown as {
  prismaFresh: PrismaClient | undefined
}

function createPrismaClient() {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) throw new Error('DATABASE_URL is not set in environment variables')

  const adapter = new PrismaNeon({ connectionString: dbUrl })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prismaFresh ?? createPrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaFresh = prisma
