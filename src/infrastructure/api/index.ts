/**
 * Infrastructure API Layer - Central Export
 * Exports all API-related functionality
 */

// Export API client
export { default as apiClient } from './client'
export type { ApiResponse, ApiError } from './client'

// Export API endpoints
export { API_ENDPOINTS } from './endpoints'

// Export all repository instances
export {
  userRepository,
  organizationRepository,
  reportRepository,
  analyticsRepository,
  auditLogRepository,
} from './repositories'
