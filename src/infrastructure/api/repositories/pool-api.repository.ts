/**
 * Pool Wallet API Repository Implementation
 * Implements IPoolWalletRepository using HTTP API
 */

import apiClient from '../client'
import { API_ENDPOINTS } from '../endpoints'
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

      const response = await apiClient.get<PooledWalletRelationshipListResponse>(
        API_ENDPOINTS.pool.list,
        { params }
      )

      console.log('✅ Pool relationships loaded:', {
        count: response.data.relationships.length,
        total: response.data.total,
      })

      return response.data
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

      const response = await apiClient.get<PoolWalletDetailsResponse>(
        API_ENDPOINTS.pool.getById(id)
      )

      console.log('✅ Pool wallet details loaded')

      return response.data
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

      const response = await apiClient.get<PooledWalletRelationship[]>(
        API_ENDPOINTS.pool.children(id)
      )

      console.log('✅ Pool children loaded:', response.data.length)

      return response.data
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

      const response = await apiClient.get<PoolPolicy[]>(
        API_ENDPOINTS.pool.policies(id)
      )

      console.log('✅ Pool policies loaded:', response.data.length)

      return response.data
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

      const response = await apiClient.get<PoolHierarchyNode>(
        API_ENDPOINTS.pool.hierarchy(id)
      )

      console.log('✅ Pool hierarchy loaded')

      return response.data
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

      const response = await apiClient.post<PooledWalletRelationship>(
        API_ENDPOINTS.pool.list,
        request
      )

      console.log('✅ Pool relationship created:', response.data.id)

      return response.data
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

      const response = await apiClient.put<PooledWalletRelationship>(
        API_ENDPOINTS.pool.getById(id),
        request
      )

      console.log('✅ Pool relationship updated:', response.data.id)

      return response.data
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

      const response = await apiClient.post<PoolPolicy>(
        API_ENDPOINTS.pool.policies(request.parent_wallet_id),
        request
      )

      console.log('✅ Pool policy created:', response.data.id)

      return response.data
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

      const response = await apiClient.get<InternalTransferListResponse>(
        API_ENDPOINTS.pool.transfers,
        { params }
      )

      console.log('✅ Internal transfers loaded:', {
        count: response.data.transfers.length,
        total: response.data.total,
      })

      return response.data
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

      const response = await apiClient.get<InternalTransfer>(
        API_ENDPOINTS.pool.transferById(id)
      )

      console.log('✅ Internal transfer loaded')

      return response.data
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

      const response = await apiClient.post<InternalTransfer>(
        API_ENDPOINTS.pool.transfers,
        request
      )

      console.log('✅ Internal transfer created:', response.data.id)

      return response.data
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

      const response = await apiClient.get<PoolStatistics>(
        API_ENDPOINTS.pool.statistics
      )

      console.log('✅ Pool statistics loaded')

      return response.data
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
