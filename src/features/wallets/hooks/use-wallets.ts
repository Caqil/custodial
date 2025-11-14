/**
 * React Query hook for fetching paginated wallets list
 */

import { useQuery } from '@tanstack/react-query'
import { walletRepository } from '@/infrastructure/api/repositories'
import type { WalletListParams } from '@/core/entities/wallet.entity'

/**
 * Hook to fetch wallets list with pagination and filters
 * @param params - Query parameters (offset, limit, filters)
 * @returns React Query result with wallets list
 */
export function useWallets(params: WalletListParams = {}) {
  return useQuery({
    queryKey: ['wallets', params],
    queryFn: () => walletRepository.list(params),
    staleTime: 30000, // 30 seconds
  })
}
