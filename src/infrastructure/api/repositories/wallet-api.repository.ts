/**
 * Wallet API Repository Implementation
 * Implements IWalletRepository using HTTP API
 */

import apiClient from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type {
  IWalletRepository,
  BalanceHistoryParams,
  WalletAnalyticsParams,
  WalletAnalytics,
} from '@/core/repositories/wallet.repository'
import type {
  Wallet,
  WalletListResponse,
  WalletListParams,
  WalletDetailsResponse,
  CreateWalletRequest,
  UpdateWalletRequest,
  WalletTransition,
  WalletAddress,
  WalletPolicy,
  BalanceHistoryPoint,
  WalletStatistics,
} from '@/core/entities/wallet.entity'

/**
 * Wallet API repository implementation
 */
export class WalletApiRepository implements IWalletRepository {
  /**
   * Get paginated list of wallets
   */
  async list(params: WalletListParams): Promise<WalletListResponse> {
    try {
      console.log('📋 Fetching wallets list:', params)

      const response = await apiClient.get<WalletListResponse>(
        API_ENDPOINTS.wallet.list,
        { params }
      )

      console.log('✅ Wallets loaded:', {
        count: response.data.wallets.length,
        total: response.data.total,
      })

      return response.data
    } catch (error) {
      console.error('❌ Error loading wallets:', error)
      throw error
    }
  }

  /**
   * Get detailed wallet information by ID
   */
  async getById(id: string): Promise<WalletDetailsResponse> {
    try {
      console.log('📋 Fetching wallet details:', id)

      const response = await apiClient.get<WalletDetailsResponse>(
        API_ENDPOINTS.wallet.getById(id)
      )

      console.log('✅ Wallet details loaded:', response.data.wallet.name)

      return response.data
    } catch (error) {
      console.error('❌ Error loading wallet details:', error)
      throw error
    }
  }

  /**
   * Create new wallet
   */
  async create(request: CreateWalletRequest): Promise<Wallet> {
    try {
      console.log('🔨 Creating wallet:', request)

      const response = await apiClient.post<Wallet>(
        API_ENDPOINTS.wallet.create,
        request
      )

      console.log('✅ Wallet created:', response.data.id)

      return response.data
    } catch (error) {
      console.error('❌ Error creating wallet:', error)
      throw error
    }
  }

  /**
   * Update wallet
   */
  async update(id: string, request: UpdateWalletRequest): Promise<Wallet> {
    try {
      console.log('🔄 Updating wallet:', { id, ...request })

      const response = await apiClient.put<Wallet>(
        API_ENDPOINTS.wallet.update(id),
        request
      )

      console.log('✅ Wallet updated:', response.data.id)

      return response.data
    } catch (error) {
      console.error('❌ Error updating wallet:', error)
      throw error
    }
  }

  /**
   * Delete wallet
   */
  async delete(id: string): Promise<void> {
    try {
      console.log('🗑️ Deleting wallet:', id)

      await apiClient.delete(API_ENDPOINTS.wallet.delete(id))

      console.log('✅ Wallet deleted:', id)
    } catch (error) {
      console.error('❌ Error deleting wallet:', error)
      throw error
    }
  }

  /**
   * Freeze wallet
   */
  async freeze(id: string): Promise<void> {
    try {
      console.log('🧊 Freezing wallet:', id)

      await apiClient.post(API_ENDPOINTS.wallet.freeze(id))

      console.log('✅ Wallet frozen:', id)
    } catch (error) {
      console.error('❌ Error freezing wallet:', error)
      throw error
    }
  }

  /**
   * Unfreeze wallet
   */
  async unfreeze(id: string): Promise<void> {
    try {
      console.log('🔥 Unfreezing wallet:', id)

      await apiClient.post(API_ENDPOINTS.wallet.unfreeze(id))

      console.log('✅ Wallet unfrozen:', id)
    } catch (error) {
      console.error('❌ Error unfreezing wallet:', error)
      throw error
    }
  }

  /**
   * Get wallet transitions
   */
  async getTransitions(id: string): Promise<WalletTransition[]> {
    try {
      console.log('📋 Fetching wallet transitions:', id)

      const response = await apiClient.get<WalletTransition[]>(
        API_ENDPOINTS.wallet.transitions(id)
      )

      console.log('✅ Transitions loaded:', response.data.length)

      return response.data
    } catch (error) {
      console.error('❌ Error loading transitions:', error)
      throw error
    }
  }

  /**
   * Get wallet addresses
   */
  async getAddresses(id: string): Promise<WalletAddress[]> {
    try {
      console.log('📋 Fetching wallet addresses:', id)

      const response = await apiClient.get<WalletAddress[]>(
        API_ENDPOINTS.wallet.addresses(id)
      )

      console.log('✅ Addresses loaded:', response.data.length)

      return response.data
    } catch (error) {
      console.error('❌ Error loading addresses:', error)
      throw error
    }
  }

  /**
   * Get wallet policies
   */
  async getPolicies(id: string): Promise<WalletPolicy[]> {
    try {
      console.log('📋 Fetching wallet policies:', id)

      const response = await apiClient.get<WalletPolicy[]>(
        API_ENDPOINTS.wallet.policies(id)
      )

      console.log('✅ Policies loaded:', response.data.length)

      return response.data
    } catch (error) {
      console.error('❌ Error loading policies:', error)
      throw error
    }
  }

  /**
   * Get balance history
   */
  async getBalanceHistory(
    id: string,
    params: BalanceHistoryParams
  ): Promise<BalanceHistoryPoint[]> {
    try {
      console.log('📊 Fetching balance history:', { id, ...params })

      const response = await apiClient.get<BalanceHistoryPoint[]>(
        API_ENDPOINTS.wallet.balanceHistory(id),
        { params }
      )

      console.log('✅ Balance history loaded:', response.data.length)

      return response.data
    } catch (error) {
      console.error('❌ Error loading balance history:', error)
      throw error
    }
  }

  /**
   * Get wallet analytics
   */
  async getAnalytics(params: WalletAnalyticsParams): Promise<WalletAnalytics> {
    try {
      console.log('📊 Fetching wallet analytics:', params)

      const response = await apiClient.get<WalletAnalytics>(
        API_ENDPOINTS.wallet.analytics,
        { params }
      )

      console.log('✅ Analytics loaded')

      return response.data
    } catch (error) {
      console.error('❌ Error loading analytics:', error)
      throw error
    }
  }

  /**
   * Get wallet statistics
   */
  async getStatistics(params: WalletListParams): Promise<WalletStatistics> {
    try {
      console.log('📊 Fetching wallet statistics:', params)

      const response = await apiClient.get<WalletStatistics>(
        API_ENDPOINTS.wallet.statistics,
        { params }
      )

      console.log('✅ Statistics loaded')

      return response.data
    } catch (error) {
      console.error('❌ Error loading statistics:', error)
      throw error
    }
  }
}

/**
 * Export singleton instance
 */
export const walletRepository = new WalletApiRepository()
