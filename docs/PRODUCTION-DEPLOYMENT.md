# 🚀 Production Deployment Guide - NMG Tours Jamaica

**Last Updated**: 2025-10-29
**Version**: MVP 1.0.0
**Status**: Ready for Production Deployment

---

## 📋 Pre-Deployment Checklist

### ✅ Code Readiness
- [x] All 5 MVP tracks complete (100%)
- [x] Build passing (23 routes compiled)
- [x] TypeScript checks passing
- [x] PR #4 created to integration/mvp-launch
- [ ] PR #4 reviewed and merged
- [ ] PR created from integration to main
- [ ] Final PR approved and merged to main

### ✅ Environment Setup
- [ ] Production database created
- [ ] Stripe production account created
- [ ] Resend email domain verified
- [ ] All environment variables configured
- [ ] Domain registered and DNS configured

---

## 🔧 Step 1: Create Production Accounts

### Stripe Account Setup

1. **Create Stripe Account**
   - Go to https://dashboard.stripe.com/register
   - Complete business verification
   - Add bank account for payouts

2. **Get API Keys**
   ```bash
   # In Stripe Dashboard → Developers → API Keys
   STRIPE_SECRET_KEY="sk_live_..." # Secret key (server-side)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..." # Publishable key (client-side)
   ```

3. **Set Up Webhooks**
   - Go to Developers → Webhooks
   - Click "Add endpoint"
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Select events:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`
   - Copy webhook signing secret:
   ```bash
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

4. **Test Mode First**
   - Use test keys initially: `sk_test_...` and `pk_test_...`
   - Test with card: 4242 4242 4242 4242
   - Switch to live keys after testing

### Resend Email Setup

1. **Create Resend Account**
   - Go to https://resend.com/signup
   - Verify your email address

2. **Verify Email Domain**
   - Go to Domains → Add Domain
   - Enter your domain (e.g., nmgtoursjam.com)
   - Add DNS records (SPF, DKIM, DMARC):
   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:_spf.resend.com ~all

   Type: TXT
   Name: resend._domainkey
   Value: [provided by Resend]
   ```
   - Wait for verification (can take 24-48 hours)

3. **Get API Key**
   - Go to API Keys → Create API Key
   - Copy the key:
   ```bash
   RESEND_API_KEY="re_..."
   EMAIL_FROM="bookings@yourdomain.com"
   ```

### Database Setup (Supabase)

1. **Create Supabase Project**
   - Go to https://supabase.com/dashboard
   - Click "New Project"
   - Choose region closest to users
   - Set strong database password

2. **Get Connection String**
   - Go to Settings → Database
   - Copy connection string (Transaction or Session mode)
   ```bash
   DATABASE_URL="postgresql://postgres.[project-ref]:[password]@[host]:5432/postgres"
   ```

3. **Run Migrations**
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

---

## ⚙️ Step 2: Configure Environment Variables

### Create Production .env File

```bash
# ========================================
# Database
# ========================================
DATABASE_URL="postgresql://postgres.[project]:password@db.project.supabase.co:5432/postgres"

# ========================================
# NextAuth.js
# ========================================
# Generate new secret: openssl rand -base64 32
NEXTAUTH_SECRET="your-new-production-secret-here"
NEXTAUTH_URL="https://yourdomain.com"

# ========================================
# Stripe (LIVE KEYS)
# ========================================
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# ========================================
# Email (Resend)
# ========================================
RESEND_API_KEY="re_..."
EMAIL_FROM="bookings@yourdomain.com"

# ========================================
# Google OAuth (Optional)
# ========================================
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# ========================================
# Application
# ========================================
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### Security Checklist
- [ ] NEVER commit .env files to Git
- [ ] Use different secrets for production vs staging
- [ ] Rotate NEXTAUTH_SECRET (don't reuse from dev)
- [ ] Keep Stripe secret key secure (never expose client-side)
- [ ] Use environment variable management (Vercel, Railway, etc.)

---

## 🌐 Step 3: Deploy to Vercel (Recommended)

### Initial Setup

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Connect GitHub Repository**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select the `main` branch

3. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `pnpm build` (or `npm run build`)
   - Output Directory: `.next`
   - Install Command: `pnpm install` (or `npm install`)

4. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from .env file above
   - Select "Production" environment
   - Click "Save"

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~3-5 minutes)
   - Get deployment URL: `https://nmgtoursjam.vercel.app`

### Custom Domain Setup

1. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Add your domain: `nmgtoursjam.com`
   - Add www subdomain: `www.nmgtoursjam.com`

