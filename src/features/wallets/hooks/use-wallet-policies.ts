/**
 * React Query hook for fetching wallet policies
 */

import { useQuery } from '@tanstack/react-query'
import { walletRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch wallet policies
 * @param walletId - Wallet UUID
 * @returns React Query result with policies list
 */
export function useWalletPolicies(walletId: string | undefined) {
  return useQuery({
    queryKey: ['wallet-policies', walletId],
    queryFn: () => walletRepository.getPolicies(walletId!),
    enabled: !!walletId,
    staleTime: 30000, // 30 seconds
  })
}
