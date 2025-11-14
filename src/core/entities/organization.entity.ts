/**
 * Organization Entity - Domain model for organization management
 * Based on backend API documentation
 */

/**
 * Organization entity - Core organization data model
 */
export interface Organization {
  id: string
  name: string
  email: string
  status: string
  created_at: string
}

/**
 * Organization statistics with detailed metrics
 */
export interface OrganizationStats {
  organization_id: string
  name: string
  wallet_count: number
  transaction_count: number
  staking_positions: number
  assets_under_custody: Record<string, string>
  created_at: string
}

/**
 * Paginated organization list response
 */
export interface OrganizationListResponse {
  organizations: Organization[]
  total: number
  limit: number
  offset: number
}

/**
 * Organization list query parameters
 */
export interface OrganizationListParams {
  offset?: number
  limit?: number
}
