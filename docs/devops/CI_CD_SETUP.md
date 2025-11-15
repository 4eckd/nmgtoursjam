# CI/CD Setup Guide

Complete guide to the CI/CD pipeline for NMG Tours Jamaica

## Pipeline Overview

Our CI/CD pipeline uses GitHub Actions with 7 automated stages:

1. **Code Quality** - Linting, formatting, type checking
2. **Security** - Secret scanning, dependency audits
3. **Build** - Next.js build verification
4. **Testing** - Unit, component, E2E tests
5. **Performance** - Lighthouse audits
6. **Preview** - Deploy to Vercel preview
7. **Production** - Deploy to production

## GitHub Actions Workflows

### 1. Main CI Pipeline (`ci.yml`)

**Triggers:**
- All pushes to `main`, `integration/*`, `feature/*`
- All pull requests to `main`, `integration/mvp-launch`

**Jobs:**
- Code quality checks
- Security scanning
- Build verification
- Test execution
- Coverage reporting

**Required to pass before merge**

### 2. Preview Deployments (`preview-deploy.yml`)

**Triggers:**
- Pull requests (automatic)

**Actions:**
- Deploy to Vercel preview URL
- Comment PR with preview link
- Run smoke tests on preview

### 3. Lighthouse CI (`lighthouse.yml`)

**Triggers:**
- Pull requests to `main`, `integration/mvp-launch`

**Checks:**
- Performance score >80
- Accessibility score >90
- SEO score >80
- Best practices >80

### 4. Security Scanning (`security-scan.yml`)

**Triggers:**
- Daily schedule (midnight)
- Pull requests

**Scans:**
- npm audit
- Snyk vulnerability scan
- Secret detection
- SARIF report generation

## Setup Instructions

### 1. GitHub Secrets

Add these secrets in GitHub repo settings:

```
Settings → Secrets and variables → Actions → New repository secret
```

**Required Secrets:**
- `VERCEL_TOKEN` - Vercel API token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID
- `SNYK_TOKEN` - Snyk API token (optional)

### 2. Vercel Configuration

Install Vercel CLI and link project:

```bash
npm i -g vercel
vercel login
vercel link
```

Get project info:
```bash
cat .vercel/project.json
```

Add to GitHub secrets.

### 3. Branch Protection

**For `integration/mvp-launch`:**

```
Settings → Branches → Add branch protection rule
```

- Branch name pattern: `integration/mvp-launch`
- ✅ Require a pull request before merging
- ✅ Require approvals: 1
- ✅ Require status checks to pass before merging
  - Select: `build`, `quality`, `security`
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ✅ Include administrators

**For `main`:**

Same as above but:
- Require approvals: 2
- Additional required checks: `lighthouse`

## Local Development Setup

### Install Dependencies

```bash
pnpm install
```

### Pre-commit Checks

Run these before committing:

```bash
# Lint
pnpm lint

# Type check
pnpm build

# Format
pnpm format

# Tests (when added)
pnpm test
```

### Conventional Commits

Use semantic commit messages:

- `feat(scope): description` - New feature
- `fix(scope): description` - Bug fix
- `refactor(scope): description` - Code refactoring
- `docs: description` - Documentation
- `style: description` - Formatting
- `test: description` - Tests
- `chore: description` - Tooling

Examples:
```bash
git commit -m "feat(booking): add date picker component"
git commit -m "fix(tours): resolve filter reset bug"
git commit -m "docs: update deployment guide"
```

## Monitoring

### Build Status

Check GitHub Actions tab:
```
https://github.com/{org}/{repo}/actions
```

### Deployment Status

Check Vercel dashboard:
```
https://vercel.com/{org}/{project}
```

### Performance Metrics

Lighthouse CI reports:
- Attached to PR checks
- View in GitHub Actions artifacts

## Troubleshooting

### CI Fails on Type Check

```bash
# Run locally to see errors
pnpm build

# Fix errors, then commit
git add .
git commit -m "fix: resolve type errors"
```

### CI Fails on Linting

```bash
# Auto-fix
pnpm lint --fix

# Commit fixes
git add .
git commit -m "style: fix linting errors"
```

### Deployment Fails

Check Vercel logs:
1. Go to Vercel dashboard
2. Click failed deployment
3. View build logs
4. Fix issue and redeploy

Common issues:
- Missing environment variables
- Build timeouts (optimize bundle)
- Memory limits (upgrade plan)

## Performance Budgets

Enforced by Lighthouse CI:

| Metric | Budget |
|--------|--------|
| Performance | >80 |
| Accessibility | >90 |
| SEO | >80 |
| Best Practices | >80 |
| First Contentful Paint | <2s |
| Time to Interactive | <4s |
| Total Bundle Size | <500KB |

## Security Policies

### Dependency Updates

- Dependabot enabled
- Auto-merge minor updates
- Review major updates
- Security patches: immediate

### Secret Management

- Never commit secrets
- Use GitHub Secrets for CI
- Use Vercel env vars for runtime
- Rotate keys quarterly

### Code Scanning

- Daily Snyk scans
- Pre-commit hooks
- PR security checks
- SARIF reports uploaded

---

**Last Updated**: 2025-11-15
