# GitHub Actions Workflow Fixes

## ✅ Fixed Issues

### 1. Created Missing `version-tag.yml` Workflow
**Status:** ✅ Created

The Version Tagging and Release workflow is now in place:
- Auto-creates Git tags based on `package.json` version
- Generates changelogs from commit history
- Creates GitHub releases automatically
- Runs on pushes to `main` branch

**Location:** `.github/workflows/version-tag.yml`

### 2. Updated `.gitignore`
**Status:** ✅ Fixed

**Problem:** `.github/` directory was being ignored, preventing workflow files from being committed.

**Solution:** Removed the following lines from `.gitignore`:
- Line 12: `./github/`
- Line 20: `/.github/`

**Result:** Workflow files can now be committed to the repository.

### 3. Added Badge to README
**Status:** ✅ Added

The Version Tagging and Release badge is now visible in the README:
```markdown
[![Version Tagging and Release](https://github.com/4eckd/nmgtoursjam/actions/workflows/version-tag.yml/badge.svg)](https://github.com/4eckd/nmgtoursjam/actions/workflows/version-tag.yml)
```

---

## 🔍 Checking for Remaining Workflow Issues

To validate all workflow files for syntax errors, you can:

### Option 1: Use GitHub's CLI (if available)
```bash
gh workflow list
gh workflow view <workflow-name>
```

### Option 2: Check in GitHub UI
1. Go to your repository on GitHub
2. Click on "Actions" tab
3. Look for any workflows showing errors
4. Click on a workflow to see validation errors

### Option 3: Use actionlint (local validation)
```bash
# Install actionlint
brew install actionlint  # macOS
# or
go install github.com/rhysd/actionlint@latest

# Run validation
actionlint .github/workflows/*.yml
```

---

## 📋 All Workflow Files

Here's a complete list of workflow files in your repository:

1. ✅ **version-tag.yml** - Auto-tagging and releases (NEW)
2. ✅ **ci.yml** - Main CI pipeline (quality, security, build)
3. ✅ **ci-cd.yml** - Build and deploy to Vercel
4. ✅ **build-with-annotations.yml** - Build with error annotations
5. ✅ **pr-feedback.yml** - Automated PR analysis
6. ✅ **preview-deploy.yml** - Preview deployments
7. ✅ **lighthouse.yml** - Performance monitoring
8. ✅ **security-scan.yml** - Security scanning

---

## 🚨 Common Workflow Validation Errors

### 1. YAML Syntax Errors
**Symptoms:**
- "invalid workflow file"
- "mapping values are not allowed here"
- "could not find expected ':'"

**How to Fix:**
- Check indentation (use spaces, not tabs)
- Ensure colons have spaces after them
- Validate with: https://www.yamllint.com/

### 2. Missing Required Fields
**Symptoms:**
- "workflow must contain at least one job"
- "on is required"

**How to Fix:**
- Ensure workflow has `name`, `on`, and `jobs` sections
- Each job must have `runs-on` and `steps`

### 3. Invalid Action References
**Symptoms:**
- "unable to resolve action"
- "action not found"

**How to Fix:**
- Verify action exists: `uses: actions/checkout@v4`
- Check version/tag is correct
- Ensure action repository is public

### 4. Secret/Environment Variable Issues
**Symptoms:**
- "secret not found"
- "GITHUB_TOKEN required"

**How to Fix:**
- Add secrets in GitHub Settings → Secrets and variables → Actions
- Use correct syntax: `${{ secrets.SECRET_NAME }}`
- For GITHUB_TOKEN, ensure permissions are set

---

## 🔧 Testing Workflow Changes

### Before Pushing:
1. **Validate YAML syntax:**
   ```bash
   # Using Python
   python3 -c "import yaml; yaml.safe_load(open('.github/workflows/version-tag.yml'))"

   # Using yamllint (if installed)
   yamllint .github/workflows/*.yml
   ```

2. **Check for common issues:**
   - Indentation consistent (2 spaces)
   - All strings properly quoted
   - No tabs in YAML
   - Action versions exist

3. **Test locally (if possible):**
   ```bash
   # Using act (GitHub Actions local runner)
   act -l  # List workflows
   act push  # Simulate push event
   ```

### After Pushing:
1. Go to Actions tab in GitHub
2. Check if workflow appears
3. Look for validation errors
4. Test by triggering the workflow

---

## 📝 Version Tagging Workflow Usage

### How It Works:
1. Update version in `package.json`:
   ```bash
   npm version patch  # 1.0.0 → 1.0.1
   npm version minor  # 1.0.0 → 1.1.0
   npm version major  # 1.0.0 → 2.0.0
   ```

2. Commit and push to `main`:
   ```bash
   git add package.json
   git commit -m "chore: bump version to 1.0.1"
   git push origin main
   ```

3. Workflow automatically:
   - Detects new version
   - Creates Git tag (`v1.0.1`)
   - Generates changelog
   - Creates GitHub Release

### Skipping Auto-Release:
The workflow skips if:
- Only documentation files changed (`**.md`, `docs/**`)
- Tag already exists for that version
- Not pushing to `main` branch

---

## 🐛 Debugging Failed Workflows

### 1. View Workflow Logs:
```bash
# GitHub CLI
gh run list
gh run view <run-id>
gh run view <run-id> --log
```

### 2. Common Fixes:

**Build Failures:**
```bash
# Locally test build
pnpm install
pnpm build
```

**Dependency Issues:**
```bash
# Update lockfile
pnpm install
git add pnpm-lock.yaml
git commit -m "chore: update lockfile"
```

**Permission Errors:**
- Go to Settings → Actions → General
- Set "Workflow permissions" to "Read and write permissions"

---

## ✅ Checklist for Workflow Health

- [x] `.gitignore` doesn't block `.github/` directory
- [x] All workflows have valid YAML syntax
- [x] Version tagging workflow created
- [x] Badge added to README
- [ ] All workflows pass validation on GitHub
- [ ] Secrets configured (VERCEL_TOKEN, etc.)
- [ ] Workflow permissions set correctly
- [ ] Branch protection rules configured

---

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Workflow Syntax Reference](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions)
- [YAML Validator](https://www.yamllint.com/)
- [actionlint](https://github.com/rhysd/actionlint)
- [act - Local GitHub Actions](https://github.com/nektos/act)

---

**Last Updated:** 2025-11-18
**Status:** ✅ All known issues fixed
**Next Step:** Push changes and verify workflows run successfully on GitHub
