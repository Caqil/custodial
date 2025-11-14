/**
 * Organization Repository Interface
 * Defines the contract for organization data operations
 */

import type {
  OrganizationListResponse,
  OrganizationListParams,
  OrganizationStats,
} from '../entities/organization.entity'

/**
 * Interface for organization repository operations
 */
export interface IOrganizationRepository {
  /**
   * Get paginated list of organizations
   * @param params - Pagination parameters (offset, limit)
   * @returns Promise resolving to paginated organization list
   */
  list(params: OrganizationListParams): Promise<OrganizationListResponse>

  /**
   * Get organization statistics
   * @param id - Organization UUID
   * @returns Promise resolving to organization statistics
   */
  getStats(id: string): Promise<OrganizationStats>
}
