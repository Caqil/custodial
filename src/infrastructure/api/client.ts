/**
 * API Client Configuration
 * Axios instance with interceptors for authentication and error handling
 */

import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth-store'

/**
 * API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: ApiErrorData
  meta?: ApiMeta
}

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
 * API error response (legacy format for backward compatibility)
 */
export interface ApiError {
  error: string | ApiErrorData
}

/**
 * Create axios instance with base configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Request interceptor to add JWT token
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from auth store
    const token = useAuthStore.getState().auth.accessToken

    // Add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

/**
 * Response interceptor for error handling
 */
apiClient.interceptors.response.use(
  (response) => {
    // Return response data directly
    return response
  },
  (error: AxiosError<ApiError | ApiResponse<any>>) => {
    // Handle specific error status codes
    if (error.response) {
      const { status, data } = error.response

      // Extract error message from response
      let errorMessage = 'Unknown error'
      if (data) {
        if (typeof data === 'object' && 'error' in data) {
          if (typeof data.error === 'string') {
            errorMessage = data.error
          } else if (data.error && typeof data.error === 'object' && 'message' in data.error) {
            errorMessage = data.error.message
          }
        }
      }

      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect handled by QueryCache in main.tsx
          console.error('Unauthorized access - token may be expired:', errorMessage)
          break

        case 403:
          // Forbidden - user doesn't have admin role
          console.error('Forbidden - admin role required:', errorMessage)
          break

        case 404:
          // Not found
          console.error('Resource not found:', errorMessage)
          break

        case 429:
          // Rate limit exceeded
          console.error('Rate limit exceeded - please try again later:', errorMessage)
          break

        case 500:
          // Internal server error
          console.error('Internal server error:', errorMessage)
          break

        default:
          console.error(`API error: ${status}`, errorMessage)
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - please check your connection')
    } else {
      // Other errors
      console.error('Request error:', error.message)
    }

    return Promise.reject(error)
  }
)

/**
 * Helper function to extract data from API response
 */
export function extractData<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    // Handle error response
    if (response.error) {
      if (typeof response.error === 'object' && response.error.message) {
        throw new Error(response.error.message)
      } else if (typeof response.error === 'string') {
        throw new Error(response.error)
      }
    }
    throw new Error(response.message || 'API request failed')
  }
  return response.data as T
}

export default apiClient
