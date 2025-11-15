# Database Setup - NMG Tours Jamaica

This directory contains the Prisma database schema, migrations, and seed data for the NMG Tours Jamaica booking platform.

## Quick Start

### 1. Set Up Database Connection

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Add your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://username:password@hostname:5432/database?schema=public"
```

**Recommended:** Use [Supabase](https://supabase.com/) for free PostgreSQL hosting:
1. Create a new project at https://supabase.com/dashboard
2. Go to Settings → Database
3. Copy the "Connection string" (URI format)
4. Paste into your `.env` file

### 2. Generate Prisma Client

```bash
pnpm db:generate
```

This generates the TypeScript types and Prisma Client based on your schema.

### 3. Push Schema to Database

For development (quick iteration without migrations):

```bash
pnpm db:push
```

For production (with migration history):

```bash
pnpm db:migrate
```

### 4. Seed the Database

Populate with sample tours and categories:

```bash
pnpm db:seed
```

This creates:
- 3 tour categories (Rafting, Culture, Adventure)
- 3 sample tours with images
- 30 days of availability for each tour
- 1 admin user (`admin@nmgtoursjam.com`)

### 5. Explore Data (Optional)

Open Prisma Studio to view and edit data:

```bash
pnpm db:studio
```

Access at: http://localhost:5555

## Database Schema

### Core Models

**User**
- Authentication (email/password + OAuth)
- Role-based access (USER, GUIDE, ADMIN)
- Bookings and reviews

**Tour**
- Tour details (title, description, pricing)
- Media (cover image + gallery)
- Availability calendar
- Category relationship
- Reviews and ratings

**Booking**
- User bookings with guest information
- Payment status tracking (Stripe integration)
- Tour date and guest count
- Cancellation and refund handling

**Category**
- Tour grouping (Rafting, Culture, Adventure, etc.)

**Review**
- Star ratings (1-5)
- Written feedback
- Moderation system

**Availability**
- Daily tour slots
- Booking capacity tracking
- Date blocking for maintenance

## Database Commands

```bash
# Generate Prisma Client (after schema changes)
pnpm db:generate

# Push schema to database (no migrations, dev only)
pnpm db:push

# Create and apply migration (production-ready)
pnpm db:migrate

# Run seed script
pnpm db:seed

# Open Prisma Studio (database GUI)
pnpm db:studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## Schema Modifications

After editing `schema.prisma`:

1. **Development**: `pnpm db:push` (quick iteration)
2. **Production**: `pnpm db:migrate` (creates migration file)
3. **Always**: `pnpm db:generate` (updates TypeScript types)

## Using Prisma Client

Import in your API routes or server components:

```typescript
import { prisma } from '@/lib/prisma'

// Example: Fetch all active tours
const tours = await prisma.tour.findMany({
  where: { isActive: true },
  include: {
    category: true,
    images: true,
  },
})
```

## Common Queries

### Fetch Featured Tours

```typescript
const featuredTours = await prisma.tour.findMany({
  where: {
    featured: true,
    isActive: true,
  },
  include: {
    category: true,
    images: { take: 1 },
  },
})
```

### Create a Booking

```typescript
const booking = await prisma.booking.create({
  data: {
    userId: user.id,
    tourId: tour.id,
    tourDate: new Date('2025-11-15'),
    guests: 2,
    totalPrice: 170.00,
    guestName: 'John Doe',
    guestEmail: 'john@example.com',
    guestPhone: '+1-876-555-0100',
  },
})
```

### Get User's Bookings

```typescript
const userBookings = await prisma.booking.findMany({
  where: { userId: user.id },
  include: {
    tour: {
      select: {
        title: true,
        coverImage: true,
      },
    },
  },
  orderBy: { createdAt: 'desc' },
})
```

## Troubleshooting

### Error: "Can't reach database server"

- Check your `DATABASE_URL` in `.env`
- Ensure your database is running
- Verify network connectivity to database host

### Error: "Prisma Client not found"

Run: `pnpm db:generate`

### Schema Changes Not Reflected

1. Update `schema.prisma`
2. Run `pnpm db:push` or `pnpm db:migrate`
3. Run `pnpm db:generate`
4. Restart your dev server

### Need to Reset Everything

```bash
npx prisma migrate reset
pnpm db:seed
```

⚠️ WARNING: This deletes all data!

## Production Deployment

### Environment Variables

Ensure these are set in production:

```env
DATABASE_URL="postgresql://..."  # Production database
DIRECT_URL="postgresql://..."    # For migrations (if using connection pooling)
```

### Migration Workflow

1. Develop locally with `pnpm db:push`
2. When ready, create migration: `pnpm db:migrate`
3. Commit migration files to git
4. Deploy code
5. Migrations run automatically on build (via `prisma generate` in build script)

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Supabase PostgreSQL](https://supabase.com/docs/guides/database)
- [Next.js + Prisma Best Practices](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)
