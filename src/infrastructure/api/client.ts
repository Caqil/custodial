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
}

/**
 * API error response
 */
export interface ApiError {
  error: string
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
  (error: AxiosError<ApiError>) => {
    // Handle specific error status codes
    if (error.response) {
      const { status } = error.response

      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect handled by QueryCache in main.tsx
          console.error('Unauthorized access - token may be expired')
          break

        case 403:
          // Forbidden - user doesn't have admin role
          console.error('Forbidden - admin role required')
          break

        case 404:
          // Not found
          console.error('Resource not found')
          break

        case 429:
          // Rate limit exceeded
          console.error('Rate limit exceeded - please try again later')
          break

        case 500:
          // Internal server error
          console.error('Internal server error')
          break

        default:
          console.error(`API error: ${status}`)
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
    throw new Error(response.message || 'API request failed')
  }
  return response.data as T
}

export default apiClient
