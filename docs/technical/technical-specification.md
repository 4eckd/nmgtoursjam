# NMGToursJam Technical Specification

## Architecture Overview

### System Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Next.js App   │────▶│   API Routes    │────▶│   PostgreSQL    │
│   (Frontend)    │     │   (Backend)     │     │   (Database)    │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                        │
         │                       │                        │
         ▼                       ▼                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Cloudinary    │     │     Stripe      │     │    SendGrid     │
│   (Images)      │     │   (Payments)    │     │    (Emails)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Tech Stack Decisions

#### Frontend
- **Next.js 14 App Router**: Server components for better performance
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS with custom NM color palette
- **Framer Motion**: Smooth animations for enhanced UX
- **React Query**: Efficient data fetching and caching

#### Backend
- **Next.js API Routes**: Serverless functions for API endpoints
- **Prisma**: Type-safe ORM with migration support
- **PostgreSQL**: Relational database for complex relationships
- **NextAuth.js**: Flexible authentication with multiple providers

#### Infrastructure
- **Vercel**: Optimized Next.js hosting with edge functions
- **Supabase/Neon**: Managed PostgreSQL with real-time capabilities
- **Cloudinary**: Image optimization and transformation
- **SendGrid**: Reliable transactional email delivery

## Design Patterns

### 1. Repository Pattern for Data Access
```typescript
// lib/repositories/tour.repository.ts
export class TourRepository {
  async findAll(filters: TourFilters): Promise<PaginatedResult<Tour>> {
    const where = this.buildWhereClause(filters);
    
    const [data, count] = await Promise.all([
      prisma.tour.findMany({
        where,
        include: this.defaultInclude,
        skip: filters.skip,
        take: filters.take,
      }),
      prisma.tour.count({ where }),
    ]);

    return {
      data,
      count,
      page: filters.page,
      pageSize: filters.pageSize,
    };
  }

  async findBySlug(slug: string): Promise<Tour | null> {
    return prisma.tour.findUnique({
      where: { slug, isActive: true },
      include: this.detailInclude,
    });
  }
}
```

### 2. Service Layer Pattern
```typescript
// lib/services/booking.service.ts
export class BookingService {
  constructor(
    private tourRepo: TourRepository,
    private paymentService: PaymentService,
    private emailService: EmailService
  ) {}

  async createBooking(data: CreateBookingDto): Promise<Booking> {
    // Validate availability
    const availability = await this.checkAvailability(data.tourId, data.date);
    if (!availability) {
      throw new Error('Tour not available on selected date');
    }

    // Create payment intent
    const paymentIntent = await this.paymentService.createIntent({
      amount: data.totalPrice,
      metadata: { tourId: data.tourId, userId: data.userId }
    });

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        ...data,
        paymentIntentId: paymentIntent.id,
        status: 'PENDING'
      }
    });

    // Send confirmation email
    await this.emailService.sendBookingConfirmation(booking);

    return booking;
  }
}
```

### 3. Custom Hooks for Client State
```typescript
// hooks/use-booking.ts
export function useBooking(tourId: string) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  
  const updateDate = useCallback((date: Date) => {
    dispatch({ type: 'SET_DATE', payload: date });
  }, []);

  const updateGuests = useCallback((guests: number) => {
    dispatch({ type: 'SET_GUESTS', payload: guests });
  }, []);

  const { data: availability } = useQuery({
    queryKey: ['availability', tourId, state.date],
    queryFn: () => checkAvailability(tourId, state.date),
    enabled: !!state.date,
  });

  return {
    ...state,
    availability,
    updateDate,
    updateGuests,
  };
}
```

## API Design

### RESTful Endpoints

#### Tours
```
GET    /api/tours              # List tours with filters
GET    /api/tours/[slug]       # Get tour details
GET    /api/tours/[id]/availability  # Check availability

# Admin only
POST   /api/admin/tours        # Create tour
PUT    /api/admin/tours/[id]   # Update tour
DELETE /api/admin/tours/[id]   # Delete tour
```

#### Bookings
```
POST   /api/bookings           # Create booking
GET    /api/bookings           # List user bookings
GET    /api/bookings/[id]      # Get booking details
POST   /api/bookings/[id]/cancel  # Cancel booking
```

### API Response Format
```typescript
// Success Response
{
  success: true,
  data: T,
  meta?: {
    page: number,
    pageSize: number,
    total: number,
    hasMore: boolean
  }
}

// Error Response
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any
  }
}
```

## Database Design

### Indexes Strategy
```sql
-- Performance indexes
CREATE INDEX idx_tours_slug ON tours(slug) WHERE is_active = true;
CREATE INDEX idx_tours_search ON tours USING GIN(to_tsvector('english', title || ' ' || description));
CREATE INDEX idx_bookings_user_date ON bookings(user_id, date DESC);
CREATE INDEX idx_availability_tour_date ON availability(tour_id, date);

-- Composite indexes for common queries
CREATE INDEX idx_tours_category_price ON tours(category_id, price) WHERE is_active = true;
CREATE INDEX idx_bookings_status_date ON bookings(status, created_at DESC);
```

### Database Migrations Strategy
```typescript
// prisma/migrations/helpers/seed-categories.ts
export async function seedCategories() {
  const categories = [
    { name: 'Adventure', slug: 'adventure', icon: 'mountain' },
    { name: 'Cultural', slug: 'cultural', icon: 'museum' },
    { name: 'Food & Wine', slug: 'food-wine', icon: 'utensils' },
    { name: 'Nature', slug: 'nature', icon: 'tree' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
}
```

