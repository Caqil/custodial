/**
 * React Query hook for fetching governance analytics
 */

import { useQuery } from '@tanstack/react-query'
import { governanceRepository } from '@/infrastructure/api/repositories'
import type { GovernanceAnalyticsParams } from '@/infrastructure/api/repositories/governance-api.repository'

/**
 * Hook to fetch governance analytics
 * @param params - Analytics parameters (date range, currency)
 * @returns React Query result with governance analytics
 */
export function useGovernanceAnalytics(params: GovernanceAnalyticsParams = {}) {
  return useQuery({
    queryKey: ['governance-analytics', params],
    queryFn: () => governanceRepository.getAnalytics(params),
    staleTime: 60000, // 1 minute
  })
}
