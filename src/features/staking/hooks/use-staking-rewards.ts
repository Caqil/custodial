/**
 * React Query hook for fetching paginated staking rewards list
 */

import { useQuery } from '@tanstack/react-query'
import { stakingRepository } from '@/infrastructure/api/repositories'
import type { StakingRewardListParams } from '@/core/entities/staking.entity'

/**
 * Hook to fetch staking rewards list with pagination and filters
 * @param params - Query parameters (offset, limit, filters)
 * @returns React Query result with staking rewards list
 */
export function useStakingRewards(params: StakingRewardListParams = {}) {
  return useQuery({
    queryKey: ['staking-rewards', params],
    queryFn: () => stakingRepository.getRewards(params),
    staleTime: 30000, // 30 seconds
  })
}
