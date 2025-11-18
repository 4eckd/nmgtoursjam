#!/bin/bash
set -e

# CI/CD Build Script
# Optimized for GitHub Actions and Vercel deployments

echo "🤖 CI/CD Build Starting..."

# Environment detection
if [ -n "$VERCEL" ]; then
  echo "📍 Detected: Vercel deployment"
  BUILD_ENV="vercel"
elif [ -n "$GITHUB_ACTIONS" ]; then
  echo "📍 Detected: GitHub Actions"
  BUILD_ENV="github"
else
  echo "📍 Detected: Local build"
  BUILD_ENV="local"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  pnpm install --frozen-lockfile
fi

# Handle database operations
if [ -n "$DATABASE_URL" ]; then
  echo "🔨 Generating Prisma client for production..."

  # Try to generate, but don't fail build if it fails
  if PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 pnpm prisma generate 2>/dev/null; then
    echo "✅ Prisma client generated"

    # For Vercel, also push schema
    if [ "$BUILD_ENV" == "vercel" ] && [ "$VERCEL_ENV" == "production" ]; then
      echo "📊 Pushing schema to production database..."
      pnpm prisma db push --accept-data-loss || echo "⚠️  Schema push skipped"
    fi
  else
    echo "⚠️  Prisma generation skipped - using static data mode"
  fi
else
  echo "ℹ️  DATABASE_URL not set - skipping Prisma generation"
fi

# Build the application
echo "🏗️  Building Next.js application..."
pnpm next build

echo "✨ CI/CD Build completed!"
