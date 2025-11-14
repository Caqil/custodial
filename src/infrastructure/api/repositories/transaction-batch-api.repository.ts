/**
 * Transaction Batch API Repository
 * Implements transaction batch-related API operations
 */

import apiClient from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type { ApiResponse } from '../types'
import type {
  TransactionBatch,
  TransactionBatchListResponse,
  TransactionBatchListParams,
  Transaction,
} from '@/core/entities/transaction.entity'

/**
 * Transaction batch repository interface
 */
export interface ITransactionBatchRepository {
  list(params: TransactionBatchListParams): Promise<TransactionBatchListResponse>
  getById(id: string): Promise<TransactionBatch>
  getTransactions(id: string): Promise<Transaction[]>
  approve(id: string, reason?: string): Promise<void>
  reject(id: string, reason: string): Promise<void>
}

/**
 * Transaction Batch API Repository Implementation
 */
export class TransactionBatchApiRepository implements ITransactionBatchRepository {
  /**
   * List transaction batches with filtering and pagination
   */
  async list(params: TransactionBatchListParams): Promise<TransactionBatchListResponse> {
    try {
      console.log('📋 Fetching transaction batches:', params)

      const response = await apiClient.get<ApiResponse<TransactionBatchListResponse>>(
        API_ENDPOINTS.transactionBatches.list,
        { params }
      )

      console.log('✅ Batches loaded:', {
        count: response.data.data!.batches.length,
        total: response.data.data!.total,
      })

      return response.data.data!
    } catch (error) {
      console.error('❌ Error loading batches:', error)
      throw error
    }
  }

  /**
   * Get transaction batch by ID
   */
  async getById(id: string): Promise<TransactionBatch> {
    try {
      console.log('📋 Fetching batch details:', id)

      const response = await apiClient.get<ApiResponse<TransactionBatch>>(
        API_ENDPOINTS.transactionBatches.getById(id)
      )

      console.log('✅ Batch details loaded:', response.data.data!.id)

      return response.data.data!
    } catch (error) {
      console.error('❌ Error loading batch details:', error)
      throw error
    }
  }

  /**
   * Get transactions in a batch
   */
  async getTransactions(id: string): Promise<Transaction[]> {
    try {
      console.log('📋 Fetching batch transactions:', id)

      const response = await apiClient.get<ApiResponse<Transaction[]>>(
        API_ENDPOINTS.transactionBatches.transactions(id)
      )

      console.log('✅ Batch transactions loaded:', response.data.data!.length)

      return response.data.data!
    } catch (error) {
      console.error('❌ Error loading batch transactions:', error)
      throw error
    }
  }

  /**
   * Approve a transaction batch
   */
  async approve(id: string, reason?: string): Promise<void> {
    try {
      console.log('✅ Approving batch:', id)

      await apiClient.post(
        API_ENDPOINTS.transactionBatches.approve(id),
        { reason }
      )

      console.log('✅ Batch approved:', id)
    } catch (error) {
      console.error('❌ Error approving batch:', error)
      throw error
    }
  }

  /**
   * Reject a transaction batch
   */
  async reject(id: string, reason: string): Promise<void> {
    try {
      console.log('❌ Rejecting batch:', id)

      await apiClient.post(
        API_ENDPOINTS.transactionBatches.reject(id),
        { reason }
      )

      console.log('✅ Batch rejected:', id)
    } catch (error) {
      console.error('❌ Error rejecting batch:', error)
      throw error
    }
  }
}

/**
 * Export singleton instance
 */
export const transactionBatchRepository = new TransactionBatchApiRepository()
