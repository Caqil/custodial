/**
 * React Query hook for fetching paginated governance votes list
 */

import { useQuery } from '@tanstack/react-query'
import { governanceRepository } from '@/infrastructure/api/repositories'
import type { GovernanceVoteListParams } from '@/core/entities/governance.entity'

/**
 * Hook to fetch governance votes list with pagination and filters
 * @param params - Query parameters (offset, limit, filters)
 * @returns React Query result with governance votes list
 */
export function useVotes(params: GovernanceVoteListParams = {}) {
  return useQuery({
    queryKey: ['governance-votes', params],
    queryFn: () => governanceRepository.getVotes(params),
    staleTime: 30000, // 30 seconds
  })
}
