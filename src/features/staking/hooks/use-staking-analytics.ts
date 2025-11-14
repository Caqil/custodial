/**
 * React Query hook for fetching staking analytics
 */

import { useQuery } from '@tanstack/react-query'
import { stakingRepository } from '@/infrastructure/api/repositories'
import type { StakingAnalyticsParams } from '@/infrastructure/api/repositories/staking-api.repository'

/**
 * Hook to fetch staking analytics
 * @param params - Query parameters (start_date, end_date, currency)
 * @returns React Query result with staking analytics
 */
export function useStakingAnalytics(params: StakingAnalyticsParams = {}) {
  return useQuery({
    queryKey: ['staking-analytics', params],
    queryFn: () => stakingRepository.getAnalytics(params),
    staleTime: 60000, // 1 minute
  })
}
