# Automated Feedback System

This project includes a comprehensive automated feedback system that provides hints, recommendations, and pre-filled suggestions based on your code changes, build results, and commit patterns.

## 🎯 Overview

**Goal**: Get helpful feedback BEFORE and AFTER pushing code, so you know exactly what to fix.

**Coverage**:
- ✅ Build failures → Specific error hints
- ✅ Security issues → Fix recommendations
- ✅ File changes → Context-aware suggestions
- ✅ Pre-commit → Local checks before pushing
- ✅ PR comments → Automated PR analysis

---

## 🚀 Quick Start

### Before You Commit (Local)

```bash
# Check what changed and get recommendations
pnpm check:changes

# Run full pre-commit checks
pnpm precommit

# Or run individual checks
pnpm check:security    # Security vulnerabilities
pnpm check             # Security + Build
```

### After You Push (CI/CD)

GitHub Actions will automatically:
1. ✅ Build your code and annotate errors inline
2. ✅ Run security scans
3. ✅ Post a detailed comment on your PR with:
   - Build status
   - Security vulnerabilities
   - Merge readiness
   - Specific recommendations

---

## 📋 What Feedback You Get

### 1. **PR Comments** (Automated)

When you create a PR, you'll get an automated comment like:

```markdown
## 🤖 Automated PR Analysis

### ✅ Build Status: PASSING
Great job! Your code compiles successfully.

### 🔒 Security: No Vulnerabilities
All dependencies are secure. Nice!

### ⚙️ Configuration Changes Detected
**Important:** You modified configuration files.

**Checklist:**
- [ ] Updated `.env.example` if needed
- [ ] Documented new environment variables
- [ ] Verified build still works
- [ ] Updated deployment docs if needed

### 💡 Recommendations
1. Run `pnpm build` locally to verify
2. Check for exposed secrets in your code

### 🚦 Merge Status: **READY** ✅
All automated checks passed! Ready for review.
```

### 2. **Inline Annotations** (On Code)

Build errors appear directly on the line that caused them:

```
❌ lib/prisma.ts:1:10
Type error: Module '@prisma/client' has no exported member 'PrismaClient'

💡 Suggestion: Run 'pnpm install' to ensure dependencies are up to date
```

### 3. **Local Pre-Commit Checks**

Before committing, run `pnpm precommit`:

```bash
🔍 Running pre-commit checks...

🔒 Checking for secrets in staged files...
✅ No secrets detected

🔨 Checking TypeScript compilation...
✅ Build successful

🛡️  Checking for security vulnerabilities...
✅ No vulnerabilities found

📦 Checking for large files...
⚠️  Large files detected: logo.png (2.5M)
💡 Consider compressing images

🐛 Checking for debug statements...
⚠️  Found 3 console.log statements
💡 Consider removing debug statements before committing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  Found 2 warning(s)
Continue with commit? (y/n)
```

### 4. **Change-Based Recommendations**

Run `pnpm check:changes` to get context-aware hints:

```bash
🔍 Analyzing your changes...

📝 Changed files:
  • package.json
  • prisma/schema.prisma
  • app/api/users/route.ts

💡 Recommendations based on your changes:

📦 Package Dependencies Changed:
  ✓ Run: pnpm install
  ✓ Commit pnpm-lock.yaml too
  ✓ Check for security vulnerabilities: npm audit

🗄️  Database Schema Changed:
  ✓ Run: pnpm db:generate
  ✓ Create migration: pnpm db:migrate
  ✓ Document schema changes in PR description

🔌 API Routes Changed:
  ✓ Test API endpoints manually
  ✓ Check error handling
  ✓ Verify authentication/authorization
```

---

## 🛠️ Available Scripts

| Command | When to Use | What It Does |
|---------|-------------|--------------|
| `pnpm precommit` | Before every commit | Full pre-commit checks |
| `pnpm check:changes` | After making changes | Get context-aware recommendations |
| `pnpm check:security` | Any time | Check for vulnerabilities |
| `pnpm check` | Before pushing | Security + build verification |

---

## 🔧 Setup

### Enable Commit Message Template

Get helpful hints in every commit message:

```bash
git config --local commit.template .github/COMMIT_TEMPLATE.md
```

Now when you run `git commit`, you'll see a template with examples and reminders.

### Optional: Auto-run Pre-commit Checks

To automatically run checks before EVERY commit:

```bash
# Create git hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
./scripts/pre-commit-check.sh
EOF

chmod +x .git/hooks/pre-commit
```

---

## 📊 Workflow Examples

### Example 1: Normal Development Flow

