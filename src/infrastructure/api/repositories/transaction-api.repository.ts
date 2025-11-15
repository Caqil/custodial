/**
 * Transaction API Repository
 * Implements transaction-related API operations
 */

import apiClient from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type { ApiResponse } from '../types'
import type {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '@/core/entities/transaction.entity'

/**
 * Transaction list query parameters
 */
export interface TransactionListParams {
  offset?: number
  limit?: number
  type?: TransactionType
  status?: TransactionStatus
  wallet_id?: string
  user_id?: string
  currency?: string
  min_amount?: string
  max_amount?: string
  start_date?: string
  end_date?: string
  sort_by?: 'created_at' | 'amount' | 'updated_at'
  sort_order?: 'asc' | 'desc'
}

/**
 * Transaction list response
 */
export interface TransactionListResponse {
  transactions: Transaction[]
  total: number
  limit: number
  offset: number
}

/**
 * Transaction statistics response
 */
export interface TransactionStatistics {
  total_count: number
  total_volume: string
  success_count: number
  failed_count: number
  pending_count: number
  average_amount: string
  by_type: {
    type: TransactionType
    count: number
    volume: string
  }[]
  by_currency: {
    currency: string
    count: number
    volume: string
  }[]
  by_status: {
    status: TransactionStatus
    count: number
  }[]
}

/**
 * Transaction volume chart data point
 */
export interface TransactionVolumeDataPoint {
  date: string
  volume: string
  count: number
  total_count: number
  deposit_count: number
  withdrawal_count: number
  transfer_count: number
  total_volume: string
  deposit_volume: string
  withdrawal_volume: string
  transfer_volume: string
}

/**
 * Transaction fees summary
 */
export interface TransactionFeesSummary {
  total_fees: string
  by_currency: {
    currency: string
    total_fees: string
    average_fee: string
    count: number
  }[]
  by_type: {
    type: TransactionType
    total_fees: string
    average_fee: string
    count: number
  }[]
}

/**
 * Approve/Reject request body
 */
export interface TransactionApprovalRequest {
  reason?: string
  signature?: string
}

/**
 * Transaction repository interface
 */
export interface ITransactionRepository {
  list(params: TransactionListParams): Promise<TransactionListResponse>
  getById(id: string): Promise<Transaction>
  approve(id: string, data: TransactionApprovalRequest): Promise<void>
  reject(id: string, data: TransactionApprovalRequest): Promise<void>
  cancel(id: string, reason?: string): Promise<void>
  retry(id: string): Promise<void>
  getStatistics(params?: { start_date?: string; end_date?: string }): Promise<TransactionStatistics>
  getVolumeChart(params: { start_date: string; end_date: string; interval?: 'day' | 'week' | 'month' }): Promise<TransactionVolumeDataPoint[]>
  getFeesSummary(params?: { start_date?: string; end_date?: string }): Promise<TransactionFeesSummary>
}

/**
 * Transaction API Repository Implementation
 */
export class TransactionApiRepository implements ITransactionRepository {
  /**
   * List transactions with filtering and pagination
   */
  async list(params: TransactionListParams): Promise<TransactionListResponse> {
    const response = await apiClient.get<ApiResponse<TransactionListResponse>>(
      API_ENDPOINTS.transactions.list,
      { params }
    )
    const data = response.data.data!
    return data
  }

  /**
   * Get transaction by ID
   */
  async getById(id: string): Promise<Transaction> {
    const response = await apiClient.get<ApiResponse<Transaction>>(
      API_ENDPOINTS.transactions.getById(id)
    )
    const data = response.data.data!
    return data
  }

  /**
   * Approve a pending transaction
   */
  async approve(id: string, data: TransactionApprovalRequest): Promise<void> {
    await apiClient.post(
      API_ENDPOINTS.transactions.approve(id),
      data
    )
  }

  /**
   * Reject a pending transaction
   */
  async reject(id: string, data: TransactionApprovalRequest): Promise<void> {
    await apiClient.post(
      API_ENDPOINTS.transactions.reject(id),
      data
    )
  }

  /**
   * Cancel a transaction
   */
  async cancel(id: string, reason?: string): Promise<void> {
    await apiClient.post(
      API_ENDPOINTS.transactions.cancel(id),
      { reason }
    )
  }

  /**
   * Retry a failed transaction
   */
  async retry(id: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.transactions.retry(id))
  }

  /**
   * Get transaction statistics
   */
  async getStatistics(params?: { start_date?: string; end_date?: string }): Promise<TransactionStatistics> {
    const response = await apiClient.get<ApiResponse<TransactionStatistics>>(
      API_ENDPOINTS.transactions.statistics,
      { params }
    )
    const data = response.data.data!
    return data
  }

  /**
   * Get transaction volume chart data
   */
  async getVolumeChart(params: {
    start_date: string
    end_date: string
    interval?: 'day' | 'week' | 'month'
  }): Promise<TransactionVolumeDataPoint[]> {
    const response = await apiClient.get<ApiResponse<TransactionVolumeDataPoint[]>>(
      API_ENDPOINTS.transactions.volumeChart,
      { params }
    )
    const data = response.data.data!
    return data
  }

  /**
   * Get transaction fees summary
   */
  async getFeesSummary(params?: { start_date?: string; end_date?: string }): Promise<TransactionFeesSummary> {
    const response = await apiClient.get<ApiResponse<TransactionFeesSummary>>(
      API_ENDPOINTS.transactions.fees,
      { params }
    )
    const data = response.data.data!
    return data
  }
}

/**
 * Export singleton instance
 */
export const transactionRepository = new TransactionApiRepository()
