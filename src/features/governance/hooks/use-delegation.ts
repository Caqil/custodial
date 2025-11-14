/**
 * React Query hook for fetching governance delegation details by ID
 */

import { useQuery } from '@tanstack/react-query'
import { governanceRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch governance delegation details by ID
 * @param id - Delegation ID
 * @returns React Query result with delegation details
 */
export function useDelegation(id: string | undefined) {
  return useQuery({
    queryKey: ['governance-delegation', id],
    queryFn: () => governanceRepository.getDelegationById(id!),
    enabled: !!id,
    staleTime: 30000, // 30 seconds
  })
}
