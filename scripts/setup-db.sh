#!/bin/bash
set -e

# Database Setup Script
# Sets up the database schema and optionally seeds data

echo "🗄️  Setting up database..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL not set. Please configure .env file."
  exit 1
fi

# Generate Prisma Client
echo "🔨 Generating Prisma client..."
pnpm db:generate

# Push schema to database (creates tables)
echo "📊 Pushing schema to database..."
pnpm db:push

# Test connection
echo "🔌 Testing connection..."
pnpm tsx scripts/test-db-connection.ts

# Ask about seeding
if [ "$1" == "--seed" ]; then
  echo "🌱 Seeding database with sample data..."
  pnpm db:seed
fi

echo "✅ Database setup complete!"
