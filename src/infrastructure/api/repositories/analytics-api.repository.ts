/**
 * Analytics API Repository Implementation
 * Implements IAnalyticsRepository using the API client
 */

import apiClient, { type ApiResponse } from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type { IAnalyticsRepository } from '@/core/repositories/analytics.repository'
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
} from '@/core/entities/analytics.entity'
import type { TransactionVolumeResponse } from '@/core/entities/transaction.entity'

/**
 * Analytics repository implementation using API
 */
export class AnalyticsApiRepository implements IAnalyticsRepository {
  /**
   * Get dashboard analytics overview
   */
  async getDashboardAnalytics(): Promise<DashboardAnalytics> {
    const response = await apiClient.get<ApiResponse<DashboardAnalytics>>(
      API_ENDPOINTS.analytics.dashboard
    )
    return response.data.data!
  }

  /**
   * Get transaction volume trends
   */
  async getTransactionVolume(params: TransactionVolumeParams): Promise<TransactionVolumeResponse> {
    const response = await apiClient.get<ApiResponse<TransactionVolumeResponse>>(
      API_ENDPOINTS.analytics.transactionVolume,
      { params }
    )
    return response.data.data!
  }

  /**
   * Get assets under custody breakdown
   */
  async getAssetsUnderCustody(): Promise<AUCResponse> {
    const response = await apiClient.get<ApiResponse<AUCResponse>>(
      API_ENDPOINTS.analytics.assetsUnderCustody
    )
    return response.data.data!
  }

  /**
   * Get staking total value locked
   */
  async getStakingTVL(): Promise<TVLResponse> {
    const response = await apiClient.get<ApiResponse<TVLResponse>>(
      API_ENDPOINTS.analytics.stakingTVL
    )
    return response.data.data!
  }

  /**
   * Get user growth metrics
   */
  async getUserGrowth(params: UserGrowthParams): Promise<UserGrowthResponse> {
    const response = await apiClient.get<ApiResponse<UserGrowthResponse>>(
      API_ENDPOINTS.analytics.userGrowth,
      { params }
    )
    return response.data.data!
  }

  /**
   * Get system health status
   */
  async getSystemHealth(): Promise<SystemHealth> {
    const response = await apiClient.get<ApiResponse<SystemHealth>>(
      API_ENDPOINTS.analytics.systemHealth
    )
    return response.data.data!
  }

  /**
   * Get real-time analytics data
   */
  async getRealTime(): Promise<RealTimeAnalytics> {
    const response = await apiClient.get<ApiResponse<RealTimeAnalytics>>(
      API_ENDPOINTS.analytics.realTime
    )
    return response.data.data!
  }

  /**
   * Get financial analytics (P&L, revenue, costs)
   */
  async getFinancial(params: FinancialAnalyticsParams = {}): Promise<FinancialAnalytics> {
    const response = await apiClient.get<ApiResponse<FinancialAnalytics>>(
      API_ENDPOINTS.analytics.financial,
      { params }
    )
    return response.data.data!
  }

  /**
   * Get user behavior analytics
   */
  async getUserBehavior(params: UserBehaviorParams = {}): Promise<UserBehaviorAnalytics> {
    const response = await apiClient.get<ApiResponse<UserBehaviorAnalytics>>(
      API_ENDPOINTS.analytics.userBehavior,
      { params }
    )
    return response.data.data!
  }

  /**
   * Get performance analytics
   */
  async getPerformance(params: PerformanceParams = {}): Promise<PerformanceAnalytics> {
    const response = await apiClient.get<ApiResponse<PerformanceAnalytics>>(
      API_ENDPOINTS.analytics.performance,
      { params }
    )
    return response.data.data!
  }

  /**
   * Get risk analytics
   */
  async getRisk(params: RiskAnalyticsParams = {}): Promise<RiskAnalytics> {
    const response = await apiClient.get<ApiResponse<RiskAnalytics>>(
      API_ENDPOINTS.analytics.risk,
      { params }
    )
    return response.data.data!
  }

  /**
   * Get custom analytics query results
   */
  async getCustom(params: CustomAnalyticsParams): Promise<CustomAnalytics> {
    const response = await apiClient.get<ApiResponse<CustomAnalytics>>(
      API_ENDPOINTS.analytics.custom,
      { params }
    )
    return response.data.data!
  }
}

/**
 * Export singleton instance
 */
export const analyticsRepository = new AnalyticsApiRepository()
