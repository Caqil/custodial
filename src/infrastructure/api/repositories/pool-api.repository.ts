/**
 * Pool Wallet API Repository Implementation
 * Implements IPoolWalletRepository using HTTP API
 */

import apiClient from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type { ApiResponse } from '../types'
import type {
  IPoolWalletRepository,
  PoolWalletDetailsResponse,
} from '@/core/repositories/pool.repository'
import type {
  PooledWalletRelationship,
  PooledWalletRelationshipListResponse,
  PooledWalletRelationshipListParams,
  PoolPolicy,
  PoolPolicyListResponse,
  PoolPolicyListParams,
  InternalTransfer,
  InternalTransferListResponse,
  InternalTransferListParams,
  CreatePooledWalletRelationshipRequest,
  UpdatePooledWalletRelationshipRequest,
  CreatePoolPolicyRequest,
  CreateInternalTransferRequest,
  PoolHierarchyNode,
  PoolStatistics,
} from '@/core/entities/pool.entity'

/**
 * Pool Wallet API repository implementation
 */
export class PoolWalletApiRepository implements IPoolWalletRepository {
  /**
   * Get paginated list of pool wallet relationships
   */
  async listRelationships(
    params: PooledWalletRelationshipListParams
  ): Promise<PooledWalletRelationshipListResponse> {
    try {
      console.log('📋 Fetching pool relationships:', params)

      const response = await apiClient.get<ApiResponse<PooledWalletRelationshipListResponse>>(
        API_ENDPOINTS.pool.list,
        { params }
      )

      const data = response.data.data!
      console.log('✅ Pool relationships loaded:', {
        count: data.relationships.length,
        total: data.total,
      })

      return data
    } catch (error) {
      console.error('❌ Error loading pool relationships:', error)
      throw error
    }
  }

  /**
   * Get pool wallet details by ID
   */
  async getById(id: string): Promise<PoolWalletDetailsResponse> {
    try {
      console.log('📋 Fetching pool wallet details:', id)

      const response = await apiClient.get<ApiResponse<PoolWalletDetailsResponse>>(
        API_ENDPOINTS.pool.getById(id)
      )

      const data = response.data.data!
      console.log('✅ Pool wallet details loaded')

      return data
    } catch (error) {
      console.error('❌ Error loading pool wallet details:', error)
      throw error
    }
  }

  /**
   * Get children wallets for a pool parent
   */
  async getChildren(id: string): Promise<PooledWalletRelationship[]> {
    try {
      console.log('📋 Fetching pool children:', id)

      const response = await apiClient.get<ApiResponse<PooledWalletRelationship[]>>(
        API_ENDPOINTS.pool.children(id)
      )

      const data = response.data.data!
      console.log('✅ Pool children loaded:', data.length)

      return data
    } catch (error) {
      console.error('❌ Error loading pool children:', error)
      throw error
    }
  }

  /**
   * Get policies for a pool wallet
   */
  async getPolicies(id: string): Promise<PoolPolicy[]> {
    try {
      console.log('📋 Fetching pool policies:', id)

      const response = await apiClient.get<ApiResponse<PoolPolicy[]>>(
        API_ENDPOINTS.pool.policies(id)
      )

      const data = response.data.data!
      console.log('✅ Pool policies loaded:', data.length)

      return data
    } catch (error) {
      console.error('❌ Error loading pool policies:', error)
      throw error
    }
  }

  /**
   * Get pool wallet hierarchy
   */
  async getHierarchy(id: string): Promise<PoolHierarchyNode> {
    try {
      console.log('📋 Fetching pool hierarchy:', id)

      const response = await apiClient.get<ApiResponse<PoolHierarchyNode>>(
        API_ENDPOINTS.pool.hierarchy(id)
      )

      const data = response.data.data!
      console.log('✅ Pool hierarchy loaded')

      return data
    } catch (error) {
      console.error('❌ Error loading pool hierarchy:', error)
      throw error
    }
  }

