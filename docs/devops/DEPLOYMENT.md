# Deployment Guide

Complete deployment guide for NMG Tours Jamaica

## Deployment Platform

**Vercel** - Serverless platform optimized for Next.js

**Why Vercel:**
- Zero-config Next.js deployment
- Automatic HTTPS
- Edge network (CDN)
- Preview deployments
- Serverless functions
- Free tier for MVP

## Environments

### 1. Development
- **URL**: http://localhost:3000
- **Purpose**: Local development
- **Database**: Local PostgreSQL or test DB

### 2. Preview (Staging)
- **URL**: `https://nmgtoursjam-{pr-number}.vercel.app`
- **Purpose**: PR previews for testing
- **Database**: Test database
- **Trigger**: Automatic on PR creation

### 3. Production
- **URL**: https://nmgtoursjam.vercel.app (or custom domain)
- **Purpose**: Live site
- **Database**: Production PostgreSQL (Supabase)
- **Trigger**: Merge to `main` or `integration/mvp-launch`

## Initial Setup

### 1. Create Vercel Account

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login
```

### 2. Link Project

```bash
# In project root
vercel link

# Follow prompts:
# - Link to existing project? No
# - Project name: nmgtoursjam
# - Directory: ./
```

### 3. Configure Environment Variables

In Vercel dashboard:

```
Project Settings → Environment Variables
```

**Required Variables:**

**Database:**
```
DATABASE_URL=postgresql://user:pass@host:5432/db
```

**Authentication:**
```
NEXTAUTH_URL=https://nmgtoursjam.vercel.app
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl
```

**Payments:**
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Email:**
```
SENDGRID_API_KEY=SG...
SENDGRID_FROM_EMAIL=noreply@nmgtours.com
```

**Images:**
```
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### 4. Connect GitHub Repository

In Vercel dashboard:

```
Import Project → Import Git Repository
→ Select nmgtoursjam repo
→ Configure build settings (auto-detected)
→ Deploy
```

## Deployment Process

### Automatic Deployments

**Preview Deployments:**
- Trigger: PR created/updated
- Branch: Any branch with PR
- URL: Unique preview URL
- Database: Test environment

**Production Deployments:**
- Trigger: Merge to `integration/mvp-launch` or `main`
- URL: Production domain
- Database: Production

### Manual Deployments

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Deploy specific branch
vercel --prod --branch=feature/booking
```

## Build Configuration

### vercel.json

```json
{
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_SITE_URL": "https://nmgtoursjam.vercel.app"
  }
}
```

### Build Settings

**Framework Preset:** Next.js
**Build Command:** `pnpm build`
**Output Directory:** `.next`
**Install Command:** `pnpm install`
**Node Version:** 18.x

## Custom Domain

### Add Domain

1. Go to Vercel project settings
2. Click "Domains"
3. Add domain: `nmgtours.com`
4. Follow DNS configuration steps

### DNS Configuration

Add these records at your DNS provider:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### SSL Certificate

- Automatic via Vercel
- Let's Encrypt certificate
- Auto-renewal
- Force HTTPS enabled

## Database Setup

### Supabase PostgreSQL

1. Create Supabase project
2. Get connection string
3. Add to Vercel env vars
4. Run migrations:

```bash
# Generate Prisma client
npx prisma generate

# Push schema
npx prisma db push

# Seed data (optional)
npx prisma db seed
```

## Monitoring

### Deployment Logs

View in Vercel dashboard:
- Build logs
- Function logs
- Error traces
- Performance metrics

### Analytics

Enable Vercel Analytics:
```
Project Settings → Analytics → Enable
```

Tracks:
- Page views
- Unique visitors
- Top pages
- Performance metrics

### Error Tracking

Optional: Add Sentry

```bash
npm install @sentry/nextjs

# Configure
npx @sentry/wizard -i nextjs
```

## Rollback

### Revert to Previous Deployment

1. Go to Vercel dashboard
2. Click "Deployments"
3. Find working deployment
4. Click "⋯" → "Promote to Production"

### Via CLI

```bash
# List deployments
vercel list

# Promote specific deployment
vercel promote [deployment-url]
```

## Performance Optimization

### Edge Caching

Configure in `next.config.js`:

```js
module.exports = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, s-maxage=86400',
        },
      ],
    },
  ],
}
```

### Image Optimization

Use Next.js Image component:
- Automatic WebP/AVIF conversion
- Lazy loading
- Responsive images
- CDN delivery

### Bundle Analysis

```bash
# Install analyzer
npm install @next/bundle-analyzer

# Run analysis
ANALYZE=true pnpm build
```

## Security

### Environment Variables

- Never commit to repo
- Use Vercel env vars
- Separate preview/production
- Rotate secrets regularly

### Headers

Add security headers in `next.config.js`:

```js
headers: async () => [
  {
    source: '/:path*',
    headers: [
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
    ],
  },
]
```

## Troubleshooting

### Build Fails

**Check build logs:**
- Vercel dashboard → Deployment → Build Logs

**Common fixes:**
- Missing dependencies: `pnpm install`
- Type errors: `pnpm build` locally
- Environment variables: Check Vercel settings

### Slow Build Times

**Optimize:**
- Enable caching in Vercel settings
- Reduce dependencies
- Use SWC instead of Babel
- Optimize images

### 404 Errors

**Check:**
- Next.js routing configuration
- API routes exist
- Files in correct directories
- Vercel rewrites configured

## Maintenance

### Regular Tasks

**Weekly:**
- Review deployment logs
- Check error rates
- Monitor performance metrics

**Monthly:**
- Update dependencies
- Review bundle size
- Audit security
- Check analytics

**Quarterly:**
- Rotate secrets
- Review Vercel plan
- Optimize performance
- Update documentation

---

**Last Updated**: 2025-11-15
