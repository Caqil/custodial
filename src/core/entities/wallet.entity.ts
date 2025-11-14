/**
 * Wallet Entity - Domain model for wallet management
 * Maps to backend domain/wallet models
 */

/**
 * Wallet type enumeration
 */
export enum WalletType {
  Hot = 'hot',
  Warm = 'warm',
  Cold = 'cold',
}

/**
 * Wallet status enumeration
 */
export enum WalletStatus {
  Active = 'active',
  Inactive = 'inactive',
  Frozen = 'frozen',
  Migrating = 'migrating',
}

/**
 * Address type enumeration
 */
export enum AddressType {
  Deposit = 'deposit',
  Change = 'change',
  Cold = 'cold',
  Hot = 'hot',
}

/**
 * Wallet transition status enumeration
 */
export enum TransitionStatus {
  Pending = 'pending',
  Approved = 'approved',
  Completed = 'completed',
  Rejected = 'rejected',
}

/**
 * Wallet entity - Core wallet data model
 */
export interface Wallet {
  /** Unique identifier (UUID) */
  id: string

  /** Organization ID that owns this wallet */
  organization_id: string

  /** Wallet name */
  name: string

  /** Wallet type (hot, warm, cold) */
  type: WalletType

  /** Cryptocurrency (e.g., BTC, ETH, USDT) */
  currency: string

  /** Current balance */
  balance: string

  /** Locked balance (in pending transactions) */
  locked_balance: string

  /** Wallet status */
  status: WalletStatus

  /** Maximum daily transaction limit */
  max_daily_limit?: string

  /** Current daily usage amount */
  current_daily_usage: string

  /** Last time daily usage was reset */
  last_reset_at: string

  /** Parent wallet ID (if this is a child in a pool) */
  parent_wallet_id?: string

  /** Whether this is a parent pool wallet */
  is_pool_parent: boolean

  /** Pool type (if this is a pool parent) */
  pool_type?: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string

  /** Addresses associated with this wallet (when included) */
  addresses?: WalletAddress[]

  /** Policies associated with this wallet (when included) */
  policies?: WalletPolicy[]

  /** Transitions for this wallet (when included) */
  transitions?: WalletTransition[]

  /** Pool relationships (when included) */
  pool_relationships?: any[]

  /** Pool policies (when included) */
  pool_policies?: any[]
}

/**
 * WalletAddress entity
 * Represents a blockchain address associated with a wallet
 */
export interface WalletAddress {
  /** Unique identifier (UUID) */
  id: string

  /** Wallet ID */
  wallet_id: string

  /** Blockchain address */
  address: string

  /** Address type */
  address_type: AddressType

  /** HD derivation path */
  derivation_path?: string

  /** Whether address is active */
  is_active: boolean

  /** Last time address was used */
  last_used_at?: string

  /** Creation timestamp */
  created_at: string
}

/**
 * WalletPolicy entity
 * Represents wallet approval and limit policies
 */
export interface WalletPolicy {
  /** Unique identifier (UUID) */
  id: string

  /** Wallet ID */
  wallet_id: string

  /** Minimum number of approvers required */
  min_approvers: number

  /** Maximum daily transaction limit */
  max_daily_limit?: string

  /** Maximum single transaction amount */
  max_single_tx?: string

  /** Allowed destination addresses (whitelist) */
  allowed_addresses?: string[]

  /** Cooldown period in seconds */
  cooldown_period?: number

  /** Whether MFA is required */
  requires_mfa: boolean

  /** IP whitelist */
  ip_whitelist?: string[]

  /** Time restrictions (JSON format) */
  time_restrictions?: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * WalletTransition entity
 * Represents wallet type migrations (e.g., hot to warm)
 */
export interface WalletTransition {
  /** Unique identifier (UUID) */
  id: string

  /** Wallet ID */
  wallet_id: string

  /** Original wallet type */
  from_type: WalletType

  /** Target wallet type */
  to_type: WalletType

  /** Reason for transition */
  reason?: string

  /** User who initiated the transition */
  initiated_by: string

  /** Users who approved the transition */
  approved_by?: string[]

