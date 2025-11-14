/**
 * Staking Entity - Domain models for staking operations
 * Maps to backend domain/staking models
 */

/**
 * Staking pool status enumeration
 */
export enum PoolStatus {
  Active = 'active',
  Inactive = 'inactive',
  Full = 'full',
  Closed = 'closed',
}

/**
 * Staking position status enumeration
 */
export enum PositionStatus {
  Active = 'active',
  Unstaking = 'unstaking',
  Unstaked = 'unstaked',
  Locked = 'locked',
}

/**
 * StakingPool entity
 * Represents a staking pool
 */
export interface StakingPool {
  /** Unique identifier (UUID) */
  id: string

  /** Cryptocurrency (e.g., ETH, BTC) */
  currency: string

  /** Pool name */
  name: string

  /** Pool description */
  description?: string

  /** Annual Percentage Yield (APY) */
  apy: string

  /** Minimum stake amount */
  min_amount: string

  /** Maximum stake amount (optional) */
  max_amount?: string

  /** Lock period in days (optional) */
  lock_period_days?: number

  /** Pool status */
  status: PoolStatus

  /** Total amount staked in pool */
  total_staked: string

  /** Total number of stakers */
  total_stakers: number

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * StakingPosition entity
 * Represents a user's staking position
 */
export interface StakingPosition {
  /** Unique identifier (UUID) */
  id: string

  /** Wallet ID that owns this position */
  wallet_id: string

  /** Pool ID */
  pool_id: string

  /** Staked amount */
  amount: string

  /** Total rewards earned (lifetime) */
  rewards_earned: string

  /** Unclaimed rewards */
  unclaimed_rewards: string

  /** When position was created */
  staked_at: string

  /** When unstake was requested (if unstaking) */
  unstake_requested_at?: string

  /** When position unlocks (if locked) */
  unlocks_at?: string

  /** Position status */
  status: PositionStatus

  /** Whether rewards are auto-compounded */
  auto_compound: boolean

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string

  /** Pool details (when included) */
  pool?: StakingPool

  /** Rewards details (when included) */
  rewards?: StakingReward[]
}

/**
 * StakingReward entity
 * Represents earned rewards
 */
export interface StakingReward {
  /** Unique identifier (UUID) */
  id: string

  /** Position ID */
  position_id: string

  /** Reward amount */
  amount: string

  /** When reward was claimed */
  claimed_at?: string

  /** Whether reward was auto-compounded */
  auto_compounded: boolean

  /** Creation timestamp (when reward was earned) */
  created_at: string
}

/**
 * Paginated staking pool list response
 */
export interface StakingPoolListResponse {
  pools: StakingPool[]
  total: number
  limit: number
  offset: number
}

/**
 * Staking pool query parameters
 */
export interface StakingPoolListParams {
  offset?: number
  limit?: number
  currency?: string
  status?: PoolStatus
}

/**
 * Paginated staking position list response
 */
export interface StakingPositionListResponse {
  positions: StakingPosition[]
  total: number
  limit: number
  offset: number
}

/**
 * Staking position query parameters
 */
export interface StakingPositionListParams {
  offset?: number
  limit?: number
  wallet_id?: string
  pool_id?: string
  status?: PositionStatus
}

/**
 * Staking reward list response
 */
export interface StakingRewardListResponse {
  rewards: StakingReward[]
  total: number
  limit: number
  offset: number
}

/**
 * Staking reward query parameters
 */
export interface StakingRewardListParams {
  offset?: number
  limit?: number
  position_id?: string
  claimed?: boolean
}

/**
 * Create staking position request
 */
export interface CreateStakingPositionRequest {
  /** Pool ID to stake in */
  pool_id: string

  /** Amount to stake */
  amount: string

  /** Enable auto-compound */
  auto_compound?: boolean
}

/**
 * Unstake position request
 */
export interface UnstakePositionRequest {
  /** Position ID to unstake */
  position_id: string

  /** Amount to unstake (optional, defaults to full amount) */
  amount?: string
}

/**
 * Claim rewards request
 */
export interface ClaimRewardsRequest {
  /** Position ID to claim rewards from */
  position_id: string
}

/**
 * Staking statistics
 */
export interface StakingStatistics {
  /** Total value locked across all pools */
  total_value_locked: string

  /** Total active positions */
  total_positions: number

  /** Total rewards distributed */
  total_rewards_distributed: string

  /** Breakdown by currency */
  by_currency: StakingStatsByCurrency[]

  /** Generation timestamp */
  generated_at: string
}

/**
 * Staking statistics by currency
 */
export interface StakingStatsByCurrency {
  /** Currency */
  currency: string

  /** Total staked in this currency */
  total_staked: string

  /** Number of active positions */
  position_count: number

  /** Number of active pools */
  pool_count: number

  /** Average APY */
  average_apy: string
}
