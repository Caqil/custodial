/**
 * React Query hook for fetching wallet analytics
 */

import { useQuery } from '@tanstack/react-query'
import { walletRepository } from '@/infrastructure/api/repositories'
import type { WalletAnalyticsParams } from '@/core/repositories/wallet.repository'

/**
 * Hook to fetch wallet analytics
 * @param params - Query parameters (organization_id, date range)
 * @returns React Query result with analytics data
 */
export function useWalletAnalytics(params: WalletAnalyticsParams = {}) {
  return useQuery({
    queryKey: ['wallet-analytics', params],
    queryFn: () => walletRepository.getAnalytics(params),
    staleTime: 60000, // 1 minute
  })
}
