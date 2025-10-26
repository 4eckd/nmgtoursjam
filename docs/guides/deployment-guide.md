# Deployment Guide

This guide covers deploying NMGToursJam to production using Vercel and associated services.

## 📋 Pre-Deployment Checklist

### Code Preparation
- [ ] All tests passing (`npm test`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Production build successful (`npm run build`)
- [ ] Environment variables documented
- [ ] Sensitive data removed from codebase

### Database
- [ ] Production database provisioned (Supabase/Neon)
- [ ] Migrations tested on staging
- [ ] Backup strategy implemented
- [ ] Connection pooling configured

### Security
- [ ] Security headers configured
- [ ] HTTPS enforced
- [ ] API rate limiting implemented
- [ ] Input validation on all forms
- [ ] CSRF protection enabled
- [ ] SQL injection prevention verified

## 🚀 Vercel Deployment

### Initial Setup

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Link project
   vercel link
   ```

2. **Configure Project**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

```bash
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_URL=https://nmgtoursjam.com
NEXTAUTH_SECRET=generated-secret-min-32-chars

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SENDGRID_API_KEY=SG...
EMAIL_FROM=noreply@nmgtoursjam.com

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Monitoring
SENTRY_DSN=https://...
NEXT_PUBLIC_GA_ID=G-...
```

### Database Setup

```bash
# Set production DATABASE_URL
export DATABASE_URL="postgresql://..."

# Run migrations
npx prisma migrate deploy

# Seed initial data (categories, etc)
npx prisma db seed -- --environment production
```

### Vercel Configuration

Create `vercel.json`:
```json
{
  "buildCommand": "prisma generate && next build",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/bookings/webhook/route.ts": {
      "maxDuration": 60
    },
    "app/api/admin/reports/route.ts": {
      "maxDuration": 30
    }
  },
  "crons": [
    {
      "path": "/api/cron/send-reminders",
      "schedule": "0 10 * * *"
    },
    {
      "path": "/api/cron/cleanup-sessions",
      "schedule": "0 2 * * *"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-store, max-age=0"
        }
      ]
    }
  ]
}
```

## 🔧 Service Configuration

### Stripe Setup

1. **Production Configuration**
   - Switch to live mode
   - Update API keys
   - Configure webhook endpoints
   - Set up webhook signing secret

2. **Webhook Endpoint**
   ```
   https://nmgtoursjam.com/api/bookings/webhook
   ```

3. **Events to Listen**
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.dispute.created`

### SendGrid Configuration

1. **Domain Authentication**
   - Verify sending domain
   - Configure SPF records
   - Set up DKIM
   - Add MX records

2. **Email Templates**
   - Upload templates to SendGrid
   - Test with production data
   - Configure dynamic templates

### Cloudinary Setup

1. **Upload Presets**
   ```javascript
   // Tour images preset
   {
     folder: "nmgtoursjam/tours",
     transformation: [
       { width: 1920, height: 1080, crop: "limit" },
       { quality: "auto:best" },
       { fetch_format: "auto" }
     ]
   }
   ```

2. **Security Settings**
   - Enable signed uploads
   - Configure allowed formats
   - Set upload size limits

## 📊 Monitoring Setup

### Sentry Configuration

```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
});
```

### Google Analytics

```javascript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  )
}
```

## 🚦 Deployment Process

### 1. Staging Deployment

```bash
# Deploy to staging
vercel --env preview

# Run E2E tests against staging
npm run test:e2e:staging

# Verify all features
npm run verify:staging
```

### 2. Production Deployment

```bash
# Deploy to production
vercel --prod

# Or merge to main branch for auto-deploy
git checkout main
git merge develop
git push origin main
```

### 3. Post-Deployment

1. **Verify Deployment**
   - Check all pages load
   - Test booking flow
   - Verify payment processing
   - Check email delivery
   - Monitor error rates

2. **DNS Configuration**
   ```
   Type  Name    Value
   A     @       76.76.21.21
   CNAME www     cname.vercel-dns.com
   ```

3. **SSL Certificate**
   - Automatic via Vercel
   - Force HTTPS redirect

## 🔄 Rollback Procedure

### Immediate Rollback

```bash
# List recent deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Database Rollback

```bash
# Revert last migration
npx prisma migrate resolve --rolled-back

# Apply specific migration
npx prisma migrate deploy --schema=./prisma/backup/schema.prisma
```

## 📈 Performance Optimization

### Edge Configuration

```javascript
// middleware.ts
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

### Image Optimization

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
}
```

## 🛡️ Security Headers

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
]
```

## 🚨 Incident Response

### Monitoring Alerts

Set up alerts for:
- Error rate > 1%
- Response time > 3s
- Payment failures
- Database connection errors
- Memory usage > 80%

### Response Plan

1. **Identify Issue**
   - Check Sentry for errors
   - Review Vercel logs
   - Monitor database metrics

2. **Communicate**
   - Update status page
   - Notify team
   - Inform affected users

3. **Resolution**
   - Deploy hotfix
   - Or rollback if needed
   - Verify fix

4. **Post-Mortem**
   - Document incident
   - Identify root cause
   - Implement preventions

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Production](https://www.prisma.io/docs/guides/deployment)
- [Stripe Going Live](https://stripe.com/docs/development/checklist)

---

Last Updated: October 2024