/**
 * Staking API Repository Implementation
 * Implements staking operations using HTTP API
 */

import apiClient from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type {
  StakingPool,
  StakingPoolListResponse,
  StakingPoolListParams,
  StakingPosition,
  StakingPositionListResponse,
  StakingPositionListParams,
  StakingReward,
  StakingRewardListResponse,
  StakingRewardListParams,
  StakingStatistics,
} from '@/core/entities/staking.entity'

/**
 * Create pool request
 */
export interface CreateStakingPoolRequest {
  currency: string
  name: string
  description?: string
  apy: string
  min_amount: string
  max_amount?: string
  lock_period_days?: number
}

/**
 * Distribute rewards request
 */
export interface DistributeRewardsRequest {
  pool_id?: string
  position_id?: string
  amount?: string
}

/**
 * Staking analytics parameters
 */
export interface StakingAnalyticsParams {
  start_date?: string
  end_date?: string
  currency?: string
}

/**
 * Staking analytics response
 */
export interface StakingAnalytics extends StakingStatistics {
  tvl_history?: Array<{
    date: string
    total_value_locked: string
  }>
  pool_performance?: Array<{
    pool_id: string
    pool_name: string
    apy: string
    total_staked: string
    total_stakers: number
  }>
  rewards_breakdown?: Array<{
    pool_id: string
    pool_name: string
    total_rewards: string
    claimed_rewards: string
    unclaimed_rewards: string
  }>
}

/**
 * Staking API repository implementation
 */
export class StakingApiRepository {
  /**
   * Get paginated list of staking pools
   */
  async getPools(params: StakingPoolListParams): Promise<StakingPoolListResponse> {
    try {
      console.log('📋 Fetching staking pools:', params)

      const response = await apiClient.get<StakingPoolListResponse>(
        API_ENDPOINTS.staking.pools,
        { params }
      )

      console.log('✅ Staking pools loaded:', {
        count: response.data.pools.length,
        total: response.data.total,
      })

      return response.data
    } catch (error) {
      console.error('❌ Error loading staking pools:', error)
      throw error
    }
  }

  /**
   * Get staking pool by ID
   */
  async getPoolById(id: string): Promise<StakingPool> {
    try {
      console.log('📋 Fetching staking pool details:', id)

      const response = await apiClient.get<StakingPool>(
        API_ENDPOINTS.staking.poolById(id)
      )

      console.log('✅ Staking pool details loaded:', response.data.name)

      return response.data
    } catch (error) {
      console.error('❌ Error loading staking pool details:', error)
      throw error
    }
  }

  /**
   * Create new staking pool
   */
  async createPool(request: CreateStakingPoolRequest): Promise<StakingPool> {
    try {
      console.log('🔨 Creating staking pool:', request)

      const response = await apiClient.post<StakingPool>(
        API_ENDPOINTS.staking.createPool,
        request
      )

      console.log('✅ Staking pool created:', response.data.id)

      return response.data
    } catch (error) {
      console.error('❌ Error creating staking pool:', error)
      throw error
    }
  }

  /**
   * Get paginated list of staking positions
   */
  async getPositions(params: StakingPositionListParams): Promise<StakingPositionListResponse> {
    try {
      console.log('📋 Fetching staking positions:', params)

      const response = await apiClient.get<StakingPositionListResponse>(
        API_ENDPOINTS.staking.positions,
        { params }
      )

      console.log('✅ Staking positions loaded:', {
        count: response.data.positions.length,
        total: response.data.total,
      })

      return response.data
    } catch (error) {
      console.error('❌ Error loading staking positions:', error)
      throw error
    }
  }

  /**
   * Get staking position by ID
   */
  async getPositionById(id: string): Promise<StakingPosition> {
    try {
      console.log('📋 Fetching staking position details:', id)

      const response = await apiClient.get<StakingPosition>(
        API_ENDPOINTS.staking.positionById(id)
      )

      console.log('✅ Staking position details loaded')

      return response.data
    } catch (error) {
      console.error('❌ Error loading staking position details:', error)
      throw error
    }
  }

  /**
   * Get paginated list of staking rewards
   */
  async getRewards(params: StakingRewardListParams): Promise<StakingRewardListResponse> {
    try {
      console.log('📋 Fetching staking rewards:', params)

      const response = await apiClient.get<StakingRewardListResponse>(
        API_ENDPOINTS.staking.rewards,
        { params }
      )

      console.log('✅ Staking rewards loaded:', {
        count: response.data.rewards.length,
        total: response.data.total,
      })

      return response.data
    } catch (error) {
      console.error('❌ Error loading staking rewards:', error)
      throw error
    }
  }

  /**
   * Distribute rewards to stakers
   */
  async distributeRewards(request: DistributeRewardsRequest): Promise<void> {
    try {
      console.log('💰 Distributing rewards:', request)

      await apiClient.post(
        API_ENDPOINTS.staking.distributeRewards,
        request
      )

      console.log('✅ Rewards distributed successfully')
    } catch (error) {
      console.error('❌ Error distributing rewards:', error)
      throw error
    }
  }

  /**
   * Get staking analytics
   */
  async getAnalytics(params: StakingAnalyticsParams): Promise<StakingAnalytics> {
    try {
      console.log('📊 Fetching staking analytics:', params)

      const response = await apiClient.get<StakingAnalytics>(
        API_ENDPOINTS.staking.analytics,
        { params }
      )

      console.log('✅ Staking analytics loaded')

      return response.data
    } catch (error) {
      console.error('❌ Error loading staking analytics:', error)
      throw error
    }
  }
}

/**
 * Export singleton instance
 */
export const stakingRepository = new StakingApiRepository()
