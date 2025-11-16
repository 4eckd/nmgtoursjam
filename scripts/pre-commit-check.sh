#!/bin/bash
# Pre-commit check script with helpful feedback
# Add to .git/hooks/pre-commit or run manually before committing

set -e

echo "🔍 Running pre-commit checks..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to print colored output
print_error() {
  echo -e "${RED}❌ $1${NC}"
  ((ERRORS++))
}

print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
  ((WARNINGS++))
}

print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

# 1. Check for secrets
echo "🔒 Checking for secrets in staged files..."
if git diff --cached --name-only | xargs grep -iE "(api[_-]?key|secret|password|token).*=.*['\"]" 2>/dev/null; then
  print_error "Possible secrets detected in staged files!"
  echo ""
  echo "💡 Suggested fixes:"
  echo "  1. Remove the secret from code"
  echo "  2. Add to .env file (which is gitignored)"
  echo "  3. Use environment variables"
  echo ""
else
  print_success "No secrets detected"
fi

# 2. Check TypeScript compilation
echo ""
echo "🔨 Checking TypeScript compilation..."
if pnpm build:static > /tmp/build-output.txt 2>&1; then
  print_success "Build successful"
else
  print_error "Build failed!"
  echo ""
  echo "Common fixes:"
  echo "  • Type errors: Check the TypeScript errors above"
  echo "  • Missing imports: Verify all imports exist"
  echo "  • Dependency issues: Run 'pnpm install'"
  echo ""
  echo "Full output:"
  tail -20 /tmp/build-output.txt
  echo ""
fi

# 3. Check for vulnerabilities
echo ""
echo "🛡️  Checking for security vulnerabilities..."
VULN_COUNT=$(npm audit --json 2>/dev/null | jq '.metadata.vulnerabilities | values | add' || echo "0")
if [ "$VULN_COUNT" -eq "0" ]; then
  print_success "No vulnerabilities found"
else
  print_warning "Found $VULN_COUNT vulnerabilities"
  echo ""
  echo "💡 Run: npm audit fix"
  echo ""
fi

# 4. Check for large files
echo ""
echo "📦 Checking for large files..."
LARGE_FILES=$(git diff --cached --name-only | xargs ls -lh 2>/dev/null | awk '$5 ~ /M$/ && $5+0 > 1 {print $9 " (" $5 ")"}')
if [ -n "$LARGE_FILES" ]; then
  print_warning "Large files detected:"
  echo "$LARGE_FILES"
  echo ""
  echo "💡 Consider:"
  echo "  • Using Git LFS for large assets"
  echo "  • Compressing images"
  echo "  • Moving to external storage (CDN)"
  echo ""
fi

# 5. Check for TODO/FIXME without issue reference
echo ""
echo "📝 Checking for TODOs..."
TODO_COUNT=$(git diff --cached | grep -c "TODO\|FIXME" || echo "0")
if [ "$TODO_COUNT" -gt "0" ]; then
  print_info "Found $TODO_COUNT TODO/FIXME comments"
  echo ""
  echo "💡 Best practice: Link TODOs to GitHub issues"
  echo "   Example: // TODO(#123): Fix this bug"
  echo ""
fi

# 6. Check for console.log (in production code)
echo ""
echo "🐛 Checking for debug statements..."
DEBUG_COUNT=$(git diff --cached -- "*.ts" "*.tsx" | grep -c "console\.log\|debugger" || echo "0")
if [ "$DEBUG_COUNT" -gt "0" ]; then
  print_warning "Found $DEBUG_COUNT console.log/debugger statements"
  echo ""
  echo "💡 Consider removing debug statements before committing"
  echo "   Or use a proper logger instead"
  echo ""
fi

# 7. Check package.json changes
if git diff --cached --name-only | grep -q "package.json"; then
  print_info "package.json was modified"
  echo ""
  echo "📋 Checklist:"
  echo "  [ ] Did you run 'pnpm install'?"
  echo "  [ ] Is pnpm-lock.yaml also staged?"
  echo "  [ ] Did you test the build?"
  echo ""
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -gt 0 ]; then
  print_error "Found $ERRORS error(s) - commit blocked!"
  echo ""
  echo "Fix the errors above and try again."
  exit 1
elif [ $WARNINGS -gt 0 ]; then
  print_warning "Found $WARNINGS warning(s)"
  echo ""
  echo "⚠️  You can proceed, but consider addressing the warnings."
  echo ""
  read -p "Continue with commit? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Commit cancelled."
    exit 1
  fi
else
  print_success "All checks passed!"
  echo ""
  echo "🚀 Ready to commit!"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
