# Branch Strategy

Git workflow and branching strategy for NMG Tours Jamaica

## Branch Structure

```
main
 └── integration/mvp-launch
      ├── feature/tour-listing
      ├── feature/booking-widget
      ├── feature/user-dashboard
      └── hotfix/critical-bug
```

## Branch Types

### `main`
- **Purpose**: Production-ready code
- **Protection**: Highest
- **Deployments**: Production (nmgtours.com)
- **Merge From**: `integration/mvp-launch` (via PR)
- **Direct Commits**: ❌ Never

### `integration/mvp-launch`
- **Purpose**: Integration branch for MVP features
- **Protection**: High
- **Deployments**: Staging/preview
- **Merge From**: `feature/*`, `hotfix/*` (via PR)
- **Direct Commits**: ❌ Never

### `feature/*`
- **Purpose**: New features
- **Naming**: `feature/description` (kebab-case)
- **Branch From**: `integration/mvp-launch`
- **Merge To**: `integration/mvp-launch`
- **Lifespan**: Delete after merge

**Examples:**
```bash
feature/tour-booking-widget
feature/payment-integration
feature/user-authentication
```

### `hotfix/*`
- **Purpose**: Emergency production fixes
- **Naming**: `hotfix/description`
- **Branch From**: `main`
- **Merge To**: `main` AND `integration/mvp-launch`
- **Lifespan**: Delete after merge

**Example:**
```bash
hotfix/critical-payment-bug
hotfix/security-vulnerability
```

### `release/*` (Future)
- **Purpose**: Release preparation
- **Naming**: `release/v1.0.0`
- **Branch From**: `integration/mvp-launch`
- **Merge To**: `main`
- **Use When**: Ready for production release

## Workflow

### Feature Development

```bash
# 1. Start from integration branch
git checkout integration/mvp-launch
git pull origin integration/mvp-launch

# 2. Create feature branch
git checkout -b feature/tour-booking-widget

# 3. Make changes, commit frequently
git add .
git commit -m "feat(booking): add date picker component"
git commit -m "feat(booking): add guest selector"

# 4. Keep up to date
git fetch origin integration/mvp-launch
git rebase origin/integration/mvp-launch

# 5. Push to remote
git push -u origin feature/tour-booking-widget

# 6. Create PR to integration/mvp-launch
gh pr create --base integration/mvp-launch \
  --title "feat(booking): Add tour booking widget" \
  --body "Implements date picker and guest selector for tour bookings"

# 7. After merge, delete branch
git checkout integration/mvp-launch
git pull
git branch -d feature/tour-booking-widget
git push origin --delete feature/tour-booking-widget
```

### Hotfix Process

```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/payment-processing-error

# 2. Make fix
git add .
git commit -m "fix(payment): resolve Stripe webhook timeout"

# 3. Push
git push -u origin hotfix/payment-processing-error

# 4. Create PR to main
gh pr create --base main \
  --title "fix(payment): Resolve Stripe webhook timeout" \
  --label "hotfix"

# 5. After merge to main, also merge to integration
git checkout integration/mvp-launch
git pull origin integration/mvp-launch
git merge hotfix/payment-processing-error
git push origin integration/mvp-launch

# 6. Delete hotfix branch
git branch -d hotfix/payment-processing-error
git push origin --delete hotfix/payment-processing-error
```

## Commit Conventions

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, missing semi-colons, etc. |
| `refactor` | Code restructuring |
| `perf` | Performance improvements |
| `test` | Adding tests |
| `chore` | Build tasks, dependencies |

### Examples

```bash
feat(tours): add filtering by price range
fix(booking): resolve date picker timezone issue
docs: update deployment guide
refactor(api): simplify tour query logic
perf(images): lazy load tour gallery
test(booking): add unit tests for date validation
chore(deps): update Next.js to 16.0.1
```

## Pull Request Process

### 1. Create PR

**Title:** Follow commit convention
```
feat(booking): Add tour booking widget
```

**Description Template:**
```markdown
## Description
Implements tour booking widget with date picker and guest selector

## Changes
- Added DatePicker component
- Added GuestSelector component
- Integrated with booking API
- Added validation

## Testing
- [x] Unit tests added
- [x] E2E tests pass
- [x] Manual testing on preview

## Screenshots
[Add screenshots]

## Checklist
- [x] Builds successfully
- [x] No linting errors
- [x] Tests pass
- [x] Documentation updated
```

### 2. Code Review

**Required:**
- 1 approval for `integration/*`
- 2 approvals for `main`

**Review Checklist:**
- Code follows style guide
- Tests are comprehensive
- No security vulnerabilities
- Performance is acceptable
- Documentation is updated

### 3. Merge

**Method:** Squash and merge

**Merge Message:**
```
feat(booking): Add tour booking widget (#42)

* Add DatePicker component
* Add GuestSelector component
* Integrate with booking API
* Add validation and tests
```

## Branch Protection Rules

### `integration/mvp-launch`

```yaml
Require pull request before merging: ✅
  Required approvals: 1
  Dismiss stale reviews: ✅
  Require review from code owners: ❌

Require status checks to pass: ✅
  Required checks:
    - build
    - quality (lint, type-check)
    - security
    - test

Require branches to be up to date: ✅
Require conversation resolution: ✅
Require signed commits: ❌
Require linear history: ✅
Include administrators: ✅

Allow force pushes: ❌
Allow deletions: ❌
```

### `main`

```yaml
Same as integration/mvp-launch, plus:
  Required approvals: 2
  Additional required checks:
    - lighthouse (performance > 80)
  Require deployments to succeed: ✅
```

## Merge Conflicts

### Prevention

```bash
# Regularly rebase on base branch
git fetch origin integration/mvp-launch
git rebase origin/integration/mvp-launch
```

### Resolution

```bash
# 1. Fetch latest
git fetch origin integration/mvp-launch

# 2. Rebase
git rebase origin/integration/mvp-launch

# 3. Resolve conflicts in files
# Edit conflicted files, then:
git add .
git rebase --continue

# 4. Force push (your branch only!)
git push --force-with-lease
```

## Branch Cleanup

### Delete Merged Branches

```bash
# Delete local merged branches
git branch --merged | grep -v "\*\|main\|integration" | xargs -n 1 git branch -d

# Delete remote merged branches
git fetch --prune
```

### Stale Branch Policy

- Feature branches > 30 days old → Review and close PR
- Branches with no activity > 60 days → Auto-close PR

## Best Practices

### DO ✅

- Branch from `integration/mvp-launch` for features
- Keep branches small and focused
- Rebase frequently to avoid conflicts
- Write descriptive commit messages
- Run tests before pushing
- Delete branches after merge

### DON'T ❌

- Commit directly to `main` or `integration/*`
- Create long-lived feature branches
- Force push to shared branches
- Merge without passing CI
- Leave branches undeleted after merge

## Emergency Procedures

### Revert Bad Merge

```bash
# Find commit hash
git log

# Revert merge commit
git revert -m 1 <merge-commit-hash>

# Push
git push origin integration/mvp-launch
```

### Rollback Production

```bash
# Option 1: Revert on main
git checkout main
git revert <bad-commit-hash>
git push origin main

# Option 2: Hotfix
# Create hotfix branch from previous good commit
git checkout -b hotfix/rollback <good-commit-hash>
# Create PR to main
```

---

**Last Updated**: 2025-11-15
