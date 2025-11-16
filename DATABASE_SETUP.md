# Database Setup Guide

This guide explains how to set up the database for NMG Tours Jamaica.

## Current Status

**Mode**: Static Data Fallback
- The application uses static tour data from `app/data/tours.ts`
- Database abstraction layer in `lib/db.ts` automatically falls back to static data
- Build succeeds with warning: "Prisma unavailable, using static data mode"

## Database Architecture

### Abstraction Layer

The `lib/db.ts` file provides a database abstraction layer that:
1. Attempts to initialize Prisma client
2. Falls back to static data if Prisma is unavailable
3. Provides consistent API for data access regardless of mode

### Functions Available

```typescript
// Get all tours with optional filters
await getAllTours()

// Get featured tours only
await getFeaturedTours()

// Get tour by slug
await getTourBySlug(slug: string)

// Get all categories
await getAllCategories()

// Get tours by category
await getToursByCategory(categorySlug: string)

// Search tours by query
await searchTours(query: string)
```

## Production Database Setup

### Option 1: Supabase PostgreSQL (Recommended)

1. **Create Supabase Project**
   - Visit https://supabase.com and create a new project
   - Copy the PostgreSQL connection string

2. **Update Environment Variables**
   ```bash
   # Update .env file
   DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
   ```

3. **Update Prisma Schema**
   ```prisma
   // Change datasource in prisma/schema.prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

4. **Run Migrations**
   ```bash
   pnpm db:push
   ```

5. **Seed Database**
   ```bash
   # Enable seed script
   mv prisma/seed.ts.disabled prisma/seed.ts

   # Run seeding
   pnpm db:seed
   ```

## Switching from Static to Database Mode

Once database is set up, the application automatically detects it - no code changes needed!

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [NMG Tours - CLAUDE.md](./CLAUDE.md) for complete project documentation
