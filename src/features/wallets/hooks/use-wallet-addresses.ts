/**
 * React Query hook for fetching wallet addresses
 */

import { useQuery } from '@tanstack/react-query'
import { walletRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch wallet addresses
 * @param walletId - Wallet UUID
 * @returns React Query result with addresses list
 */
export function useWalletAddresses(walletId: string | undefined) {
  return useQuery({
    queryKey: ['wallet-addresses', walletId],
    queryFn: () => walletRepository.getAddresses(walletId!),
    enabled: !!walletId,
    staleTime: 30000, // 30 seconds
  })
}
