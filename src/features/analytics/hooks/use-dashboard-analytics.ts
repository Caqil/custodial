/**
 * React Query hook for fetching dashboard analytics
 */

import { useQuery } from '@tanstack/react-query'
import { analyticsRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch dashboard analytics overview
 * @returns React Query result with dashboard data
 */
export function useDashboardAnalytics() {
  return useQuery({
    queryKey: ['dashboard-analytics'],
    queryFn: () => analyticsRepository.getDashboardAnalytics(),
    staleTime: 60000, // 1 minute
    refetchInterval: 60000, // Auto-refresh every minute
  })
}
