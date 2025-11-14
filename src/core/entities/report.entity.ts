/**
 * Report Entity - Domain models for various report types
 * Based on backend API documentation
 */

/**
 * Staking pool information
 */
export interface StakingPool {
  id: string
  currency: string
  name: string
  total_staked: string
  reward_rate: string
  status: string
  created_at: string
}

/**
 * Staking position information
 */
export interface StakingPosition {
  id: string
  wallet_id: string
  pool_id: string
  amount: string
  rewards_earned: string
  status: string
  staked_at: string
}

/**
 * Staking report response
 */
export interface StakingReportResponse {
  pools: StakingPool[]
  positions: StakingPosition[]
  total_staked: string
  total_rewards: string
  active_count: number
  generated_at: string
}

/**
 * Staking report request parameters
 */
export interface StakingReportRequest {
  wallet_id?: string
  pool_id?: string
}

/**
 * Governance proposal information
 */
export interface GovernanceProposal {
  id: string
  title: string
  description: string
  currency: string
  status: 'active' | 'passed' | 'rejected' | 'pending'
  votes_for: string
  votes_against: string
  created_at: string
  expires_at: string
}

/**
 * Governance report response
 */
export interface GovernanceReportResponse {
  proposals: GovernanceProposal[]
  total_count: number
  passed_count: number
  rejected_count: number
  active_count: number
  total_votes: string
  generated_at: string
}

/**
 * Governance report request parameters
 */
export interface GovernanceReportRequest {
  currency?: string
  status?: 'active' | 'passed' | 'rejected' | 'pending'
}
