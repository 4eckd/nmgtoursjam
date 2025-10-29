import NextAuth from 'next-auth'
// import { PrismaAdapter } from '@auth/prisma-adapter'
// import { prisma } from '@/lib/prisma'
import authConfig from '@/auth.config'

/**
 * NextAuth.js v5 instance
 * Used for server-side authentication
 * NOTE: Prisma adapter temporarily commented out due to version conflict
 * Will be re-enabled after package resolution
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  ...authConfig,
})
