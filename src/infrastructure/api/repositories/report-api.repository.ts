/**
 * Report API Repository Implementation
 * Implements IReportRepository using the API client
 */

import apiClient, { type ApiResponse } from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type { IReportRepository } from '@/core/repositories/report.repository'
import type {
  TransactionReportRequest,
  TransactionReportResponse,
} from '@/core/entities/transaction.entity'
import type {
  BalanceReportRequest,
  BalanceReportResponse,
} from '@/core/entities/wallet.entity'
import type {
  StakingReportRequest,
  StakingReportResponse,
  GovernanceReportRequest,
  GovernanceReportResponse,
} from '@/core/entities/report.entity'

/**
 * Report repository implementation using API
 */
export class ReportApiRepository implements IReportRepository {
  /**
   * Generate transaction report with filters
   */
  async generateTransactionReport(
    request: TransactionReportRequest
  ): Promise<TransactionReportResponse> {
    const response = await apiClient.post<ApiResponse<TransactionReportResponse>>(
      API_ENDPOINTS.reports.transactions,
      request
    )
    return response.data.data!
  }

  /**
   * Generate balance report by currency
   */
  async generateBalanceReport(request: BalanceReportRequest): Promise<BalanceReportResponse> {
    const response = await apiClient.post<ApiResponse<BalanceReportResponse>>(
      API_ENDPOINTS.reports.balances,
      request
    )
    return response.data.data!
  }

  /**
   * Generate staking report
   */
  async generateStakingReport(request: StakingReportRequest): Promise<StakingReportResponse> {
    const response = await apiClient.post<ApiResponse<StakingReportResponse>>(
      API_ENDPOINTS.reports.staking,
      request
    )
    return response.data.data!
  }

  /**
   * Generate governance report
   */
  async generateGovernanceReport(
    request: GovernanceReportRequest
  ): Promise<GovernanceReportResponse> {
    const response = await apiClient.post<ApiResponse<GovernanceReportResponse>>(
      API_ENDPOINTS.reports.governance,
      request
    )
    return response.data.data!
  }

  /**
   * Export transactions to CSV
   */
  async exportTransactionsCSV(request: TransactionReportRequest): Promise<Blob> {
    const response = await apiClient.post(API_ENDPOINTS.reports.exportTransactions, request, {
      responseType: 'blob',
      headers: {
        Accept: 'text/csv',
      },
    })
    return response.data
  }
}

/**
 * Export singleton instance
 */
export const reportRepository = new ReportApiRepository()
