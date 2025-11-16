// Conditional Prisma import to support builds without generated client
// This allows the app to work in environments where Prisma engines can't be downloaded

let prisma: any

try {
  // Dynamic require to avoid TypeScript compilation errors
  const { PrismaClient } = require('@prisma/client')

  // PrismaClient is attached to the `global` object in development to prevent
  // exhausting your database connection limit.
  // Learn more: https://pris.ly/d/help/next-js-best-practices

  const globalForPrisma = global as unknown as { prisma: any }

  prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
} catch (error) {
  // Prisma client not generated - using null placeholder
  // App will use static data mode (app/data/tours.ts)
  prisma = null
  if (process.env.NODE_ENV === 'development') {
    console.warn('Prisma client not available - using static data mode')
  }
}

export { prisma }
export default prisma
