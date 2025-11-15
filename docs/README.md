# NMG Tours Jamaica Documentation

Welcome to the NMG Tours Jamaica project documentation. This comprehensive guide contains everything you need to build and launch a modern tourism platform for authentic Jamaican island experiences.

## 📚 Documentation Structure

### 📋 Planning Documents
- **[Engineering Plan](./planning/engineering-plan.md)** - Complete 13-week roadmap from setup to launch
- **[Development Checklist](./planning/development-checklist.md)** - Detailed task tracking with 200+ items

### 🎨 Design & UX
- **[Design System README](./design/README.md)** - Complete design system overview
- **[Mockups](./design/mockups/)** - ASCII wireframes for all major pages
  - Landing Page, Tour Listing, Tour Detail, Booking Flow, User Dashboard
- **[User Flows](./design/flows/)** - Journey diagrams and booking process
- **[Design Tokens](./design/tokens/)** - Colors, typography, spacing, logo integration
- **[Component Library](./design/tokens/COMPONENT_LIBRARY.md)** - 80+ component inventory
- **[Implementation Status](./design/STATUS.md)** - Development progress tracking

### 🔧 DevOps & CI/CD
- **[DevOps README](./devops/README.md)** - CI/CD pipeline architecture
- **[CI/CD Setup](./devops/CI_CD_SETUP.md)** - Complete pipeline documentation
- **[Deployment Guide](./devops/DEPLOYMENT.md)** - Vercel deployment instructions
- **[Testing Strategy](./devops/TESTING.md)** - Automated testing approach
- **[Branch Strategy](./devops/BRANCH_STRATEGY.md)** - Git workflow and policies

### 🔧 Technical Documents
- **[Technical Specification](./technical/technical-specification.md)** - Architecture decisions, design patterns, and implementation details

### 🚀 Implementation Guides
- **[Quick Start Guide](./guides/quick-start-guide.md)** - Immediate setup instructions with code examples
- **[Deployment Guide](./guides/deployment-guide.md)** - Vercel deployment walkthrough

## 🎯 Project Overview

**NMG Tours Jamaica** - Authentic Island Experiences

A modern tourism booking platform specializing in rafting tours and cultural adventures in Jamaica.

### Tech Stack
- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, Emerald/Jamaican theme
- **Database**: PostgreSQL with Prisma ORM (Supabase hosting)
- **Authentication**: NextAuth.js (planned)
- **Payments**: Stripe (planned)
- **Deployment**: Vercel
- **Package Manager**: pnpm

## 🚦 Getting Started

1. **New Developers**: Start with the [Quick Start Guide](./guides/quick-start-guide.md)
2. **Designers**: Review the [Design System](./design/README.md) and [Mockups](./design/mockups/)
3. **DevOps**: See [CI/CD Setup](./devops/CI_CD_SETUP.md) and [Deployment Guide](./devops/DEPLOYMENT.md)
4. **Project Planning**: Review the [Engineering Plan](./planning/engineering-plan.md)
5. **Task Tracking**: Use the [Development Checklist](./planning/development-checklist.md)
6. **Architecture Reference**: Consult the [Technical Specification](./technical/technical-specification.md)

## 📊 Project Timeline

- **Foundation & Setup**: Week 1-2
- **Core Features**: Week 3-6
- **Advanced Features**: Week 7-9
- **Testing & Optimization**: Week 10-11
- **Launch Preparation**: Week 12-13

## 🏗️ Key Features

### For Tourists
- Browse and book authentic Jamaican tours
- Rafting experiences (Martha Brae, Rio Grande)
- Cultural adventures and local experiences
- Secure online payments with Stripe
- User profiles and booking history
- Reviews and ratings with photos

### For Tour Guides
- Tour management dashboard
- Availability calendar
- Booking notifications
- Revenue tracking
- Customer communication

### For Administrators (Future)
- Comprehensive admin dashboard
- User and content management
- Analytics and reporting
- Payment processing
- Email automation

## 🛠️ Development Workflow

```bash
# Clone repository
git clone https://github.com/4eckd/nmgtoursjam.git
cd nmgtoursjam

# Install dependencies (using pnpm)
pnpm install

# Set up environment
cp .env.example .env.local

# Run development server
pnpm dev

# Run linter
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start
```

### Branch Strategy

- **main** - Production (protected)
- **integration/mvp-launch** - Integration branch for MVP
- **feature/*** - Feature branches (merge to integration)
- **hotfix/*** - Emergency fixes (merge to main + integration)

See [Branch Strategy](./devops/BRANCH_STRATEGY.md) for details.

## 📝 Documentation Updates

To contribute to the documentation:

1. Create a new branch: `git checkout -b docs/update-name`
2. Make your changes in the appropriate document
3. Commit: `git commit -m "docs: description of changes"`
4. Push and create a pull request

## 🎨 Design Resources

- **Logo**: `/public/NMGTOURS.png` (1680x1680px)
- **Color Palette**: Emerald green (#10b981) with Jamaican theme
- **Typography**: Poppins (primary), Caveat (accent)
- **Container**: Max-width 1400px
- **Breakpoints**: 375px, 768px, 1024px, 1440px

## 📞 Support & Resources

- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions and share ideas
- **CLAUDE.md**: Claude Code usage guidelines

## 🚀 Quick Links

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 📊 Project Status

- **Design Documentation**: ✅ Complete (11 files)
- **DevOps Setup**: ✅ Complete (CI/CD pipeline configured)
- **MVP Development**: 🚧 In Progress
- **Current Phase**: Foundation & Component Building

---

**Last Updated**: 2025-11-15
**Repository**: [github.com/4eckd/nmgtoursjam](https://github.com/4eckd/nmgtoursjam)
**Live Site**: TBD (Vercel deployment pending)