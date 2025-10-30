# NMG Tours Jamaica

> **Authentic Island Experiences** - A modern tourism booking platform for rafting tours and cultural adventures in Jamaica.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)

## 🌴 About

NMG Tours Jamaica is a full-stack web application that connects tourists with authentic Jamaican experiences, specializing in:
- **Rafting Tours**: Martha Brae, Rio Grande, White River
- **Cultural Adventures**: Authentic local experiences
- **Natural Wonders**: Dunn's River Falls, Blue Hole, Mayfield Falls
- **Safari Experiences**: Black River wildlife tours

**Live Demo**: [nmgtoursjam.com](https://www.nmgtoursjam.com) (coming soon)

## ✨ Features

- 🎯 **Tour Discovery**: Advanced filtering, search, and sorting
- 📅 **Real-time Booking**: Multi-step wizard with availability checking
- 💳 **Secure Payments**: Stripe integration with test mode
- 📧 **Email Notifications**: Automated booking confirmations via Resend
- 👤 **User Accounts**: Dashboard with booking history and profile
- 🔐 **Authentication**: NextAuth.js v5 with credentials + Google OAuth
- 📱 **Responsive Design**: Mobile-first, works on all devices
- ♿ **Accessible**: WCAG AA compliant

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **pnpm** 8+
- **PostgreSQL** database (free tier on [Supabase](https://supabase.com))
- **Stripe** account for payments (test mode is fine)
- **Resend** account for emails (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nmgtoursjam.git
cd nmgtoursjam

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values (see Configuration below)

# Set up database
pnpm db:push      # Push schema to database
pnpm db:seed      # Seed with sample tours

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Configuration

Create a `.env` file in the project root:

```env
# Database (Supabase)
DATABASE_URL="postgresql://user:password@host:5432/database"

# Authentication (NextAuth.js)
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe Payments
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Resend)
RESEND_API_KEY="re_..."
EMAIL_FROM="bookings@yourdomain.com"
```

**Get API Keys:**
- **Database**: [Supabase Dashboard](https://supabase.com/dashboard)
- **Stripe**: [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
- **Resend**: [Resend API Keys](https://resend.com/api-keys)

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs) directory:

- **[Getting Started](./docs/README.md)** - Complete setup guide
- **[Project Status](./docs/PROJECT-STATUS.md)** - Development progress
- **[Production Deployment](./docs/PRODUCTION-DEPLOYMENT.md)** - Deploy to Vercel
- **[Styling Guidelines](./docs/STYLING-GUIDELINES.md)** - Design system and UI patterns
- **[Contributing](./docs/CONTRIBUTING.md)** - Contribution guidelines
- **[Changelog](./docs/CHANGELOG.md)** - Version history

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5
- **Payments**: Stripe
- **Email**: Resend

### DevOps
- **Hosting**: Vercel
- **Package Manager**: pnpm
- **Version Control**: Git + GitHub

## 📦 Available Commands

```bash
# Development
pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Build for production
pnpm start            # Run production build
pnpm lint             # Run ESLint

# Database
pnpm db:generate      # Generate Prisma Client
pnpm db:push          # Push schema to database (dev)
pnpm db:migrate       # Create migration (production)
pnpm db:seed          # Seed database with sample data
pnpm db:studio        # Open Prisma Studio (GUI)

# Testing (coming soon)
pnpm test             # Run test suite
pnpm test:watch       # Run tests in watch mode
```

## 🏗️ Project Structure

```
nmgtoursjam/
├── app/                    # Next.js app directory
│   ├── (marketing)/       # Public pages (home, about, contact)
│   ├── tours/             # Tour listing and details
│   ├── bookings/          # Booking flow
│   ├── dashboard/         # User dashboard
│   ├── legal/             # Legal pages
│   ├── api/               # API routes
│   └── components/        # React components
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma      # Prisma schema
│   └── seed.ts            # Database seeding
├── public/                 # Static assets
├── docs/                   # Documentation
└── lib/                    # Utility functions
```

## 🎨 Design System

- **Primary Color**: Emerald (#10b981) - Jamaica's lush landscapes
- **Typography**: Poppins (body), Caveat (accents)
- **Responsive**: Mobile-first (375px → 1440px+)
- **Theme**: Dark mode with emerald accents
- **Accessibility**: WCAG AA compliant

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/CONTRIBUTING.md) for details.

**Development Workflow:**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "feat: your feature"`
4. Ensure build passes: `pnpm build`
5. Push and create a pull request

**Commit Convention**: Follow [Conventional Commits](https://www.conventionalcommits.org/)

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Team

- **Lead Developer**: Your Name
- **Project Manager**: Project Manager Name
- **Design**: Designer Name

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) by Vercel
- Database powered by [Supabase](https://supabase.com/)
- Payments by [Stripe](https://stripe.com/)
- Email by [Resend](https://resend.com/)

## 📞 Support

- **Documentation**: [`docs/`](./docs) directory
- **Issues**: [GitHub Issues](https://github.com/yourusername/nmgtoursjam/issues)
- **Email**: support@nmgtoursjam.com

---

**Built with 💚 for Jamaica's tourism industry**
