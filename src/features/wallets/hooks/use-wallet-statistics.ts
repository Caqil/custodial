/**
 * React Query hook for fetching wallet statistics
 */

import { useQuery } from '@tanstack/react-query'
import { walletRepository } from '@/infrastructure/api/repositories'
import type { WalletListParams } from '@/core/entities/wallet.entity'

/**
 * Hook to fetch wallet statistics
 * @param params - Query parameters (organization_id, filters)
 * @returns React Query result with statistics
 */
export function useWalletStatistics(params: WalletListParams = {}) {
  return useQuery({
    queryKey: ['wallet-statistics', params],
    queryFn: () => walletRepository.getStatistics(params),
    staleTime: 60000, // 1 minute
  })
}
