/**
 * React Query hook for fetching wallet balance history
 */

import { useQuery } from '@tanstack/react-query'
import { walletRepository } from '@/infrastructure/api/repositories'
import type { BalanceHistoryParams } from '@/core/repositories/wallet.repository'

/**
 * Hook to fetch wallet balance history
 * @param walletId - Wallet UUID
 * @param params - Query parameters (date range, interval)
 * @returns React Query result with balance history
 */
export function useWalletBalanceHistory(
  walletId: string | undefined,
  params: BalanceHistoryParams = {}
) {
  return useQuery({
    queryKey: ['wallet-balance-history', walletId, params],
    queryFn: () => walletRepository.getBalanceHistory(walletId!, params),
    enabled: !!walletId,
    staleTime: 60000, // 1 minute
  })
}