```bash
# 1. Make your changes
# ... edit files ...

# 2. Check what you changed
pnpm check:changes

# Output:
# 📦 Package Dependencies Changed:
#   ✓ Run: pnpm install
#   ✓ Commit pnpm-lock.yaml too

# 3. Follow recommendations
pnpm install

# 4. Run pre-commit checks
pnpm precommit

# Output:
# ✅ All checks passed!
# 🚀 Ready to commit!

# 5. Commit
git add .
git commit -m "feat(api): add user authentication endpoint"

# 6. Push
git push
```

### Example 2: Build Failure

```bash
# You make changes and commit
git commit -m "fix: update API"
git push

# GitHub Actions runs and comments on your PR:
# ❌ Build Status: FAILED
# Action Required: Fix build errors before merging.
#
# Common fixes:
# - Check TypeScript errors: pnpm build
# - Verify all imports are correct

# You fix the issue locally
pnpm build  # See the errors
# ... fix errors ...

# Verify it works
pnpm precommit  # ✅ All checks passed!

# Push the fix
git commit -m "fix: resolve TypeScript errors"
git push

# New comment on PR:
# ✅ Build Status: PASSING
# 🚦 Merge Status: READY ✅
```

### Example 3: Security Vulnerability

```bash
# You add a new package
pnpm add some-package

# Check for issues
pnpm check:security

# Output:
# ⚠️  Found 2 vulnerabilities
# 💡 Run: npm audit fix

# Fix automatically
npm audit fix

# Verify
pnpm check:security
# ✅ No vulnerabilities found

# Commit the fixes
git add package.json pnpm-lock.yaml
git commit -m "chore(deps): fix security vulnerabilities"
```

---

## 🎨 Customizing Feedback

### Add Custom Checks

Edit `scripts/pre-commit-check.sh` to add your own checks:

```bash
# Add at the bottom of the script:

# Custom: Check for hardcoded URLs
echo ""
echo "🌐 Checking for hardcoded URLs..."
if git diff --cached | grep -iE "https?://localhost"; then
  print_warning "Found hardcoded localhost URLs"
  echo "💡 Use environment variables instead"
fi
```

### Modify PR Comment Template

Edit `.github/workflows/pr-feedback.yml` and customize the comment generation section.

### Add File-Specific Checks

Edit `scripts/check-changes.sh` to add checks for your custom file patterns.

---

## 🚨 When Things Fail

### Build Fails

**Inline annotation shows:**
```
❌ Type error: Cannot find module './User'
💡 Suggestion: Check file path spelling and verify file exists
```

**What to do:**
1. Read the error message carefully
2. Click the annotation to see the exact line
3. Run `pnpm build` locally to see full error
4. Fix the issue
5. Verify with `pnpm precommit`

### Security Scan Fails

**PR comment shows:**
```
⚠️ Security: 3 Vulnerabilities Found
Action Required: Address security vulnerabilities.

How to fix:
npm audit          # See details
npm audit fix      # Auto-fix
```

**What to do:**
1. Run `npm audit` to see details
2. Try `npm audit fix` to auto-fix
3. If can't auto-fix, manually update packages
4. Commit the fixes

### Merge Conflicts

GitHub will show which files conflict. **Don't auto-accept!**

**What to do:**
1. Pull latest changes: `git pull`
2. Manually resolve conflicts
3. Run `pnpm check` to verify still works
4. Commit the merge

---

## 📈 Metrics

The feedback system tracks:
- Build success rate
- Number of security issues caught
- Average time to fix issues
- Common error patterns

Check GitHub Actions summary for metrics.

---

## 🔗 Related Documentation

- [Merge Conflict Guide](../MERGE_CONFLICTS.md) - How to handle conflicts
- [CI/CD Documentation](devops/CI_CD_SETUP.md) - GitHub Actions setup
- [Security Best Practices](../SECURITY.md) - Security guidelines

---

## 💡 Pro Tips

1. **Run checks before committing**
   ```bash
   pnpm precommit  # Catches issues early
   ```

2. **Use the change analyzer**
   ```bash
   pnpm check:changes  # Get context-aware hints
   ```

3. **Set up commit template**
   ```bash
   git config --local commit.template .github/COMMIT_TEMPLATE.md
   ```

4. **Review PR comments**
   - Don't ignore automated comments
   - They contain actionable suggestions
   - Links to documentation for common issues

5. **Fix issues locally first**
   - Don't rely on CI/CD to catch errors
   - Faster feedback loop locally
   - Save CI/CD minutes

---

## 🤝 Contributing

To improve the feedback system:

1. Add new checks to `scripts/pre-commit-check.sh`
2. Enhance PR comment logic in `.github/workflows/pr-feedback.yml`
3. Add file pattern recommendations in `scripts/check-changes.sh`
4. Update this documentation

---

**Last Updated**: 2025-11-15
**Maintained By**: Development Team
