# DevOps Documentation

Complete DevOps setup and CI/CD pipeline documentation for NMG Tours Jamaica

## Overview

This directory contains all DevOps-related documentation including:
- CI/CD pipeline configuration
- Deployment strategies
- Testing automation
- Security scanning
- Branch protection policies

## Directory Contents

- **README.md** (this file) - DevOps overview
- **CI_CD_SETUP.md** - Complete CI/CD pipeline documentation
- **DEPLOYMENT.md** - Deployment guide for Vercel
- **TESTING.md** - Automated testing strategy
- **BRANCH_STRATEGY.md** - Git workflow and branch policies

## Tech Stack

### CI/CD Platform
- **GitHub Actions** - Primary CI/CD platform
- **Vercel** - Deployment platform (automatic deployments)

### Testing Tools
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing
- **Lighthouse CI** - Performance and accessibility testing

### Security Tools
- **npm audit** - Dependency vulnerability scanning
- **Snyk** - Advanced security scanning
- **Trufflehog** - Secret scanning in commits

### Code Quality Tools
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## CI/CD Pipeline Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    GITHUB ACTIONS PIPELINE                        │
└──────────────────────────────────────────────────────────────────┘

STAGE 1: CODE QUALITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ ESLint validation
✓ TypeScript type checking
✓ Prettier formatting check
✓ Conventional Commits validation
✓ Unused import detection

STAGE 2: SECURITY SCANNING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Secret scanning (Trufflehog)
✓ Dependency audit (npm audit)
✓ Security scan (Snyk)
✓ SARIF report upload

STAGE 3: BUILD VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Install dependencies (pnpm)
✓ Run pnpm build
✓ Check bundle size
✓ Verify no build errors

STAGE 4: TESTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Unit tests (Jest + RTL)
✓ Component tests
✓ API route tests
✓ E2E tests (Playwright - critical paths)
✓ Test coverage report (80%+ required)

STAGE 5: PERFORMANCE & ACCESSIBILITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Lighthouse CI audit
✓ Performance score >80
✓ Accessibility score >90
✓ SEO validation
✓ Best practices check

STAGE 6: PREVIEW DEPLOYMENT (Pull Requests)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Deploy to Vercel preview URL
✓ Comment PR with preview link
✓ Run smoke tests on preview
✓ Visual regression tests (optional)

STAGE 7: PRODUCTION DEPLOYMENT (Main/Integration Branch)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ All previous stages pass
✓ Deploy to Vercel production
✓ Post-deploy smoke tests
✓ Create GitHub release (on main merges)
```

## Workflow Files

Our CI/CD is powered by these GitHub Actions workflows:

| Workflow File | Purpose | Trigger |
|---------------|---------|---------|
| `ci.yml` | Main CI pipeline (quality, security, build, test) | All PRs + pushes |
| `preview-deploy.yml` | Preview deployments for PRs | Pull requests |
| `lighthouse.yml` | Performance audits | PRs to main/integration |
| `security-scan.yml` | Daily security scans | Schedule (daily) + PRs |

## Branch Strategy

### Branches

- **`main`** - Production branch (protected)
- **`integration/mvp-launch`** - Integration branch for MVP features
- **`feature/*`** - Feature branches
- **`hotfix/*`** - Emergency hotfix branches
- **`release/*`** - Release preparation branches

### Protection Rules

#### integration/mvp-launch
- ✅ Require PR before merging
- ✅ Require 1 approval (if team >1)
- ✅ Require status checks to pass (build, lint, tests)
- ✅ Dismiss stale reviews on new commits
- ✅ Require linear history
- ✅ Include administrators

#### main
- ✅ Require PR before merging
- ✅ Require 2 approvals
- ✅ Require all status checks to pass
- ✅ Require Lighthouse scores >80
- ✅ No force pushes
- ✅ Include administrators

## Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Run linter
pnpm lint

# Run type check
pnpm build

# Run tests (when added)
pnpm test

# Format code
pnpm format
```

### Creating a Feature Branch

```bash
# Always branch from integration branch
git checkout integration/mvp-launch
git pull origin integration/mvp-launch

# Create feature branch
git checkout -b feature/tour-booking-widget

# Make changes...

# Verify build works
pnpm build

# Commit with conventional commits format
git commit -m "feat(booking): add tour booking widget component"

# Push to remote
git push -u origin feature/tour-booking-widget

# Create PR to integration branch (not main!)
gh pr create --base integration/mvp-launch \
  --title "feat(booking): Add tour booking widget" \
  --body "Implements booking widget with date picker and guest selector"
```

### CI/CD Best Practices

1. **Always run `pnpm build` locally before pushing**
2. **Write conventional commit messages** (`feat:`, `fix:`, `refactor:`, etc.)
3. **Keep PRs small and focused** (< 500 lines changed)
4. **Add tests for new features** (aim for 80%+ coverage)
5. **Fix all linting errors** before creating PR
6. **Review Lighthouse scores** on preview deployments

## Monitoring & Alerts

### Build Failures
- GitHub Actions will email on CI failures
- Check the Actions tab for detailed logs
- Common issues: Type errors, linting, build failures

### Security Alerts
- Dependabot will create PRs for security updates
- Snyk scans run daily
- Review security tab regularly

### Performance
- Lighthouse CI runs on all PRs
- Performance budgets enforced:
  - Performance score: >80
  - Accessibility score: >90
  - First Contentful Paint: <2s
  - Time to Interactive: <4s

## Deployment

### Preview Deployments
- Automatic for all PRs
- URL: `https://nmgtoursjam-{pr-number}-{hash}.vercel.app`
- Commented automatically on PR
- Includes full environment (test database)

### Production Deployment
- Automatic on merge to `integration/mvp-launch`
- Automatic on merge to `main`
- URL: `https://nmgtoursjam.vercel.app` (or custom domain)
- Requires all CI checks to pass

## Troubleshooting

### CI Failures

**Linting errors**:
```bash
pnpm lint --fix
```

**Type errors**:
```bash
pnpm build  # Shows all type errors
```

**Build failures**:
- Check Next.js build output
- Look for import errors
- Verify all dependencies are installed

**Test failures**:
- Run tests locally: `pnpm test`
- Check test output for specific failures

### Deployment Failures

**Vercel build fails**:
- Check Vercel dashboard for build logs
- Common: Missing environment variables
- Solution: Add to Vercel project settings

**Preview deployment timeout**:
- Large builds may take >10 minutes
- Optimize bundle size
- Remove unused dependencies

## Environment Variables

Required for deployment:

| Variable | Purpose | Location |
|----------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Vercel |
| `NEXTAUTH_SECRET` | NextAuth.js secret | Vercel |
| `NEXTAUTH_URL` | Site URL | Vercel |
| `STRIPE_SECRET_KEY` | Stripe API key | Vercel |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key | Vercel |
| `SENDGRID_API_KEY` | Email service | Vercel |

## Security

### Secret Management
- **Never commit secrets** to repository
- Use GitHub Secrets for CI/CD
- Use Vercel Environment Variables for deployments
- Rotate secrets regularly

### Dependency Updates
- Dependabot enabled for automatic updates
- Review and merge security updates weekly
- Test thoroughly before deploying

### Code Scanning
- Daily Snyk scans
- Pre-commit secret scanning
- Pull request security checks

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Related Documentation

- [CI/CD Setup Guide](./CI_CD_SETUP.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Testing Strategy](./TESTING.md)
- [Branch Strategy](./BRANCH_STRATEGY.md)

---

**Last Updated**: 2025-11-15
**Maintained By**: Development Team
