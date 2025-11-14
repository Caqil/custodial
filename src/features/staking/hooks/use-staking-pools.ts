/**
 * React Query hook for fetching paginated staking pools list
 */

import { useQuery } from '@tanstack/react-query'
import { stakingRepository } from '@/infrastructure/api/repositories'
import type { StakingPoolListParams } from '@/core/entities/staking.entity'

/**
 * Hook to fetch staking pools list with pagination and filters
 * @param params - Query parameters (offset, limit, filters)
 * @returns React Query result with staking pools list
 */
export function useStakingPools(params: StakingPoolListParams = {}) {
  return useQuery({
    queryKey: ['staking-pools', params],
    queryFn: () => stakingRepository.getPools(params),
    staleTime: 30000, // 30 seconds
  })
}
