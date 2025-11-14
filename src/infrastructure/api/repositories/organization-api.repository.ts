/**
 * Organization API Repository Implementation
 * Implements IOrganizationRepository using the API client
 */

import apiClient, { type ApiResponse } from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type { IOrganizationRepository } from '@/core/repositories/organization.repository'
import type {
  OrganizationListResponse,
  OrganizationListParams,
  OrganizationStats,
} from '@/core/entities/organization.entity'

/**
 * Organization repository implementation using API
 */
export class OrganizationApiRepository implements IOrganizationRepository {
  /**
   * Get paginated list of organizations
   */
  async list(params: OrganizationListParams): Promise<OrganizationListResponse> {
    const response = await apiClient.get<ApiResponse<OrganizationListResponse>>(
      API_ENDPOINTS.organizations.list,
      { params }
    )
    return response.data.data!
  }

  /**
   * Get organization statistics
   */
  async getStats(id: string): Promise<OrganizationStats> {
    const response = await apiClient.get<ApiResponse<OrganizationStats>>(
      API_ENDPOINTS.organizations.getStats(id)
    )
    return response.data.data!
  }
}

/**
 * Export singleton instance
 */
export const organizationRepository = new OrganizationApiRepository()
