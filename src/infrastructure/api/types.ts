/**
 * API Types
 * Common types for API responses and requests
 */

/**
 * API error data structure
 */
export interface ApiErrorData {
  code: string
  message: string
  details?: unknown
}

/**
 * API pagination metadata
 */
export interface ApiMeta {
  page: number
  limit: number
  total: number
  total_pages: number
}

/**
 * API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string | ApiErrorData
  meta?: ApiMeta
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
}
