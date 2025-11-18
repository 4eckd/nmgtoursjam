# Build Scripts Documentation

Automated build scripts for NMG Tours Jamaica with integrated database operations.

## Available Scripts

### Build Scripts

#### `pnpm build`
**Main build command** - Automatically handles database setup and Next.js build.
- Checks for `DATABASE_URL`
- Generates Prisma client if database configured
- Falls back to static build if database unavailable
- **Use for**: Local development, production builds

```bash
pnpm build
```

#### `pnpm build:ci`
**CI/CD optimized build** - For GitHub Actions and Vercel deployments.
- Detects deployment environment (GitHub/Vercel/Local)
- Handles Prisma generation with retries
- Optimized for cloud builds
- **Use for**: Automated deployments, CI/CD pipelines

```bash
pnpm build:ci
```

#### `pnpm build:static`
**Static build** - No database operations.
- Skips Prisma generation
- Fast build for testing
- **Use for**: Quick builds, testing without database

```bash
pnpm build:static
```

#### `pnpm build:with-db`
**Explicit database build** - Same as `pnpm build`.
- Forces database integration
- **Use for**: When you want to be explicit about database usage

```bash
pnpm build:with-db
```

### Database Scripts

#### `pnpm db:setup`
**Complete database setup** - One command to set up everything.
- Generates Prisma client
- Creates database tables
- Tests connection
- **Use for**: First-time setup, resetting database

```bash
pnpm db:setup
```

#### `pnpm db:setup:seed`
**Setup with sample data** - Includes seeding.
- Everything from `db:setup`
- Populates with sample tour data
- **Use for**: Development, demo environments

```bash
pnpm db:setup:seed
```

#### `pnpm db:test`
**Full database connection test** - Comprehensive testing.
- Tests connection
- Shows PostgreSQL version
- Lists tables
- **Use for**: Verifying database setup

```bash
pnpm db:test
```

#### `pnpm db:test:quick`
**Quick connection test** - Fast check (5s timeout).
- Just checks connectivity
- **Use for**: CI/CD, quick health checks

```bash
pnpm db:test:quick
```

#### `pnpm db:generate`
**Generate Prisma client** - Creates type-safe database client.
```bash
pnpm db:generate
```

#### `pnpm db:push`
**Push schema to database** - Creates/updates tables.
```bash
pnpm db:push
```

#### `pnpm db:migrate`
**Create migration** - For schema changes.
```bash
pnpm db:migrate
```

#### `pnpm db:seed`
**Seed database** - Populate with sample data.
```bash
pnpm db:seed
```

#### `pnpm db:studio`
**Open Prisma Studio** - Visual database browser.
```bash
pnpm db:studio
```

## Shell Scripts

All shell scripts are in the `scripts/` directory:

### `build-with-db.sh`
Main build script with database integration.

**Flow:**
1. Check if `DATABASE_URL` is set
2. Generate Prisma client (skip if fails)
3. Test database connection (continue if fails)
4. Build Next.js application

### `ci-build.sh`
CI/CD optimized build script.

**Features:**
- Environment detection (Vercel/GitHub/Local)
- Automatic Prisma generation
- Schema push on Vercel production
- Graceful fallback on errors

### `setup-db.sh`
Complete database setup script.

**Flow:**
1. Check `DATABASE_URL`
2. Generate Prisma client
3. Push schema to database
4. Test connection
5. Optionally seed data

**Usage:**
```bash
# Setup without seeding
bash scripts/setup-db.sh

# Setup with seeding
bash scripts/setup-db.sh --seed
```

### `test-db-connection.ts`
Full database connection test (TypeScript).

### `test-db-quick.ts`
Quick connection test with 5s timeout (TypeScript).

## Workflow Integration

### GitHub Actions

The CI pipeline uses `pnpm build:ci`:

```yaml
- name: Build Next.js (CI mode)
  run: pnpm build:ci
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Vercel

Configured in `vercel.json`:

```json
{
  "buildCommand": "pnpm build:ci",
  "env": {
    "DATABASE_URL": "@database_url"
  }
}
```

## Environment Variables

Required for database operations:

```bash
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"
```

See `.env.example` for template.

## Error Handling

All scripts gracefully handle errors:

- **No DATABASE_URL**: Falls back to static build
- **Prisma generation fails**: Falls back to static build
- **Database unreachable**: Continues build (warns user)
- **CI timeout**: Uses quick tests with timeouts

## Examples

### First Time Setup

```bash
# 1. Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# 2. Set up database
pnpm db:setup:seed

# 3. Build application
pnpm build

# 4. Start dev server
pnpm dev
```

### Production Deployment

```bash
# Vercel will automatically run:
pnpm build:ci
# Which handles everything automatically
```

### Development Workflow

```bash
# Start dev server (watches for changes)
pnpm dev

# In another terminal - open Prisma Studio
pnpm db:studio

# Make schema changes, then:
pnpm db:push

# Or create a migration:
pnpm db:migrate
```

### CI/CD Testing

```bash
# Test the CI build locally
DATABASE_URL="your-db-url" pnpm build:ci

# Quick health check
pnpm db:test:quick
```

## Troubleshooting

### Build fails with Prisma errors

**Solution**: The build script automatically falls back to static mode. Check:
```bash
# Test Prisma generation manually
pnpm db:generate

# Test database connection
pnpm db:test
```

### Database connection timeout

**Solution**: Check DATABASE_URL and network:
```bash
# Quick test with timeout
pnpm db:test:quick

# Check environment variable
echo $DATABASE_URL
```

### Vercel build fails

**Solution**: Ensure environment variables are set in Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add `DATABASE_URL` with your Supabase connection string
3. Redeploy

### Local build works but CI fails

**Solution**: Check GitHub Secrets:
```bash
# In GitHub repo settings:
# Settings → Secrets and variables → Actions
# Add DATABASE_URL secret
```

## Best Practices

1. **Always use `pnpm build`** for production builds (not `build:static`)
2. **Run `pnpm db:test`** after making schema changes
3. **Use `pnpm db:migrate`** for production schema changes (not `db:push`)
4. **Keep `.env` secure** - never commit to git
5. **Test locally first** before pushing to CI/CD

## Script Dependencies

All scripts require:
- Node.js 20+
- pnpm 9+
- Bash (for shell scripts)
- tsx (for TypeScript scripts)

Installed automatically via `pnpm install`.
