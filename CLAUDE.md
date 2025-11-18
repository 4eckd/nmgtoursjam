# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **NMG Tours Jamaica** - a modern tourism booking platform for authentic Jamaican island experiences, specializing in rafting tours and cultural adventures. The project is built with Next.js 16, React 19, TypeScript, and uses an emerald/green theme reflecting Jamaica's vibrant natural beauty.

**Current Status**: MVP development phase - foundation complete with navigation, routing, and basic pages. Currently implementing parallel development tracks for tour listings, booking system, and database integration.

**Tech Stack**:
- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, responsive mobile-first design
- **UI Components**: Lucide React icons, custom components
- **Database**: PostgreSQL with Prisma ORM (Supabase hosting)
- **Authentication**: NextAuth.js (planned)
- **Payments**: Stripe integration (planned)
- **Package Manager**: pnpm
- **Deployment**: Vercel

## Commands

### Development
```bash
pnpm dev              # Start development server on localhost:3000
pnpm build            # Production build (must pass before merging)
pnpm start            # Run production build locally
pnpm lint             # Run ESLint (currently basic Next.js config)
```

### DevOps Automation Commands

**Quick Health Check** (30 seconds):
```bash
# Traffic-light status of key systems
pnpm devops:quick
# Checks: Git status, build status, uncommitted changes, branch status
```

**Pre-Merge Checklist** (3-5 minutes):
```bash
# Complete pre-merge validation
pnpm devops:merge
# Runs: cleanup, build, lint, type-check, changelog update
```

**Security Scan** (2 minutes):
```bash
# Security vulnerability scanning
pnpm devops:security
# Runs: npm audit, secret scanning, dependency checks
```

**Full Pipeline** (5-10 minutes):
```bash
# Complete DevOps pipeline check
pnpm devops
# All checks: quality, security, build, test, docs
```

**Feature Documentation** (Interactive):
```bash
# Start new feature with documentation template
pnpm devops:feature-start <feature-name>

# Validate feature documentation completeness
pnpm devops:feature-validate
```

### Git Workflow
See parallel branch strategy below. Key points:

**Current Integration Branch**: `integration/mvp-launch`
- All feature branches should be created from and merged back into this branch
- Do NOT merge directly to `main` - integration branch will be merged to main when MVP is complete
- Run `pnpm build` before every merge to ensure stability

**Feature Branch Pattern**: `feature/<feature-name>`
```bash
# Create new feature branch
git checkout integration/mvp-launch
git pull
git checkout -b feature/database-setup

# Verify build works before merging
pnpm build

# Create PR to integration branch (not main)
gh pr create --base integration/mvp-launch \
  --title "feat(database): Set up Prisma with Tours and Bookings models"
```

**Commit Convention**: Conventional Commits format
- `feat(scope): description` - New features
- `fix(scope): description` - Bug fixes
- `refactor(scope): description` - Code refactoring
- `docs: description` - Documentation only
- `style: description` - Formatting/styling only
- `test: description` - Adding tests
- `chore: description` - Dependencies, tooling

## Architecture

### Directory Structure
```
app/
├── (auth)/                 # Auth route group (planned)
│   ├── login/
│   └── signup/
├── (marketing)/            # Public-facing pages
│   ├── page.tsx           # Homepage with hero section
│   ├── about/
│   ├── contact/
│   └── gallery/
├── tours/                  # Tour browsing and details
│   ├── page.tsx           # Tour listing
│   └── [slug]/
│       └── page.tsx       # Tour detail page
├── dashboard/              # User dashboard (planned)
├── api/                    # API routes
│   ├── tours/
│   ├── bookings/
│   └── auth/
├── components/
│   ├── Navigation.tsx     # Global navigation
│   └── Footer.tsx         # Global footer
├── legal/                  # Legal pages
│   ├── terms/
│   ├── privacy/
│   └── refunds/
└── layout.tsx              # Root layout

prisma/
└── schema.prisma           # Database schema

docs/                       # Project documentation
├── design/                 # Design system (11 files)
│   ├── README.md          # Design system overview
│   ├── STATUS.md          # Implementation tracking
│   ├── mockups/           # ASCII wireframes (5 files)
│   ├── flows/             # User journeys (2 files)
│   └── tokens/            # Design tokens & component library (2 files)
├── devops/                 # DevOps documentation (5 files)
│   ├── README.md          # CI/CD overview
│   ├── CI_CD_SETUP.md     # Pipeline documentation
│   ├── DEPLOYMENT.md      # Vercel deployment guide
│   ├── TESTING.md         # Testing strategy
│   └── BRANCH_STRATEGY.md # Git workflow
├── planning/
│   ├── engineering-plan.md
│   └── development-checklist.md
├── technical/
│   └── technical-specification.md
└── guides/
    ├── quick-start-guide.md
    └── deployment-guide.md
```

### Color System & Theming

**Important**: The site uses Jamaican-inspired colors with emerald green as the primary brand color, representing the island's lush landscapes and vibrant culture.

