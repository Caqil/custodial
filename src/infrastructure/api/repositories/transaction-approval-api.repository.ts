/**
 * Transaction Approval API Repository
 * Implements transaction approval-related API operations
 */

import apiClient from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type { ApiResponse } from '../types'
import type {
  TransactionApproval,
  ApproveTransactionRequest,
  RejectTransactionRequest,
} from '@/core/entities/transaction.entity'

/**
 * Approval list response
 */
export interface ApprovalListResponse {
  approvals: TransactionApproval[]
  total: number
  limit: number
  offset: number
}

/**
 * Approval list parameters
 */
export interface ApprovalListParams {
  offset?: number
  limit?: number
  transaction_id?: string
  approver_id?: string
  status?: string
}

/**
 * Transaction approval repository interface
 */
export interface ITransactionApprovalRepository {
  getPending(params?: ApprovalListParams): Promise<ApprovalListResponse>
  getHistory(params?: ApprovalListParams): Promise<ApprovalListResponse>
  getById(id: string): Promise<TransactionApproval>
  approve(id: string, request: Omit<ApproveTransactionRequest, 'transaction_id'>): Promise<void>
  reject(id: string, request: Omit<RejectTransactionRequest, 'transaction_id'>): Promise<void>
}

/**
 * Transaction Approval API Repository Implementation
 */
export class TransactionApprovalApiRepository implements ITransactionApprovalRepository {
  /**
   * Get pending approvals
   */
  async getPending(params?: ApprovalListParams): Promise<ApprovalListResponse> {
    try {
      console.log('📋 Fetching pending approvals:', params)

      const response = await apiClient.get<ApiResponse<ApprovalListResponse>>(
        API_ENDPOINTS.transactionApprovals.pending,
        { params }
      )

      console.log('✅ Pending approvals loaded:', {
        count: response.data.data!.approvals.length,
        total: response.data.data!.total,
      })

      return response.data.data!
    } catch (error) {
      console.error('❌ Error loading pending approvals:', error)
      throw error
    }
  }

  /**
   * Get approval history
   */
  async getHistory(params?: ApprovalListParams): Promise<ApprovalListResponse> {
    try {
      console.log('📋 Fetching approval history:', params)

      const response = await apiClient.get<ApiResponse<ApprovalListResponse>>(
        API_ENDPOINTS.transactionApprovals.history,
        { params }
      )

      console.log('✅ Approval history loaded:', {
        count: response.data.data!.approvals.length,
        total: response.data.data!.total,
      })

      return response.data.data!
    } catch (error) {
      console.error('❌ Error loading approval history:', error)
      throw error
    }
  }

  /**
   * Get approval by ID
   */
  async getById(id: string): Promise<TransactionApproval> {
    try {
      console.log('📋 Fetching approval details:', id)

      const response = await apiClient.get<ApiResponse<TransactionApproval>>(
        API_ENDPOINTS.transactionApprovals.getById(id)
      )

      console.log('✅ Approval details loaded:', response.data.data!.id)

      return response.data.data!
    } catch (error) {
      console.error('❌ Error loading approval details:', error)
      throw error
    }
  }

  /**
   * Approve a transaction
   */
  async approve(
    id: string,
    request: Omit<ApproveTransactionRequest, 'transaction_id'>
  ): Promise<void> {
    try {
      console.log('✅ Approving transaction approval:', id)

      await apiClient.post(
        API_ENDPOINTS.transactionApprovals.approve(id),
        request
      )

      console.log('✅ Transaction approval approved:', id)
    } catch (error) {
      console.error('❌ Error approving transaction approval:', error)
      throw error
    }
  }

  /**
   * Reject a transaction approval
   */
  async reject(
    id: string,
    request: Omit<RejectTransactionRequest, 'transaction_id'>
  ): Promise<void> {
    try {
      console.log('❌ Rejecting transaction approval:', id)

      await apiClient.post(
        API_ENDPOINTS.transactionApprovals.reject(id),
        request
      )

      console.log('✅ Transaction approval rejected:', id)
    } catch (error) {
      console.error('❌ Error rejecting transaction approval:', error)
      throw error
    }
  }
}

/**
 * Export singleton instance
 */
export const transactionApprovalRepository = new TransactionApprovalApiRepository()
