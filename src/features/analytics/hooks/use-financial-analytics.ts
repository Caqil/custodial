/**
 * React Query hook for fetching financial analytics
 */

import { useQuery } from '@tanstack/react-query'
import { analyticsRepository } from '@/infrastructure/api/repositories'
import type { FinancialAnalyticsParams } from '@/core/entities/analytics.entity'

/**
 * Hook to fetch financial analytics (P&L, revenue, costs, ROI)
 * @param params - Query parameters (date range, period)
 * @returns React Query result with financial analytics data
 */
export function useFinancialAnalytics(params: FinancialAnalyticsParams = {}) {
  return useQuery({
    queryKey: ['financial-analytics', params],
    queryFn: () => analyticsRepository.getFinancial(params),
    staleTime: 60000, // 1 minute
  })
}
