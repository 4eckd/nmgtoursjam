#!/bin/bash
set -e

# Build script with database integration
# Automatically handles Prisma generation and database setup

echo "🚀 Starting build with database integration..."

# Step 1: Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "⚠️  DATABASE_URL not set - skipping database operations"
  echo "📦 Building without Prisma client..."
  pnpm build:static
  exit 0
fi

echo "✅ DATABASE_URL found"

# Step 2: Generate Prisma Client
echo "🔨 Generating Prisma client..."
if pnpm db:generate 2>/dev/null; then
  echo "✅ Prisma client generated successfully"
else
  echo "⚠️  Prisma generation failed - falling back to static build"
  pnpm build:static
  exit 0
fi

# Step 3: Check if database is accessible
echo "🔌 Testing database connection..."
if pnpm tsx scripts/test-db-quick.ts 2>/dev/null; then
  echo "✅ Database connection successful"
else
  echo "⚠️  Database connection failed - continuing with build"
fi

# Step 4: Build Next.js
echo "📦 Building Next.js application..."
pnpm build:next

echo "✨ Build completed successfully!"
