/**
 * React Query hook for fetching risk analytics
 */

import { useQuery } from '@tanstack/react-query'
import { analyticsRepository } from '@/infrastructure/api/repositories'
import type { RiskAnalyticsParams } from '@/core/entities/analytics.entity'

/**
 * Hook to fetch risk analytics
 * Includes risk scores, anomalies, fraud metrics, compliance violations, and heatmap
 * @param params - Query parameters (date range, risk threshold)
 * @returns React Query result with risk analytics data
 */
export function useRiskAnalytics(params: RiskAnalyticsParams = {}) {
  return useQuery({
    queryKey: ['risk-analytics', params],
    queryFn: () => analyticsRepository.getRisk(params),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Auto-refresh every minute for risk monitoring
  })
}
