/**
 * React Query hook for fetching system health
 */

import { useQuery } from '@tanstack/react-query'
import { analyticsRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch system health status
 * @returns React Query result with system health data
 */
export function useSystemHealth() {
  return useQuery({
    queryKey: ['system-health'],
    queryFn: () => analyticsRepository.getSystemHealth(),
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  })
}
