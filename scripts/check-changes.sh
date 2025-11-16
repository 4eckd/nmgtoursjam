#!/bin/bash
# Intelligent recommendations based on what files you changed
# Usage: ./scripts/check-changes.sh

echo "🔍 Analyzing your changes..."
echo ""

# Get list of changed files
CHANGED_FILES=$(git diff --name-only HEAD)

if [ -z "$CHANGED_FILES" ]; then
  echo "No changes detected."
  exit 0
fi

echo "📝 Changed files:"
echo "$CHANGED_FILES" | sed 's/^/  • /'
echo ""

# Recommendations based on file patterns
echo "💡 Recommendations based on your changes:"
echo ""

# Check for package.json changes
if echo "$CHANGED_FILES" | grep -q "package.json"; then
  echo "📦 Package Dependencies Changed:"
  echo "  ✓ Run: pnpm install"
  echo "  ✓ Commit pnpm-lock.yaml too"
  echo "  ✓ Check for security vulnerabilities: npm audit"
  echo "  ✓ Update .env.example if new env vars are needed"
  echo ""
fi

# Check for Prisma schema changes
if echo "$CHANGED_FILES" | grep -q "prisma/schema.prisma"; then
  echo "🗄️  Database Schema Changed:"
  echo "  ✓ Run: pnpm db:generate"
  echo "  ✓ Create migration: pnpm db:migrate"
  echo "  ✓ Update seed file if needed: prisma/seed.ts"
  echo "  ✓ Document schema changes in PR description"
  echo ""
fi

# Check for API route changes
if echo "$CHANGED_FILES" | grep -q "app/api/"; then
  echo "🔌 API Routes Changed:"
  echo "  ✓ Test API endpoints manually"
  echo "  ✓ Update API documentation if public"
  echo "  ✓ Check error handling"
  echo "  ✓ Verify authentication/authorization"
  echo ""
fi

# Check for component changes
if echo "$CHANGED_FILES" | grep -qE "components/.*\.tsx?"; then
  echo "🎨 UI Components Changed:"
  echo "  ✓ Test responsive design (375px, 768px, 1440px)"
  echo "  ✓ Check accessibility (keyboard navigation, ARIA labels)"
  echo "  ✓ Verify on different browsers"
  echo "  ✓ Consider adding Storybook stories (future)"
  echo ""
fi

# Check for config file changes
if echo "$CHANGED_FILES" | grep -qE "\.(yml|yaml|json|config\\..*|rc)$"; then
  echo "⚙️  Configuration Files Changed:"
  echo "  ✓ Test in development: pnpm dev"
  echo "  ✓ Test production build: pnpm build"
  echo "  ✓ Document breaking changes"
  echo "  ✓ Update deployment docs if needed"
  echo ""
fi

# Check for .env.example changes
if echo "$CHANGED_FILES" | grep -q ".env.example"; then
  echo "🔐 Environment Variables Changed:"
  echo "  ✓ Update your local .env file"
  echo "  ✓ Update Vercel environment variables"
  echo "  ✓ Document new variables in DATABASE_SETUP.md"
  echo "  ✓ Notify team members to update their .env"
  echo ""
fi

# Check for auth changes
if echo "$CHANGED_FILES" | grep -qE "(auth|login|signup|session)"; then
  echo "🔒 Authentication Code Changed:"
  echo "  ✓ Test login/logout flow"
  echo "  ✓ Verify protected routes still work"
  echo "  ✓ Check session management"
  echo "  ✓ Review security implications"
  echo ""
fi

# Check for workflow changes
if echo "$CHANGED_FILES" | grep -q ".github/workflows/"; then
  echo "🤖 GitHub Actions Changed:"
  echo "  ✓ Test workflow locally if possible"
  echo "  ✓ Create draft PR to test CI/CD"
  echo "  ✓ Check workflow syntax: actionlint (if installed)"
  echo "  ✓ Review permissions required"
  echo ""
fi

# Count lines changed
LINES_ADDED=$(git diff --numstat HEAD | awk '{sum+=$1} END {print sum}')
LINES_REMOVED=$(git diff --numstat HEAD | awk '{sum+=$2} END {print sum}')

echo "📊 Change Summary:"
echo "  • Lines added: ${LINES_ADDED:-0}"
echo "  • Lines removed: ${LINES_REMOVED:-0}"
echo ""

# Large change warning
TOTAL_CHANGES=$((${LINES_ADDED:-0} + ${LINES_REMOVED:-0}))
if [ $TOTAL_CHANGES -gt 500 ]; then
  echo "⚠️  Large Change Detected ($TOTAL_CHANGES lines):"
  echo "  Consider breaking this into smaller PRs for easier review"
  echo ""
fi

# Suggest running checks
echo "🚀 Before Committing:"
echo "  1. Run: ./scripts/pre-commit-check.sh"
echo "  2. Or run manually:"
echo "     • pnpm build (verify build works)"
echo "     • npm audit (check security)"
echo "     • pnpm test (run tests - when available)"
echo ""
