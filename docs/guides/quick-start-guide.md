# NMGToursJam Quick Start Implementation Guide

## Immediate Setup Instructions

### Step 1: Initialize Your Development Environment

```bash
# Clone your repository
git clone https://github.com/4eckd/nmgtoursjam.git
cd nmgtoursjam

# Create a new branch for development
git checkout -b feature/initial-setup

# Install dependencies from the engineering plan
npm install typescript @types/react @types/node tailwindcss postcss autoprefixer @prisma/client prisma next-auth @auth/prisma-adapter framer-motion react-hook-form zod @hookform/resolvers lucide-react date-fns @tanstack/react-query stripe @stripe/stripe-js

# Install dev dependencies
npm install -D @types/react-dom eslint-config-next prettier eslint-config-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Step 2: Configure TypeScript

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 3: Set Up Tailwind CSS

```bash
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nm-turquoise': '#40E0D0',
        'nm-sand': '#F4A460',
        'nm-sunset': '#FF6B6B',
        'nm-sky': '#87CEEB',
        'nm-terra': '#8B4513',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
}
```

### Step 4: Create Project Structure

```bash
# Create directory structure
mkdir -p app/{auth,marketing,app}/
mkdir -p app/api/{auth,tours,bookings}/
mkdir -p components/{ui,features,layouts}/
mkdir -p lib/{db,utils}/
mkdir -p prisma
mkdir -p public/images
mkdir -p styles
mkdir -p types
```

### Step 5: Set Up Environment Variables

Create `.env.local`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nmgtoursjam"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here-generate-with-openssl"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
SENDGRID_API_KEY="your-sendgrid-key"
EMAIL_FROM="noreply@nmgtoursjam.com"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Step 6: Initialize Prisma

```bash
npx prisma init
```

Copy the schema from the engineering plan into `prisma/schema.prisma`

### Step 7: Create Base Layout

Create `app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NMGToursJam - Discover Authentic New Mexico',
  description: 'Experience the best tours and cultural jams in New Mexico',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### Step 8: Create Homepage Component

Create `app/(marketing)/page.tsx`:
```typescript
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-nm-sunset to-nm-turquoise opacity-80" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover Authentic New Mexico
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Experience unforgettable tours and cultural jams with local guides
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-lg p-2 max-w-2xl mx-auto">
            <div className="flex items-center">
              <Search className="text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Search tours, jams, or destinations..."
                className="flex-1 px-4 py-3 text-gray-800 focus:outline-none"
              />
              <Button className="bg-nm-sunset hover:bg-nm-sunset/90">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Tours
          </h2>
          {/* Tour cards will go here */}
        </div>
      </section>
    </div>
  )
}
```

### Step 9: Create Basic UI Components

Create `components/ui/button.tsx`:
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            'default': 'bg-nm-sunset text-white hover:bg-nm-sunset/90',
            'outline': 'border border-gray-300 bg-transparent hover:bg-gray-100',
            'ghost': 'hover:bg-gray-100'
          }[variant],
          {
            'default': 'h-10 px-4 py-2',
            'sm': 'h-8 px-3',
            'lg': 'h-12 px-8'
          }[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
```

Create `lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Step 10: Database Setup Commands

```bash
# Start PostgreSQL locally (if using Docker)
docker run --name nmgtoursjam-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

# Run initial migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Seed database (after creating seed file)
npx prisma db seed
```

### Step 11: Create Database Connection

Create `lib/db.ts`:
```typescript
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
```

### Step 12: Set Up NextAuth

Create `lib/auth.ts`:
```typescript
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials")
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    signUp: '/register',
  }
}
```

Create `app/api/auth/[...nextauth]/route.ts`:
```typescript
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

## Development Workflow

### Daily Development Process

1. **Start your dev environment**
   ```bash
   # Terminal 1: Start database
   docker start nmgtoursjam-db
   
   # Terminal 2: Start dev server
   npm run dev
   
   # Terminal 3: Prisma Studio (database viewer)
   npx prisma studio
   ```

2. **Git workflow**
   ```bash
   # Create feature branch
   git checkout -b feature/tour-listing
   
   # Make changes and commit
   git add .
   git commit -m "feat: add tour listing page"
   
   # Push to remote
   git push -u origin feature/tour-listing
   ```

3. **Testing workflow**
   ```bash
   # Run unit tests
   npm test
   
   # Run specific test
   npm test -- TourCard.test.tsx
   
   # Run e2e tests
   npx playwright test
   ```

## Component Development Pattern

### Example: Creating a Tour Card Component

```typescript
// components/features/tours/TourCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TourCardProps {
  tour: {
    id: string
    title: string
    slug: string
    shortDesc: string
    price: number
    duration: number
    maxGroupSize: number
    coverImage: string
    rating?: number
    reviewCount?: number
  }
  className?: string
}

export function TourCard({ tour, className }: TourCardProps) {
  return (
    <Link href={`/tours/${tour.slug}`}>
      <article className={cn(
        "group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl",
        className
      )}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={tour.coverImage}
            alt={tour.title}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
            <span className="font-semibold">${tour.price}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-nm-sunset transition-colors">
            {tour.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {tour.shortDesc}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {tour.duration}h
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Max {tour.maxGroupSize}
              </span>
            </div>
            
            {tour.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{tour.rating}</span>
                <span>({tour.reviewCount})</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
```

## API Development Pattern

### Example: Tours API Route

```typescript
// app/api/tours/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const querySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(12),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = querySchema.parse(Object.fromEntries(searchParams))
    
    const where = {
      isActive: true,
      ...(query.search && {
        OR: [
          { title: { contains: query.search, mode: 'insensitive' } },
          { description: { contains: query.search, mode: 'insensitive' } },
        ],
      }),
      ...(query.category && { category: { slug: query.category } }),
      ...(query.minPrice && { price: { gte: query.minPrice } }),
      ...(query.maxPrice && { price: { lte: query.maxPrice } }),
    }

    const [tours, total] = await Promise.all([
      prisma.tour.findMany({
        where,
        include: {
          category: true,
          _count: {
            select: { reviews: true }
          },
          reviews: {
            select: { rating: true }
          }
        },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.tour.count({ where })
    ])

    // Calculate average ratings
    const toursWithRatings = tours.map(tour => ({
      ...tour,
      rating: tour.reviews.length > 0
        ? tour.reviews.reduce((acc, r) => acc + r.rating, 0) / tour.reviews.length
        : null,
      reviewCount: tour._count.reviews
    }))

    return NextResponse.json({
      tours: toursWithRatings,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        pages: Math.ceil(total / query.limit)
      }
    })
  } catch (error) {
    console.error('Tours API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
```

## Deployment Checklist

### Before First Deploy
- [ ] All environment variables set in Vercel
- [ ] Database migrations run on production
- [ ] Stripe webhooks configured
- [ ] Email templates tested
- [ ] Error monitoring enabled
- [ ] Analytics configured

### Deploy Command
```bash
# Deploy to Vercel
vercel --prod

# Or push to main branch for auto-deploy
git push origin main
```

## Troubleshooting Common Issues

### Prisma Issues
```bash
# Clear Prisma cache
rm -rf node_modules/.prisma

# Regenerate client
npx prisma generate

# Reset database
npx prisma migrate reset
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Clear all caches and reinstall
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

This guide provides immediate, actionable steps to start building your NMGToursJam platform. Follow these instructions sequentially for the smoothest development experience.