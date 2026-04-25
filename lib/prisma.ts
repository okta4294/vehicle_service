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
  const dbUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_tkXwDxP6gi0o@ep-nameless-dream-ao5uwcni-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
  
  // Di Next.js/Prisma versi terbaru ini, PrismaNeon menerima object config (bukan instance Pool).
  const adapter = new PrismaNeon({ connectionString: dbUrl })
  return new PrismaClient({ adapter }) // Prisma 7 mewajibkan opsi adapter!
}

export const prisma = createPrismaClient()
// Selalu override cache saat hot reload agar perubahan config terbaca
if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaFresh = prisma
