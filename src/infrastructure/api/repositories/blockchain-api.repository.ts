/**
 * Blockchain API Repository Implementation
 * Handles blockchain network monitoring and transaction tracking
 */

import apiClient from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type {
  NetworkStatus,
  DepositDetection,
  DepositDetectionListResponse,
  DepositDetectionListParams,
  WithdrawalBroadcast,
  WithdrawalBroadcastListResponse,
  WithdrawalBroadcastListParams,
  AddressBalance,
} from '@/core/entities/blockchain.entity'

/**
 * Address list response
 */
export interface AddressListResponse {
  addresses: AddressBalance[]
  total: number
  limit: number
  offset: number
}

/**
 * Address list query parameters
 */
export interface AddressListParams {
  offset?: number
  limit?: number
  wallet_id?: string
  chain?: string
  address?: string
}

/**
 * Blockchain API repository
 */
export class BlockchainApiRepository {
  /**
   * Get all network status
   */
  async getNetworks(): Promise<NetworkStatus[]> {
    try {
      console.log('📡 Fetching all network status')

      const response = await apiClient.get<NetworkStatus[]>(
        API_ENDPOINTS.blockchain.networks
      )

      console.log('✅ Network status loaded:', response.data.length)

      return response.data
    } catch (error) {
      console.error('❌ Error loading network status:', error)
      throw error
    }
  }

  /**
   * Get deposit list with filters
   */
  async getDeposits(
    params: DepositDetectionListParams
  ): Promise<DepositDetectionListResponse> {
    try {
      console.log('📥 Fetching deposits:', params)

      const response = await apiClient.get<DepositDetectionListResponse>(
        API_ENDPOINTS.blockchain.deposits,
        { params }
      )

      console.log('✅ Deposits loaded:', {
        count: response.data.deposits.length,
        total: response.data.total,
      })

      return response.data
    } catch (error) {
      console.error('❌ Error loading deposits:', error)
      throw error
    }
  }

  /**
   * Get pending deposits
   */
  async getPendingDeposits(): Promise<DepositDetection[]> {
    try {
      console.log('📥 Fetching pending deposits')

      const response = await apiClient.get<DepositDetection[]>(
        API_ENDPOINTS.blockchain.depositsPending
      )

      console.log('✅ Pending deposits loaded:', response.data.length)

      return response.data
    } catch (error) {
      console.error('❌ Error loading pending deposits:', error)
      throw error
    }
  }

  /**
   * Get withdrawal list with filters
   */
  async getWithdrawals(
    params: WithdrawalBroadcastListParams
  ): Promise<WithdrawalBroadcastListResponse> {
    try {
      console.log('📤 Fetching withdrawals:', params)

      const response = await apiClient.get<WithdrawalBroadcastListResponse>(
        API_ENDPOINTS.blockchain.withdrawals,
        { params }
      )

      console.log('✅ Withdrawals loaded:', {
        count: response.data.withdrawals.length,
        total: response.data.total,
      })

      return response.data
    } catch (error) {
      console.error('❌ Error loading withdrawals:', error)
      throw error
    }
  }

  /**
   * Get pending withdrawals
   */
  async getPendingWithdrawals(): Promise<WithdrawalBroadcast[]> {
    try {
      console.log('📤 Fetching pending withdrawals')

      const response = await apiClient.get<WithdrawalBroadcast[]>(
        API_ENDPOINTS.blockchain.withdrawalsPending
      )

      console.log('✅ Pending withdrawals loaded:', response.data.length)

      return response.data
    } catch (error) {
      console.error('❌ Error loading pending withdrawals:', error)
      throw error
    }
  }

  /**
   * Retry failed withdrawal
   */
  async retryWithdrawal(id: string): Promise<WithdrawalBroadcast> {
    try {
      console.log('🔄 Retrying withdrawal:', id)

      const response = await apiClient.post<WithdrawalBroadcast>(
        API_ENDPOINTS.blockchain.withdrawalRetry(id)
      )

      console.log('✅ Withdrawal retry initiated:', response.data.id)

      return response.data
    } catch (error) {
      console.error('❌ Error retrying withdrawal:', error)
      throw error
    }
  }

  /**
   * Get address list with filters
   */
  async getAddresses(params: AddressListParams): Promise<AddressListResponse> {
    try {
      console.log('📋 Fetching addresses:', params)

      const response = await apiClient.get<AddressListResponse>(
        API_ENDPOINTS.blockchain.addresses,
        { params }
      )

      console.log('✅ Addresses loaded:', {
        count: response.data.addresses.length,
        total: response.data.total,
      })

      return response.data
    } catch (error) {
      console.error('❌ Error loading addresses:', error)
      throw error
    }
  }

  /**
   * Get specific chain status
   */
  async getChainStatus(chain: string): Promise<NetworkStatus> {
    try {
      console.log('📡 Fetching chain status:', chain)

      const response = await apiClient.get<NetworkStatus>(
        API_ENDPOINTS.blockchain.chainStatus(chain)
      )

      console.log('✅ Chain status loaded:', response.data.chain)

      return response.data
    } catch (error) {
      console.error('❌ Error loading chain status:', error)
      throw error
    }
  }
}

/**
 * Export singleton instance
 */
export const blockchainRepository = new BlockchainApiRepository()
