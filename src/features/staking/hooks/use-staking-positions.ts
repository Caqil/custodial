/**
 * React Query hook for fetching paginated staking positions list
 */

import { useQuery } from '@tanstack/react-query'
import { stakingRepository } from '@/infrastructure/api/repositories'
import type { StakingPositionListParams } from '@/core/entities/staking.entity'

/**
 * Hook to fetch staking positions list with pagination and filters
 * @param params - Query parameters (offset, limit, filters)
 * @returns React Query result with staking positions list
 */
export function useStakingPositions(params: StakingPositionListParams = {}) {
  return useQuery({
    queryKey: ['staking-positions', params],
    queryFn: () => stakingRepository.getPositions(params),
    staleTime: 30000, // 30 seconds - auto-refresh
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  })
}
