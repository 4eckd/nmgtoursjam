# 🚀 Quick Start Deployment Guide

**MVP is 100% complete and ready for production!**

---

## ⚡ 5-Minute Deployment (Express Path)

### 1. Merge PRs (2 minutes)
```bash
# Review and merge PR #4
gh pr view 4
gh pr merge 4 --merge

# Switch to integration branch
git checkout integration/mvp-launch
git pull

# Create PR to main
gh pr create --base main --title "chore: MVP v1.0.0 Release" --body "Complete MVP ready for production"

# Merge to main
gh pr merge --merge
```

### 2. Deploy to Vercel (2 minutes)
1. Go to https://vercel.com/new
2. Import GitHub repo
3. Select `main` branch
4. Add environment variables (see below)
5. Click **Deploy**

### 3. Add Environment Variables (1 minute)
```bash
# Minimum required for initial deployment:
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="openssl rand -base64 32"
NEXTAUTH_URL="https://your-app.vercel.app"
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
RESEND_API_KEY="re_..."
EMAIL_FROM="test@yourdomain.com"
```

---

## 🔑 Get Your API Keys

### Stripe (Test Mode)
1. https://dashboard.stripe.com/test/apikeys
2. Copy **Secret key** and **Publishable key**

### Resend
1. https://resend.com/api-keys
2. Create API Key → Copy

### Database
1. https://supabase.com/dashboard/new
2. Create project → Copy connection string

---

## ✅ Test Deployment

After deployment:
1. Visit your URL: `https://your-app.vercel.app`
2. Register a new user
3. Browse tours
4. Start a booking (use test card: `4242 4242 4242 4242`)
5. Check email for confirmation

---

## 📚 Full Documentation

For complete production setup, see:
- **Full Guide**: `docs/PRODUCTION-DEPLOYMENT.md`
- **Project Status**: `docs/PROJECT-STATUS.md`
- **Track 5 Details**: `docs/TRACK5-STATUS.md`

---

## 🆘 Quick Troubleshooting

**Build fails?**
```bash
pnpm build  # Test locally first
```

**Emails not sending?**
- Check RESEND_API_KEY is set
- Use test mode: emails log to console

**Payments fail?**
- Use test card: 4242 4242 4242 4242
- Check STRIPE_SECRET_KEY is set

**Database connection?**
```bash
pnpm db:push  # Test connection
pnpm db:seed  # Add sample data
```

---

## 🎯 Production Checklist

Before going live with real payments:

- [ ] Switch Stripe to live keys (`sk_live_...`)
- [ ] Verify email domain with Resend
- [ ] Set up Stripe webhooks
- [ ] Configure custom domain
- [ ] Test $1 real payment
- [ ] Monitor errors in Vercel

---

**🎉 Your MVP is ready! Deploy in 5 minutes!**
