/**
 * React Query hook for fetching paginated governance delegations list
 */

import { useQuery } from '@tanstack/react-query'
import { governanceRepository } from '@/infrastructure/api/repositories'
import type { GovernanceDelegationListParams } from '@/core/entities/governance.entity'

/**
 * Hook to fetch governance delegations list with pagination and filters
 * @param params - Query parameters (offset, limit, filters)
 * @returns React Query result with governance delegations list
 */
export function useDelegations(params: GovernanceDelegationListParams = {}) {
  return useQuery({
    queryKey: ['governance-delegations', params],
    queryFn: () => governanceRepository.getDelegations(params),
    staleTime: 30000, // 30 seconds
  })
}
