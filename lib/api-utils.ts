/**
 * API Utilities for NMG Tours Jamaica
 * Provides consistent error handling and response formatting for API routes
 */

import { NextResponse } from 'next/server'

// ============================================
// Type Definitions
// ============================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
    details?: any
  }
  meta?: {
    page?: number
    limit?: number
    total?: number
    timestamp: string
  }
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface ApiError extends Error {
  statusCode?: number
  code?: string
  details?: any
}

// ============================================
// Response Formatters
// ============================================

/**
 * Format successful API response
 */
export function successResponse<T>(
  data: T,
  meta?: Partial<ApiResponse['meta']>
): NextResponse<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  }

  return NextResponse.json(response, { status: 200 })
}

/**
 * Format created resource response (201)
 */
export function createdResponse<T>(
  data: T,
  resourceUrl?: string
): NextResponse<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
    },
  }

  const headers: HeadersInit = {}
  if (resourceUrl) {
    headers['Location'] = resourceUrl
  }

  return NextResponse.json(response, { status: 201, headers })
}

/**
 * Format error response
 */
export function errorResponse(
  message: string,
  statusCode: number = 500,
  code?: string,
  details?: any
): NextResponse<ApiResponse<never>> {
  const response: ApiResponse<never> = {
    success: false,
    error: {
      message,
      code,
      details,
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  }

  return NextResponse.json(response, { status: statusCode })
}

// ============================================
// Error Handlers
// ============================================

/**
 * Handle API errors with consistent formatting
 */
export function handleApiError(error: unknown): NextResponse<ApiResponse<never>> {
  console.error('API Error:', error)

  // Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as { code: string; meta?: any }

    // Record not found
    if (prismaError.code === 'P2025') {
      return errorResponse('Resource not found', 404, 'NOT_FOUND')
    }

    // Unique constraint violation
    if (prismaError.code === 'P2002') {
      return errorResponse(
        'A record with this value already exists',
        409,
        'DUPLICATE_ENTRY',
        prismaError.meta
      )
    }

    // Foreign key constraint violation
    if (prismaError.code === 'P2003') {
      return errorResponse(
        'Related resource not found',
        400,
        'INVALID_REFERENCE',
        prismaError.meta
      )
    }
  }

  // Custom API errors
  if (error instanceof Error) {
    const apiError = error as ApiError
    return errorResponse(
      apiError.message,
      apiError.statusCode || 500,
      apiError.code,
      apiError.details
    )
  }

  // Generic error
  return errorResponse('An unexpected error occurred', 500, 'INTERNAL_ERROR')
}

/**
 * Create a custom API error
 */
export function createApiError(
  message: string,
  statusCode: number = 500,
  code?: string,
  details?: any
): ApiError {
  const error = new Error(message) as ApiError
  error.statusCode = statusCode
  error.code = code
  error.details = details
  return error
}

// ============================================
// Validation Helpers
// ============================================

/**
 * Validate required query parameters
 */
export function validateRequired(
  params: Record<string, any>,
  requiredFields: string[]
): void {
  const missing = requiredFields.filter((field) => !params[field])

  if (missing.length > 0) {
    throw createApiError(
      `Missing required fields: ${missing.join(', ')}`,
      400,
      'MISSING_FIELDS',
      { missing }
    )
  }
}

/**
 * Parse pagination parameters from URL search params
 */
export function parsePagination(searchParams: URLSearchParams): {
  page: number
  limit: number
  skip: number
} {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get('limit') || '12', 10))
  )
  const skip = (page - 1) * limit

  return { page, limit, skip }
}

/**
 * Parse sort parameters from URL search params
 */
export function parseSort(searchParams: URLSearchParams): {
  orderBy: Record<string, 'asc' | 'desc'>
} {
  const sort = searchParams.get('sort') || 'createdAt'
  const order = (searchParams.get('order') || 'desc') as 'asc' | 'desc'

  return {
    orderBy: { [sort]: order },
  }
}

// ============================================
// Common HTTP Status Codes
// ============================================

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const

// ============================================
// CORS Headers (for development/testing)
// ============================================

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

/**
 * Handle OPTIONS requests for CORS
 */
export function handleCORS(): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  })
}
