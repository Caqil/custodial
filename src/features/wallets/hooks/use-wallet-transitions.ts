/**
 * React Query hook for fetching wallet transitions
 */

import { useQuery } from '@tanstack/react-query'
import { walletRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch wallet transitions
 * @param walletId - Wallet UUID
 * @returns React Query result with transitions list
 */
export function useWalletTransitions(walletId: string | undefined) {
  return useQuery({
    queryKey: ['wallet-transitions', walletId],
    queryFn: () => walletRepository.getTransitions(walletId!),
    enabled: !!walletId,
    staleTime: 30000, // 30 seconds
  })
}
