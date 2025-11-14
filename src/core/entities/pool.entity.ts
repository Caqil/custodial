/**
 * Pool Entity - Domain models for pooled wallet operations
 * Maps to backend domain/wallet pooled_wallet.go models
 */

/**
 * Wallet pool type enumeration
 */
export enum PoolType {
  Operational = 'operational',
  Custodial = 'custodial',
  Staking = 'staking',
  Treasury = 'treasury',
}

/**
 * Wallet relationship type enumeration
 */
export enum RelationType {
  SubWallet = 'sub_wallet',
  Derivative = 'derivative',
  Operational = 'operational',
  Safekeeping = 'safekeeping',
}

/**
 * Relationship status enumeration
 */
export enum RelationStatus {
  Active = 'active',
  Inactive = 'inactive',
  Archived = 'archived',
  Suspended = 'suspended',
}

/**
 * Permission level enumeration
 */
export enum PermissionLevel {
  Full = 'full',
  Limited = 'limited',
  ReadOnly = 'read_only',
}

/**
 * Pool policy type enumeration
 */
export enum PoolPolicyType {
  DailyLimit = 'daily_limit',
  PerTxLimit = 'per_tx_limit',
  ApprovalRequired = 'approval_required',
  AddressWhitelist = 'address_whitelist',
  RiskThreshold = 'risk_threshold',
}

/**
 * Policy scope enumeration
 */
export enum PolicyScope {
  ParentOnly = 'parent_only',
  ChildrenOnly = 'children_only',
  Both = 'both',
}

/**
 * Transfer reason enumeration
 */
export enum TransferReason {
  Rebalance = 'rebalance',
  Consolidation = 'consolidation',
  Distribution = 'distribution',
  Settlement = 'settlement',
  Collateral = 'collateral',
}

/**
 * Internal transfer status enumeration
 */
export enum InternalTxStatus {
  Pending = 'pending',
  Processing = 'processing',
  Completed = 'completed',
  Failed = 'failed',
  Cancelled = 'cancelled',
}

/**
 * PooledWalletRelationship entity
 * Represents parent-child wallet hierarchy
 */
export interface PooledWalletRelationship {
  /** Unique identifier (UUID) */
  id: string

  /** Parent wallet ID */
  parent_wallet_id: string

  /** Child wallet ID */
  child_wallet_id: string

  /** Relationship type */
  relation_type: RelationType

  /** Relationship description */
  description?: string

  /** Relationship status */
  status: RelationStatus

  /** Permission level for child wallet */
  permission_level: PermissionLevel

  /** User who created this relationship */
  created_by: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string

  /** When relationship was archived */
  archived_at?: string

  /** Parent wallet details (when included) */
  parent_wallet?: {
    id: string
    name: string
    type: string
    currency: string
  }

  /** Child wallet details (when included) */
  child_wallet?: {
    id: string
    name: string
    type: string
    currency: string
  }

  /** Associated policies (when included) */
  policies?: PoolPolicy[]
}

/**
 * PoolPolicy entity
 * Defines pool-level policies that can override child policies
 */
export interface PoolPolicy {
  /** Unique identifier (UUID) */
  id: string

  /** Relationship ID (optional, if policy applies to specific relationship) */
  relationship_id?: string

  /** Parent wallet ID */
  parent_wallet_id: string

  /** Policy type */
  policy_type: PoolPolicyType

  /** Daily limit amount */
  daily_limit?: string

  /** Maximum per transaction amount */
  max_per_tx?: string

  /** Minimum approvers required */
  min_approvers?: number

  /** Who this policy applies to */
  applies_to: PolicyScope

  /** Whether policy is actively enforced */
  is_enforced: boolean

  /** Policy priority (higher = more important) */
  priority: number

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * InternalTransfer entity
 * Represents fund movement between related wallets
 */
export interface InternalTransfer {
  /** Unique identifier (UUID) */
  id: string

  /** Source wallet ID */
  source_wallet_id: string

  /** Destination wallet ID */
  dest_wallet_id: string

  /** Relationship ID (if transfer is between related wallets) */
  relationship_id?: string

  /** Transfer amount */
  amount: string

  /** Currency */
  currency: string

  /** Transfer reason */
  reason: TransferReason

  /** Transfer status */
  status: InternalTxStatus

  /** External transaction hash (if on-chain) */
  external_tx_hash?: string

  /** Transfer description */
  description?: string

  /** User who initiated transfer */
  initiated_by: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string

  /** When transfer completed */
  completed_at?: string

