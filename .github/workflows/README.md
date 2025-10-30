# GitHub Actions Workflows

This directory contains automated workflows for the NMG Tours Jamaica project.

## Available Workflows

### 1. Version Tagging and Release (`version-tag.yml`)

**Purpose**: Automatically creates version tags and GitHub releases based on conventional commit messages.

**Trigger**: Push to `main` or `integration/mvp-launch` branches

**How It Works**:
1. Analyzes commit messages using Conventional Commits format
2. Determines version bump type (major/minor/patch)
3. Updates `package.json` version
4. Updates `docs/CHANGELOG.md` with new entry
5. Creates annotated Git tag (e.g., `v1.2.3`)
6. Pushes changes and tag to remote
7. Creates GitHub Release automatically

**Commit Message Patterns**:

| Pattern | Version Bump | Example |
|---------|--------------|---------|
| `feat(...):` or `feature(...):` | **MINOR** | `feat(tours): add review system` → `1.0.0` → `1.1.0` |
| `fix(...):` | **PATCH** | `fix(booking): correct email format` → `1.1.0` → `1.1.1` |
| `BREAKING CHANGE` or `feat(...)!:` | **MAJOR** | `feat(api)!: redesign booking API` → `1.1.1` → `2.0.0` |
| `refactor(...):`, `perf(...):`, `docs:`, `chore:` | **PATCH** | `refactor(ui): improve button styling` → `1.1.1` → `1.1.2` |

**Examples**:

```bash
# Minor version bump (new feature)
git commit -m "feat(tours): add multi-language support"
# Result: 1.0.0 → 1.1.0, creates tag v1.1.0

# Patch version bump (bug fix)
git commit -m "fix(booking): correct confirmation email formatting"
# Result: 1.1.0 → 1.1.1, creates tag v1.1.1

# Major version bump (breaking change)
git commit -m "feat(api)!: redesign booking endpoints

BREAKING CHANGE: All booking API endpoints now use /api/v2/bookings"
# Result: 1.1.1 → 2.0.0, creates tag v2.0.0
```

**What Gets Created**:
- ✅ Updated `package.json` with new version
- ✅ Updated `docs/CHANGELOG.md` with entry
- ✅ Annotated Git tag (e.g., `v1.2.3`)
- ✅ GitHub Release with notes
- ✅ Commit: `chore: bump version to vX.Y.Z`

**Permissions Required**:
- `contents: write` - For creating tags and releases
- `issues: write` - For release notes
- `pull-requests: write` - For PR updates

**When It Doesn't Run**:
- Commits without conventional commit format
- Commits to feature branches
- Documentation-only changes without `docs:` prefix

**Manual Override**:

If you need to create a version manually:

```bash
# Bump version (without git tag)
npm version minor --no-git-tag-version  # 1.0.0 → 1.1.0

# Update CHANGELOG manually
# Edit docs/CHANGELOG.md

# Commit changes
git add package.json docs/CHANGELOG.md
git commit -m "chore: bump version to v1.1.0"

# Create and push tag
git tag -a v1.1.0 -m "Release v1.1.0: New features"
git push origin main --follow-tags
```

## Workflow Configuration

### Secrets Required

No additional secrets needed beyond the default `GITHUB_TOKEN`.

### Environment Variables

None required.

### Branch Protection

Recommended settings for `main` and `integration/mvp-launch`:
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ❌ Do NOT require signed commits (workflow bot can't sign)

## Troubleshooting

### Workflow Not Triggering

**Problem**: Workflow doesn't run after push
**Solution**: Check that:
1. Commit message follows conventional commit format
2. Push is to `main` or `integration/mvp-launch` branch
3. Commit contains version keywords (`feat`, `fix`, `BREAKING CHANGE`)

### Tag Already Exists

**Problem**: "tag already exists" error
**Solution**:
```bash
# Delete local and remote tag
git tag -d v1.2.3
git push origin --delete v1.2.3

# Re-run workflow or create tag manually
```

### Permission Denied

**Problem**: Workflow can't push tags or create releases
**Solution**: Ensure repository has Actions write permissions enabled:
- Go to Settings → Actions → General
- Workflow permissions: Select "Read and write permissions"

## Monitoring

### View Workflow Runs
- Go to: https://github.com/yourusername/nmgtoursjam/actions
- Filter by: "Version Tagging and Release"

### Check Tags
```bash
# List all tags
git tag -l

# Show latest tag
git describe --tags --abbrev=0

# View tag details
git show v1.2.3
```

### View Releases
- Go to: https://github.com/yourusername/nmgtoursjam/releases

## Version Strategy

For complete versioning strategy details, see: [`docs/VERSIONING-STRATEGY.md`](../../docs/VERSIONING-STRATEGY.md)

**Current Development Phase**: `v0.x.x` (MVP)
**Production Phase**: `v1.x.x+` (Post-MVP)

### Development Phase (0.x.x)
- Breaking changes allowed without major bump
- MINOR for each completed track
- PATCH for fixes between tracks

### Production Phase (1.x.x+)
- Strict semantic versioning
- Breaking changes require major bump
- MINOR for new features
- PATCH for bug fixes

## References

- [Semantic Versioning 2.0.0](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Keep a Changelog](https://keepachangelog.com/)
