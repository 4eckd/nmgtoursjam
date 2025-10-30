# Versioning and Tagging Strategy

This document outlines the semantic versioning and Git tagging strategy for NMG Tours Jamaica.

## Semantic Versioning

We follow [Semantic Versioning 2.0.0](https://semver.org/) with the format: **MAJOR.MINOR.PATCH**

```
MAJOR.MINOR.PATCH[-PRERELEASE][+BUILDMETA]

Example: 1.2.3-beta.1+20250129
```

### Version Components

#### MAJOR (X.0.0)
Increment when making **incompatible API changes** or major functionality changes:
- Breaking changes to API endpoints
- Database schema changes requiring migration
- Removal of deprecated features
- Major architectural refactoring
- Changes that break backward compatibility

**Examples:**
- `0.x.x → 1.0.0` - Initial production release (MVP launch)
- `1.x.x → 2.0.0` - New booking system that changes API contracts
- `2.x.x → 3.0.0` - Removing NextAuth and switching to custom auth

#### MINOR (0.X.0)
Increment when adding **new features** in a backward-compatible manner:
- New tour categories or features
- New payment methods
- New user roles or permissions
- Enhanced filtering or search capabilities
- New pages or routes
- Performance improvements

**Examples:**
- `1.0.0 → 1.1.0` - Add multi-language support
- `1.1.0 → 1.2.0` - Add review and rating system
- `1.2.0 → 1.3.0` - Add admin dashboard

#### PATCH (0.0.X)
Increment for **backward-compatible bug fixes** and minor improvements:
- Bug fixes
- UI/UX improvements
- Performance optimizations
- Security patches
- Documentation updates
- Dependency updates
- Accessibility improvements

**Examples:**
- `1.2.0 → 1.2.1` - Fix booking confirmation email formatting
- `1.2.1 → 1.2.2` - Fix mobile navigation menu overflow
- `1.2.2 → 1.2.3` - Update dependencies for security patch

### Pre-release Versions

Use pre-release identifiers for versions not yet ready for production:

```
X.Y.Z-alpha.N    # Early development, unstable
X.Y.Z-beta.N     # Feature complete, testing phase
X.Y.Z-rc.N       # Release candidate, final testing
```

**Examples:**
- `1.0.0-alpha.1` - First alpha of version 1.0.0
- `1.0.0-beta.1` - First beta of version 1.0.0
- `1.0.0-rc.1` - First release candidate of version 1.0.0
- `1.0.0` - Production release

### Build Metadata

Optional build metadata can be appended with `+`:

```
1.2.3+20250129        # With build date
1.2.3+build.123       # With build number
1.2.3-beta.1+exp.sha  # With commit SHA
```

## Git Tagging Strategy

### Tag Format

All version tags use the `v` prefix:

```bash
vMAJOR.MINOR.PATCH[-PRERELEASE]

Examples:
v0.8.0        # MVP complete
v1.0.0        # Production launch
v1.1.0-beta.1 # Beta release
v1.2.3        # Patch release
```

### Creating Tags

#### Lightweight Tags (Not Recommended)
```bash
git tag v1.0.0
```

#### Annotated Tags (Recommended)
```bash
# Create annotated tag with message
git tag -a v1.0.0 -m "Release v1.0.0: Production MVP Launch"

# Create tag with detailed description
git tag -a v1.1.0 -m "Release v1.1.0: Multi-language Support

- Added English, Spanish, and French translations
- Updated all UI components for i18n
- Added language switcher to navigation
- Updated documentation

See CHANGELOG.md for complete details."
```

#### Signing Tags (Production Releases)
```bash
# Sign tag with GPG key (recommended for production)
git tag -s v1.0.0 -m "Release v1.0.0: Production MVP Launch"
```

### Pushing Tags

```bash
# Push specific tag
git push origin v1.0.0

# Push all tags
git push origin --tags

# Push tag and commits together
git push origin main --follow-tags
```

### Listing Tags

```bash
# List all tags
git tag

# List tags matching pattern
git tag -l "v1.*"

# Show tag details
git show v1.0.0
```

### Deleting Tags

```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
```

## Version Lifecycle

### Development Phase (0.x.x)

**Current Status**: We are here (v0.8.0)

```
0.1.0 → Track 1 complete (Foundation)
0.2.0 → Track 2 complete (Database)
0.3.0 → Track 2 expanded (Seed data)
0.5.0 → Track 3 complete (Tours System)
0.6.0 → Track 4 complete (Authentication)
0.8.0 → Track 5 complete (Booking & Payments) - MVP COMPLETE
```

**Rules for 0.x.x:**
- Breaking changes are allowed without incrementing MAJOR
- MINOR version increments for each completed track
- PATCH version for fixes between tracks

### Production Phase (1.x.x+)

**After MVP Launch**: Version 1.0.0+

```
1.0.0   → Production MVP launch (from 0.8.0)
1.0.1   → Bug fixes post-launch
1.1.0   → First feature addition (e.g., reviews)
1.2.0   → Second feature addition (e.g., multi-language)
2.0.0   → Major redesign or breaking change
```

**Rules for 1.x.x+:**
- MAJOR version changes require migration guide
- MINOR versions ship with release notes
- PATCH versions can be deployed immediately

## Tagging Workflow

### 1. Complete Feature or Fix

```bash
# Ensure you're on the correct branch
git checkout main
git pull origin main

# Verify build passes
pnpm build

# Run tests
pnpm test  # When available
```

### 2. Update CHANGELOG

Edit `docs/CHANGELOG.md`:

```markdown
## [1.2.0] - 2025-11-01

### Added
- Multi-language support for English, Spanish, French
- Language switcher in navigation
- Translated all UI strings

### Fixed
- Mobile menu overflow on small screens
- Date picker timezone issues

### Changed
- Updated Stripe SDK to v19.2.0
```

### 3. Commit CHANGELOG

```bash
git add docs/CHANGELOG.md
git commit -m "docs: update CHANGELOG for v1.2.0 release"
```

### 4. Create Version Tag

```bash
# For production releases (use signed tags)
git tag -s v1.2.0 -m "Release v1.2.0: Multi-language Support

- Added English, Spanish, and French translations
- Updated all UI components for i18n
- Added language switcher to navigation

See docs/CHANGELOG.md for complete details."

# For development releases (annotated tags)
git tag -a v0.9.0 -m "Release v0.9.0: Post-MVP improvements"
```

### 5. Push to Remote

```bash
# Push commits and tag
git push origin main
git push origin v1.2.0

# Or push with --follow-tags
git push origin main --follow-tags
```

### 6. Create GitHub Release

```bash
# Using GitHub CLI
gh release create v1.2.0 \
  --title "v1.2.0: Multi-language Support" \
  --notes "See [CHANGELOG.md](./docs/CHANGELOG.md) for details"

# Or manually at: https://github.com/yourusername/nmgtoursjam/releases/new
```

## Release Types and Cadence

### Development Releases (0.x.x)
- **Frequency**: After each track completion
- **Testing**: Required build pass
- **Announcement**: Internal team only

### Production Patches (X.X.PATCH)
- **Frequency**: As needed for critical bugs
- **Testing**: Build + manual testing
- **Announcement**: Release notes on GitHub

### Production Minor (X.MINOR.0)
- **Frequency**: Monthly or when feature is complete
- **Testing**: Full QA cycle + user testing
- **Announcement**: Release notes + email to users

### Production Major (MAJOR.0.0)
- **Frequency**: 6-12 months
- **Testing**: Extended beta period + migration testing
- **Announcement**: Full marketing campaign + migration guide

## Version Branches

### Main Branches
- `main` - Production code (v1.x.x tags)
- `integration/mvp-launch` - MVP integration (v0.x.x tags)
- `develop` - Future development work (no tags)

### Release Branches (for major versions)
```bash
# Create release branch for v2.0.0
git checkout -b release/v2.0.0

# Make final adjustments
# Update version in package.json
# Update CHANGELOG

# Tag release
git tag -s v2.0.0 -m "Release v2.0.0: Major redesign"

# Merge back to main
git checkout main
git merge release/v2.0.0
git push origin main v2.0.0

# Delete release branch
git branch -d release/v2.0.0
```

## Package.json Version Sync

Always keep `package.json` version in sync with Git tags:

```json
{
  "name": "nmgtoursjam",
  "version": "1.2.0",
  ...
}
```

**Update script**:
```bash
# Update package.json version
npm version 1.2.0 --no-git-tag-version

# Or use npm version command (creates tag automatically)
npm version minor  # 1.1.0 → 1.2.0
npm version patch  # 1.2.0 → 1.2.1
npm version major  # 1.2.1 → 2.0.0
```

## Version Automation

### Automated Version Bumping (Future)

Consider using tools like:
- **semantic-release** - Automated versioning based on commit messages
- **standard-version** - Changelog generation and version bumping
- **release-it** - Interactive release tool

Example with `standard-version`:

```bash
# Install
pnpm add -D standard-version

# Add script to package.json
{
  "scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major"
  }
}

# Create release
pnpm release        # Auto-detect version
pnpm release:minor  # Force minor bump
pnpm release:major  # Force major bump
```

## Deprecation Policy

### Marking Features as Deprecated

```markdown
## [1.5.0] - 2025-12-01

### Deprecated
- Old booking API (`/api/v1/bookings`) - Use `/api/v2/bookings` instead
- Will be removed in v2.0.0
```

### Timeline
- **Announce**: In CHANGELOG when deprecated
- **Support**: For at least one MAJOR version
- **Remove**: In next MAJOR version (with migration guide)

## Examples

### MVP Launch (0.8.0 → 1.0.0)

```bash
# Update package.json
npm version 1.0.0 --no-git-tag-version

# Update CHANGELOG.md
# Add entry for v1.0.0

# Commit changes
git add package.json docs/CHANGELOG.md
git commit -m "chore: bump version to v1.0.0 for production launch"

# Create signed tag
git tag -s v1.0.0 -m "Release v1.0.0: Production MVP Launch

🎉 NMG Tours Jamaica is now live!

This release marks the completion of the MVP with all 5 tracks:
- Foundation & Marketing
- Database & Infrastructure
- Tours System
- Authentication & User Management
- Booking & Payment System

Ready for production deployment to Vercel.

See docs/CHANGELOG.md for complete release notes."

# Push to remote
git push origin main --follow-tags

# Create GitHub release
gh release create v1.0.0 \
  --title "v1.0.0: Production MVP Launch 🎉" \
  --notes-file docs/PRODUCTION-RELEASE-NOTES.md
```

### Patch Release (1.0.0 → 1.0.1)

```bash
# Fix bug, commit changes
git add .
git commit -m "fix(bookings): correct email confirmation formatting"

# Update version
npm version patch --no-git-tag-version  # 1.0.0 → 1.0.1

# Update CHANGELOG
# Add entry for v1.0.1

# Commit version bump
git add package.json docs/CHANGELOG.md
git commit -m "chore: bump version to v1.0.1"

# Create tag
git tag -a v1.0.1 -m "Release v1.0.1: Bug fixes

- Fixed email confirmation formatting
- Improved mobile menu responsiveness"

# Push
git push origin main --follow-tags
```

## Summary

### Quick Reference

| Type | When | Example | Tag |
|------|------|---------|-----|
| **MAJOR** | Breaking changes | `1.5.2 → 2.0.0` | `v2.0.0` |
| **MINOR** | New features | `1.5.2 → 1.6.0` | `v1.6.0` |
| **PATCH** | Bug fixes | `1.5.2 → 1.5.3` | `v1.5.3` |
| **Pre-release** | Testing | `1.6.0-beta.1` | `v1.6.0-beta.1` |

### Current Version

**Latest**: `v0.8.0` (MVP Complete)
**Next**: `v1.0.0` (Production Launch)

---

**References**:
- [Semantic Versioning 2.0.0](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Git Tagging Basics](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- [Conventional Commits](https://www.conventionalcommits.org/)
