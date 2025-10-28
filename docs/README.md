# NMGToursJam Documentation

Welcome to the NMGToursJam project documentation. This comprehensive guide contains everything you need to build and launch a modern tourism platform for New Mexico.

## 📚 Documentation Structure

### 📋 Planning Documents
- **[Engineering Plan](./planning/engineering-plan.md)** - Complete 13-week roadmap from setup to launch
- **[Development Checklist](./planning/development-checklist.md)** - Detailed task tracking with 200+ items

### 🔧 Technical Documents
- **[Technical Specification](./technical/technical-specification.md)** - Architecture decisions, design patterns, and implementation details

### 🚀 Implementation Guides
- **[Quick Start Guide](./guides/quick-start-guide.md)** - Immediate setup instructions with code examples

## 🎯 Project Overview

NMGToursJam is a full-stack tourism platform built with:
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **Authentication**: NextAuth.js (planned)
- **Payments**: Stripe (planned)
- **Hosting**: Vercel

### 📈 Current Status (v0.2.0)

**✅ Completed:**
- TRACK 1: Project Foundation & Setup
- TRACK 2: Database & Infrastructure
  - Prisma ORM configured with PostgreSQL
  - Complete schema with 10 models
  - API routes for tours and bookings
  - Sample seed data for 3 Jamaican rafting tours
  - Vercel deployment configured

**🚧 In Progress:**
- TRACK 3: Tours System (frontend)
- TRACK 4: Authentication & User Management
- TRACK 5: Booking & Payment Flow

**📅 Next Steps:**
- Build tour listing page with filters
- Implement NextAuth.js authentication
- Create booking flow UI

## 🚦 Getting Started

1. **New Developers**: Start with the [Quick Start Guide](./guides/quick-start-guide.md)
2. **Project Planning**: Review the [Engineering Plan](./planning/engineering-plan.md)
3. **Task Tracking**: Use the [Development Checklist](./planning/development-checklist.md)
4. **Architecture Reference**: Consult the [Technical Specification](./technical/technical-specification.md)

## 📊 Project Timeline

- **Foundation & Setup**: Week 1-2
- **Core Features**: Week 3-6
- **Advanced Features**: Week 7-9
- **Testing & Optimization**: Week 10-11
- **Launch Preparation**: Week 12-13

## 🏗️ Key Features

### For Tourists
- Browse and book authentic New Mexico tours
- Discover local cultural "jams" (events/gatherings)
- Secure online payments
- User profiles and booking history
- Reviews and ratings

### For Tour Guides & Hosts
- Tour and event management
- Availability calendar
- Booking management
- Revenue tracking
- Customer communication

### For Administrators
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

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Run development server
npm run dev
```

## 📝 Documentation Updates

To contribute to the documentation:

1. Create a new branch: `git checkout -b docs/update-name`
2. Make your changes in the appropriate document
3. Commit: `git commit -m "docs: description of changes"`
4. Push and create a pull request

## 📞 Support & Resources

- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions and share ideas
- **Email**: support@nmgtoursjam.com

## 🚀 Quick Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Last Updated: October 2024