## Security Implementation

### Authentication Flow
```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Admin routes
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return token?.role === 'ADMIN';
      }
      
      // User routes
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        return !!token;
      }
      
      return true;
    },
  },
});

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/api/admin/:path*']
}
```

### Input Validation with Zod
```typescript
// lib/validations/tour.ts
export const createTourSchema = z.object({
  title: z.string().min(3).max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().min(50).max(5000),
  price: z.number().positive().max(10000),
  duration: z.number().positive().max(72),
  maxGroupSize: z.number().positive().max(50),
  difficulty: z.enum(['EASY', 'MODERATE', 'CHALLENGING', 'EXTREME']),
  included: z.array(z.string()).min(1),
  images: z.array(z.string().url()).min(1).max(10),
});
```

### API Rate Limiting
```typescript
// lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});

// Usage in API route
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for");
  const { success } = await rateLimiter.limit(ip ?? "anonymous");
  
  if (!success) {
    return new Response("Too many requests", { status: 429 });
  }
  
  // Process request...
}
```

## Performance Optimization

### Image Optimization Strategy
```typescript
// components/ui/optimized-image.tsx
import Image from 'next/image';
import { cloudinaryLoader } from '@/lib/cloudinary';

export function OptimizedImage({ src, alt, ...props }) {
  return (
    <Image
      loader={cloudinaryLoader}
      src={src}
      alt={alt}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={85}
      placeholder="blur"
      blurDataURL={generateBlurDataURL(src)}
      {...props}
    />
  );
}
```

### Data Fetching Strategy
```typescript
// app/tours/[slug]/page.tsx
// Using React Server Components for optimal performance
export default async function TourDetailPage({ params }) {
  // Parallel data fetching
  const [tour, reviews, relatedTours] = await Promise.all([
    getTourBySlug(params.slug),
    getReviewsByTourSlug(params.slug),
    getRelatedTours(params.slug),
  ]);

  if (!tour) notFound();

  return (
    <>
      <TourHero tour={tour} />
      <TourDetails tour={tour} />
      <ReviewSection reviews={reviews} />
      <RelatedTours tours={relatedTours} />
    </>
  );
}
```

### Caching Strategy
```typescript
// lib/cache.ts
export async function getCachedTours() {
  const cacheKey = 'tours:featured';
  
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) return cached;
  
  // Fetch from database
  const tours = await prisma.tour.findMany({
    where: { featured: true, isActive: true },
    take: 6,
  });
  
  // Cache for 1 hour
  await redis.setex(cacheKey, 3600, JSON.stringify(tours));
  
  return tours;
}
```

## Error Handling

### Global Error Boundary
```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-md bg-nm-sunset px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}
```

### API Error Handler
```typescript
// lib/api/error-handler.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
  }
}

export function handleApiError(error: unknown): Response {
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      },
      { status: error.statusCode }
    );
  }

  // Log unexpected errors
  console.error('Unexpected error:', error);
  
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      },
    },
    { status: 500 }
  );
}
```

## Testing Strategy

### Unit Test Example
```typescript
// __tests__/services/booking.service.test.ts
describe('BookingService', () => {
  let service: BookingService;
  
  beforeEach(() => {
    service = new BookingService(
      mockTourRepo,
      mockPaymentService,
      mockEmailService
    );
  });

  it('should create booking with valid data', async () => {
    const bookingData = createMockBookingData();
    mockTourRepo.checkAvailability.mockResolvedValue(true);
    mockPaymentService.createIntent.mockResolvedValue({ id: 'pi_123' });

    const booking = await service.createBooking(bookingData);

    expect(booking).toBeDefined();
    expect(booking.status).toBe('PENDING');
    expect(mockEmailService.sendBookingConfirmation).toHaveBeenCalled();
  });
});
```

### Integration Test Example
```typescript
// __tests__/api/tours.test.ts
describe('GET /api/tours', () => {
  it('should return filtered tours', async () => {
    const response = await fetch('/api/tours?category=adventure&maxPrice=200');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toBeInstanceOf(Array);
    expect(data.data.every(tour => tour.price <= 200)).toBe(true);
  });
});
```

## Monitoring & Observability

### Error Tracking with Sentry
```typescript
// lib/monitoring/sentry.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event) {
    // Filter out sensitive data
    if (event.request?.cookies) {
      delete event.request.cookies;
    }
    return event;
  },
});
```

### Performance Monitoring
```typescript
// lib/monitoring/performance.ts
export function measureApiPerformance(routeName: string) {
  return async (handler: Function) => {
    const start = performance.now();
    
    try {
      const result = await handler();
      const duration = performance.now() - start;
      
      // Log to monitoring service
      await logMetric('api.request.duration', duration, {
        route: routeName,
        status: 'success',
      });
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      
      await logMetric('api.request.duration', duration, {
        route: routeName,
        status: 'error',
      });
      
      throw error;
    }
  };
}
```

## Deployment Configuration

### Vercel Configuration
```json
// vercel.json
{
  "functions": {
    "app/api/tours/route.ts": {
      "maxDuration": 10
    },
    "app/api/bookings/route.ts": {
      "maxDuration": 30
    }
  },
  "crons": [
    {
      "path": "/api/cron/send-reminders",
      "schedule": "0 10 * * *"
    }
  ]
}
```

### Environment Configuration
```typescript
// lib/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  SENDGRID_API_KEY: z.string(),
  CLOUDINARY_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

This technical specification provides the architectural foundation and implementation patterns for building a robust, scalable tourism platform.