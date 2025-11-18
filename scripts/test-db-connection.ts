#!/usr/bin/env tsx
/**
 * Database Connection Test Script
 *
 * Tests the Supabase PostgreSQL connection
 * Run with: pnpm tsx scripts/test-db-connection.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function testConnection() {
  try {
    console.log('🔌 Testing database connection...')

    // Test basic connection
    await prisma.$connect()
    console.log('✅ Successfully connected to Supabase!')

    // Test query
    const result = await prisma.$queryRaw`SELECT version()`
    console.log('📊 PostgreSQL version:', result)

    // Test schema - check if tables exist
    const tables = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `
    console.log('📋 Tables in database:', tables)

    console.log('\n✨ Database connection test passed!')

  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
