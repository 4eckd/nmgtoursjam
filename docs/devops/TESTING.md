# Testing Strategy

Comprehensive testing approach for NMG Tours Jamaica

## Testing Pyramid

```
        ╱╲
       ╱E2E╲        10% - End-to-end tests (critical paths)
      ╱──────╲
     ╱ Integ. ╲     20% - Integration tests (API routes, components)
    ╱──────────╲
   ╱    Unit     ╲   70% - Unit tests (functions, utilities)
  ╱──────────────╲
```

## Test Types

### 1. Unit Tests (70%)

**Framework:** Jest + React Testing Library

**What to test:**
- Utility functions
- Hooks
- Component rendering
- Props handling
- State changes

**Example:**
```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    screen.getByText('Click').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### 2. Integration Tests (20%)

**What to test:**
- API route handlers
- Component interactions
- Form submissions
- Data fetching

**Example:**
```tsx
// TourBooking.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TourBooking } from './TourBooking'

describe('TourBooking', () => {
  it('completes booking flow', async () => {
    render(<TourBooking tourId="123" />)

    // Select date
    await userEvent.click(screen.getByText('Nov 15'))

    // Add guests
    await userEvent.click(screen.getByRole('button', { name: /add adult/i }))

    // Submit
    await userEvent.click(screen.getByText('Book Now'))

    // Verify confirmation
    await waitFor(() => {
      expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument()
    })
  })
})
```

### 3. E2E Tests (10%)

**Framework:** Playwright

**Critical paths to test:**
- Homepage → Tour listing → Tour detail → Booking → Confirmation
- User registration → Login → Book tour
- Search tours → Filter results → View tour

**Example:**
```typescript
// booking.spec.ts
import { test, expect } from '@playwright/test'

test('complete booking flow', async ({ page }) => {
  // Navigate to tour
  await page.goto('/tours/martha-brae-rafting')

  // Click book button
  await page.click('text=Book Now')

  // Select date
  await page.click('[data-testid="date-picker"]')
  await page.click('text=Nov 15')

  // Add guests
  await page.click('[data-testid="add-adult"]')

  // Continue
  await page.click('text=Continue')

  // Fill guest info
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="phone"]', '+1234567890')

  // Mock payment
  await page.fill('[name="cardNumber"]', '4242424242424242')
  await page.fill('[name="expiry"]', '12/25')
  await page.fill('[name="cvc"]', '123')

  // Submit
  await page.click('text=Complete Booking')

  // Verify confirmation
  await expect(page.locator('text=Booking Confirmed')).toBeVisible()
})
```

## Test Coverage Goals

| Category | Target | Current |
|----------|--------|---------|
| Overall | 80% | 0% |
| Components | 85% | 0% |
| Utilities | 90% | 0% |
| API Routes | 85% | 0% |
| Critical Paths | 100% | 0% |

## Setup

### Install Dependencies

```bash
# Testing frameworks
pnpm add -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Playwright
pnpm add -D @playwright/test

# Coverage
pnpm add -D @jest/coverage-istanbul
```

### Configure Jest

**jest.config.js:**
```js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/*.stories.tsx',
  ],
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

**jest.setup.js:**
```js
import '@testing-library/jest-dom'
```

### Configure Playwright

**playwright.config.ts:**
```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
})
```

### Package Scripts

**package.json:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

## Test Organization

```
tests/
├── unit/
│   ├── components/
│   │   ├── Button.test.tsx
│   │   ├── TourCard.test.tsx
│   │   └── ...
│   ├── utils/
│   │   ├── formatPrice.test.ts
│   │   └── ...
│   └── hooks/
│       └── useBooking.test.ts
├── integration/
│   ├── api/
│   │   ├── tours.test.ts
│   │   └── bookings.test.ts
│   └── pages/
│       └── TourDetail.test.tsx
└── e2e/
    ├── booking.spec.ts
    ├── search.spec.ts
    └── authentication.spec.ts
```

## CI Integration

Tests run automatically in GitHub Actions:

```yaml
# .github/workflows/ci.yml
- name: Run tests
  run: pnpm test:coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
```

## Test Data

### Mock Data

**tests/mocks/tours.ts:**
```ts
export const mockTour = {
  id: 'tour-1',
  title: 'Martha Brae Rafting',
  price: 85,
  duration: 3,
  rating: 4.9,
  reviewCount: 127,
}
```

### Test Database

Use separate test database:

```env
# .env.test
DATABASE_URL="postgresql://user:pass@localhost:5432/nmgtours_test"
```

## Accessibility Testing

### Jest-axe

```bash
pnpm add -D jest-axe
```

**Example:**
```tsx
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

it('has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

## Performance Testing

### Lighthouse CI

Runs automatically on PRs:

```yaml
# .github/workflows/lighthouse.yml
- name: Run Lighthouse
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: |
      https://preview-url.vercel.app
      https://preview-url.vercel.app/tours
    budgetPath: ./lighthouse-budget.json
```

**lighthouse-budget.json:**
```json
{
  "performance": 80,
  "accessibility": 90,
  "best-practices": 80,
  "seo": 80
}
```

## Visual Regression Testing

### Playwright Screenshots

```ts
test('homepage looks correct', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('homepage.png')
})
```

## Continuous Monitoring

### Test Metrics

Track in CI:
- Test pass/fail rate
- Coverage percentage
- Test execution time
- Flaky tests

### Quality Gates

PR cannot merge if:
- Any test fails
- Coverage drops below 80%
- E2E critical paths fail
- Accessibility violations found

---

**Last Updated**: 2025-11-15
