'use client'

/**
 * Re-exports from NextAuth for cleaner imports
 * TRACK 4: Authentication - Now using actual NextAuth functionality
 */
export { useSession, signOut } from 'next-auth/react'
export { SessionProvider } from 'next-auth/react'
