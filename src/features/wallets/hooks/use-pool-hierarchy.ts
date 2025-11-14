/**
 * React Query hook for fetching pool wallet hierarchy
 */

import { useQuery } from '@tanstack/react-query'
import { poolWalletRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch pool wallet hierarchy
 * @param id - Parent wallet UUID
 * @returns React Query result with hierarchy tree
 */
export function usePoolHierarchy(id: string | undefined) {
  return useQuery({
    queryKey: ['pool-hierarchy', id],
    queryFn: () => poolWalletRepository.getHierarchy(id!),
    enabled: !!id,
    staleTime: 60000, // 1 minute
  })
}