**Color Palette**:
- **Primary**: Emerald (#10b981) - Main CTAs, links, accents
- **Primary Light**: Emerald (#34d399) - Hover states
- **Primary Dark**: Emerald (#059669) - Active states
- **Secondary**: Black/Dark grays - Backgrounds, navigation
- **Accent**: White/Light colors - Text, contrast elements
- **Gradient**: Multi-tone gradient (gray → red-brown → emerald) for visual depth
  - CSS: `linear-gradient(135deg, #4747475e 15%, #853e3e83 50%, #55d2836c 90%)`

**CSS Design Tokens** (defined in `app/globals.css`):
```css
--color-primary: #10b981;           /* Emerald 500 - Main brand */
--color-primary-light: #34d399;     /* Emerald 400 - Hover */
--color-primary-dark: #059669;      /* Emerald 600 - Active */
--color-secondary: #000000;         /* Black - Backgrounds */
--color-white: #ffffff;             /* White - Text */
--gradient-primary: linear-gradient(135deg, #4747475e 15%, #853e3e83 50%, #55d2836c 90%);
```

**Usage in Components**:
```tsx
// ✅ Using Tailwind classes
<button className="bg-emerald-400 hover:bg-emerald-300">Book Now</button>

// ✅ Using CSS variables
<div style={{ color: 'var(--color-primary)' }}>

// ✅ Dark backgrounds with transparency
<div className="bg-black/70 backdrop-blur-md">

// ✅ Text colors
<p className="text-white">Main content</p>
<p className="text-zinc-400">Secondary text</p>
```

**Reference**: See `docs/design/tokens/DESIGN_TOKENS.md` for complete design token specifications.

### Font System

Two Google Fonts are configured in `app/layout.tsx`:
- **Poppins** (primary): Clean, modern sans-serif for body text and UI
  - Weights: 400 (regular), 600 (semibold), 700 (bold)
  - Variable: `--font-poppins`
- **Caveat** (accent): Handwritten script for personality and brand touches
  - Weights: 400 (regular), 700 (bold)
  - Variable: `--font-caveat`

These are loaded via `next/font/google` for automatic optimization and zero layout shift.

**Typography Scale** (CSS Design Tokens):
```css
--font-primary: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-accent: 'Caveat', cursive;

--font-xs: 0.75rem;      /* 12px */
--font-sm: 0.875rem;     /* 14px */
--font-base: 1rem;       /* 16px */
--font-lg: 1.125rem;     /* 18px */
--font-xl: 1.25rem;      /* 20px */
--font-2xl: 1.5rem;      /* 24px */
--font-3xl: 1.875rem;    /* 30px */
--font-4xl: 2.25rem;     /* 36px */
--font-5xl: 3rem;        /* 48px */
```

**Reference**: See `docs/design/tokens/DESIGN_TOKENS.md` for complete typography specifications.

### Logo System

**Logo File**: `/public/NMGTOURS.png`
- **Dimensions**: 1680x1680px (square)
- **Format**: PNG with transparency
- **Usage**: Navigation, footer, social media

**Logo Integration in CSS** (`app/globals.css`):
```css
.logo {
  width: 40px;
  height: 40px;
  transition: filter var(--duration-300) var(--ease-in-out);
}

.logo:hover {
  filter: drop-shadow(0 0 8px var(--color-primary));
}

/* Responsive sizing */
@media (min-width: 768px) {
  .logo {
    width: 48px;
    height: 48px;
  }
}
```

**Logo Usage in Components**:
```tsx
import Image from 'next/image'

<Image
  src="/NMGTOURS.png"
  alt="NMG Tours Jamaica"
  width={40}
  height={40}
  className="logo"
/>
```

**Logo Color Relationships**:
- Primary emerald green (#10b981) used in logo is our main brand color
- Logo hover effect uses CSS variables for consistency
- All brand colors derived from logo color palette

### Component Patterns

**Client vs Server Components**:
- Most components should be Server Components by default
- Use `'use client'` only when needed (useState, useEffect, event handlers)
- Current client components: Navigation.tsx, page.tsx (homepage), home/page.tsx

**Accessibility Requirements**:
- All interactive elements must have proper ARIA labels
- Keyboard navigation must work fully (test with Tab key)
- Focus states must be visible
- Semantic HTML (nav, header, section, main, footer, etc.)
- Minimum touch target size: 44x44px for mobile
- Color contrast ratios meeting WCAG AA standards

**Responsive Design**:
- Mobile-first approach (design for mobile, enhance for desktop)
- Tailwind breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Navigation has hamburger menu for mobile, horizontal menu for desktop
- Test all pages at: 375px (mobile), 768px (tablet), 1440px (desktop)

### State Management

**Current State**: React hooks (useState, useEffect) for local component state

**Planned State Management**:
- **Zustand** for global state:
  - Booking flow state (multi-step form)
  - User session data
  - Cart/selected tours
  - UI state (modals, notifications)

### Styling Approach

**Tailwind CSS Utility-First**:
- Tailwind classes for all styling (no CSS modules or styled-components)
- Responsive classes: `md:`, `lg:`, `xl:` prefixes
- Custom gradient backgrounds in layout.tsx
- Glass morphism: `bg-black/70 backdrop-blur-md`

**Color Usage**:
```tsx
// ✅ Correct - Use Tailwind color classes
<div className="text-white bg-emerald-400">

// ✅ Correct - Custom gradients
<div className="bg-gradient-to-b from-black/30 via-black/70 to-emerald-800/95">

// ✅ Correct - Transparency
<div className="bg-black/70 backdrop-blur-md">
```

### Container & Layout System

**Max Container Width**: 1400px
- All content should be constrained to this width on larger screens
- Use padding for mobile/tablet to ensure content doesn't touch edges

```css
--container-max: 1400px;
--container-padding: 1rem;  /* 16px */
```

**Responsive Breakpoints** (Tailwind):
```css
--breakpoint-xs: 375px;   /* Mobile small */
--breakpoint-sm: 640px;   /* Mobile large / Phablet */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1440px;  /* Wide desktop */
```

**Reference**: See `docs/design/tokens/DESIGN_TOKENS.md` for complete spacing and layout specifications.

## Design System

### Mockups & Wireframes

**Available Mockups** (ASCII wireframes in `docs/design/mockups/`):
1. **LANDING_PAGE.md** - Homepage with hero, featured tours, testimonials
2. **TOUR_LISTING.md** - Tour browse page with filters and search
3. **TOUR_DETAIL.md** - Individual tour page with booking widget
4. **BOOKING_FLOW.md** - 4-step booking wizard (Date → Details → Payment → Confirmation)
5. **USER_DASHBOARD.md** - User account dashboard

All mockups show responsive layouts for:
- Desktop (1440px)
- Tablet (768px)
- Mobile (375px)

**Reference**: See `docs/design/README.md` for complete design system overview.

### User Flows

**Available User Journey Diagrams** (`docs/design/flows/`):
1. **USER_FLOWS.md** - 8 complete user journeys with decision trees
2. **BOOKING_JOURNEY.md** - Detailed 10-stage booking process

Flows cover:
- New visitor discovery
- Tour search and filtering
- Booking process
- User authentication
- Review submission
- Dashboard management
- Mobile app flows (future)
- Admin workflows (future)

### Component Library

**Component Inventory**: 80+ components documented in `docs/design/tokens/COMPONENT_LIBRARY.md`

**Categories**:
1. **Marketing Components** (12) - Hero, Features, Testimonials, CTA, Gallery, etc.
2. **Tour Components** (15) - Tour cards, filters, search, detail views, etc.
3. **Booking Components** (8) - Wizard, date picker, payment forms, confirmation, etc.
4. **Dashboard Components** (10) - Booking cards, stats, profile settings, etc.
5. **Form Components** (18) - Inputs, selects, checkboxes, validation, etc.
6. **Layout Components** (5) - Navigation, Footer, Container, Grid, etc.
7. **UI Components** (14) - Buttons, modals, tooltips, badges, cards, etc.

**Current Status**: 2/74 implemented (Navigation, Footer)

**Priority Levels**:
- **High**: Core MVP components (booking flow, tour listings, hero)
- **Medium**: Enhanced features (reviews, filters, dashboard)
- **Low**: Nice-to-haves (animations, advanced search, admin tools)

**Reference**: See `docs/design/STATUS.md` for implementation tracking.

## DevOps & CI/CD

### CI/CD Pipeline

**7-Stage Pipeline** (GitHub Actions):
1. **Code Quality** - ESLint, Prettier, TypeScript
2. **Security** - npm audit, secret scanning, CodeQL
3. **Build** - Next.js production build
4. **Test** - Unit tests, integration tests (when implemented)
5. **Preview** - Automatic Vercel preview deployments
6. **Performance** - Lighthouse CI audits
7. **Deploy** - Production deployment to Vercel

**GitHub Actions Workflows** (`.github/workflows/`):
- **ci.yml** - Main CI pipeline (runs on push to feature/*, PRs)
- **preview-deploy.yml** - Automatic preview deployments for PRs
- **lighthouse.yml** - Performance budgets and audits
- **security-scan.yml** - Daily security scans

**Performance Budgets** (enforced by Lighthouse CI):
- Performance: >80
- Accessibility: >90
- Best Practices: >80
- SEO: >80
- PWA: >50

**Reference**: See `docs/devops/` for complete CI/CD documentation.

### Pre-Merge Automation Checklist

**IMPORTANT**: Before creating any PR or merging to `integration/mvp-launch`, run through this automated checklist:

#### Phase 1: Code Cleanup (2 minutes)
```bash
# Remove debugging artifacts
grep -r "console.log" app/ --exclude-dir=node_modules
grep -r "debugger" app/ --exclude-dir=node_modules

# Remove temporary files
find . -name "*.tmp" -o -name "*.bak" -o -name ".DS_Store" -delete
```

#### Phase 2: Build Verification (2-3 minutes)
```bash
# CRITICAL: Must pass before merge
pnpm build

# If build fails:
# 1. Review error messages carefully
# 2. Fix type errors, import issues, hydration mismatches
# 3. Re-run build until it passes
# 4. Maximum 5 auto-fix attempts before manual review
```

#### Phase 3: Quality Checks (1-2 minutes)
```bash
# Lint all files
pnpm lint

# Type-check (if separate from build)
pnpm type-check

# Format check (if Prettier configured)
pnpm format:check
```

#### Phase 4: Documentation Updates (1 minute)
```bash
# Update CHANGELOG.md with recent commits
git log --oneline --since="1 week ago" >> CHANGELOG_DRAFT.md

# Verify README.md is current
# - Installation instructions accurate
# - Environment variables documented
# - Setup steps tested
```

#### Phase 5: Security Scan (2 minutes)
```bash
# Dependency vulnerabilities
pnpm audit --audit-level=moderate

# Secret scanning (if git-secrets installed)
git secrets --scan

# Check for sensitive files
ls -la | grep -E "\.env$|credentials\.json|\.pem$"
```

#### Phase 6: Final Verification (1 minute)
```bash
# Ensure no uncommitted changes
git status

# Verify on correct branch
git branch --show-current

# Check for merge conflicts
git fetch origin integration/mvp-launch
git merge-base HEAD origin/integration/mvp-launch
```

#### Automated Progress Tracking

Use progress indicators for long-running tasks:
```
[██████░░░░] 6/10 Running security scan...
[████████░░] 8/10 Updating documentation...
[██████████] 10/10 ✓ All checks passed!
```

#### Failure Recovery

**Build Failures**:
- Check error logs in terminal output
- Common fixes: missing dependencies, type errors, import paths
- Run `pnpm install` if package.json changed
- Clear `.next` cache: `rm -rf .next`

**Merge Conflicts**:
- Fetch latest: `git fetch origin integration/mvp-launch`
- Merge locally: `git merge origin/integration/mvp-launch`
- Resolve conflicts manually
- Re-run all checks after resolution

**Security Vulnerabilities**:
- Review `pnpm audit` output
- Update vulnerable packages: `pnpm update <package>`
- If no fix available, document in `SECURITY.md`

### Testing Strategy

**Test Pyramid** (70% unit, 20% integration, 10% E2E):
- **Unit Tests**: Jest + React Testing Library (planned)
- **Integration Tests**: API route testing (planned)
- **E2E Tests**: Playwright for critical user flows (planned)

**Reference**: See `docs/devops/TESTING.md` for testing strategy.

### Branch Strategy

**Protected Branches**:
- `main` - Production (protected, requires PR, passing checks)
- `integration/mvp-launch` - Integration branch for MVP (all features merge here first)

**Branch Types**:
- `feature/*` - New features (merge to integration)
- `fix/*` - Bug fixes (merge to integration)
- `hotfix/*` - Emergency fixes (merge to main + integration)
- `claude/*` - Claude Code sessions (merge to integration)

**Reference**: See `docs/devops/BRANCH_STRATEGY.md` for complete workflow.

### Deployment

**Platform**: Vercel
- **Production**: Auto-deploy from `main` branch
- **Preview**: Auto-deploy from PRs to `main` or `integration/*`
- **Domain**: TBD (pending Vercel configuration)

**Environment Variables** (required):
- `DATABASE_URL` - PostgreSQL connection string (Supabase)
- `NEXTAUTH_SECRET` - NextAuth.js secret (planned)
- `NEXTAUTH_URL` - App URL (planned)
- `STRIPE_SECRET_KEY` - Stripe API key (planned)
- `STRIPE_PUBLISHABLE_KEY` - Stripe public key (planned)

**Reference**: See `docs/devops/DEPLOYMENT.md` for deployment guide.

### Security Scanning & Implementation

**Secret Scanning Tools** (choose one or layer multiple):

1. **git-secrets** (Recommended for local development):
   ```bash
   # Install
   brew install git-secrets  # macOS
   # or
   sudo apt-get install git-secrets  # Linux

   # Setup
   git secrets --install
   git secrets --register-aws  # Add AWS patterns

   # Add custom patterns for this project
   git secrets --add 'DATABASE_URL=.*'
   git secrets --add 'STRIPE_SECRET_KEY=.*'
   git secrets --add 'NEXTAUTH_SECRET=.*'

   # Scan current repo
   git secrets --scan

   # Scan commit history
   git secrets --scan-history
   ```

2. **TruffleHog** (For comprehensive audits):
   ```bash
   # Install
   pip install truffleHog

   # Scan repository
   trufflehog --regex --entropy=False .

   # Generate JSON report
   trufflehog --json --regex . > security-report.json
   ```

3. **GitHub Secret Scanning** (Platform-level):
   - Enable in repository Settings → Security & Analysis
   - Automatically scans on push
   - Can block commits containing secrets

**Dependency Vulnerability Scanning**:
```bash
# NPM audit (built-in)
pnpm audit --audit-level=moderate

# Fix automatically where possible
pnpm audit fix

# Generate detailed report
pnpm audit --json > audit-report.json
```

**Security Integration in CI/CD**:
- TruffleHog runs on every PR
- npm audit runs daily via scheduled workflow
- CodeQL scanning enabled for JavaScript/TypeScript
- Dependabot alerts enabled for vulnerable dependencies

**Security Best Practices**:
1. **Never commit secrets** - Use environment variables
2. **Use .env.example** - Document required env vars without values
3. **Rotate secrets regularly** - Especially after team changes
4. **Review dependencies** - Check npm packages before installation
5. **Update regularly** - Keep dependencies current with security patches

### Feature Documentation Guidelines

**Three-Tier Documentation Requirements**:

**Tier 1: Simple Changes** (<200 lines of code)
- **Status**: Optional documentation
- **Examples**: Bug fixes, minor refactoring, styling updates
- **Action**: Documentation warnings only, no blocking

**Tier 2: Medium Features** (200-1,000 lines of code)
- **Status**: Documentation required for merge
- **Required Sections**:
  1. Overview (2-3 sentences)
  2. Goals (minimum 3 items)
  3. Implementation (key files and approach)
  4. Testing (basic test coverage)
- **Minimum**: 100 words total

**Tier 3: Major Features** (>1,000 lines of code)
- **Status**: Comprehensive documentation mandatory
- **Required Sections**:
  1. Overview (problem statement)
  2. Goals (project alignment + success criteria)
  3. Implementation (architecture, design decisions, 5+ key files)
  4. Testing (strategy, coverage %, 3+ edge cases)
  5. Deployment (rollout plan, rollback procedure)
  6. Monitoring (metrics, alerts)
- **Minimum**: 500 words total

**Documentation Location**:
```
docs/features/<feature-name>/
├── README.md           # Main documentation
├── IMPLEMENTATION.md   # Technical details
├── TESTING.md          # Test plan
└── ROLLOUT.md          # Deployment strategy
```

**Feature Documentation Template**:
```markdown
# Feature: [Feature Name]

## Overview
[2-3 sentence description of the problem being solved]

## Goals
1. [Primary goal aligned with project objectives]
2. [Secondary goal with measurable success criteria]
3. [Tertiary goal or constraint]

## Implementation

### Architecture
[High-level technical approach]

### Key Files
- `app/components/FeatureX.tsx` - [Description]
- `app/api/feature/route.ts` - [Description]
- `prisma/schema.prisma` - [Schema changes]

### Design Decisions
1. **[Decision]**: [Rationale]
2. **[Decision]**: [Trade-offs considered]

## Testing

### Test Strategy
- Unit tests: [Coverage target]
- Integration tests: [Key scenarios]
- E2E tests: [Critical user flows]

### Edge Cases Tested
1. [Edge case 1]
2. [Edge case 2]
3. [Edge case 3]

## Deployment
[Rollout plan and rollback procedure]

## Monitoring
[Metrics to track and alerts to configure]
```

**Validation Commands**:
```bash
# Start new feature with template
pnpm devops:feature-start booking-wizard

# Validate documentation completeness
pnpm devops:feature-validate

# Check documentation quality
wc -w docs/features/booking-wizard/README.md  # Word count
```

**Documentation Workflow**:
1. **Planning Phase**: Create feature branch, copy template
2. **Development Phase**: Update implementation details as you build
3. **Testing Phase**: Document test results and coverage
4. **PR Phase**: Ensure all sections complete, minimum word count met
5. **Review Phase**: Reviewer verifies documentation accuracy

**Automated Checks** (GitHub Actions):
- Validates documentation file exists
- Checks required sections present
- Enforces minimum word count
- Blocks merge if Tier 2/3 requirements not met

## Development Guidelines

### When Adding New Components

1. **Location**: Place in appropriate subfolder of `app/components/`
   - Layout components: `app/components/` (Navigation.tsx, Footer.tsx)
   - Feature-specific: `app/components/tours/`, `app/components/booking/`
   - Reusable UI: `app/components/ui/` (Button, Card, Modal, etc.)

2. **TypeScript**: All components must be typed
   ```tsx
   interface ButtonProps {
     variant?: 'primary' | 'outline' | 'ghost'
     size?: 'sm' | 'md' | 'lg'
     children: React.ReactNode
   }

   export function Button({ variant = 'primary', ... }: ButtonProps) {
   ```

3. **Accessibility**: Include ARIA attributes, semantic HTML, keyboard support

4. **Responsive**: Use Tailwind responsive classes (sm:, md:, lg:)

5. **Theme-aware**: Support both light and dark themes via CSS variables

### Claude Code Automation Patterns

**State Machine Architecture** for reliable automation:

```javascript
// Example: Pre-merge validation state machine
const DevOpsStates = {
  INIT: 'initialized',
  CHECK: 'checking_status',
  CLEANUP: 'cleaning_code',
  BUILD: 'building_project',
  TEST: 'running_tests',
  SECURITY: 'scanning_security',
  DOCS: 'updating_docs',
  VERIFY: 'final_verification',
  SUCCESS: 'all_passed',
  FAILED: 'checks_failed'
};

// State transitions are saved to .devops-state.json
// Enables resumability if process is interrupted
```

**Execution Model**: state-checking → action → verification → repeat

**Key Principles**:

1. **Progress Visualization**:
   ```
   [██████░░░░] 6/10 Running security scan...
   Status: SECURITY | Time: 45s | Remaining: ~1m
   ```

2. **Explicit Success Criteria**:
   - Build exit code = 0
   - No console.log or debugger statements
   - pnpm audit shows 0 high/critical vulnerabilities
   - All required documentation sections present

3. **Escape Hatches**:
   - Maximum retries: 3 per step
   - Timeout: 5 minutes per step
   - Emergency abort: Ctrl+C saves state and exits cleanly

4. **Fail-Fast Ordering**:
   - Quick syntax checks first (30s)
   - Linting second (1m)
   - Build third (2-3m)
   - Tests last (3-5m)

5. **Idempotency**:
   - Check completion status before executing
   - Safe to re-run any step multiple times
   - No failures on already-completed actions

**Example Automation Prompt Pattern**:

```markdown
## Pre-Merge DevOps Pipeline

**OBJECTIVE**: Validate code is ready for merge to integration/mvp-launch

**STATE MACHINE**:
1. INIT → Load previous state from .devops-state.json (if exists)
2. CHECK → Verify git status, branch name, uncommitted changes
3. CLEANUP → Remove debugging artifacts (console.log, debugger)
4. BUILD → Run pnpm build (must exit 0)
5. SECURITY → Run pnpm audit (0 high/critical vulns)
6. DOCS → Update CHANGELOG.md from recent commits
7. VERIFY → Final git status check
8. SUCCESS → Display summary report

**ERROR HANDLING**:
- Save state after each transition
- On failure: log error, save state, exit with code 1
- Resume: Load .devops-state.json and continue from last successful state

**SUCCESS CRITERIA**:
- All states reach SUCCESS
- Build exit code = 0
- No uncommitted debugging code
- Git status clean (all changes committed)

**PROGRESS INDICATOR**:
[██████████] 8/8 ✓ All checks passed! Ready to create PR.

**OUTPUT**:
- Success/failure status
- Execution time per phase
- Total time elapsed
- Next recommended action
```

**Resumable Workflows**:

If a long-running workflow is interrupted, save state:

```json
{
  "currentState": "BUILD",
  "completedStates": ["INIT", "CHECK", "CLEANUP"],
  "failedStates": [],
  "timestamp": "2025-11-18T10:30:00Z",
  "branchName": "feature/booking-wizard",
  "buildAttempts": 1
}
```

Resume with: `pnpm devops:resume` (loads state and continues)

### When Building New Features

Follow this workflow for all new features:

1. **Create feature branch** from `integration/mvp-launch`
2. **Run feature documentation starter**: `pnpm devops:feature-start <name>`
3. **Build component** with TypeScript types
4. **Test responsive design** (mobile → tablet → desktop)
5. **Update feature documentation** as you implement
6. **Run pre-merge checklist**: `pnpm devops:merge`
7. **Verify build passes**: `pnpm build` (included in devops:merge)
8. **Create PR** to integration branch with complete documentation
9. **Merge after review** and delete feature branch

### Accessibility Standards

Aim for WCAG AA compliance:
- Normal text: 4.5:1 contrast ratio minimum
- Large text (18pt+): 3:1 minimum
- Interactive elements: visible focus states
- Forms: proper labels and error messages
- Images: descriptive alt text

Test with browser DevTools accessibility panel before committing.

### Build Verification

**ALWAYS run `pnpm build` before creating PRs**. The build:
- Type-checks all TypeScript
- Verifies Next.js can compile pages
- Catches many runtime errors

Common build errors:
- Hydration mismatches (use `useState` + `useEffect` pattern for theme-dependent rendering)
- Missing dependencies
- Type errors in components

## MVP Parallel Development Strategy

### 5 Development Tracks (Run in Parallel)

**TRACK 1: Marketing & Content** 🎨
- Hero section with video background
- Gallery page with photo grid
- About page content
- Contact form (frontend)
- Duration: 3-5 days

**TRACK 2: Database & Infrastructure** 🔧
- Prisma setup with PostgreSQL (Supabase)
- Schema design (Tours, Bookings, Users)
- API route structure
- Seed data creation
- Duration: 2-3 days
- **CRITICAL PATH** - blocks other tracks

**TRACK 3: Tours System** 🏞️
- Tour listing page with filters
- Tour detail page with gallery
- Search and sort functionality
- API endpoints for tours
- Duration: 4-6 days
- Dependencies: TRACK 2

**TRACK 4: Authentication & User Management** 🔐
- NextAuth.js setup
- Login/signup pages
- User dashboard
- Protected routes
- Duration: 3-4 days
- Dependencies: TRACK 2

**TRACK 5: Booking & Payment Flow** 💳
- Multi-step booking wizard
- Stripe payment integration
- Booking confirmation
- Email notifications
- Duration: 5-7 days
- Dependencies: TRACK 2, 3, 4

### Post-MVP Features (Deferred)

- Admin dashboard for tour management
- Review and rating system
- Map integration (location-based search)
- Multi-language support
- Mobile app (React Native)
- Advanced analytics
- Loyalty/rewards program

### Technical Decisions

- **Database**: PostgreSQL on Supabase (free tier for MVP)
- **Payments**: Stripe (industry standard)
- **Authentication**: NextAuth.js with credentials + OAuth
- **Email**: Resend or SendGrid
- **Images**: Cloudinary (free tier)
- **Analytics**: Vercel Analytics (built-in)

## Enhanced GitHub Actions Workflows

### Workflow Files to Add/Update

**1. Feature Documentation Check** (`.github/workflows/feature-docs-check.yml`):
```yaml
name: Feature Documentation Check

on:
  pull_request:
    branches:
      - integration/mvp-launch
      - main

jobs:
  check-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Calculate changed lines
        id: changes
        run: |
          LINES=$(git diff origin/${{ github.base_ref }}...HEAD | grep -c "^[+-]" || echo "0")
          echo "lines_changed=$LINES" >> $GITHUB_OUTPUT

      - name: Check for feature documentation
        if: steps.changes.outputs.lines_changed > 200
        run: |
          BRANCH_NAME="${{ github.head_ref }}"
          if [[ $BRANCH_NAME == feature/* ]]; then
            FEATURE_NAME=${BRANCH_NAME#feature/}
            DOC_PATH="docs/features/$FEATURE_NAME/README.md"

            if [ ! -f "$DOC_PATH" ]; then
              echo "❌ Feature documentation required for changes >200 lines"
              echo "Expected: $DOC_PATH"
              exit 1
            fi

            # Check minimum word count
            WORD_COUNT=$(wc -w < "$DOC_PATH")
            if [ "$WORD_COUNT" -lt 100 ]; then
              echo "❌ Documentation must be at least 100 words (found: $WORD_COUNT)"
              exit 1
            fi

            echo "✅ Feature documentation found and meets requirements"
          fi
```

**2. Enhanced CI Pipeline** (`.github/workflows/ci.yml`):
```yaml
name: CI Pipeline

on:
  push:
    branches: [ feature/**, fix/**, claude/** ]
  pull_request:
    branches: [ integration/mvp-launch, main ]

jobs:
  code-quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm type-check || pnpm build

      - name: Check for debugging code
        run: |
          if grep -r "console.log" app/ --exclude-dir=node_modules; then
            echo "❌ Found console.log statements"
            exit 1
          fi
          if grep -r "debugger" app/ --exclude-dir=node_modules; then
            echo "❌ Found debugger statements"
            exit 1
          fi

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for secret scanning

      - name: Run TruffleHog
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          head: HEAD

      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Audit dependencies
        run: pnpm audit --audit-level=moderate

  build:
    runs-on: ubuntu-latest
    needs: [code-quality, security]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build
        env:
          # Add any required build env vars
          SKIP_ENV_VALIDATION: true
```

**3. PR Auto-labeling** (`.github/workflows/pr-labeler.yml`):
```yaml
name: PR Auto-Labeler

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Calculate PR size
        id: size
        run: |
          LINES=$(git diff origin/${{ github.base_ref }}...HEAD | grep -c "^[+-]" || echo "0")
          if [ "$LINES" -lt 200 ]; then
            echo "label=size/small" >> $GITHUB_OUTPUT
          elif [ "$LINES" -lt 1000 ]; then
            echo "label=size/medium" >> $GITHUB_OUTPUT
          else
            echo "label=size/large" >> $GITHUB_OUTPUT
          fi

      - name: Add size label
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.addLabels({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              labels: ['${{ steps.size.outputs.label }}']
            })
```

## Claude Usage Tracking

**Automatic Token and Cost Tracking**:

The `CLAUDE_USAGE.md` file automatically tracks Claude Code usage:

```markdown
# Claude Code Usage Tracking

**Total Tokens Used**: 156,324
**Total Estimated Cost**: $12.45

## Pricing (Claude Sonnet 4.5)
- Input: $3.00 per million tokens
- Output: $15.00 per million tokens

## Usage History

| Date | Feature | Tokens | Cost | Session ID |
|------|---------|--------|------|------------|
| 2025-11-18 | DevOps Integration | 45,000 | $3.20 | 01Hc8kEFEWhUEv57KbQXmvxy |
| 2025-11-15 | Landing Page Fix | 28,500 | $2.10 | 01RAcPorzARm9jcQCEcpgLJv |
```

**Pre-commit Hook** (`.git/hooks/pre-commit`):
```bash
#!/bin/bash
# Update CLAUDE_USAGE.md before each commit
# This hook is automatically installed

SESSION_ID=$(git branch --show-current | grep -oE '[0-9A-Za-z]{32}$')
if [ -n "$SESSION_ID" ]; then
  # Extract tokens from session metadata
  # Append to CLAUDE_USAGE.md
  echo "Updating Claude usage tracking..."
fi
```

**Monthly Cost Estimation**:
- Light usage (< 100k tokens/week): ~$5-15/month
- Medium usage (100k-500k tokens/week): ~$15-50/month
- Heavy usage (> 500k tokens/week): ~$50-150/month

**Cost Optimization Tips**:
1. Use smaller model (Haiku) for simple tasks
2. Clear context when switching tasks
3. Prefer reading specific files over exploring entire codebase
4. Use grep/glob for targeted searches vs. broad exploration

## Important Constraints

1. **No Direct Main Merges**: All work goes through `integration/mvp-launch` first
2. **Build Must Pass**: Run `pnpm build` successfully before any PR
3. **Mobile First**: Design and test mobile (375px) before desktop
4. **TypeScript**: All components must be properly typed (avoid `any`)
5. **Responsive**: Test at 375px, 768px, 1440px breakpoints
6. **Accessibility**: WCAG AA compliance minimum
7. **Performance**: Lighthouse score >80 for mobile

## Common Tasks

### Add a New Page
```bash
# Create page file in app router
mkdir -p app/tours
touch app/tours/page.tsx

# Build the page component with TypeScript
# Test responsive design
# Verify build passes

pnpm build
git add .
git commit -m "feat(tours): add tour listing page"
```

### Add API Endpoint
```bash
# Create API route
mkdir -p app/api/tours
touch app/api/tours/route.ts

# Implement GET/POST handlers
# Test with curl or Postman
# Verify build passes

pnpm build
git add .
git commit -m "feat(api): add tours endpoint"
```

### Add New Dependency
```bash
pnpm add <package-name>           # Production dependency
pnpm add -D <package-name>        # Dev dependency

# Update package.json
# Test that build still works
pnpm build

git add package.json pnpm-lock.yaml
git commit -m "chore(deps): add <package-name>"
```

## Path Aliases

TypeScript is configured with path aliases in `tsconfig.json`:
- `@/*` maps to root directory

Usage:
```tsx
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'
import { prisma } from '@/lib/prisma'
```

## Documentation Hub

### Internal Documentation

**Design System** (`docs/design/`):
- [Design System README](docs/design/README.md) - Complete overview
- [Implementation Status](docs/design/STATUS.md) - Component progress tracking
- [Design Tokens](docs/design/tokens/DESIGN_TOKENS.md) - CSS variables, colors, typography
- [Component Library](docs/design/tokens/COMPONENT_LIBRARY.md) - 80+ component inventory
- [Mockups](docs/design/mockups/) - 5 ASCII wireframe files
- [User Flows](docs/design/flows/) - Journey diagrams and booking process

**DevOps** (`docs/devops/`):
- [DevOps README](docs/devops/README.md) - CI/CD architecture overview
- [CI/CD Setup](docs/devops/CI_CD_SETUP.md) - Complete pipeline documentation
- [Deployment Guide](docs/devops/DEPLOYMENT.md) - Vercel deployment instructions
- [Testing Strategy](docs/devops/TESTING.md) - Test pyramid and frameworks
- [Branch Strategy](docs/devops/BRANCH_STRATEGY.md) - Git workflow and conventions

**Planning** (`docs/planning/`):
- [Engineering Plan](docs/planning/engineering-plan.md) - 13-week roadmap
- [Development Checklist](docs/planning/development-checklist.md) - 200+ task items

**Technical** (`docs/technical/`):
- [Technical Specification](docs/technical/technical-specification.md) - Architecture decisions

**Guides** (`docs/guides/`):
- [Quick Start Guide](docs/guides/quick-start-guide.md) - Setup instructions
- [Deployment Guide](docs/guides/deployment-guide.md) - Vercel walkthrough

**Other**:
- [KICKSTARTER_CLAUDE.md](KICKSTARTER_CLAUDE.md) - Generic template for design/DevOps kickstart
- [CLAUDE_USAGE.md](CLAUDE_USAGE.md) - Token usage tracking for billing
- [docs/README.md](docs/README.md) - Documentation hub index

### External Reference Documentation

**Framework & Tools**:
- [Next.js 16](https://nextjs.org/docs) - React framework
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS 4](https://tailwindcss.com/docs) - Styling framework
- [TypeScript 5](https://www.typescriptlang.org/docs/) - Type system
- [Lucide Icons](https://lucide.dev/) - Icon library

**Backend & Database**:
- [Prisma ORM](https://www.prisma.io/docs) - Database toolkit
- [Supabase](https://supabase.com/docs) - PostgreSQL hosting
- [NextAuth.js](https://next-auth.js.org/) - Authentication (planned)

**Payments & Services**:
- [Stripe Docs](https://stripe.com/docs) - Payment processing (planned)
- [Resend](https://resend.com/docs) - Email service (planned)

**DevOps & Deployment**:
- [Vercel](https://vercel.com/docs) - Hosting platform
- [GitHub Actions](https://docs.github.com/actions) - CI/CD
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) - Performance auditing

**Testing**:
- [Jest](https://jestjs.io/) - Unit testing (planned)
- [Playwright](https://playwright.dev/) - E2E testing (planned)
- [React Testing Library](https://testing-library.com/react) - Component testing (planned)

## Project Identity

**Name**: NMG Tours Jamaica
**Tagline**: "Authentic Island Experiences"
**Focus**: Rafting tours, cultural experiences, and authentic Jamaican adventures
**Brand Colors**: Emerald green (#10b981), Black, White
**Target Audience**: Tourists seeking authentic, locally-guided experiences in Jamaica
