/**
 * React Query hook for fetching pool wallet details
 */

import { useQuery } from '@tanstack/react-query'
import { poolWalletRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch pool wallet details
 * @param id - Parent wallet UUID
 * @returns React Query result with pool wallet details
 */
export function usePoolWalletDetail(id: string | undefined) {
  return useQuery({
    queryKey: ['pool-wallet', id],
    queryFn: () => poolWalletRepository.getById(id!),
    enabled: !!id,
    staleTime: 30000, // 30 seconds
  })
}
