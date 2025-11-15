// Temporary: Conditional Prisma import to allow builds without database connection
// This will be re-enabled once database is properly configured

let prisma: any

try {
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
  // Prisma client not generated yet - using null placeholder
  // This allows the build to succeed without database connection
  prisma = null
  console.warn('Prisma client not available - using static data mode')
}

export { prisma }
export default prisma
