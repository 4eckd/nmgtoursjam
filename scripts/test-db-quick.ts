#!/usr/bin/env tsx
/**
 * Quick Database Connection Test
 * Fast test for CI/CD - just checks if we can connect
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function quickTest() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected')
    await prisma.$disconnect()
    process.exit(0)
  } catch {
    console.error('❌ Database connection failed')
    await prisma.$disconnect()
    process.exit(1)
  }
}

// Timeout after 5 seconds
const timeout = setTimeout(() => {
  console.error('❌ Database connection timeout')
  process.exit(1)
}, 5000)

quickTest().finally(() => clearTimeout(timeout))
