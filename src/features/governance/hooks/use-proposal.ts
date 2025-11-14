/**
 * React Query hook for fetching governance proposal details by ID
 */

import { useQuery } from '@tanstack/react-query'
import { governanceRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch governance proposal details by ID
 * @param id - Proposal ID
 * @returns React Query result with proposal details
 */
export function useProposal(id: string | undefined) {
  return useQuery({
    queryKey: ['governance-proposal', id],
    queryFn: () => governanceRepository.getProposalById(id!),
    enabled: !!id,
    staleTime: 30000, // 30 seconds
  })
}
