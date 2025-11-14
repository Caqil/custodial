/**
 * React Query hook for fetching custom analytics
 */

import { useQuery } from '@tanstack/react-query'
import { analyticsRepository } from '@/infrastructure/api/repositories'
import type { CustomAnalyticsParams } from '@/core/entities/analytics.entity'

/**
 * Hook to fetch custom analytics query results
 * @param params - Query parameters (metric, dimensions, filters, aggregation)
 * @param enabled - Whether to run the query (default: true when params.metric is set)
 * @returns React Query result with custom analytics data
 */
export function useCustomAnalytics(params: CustomAnalyticsParams, enabled = true) {
  return useQuery({
    queryKey: ['custom-analytics', params],
    queryFn: () => analyticsRepository.getCustom(params),
    enabled: enabled && !!params.metric,
    staleTime: 30000, // 30 seconds
  })
}