2. **Configure DNS**
   - Add A record:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21 (Vercel's IP)
   ```
   - Add CNAME record:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Enable SSL**
   - SSL certificate automatically provisioned by Vercel
   - Wait 24-48 hours for DNS propagation

### Update Stripe Webhook URL

After deployment, update Stripe webhook:
- Old: `http://localhost:3000/api/webhooks/stripe`
- New: `https://yourdomain.com/api/webhooks/stripe`

---

## 🧪 Step 4: Production Testing

### Pre-Launch Testing Checklist

#### Authentication Flow
- [ ] User registration works
- [ ] Email validation working
- [ ] Password hashing secure
- [ ] Login successful
- [ ] Session persists across page reloads
- [ ] Logout works correctly

#### Tour Browsing
- [ ] Homepage loads correctly
- [ ] Tour listing page displays all tours
- [ ] Filtering works (category, difficulty, price)
- [ ] Search functionality working
- [ ] Sorting options work correctly
- [ ] Tour detail pages load with all information
- [ ] Image gallery works (navigation, lightbox)
- [ ] Mobile responsive at all breakpoints

#### Booking Flow (Use test card first)
- [ ] Booking wizard opens from tour page
- [ ] Calendar displays correctly
- [ ] Availability shows accurate slot counts
- [ ] Can select date
- [ ] Guest count selector works
- [ ] Price calculation correct
- [ ] Contact form validates properly
- [ ] Can proceed to Stripe Checkout
- [ ] Stripe Checkout page loads
- [ ] Test payment succeeds (4242 4242 4242 4242)
- [ ] Redirected to success page
- [ ] Success page shows booking details
- [ ] Booking appears in database
- [ ] Availability slots decremented

#### Email Notifications
- [ ] Booking confirmation email received
- [ ] Email has correct content and styling
- [ ] Booking number displayed
- [ ] Tour details accurate
- [ ] Contact information correct
- [ ] Links work (dashboard, contact)

#### Dashboard
- [ ] Dashboard loads after login
- [ ] Upcoming bookings display correctly
- [ ] Past bookings display correctly
- [ ] Booking cards show accurate info
- [ ] Status badges correct color
- [ ] Payment status displayed
- [ ] Links to tour details work

#### Webhook Testing
- [ ] Webhook endpoint reachable
- [ ] Signature verification works
- [ ] Successful payment updates booking
- [ ] Failed payment cancels booking
- [ ] Refund handled correctly

### Live Payment Test

**⚠️ Important**: Test with small amount first

1. **Switch to Live Keys**
   - Update environment variables with `sk_live_...` and `pk_live_...`
   - Redeploy

2. **Test $1 Booking**
   - Complete real booking with $1
   - Use real credit card
   - Verify payment in Stripe Dashboard
   - Check booking in database
   - Confirm email received
   - Check webhook delivery

3. **Refund Test Booking**
   - Issue refund from Stripe Dashboard
   - Verify refund webhook received
   - Check booking status updated
   - Verify availability slots returned

---

## 📊 Step 5: Post-Launch Monitoring

### Set Up Monitoring

1. **Vercel Analytics** (Included)
   - Already enabled by default
   - View at: Project → Analytics

2. **Error Monitoring (Sentry - Recommended)**
   ```bash
   pnpm add @sentry/nextjs
   ```
   - Follow setup: https://docs.sentry.io/platforms/javascript/guides/nextjs/
   - Get alerts for runtime errors

3. **Uptime Monitoring**
   - Use UptimeRobot (free): https://uptimerobot.com
   - Monitor main URL + API endpoints
   - Get alerts if site goes down

4. **Stripe Dashboard**
   - Monitor payment success rates
   - Watch for failed payments
   - Check webhook delivery status
   - Review dispute/chargeback status

### Key Metrics to Track

**Daily**:
- [ ] New user registrations
- [ ] Total bookings
- [ ] Payment success rate
- [ ] Average booking value
- [ ] Error rate

**Weekly**:
- [ ] Conversion rate (visitors → bookings)
- [ ] Email deliverability rate
- [ ] Customer support tickets
- [ ] Server response times
- [ ] Mobile vs desktop traffic

**Monthly**:
- [ ] Total revenue
- [ ] User growth rate
- [ ] Popular tours
- [ ] Booking cancellation rate
- [ ] Customer lifetime value

---

## 🔒 Step 6: Security Hardening

### Production Security Checklist

- [ ] All secrets rotated from development
- [ ] Environment variables never in code
- [ ] HTTPS enabled (SSL certificate)
- [ ] CORS configured correctly
- [ ] Rate limiting enabled (if needed)
- [ ] SQL injection prevention (Prisma ORM handles this)
- [ ] XSS prevention (React escaping handles this)
- [ ] CSRF protection (NextAuth handles this)
- [ ] Webhook signature verification enabled
- [ ] Strong password requirements enforced
- [ ] Database backups configured
- [ ] Regular security audits scheduled

### Recommended Additional Security

1. **Rate Limiting**
   ```bash
   pnpm add @upstash/ratelimit @upstash/redis
   ```
   - Limit API requests per IP
   - Prevent booking spam

2. **Database Backups**
   - Supabase: Enable automated backups (Settings → Database)
   - Frequency: Daily
   - Retention: 30 days minimum

3. **DDoS Protection**
   - Vercel includes basic DDoS protection
   - For advanced: Use Cloudflare (free tier available)

---

## 🚨 Troubleshooting Common Issues

### Build Fails

**Issue**: Build fails with TypeScript errors
```bash
# Solution: Run build locally first
pnpm build

# Fix any errors, then push
git add .
git commit -m "fix: resolve build errors"
git push
```

### Stripe Webhook Not Working

**Issue**: Payments succeed but bookings not confirmed

**Solutions**:
1. Check webhook URL is correct: `https://yourdomain.com/api/webhooks/stripe`
2. Verify webhook secret matches: `STRIPE_WEBHOOK_SECRET`
3. Check webhook logs in Stripe Dashboard → Developers → Webhooks
4. Test webhook with Stripe CLI:
   ```bash
   stripe listen --forward-to https://yourdomain.com/api/webhooks/stripe
   ```

### Emails Not Sending

**Issue**: Confirmation emails not received

**Solutions**:
1. Verify domain is verified in Resend dashboard
2. Check SPF/DKIM DNS records
3. Verify `RESEND_API_KEY` is correct
4. Check `EMAIL_FROM` matches verified domain
5. Check spam folder
6. Review Resend logs: Dashboard → Logs

### Database Connection Fails

**Issue**: "Can't reach database server"

**Solutions**:
1. Verify `DATABASE_URL` is correct
2. Check database is not paused (Supabase free tier)
3. Verify IP whitelist (if applicable)
4. Test connection:
   ```bash
   pnpm db:push
   ```

### Session Issues

**Issue**: Users logged out randomly

**Solutions**:
1. Verify `NEXTAUTH_SECRET` is set and matches
2. Check `NEXTAUTH_URL` points to production domain
3. Ensure cookies are allowed (check browser console)
4. Verify JWT expiry isn't too short

---

## 📝 Post-Deployment Tasks

### Immediate (Day 1)
- [ ] Test complete user journey (register → browse → book → pay)
- [ ] Verify all emails deliver
- [ ] Monitor error logs for first hour
- [ ] Test on mobile devices
- [ ] Share with beta users for feedback

### First Week
- [ ] Daily error log review
- [ ] Monitor payment success rate
- [ ] Gather user feedback
- [ ] Fix critical bugs
- [ ] Update tour data and availability

### First Month
- [ ] Review analytics data
- [ ] Analyze conversion funnels
- [ ] Collect customer reviews
- [ ] Plan feature improvements
- [ ] Scale infrastructure if needed

---

## 🎯 Success Criteria

Your deployment is successful when:

✅ Users can register and login without issues
✅ Tours display correctly on all devices
✅ Booking flow completes successfully
✅ Payments process via Stripe
✅ Confirmation emails deliver within 1 minute
✅ Dashboard shows booking history
✅ No critical errors in monitoring
✅ Site loads in <3 seconds
✅ Mobile experience is smooth
✅ SSL certificate is active

---

## 🆘 Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support
- **Stripe Docs**: https://stripe.com/docs
- **Resend Docs**: https://resend.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Project Repository**: https://github.com/4eckd/nmgtoursjam

---

## 📞 Emergency Contacts

If critical issues arise:

1. **Rollback Deployment**
   ```bash
   # In Vercel Dashboard
   Deployments → [Previous Working Deployment] → Promote to Production
   ```

2. **Disable New Bookings**
   - Set all tour availability to 0 slots
   - Add maintenance notice to homepage

3. **Contact Support**
   - Vercel: support@vercel.com
   - Stripe: https://support.stripe.com
   - Resend: support@resend.com

---

**🎉 Ready to Launch! Follow this guide step-by-step for a smooth production deployment.**
