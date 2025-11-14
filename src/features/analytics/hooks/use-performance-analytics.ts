/**
 * React Query hook for fetching performance analytics
 */

import { useQuery } from '@tanstack/react-query'
import { analyticsRepository } from '@/infrastructure/api/repositories'
import type { PerformanceParams } from '@/core/entities/analytics.entity'

/**
 * Hook to fetch performance analytics
 * Includes API response times, error rates, uptime, and database performance
 * @param params - Query parameters (date range)
 * @returns React Query result with performance data
 */
export function usePerformanceAnalytics(params: PerformanceParams = {}) {
  return useQuery({
    queryKey: ['performance-analytics', params],
    queryFn: () => analyticsRepository.getPerformance(params),
    staleTime: 30000, // 30 seconds
  })
}
