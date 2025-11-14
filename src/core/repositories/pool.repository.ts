/**
 * Pool Wallet Repository Interface
 * Defines the contract for pool wallet data operations
 */

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
} from '../entities/pool.entity'

/**
 * Pool wallet details response
 */
export interface PoolWalletDetailsResponse {
  relationship: PooledWalletRelationship
  children: PooledWalletRelationship[]
  policies: PoolPolicy[]
  recent_transfers: InternalTransfer[]
}

/**
 * Interface for pool wallet repository operations
 */
export interface IPoolWalletRepository {
  /**
   * Get paginated list of pool wallet relationships
   * @param params - Query parameters
   * @returns Promise resolving to paginated relationships list
   */
  listRelationships(params: PooledWalletRelationshipListParams): Promise<PooledWalletRelationshipListResponse>

  /**
   * Get pool wallet details by ID
   * @param id - Parent wallet UUID
   * @returns Promise resolving to pool wallet details
   */
  getById(id: string): Promise<PoolWalletDetailsResponse>

  /**
   * Get children wallets for a pool parent
   * @param id - Parent wallet UUID
   * @returns Promise resolving to children relationships
   */
  getChildren(id: string): Promise<PooledWalletRelationship[]>

  /**
   * Get policies for a pool wallet
   * @param id - Parent wallet UUID
   * @returns Promise resolving to policies list
   */
  getPolicies(id: string): Promise<PoolPolicy[]>

  /**
   * Get pool wallet hierarchy
   * @param id - Parent wallet UUID
   * @returns Promise resolving to hierarchy tree
   */
  getHierarchy(id: string): Promise<PoolHierarchyNode>

  /**
   * Create pool wallet relationship
   * @param request - Create relationship request
   * @returns Promise resolving to created relationship
   */
  createRelationship(request: CreatePooledWalletRelationshipRequest): Promise<PooledWalletRelationship>

  /**
   * Update pool wallet relationship
   * @param id - Relationship UUID
   * @param request - Update relationship request
   * @returns Promise resolving to updated relationship
   */
  updateRelationship(id: string, request: UpdatePooledWalletRelationshipRequest): Promise<PooledWalletRelationship>

  /**
   * Create pool policy
   * @param request - Create policy request
   * @returns Promise resolving to created policy
   */
  createPolicy(request: CreatePoolPolicyRequest): Promise<PoolPolicy>

  /**
   * Get internal transfers
   * @param params - Query parameters
   * @returns Promise resolving to transfers list
   */
  getTransfers(params: InternalTransferListParams): Promise<InternalTransferListResponse>

  /**
   * Get internal transfer by ID
   * @param id - Transfer UUID
   * @returns Promise resolving to transfer details
   */
  getTransferById(id: string): Promise<InternalTransfer>

  /**
   * Create internal transfer
   * @param request - Create transfer request
   * @returns Promise resolving to created transfer
   */
  createTransfer(request: CreateInternalTransferRequest): Promise<InternalTransfer>

  /**
   * Get pool statistics
   * @returns Promise resolving to pool statistics
   */
  getStatistics(): Promise<PoolStatistics>
}