  /** Source wallet details (when included) */
  source_wallet?: {
    id: string
    name: string
    type: string
    currency: string
  }

  /** Destination wallet details (when included) */
  dest_wallet?: {
    id: string
    name: string
    type: string
    currency: string
  }
}

/**
 * Paginated pooled wallet relationship list response
 */
export interface PooledWalletRelationshipListResponse {
  relationships: PooledWalletRelationship[]
  total: number
  limit: number
  offset: number
}

/**
 * Pooled wallet relationship query parameters
 */
export interface PooledWalletRelationshipListParams {
  offset?: number
  limit?: number
  parent_wallet_id?: string
  child_wallet_id?: string
  relation_type?: RelationType
  status?: RelationStatus
}

/**
 * Pool policy list response
 */
export interface PoolPolicyListResponse {
  policies: PoolPolicy[]
  total: number
  limit: number
  offset: number
}

/**
 * Pool policy query parameters
 */
export interface PoolPolicyListParams {
  offset?: number
  limit?: number
  parent_wallet_id?: string
  relationship_id?: string
  policy_type?: PoolPolicyType
  is_enforced?: boolean
}

/**
 * Internal transfer list response
 */
export interface InternalTransferListResponse {
  transfers: InternalTransfer[]
  total: number
  limit: number
  offset: number
}

/**
 * Internal transfer query parameters
 */
export interface InternalTransferListParams {
  offset?: number
  limit?: number
  source_wallet_id?: string
  dest_wallet_id?: string
  relationship_id?: string
  status?: InternalTxStatus
  reason?: TransferReason
  start_date?: string
  end_date?: string
}

/**
 * Create pooled wallet relationship request
 */
export interface CreatePooledWalletRelationshipRequest {
  /** Parent wallet ID */
  parent_wallet_id: string

  /** Child wallet ID */
  child_wallet_id: string

  /** Relationship type */
  relation_type: RelationType

  /** Description */
  description?: string

  /** Permission level */
  permission_level: PermissionLevel
}

/**
 * Update pooled wallet relationship request
 */
export interface UpdatePooledWalletRelationshipRequest {
  /** Relationship status */
  status?: RelationStatus

  /** Permission level */
  permission_level?: PermissionLevel

  /** Description */
  description?: string
}

/**
 * Create pool policy request
 */
export interface CreatePoolPolicyRequest {
  /** Parent wallet ID */
  parent_wallet_id: string

  /** Relationship ID (optional) */
  relationship_id?: string

  /** Policy type */
  policy_type: PoolPolicyType

  /** Daily limit */
  daily_limit?: string

  /** Max per transaction */
  max_per_tx?: string

  /** Minimum approvers */
  min_approvers?: number

  /** Who policy applies to */
  applies_to: PolicyScope

  /** Priority */
  priority?: number
}

/**
 * Create internal transfer request
 */
export interface CreateInternalTransferRequest {
  /** Source wallet ID */
  source_wallet_id: string

  /** Destination wallet ID */
  dest_wallet_id: string

  /** Amount to transfer */
  amount: string

  /** Currency */
  currency: string

  /** Transfer reason */
  reason: TransferReason

  /** Description */
  description?: string
}

/**
 * Pool hierarchy tree node
 */
export interface PoolHierarchyNode {
  /** Wallet ID */
  wallet_id: string

  /** Wallet name */
  wallet_name: string

  /** Wallet type */
  wallet_type: string

  /** Currency */
  currency: string

  /** Balance */
  balance: string

  /** Is pool parent */
  is_pool_parent: boolean

  /** Pool type (if parent) */
  pool_type?: PoolType

  /** Child wallets */
  children: PoolHierarchyNode[]

  /** Relationship ID (if child) */
  relationship_id?: string

  /** Permission level (if child) */
  permission_level?: PermissionLevel
}

/**
 * Pool statistics
 */
export interface PoolStatistics {
  /** Total number of pool parents */
  total_pools: number

  /** Total child wallets */
  total_children: number

  /** Total internal transfers */
  total_internal_transfers: number

  /** Total transfer volume */
  total_transfer_volume: string

  /** Breakdown by pool type */
  by_pool_type: PoolStatsByType[]

  /** Generation timestamp */
  generated_at: string
}

/**
 * Pool statistics by type
 */
export interface PoolStatsByType {
  /** Pool type */
  pool_type: PoolType

  /** Number of pools */
  pool_count: number

  /** Number of child wallets */
  child_count: number

  /** Total assets */
  total_assets: Record<string, string>
}
