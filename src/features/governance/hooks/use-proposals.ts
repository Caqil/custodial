/**
 * React Query hook for fetching paginated governance proposals list
 */

import { useQuery } from '@tanstack/react-query'
import { governanceRepository } from '@/infrastructure/api/repositories'
import type { GovernanceProposalListParams } from '@/core/entities/governance.entity'

/**
 * Hook to fetch governance proposals list with pagination and filters
 * @param params - Query parameters (offset, limit, filters)
 * @returns React Query result with governance proposals list
 */
export function useProposals(params: GovernanceProposalListParams = {}) {
  return useQuery({
    queryKey: ['governance-proposals', params],
    queryFn: () => governanceRepository.getProposals(params),
    staleTime: 30000, // 30 seconds - auto-refresh for active proposals
  })
}
