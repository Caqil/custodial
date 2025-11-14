/**
 * Analytics Repository Interface
 * Defines the contract for analytics data operations
 */

import type {
  DashboardAnalytics,
  AUCResponse,
  TVLResponse,
  UserGrowthResponse,
  UserGrowthParams,
  SystemHealth,
  TransactionVolumeParams,
  RealTimeAnalytics,
  FinancialAnalytics,
  FinancialAnalyticsParams,
  UserBehaviorAnalytics,
  UserBehaviorParams,
  PerformanceAnalytics,
  PerformanceParams,
  RiskAnalytics,
  RiskAnalyticsParams,
  CustomAnalytics,
  CustomAnalyticsParams,
} from '../entities/analytics.entity'
import type { TransactionVolumeResponse } from '../entities/transaction.entity'

/**
 * Interface for analytics repository operations
 */
export interface IAnalyticsRepository {
  /**
   * Get dashboard analytics overview
   * @returns Promise resolving to dashboard analytics
   */
  getDashboardAnalytics(): Promise<DashboardAnalytics>

  /**
   * Get transaction volume trends
   * @param params - Query parameters (start_date, end_date, group_by)
   * @returns Promise resolving to transaction volume data
   */
  getTransactionVolume(params: TransactionVolumeParams): Promise<TransactionVolumeResponse>

  /**
   * Get assets under custody breakdown
   * @returns Promise resolving to AUC by currency
   */
  getAssetsUnderCustody(): Promise<AUCResponse>

  /**
   * Get staking total value locked
   * @returns Promise resolving to TVL by currency
   */
  getStakingTVL(): Promise<TVLResponse>

  /**
   * Get user growth metrics
   * @param params - Query parameters (period)
   * @returns Promise resolving to user growth data
   */
  getUserGrowth(params: UserGrowthParams): Promise<UserGrowthResponse>

  /**
   * Get system health status
   * @returns Promise resolving to system health status
   */
  getSystemHealth(): Promise<SystemHealth>

  /**
   * Get real-time analytics data
   * @returns Promise resolving to real-time analytics
   */
  getRealTime(): Promise<RealTimeAnalytics>

  /**
   * Get financial analytics (P&L, revenue, costs)
   * @param params - Query parameters
   * @returns Promise resolving to financial analytics
   */
  getFinancial(params?: FinancialAnalyticsParams): Promise<FinancialAnalytics>

  /**
   * Get user behavior analytics
   * @param params - Query parameters
   * @returns Promise resolving to user behavior analytics
   */
  getUserBehavior(params?: UserBehaviorParams): Promise<UserBehaviorAnalytics>

  /**
   * Get performance analytics
   * @param params - Query parameters
   * @returns Promise resolving to performance analytics
   */
  getPerformance(params?: PerformanceParams): Promise<PerformanceAnalytics>

  /**
   * Get risk analytics
   * @param params - Query parameters
   * @returns Promise resolving to risk analytics
   */
  getRisk(params?: RiskAnalyticsParams): Promise<RiskAnalytics>

  /**
   * Get custom analytics query results
   * @param params - Query parameters
   * @returns Promise resolving to custom analytics
   */
  getCustom(params: CustomAnalyticsParams): Promise<CustomAnalytics>
}
