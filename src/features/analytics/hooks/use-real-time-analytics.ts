/**
 * React Query hook for fetching real-time analytics
 */

import { useQuery } from '@tanstack/react-query'
import { analyticsRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch real-time analytics data
 * Auto-refreshes every 5 seconds for live monitoring
 * @returns React Query result with real-time data
 */
export function useRealTimeAnalytics() {
  return useQuery({
    queryKey: ['real-time-analytics'],
    queryFn: () => analyticsRepository.getRealTime(),
    staleTime: 5000, // 5 seconds
    refetchInterval: 5000, // Auto-refresh every 5 seconds
  })
}
