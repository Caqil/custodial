/**
 * React Query hook for fetching assets under custody
 */

import { useQuery } from '@tanstack/react-query'
import { analyticsRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch assets under custody breakdown
 * @returns React Query result with AUC data
 */
export function useAssetsUnderCustody() {
  return useQuery({
    queryKey: ['assets-under-custody'],
    queryFn: () => analyticsRepository.getAssetsUnderCustody(),
    staleTime: 60000, // 1 minute
    refetchInterval: 60000, // Auto-refresh every minute
  })
}
