/**
 * Report Repository Interface
 * Defines the contract for report generation operations
 */

import type {
  TransactionReportRequest,
  TransactionReportResponse,
} from '../entities/transaction.entity'
import type {
  BalanceReportRequest,
  BalanceReportResponse,
} from '../entities/wallet.entity'
import type {
  StakingReportRequest,
  StakingReportResponse,
  GovernanceReportRequest,
  GovernanceReportResponse,
} from '../entities/report.entity'

/**
 * Interface for report repository operations
 */
export interface IReportRepository {
  /**
   * Generate transaction report with filters
   * @param request - Transaction report parameters
   * @returns Promise resolving to transaction report
   */
  generateTransactionReport(
    request: TransactionReportRequest
  ): Promise<TransactionReportResponse>

  /**
   * Generate balance report by currency
   * @param request - Balance report parameters
   * @returns Promise resolving to balance report
   */
  generateBalanceReport(request: BalanceReportRequest): Promise<BalanceReportResponse>

  /**
   * Generate staking report
   * @param request - Staking report parameters
   * @returns Promise resolving to staking report
   */
  generateStakingReport(request: StakingReportRequest): Promise<StakingReportResponse>

  /**
   * Generate governance report
   * @param request - Governance report parameters
   * @returns Promise resolving to governance report
   */
  generateGovernanceReport(
    request: GovernanceReportRequest
  ): Promise<GovernanceReportResponse>

  /**
   * Export transactions to CSV
   * @param request - Transaction report parameters
   * @returns Promise resolving to CSV blob
   */
  exportTransactionsCSV(request: TransactionReportRequest): Promise<Blob>
}