  /**
   * Create pool wallet relationship
   */
  async createRelationship(
    request: CreatePooledWalletRelationshipRequest
  ): Promise<PooledWalletRelationship> {
    try {
      console.log('🔨 Creating pool relationship:', request)

      const response = await apiClient.post<ApiResponse<PooledWalletRelationship>>(
        API_ENDPOINTS.pool.list,
        request
      )

      const data = response.data.data!
      console.log('✅ Pool relationship created:', data.id)

      return data
    } catch (error) {
      console.error('❌ Error creating pool relationship:', error)
      throw error
    }
  }

  /**
   * Update pool wallet relationship
   */
  async updateRelationship(
    id: string,
    request: UpdatePooledWalletRelationshipRequest
  ): Promise<PooledWalletRelationship> {
    try {
      console.log('🔄 Updating pool relationship:', { id, ...request })

      const response = await apiClient.put<ApiResponse<PooledWalletRelationship>>(
        API_ENDPOINTS.pool.getById(id),
        request
      )

      const data = response.data.data!
      console.log('✅ Pool relationship updated:', data.id)

      return data
    } catch (error) {
      console.error('❌ Error updating pool relationship:', error)
      throw error
    }
  }

  /**
   * Create pool policy
   */
  async createPolicy(request: CreatePoolPolicyRequest): Promise<PoolPolicy> {
    try {
      console.log('🔨 Creating pool policy:', request)

      const response = await apiClient.post<ApiResponse<PoolPolicy>>(
        API_ENDPOINTS.pool.policies(request.parent_wallet_id),
        request
      )

      const data = response.data.data!
      console.log('✅ Pool policy created:', data.id)

      return data
    } catch (error) {
      console.error('❌ Error creating pool policy:', error)
      throw error
    }
  }

  /**
   * Get internal transfers
   */
  async getTransfers(
    params: InternalTransferListParams
  ): Promise<InternalTransferListResponse> {
    try {
      console.log('📋 Fetching internal transfers:', params)

      const response = await apiClient.get<ApiResponse<InternalTransferListResponse>>(
        API_ENDPOINTS.pool.transfers,
        { params }
      )

      const data = response.data.data!
      console.log('✅ Internal transfers loaded:', {
        count: data.transfers.length,
        total: data.total,
      })

      return data
    } catch (error) {
      console.error('❌ Error loading internal transfers:', error)
      throw error
    }
  }

  /**
   * Get internal transfer by ID
   */
  async getTransferById(id: string): Promise<InternalTransfer> {
    try {
      console.log('📋 Fetching internal transfer:', id)

      const response = await apiClient.get<ApiResponse<InternalTransfer>>(
        API_ENDPOINTS.pool.transferById(id)
      )

      const data = response.data.data!
      console.log('✅ Internal transfer loaded')

      return data
    } catch (error) {
      console.error('❌ Error loading internal transfer:', error)
      throw error
    }
  }

  /**
   * Create internal transfer
   */
  async createTransfer(request: CreateInternalTransferRequest): Promise<InternalTransfer> {
    try {
      console.log('🔨 Creating internal transfer:', request)

      const response = await apiClient.post<ApiResponse<InternalTransfer>>(
        API_ENDPOINTS.pool.transfers,
        request
      )

      const data = response.data.data!
      console.log('✅ Internal transfer created:', data.id)

      return data
    } catch (error) {
      console.error('❌ Error creating internal transfer:', error)
      throw error
    }
  }

  /**
   * Get pool statistics
   */
  async getStatistics(): Promise<PoolStatistics> {
    try {
      console.log('📊 Fetching pool statistics')

      const response = await apiClient.get<ApiResponse<PoolStatistics>>(
        API_ENDPOINTS.pool.statistics
      )

      const data = response.data.data!
      console.log('✅ Pool statistics loaded')

      return data
    } catch (error) {
      console.error('❌ Error loading pool statistics:', error)
      throw error
    }
  }
}

/**
 * Export singleton instance
 */
export const poolWalletRepository = new PoolWalletApiRepository()