  /** Transition status */
  status: TransitionStatus

  /** When transition was completed */
  completed_at?: string

  /** Creation timestamp */
  created_at: string
}

/**
 * Balance summary by currency
 */
export interface BalanceSummary {
  /** Currency */
  currency: string

  /** Total balance across all wallets */
  total_balance: string

  /** Total locked balance */
  locked_balance: string

  /** Available balance (total - locked) */
  available_balance: string

  /** Number of wallets */
  wallet_count: number
}

/**
 * Paginated wallet list response
 */
export interface WalletListResponse {
  wallets: Wallet[]
  total: number
  limit: number
  offset: number
}

/**
 * Wallet list query parameters
 */
export interface WalletListParams {
  offset?: number
  limit?: number
  organization_id?: string
  type?: WalletType
  currency?: string
  status?: WalletStatus
  is_pool_parent?: boolean
  parent_wallet_id?: string
}

/**
 * Wallet details response with extended information
 */
export interface WalletDetailsResponse {
  wallet: Wallet
  addresses: WalletAddress[]
  policies: WalletPolicy[]
  recent_transactions?: any[]
  balance_history?: BalanceHistoryPoint[]
}

/**
 * Balance history data point
 */
export interface BalanceHistoryPoint {
  /** Timestamp */
  timestamp: string

  /** Balance at this time */
  balance: string

  /** Locked balance at this time */
  locked_balance: string
}

/**
 * Balance report response
 */
export interface BalanceReportResponse {
  balances: BalanceSummary[]
  wallets?: Wallet[]
  generated_at: string
}

/**
 * Balance report request parameters
 */
export interface BalanceReportRequest {
  organization_id?: string
  currency?: string
  wallet_type?: WalletType
}

/**
 * Create wallet request
 */
export interface CreateWalletRequest {
  /** Organization ID */
  organization_id: string

  /** Wallet name */
  name: string

  /** Wallet type */
  type: WalletType

  /** Currency */
  currency: string

  /** Maximum daily limit (optional) */
  max_daily_limit?: string

  /** Whether this is a pool parent */
  is_pool_parent?: boolean

  /** Pool type (if pool parent) */
  pool_type?: string

  /** Parent wallet ID (if child wallet) */
  parent_wallet_id?: string
}

/**
 * Update wallet request
 */
export interface UpdateWalletRequest {
  /** Wallet name */
  name?: string

  /** Wallet status */
  status?: WalletStatus

  /** Maximum daily limit */
  max_daily_limit?: string
}

/**
 * Create wallet address request
 */
export interface CreateWalletAddressRequest {
  /** Wallet ID */
  wallet_id: string

  /** Address type */
  address_type: AddressType
}

/**
 * Create wallet policy request
 */
export interface CreateWalletPolicyRequest {
  /** Wallet ID */
  wallet_id: string

  /** Minimum approvers */
  min_approvers: number

  /** Maximum daily limit */
  max_daily_limit?: string

  /** Maximum single transaction */
  max_single_tx?: string

  /** Allowed addresses */
  allowed_addresses?: string[]

  /** Cooldown period (seconds) */
  cooldown_period?: number

  /** Requires MFA */
  requires_mfa?: boolean

  /** IP whitelist */
  ip_whitelist?: string[]
}

/**
 * Create wallet transition request
 */
export interface CreateWalletTransitionRequest {
  /** Wallet ID */
  wallet_id: string

  /** Target wallet type */
  to_type: WalletType

  /** Reason for transition */
  reason?: string
}

/**
 * Wallet statistics
 */
export interface WalletStatistics {
  /** Total wallets */
  total_wallets: number

  /** Active wallets */
  active_wallets: number

  /** Total balance by currency */
  total_balances: Record<string, string>

  /** Breakdown by type */
  by_type: WalletStatsByType[]

  /** Generation timestamp */
  generated_at: string
}

/**
 * Wallet statistics by type
 */
export interface WalletStatsByType {
  /** Wallet type */
  type: WalletType

  /** Number of wallets */
  count: number

  /** Total balance by currency */
  balances: Record<string, string>
}
