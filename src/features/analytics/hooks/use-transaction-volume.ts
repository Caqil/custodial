/**
 * React Query hook for fetching transaction volume
 */

import { useQuery } from '@tanstack/react-query'
import { analyticsRepository } from '@/infrastructure/api/repositories'
import type { TransactionVolumeParams } from '@/core/entities/analytics.entity'

/**
 * Hook to fetch transaction volume trends
 * @param params - Query parameters (date range, grouping)
 * @returns React Query result with transaction volume data
 */
export function useTransactionVolume(params: TransactionVolumeParams = {}) {
  return useQuery({
    queryKey: ['transaction-volume', params],
    queryFn: () => analyticsRepository.getTransactionVolume(params),
    staleTime: 30000, // 30 seconds
  })
}
