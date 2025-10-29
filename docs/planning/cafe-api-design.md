# Café/Bar/Grill - API Design Document

## Overview

This document defines the RESTful API design for the café, bar, and grill feature. All endpoints follow Next.js App Router conventions and integrate with the existing authentication and payment infrastructure.

**API Base URL**: `https://nmgtoursjam.com/api/cafe`
**Authentication**: NextAuth.js JWT tokens
**Content-Type**: `application/json`

---

## API Architecture

### Design Principles
1. **RESTful Conventions**: Standard HTTP methods and status codes
2. **Consistent Response Format**: Uniform structure across all endpoints
3. **Authentication**: JWT-based authentication for protected routes
4. **Validation**: Zod schemas for request validation
5. **Error Handling**: Detailed error messages with proper status codes
6. **Rate Limiting**: Protect against abuse (100 requests/minute per IP)

### Standard Response Format

```typescript
// Success Response
{
  success: true,
  data: { ... },
  meta?: {
    page: 1,
    limit: 20,
    total: 150,
    totalPages: 8
  }
}

// Error Response
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid request parameters",
    details: [
      { field: "email", message: "Invalid email format" }
    ]
  }
}
```

---

## Authentication

### Protected Routes

Protected routes require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <jwt_token>
```

### Public vs Protected Endpoints

**Public** (no authentication):
- `GET /api/cafe/menu` - Browse menu
- `GET /api/cafe/menu/[slug]` - View menu item details
- `GET /api/cafe/categories` - List categories

**Protected** (requires auth):
- `POST /api/cafe/reservations` - Create reservation
- `POST /api/cafe/orders` - Place order
- `GET /api/cafe/orders/[id]` - View order details
- `GET /api/cafe/reservations/[id]` - View reservation details

**Admin Only**:
- `POST /api/cafe/menu` - Create menu item
- `PUT /api/cafe/menu/[id]` - Update menu item
- `DELETE /api/cafe/menu/[id]` - Delete menu item
- `GET /api/cafe/admin/*` - All admin endpoints

---

## Menu Endpoints

### GET /api/cafe/menu

Browse the full menu with filtering and pagination.

**Method**: `GET`
**Auth**: Public
**Rate Limit**: 100 req/min

**Query Parameters**:
```typescript
{
  category?: string        // Filter by category slug
  search?: string          // Search in name/description
  isVegetarian?: boolean
  isVegan?: boolean
  isGlutenFree?: boolean
  isSpicy?: boolean
  minPrice?: number
  maxPrice?: number
  isAvailable?: boolean    // Default: true
  sortBy?: "name" | "price" | "popular"
  sortOrder?: "asc" | "desc"
  page?: number            // Default: 1
  limit?: number           // Default: 20, Max: 100
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "clx123abc",
      "name": "Jerk Chicken",
      "slug": "jerk-chicken",
      "description": "Authentic Jamaican jerk chicken...",
      "shortDescription": "Grilled chicken with jerk spices",
      "price": 18.99,
      "compareAtPrice": null,
      "isOnSale": false,
      "category": {
        "id": "cat123",
        "name": "Grilled Specialties",
        "slug": "grilled"
      },
      "isVegetarian": false,
      "isVegan": false,
      "isGlutenFree": true,
      "isSpicy": true,
      "spicyLevel": 3,
      "allergens": ["soy"],
      "coverImage": "https://cdn.nmgtoursjam.com/menu/jerk-chicken.jpg",
      "images": ["url1", "url2"],
      "isAvailable": true,
      "prepTimeMinutes": 20,
      "portionSize": "Regular",
      "isPopular": true,
      "tags": ["signature", "authentic"]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

**Example Requests**:
```bash
# Get all vegetarian items
GET /api/cafe/menu?isVegetarian=true

# Search for "jerk" items under $20
GET /api/cafe/menu?search=jerk&maxPrice=20

# Get desserts sorted by price
GET /api/cafe/menu?category=desserts&sortBy=price&sortOrder=asc
```

---

### GET /api/cafe/menu/[slug]

Get detailed information for a specific menu item.

**Method**: `GET`
**Auth**: Public
**Path**: `/api/cafe/menu/jerk-chicken`

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "clx123abc",
    "name": "Jerk Chicken",
    "slug": "jerk-chicken",
    "description": "Full description here...",
    "price": 18.99,
    "category": { ... },
    "nutritionalInfo": {
      "calories": 450,
      "protein": 35,
      "carbs": 12,
      "fat": 28
    },
    "reviews": {
      "averageRating": 4.7,
      "totalReviews": 124,
      "recentReviews": [ ... ]
    },
    "allergens": ["soy"],
    "portionSize": "Regular",
    "servingInfo": "Serves 1 person",
    "prepTimeMinutes": 20,
    "relatedItems": [ ... ]
  }
}
```

**Error Responses**:
- `404 NOT FOUND`: Menu item not found

---

### POST /api/cafe/menu (Admin)

Create a new menu item.

**Method**: `POST`
**Auth**: Admin only
**Content-Type**: `application/json`

**Request Body**:
```json
{
  "name": "Curry Goat",
  "slug": "curry-goat",
  "description": "Tender goat meat slow-cooked in authentic Jamaican curry...",
  "shortDescription": "Jamaican curry goat with rice and peas",
  "price": 22.99,
  "categoryId": "cat123",
  "isVegetarian": false,
  "isSpicy": true,
  "spicyLevel": 2,
  "allergens": ["dairy"],
  "coverImage": "https://cdn.nmgtoursjam.com/menu/curry-goat.jpg",
  "prepTimeMinutes": 25,
  "portionSize": "Regular"
}
```

**Response**: `201 CREATED`
```json
{
  "success": true,
  "data": {
    "id": "new-item-id",
    "name": "Curry Goat",
    "slug": "curry-goat",
    ...
  }
}
```

**Error Responses**:
- `400 BAD REQUEST`: Validation error
- `401 UNAUTHORIZED`: Not authenticated
- `403 FORBIDDEN`: Not admin
- `409 CONFLICT`: Slug already exists

---

### PUT /api/cafe/menu/[id] (Admin)

Update an existing menu item.

**Method**: `PUT`
**Auth**: Admin only
**Path**: `/api/cafe/menu/clx123abc`

**Request Body**: Partial update allowed
```json
{
  "price": 19.99,
  "isAvailable": true,
  "isOnSale": true,
  "compareAtPrice": 24.99
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "data": { ... updated item ... }
}
```

---

### DELETE /api/cafe/menu/[id] (Admin)

Delete a menu item (soft delete recommended).

**Method**: `DELETE`
**Auth**: Admin only
**Path**: `/api/cafe/menu/clx123abc`

**Response**: `200 OK`
```json
{
  "success": true,
  "message": "Menu item deleted successfully"
}
```

---

## Category Endpoints

### GET /api/cafe/categories

Get all menu categories.

**Method**: `GET`
**Auth**: Public

**Response**: `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "cat1",
      "name": "Appetizers & Starters",
      "slug": "appetizers",
      "description": "Start your meal with these delicious bites",
      "displayOrder": 1,
      "icon": "utensils",
      "itemCount": 12
    },
    ...
  ]
}
```

---

## Order Endpoints

### POST /api/cafe/orders

Create a new order.

**Method**: `POST`
**Auth**: Optional (guests can order with contact info)
**Content-Type**: `application/json`

**Request Body**:
```json
{
  "orderType": "DINE_IN",
  "tableId": "table123",
  "reservationId": "res456",
  "items": [
    {
      "menuItemId": "item1",
      "quantity": 2,
      "modifications": "No onions, extra spicy"
    },
    {
      "menuItemId": "item2",
      "quantity": 1
    }
  ],
  "specialInstructions": "Please bring ketchup",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1-876-555-0123",
  "tipAmount": 5.00,
  "isTourPackage": false
}
```

**Response**: `201 CREATED`
```json
{
  "success": true,
  "data": {
    "id": "order123",
    "orderNumber": "ORD-20251029-001",
    "orderType": "DINE_IN",
    "status": "PENDING",
    "items": [
      {
        "id": "orderitem1",
        "name": "Jerk Chicken",
        "quantity": 2,
        "price": 18.99,
        "itemTotal": 37.98,
        "modifications": "No onions, extra spicy"
      }
    ],
    "pricing": {
      "subtotal": 37.98,
      "taxAmount": 5.32,
      "tipAmount": 5.00,
      "discountAmount": 0,
      "totalAmount": 48.30
    },
    "paymentStatus": "PENDING",
    "orderedAt": "2025-10-29T14:30:00Z",
    "estimatedReadyTime": "2025-10-29T14:55:00Z"
  }
}
```

**Error Responses**:
- `400 BAD REQUEST`: Invalid items or quantities
- `422 UNPROCESSABLE ENTITY`: Menu items unavailable

---

### GET /api/cafe/orders/[id]

Get order details.

**Method**: `GET`
**Auth**: Required (own orders) or Admin (all orders)
**Path**: `/api/cafe/orders/order123`

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "order123",
    "orderNumber": "ORD-20251029-001",
    "status": "PREPARING",
    "orderType": "DINE_IN",
    "items": [ ... ],
    "pricing": { ... },
    "timeline": {
      "orderedAt": "2025-10-29T14:30:00Z",
      "prepStartedAt": "2025-10-29T14:32:00Z",
      "readyAt": null,
      "servedAt": null
    },
    "table": {
      "tableNumber": "T5",
      "location": "OUTDOOR"
    }
  }
}
```

---

### GET /api/cafe/orders

List user's orders with pagination.

**Method**: `GET`
**Auth**: Required
**Query Parameters**:
```typescript
{
  status?: OrderStatus
  orderType?: OrderType
  startDate?: string      // ISO date
  endDate?: string
  page?: number
  limit?: number
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "order123",
      "orderNumber": "ORD-20251029-001",
      "status": "COMPLETED",
      "totalAmount": 48.30,
      "orderedAt": "2025-10-29T14:30:00Z",
      "completedAt": "2025-10-29T15:10:00Z",
      "itemCount": 2
    }
  ],
  "meta": { ... }
}
```

---

### PATCH /api/cafe/orders/[id]/status (Staff)

Update order status.

**Method**: `PATCH`
**Auth**: Staff/Admin only
**Path**: `/api/cafe/orders/order123/status`

**Request Body**:
```json
{
  "status": "PREPARING",
  "staffNotes": "Started prep at 2:32 PM"
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "order123",
    "status": "PREPARING",
    "prepStartedAt": "2025-10-29T14:32:00Z"
  }
}
```

---

## Reservation Endpoints

### POST /api/cafe/reservations

Create a new reservation.

**Method**: `POST`
**Auth**: Optional (guests can reserve with contact info)
**Content-Type**: `application/json`

**Request Body**:
```json
{
  "date": "2025-11-05",
  "time": "19:00",
  "partySize": 4,
  "guestName": "Jane Smith",
  "guestEmail": "jane@example.com",
  "guestPhone": "+1-876-555-9876",
  "preferredLocation": "OUTDOOR",
  "specialRequests": "Window seat if possible",
  "occasion": "Anniversary",
  "dietaryNeeds": "One guest is vegetarian"
}
```

**Response**: `201 CREATED`
```json
{
  "success": true,
  "data": {
    "id": "res123",
    "reservationNumber": "RES-20251105-019",
    "date": "2025-11-05",
    "time": "19:00",
    "partySize": 4,
    "status": "CONFIRMED",
    "guestName": "Jane Smith",
    "guestEmail": "jane@example.com",
    "confirmationSentAt": "2025-10-29T15:00:00Z",
    "table": {
      "id": "table5",
      "tableNumber": "P3",
      "location": "OUTDOOR",
      "capacity": 4
    }
  }
}
```

**Error Responses**:
- `400 BAD REQUEST`: Invalid date/time
- `409 CONFLICT`: No tables available for party size
- `422 UNPROCESSABLE ENTITY`: Date is in the past

---

### GET /api/cafe/reservations/[id]

Get reservation details.

**Method**: `GET`
**Auth**: Required (own reservations) or Admin
**Path**: `/api/cafe/reservations/res123`

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "res123",
    "reservationNumber": "RES-20251105-019",
    "status": "CONFIRMED",
    "date": "2025-11-05",
    "time": "19:00",
    "partySize": 4,
    "table": { ... },
    "guestInfo": { ... },
    "specialRequests": "Window seat if possible",
    "confirmationSentAt": "2025-10-29T15:00:00Z",
    "reminderSentAt": null
  }
}
```

---

### PATCH /api/cafe/reservations/[id]

Update or cancel a reservation.

**Method**: `PATCH`
**Auth**: Required (own reservations) or Admin
**Path**: `/api/cafe/reservations/res123`

**Request Body**:
```json
{
  "status": "CANCELLED",
  "time": "19:30",
  "partySize": 5
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "data": { ... updated reservation ... }
}
```

**Error Responses**:
- `400 BAD REQUEST`: Cannot modify past reservations
- `409 CONFLICT`: New time/size unavailable

---

### GET /api/cafe/reservations/availability

Check table availability for a specific date/time/party size.

**Method**: `GET`
**Auth**: Public
**Query Parameters**:
```typescript
{
  date: string        // "2025-11-05"
  time: string        // "19:00"
  partySize: number   // 4
  preferredLocation?: "INDOOR" | "OUTDOOR" | "BAR" | "PATIO"
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "isAvailable": true,
    "availableTables": [
      {
        "id": "table5",
        "tableNumber": "P3",
        "location": "OUTDOOR",
        "capacity": 4
      },
      {
        "id": "table8",
        "tableNumber": "T12",
        "location": "INDOOR",
        "capacity": 6
      }
    ],
    "suggestedTimes": [
      "18:30",
      "19:00",
      "19:30",
      "20:00"
    ]
  }
}
```

---

## Review Endpoints

### POST /api/cafe/reviews

Submit a review for a menu item.

**Method**: `POST`
**Auth**: Required
**Content-Type**: `application/json`

**Request Body**:
```json
{
  "menuItemId": "item123",
  "orderId": "order456",
  "rating": 5,
  "title": "Amazing Jerk Chicken!",
  "comment": "The best jerk chicken I've had in Jamaica. Perfectly spiced and grilled.",
  "wouldRecommend": true,
  "images": ["url1", "url2"]
}
```

**Response**: `201 CREATED`
```json
{
  "success": true,
  "data": {
    "id": "review123",
    "rating": 5,
    "title": "Amazing Jerk Chicken!",
    "comment": "...",
    "wouldRecommend": true,
    "isApproved": false,
    "createdAt": "2025-10-29T15:30:00Z"
  }
}
```

**Error Responses**:
- `400 BAD REQUEST`: Already reviewed this item for this order
- `403 FORBIDDEN`: Must have ordered this item

---

### GET /api/cafe/menu/[slug]/reviews

Get reviews for a specific menu item.

**Method**: `GET`
**Auth**: Public
**Path**: `/api/cafe/menu/jerk-chicken/reviews`
**Query Parameters**:
```typescript
{
  rating?: number      // Filter by rating (1-5)
  sortBy?: "recent" | "rating"
  page?: number
  limit?: number
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "averageRating": 4.7,
    "totalReviews": 124,
    "ratingDistribution": {
      "5": 80,
      "4": 30,
      "3": 10,
      "2": 3,
      "1": 1
    },
    "reviews": [
      {
        "id": "review123",
        "rating": 5,
        "title": "Amazing!",
        "comment": "Best jerk chicken ever",
        "userName": "John D.",
        "userImage": "avatar.jpg",
        "wouldRecommend": true,
        "createdAt": "2025-10-28T12:00:00Z",
        "staffResponse": null
      }
    ]
  },
  "meta": { ... }
}
```

---

## Admin Endpoints

### GET /api/cafe/admin/dashboard

Get café analytics dashboard data.

**Method**: `GET`
**Auth**: Admin only
**Query Parameters**:
```typescript
{
  startDate?: string
  endDate?: string
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalRevenue": 25678.50,
      "totalOrders": 423,
      "averageOrderValue": 60.71,
      "totalReservations": 89
    },
    "popularItems": [
      { "name": "Jerk Chicken", "orderCount": 145, "revenue": 2755.55 }
    ],
    "revenueByDay": [ ... ],
    "ordersByType": {
      "DINE_IN": 320,
      "TAKEOUT": 103
    },
    "peakHours": [ ... ]
  }
}
```

---

### GET /api/cafe/admin/orders

List all orders with filters.

**Method**: `GET`
**Auth**: Admin/Staff only
**Query Parameters**:
```typescript
{
  status?: OrderStatus
  orderType?: OrderType
  startDate?: string
  endDate?: string
  tableId?: string
  searchQuery?: string    // Search by customer name/order number
  page?: number
  limit?: number
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "order123",
      "orderNumber": "ORD-20251029-001",
      "status": "PREPARING",
      "customerName": "John Doe",
      "tableNumber": "T5",
      "totalAmount": 48.30,
      "orderedAt": "2025-10-29T14:30:00Z",
      "itemCount": 2
    }
  ],
  "meta": { ... }
}
```

---

### GET /api/cafe/admin/reservations

List all reservations with filters.

**Method**: `GET`
**Auth**: Admin/Staff only
**Query Parameters**: Similar to orders

**Response**: `200 OK` with paginated reservation list

---

## WebSocket Endpoints (Real-Time Updates)

### /api/cafe/ws/orders

Real-time order status updates for kitchen display systems.

**Protocol**: WebSocket
**Auth**: Staff/Admin only
**Connection**: `wss://nmgtoursjam.com/api/cafe/ws/orders`

**Events**:
```typescript
// Incoming: New order
{
  "event": "order.created",
  "data": { ... order details ... }
}

// Outgoing: Update status
{
  "event": "order.update",
  "orderId": "order123",
  "status": "PREPARING"
}

// Incoming: Status changed
{
  "event": "order.status_changed",
  "orderId": "order123",
  "status": "READY",
  "timestamp": "2025-10-29T14:55:00Z"
}
```

---

## Webhook Endpoints

### POST /api/cafe/webhooks/stripe

Handle Stripe payment webhooks.

**Method**: `POST`
**Auth**: Stripe signature verification
**Content-Type**: `application/json`

**Events Handled**:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`

**Response**: `200 OK`

---

## Error Codes

### Standard Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource conflict (e.g., slug exists) |
| `UNPROCESSABLE` | 422 | Request valid but cannot be processed |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |

### Domain-Specific Error Codes

| Code | Description |
|------|-------------|
| `ITEM_UNAVAILABLE` | Menu item is sold out |
| `TABLE_UNAVAILABLE` | No tables available for party size |
| `INVALID_TIME_SLOT` | Reservation time is invalid |
| `PAST_DATE` | Cannot book in the past |
| `ORDER_NOT_MODIFIABLE` | Order already completed/cancelled |
| `PAYMENT_FAILED` | Payment processing failed |

---

## Rate Limiting

### Rate Limit Policies

| Endpoint Type | Rate Limit | Window |
|--------------|------------|--------|
| Public (GET) | 100 req | 1 minute |
| Authenticated | 200 req | 1 minute |
| Order Creation | 10 req | 1 minute |
| Admin | 500 req | 1 minute |

**Headers**:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699456800
```

---

## Caching Strategy

### Cache Headers

```http
# Menu items (5 min cache)
Cache-Control: public, max-age=300, stale-while-revalidate=60

# Menu categories (1 hour cache)
Cache-Control: public, max-age=3600

# Order data (no cache)
Cache-Control: no-cache, no-store, must-revalidate
```

---

## API Versioning

### Version Strategy

**Current**: v1 (implicit in base URL)
**Future**: `/api/v2/cafe/...` for breaking changes

### Deprecation Policy
- 6-month notice for breaking changes
- Support previous version for 12 months
- Clear migration guides

---

## Testing

### Test Endpoints

**Test Environment**: `https://test.nmgtoursjam.com/api/cafe`

### Sample Test Credentials

```bash
# Test user (customer)
Email: test@example.com
Password: TestUser123!

# Test admin
Email: admin@nmgtoursjam.com
Password: AdminTest123!
```

---

## Next Steps

1. ✅ **Review API design** with frontend team
2. ⏳ **Implement endpoint handlers** in Next.js App Router
3. ⏳ **Set up Zod validation** schemas
4. ⏳ **Create API documentation** with Swagger/OpenAPI
5. ⏳ **Write integration tests** for all endpoints
6. ⏳ **Set up monitoring** and logging

---

**Document Version**: 1.0
**Last Updated**: October 29, 2025
**API Version**: v1
