/**
 * React Query hook for fetching staking TVL
 */

import { useQuery } from '@tanstack/react-query'
import { analyticsRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch staking total value locked
 * @returns React Query result with TVL data
 */
export function useStakingTVL() {
  return useQuery({
    queryKey: ['staking-tvl'],
    queryFn: () => analyticsRepository.getStakingTVL(),
    staleTime: 60000, // 1 minute
    refetchInterval: 60000, // Auto-refresh every minute
  })
}
