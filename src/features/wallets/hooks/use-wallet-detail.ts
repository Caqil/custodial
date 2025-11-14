/**
 * React Query hook for fetching wallet details
 */

import { useQuery } from '@tanstack/react-query'
import { walletRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch wallet details by ID
 * @param id - Wallet UUID
 * @returns React Query result with wallet details
 */
export function useWalletDetail(id: string | undefined) {
  return useQuery({
    queryKey: ['wallet', id],
    queryFn: () => walletRepository.getById(id!),
    enabled: !!id,
    staleTime: 30000, // 30 seconds
  })
}
