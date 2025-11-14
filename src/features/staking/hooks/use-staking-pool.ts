/**
 * React Query hook for fetching a single staking pool by ID
 */

import { useQuery } from '@tanstack/react-query'
import { stakingRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch staking pool details by ID
 * @param id - Staking pool ID
 * @param enabled - Whether to enable the query
 * @returns React Query result with staking pool details
 */
export function useStakingPool(id: string, enabled = true) {
  return useQuery({
    queryKey: ['staking-pool', id],
    queryFn: () => stakingRepository.getPoolById(id),
    enabled: enabled && !!id,
    staleTime: 30000, // 30 seconds
  })
}
