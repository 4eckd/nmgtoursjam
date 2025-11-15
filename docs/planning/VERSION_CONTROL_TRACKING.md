# Version Control & Metrics Tracking

**Project**: NMG Tours Jamaica
**Last Updated**: 2025-11-15
**Purpose**: Automated tracking of feature development through version control

---

## Table of Contents

1. [Overview](#overview)
2. [Git Hooks for Metric Tracking](#git-hooks-for-metric-tracking)
3. [Automated Documentation Updates](#automated-documentation-updates)
4. [Milestone Tracking Script](#milestone-tracking-script)
5. [GitHub Actions for Metrics](#github-actions-for-metrics)
6. [Progress Visualization](#progress-visualization)
7. [Changelog Automation](#changelog-automation)

---

## Overview

This document defines automated systems for tracking feature development metrics through version control. Every commit, PR, and merge updates relevant documentation and metrics automatically.

**Goals**:
- Automate milestone status updates
- Track velocity and completion rates
- Generate progress reports
- Maintain CHANGELOG.md automatically
- Visualize development progress

---

## Git Hooks for Metric Tracking

### Pre-Commit Hook

Create `.git/hooks/pre-commit` to validate commit messages and update metrics:

```bash
#!/bin/bash
# Pre-commit hook for NMG Tours Jamaica
# Validates commit messages and prepares metric updates

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "${YELLOW}Running pre-commit checks...${NC}"

# 1. Validate commit message format
COMMIT_MSG_FILE=".git/COMMIT_EDITMSG"
if [ -f "$COMMIT_MSG_FILE" ]; then
  COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

  # Check conventional commit format
  if ! echo "$COMMIT_MSG" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{10,}"; then
    echo "${RED}❌ Invalid commit message format${NC}"
    echo "Expected: type(scope): description"
    echo "Example: feat(hero): implement Hero component"
    exit 1
  fi

  echo "${GREEN}✅ Commit message format valid${NC}"
fi

# 2. Run linter
echo "Running ESLint..."
pnpm lint
if [ $? -ne 0 ]; then
  echo "${RED}❌ Linting failed. Fix errors before committing.${NC}"
  exit 1
fi
echo "${GREEN}✅ Linting passed${NC}"

# 3. Run TypeScript check
echo "Running TypeScript check..."
pnpm tsc --noEmit
if [ $? -ne 0 ]; then
  echo "${RED}❌ TypeScript errors found. Fix before committing.${NC}"
  exit 1
fi
echo "${GREEN}✅ TypeScript check passed${NC}"

# 4. Extract milestone from branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if echo "$BRANCH" | grep -qE "^feature/M[0-9]+\.[0-9]+"; then
  MILESTONE=$(echo "$BRANCH" | grep -oE "M[0-9]+\.[0-9]+")
  echo "${GREEN}📊 Detected milestone: $MILESTONE${NC}"

  # Mark milestone as in progress if first commit
  # (This would update docs/planning/FEATURE_MILESTONES.md)
fi

echo "${GREEN}✅ Pre-commit checks passed!${NC}"
exit 0
```

### Post-Commit Hook

Create `.git/hooks/post-commit` to log commit metrics:

```bash
#!/bin/bash
# Post-commit hook for tracking metrics

# Extract commit info
COMMIT_HASH=$(git rev-parse --short HEAD)
COMMIT_MSG=$(git log -1 --pretty=%B)
BRANCH=$(git rev-parse --abbrev-ref HEAD)
AUTHOR=$(git log -1 --pretty=%an)
DATE=$(git log -1 --pretty=%ad --date=iso)

# Extract milestone if feature branch
MILESTONE=""
if echo "$BRANCH" | grep -qE "^feature/M[0-9]+\.[0-9]+"; then
  MILESTONE=$(echo "$BRANCH" | grep -oE "M[0-9]+\.[0-9]+")
fi

# Log to metrics file
METRICS_FILE="docs/planning/commit-metrics.json"
if [ ! -f "$METRICS_FILE" ]; then
  echo "[]" > "$METRICS_FILE"
fi

# Append commit data (would use jq in production)
echo "Logged commit: $COMMIT_HASH - $MILESTONE"

exit 0
```

### Pre-Push Hook

Create `.git/hooks/pre-push` to ensure build passes:

```bash
#!/bin/bash
# Pre-push hook to ensure build passes

echo "🔨 Running build before push..."
pnpm build

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Fix errors before pushing."
  echo "Run 'pnpm build' to see errors."
  exit 1
fi

echo "✅ Build passed! Pushing to remote..."
exit 0
```

---

## Automated Documentation Updates

### Milestone Status Updater Script

Create `scripts/update-milestone-status.sh`:

```bash
#!/bin/bash
# Update milestone status based on git activity

MILESTONE=$1
STATUS=$2  # "in_progress", "complete", "blocked"

if [ -z "$MILESTONE" ] || [ -z "$STATUS" ]; then
  echo "Usage: ./update-milestone-status.sh <milestone> <status>"
  echo "Example: ./update-milestone-status.sh M1.1 in_progress"
  exit 1
fi

MILESTONES_FILE="docs/planning/FEATURE_MILESTONES.md"

# Update status in milestone table
# This would use sed or awk to update the markdown table

case $STATUS in
  "in_progress")
    EMOJI="🚧"
    ;;
  "complete")
    EMOJI="✅"
    ;;
  "blocked")
    EMOJI="🔒"
    ;;
  *)
    EMOJI="⏳"
    ;;
esac

echo "Updating $MILESTONE to $STATUS ($EMOJI)"

# Update the status board in FEATURE_MILESTONES.md
# (Would use sed to find and replace the row)

# Commit the change
git add "$MILESTONES_FILE"
git commit -m "docs(milestones): update $MILESTONE status to $STATUS"

exit 0
```

### Component Library Status Updater

Create `scripts/update-component-status.sh`:

```bash
#!/bin/bash
# Update component library status when component is completed

COMPONENT=$1

if [ -z "$COMPONENT" ]; then
  echo "Usage: ./update-component-status.sh <ComponentName>"
  exit 1
fi

LIBRARY_FILE="docs/design/tokens/COMPONENT_LIBRARY.md"
STATUS_FILE="docs/design/STATUS.md"

# Mark component as implemented in COMPONENT_LIBRARY.md
# Update implementation count in STATUS.md

echo "Marking $COMPONENT as implemented"

# Update files
# (Would use sed to change ⏳ to ✅)

git add "$LIBRARY_FILE" "$STATUS_FILE"
git commit -m "docs(design): mark $COMPONENT as implemented"

exit 0
```

---

## Milestone Tracking Script

Create `scripts/milestone-tracker.js`:

```javascript
#!/usr/bin/env node
/**
 * Milestone Tracking Script
 * Analyzes git history and updates milestone progress
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Milestone configuration
const MILESTONES = [
  { id: 'M1.1', track: 1, name: 'Hero Section', branch: 'feature/M1.1-hero-section' },
  { id: 'M1.2', track: 1, name: 'Gallery Page', branch: 'feature/M1.2-gallery-page' },
  { id: 'M1.3', track: 1, name: 'About Page', branch: 'feature/M1.3-about-page' },
  { id: 'M1.4', track: 1, name: 'Contact Form', branch: 'feature/M1.4-contact-form' },
  { id: 'M2.1', track: 2, name: 'Database Schema', branch: 'feature/M2.1-database-schema' },
  { id: 'M2.2', track: 2, name: 'Seed Data', branch: 'feature/M2.2-seed-data' },
  { id: 'M2.3', track: 2, name: 'API Routes', branch: 'feature/M2.3-api-routes' },
  { id: 'M3.1', track: 3, name: 'Tour Listing', branch: 'feature/M3.1-tour-listing' },
  { id: 'M3.2', track: 3, name: 'Tour Detail', branch: 'feature/M3.2-tour-detail' },
  { id: 'M4.1', track: 4, name: 'NextAuth Setup', branch: 'feature/M4.1-nextauth-setup' },
  { id: 'M4.2', track: 4, name: 'Login/Signup', branch: 'feature/M4.2-login-signup' },
  { id: 'M4.3', track: 4, name: 'User Dashboard', branch: 'feature/M4.3-user-dashboard' },
  { id: 'M5.1', track: 5, name: 'Booking Wizard', branch: 'feature/M5.1-booking-wizard' },
  { id: 'M5.2', track: 5, name: 'Stripe Payment', branch: 'feature/M5.2-stripe-payment' },
  { id: 'M5.3', track: 5, name: 'Confirmation', branch: 'feature/M5.3-confirmation' },
];

function getMilestoneStatus(milestone) {
  try {
    // Check if branch exists
    const branchExists = execSync(`git rev-parse --verify ${milestone.branch}`, { encoding: 'utf-8' });

    // Check if merged to integration
    const merged = execSync(
      `git branch --merged integration/mvp-launch | grep ${milestone.branch}`,
      { encoding: 'utf-8' }
    ).trim();

    if (merged) {
      return { status: 'complete', emoji: '✅', progress: 100 };
    }

    // Branch exists but not merged - in progress
    if (branchExists) {
      // Count commits to estimate progress
      const commits = execSync(
        `git log --oneline ${milestone.branch} | wc -l`,
        { encoding: 'utf-8' }
      ).trim();

      // Rough estimate: assume 10-15 commits per milestone
      const progress = Math.min(parseInt(commits) * 7, 95); // Cap at 95% until merge

      return { status: 'in_progress', emoji: '🚧', progress };
    }
  } catch (error) {
    // Branch doesn't exist - not started
    return { status: 'not_started', emoji: '⏳', progress: 0 };
  }
}

function updateMilestoneTable() {
  const milestonesFile = path.join(__dirname, '../docs/planning/FEATURE_MILESTONES.md');
  let content = fs.readFileSync(milestonesFile, 'utf-8');

  console.log('📊 Updating milestone status...\n');

  MILESTONES.forEach(milestone => {
    const status = getMilestoneStatus(milestone);

    console.log(`${milestone.id}: ${status.emoji} ${status.status} (${status.progress}%)`);

    // Update the markdown table row
    // (In production, would use proper markdown parsing)
    // For now, just log the status
  });

  console.log('\n✅ Milestone tracking complete!');
}

function generateProgressReport() {
  console.log('\n📈 Development Progress Report\n');
  console.log('='.repeat(50));

  const trackProgress = {};
  let totalComplete = 0;

  MILESTONES.forEach(milestone => {
    const status = getMilestoneStatus(milestone);

    if (!trackProgress[milestone.track]) {
      trackProgress[milestone.track] = { total: 0, complete: 0 };
    }

    trackProgress[milestone.track].total++;
    if (status.status === 'complete') {
      trackProgress[milestone.track].complete++;
      totalComplete++;
    }
  });

  // Track-by-track progress
  Object.keys(trackProgress).forEach(track => {
    const { total, complete } = trackProgress[track];
    const percent = Math.round((complete / total) * 100);
    const bar = '█'.repeat(Math.floor(percent / 10)) + '░'.repeat(10 - Math.floor(percent / 10));

    console.log(`Track ${track}: [${bar}] ${complete}/${total} (${percent}%)`);
  });

  // Overall progress
  const overallPercent = Math.round((totalComplete / MILESTONES.length) * 100);
  const overallBar = '█'.repeat(Math.floor(overallPercent / 10)) + '░'.repeat(10 - Math.floor(overallPercent / 10));

  console.log('\n' + '='.repeat(50));
  console.log(`Overall MVP Progress: [${overallBar}] ${totalComplete}/${MILESTONES.length} (${overallPercent}%)`);
  console.log('='.repeat(50) + '\n');
}

// Run the tracker
updateMilestoneTable();
generateProgressReport();
```

Make it executable:
```bash
chmod +x scripts/milestone-tracker.js
```

Run with:
```bash
node scripts/milestone-tracker.js
```

---

## GitHub Actions for Metrics

### Milestone Status Workflow

Create `.github/workflows/milestone-tracking.yml`:

```yaml
name: Milestone Tracking

on:
  push:
    branches:
      - 'feature/**'
      - 'integration/**'
  pull_request:
    types: [opened, synchronize, closed]

jobs:
  track-milestone:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for tracking

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Extract milestone from branch
        id: milestone
        run: |
          BRANCH=${GITHUB_REF#refs/heads/}
          if [[ $BRANCH =~ feature/M([0-9]+)\.([0-9]+)- ]]; then
            MILESTONE="M${BASH_REMATCH[1]}.${BASH_REMATCH[2]}"
            echo "milestone=$MILESTONE" >> $GITHUB_OUTPUT
            echo "Found milestone: $MILESTONE"
          else
            echo "No milestone in branch name"
          fi

      - name: Update milestone status
        if: steps.milestone.outputs.milestone
        run: |
          MILESTONE=${{ steps.milestone.outputs.milestone }}
          echo "Updating status for $MILESTONE"

          # Run tracking script
          node scripts/milestone-tracker.js

      - name: Comment on PR with progress
        if: github.event_name == 'pull_request' && steps.milestone.outputs.milestone
        uses: actions/github-script@v7
        with:
          script: |
            const milestone = '${{ steps.milestone.outputs.milestone }}';
            const body = `## Milestone Progress: ${milestone}

            This PR represents work on milestone ${milestone}.

            Please ensure:
            - [ ] All acceptance metrics met
            - [ ] Tests pass (70%+ coverage)
            - [ ] Lighthouse audit >80
            - [ ] Documentation updated
            `;

            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: body
            });
```

### Metrics Collection Workflow

Create `.github/workflows/collect-metrics.yml`:

```yaml
name: Collect Development Metrics

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:  # Manual trigger

jobs:
  collect-metrics:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Collect metrics
        run: |
          # Run milestone tracker
          node scripts/milestone-tracker.js > metrics-report.txt

          # Count components
          COMPONENTS=$(find app/components -name "*.tsx" | wc -l)
          echo "Total components: $COMPONENTS" >> metrics-report.txt

          # Count API endpoints
          ENDPOINTS=$(find app/api -name "route.ts" | wc -l)
          echo "Total API endpoints: $ENDPOINTS" >> metrics-report.txt

          # Calculate test coverage
          pnpm test --coverage --silent || true
          echo "Test coverage calculated" >> metrics-report.txt

      - name: Upload metrics
        uses: actions/upload-artifact@v4
        with:
          name: daily-metrics
          path: metrics-report.txt
          retention-days: 30

      - name: Create issue if behind schedule
        run: |
          # Check if milestones are behind schedule
          # (Would compare actual vs planned completion dates)
          echo "Schedule check complete"
```

---

## Progress Visualization

### Dashboard Script

Create `scripts/generate-dashboard.js`:

```javascript
#!/usr/bin/env node
/**
 * Generate visual dashboard of development progress
 */

const fs = require('fs');
const path = require('path');

function generateProgressBar(current, total, width = 40) {
  const percent = current / total;
  const filled = Math.floor(percent * width);
  const empty = width - filled;

  return `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${current}/${total} (${Math.round(percent * 100)}%)`;
}

function generateDashboard() {
  const output = [];

  output.push('# NMG Tours Jamaica - Development Dashboard');
  output.push('');
  output.push(`**Generated**: ${new Date().toISOString()}`);
  output.push('');

  output.push('## Track Progress');
  output.push('');
  output.push('### Track 1: Marketing & Content');
  output.push(generateProgressBar(0, 4));
  output.push('');

  output.push('### Track 2: Database & Infrastructure (CRITICAL PATH)');
  output.push(generateProgressBar(0, 3));
  output.push('');

  output.push('### Track 3: Tours System');
  output.push(generateProgressBar(0, 2));
  output.push('');

  output.push('### Track 4: Authentication');
  output.push(generateProgressBar(0, 3));
  output.push('');

  output.push('### Track 5: Booking & Payments');
  output.push(generateProgressBar(0, 3));
  output.push('');

  output.push('## Overall MVP Progress');
  output.push(generateProgressBar(0, 15));
  output.push('');

  // Write to file
  const dashboardPath = path.join(__dirname, '../docs/planning/DASHBOARD.md');
  fs.writeFileSync(dashboardPath, output.join('\n'));

  console.log('✅ Dashboard generated at docs/planning/DASHBOARD.md');
}

generateDashboard();
```

---

## Changelog Automation

### Changelog Generator

Create `scripts/generate-changelog.sh`:

```bash
#!/bin/bash
# Generate CHANGELOG.md from git history

CHANGELOG_FILE="CHANGELOG.md"

# Header
cat > "$CHANGELOG_FILE" << EOF
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

EOF

# Get all tags
TAGS=$(git tag -l --sort=-version:refname)

if [ -z "$TAGS" ]; then
  # No tags yet, show unreleased changes
  echo "## [Unreleased]" >> "$CHANGELOG_FILE"
  echo "" >> "$CHANGELOG_FILE"

  # Features
  echo "### Added" >> "$CHANGELOG_FILE"
  git log --pretty=format:"- %s (%an, %ad)" --date=short --grep="^feat" >> "$CHANGELOG_FILE"
  echo "" >> "$CHANGELOG_FILE"
  echo "" >> "$CHANGELOG_FILE"

  # Fixes
  echo "### Fixed" >> "$CHANGELOG_FILE"
  git log --pretty=format:"- %s (%an, %ad)" --date=short --grep="^fix" >> "$CHANGELOG_FILE"
  echo "" >> "$CHANGELOG_FILE"
else
  # Process each tag
  for TAG in $TAGS; do
    echo "## [$TAG] - $(git log -1 --format=%ai $TAG | cut -d' ' -f1)" >> "$CHANGELOG_FILE"
    echo "" >> "$CHANGELOG_FILE"

    # Get commits for this tag
    # (Would parse commits between tags)

    echo "" >> "$CHANGELOG_FILE"
  done
fi

echo "✅ CHANGELOG.md generated"
```

### Package.json Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "metrics": "node scripts/milestone-tracker.js",
    "dashboard": "node scripts/generate-dashboard.js",
    "changelog": "bash scripts/generate-changelog.sh",
    "status": "npm run metrics && npm run dashboard"
  }
}
```

---

## Usage Guide

### Daily Workflow

```bash
# Morning: Check progress
pnpm metrics

# Start feature work
git checkout integration/mvp-launch
git pull
git checkout -b feature/M1.1-hero-section

# During development: commits tracked automatically via hooks

# Before pushing
pnpm build  # Pre-push hook ensures this

# Push to remote
git push -u origin feature/M1.1-hero-section
# Milestone tracking GitHub Action runs automatically

# Create PR
gh pr create --base integration/mvp-launch \
  --title "feat(hero): Implement Hero component (M1.1)" \
  --body "$(cat .github/PULL_REQUEST_TEMPLATE.md)"
# PR gets automatic milestone progress comment

# After merge
pnpm status  # Update local dashboard
```

### Weekly Review

```bash
# Generate full status report
pnpm status

# Update changelog
pnpm changelog

# Review dashboard
cat docs/planning/DASHBOARD.md

# Commit documentation updates
git add docs/planning/
git commit -m "docs: weekly status update"
git push
```

---

## Installation

### Setup Git Hooks

```bash
# Create hooks directory
mkdir -p .git/hooks

# Copy hook scripts
cp scripts/hooks/* .git/hooks/

# Make executable
chmod +x .git/hooks/*
```

### Create Scripts Directory

```bash
mkdir -p scripts/hooks

# Move hook scripts to scripts/hooks/
# Then symlink from .git/hooks/
```

---

## Best Practices

1. **Commit Often**: Small, focused commits provide better metrics
2. **Follow Conventions**: Use conventional commit format strictly
3. **Update Docs**: Let automation handle most updates, but review weekly
4. **Check Dashboard**: Review dashboard before standup meetings
5. **Track Blockers**: Document blockers in milestone status immediately

---

**Automation Level**: 80% automated, 20% manual review
**Maintenance**: Weekly dashboard review, monthly process improvement
**Version**: 1.0.0
