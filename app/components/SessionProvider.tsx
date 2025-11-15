'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

/**
 * Client-side SessionProvider wrapper for NextAuth
 * Wraps the app to provide session context
 */
export default function SessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
